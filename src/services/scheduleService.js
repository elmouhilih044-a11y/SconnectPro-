function hasTimeConflict(existingActivity, newActivity){
    if(existingActivity.day_of_week !== newActivity.day_of_week){
        return false;
    }

    if(existingActivity.facility_id !== newActivity.facility_id){
        return false;
    }

    if(existingActivity.sub_zone && newActivity.sub_zone && existingActivity.sub_zone !== newActivity.sub_zone){
        return false;
    }

    return(
        newActivity.start_time < existingActivity.end_time && newActivity.end_time > existingActivity.start_time
    )
}

function checkErpCapacity(facility, activity){
    if(activity.max_capacity > facility.erp_capacity){
        throw new Error('La capacité de l’activité dépasse la jauge ERP de la salle');
    }
}

function checkSchedule(existingActivities, activity){
    for(const existingActivity of existingActivities){
        if (hasTimeConflict(existingActivity, activity)){
            throw new Error('Cette activité entre en conflit avec une activité existante')
        }
    }
}

module.exports= {
    checkSchedule,
    checkErpCapacity
}