const memberRepository=require('../repositories/memberRepository');
async function getMembers(){
    return memberRepository.getMembers()
}

async function getMember(id){
    return memberRepository.getMember(id)
}

async function addMember(member){
    return memberRepository.addMember(member)
}

async function editMember(id,member){
    return memberRepository.editMember(id,member)
}

async function removeMember(id){
    return memberRepository.removeMember(id)
}

module.exports={
    getMembers,
    getMember,
    addMember,
    editMember,
    removeMember
}