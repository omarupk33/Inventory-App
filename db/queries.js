const {pool} = require('./pool')


const getAllItems = async ()=>{
    const allItems = await pool.query('SELECT * FROM inventory;')
    return allItems.rows
}

const InsertItem = async(item, num, pic)=>{
    const allItems = await pool.query(`INSERT INTO TABLE inventory
    (ItemName, ItemNum, ItemPic) 
    VALUES ((%1),(%2), (%3))`, [item, num, pic])
    return allItems.rows
}


module.exports = {InsertItem, getAllItems}