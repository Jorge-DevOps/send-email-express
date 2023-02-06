const nodemailer = require("nodemailer");
const express = require("express");
const app = express();

app.use(express.json());

app.post("/send-email", (req, res) => {
  const body = req.body;

  const { to, subject, text } = body;

  if (!to || !text) {
    res
      .status(400)
      .send("Bad Request: Missing 'to' or 'text' property in request body");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: "jorgedevops20@gmail.com",
      pass: "iavgenqaouslfrag",
    },
  });
  const mailOptions = {
    from: "Remitente",
    to,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send(500, error.message);
    } else {
      console.log("Email sent");
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(3000, () => {
  console.log("App listening on port http");
});
