window.onload = function () {
    document.getElementById("name").focus();
    document.getElementById("other-title").style.display = "none";
    setColorOptions();
}



const selectTheme = document.querySelectorAll("#design > option");
const colorOptions = document.querySelectorAll("#color > option")
const defaultColorMenu = document.createElement('option');



function setColorOptions() {
    if (selectTheme[0].selected) {
        for (let i = 0; i < colorOptions.length; i++) {
            colorOptions[i].hidden = true;
        }
    }
    let colorMenu = document.getElementById('color');
    defaultColorMenu.selected = true;
    defaultColorMenu.value = 'default';
    defaultColorMenu.textContent = 'Please Select a T-shirt Theme'
    colorMenu.insertBefore(defaultColorMenu, colorMenu.childNodes[1]);
    if (!selectTheme[0].selected) {
        defaultColorMenu.hidden = true;
    }
}



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



title.addEventListener('change', () => {
    if (document.getElementById("title").value == "other") {
        document.getElementById("other-title").style.display = "block";
    } else {
        document.getElementById("other-title").style.display = "none";
    }
})

design.addEventListener('change', () => {
    changeColorOptions();
})



const activities = document.querySelector('.activities');
const checkboxes = document.querySelectorAll('.activities input');
let totalCost = 0;

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
                checkboxes[i].parentNode.style.color = 'grey';
            } else {
                checkboxes[i].disabled = false;
                checkboxes[i].parentNode.style.color = '';
            }
        }
    }
    totalCostDiv(totalCost);
})



const paymentInfo = document.querySelector('#payment');
const paymentMethod = document.querySelectorAll('#payment > option');
const selectPaymentMethod = paymentMethod[0];

function paymentDefaultView() {
    document.querySelector('div#credit-card').hidden = true;
    document.querySelector('div#paypal').hidden = true;
    document.querySelector('div#bitcoin').hidden = true;
    if (paymentMethod[0].selected) {
        document.querySelector('div#credit-card').hidden = false;
    }
}

paymentDefaultView();

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

paymentInfo.addEventListener('change', () => {
    paymentMethod[0].hidden = true;
    paymentSelection();
})




const button = document.querySelector("button");
const name = document.querySelector("#name");
const email = document.querySelector("#mail");
const errorMessage = document.createElement('div');

function createErrorMessage(errorText){
    errorMessage.setAttribute('class', 'errorMessage');
    errorMessage.textContent = `*${errorText}`;
}

const nameValidator = () => {
    let nameVal = name.value;
    if (nameVal.length == 0) {
        name.style.borderColor = "red";
        createErrorMessage('Please enter your name.');
        name.after(errorMessage);
        return false;
    } else {
        name.style.borderColor = "green";
        errorMessage.remove();
        return true;
    } 
}

const emailValidator = () => {
    let emailVal = email.value;
    let atIndex = emailVal.indexOf("@");
    let periodIndex = emailVal.lastIndexOf(".");
    if (atIndex > 1 && periodIndex > (atIndex + 1)){
        mail.style.borderColor = "green";
        errorMessage.remove();
        return true;
    }   else {
        mail.style.borderColor = "red";
        createErrorMessage('Please enter a valid email.');
        email.after(errorMessage);
        return false;
    }
}

const checkboxValidator = () => {
    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            errorMessage.remove();
            return true
        } 
    }
    activities.style.borderColor = "red";
    createErrorMessage('Please select at least 1 activity.');
    activities.after(errorMessage);
    return false;
}

let fieldsets = document.querySelectorAll('fieldset');

const creditCardValidator = () => {
    let ccNum = document.querySelector('#cc-num');
    ccNumVal = ccNum.value;
        if (ccNumVal.length < 8 || ccNumVal.length > 19 || isNaN(ccNumVal)){
            createErrorMessage('Please enter a valid credit card number.');
            ccNum.style.borderColor = "red";
            ccNum.after(errorMessage);
            return false;
        } else {   
            errorMessage.remove();   
            return true;
        }
}

const zipCodeValidator = () => {
    let zipcode = document.querySelector('#zip');
    zipVal = zipcode.value;
        if (zipVal.length !== 5 || isNaN(zipVal)) {
            createErrorMessage('Must be valid zipcode.');
            zipcode.style.borderColor = "red";
            zipcode.after(errorMessage);
            return false;
        } else {  
            errorMessage.remove();    
            return true;
        }
}

const cvvValidator = () => {
    let cvv = document.querySelector('#cvv');
    cvvVal = cvv.value;
        if (cvvVal.length !== 3 || isNaN(cvvVal)) {
            createErrorMessage('Must be valid CVV.');
            cvv.style.borderColor = "red";
            cvv.after(errorMessage);
            return false;
        } else {  
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





form = document.querySelector('form');

button.addEventListener('click', (e) => {
    nameValidator();
    emailValidator();
    checkboxValidator();
  
    

    if (!nameValidator()) {
        e.preventDefault();
    }

    if (!emailValidator()) {
        e.preventDefault();
    }

    if(!checkboxValidator()) {
       e.preventDefault();
    }

    // if(!paymentValidator()) {
    //     e.preventDefault();
    // }
})