const waitingListRepository= require('../repositories/waitingListRepository');
async function getWaitingList(){
    return waitingListRepository.getWaitingList()
}
async function getWaiting(id){
    return waitingListRepository.getWaiting(id)
}
async function addWaiting(data){
    return waitingListRepository.addWaiting(data)
}

async function editWaiting(id, data){
    return waitingListRepository.editWaiting(id, data);
}
async function removeWaiting(id){
    return waitingListRepository.removeWaiting(id);
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

module.exports= {
    getWaitingList,
    getWaiting,
    addWaiting,
    editWaiting,
    removeWaiting,
    getNextCandidate,
    promoteNextCandidate,
    expirePromotions
}