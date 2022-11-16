const loadMeal = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeal(data.meals));
};

const displayMeal = (meals) => {
  const mealContainer = document.getElementById("meal-container");
  mealContainer.innerHTML = "";
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
    <div class="card h-100">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="Picture of ${
      meal.strMeal
    }">
    <div class="card-body" onclick="loadMealDetails(${meal.idMeal})">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">Catagory: ${meal.strCategory}</p>
      <p class="card-text">Area: ${meal.strArea}</p>
      <p class="card-text">Tag: ${meal.strTags}</p>
      <p class="card-text" title="click the box">Instruction: ${meal.strInstructions.slice(
        0,
        200
      )}</p>
    </div>
  </div>
    `;
    mealContainer.appendChild(mealDiv);
  });
};

const searchFood = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadMeal(searchText);
  searchField.value = "";
};

const loadMealDetails = (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));
};

const displayMealDetails = (meal) => {
  const detailContainer = document.getElementById("detail-container");
  detailContainer.innerHTML = "";
  const detailDiv = document.createElement("div");
  detailDiv.classList.add("card");
  detailDiv.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="Picture of ${meal.strMeal}" />
  <div class="card-body">
  <h5 class="card-title">${meal.strMeal}</h5>
  <p class="card-text">Instruction: ${meal.strInstructions}</p>
  </div>
  `;
  detailContainer.appendChild(detailDiv);
};

loadMeal("");
