const router = require("express").Router();
const { verifyToken } = require('./token');
const PostService = require('../services/post_service');


router.post('/post', verifyToken, async function (req, res, next) {
	try {
		const post = await PostService.addPost(req.user, req.body);

		if (!post.success)
			return res.status(post.statusCode).send(post);

		res.status(200).send(post);
	}
	catch (err) {
		next(err);
	}

});

router.get('/post/:id', async function (req, res, next) {
	try {

		const post = await PostService.getPost(req.params.id);
		if (!post.success)
			return res.status(post.statusCode).send(post);
		res.status(200).send(post);
	}
	catch (err) {
		next(err);
	}
});


// only author || moderator || admin

router.put('/post/:id', verifyToken, async function (req, res, next) {
	try {
		const post = await PostService.editPost(req.user, req.params.id, req.body);
		if (!post.success)
			return res.status(post.statusCode).send(post);
		res.status(200).send(post);
	}
	catch (err) {
		next(err);
	}
});

router.delete('/post/:id', verifyToken, async function (req, res, next) {
	try {
		const post = await PostService.deletePost(req.user, req.params.id);
		if (!post.success)
			return res.status(post.statusCode).send(post);
		res.status(200).send(post);
	}
	catch (err) {
		next(err);
	}
});


router.get('/posts', async function (req, res, next) {
	try {
		const posts = await PostService.getPosts(req.query);
		if (!posts.success)
			return res.status(posts.statusCode).send(posts);
		res.status(200).send(posts);
	}
	catch (err) {
		next(err);
	}
});


module.exports = router;