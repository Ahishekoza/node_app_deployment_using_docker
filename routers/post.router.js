import express from 'express';
import { createPost, getAllPost, updatePost } from '../controllers/post.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
const router = express.Router()

router.get('/',getAllPost)
router.post('/',protectRoute,createPost)
router.put('/:id',updatePost)


export {router}