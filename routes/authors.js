const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/', authorController.listAuthors);
router.get('/add', authorController.showAddForm);
router.post('/add', authorController.addAuthor);
router.get('/:id/books', authorController.showAuthorBooks);
router.get('/edit/:id', authorController.showEditForm);
router.post('/edit/:id', authorController.updateAuthor);
router.post('/delete/:id', authorController.deleteAuthor);

module.exports = router;
