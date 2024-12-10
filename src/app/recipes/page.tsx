"use client";

import { use, useEffect, useState } from "react";
import "animate.css";

const RecipeGeneratorPage = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [numSteps, setNumSteps] = useState(3);
  const [generatedSteps, setGeneratedSteps] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);

  const handleImageUpload = (e) => {
    setRecipeImage(e.target.files[0]);
  };

  const generateRecipe = async () => {
    if (tags.length < 2) {
      alert("Please select at least 2 tags.");
      return;
    }

    const response = await fetch("/api/generate-recipe", {
      method: "POST",
      body: JSON.stringify({ tags, numSteps }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Failed to generate recipe");
      return;
    }

    const data = await response.json();
    setGeneratedSteps(data.steps);
  };

  const saveRecipe = async () => {
    const formData = new FormData();
    formData.append("name", recipeName);
    formData.append("steps", JSON.stringify(generatedSteps));
    formData.append("tags", JSON.stringify(tags));
    if (recipeImage) {
      formData.append("image", recipeImage);
    }

    const response = await fetch("/api/recipe", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      alert("Failed to save recipe");
      return;
    }

    alert("Recipe saved successfully!");
    setRecipeName("");
    setRecipeImage(null);
    setGeneratedSteps([]);
  };

  const attachTag = (e) => {
    const tag = e.target.value;
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags((prev) => [...prev, tag]);
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch("/api/tags");
      const data = await response.json();
      setAvailableTags(data);
    };

    fetchTags();
  }, []);

  useEffect(() => {
    console.log(tags);
  }, [tags]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 md:px-0">
      <h1 className="text-4xl font-bold bg-blue-100 p-2 pr-6 rounded-lg">Generate Recipe</h1>
      <div className="my-4">
        <label className="font-bold border border-white bg-slate-100 p-2 pr-6 rounded-lg mb-2 block block mb-2">Select Tags (2-5):</label>
        <select multiple className="border border-black p-2 rounded w-full animate__animated animate__wobble">
          {availableTags.map((tag: { id: number; name: string }) => (
            <option key={tag.id} className={`${tags.includes(tag.name) ? "line-through" : ""}`} value={tag.name} onClick={attachTag}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      <div className="my-4">
        <label className="font-bold bg-slate-100 border border-white p-2 pr-6 rounded-lg mb-2 block">Number of Steps:</label>
        <input
          type="number"
          className="border border-black p-2 rounded w-full animate__animated animate__wobble"
          value={numSteps}
          onChange={(e) => setNumSteps(Number(e.target.value))}
          min={2}
          max={10}
        />
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={generateRecipe}>
        Generate Recipe
      </button>

      {generatedSteps.length > 0 && (
        <div className="my-8">
          <h2 className="text-xl font-bold">Generated Recipe Steps</h2>
          <ul className="list-disc pl-6">
            {generatedSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          <div className="my-4">
            <label className="block mb-2">Recipe Name:</label>
            <input type="text" className="border p-2 rounded w-full" value={recipeName} onChange={(e) => setRecipeName(e.target.value)} />
          </div>

          <div className="my-4">
            <label className="block mb-2">Upload an Image:</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={saveRecipe}>
            Save Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeGeneratorPage;
