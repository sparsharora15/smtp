const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.post("/sendmail", async (req, res) => {
  try {
    const { subject, desc } = req.body;
    if (subject === "" && desc === "") {
      return res.send({
        status: 403,
        message: "Empty strings are not allowed",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "arorasparsh28@gmail.com",
      subject,
      text: desc,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ status: 200, message: "Email sent successfully." });
  } catch (error) {
    console.log(error);
    res.status(404).send("Error sending email:");
  }
});

app.listen(port, () => {
  console.log("connected to view port " + port);
});
