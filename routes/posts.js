const router = require("express").Router();
const { verifyToken } = require('./token');
const PostService = require('../services/post_service');


router.post('/post', verifyToken, async function (req, res, next) {

	const post = await PostService.addPost(req.user, req.body);
	if (!post.success)
		return res.status(post.statusCode).send(post);
	res.status(200).send(post);

});

router.get('/post/:id', async function (req, res, next) {
	const post = await PostService.getPost(req.params.id);
	if (!post.success)
		return res.status(post.statusCode).send(post);
	res.status(200).send(post);
});


// only author || moderator || admin

router.put('/post/:id', verifyToken, async function (req, res, next) {

	const post = await PostService.editPost(req.user, req.params.id, req.body);
	if (!post.success)
		return res.status(post.statusCode).send(post);
	res.status(200).send(post);

});

router.delete('/post/:id', verifyToken, async function (req, res, next) {

	const post = await PostService.deletePost(req.user, req.params.id);
	if (!post.success)
		return res.status(post.statusCode).send(post);
	res.status(200).send(post);
});


router.get('/posts', async function (req, res, next) {

	const posts = await PostService.getPosts(req.query);
	if (!posts.success)
		return res.status(posts.statusCode).send(posts);
	res.status(200).send(posts);
});


module.exports = router;