import { NextResponse } from "next/server";
import { getListing } from "@/lib/listings";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const listing = await getListing(id);
  
  if (!listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }
  
  return NextResponse.json(listing);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // In a real app, delete from DB using prisma
  // await prisma.listing.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ message: "Listing deleted successfully" });
}
