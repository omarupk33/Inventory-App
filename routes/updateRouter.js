const express = require('express')

const route = express.Router()

const {insertCategory, insertItem,
     getAllItems, getAllCategoryNames} = require('../db/queries')



route.get('/:item', async(req, res, next)=>{
    
   try{

    const items = await getAllItems()
    const categories = await getAllCategoryNames()

    // Here something is wrong
    const item = items.find(item => item.itemname === req.params.item)

    if(!items || items.length === 0 ||
       !categories || categories.length === 0){
        throw new Error('Database Connection Failed')
    }

       res.render('update.ejs', {categories, item})
   }

   catch(err){
    next(err)
   }
})

route.post('/:id', (req, res, next)=>{
    
   try{
       res.render('new.ejs')
   }

   catch(err){
    next(err)
   }
})


module.exports = route

