import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SALT_ROUNDS, SECRET } from "../constants.js";
import User from "../models/User.model.js";
import { getUserByEmail } from '../dao/user.dao.js';

export const register = async (req, res) => {
    const { password, ...data } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = new User({ ...data, password: hashedPassword }); 
        await user.save();
        res.status(201).send('User created successfully!');
    }
    catch(e) {
        res.status(500).send('Could not create user!');
    };
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Missing credentials');        
    };

    try {
        const user = await getUserByEmail(email);
        console.log(user);
        const match = await bcrypt.compare(password, user.password);
        console.log(match);

        if (match) { //login
            const token = jwt.sign({
                id: user._id.toString(),
                email: user.email,
                role: user.role
            }, SECRET, { expiresIn: 60 * 60 * 24 });

            res.status(200).send({ token });
        }
        else {
            res.status(401).send('Wrong email or password');
        };
    }
    catch(e) {
        console.log(e);
        res.status(500).send('Something went wrong');
    };
};