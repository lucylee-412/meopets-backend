/* A controller is a file containing all the functions we want to run as
requests come in. Since we are creating an API, we need to communicate with
the database, hence the database models import: */
const db = require('../models');
const { User, Pet } = db;


exports.getPetById = async(req, res, next) => {
    try {
        const userId = req.userId;
        const pet = await Pet.findAll({where: {userId: userId}});
        console.log(pet);
        if (pet.length !== 0) {
            res.status(200).json({message: "Pet(s) found", pet: pet});
        } else {
            res.status(404).json({error: `No pet for user with ${userId} found`});
        }
    } catch(err) {
        res.status(404).json({error : "Connection Error/Not Found"});
    }
};

exports.addPetToUser = async(req, res, next) => {
    try {
        const userId = req.userId;
        const { name, type } = req.body;
        const user = await User.findByPk(userId);
        console.log(user);
        if (user) {
            const pet = await Pet.create({userId: userId, name: name, type: type});
            res.status(200).json({message: `Pet ${name} for user ${userId} created!`, pet: pet});
        }
    } catch(err) {
        res.status(404).json({error : "Connection Error/Not Found"});
    }
}

exports.getUserData = async(req, res, next) => {
    try {
        const userId = req.userId;
        const user = await User.findByPk(userId);
        if(user) {
            res.status(200).json({message: `User data retrieved`, user: {email: user.email, username: user.username}})
        }
    } catch(err) {
        res.status(404).json({error : "Connection Error/Not Found"});
    }
}

exports.updatePet = async(req, res, next) => {
    try {
        const userId = req.userId;
        const updated = await Pet.update(req.body.data, {
            where: {id: req.body.data.id},
            returning: true
        });
        res.status(200).json({
            message: `Pet with id ${req.body.data.id} updated. Full data:`,
            pet: updated[1][0].dataValues
        });
        console.log(updated[1][0].dataValues);
    } catch (err) {
        res.status(404).json({ error : err });
    }
}
