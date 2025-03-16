document.getElementById("fridge").addEventListener("click", function() {
    window.location.href = "storage.html"; // Navigate to storage page when fridge is clicked
});

document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!");  // Check if script is running

    document.querySelectorAll(".button").forEach(button => {
        button.addEventListener("click", function () {
            const ingredient = this.getAttribute("data-ingredient");
            console.log("Button clicked for:", ingredient); // Check if button clicks are detected
            const encodedIngredient = encodeURIComponent(ingredient);

            fetchRecipes(encodedIngredient);

            // Show the recipe container & exit button
            document.getElementById("recipe-container").style.display = "block";
            document.getElementById("close-btn").style.display = "block";
        });
    });

    document.getElementById("close-btn").addEventListener("click", function () {
        console.log("Close button clicked"); // Check if close button is detected
        document.getElementById("recipe-container").style.display = "none";
    });
});

function fetchRecipes(ingredient) {
    console.log("Fetching recipes for:", ingredient); // Debugging API call
    const apiUrl = `https://api.edamam.com/search?q=${ingredient}&app_id=2325419a&app_key=7309f852a19f98b9c20e113a2b19e416`;

    fetch(apiUrl)
        .then(response => {
            console.log("API Response Status:", response.status); // Check API status
            return response.json();
        })
        .then(data => {
            console.log("API Data:", data); // Check what data is received
            if (!data.hits || data.hits.length === 0) {
                displayNoRecipesFound();
            } else {
                displayRecipes(data.hits);
            }
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
            displayNoRecipesFound();
        });
}

function displayRecipes(recipes) {
    let recipeContainer = document.getElementById("recipe-list");
    recipeContainer.innerHTML = "";

    recipes.forEach(recipe => {
        let recipeItem = document.createElement("div");
        recipeItem.classList.add("recipe-item");
        recipeItem.innerHTML = `
            <h3>${recipe.recipe.label}</h3>
            <p><strong>Ingredients:</strong> ${recipe.recipe.ingredientLines.join(", ")}</p>
            <a href="${recipe.recipe.url}" target="_blank">View Full Recipe</a>
        `;
        recipeContainer.appendChild(recipeItem);
    });
}

function displayNoRecipesFound() {
    let recipeContainer = document.getElementById("recipe-list");
    recipeContainer.innerHTML = "<p>No recipes found for this ingredient.</p>";
}

