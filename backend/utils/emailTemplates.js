

// Customer Confirmation  (Enquiry related to services)

function buildCustomerConfirmationHTML({ name, service }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      background: #ffffff;
      margin: auto;
      padding: 24px;
      border-radius: 8px;
    }
    h2 {
      color: #1f2937;
    }
    p {
      color: #374151;
      line-height: 1.6;
    }
    .footer {
      margin-top: 24px;
      font-size: 13px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Thank You for Contacting Us</h2>

    <p>Dear ${name},</p>

    <p>
      Thank you for reaching out to us regarding <strong>${service}</strong>.
      We have received your request and one of our representatives will contact you shortly.
    </p>

    <p>
      Our team is committed to helping you make informed financial decisions and will be happy
      to assist you with your enquiry.
    </p>

    <p>
      If you need immediate assistance, please feel free to reply to this email.
    </p>

    <div class="footer">
      Warm regards,<br />
      <strong>Your Fintech Team</strong><br />
      Trusted Financial Solutions
    </div>
  </div>
</body>
</html>
`;
}





// Team (Customer Enquiry)

function buildInternalLeadHTML({ name, email, phone, service, message }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      background: #ffffff;
      margin: auto;
      padding: 24px;
      border-radius: 8px;
    }
    h2 {
      color: #1f2937;
    }
    .row {
      margin-bottom: 10px;
    }
    .label {
      font-weight: bold;
      color: #374151;
    }
    .value {
      color: #111827;
    }
    .footer {
      margin-top: 20px;
      font-size: 13px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>📞 New Callback Enquiry</h2>

    <p>A new customer enquiry has been received.</p>

    <div class="row"><span class="label">Name:</span> <span class="value">${name}</span></div>
    <div class="row"><span class="label">Email:</span> <span class="value">${email}</span></div>
    <div class="row"><span class="label">Phone:</span> <span class="value">${phone}</span></div>
    <div class="row"><span class="label">Service:</span> <span class="value">${service}</span></div>
    <div class="row"><span class="label">Message:</span> <span class="value">${message}</span></div>

    <div class="footer">
      Please contact the customer as soon as possible.
    </div>
  </div>
</body>
</html>
`;
}

module.exports = {
  buildCustomerConfirmationHTML,
  buildInternalLeadHTML
};