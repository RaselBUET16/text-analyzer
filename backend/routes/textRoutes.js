const express = require('express');
const router = express.Router();
const TextController = require('../controllers/TextController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

// CRUD Operations
router.post('/', AuthMiddleware.authenticate, TextController.createText);
router.get('/', AuthMiddleware.authenticate, TextController.getTexts);
router.get('/:id', AuthMiddleware.authenticate, TextController.getText);
router.put('/:id', AuthMiddleware.authenticate, AuthMiddleware.isTextAuthor,  TextController.updateText);
router.delete('/:id', AuthMiddleware.authenticate, AuthMiddleware.isTextAuthor, TextController.deleteText);

// Analysis Endpoints
router.get('/:id/word-count', AuthMiddleware.authenticate, AuthMiddleware.isTextAuthor, TextController.getWordCount);
router.get('/:id/char-count', AuthMiddleware.authenticate, AuthMiddleware.isTextAuthor, TextController.getCharCount);
router.get('/:id/sentence-count', AuthMiddleware.authenticate, AuthMiddleware.isTextAuthor, TextController.getSentenceCount);
router.get('/:id/paragraph-count', AuthMiddleware.authenticate, AuthMiddleware.isTextAuthor, TextController.getParagraphCount);
router.get('/:id/longest-words', AuthMiddleware.authenticate, AuthMiddleware.isTextAuthor, TextController.getLongestWords);

module.exports = router
