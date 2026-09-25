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
async function addRegistration(registration,finalPrice,priorityScore,paymentPlan,installments,medicalComplianceStatus){
    const client= await db.pool.connect();

    try {
        await client.query('BEGIN');

        const activity= await getActivityForRegistration(client,registration.activity_id)
        if (!activity){
            throw new Error('Activité introuvable')
        }

        const currentCount= await countRegistrations(client,registration.activity_id)

        if(currentCount >= activity.max_capacity){
            const waiting= await addToWaitingList(client,registration,priorityScore)
            await client.query('COMMIT')
            return{
                status: 'waitlisted',
                data: waiting
            }
        }

        const newRegistration= await createRegistration(
            client,
            registration,
            finalPrice,
            paymentPlan,
            installments,
            medicalComplianceStatus
        );

        await client.query('COMMIT')

        return{
            status: 'confirmed',
            data: newRegistration
        };

    }catch(error){
        await client.query('ROLLBACK')
        throw error

    }finally{
        client.release()
    }
}
async function removeRegistration(id){
    const result= await db.pool.query(
        `DELETE FROM registrations WHERE id= $1 RETURNING *`,[id]
    );
    return result.rows[0]
}

async function getActivityForRegistration(client, activityId) {
    const result= await client.query(
        `SELECT id, max_capacity
         FROM activities
         WHERE id= $1
         FOR UPDATE`,
        [activityId]
    );

    return result.rows[0];
}

async function countRegistrations(client, activityId) {
    const result= await client.query(
        `SELECT COUNT(*) AS total
         FROM registrations
         WHERE activity_id= $1
         AND status= 'confirmed'`,[activityId]
    )
    return Number(result.rows[0].total);
}
  
async function createRegistration(client,registration,finalPrice,paymentPlan,installments,medicalComplianceStatus){
    const result = await client.query(
        `INSERT INTO registrations
        (
            member_id,
            activity_id,
            final_price,
            payment_plan,
            installment_1,
            installment_2,
            installment_3,
            status,
            medical_compliance_status
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
        [
            registration.member_id,
            registration.activity_id,
            finalPrice,
            paymentPlan,
            installments.installment1,
            installments.installment2,
            installments.installment3,
            'confirmed',
            medicalComplianceStatus
        ]
    );

    return result.rows[0];
}

async function addToWaitingList(client, registration, priorityScore){
    const result= await client.query(
        `INSERT INTO waiting_list
        (activity_id, member_id, priority_score, status)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [
            registration.activity_id,
            registration.member_id,
            priorityScore,
            'waiting'
        ]
    )
    return result.rows[0];
}





async function getMember(id) {
    const result = await db.pool.query(
        `SELECT * FROM members WHERE id = $1`,
        [id]
    );

    return result.rows[0];
}

async function getActivity(id) {
    const result = await db.pool.query(
        `SELECT * FROM activities WHERE id = $1`,
        [id]
    );

    return result.rows[0];
}

async function countFamilyRegistrations(familyId) {
    const result = await db.pool.query(
        `SELECT COUNT(*) AS total
         FROM registrations r
         JOIN members m ON m.id = r.member_id
         WHERE m.family_id = $1
         AND r.status = 'confirmed'`,
        [familyId]
    );

    return Number(result.rows[0].total);
}
async function getFamily(id) {
    const result = await db.pool.query(
        `SELECT * FROM families WHERE id = $1`,
        [id]
    );

    return result.rows[0];
}

module.exports={
    getRegistrations,
    getRegistration,
    addRegistration,
    removeRegistration,
    createRegistration,
    addToWaitingList,
    getActivityForRegistration,
    countRegistrations,
    getMember,
    getActivity,
    countFamilyRegistrations,
    getFamily
};