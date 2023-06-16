import { profileAvatar, inputAvatarLink, popupAvatar } from './constants.js'
import { editAvatar } from './api.js'
import { renderLoading } from './utils.js'

export const openPopup = function(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closePopupByEsc)
}

export const closePopup = function(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePopupByEsc)
}

const closePopupByEsc = function(evt){
    if(evt.key === "Escape"){
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

export const handleEditAvatar = function(evt) {
    evt.preventDefault();

    const button = evt.submitter;
    const initialText = button.textContent;
    renderLoading(true, button, initialText, "Сохранение...");
    const avatar = inputAvatarLink.value
    editAvatar({avatar})
        .then((data) => {
            profileAvatar.setAttribute('src', data.avatar);
            closePopup(popupAvatar)
            evt.target.reset()
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            renderLoading(false, button, initialText);
        })
    }
