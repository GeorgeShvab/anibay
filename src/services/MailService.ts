import nodemailer from 'nodemailer'
import nunjucks from 'nunjucks'
import TokenService from './TokenService'
import path from 'path'

const SERVICE_EMAIL_ADDRESS = process.env.SERVICE_EMAIL_ADDRESS
const SERVICE_EMAIL_PASSWORD = process.env.SERVICE_EMAIL_PASSWORD
const SERVICE_EMAIL_HOST = process.env.SERVICE_EMAIL_HOST
const SERVICE_EMAIL_PORT = process.env.SERVICE_EMAIL_PORT

if (!SERVICE_EMAIL_ADDRESS) throw new Error('SERVICE_EMAIL_ADDRESS not found')
if (!SERVICE_EMAIL_PASSWORD) throw new Error('SERVICE_EMAIL_PASSWORD not found')
if (!SERVICE_EMAIL_HOST) throw new Error('SERVICE_EMAIL_HOST not found')
if (!SERVICE_EMAIL_PORT) throw new Error('SERVICE_EMAIL_PORT not found')

nunjucks.configure('templates', { autoescape: true })

const MailService = {
  async sendVerificationEmail(email: string, user: string, userId: number) {
    const token = TokenService.generateToken()

    await TokenService.saveToken(email, token, userId)

    const transporter = nodemailer.createTransport({
      host: SERVICE_EMAIL_HOST,
      port: Number(SERVICE_EMAIL_PORT),
      secure: false,
      auth: {
        user: SERVICE_EMAIL_ADDRESS,
        pass: SERVICE_EMAIL_PASSWORD,
      },
    })

    try {
      var mailOptions = {
        from: '"AniBay Service" anibay.service@hotmail.com',
        to: email,
        name: 'AniBay Service',
        subject: 'Email verification',
        html: nunjucks.render('email-verification.html', {
          user,
          serverAddress: process.env.SERVER_ADDRESS,
          url: `${process.env.SERVER_ADDRESS}/auth/verification?token=${token}`,
        }),
        text: 'Email verification',
      }

      transporter.sendMail(mailOptions, (error: unknown, info: unknown) => {
        if (error) {
          console.log('Error. An email has not been sent.')
          console.log(error)
        }
      })
    } catch (e) {
      console.log(e)
    }
  },

  async sendPasswordResetEmail(email: string, userId: number) {
    const token = TokenService.generateToken()

    await TokenService.saveToken(email, token, userId)

    const transporter = nodemailer.createTransport({
      host: SERVICE_EMAIL_HOST,
      port: Number(SERVICE_EMAIL_PORT),
      secure: false,
      auth: {
        user: SERVICE_EMAIL_ADDRESS,
        pass: SERVICE_EMAIL_PASSWORD,
      },
    })

    try {
      var mailOptions = {
        from: '"AniBay Service" anibay.service@hotmail.com',
        to: email,
        name: 'AniBay Service',
        subject: 'Password reset',
        html: nunjucks.render('password-reset.html', {
          serverAddress: process.env.SERVER_ADDRESS,
          url: `${process.env.SERVER_ADDRESS}/account/password-reset?token=${token}`,
        }),
        text: 'Password reset',
      }

      transporter.sendMail(mailOptions, (error: unknown, info: unknown) => {
        if (error) {
          console.log('Error. An email has not been sent.')
          console.log(error)
        }
      })
    } catch (e) {
      console.log(e)
    }
  },
}

export default MailService
