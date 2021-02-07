const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
    const inputValue = document.getElementById("search-input").value;
    // Fetching API on mouse click
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(res => res.json())
        .then(data => {
            // Checking whether any food of that name is available
            let container = document.getElementById("container-div");
            const getMessage = message => {
                container.innerText = null;
                container.innerHTML = null;
                document.getElementById("food-detail").innerHTML = null;
                container.innerText = message;
                // setting styles of the message
                container.style.fontSize = "30px";
                container.style.fontWeight = "200px";
                container.style.textShadow = "5px 5px 10px gray";
            }
            if (inputValue === "") {
                getMessage("Please write a food name in the search-box.");
            } else if (data.meals === null) {
                getMessage("No results found. Please try with another food name.")
            } else {
                document.getElementById("food-detail").innerHTML = null;
                document.getElementById("container-div").innerText = null;
                document.getElementById("container-div").innerHTML = null;
                showFoods(data);
            }

        })
})


// showing foods on user search and handling clicks on individual food items
const showFoods = data => {
    const foodItems = data.meals;
    foodItems.forEach(food => {
        const container = document.getElementById("container-div");
        const foodDiv = document.createElement("div");
        foodDiv.className = "food";
        const foodInfo = `
            <img src = ${food.strMealThumb}>
            <h3 class = "food-name"> ${food.strMeal} </h3>
        `;
        foodDiv.innerHTML = foodInfo;
        container.appendChild(foodDiv);
        // handling click 
        foodDiv.addEventListener("click", () => {
            showFoodDetails(food);
        })
    });
}


// showing food details on mouse click
const showFoodDetails = food => {
    //showing image and food name 
    document.getElementById("food-detail").innerHTML = `
            <img src = ${food.strMealThumb}>
            <h1> ${food.strMeal} </h1>
            <h3> Ingredients </h3>
            <ul id = "ingredients"></ul>
            `
    // creating an array of the first 20 natural numbers
    const arr = Array(20).join().split(",").map(function (a) {
        return this.i++
    }, {
        i: 1
    });
    // showing food-ingredients
    arr.forEach(number => {
        const measureProp = `strMeasure${number}`
        const ingredientProp = `strIngredient${number}`
        const measures = food[measureProp];
        const foodIngredients = food[ingredientProp];
        if (measures != " " && foodIngredients != "") {
            const ul = document.getElementById("ingredients");
            const li = document.createElement("li");
            li.innerText = `✅ ${measures} ${foodIngredients}`;
            ul.appendChild(li);
        }
    });
}