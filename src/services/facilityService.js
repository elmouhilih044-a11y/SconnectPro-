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
async function updateFacility(id, data) {
    const result = await db.pool.query(
        `UPDATE facilities
         SET name = $1,
             type = $2,
             erp_capacity = $3,
             is_divisible = $4
         WHERE id = $5
         RETURNING *`,
        [
            data.name,
            data.type,
            data.erp_capacity,
            data.is_divisible,
            id
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
    createFacility,
    updateFacility
};