export const showInputError = function(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.classList.add('popup__input-error_active');
    errorElement.textContent = errorMessage;
}
export const hideInputError = function(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = "";
}

export const checkValidity = function(formElement, inputElement) {
    if(inputElement.validity.patternMismatch){
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity("")
    }

    if(!inputElement.validity.valid){
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(formElement, inputElement)
    }
}

export const setEventListenersOnInput = function(formElement){
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__btn');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        })
    })
}

export const enableValidation = function(){
    const formList = Array.from(document.querySelectorAll('.popup__input-form'));
    formList.forEach((formElement) => setEventListenersOnInput(formElement));
}

export const hasInvalidInput = function(inputList){
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
}

export const toggleButtonState = function(inputList, buttonElement){
    if(hasInvalidInput(inputList)){
        buttonElement.classList.add('popup__btn_inactive');
        buttonElement.setAttribute("disabled", "");
        
    } else {
        buttonElement.classList.remove('popup__btn_inactive');
        buttonElement.removeAttribute('disabled');
    }
}