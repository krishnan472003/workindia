import { Router } from "express";
import { connection } from '../index.js'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
export const LoginController = () => {
    const router = Router();

    router.post('/api/login', (req, res) => {

        let receivedData = req.body;

        // let username = receivedData.username;
        let email = receivedData.email;
        let password = receivedData.password;
        let isAdmin = receivedData.isAdmin;

        let query = `select * from user where email like "${email}"`
        let queryRes;
        connection.query(query, function (err, result) {
            if (err) throw err;
            if (bcrypt.compare(password, result[0].password)) {
                let accessToken = jwt.sign({ email: result[0].email, isAdmin }, 'secret');
                let q = `UPDATE user accessToken = "${accessToken}" WHERE email Like "${email}"`
                connection.query(q, function (error, result) {
                    if (!error) {
                        res.json({
                            "status": "Login successful",
                            "status_code": 200,
                            "user_id": "12345",
                            "access_token": accessToken


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

    })
        return router
    }