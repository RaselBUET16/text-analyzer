const express = require('express');
const router = express.Router();
const TextController = require('../controllers/TextController');

// CRUD Operations
router.post('/', TextController.createText);
router.get('/', TextController.getTexts);
router.get('/:id', TextController.getText);
router.put('/:id', TextController.updateText);
router.delete('/:id', TextController.deleteText);

// Analysis Endpoints
router.get('/:id/word-count', TextController.getWordCount);
router.get('/:id/char-count', TextController.getCharCount);
router.get('/:id/sentence-count', TextController.getSentenceCount);
router.get('/:id/paragraph-count', TextController.getParagraphCount);
router.get('/:id/longest-words', TextController.getLongestWords);

module.exports = router
