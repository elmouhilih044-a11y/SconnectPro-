const associationRepository = require('../repositories/associationRepository');

async function getAssociations() {
    return associationRepository.getAssociations()
}
async function getAssociation(id) {
    return associationRepository.getAssociation(id)
}
async function addAssociation(association) {
    return associationRepository.addAssociation(association)
}
async function editAssociation(id, association) {
    return associationRepository.editAssociation(id,association)
}
async function removeAssociation(id) {
    return associationRepository.removeAssociation(id)
}
module.exports = {
    getAssociations,
    getAssociation,
    addAssociation,
    editAssociation,
    removeAssociation
};