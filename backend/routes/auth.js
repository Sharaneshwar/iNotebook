const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/" No login required
router.post('/createuser',
    [
        body('email', 'Enter a vaild email').isEmail(),
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Check whether the user with this email already exists
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: 'Sorry a user with email already exists' })
            }
            // Create a new user
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            res.json(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Some Error Occurred');
        }
    })

module.exports = router

