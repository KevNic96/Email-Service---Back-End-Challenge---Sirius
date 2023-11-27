import {prisma} from '../index';
import UserRepoInterface from './userRepo.interface';
import {User,Mail } from '../models/types';

class NewEmail{

userRepo:UserRepoInterface;

constructor(UserRepo:UserRepoInterface){
    this.userRepo=UserRepo;
}

async newMail(
    user:User,
    toEmail: string,
    subject: string,
    body: string,
):Promise <Mail|undefined>{
    try{
        const mail = await prisma.mail.create({
            data: {
                toEmail,
                subject,
                body,
                fromEmail: {connect:{id:user.id}},
            },
        });
        await this.userRepo.emailQuotaUpdate(user.id,user.emailQuota);
        return mail;
    }catch(err){
        console.error(err);
        return;
    }
};

}

export default NewEmail;