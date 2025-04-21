const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const TextModel = require('../models/Text');
const UserModel = require('../models/User');

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
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
    const testUser = { gId: 'testuserid123', email: 'test@example.com', name: "abc" };
    let token;
    let userObj;
    beforeAll(async () => {
        await UserModel.deleteMany({});
        userObj = await UserModel.create(testUser);
        token = jwt.sign({ id: userObj.id }, JWT_SECRET, { expiresIn: '1h' });
    })

    beforeEach(async () => {
        await TextModel.deleteMany({});
    });

    describe('POST /texts', () => {
        it('should create an new text entry', async () => {
            const res = await request(app)
                .post('/texts')
                .set('Authorization', `Bearer ${token}`)
                .send( { content: sampleText } )
                .expect(201);

            expect(res.body.textObj.content).toBe(sampleText);
        });

        it('should respond with 404', async () => {
            const res = await request(app)
                .post('/texts')
                .set('Authorization', `Bearer ${token}`)
                .expect(400);
        });
    });

    describe('GET /texts', () => {
        it('should retrieve all created text documents', async () => {
            await TextModel.create({
                user: userObj._id,
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
                user: userObj._id,
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
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        
            expect(res.body.textObjList.length).toBe(2);
            expect(res.body.textObjList[0].content).toBe(sampleText);
            expect(res.body.textObjList[1].content).toBe(sampleText);
        });
    });

    describe('GET /texts/:id', () => {
        it('should retrieve a text document', async () => {
            const created = await TextModel.create({
                user: userObj._id,
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
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        
            expect(res.body.textObj.content).toBe(sampleText);
        });

        it('should respond with 404', async () => {
            await request(app)
                .get('/texts/6804cbd153339f1705d83cab')
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        });

        it('should respond with 500', async () => {
            await request(app)
                .get('/texts/12343')
                .set('Authorization', `Bearer ${token}`)
                .expect(500)
        });
    });

    describe('PUT /texts/:id', () => {
        it('should update a text document', async () => {
            const created = await TextModel.create({
                user: userObj._id,
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
                .set('Authorization', `Bearer ${token}`)
                .send( {content: sample2} )
                .expect(200);
        
            expect(res.body.textObj.content).toBe(sample2);
            
        });

        it('should respond with 404', async () => {
            await request(app)
                .put(`/texts/6804cbd153339f1705d83cab`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        });

        it('should respond with 404', async () => {
            await request(app)
                .put('/texts/6804cbd153339f1705d83cab')
                .set('Authorization', `Bearer ${token}`)
                .send({ content: "sample2" })
                .expect(404)
        });
    });

    describe('DELETE /texts/:id', () => {
        it('should delete a text document', async () => {
            const created = await TextModel.create({
                user: userObj._id,
                content: sampleText,
                analysis: {
                    wordCount: 4,
                    charCount: 17,
                    sentenceCount: 1,
                    paragraphCount: 1,
                    longestWords: [["Sample"]]
                }
            });
            
            await request(app)
                .delete(`/texts/${created._id}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
            
            const allTexts = await TextModel.find();
            expect(allTexts.length).toBe(0);
        });

        it('should respond with 404', async () => {
            await request(app)
                .delete('/texts/6804cbd153339f1705d83cab')
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        });
    });

    describe('Analysis endpoints', () => {
        let textId;
    
        beforeEach(async () => {
            const testText = "The quick brown fox jumps over the lazy dog. \n \nThe lazy dog slept in the sun.";
            const created = await TextModel.create({
                user: userObj._id,
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
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
          
            expect(res.body.count).toBe(16);

            await request(app)
                .get('/texts/6804cbd153339f1705d83cab/word-count')
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        });
    
        it('GET /texts/:id/char-count should return character count', async () => {
            const res = await request(app)
                .get(`/texts/${textId}/char-count`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
            
            expect(res.body.count).toBe(60);

            await request(app)
                .get('/texts/6804cbd153339f1705d83cab/char-count')
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        });
    
        it('GET /texts/:id/sentence-count should return sentence count', async () => {
            const res = await request(app)
                .get(`/texts/${textId}/sentence-count`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
            
            expect(res.body.count).toBe(2);

            await request(app)
                .get('/texts/6804cbd153339f1705d83cab/sentence-count')
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        });
    
        it('GET /texts/:id/paragraph-count should return paragraph count', async () => {
            const res = await request(app)
                .get(`/texts/${textId}/paragraph-count`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
            
            expect(res.body.count).toBe(2);

            await request(app)
                .get('/texts/6804cbd153339f1705d83cab/paragraph-count')
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        });
    
        it('GET /texts/:id/longest-words should return longest words', async () => {
            const res = await request(app)
                .get(`/texts/${textId}/longest-words`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
            
            expect(res.body['longest-words']).toEqual([["quick", "brown", "jumps"], ["slept"]] );

            await request(app)
                .get('/texts/6804cbd153339f1705d83cab/longest-words')
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        });
    });
    
})