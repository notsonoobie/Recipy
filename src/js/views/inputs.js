import $ from 'jquery';        //IMPORTING jQuery LIBRARY INSTALLED USING NPM IN package.json

export const elements = {
    searchForm : $('.search'),
    searchInput : $('.search__field'),
    searchResList : $('.results__list'),
    searchLoader : $('.results'),
    searchPages : $('.results__pages'),
    mainRecipe : $('.recipe')
};

export const elm = {
    loader : 'loader'
}

export const loader = (parent) => {
    const spinner = `
        <div class="${elm.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.prepend(spinner);
};

export const clearLoader = () => {
    const loader = $(`.${elm.loader}`);
    if(loader){
        loader.remove();
    }
};