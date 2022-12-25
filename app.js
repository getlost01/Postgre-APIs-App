import express from "express";
import * as dotenv from 'dotenv'; 
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(process.env.PORT || 5008, function(){
    console.log("➡️ Postgre APIs App listening on port %d in %s mode 👍", this.address().port, app.settings.env);
});

// User APIs 
import users from "./APIs/user.js"
app.post('/api/signup', users.signup);
app.post('/api/login', users.login);
app.get('/api/users/all', users.showUsers);
app.get('/api/users/:id', users.userById);




