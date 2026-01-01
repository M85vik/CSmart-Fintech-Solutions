// const axios = require('axios');
// const dotenv = require('dotenv');
// const path = require("path");
// dotenv.config({ path: path.resolve(__dirname, "../.env") });
// const UNOSEND_API_URL = "https://www.unosend.co/api/v1/emails";

// const UNOSEND_API_KEY=process.env.UNOSEND_API_KEY
// const FROM_EMAIL=process.env.FROM_EMAIL;


// if(!UNOSEND_API_KEY) throw new Error("Email Service Environment Variable Not Loaded...");
// if(!FROM_EMAIL) throw new Error("Sender Email not loaded...");

//  async function sendEmail({ to, subject, html, text }) {
//   try {

    
//     const response = await axios.post(
//       UNOSEND_API_URL,
//       {
//         from:FROM_EMAIL,
//         to,
//         subject,
//         html,
//         text,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${UNOSEND_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log("Log From Send Email : ", subject, response);
    
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Email send failed:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// }


// module.exports = sendEmail




// // utils/emailService.js
// const { Resend } = require('resend')
// const dotenv = require('dotenv');
// const path = require("path");
// dotenv.config({ path: path.resolve(__dirname, "../.env") }); 
// const resend = new Resend(process.env.RESEND_API_KEY);

// async function sendEmail({ to, subject, html }) {
//   try {
//     const response = await resend.emails.send({
//       from: "Verity by CSmart <no-reply@vikasharma.online>",
//       to,
//       subject,
//       html,
//     });
//     console.log("Response from Resend API received."); 

//     // --- THIS IS THE CRITICAL FIX ---
//     // If the response object from Resend contains an error property, it failed.
//     if (response.error) {
      
//       throw new Error(response.error.message); 
//     }
     
//     // On success, just return the data part.
//     return response.data;
//   } catch (error) {
//     // This will now catch both network errors and the error we just threw.
//     console.error("sendEmail function failed:", error.message);
//     // Rethrow to ensure the promise is rejected so the route handler knows it failed.
//     throw error;
//   }
// }

// module.exports = { sendEmail };


// utils/emailService.js
const { Resend } = require("resend");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail({ to, subject, html }) {
  try {
    const data = await resend.emails.send({
      from: "Verity by CSmart <no-reply@vikasharma.online>",
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", data.id);
    return data;
  } catch (error) {
    console.error("sendEmail failed:", error.message);
    throw error; // important so API caller knows it failed
  }
}

module.exports =sendEmail;

