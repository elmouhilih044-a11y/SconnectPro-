const db= require('../config/db');

async function getActivities(){
    const result= await db.pool.query(
        'SELECT * FROM activities ORDER BY id'
    )
    return result.rows
}
async function getActivity(id){
    const result= await db.pool.query(
        'SELECT * FROM activities WHERE id = $1',[id]
    )
    return result.rows[0]
}
async function addActivity(activity){
    const result= await db.pool.query(
        `INSERT INTO activities(
         facility_id,
         association_id,
         base_price,
         max_capacity,
         day_of_week,
         start_time,
         end_time,
         sub_zone,
         age_category,
         is_all_public,
         status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)RETURNING *`,
         [
          activity.facility_id,
          activity.association_id,
          activity.base_price,
          activity.max_capacity,
          activity.day_of_week,
          activity.start_time,
          activity.end_time,
          activity.sub_zone,
          activity.age_category,
          activity.is_all_public,
          activity.status
        ]
    )
    return result.rows[0]
}
async function editActivity(id, activity){
    const result= await db.pool.query(
        `UPDATE activities SET facility_id= $1,
             association_id= $2,
             base_price= $3,
             max_capacity= $4,
             day_of_week= $5,
             start_time= $6,
             end_time= $7,
             sub_zone= $8,
             age_category= $9,
             is_all_public= $10,
             status= $11
         WHERE id= $12 RETURNING *`,
        [
         activity.facility_id,
         activity.association_id,
         activity.base_price,
         activity.max_capacity,
         activity.day_of_week,
         activity.start_time,
         activity.end_time,
         activity.sub_zone,
         activity.age_category,
         activity.is_all_public,
         activity.status,
         id
        ]
    );
    return result.rows[0]
}
async function removeActivity(id){
    const result= await db.pool.query(
        `DELETE FROM activities
         WHERE id= $1 RETURNING *`,[id]
    );
    return result.rows[0]
}
module.exports={
    getActivities,
    getActivity,
    addActivity,
    editActivity,
    removeActivity
}