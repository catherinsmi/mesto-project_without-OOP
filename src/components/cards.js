import { cardTemplate, bigImage, titleBigImage, popupBigImage } from './constants.js'
import { openPopup } from './modal.js';
import { putLike, removeLike, deleteCard } from './api.js';

function checkMyLike (item, idUser){
    return item.likes.some((data) => {
        return data._id === idUser
      })
}

function handleClickButtonLike (item, buttonLike, summurizeLike) {
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

function handleClickDeleteCard(item, cardElement){  
    deleteCard(item._id)
    .then(() => {
        cardElement.remove();
    }) 
    .catch((err) => {
        console.log(err)
    }) 
}

export const renderCard = function(container, item, idUser) {
    container.prepend(createCard(item, idUser));
}

export const createCard = function(item, idUser) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const buttonDeleteCard = cardElement.querySelector('.card__trash');
    const imageOfCard = cardElement.querySelector('.card__img');
    const buttonLike = cardElement.querySelector('.card__btn-like');
    const summurizeLike = cardElement.querySelector('.card__like-sum');
    const place = item.name;
    const link = item.link;
    const likes = item.likes.length;
    const id = item.owner._id
  
    imageOfCard.src = link;
    cardElement.querySelector('.card__title').textContent = place;
    summurizeLike.textContent = likes;
    imageOfCard.alt = place;;

    if(checkMyLike(item, idUser)){
        buttonLike.classList.add('card__btn-like_active');
    }

    buttonLike.addEventListener('click', () => handleClickButtonLike(item, buttonLike, summurizeLike));

    if(id !== idUser) {
        buttonDeleteCard.remove()
    }

    buttonDeleteCard.addEventListener('click', () => handleClickDeleteCard(item, cardElement));

    imageOfCard .addEventListener('click', function() {
        bigImage.setAttribute('src', link);
        bigImage.setAttribute('alt', place);
        titleBigImage.textContent = place; 
        openPopup(popupBigImage);
    });

    return cardElement;
}

