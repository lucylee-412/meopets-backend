/* A controller is a file containing all the functions we want to run as
requests come in. Since we are creating an API, we need to communicate with
the database, hence the database models import: */
const db = require('../models');
const { User, Pet } = db;

// function tokenValidate();

exports.getPetById = async(req, res, next) => {
    try {
        //tokenValidate();
        const id = req.params.id;
        console.log(id);
        const pet = await Pet.findAll({where: {userId: id}});
        console.log(pet);
        if (pet.length !== 0) {
            res.status(200).json({message: "Pet(s) found", pet: pet});
        } else {
            res.status(404).json({message: `No pet with ${id} found`});
        }
    } catch(err) {
        res.status(404).json({error : "Connection Error/Not Found"});
    }
};

exports.addPetToUser = async(req, res, next) => {
    try {
        const { userId, name, image } = req.body;
        console.log(req.body);
        const user = await User.findByPk(userId);
        console.log(user);
        if (user) {
            const pet = await Pet.create({userId: userId, name: name, image: image});
            res.status(200).json({message: `Pet ${name} for user ${userId} created!`, pet: pet});
        }
    } catch(err) {
        res.status(404).json({error : "Connection Error/Not Found"});
    }
}
