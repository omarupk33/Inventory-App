require('dotenv').config()

const express = require('express')
const queries = require('./db/queries')
const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res)=>{
    const all = queries.getAllItems()
    res.send(all)
})

app.get('/new', (req, res)=>{
    res.send('made')
})


app.listen(+process.env.PORT, (error)=>{
 if(error){
    throw Error(error)
 }
 console.log(`connected to port ${process.env.PORT}`)
})