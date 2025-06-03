import express from 'express'
import { getAllCategories, postCategory , deleteCategory } from '../controllers/categoryController.js';

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories)
categoryRouter.post("/", postCategory)
categoryRouter.delete("/:id", deleteCategory)

export default categoryRouter;