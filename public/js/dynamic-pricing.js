const basePrice= document.querySelector('#base_price')
const resident= document.querySelector('#is_resident')
const familyCount= document.querySelector('#family_member_count')
const quotient= document.querySelector('#quotient_familial')
const passSport= document.querySelector('#has_pass_sport')
const priceResult= document.querySelector('#price_result')

function calculatePrice(){
    if(!basePrice || !priceResult) 
        return

    let price= Number(basePrice.value)

    if (!resident.checked){
        price = price * 1.35
    }
    const count= Number(familyCount.value)

    if(count === 2){
        price= price * 0.85
    }else if (count >= 3){
        price= price * 0.70
    }
    const qf= Number(quotient.value)
    if(qf < 600){
        price = price * 0.60
    } else if (qf <= 900){
        price= price * 0.80
    }

    if(passSport.checked){
        price= price - 50
    }

    if(price < 15){
        price= 15
    }

    priceResult.textContent= price.toFixed(2) + ' MAD'
}

if (resident) resident.addEventListener('change', calculatePrice)
if (familyCount) familyCount.addEventListener('input', calculatePrice)
if (quotient) quotient.addEventListener('input', calculatePrice)
if (passSport) passSport.addEventListener('change', calculatePrice)

calculatePrice()