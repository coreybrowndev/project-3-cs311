import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Setup Prisma
const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { tags, numSteps } = await request.json();

    if (!tags || tags.length < 2 || !numSteps || numSteps < 2) {
      return NextResponse.json({ error: "You must provide at least 2 tags and 2 steps." });
    }
    const ingredients = await prisma.ingredient.findMany({
      where: {
        tags: {
          hasSome: tags,
        },
      },
    });

    const methods = await prisma.cookingMethod.findMany();

    const templates = await prisma.cookingStep.findMany();

    if (!ingredients.length || !methods.length || !templates.length) {
      return NextResponse.json({ error: "Not enough ingredients, methods, or steps to generate a recipe." });
    }

    const steps = [];
    for (let i = 0; i < numSteps; i++) {
      const ingredient = ingredients[Math.floor(Math.random() * ingredients.length)];
      const method = methods[Math.floor(Math.random() * methods.length)];
      const template = templates[Math.floor(Math.random() * templates.length)];

      const step = template.template.replace("[ingredient]", ingredient.name).replace("[method]", method.name);

      steps.push(step);
    }

    return NextResponse.json({ steps });
  } catch (error) {
    console.error("Error generating recipe:", error);
    return NextResponse.json({ error: "Failed to generate recipe." });
  }
}
