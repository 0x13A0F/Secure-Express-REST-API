const Post = require('../models/post');
const { error_json, success_json } = require('../utils/helpers');
const { postValidation } = require('../utils/validation');

module.exports = class PostService {
    static async addPost(session, data) {


        // check if data is valid
        const { error } = postValidation(data)
        if (error)
            return error_json(400, error.details[0].message);

        // assigning user to the post	
        data.author_id = session.user_id;

        const post = await Post.create(data);
        if (!post)
            return error_json(500, "Error creating post");

        return success_json(200, post);


    }

    static async getPost(id) {

        var post = await Post.findById({ _id: id });
        if (!post)
            return error_json(404, "Post not found");
        return success_json(200, post);

    }

    static async editPost(session, id, data) {
        const post = await Post.findById({ _id: id });
        if (!post)
            return error_json(404, "Post not found");
        // check if user is author of the post or has higher role
        if (session.user_id == post.author_id || session.role == "moderator" || session.role == "admin") {
            // make sure author_id is not modified
            data.author_id = session.user_id;
            // if everything is ok edit the post
            var res = await Post.updateOne({ _id: id }, data);

            if (!res)
                return error_json(500, "Error editing post");

            res = await Post.findOne({ _id: id });
            return success_json(200, res);
        }
        else
            return error_json(401, "Not authorized");

    }

    static async deletePost(session, id) {

        // check if user is author of the post
        if (session.user_id == post.author_id || session.role == "moderator" || session.role == "admin") {
            const post = await Post.findOne({ _id: id });
            if (!post)
                return error_json(404, "Post not found");

            const res = await Post.deleteOne({ _id: id });
            if (!res)
                return error_json(500, "Error deleting post");

            return success_json(200, { "ok": res.ok });

        }
        else
            return error_json(401, "Not Authorized");


    }

    static async getPosts(query) {

        var perPage = 4;
        try {
            var page = parseInt(query.page);
            if (page <= 0) page = 1;
        }
        catch { var page = 1; }
        var qry = {};
        if (query.category) qry.categories = query.category;
        if (query.tag) qry.tags = query.tag;
        if (query.author_id) qry.author_id = query.author_id;

        const posts = await Post.find(qry, {}, { skip: perPage * (page - 1), limit: perPage });
        if (!posts)
            return error_json(500, "Error getting posts");
        const count = await Post.countDocuments(qry);
        return success_json(200, { count: posts.length, total: count, posts: posts });

    }
}