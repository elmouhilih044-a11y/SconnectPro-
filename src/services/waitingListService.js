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
module.exports= {
    getWaitingList,
    getWaiting,
    addWaiting,
    editWaiting,
    removeWaiting
}