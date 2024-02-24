const express = require('express');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Post = require('./models/post');

const dbAccess = 'mongodb+srv://polinaPavlova:BeoO5p0ItBHL7MJS@cluster0.b2ih9xt.mongodb.net/node-to-do-list?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(dbAccess)
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error));

const app = express();

const PORT = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/add-post", (req, res) => {
    const { title, content, categories: categoriesReq } = req.body;
    const categories = categoriesReq.split(' ');
    console.log(categories);
    const post = new Post({
        title,
        content,
        categories
    });
    post.save();
})

app.get("/post-list", (req, res) => {
    Post
        .find()
        .then((posts) => res.send(posts));
});

app.post("/post-delete", (req, res) => {
    const { id: _id } = req.body;
    Post.deleteOne({ _id }).then(() => res.send(true));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});