import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from "nodemailer";

export class MailtrapProvider implements IMailProvider {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_TRAP_HOST_SMTP,
            port: process.env.MAIL_TRAP_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_TRAP_AUTH_USER,
                pass: process.env.MAIL_TRAP_AUTH_PASS
            }
        } as nodemailer.TransportOptions)
  }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email,
            },
            from:{
                name: message.from.name,
                address: message.from.email,
            },
            subject: message.subject,
            html: message.body
        })
    }
}