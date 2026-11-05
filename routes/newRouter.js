
const express = require('express')

const route = express.Router()

const {insertCategory, insertItem,
     getAllItems, getAllCategoryNames} = require('../db/queries')




route.get('/', (req, res, next)=>{
    
   try{
       res.render('new.ejs')
   }

   catch(err){
    next(err)
   }
})


route.get('/newItem', async (req, res, next)=>{

// I broke something here
   try{
    const categories = await getAllCategoryNames()
       res.render('newItem.ejs', {categories:categories})
   }

   catch(err){
    next(err)
   }
})


route.post('/newItem', async(req, res, next)=>{

    try{
    
    const {name, amount, pic, category} = req.body

    if(!name || !pic || amount === 0 || !category){
        throw new Error(`Values Invalid name: ${name} pic: ${pic} amount:${typeof amount}:${amount} category: ${category}`)
    }

    await insertItem(name, amount, pic, category)

    res.redirect('/')
   }

   catch(err){
    next(err)
   }
})



route.get('/newCategory', (req, res, next)=>{


   try{
       res.render('newCategory.ejs')
   }

   catch(err){
    next(err)
   }
})


route.post('/newCategory', async(req, res, next)=>{

    try{
    
    const {category, beloningItems} = req.body

    if(!category){
        throw new Error('Values Invalid')
    }

    await insertCategory(category, beloningItems)

    res.redirect('/')
   }

   catch(err){
    next(err)
   }
})


module.exports = route