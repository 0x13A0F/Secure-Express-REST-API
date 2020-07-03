const router = require("express").Router();
const User = require('../models/user');
const UserService = require('../services/user_service');
const { verifyToken } = require('./token');

router.get('/users', verifyToken, async (req, res, next) => {
    const users = await UserService.getUsers(req.user);
    if (!users.success)
        return res.status(users.statusCode).json(users);
    res.send(users);

});

router.get('/user/:id', async (req, res, next) => {
    const user = await UserService.getUser(req.params.id);
    if (!user.success)
        return res.status(user.statusCode).json(user);
    res.send(user);
});

module.exports = router;