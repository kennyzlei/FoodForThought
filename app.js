var meals = {};

function syncStorage() {
    localStorage.setItem("meals", JSON.stringify(meals));
}

function loadStorage() {
    meals = JSON.parse(localStorage.getItem("meals"));
    if (meals == null) {
        meals = {
            "upcoming": [
                {
                    "meal_id": 1,
                    "meal_name": "Larry's BBQ",
                    "pic_url": "img/bbq.jpg",
                    "meal_time": "1:00 PM",
                    "meal_date": "April 15th",
                    "host": true,
                    "guest": true
                },
                {
                    "meal_id": 2,
                    "meal_name": "Happy Hour at Larry's Crib",
                    "pic_url": "img/mixology.jpg",
                    "meal_time": "12:00 PM",
                    "meal_date": "April 16th",
                    "host": true,
                    "guest": false
                },
                {
                    "meal_id": 3,
                    "meal_name": "Burgers with Larry",
                    "pic_url": "img/burger.jpg",
                    "meal_time": "1:00 PM",
                    "meal_date": "April 17th",
                    "host": true,
                    "guest": false
                },
            ]
        }
    }
}

// call this if its the guest homepage
function loadGuest() {
    var upcoming = meals["upcoming"];
    
    $.each(upcoming, function(key, value) {
        addMealHTML(value);
    });
}

// call this if its the host homepage
function loadHost() {
    var upcoming = meals["upcoming"];

    $.each(upcoming, function(key, value) {
        if (value["host"] == true) {
            addMealHTML(value);
        }
    });
}

function addMealHTML(value) {
    var newmeal = $('<li class="table-view-cell media" meal_id="'+value["meal_id"]+'"/>');
    newmeal.html('<a class="navigate-right">'+
        '<img id="prof_pic" class="media-object pull-left" src="'+ value["pic_url"] +'">'+
        '<div class="media-body">'+ value["meal_name"] +'<p>'+ value["meal_time"] +'</p>'+
        '<p>'+ value["meal_date"] +'</p>'+
        '</div></a>');
    $("#upcoming").append(newmeal);
}

function addMeal() {
    //grab details from localStorage
    var value = JSON.parse(localStorage.getItem("newmeal"));
    addMealHTML(value);
    meals["upcoming"].push(value);
    syncStorage();
}

//when html document is loaded
$(document).ready(function() {
    checkPage();
});

var checkPage = function(){
    loadStorage();
    if($("#host-homepage").length) {
        loadHost();
    }
    if($("#guest-homepage").length) {
        loadGuest();
    }
};

window.addEventListener('push', checkPage);
