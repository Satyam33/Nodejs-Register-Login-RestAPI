var express = require('express');
var router = express.Router();
let config = require('../../config/jwtConfig');
let tokenConfig = require('../../config/token')
let jwt = require('jsonwebtoken');
let userController = require("../../controllers/user.controller")
const passport = require('passport')
require('../../config/passport')(passport);


router.post('/register',async function(req,res,next){
    if (!req.body.email || !req.body.full_name || !req.body.password ) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    let findUser = await userController.findUserByEmail(req.body.email)
    if(findUser){
        return res.status(422).json({ error: "User Alredy register" })
    }
    let createUser = await userController.doRegistation(req.body)
    if(createUser){
        res.status(200).json({
            status: true,
            message: "User Created Successfully",
            user:createUser
        })
    }
    else{
        res.status(404).json({
            status: false,
            message: "Something Went Wrong.."

        })
    }

})

router.post('/login',async function(req,res,next){
    if (!req.body.email  || !req.body.password ) {
        return res.status(422).json({ error: "please add all the fields" })
    }
    let loginUser = await userController.doLogin(req.body)
    if(loginUser){
        let token = jwt.sign(loginUser.toJSON(), config.secret, { expiresIn: '24h'});
        res.status(200).json({
            status: true,
            message: "User Login Successfully....",
            token: 'JWT ' + token,
            loginUser:loginUser
        })
    }
    else{
        res.status(404).json({
            status: false,
            message: "Incorrect email or Password...!"

        })
    }

})


router.get('/book', passport.authenticate('jwt', { session: false}), async function(req, res) {
    let getToken = await tokenConfig.getToken(req.headers);
    if(getToken){
        return  res.status(400).send({success: true, msg: 'authorized.'});
    }
    else{
        return  res.status(403).send({success: false, msg: 'Unauthorized.'});
    }

  });

module.exports = router;