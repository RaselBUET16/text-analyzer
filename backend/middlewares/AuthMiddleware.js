const passport = require('passport');
const { printError } = require('../utils/logger');
const TextModel = require('../models/Text');

class AuthMiddleware {
    
    static authenticate(req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({
                success: false,
                message: 'Unauthorized User',
                });
            }
        
            req.user = user;
            next();
        })(req, res, next);
    }

    static async isTextAuthor (req, res, next) {
        try {
            const user = req.user;
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized User'
                })
            }
            const textId = req.params.id || req.query.id
            if (!textId) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Text ID is required' 
                });
            }

            const textObj = await TextModel.findById(textId);
            if (!textObj) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'Text not found' 
                });
            }
        
            if (textObj.user?._id?.toString() !== user.id) {
                return res.status(403).json({ 
                    success: false, 
                    message: 'Forbidden: Not your text' 
                });
            }
        
            req.textObj = textObj;

            next()
        } catch(error) {
            printError(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = AuthMiddleware;