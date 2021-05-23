const express = require('express');
const router = express.Router();

const { getUserWithName } = require('../../helpers/userHelper');

//get user 
router.get('/', (req, res) => {
    res.json(getUserWithName(req.query.name));
});

module.exports = router;