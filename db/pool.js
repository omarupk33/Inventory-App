const {Pool} = require('pg')

const owner = process.env.OWNER
const password = process.env.PASSWORD
const port = process.env.PORT

const pool = new Pool({
    connectionString:`postgresql://${owner}:${password}@localhost:${port}/inventory`,
}) 

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle database client:', err.message)
})

module.exports = {pool}