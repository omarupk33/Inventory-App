
const express = require('express')
const {getAllItems, InsertItem, getAllCategoryNames} = require('./db/queries')
const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))


const newRouter = require('./routes/newRouter')
const updateRouter = require('./routes/updateRouter')
const deleteRouter = require('./routes/deleteRouter')



app.get('/', async (req, res, next)=>{
    try{
    
    const items = await getAllItems()
    const categories = await getAllCategoryNames()
    
    if(!items || items.length === 0 ||
       !categories || categories.length === 0){
        throw new Error('Database Connection Failed')
    }
        
    res.render('index.ejs', {items:items, categories:categories})
   }

   catch(err){
    next(err)
   }
})

app.use('/new', newRouter)
app.use('/update', updateRouter)
app.use('/delete', deleteRouter)




app.use((req, res, next)=>{
    res.status(404).json({success: false, Message: 'Page Not Found'})
})

app.use(( err, req, res, next)=>{
   if(res.headersSent){
    return next(err)
   }

   console.error('Logged Error:', err.stack)

   const statusCode = err.statusCode || 500

   res.status(statusCode).json( {
    success:false, message: err.message || 'Internal Server Error',
   })

})



app.listen(3000, (error)=>{
 if(error){
    throw Error(error)
 }
 console.log(`connected to port ${3000}`)
})


