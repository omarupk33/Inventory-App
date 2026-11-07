require('dotenv').config()



const {Client} = require('pg')

    SQL = `CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY
        KEY GENERATED ALWAYS AS IDENTITY, ItemName VARCHAR (255), 
        ItemNum INTEGER, ItemPic VARCHAR, category  TEXT[]);

        INSERT INTO items (ItemName, ItemNum, ItemPic, category)
        VALUES ('Miswak', 2, 'PLACEHODLER', ARRAY['Cleaning Product']);
    `


const owner = process.env.OWNER
const password = process.env.PASSWORD
const port = process.env.PORT

async function main(){
    console.log('Seeding...')
    const client = new Client({
        connectionString:`postgresql://${owner}:${password}@localhost:${port}/inventory`,
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log('Done!')
}

main()