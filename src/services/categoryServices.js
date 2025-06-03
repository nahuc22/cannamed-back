import { Category } from '../db.js'

export const getAllCategory = async () => {
        const categories = await Category.findAll();
        return categories;
} 

export const postCategory = async (name) => {
    if(!name) return null;
    const newCategory = await Category.create({
        name: name
    })
    return newCategory;
}

export const deleteCategory = async (id) => {
    if (!id) return null;
    const categoryToDelete = await Category.destroy({where: {id}})
    return categoryToDelete;
}