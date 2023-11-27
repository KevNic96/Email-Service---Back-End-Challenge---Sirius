import UserRepoInterface from "../repositories/userRepo.interface";
import { UserStats } from "../models/types";

class adminService{
    userRepo: UserRepoInterface;

    constructor(userRepo: UserRepoInterface){
        this.userRepo = userRepo;
    }
    
    async getStats():Promise<UserStats[]|undefined>{
        const data = await this.userRepo.getUserStats();
        return data;
    }
}

export default adminService;