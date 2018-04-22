let express = require('express');
let router = express.Router({});
let passport = require('passport');

// Including respective controllers to route to map requests to functions.
let AuthenticateController = require('../controller/authenticate.controller')

/* Open AngularJS index.html  */
router.get('/', function(req, res) {
    res.render('index');
});

// Login/Logout Routes //
router.post('/login',passport.authenticate('local'), AuthenticateController.logInUser);

router.post('/logout', AuthenticateController.logoutUser);

router.get('/getLoginStatus',AuthenticateController.getLoginStatus);

module.exports = router;
