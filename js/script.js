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
Event listener to calculate totalCost, disable/enable conflicting activities, & validate checkboxes
***/

let clicked = '';
let checkboxData = ''

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
        checkboxData = checkboxes[i].getAttribute('data-day-and-time');
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

    checkboxValidator();
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
    paymentMethod[0].remove();
    document.querySelector('div#credit-card').hidden = true;
    document.querySelector('div#paypal').hidden = true;
    document.querySelector('div#bitcoin').hidden = true;
    if (paymentMethod[1].selected) {
        document.querySelector('div#credit-card').hidden = false;
    }
}

paymentDefaultView();

/*** 
Function to control which payment option if visible depending on dropdown selection
***/

function paymentSelection() {
        
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

const form = document.querySelector("form");
const button = document.querySelector("button");
const name = document.querySelector("#name");
const email = document.querySelector("#mail");
const nameErrorMessage = document.createElement('div');
const emailErrorMessage = document.createElement('div');
const checkboxErrorMessage = document.createElement('div');
const ccErrorMessage = document.createElement('div');
const zipErrorMessage = document.createElement('div');
const cvvErrorMessage = document.createElement('div');


/*** 
VALIDATOR FUNCTIONS
***/

const nameValidator = () => {
    let nameVal = name.value;
    if (nameVal.length == 0) {
        name.style.borderColor = "#d60000";
        nameErrorMessage.setAttribute('class', 'errorMessage');
        nameErrorMessage.textContent = 'Please enter your name.';
        name.after(nameErrorMessage);
        return false;
    } else {
        name.style.borderColor = "";
        nameErrorMessage.remove();
        return true;
    } 
}

const emailValidator = () => {
    let emailVal = email.value;
    let atIndex = emailVal.indexOf("@");
    let periodIndex = emailVal.lastIndexOf(".");
    if (atIndex > 1 && periodIndex > (atIndex + 1)){
        mail.style.borderColor = "";
        emailErrorMessage.remove();
        return true;
    }   else {
        mail.style.borderColor = "#d60000";
        emailErrorMessage.setAttribute('class', 'errorMessage');
        emailErrorMessage.textContent = 'Please enter a valid email.';
        email.after(emailErrorMessage);
        return false;
    }
}

const checkboxValidator = () => {
    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            checkboxErrorMessage.remove();
            return true;
        }
    }
    checkboxErrorMessage.setAttribute('class', 'errorMessage')
    checkboxErrorMessage.textContent = 'Please select at least 1 activity.';
    activities.after(checkboxErrorMessage);
    return false;
    
}

let fieldsets = document.querySelectorAll('fieldset');

const creditCardValidator = () => {
    let ccNum = document.querySelector('#cc-num');
    ccNumVal = ccNum.value;
        if (ccNumVal.length === 0 || ccNumVal.length === '') {
            ccNum.style.borderColor = "#d60000";
            ccErrorMessage.setAttribute('class', 'errorMessage');
            ccErrorMessage.textContent = 'Please enter a credit card number.';
            ccNum.after(ccErrorMessage); 
            return false;
        } else if (ccNumVal.length < 13 || ccNumVal.length > 16 || isNaN(ccNumVal)){
            ccNum.style.borderColor = "#d60000";
            ccErrorMessage.setAttribute('class', 'errorMessage');
            ccErrorMessage.textContent = 'Entry must be 13-16 digits long.';
            ccNum.after(ccErrorMessage);
            return false;
        } else {   
            ccNum.style.borderColor = "";
            ccErrorMessage.remove();  
            return true;
        }
}

const zipCodeValidator = () => {
    let zipcode = document.querySelector('#zip');
    zipVal = zipcode.value;
        if (zipVal.length !== 5 || isNaN(zipVal)) {
            zipcode.style.borderColor = "#d60000";
            zipErrorMessage.setAttribute('class', 'errorMessage');
            zipErrorMessage.textContent = 'Must be a valid zipcode.';
            zipcode.after(zipErrorMessage);
            return false;
        } else {  
            zipcode.style.borderColor = "";
            zipErrorMessage.remove();    
            return true;
        }
}

const cvvValidator = () => {
    let cvv = document.querySelector('#cvv');
    cvvVal = cvv.value;
        if (cvvVal.length !== 3 || isNaN(cvvVal)) {
            cvv.style.borderColor = "#d60000";
            cvvErrorMessage.setAttribute('class', 'errorMessage');
            cvvErrorMessage.textContent = 'Must be a valid CVV.'; 
            cvv.after(cvvErrorMessage);
            return false;
        } else {  
            cvv.style.borderColor = "";
            cvvErrorMessage.remove();    
            return true;
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

form.addEventListener('submit', (e) => {
    
    nameValidator();
    emailValidator();
    checkboxValidator();

    let payWithValue = document.querySelector('select#payment').value; 
    if(payWithValue === 'credit card') {
        creditCardValidator();
        zipCodeValidator();
        cvvValidator();

        if (!creditCardValidator()) {
            e.preventDefault();
        }
    
        if (!zipCodeValidator()) {
            e.preventDefault();
        }
    
        if (!cvvValidator()) {
            e.preventDefault();
        }
    }

    if (!nameValidator()) {
        e.preventDefault();
    }

    if (!emailValidator()) {
        e.preventDefault();
    }

    if(!checkboxValidator()) {
       e.preventDefault();
    }
})