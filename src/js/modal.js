import {getMovieById} from './fetchMovies.js';
import markupModal from './markupModal.js';


const refs = {
    openModal: document.querySelector("[data-filmid]"),
    closeModalBtn: document.querySelector("[data-modal-close"),  
    modal: document.querySelector("[data-modal]"),
    addToWatched: document.querySelector(".button-watched"),   
    addToQueue: document.querySelector(".button-queue"),  
    filmIdElem: document.querySelector("[data-filmidmodal]"), 
    filmInfo: document.querySelector(".film-info__container"),
    filmImage: document.querySelector(".film-image"),
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

function getArrayFromLocalStorage(keyLocalStorage) {
    let arrayFilms = [];    
    const savedSettings = localStorage.getItem(keyLocalStorage); 
        if(savedSettings !== null){
            arrayFilms = savedSettings.split(";");     
        };                
    return arrayFilms;                               
};

function addRemoveFilmsArrayInLocalStorage(arrayKeysLocalStorage,filmIdModal) {   
    let keyLocalStorage = "";   
    for (let i = 0; i < arrayKeysLocalStorage.length; i++) {
        keyLocalStorage = arrayKeysLocalStorage[i]; 
        arrayFilms = getArrayFromLocalStorage(keyLocalStorage);                     
        if (arrayFilms.indexOf(filmIdModal) !== -1){ 
            console.log(`Уже есть ${arrayFilms.join(";")}`);                
            arrayFilms.splice(arrayFilms.indexOf(filmIdModal),1); 
        }else{
            arrayFilms.push(filmIdModal); 
        };      
        if (keyLocalStorage === "Watched") {
            refs.addToWatched.classList.toggle("hasAlready");  
        } else {
            refs.addToQueue.classList.toggle("hasAlready");       
        };                     
        localStorage.setItem(keyLocalStorage, arrayFilms.join(";")); 
        console.log(arrayFilms.join(";"));                            
    };                               
};

function addClassBtnDependingOnStatus(keyLocalStorage,filmIdModal){       
    arrayFilms = getArrayFromLocalStorage(keyLocalStorage);     
    if (arrayFilms.indexOf(filmIdModal) !== -1){ 
        console.log(`Уже есть ${arrayFilms.join(";")}`); 
        if (keyLocalStorage === "Watched") {
            refs.addToWatched.classList.add("hasAlready");
        } else {
            refs.addToQueue.classList.add("hasAlready");     
        };               
    };                                 
};

function removeClassBtnDependingOnStatus(){         
    refs.addToWatched.classList.remove("hasAlready");
    refs.addToQueue.classList.remove("hasAlready");                                 
};

const saveLocalStorageFilmStatus = (e) => {         
    const filmIdModal = refs.filmIdElem.dataset.filmidmodal;  
    let arrayKeysLocalStorage = [];    
    if (e.target.classList.contains("button-watched") === true) {
        arrayKeysLocalStorage = ["Watched"];     
    } else {
        arrayKeysLocalStorage = ["Queue"];   
    };      
    addRemoveFilmsArrayInLocalStorage(arrayKeysLocalStorage,filmIdModal);
};

function toggleModal(e) {          
    refs.filmIdElem.dataset.filmidmodal = e.target.dataset.filmid;  
    refs.modal.classList.toggle("is-hidden");        
    if (refs.modal.classList.contains("is-hidden") === false) {
        response = getMovieById(refs.filmIdElem.dataset.filmidmodal);
        try {
            response.then((data) => {
                console.log(data);
                const markup = markupModal(data);
                refs.filmInfo.innerHTML = "";
                refs.filmImage.remove();
                refs.filmInfo.insertAdjacentHTML("afterbegin",markup);               
            });                
        } catch (error) {           
           console.log(error);
        }
        removeClassBtnDependingOnStatus();
        addClassBtnDependingOnStatus("Watched",refs.filmIdElem.dataset.filmidmodal);
        addClassBtnDependingOnStatus("Queue",refs.filmIdElem.dataset.filmidmodal);
        document.addEventListener("keydown", handleClick);               
        refs.addToWatched.addEventListener("click",saveLocalStorageFilmStatus);
        refs.addToQueue.addEventListener("click",saveLocalStorageFilmStatus);                             
    }else{        
        refs.addToWatched.removeEventListener("click",saveLocalStorageFilmStatus);
        refs.addToQueue.removeEventListener("click",saveLocalStorageFilmStatus);             
    };              
};

refs.openModal.addEventListener("focus", toggleModal);
refs.closeModalBtn.addEventListener("click", toggleModal);
 

