const mongoose = require("mongoose");

const blogAuthor = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  nationality: {
    type: String,
  },
  areasOfExpertise: {
    type: [String],
  },
});

const blogPost = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    tags: {
      type: [String],
    },
    likes: {
      type: Number,
    },
    author: blogAuthor,
  },
  { timestamps: true }
);

blogAuthor.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
}).set(function (fullName) {
  const [firstName, lastName] = fullName.split(" ");
  this.set("firstName", firstName);
  this.set("lastName", lastName)
});

// Virtual field for blog post creation time in GMT
blogPost.virtual('createdAtGMT').get(function () {
  const createdAt = this.createdAt;
  return createdAt.toGMTString();
});

blogPost.statics.findSimilarTags = function (tags, id)  {
  return this.find({tags: {$in: tags}, _id: {$ne: id}})
  // return similarPosts;
}

blogPost.statics.findSimilarExpertise = function(areasOfExpertise,id){
  const similarAuthor = this.find({"author.areasOfExpertise": {$in: areasOfExpertise}, "author._id": {$ne: id}})
return similarAuthor;
}



module.exports = mongoose.model("BlogPost", blogPost);


