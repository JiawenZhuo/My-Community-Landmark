
const express = require('express')

const landmarkController = require('../controller/landmark-controller');
var bodyParser = require('body-parser')
 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const router = express.Router()

router.post('/landmark',jsonParser, landmarkController.createLandmark)
router.put('/update', jsonParser,landmarkController.updateLandmark)
router.get('/movie/:id', )
// router.get('/movie/:id', MovieCtrl.getMovieById)
router.get('/get', jsonParser, landmarkController.getLandmarks)
router.get('/getComments/:id', jsonParser, landmarkController.getCommentByLandmark)
router.get('/searchByText/:keyText', jsonParser, landmarkController.searchByText);
module.exports = router;