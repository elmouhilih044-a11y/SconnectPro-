function calculateAge(birthDate){
    const today= new Date()
    const birth= new Date(birthDate)
    let age= today.getFullYear() - birth.getFullYear();
    const month= today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())){
        age--
    }
    return age
}
function checkAge(member, activity){
    if(activity.is_all_public){
        return true
    }
    const age= calculateAge(member.birth_date)
    const category= activity.age_category

    if(category === 'Eveil/Baby-Sport'){
        return age < 6
    }

    if(category === 'Poussin U9'){
        return age >= 7 && age <= 8
    }

    if(category === 'Benjamin U11'){
        return age >= 9 && age <= 10
    }

    if(category === 'Minime U13'){
        return age >= 11 && age <= 12
    }

    if(category === 'Cadet U15'){
        return age >= 13 && age <= 14
    }

    if(category === 'Junior U18'){
        return age >= 15 && age <= 17
    }

    if(category === 'Senior'){
        return age >= 18 && age <= 39;
    }

    if(category === 'Veteran/Master'){
        return age >= 40;
    }

    return false;
}

function isHighRiskSport(sportType){
    const sport= sportType.toLowerCase();
    return (
        sport.includes('boxe') || sport.includes('plongée') ||
        sport.includes('plongee') || sport.includes('rugby') 
    );
}

function checkMedicalCertificate(member, activity){
    if(!member.medical_certificate_date){
        return 'medical_non_compliant'; 
    }

    const certificateDate = new Date(member.medical_certificate_date);
    const days = (Date.now() - certificateDate.getTime()) / (1000 * 60 * 60 * 24);
    const maxDays = isHighRiskSport(activity.sport_type) ? 365 : 1095;

    return days >= maxDays ? 'medical_non_compliant' : 'compliant';
}

function checkEligibility(member, activity){
    const ageIsValid= checkAge(member, activity)
    if(!ageIsValid){
        throw new Error('Le membre ne respecte pas la catégorie d’âge');
    }

    return checkMedicalCertificate(
        member,
        activity
    )
}

module.exports= {
    calculateAge,
    checkAge,
    checkMedicalCertificate,
    checkEligibility
};