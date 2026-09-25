function calculatePrice(basePrice,isResident,familyMemberCount,quotientFamilial,hasPassSport){
    let price= Number(basePrice);
    if(!isResident){
        price= price * 1.35;
    }
    if(familyMemberCount === 2){
        price= price * 0.85
    }else if(familyMemberCount >= 3){
        price= price * 0.70
    }

    if(quotientFamilial < 600){
        price= price * 0.60;
    }else if(quotientFamilial <= 900){
        price = price * 0.80
    }
    if (hasPassSport){
        price= price - 50
    }
    if(price < 15){
        price = 15
    }

    return Number(price.toFixed(2));
}


function calculateInstallments(price, paymentPlan){
    price= Number(price)
    if(paymentPlan === '1x'){
        return {
            installment1: Number(price.toFixed(2)),
            installment2: null,
            installment3: null
        }
    }

    if(paymentPlan === '3x'){
        const installment2= Number((price * 0.30).toFixed(2))
        const installment3= Number((price * 0.30).toFixed(2))

        const installment1= Number((price - installment2 - installment3).toFixed(2))
        return{
            installment1,
            installment2,
            installment3
        }
    }
    throw new Error('Plan de paiement invalide')
}


module.exports= {
    calculatePrice,
    calculateInstallments
};