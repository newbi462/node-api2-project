//Dependancies
const express = require("express");

// Import Data
//const ProjectData = require("./data/db.js");


//START WITH EXPRESS
const server = express();


//MIDDLE WARE
server.use(express.json());

//ROUTES
const apiPostsRoutes = require('./routes/apiPostsRoutes.js');
/*Separate the endpoints that begin with /api/posts into a separate Express Router
*/

//ENDPOINTS
server.use('/api/posts', apiPostsRoutes);
/* all endpoints that begin with /api/posts, so make and import that route separate
*/

//LISTEN SERVER
const port = 8000;
server.listen(port, () => console.log((`\n ** api on: ${port} ** \n`)));
