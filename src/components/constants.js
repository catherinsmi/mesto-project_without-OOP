export const buttonCloseEditForm = document.querySelector('.popup-edit__close');
export const buttonCloseAddCardForm = document.querySelector('.popup-add__close');
export const buttonCloseBigImageForm = document.querySelector('.popup-image__close');
export const buttonOpenEditForm = document.querySelector('.profile__edit-btn');
export const buttonOpenAddCardForm = document.querySelector('.profile__added-btn');
export const popups = document.querySelectorAll('.popup');
export const popupEditForm = document.querySelector('.popup-edit');
export const popupAddCardForm = document.querySelector('.popup-add');
export const popupBigImage = document.querySelector('.popup-image');
export const profileName = document.querySelector('.profile__name');
export const profilePositioning = document.querySelector('.profile__positioning');
export const formInputEditForm = document.querySelector('.popup-edit__input-form');
export const formInputAddCardForm = document.querySelector('.popup-add__input-form');
export const inputProfileName = popupEditForm .querySelector('.popup-edit__input_element_name');
export const inputProfilePositioning = popupEditForm .querySelector('.popup-edit__input_element_positioning');
export const inputCardPlace = popupAddCardForm.querySelector('.popup-add__input_element_place');
export const inputCardLink = popupAddCardForm.querySelector('.popup-add__input_element_link');
export const cardTemplate = document.querySelector('#card-template').content;
export const bigImage = document.querySelector('.popup-image__image');
export const titleBigImage = document.querySelector('.popup-image__title');
export const gallaryContainer = document.querySelector('.photo-gallary');
export const config  = {
    formSelector: '.popup__input-form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn',
    inactiveButtonClass: 'popup__btn_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    inputClass: 'popup__input'
  }

