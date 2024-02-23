const express = require('express');
const mongoose = require('mongoose');

const dbAccess = 'mongodb+srv://polinaPavlova:BeoO5p0ItBHL7MJS@cluster0.b2ih9xt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(dbAccess)
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error));

const app = express();

const PORT = 5000;

app.get("/api", (req, res) => {
    res.json({
        "test": {
            "test1": "aaaa",
            "test2": "bbbb",
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});