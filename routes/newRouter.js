
const express = require('express')

const route = express.Router()

const {InsertCategory, InsertItem} = require('./db/queries')




route.get('/', (req, res, next)=>{
    
   try{
       res.render('new.ejs')
   }

   catch(err){
    next(err)
   }
})


route.get('/newItem', (req, res, next)=>{


   try{
       res.render('newItem.ejs')
   }

   catch(err){
    next(err)
   }
})


route.post('/newItem', async(req, res, next)=>{

    try{
    
    const {name, amount, pic} = req.body

    if(!name || !pic || amount === 0){
        throw new Error('Values Invalid')
    }

    await InsertItem(name, amount, pic)

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

    await InsertCategory(category, beloningItems)

    res.redirect('/')
   }

   catch(err){
    next(err)
   }
})


module.exports = route