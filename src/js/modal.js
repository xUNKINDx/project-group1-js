import {getMovieById} from './fetchMovies.js';
import {getMarkupInfo, getMarkupImage} from './markupModal.js';

//localStorage.clear();

const refs = {
    openModal: document.querySelector("[data-filmid]"),
    closeModalBtn: document.querySelector("[data-modal-close"),  
    modal: document.querySelector("[data-modal]"),
    addToWatched: document.querySelector(".button-watched"),   
    addToQueue: document.querySelector(".button-queue"),  
    filmIdElem: document.querySelector("[data-filmidmodal]"), 
    filmCommon: document.querySelector(".film-container"),
    filmInfoContainer: document.querySelector(".film-info__container"),
    filmInfo: document.querySelector(".film-info"),    
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
    let arrayIdFilms = []; 
       
    const savedSettings = localStorage.getItem(keyLocalStorage); 
    
    if(savedSettings !== null){
        try {
            arrayFilms = JSON.parse(savedSettings);
            console.log("split");                     
            arrayIdFilms = arrayFilms.map(film => film.id);           
        }catch (e){
            console.log("Ошибка парсинга из LocalStorage");
        };    
    }; 
    const parsedSttings = {
        arrayIdFilms: arrayIdFilms,
        arrayFilms: arrayFilms, 
    };  

    return parsedSttings;                               
};

function addRemoveFilmsArrayInLocalStorage(arrayKeysLocalStorage,filmIdModal) {   
    let keyLocalStorage = "";  
    console.log(filmData); 
    for (let i = 0; i < arrayKeysLocalStorage.length; i++) {
        keyLocalStorage = arrayKeysLocalStorage[i]; 
        const {arrayIdFilms, arrayFilms} = getArrayFromLocalStorage(keyLocalStorage);  
        const indexFilm = arrayIdFilms.indexOf(parseInt(filmIdModal,10)); 
        console.log(arrayIdFilms);
        console.log(`indexFilm ${indexFilm}`);                    
        if (indexFilm !== -1){ 
            console.log(`Уже есть ${arrayIdFilms}`);                
            arrayFilms.splice(indexFilm,1); 
        }else{            
            const dataForLocalStorage = {
                poster_path: filmData.poster_path,
                title: filmData.title,
                genre_ids: filmData.genres,
                id: filmData.id,
                vote_average: filmData.vote_average,
            };
            arrayFilms.push(dataForLocalStorage); 
        };      
        if (keyLocalStorage === "Watched") {
            refs.addToWatched.classList.toggle("hasAlready");  
        } else {
            refs.addToQueue.classList.toggle("hasAlready");       
        };                   
        localStorage.setItem(keyLocalStorage, JSON.stringify(arrayFilms));
        console.log(`setLocal ${arrayFilms}`);                            
    };                               
};

function addClassBtnDependingOnStatus(keyLocalStorage,filmIdModal){             
    const {arrayIdFilms, arrayFilms}  = getArrayFromLocalStorage(keyLocalStorage);
    const indexFilm = arrayIdFilms.indexOf(parseInt(filmIdModal,10));      
    if (indexFilm !== -1){ 
        console.log(`Уже есть ${arrayIdFilms}`); 
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
       
    if (filmData === null || filmData === undefined) {
        return;
    }

    const filmIdModal = refs.filmIdElem.dataset.filmidmodal;  
    let arrayKeysLocalStorage = [];    
    if (e.target.classList.contains("button-watched") === true) {
        arrayKeysLocalStorage = ["Watched"];     
    } else {
        arrayKeysLocalStorage = ["Queue"];   
    };      
    addRemoveFilmsArrayInLocalStorage(arrayKeysLocalStorage,filmIdModal);
};

let filmData = null; 
function toggleModal(e) {          
    refs.filmIdElem.dataset.filmidmodal = e.target.dataset.filmid;  
    refs.modal.classList.toggle("is-hidden");  
      
   
    if (refs.modal.classList.contains("is-hidden") === false) {
        response = getMovieById(refs.filmIdElem.dataset.filmidmodal);        
        try {
            response.then((data) => {
                filmData =  data; 
                const markupImage = getMarkupImage(data);                               
                const markupInfo = getMarkupInfo(data); 
                const filmImage =  document.querySelector(".film-image");               
                filmImage.remove();  
                refs.filmCommon.insertAdjacentHTML("afterbegin",markupImage);               
                refs.filmInfoContainer.innerHTML = "";             
                refs.filmInfoContainer.insertAdjacentHTML("afterbegin",markupInfo);               
            });                
        } catch (error) {           
           console.log(error);        
        }
        removeClassBtnDependingOnStatus();      
        document.addEventListener("keydown", handleClick);  
        console.log('is-hidden false');  
        addClassBtnDependingOnStatus("Watched",refs.filmIdElem.dataset.filmidmodal);
        addClassBtnDependingOnStatus("Queue",refs.filmIdElem.dataset.filmidmodal);            
        refs.addToWatched.addEventListener("click",saveLocalStorageFilmStatus);
        refs.addToQueue.addEventListener("click",saveLocalStorageFilmStatus);                             
    }else{        
        refs.addToWatched.removeEventListener("click",saveLocalStorageFilmStatus);
        refs.addToQueue.removeEventListener("click",saveLocalStorageFilmStatus);             
    };              
};

refs.openModal.addEventListener("focus", toggleModal);
refs.closeModalBtn.addEventListener("click", toggleModal);
 

