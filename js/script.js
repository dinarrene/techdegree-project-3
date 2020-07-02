/*** 
Set intitial input focus on name field & hide other-title field
***/

window.onload = function () {
    document.getElementById("name").focus();
    document.getElementById("other-title").style.display = "none";
    setColorOptions();
}


/*** 
Event listener to show other-title field
***/

title.addEventListener('change', () => {
    if (document.getElementById("title").value == "other") {
        document.getElementById("other-title").style.display = "block";
    } else {
        document.getElementById("other-title").style.display = "none";
    }
})


/*** 
Global variables for T-shirt Info section
***/

const selectTheme = document.querySelectorAll("#design > option");
const colorOptions = document.querySelectorAll("#color > option");
const colorOptionMenu = document.querySelectorAll('#colors-js-puns');
const defaultColorMenu = document.createElement('option');


/*** 
Set default color dropdown menu value and hide colorOptionMenu by default
***/

function setColorOptions() {
    if (selectTheme[0].selected) {
        for(let i = 0; i < colorOptionMenu.length; i++) {
            colorOptionMenu[i].hidden = true;
        }
    }
    let colorMenu = document.getElementById('color');
    defaultColorMenu.selected = true;
    defaultColorMenu.value = 'default';
    defaultColorMenu.textContent = 'Please Select a T-shirt Theme'
    colorMenu.insertBefore(defaultColorMenu, colorMenu.childNodes[1]);
    if (!selectTheme[0].selected) {
        for(let i = 0; i < colorOptionMenu.length; i++) {
            colorOptionMenu[i].hidden = false;
        }
        defaultColorMenu.hidden = true;
    }
    
}


/*** 
Function to set available color options based on design choice
***/

function changeColorOptions() {
    
    selectTheme[0].remove();
    if (selectTheme[1].selected) {
        setColorOptions();
        for (let i = 0; i < colorOptions.length; i++) {
            colorOptions[i].hidden = false;
            for (let i = 3; i < colorOptions.length; i++) {
                colorOptions[i].hidden = true;
            }
        }
    } else if (selectTheme[2].selected) {
        setColorOptions();
        for (let i = 0; i < colorOptions.length; i++) {
            colorOptions[i].hidden = true;
            for (let i = 3; i < colorOptions.length; i++) {
                colorOptions[i].hidden = false;
            }
        }
    } else {
        setColorOptions();
    }
}


/*** 
Event listener to show color options
***/

design.addEventListener('change', () => {
    changeColorOptions();
})


/*** 
Global variables for activities section
***/

const activities = document.querySelector('.activities');
const checkboxes = document.querySelectorAll('.activities input');
let totalCost = 0;


/*** 
Function to create/add/remove totalCost div
***/

function totalCostDiv(total) {
    if (document.querySelector('div.totalCostAmount')) {
        let previousTotal = document.querySelector('div.totalCostAmount');
        previousTotal.remove();
    }
    let costDiv = document.createElement('div');
    activities.appendChild(costDiv);
    costDiv.setAttribute('class', 'totalCostAmount')
    costDiv.textContent = `Total: $${total}`;
    if(totalCost == 0) {
        costDiv.remove();
    }
}

/*** 
Event listener to calculate totalCost & disable/enable conflicting activities
***/

let clicked = '';

activities.addEventListener('change', (e) => {
    clicked = e.target;
    let clickedDayAndTime = clicked.getAttribute('data-day-and-time');
    let workshopCost = parseInt(clicked.getAttribute('data-cost'));

    if (clicked.checked) {
        totalCost = totalCost + workshopCost;
    } else {
        totalCost = totalCost - workshopCost;
    }

    for (let i = 0; i < checkboxes.length; i++) {
        let checkboxData = checkboxes[i].getAttribute('data-day-and-time');
        if (clickedDayAndTime === checkboxData && clicked !== checkboxes[i]) {
            if (clicked.checked) {
                checkboxes[i].disabled = true;
                checkboxes[i].parentNode.style.color = '#ebebeb';
            } else {
                checkboxes[i].disabled = false;
                checkboxes[i].parentNode.style.color = '';
            }
        }
    }
    totalCostDiv(totalCost);
})


/*** 
Global variables for payment section
***/

const paymentInfo = document.querySelector('#payment');
const paymentMethod = document.querySelectorAll('#payment > option');
const selectPaymentMethod = paymentMethod[0];


/*** 
Function to set credit card field as default payment view 
***/

function paymentDefaultView() {
    document.querySelector('div#credit-card').hidden = true;
    document.querySelector('div#paypal').hidden = true;
    document.querySelector('div#bitcoin').hidden = true;
    if (paymentMethod[0].selected) {
        document.querySelector('div#credit-card').hidden = false;
    }
}

paymentDefaultView();

/*** 
Function to control which payment option if visible depending on dropdown selection
***/

function paymentSelection() {

    if (paymentMethod[0].selected) {
        paymentDefaultView();
    } else {
        paymentDefaultView()
        if (paymentMethod[1].selected) {
            paymentDefaultView();
            document.querySelector('div#credit-card').hidden = false;
        } else if (paymentMethod[2].selected) {
            paymentDefaultView();
            document.querySelector('div#paypal').hidden = false;
        } else {
            paymentDefaultView();
            document.querySelector('div#bitcoin').hidden = false;
        }
    }
}

/*** 
Event listener to change payment option
***/

paymentInfo.addEventListener('change', () => {
    paymentMethod[0].hidden = true;
    paymentSelection();
})


/*** 
Global variables input and button event listeners
***/

const button = document.querySelector("button");
const name = document.querySelector("#name");
const email = document.querySelector("#mail");
const errorMessage = document.createElement('div');


/*** 
Function to create validation error message
***/

function createErrorMessage(errorText){
    errorMessage.setAttribute('class', 'errorMessage');
    errorMessage.textContent = `*${errorText}`;
}


/****************************
VALIDATOR FUNCTIONS
*****************************/

const nameValidator = () => {
    let nameVal = name.value;
    if (nameVal.length == 0) {
        name.style.borderColor = "#d60000";
        createErrorMessage('Please enter your name.');
        name.after(errorMessage);
        return false;
    } else {
        name.style.borderColor = "";
        errorMessage.remove();
        return true;
    } 
}

const emailValidator = () => {
    let emailVal = email.value;
    let atIndex = emailVal.indexOf("@");
    let periodIndex = emailVal.lastIndexOf(".");
    if (atIndex > 1 && periodIndex > (atIndex + 1)){
        mail.style.borderColor = "";
        errorMessage.remove();
        return true;
    }   else {
        mail.style.borderColor = "#d60000";
        createErrorMessage('Please enter a valid email.');
        email.after(errorMessage);
        return false;
    }
}

const checkboxValidator = () => {
    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            for(let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].parentNode.style.color = "";
            }
            errorMessage.remove();
            return true
        } 
    }
        
    for(let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].parentNode.style.color = "#d60000";
    }
    
    createErrorMessage('Please select at least 1 activity.');
    activities.after(errorMessage);
    return false;
}

let fieldsets = document.querySelectorAll('fieldset');

const creditCardValidator = () => {
    let ccNum = document.querySelector('#cc-num');
    ccNumVal = ccNum.value;
        if (ccNumVal.length === 0 || ccNumVal.length === '') {
            createErrorMessage('Please enter a credit card number.');
            ccNum.style.borderColor = "#d60000";
            ccNum.after(errorMessage);
            return false;
        } else if (ccNumVal.length < 13 || ccNumVal.length > 16 || isNaN(ccNumVal)){
            createErrorMessage('Please enter a number between 13 and 16 digits long.');
            ccNum.style.borderColor = "#d60000";
            ccNum.after(errorMessage);
            return false;
        } else {   
            ccNum.style.borderColor = "";
            errorMessage.remove();   
            return true;
        }
}

const zipCodeValidator = () => {
    let zipcode = document.querySelector('#zip');
    zipVal = zipcode.value;
        if (zipVal.length !== 5 || isNaN(zipVal)) {
            createErrorMessage('Must be valid zipcode.');
            zipcode.style.borderColor = "#d60000";
            zipcode.after(errorMessage);
            return false;
        } else {  
            zipcode.style.borderColor = "";
            errorMessage.remove();    
            return true;
        }
}

const cvvValidator = () => {
    let cvv = document.querySelector('#cvv');
    cvvVal = cvv.value;
        if (cvvVal.length !== 3 || isNaN(cvvVal)) {
            createErrorMessage('Must be valid CVV.');
            cvv.style.borderColor = "#d60000";
            cvv.after(errorMessage);
            return false;
        } else {  
            cvv.style.borderColor = "";
            errorMessage.remove();    
            return true;
        }
}

const paymentValidator = () => {
    if(paymentMethod[1]) {
        creditCardValidator();
        zipCodeValidator();
        cvvValidator();
    }
}


/****************************
EVENT LISTENERS
*****************************/

name.addEventListener('input', (e) => {
    nameValidator();
    if (!nameValidator()) {
        e.preventDefault();
    }
})

name.addEventListener('click', (e) => {
    nameValidator();
    if (!nameValidator()) {
        e.preventDefault();
    }
})

email.addEventListener('input', (e) => {
    emailValidator();
    if (!emailValidator()) {
        e.preventDefault();
    }
})

activities.addEventListener('click', (e) => {
    checkboxValidator();
})


button.addEventListener('click', (e) => {
    nameValidator();
    emailValidator();
    checkboxValidator();
    paymentValidator();
    

    if (!nameValidator()) {
        e.preventDefault();
    }

    if (!emailValidator()) {
        e.preventDefault();
    }

    if(!checkboxValidator()) {
       e.preventDefault();
    }

    if(!paymentValidator()) {
        e.preventDefault();
    }
})