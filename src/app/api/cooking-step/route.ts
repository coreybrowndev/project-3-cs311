import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//create new cooking step

export async function POST(request: Request) {
  const { template } = await request.json();
  const newStep = await prisma.cookingStep.create({
    data: { template: template },
  });
  return NextResponse.json(template);
}
