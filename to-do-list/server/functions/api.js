const express = require('express');
const cors = require("cors");
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const Post = require('./models/post');

const dbAccess = 'mongodb+srv://polinaPavlova:BeoO5p0ItBHL7MJS@cluster0.b2ih9xt.mongodb.net/node-to-do-list?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(dbAccess)
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error));

const app = express();
const router = express.Router();

const corsOptions ={
    origin:'*',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}


const PORT = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

router.get('/', (req, res) => {
    res.send("Hellow world");
});

router.post("/add-post", (req, res, next) => {
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

router.post("/update-post", (req, res, next) => {
    const { id, title, content, categories } = req.body;
    Post.findByIdAndUpdate(id, { title, content, categories })
        .then((post) => res.send(post))
        .catch((error) => res.send(error));
})

router.get("/read-post/:id", (req, res, next) => {
    Post
        .findById(req.params.id)
        .then((post) => res.send(post))
        .catch((error) => res.send(error));
});

router.get("/post-list/:searchString?/:searchType?", (req, res, next) => {
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

router.post("/post-delete", (req, res, next) => {
    const { id } = req.body;
    Post.findByIdAndDelete(id)
        .then((post) => res.send(post))
        .catch((error) => res.send(error));
});

app.use('/api/', router);

module.exports.handler = serverless(app);