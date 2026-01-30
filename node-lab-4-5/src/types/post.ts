import { Document, Types } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  author: Types.ObjectId;
  tags?: string[];
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostDocument extends IPost, Document {}
