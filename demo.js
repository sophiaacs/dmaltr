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

let requestQueue = []; // Stores button clicks
let isRequestInProgress = false;

// Function to process queued requests
function processQueue() {
    if (requestQueue.length === 0) {
        isRequestInProgress = false;
        return;
    }



    isRequestInProgress = true;
    let ingredient = requestQueue.shift(); // Get the next ingredient

    console.log("Fetching recipes for:", ingredient);
    const apiUrl = `https://api.edamam.com/search?q=${ingredient}&app_id=2325419a&app_key=7309f852a19f98b9c20e113a2b19e416&to=50`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("API Data:", data);
            if (!data.hits || data.hits.length === 0) {
                displayNoRecipesFound();
            } else {
                displayRecipes(data.hits);
            }
        })
        .catch(error => {
            console.error("Error fetching recipes:", error);
            displayNoRecipesFound();
        })
        .finally(() => {
            setTimeout(processQueue, 6000); // Wait 6 seconds before next request
        });
}



// Updated event listener to queue requests
document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!");

    const buttons = document.querySelectorAll(".button");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const ingredient = this.getAttribute("data-ingredient");
            console.log("Button clicked for:", ingredient);

            if (!ingredient) {
                console.error("No ingredient found for this button.");
                return;
            }

            requestQueue.push(ingredient); // Add to queue

            if (!isRequestInProgress) {
                processQueue(); // Start processing if not already running
            }

            // Show recipe container & exit button
            document.getElementById("recipe-container").style.display = "block";
            document.getElementById("close-btn").style.display = "block";
        });
    });

    document.getElementById("close-btn").addEventListener("click", function () {
        document.getElementById("recipe-container").style.display = "none";
    });
});


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



