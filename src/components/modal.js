import { popups } from './constants.js'
import { clearError } from './utils.js'

export const openPopup = function(popup) {
    clearError(popup)
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closePopupByEsc)
}

export const closePopup = function(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePopupByEsc)
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
            closePopup(evt.currentTarget);
        }
    })
})

const closePopupByEsc = function(evt){
    if(evt.key === "Escape"){
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}