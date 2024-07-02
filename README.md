# How to run

git pull

MySQL is used for the database so have the following configuration

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'password',
    database: 'inshort',
    insecureAuth : true
  });

cd into the repository
Use these commands to run

npm i

nodemon index.js

# Features implemented

Signup and login:

Here I used JWT token for creating a token( this token can only be read and not modified) so the token contains email and isAdmin option this would say if the user with the given user
so both type of user would send the token on next use(if they are authenticated but only admin will be able to add a short)
![image](https://github.com/krishnan472003/workindia/assets/99252508/9cc86cc4-917b-4c18-a065-d841e77c424c)
