import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Unauthorised Token",
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch(err){
        res.status(401).json({
            error: "Invalid or expired token",
        });
    }
};