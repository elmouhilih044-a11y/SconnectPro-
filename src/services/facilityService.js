const facilityRepository= require('../repositories/facilityRepository');

async function getFacilities(){
    return facilityRepository.getFacilities()
}
async function getFacility(id){
    return facilityRepository.getFacility(id)
}
async function addFacility(facility){
    return facilityRepository.addFacility(facility);
}
async function editFacility(id, facility){
    return facilityRepository.editFacility(id,facility)
}
async function removeFacility(id){
    return facilityRepository.removeFacility(id);
}

module.exports={
 getFacilities,
 getFacility,
 addFacility,
 editFacility,
 removeFacility,
}