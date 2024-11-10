import express from "express";
import User from "../models/user.js"; 

const author = express();
author.use(express.json());

// Validation rules 
author.post("/",async (req, res) => {
        try {
            console.log("Incoming data:", req.body);
            const { Author, email, headline, Textcontent, Photos } = req.body; 
            console.log(req.body.Textcontent);
            const newUser = new User({
                Author,
                email,
                headline,
                Textcontent,
                Photos  
            });

            await newUser.save();
            res.status(201).json({ message: "User submitted successfully", user: newUser });
        } catch (error) {
            res.status(500).json({ error: "Error submitting user", details: error });
        }
    }
);

// GET route for users
author.get('/', async (req, res) => {
    try {
        const users = await User.find({verified: false});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users', error: err });
    } 
});

// DELETE route for deleting a user by Author name
author.delete('/:author', async (req, res) => {
    const authorName = req.params.author; 
    try {
        const deletedUser = await User.findOneAndDelete({ Author: authorName });
        res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user', error: err });
    }
});
author.get('/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const users = await User.find({email: email});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving users', error: err });
    } 
});

export default author;
