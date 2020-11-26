import React,{useEffect,useState} from 'react';
import Recipe from './Recipe'
import './App.css';

const App =function(){
  const API_ID='2b57166c';
  const API_KEY='2f3f589de55d16ab04ceff4de4f754c2';
  // const exampleReq=`https://api.edamam.com/search?q=chicken&app_id=${API_ID}&app_key=${API_KEY}`
  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState("chicken");

  useEffect(function(){
    getRecipes()  
  },[query])

  const getRecipes= async function(){
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    // console.log(data.hits)
  }

  function updateSearch(e){
    setSearch(e.target.value);
    // console.log(search)
  }

  function getSearch(e){
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
      <div className='App'>
        <form onSubmit={getSearch} className='search-form'>
          <input type="text" className='search-bar' value={search} onChange={updateSearch} />
          <button type='submit' className='search-button'>Search</button>
        </form>
        <div className='recipes'>
        {recipes.map((recipe)=>(
            <Recipe 
              key={recipe.recipe.label}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </div>
    )
}

export default App;
