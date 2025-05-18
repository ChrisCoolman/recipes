import { useEffect, useState } from "react";
import Header from "./Header";
import RecipeCard from "./RecipeCard";
import Searchbar from "./Searchbar";

function App() {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setTitle(data.meals[0].strMeal);
          setImageUrl(data.meals[0].strMealThumb);
        } else {
          setTitle("No results found");
          setImageUrl("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
      {(searchTerm && title !== "No results found") && (
        <RecipeCard title={title} imageUrl={imageUrl}/>
      )}
      {(searchTerm && title === "No results found") && (
        <div className="text-center text-3xl text-orange mt-4">{title}</div>
      )}
    </div>
  );
}

export default App;
