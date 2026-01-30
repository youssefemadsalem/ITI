import Post from "../models/posts";
import { IPost } from "../types/post";

class PostsService {
  static async getAllPosts() {
    const posts = await Post.find().populate("author", { password: 0 });
    return posts;
  }
  static async getPostById(id: string) {
    const post = await Post.findOne({ _id: id }).populate("author", {
      password: 0,
    });
    return post;
  }
  static async createPost(post: IPost) {
    const { title, content, author, tags, published } = post;
    const newPost = Post.create({ title, content, author, tags, published });
    return newPost;
  }
  static async updatePost(id: string, post: IPost) {
    const { title, content, author, tags, published } = post;
    const updatedPost = await Post.findOneAndUpdate(
      { _id: id },
      { title, content, author, tags, published },
      { new: true },
    );
    return updatedPost;
  }
  static async deletePost(id: string) {
    const deletedPost = await Post.findOneAndDelete({ _id: id });
    return deletedPost;
  }
}

export default PostsService;
