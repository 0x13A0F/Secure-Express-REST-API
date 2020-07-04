const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../utils/validation');
const { createSecureToken } = require('../routes/token');
const { error_json, success_json } = require('../utils/helpers');

module.exports = class AuthService {

    static async login(credentials) {
        // check if data is valid
        const { error } = loginValidation(credentials);
        if (error)
            return error_json(400, error.details[0].message);

        // Check if user exists
        const user = await User.findOne({ username: credentials.username });
        if (!user)
            return error_json(400, "Username or Password invalid!");

        // check if password hash OK
        const result = await bcrypt.compare(credentials.password, user.password);
        if (!result)
            return error_json(400, "Username or Password invalid!");

        // create and assign JWT token
        const token = createSecureToken(user._id);
        if (!token)
            return error_json(500, "Error creating token");

        return success_json(200, token);

    }

    static async register(data) {

        // Check if data is valid
        const { error } = registerValidation(data)
        if (error)
            return error_json(400, error.details[0].message)

        // Check if user exists
        const usernameExist = await User.findOne({ username: data.username });
        if (usernameExist)
            return error_json(400, "Username already exists");

        const emailExist = await User.findOne({ email: data.email });
        if (emailExist)
            return error_json(400, "Email already exists");

        // check if passwords match
        if (data.password !== data.confirm_password)
            return error_json(400, "Passwords doesn't match");


        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, salt);

        // Create and save the user
        const user = new User({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            role: 'user'
        });

        var registeredUser = await user.save();
        if (!registerValidation)
            return error_json(500, "Error registering user ... please try again");

        return success_json(200, { id: user._id });


    }


}