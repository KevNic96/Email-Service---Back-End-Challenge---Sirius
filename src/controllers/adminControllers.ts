import express from 'express';
import adminService from '../services/adminServices';

const router = express.Router();

router.get('/stats', async(_req,res)=>{
    const stats = await adminService;
    if(stats!=undefined && stats.length === 0) return res.status(400).json({msg: 'Without users.'});
    if(stats==undefined) return res.status(500).json({error: 'Server error'});
    return res.status(200).json(stats);
})

export default router;