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
    //// ALL ARRAYS FUNCTION
        const allCategories = getData("categories") || defaultCategories

        const allOperations = getData("operations") || []

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
        const showBurguerMenu = (selectors) => {
            $("#sidebar").classList.remove("top-0")
            $("#sidebar").classList.remove("left-0")
            $("#sidebar").classList.remove("p-6")
            $("#sidebar").classList.remove("transform")
            $("#sidebar").classList.remove("-translate-x-full")
            $("#sidebar").classList.remove("transition-transform")
            $("#nav_bar").classList.add("hidden")
        } 
        const hideBurguerMenu = (selectors) => {
            $("#sidebar").classList.add("top-0")
            $("#sidebar").classList.add("left-0")
            $("#sidebar").classList.add("p-6")
            $("#sidebar").classList.add("transform")
            $("#sidebar").classList.add("-translate-x-full")
            $("#sidebar").classList.add("transition-transform")
            $("#nav_bar").classList.remove("hidden")
        } 
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
    //RENDER CATEGORIES FUNCTIONS
    const saveNewCategory = () => {
        return{
            id: randomID(),
            name: $("#name_nwcategory_input").value
        }
    }

    const saveEditedCategory = () => {
        return{
            id: randomID(),
            name: $("#name_editcategory_input").value
        }
    }

    const renderCategories = (categories) => {
        clearTable("#nwcategory_render")
        for (const category of categories) {
            $("#nwcategory_render").innerHTML += 
            `<tr class="border-b ">
                <td class="p-2">${category.name}</td>
                <td class="flex">
                    <button class="delete_nwcategory_button bg-violeta text-white p-2 rounded hover:bg-violeta mx-1" id="delete_nwcategory_button" onclick="modal_delete.showModal(),buttonDeleteCategory('${category.name}')">Eliminar</button>
                    <button class="add_nwcategory_button bg-violeta text-white p-2 rounded hover:bg-violeta" id="edit_nwcategory_button">Editar</button>
                </td>
            </tr>`
        }
    }

    const addCategory = (category) => {
        setData("categories", category)
        renderCategories(category)
        console.log(category)
    }
    //DELETE CATEGORY
    const buttonDeleteCategory = (categoryId) => {
        $(".modal_delete_button").setAttribute("data-id-modal", categoryId)
        $(".modal_delete_button").addEventListener("click", (e) => {
            const categoriesId = $(".modal_delete_button").getAttribute("data-id-modal")
            modalDeleteCategory(categoriesId)  
        })
    }
    const modalDeleteCategory = (categoryId) => {
        const currentDataModalOperations = getData("operations").filter(operation => operation.category !== categoryId)
        setData("operations", currentDataModalOperations)
        renderOperations(currentDataModalOperations)
        const currentDataModalCategories = getData("categories").filter(category => category.name !== categoryId)
        addCategory(currentDataModalCategories)
    }
    // RENDER OPERATIONS FUNCTION
    const saveNewOperation = (userId) => {
        return{
            id: userId ? userId : randomID(),
            description: $("#description_nwoperation_input").value,
            type: $("#type_nwoperation_input").value,
            category: $("#category_nwoperation_input").value,
            date: $("#date_nwoperation_input").value,
            amount: $("#amount_nwoperation_input").valueAsNumber
        }
    }   
    const renderOperations = (operations) => {
        clearTable("#nwoperation_render")
        if(operations.length){
            hideTab([".no_operations"])
            showTab([".nwoperation_render"])
            for (const operation of operations){                  
                $("#nwoperation_render").innerHTML += 
                `<tr class="border-b">
                    <td class="p-2">${operation.description}</td>
                    <td class="p-2">${operation.category}</td>
                    <td class="p-2 ${operation.type==="earning"
                        ? "text-green-600"
                        : "text-red-600"}">
                        ${operation.type==="earning"
                        ? "+$"+operation.amount
                        : "-$"+operation.amount}</td>
                    <td class="p-2">${operation.date}</td>
                    <td class="p-2">
                        <button class="text-violeta mr-2" onclick="tabChangeEditOperation('${operation.id}')">Editar</button>
                        <button class="text-red-500" onclick="my_modal_5.showModal(),buttonOperationRemove('${operation.id}')">Eliminar</button>
                    </td>
                </tr>`
            }
        } else{
            showTab([".no_operations"])
            hideTab([".nwoperation_render"])
        }
    }
    // RENDER SELECT OPTIONS FUNCTION
    const renderNwOperationsCategories = (categories) => {
        for (const category of categories) {
            $("#category_nwoperation_input").innerHTML += 
            `<option value="${category.name}">${category.name}</option>`
        }
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


    //FILTERS FUNCTION
    const biggestAmount = (operations) => {
        return operations.sort((a, b) => b.amount - a.amount)  
    }
    const smallestAmount = (operations) => {
        return operations.sort((a, b) => a.amount - b.amount)
    }
    const alphabeticAZ = (operations) => {
        return operations.sort((a, b) => a.description.localeCompare(b.description))
    }
    const alphabeticZA = (operations) => {
        return operations.sort((a, b) => b.description.localeCompare(a.description))
    }
    const byDate = (operations, fromDate) => {
        return operations.filter((operation) => new Date(operation.date) >= new Date(fromDate));
    }
    const lessRecentDate = (operations) => {
        return operations.sort((a, b) => new Date(a.date) - new Date(b.date))
    }
    const recentDate = (operations) => {
        return operations.sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    //UPDATE DATE FUNCTION
    const updateDate = () => {
        const date = new Date()
        $("#date_nwoperation_input").value = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString().padStart(2,0)+"-"+date.getDate().toString().padStart(2,0)
        $("#from_select_input").value = date.getFullYear().toString()+"-"+(date.getMonth()+1).toString().padStart(2,0)+"-"+date.getDate().toString().padStart(2,0)
    }
//EVENTS (app excecution event with individual events inside)
const initializeApp = () => {
        //RENDER CATEGORIES
            setData("operations", allOperations)
            renderOperations(allOperations)
            addCategory(allCategories)
            renderCategories(allCategories)
            renderNwOperationsCategories(allCategories)
            // renderBalance(allOperations)
            updateDate()

        //HIDE BURGUER MENU EVENT
            $("#menu_btn_mobile").addEventListener ("click", showBurguerMenu)
            $("#menu_btn_medium").addEventListener ("click", hideBurguerMenu)

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

        //ADD CATEGORY EVENT
            $("#add_nwcategory_button").addEventListener ("click", (e) => {
                e.preventDefault()
                const currentData = getData("categories")
                const functionSaveCategory = saveNewCategory()
                if(functionSaveCategory.name===""){
                    $("#name_nwcategory_input").classList.add("border-red-500", "border", "border-2")
                }else{
                    $("#name_nwcategory_input").classList.add("border-red-500", "border", "border-2")
                    currentData.push(saveNewCategory())
                    addCategory(currentData)
                }
                $(".newCategoryForm").reset()
            })
        //EDIT CATEGORY EVENT
            $("#edit_editcategory_button").addEventListener ("click", (e) => {
                e.preventDefault()
                const categoriesId = $("#edit_editcategory_button").getAttribute("data-id-categories")
                const currentData = getData("categories").map(category => {
                    if (category.id === categoriesId){
                    return saveEditedCategory(categoriesId)
                    }

                    return category
                })
                addCategory(currentData)
                tabChangeToCategories()
            }) 

        
            //
            // $("#dropDowHeaderMenu").addEventListener ("click", clickBurguerButton) 
            // $("#tab-categories-dropDowMenu").addEventListener ("click", tabChangeCategories)
            // $("#tab-reports-dropDowMenu").addEventListener ("click", tabChangeReports)
            // $("#tab-balance-dropDowMenu").addEventListener ("click", tabChangeBalance)
}
window.addEventListener("load", initializeApp)
