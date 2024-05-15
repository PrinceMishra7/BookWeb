const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');
require('../config/passjwt');

router.get('/', (req, res) => {
    console.log("In the page");
    res.send("Welcome to the page from auth.js");
});

router.get('/authenticate', passport.authenticate('jwt', { session: false }), async (req, res) => {
    if (req.user == null) {
        res.status(400).send({message:"AUTHORIZATION FAILED",success:false});
    }
    else {
        res.status(200).send({message:"Login successful",success:true});
    }
})

router.post('/login', async (req, res) => {
    try {
        console.log(req.body)
        const { username, password } = req.body;
        console.log(username, password);
        if (!username || !password) {
            return res.status(422).send({ message: "Please fill the data" });
        }
        if(username != 'tpcadmin')
        {
            return res.status(422).send({ message: "Invalid Username" });
        }
        if(password != 'tpcadmin@123')
        {
            return res.status(422).send({ message: "Invalid Credentials" });
        }
        if (username =='tpcadmin' && password == 'tpcadmin@123') {

            const payload = {
                id: username
            }

            const token = jwt.sign(payload,'PROJECTFORBOOKWEBANDTPC', { expiresIn: "1d" })
            res.status(200).send({
                success: true,
                message: "Logged in successfully!",
                token: "Bearer " + token
            })
        }
        else {
            return res.status(500).send({ message: "Unsuccessful" });
        }

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;