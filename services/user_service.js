const User = require('../models/user');
const { error_json, success_json } = require('../utils/helpers');

module.exports = class UserService {
    static async getUsers(session) {
        // only admin can see all the users
        if (session.role != 'admin')
            return error_json(false, 401, "Not authorized");
        else {
            try {
                var numUsers = await User.countDocuments({});
                var res = await User.find({}, { password: 0 });
                return success_json(true, 200, { total: numUsers, users: res });
            }
            catch (err) {
                console.log(err.message);
                return error_json(false, 422, "Bad request");
            }
        }
    }

    static async getUser(userId) {

        try {
            var user = await User.findById({ _id: userId }, { password: 0 });
            if (!user)
                return error_json(false, 404, "User not found");
            else
                return success_json(true, 200, user);
        }
        catch (err) {
            console.log(err.message);
            return error_json(false, 422, "Bad request");
        }
    }

    static async editUser(userId, data) {
        try {

        } catch (err) {
            console.log(err.message);
            return error_json(false, 422, "Bad request");
        }
    }
}