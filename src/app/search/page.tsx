"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import "animate.css";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/search?query=${searchQuery}`);
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 2) {
      handleSearch();
    } else {
      setRecipes([]);
    }
  }, [searchQuery]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold bg-blue-100 p-2 pr-6 rounded-lg font-bold mb-4">Search Recipes</h1>

      <form onSubmit={handleSearch} className="mb-6 flex gap-4">
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search by recipe name or tags" className="border p-2 rounded-md w-full" />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe: { id: number; name: string; descriptor: string[]; steps: string }) => (
            <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
              <div key={recipe.id} className="border p-4 rounded-md shadow-md hover:shadow-xl animate__animated animate__rotateInUpRight">
                <img src={"/recipe.jpg"} alt={recipe.name} className="w-full h-40 object-cover rounded-md mb-4" />
                <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
                <p className="text-sm text-gray-500 mb-2">Tags: {recipe.descriptor.join(", ")}</p>
                <p>{recipe.steps.length} Steps</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
