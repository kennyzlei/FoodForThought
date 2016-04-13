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
                    "meal_name": "Pizza Party",
                    "pic_url": "img/paula.jpg",
                    "meal_time": "7:00 PM",
                    "meal_date": "April 15th",
                    "host": false,
                    "guest": true
                },
                {
                    "meal_id": 3,
                    "meal_name": "Chicken Gumbo with Jim",
                    "pic_url": "img/chicken-gumbo.jpg",
                    "meal_time": "7:00 PM",
                    "meal_date": "April 16th",
                    "host": false,
                    "guest": false
                },
                {
                    "meal_id": 4,
                    "meal_name": "Happy Hour at Larry's Crib",
                    "pic_url": "img/mixology.jpg",
                    "meal_time": "12:00 PM",
                    "meal_date": "April 17th",
                    "host": true,
                    "guest": false
                },
                {
                    "meal_id": 5,
                    "meal_name": "Pad Thai with Lisa",
                    "pic_url": "img/pad-thai.jpg",
                    "meal_time": "9:00 PM",
                    "meal_date": "April 17th",
                    "host": false,
                    "guest": true
                },
                {
                    "meal_id": 6,
                    "meal_name": "Burgers with Joe",
                    "pic_url": "img/burger.jpg",
                    "meal_time": "1:00 PM",
                    "meal_date": "April 19th",
                    "host": false,
                    "guest": false
                },
                {
                    "meal_id": 7,
                    "meal_name": "Learn How to California Roll",
                    "pic_url": "img/sushi.jpg",
                    "meal_time": "6:30 PM",
                    "meal_date": "April 21st",
                    "host": false,
                    "guest": false
                },
                {
                    "meal_id": 8,
                    "meal_name": "Ribfest",
                    "pic_url": "img/bobby.jpg",
                    "meal_time": "6:00 PM",
                    "meal_date": "May 1st",
                    "host": false,
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
        if (value["guest"] == false) {
            addMealHTML(value);
        }
    });
}

// call this if its the guest reservations page
function loadGuestReservations() {
    var upcoming = meals["upcoming"];
    
    $.each(upcoming, function(key, value) {
        if (value["guest"] == true) {
            addMealHTML(value);
        }
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
    // grab details from localStorage
    var value = JSON.parse(localStorage.getItem("newmeal"));
    addMealHTML(value);
    meals["upcoming"].push(value);
    syncStorage();
}

// when html document is loaded
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
    if($("#guest-reservations").length) {
        loadGuestReservations();
    }
};

// when html page is changed, known as pushed
window.addEventListener('push', checkPage);
