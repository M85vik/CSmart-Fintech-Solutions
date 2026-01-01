const {sendEmail} = require('./emailService.js');

(async () => {
  try {
    const response = await sendEmail({
      to: ["vikas.sharma0b@gmail.com"],
      subject: "Verify Team",
      html: "<h2>Email sent successfully 🚀</h2>",
      text: "From our Team someone will contact soon...",
    });

    console.log("Email service response:", response?.data);
  } catch (error) {
    console.error("Email failed:", error.response?.data || error.message);
  }
})();