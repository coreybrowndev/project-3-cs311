import Image from "next/image";
import "animate.css";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Create a header with links to recipe page */}
        <header className="flex flex-col gap-4 items-center sm:items-start text-black">
          <span className="text-orange-500"> ( refresh page - checkout cool animations )</span>
          <h1 className="text-4xl font-bold bg-blue-100 p-2 pr-6 rounded-lg">Welcome to Recipe Generator</h1>
          <p className="animate__animated animate__hinge text-lg text-center sm:text-left">Generate a random recipe based on your preferences.</p>
          <a href="/recipes" className="text-lg underline">
            Go to Recipes Generator
          </a>
          <a href="/search" className="text-lg underline">
            Go search for recipes
          </a>
          <a href="/creator" className="text-lg underline">
            Go to Incubator
          </a>
        </header>
      </main>
    </div>
  );
}
