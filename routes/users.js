var express = require('express');
var sentimentController = require('../controllers/sentiment.js');
var userController = require('../controllers/user.js');
var tripController = require('../controllers/trip.js');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({isSuccess:true,message:'Hi! Welcome to Environment-Health APIs, Start with POST /user, GET /user/:username, POST /updateUser'});
});

router.route('/sentiment/:hashtag')
  .get(sentimentController.getSentiment);

router.route('/user/:email')
  .get(userController.getUser);

router.route('/user/')
  .post(userController.postUser);

router.route('/user/add-trip')
  .post(userController.addTrip);

router.route('/user/del-trip')
  .post(userController.deleteTrip);

router.route('/trip/trip-det')
  .post(tripController.tripDetailsAdd);

router.route('/login')
  .post(userController.login);

router.route('/trip/:handle')
  .get(tripController.getTrip);

router.route('/trip/')
  .post(tripController.postTrip);

router.route('/trip/update')
  .post(tripController.updateTrip);

router.route('/expedia')
  .get(sentimentController.expedia);



module.exports = router;
