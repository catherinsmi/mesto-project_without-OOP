export const showInputError = function(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
}

export const hideInputError = function(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = "";
}

export const checkValidity = function(formElement, inputElement, config) {
    if(inputElement.validity.patternMismatch){
        inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    } else {
        inputElement.setCustomValidity("")
    }

    if(!inputElement.validity.valid){
        showInputError(formElement, inputElement, inputElement.validationMessage, config)
    } else {
        hideInputError(formElement, inputElement, config)
    }
}

const disableButton = function(buttonElement, config){
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
}

const enableButton = function(buttonElement, config){
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
}

const setEventListenersOnInput = function(formElement, config){
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, config);

    formElement.addEventListener('reset', () => {
        disableButton(buttonElement, config)
      });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        })
    })
}

export const enableValidation = function(config){
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => setEventListenersOnInput(formElement, config));
}

export const hasInvalidInput = function(inputList){
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid 
    });
}

export const toggleButtonState = function(inputList, buttonElement, config){
    if(hasInvalidInput(inputList)){
        disableButton(buttonElement, config)
    } else {
        enableButton(buttonElement, config)
    } 
}

