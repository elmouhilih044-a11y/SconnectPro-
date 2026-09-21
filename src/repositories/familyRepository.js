const db=require('../config/db');
async function getFamilies(){
    const result=await db.pool.query(
        'SELECT * FROM families ORDER BY id'
    )
    return result.rows;
}
async function getFamily(id){
    const result=await db.pool.query(
        'SELECT * FROM families WHERE id=$1',[id])
    return result.rows[0];
}
async function addFamily(family){
    const result=await db.pool.query(
        `INSERT INTO families(reference_name,quotient_familial)
        VALUES($1,$2) RETURNING *`,
        [
            family.reference_name,
            family.quotient_familial
        ]
    );
    return result.rows[0];
}
async function editFamily(id,family){
    const result=await db.pool.query(
        `UPDATE families SET reference_name=$1,quotient_familial=$2
         WHERE id=$3 RETURNING *`,
        [
            family.reference_name,
            family.quotient_familial,
            id
        ]
    );

    return result.rows[0];
}

async function removeFamily(id){
    const result=await db.pool.query(
        `DELETE FROM families
         WHERE id=$1 RETURNING *`,[id]
    );
    return result.rows[0]
}

module.exports={
    getFamilies,
    getFamily,
    addFamily,
    editFamily,
    removeFamily
};