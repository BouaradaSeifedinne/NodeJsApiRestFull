//Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'e5fdd235cad14d1e71afb75307f0cc5b105b3627';

//Exported functions

module.exports = {
    generateTokenForUser: function(userData){
        return jwt.sign({
            userId: userData._id,
            isAdmin: userData.userStatus
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '1h'
        })
    },
    parseAuthorization: function(authorization){
        return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization){
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null)
        {
            try
            {
                var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
                if(jwtToken != null)
                {
                   userId = jwtToken.userId;
                }
            }
            catch(err)
            {

            }
        }
        return userId;
    }
};
