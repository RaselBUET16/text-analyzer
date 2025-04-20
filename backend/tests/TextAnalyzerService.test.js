const TextAnalyzerService = require('../services/TextAnalyzerService');

describe('TextAnalyzerSrevice', () => {
    const testText = "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.";

    describe('countWords', () => {
        it('should return correct word count', () => {
            expect(TextAnalyzerService.countWords(testText)).toBe(16);
            expect(TextAnalyzerService.countWords('')).toBe(0);
            expect(TextAnalyzerService.countWords(' abcd    dskd. ')).toBe(2);
            expect(TextAnalyzerService.countWords(undefined)).toBe(0);
        })
    });

    describe('countCharacters', () => {
        it('should return currect character count', () => {
            expect(TextAnalyzerService.countCharacters(testText)).toBe(60);
            expect(TextAnalyzerService.countCharacters('')).toBe(0);
            expect(TextAnalyzerService.countCharacters('abcd   dksd.')).toBe(9);
            expect(TextAnalyzerService.countCharacters(undefined)).toBe(0);
        })
    });

    describe('countSentences', () => {
        it('should return currect sentence count', () => {
            expect(TextAnalyzerService.countSentences(testText)).toBe(2);
            expect(TextAnalyzerService.countSentences('  single sentence.')).toBe(1);
            expect(TextAnalyzerService.countSentences('Nice! Good one.')).toBe(2);
            expect(TextAnalyzerService.countSentences(undefined)).toBe(0);
        })
    });

    describe('counteParagraphs', () => {
        it('should return currect paragraph count', () => {
            expect(TextAnalyzerService.countParagraphs(testText)).toBe(1);
            expect(TextAnalyzerService.countParagraphs('')).toBe(0);
            expect(TextAnalyzerService.countParagraphs(testText.replace(/\./g, '\n'))).toBe(2);
            expect(TextAnalyzerService.countParagraphs(undefined)).toBe(0);
        })
    });

    describe('findLongestWords', () => {
        it('should return longest words of each paragraph', () => {
            expect(TextAnalyzerService.findLongestWords(testText)).toEqual(
                [
                    [
                        "quick",
                        "brown",
                        "jumps",
                        "slept"
                    ]
                ]
            );
            expect(TextAnalyzerService.findLongestWords(testText.replace(/\./g, '\n'))).toEqual(
                [
                    [
                        "quick",
                        "brown",
                        "jumps"
                    ],
                    [
                        "slept"
                    ] 
                ]
            );
            expect(TextAnalyzerService.findLongestWords(undefined)).toEqual([])
        })
    });

    describe('analyzeText', () => {
        it('should return complete analysis object', () => {
            expect(TextAnalyzerService.analyzeText(testText)).toEqual({
                wordCount: 16,
                charCount: 60,
                sentenceCount: 2,
                paragraphCount: 1,
                longestWords: [ ["quick", "brown", "jumps", "slept"] ]
            });
        });
        
        it('should throw error for invalid text input', () => {
            expect(() => TextAnalyzerService.analyzeText(undefined)).toThrow();
            expect(() => TextAnalyzerService.analyzeText(null).toThrow());
            expect(() => TextAnalyzerService.analyzeText('').toThrow());
            expect(() => TextAnalyzerService.analyzeText(45345).toThrow());
        })
    });
})