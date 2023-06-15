import '../index.css';
import {buttonCloseEditForm, buttonCloseAddCardForm, buttonCloseBigImageForm, buttonOpenEditForm, buttonOpenAddCardForm, popupEditForm, popupAddCardForm, popupBigImage, popupAvatar, profileName, profilePositioning, formInputEditForm, formInputAddCardForm, formInputAvatarForm, inputProfileName, inputProfilePositioning, gallaryContainer, profileAvatar, config, inputCardPlace, inputCardLink } from './constants.js'
import {renderCard} from './cards.js';
import {openPopup, closePopup} from './modal.js';
import { enableValidation} from './validate'
import { editProfile, getFulfilledRequests, addCard } from './api.js';
import { handlerEditAvatar, renderLoading, showEditOverlayAvatar, hideEditOverlayAvatar } from './utils.js';

let idUser = null;

getFulfilledRequests()
    .then(([infoAboutUser, cards]) => {
        profileAvatar.src = infoAboutUser.avatar
        profileName.textContent = infoAboutUser.name;
        profilePositioning.textContent = infoAboutUser.about;
        idUser = infoAboutUser._id;

        cards.forEach((card) => {
            renderCard(gallaryContainer, card, idUser);
    })
})

const fillProfileInputs = function(){
    inputProfileName.value = profileName.textContent;
    inputProfilePositioning.value = profilePositioning.textContent;
    openPopup(popupEditForm);
}

const handlerEditProfile = function(evt) {
    evt.preventDefault();

    const button = evt.currentTarget.querySelector('.popup__btn');
    renderLoading(true, button)
    editProfile({name: inputProfileName.value, about: inputProfilePositioning.value})
    .then((dataProfile) => {
        profileName.textContent = dataProfile.name;
        profilePositioning.textContent = dataProfile.about;
        closePopup(popupEditForm);
        evt.target.reset();
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        renderLoading(false, button)
        button.textContent = "Сохранить"
    })
}

const handlerAddCard = function (evt) {
    evt.preventDefault();

    const cardInformation = {
        name: inputCardPlace.value,
        link: inputCardLink.value, 
    };

    const button = evt.currentTarget.querySelector('.popup__btn')
    renderLoading(true, button);
    addCard(cardInformation)
        .then(dataCard => {
            closePopup(popupAddCardForm);
            evt.target.reset()
            renderCard(gallaryContainer, dataCard, idUser)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            renderLoading(false, button);
            button.textContent = "Добавить"
        })     
}

profileAvatar.addEventListener('mouseout', hideEditOverlayAvatar);
profileAvatar.addEventListener('mouseover', showEditOverlayAvatar);
profileAvatar.addEventListener('click', () => openPopup(popupAvatar));
formInputAvatarForm.addEventListener('submit', handlerEditAvatar);
buttonOpenEditForm.addEventListener('click', fillProfileInputs);
buttonOpenAddCardForm.addEventListener('click', () => openPopup(popupAddCardForm));
buttonCloseEditForm.addEventListener('click', () => closePopup(popupEditForm));
buttonCloseAddCardForm.addEventListener('click', () => closePopup(popupAddCardForm));
buttonCloseBigImageForm.addEventListener('click', () => closePopup(popupBigImage));
formInputEditForm.addEventListener('submit', handlerEditProfile); 
formInputAddCardForm.addEventListener('submit', handlerAddCard);

enableValidation(config);






