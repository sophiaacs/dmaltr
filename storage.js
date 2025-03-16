document.getElementById("kimchi-button").addEventListener("click", function() {
    showRecipes("kimchi");
});

document.getElementById("bibimbap-button").addEventListener("click", function() {
    showRecipes("bibimbap");
});

document.getElementById("bbq-button").addEventListener("click", function() {
    showRecipes("bbq");
});

async function showRecipes(query) {
    // Hide all buttons once clicked
    document.querySelectorAll('.button').forEach(button => button.style.display = "none");

    const appId = "2325419a";  // Your Edamam App ID
    const appKey = "7309f852a19f98b9c20e113a2b19e416";  // Your Edamam App Key
    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const container = document.getElementById("recipe-container");
        container.innerHTML = ""; // Clear any existing content

        // Create and add the exit button dynamically
        const exitButton = document.createElement("button");
        exitButton.id = "exit-button";
        exitButton.classList.add("exit-button");
        exitButton.innerText = "X";
        container.appendChild(exitButton);

        // If no recipes found
        if (!data.hits.length) {
            container.innerHTML += "<p>No recipes found.</p>";
            return;
        }

        // Add recipes to the container
        data.hits.forEach(hit => {
            const recipe = hit.recipe;

            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");

            recipeDiv.innerHTML = `
                <h2>${recipe.label}</h2>
                <img src="${recipe.image}" alt="${recipe.label}" style="width: 200px;">
                <p><strong>Ingredients:</strong> ${recipe.ingredientLines.join(", ")}</p>
                <p><strong>Source:</strong> <a href="${recipe.url}" target="_blank">View Full Recipe</a></p>
            `;

            container.appendChild(recipeDiv);
        });

        // Show the recipe container and the exit button
        container.style.display = "block";

        // Close recipe container when exit button is clicked
        exitButton.addEventListener("click", function() {
            container.style.display = "none";
            document.querySelectorAll('.button').forEach(button => button.style.display = "block"); // Show the buttons again
        });

    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}
