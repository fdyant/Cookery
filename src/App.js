import React,{useEffect, useState} from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = "c494352d";
  const APP_KEY = "0a221074914ac4732680a2b6f587cf4c";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch (`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

const updateSearch = e => {
  setSearch(e.target.value);
};

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
};


  return (
    <div className="App">
      <form onSubmit={getSearch} className="searchForm">
        <input className="searchBar" type="text" value={search} onChange={updateSearch}/>
        <button className="searchButton" type="submit">
        Search
        </button>
      </form>
      
      <div className="recipes">
      {recipes.map (recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        yield={recipe.recipe.yield}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
};





export default App;
