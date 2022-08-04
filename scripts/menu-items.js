var menu = {
	"italian_pizza": "Italian Pizza",
	"doner_kebab": "Doner Kebab",
	"hamburger": "Hamburger",
	"chicken_korma": "Chicken Korma",
	"spaghetti_carbonara": "Spaghetti Carbonara",
	"jerk_chicken": "Jerk Chicken",
	"pulled_pork": "Pulled Pork"
}

var descriptions = {
	"italian_pizza": "pizza, dish of Italian origin consisting of a flattened disk of bread dough topped with some combination of olive oil, oregano, tomato, olives, mozzarella or other cheese, and many other ingredients, baked quickly—usually, in a commercial setting, using a wood-fired oven heated to a very high temperature—and served hot.",
	"doner_kebab": "Doner kebab, also spelled döner kebab, is a type of kebab, made of meat cooked on a vertical rotisserie. Seasoned meat stacked in the shape of an inverted cone is turned slowly on the rotisserie, next to a vertical cooking element.",
	"hamburger": "The best burgers offer a combination of tastes and textures – sweet, sour, salt – with a bit of crunch. The patty needs to be juicy, the bun soft but sturdy, and you want the meat/bun/accompaniment ratio to be even from first to last bite. Then you can add to your heart's content.",
	"chicken_korma": "Chicken korma, also known as qorma or kurma, is an Indian dish featuring chicken meat braised in a rich, spiced sauce. There are many variations of the popular stew known as korma, including navratan korma with veggies and paneer, lamb korma, and Mughlai korma, which features sweetened condensed milk.",
	"spaghetti_carbonara": "Spaghetti carbonara is an Italian main course consisting of spaghetti (long thin strands of pasta) with bacon and a creamy sauce made from eggs, Pecorino or Parmesan and black pepper. The dish is probably from Rome.",
	"jerk_chicken": "Grilled chicken marinated in a spicy sauce that is traditionally served in Jamaica. The poultry is seasoned with a jerk sauce or marinade that combines allspice, cinnamon, chiles, garlic, thyme, onion, nutmeg, lime juice, olive oil, soy sauce, and brown sugar.",
	"pulled_pork": "Pulled pork is an American barbecue dish, more specifically a dish of the Southern U.S., based on shredded barbecued pork shoulder. It is typically slow-smoked over wood (usually outdoors); indoor variations use a slow cooker. The meat is then shredded manually and mixed with a sauce."
}

var pictures = {
	"italian_pizza_1": "../assets/images/events/italian_pizza.jpg",
	"italian_pizza_2": "../assets/images/events/italian_pizza_2.jpg",
	"italian_pizza_3": "../assets/images/events/italian_pizza_3.jpg",
	"doner_kebab_1": "../assets/images/events/doner_kebab.jpg",
	"doner_kebab_2": "../assets/images/events/doner_kebab_2.jpg",
	"doner_kebab_3": "../assets/images/events/doner_kebab_3.jpg",
	"hamburger_1": "../assets/images/events/american_hamburger.jpg",
	"hamburger_2": "../assets/images/events/american_hamburger_2.jpg",
	"hamburger_3": "../assets/images/events/american_hamburger_3.jpg",
	"chicken_korma_1": "../assets/images/events/chicken_korma.jpg",
	"chicken_korma_2": "../assets/images/events/chicken_korma_2.jpg",
	"chicken_korma_3": "../assets/images/events/chicken_korma_3.jpg",
	"spaghetti_carbonara_1": "../assets/images/events/spaghetti_carbonara.jpg",
	"spaghetti_carbonara_2": "../assets/images/events/spaghetti_carbonara_2.jpg",
	"spaghetti_carbonara_3": "../assets/images/events/spaghetti_carbonara_3.jpg",
	"jerk_chicken_1": "../assets/images/events/jerk_chicken.jpg",
	"jerk_chicken_2": "../assets/images/events/jerk_chicken_2.jpg",
	"jerk_chicken_3": "../assets/images/events/jerk_chicken_3.jpg",
	"pulled_pork_1": "../assets/images/events/pulled_pork.jpg",
	"pulled_pork_2": "../assets/images/events/pulled_pork_2.jpg",
	"pulled_pork_3": "../assets/images/events/pulled_pork_3.jpg"
}

function getMenuItem(item) {
	let itemTitle = document.getElementById('item-title');
	let itemDescription = document.getElementById('item-description');
	let itemImages = document.getElementsByClassName('item-image');

	for (i = 0; i < itemImages.length; i++) {
		itemImages[i].src = pictures[item + "_" + (i + 1)];
	}

	itemTitle.textContent = menu[item];
	itemDescription.textContent = descriptions[item];
}