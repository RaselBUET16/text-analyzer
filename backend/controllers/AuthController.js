const UserModel = require('../models/User');
const { generateAccessToken} = require('../utils/jwt');
const { printError } = require('../utils/logger');
const { createAbsoluteUrl } = require('../utils/utils');

class AuthController {
    static async googleCallback(req, res) {
        try {
            const accessToken = generateAccessToken(req.user);
    
            res.redirect(createAbsoluteUrl(process.env.CLIENT_URL, `oauth-callback?token=${accessToken}`));
        } catch (err) {
            printError(err)
            res.redirect(createAbsoluteUrl(process.env.CLIENT_URL, `/login?error=${err.message}`))
        }
    }
    
    static async logout(req, res) {
        return res.json({
            success: true,
            message: "Successful",
        });
    }

    static async getUser(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message:'Not authenticated' 
                });
            }
            res.json({
                success: true,
                message: "Found User",
                user: {
                    id: req.user.id,
                    email: req.user.email,
                    name: req.user.name
                }
            });
        } catch (error) {
            printError(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }
}

module.exports = AuthController;
