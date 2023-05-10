const gallaryContainer = document.querySelector('.photo-gallary');
const buttonCloseEditForm = document.querySelector('.popup__close');
const buttonCloseAddCardForm = document.querySelector('.popup-add__close');
const buttonCloseBigImageForm = document.querySelector('.popup-image__close');
const buttonOpenEditForm = document.querySelector('.profile__edit-btn');
const buttonOpenAddCardForm = document.querySelector('.profile__added-btn');
const popupEditForm = document.querySelector('.popup');
const popupAddCardForm = document.querySelector('.popup-add');
const popupBigImage = document.querySelector('.popup-image');
const profileName = document.querySelector('.profile__name');
const profilePositioning = document.querySelector('.profile__positioning');
const formInputEditForm = document.querySelector('.popup__input-form');
const formInputAddCardForm = document.querySelector('.popup-add__input-form');
const cardTemplate = document.querySelector('#card-template').content;
const bigImage = document.querySelector('.popup-image__image');
const titleBigImage = document.querySelector('.popup-image__title');



const openPopup = function(popup) {
    popup.classList.add('popup_opened')
}

const closePopup = function(popup) {
    popup.classList.remove('popup_opened')
}

const editProfile = function(evt) {
    evt.preventDefault();

    const inputProfileName = evt.target.querySelector('.popup__input_element_name').value;
    const inputProfilePositioning = evt.target.querySelector('.popup__input_element_positioning').value;

    profileName.textContent = inputProfileName ;
    profilePositioning.textContent = inputProfilePositioning;
    closePopup(popupEditForm);
    evt.target.reset();
}

buttonOpenEditForm.addEventListener('click', () => openPopup(popupEditForm));
buttonOpenAddCardForm.addEventListener('click', () => openPopup(popupAddCardForm));
buttonCloseEditForm.addEventListener('click', () => closePopup(popupEditForm));
buttonCloseAddCardForm.addEventListener('click', () => closePopup(popupAddCardForm));
buttonCloseBigImageForm.addEventListener('click', () => closePopup(popupBigImage));
formInputEditForm.addEventListener('submit', editProfile); 


const createCard = function(item) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const buttonDeleteCard = cardElement.querySelector('.card__trash');
    const imageOfCard = cardElement.querySelector('.card__img');
    const place = item.name;
    const link = item.link;
    
    cardElement.querySelector('.card__img').src = link;
    cardElement.querySelector('.card__title').textContent = place;
    imageOfCard.setAttribute('alt', place);
    
    cardElement.querySelector('.card__btn-like').addEventListener('click', function(evt){
        evt.target.classList.toggle('card__btn-like_active')
    });

    cardElement.querySelector('.card__trash').addEventListener('click', function(){    
        const deleteItem = buttonDeleteCard .closest('.card');
        deleteItem.remove();
    });

    imageOfCard .addEventListener('click', function() {
        bigImage.setAttribute('src', link);
        titleBigImage.textContent = place; 
        openPopup(popupBigImage);
    });

    return cardElement;
}

const renderCard = function(container, item) {
    const card = createCard(item)
    container.prepend(card);
}

initialCards.forEach((card) => {

    renderCard(gallaryContainer, card);
})

const addCard = function (evt) {
    evt.preventDefault();

    const inputCardPlace = evt.target.querySelector('.popup-add__input_element_place').value;
    const inputCardLink = evt.target.querySelector('.popup-add__input_element_link').value;
    const cardInformation = {
        name: inputCardPlace,
        link: inputCardLink, 
    };

    createCard(cardInformation);
    renderCard(gallaryContainer, cardInformation)
    closePopup(popupAddCardForm);
    evt.target.reset();

}

formInputAddCardForm.addEventListener('submit', addCard);





