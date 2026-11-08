const express = require('express')

const route = express.Router()

const {insertCategory, insertItem, updateItem,
       getAllItems, getAllCategoryNames} = require('../db/queries')

const { body } = require('express-validator')



route.get('/:item', async(req, res, next)=>{
    
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
route.post('/:item', async(req, res, next)=>{
    const {name, amount, pic, category} = req.body
    const {item} = req.params

    await updateItem(item, name, amount, pic, category)

    res.redirect('/')
})


module.exports = route

