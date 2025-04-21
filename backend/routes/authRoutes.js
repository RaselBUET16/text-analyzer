const express = require('express');
const passport = require('passport');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// Logout
router.get('/logout', AuthController.logout);

// Google OAuth
router.get('/google', passport.authenticate(
    'google',
    {
        scope: ['profile', 'email'],
        session: false
    }
))

router.get('/google/callback', passport.authenticate(
    'google',
    {
        failureRedirect: '/login',
        session: false,
    }
), AuthController.googleCallback);

router.get('/current-user', passport.authenticate('jwt', {session: false}), AuthController.getUser);

module.exports = router;