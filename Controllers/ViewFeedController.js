import { Router } from "express"

export const ViewFeedController = ()=>{
    const router = Router();
    
    router.get('/api/shorts/feed',(req,res)=>{
        
    });
    return router
}