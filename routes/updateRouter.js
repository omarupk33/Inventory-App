const express = require('express')

const route = express.Router()

const {updateItem,
       getAllItems, getAllCategoryNames,
        updateCategory} = require('../db/queries')

route.get('/items/:item', async(req, res, next)=>{
    
   try{
    const items = await getAllItems()
    const categories = await getAllCategoryNames()
    const item = items.find(item => item.itemname === req.params.item)
    if(!item || !categories || categories.length === 0){
        throw new Error('Database Connection Failed')
    }
    res.render('updateItem.ejs', {categories, item})
    }

   catch(err){
    next(err)
   }
})


// Here
route.post('/items/:item', async(req, res, next)=>{
    const {name, amount, pic, category} = req.body
    const {item} = req.params
    await updateItem(item, name, amount, pic, category)
    res.redirect('/')
})


// Start building Category updates

route.get('/categories/:category', async(req, res, next)=>{
    
   try{

    const categories = await getAllCategoryNames()
 
    const category = categories.
    find(category => category.categoryname === req.params.category)

    if(!category || !categories || categories.length === 0){
        throw new Error('Database Connection Failed')
    }

       res.render('updateCategory.ejs', {category})
   }

   catch(err){
    next(err)
   }
})



route.post('/categories/:category', async(req, res, next)=>{
    try{
    const {newCategory} = req.body
    const {category} = req.params

    console.log(category)
    console.log(newCategory)


    if(!category || !newCategory){
        throw new Error('Database Connection Failed')
    }

    await updateCategory(category, newCategory)
    res.redirect('/')}
    catch(err){
        next(err)
    }
})


module.exports = route

