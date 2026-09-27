const activityRepository= require('../repositories/activityRepository');
const scheduleService = require('./scheduleService');

async function getActivities(query = {}) {
    return activityRepository.getActivities(query);
}
async function getActivity(id){
    return activityRepository.getActivity(id)
}
async function addActivity(activity){
    const facility=await activityRepository.getFacility(activity.facility_id);
    if (!facility) {
        throw new Error('Salle introuvable')
    }
    scheduleService.checkErpCapacity(facility,activity)
    const existingActivities=await activityRepository.getActivitiesBySchedule(activity.facility_id,activity.day_of_week)
    scheduleService.checkSchedule(existingActivities,activity)
    return activityRepository.addActivity(activity)
}
async function editActivity(id, activity){
    const facility=await activityRepository.getFacility(activity.facility_id)
    if (!facility){
        throw new Error('Salle introuvable')
    }
    scheduleService.checkErpCapacity(facility,activity)

    const existingActivities= await activityRepository.getActivitiesBySchedule(activity.facility_id,activity.day_of_week,id)
    scheduleService.checkSchedule(existingActivities,activity)
    return activityRepository.editActivity(id,activity)
}
async function removeActivity(id){
    return activityRepository.removeActivity(id)
}
module.exports={
    getActivities,
    getActivity,
    addActivity,
    editActivity,
    removeActivity
};