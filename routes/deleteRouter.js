const express = require('express')

const route = express.Router()

const {deleteItem, deleteCategory,
getAllItems, getAllCategoryNames
} = require('../db/queries')

route.post('/items/:item', async(req, res, next)=>{
    
try{
    if(!deleteItem){
        throw new Error('Database Connection Failed')
    }
    await deleteItem(req.params.item)
    res.redirect('/')
    }

   catch(err){
    next(err)
   }
})


route.post('/categories/:category', async(req, res, next)=>{

    console.log(req.params.category)
    console.log(typeof req.params.category)
    
   try{

    if(!deleteCategory){
        throw new Error('Database Connection Failed')
    }
       await deleteCategory(req.params.category)
       res.redirect('/')
   }

   catch(err){
    next(err)
   }
})


module.exports = route
