window.onload = function() {
    document.getElementById("name").focus();
    document.getElementById("other-title").style.display = "none";
    setColorOptions();
}



let selectTheme = document.querySelectorAll("#design > option");
let colorOptions = document.querySelectorAll("#color > option")
let defaultColorMenu = document.createElement('option');



function setColorOptions() {
    if(selectTheme[0].selected){
        for(let i = 0; i < colorOptions.length; i++){
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
    if(selectTheme[1].selected){
        setColorOptions();
        for(let i = 0; i < colorOptions.length; i++){
            colorOptions[i].hidden = false;
            for(let i = 3; i < colorOptions.length; i++){
                colorOptions[i].hidden = true;
            }
        }
    } else if(selectTheme[2].selected){
        setColorOptions();
        for(let i = 0; i < colorOptions.length; i++){
            colorOptions[i].hidden = true;
            for(let i = 3; i < colorOptions.length; i++){
                colorOptions[i].hidden = false;
            }
        }
    } else {
        setColorOptions();
    }
}



title.addEventListener('change', () => {
    if(document.getElementById("title").value == "other"){
        document.getElementById("other-title").style.display = "block";
    } else {
        document.getElementById("other-title").style.display = "none";
    }
})

design.addEventListener('change', () => {
    changeColorOptions();
})






