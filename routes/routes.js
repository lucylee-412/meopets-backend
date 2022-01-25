// routes also require express Router, hence this import:
const express = require('express');

/* routes act as a traffic director, directing requests as they come in
 to the appropriate function in the appropriate controller: */
const controller = require('../controllers/controller')

// router initialization
const router = express.Router();

// requests handling: first argument is the route, second - the function to be run on that route
router.get();
router.post();
router.put();
router.delete();


/* exporting router to import it in the main app for the server to direct the requests
 to the router as they come in */
module.exports = router;