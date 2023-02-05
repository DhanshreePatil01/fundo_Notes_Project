const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const CLIENT_ID = '287808356118-92u5d6e6cp9ph5635qtcenjpasvu8348.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04qOft-SCh1i9CgYIARAAGAQSNwF-L9IrGKRH3bUFBLpP7ebu3HaqN1wF4B2VT4DyQbpbcz5iOhDIvitvdPJ51icbCuz21PYImkE';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendMail(email, token) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'patildhanshrees6112@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const mailOptions = {
      from: 'Dhanshree Patil <patildhanshrees6112@gmail.com>',
      to: email,
      subject: 'Hello from gmail using API',
      text: 'Hello from dhanshree email using API',
      html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/${token}">click here</a></h1>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
