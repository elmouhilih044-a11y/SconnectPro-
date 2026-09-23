const registrationRepository= require('../repositories/registrationRepository');

async function getRegistrations(){
    return registrationRepository.getRegistrations()
}

async function getRegistration(id){
    return registrationRepository.getRegistration(id);
}
async function addRegistration(registration, finalPrice, priorityScore){
    const client = await db.pool.connect();
    try {
        await client.query('BEGIN')
        const activity =await registrationRepository.getActivityForRegistration(client,registration.activity_id)
        if (!activity) {
            throw new Error('Activité introuvable')
        }
        const currentCount=await registrationRepository.countRegistrations(client,registration.activity_id)
        if (currentCount >= activity.max_capacity){
            const waiting= await registrationRepository.addToWaitingList(client,registration,priorityScore)
            await client.query('COMMIT')
            return{
                status: 'waitlisted',
                data: waiting
            };
        }
        const newRegistration=await registrationRepository.createRegistration(client,registration,finalPrice);
        await client.query('COMMIT')
        return {
            status: 'confirmed',
            data: newRegistration
        };

    }catch(error){
        await client.query('ROLLBACK')
        throw error

    }finally{
        client.release()
    }
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