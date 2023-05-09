const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();

  mealsEl.innerHTML = "";
  single_mealEl.innerHTML = "";

  const term = search.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        resultHeading.innerHTML = `<h2>Search results for '${term}': </h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
        <div class='meal'>
        <img src="${meal.strMealThumb}" alt="" />
        <div class="meal-info">
        <h3>${meal.strMeal}</h3>
        </div>
        </div>
        `
            )
            .join("");
        }
      });

    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

function getRandomMeal() {
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

submit.addEventListener("submit", searchMeal);
random.addEventListener("click", getRandomMeal);
