import express from 'express';
const routers = express.Router();
import blogPosts from "../content.js";
import checkIdExists from '../middleware/checkIdExists.js';
import postController from "../controllers/postController.js";
// const blogPosts = content.blogPosts;

//Index
routers.get("/", postController.index);

//Show
routers.get("/:id", checkIdExists, postController.show);

//Store
routers.post('/', postController.store);

//Update
routers.put('/:id', checkIdExists, postController.update);

//Modify
routers.patch('/:id', checkIdExists, postController.modify);

//Destroy
routers.delete('/:id', checkIdExists, postController.destroy);

export default routers;
