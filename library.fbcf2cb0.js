!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var u={id:e,exports:{}};return t[e]=u,o.call(u.exports,u,u.exports),u.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o);var u=o("kBkXs");let r="watched";const a={gallery:document.querySelector(".cards"),watchedButton:document.querySelector("button#watched-button"),queueButton:document.querySelector("button#queue-button"),addToWatched:document.querySelector(".button-watched"),addToQueue:document.querySelector(".button-queue")};function d(){a.gallery.innerHTML="";const e=localStorage.getItem(r);if(!e||""==e)return;const t=JSON.parse(e);(0,u.renderHomePage)(a.gallery,t).then((e=>{}))}a.watchedButton.addEventListener("click",(function(){r="watched",d(),a.watchedButton.classList.add("header-library-buttons__button--active"),a.queueButton.classList.remove("header-library-buttons__button--active")})),a.queueButton.addEventListener("click",(function(){r="queue",d(),a.watchedButton.classList.remove("header-library-buttons__button--active"),a.queueButton.classList.add("header-library-buttons__button--active")})),d()}();
//# sourceMappingURL=library.fbcf2cb0.js.map