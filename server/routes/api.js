const express = require('express');
const jwt =require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


const db = "mongodb://ruyonga:danny123@ds249079.mlab.com:49079/eventsdbug";
mongoose.connect(db, err => {
     if(err){
         console.log('Error'+ err);
     }else{
         console.log("Cconnected to db");
     }
})

function verifyToken(req, res, next){
    console.log(req);
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }

    let token = req.headers.authorization.split('')[1];
    console.log(token);
    if(token == 'null'){
        return res.status(401).send('Unauthorized request');
    }

    let payload = jwt.verify(token, 'secretKey');
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();

}

router.get('/', (req, res) => {
        res.send('From Api route');
});


router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User(userData);
    user.save((error, registeredUser) => {
        if(error){
            console.log(error);
        }else{
            let payload ={ subject: registeredUser._id};
            let token = jwt.sign(payload, 'secretKey');
           res.status(200).send({token});
        }
    })
});


router.post('/login', (req, res) =>{
    let userData = req.body;
    
    User.findOne({ email: userData.email}, (error, user) => {
        if(error){
            console.log(error);
        }else{
            if(!user){
                res.status(401).send('Invalid Email');
            }else{
                if(user.passsword !== userData.passsword){
                    res.status(401).send('Invalid Password');
                }else{
                    let payload = {subject: user._id };
                    let token = jwt.sign(payload, 'secretKey');
                    res.status(200).send({ token });
                }
            }
        }
    })
});


router.get('/events',(req, res) =>{
let events = [
        {
            "_id":"1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            "_id":"1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            "_id":"1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            "_id":"1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            "_id":"1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            "_id":"1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            "_id":"1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum",
            "date": "2012-04-23"
        },
        {
            "_id":"1",
            "name": "Auto Expo",
            "description": "Lorem Ipsum",
            "date": "2012-04-23"
        }
]

res.json(events);s
});



router.get('/special', (req, res) =>{
    let events = [
            {
                "_id":"1",
                "name": "Auto Expo",
                "description": "Lorem Ipsum",
                "date": "2012-04-23"
            },
            {
                "_id":"1",
                "name": "Auto Expo",
                "description": "Lorem Ipsum",
                "date": "2012-04-23"
            },
            {
                "_id":"1",
                "name": "Auto Expo",
                "description": "Lorem Ipsum",
                "date": "2012-04-23"
            },
            {
                "_id":"1",
                "name": "Auto Expo",
                "description": "Lorem Ipsum",
                "date": "2012-04-23"
            },
            {
                "_id":"1",
                "name": "Auto Expo",
                "description": "Lorem Ipsum",
                "date": "2012-04-23"
            },
            {
                "_id":"1",
                "name": "Auto Expo",
                "description": "Lorem Ipsum",
                "date": "2012-04-23"
            },
            {
                "_id":"1",
                "name": "Auto Expo",
                "description": "Lorem Ipsum",
                "date": "2012-04-23"
            },
            {
                "_id":"1",
                "name": "Auto Expo",
                "description": "Lorem Ipsum",
                "date": "2012-04-23"
            }
    ]
    
    res.json(events);
    });
module.exports = router;