const router = require("express").Router();
const AuthService = require('../services/auth_service');


router.post('/register', async (req, res, next) => {

    const register = await AuthService.register(req.body);
    if (!register.success)
        return res.status(register.statusCode).send(register);
    res.status(200).send(register);
});

router.post('/login', async (req, res, next) => {

    const login = await AuthService.login(req.body);
    if (!login.success)
        return res.status(login.statusCode).send(login);
    res.status(200).header('Authorization', 'Bearer ' + login.result).send(login);

});

module.exports = router;