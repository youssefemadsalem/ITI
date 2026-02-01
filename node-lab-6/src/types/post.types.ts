import { Document, Types } from 'mongoose';

export interface IPost {
	title: string;
	content: string;
	author: Types.ObjectId;
	tags: string[];
	published: boolean;
}

export interface IPostDocument extends IPost, Document {
	_id: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}
