//Separate the endpoints that begin with /api/posts into a separate Express Router
const express = require('express');

const ProjectData = require("./../data/db.js");

const apiPostsRoutes = express.Router();



//POST	/api/posts	Creates a post using the information sent inside the request body.
apiPostsRoutes.post("/", function(request, response) {
  const newPost = request.body;
  ProjectData.insert(newPost)
    .then(post => {
      //console.log(newPost);
      if (typeof newPost.title == "string" && typeof newPost.contents == "string") {
        response.status(201).json(post);
      }
      else {
        response.status(400).json(
          {
            errorMessage: "Please provide title and contents for the post."
          }
        )
      }
    })
    .catch( error => {
      console.log(error);
      response.status(500).json(
        {
          error: "There was an error while saving the post to the database"
        }
      )
    })
});

//POST	/api/posts/:id/comments	Creates a comment for the post with the specified id using information sent inside of the request body.
apiPostsRoutes.post("/:id/comments", function(request, response) {
  const newPostComent = request.body;
  const id = request.params.id;
  console.log(newPostComent);
  ProjectData.findById(id)
    .then(posts => {
      if (posts.length == 0) {
        response.status(404).json(
          {
            message: "The post with the specified ID does not exist."
          }
        )
      }
      if (typeof newPostComent.text != "string") {
        response.status(400).json(
          {
            errorMessage: "Please provide text for the comment."
          }
        )
      }
      //response.status(200).json(posts);
      console.log(posts.length);
    })
    .catch(

    )
});

//GET	/api/posts	Returns an array of all the post objects contained in the database.
apiPostsRoutes.get("/", function(request, response) {
  ProjectData.find()
    .then(posts => {
      response.status(200).json(posts);
      //console.log(posts);
    })
    .catch( error => {
      console.log(error);
      response.status(500).json(
        {
          error: "The posts information could not be retrieved."
        }
      )
    })
});

//GET	/api/posts/:id	Returns the post object with the specified id.


//GET	/api/posts/:id/comments	Returns an array of all the comment objects associated with the post with the specified id.


//DELETE	/api/posts/:id	Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.


//PUT	/api/posts/:id	Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.


module.exports = apiPostsRoutes;
