import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepoInterface from '../repositories/userRepo.interface';
import {User} from '../models/types';

class userService{

    userRepo: UserRepoInterface;

    constructor(userRepo: UserRepoInterface){
        this.userRepo = userRepo;
    }


    async register(username:string,password:string, role: string,Name:string,LastName:string): Promise<User|{error:string}>{
        try{
            const user = await this.userRepo.getUserByUsername(username);
            if(user) return {error: 'Already existing user.'};
            const newUser = await this.userRepo.saveUser(
                username,
                password,
                role||'user',
                Name,
                LastName
            );
            if(!newUser) return {error: 'Server error.'};
            return newUser;
        }catch(err){
            return {error: 'Error de servidor'};
        }
    }

    async login(username:string,password:string): Promise <{error:string}|{token: string, user:User}>{
        try{
            const user = await this.userRepo.getUserByUsername(username);
            if(!user) return {error: 'User non existent.'};

            // const validPassword: boolean = await bcrypt.compare(password,user.password);
            // const isPasswordValid = await this.userRepo.verifyPassword(password,user.password);
            // if(!isPasswordValid){
            if(!password){
                return {error: 'Incorrect password.'};
            }

            const token = jwt.sign({id: user.id}, process.env['JWT_SECRET'] as string, {expiresIn:'1h'});
            return {token,user};
        }catch(err){
            return {error: 'Server error.'};
        }
    }
}

export default userService;