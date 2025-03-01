// UTILITIES AND RE-USED FUNCTIONS AS SELECTORS IN THE DOM.
const $ =  (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

// ID ASIGNATION FUNCTION
const randomID = () => self.crypto.randomUUID()

// LOCAL STORAGE FUNCTIONS
const getData = (key) => JSON.parse(localStorage.getItem(key))

const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data))

const clearTable = (selector) => $(selector).innerHTML = '';

//DEFAULT CATEGORIES SHOWN ON THE EXAMPLE APP
const defaultCategories = [
    {
        id: randomID(),
        name: "comida",
    },
    {
        id: randomID(),
        name: "servicios"
    },
    {
        id: randomID(),
        name: "salidas"
    },
    {
        id: randomID(),
        name: "educacion"
    },
    {
        id: randomID(),
        name: "transporte"
    },
    {
        id: randomID(),
        name: "trabajo"
    }
]
//FUNCTIONS
//EVENTS (app excecution event with individual events inside)
const initializeApp = () => {
}
window.addEventListener("load", initializeApp)

