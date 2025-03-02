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
    // TAB CHANGE SELECTORS FUNCTION (hide and show tabs)
        const hideTab = (selectors) => {
            for (const selector of selectors){
                $(selector).classList.add("hidden")
            }
        }
        const showTab = (selectors) => {
            for (const selector of selectors){
                $(selector).classList.remove("hidden")
            }
        } 

    //ACTUAL TAB CHANGE FUNCTIONS FOR EACH ONE OF THE TABS
        const tabChangeToBalance = () =>{
            hideTab([".nwcategory_tab",".nwoperation_tab",".editcategory_tab",".reports_tab", ".nwoperation_tab", ".nwoperation_tab"])
            showTab([".balance_tab"])
        }
        const tabChangeToCategories = () =>{
            hideTab([".balance_tab",".editcategory_tab",".reports_tab",".nwoperation_tab", ".nwoperation_tab"])
            showTab([".nwcategory_tab"])
        }
        const tabChangeToNewOperation = () =>{
            hideTab([".nwcategory_tab",".balance_tab",".editcategory_tab",".reports_tab", ".nwoperation_tab"])
            showTab([".nwoperation_tab"])
        }
        const tabChangeEditionOfCategory = () =>{
            hideTab([".balance-view",".nwcategory_tab",".reports_tab",".nwoperation_tab", ".nwoperation_tab"])
            showTab([".editcategory_tab"])
        }
        const tabChangeEditionOfOperation = () =>{
            hideTab([".nwcategory_tab",".nwoperation_tab",".editcategory_tab",".reports_tab"])
            showTab([".nwoperation_tab"])
        }
        const tabChangeToReports = () =>{
            hideTab([".nwcategory_tab",".nwoperation_tab",".balance_tab",".editcategory_tab", ".nwoperation_tab"])
            showTab([".reports_tab"])
        }





    // A ESTO NO LE PRESTES ATENCION ES UNA ANOTACION DE LA FUNCION QUE APLICA UNA VEZ HAYAMOS TERMINADO EL RESPONSIVENESS O LA VISUALIZACION EN MOBILE QUE ESCONDE ALGUNOS MENUS Y DETALLES. 
    // const hideTab = (selectors, isLg) => {
    //     for (const selector of selectors){
    //         $(selector).classList.add(`${isLg ? `lg:` : ''}hidden`)
    //     }
    // }
    // hideTab([".ejemploSelector"]) // aca queda la class hidden
    // hideTab([".ejemploSelector"], true) // aca queda la class lg:hidden
    // ``` 
    

//EVENTS (app excecution event with individual events inside)
const initializeApp = () => {
        // TAB CHANGE EVENT
            $("#balance_section_button").addEventListener ("click", tabChangeToBalance)
            $("#categories_section_button").addEventListener ("click",tabChangeToCategories)
            $("#reports_section_button").addEventListener ("click",tabChangeToReports)

            $("#newOperationButton").addEventListener ("click", tabChangeToNewOperation)
            $("#add_nwoperation_button").addEventListener ("click", tabChangeToBalance)
            $("#cancel_nwoperation_button").addEventListener ("click", tabChangeToBalance)

            $("#edit_editoperation_button").addEventListener ("click", tabChangeEditionOfOperation)
            $("#cancel_editoperation_button").addEventListener ("click", tabChangeToBalance)

            $("#edit_nwcategory_button").addEventListener ("click", tabChangeEditionOfCategory)
            //$("#delete_nwcategory_button").addEventListener ("click", tabChangeEditionOfCategory) ?????
            $("#cancel_editcategory_button").addEventListener ("click", tabChangeToCategories)
            $("#edit_editcategory_button").addEventListener ("click", tabChangeToCategories)

            //
            // $("#dropDowHeaderMenu").addEventListener ("click", clickBurguerButton) 
            // $("#tab-categories-dropDowMenu").addEventListener ("click", tabChangeCategories)
            // $("#tab-reports-dropDowMenu").addEventListener ("click", tabChangeReports)
            // $("#tab-balance-dropDowMenu").addEventListener ("click", tabChangeBalance)
}
window.addEventListener("load", initializeApp)

