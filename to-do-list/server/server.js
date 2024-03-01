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
        .catch((error) => next(error));
})

app.post("/update-post", (req, res, next) => {
    const { id, title, content, categories } = req.body;
    Post.findByIdAndUpdate(id, { title, content, categories })
        .then((post) => res.send(post))
        .catch((error) => next(error));
})

app.get("/read-post/:id", (req, res, next) => {
    Post
        .findById(req.params.id)
        .then((post) => res.send(post))
        .catch((error) => next(error));
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
            .catch((error) => next(error));
    }
    Post
        .find(filter)
        .then((posts) => res.send(posts))
        .catch((error) => next(error));
});

app.post("/post-delete", (req, res, next) => {
    const { id } = req.body;
    Post.findByIdAndDelete(id)
        .then((post) => res.send(post))
        .catch((error) => next(error));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});