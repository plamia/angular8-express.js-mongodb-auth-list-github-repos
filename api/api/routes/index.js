const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
let cors = require('cors');
const auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
const request = require('../requests');


const ctrlProfile = require('../controllers/profile');
const ctrlAuth = require('../controllers/authentication');
var ctlGithub  = require('../controllers/github');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

//github 
router.get('/pinnedRepos', ctlGithub.getPinnedRepos);
router.get('/generalInfo/:nameId', ctlGithub.getRepoGeneralInfo);
router.get('/commits/:nameId', ctlGithub.getRepoCommits);
router.get('/patch/:nameId/:patchId', ctlGithub.getPatch);


// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
