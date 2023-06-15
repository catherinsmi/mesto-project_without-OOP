import { cardTemplate, bigImage, titleBigImage, popupBigImage } from './constants.js'
import { openPopup } from './modal.js';
import { handleClickButtonLike, handleClickDeleteCard } from './utils.js';

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
    cardElement.querySelector('.card__like-sum').textContent = likes;
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

const checkMyLike = function(item, idUser){
    return item.likes.some((data) => {
        return data._id === idUser
      })
}
