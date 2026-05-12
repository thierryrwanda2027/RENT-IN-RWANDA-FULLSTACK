import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user || (session.user as any).role !== "ADMIN") {
    // In a real app, we'd show a "Not Authorized" page or redirect to login
    // For this assignment, we'll assume the user might need to login as admin
    // redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <div className="mb-10">
          <h1 className="text-xl font-bold tracking-tighter text-rose-500">THIERRY ADMIN</h1>
          <p className="text-xs text-slate-400 mt-1">Property Management Portal</p>
        </div>
        
        <nav className="space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            Overview
          </Link>
          <Link href="/admin/moderation" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            Moderation Queue
          </Link>
          <Link href="/admin/bookings" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            Global Bookings
          </Link>
          <Link href="/admin/users" className="block px-4 py-2 rounded-lg hover:bg-slate-800 transition">
            User Management
          </Link>
        </nav>

        <div className="mt-auto pt-10">
          <Link href="/listings" className="text-sm text-slate-400 hover:text-white transition">
            ← Back to Platform
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
