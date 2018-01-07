/**
 * Created by rakeshuvsn on 1/6/18.
 */
const express = require('express');

const router = express.Router();


router.get('/register', (req, res, next) => {
  res.send('Register new consultants');
});

module.exports = router;