const mongoose = require('mongoose');

const userSchema =mongoose.Schema({
    email : {
        type :String,
  
    },
    full_name : {
        type :String,
    },
    password : {
        type :String,
    },
    cd : {
        type :String,
    }
 
});

// model
mongoose.model('users', userSchema);

// modeule exports
module.exports = mongoose.model('users');