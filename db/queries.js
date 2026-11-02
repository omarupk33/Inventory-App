const {pool} = require('./pool')


const getAllItems = async ()=>{
    const allItems = await pool.query('SELECT * FROM items;')
    console.log(allItems)
    return allItems.rows
}

const InsertItem = async(item, num, pic)=>{
    await pool.query(`INSERT INTO items
    (ItemName, ItemNum, ItemPic) 
    VALUES (($1), ($2), ($3));`, [item, num, pic])
}



const getAllCategories = async ()=>{
    const allCategories = await pool.query('SELECT * FROM categories;')
    console.log(allCategories)
    return allCategories.rows
}


const InsertCategory = async(category, numOfItems)=>{
    await pool.query(`INSERT INTO categories
    (CategoryName, RelatedItemsNum) 
    VALUES (($1), ($2));`, [category, numOfItems])
}



module.exports = {InsertItem, getAllItems}