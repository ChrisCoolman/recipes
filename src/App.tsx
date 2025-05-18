import { useEffect, useState } from "react";
import Header from "./Header";
import RecipeCard from "./RecipeCard";
import Searchbar from "./Searchbar";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<{ title: string; imageUrl: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!searchTerm) {
          setRecipes([]);
          return;
        }
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setRecipes(
            data.meals.map((meal: any) => ({
              title: meal.strMeal,
              imageUrl: meal.strMealThumb,
            }))
          );
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setRecipes([]);
      }
    }
    fetchData();
  }, [searchTerm]);

  return (
    <div className="background min-h-screen w-full">
      <Header />
      <div className="flex justify-center items-center">
        <Searchbar onSearch={setSearchTerm}/>
      </div>
      <div className="flex flex-wrap justify-center">
        {searchTerm && recipes.length > 0 && recipes.map((recipe, idx) => (
          <RecipeCard key={idx} title={recipe.title} imageUrl={recipe.imageUrl} />
        ))}
        {searchTerm && recipes.length === 0 && (
          <div className="text-center text-3xl text-orange mt-4">No results found</div>
        )}
      </div>
    </div>
  );
}

export default App;
