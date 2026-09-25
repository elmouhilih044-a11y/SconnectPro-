const db=require('../config/db');
async function getMembers(){
    const result=await db.pool.query(
        'SELECT * FROM members ORDER BY id'
    )
    return result.rows;
}
async function getMember(id){
    const result=await db.pool.query(
        'SELECT * FROM members WHERE id=$1',[id]
    );
    return result.rows[0]
}
async function addMember(member){
    const result=await db.pool.query(
        `INSERT INTO members
        (family_id,first_name,last_name,birth_date,is_resident,passport_code,pass_sport_code,medical_certificate_date)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [
            member.family_id,
            member.first_name,
            member.last_name,
            member.birth_date,
            member.is_resident,
            member.passport_code,
            member.pass_sport_code,
            member.medical_certificate_date
        ]
    )
    return result.rows[0]
}
async function editMember(id,member){
    const result=await db.pool.query(
        `UPDATE members SET family_id=$1,
             first_name=$2,
             last_name=$3,
             birth_date=$4,
             is_resident=$5,
             pass_sport_code=$6,
             passport_code=$7,
             medical_certificate_date=$8
         WHERE id=$9 RETURNING *`,
        [
            member.family_id,
            member.first_name,
            member.last_name,
            member.birth_date,
            member.is_resident,
            member.passport_code,
            member.pass_sport_code,
            member.medical_certificate_date,
            id
        ]
    );

    return result.rows[0]
}
async function removeMember(id){
    const result=await db.pool.query(
        `DELETE FROM members
         WHERE id=$1 RETURNING *`,[id] );

    return result.rows[0];
}
module.exports={
    getMembers,
    getMember,
    addMember,
    editMember,
    removeMember
}