import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import moment from 'moment'

export class Mailer {

    private transporter
    private hbsConfig

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // generated ethereal user
                pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
        })

        this.hbsConfig = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: path.join(__dirname, '../../files/templates/'),
                layoutsDir: path.join(__dirname, '../../files/templates/'),
                defaultLayout: ''
            },
            viewPath: path.join(__dirname, '../../files/templates/'),
            extName: '.hbs'
        };
    }

    public async send(data) {

        let config = this.transporter.use('compile', hbs(this.hbsConfig))

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: data.subject,
            template: data.template,
            context: { data }
        }

        try {
            let sendEmail = await this.transporter.sendMail(mailOptions)
            return { ok: true }
        } catch (e) {
            console.log('Error mailer a las: ' + moment().format('YYYY-MM-DD HH:mm:ss') + ', ' + e)
            return { ok: false, error: e }
        }

    }
}