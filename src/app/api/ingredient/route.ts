import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

//create new ingredient

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, tags } = await request.json();

  const newIngredient = await prisma.ingredient.create({
    data: { name, tags },
  });

  return NextResponse.json({ name: name, tags: tags });
}
