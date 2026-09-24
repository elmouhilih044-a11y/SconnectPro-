const registrationRepository= require('../repositories/registrationRepository');
const waitingListService=require('./waitingListService')

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
   const registration= await registrationRepository.removeRegistration(id);
     if(!registration){
        return null
    }
    await waitingListService.promoteNextCandidate(registration.activity_id)

    return registration;
}




module.exports={
    getRegistrations,
    getRegistration,
    addRegistration,
    removeRegistration,
  
}