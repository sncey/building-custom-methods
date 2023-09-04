
const BlogPostModel = require("../models/blog-post");

// Add your controllers below



// Controller function to get similar authors by areas of expertise
const getAuthorsWithSimilarExpertise = async (req, res) => {
  try {
    const authorId = req.params.id
    const blogPost = await BlogPostModel.findOne({"author._id": authorId});
    if (!blogPost) {
      return res.status(404).json({ msg: "Author not found" });
    }

    const similarPosts = await BlogPostModel.findSimilarExpertise(blogPost.author.areasOfExpertise, blogPost.author._id);
    res.status(200).json(similarPosts);
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};



// Controller function to get author details
const getAuthorDetails = async (req, res) => {
  try {
    const authorId = req.params.id;

    const blogPost= await BlogPostModel.findOne({"author._id": authorId})
    if (!blogPost) {
      return res.status(400).json({ message: 'Author not found' });
    }

    const author = blogPost.author;
   
    

    const authorDetails = {
      firstName: author.firstName,
      lastName: author.lastName,
      fullName: author.fullName, // Accessing the virtual field
      age: author.age,
      gender: author.gender,
      nationality: author.nationality,
      areasOfExpertise: author.areasOfExpertise,
      _id: author._id,
    };

    res.status(200).json(authorDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};





// Controller function to update author full name
const updateAuthorFullName = async (req, res) => {
  try {
    const authorId = req.params.id;
    const { newFullName } = req.body;
    const blogPost = await BlogPostModel.findOne({"author._id": authorId})
    if(!blogPost) {
      return res.status(400).json({msg: "Author not found"})
    }

    blogPost.author.fullName = newFullName //sets the virtual function from model file
    await blogPost.save()
    res.status(204).send();
  } catch (error) {
    res.status(422).json({ message: error.message });
  }
};

module.exports = {
  getAuthorDetails,
  updateAuthorFullName,
  getAuthorsWithSimilarExpertise,
};