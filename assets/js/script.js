let validador = {
    handleSubmit:(event)=>{
        event.preventDefault(); //para a so comportamento padrao que no caso é enviar "submit"

        let send= false;
        
        let inputs= elForm.querySelectorAll('input');

        validador.clearErrors();

        for(let i=0; i < inputs.length; i++)
        {
            //console.log('entrei')
            let input= inputs[i];
            let check = validador.checkInput(input);
            if(check !== true)
            {
                send= false;
                validador.showError(input,check);
               
            }
        }

    
        if(send)
        {
            elForm.submit();
        }

       

    },
    checkInput: (input) =>{
        let rules = input.getAttribute('data-rules');
        if(rules != null)
        {
            rules = rules.split('|');
            for( let k in rules){
                let rDetails = rules[k].split('=');

                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo não pode ser vazio';
                        }
                    break;

                    case 'min':
                        if(input.value.length < rDetails[1])
                        {
                            return`Este campo tem que ter pelo menos ${rDetails[1]} caracteres`
                        }
                    break;
                    case 'email':
                        if(input.value != ''){

                            let regex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
                            if(!regex.test(input.value.toLowerCase())){
                                return 'O email digitado não é valido';
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },

    showError: (input, error) =>{
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;


         input.parentElement.insertBefore(errorElement, input.ElementSibling /*  elementSibling (adiciona o insert depois)*/);

    },

    clearErrors: ()=>{
        let inputs= elForm.querySelectorAll('input');
        for(let i=0; i < inputs.length; i++){
            inputs[i].style= '';
        }
        let errorElements= document.querySelectorAll('.error');
        for( let i=0; i< errorElements.length; i++)
        {
            errorElements[i].remove();
        }
    }
};

let elForm = document.querySelector('.validador');
elForm.addEventListener('submit',validador.handleSubmit)
