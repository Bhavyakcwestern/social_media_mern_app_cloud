
import jwt from 'jsonwebtoken';
// when user click like button =>auth middleware (NEXT) =>LIKE Controller.....
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decodedData = jwt.verify(token, 'test');
        req.userId = decodedData?.id;

        next();
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({ message: "Authentication failed" });
    }
};

export default auth;