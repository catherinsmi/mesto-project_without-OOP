const gallaryContainer = document.querySelector('.photo-gallary');
const buttonCloseEditForm = document.querySelector('.popup-edit__close');
const buttonCloseAddCardForm = document.querySelector('.popup-add__close');
const buttonCloseBigImageForm = document.querySelector('.popup-image__close');
const buttonOpenEditForm = document.querySelector('.profile__edit-btn');
const buttonOpenAddCardForm = document.querySelector('.profile__added-btn');
const popupEditForm = document.querySelector('.popup-edit');
const popupAddCardForm = document.querySelector('.popup-add');
const popupBigImage = document.querySelector('.popup-image');
const profileName = document.querySelector('.profile__name');
const profilePositioning = document.querySelector('.profile__positioning');
const formInputEditForm = document.querySelector('.popup-edit__input-form');
const formInputAddCardForm = document.querySelector('.popup-add__input-form');
const cardTemplate = document.querySelector('#card-template').content;
const bigImage = document.querySelector('.popup-image__image');
const titleBigImage = document.querySelector('.popup-image__title');
const inputProfileName = popupEditForm .querySelector('.popup-edit__input_element_name');
const inputProfilePositioning = popupEditForm .querySelector('.popup-edit__input_element_positioning');
const inputCardPlace = popupAddCardForm.querySelector('.popup-add__input_element_place');
const inputCardLink = popupAddCardForm.querySelector('.popup-add__input_element_link');

const openPopup = function(popup) {
    popup.classList.add('popup_opened')
}

const closePopup = function(popup) {
    popup.classList.remove('popup_opened')
}

const editProfile = function(evt) {
    evt.preventDefault();

    profileName.textContent = inputProfileName.value;
    profilePositioning.textContent = inputProfilePositioning.value;
    closePopup(popupEditForm);
    evt.target.reset();
}


buttonOpenEditForm.addEventListener('click', () => {
    inputProfileName.value = profileName.textContent;
    inputProfilePositioning.value = profilePositioning.textContent;
    openPopup(popupEditForm);
});


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
        bigImage.setAttribute('alt', place);
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

    const cardInformation = {
        name: inputCardPlace.value,
        link: inputCardLink.value, 
    };

    renderCard(gallaryContainer, cardInformation)
    closePopup(popupAddCardForm);
    evt.target.reset();

}

formInputAddCardForm.addEventListener('submit', addCard);





