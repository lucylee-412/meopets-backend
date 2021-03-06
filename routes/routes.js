// routes also require express Router, hence this import:
const express = require('express');

/* routes act as a traffic director, directing requests as they come in
 to the appropriate function in the appropriate controller: */
const petController = require('../controllers/petController')
const { signUp, logIn, isAuth } = require('../auth');


// router initialization
const router = express.Router();

// requests handling: first argument is the route, second - the function to be run on that route

// signup/login handling, no authentication yet
router.post('/signup', signUp);
router.post('/login', logIn);

// pet routes
router.get('/pets', isAuth, petController.getPetById);
router.post('/pets', isAuth,  petController.addPetToUser);
router.put('/pets', isAuth,  petController.updatePet);

router.get('/pets', isAuth, petController.getPetById);
router.put('/users', isAuth, petController.updateUser);

/* exporting router to import it in the main app for the server to direct the requests
 to the router as they come in */
module.exports = router;