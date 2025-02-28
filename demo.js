async function getRecipes(ingredient) {
    const apiKey = "YOUR_API_KEY";  // Replace with your API key
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&apiKey=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();
        console.log(data); // Display recipes in the console
        displayRecipes(data); // Call a function to display recipes on your website
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function displayRecipes(recipes) {
    let recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ""; // Clear previous results

    recipes.forEach(recipe => {
        let listItem = document.createElement("li");
        listItem.textContent = recipe.title;
        recipeList.appendChild(listItem);
    });
}

// Example call when clicking on an ingredient
document.getElementById("fridge-item").addEventListener("click", () => {
    getRecipes("chicken"); // Replace with the actual selected ingredient
});