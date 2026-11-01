require('dotenv').config()

const express = require('express')
const {getAllItems, InsertItem} = require('./db/queries')
const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))


app.get('/', async (req, res)=>{
    const users = await getAllItems()
    res.render('index.ejs', {users:users})
})

app.get('/new', (req, res)=>{
    res.render('new.ejs')

})


app.post('/new', async(req, res)=>{
    const {name, amount, pic} = req.body
    await InsertItem(name, amount, pic)
    res.redirect('/')
})


app.listen(3000, (error)=>{
 if(error){
    throw Error(error)
 }
 console.log(`connected to port ${3000}`)
})