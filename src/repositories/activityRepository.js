const db= require('../config/db');

async function getActivities(query = {}) {

    let sql = 'SELECT * FROM activities';

    const values = [];
    const conditions = [];


    if (query.sport) {
        values.push(`%${query.sport}%`);
        conditions.push(`sport_type ILIKE $${values.length}`);
    }

   
    if (query.day) {

        const days = {
            Lundi: 1,
            Mardi: 2,
            Mercredi: 3,
            Jeudi: 4,
            Vendredi: 5,
            Samedi: 6,
            Dimanche: 7
        };

        const dayNumber = days[query.day];

        if (dayNumber) {
            values.push(dayNumber);
            conditions.push(`day_of_week = $${values.length}`);
        }
    }

    
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY id';

    const result = await db.pool.query(sql, values);

    return result.rows;
}
async function getActivity(id){
    const result= await db.pool.query(
        'SELECT * FROM activities WHERE id = $1',[id]
    )
    return result.rows[0]
}
async function addActivity(activity){
    const result = await db.pool.query(
        `INSERT INTO activities(
         facility_id, association_id, name, sport_type, base_price,
         max_capacity, day_of_week, start_time, end_time,
         sub_zone, age_category, is_all_public, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [
         activity.facility_id, activity.association_id, activity.name,
         activity.sport_type, activity.base_price, activity.max_capacity,
         activity.day_of_week, activity.start_time, activity.end_time,
         activity.sub_zone, activity.age_category, activity.is_all_public,
         activity.status
        ]
    );
    return result.rows[0];
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
async function getActivitiesBySchedule(facilityId, dayOfWeek, excludeId= null){
    const result= await db.pool.query(
        `SELECT * FROM activities
         WHERE facility_id = $1 AND day_of_week = $2 AND ($3::integer IS NULL OR id <> $3)
         ORDER BY start_time`,
        [facilityId, dayOfWeek, excludeId]
    )
    return result.rows
}

async function getFacility(facilityId){
    const result= await db.pool.query(
        `SELECT id, erp_capacity, is_divisible FROM facilities WHERE id= $1`,
        [facilityId]
    )
    return result.rows[0];
}

module.exports={
    getActivities,
    getActivity,
    addActivity,
    editActivity,
    removeActivity,
    getActivitiesBySchedule,
    getFacility

}