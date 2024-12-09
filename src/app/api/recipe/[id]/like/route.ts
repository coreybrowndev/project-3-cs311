//get single recipe

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid recipe ID." }, { status: 400 });
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found." }, { status: 404 });
    }

    await prisma.recipe.update({
      where: { id },
      data: { likes: recipe.likes + 1 },
    });

    return NextResponse.json({ likes: recipe.likes + 1 });
  } catch (error) {
    console.error("Error liking recipe:", error);
    return NextResponse.json({ error: "Failed to like recipe." }, { status: 500 });
  }
}
