document.getElementById("show-recipes").addEventListener("click", async function() {
    // Hide the button once it's clicked
    document.getElementById("show-recipes").style.display = "none";

    const appId = "2325419a";  // Your Edamam App ID
    const appKey = "7309f852a19f98b9c20e113a2b19e416";  // Your Edamam App Key
    const query = "kimchi";  // Change this dynamically if needed
    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const container = document.getElementById("recipe-container");
        container.innerHTML = "";  

        if (!data.hits.length) {
            container.innerHTML = "<p>No recipes found.</p>";
            return;
        }

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

    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
});


