const registrationRepository= require('../repositories/registrationRepository');

async function getRegistrations(){
    return registrationRepository.getRegistrations()
}

async function getRegistration(id){
    return registrationRepository.getRegistration(id);
}
async function addRegistration(registration, finalPrice, priorityScore){
   return registrationRepository.addRegistration(registration, finalPrice, priorityScore);
}

async function removeRegistration(id){
    return registrationRepository.removeRegistration(id);
}

async function getNextCandidate(activityId) {
    const candidates=await waitingListRepository.getWaitingByActivity(activityId);
    return candidates[0] || null;
}
async function promoteNextCandidate(activityId) {
    const candidate = await getNextCandidate(activityId)
    if (!candidate) {
        return null;
    }
    const deadline= new Date();
    deadline.setHours(deadline.getHours()+48)
    return waitingListRepository.updateWaitingStatus(candidate.id,'promoted_pending',deadline)
}
async function expirePromotions() {
    return waitingListRepository.expirePromotions();
}

module.exports={
    getRegistrations,
    getRegistration,
    addRegistration,
    removeRegistration,
    getNextCandidate,
    promoteNextCandidate,
    expirePromotions
}