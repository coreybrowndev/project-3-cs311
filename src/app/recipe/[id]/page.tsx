"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import "animate.css";

const SingleRecipePage = () => {
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState<number>(0);

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/recipe/${id}`, {
            method: "GET",
          });
          const data = await response.json();
          setRecipe(data.recipe);
          setLikes(data.recipe.likes);
        } catch (error) {
          console.error("Error fetching recipe:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchRecipe();
    }
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/recipe/${id}/like`, {
        method: "POST",
      });
      if (response.ok) {
        const res = await response.json();
        setLikes(res.likes);
      } else {
        console.error("Failed to like recipe");
      }
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found.</div>;
  }

  return (
    <div className="animate__animated animate__flip max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <img src={"/recipe.jpg"} alt={recipe.name} className="w-full h-64 object-cover rounded-md shadow-lg mb-4" />
        <h1 className="text-4xl font-bold mb-2">{recipe.name}</h1>
        <div className="text-sm text-gray-500 mb-4">{recipe.descriptor && <p>Tags: {recipe.descriptor.join(", ")}</p>}</div>
        <button onClick={handleLike} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Like ({likes})
        </button>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-semibold">Recipe Steps</h2>
        <ol className="list-decimal pl-5 space-y-4">
          {recipe.steps.map((step: string, index: number) => (
            <li key={index} className="text-lg">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SingleRecipePage;
