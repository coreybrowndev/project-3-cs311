import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const tags = await prisma.tag.findMany();
  return NextResponse.json(tags);
}
