import { Request,Response,NextFunction } from 'express';
import UserRepoInterface from '../repositories/userRepo.interface';
import jwt, {JwtPayload} from 'jsonwebtoken';

class AuthMiddleware{
    userRepo: UserRepoInterface;

    constructor(userRepo:UserRepoInterface){
        this.userRepo=userRepo;
    }

    async userAuth(req: Request, res:Response, next: NextFunction):Promise <Response|void>{
        const token = req.headers['auth_token'] as string;
        if(!token) return res.status(401).json({error: 'Auth token required.'});
        try{
            const decoded = jwt.verify(token, process.env['JWT_SECRET'] as string) as JwtPayload;
            const user = await this.userRepo.getUserById(parseInt(decoded['id']));
            if(!user)
                return res
                    .status(404)
                    .json({error:'AUTH ERROR. User not found'});
            res.locals['user'] = user;
            return next();
        } catch(err){
            return res.status(401).json({error: err});
        }
    };

    async adminAuth(req:Request, res:Response, next: NextFunction): Promise <Response|void>{
        const token = req.headers['auth_token'] as string;
        if(!token) return res.status(401).json({error: 'Auth token REQUIRED.'});
        try{
            const decoded = jwt.verify(token, process.env['JWT_SECRET'] as string) as JwtPayload;
            const user = await this.userRepo.getUserById(parseInt(decoded['id']));
            if(!user)
                return res
                    .status(404)
                    .json({error: 'AUTH ERROR. User not found'});
            if(user.role!=='admin'){
                return res.status(403).json({
                    error: 'AUTH ERROR. User is not ADMIN',
                });
            }
            res.locals['user'] = user;
            return next();
        } catch(err){
            return res.status(401).json({error: err});
        }
    }

}

export default AuthMiddleware;
