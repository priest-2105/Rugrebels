/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

exports.sendEmail = functions.https.onRequest((req, res) => {
  const { to, subject, text } = req.body;

  const msg = {
    to,
    from: 'your-email@example.com', // Your verified email address in SendGrid
    subject,
    text,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.send('Email sent!');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error sending email');
    });
});
