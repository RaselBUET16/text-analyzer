const TextModel = require('../models/Text');
const TextAnalyzerService = require('../services/TextAnalyzerService');
const { printError, printDebug } = require('../utils/logger');

class TextController {
    /**
     * Controller to handle creation of text entry
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<void>} Response with a JSON object.
     */
    static async createText(req, res) {
        try {
            const { content } = req.body;
            if (!content) {
                return res.status(400).json({
                    success: false,
                    message: "Content is required"
                })
            }

            const analysis = TextAnalyzerService.analyzeText(content);
            const newText = await TextModel.create({ content, analysis });
            res.status(201).json({
                success: true,
                message: "Successfully created new text entry",
                textObj: { id: newText._id, content: newText.content }
            })
        } catch (error) {
            printError(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    /**
     * Controller to get all created texts
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<void>} Response with a JSON object.
     */
    static async getTexts(req, res) {
        try {
            const textObjList = await TextModel.find();
            res.json({
                textObjList: textObjList.map(text => ({id: text._id, content: text.content}))
            })
        } catch (error) {
            printError(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    /**
     * Controller to get requested
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<void>} Response with a JSON object.
     */
    static async getText(req, res) {
        try {
            const { id } = req.params;
            const textObj = await TextModel.findById(id);

            if (!textObj) {
                return res.status(404).json({
                    success: false,
                    message: "Requested text not found"
                })
            }

            res.json({
                success: true,
                message: "Text found",
                textObj: {id: textObj._id, content: textObj.content}
            })
        } catch (error) {
            printError(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    /**
     * Controller to update an existing text.
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<void>} Response with a JSON object.
     */
    static async updateText(req, res) {
        try {
            const { id } = req.params;
            const content = req.body?.content;

            if (!content) {
                return res.status(400).json({
                    success: false,
                    message: "Content is required"
                })
            }

            const analysis = TextAnalyzerService.analyzeText(content);
            const updatedTextObj = await TextModel.findByIdAndUpdate(
                id,
                { content, analysis },
                { new: true }
            )

            if (!updatedTextObj) {
                return res.status(404).json({
                    success: false,
                    message: "Requested text not found"
                })
            }

            res.json({
                success: true,
                message: "Successfully updated the text",
                updatedTextObj: {id: updatedTextObj._id, content: updatedTextObj.content}
            })
        } catch (error) {
            printError(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    /**
     * Controller to delete an existing text
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<void>} Response with a JSON object.
     */
    static async deleteText(req, res) {
        try {
            const { id } = req.params;
            const deletedTextObj = await TextModel.findByIdAndDelete(id);

            if (!deletedTextObj) {
                return res.status(404).json({
                    success: false,
                    message: "Requested text not found"
                })
            }

            res.json({
                success: true,
                message: "Successfully deleted the text"
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    /**
     * Controller to get word count of requested text
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<void>} Response with a JSON object.
     */
    static async getWordCount(req, res) {
        try {
            const { id } = req.params;
            const textObj = await TextModel.findById(id);
            if (!textObj) {
                return res.status(404).json({
                    success: false,
                    message: "Requested text not found"
                })
            }

            res.json({
                success: true,
                message: "Text found",
                wordCount: textObj.analysis.wordCount
            })
        } catch (error) {
            printError(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    /**
     * Controller to get character count of requested text.
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<void>} Response with a JSON object.
     */
    static async getCharCount(req, res) {
        try {
            const { id } = req.params;
            const textObj = await TextModel.findById(id);
            if (!textObj) {
                return res.status(404).json({
                    success: false,
                    message: "Requested text not found"
                })
            }

            res.json({
                success: true,
                message: "Text found",
                wordCount: textObj.analysis.charCount
            })
        } catch (error) {
            printError(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    /**
     * Controller to get sentence count of requested text.
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<void>} Response with a JSON object.
     */
    static async getSentenceCount(req, res) {
        try {
            const { id } = req.params;
            const textObj = await TextModel.findById(id);
            if (!textObj) {
                return res.status(404).json({
                    success: false,
                    message: "Requested text not found"
                })
            }

            res.json({
                success: true,
                message: "Text found",
                wordCount: textObj.analysis.sentenceCount
            })
        } catch (error) {
            printError(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    /**
     * Controller to get paragraph count of requested text.
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<void>} Response with a JSON object.
     */
    static async getParagraphCount(req, res) {
        try {
            const { id } = req.params;
            const textObj = await TextModel.findById(id);
            if (!textObj) {
                return res.status(404).json({
                    success: false,
                    message: "Requested text not found"
                })
            }

            res.json({
                success: true,
                message: "Text found",
                wordCount: textObj.analysis.paragraphCount
            })
        } catch (error) {
            printError(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    /**
     * Controller to get longest words of paragraphs in requested text.
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<void>} Response with a JSON object.
     */
    static async getLongestWords(req, res) {
        try {
            const { id } = req.params;
            const textObj = await TextModel.findById(id);
            if (!textObj) {
                return res.status(404).json({
                    success: false,
                    message: "Requested text not found"
                })
            }

            res.json({
                success: true,
                message: "Text found",
                wordCount: textObj.analysis.longestWords
            })
        } catch (error) {
            printError(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = TextController;