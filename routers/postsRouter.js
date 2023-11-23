const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
//rotta elenco completo posts

router.get('/', postsController.index);
router.post('/', postsController.store);

module.exports = router;