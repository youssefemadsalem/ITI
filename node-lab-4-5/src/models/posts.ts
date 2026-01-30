import mongoose, { Schema } from "mongoose";
import { IPostDocument } from "../types/post";

const postSchema = new mongoose.Schema<IPostDocument>(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    content: {
      type: String,
      required: true,
      minLength: 10,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    tags: {
      type: [String],
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

postSchema.index({ author: 1 });
postSchema.index({ published: 1 });

const Post = mongoose.model<IPostDocument>("posts", postSchema);

export default Post;
