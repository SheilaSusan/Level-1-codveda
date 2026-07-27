const form = document.getElementById('contacts');
const name = document.getElementById('name'); 
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const passwordRules = document.getElementById('passwordRules')
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');
const footer = document.querySelector('footer');


    function showError(input, message){
        const errorSpan = document.getElementById(input.id +'Error');
        errorSpan.textContent = message;
        input.classList.add('invalid'); 
        input.classList.remove('valid');
    }

    function clearError(input){
        const errorSpan = document.getElementById(input.id +'Error');
        errorSpan.textContent = '';
        input.classList.remove('invalid');
        input.classList.add('valid');
    }

    function validateName(){
        if(name.value.trim() === ''){ //if name is empty then show error//
            showError(name, 'Name is required');
            return false;
        }
        clearError(name); //if name is not empty then clear error//
        return true;
    }

    function validateEmail(){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //regex for email validation//
        if(!emailRegex.test(email.value.trim())){ //if email is not valid then show error//
            showError(email, 'Please enter a valid email');
            return false;
        }
        clearError(email); //if email is valid then clear error//
        return true;
    }

    function validatePhone(){
        const value = phone.value.trim(); //get the value of phone input//
        const phoneRegex = /^\+[1-9]\d{7,14}$/;
        if(!phoneRegex.test(value)){ //if phone number is not valid then show error//
            showError(phone, 'Please enter a valid phone number in the format +23058534493');
            return false;
        }
        clearError(phone); //if phone number is valid then clear error//
        return true;    
    }

    function validatePassword(){
        const value = password.value;

        const lasLength =value.length >=8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        toggleRule('ruleLength', lasLength, 'At least 8 characters long');
        toggleRule('ruleUppercase', hasUppercase, 'At least one uppercase letter');
        toggleRule('ruleNumber', hasNumber, 'At least one number');
        toggleRule('ruleSpecial', hasSpecial, 'At least one special character')

        const isValid = lasLength && hasUppercase && hasNumber && hasSpecial;

        if(isValid){
            password.classList.remove('invalid');
            password.classList.add('valid');
        } else{
            password.classList.remove('valid');
            password.classList.add('invalid');
        }

        return isValid;
    }
    function toggleRule(id, condition, text){
        const li = document.getElementById(id);
        li.textContent = text;
        if(condition){
            li.classList.add('valid');
        } else{
            li.classList.remove('valid');
        }
    }


    [name, email, phone, password].forEach((input) => { //validates every input field on input event//
        input.addEventListener('blur', () => { 
            if(input === name) validateName();
            else if(input === email) validateEmail();
            else if(input === phone) validatePhone();
            else if(input === password) validatePassword();
        });
    });

    password.addEventListener('input', () => { //validates password input for every keystroke//
        validatePassword()
    })

    password.addEventListener('focus', () => {
        passwordRules.classList.add('active');
    });

    form.addEventListener('submit', function (e){
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();

        if(isNameValid && isEmailValid && isPhoneValid && isPasswordValid){
            form.reset(); 
            [name, email, phone, password].forEach((input) => input.classList.remove('valid')); //remove valid class from inputs after form reset//

            form.style.display = 'none'; //hide the form after successful submission//
            footer.style.display = 'none'; //hide the footer after successful submission//
            modalOverlay.classList.add('show'); //show the modal overlay after successful submission//  
        }
    });

    closeModalBtn.addEventListener('click', () =>{
        modalOverlay.classList.remove('show'); //hide the popup//
        form.style.display ='block'; //brings the form back//
        footer.style.display = 'block'; //brings the footer back//
        passwordRules.classList.remove('active'); //hides password rules when form is opened//
    });