const db=require('./config/db')

async function getFacilities() {
    const result=await db.pool.query(
        'SELECT * FROM facilities ORDER BY id'
    )
    return result.rows
} 
async function createFacility(data) {
    const result = await db.pool.query(
        `INSERT INTO facilities
        (name, type, erp_capacity, is_divisible)
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [
            data.name,
            data.type,
            data.erp_capacity,
            data.is_divisible
        ]
    );

    return result.rows[0];
}
module.exports={
    getFacilities
}
module.exports = {
    getAllFacilities,
    getFacilityById,
    createFacility
};