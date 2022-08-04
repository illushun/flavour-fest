var calories = {
	"mcdonalds_big_mac": "561",
	"mcdonalds_cheeseburger": "300",
	"mcdonalds_chicken_nuggets_one": "48",
	"mcdonalds_chicken_nuggets_six": "288",
	"mcdonalds_chicken_nuggets_twenty": "960",
	"mcdonalds_double_cheeseburger": "437",
	"mcdonalds_filet_o_fish": "391",
	"mcdonalds_mcchicken": "359"
}

var maxCalories = {
	"male": "2500",
	"female": "2000"
}

var countItems = [];
var genderType = "male";

function addCalories(type) {
	var getCalorieElement = document.getElementById(type);

	if (hasClass(getCalorieElement, "active-item")) {
		removeCalories(type);
		removeClass(getCalorieElement, "active-item");
		return;
	}
	
	countItems.push(calories[type]);
	addClass(getCalorieElement, "active-item");
}

function removeCalories(type) {
	for (var i = 0; i < countItems.length; i++) {
    if (countItems[i] == calories[type]) {
      countItems.splice(i, 1);
    }
  }
}

function changeGender(type) {
	var getMaleElement = document.getElementById("male");
	var getFemaleElement = document.getElementById("female");
	
	if (type == "male") {
		if (hasClass(getFemaleElement, "active-item")) {
			removeClass(getFemaleElement, "active-item");
			addClass(getMaleElement, "active-item");
			genderType = "male";
		}
		return;
	}

	if (hasClass(getMaleElement, "active-item")) {
		removeClass(getMaleElement, "active-item");
		addClass(getFemaleElement, "active-item");
		genderType = "female";
	}
}

function calcCalories() {
	var keepNumber = 0
	for (var i = 0; i < countItems.length; i++) {
		if (countItems[i] == null) {
			continue;
		}
		
		if (i == 0) {
			keepNumber = parseInt(countItems[i]);
			continue;
		}
		keepNumber = keepNumber + parseInt(countItems[i]);
	}
	return keepNumber;
}

function displayCalories() {
	var calorieAmount = calcCalories()
	var calorieText = document.getElementById("calorie-holder");
	var calorieDescription = document.getElementById("calorie-description");
	var caloriePercentage = (calorieAmount / parseInt(maxCalories[genderType])) * 100;

	if (caloriePercentage <= 0) {
		calorieDescription.style.display = "none";
		calorieText.style.marginBottom = "0";
	}
	else {
		calorieDescription.style.display = "block";
		calorieText.style.marginBottom = "40px";
	}
	
	if (caloriePercentage < 50) {
		calorieText.style.color = "var(--font-h3-colour)";
	}
	
	if (caloriePercentage > 50) {
		calorieText.style.color = "orange";
	}

	if (caloriePercentage > 100) {
		calorieText.style.color = "red";
	}
	
	calorieText.textContent = calorieAmount + " / " + maxCalories[genderType] + " calories";
	calorieDescription.textContent = "This is " + caloriePercentage.toFixed(1) + "% of your recommended daily calorie intake.";
}


/* Utilities */

	
function hasClass(element, className)
{
  if (element.classList)
    return element.classList.contains(className);
	
  return !!element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(element, className)
{
  if (element.classList)
    element.classList.add(className)
		
  else if (!hasClass(element, className))
    element.className += " " + className;
}

function removeClass(element, className)
{
  if (element.classList)
    element.classList.remove(className)
		
  else if (hasClass(element, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    element.className = element.className.replace(reg, ' ');
  }
}