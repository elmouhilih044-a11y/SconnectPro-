const registrationRepository= require('../repositories/registrationRepository');

async function getRegistrations(){
    return registrationRepository.getRegistrations()
}

async function getRegistration(id){
    return registrationRepository.getRegistration(id);
}
async function addRegistration(registration){
    return registrationRepository.addRegistration(registration)
}

async function removeRegistration(id){
    return registrationRepository.removeRegistration(id);
}

module.exports={
    getRegistrations,
    getRegistration,
    addRegistration,
    removeRegistration
}