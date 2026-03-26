const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apiController')
console.log('Controller contents:', apiController)
// Define your paths
router.get('/quotes', apiController.getQuotes)
router.get('/quotes/:count', apiController.getQuotes)
router.get('/techy', apiController.getTechyPhrase)

module.exports = router