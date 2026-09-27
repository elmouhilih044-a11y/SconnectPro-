const registrationRepository = require('../repositories/registrationRepository');
const waitingListService = require('./waitingListService');
const eligibilityService = require('./eligibilityService');
const pricingService = require('./pricingService');

async function getRegistrations() {
    return registrationRepository.getRegistrations();
}

async function getRegistration(id) {
    return registrationRepository.getRegistration(id);
}

async function getQuote(memberId, activityId) {
    const member = await registrationRepository.getMember(memberId);

    if (!member) {
        throw new Error('Membre introuvable');
    }

    const activity = await registrationRepository.getActivity(activityId);

    if (!activity) {
        throw new Error('Activité introuvable');
    }

    let familyMemberCount = 1;
    let quotientFamilial = 0;

    if (member.family_id) {
        const currentCount =
            await registrationRepository.countFamilyRegistrations(member.family_id);

        familyMemberCount = currentCount + 1;

        const family = await registrationRepository.getFamily(member.family_id);

        if (family) {
            quotientFamilial = Number(family.quotient_familial || 0);
        }
    }

    const hasPassSport = Boolean(member.pass_sport_code);

    const finalPrice = pricingService.calculatePrice(
        activity.base_price,
        member.is_resident,
        familyMemberCount,
        quotientFamilial,
        hasPassSport
    );

    return {
        member,
        activity,
        familyMemberCount,
        quotientFamilial,
        hasPassSport,
        finalPrice
    };
}

async function addRegistration(registration) {

    if (!registration.member_id) {
        throw new Error('member_id est obligatoire');
    }

    const member = await registrationRepository.getMember(registration.member_id);

    if (!member) {
        throw new Error('Membre introuvable');
    }

    const activity = await registrationRepository.getActivity(registration.activity_id);

    if (!activity) {
        throw new Error('Activité introuvable');
    }

    const medicalComplianceStatus =
        eligibilityService.checkEligibility(member, activity);

    let familyMemberCount = 1;

    if (member.family_id) {
        const currentCount =
            await registrationRepository.countFamilyRegistrations(member.family_id);

        familyMemberCount = currentCount + 1;
    }

    let quotientFamilial = 0;

    if (member.family_id) {
        const family =
            await registrationRepository.getFamily(member.family_id);

        if (family) {
            quotientFamilial =
                Number(family.quotient_familial || 0);
        }
    }

    const hasPassSport = Boolean(member.pass_sport_code);

    const finalPrice = pricingService.calculatePrice(
        activity.base_price,
        member.is_resident,
        familyMemberCount,
        quotientFamilial,
        hasPassSport
    );

    const paymentPlan = registration.payment_plan || '1x';

    const installments =
        pricingService.calculateInstallments(
            finalPrice,
            paymentPlan
        );

    const priorityScore = member.is_resident ? 10 : 0;

    return registrationRepository.addRegistration(
        registration,
        finalPrice,
        priorityScore,
        paymentPlan,
        installments,
        medicalComplianceStatus
    );
}

async function removeRegistration(id) {

    const registration =
        await registrationRepository.removeRegistration(id);

    if (!registration) {
        return null;
    }

    await waitingListService.promoteNextCandidate(
        registration.activity_id
    );

    return registration;
}

module.exports = {
    getRegistrations,
    getRegistration,
    getQuote,
    addRegistration,
    removeRegistration
};