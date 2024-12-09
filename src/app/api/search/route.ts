import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

//create new ingredient

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = url.searchParams.get("query") || "";

    const recipes = await prisma.recipe.findMany({
      where: {
        OR: [{ name: { contains: query, mode: "insensitive" } }, { descriptor: { hasSome: [query] } }],
      },
    });

    return new Response(JSON.stringify({ recipes }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch recipes." }));
  }
}
