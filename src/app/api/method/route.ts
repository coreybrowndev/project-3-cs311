import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

//create cooking method

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name } = await request.json();
  const newMethod = await prisma.cookingMethod.create({ data: { name } });
  return NextResponse.json({ name });
}
