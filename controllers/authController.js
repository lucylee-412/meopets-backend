// we'll use bcrypt to salt and hash the passwords before storing them in the db
const bcrypt = require('bcrypt');
const db = require('../models');
const { User } = db;

// helper function to hash password with 
function hashPassword(password) {
    const hashed = bcrypt.hash(password, 12);
    return hashed;
}

// helper function to compare hashed passwords
function isValidPassword(password, hashed) {
    return bcrypt.compare(password, hashed);
}

exports.signUp = async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const hashed = await hashPassword(password);
        const user = await User.create({
            email : email,
            name : username,
            password : hashed
        });
        res.status(201).json({message: `User ${username} created successfully.`, userId: user.id});
    } catch(err) {
        res.status(404).json({error : err})
    }
}

exports.logIn = async(req, res, next) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        const user = await User.findAll({where: {name: username}});
        console.log(user[0].dataValues.password)
        const hashedPw = user[0].dataValues.password;
        if (await isValidPassword(password, hashedPw)) {
            res.status(201).json({message: "User logged in."});
        } else {
            throw new Error("Validation failed.")
        }
    } catch(err) {
        res.status(404).json({error : "Validation Failed (for some reason)"});
    }
}