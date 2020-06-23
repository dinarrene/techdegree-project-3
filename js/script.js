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
}



function changeColorOptions() {
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

function totalCostDiv (total) {
    if(document.querySelector('div.totalCostAmount')){
        let previousTotal = document.querySelector('div.totalCostAmount');
        previousTotal.remove();
    }
    let costDiv = document.createElement('div');
    activities.appendChild(costDiv);
    costDiv.setAttribute('class', 'totalCostAmount')
    costDiv.textContent = `Total: $${total}`;
}



activities.addEventListener('change', (e) => {
    let clicked = e.target;
    let clickedDayAndTime = clicked.getAttribute('data-day-and-time');
    let workshopCost = parseInt(clicked.getAttribute('data-cost'));

    if(clicked.checked){
        totalCost = totalCost + workshopCost;
    } else {
        totalCost = totalCost - workshopCost;
    }

    for(let i = 0; i < checkboxes.length; i++){
        let checkboxData = checkboxes[i].getAttribute('data-day-and-time');
        if(clickedDayAndTime === checkboxData && clicked !== checkboxes[i]){
            if(clicked.checked){
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



