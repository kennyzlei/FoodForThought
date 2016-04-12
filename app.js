var meals = {};

function syncStorage() {
    localStorage.setItem("meals", JSON.stringify(meals));
}

function loadStorage() {
    meals = JSON.parse(localStorage.getItem("meals"));
}

// call this if its the guest homepage
function loadGuest() {
    var upcoming = meals["upcoming"];
    var past = meals["past"];
}

// call this if its the host homepage
function loadHost() {
    var upcoming = meals["upcoming"];
    var past = meals["past"];
    
    $.each(upcoming, function(key, value) {
        if (value["host"] == true) {
            
        }
    });
    
    $.each(past, function(key, value) {
        if (value["host"] == true) {
            
        }
    });
}

function addMeal() {
    
}

//when html document is loaded
$(document).ready(function() {
    loadStorage();
});