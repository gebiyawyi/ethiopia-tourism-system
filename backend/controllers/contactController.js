const nodemailer = require("nodemailer");

// ============================================
// ✅ SEND CONTACT EMAIL
// ============================================
const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log("📧 Contact form received:");
    console.log("📧 Name:", name);
    console.log("📧 Email:", email);
    console.log("📧 Subject:", subject);

    // ✅ Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // ✅ Check if credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("❌ Email credentials missing!");
      return res.status(500).json({
        success: false,
        message: "Email configuration error. Please try again later.",
      });
    }

    console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
    console.log("📧 EMAIL_PASSWORD exists:", !!process.env.EMAIL_PASSWORD);

    // ✅ Create transporter with more options
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // ✅ Verify connection
    await transporter.verify();
    console.log("✅ Email transporter verified successfully!");

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `📩 Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #1e3a5f, #b45309); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">📧 New Contact Message</h1>
          </div>
          <div style="padding: 20px; background: #ffffff; border-radius: 0 0 10px 10px;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <hr />
            <p style="font-size: 12px; color: #6b7280; text-align: center;">
              This message was sent from your Ethiopia Tourism website.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("❌ Contact email error:", error);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error code:", error.code);

    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};

// ============================================
// ✅ TEST EMAIL ENDPOINT
// ============================================
const testEmail = async (req, res) => {
  try {
    console.log("🧪 Testing email configuration...");
    console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
    console.log("📧 EMAIL_PASSWORD exists:", !!process.env.EMAIL_PASSWORD);

    // ✅ Check if credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return res.status(500).json({
        success: false,
        message: "Email credentials not set in environment variables",
      });
    }

    // ✅ Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // ✅ Verify connection
    await transporter.verify();
    console.log("✅ Email transporter verified!");

    // ✅ Send test email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "✅ Test Email - Ethiopia Tourism",
      text: "Your email configuration is working correctly!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #1e3a5f, #b45309); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">✅ Test Email</h1>
          </div>
          <div style="padding: 20px; background: #ffffff; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #374151;">Your email configuration is working correctly!</p>
            <p style="font-size: 16px; color: #374151;">You can now send emails from your contact form.</p>
            <hr />
            <p style="font-size: 12px; color: #6b7280; text-align: center;">
              This is a test email from your Ethiopia Tourism website.
            </p>
          </div>
        </div>
      `,
    });

    console.log("✅ Test email sent successfully!");

    res.status(200).json({
      success: true,
      message: "Test email sent successfully! Check your inbox.",
      details: {
        emailUser: process.env.EMAIL_USER,
        sentTo: process.env.EMAIL_USER,
      },
    });
  } catch (error) {
    console.error("❌ Test email error:", error);
    console.error("❌ Error message:", error.message);
    console.error("❌ Error code:", error.code);

    res.status(500).json({
      success: false,
      message: "Test failed: " + error.message,
      error: error.message,
    });
  }
};

// ============================================
// ✅ EXPORT BOTH FUNCTIONS
// ============================================
module.exports = {
  sendContactEmail,
  testEmail,
};
