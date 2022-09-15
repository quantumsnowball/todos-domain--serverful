import nodemailer from 'nodemailer'
import dotenv from 'dotenv'


dotenv.config()


const HOST = 'http://localhost:8888'
const EMAIL_USERNAME = process.env.EMAIL_USERNAME
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD


const transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  // secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  /* tls: {
    ciphers: 'SSLv3'
  }, */
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD
  }
})


export const sendActivationEmail = async (email: string, activationToken: string) => {
  const activateUrl = `${HOST}/api/activate?email=${email}&activationToken=${activationToken}`
  const info = await transport.sendMail({
    from: `"Activation Service - Quantum Snowball" <${EMAIL_USERNAME}>`,
    to: email,
    subject: 'Activation: Todos - Quantum Snowball',
    text: activateUrl,
    html: `<h1>Please click the link to activate your account.</h1><p><a href="${activateUrl}">${activateUrl}</a></p>`
  })
  console.log(info)
}

