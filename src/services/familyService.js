const familyRepository=require('../repositories/familyRepository');

async function getFamilies(){
    return familyRepository.getFamilies()
}
async function getFamily(id){
    return familyRepository.getFamily(id)
}
async function addFamily(family){
    return familyRepository.addFamily(family)
}

async function editFamily(id,family){
    return familyRepository.editFamily(id,family)
}
async function removeFamily(id){
    return familyRepository.removeFamily(id)
}

module.exports={
    getFamilies,
    getFamily,
    addFamily,
    editFamily,
    removeFamily
};