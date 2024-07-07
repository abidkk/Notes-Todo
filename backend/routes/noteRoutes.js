const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notesController');

router.get('/', noteController.getNotes);
router.post('/', noteController.createNote);
router.patch('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
