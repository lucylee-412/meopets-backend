// we'll use bcrypt to salt and hash the passwords before storing them in the db
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const isAuth = require('./isAuth');
const { Op } = db.Sequelize;
const { User, Pet } = db;
require('dotenv').config();


/* signup controller:
1. grabs prospective user's email, username, and password from the request body
2. Compares email and username to the users table. If already present - error; if not (length of the returned array is 0) - proceed with signup.
3. Password is hashed with bcrypt, then the user is stored with email and username in plaintext and a hashed password.

If email or username already exists, we check which one it is and return an appropriate error message.
*/

const signUp = async(req, res, next) => {
    try {
        const { email, username, password, firstPetName, firstPetType } = req.body;
        console.log(req.body);
        const alreadyPresent = await User.findOne({where: {[Op.or]: [{email: email}, {name: username}]}});
        if (!alreadyPresent) {
            const hashedPw = await bcrypt.hash(password, 12);
            const user = await User.create({
                email : email,
                name : username,
                password : hashedPw
            });
            const newUser = user.dataValues;
            // every user is given a pet on sign up - let's create the first one for the new user now!
            const firstPet = await Pet.create({
                name: firstPetName,
                type: firstPetType,
                userId: newUser.id
            })
            const token = jwt.sign({userId: newUser.id}, process.env.SECRET, { expiresIn: '1h' });
            res.status(201).json({message: `User '${username}' created successfully.`, user: {username: newUser.name, currency: newUser.money}, firstpet: firstPet, token: token});
        } else {
            if (alreadyPresent.dataValues.email === email) {
                res.status(422).json({error : "Email already in use."});
            } else {
                res.status(422).json({error : "Username already in use."});
            }
        }
    } catch(err) {
        res.status(404).json({error : "Connection Error/Not Found"});
    }
}

/* Log In controller. Get the username & password from request body. 
Compare against the database. If username has no match - return appropriate error. If hashed password matches - log in, 
generate token, return token in response. If the password is invalid, return appropriate error.*/

const logIn = async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({where: {name: username}});
        if(!user) {
            res.status(401).json({error : "User Not Found"});
        } else {
            const hashedPw = user.dataValues.password;
            if (await bcrypt.compare(password, hashedPw)) {
                // generate a JWT with the default algorithm - HMAC-SHA256
                const now = new Date();
                const token = jwt.sign({userId: user.dataValues.id}, process.env.SECRET , { expiresIn: '1h' });
                res.status(201).json({message: "User logged in." , token: token, iat: now.getTime(), exp: now.getTime()+3600, userId: user.dataValues.id, currency: user.dataValues.money});
                console.log(`user ${user.dataValues.name} logged in`);
            } else {
                res.status(401).json({error : "Invalid Password"});
            }
        }
    } catch(err) {
        res.status(404).json({error : "Connection Error/Not Found"});
    }
}

module.exports = { logIn, signUp, isAuth };