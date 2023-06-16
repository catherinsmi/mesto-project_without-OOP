export function renderLoading(isLoading, button, initialText, loadingText='Сохранение...'){
    if(isLoading){
        button.textContent = loadingText;
    } else {
        button.textContent = initialText;
    }
  }
