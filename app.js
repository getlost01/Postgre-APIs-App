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
import users from "./APIs/user.js";
app.post('/api/signup', users.signup);
app.post('/api/login', users.login);
app.get('/api/users/all', users.showUsers);
app.get('/api/users/:id', users.userById);

// Post APIs
import posts from "./APIs/post.js";
app.get('/api/posts', posts.showPosts);
app.post('/api/posts', posts.createPost);
app.get('/api/posts/:id', posts.postsById);
app.put('/api/posts/:id', posts.updatePost);
app.delete('/api/posts/:id', posts.deletePost);
app.post('/api/like/:id', posts.like);
app.post('/api/dislike/:id', posts.dislike);

// Comment APIs
import comments from "./APIs/comments.js";
app.post('/api/comment', comments.createComment);
app.get('/api/comment/:id', comments.getComment);
app.get('/api/comment/all/:id', comments.getAllComments);
app.put('/api/comment/:id', comments.updateComments);
app.delete('/api/comment/:id', comments.deleteComment);

app.get("*", (req, res) => { res.send(`{<br>
    &nbsp;<strong>error</strong>: 404 ,<br>
    &nbsp;<strong>msg</strong>:  Welcome to this app, please visit docs for more details regards these APIs ,<br>
    &nbsp;<strong>docs</strong>: "<a href="https://documenter.getpostman.com/view/25076245/2s8Z6vaEwE">https://documenter.getpostman.com/view/25076245/2s8Z6vaEwE" <br>
    }`) });

