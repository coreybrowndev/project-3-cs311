"use client";
import { useState } from "react";

const CreatorPage = () => {
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [cookMethod, setCookMethod] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [cookSteps, setCookSteps] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/ingredient", {
      method: "POST",
      body: JSON.stringify({ name, tags: tags.split(",") }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Failed to add ingredient");
      setError("Failed to add ingredient");
      return;
    }

    setError("");
    setSuccess("Successfully added ingredient");

    setName("");
    setTags("");
  };

  const handleSubmitCookingMethod = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/method", {
      method: "POST",
      body: JSON.stringify({ name: cookMethod }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Failed to add cooking method");
      setError("Failed to add cooking method");
      return;
    }

    setError("");
    setSuccess("Successfully added cooking method");

    setCookMethod("");
  };

  const handleSubmitCookingSteps = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/cooking-step", {
      method: "POST",
      body: JSON.stringify({ template: cookSteps }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Failed to add cooking steps");
      setError("Failed to add cooking steps");
      return;
    }

    setError("");
    setSuccess("Successfully added cooking steps");

    setCookSteps("");
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-4xl mx-auto py-8 gap-6 px-4">
      <h1 className="text-3xl font-extrabold text-gray-800">Concoction Generator</h1>

      {error && <p className="text-red-600 font-medium">{error}</p>}
      {success && <p className="text-green-600 font-medium">{success}</p>}
      <div className="flex flex-col gap-4 md:flex-row w-full">
        <form onSubmit={handleSubmit} className="w-full bg-gray-100 p-6 rounded-lg shadow-md flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700">Add Ingredient</h2>
          <div className="flex flex-col gap-3">
            <label htmlFor="Name" className="text-gray-600 font-medium">
              Name
            </label>
            <input
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter ingredient name"
            />
            <label htmlFor="Tags" className="text-gray-600 font-medium">
              Tags
            </label>
            <input
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Tags (comma-separated)"
            />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
            Add Ingredient
          </button>
        </form>

        <form onSubmit={handleSubmitCookingMethod} className="w-full bg-gray-100 p-6 rounded-lg shadow-md flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-700">Cooking Method</h2>
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-3">
              <label htmlFor="Method" className="text-gray-600 font-medium">
                Method
              </label>
              <input
                className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300"
                value={cookMethod}
                onChange={(e) => setCookMethod(e.target.value)}
                placeholder="Enter cooking method"
              />
            </div>
            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
              Add Method
            </button>
          </div>
        </form>
      </div>

      <form onSubmit={handleSubmitCookingSteps} className="w-full bg-gray-100 p-6 rounded-lg shadow-md flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-gray-700">Cooking Steps</h2>
        <div className="flex flex-col gap-3">
          <label htmlFor="Steps" className="text-gray-600 font-medium">
            Steps
          </label>
          <input
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300"
            value={cookSteps}
            onChange={(e) => setCookSteps(e.target.value)}
            placeholder="Enter cooking steps"
          />
        </div>
        <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
          Add Steps
        </button>
      </form>
    </div>
  );
};

export default CreatorPage;
