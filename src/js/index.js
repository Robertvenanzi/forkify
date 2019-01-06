import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';


/* Global State of the app 
^ - Search object
* - Current recipe object
* - Shopping list object
* - Liked Recipes
*/
const state = {};


// Search Controller
const controlSearch = async () => {
    //1) Get query from view
    const query = searchView.getInput();

    if (query) {
        //2) New search object and add to state
        state.search = new Search(query);

        //3) Prepare UI for results
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchRes);

        try {
            //4) Search for Recipes
            await state.search.getResults();

            // 5) render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert('Something wrong with the search!');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10)
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
})

// Recipe Controller

const controlRecipe = async () => {
    // Get id from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate Servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);


        } catch (err) {
            console.log(err);
            alert('Error processing recipe!');
        }
    }
}


['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));