window.onscroll = function() {
	pageScrolling();
}

window.onload = function() {
	/* For themes */
	let darkToggled = localStorage.getItem('darkToggled');
	
	if (darkToggled == 'enabled') {
		toggleDarkMode('enable');
	}
	else {
		toggleDarkMode('disable');
	}

	initSettings();

	/* For screen reader */
	var getButton = document.getElementById("read-screen");

	// Check if synthesis is supported
	if ('speechSynthesis' in window) {
		if (getButton.style.display == "none") {
			getButton.style.display = "block";
		}

		// Get instance
		var synth = speechSynthesis;
		var flag = false;

		// Stop reader from continuing on when loading a different page
		synth.cancel();

		// Get play button and add click event to it
		var getButton = document.querySelector('#read-screen');
		getButton.addEventListener('click', onClickPlay);

		function onClickPlay() {
			if (!flag) {
				flag = true;
				// Collect all text on page within the container for it to read
				utterance = new SpeechSynthesisUtterance(document.querySelector('.page-container').textContent);
				// Set type of voice, 0 = male, 1 = female
				var voices = synth.getVoices();

				utterance.voice = voices.filter(function(voice) { return voice.name == 'Alex'; })[0];

				// Once reader has finished, set flag to false
				utterance.onend = function() {
					flag = false;
				};

				// Play
				synth.speak(utterance);
				return;
			}

			// If reader is playing and the button is clicked again, stop the reader
			if (flag && synth.speaking) {
				flag = false;
				synth.cancel();
			}
		}
	}
	// If not supported, remove play button
	else {
		getButton.style.display = "none";
	}

	/* For pagination */
	loadPagination('menu-item');
}


/* Switching Themes */


const toggleButtonDesktop = document.querySelector('#theme-toggle-desktop');
const toggleButtonMobile = document.querySelector('#theme-toggle-mobile');

const toggleDarkMode = (state) => {
	let logoImg = document.getElementById('logo-img');
	let lightImg = "./assets/Logo.png";
	let darkImg = "./assets/Logo-dark.png";
	
	if (state == 'toggle') {
		if (!hasClass(document.body, "darkmode")) {
			// add darkmode class to body
			addClass(document.body, "darkmode");
			// set darkmode state in local storage
			localStorage.setItem('darkToggled', 'enabled');

			// change img
			logoImg.src = darkImg;
			return;
		}

		// remove darkmode class from body
		removeClass(document.body, "darkmode");
		// remove darkmode from local storage
		localStorage.removeItem('darkToggled');

		// change img
		logoImg.src = lightImg;
		return;
	}

	if (state == 'enable') {
		addClass(document.body, "darkmode");
		localStorage.setItem('darkToggled', 'enabled');
		logoImg.src = darkImg;
		return;
	}

	if (state == 'disable') {
		removeClass(document.body, "darkmode");
		localStorage.removeItem('darkToggled');
		logoImg.src = lightImg;
		return;
	}
}

toggleButtonDesktop.addEventListener('click', () => {
	toggleDarkMode('toggle');
});

toggleButtonMobile.addEventListener('click', () => {
	toggleDarkMode('toggle');
});


/* Settings Functions */


/* 
var junction_font = new FontFace('Junction Regular', 'url(fonts/junction-regular.woff)');
junction_font.load().then(function(loaded_face) {
	document.fonts.add(loaded_face);
  	document.body.style.fontFamily = '"Junction Regular", Arial';
}).catch(function(error) {
	// error occurred
});
*/

function initSettings() {
	let root = document.documentElement;
	
	if (localStorage.getItem("fontPrimary") != null) {
		var getFont = localStorage.getItem("fontPrimary");
		root.style.setProperty('--font-primary', getFont);
	}

	if (localStorage.getItem("fontPrimary_url") != null) {
		var getFont = localStorage.getItem("fontPrimary_url");
		var getFontLink = document.getElementById("primary-font-link");

		getFontLink.href = getFont;
	}

	if (localStorage.getItem("fontSecondary") != null) {
		var getFont = localStorage.getItem("fontSecondary");
		root.style.setProperty('--font-secondary', getFont);
	}

	if (localStorage.getItem("fontSecondary_url") != null) {
		var getFont = localStorage.getItem("fontSecondary_url");
		var getFontLink = document.getElementById("secondary-font-link");

		getFontLink.href = getFont;
	}
}

function loadSettings() {
	var primaryFontName = localStorage.getItem("fontPrimary") == null ? "Inter, sans-serif" : localStorage.getItem("fontPrimary");
	var primaryFontUrl = localStorage.getItem("fontPrimary_url") == null ? "https://rsms.me/inter/inter.css" : localStorage.getItem("fontPrimary_url");

	var secondaryFontName = localStorage.getItem("fontSecondary") == null ? "Open Sans, sans-serif" : localStorage.getItem("fontSecondary");
	var secondaryFontUrl = localStorage.getItem("fontSecondary_url") == null ? "https://fonts.googleapis.com/css?family=Open+Sans" : localStorage.getItem("fontSecondary_url");

	document.getElementById("font-name").value = primaryFontName;
	document.getElementById("font-url").value = primaryFontUrl;
	document.getElementById("secondary-font-name").value = secondaryFontName;
	document.getElementById("secondary-font-url").value = secondaryFontUrl;
}

function saveSettings() {
	var primaryFontName = document.getElementById("font-name").value;
	var primaryFontUrl = document.getElementById("font-url").value;

	var secondaryFontName = document.getElementById("secondary-font-name").value;
	var secondaryFontUrl = document.getElementById("secondary-font-url").value;

	localStorage.setItem("fontPrimary", primaryFontName);
	localStorage.setItem("fontSecondary", secondaryFontName);
	localStorage.setItem("fontPrimary_url", primaryFontUrl);
	localStorage.setItem("fontSecondary_url", secondaryFontUrl);
	window.location.reload(true);
}

function resetSettings() {
	if (localStorage.getItem("fontPrimary") != null) {
		localStorage.removeItem("fontPrimary");
	}

	if (localStorage.getItem("fontSecondary") != null) {
		localStorage.removeItem("fontSecondary");
	}

	if (localStorage.getItem("fontPrimary_url") != null) {
		localStorage.removeItem("fontPrimary_url");
	}

	if (localStorage.getItem("fontSecondary_url") != null) {
		localStorage.removeItem("fontSecondary_url");
	}	
	window.location.reload(true);
}


/* Search bar functions */


function searchItems(list) {
	let input = document.getElementById('searchbar').value
	input = input.toLowerCase();

	// Collect all elements with a certain class name for the search results.
	let items = document.getElementsByClassName(list);
	var itemAmount = 0;
	
	let errorMsg = document.getElementById('no-items');
	let searchMsg = document.getElementById('search-result');
	let oldSearchMsg = "Search Result(s)";

	let paginationContainer = document.getElementById('pagination-container');

	// Loop through collected elements
	for (i = 0; i < items.length; i++) {
		// If the search bar contains no characters, reset the search
		// and reload the page.
		if (input.length <= 0) {
			items[i].style.display = "flex";
			errorMsg.style.display = "none";
			searchMsg.style.display = "none";
			window.location.reload(true);
		}

		// If the collected elements don't have the characters from the
		// search bar, set their display to none to hide them
		if (!items[i].innerHTML.toLowerCase().includes(input)) {
			items[i].style.display = "none";

			if (items[i].classList.contains("search-item")) {
				items[i].classList.remove("search-item");
			}
		}
		// If they do have characters from the search bar, set their display to flex
		else {
			itemAmount++;
			items[i].style.display = "flex";
			items[i].classList.add("search-item");
		}
	}

	// If the search bar has more than 0 characters
	if (input.length > 0) {
		// If there are no items found, display an error message
		if (itemAmount <= 0) {
			errorMsg.style.display = "flex";
			searchMsg.style.display = "none";
		}
		// If there are items found, display the amount of items
		else {
			searchMsg.textContent = oldSearchMsg;
			searchMsg.textContent = itemAmount + " " + searchMsg.textContent;
			
			errorMsg.style.display = "none";
			searchMsg.style.display = "block";
		}
	}
}


/* Pagination Functions */


var currentPage = 1;
var itemsPerPage = 3;

var pageObjects = []

/* Collect elements with a specific name to put into a list */
function populateList(list) {
	let items = document.getElementsByClassName(list);

	while (pageObjects.length) {
		pageObjects.pop();
	}

	for (i = 0; i < items.length; i++) {
		/* If the element is visible, add them to the list */
		if (items[i].style.display != "none") {
			pageObjects.push(items[i])
		}
	}
}

function previousPage() {
	if (currentPage > 1) {
		currentPage--;
		loadPage(currentPage);
	}
}

function nextPage() {
	if (currentPage < maxPages()) {
		currentPage++;
		loadPage(currentPage);
	}
}

function lastPage() {
	loadPage(maxPages());
}

function firstPage() {
	loadPage(1);
}

function loadPage(page) {
	if (pageObjects == null || pageObjects.length <= 0) {
		return;
	}
	
	handlePageFunctions(page, maxPages());

	/* Loop through all collected elements and set their display to none */
	for (var j = 0; j < pageObjects.length; j++) {
		pageObjects[j].style.display = "none";
	}

	/* Calculate max items per page and make specific elements visible */
	for (var i = (page - 1) * itemsPerPage; i < (page * itemsPerPage); i++) {
		pageObjects[i].style.display = "flex";
	}
}

function maxPages() {
	return Math.ceil(pageObjects.length / itemsPerPage);
}

function handlePageFunctions(currentPage, pageAmount) {
	var currentPageBtn = document.getElementById("current");
	var nextPageBtn = document.getElementById("next");
	var previousPageBtn = document.getElementById("previous");

	var firstPageBtn = document.getElementById("first");
	var lastPageBtn = document.getElementById("last");

	var paginationContainer = document.getElementById('pagination-container');

	/* Stop user from going back further than first page */
	if (currentPage < 1) {
		currentPage = 1;
	}

	/* Don't need to show buttons when there are no other pages */
	if (pageAmount == 1 || pageAmount < 1) {
		paginationContainer.style.display = "none";
	}
	else {
		paginationContainer.style.display = "flex";
	}

	/* Stop user from going past last page */
	if (currentPage > pageAmount) {
		currentPage = pageAmount;
	}

	/* Visualise whether the user can go backwards or not */
	if (currentPage > 1) {
		previousPageBtn.removeAttribute('disabled');
		firstPageBtn.removeAttribute('disabled');
	}
	else {
		previousPageBtn.setAttribute('disabled', '');
		firstPageBtn.setAttribute('disabled', '');
	}

	/* Visualise whether the user can go forward or not */
	if (currentPage == pageAmount) {
		nextPageBtn.setAttribute('disabled', '');
		lastPageBtn.setAttribute('disabled', '');
	}
	else {
		nextPageBtn.removeAttribute('disabled');
		lastPageBtn.removeAttribute('disabled');
	}

	/* Display current page number the user is on */
	currentPageBtn.textContent = currentPage;
}

function loadPagination(list) {
	populateList(list);
	loadPage(1);
}


/* Page Scrolling Functions */


/* Returns how far you have scrolled on a page in a certain direction (X or Y) */
function getScroll(type) {
  switch (type) {
    case "x":
      return window.pageXOffset;
    case "y":
      return window.pageYOffset;
    
    default:
      return window.pageYOffset;
  }
}

function pageScrolling() {
  var eTopBtn = document.getElementById("top");
	var readerBtn = document.getElementById("read-screen");
	var navbar = document.getElementById("navigation-style");

	// Check how far the user has scrolled down the page.
	if (getScroll() > 300) {
			readerBtn.style.bottom = "110px";
			eTopBtn.style.display = "block";

			if (!hasClass(navbar, "box-shadow")) {
				addClass(navbar, "box-shadow");
			}
		}
		else {
			eTopBtn.style.display = "none";
			readerBtn.style.bottom = "40px";

			if (hasClass(navbar, "box-shadow")) {
				removeClass(navbar, "box-shadow");
			}
	}
}

function scrollToTop() {
	// Places user back to the top of page.
  // Need to use this to get compatibility with different types of browsers.
  document.body.scrollTop = document.documentElement.scrollTop = 0;
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

function switchIcon(element, newIcon, oldIcon) {
	if (!hasClass(element, newIcon) && !hasClass(element, oldIcon)) {
		return;
	}
	
	if (hasClass(element, newIcon)) {
		removeClass(element, newIcon);
		addClass(element, oldIcon);
		return;
	}
	else {
		removeClass(element, oldIcon);
		addClass(element, newIcon);
	}
}

function togglePlayIcon() {
	var iconId = document.getElementById("play-icon");
	switchIcon(iconId, "fa-stop", "fa-play")
}

/* Check the size of the users page */
function pageSize(type) {
	switch (type) {
    case "w":
      return window.innerWidth || document.body.clientWidth;
    case "h":
      return window.innerHeight || document.body.clientHeight;
    
    default:
      return window.innerWidth || document.body.clientWidth;
  }
}