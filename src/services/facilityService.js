const db=require('./config/db')

async function getFacilities() {
    const result=await db.pool.query(
        'SELECT * FROM facilities ORDER BY id'
    )
    return result.rows
} 
module.exports={
    getFacilities
}