import $ from 'jquery';        //IMPORTING jQuery LIBRARY INSTALLED USING NPM IN package.json
import {addr,key} from '../api';       //IMPORTING API KEY & ID
export default class Search{
    constructor(q){
        this.q = q;
    }
    async apiCall(){
        const url = `${addr}key=${key}&q=${this.q}`;
        try{
        const result = await $.ajax({ type:'GET',dataType:'JSON', url:url});
        this.results = result.recipes;
        //console.log(this.results);
        }
        catch(e){
            alert(e.statusText);
        }
    }
}