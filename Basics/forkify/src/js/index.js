import '../sass/main.scss';
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';

const state = {

};

const controlSearch = async() => {
    //1.get query from the view
    const query = searchView.getInput();
if(query){
    //2. new search object  and aadd to the state
    state.search = new Search(query);

    //3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();

    //4. search for recipe
    await state.search.getResults()

    //5. render results on UI
    // console.log(state.search.result);
    searchView.renderResults(state.search.result);

}
}

elements.searchForm.addEventListener('submit', onSubmit);
function onSubmit(e){
    e.preventDefault();
    console.log(e.target)   
    controlSearch(); 

}


