document.getElementById("kimchi-button").addEventListener("click", function() {
    showRecipes("kimchi");
});

document.getElementById("egg-button").addEventListener("click", function() {
    showRecipes("egg");
});

document.getElementById("butter-button").addEventListener("click", function() {
    showRecipes("butter");
});

document.getElementById("milk-button").addEventListener("click", function() {
    showRecipes("milk");
});

document.getElementById("bulgogi-button").addEventListener("click", function() {
    showRecipes("bulgogi");
});

document.getElementById("tofu-button").addEventListener("click", function() {
    showRecipes("tofu");
});

document.getElementById("fruit-button").addEventListener("click", function() {
    showRecipes("fruit");
});

document.getElementById("cream-button").addEventListener("click", function() {
    showRecipes("heavy cream");
});

document.getElementById("yogurt-button").addEventListener("click", function() {
    showRecipes("yogurt");
});

document.getElementById("jajangmyeon-button").addEventListener("click", function() {
    showRecipes("jajangmyeon");
});

document.getElementById("buldak-button").addEventListener("click", function() {
    showRecipes("buldak");
});

document.getElementById("sesameoil-button").addEventListener("click", function() {
    showRecipes("sesame oil");
});

document.getElementById("soysauce-button").addEventListener("click", function() {
    showRecipes("soy sauce");
});

document.getElementById("sugar-button").addEventListener("click", function() {
    showRecipes("sugar");
});

document.getElementById("spaghetti1-button").addEventListener("click", function() {
    showRecipes("spaghetti");
});

document.getElementById("spaghetti2-button").addEventListener("click", function() {
    showRecipes("spaghetti");
});

document.getElementById("spaghetti3-button").addEventListener("click", function() {
    showRecipes("spaghetti");
});

document.getElementById("spaghetti4-button").addEventListener("click", function() {
    showRecipes("spaghetti");
});

document.getElementById("marinara-button").addEventListener("click", function() {
    showRecipes("marinara");
});

document.getElementById("pasta-button").addEventListener("click", function() {
    showRecipes("pasta");
});

document.getElementById("penne-button").addEventListener("click", function() {
    showRecipes("penne");
});

document.getElementById("seaweed1-button").addEventListener("click", function() {
    showRecipes("seaweed");
});

document.getElementById("seaweed2-button").addEventListener("click", function() {
    showRecipes("seaweed");
});

document.getElementById("seaweed3-button").addEventListener("click", function() {
    showRecipes("roasted seaweed");
});

document.getElementById("gochujang-button").addEventListener("click", function() {
    showRecipes("gochujang");
});

document.getElementById("ssamjang-button").addEventListener("click", function() {
    showRecipes("ssamjang");
});
document.getElementById("bananamilk-button").addEventListener("click", function() {
    showRecipes("banana milk");
});

document.getElementById("strawberrymilk-button").addEventListener("click", function() {
    showRecipes("strawberry milk");
});

document.getElementById("chocolatemilk-button").addEventListener("click", function() {
    showRecipes("chocolate milk");
});

document.getElementById("buldakcheese-button").addEventListener("click", function() {
    showRecipes("buldak cheese");
});

document.getElementById("ramen-button").addEventListener("click", function() {
    showRecipes("ramen");
});

document.getElementById("ramenkimchi-button").addEventListener("click", function() {
    showRecipes("kimchi ramen");
});

document.getElementById("lettuce-button").addEventListener("click", function() {
    showRecipes("lettuce");
});

document.getElementById("carrot-button").addEventListener("click", function() {
    showRecipes("carrot");
});

document.getElementById("bellpepper-button").addEventListener("click", function() {
    showRecipes("bellpepper");
});

document.getElementById("onion-button").addEventListener("click", function() {
    showRecipes("onion");
});

document.getElementById("avocado-button").addEventListener("click", function() {
    showRecipes("avocado");
});

document.getElementById("spinach-button").addEventListener("click", function() {
    showRecipes("spinach");
});


async function showRecipes(query) {
    // Hide all buttons once clicked
    document.querySelectorAll('.button').forEach(button => button.style.display = "none");

    const appId = "2325419a";  // Your Edamam App ID
    const appKey = "7309f852a19f98b9c20e113a2b19e416";  // Your Edamam App Key
    const encodedIngredient = encodeURIComponent(query); // Converts spaces to %20
    const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodedIngredient}&app_id=${appId}&app_key=${appKey}`;

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

function hideRecipes() {
    document.getElementById('recipe-container').classList.add('hidden');
}

// Function to change button size dynamically
function changeButtonSize(buttonId, size) {
    const button = document.getElementById(buttonId);
    
    // Remove all size classes
    button.classList.remove('small', 'medium');
    
    // Add class based on size
    if (size === 'small') {
      button.classList.add('small');
    } else if (size === 'medium') {
      button.classList.add('medium');
    } 
  }
  
  // Example: Change size of kimchi button
  changeButtonSize('kimchi-button', 'medium');  // Change size to small
  changeButtonSize('gochujang-button', 'small');    // Change size to large
  changeButtonSize('tofu-button', 'small');
  changeButtonSize('cheese-button', 'small');
  changeButtonSize('ssamjang-button', 'small');
  changeButtonSize('bananamilk-button', 'small');
  changeButtonSize('strawberrymilk-button', 'small');
  changeButtonSize('chocolatemilk-button', 'small');
  changeButtonSize('lettuce-button', 'medium');
  changeButtonSize('carrot-button', 'medium');
  changeButtonSize('bellpepper-button', 'medium');
  changeButtonSize('onion-button', 'small');
  changeButtonSize('avocado-button', 'medium');
  changeButtonSize('spinach-button', 'medium');
  
  // Add event listeners dynamically for all buttons
  document.querySelectorAll('.button').forEach(button => {
      button.addEventListener("click", function() {
          const ingredient = this.getAttribute("data-ingredient");
          showRecipes(ingredient);
      });
  });
  