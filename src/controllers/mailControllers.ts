import express from 'express';
import { MailgunMailSender, MailContext } from '../services/mailServices';
import HandleMailRequest from '../services/mailServices';
import { Mail } from '../models/types';
import UserRepo from '../repositories/userRepo';

const router = express.Router();

router.post('/send', async(req,res)=>{
    const {toEmail,subject,body} = req.body;
    const user = res.locals['user'];
    if(!toEmail||!subject||!body) return res.status(400).json({error: 'Fields error'});

    const mailService = new HandleMailRequest(new MailContext(new MailgunMailSender()),new UserRepo);
    const resolve = await mailService.handle(user,{fromEmailId:user.id, toEmail, subject,body} as Mail)
    if('error' in resolve ) return res.status(400).json(resolve);
    return res.status(200).json(resolve);

});

export default router;