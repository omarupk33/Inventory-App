const {pool} = require('./pool')


const getAllItems = async ()=>{
    const allItems = await pool
    .query('SELECT * FROM items;')
    return allItems.rows
}

const insertItem = async(item, num, pic, categories)=>{
    await pool.query(`INSERT INTO items
        (ItemName, ItemNum, ItemPic, category) 
        VALUES (($1), ($2), ($3), ($4));`, [item, num, pic,categories])

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



// Working on it
const itemsBelongTo = async(category, item)=>{
    await pool.query(`SELECT ItemName FROM 
        items relateditemsnum = ($1)
WHERE categoryname = ($2);`, [item,category])
}


// Add a function to delete categories and items
// should remove from category 
const deleteItem = async(item)=>{
    await pool.query(`DELETE FROM items 
        WHERE itemname = ($1);`, [item])
    }

    // When deleting category we should remove its name from the items
const deleteCategory = async(category)=>{
    await pool.query(`DELETE FROM categories 
        WHERE categoryname = ($1);`, [category])
    }


// Update these functions
// 
const updateItem = async(item, newName, newNum, newPic, newCategories)=>{
    await pool.query(`UPDATE items 
        SET itemname = ($1), itemnum = ($2),
        itempic = ($3), category = $4
        WHERE itemname = ($5);`, [newName, newNum,
        newPic, newCategories, item])

    await pool.query(`UPDATE categories 
        SET relateditems = array_remove(relateditems, ($1));`, [item])

    await pool.query(`UPDATE categories 
    SET relateditems = array_append(relateditems, ($1))
    WHERE categoryname = ANY($2);`, [newName, newCategories])

}
    

    // Later
const updateCategory = async(oldCategory, newCategory)=>{
    await pool.query(`UPDATE categories 
        SET categoryname = ($1),
        WHERE categoryname = ($2);`, [newCategory, oldCategory])

    await pool.query(`UPDATE items 
        SET category = array_remove(category ,($1));`, [oldCategory])

    await pool.query(`UPDATE items 
        SET category = array_append(category ,($1));`, [newCategory])

    }



module.exports = {insertItem, getAllItems, insertCategory,
    getAllCategoryNames, updateItem,
    updateCategory}