const express = require('express')

const route = express.Router()

const {deleteItem, deleteCategory,
getAllItems, getAllCategoryNames
} = require('../db/queries')

route.get('/:item', async(req, res, next)=>{
    
try{
    const items = await getAllItems()
    const item = items.find(item => item.itemname === req.params.item)
    if(!item){
        throw new Error('Database Connection Failed')
    }
    await deleteItem(item)
    res.redirect('/')
    }

   catch(err){
    next(err)
   }
})



route.get('/:category', async(req, res, next)=>{
    
   try{

    const categories = await getAllCategoryNames()
 
    const category = categories.
    find(category => category.categoryname === req.params.category)

    if(!category){
        throw new Error('Database Connection Failed')
    }
       await deleteCategory(category)
       res.redirect('/')
   }

   catch(err){
    next(err)
   }
})


module.exports = route
