import nodemailer from 'nodemailer'
import nunjucks from 'nunjucks'
import TokenService from './TokenService'
import emailVerification from '@/templates/email-verification'
import passwordReset from '@/templates/password-reset'

const SERVICE_EMAIL_ADDRESS = process.env.SERVICE_EMAIL_ADDRESS
const SERVICE_EMAIL_PASSWORD = process.env.SERVICE_EMAIL_PASSWORD
const SERVICE_EMAIL_HOST = process.env.SERVICE_EMAIL_HOST
const SERVICE_EMAIL_PORT = process.env.SERVICE_EMAIL_PORT
const SERVER_ADDRESS = process.env.SERVER_ADDRESS

if (!SERVICE_EMAIL_ADDRESS) throw new Error('SERVICE_EMAIL_ADDRESS not found')
if (!SERVICE_EMAIL_PASSWORD) throw new Error('SERVICE_EMAIL_PASSWORD not found')
if (!SERVICE_EMAIL_HOST) throw new Error('SERVICE_EMAIL_HOST not found')
if (!SERVICE_EMAIL_PORT) throw new Error('SERVICE_EMAIL_PORT not found')
if (!SERVER_ADDRESS) throw new Error('SERVER_ADDRESS not found')

nunjucks.configure('templates', { autoescape: true })

const MailService = {
  async sendVerificationEmail(email: string, user: string, userId: number) {
    try {
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

      var mailOptions = {
        from: `"AniBay" ${SERVICE_EMAIL_ADDRESS}`,
        to: email,
        name: 'AniBay Service',
        subject: 'Email verification',
        html: nunjucks.renderString(emailVerification, {
          user,
          serverAddress: SERVER_ADDRESS,
          url: `${SERVER_ADDRESS}/auth/verification?token=${token}`,
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
    try {
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

      var mailOptions = {
        from: `"AniBay" ${SERVICE_EMAIL_ADDRESS}`,
        to: email,
        name: 'AniBay Service',
        subject: 'Password reset',
        html: nunjucks.renderString(passwordReset, {
          serverAddress: SERVER_ADDRESS,
          url: `${SERVER_ADDRESS}/account/password-reset?token=${token}`,
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
