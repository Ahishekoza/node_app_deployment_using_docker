import { PostSchema } from "../models/postSchema.js";

export const getAllPost = async (req, res) => {
  try {
    const posts = await PostSchema.find();
    res.status(200).json({
      success: true,
      posts: posts,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = await PostSchema.create(req.body);
    res.status(200).json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};


export const updatePost = async (req, res) => {
    try {
        const updatedPost = await PostSchema.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({
          success: true,
          post: updatedPost,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
}