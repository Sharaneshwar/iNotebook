const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(true);
})

module.exports = router