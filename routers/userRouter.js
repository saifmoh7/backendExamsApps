const express = require("express")
const expressAsyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt");
const User = require("../mudels/userModel.js");


const userRouter = express.Router();



userRouter.get('/version/url', expressAsyncHandler(async (req, res) => {
    const url = "https://play.google.com/store/apps/details?id=host.exp.exponent"
    res.status(200).send(url)
}));

userRouter.get('/version', expressAsyncHandler(async (req, res) => {
    const version = "0.0.1"
    res.status(200).send(version)
}));

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.status(200).send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin, 
            })
        }else{res.status(401).send()}
    }else{res.status(402).send()}
}));


userRouter.post('/signup', expressAsyncHandler(async (req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    const createdUser = await user.save();
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin
    })
}));

userRouter.post('/check-auth', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({_id: req.body.userId})
    if (user) {
            res.json({
                status:200,
                data:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin, 
                }
            })
    }else{res.json({status: 403})}
}));



module.exports = userRouter; 

