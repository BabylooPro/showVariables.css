// CREATE CARD (HTML ELEMENT) WITH INFORMATION FROM A CSS VARIABLE
function createCard(variable) {
	const card = document.createElement("div");
	card.classList.add("card");
	const cardImage = document.createElement("div");
	cardImage.classList.add("card-image");
	card.appendChild(cardImage);

	// P ELEMENT WITH "LOREM IPSUM" TEXT & ADD IT TO CARDIMAGE
	const loremText = document.createElement("p");
	loremText.textContent =
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus illum consequuntur";
	loremText.style.position = "absolute";
	loremText.style.top = "50%";
	loremText.style.left = "50%";
	loremText.style.transform = "translate(-50%, -50%)";
	cardImage.appendChild(loremText);

	// APPLY STYLES ACCORDING TO TYPE OF VARIABLE
	if (variable.type === "color") {
		const backgroundColor = getComputedStyle(document.documentElement)
			.getPropertyValue(variable.name)
			.trim();
		cardImage.style.backgroundColor = backgroundColor;

		const isLight = colorIsLight(backgroundColor);
		loremText.style.color = isLight ? "#000" : "#fff";
	} else if (
		variable.type === "font-family" ||
		variable.type === "font-weight" ||
		variable.type === "font-size"
	) {
		loremText.style.fontFamily = getComputedStyle(document.documentElement)
			.getPropertyValue(variable.name)
			.trim();
		loremText.style.fontWeight = getComputedStyle(document.documentElement)
			.getPropertyValue(variable.name)
			.trim();
		loremText.style.fontSize = getComputedStyle(document.documentElement)
			.getPropertyValue(variable.name)
			.trim();
	} else if (variable.type === "border") {
		loremText.remove();

		const borderFigure = document.createElement("div");
		if (variable.name === "--border-radius") {
			borderFigure.style.borderRadius = getComputedStyle(
				document.documentElement
			)
				.getPropertyValue(variable.name)
				.trim();
		} else {
			const borderWidthValue = getComputedStyle(document.documentElement)
				.getPropertyValue("--border-width")
				.trim();
			const borderColorValue = getComputedStyle(document.documentElement)
				.getPropertyValue("--border-color")
				.trim();
			const borderStyleValue =
				getComputedStyle(document.documentElement)
					.getPropertyValue("--border-style")
					.trim() || variable.default;

			borderFigure.style.borderWidth = borderWidthValue;
			borderFigure.style.borderColor = borderColorValue;
			borderFigure.style.borderStyle = borderStyleValue;
		}

		if (variable.name === "--border-radius") {
			borderFigure.style.borderRadius = getComputedStyle(
				document.documentElement
			)
				.getPropertyValue(variable.name)
				.trim();
		} else if (variable.name === "--border-width") {
			borderFigure.style.borderWidth = getComputedStyle(
				document.documentElement
			)
				.getPropertyValue(variable.name)
				.trim();
		} else if (variable.name === "--border-color") {
			borderFigure.style.borderColor = getComputedStyle(
				document.documentElement
			)
				.getPropertyValue(variable.name)
				.trim();
		} else if (variable.name === "--border-style") {
			borderFigure.style.borderStyle = getComputedStyle(
				document.documentElement
			)
				.getPropertyValue(variable.name)
				.trim();
		}

		// APPLY STYLES & ADD BORDERFIGURE TO CARDIMAGE
		borderFigure.style.width = "100px";
		borderFigure.style.height = "100px";
		borderFigure.style.backgroundColor = "#eee";

		cardImage.appendChild(borderFigure);
		cardImage.style.display = "flex";
		cardImage.style.justifyContent = "center";
		cardImage.style.alignItems = "center";
	} else if (variable.type === "shadow") {
		loremText.remove();
		cardImage.style.boxShadow = getComputedStyle(document.documentElement)
			.getPropertyValue(variable.name)
			.trim();
		cardImage.style.width = "100px";
		cardImage.style.height = "100px";
		cardImage.style.position = "absolute";
		cardImage.style.top = "50%";
		cardImage.style.left = "50%";
		cardImage.style.transform = "translate(-50%, -50%)";
	}

	// DESCRIPTION PART OF CARD & ADD
	const cardDescription = document.createElement("div");
	cardDescription.classList.add("card-description");
	card.appendChild(cardDescription);

	// TITLE & BODY TEXT TO CARDDESCRIPTION
	const textTitle = document.createElement("p");
	textTitle.classList.add("text-title");
	textTitle.textContent = variable.name;
	cardDescription.appendChild(textTitle);

	const textBody = document.createElement("p");
	textBody.classList.add("text-body");
	textBody.textContent = getComputedStyle(document.documentElement)
		.getPropertyValue(variable.name)
		.trim();
	cardDescription.appendChild(textBody);

	return card;
}

// CHECK IF A COLOR IS CLEAR
function colorIsLight(color) {
	const luminance = chroma(color).luminance();
	return luminance > 0.6;
}

// GET JSON DATA & CREATE CORRESPONDING HTML ELEMENTS
fetch("root.json")
	.then((response) => response.json())
	.then((data) => {
		const categories = data.categories;
		const container = document.querySelector(".container");
		// BROWSE CATEGORIES & CREATE HTML ELEMENTS
		categories.forEach((category) => {
			const categoryDiv = document.createElement("div");
			categoryDiv.classList.add("category");

			const categoryTitle = document.createElement("h2");
			categoryTitle.classList.add("category-title");
			categoryTitle.textContent = category.title;
			categoryDiv.appendChild(categoryTitle);

			const itemGrid = document.createElement("div");
			itemGrid.classList.add("item-grid");

			// LOOP THROUGH VARIABLES & CREATE CARDS FOR EACH VARIABLE
			category.variables.forEach((variable) => {
				const card = createCard(variable);
				itemGrid.appendChild(card);
			});

			categoryDiv.appendChild(itemGrid);
			container.appendChild(categoryDiv);
		});
	})
	.catch((error) => {
		console.error("JSON FILE RETRIEVAL ERROR : ", error);
	});
