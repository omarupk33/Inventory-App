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
}



const getAllCategoryNames = async ()=>{
    const allCategories = await pool
    .query('SELECT CategoryName FROM categories;')
    console.log(allCategories)
    return allCategories.rows
}


const insertCategory = async(category, numOfItems)=>{
    await pool.query(`INSERT INTO categories
    (CategoryName, RelatedItemsNum) 
    VALUES (($1), ($2));
    
    INSERT INTO belongsTo (CategoryName) 
    SELECT CategoryName FROM categories
    WHERE CategoryName NOT IN 
    (SELECT CategoryName FROM belongsTo);
    
    `, [category, numOfItems])
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