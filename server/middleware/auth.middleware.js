import jwt from 'jsonwebtoken';
import { SECRET } from '../constants.js';

const verifyJwtToken = async (req, res, next) => {
    const token = req.header('x-access-token');
    // console.log(token);

    try {
        const decoded = jwt.verify(token, SECRET);
        console.log(decoded);

        if (decoded) {
            req.user = {
                id: decoded.id,
                role: decoded.role,
                email: decoded.email
            };
            next();
        } 
        else {
            return res.status(401).send('Unauthorized');
        };
    }
    catch(e) {
        console.log(e);
        res.status(401).send('Unauthorized!');
    };
};

export default verifyJwtToken;