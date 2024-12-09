import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed Tags
  const tags = await prisma.tag.createMany({
    data: [{ name: "spicy" }, { name: "sweet" }, { name: "fizzy" }, { name: "glowing" }, { name: "mystical" }, { name: "interactive" }, { name: "quick" }, { name: "slow" }],
    skipDuplicates: true,
  });

  // Seed Ingredients
  const ingredients = await prisma.ingredient.createMany({
    data: [
      { name: "Quantum Peppers", tags: ["spicy", "fizzy"] },
      { name: "Starlight Nectar", tags: ["sweet", "glowing", "mystical"] },
      { name: "Dragonfruit", tags: ["sweet", "tropical"] },
      { name: "Galaxy Dust", tags: ["mystical", "dusty"] },
      { name: "Moonberries", tags: ["sweet", "interactive"] },
    ],
    skipDuplicates: true,
  });

  // Seed Cooking Methods
  const cookingMethods = await prisma.cookingMethod.createMany({
    data: [{ name: "Zap" }, { name: "Simmer" }, { name: "Glitchify" }, { name: "Twirl" }, { name: "Freeze" }],
    skipDuplicates: true,
  });

  // Seed Cooking Steps
  const cookingSteps = await prisma.cookingStep.createMany({
    data: [
      { template: "Simmer the [ingredient] until it turns [color]." },
      { template: "Zap the [ingredient] to electrify it, making it glow [color]." },
      { template: "Twirl the [ingredient] in the air and let it [action]!" },
      { template: "Freeze the [ingredient] until it forms crystals." },
      { template: "Glitchify the [ingredient] to create a shimmering effect." },
    ],
    skipDuplicates: true,
  });

  // Seed Recipes
  const recipes = await prisma.recipe.createMany({
    data: [
      {
        name: "Dragon's Delight",
        imageUrl: "https://via.placeholder.com/150",
        steps: ["Zap the Quantum Peppers to electrify them, making them glow purple.", "Simmer the Dragonfruit until it turns green.", "Twirl the Galaxy Dust in the air and let it sparkle!"],
        descriptor: ["spicy", "fizzy", "mystical"],
        likes: 0,
      },
      {
        name: "Intergalactic Smoothie",
        imageUrl: "https://via.placeholder.com/150",
        steps: ["Simmer the Starlight Nectar until it turns blue.", "Glitchify the Moonberries to create a sparkling effect."],
        descriptor: ["sweet", "glowing", "interactive"],
        likes: 0,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed data inserted!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
