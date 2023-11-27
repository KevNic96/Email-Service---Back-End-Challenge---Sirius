import { User,UserStats } from "../models/types";

interface UserRepoInterface{
    saveUser(
        username:string,
        password: string,
        role:string,
        Name: string,
        LastName: string,
    ):Promise <User|undefined>

    // verifyPassword(password: string, hashedPassword: string): Promise<boolean>;

    getUserById(id:number):Promise<User|null|undefined>

    getUserByUsername(username: string): Promise<User|null|undefined>

    getUserStats():Promise<UserStats[]|undefined>

    emailQuotaUpdate(id:number|undefined,newQuota:number|undefined):Promise <User|null|undefined>

}

export default UserRepoInterface;