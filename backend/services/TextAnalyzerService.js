class TextAnalyzerService {
    /**
     * Analyses word, char, sentence, paragraph count and longest words
     * in paragraphs of given text.
     * @param {string} text 
     * @returns {Object} Object containing wordCount, charCount, sentenceCount
     * paragraphCount, longestWords.
     */
    static analyzeText(text) {
        if (!text || typeof text !== "string") {
            throw new Error('Invalid text input');
        }

        return {
            wordCount: this.countWords(text),
            charCount: this.countCharacters(text),
            sentenceCount: this.countSentences(text),
            paragraphCount: this.countParagraphs(text),
            longestWords: this.findLongestWords(text)
        }
    }

    /**
     * Counts the number of words in the given text.
     * @param {string} text 
     * @returns {number} Word count in the text.
     */
    static countWords(text) {
        if (!text) return 0;

        const wordList = text.trim().split(/\s+/);
        return wordList.length;
    }

    /**
     * Counts the number of characters in the given text.
     * @param {string} text 
     * @returns {number} Character count in the text.
     */
    static countCharacters(text) {
        if (!text) return 0;

        return text.replace(/\s+/g, '').length;
    }

    /**
     * Counts the number of sentences in the given text.
     * @param {string} text 
     * @returns {number} Sentence count in the text.
     */
    static countSentences(text) {
        if (!text) return 0;
        
        return text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    }

    /**
     * Counts the number of paragraphs in the given text.
     * @param {string} text 
     * @returns {number} Paragraph count in the text.
     */
    static countParagraphs(text) {
        if (!text) return 0;
        
        return text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0).length;
    }

    /**
     * Finds the longest words in each paragraph of given text.
     * @param {string} text 
     * @returns {string[][]} Paragraph count in the text.
     */
    static findLongestWords(text) {
        if (!text) return [];
        
        const paragraphList = text.split(/\n+/).filter(paragraph => paragraph.trim().length >0)
        const result = [];
        paragraphList.forEach(paragraph => {
            const wordList = paragraph.trim().split(/\s+/);
            const longestWordList = [];
            let maxLength = 0;
            wordList.forEach(word => {
                const cleanedWord = word.replace(/[^a-zA-Z]/g, '').trim();
                if (!cleanedWord) return;
                if (cleanedWord.length > maxLength) {
                    maxLength = cleanedWord.length;
                    longestWordList.length = 0;
                    longestWordList.push(cleanedWord);
                } else if (cleanedWord.length === maxLength) {
                    longestWordList.push(cleanedWord);
                }
            });

            result.push(longestWordList);
        })
        
        return result;
    }
}

module.exports = TextAnalyzerService;