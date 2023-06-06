import {gallaryContainer, cardTemplate, bigImage, titleBigImage, inputCardPlace, inputCardLink, popupBigImage, popupEditForm, popupAddCardForm, inputProfilePositioning, inputProfileName, formInputAddCardForm, formInputEditForm, profilePositioning, profileName} from './index.js'
import {openPopup, closePopup} from './utils.js';

export const editProfile = function(evt) {
    evt.preventDefault();
   
    profileName.textContent = inputProfileName.value;
    profilePositioning.textContent = inputProfilePositioning.value;
    closePopup(popupEditForm);
    evt.target.reset();
}