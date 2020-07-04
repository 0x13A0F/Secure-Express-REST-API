const User = require('../models/user');
const { error_json, success_json } = require('../utils/helpers');
const { userValidation } = require('../utils/validation');
const bcrypt = require('bcryptjs');

module.exports = class UserService {
    static async getUsers(session) {
        // only admin can see all the users
        if (session.role != 'admin')
            return error_json(401, "Not authorized");
        else {
            var numUsers = await User.countDocuments({});
            var res = await User.find({}, { password: 0 });
            return success_json(200, { total: numUsers, users: res });
        }
    }

    static async getUser(userId) {

        var user = await User.findById({ _id: userId }, { password: 0 });
        if (!user)
            return error_json(404, "User not found");
        else
            return success_json(200, user);

    }

    static async editUser(session, userId, data) {

        // check if data is valid
        const { error } = userValidation(data);
        if (error)
            return error_json(400, error.details[0].message);

        if (session.user_id == userId || session.role == "admin") {
            // make sure role is not modifed
            data.role = session.role;
            // check if new username doesn't exist
            var res = await User.findOne({ username: data.username, _id: { $ne: session.user_id } })
            if (res)
                return error_json(400, "This username already exists");
            // check if new email doesnt' exist
            res = await User.findOne({ email: data.email, _id: { $ne: session.user_id } });
            console.log(res);
            if (res)
                return error_json(400, "This email already exists");

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            data.password = hashedPassword;
            // if everything is ok Edit the user
            const user = await User.findOneAndUpdate({ _id: session.user_id }, data);
            if (!user)
                return error_json(500, "Error editing user");
            const editedUser = await User.findOne({ _id: session.user_id }, { password: 0 });
            return success_json(200, editedUser)
        } else {
            return error_json(401, "Not authorized");
        }

    }

    static async deleteUser(session, id) {
        // only admin can delete users
        if (session.role == "admin") {
            var res = await User.findOne({ _id: id });
            if (!res)
                return error_json(404, "User not found");
            res = await User.deleteOne({ _id: id });
            if (!res)
                return error_json(500, "Error deleting post");

            return success_json(200, { "ok": res.ok });

        } else {
            return error_json(401, "Not authorized");
        }
    }
}