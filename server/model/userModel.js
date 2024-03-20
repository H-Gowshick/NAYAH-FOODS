const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
dotenv = require('dotenv');
dotenv.config();

const keysecret = process.env.SECRET_KEY;

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
});


// // hash password
// userSchema.pre("save", async function (next) {

//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 12);
//         this.cpassword = await bcrypt.hash(this.cpassword, 12);
//     }
//     next()
// });


// token generate
userSchema.methods.generateAuthtoken = async function () {
    try {
        let tokenjwt = jwt.sign({ _id: this._id }, keysecret, {
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({ token: tokenjwt });
        await this.save();
        return tokenjwt;
    } catch (error) {
        res.status(422).json(error)
    }
}


// createing model
const user = new mongoose.model('user',userSchema);

module.exports = user;

