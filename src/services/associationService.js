const db = require('../config/db')

async function getAssociations() {
    const result = await db.pool.query(
        'SELECT * FROM associations ORDER BY id'
    )
    return result.rows;
}

module.exports = {
    getAssociations
}