import * as categoryServices  from '../services/categoryServices.js'

export const getAllCategories = async (req, res) => {

    try {
         const categories = await categoryServices.getAllCategory();

         if(!categories || categories.length === 0) return res.status(200).json({ message: "Categoría esta vacía."});

        res.status(200).json(categories);
    } catch (error) {   
        res.status(404).json({error});
    }
}

export const postCategory = async (req, res) => {
    try {
        const { name } = req.body  
        if (!name) return res.status(404).json({message: 'El nombre no puede estar vacío'});
        const newCategory = await categoryServices.postCategory(name);
        return res.status(200).json({newCategory})
    } catch (error) {
        return res.status(404).json({message: error})
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) return res.status(404).json({ message: 'No se encontró la categoria a eliminar'})
        const deleteCategory = await categoryServices.deleteCategory(id)
        res.status(200).json({message: `Se elimino la categoría ${deleteCategory.id}`})
    } catch (error) {
        
    }
}