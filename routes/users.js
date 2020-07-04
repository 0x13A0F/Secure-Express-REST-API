const router = require("express").Router();
const User = require('../models/user');
const UserService = require('../services/user_service');
const { verifyToken } = require('./token');
const { error_json } = require('../utils/helpers');


router.get('/users', verifyToken, async (req, res, next) => {
    try {
        const users = await UserService.getUsers(req.user);
        if (!users.success)
            return res.status(users.statusCode).json(users);
        res.send(users);
    }
    catch (err) {
        next(err);
    }

});

router.get('/user/:id', async (req, res, next) => {
    try {
        const user = await UserService.getUser(req.params.id);
        if (!user.success)
            return res.status(user.statusCode).json(user);
        res.send(user);
    }
    catch (err) {
        next(err);
    }
});

router.put('/user/:id', verifyToken, async (req, res, next) => {
    try {
        const user = await UserService.editUser(req.user, req.params.id, req.body);
        if (!user.success)
            return res.status(user.statusCode).json(user);
        res.send(user);
    }
    catch (err) {
        next(err);
    }
})

router.delete('/user/:id', verifyToken, async (req, res, next) => {
    try {
        const userToDelete = await UserService.deleteUser(req.user, req.params.id);
        if (!userToDelete.success)
            return res.status(userToDelete.statusCode).json(userToDelete);
        res.send(userToDelete);
    }
    catch (err) {
        next(err);
    }

});

module.exports = router;