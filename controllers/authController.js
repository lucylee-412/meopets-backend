// we'll use bcrypt to salt and hash the passwords before storing them in the db
const bcrypt = require('bcrypt');
const db = require('../models');
const { Op } = db.Sequelize;
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

/* signup controller:
1. grabs prospective user's email, username, and password from the request body
2. Compares email and username to the users table. If already present - error; if not (length of the returned array is 0) - proceed with signup.
3. Password is hashed with bcrypt, then the user is stored with email and username in plaintext and a hashed password.

If email or username already exists, we check which one it is and return an appropriate error message.
*/

exports.signUp = async(req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const alreadyPresent = await User.findAll({where: {[Op.or]: [{email: email}, {name: username}]}});
        if (!alreadyPresent.length) {
            const hashed = await hashPassword(password);
            const user = await User.create({
                email : email,
                name : username,
                password : hashed
            });
            res.status(201).json({message: `User ${username} created successfully.`, userId: user.id});
        } else {
            if (alreadyPresent[0].dataValues.email === email) {
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
exports.logIn = async(req, res, next) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        const user = await User.findAll({where: {name: username}});
        console.log(user)
        if(!user.length) {
            res.status(422).json({error : "User Not Found"});
        } else {
            const hashedPw = user[0].dataValues.password;
            if (await isValidPassword(password, hashedPw)) {
                //const token = generateToken(user);
                res.status(201).json({message: "User logged in." /*, token: token */});
            } else {
                res.status(422).json({error : "Invalid Password"});
            }
        }
    } catch(err) {
        res.status(404).json({error : "Connection Error/Not Found"});
    }
}