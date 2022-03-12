const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
router.post('/signup', async(req, res) => {
    try {
        let user = new User(req.body);
        let users = await User.findOne({ email: user.email });
        if (users)
            return res.send({ msg: "email already registered" });
        users = await User.findOne({ userName: user.userName });
        if (users)
            return res.send({ msg: "username already taken" })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
    } catch (e) {
        console.log(e)
        res.send({ msg: "failed" })
    }
})
router.post('/login', async(req, res) => {
    try {
        let user = req.body;
        let users = await User.findOne({ email: user.email });
        if (!users)
            return res.send({ msg: "invalid email or password" })
        users = await bcrypt.compare(user.password, users.password);
        if (!users)
            return res.send({ msg: "invalid email or password" })
        users = await User.findOne({ email: user.email });
        let token = jwt.sign({ _id: users._id, fullName: users.fullName, email: users.email }, users.password)
        res.send({ token: token });
    } catch (e) {
        res.send({ msg: "failed" })
    }
})
module.exports = router;