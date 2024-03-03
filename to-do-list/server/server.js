const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const chalk = require('chalk');
const mongooseDelete = require('mongoose-delete');
const Post = require('./models/post');

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log(successMsg('Database connected')))
    .catch((error) => console.log(errorMsg(error)));

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/add-post", (req, res, next) => {
    const { title, content, categories } = req.body;
    //const categories = categoriesReq.split(' ');
    const post = new Post({
        title,
        content,
        categories
    });
    post.save()
        .then(() => res.send(post))
        .catch((error) => res.send(error));
})

app.post("/update-post", (req, res, next) => {
    const { id, title, content, categories } = req.body;
    Post.findByIdAndUpdate(id, { title, content, categories })
        .then((post) => res.send(post))
        .catch((error) => res.send(error));
})

app.get("/read-post/:id", (req, res, next) => {
    Post
        .findById(req.params.id)
        .then((post) => res.send(post))
        .catch((error) => res.send(error));
});

app.get("/post-list/:searchString?/:searchType?", (req, res, next) => {
    const searchString = req.params?.searchString;
    const searchType = req.params?.searchType;
    const filter = !searchType || !searchString
        ? undefined
        : {
            '$or': [
                { [searchType]: {'$regex': searchString, '$options': 'i'}}
            ]
        };
    if (!filter) {
        return Post
            .find()
            .then((posts) => res.send(posts))
            .catch((error) => res.send(error));
    }
    Post
        .find(filter)
        .then((posts) => res.send(posts))
        .catch((error) => res.send(error));
});

app.post("/post-delete", (req, res, next) => {
    const { id } = req.body;
    Post.findByIdAndDelete(id)
        .then((post) => res.send(post))
        .catch((error) => res.send(error));
});

app.listen(process.env.PORT, (error) => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`Server started on port ${process.env.PORT}`));
});