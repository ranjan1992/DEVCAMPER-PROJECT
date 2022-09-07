const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '30579383b9f35d',
      pass: '460b96cd73b2e4',
    },
  });
  const message = {
    from: 'ranjan <verma.ranjan62@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transport.sendMail(message);

  console.log('Message sent : %s', info.messageId);
};
module.exports = sendEmail;
