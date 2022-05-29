import axios from 'axios';


export default class Search{
    constructor(query){
        this.query = query;
        // this.result;
    }

    async getResults(){
        try{
        const callReturn =  await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);

        this.result = callReturn.data.recipes;
        }catch(error){
            alert(error);
        }
        
    }
}