const {pool} = require('./pool')


const getAllItems = async ()=>{
    const allItems = await pool.query('SELECT * FROM inventory;')
    console.log(allItems)
    return allItems.rows
}

const InsertItem = async(item, num, pic)=>{
    await pool.query(`INSERT INTO inventory
    (ItemName, ItemNum, ItemPic) 
    VALUES (($1), ($2), ($3));`, [item, num, pic])
}


module.exports = {InsertItem, getAllItems}