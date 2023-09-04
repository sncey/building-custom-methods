const BlogPostModel = require("../models/blog-post");

// The controller to fetch all blogposts has been written for you
const getAllBlogPosts = async (_, res) => {
  const blogPosts = await BlogPostModel.find();
  res.json(blogPosts);
};

// The controller to add a new blogpost has been written for you
const addBlogPost = async (req, res) => {
  const blogPostData = req.body;
  try {
    const newBlogPost = await BlogPostModel.create(blogPostData);
    res.status(201).json(newBlogPost);
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

// Add your controllers below

const getBlogPostsWithSimilarTags = async (req, res) => {
  try {
    const postId = req.params.id
    const blogPost = await BlogPostModel.findById(postId);
    if (!blogPost) {
      return res.status(404).json({ msg: "Blog post not found" });
    }

    const similarPosts = await BlogPostModel.findSimilarTags(blogPost.tags, blogPost._id);
    res.status(200).json(similarPosts);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
}


const getCreatedAtTimeGMT = async(req,res)=>{
  try{
    const postId =req.params.id;
    const blogPost=await BlogPostModel.findById(postId);
    if(!blogPost){
      return res.status(404).json({msg:"Blog post not found"});
    }

    const createdAtGMT=await blogPost.createdAtGMT;
    res.status(200).json(createdAtGMT);
  }   catch(error){
    res.status(422).json({message:error.message});
  }
}


module.exports = {
  getAllBlogPosts,
  addBlogPost,
  getBlogPostsWithSimilarTags,
  getCreatedAtTimeGMT,
  
};