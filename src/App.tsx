import { useEffect, useState } from "react";
import Header from "./Header";
import RecipeCard from "./RecipeCard";
import Searchbar from "./Searchbar";
import Instructions from "./Instructions";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<{ title: string; imageUrl: string; instruction: string; link: string }[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

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
              instruction: meal.strInstructions,
              link: meal.strYoutube
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
      <div className={`flex flex-wrap justify-center transition-all duration-300 ${selectedIdx !== null ? 'blur-sm pointer-events-none' : ''}`}>
        {searchTerm && recipes.length > 0 && recipes.map((recipe, idx) => (
          <div key={idx} onClick={() => setSelectedIdx(idx)} className="cursor-pointer">
            <RecipeCard title={recipe.title} imageUrl={recipe.imageUrl} />
          </div>
        ))}
        {searchTerm && recipes.length === 0 && (
          <div className="text-center text-3xl text-orange mt-4">No results found</div>
        )}
      </div>

      {selectedIdx !== null && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedIdx(null)}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative z-60"
            onClick={e => e.stopPropagation()}
          >
            <Instructions
              instructions={recipes[selectedIdx].instruction}
              title={recipes[selectedIdx].title}
              link={recipes[selectedIdx].link}
              onClose={() => setSelectedIdx(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
