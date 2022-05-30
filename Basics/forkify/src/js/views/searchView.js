import { elements } from './base';
export const getInput = () => elements.searchInput.value;


const renderRecipe = recipe => {
    const markup = `<li class="preview">
    <a class="preview__link" href="#${recipe.recipe_id}">
      <figure class="preview__fig">
        <img src="${recipe.image_url}" alt="${recipe.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${recipe.title}</h4>
        <p class="preview__publisher">${recipe.publisher}</p>
        <div class="preview__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li>`;

  elements.searchResaultList.insertAdjacentHTML('beforeend', markup);

};

export const renderResults = recipe => {
    recipe.forEach(renderRecipe);
}


/*
image_url: "http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"
publisher: "101 Cookbooks"
publisher_url: "http://www.101cookbooks.com"
recipe_id: "47746"
social_rank: 100
source_url: "http://www.101cookbooks.com/archives/001199.html"
title: "Best Pizza Dough Ever"
searchResaultList
*/