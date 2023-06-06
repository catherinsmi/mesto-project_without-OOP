export const openPopup = function(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', function(evt){
        
        if(evt.key === "Escape"){
            popup.classList.remove('popup_opened')
        }
    })
    popup.addEventListener('click', function(evt){
        if(evt.target === evt.currentTarget){
            closePopup(popup)
        }
    })
}

export const closePopup = function(popup) {
    popup.classList.remove('popup_opened')
}