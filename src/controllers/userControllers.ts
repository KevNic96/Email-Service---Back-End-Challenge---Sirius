import express from 'express';
import userService from '../services/userServices';
import UserRepo from '../repositories/userRepo';

const router = express.Router();

const userRepo = new UserRepo();
const UserService = new userService(userRepo);

router.post('/register', async(req,res) =>{
    const {username,password,role,Name,LastName} = req.body;
    if(!username||!password||(role!==undefined && role !=='admin')||!Name||!LastName) return res.status(400).json({error: 'Missing data.'});
    const resp = await UserService.register(username, password, role ? role: 'user', Name, LastName);
    if(typeof resp === 'object' && 'error' in resp) return res.status(400).json(resp);
    return res.status(201).json(resp);
});

router.post('/login', async(req,res) =>{
    const {username, password} = req.body;
    if(!username ||!password) return res.status(400).json({error: 'Missing data'});
    const resp = await UserService.login(username,password);
    if(typeof resp === 'object' && 'error' in resp) return res.status(400).json(resp);
    return res.status(200).json(resp);
});

export default router;