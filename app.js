const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
const createPath = (page) => path.join(__dirname, "front_views", `${page}.ejs`);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

const mongoose = require('mongoose');
const Post = require("./postModel");
const Registration = require("./userModel");

const db = process.env.MONGODB_URL || "";

app.get("/", (req, res) => {
    Post.find()
        .then((posts) => res.render(createPath("eventsPage"), { posts }))
        .catch((error) => console.log("Finding error! ", error));
});

app.get("/registration/:id", (req, res) => {
    const postId = req.params.id;
    Post.findById(postId)
        .then(post => res.render(createPath("registrationPage"), { post }))
        .catch(error => console.log("Finding error! ", error));
});

app.post("/register/:id", (req, res) => {
    const eventId = req.params.id;
    const { name, email, birthday } = req.body;

    const registration = new Registration({
        name,
        email,
        birthday,
        eventId,
    });

    registration.save()
        .then(() => res.redirect(`/registrations/${eventId}`))
        .catch(error => res.status(400).send(error.message));
});



app.get("/registrations/:eventId", (req, res) => {
    const eventId = req.params.eventId;

    Promise.all([
        Post.findById(eventId),
        Registration.find({ eventId })
    ])
        .then(([post, registrations]) => {
            res.render(createPath("eventUsersPage"), { post, registrations });
        })
        .catch(error => console.log("Finding error! ", error));
});





async function start() {
    try {
        await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`Connection to MongoDB is successful!`);
        app.listen(PORT, () => {
            console.log(`Server is listening on PORT ${PORT}...`);
        });
    } catch (error) {
        console.log(" \n Connection error!!! \n\n", error);
    }
}

start();
