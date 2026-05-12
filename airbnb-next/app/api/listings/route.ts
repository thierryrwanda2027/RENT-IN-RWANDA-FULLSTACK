import { NextResponse } from "next/server";
import { getListings } from "@/lib/listings";

export async function GET() {
  const listings = await getListings();
  return NextResponse.json(listings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In a real app, save to DB here using prisma
    // const newListing = await prisma.listing.create({ data: body });
    const newListing = { ...body, id: Date.now() };
    return NextResponse.json(newListing, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
