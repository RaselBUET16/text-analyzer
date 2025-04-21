const { createAbsoluteUrl } = require("../utils/utils");


describe('utils', () => {
    describe('createAbsoluteUrl', () => {
        it('should return correct absolute url', () => {
            expect(createAbsoluteUrl('http://localhost:5000/', '/texts/')).toBe('http://localhost:5000/texts/');
            expect(createAbsoluteUrl('http://localhost:5000', '/texts/')).toBe('http://localhost:5000/texts/');
            expect(createAbsoluteUrl('http://localhost:5000/', 'texts/')).toBe('http://localhost:5000/texts/');
            expect(createAbsoluteUrl('http://localhost:5000', 'texts/')).toBe('http://localhost:5000/texts/');
            expect(createAbsoluteUrl('', '/texts/')).toBe('');
        })
    });
})