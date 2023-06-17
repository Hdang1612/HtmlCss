
function Validator (options){
//hàm thực hiện validate

    function validate(inputElement,rule){
        let errorElement=inputElement.parentElement.querySelector('.form-message')
        let errorMessage=rule.test(inputElement.value)
                    if (errorMessage) {
                        errorElement.innerText=errorMessage;
                        inputElement.parentElement.classList.add('invalid')
                    }
                    else{
                        errorElement.innerText='';
                        inputElement.parentElement.classList.remove('invalid')
                    }
    }


// lấy element của form cần validate
    var formElement =document.querySelector(options.form)
    if(formElement) {

        options.rules.forEach(rule => {
            let inputElement= formElement.querySelector(rule.selector);
           //xử lú trường hượng blur khỏi input
            if(inputElement){
                inputElement.onblur=function(){
                    validate(inputElement,rule);
                }
            }

            // xử lý khi người dùng nhập 
            inputElement.oninput=function(){
                let errorElement=inputElement.parentElement.querySelector('.form-message')
                errorElement.innerText='';
                inputElement.parentElement.classList.remove('invalid')
            }
        });

    }
}


// định nghĩa rules
Validator.isRequired = function(selector){
    return {
        selector:selector,
        test: function(value){
            return value.trim() ?undefined:'Vui lòng nhập trường này '
        }
    }
}


Validator.isEmail = function(selector){
    return {
        selector:selector,
        test: function(value){
            let regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(value) ? undefined: "Vui lòng nhập Email"
        }
    }
}
Validator.isPassword = function(selector,min){
    return {
        selector:selector,
        test: function(value){
            return value.length >=min  ?undefined:`Mật khẩu có tối thiểu ${min} ký tự`
        }
    }
}

Validator.isPasswordConfirmation = function(selector,getPValue){
    return {
        selector:selector,
        test: function(value){
            return value === getPValue() ? undefined :'Giá trị nhập vào chưa chính xác'
        }
    }
}