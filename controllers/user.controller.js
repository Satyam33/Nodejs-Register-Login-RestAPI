const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
var randomstring = require("randomstring");
const { findOneAndUpdate } = require('../models/user.model');

const ObjectId = require('mongodb').ObjectID;

module.exports = {
    doLogin: async function (data) {
        try {
            const user_detail = await User.findOne({ email: data.email })
            if (user_detail) {
                const isMatch = bcrypt.compareSync(data.password, user_detail.password);
                if (isMatch) {
                    return user_detail;
                }
                else {
                    return false;
                }
            }
            else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false;
        }
    },
    doRegistation: async function (data) {
        try {
            const hashedPassword = await bcrypt.hashSync(data.password, 10);
            const user = new User({
                email: data.email,
                full_name: data.full_name,
                password : hashedPassword,
                cd: new Date()
            })
            await user.save();
            return user;
        } catch (error) {
            console.log("error--", error);
            return false;
        }
    },
    findUserByEmail: async function (email) {
        try {
            const getuserByEmail = await User.findOne({ email: email })
            if (getuserByEmail) {
                return true
            }
            else {
                return false
            }
        } catch (error) {

        }
    },


}