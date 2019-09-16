import $ from 'jquery';        //IMPORTING jQuery LIBRARY INSTALLED USING NPM IN package.json
import {key} from '../api';       //IMPORTING API KEY & ID

export default class Recipe{
    constructor(id){
        this.id = id;
    }
    async getRecipe(){
        const addr = 'https://www.food2fork.com/api/get?';
        const url = `${addr}key=${key}&rId=${this.id}`;
        try{
        const result = await $.ajax({type:'GET',dataType:'JSON',url:url});
        this.title = result.recipe.title;
        this.ingredients = result.recipe.ingredients;
        this.img = result.recipe.image_url;
        this.publisher = result.recipe.publisher;
        this.publisher_url = result.recipe.publisher_url;
        }
        catch(e){
            alert('Error !!!');
        }
    }
    calcTime(){
        //Assuming 9 mins for every 3 ingredients
        let numIndg = this.ingredients.length;
        let timeCook = numIndg/3;
        this.time = timeCook*9;
    }
    calcServing(){
        //Assuming every recipe can have 4 servings
        this.servings = 4;
    }
}