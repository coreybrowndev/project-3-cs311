import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Generate recipe steps

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const steps = JSON.parse(formData.get("steps") as string);
    const tags = JSON.parse(formData.get("tags") as string);

    if (!name || !steps || steps.length === 0 || !tags || tags.length === 0) {
      return NextResponse.json({ error: "Missing required fields: name, steps, or tags." });
    }

    let imageUrl = "";

    const savedRecipe = await prisma.recipe.create({
      data: {
        name,
        steps,
        descriptor: tags,
        imageUrl: imageUrl,
      },
    });

    return NextResponse.json({ message: "Recipe saved successfully.", recipe: savedRecipe });
  } catch (error) {
    console.error("Error saving recipe:", error);
    return NextResponse.json({ error: "Failed to save recipe." }, { status: 500 });
  }
}
