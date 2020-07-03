const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
	title: {
		type: String,
		required: [true, "Title field is required"]
	},
	author_id: {
		type: ObjectId,
		required: true
	},
	categories: {
		type: [String],
		default: ['uncategorized']
	},
	content: {
		type: String,
		required: [true, "Content field is required"]
	},
	tags: {
		type: [String],
		required: [true, "Tags field is required"]
	}
}, { versionKey: false, timestamps: true });

const Post = mongoose.model('post', PostSchema);
module.exports = Post;