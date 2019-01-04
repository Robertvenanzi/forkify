import Search from './models/Search';
import Recipe from './models/Recipe'
import * as searchView from './views/searchView';
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
    const query = searchView.getInput(); //TODO 

    if (query) {
        //2) New search object and add to state
        state.search = new Search(query);

        //3) Prepare UI for results
        searchView.clearResults();
        searchView.clearInput();
        renderLoader(elements.searchRes);

        //4) Search for Recipes
        await state.search.getResults();

        // 5) render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);

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

const r = new Recipe(46956);
r.getRecipe();
console.log(r);