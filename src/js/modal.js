const refs = {
    openModal: document.querySelector("[data-filmid]"),
    closeModalBtn: document.querySelector("[data-modal-close"),  
    modal: document.querySelector("[data-modal]"),
    addToWatched: document.querySelector(".button-watched"),   
    addToQueue: document.querySelector(".button-queue"),  
    filmIdElem: document.querySelector("[data-filmidmodal]"),  
  };

const handleClick = (e) => {  
    console.log(e.code);    
    if (e.code === "Escape") {     
       document.removeEventListener("keydown", handleClick); 
       refs.modal.classList.toggle("is-hidden");
       refs.addToWatched.removeEventListener("click",saveLocalStorageFilmStatus);
       refs.addToQueue.removeEventListener("click",saveLocalStorageFilmStatus);                                               
    };    
}; 

const saveLocalStorageFilmStatus = (e) => {         
    const filmIdModal = refs.filmIdElem.dataset.filmidmodal;
    console.log(filmIdModal); 
    const savedSettings = localStorage.getItem(filmIdModal); 
    
    let isWatched = false;
    let isQueue = false;
    if(savedSettings !== null){
        const parsedSettings = JSON.parse(savedSettings);        
        isWatched = parsedSettings.isWatched; 
        isQueue = parsedSettings.isQueue; 
        console.log(parsedSettings); 
   };
        
    const filmStatus = {
        filmId: filmIdModal,
        isWatched: isWatched, 
        isQueue: isQueue, 
    };          
    if (e.target.classList.contains("button-watched") === true) {
        filmStatus.isWatched = true;      
    } else {
        filmStatus.isQueue = true;     
    };               
    localStorage.setItem(filmIdModal,JSON.stringify(filmStatus));       
};

function toggleModal(e) {
    console.log("start");         
    refs.filmIdElem.dataset.filmidmodal = e.target.dataset.filmid;  
    refs.modal.classList.toggle("is-hidden");       
    if (refs.modal.classList.contains("is-hidden") === false) {
        document.addEventListener("keydown", handleClick); 
        console.log("hi");         
        refs.addToWatched.addEventListener("click",saveLocalStorageFilmStatus);
        refs.addToQueue.addEventListener("click",saveLocalStorageFilmStatus);                             
    }else{        
        refs.addToWatched.removeEventListener("click",saveLocalStorageFilmStatus);
        refs.addToQueue.removeEventListener("click",saveLocalStorageFilmStatus);             
    };              
};

refs.openModal.addEventListener("focus", toggleModal);
refs.closeModalBtn.addEventListener("click", toggleModal);
 

