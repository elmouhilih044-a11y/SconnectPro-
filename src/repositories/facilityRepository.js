const db = require('../config/db');

async function getFacilities() {
    const result = await db.pool.query(
        'SELECT * FROM facilities ORDER BY id'
    )
    return result.rows;
}

async function getFacility(id) {
    const result = await db.pool.query(
        'SELECT * FROM facilities WHERE id = $1',[id]
    )
    return result.rows[0];
}

async function addFacility(facility) {
    const result = await db.pool.query(
        `INSERT INTO facilities (name, type, erp_capacity, is_divisible)
         VALUES ($1, $2, $3, $4) RETURNING*`,
        [
         facility.name,
         facility.type,
         facility.erp_capacity,
         facility.is_divisible
        ]
    )
    return result.rows[0]

}

async function editFacility(id, facility) {
    const result = await db.pool.query(
        `UPDATE facilities
         SET name = $1,
             type = $2,
             erp_capacity = $3,
             is_divisible = $4
         WHERE id = $5 RETURNING *`,
        [
         
         facility.name,
         facility.type,
         facility.erp_capacity,
         facility.is_divisible,
         id,
        ]
    )

    return result.rows[0];
}

async function removeFacility(id) {
    const result = await db.pool.query(
        `DELETE FROM facilities
         WHERE id = $1 RETURNING *`,[id]
    );

    return result.rows[0];
}

module.exports = {
    getFacilities,
    getFacility,
    addFacility,
    editFacility,
    removeFacility
};