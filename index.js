const form = document.getElementById('contacts');

     
   form.addEventListener('submit', function (e){
    e.preventDefault();

    const name = document.getElementById('name'); 
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');

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

    function validatePassword(){
        const value = password.value;
        if(value.length < 8){ //if password is less than 8 characters then show error//
            showError(password, 'Password must be at least 8 characters long');
            return false;
        }
        if(!/[A-Z]/.test(value) || !/[0-9]/.test(value)){ //if password does not contain at least one uppercase letter and one number then show error//
            showError(password, 'Password must contain at least one uppercase letter and one number');
            return false;
        }
        clearError(password); //if password is valid then clear error//
        return true;
    }
    });
    form.addEventListener('submit', function (e){
        e.preventDefault();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();

        if(isNameValid && isEmailValid && isPhoneValid && isPasswordValid){
            alert('Form submitted successfully!');
            form.reset(); //reset the form after successful submission//
        }
    })

