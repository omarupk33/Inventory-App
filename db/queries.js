const {pool} = require('./pool')


const getAllItems = async ()=>{
    const allItems = await pool
    .query('SELECT * FROM items;')
    console.log(allItems)
    return allItems.rows
}


// Fix category here as it's not appearing in te 
const insertItem = async(item, num, pic, category)=>{
    await pool.query(`INSERT INTO items
        (ItemName, ItemNum, ItemPic, category) 
        VALUES (($1), ($2), ($3), ($4));`, [item, num, pic,category])

    await pool.query(`UPDATE categories 
        SET relateditems = array_append(relateditems, ($1)) 
        WHERE categoryname = ($2);`, [item, category])
}



const getAllCategoryNames = async ()=>{
    const allCategories = await pool
    .query('SELECT categoryname FROM categories;')
    console.log(allCategories)
    return allCategories.rows
}


const insertCategory = async(category)=>{
    await pool.query(`INSERT INTO categories
    (CategoryName) 
    VALUES (($1));`, [category])

}

const updateCategoryNum = async(category, items)=>{
    await pool.query(`UPDATE categories
SET relateditemsnum = ($1)
WHERE categoryname = ($2);`, [items.length,category])
}

// Working on it
const itemsBelongTo = async(category, item)=>{
    await pool.query(`SELECT ItemName FROM 
        items relateditemsnum = ($1)
WHERE categoryname = ($2);`, [item,category])
}



module.exports = {insertItem, getAllItems, insertCategory,
    updateCategoryNum, getAllCategoryNames}