// index.ts
import express from "express";
// import cors from "cors";
import bodyParser from "body-parser";
import mysql from 'mysql'
import { CreateShortsController } from "./Controllers/CreateShortsController.js";
import { FilterShortsController } from "./Controllers/FilterShortsController.js";
import { LoginController } from "./Controllers/LoginController.js";
import { SignUpController } from "./Controllers/SignUpController.js";
import { ViewFeedController } from "./Controllers/ViewFeedController.js";


const app = express();

// app.use(
//   cors({
//     origin: "*",
//     allowedHeaders:["Authorization",'Content-Type'],
//     exposedHeaders:["Authorization",'Content-Type']

//   })
// );

const port = 3000



app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// app.use("/api", AuthModule());

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'password',
    database: 'inshort',
    insecureAuth : true
  });
  
  // open the MySQL connection
  connection.connect(error => {
      if (error){
          console.log("A error has been occurred "
              + "while connecting to database.");        
          throw error;
      }
      else{
        console.log("DB connection successful");    
      }
    }
    )

    app.use('/',SignUpController()); //post
    app.use('/',LoginController()); //post
    app.use('/',CreateShortsController()); //post
    app.use('/',ViewFeedController()); // get
    app.use('/',FilterShortsController());// get  


app.listen(port, () => {
  console.log("Listening on port " + port);
})