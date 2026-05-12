import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/host" className="text-rose-500 font-black text-xl tracking-tighter">
              HOSTING
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-semibold text-gray-600">
              <Link href="/host" className="hover:text-black border-b-2 border-transparent hover:border-black py-5 transition">
                Today
              </Link>
              <Link href="/host/listings" className="hover:text-black border-b-2 border-transparent hover:border-black py-5 transition text-black border-black">
                Listings
              </Link>
              <Link href="/host/inbox" className="hover:text-black border-b-2 border-transparent hover:border-black py-5 transition">
                Inbox
              </Link>
              <Link href="/host/menu" className="hover:text-black border-b-2 border-transparent hover:border-black py-5 transition">
                Menu
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href="/listings" className="text-xs font-bold px-3 py-1 border rounded-full hover:shadow-md transition">
              Switch to Guest
            </Link>
            <div className="w-8 h-8 rounded-full bg-slate-200"></div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-10">
        {children}
      </main>
    </div>
  );
}
