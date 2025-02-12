const jwt = require('jsonwebtoken');

const requireSignin = (req, res, next) => {
    try{
        const decoded = jwt.verify(
            req.headers.authorization, 
            process.env.JWT_SECRET
        );
        next();
    }catch(err){
        return res.status(401).json({error: 'Unauthorized'});
    }
}