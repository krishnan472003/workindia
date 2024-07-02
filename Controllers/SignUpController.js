import { Router } from "express"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connection } from "../index.js";

export const SignUpController = ()=>{
    const router = Router();
    
    router.post('/api/signup',async (req,res)=>{
        let receivedData = req.body;
        // const username = ;
        // const email = ;
        const password = receivedData.password;
        const isAdmin = {isAdmin: receivedData.isAdmin};
        const encryptedPwd = bcrypt.hash(password,10);
        const accessToken = jwt.sign(
            receivedData,
            'secret'
        );

        console.log(receivedData+" "+accessToken)

        let query = `INSERT INTO USER(username,password,email,accessToken) VALUES("${receivedData.username}","${password}","${receivedData.email}","${accessToken}")`

        connection.query(query,(err,result)=>{
            if(!err){
                console.log(result)
                res.json({
                    "status": "Account successfully created",
                     "status_code": 200,
                     "user_id": "123445"
                     })
            }
            else{
                console.log(err)
            }
        })

        // res.json(result)

        


    });
    return router
}