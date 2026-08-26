const nodemailer = require("nodemailer");

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    console.log("📧 Contact form received:");
    console.log("📧 Name:", name);
    console.log("📧 Email:", email);
    console.log("📧 Subject:", subject);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("❌ Email credentials missing!");
      return res.status(500).json({
        success: false,
        message: "Email configuration error. Please try again later.",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

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

    let userMessage = "Failed to send message. Please try again later.";
    if (error.code === "EAUTH") {
      userMessage = "Email authentication failed. Please contact support.";
    } else if (error.code === "ECONNECTION") {
      userMessage = "Cannot connect to email server. Please try again later.";
    }

    res.status(500).json({
      success: false,
      message: userMessage,
    });
  }
};

const testEmail = async (req, res) => {
  try {
    console.log("🧪 Testing email configuration...");
    console.log("📧 EMAIL_USER:", process.env.EMAIL_USER);
    console.log("📧 EMAIL_PASSWORD exists:", !!process.env.EMAIL_PASSWORD);

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return res.status(500).json({
        success: false,
        message: "Email credentials not set in environment variables",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.verify();
    console.log("✅ Email transporter verified!");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "✅ Test Email - Ethiopia Tourism",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #1e3a5f, #b45309); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">✅ Test Email</h1>
          </div>
          <div style="padding: 20px; background: #ffffff; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #374151;">Your email configuration is working correctly!</p>
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
    });
  } catch (error) {
    console.error("❌ Test email error:", error.message);
    res.status(500).json({
      success: false,
      message: "Test failed: " + error.message,
    });
  }
};

module.exports = { sendContactEmail, testEmail };
