from google.cloud import compute_v1
from datetime import datetime, timedelta

PROJECT = "emerald-state-491204-b8"
ZONE = "asia-south1-c"
DISK = "mongodb-db"

def run_snapshot(event, context):
    disk_client = compute_v1.DisksClient()
    snapshot_client = compute_v1.SnapshotsClient()

    # Create snapshot
    timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
    snapshot_name = f"mongo-backup-{timestamp}"

    disk_client.create_snapshot(
        project=PROJECT,
        zone=ZONE,
        disk=DISK,
        snapshot_resource={"name": snapshot_name}
    )

    print(f"✅ Snapshot {snapshot_name} created")

    # Get all snapshots
    snapshots = snapshot_client.list(project=PROJECT)

    cutoff = datetime.utcnow() - timedelta(days=7)

    for snap in snapshots:
        if snap.name.startswith("mongo-backup-"):
            try:
                snap_time = datetime.strptime(
                    snap.name.replace("mongo-backup-", ""),
                    "%Y%m%d%H%M%S"
                )

                if snap_time < cutoff:
                    snapshot_client.delete(
                        project=PROJECT,
                        snapshot=snap.name
                    )
                    print(f"🗑 Deleted old snapshot: {snap.name}")

            except:
                pass
