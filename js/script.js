window.onload = function() {
    document.getElementById("name").focus();
};




document.getElementById("other-title").style.display = "none";

title.addEventListener('change', () => {
    if(document.getElementById("title").value == "other"){
        document.getElementById("other-title").style.display = "block";
    } else {
        document.getElementById("other-title").style.display = "none";
    }
})




