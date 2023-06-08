import {gallaryContainer, cardTemplate, bigImage, titleBigImage, inputCardPlace, inputCardLink, popupBigImage, popupAddCardForm} from './constants'
import {openPopup, closePopup} from './utils.js';





  export const addCard = function (evt) {
    evt.preventDefault();

    const cardInformation = {
        name: inputCardPlace.value,
        link: inputCardLink.value, 
    };

    renderCard(gallaryContainer, cardInformation)
    closePopup(popupAddCardForm);
    evt.target.reset()

}
export const createCard = function(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const buttonDeleteCard = cardElement.querySelector('.card__trash');
    const imageOfCard = cardElement.querySelector('.card__img');
    const place = item.name;
    const link = item.link;
    
    imageOfCard.src = link;
    cardElement.querySelector('.card__title').textContent = place;
    imageOfCard.alt = place;;
    
    cardElement.addEventListener('click', function(evt){
        if(evt.target.classList.contains('card__btn-like')){
            evt.target.classList.toggle('card__btn-like_active')
        }
        
    });

    cardElement.querySelector('.card__trash').addEventListener('click', function(){    
        cardElement.remove();
    });

    imageOfCard .addEventListener('click', function() {
        bigImage.setAttribute('src', link);
        bigImage.setAttribute('alt', place);
        titleBigImage.textContent = place; 
        openPopup(popupBigImage);
    });

    return cardElement;
}

export const renderCard = function(container, item) {
    const card = createCard(item)
    container.prepend(card);
}



