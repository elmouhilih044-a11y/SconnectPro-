const db = require('../config/db');

async function getWaitingList() {
    const result = await db.pool.query(
        'SELECT * FROM waiting_list ORDER BY id'
    );
    return result.rows
}
async function getWaiting(id) {
    const result = await db.pool.query(
        'SELECT * FROM waiting_list WHERE id = $1', [id]
    );
    return result.rows[0]
}
async function addWaiting(data) {
    const result = await db.pool.query(
        `INSERT INTO waiting_list
        (activity_id, member_id, priority_score, status)
        VALUES ($1, $2, $3, $4) RETURNING *`,
        [
            data.activity_id,
            data.member_id,
            data.priority_score,
            data.status
        ]
    );
    return result.rows[0];
}
async function editWaiting(id, data) {
    const result = await db.pool.query(
        `UPDATE waiting_list
         SET activity_id= $1,
             member_id= $2,
             priority_score= $3,
             status = $4 WHERE id= $5 RETURNING *`,
        [
            data.activity_id,
            data.member_id,
            data.priority_score,
            data.status,
            id
        ]
    );
    return result.rows[0]
}
async function removeWaiting(id) {
    const result = await db.pool.query(
        `DELETE FROM waiting_list
         WHERE id= $1
         RETURNING *`,
        [id]
    );
    return result.rows[0];
}

async function getWaitingByActivity(activityId) {
    const result = await db.pool.query(
        `SELECT * FROM waiting_list
         WHERE activity_id = $1
         AND status = 'waiting'
         ORDER BY priority_score DESC, created_at ASC`,
        [activityId]
    )
    return result.rows
}
async function updateWaitingStatus(id, status, deadlineConfirmation= null) {
    const result= await db.pool.query(
        `UPDATE waiting_list
         SET status = $1,
             deadline_confirmation = $2
         WHERE id = $3 RETURNING *`,
        [status, deadlineConfirmation, id]
    )
    return result.rows[0];
}
async function expirePromotions(){
    const result= await db.pool.query(
        `UPDATE waiting_list
         SET status= 'expired', deadline_confirmation = NULL
         WHERE status= 'promoted_pending'
         AND deadline_confirmation <= CURRENT_TIMESTAMP RETURNING *`
    );

    return result.rows;
}



module.exports={
    getWaitingList,
    getWaiting,
    addWaiting,
    editWaiting,
    removeWaiting,
    getWaitingByActivity,
    updateWaitingStatus,
    expirePromotions


}