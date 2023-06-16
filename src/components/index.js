import '../index.css';
import { buttonOpenEditForm, buttonOpenAddCardForm, popupEditForm, popupAddCardForm, popupAvatar, profileName, profilePositioning, formInputEditForm, formInputAddCardForm, formInputAvatarForm, inputProfileName, inputProfilePositioning, gallaryContainer, profileAvatar, config, inputCardPlace, inputCardLink, popups, closeButtons, overlayAvatar } from './constants.js'
import { renderCard } from './cards.js';
import { openPopup, closePopup, handleEditAvatar } from './modal.js';
import { enableValidation } from './validate'
import { editProfile, getFulfilledRequests, addCard } from './api.js';
import { renderLoading } from './utils.js';

let idUser = null;

closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
  });

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
            closePopup(evt.currentTarget);
        }
    })
})  

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

const handleEditProfile = function(evt) {
    evt.preventDefault();

    const button = evt.submitter;
    const initialText = button.textContent;
    renderLoading(true, button, initialText, "Сохранение...");
    editProfile({name: inputProfileName.value, about: inputProfilePositioning.value})
    .then((dataProfile) => { 
        profileName.textContent = dataProfile.name; 
        profilePositioning.textContent = dataProfile.about; 
        closePopup(popupEditForm); 
        evt.target.reset();
           })
        .catch((err) => {
            console.log('мы зашли в err')
             console.error(`Ошибка: ${err}`);
           })
        .finally(() => {
             renderLoading(false, button, initialText);
           })

}

const handleAddCard = function (evt) {
    evt.preventDefault();

    const cardInformation = {
        name: inputCardPlace.value,
        link: inputCardLink.value, 
    };

    const button = evt.submitter;
    const initialText = button.textContent;
    renderLoading(true, button, initialText, "Сохранение...");
    addCard(cardInformation)
        .then(dataCard => {
            closePopup(popupAddCardForm);
            evt.target.reset()
            renderCard(gallaryContainer, dataCard, idUser)
        })
        .catch((err) => {
            console.error(`Ошибка: ${err}`)
        })
        .finally(() => {
            renderLoading(false, button, initialText);
        })     
}

profileAvatar.addEventListener('mouseout', hideEditOverlayAvatar);
profileAvatar.addEventListener('mouseover', showEditOverlayAvatar);
profileAvatar.addEventListener('click', () => openPopup(popupAvatar));
formInputAvatarForm.addEventListener('submit', handleEditAvatar);
buttonOpenEditForm.addEventListener('click', fillProfileInputs);
buttonOpenAddCardForm.addEventListener('click', () => openPopup(popupAddCardForm));
formInputEditForm.addEventListener('submit', handleEditProfile); 
formInputAddCardForm.addEventListener('submit', handleAddCard);

function showEditOverlayAvatar(){
    overlayAvatar.style.opacity = 1;
}

function hideEditOverlayAvatar(){
    overlayAvatar.style.opacity = 0;
}

enableValidation(config);






