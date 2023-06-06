import {gallaryContainer, cardTemplate, bigImage, titleBigImage, inputCardPlace, inputCardLink, popupBigImage, popupEditForm, popupAddCardForm, inputProfilePositioning, inputProfileName, formInputAddCardForm, formInputEditForm, profilePositioning, profileName} from './index.js'
import {openPopup, closePopup} from './utils.js';


const yakitoriImg = new URL('../images/jeff-wang-c22X4t4S4AM-unsplash.jpg', import.meta.url);
const neonImg = new URL('../images/sam-wong-gUq-THbm_zY-unsplash.jpg', import.meta.url);
const tokyoImg = new URL('../images/max-bender-hyc70XzSUbw-unsplash.jpg', import.meta.url);
const meguroImg = new URL('../images/sora-sagano-8sOZJ8JF0S8-unsplash.jpg', import.meta.url);
const osakaImg = new URL('../images/masahiro-miyagi-j_t8PaSQLJg-unsplash.jpg', import.meta.url);
const towerImg = new URL('../images/arif-angga-ibrahim--y6oZ2pPyIc-unsplash.jpg', import.meta.url);

export const initialCards = [
    {
      name: 'Yakitori',
      link: yakitoriImg 
    },
    {
      name: 'Neon',
      link: neonImg 
    },
    {
      name: 'Tokyo',
      link: tokyoImg
    },
    {
      name: 'Meguro River',
      link: meguroImg
    },
    {
      name: 'Osaka',
      link: osakaImg
    },
    {
      name: 'Tokyo Tower',
      link: towerImg
    }
  ]; 

  export const addCard = function (evt) {
    evt.preventDefault();

    const cardInformation = {
        name: inputCardPlace.value,
        link: inputCardLink.value, 
    };

    renderCard(gallaryContainer, cardInformation)
    closePopup(popupAddCardForm);
    evt.target.reset();

}
export const createCard = function(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const buttonDeleteCard = cardElement.querySelector('.card__trash');
    const imageOfCard = cardElement.querySelector('.card__img');
    const place = item.name;
    const link = item.link;
    
    cardElement.querySelector('.card__img').src = link;
    cardElement.querySelector('.card__title').textContent = place;
    imageOfCard.setAttribute('alt', place);
    
    cardElement.addEventListener('click', function(evt){
        if(evt.target.classList.contains('card__btn-like')){
            evt.target.classList.toggle('card__btn-like_active')
        }
        
    });

    cardElement.querySelector('.card__trash').addEventListener('click', function(){    
        const deleteItem = buttonDeleteCard .closest('.card');
        deleteItem.remove();
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



