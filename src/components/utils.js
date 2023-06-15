import { editAvatar, removeLike, putLike, deleteCard } from './api.js';
import { closePopup } from './modal.js';
import { popupAvatar, inputAvatarLink, profileAvatar, overlayAvatar } from './constants.js';

export const handlerEditAvatar = function(evt) {
    evt.preventDefault();

    const avatar = inputAvatarLink.value
    const button = evt.currentTarget.querySelector('.popup__btn')
    renderLoading(true, button)
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
            renderLoading(false, button)
            button.textContent = "Сохранить"
        })
    }

export function renderLoading(isLoading, button){
    if(isLoading){
        button.textContent = "Сохранение...";
    } 
  }

export function handleClickButtonLike (item, buttonLike, summurizeLike) {
        if(buttonLike.classList.contains('card__btn-like_active')){
            removeLike(item._id)
                .then((data) => {
                    summurizeLike.textContent = data.likes.length;
                    buttonLike.classList.remove('card__btn-like_active');
                }) 
                .catch((err) => {
                    console.log(err)
                })
        } else {
            putLike(item._id)
                .then((data) => {
                    summurizeLike.textContent = data.likes.length;
                    buttonLike.classList.add('card__btn-like_active');
                }) 
                .catch((err) => {
                    console.log(err)
                })
        }
    }

export function handleClickDeleteCard(item, cardElement){  
        deleteCard(item._id)
        .then(() => {
            cardElement.remove();
        }) 
        .catch((err) => {
            console.log(err)
        }) 
    }
    
export function showEditOverlayAvatar(){
    overlayAvatar.style.opacity = 1;
}

export function hideEditOverlayAvatar(){
    overlayAvatar.style.opacity = 0;
}

export function clearError(form){
    const errorElements = form.querySelectorAll('.popup__input-error')
    const errorInputs = form.querySelectorAll('.popup__input_type_error')
   
    errorElements.forEach((errorElement) => {
        errorElement.textContent = "";
    });
    errorInputs.forEach((errorInput) => {
        errorInput.value = "";
        errorInput.classList.toggle('popup__input_type_error')
    })
}