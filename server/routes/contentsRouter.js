import { Router } from 'express';
import * as contentController from '../controllers/content.js'
import upload from '../services/Upload.js';

const contentRouter = Router();

contentRouter
  .route('/')
  .get(contentController.getAllContents)
  .post(upload.single('content'), contentController.addContent)

contentRouter
  .route('/:id')
  .get(contentController.getContentById)
  .put(contentController.updateContent)
  .delete(contentController.deleteContent)


contentRouter.patch('/:id', contentController.addTagToContent);
export default contentRouter;