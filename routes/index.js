var express = require('express');
var router = express.Router();

const userRoute = require('./userRouter/index')

router.use('/user', userRoute);

router.get('/', function (req, res) {
    res.send({
        mes:"Index page"
    })
});
module.exports = router;