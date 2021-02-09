const express = require('express');
const router = express.Router();
const recordCrtl = require('../controllers/records');


router.post('/', recordCrtl.createThing);
router.get('/',recordCrtl.getAllThing);


module.exports = router;