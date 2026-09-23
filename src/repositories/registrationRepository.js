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
    const client= await db.pool.connect();
    let result;
    try{
        await client.query('BEGIN');
const activityResult=await client.query(
    `SELECT id,max_capacity
     FROM activities
     WHERE id=$1
     FOR UPDATE`,
    [registration.activity_id]
);

const countRegistration=await client.query(
    `SELECT COUNT(*) AS total
     FROM registrations
     WHERE activity_id=$1
     AND status='confirmed'`,
    [registration.activity_id]
);

const activity = activityResult.rows[0];

const activityMaxCapacity = activity.max_capacity;

const registration = countRegistration.rows[0];

const currentCount = Number(registration.total);

       result=await client.query(

        `INSERT INTO registrations
        (member_id, activity_id)
        VALUES ($1, $2) RETURNING *`,
        [
         registration.member_id,
         registration.activity_id
        ]
        )
    }catch(e){
        await client.query('ROLLBACK')
        throw e
    }
    finally{
        client.release()
    }
    return result.rows[0]
}
async function removeRegistration(id){
    const result= await db.pool.query(
        `DELETE FROM registrations WHERE id= $1 RETURNING *`,[id]
    );
    return result.rows[0]
}

async function getActivityForRegistration(client, activityId) {
    const result = await client.query(
        `SELECT id, max_capacity
         FROM activities
         WHERE id = $1
         FOR UPDATE`,
        [activityId]
    );

    return result.rows[0];
}
  
async function createRegistration(client, registration, finalPrice){
    const result= await client.query(
        `INSERT INTO registrations
        (member_id, activity_id, final_price, status)
        VALUES($1, $2, $3, $4) RETURNING *`,
        [
            registration.member_id,
            registration.activity_id,
            finalPrice,
            'confirmed'
        ]
    );

    return result.rows[0];
}

async function addToWaitingList(client, registration, priorityScore) {
    const result = await client.query(
        `INSERT INTO waiting_list
        (activity_id, member_id, priority_score, status)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [
            registration.activity_id,
            registration.member_id,
            priorityScore,
            'waiting'
        ]
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
    getActivityForRegistration
};