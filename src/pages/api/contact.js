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
        <div style="background:#f7f7f7;padding:30px;font-family:Arial,sans-serif;">
          <div style="max-width:640px;margin:auto;background:#fff;border-radius:14px;padding:32px;box-shadow:0 8px 24px rgba(0,0,0,0.08);">
     <div style="text-align:center;margin-bottom:28px;">
              <img src="https://kamdardevelopments.com/assets/blacklogo.png" alt="Kamdar Logo" style="height:55px;width:145px;display:inline-block;margin:0 auto;" />
              <h2 style="margin:24px 0 0;color:#000;font-size:27px;font-weight:700;">New Contact Form Submission</h2>
            </div>


            <table style="width:100%;border-collapse:collapse;font-size:15px;color:#333;">
              <tr>
                <td style="padding:10px 0;font-weight:600;">Name</td>
                <td style="padding:10px 0;">${fullName || '-'}</td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:10px 0;font-weight:600;">Email</td>
                <td style="padding:10px 0;">${email}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:600;">Phone</td>
                <td style="padding:10px 0;">${phone || '-'}</td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:10px 0;font-weight:600;">Buyer Type</td>
                <td style="padding:10px 0;">${buyertype || '-'}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;font-weight:600;">Buying Timeframe</td>
                <td style="padding:10px 0;">${timeframe || '-'}</td>
              </tr>
              <tr style="background:#fafafa;">
                <td style="padding:10px 0;font-weight:600;">Apartment Type</td>
                <td style="padding:10px 0;">${apttype || '-'}</td>
              </tr>
              ${
                areyou
                  ? `
                <tr>
                  <td style="padding:10px 0;font-weight:600;">Are You</td>
                  <td style="padding:10px 0;">${areyou}</td>
                </tr>
              `
                  : ''
              }
            </table>

            <div style="text-align:center;margin-top:32px;">
              <a href="mailto:${email}"
                 style="background:#000;color:#fff;padding:12px 26px;border-radius:8px;text-decoration:none;font-weight:600;">
                Reply to Enquiry
              </a>
            </div>

            <div style="margin-top:36px;text-align:center;font-size:12px;color:#999;border-top:1px solid #eee;padding-top:16px;">
              © ${new Date().getFullYear()} Kamdar Developments
            </div>
          </div>
        </div>
      `,
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
