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
                    "meal_id": 0,
                    "host_name": "Larry Sanders",
                    "meal_name": "Larry's BBQ",
                    "meal_details": "Join me while we cook some burgers, hot dogs, ribs, sausages and baked beans in the warm sunshine. Being a grill master for about 10 years now, I've won some local BBQ competitions with my award-winning hot&spicy BBQ sauce. Come try it out and let me know what you think! I might even reveal some of my well-kept secrets if you enjoy the food!",
                    "meal_categories": [1, 1, 1, 1, 1, 1],
                    "meal_categories": [1, 0, 0, 0, 0, 0],
                    "pic_url": "img/bbq.jpg",
                    "meal_time": "1:00 PM",
                    "meal_date": "April 15th",
                    "location": "28 DeWolfe Street Cambridge, MA 02138",
                    "num_guests": 4,
                    "cost": 8,
                    "host": true,
                    "guest": true
                },
                {
                    "meal_id": 1,
                    "host_name": "Larry Sanders",
                    "meal_name": "Pizza Party",
                    "meal_details": "amazing meal",
                    "meal_categories": [1, 0, 0, 0, 0, 0],
                    "pic_url": "img/paula.jpg",
                    "meal_time": "7:00 PM",
                    "meal_date": "April 15th",
                    "location": "20 DeWolfe Street Cambridge, MA 02138",
                    "num_guests": 5,
                    "cost": 5,
                    "host": false,
                    "guest": true
                },
                {
                    "meal_id": 2,
                    "host_name": "Jim Sanders",
                    "meal_name": "Chicken Gumbo with Jim",
                    "meal_details": "amazing meal",
                    "meal_categories": [1, 0, 0, 0, 0, 0],
                    "pic_url": "img/chicken-gumbo.jpg",
                    "meal_time": "7:00 PM",
                    "meal_date": "April 16th",
                    "location": "21 DeWolfe Street Cambridge, MA 02138",
                    "num_guests": 6,
                    "cost": 7,
                    "host": false,
                    "guest": false
                },
                {
                    "meal_id": 3,
                    "host_name": "Larry Sanders",
                    "meal_name": "Happy Hour at Larry's Crib",
                    "meal_details": "amazing meal",
                    "meal_categories": [1, 1, 1, 1, 1, 1],
                    "pic_url": "img/mixology.jpg",
                    "meal_time": "12:00 PM",
                    "meal_date": "April 17th",
                    "location": "28 DeWolfe Street Cambridge, MA 02138",
                    "num_guests": 5,
                    "cost": 8,
                    "host": true,
                    "guest": false
                },
                {
                    "meal_id": 4,
                    "host_name": "Lisa Sanders",
                    "meal_name": "Pad Thai with Lisa",
                    "meal_details": "amazing meal",
                    "meal_categories": [0, 1, 0, 0, 1, 0],
                    "pic_url": "img/pad-thai.jpg",
                    "meal_time": "9:00 PM",
                    "meal_date": "April 17th",
                    "location": "23 DeWolfe Street Cambridge, MA 02138",
                    "num_guests": 3,
                    "cost": 9,
                    "host": false,
                    "guest": true
                },
                {
                    "meal_id": 5,
                    "host_name": "Joe Sanders",
                    "meal_name": "Burgers with Joe",
                    "meal_details": "amazing meal",
                    "meal_categories": [1, 0, 0, 0, 0, 0],
                    "pic_url": "img/burger.jpg",
                    "meal_time": "1:00 PM",
                    "meal_date": "April 19th",
                    "location": "24 DeWolfe Street Cambridge, MA 02138",
                    "num_guests": 5,
                    "cost": 7,
                    "host": false,
                    "guest": false
                },
                {
                    "meal_id": 6,
                    "host_name": "Larry Sanders",
                    "meal_name": "Learn How to California Roll",
                    "meal_details": "amazing meal",
                    "meal_categories": [1, 0, 0, 0, 1, 0],
                    "pic_url": "img/sushi.jpg",
                    "meal_time": "6:30 PM",
                    "meal_date": "April 21st",
                    "location": "28 DeWolfe Street Cambridge, MA 02138",
                    "num_guests": 4,
                    "cost": 10,
                    "host": false,
                    "guest": false
                },
                {
                    "meal_id": 7,
                    "host_name": "Larry Sanders",
                    "meal_name": "Ribfest",
                    "meal_details": "amazing meal",
                    "meal_categories": [1, 0, 0, 0, 0, 0],
                    "pic_url": "img/bobby.jpg",
                    "meal_time": "6:00 PM",
                    "meal_date": "May 1st",
                    "location": "27 DeWolfe Street Cambridge, MA 02138",
                    "num_guests": 4,
                    "cost": 7,
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
    var preferences = JSON.parse(localStorage.getItem("preferences"));

    $.each(upcoming, function(key, value) {
        if (value["guest"] == false && compareMealPreferences(value, preferences)) {
            addMealHTML(value);
        }
    });
}

function compareMealPreferences(value, preferences) {
    if (preferences == null) {
        return true;
    }

    if (value["cost"] > preferences["cost"]) {
        return false;
    }
    for (var i=0; i < value["meal_categories"].length; i++) {
        if (preferences["meal_categories"][i] == 1 && value["meal_categories"][i] == 1) {
            return true;
        }
    }
    return false;
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

function addMealDetailsHTML(){
    if (!isNaN(getCurrentMealID())) {
        var meal = meals["upcoming"][getCurrentMealID()];
        var mealdetails = meal["meal_name"] + '<p>Host: ' + meal["host_name"] + "</p><p> 2/" + meal["num_guests"] + " RSVP's </p>";
        $('#heading').append(mealdetails);
        var mealdetails2 = '<p>' + meal["meal_details"] + '</p>';
        $('#meal_description').append(mealdetails2);
        var mealdetails3 = '<p>' + meal["meal_date"] + '<br>' + meal["meal_time"] + '</p>';
        $('#meal_time').append(mealdetails3);
        var mealdetails4 = '<p> Location: <br>' + meal["location"] + '</p>';
        $('#meal_location').append(mealdetails4);
        var mealdetails5 = '<p> Cost: $' + meal["cost"] + '</p>';
        $('#meal_cost').append(mealdetails5);
        $('#prof_pic').attr("src", meal["pic_url"]);

        var rsvpbutton;
        if (getIfHost() == false) {
            if (meal["guest"] == true) {
                rsvpbutton = '<button class="btn btn-negative btn-block btn-outlined">Cancel</button>';
            } else {
                rsvpbutton = '<button class="btn btn-positive btn-block">RSVP</button>';
            }
        } else {
            rsvpbutton = '<button class="btn btn-negative btn-block btn-outlined">Cancel</button>'
        }
        $("#rsvp-cancel").append(rsvpbutton);
    }
}

function toggleMeal() {
    meals["upcoming"][getCurrentMealID()]["guest"] ^= true;
    syncStorage();
    history.go(-1);
}

function addMeal() {
    // grab details from localStorage
    var value = JSON.parse(localStorage.getItem("newmeal"));
    value["host"] = true;
    value["guest"] = false;
    value["pic_url"] = "img/chinese.jpg";
    value["meal_id"] = 0;
    value["host_name"] = "Larry Sanders";
    value["location"] = "28 DeWolfe Street Cambridge, MA 02138";

    $.each(meals["upcoming"], function(key, value) {
        value["meal_id"] += 1;
    });
    meals["upcoming"].unshift(value);
    syncStorage();

    localStorage.removeItem("newmeal");
    window.location.href = "host-homepage.html"
}

function removeMeal() {
    var meal_id = getCurrentMealID();
    $.each(meals["upcoming"], function(key, value) {
        if (key > meal_id) {
            value["meal_id"] -= 1;
        }
    });
    meals["upcoming"].splice(meal_id, 1);
    syncStorage();
    history.go(-1);
}

// create newmeal object
function addMealName() {
    var newmeal = JSON.parse(localStorage.getItem("newmeal"));
    if (newmeal == null) {
        newmeal = {};
    }

    var name_input = document.getElementById("meal_name");
    var desc_input = document.getElementById("meal_description");

    newmeal["meal_name"] = name_input.value;
    newmeal["meal_details"] = desc_input.value;

    localStorage.setItem("newmeal", JSON.stringify(newmeal));
    window.location.href = "host-create-categories.html";
}

// add food categories to newmeal object
function addMealCategories() {
    var categories = document.getElementById("categories_list");
    var items = categories.getElementsByTagName("li");

    var choices = [];
    var newmeal = JSON.parse(localStorage.getItem("newmeal"));

    // search through list items and see if an active toggle exists
    for(var i = 0; i < items.length; i++) {
        var x = items[i].getElementsByTagName("div");
        if(x[0].classList.contains("active")) {
            choices[i] = 1;
        } else {
            choices[i] = 0;
        }
    }

    newmeal["meal_categories"] = choices;
    localStorage.setItem("newmeal", JSON.stringify(newmeal));
    window.location.href = "host-create-date.html";
}
// parts = items, options = choices, types = categories
function changePreferences() {
    var preferences = {};
    var categories = document.getElementById("meal_categories");
    var items = categories.getElementsByTagName("li");
    var choices = [];

    for(var i = 0; i < items.length; i++) {
        var x = items[i].getElementsByTagName("div");
        if(x[0].classList.contains("active")) {
            choices[i] = 1;
        } else {
            choices[i] = 0;
        }
    }

    preferences["meal_categories"] = choices;

    // This is for the budget and number of guests preferences
    var preferences_guest_input = document.getElementById("num_guests");
    var preferences_budget_input = document.getElementById("cost");

    preferences["num_guests"] = preferences_guest_input.value;
    preferences["cost"] = preferences_budget_input.value;

    localStorage.setItem("preferences", JSON.stringify(preferences));
    window.location.href = "guest-homepage.html";
}

// add date and time of event to newmeal object
function addMealTime() {
    var date_input = document.getElementById("meal_day");
    var time_input = document.getElementById("meal_time");

    var newmeal = JSON.parse(localStorage.getItem("newmeal"));

    newmeal["meal_date"] = date_input.value;
    newmeal["meal_time"] = time_input.value;

    localStorage.setItem("newmeal", JSON.stringify(newmeal));
    window.location.href = "host-create-guests.html";
}

// add number of guests and cost per guest
function addGuestInfo() {
    var guest_input = document.getElementById("num_guests");
    var cost_input = document.getElementById("guest_cost");

    var newmeal = JSON.parse(localStorage.getItem("newmeal"));

    newmeal["num_guests"] = parseInt(guest_input.value);
    newmeal["cost"] = parseInt(cost_input.value);

    localStorage.setItem("newmeal", JSON.stringify(newmeal));
    window.location.href = "host-create-summary.html";
}

// load all the details for host to confirm
function loadMealSummary() {

    var newmeal = JSON.parse(localStorage.getItem("newmeal"));

    $("#title").append(newmeal["meal_title"]);
    $("#time").append(newmeal["meal_date"] + " @ " + newmeal["meal_time"]);
    $("#guests").append("for " + newmeal["num_guests"] + " guests");
    $("#costs").append("x $" + newmeal["cost"] + " per person");

    var total = parseInt(newmeal["num_guests"]) * parseInt(newmeal["cost"])
    $("#total").append("= $" + total + " to spend");
}

function loadHostMealName() {
    var newmeal = JSON.parse(localStorage.getItem("newmeal"));
    if (newmeal != null) {
        $("#meal_name").attr("value", newmeal["meal_name"]);
        $("#meal_description").append(newmeal["meal_details"]);
    }
}

function loadHostMealCategories() {
    var newmeal = JSON.parse(localStorage.getItem("newmeal"));
    var list = newmeal["meal_categories"];
    var table = document.getElementById("categories_list");
    var items = table.getElementsByTagName("li")

    for(var i = 0; i < list.length; i++) {
        var x = items[i].getElementsByTagName("div");
        if(list[i]) {
            x[0].classList.add("active");
        }
    }
}

function loadPreferences() {
    var preferences = JSON.parse(localStorage.getItem("preferences"));
    if (preferences != null) {
        var list = preferences["meal_categories"];
        var table = document.getElementById("meal_categories");
        var items = table.getElementsByTagName("li")

        for(var i = 0; i < list.length; i++) {
            var x = items[i].getElementsByTagName("div");
            if(list[i]) {
                x[0].classList.add("active");
            }
        }
        $("#num_guests").val(preferences["num_guests"]);
        $("#cost").val(preferences["cost"]);
    }
}

function loadHostMealDate() {
    var newmeal = JSON.parse(localStorage.getItem("newmeal"));
    $("#meal_day").attr("value", newmeal["meal_date"]);
    $("#meal_time").attr("value", newmeal["meal_time"]);
}

function loadHostGuestInfo() {
    var newmeal = JSON.parse(localStorage.getItem("newmeal"));
    $("#num_guests").val(newmeal["num_guests"]);
    $("#guest_cost").val(newmeal["cost"]);
}

function getCurrentMealID() {
    var meal_id = parseInt(localStorage.getItem("current_meal_id"));
    return meal_id;
}

function getIfHost() {
    var if_host = localStorage.getItem("if_host");
    return (if_host == "true");
}

function setIfHost(value) {
    localStorage.setItem("if_host", value);
}

// when html document is loaded
$(document).ready(function() {
    checkPage();
});

var checkPage = function(){
    loadStorage();
    if($("#host-homepage").length) {
        setIfHost(true);
        loadHost();
    }
    if($("#guest-homepage").length) {
        setIfHost(false);
        loadGuest();
    }
    if($("#guest-reservations").length) {
        loadGuestReservations();
    }
    if($("#guest-reservation-detail").length) {
        addMealDetailsHTML();
        $("#back-button").click(function() {
            history.go(-1);
        });
        $("#rsvp-cancel").click(function() {
            if (getIfHost()) {
                removeMeal();
            } else {
                toggleMeal();
            }
        })
    }
    if($("#host-create-summary").length) {
        loadMealSummary();
    }
    if($("#host-create-name").length) {
       loadHostMealName();
    }
    if($("#host-create-categories").length) {
        loadHostMealCategories();
    }
    if($("#host-create-date").length) {
        loadHostMealDate();
    }
    if($("#host-create-guests").length) {
        loadHostGuestInfo();
    }
    if($("#guest-preferences").length) {
      loadPreferences();
        $("#back-button").click(function() {
            changePreferences();
        });
    }
};

// when html page is changed, known as pushed
window.addEventListener('push', checkPage);

$(document).on("click", ".navigate-right", function(){
    var current_meal_id = $(this).parent().attr("meal_id");
    localStorage.setItem("current_meal_id", current_meal_id);

    window.location.href = "../guest-reservation-detail.html";
});
