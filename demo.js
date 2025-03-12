// Redirect to storage.html when fridge is clicked
function openStorage() {
    window.location.href = "storage.html";
    console.log("c");
}

document.addEventListener("DOMContentLoaded", function () {
    let fridge = document.getElementById("fridge");

  
    if (fridge) {
        fridge.addEventListener("click", function () {
            window.location.href = "storage.html"; // Redirection
        });
    } else {
        console.error("Fridge element not found!");
    }
});


let selectedFoods = [];

function selectFood(food) {
    if (!selectedFoods.includes(food)) {
        selectedFoods.push(food);
    }
    fetchRecipes();
}

function fetchRecipes() {
    const recipes = {
        kimchi: ["Kimchi Fried Rice", "Kimchi Stew"],
        egg: ["Korean Rolled Omelette", "Bibimbap"],
        rice: ["Bibimbap", "Kimchi Fried Rice"],
        "kimchi,egg": ["Kimchi Egg Stir Fry"],
        "kimchi,rice": ["Kimchi Fried Rice"],
        "egg,rice": ["Egg Fried Rice"]
    };

    let key = selectedFoods.join(",");
    let results = recipes[key] || ["No matching recipes found."];

    document.getElementById("recipe-results").innerHTML = results.map(r => <p>${r}</p>).join("");
}