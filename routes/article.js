const express = require('express');
const router = express.Router();

const { getArticles } = require('../controllers/article')

router.get('/list', getArticles)

module.exports = router