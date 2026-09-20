const db= require('../config/db');
async function getAssociations(){
    const result= await db.pool.query(
        'SELECT * FROM associations ORDER BY id')
    return result.rows
}
async function getAssociation(id){
    const result= await db.pool.query(
        'SELECT * FROM associations WHERE id = $1',[id]
    );
    return result.rows[0]
}
async function addAssociation(association){
    const result= await db.pool.query(
        `INSERT INTO associations
        (name, contact_email, contact_phone, is_conventioned)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [
         association.name,
         association.contact_email,
         association.contact_phone,
         association.is_conventioned
        ]
    )
    return result.rows[0]
}
async function editAssociation(id,association){
    const result= await db.pool.query(
        `UPDATE associations
         SET name= $1,contact_email= $2,contact_phone= $3,is_conventioned= $4 WHERE id= $5 RETURNING *`,
        [
          association.name,
          association.contact_email,
          association.contact_phone,
          association.is_conventioned,
          id
        ]
    );
    return result.rows[0]
}

async function removeAssociation(id){
    const result= await db.pool.query(
        `DELETE FROM associations
         WHERE id= $1 RETURNING *`,[id]
    );
    return result.rows[0]
}

module.exports={
    getAssociations,
    getAssociation,
    addAssociation,
    editAssociation,
    removeAssociation
};