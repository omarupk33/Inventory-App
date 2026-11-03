const {pool} = require('./pool')


const getAllItems = async ()=>{
    const allItems = await pool
    .query('SELECT * FROM items;')
    console.log(allItems)
    return allItems.rows
}

const insertItem = async(item, num, pic)=>{
    await pool.query(`INSERT INTO items
    (ItemName, ItemNum, ItemPic) 
    VALUES (($1), ($2), ($3));`, [item, num, pic])
}



const getAllCategories = async ()=>{
    const allCategories = await pool
    .query('SELECT * FROM categories;')
    console.log(allCategories)
    return allCategories.rows
}


const insertCategory = async(category, numOfItems)=>{
    await pool.query(`INSERT INTO categories
    (CategoryName, RelatedItemsNum) 
    VALUES (($1), ($2));`, [category, numOfItems])
}

const updateCategoryNum = async(category, items)=>{
    await pool.query(`UPDATE categories
SET relateditemsnum = ($1)
WHERE categoryname = ($2);`, [items.length,category])
}

// Working on it
const itemBelongTo = async(category, item)=>{
    await pool.query(`UPDATE categories
SET relateditemsnum = ($1)
WHERE categoryname = ($2);`, [item,category])
}



module.exports = {insertItem, getAllItems, insertCategory,
    updateCategoryNum, getAllCategories}