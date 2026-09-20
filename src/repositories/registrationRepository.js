const db= require('../config/db'); 

async function getRegistrations(){
    const result= await db.pool.query(
        'SELECT * FROM registrations ORDER BY id'
    );
    return result.rows
}
async function getRegistration(id){
    const result= await db.pool.query(
        'SELECT * FROM registrations WHERE id= $1',[id]
    );
    return result.rows[0]
}
async function addRegistration(registration){
    const result= await db.pool.query(
        `INSERT INTO registrations
        (member_id, activity_id)
        VALUES ($1, $2) RETURNING *`,
        [
         registration.member_id,
         registration.activity_id
        ]
    );
    return result.rows[0]
}
async function removeRegistration(id){
    const result= await db.pool.query(
        `DELETE FROM registrations WHERE id= $1 RETURNING *`,[id]
    );
    return result.rows[0]
}
module.exports={
    getRegistrations,
    getRegistration,
    addRegistration,
    removeRegistration
};