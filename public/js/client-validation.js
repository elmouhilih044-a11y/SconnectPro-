const forms= document.querySelectorAll('form')

forms.forEach(function(form){
    form.addEventListener('submit', function(event){
        const requiredFields= form.querySelectorAll('[required]')
        let valid= true
        requiredFields.forEach(function(field){
            if (!field.value.trim()) {
                valid= false
                field.classList.add('input-error')
            }else{
                field.classList.remove('input-error')
            }
        })
        if (!valid){
            event.preventDefault()
            alert('Veuillez remplir tous les champs obligatoires')
        }
    })
})