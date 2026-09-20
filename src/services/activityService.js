const activityRepository= require('../repositories/activityRepository');

async function getActivities(){
    return activityRepository.getActivities()
}
async function getActivity(id){
    return activityRepository.getActivity(id)
}
async function addActivity(activity){
    return activityRepository.addActivity(activity)
}
async function editActivity(id, activity){
    return activityRepository.editActivity(id, activity)
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