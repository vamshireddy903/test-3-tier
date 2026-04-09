import nodemailer from "nodemailer";

export const sendEmail = async (event) => {
  console.log("Full event:", JSON.stringify(event));
  if (!event?.data) {
    console.error("❌ No data in the event");
    return;
  }

  const messageJson = JSON.parse(Buffer.from(event.data, "base64").toString());
  console.log("Decoded message:", messageJson);

  const { orderNumber, userEmail, eventType, userName, items = [], total, date } = messageJson;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const itemRows = items.length > 0
    ? items.map(item => `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #2a2a2a;color:#ccc;">${item.name}</td>
          <td style="padding:12px;border-bottom:1px solid #2a2a2a;color:#ccc;text-align:center;">${item.qty}</td>
          <td style="padding:12px;border-bottom:1px solid #2a2a2a;color:#e63329;text-align:right;">₹${item.price}</td>
        </tr>`).join("")
    : `<tr><td colspan="3" style="padding:12px;color:#888;text-align:center;">Order details will follow shortly</td></tr>`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#1a1a1a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1e1e1e;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#e63329;padding:40px 30px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:36px;font-weight:900;letter-spacing:2px;">VAMSHI FITNESS</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:13px;letter-spacing:4px;text-transform:uppercase;">Order Confirmation</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px 30px;">

              <h2 style="color:#fff;font-size:24px;margin:0 0 8px;">Your order is confirmed! 💪</h2>
              <p style="color:#aaa;font-size:15px;margin:0 0 28px;">
                Hey <strong style="color:#fff;">${userName || userEmail.split("@")[0]}</strong> — we've got your order and it's being prepared. Get ready to forge your strength!
              </p>

              <!-- Order ID Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #333;border-left:4px solid #e63329;border-radius:6px;margin-bottom:30px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 6px;color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Order ID</p>
                    <p style="margin:0 0 8px;color:#e63329;font-size:26px;font-weight:bold;letter-spacing:1px;">#${orderNumber}</p>
                    <p style="margin:0;color:#666;font-size:13px;">Placed on ${formattedDate}</p>
                  </td>
                </tr>
              </table>

              <!-- Items Table -->
              <p style="color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">Items Ordered</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a2a2a;border-radius:6px;overflow:hidden;">
                <tr style="background:#2a2a2a;">
                  <th style="padding:12px;color:#fff;font-size:12px;letter-spacing:1px;text-align:left;">PRODUCT</th>
                  <th style="padding:12px;color:#fff;font-size:12px;letter-spacing:1px;text-align:center;">QTY</th>
                  <th style="padding:12px;color:#fff;font-size:12px;letter-spacing:1px;text-align:right;">TOTAL</th>
                </tr>
                ${itemRows}
                ${total ? `
                <tr style="background:#2a2a2a;">
                  <td colspan="2" style="padding:14px 12px;color:#fff;font-weight:bold;">Total</td>
                  <td style="padding:14px 12px;color:#e63329;font-weight:bold;font-size:18px;text-align:right;">₹${total}</td>
                </tr>` : ""}
              </table>

              <!-- Footer message -->
              <p style="color:#666;font-size:13px;margin:28px 0 0;text-align:center;">
                Thank you for choosing <strong style="color:#e63329;">Vamshi Fitness</strong>. We'll notify you when your order ships. 🚀
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111;padding:20px;text-align:center;">
              <p style="margin:0;color:#555;font-size:12px;">© 2026 Vamshi Fitness. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === "true",
devopsengg052@cloudshell:~/3-tier-app/order-consumer (project-aa5b9394-98e0-4be4-b17)$ cat index.js 
import nodemailer from "nodemailer";

export const sendEmail = async (event) => {
  console.log("Full event:", JSON.stringify(event));
  if (!event?.data) {
    console.error("❌ No data in the event");
    return;
  }

  const messageJson = JSON.parse(Buffer.from(event.data, "base64").toString());
  console.log("Decoded message:", messageJson);

  const { orderNumber, userEmail, eventType, userName, items = [], total, date } = messageJson;

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const itemRows = items.length > 0
    ? items.map(item => `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #2a2a2a;color:#ccc;">${item.name}</td>
          <td style="padding:12px;border-bottom:1px solid #2a2a2a;color:#ccc;text-align:center;">${item.qty}</td>
          <td style="padding:12px;border-bottom:1px solid #2a2a2a;color:#e63329;text-align:right;">₹${item.price}</td>
        </tr>`).join("")
    : `<tr><td colspan="3" style="padding:12px;color:#888;text-align:center;">Order details will follow shortly</td></tr>`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#1a1a1a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#1a1a1a;padding:20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1e1e1e;border-radius:12px;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#e63329;padding:40px 30px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:36px;font-weight:900;letter-spacing:2px;">VAMSHI FITNESS</h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:13px;letter-spacing:4px;text-transform:uppercase;">Order Confirmation</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:35px 30px;">

              <h2 style="color:#fff;font-size:24px;margin:0 0 8px;">Your order is confirmed! 💪</h2>
              <p style="color:#aaa;font-size:15px;margin:0 0 28px;">
                Hey <strong style="color:#fff;">${userName || userEmail.split("@")[0]}</strong> — we've got your order and it's being prepared. Get ready to forge your strength!
              </p>

              <!-- Order ID Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #333;border-left:4px solid #e63329;border-radius:6px;margin-bottom:30px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 6px;color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Order ID</p>
                    <p style="margin:0 0 8px;color:#e63329;font-size:26px;font-weight:bold;letter-spacing:1px;">#${orderNumber}</p>
                    <p style="margin:0;color:#666;font-size:13px;">Placed on ${formattedDate}</p>
                  </td>
                </tr>
              </table>

              <!-- Items Table -->
              <p style="color:#888;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">Items Ordered</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a2a2a;border-radius:6px;overflow:hidden;">
                <tr style="background:#2a2a2a;">
                  <th style="padding:12px;color:#fff;font-size:12px;letter-spacing:1px;text-align:left;">PRODUCT</th>
                  <th style="padding:12px;color:#fff;font-size:12px;letter-spacing:1px;text-align:center;">QTY</th>
                  <th style="padding:12px;color:#fff;font-size:12px;letter-spacing:1px;text-align:right;">TOTAL</th>
                </tr>
                ${itemRows}
                ${total ? `
                <tr style="background:#2a2a2a;">
                  <td colspan="2" style="padding:14px 12px;color:#fff;font-weight:bold;">Total</td>
                  <td style="padding:14px 12px;color:#e63329;font-weight:bold;font-size:18px;text-align:right;">₹${total}</td>
                </tr>` : ""}
              </table>

              <!-- Footer message -->
              <p style="color:#666;font-size:13px;margin:28px 0 0;text-align:center;">
                Thank you for choosing <strong style="color:#e63329;">Vamshi Fitness</strong>. We'll notify you when your order ships. 🚀
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#111;padding:20px;text-align:center;">
              <p style="margin:0;color:#555;font-size:12px;">© 2026 Vamshi Fitness. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: `Order Confirmation - #${orderNumber}`,
    text: `Hello ${userName || userEmail}! Your order #${orderNumber} has been confirmed. Event: ${eventType}`,
    html: htmlBody,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent:", info.messageId);
};
