import '../index.css';
import {buttonCloseEditForm, buttonCloseAddCardForm, buttonCloseBigImageForm, buttonOpenEditForm, buttonOpenAddCardForm, popups, popupEditForm, popupAddCardForm, popupBigImage, profileName, profilePositioning, formInputEditForm, formInputAddCardForm, inputProfileName, inputProfilePositioning, gallaryContainer, config} from './constants.js'
import {renderCard, addCard} from './cards.js';
import {initialCards} from './initialCards.js';
import {openPopup, closePopup} from './modal.js';
import {} from './modal'
import { enableValidation} from './validate'

const fillProfileInputs = function(){
    inputProfileName.value = profileName.textContent;
    inputProfilePositioning.value = profilePositioning.textContent;
    openPopup(popupEditForm);
}

const editProfile = function(evt) {
    evt.preventDefault();
    profileName.textContent = inputProfileName.value;
    profilePositioning.textContent = inputProfilePositioning.value;
    closePopup(popupEditForm);
    evt.target.reset();
}

initialCards.forEach((card) => {
    renderCard(gallaryContainer, card);
})

buttonOpenEditForm.addEventListener('click', fillProfileInputs);
buttonOpenAddCardForm.addEventListener('click', () => openPopup(popupAddCardForm));
buttonCloseEditForm.addEventListener('click', () => closePopup(popupEditForm));
buttonCloseAddCardForm.addEventListener('click', () => closePopup(popupAddCardForm));
buttonCloseBigImageForm.addEventListener('click', () => closePopup(popupBigImage));
formInputEditForm.addEventListener('submit', editProfile); 
formInputAddCardForm.addEventListener('submit', addCard);

enableValidation(config);


