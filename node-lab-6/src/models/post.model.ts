import mongoose, { Schema } from 'mongoose';
import { IPostDocument } from '../types/post.types';

const postSchema = new Schema<IPostDocument>(
	{
		title: {
			type: String,
			required: [true, 'Title is required'],
			trim: true,
			minlength: [3, 'Title must be at least 3 characters'],
		},
		content: {
			type: String,
			required: [true, 'Content is required'],
			minlength: [10, 'Content must be at least 10 characters'],
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Author is required'],
		},
		tags: {
			type: [String],
			default: [],
		},
		published: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

export const Post = mongoose.model<IPostDocument>('Post', postSchema);
