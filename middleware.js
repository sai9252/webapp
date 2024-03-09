const jwt = require("jsonwebtoken");
const { decode } = require("punycode");

module.exports = function ( req , res, next ) {
    try {
        let token = req.header('x-token');
        if (!token) {

            return res.json({ "message": "Token not found" })
            // return res.status(400).send("Message : Invalid user token not found ");
        }
            
            let decoder = jwt.verify(token, "jwtpassword");
            console.log(decoder)
            req.user = decoder.user;
            next();
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "unauthorized" })
    }
}