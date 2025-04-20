const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const TextModel = require('../models/Text');

let mongoServer;
const sampleText = "Sample text for test";

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const url = mongoServer.getUri();

    // Disconnect any existing mongoose connection
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
    }

    await mongoose.connect(url);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('TextController', () => {
    beforeEach(async () => {
        await TextModel.deleteMany({});
    });

    describe('POST /texts', () => {
        it('should create an new text entry', async () => {
            const res = await request(app)
                .post('/texts')
                .send( { content: sampleText } )
                .expect(201);

            expect(res.body.textObj.content).toBe(sampleText);
        });

        it('should respond with 404', async () => {
            const res = await request(app)
                .post('/texts')
                .expect(400);
        });
    });

    describe('GET /texts', () => {
        it('should retrieve all created text documents', async () => {
            await TextModel.create({
                content: sampleText,
                analysis: {
                    wordCount: 4,
                    charCount: 17,
                    sentenceCount: 1,
                    paragraphCount: 1,
                    longestWords: [["Sample"]]
                }
            });

            await TextModel.create({
                content: sampleText,
                analysis: {
                    wordCount: 4,
                    charCount: 17,
                    sentenceCount: 1,
                    paragraphCount: 1,
                    longestWords: [["Sample"]]
                }
            });
        
            const res = await request(app)
                .get(`/texts`)
                .expect(200);
        
            expect(res.body.textObjList.length).toBe(2);
            expect(res.body.textObjList[0].content).toBe(sampleText);
            expect(res.body.textObjList[1].content).toBe(sampleText);
        });
    });

    describe('GET /texts/:id', () => {
        it('should retrieve a text document', async () => {
            const created = await TextModel.create({
                content: sampleText,
                analysis: {
                    wordCount: 4,
                    charCount: 17,
                    sentenceCount: 1,
                    paragraphCount: 1,
                    longestWords: [["Sample"]]
                }
            });
        
            const res = await request(app)
                .get(`/texts/${created._id}`)
                .expect(200);
        
            expect(res.body.textObj.content).toBe(sampleText);
        });
    });

    describe('PUT /texts/:id', () => {
        it('should update a text document', async () => {
            const created = await TextModel.create({
                content: sampleText,
                analysis: {
                    wordCount: 4,
                    charCount: 17,
                    sentenceCount: 1,
                    paragraphCount: 1,
                    longestWords: [["Sample"]]
                }
            });
            
            const sample2 = "This is the second sample text for testing.";
            const res = await request(app)
                .put(`/texts/${created._id}`)
                .send( {content: sample2} )
                .expect(200);
        
            expect(res.body.textObj.content).toBe(sample2);
        });
    });

    describe('DELETE /texts/:id', () => {
        it('should delete a text document', async () => {
            const created = await TextModel.create({
                content: sampleText,
                analysis: {
                    wordCount: 4,
                    charCount: 17,
                    sentenceCount: 1,
                    paragraphCount: 1,
                    longestWords: [["Sample"]]
                }
            });
            
            const res = await request(app)
                .delete(`/texts/${created._id}`)
                .expect(200);
            
            const allTexts = await TextModel.find();
            expect(allTexts.length).toBe(0);
        });
    });

    describe('Analysis endpoints', () => {
        let textId;
    
        beforeEach(async () => {
            const testText = "The quick brown fox jumps over the lazy dog. \n \nThe lazy dog slept in the sun.";
            const created = await TextModel.create({
                content: testText,
                analysis: { 
                wordCount: 16, 
                charCount: 60, 
                sentenceCount: 2, 
                paragraphCount: 2, 
                longestWords: [["quick", "brown", "jumps"], ["slept"]] 
            }
            });
            textId = created._id;
        });
    
        it('GET /texts/:id/word-count should return word count', async () => {
            const res = await request(app)
                .get(`/texts/${textId}/word-count`)
                .expect(200);
          
            expect(res.body.wordCount).toBe(16);
        });
    
        it('GET /texts/:id/char-count should return character count', async () => {
            const res = await request(app)
                .get(`/texts/${textId}/char-count`)
                .expect(200);
            
            expect(res.body.charCount).toBe(60);
        });
    
        it('GET /texts/:id/sentence-count should return sentence count', async () => {
            const res = await request(app)
                .get(`/texts/${textId}/sentence-count`)
                .expect(200);
            
            expect(res.body.sentenceCount).toBe(2);
        });
    
        it('GET /texts/:id/paragraph-count should return paragraph count', async () => {
            const res = await request(app)
                .get(`/texts/${textId}/paragraph-count`)
                .expect(200);
            
            expect(res.body.paragraphCount).toBe(2);
        });
    
        it('GET /texts/:id/longest-words should return longest words', async () => {
            const res = await request(app)
                .get(`/texts/${textId}/longest-words`)
                .expect(200);
            
            expect(res.body.longestWords).toEqual([["quick", "brown", "jumps"], ["slept"]] );
        });
    });
    
})