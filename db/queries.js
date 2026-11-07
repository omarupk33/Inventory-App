const {pool} = require('./pool')


const getAllItems = async ()=>{
    const allItems = await pool
    .query('SELECT * FROM items;')
    console.log(allItems)
    return allItems.rows
}

const insertItem = async(item, num, pic, categories)=>{
    await pool.query(`INSERT INTO items
        (ItemName, ItemNum, ItemPic, category) 
        VALUES (($1), ($2), ($3), ($4));`, [item, num, pic,categories])

    console.log(categories)

    await pool.query(`UPDATE categories 
        SET relateditems = array_append(relateditems, ($1)) 
        WHERE categoryname = ANY($2);`, [item, categories])
}



const getAllCategoryNames = async ()=>{
    const allCategories = await pool
    .query('SELECT categoryname FROM categories;')
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


// Add a function to delete categories and items

const deleteItem = async(item)=>{
    await pool.query(`DELETE FROM items 
        WHERE itemname = ($1);`, [item])
    }

const deleteCategory = async(category)=>{
    await pool.query(`DELETE FROM categories 
        WHERE categoryname = ($1);`, [category])
    }


    // Update these functions
const updateItem = async(item)=>{
    await pool.query(`UPDATE TABLE items 
     WHERE itemname = ($1);`, [item])
    }

const updateCategory = async(category)=>{
    await pool.query(`DELETE FROM categories 
        WHERE categoryname = ($1);`, [category])
    }

module.exports = {insertItem, getAllItems, insertCategory,
    updateCategoryNum, getAllCategoryNames}