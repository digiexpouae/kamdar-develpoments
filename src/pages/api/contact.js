import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    firstname,
    lastname,
    email,
    phone,
    buyertype,
    timeframe,
    apttype,
    areyou,
  } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const fullName = `${firstname || ''} ${lastname || ''}`.trim();

  // SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Website Enquiry" <${process.env.SMTP_USER}>`,
           to: [
            // process.env.SMTP_USER,
         process.env.SMTP_TO || process.env.SMTP_USER,
         process.env.SMTP_TO_SECOND || 'secondreceiver@example.com', // add second address here or via env variable
      ],
      subject: `📩 New Enquiry from ${fullName || email}`,

      // Plain text fallback
      text: `
New Contact Form Submission

Name: ${fullName}
Email: ${email}
Phone: ${phone || 'N/A'}
Buyer Type: ${buyertype || 'N/A'}
Buying Timeframe: ${timeframe || 'N/A'}
Apartment Type: ${apttype || 'N/A'}
Are You: ${areyou || 'N/A'}
      `,

      // HTML email
     
html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kamdar Developments | Intelligence Report</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;-webkit-font-smoothing:antialiased;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f2f5;padding:60px 20px;">
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.05);">

<tr>
<td height="4" style="background-color:#000000;"></td>
</tr>

<tr>
<td style="padding:40px 50px 0;">
<table width="100%">
<tr>
<td>
<img src="https://kamdardevelopments.com/assets/blacklogo.png" style="height:80px;width:auto;" />
</td>
<td align="right">
<span style="font-family:Arial;font-size:11px;font-weight:700;color:#cc0000;letter-spacing:1px;text-transform:uppercase;background:#fff1f0;padding:4px 10px;border-radius:4px;">
New Priority Lead
</span>
</td>
</tr>
</table>

<h1 style="margin:40px 0 10px;font-family:Helvetica,Arial,sans-serif;color:#111;font-size:28px;font-weight:300;">
Web Enquiry Received
</h1>

<p style="margin:0;font-family:Arial;color:#777;font-size:14px;">
A new prospect has submitted an interest form via the Kamdar digital gateway.
</p>
</td>
</tr>

<tr>
<td style="padding:40px 50px;">

<p style="font-family:Arial;font-size:12px;font-weight:700;color:#000;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #eee;padding-bottom:8px;">
Client Profile
</p>

<table width="100%" style="margin-bottom:40px;">
<tr>
<td style="padding:10px 0;">
<span style="font-size:11px;color:#999;text-transform:uppercase;">Full Name</span>
<div style="font-size:17px;color:#111;font-weight:500;">
${fullName || 'Unnamed Lead'}
</div>
</td>
</tr>

<tr>
<td style="padding:15px 0;">
<span style="font-size:11px;color:#999;text-transform:uppercase;">Email & Phone</span>
<div style="font-size:16px;color:#111;">
<a href="mailto:${email}" style="color:#000;text-decoration:none;border-bottom:1px solid #ccc;">
${email}
</a>
<span style="color:#ddd;margin:0 12px;">|</span>
${phone || 'No phone provided'}
</div>
</td>
</tr>
</table>

<p style="font-family:Arial;font-size:12px;font-weight:700;color:#000;text-transform:uppercase;letter-spacing:2px;border-bottom:1px solid #eee;padding-bottom:8px;">
Investment Requirements
</p>

<table width="100%" style="background:#fafafa;border-radius:6px;">
<tr>
<td width="33%" style="padding:20px;border-right:1px solid #eee;">
<span style="font-size:10px;color:#999;text-transform:uppercase;">Buyer Type</span>
<div style="font-size:14px;font-weight:600;">
${buyertype || '-'}
</div>
</td>

<td width="33%" style="padding:20px;border-right:1px solid #eee;">
<span style="font-size:10px;color:#999;text-transform:uppercase;">Preference</span>
<div style="font-size:14px;font-weight:600;">
${apttype || '-'}
</div>
</td>

<td width="33%" style="padding:20px;">
<span style="font-size:10px;color:#999;text-transform:uppercase;">Timeline</span>
<div style="font-size:14px;font-weight:600;">
${timeframe || '-'}
</div>
</td>
</tr>
</table>

<table width="100%" style="margin-top:50px;">
<tr>
<td align="center">
<a href="mailto:${email}" style="background:#000;color:#fff;padding:20px 45px;border-radius:4px;text-decoration:none;font-family:Arial;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;display:inline-block;">
Initiate Response
</a>


</td>
</tr>
</table>

</td>
</tr>

<tr>
<td style="padding:30px 50px;background:#111;">
<table width="100%">
<tr>
<td style="font-family:Arial;font-size:12px;color:#888;">
<strong style="color:#fff;">Lead Traceability:</strong><br/>
Timestamp: ${dateStr}<br/>
Source: kamdardevelopments.com/contact
</td>
<td align="right">
<img src="https://kamdardevelopments.com/assets/blacklogo.png" style="height:20px;filter:invert(1);opacity:.5;" />
</td>
</tr>
</table>
</td>
</tr>

</table>

<p style="margin-top:30px;font-family:Arial;font-size:11px;color:#999;text-transform:uppercase;letter-spacing:1px;">
Confidential Property of Kamdar Developments Group © ${new Date().getFullYear()}
</p>

</td>
</tr>
</table>

</body>
</html>
`
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({
      message: 'Failed to send email',
      error: error.message,
    });
  }
}
