const axios = require('axios');
const dotenv = require('dotenv');
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const UNOSEND_API_URL = "https://www.unosend.co/api/v1/emails";

const UNOSEND_API_KEY=process.env.UNOSEND_API_KEY
const FROM_EMAIL=process.env.FROM_EMAIL;


if(!UNOSEND_API_KEY) throw new Error("Email Service Environment Variable Not Loaded...");
if(!FROM_EMAIL) throw new Error("Sender Email not loaded...");

 async function sendEmail({ to, subject, html, text }) {
  try {

    
    const response = await axios.post(
      UNOSEND_API_URL,
      {
        from:FROM_EMAIL,
        to,
        subject,
        html,
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${UNOSEND_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Log From Send Email : ", subject, response);
    
    return response.data;
  } catch (error) {
    console.error(
      "Email send failed:",
      error.response?.data || error.message
    );
    throw error;
  }
}


module.exports = sendEmail
