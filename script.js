const popup = document.querySelector('.popup_opened');
const popupAdd = document.querySelector('.popup-add_opened');
const popupImage = document.querySelector('.popup-image_opened');
const closeBtn = document.querySelector('.popup__close');
const closeBtnAdd = document.querySelector('.popup-add__close');
const closeBtnImage = document.querySelector('.popup-image__close');
const editBtn = document.querySelector('.profile__edit-btn');
const addBtn = document.querySelector('.profile__added-btn');
const profileName = document.querySelector('.profile__name');
const profilePositioning = document.querySelector('.profile__positioning');
const formInput = document.querySelector('.popup__input-form');
const formInputImage = document.querySelector('.popup-add__input-form');
const photoGallary = document.querySelector('.photo-gallary');
const bigImage = document.querySelector('.popup-image__image');
const bigImageTitle = document.querySelector('.popup-image__title');



const initialCards = [
  {
    name: 'Yakitori',
    link: 'images/jeff-wang-c22X4t4S4AM-unsplash.jpg'
  },
  {
    name: 'Neon',
    link: 'images/sam-wong-gUq-THbm_zY-unsplash.jpg'
  },
  {
    name: 'Tokyo',
    link: 'images/max-bender-hyc70XzSUbw-unsplash.jpg'
  },
  {
    name: 'Matsuno',
    link: 'images/sora-sagano-8sOZJ8JF0S8-unsplash.jpg'
  },
  {
    name: 'Osaka',
    link: 'images/masahiro-miyagi-j_t8PaSQLJg-unsplash.jpg'
  },
  {
    name: 'Tokyo Tower',
    link: 'images/arif-angga-ibrahim--y6oZ2pPyIc-unsplash.jpg'
  }
]; 

initialCards.forEach(renderCards);

function renderCards(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteBtn = cardElement.querySelector('.card__trash');
    const cardImage = cardElement.querySelector('.card__img');
    const link = item.link;
    const place = item.name;
    
    cardElement.querySelector('.card__img').src = link;
    cardElement.querySelector('.card__title').textContent = place;
    cardImage.setAttribute('alt', place);
    
    cardElement.querySelector('.card__btn-like').addEventListener('click', function(evt){
        evt.target.classList.toggle('card__btn-like_active')
    });

    cardElement.querySelector('.card__trash').addEventListener('click', function (){    
        const deleteItem = deleteBtn.closest('.card');
        deleteItem.remove();
    });

    cardImage.addEventListener('click', function() {
        bigImage.setAttribute('src', link);
        bigImageTitle.textContent = place; 
        popupImage.style.visibility = 'visible';
        popupImage.style.opacity = '1'
        
    });

    closeBtnImage.addEventListener('click', function() {
        popupImage.style.visibility = 'hidden';
        popupImage.style.opacity = '0'
    });

    photoGallary.append(cardElement);
}




function formSubmit(evt) {
    evt.preventDefault();
    const name = document.querySelector('.popup__input_element_name').value;
    const positioning = document.querySelector('.popup__input_element_positioning').value;

    profileName.textContent = name;
    profilePositioning.textContent = positioning;
    closePopup()
}

formInput.addEventListener('submit', formSubmit); 



editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);

function openPopup() {
    popup.style.visibility = 'visible';
    popup.style.opacity = '1';
}

function closePopup() {
    popup.style.visibility = 'hidden';
    popup.style.opacity = '0'
}



addBtn.addEventListener('click', openAddPopup);
closeBtnAdd.addEventListener('click', closeAddPopup);

function openAddPopup() {
    popupAdd.style.visibility = 'visible';
    popupAdd.style.opacity = '1';
}

function closeAddPopup() {
    popupAdd.style.visibility = 'hidden';
    popupAdd.style.opacity = '0';
}




formInputImage.addEventListener('submit', addCard); 

function addCard(evt) {
    evt.preventDefault();

    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteBtn = cardElement.querySelector('.card__trash');
    const image = cardElement.querySelector('.card__img');
   
    const link = document.querySelector('.popup-add__input_element_link').value;
    const place = document.querySelector('.popup-add__input_element_place').value;
   

    cardElement.querySelector('.card__img').src = link;
    cardElement.querySelector('.card__title').textContent = place;
    image.setAttribute('alt', place);

    cardElement.querySelector('.card__trash').addEventListener('click', function (){    
        const deleteItem = deleteBtn.closest('.card');
        deleteItem.remove();
    });
    cardElement.querySelector('.card__btn-like').addEventListener('click', function(evt){
        evt.target.classList.toggle('card__btn-like_active')
    });

    image.addEventListener('click', function() {
        bigImage.setAttribute('src', link);
        bigImageTitle.textContent = place; 
        popupImage.style.visibility = 'visible';
        popupImage.style.opacity = '1'
    });

    closeBtnImage.addEventListener('click', function() {
        popupImage.style.visibility = 'hidden';
        popupImage.style.opacity = '0'
    });


    photoGallary.prepend(cardElement);
    closeAddPopup();
    }

