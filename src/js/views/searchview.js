import $ from 'jquery';        //IMPORTING jQuery LIBRARY INSTALLED USING NPM IN package.json

import {elements} from './inputs';  //IMPORTING ALL INPUTS FROM USER--> src/js/views/inputs.js

export const getInp =()=> (elements.searchInput.val()); //Value of search field

export const clearField = ()=> (elements.searchInput.val(''));    //Clearing search field

export const clearResult = ()=> {                  //Clearing the search results
    elements.searchResList.html('');
    elements.searchPages.html('');
};

const titleLength = (title)=>{
    const newTitle = [];
    if(title.length > 17){
        title.split(' ').reduce((acc,curr)=>{
            if((acc + curr.length) <= 17){
                newTitle.push(curr);
                return acc+curr.length;
            }
        },0);
        return `${(newTitle.join(' '))} ...`;
    }
    return title;
};

const singleRecipe = (recipe) => {
    const htmlElement = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${titleLength(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.append(htmlElement);
};

const createButtons = (page,type) => `
<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
    <span>Page ${type === 'prev' ? page-1 : page+1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
    </svg>
</button>
`;

const renderButtons = (page,numOfRes,resPerPage) => {
    const noOfPage = Math.ceil(numOfRes / resPerPage);
    let btn;
    if(page === 1 && noOfPage > 1){
        //Only a Button to go to Next Page
        btn = createButtons(page,'next');
    }else 
    if(page < noOfPage){
        //One Button for Previous Page and One Button for Next Page
        btn = `
        ${btn = createButtons(page,'prev')}
        ${btn = createButtons(page,'next')}
        `;
    }else
    if(page===noOfPage && noOfPage > 1){
        //Only a Button to go to Previous Page
        btn = createButtons(page,'prev');
    }
    elements.searchPages.html(btn);
};

export const renderResults = (recipes, page =1, resPerPage = 10) => {          //Looping through each results
    const start = (page-1)*resPerPage;
    const end = page*resPerPage;
    recipes.slice(start,end).forEach(singleRecipe);
    renderButtons(page,recipes.length,resPerPage);
};