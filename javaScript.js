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
                        <button class="edit_nwcategory_button bg-violeta text-white p-2 rounded hover:bg-violeta" id="edit_nwcategory_button">Editar</button>
                    </td>
                </tr>`
            }
        }

        const addCategory = (category) => {
            setData("categories", category)
            renderCategories(category)
        }
    //DELETE CATEGORY FUNCTION
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
                category: $("#category_nwoperation_select").value,
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
                            <button class=" text-violeta mr-2" onclick="tabChangeEditionOfOperation('${operation.id}')">Editar</button>
                            <button class="text-red-500" onclick="modal_delete.showModal(),buttonOperationRemove('${operation.id}')">Eliminar</button>
                        </td>
                    </tr>`
                }
            } else{
                showTab([".no_operations"])
                hideTab([".nwoperation_render"])
            }
            // $(".name_nwcategory_input").reset()
        }

    // RENDER SELECT OPTIONS FUNCTION
    const renderCategoriesSelect = (categories) => {
        for (const category of categories) {
            $("#category_select_filter").innerHTML += 
            `<option value="${category.name}">${category.name}</option>`

            $("#category_nwoperation_select").innerHTML += 
            `<option value="${category.name}">${category.name}</option>`
        }
    }

    // DELETE OPERATION FUNCTION
        const buttonOperationRemove = (operationId) => {
            $(".modal_delete_button").setAttribute("data-id-modal", operationId)
            $(".modal_delete_button").addEventListener("click", () => {
                const operationsId = $(".modal_delete_button").getAttribute("data-id-modal")
                modalDeleteOperation(operationsId)
                location.reload()
            })
        }
        const modalDeleteOperation = (operationId) => {
            const currentData = getData("operations").filter(operation => operation.id != operationId)
            setData("operations", currentData)
        }

    // RENDER BALANCE FUNCTION
        const renderBalanceOperations = (operations) => {            
            let balanceEarnings = 0
            let balanceExpenses = 0
            clearTable("#balance_section_table")
            for (const operation of operations) {
                if (operation.type === 'earning') {
                    balanceEarnings += operation.amount; 
                } else {
                    balanceExpenses += operation.amount;
                }
            }
            const balanceTotal = balanceEarnings - balanceExpenses
            $("#balance_section_table").innerHTML = `
                <p>Ganancias: <span class="text-limon font-bold">+$${balanceEarnings}</span></p>
                <p>Gastos: <span class="text-red-500 font-bold">-$${balanceExpenses}</span></p>
                <p>Total: <span class="font-bold">$${balanceTotal}</span></p>`
        }

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

    // VALIDAION FUNCTION
        const validateFormOperation = (field) => {
            const nameOperation = $("#description_nwoperation_input").value.trim()
            const amountOperation = $("#amount_nwoperation_input").valueAsNumber
            const validationPassed = nameOperation!== "" && amountOperation 
            switch (field){
                case "nameOperation":
                    if (nameOperation=== ""){
                    $("#description_nwoperation_input").classList.add("border-red-500", "border", "border-2")
                    } else {
                    $("#description_nwoperation_input").classList.remove("border-red-500")
                    }
                    break
                case "amountOperation":
                    if (!amountOperation){
                    $("#amount_nwoperation_input").classList.add("border-red-500", "border", "border-2")
                    } else {
                    $("#amount_nwoperation_input").classList.remove("border-red-500", "border", "border-2")
                    }
                    break 
            }
            if(validationPassed){
                $("#add_nwoperation_button").removeAttribute("disabled")
            } else {
                $("#add_nwoperation_button").setAttribute("disabled", true)
            }
        }
//EVENTS (app excecution event with individual events inside)
const initializeApp = () => {
        //RENDER CATEGORIES
            setData("operations", allOperations)
            renderOperations(allOperations)
            addCategory(allCategories)
            renderCategoriesSelect(allCategories)
            renderBalanceOperations(allOperations)
            updateDate()

        //HIDE BURGUER MENU EVENT
            $("#menu_btn_mobile").addEventListener ("click", showBurguerMenu)
            $("#menu_btn_medium").addEventListener ("click", hideBurguerMenu)

        // TAB CHANGE EVENT
            $("#balance_section_button").addEventListener ("click", tabChangeToBalance)
            $("#categories_section_button").addEventListener ("click",tabChangeToCategories)
            $("#reports_section_button").addEventListener ("click",tabChangeToReports)
            $("#newOperationButton").addEventListener ("click", tabChangeToNewOperation)
            $("#cancel_nwoperation_button").addEventListener ("click", tabChangeToBalance)
            $("#cancel_editoperation_button").addEventListener ("click", tabChangeToBalance)
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
                $(".name_nwcategory_input").reset()
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
        //ADD OPERATION EVENT
            $("#add_nwoperation_button").addEventListener ("click", (e) => {
                const currentData = getData("operations")
                currentData.push(saveNewOperation())
                setData("operations", currentData)
                renderOperations(currentData)
                tabChangeToBalance()
            })
        //EDIT OPERATION EVENT
            $("#edit_editoperation_button").addEventListener ("click", (e) => {
                const operationsId = $("#edit_editoperation_button").getAttribute("data-id-operations")
                const currentData = getData("operations").map(operations => {
                    if ( operations.id === operationsId){
                        return saveNewOperation()
                    }
                    return operations
                })
                setData("operations", currentData)  
            })  
        
        //FILTERS EVENT
        $("#category_select_filter").addEventListener("input", (e) => {
            const filterSelected = e.target.value
            const currentData = getData("operations")
            if(filterSelected==="Todas"){
                setData("operations", currentData)
                renderOperations(currentData)
            }else{
                const filterOperation = currentData.filter(operation => operation.category === filterSelected)
                renderOperations(filterOperation)
            }
        })
        $("#type_select_filter").addEventListener("input", (e) => {
            const filterSelected = e.target.value
            const currentData = getData("operations")
            if(filterSelected==="todos"){
                setData("operations", currentData)
                renderOperations(currentData)
            }else{
                const currentData = getData("operations")
                const filterOperation = currentData.filter(operation => operation.type === filterSelected)
                renderOperations(filterOperation)
            }
        })
        $("#order_by_select").addEventListener("input", (e) => {
            const filterSelected = e.target.value
            const currentData = getData("operations")
            if(filterSelected==="Menos reciente"){
                renderOperations(lessRecentDate(currentData))
            }else if(filterSelected==="Más reciente"){
                renderOperations(recentDate(currentData))
            }else if (filterSelected==="Mayor monto"){
                renderOperations(biggestAmount(currentData))
            }else if(filterSelected==="Menor monto"){
                renderOperations(smallestAmount(currentData))
            }else if(filterSelected==="A/Z"){
                renderOperations(alphabeticAZ(currentData))
            }else if(filterSelected==="Z/A"){
                renderOperations(alphabeticZA(currentData))
            }
        })
        $("#from_select_input").addEventListener("input", (e) => {
            const filterSelected = e.target.value
            const currentData = getData("operations")
            renderOperations(byDate(currentData,filterSelected))
        }) 
        
       // VALITADION EVENT    
       $("#description_nwoperation_input").addEventListener("blur", () => validateFormOperation("nameOperation"))
       $("#amount_nwoperation_input").addEventListener("blur", () => validateFormOperation("amountOperation"))    
}
        

window.addEventListener("load", initializeApp)
