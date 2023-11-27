import dotenv from 'dotenv';
import {NodeMailgun} from 'ts-mailgun';
import { Mail,User } from '../models/types';
import sgMail from '@sendgrid/mail';
import UserRepoInterface from '../repositories/userRepo.interface';
import NewEmail from '../repositories/emailRepo';

dotenv.config();
sgMail.setApiKey(process.env['SENDGRID_API_KEY'] as string);

const mg = new NodeMailgun();
mg.apiKey = process.env['MAILGUN_API_KEY'] as string;
mg.domain = process.env['MAILGUN_DOMAIN'] as string;
mg.fromEmail = process.env['MAILGUN_FROM_EMAIL'] as string;
mg.fromTitle = 'Sirius Challenge';
mg.init();

interface MailSender{
    sendMail(mail:Mail):Promise<boolean>;
}

class MailgunMailSender implements MailSender{
    async sendMail(mail: Mail): Promise<boolean> {
        try{
            await mg.send(mail.toEmail, mail.subject,mail.body);
            return true;
        } catch(err){
            return false;
        }
    }
}

class SendgridMailSender implements MailSender{
    async sendMail(mail:Mail): Promise<boolean>{
        try{
            const msg = {
                to: mail.toEmail,
                from: process.env['MAILGUN_FROM_EMAIL'] as string,
                subject: mail.subject,
                text: mail.body,
            };
            const res = await sgMail.send(msg);
            if(res[0].statusCode!==202) return false;
            return true;
        }catch(err){
            return false;
        }
    }
}


class MailContext{
    private sender: MailSender;

    constructor(sender: MailSender){
        this.sender = sender;
    }

    setSender(sender: MailSender){
        this.sender = sender;
    }

    async sendMail(mail:Mail): Promise<boolean>{
        return await this.sender.sendMail(mail);
    }
}

class HandleMailRequest{
    private mailContext: MailContext;
    userRepo: UserRepoInterface;


    constructor(mailContext: MailContext, userRepo:UserRepoInterface){
        this.mailContext = mailContext;
        this.userRepo = userRepo;
    }

    async handle(user:User, mail:Mail): Promise<Mail|{error: string}>{
        if(user&& user.emailQuota>=1000) return {error: 'QUOTA EXCEEDED'};
        let mailSent = await this.mailContext.sendMail(mail);
        if (!mailSent) this.mailContext.setSender(new SendgridMailSender());
        mailSent = await this.mailContext.sendMail(mail);
        if(!mailSent){
            return {error: 'Server error'};
        }
        await this.userRepo.emailQuotaUpdate(user.id,user.emailQuota + 1);
        const newEmailInstance = new NewEmail(this.userRepo)
        const res = await newEmailInstance.newMail(user,mail.toEmail, mail.subject, mail.body);
        if(res) return res;
        return {error: 'Server error'};
    }
}

export {MailgunMailSender, SendgridMailSender, MailContext}
export default HandleMailRequest;