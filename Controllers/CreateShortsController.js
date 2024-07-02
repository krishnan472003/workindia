import { Router } from "express"
import jwt from 'jsonwebtoken'
import { connection } from "../index.js";
export const CreateShortsController = ()=>{
    const router = Router();
    
    router.post('/api/shorts/create',(req,res)=>{
        const data = req.body.data
        const token = req.body.accessToken

        const decodedUser = jwt.verify(token, 'secret');

        let query = `select * from user where email like "${decodedUser.email} and accessToken Like "${decodedUser.accessToken}"`
        

        connection.query(query, function (err, result) {
            if (err) throw err;
            if (decodedUser.isAdmin) {
                let accessToken = jwt.sign({ email: result[0].email, isAdmin }, 'secret');
                let q = `insert into short
                values(
                "${data.category}",
                "${data.title}",
                "${data.author}",
                ${data.publish_date},
                "${data.content}",
                "${data.actual_content_link}",
                "${data.image}",
                ${data.votes.upvote},
                ${data.votes.downvote},
                )
                `
                connection.query(q, function (error, result) {
                    if (!error) {
                        res.json({
                             "message": "Short added successfully",
                             "short_id": "12345",
                             "status_code": 200
                            })
                    }
                })
            }
            else {
                res.json({
                    "status": "Incorrect username/password provided. Please retry",
                    "status_code": 401

                })
            }
        })

        
        // const data 

    });
    return router
}