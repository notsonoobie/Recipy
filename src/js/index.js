import $ from 'jquery';   //IMPORTING jQuery LIBRARY INSTALLED USING NPM IN package.json
import Search from './models/search';   //IMPORTING SEARCH MODEL FROM --> src/js/models/search.js
import {elements, loader, clearLoader} from './views/inputs';  //IMPORTING ALL INPUTS FROM USER--> src/js/views/inputs.js
import * as searchview from './views/searchview.js'; //IMPORTING EVERTHING AS --"searchview"-- Object
import * as recipeview from './views/recipeview.js'; //IMPORTING EVERTHING AS --"recipeview"-- Object
import Recipe from './models/recipe';

/**  Global State of the App (Entire Modules) in this single file instead of placing them in different files.
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipes
 */

const state = {};  //State will be Empty when Reloading the Page / when Page Loads

const controlSearch = async () => {

    // 1. Get Query from View by User
    const query = searchview.getInp();
    //console.log(query);

    if(query){
        // 2. Create Search Object for the Query and to the state
        state.search = new Search(query);

        // 3. Prepare UI for the search results like Loading Animation / spinners
        searchview.clearField(); //Clearing the search field after Submitting request
        searchview.clearResult(); //Clearing the search results before displaying other results
        loader(elements.searchLoader); //Adding Spinner
        try{
        // 4. Search for Recipes of query
        await state.search.apiCall();

        // 5. Render Results on UI
        clearLoader(); //Removing Spinner Before Displaying new results
        searchview.renderResults(state.search.results);
        }
        catch(e){
            clearLoader(); //Removing Spinner Before Displaying new results
            alert('Error !');
        }
    }
};

elements.searchForm.on('submit', e => {
    //console.log("ok");
    e.preventDefault();
    controlSearch();

})

elements.searchPages.on('click', e=> {
    const btn = (e.target.closest('.btn-inline'));
    if(btn){
        const goto = parseInt(btn.dataset.goto,10);
        searchview.clearResult(); //Clearing the search results before displaying other results
        searchview.renderResults(state.search.results,goto);
    }
});

const hashControl = async () => {
    let id = window.location.hash.replace('#','');
    if(id){
        // 1. Prepare UI for Loading
        recipeview.clearFieldr();
        loader(elements.mainRecipe);

        // 2. Create New Recipe Object
        state.recipe = new Recipe(id);
        try{
        // 3. Get Recipe Data
        await state.recipe.getRecipe();

        // 4. Getting Serving and Cooking Time
        state.recipe.calcTime();
        state.recipe.calcServing();    

        // 4. Render Recipe Result
        clearLoader();
        recipeview.renderRecipe(state.recipe);

        }       
        catch(e){
            clearLoader();
            alert('Something went wrong :)');
        }
    }
};

['hashchange'].forEach(elm => $(window).on(elm,hashControl));   // Adding 2 Event handlers at the same time