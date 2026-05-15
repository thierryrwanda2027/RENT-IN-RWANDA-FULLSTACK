import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FaUserCircle, FaShieldAlt, FaUserEdit, FaTrash } from "react-icons/fa";
import { revalidatePath } from "next/cache";

async function updateUserRole(userId: string, newRole: string) {
  "use server";
  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole }
  });
  revalidatePath("/admin/users");
}

export default async function AdminUsersPage() {
  const session = await auth();

  if ((session?.user as any)?.role !== "ADMIN") {
    redirect("/");
  }

  const users = await prisma.user.findMany({
    orderBy: { id: 'desc' }
  });

  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-20 pt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-zinc-900 tracking-tight">User Management</h1>
          <p className="text-zinc-500 mt-2 font-medium">Manage platform permissions and user roles.</p>
        </header>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-zinc-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-zinc-400 uppercase tracking-widest bg-zinc-50/50 border-b border-zinc-100">
                <th className="px-10 py-6">User</th>
                <th className="px-10 py-6">Role</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-50/50 transition group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      {user.image ? (
                        <img src={user.image} className="w-12 h-12 rounded-2xl object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400">
                          <FaUserCircle size={24} />
                        </div>
                      )}
                      <div>
                        <p className="font-black text-zinc-900">{user.name || "Anonymous"}</p>
                        <p className="text-xs text-zinc-500 font-medium">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <form action={async (formData) => {
                      "use server";
                      const role = formData.get("role") as string;
                      await prisma.user.update({
                        where: { id: user.id },
                        data: { role }
                      });
                      revalidatePath("/admin/users");
                    }}>
                      <select 
                        name="role"
                        defaultValue={user.role}
                        className="bg-zinc-100 border-none rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-zinc-900 cursor-pointer"
                        onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}
                      >
                        <option value="GUEST">Guest</option>
                        <option value="HOST">Host</option>
                        <option value="ADMIN">Admin</option>
                      </select>
                    </form>
                  </td>
                  <td className="px-10 py-8">
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Active
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-3 bg-zinc-50 rounded-xl text-zinc-900 hover:bg-zinc-900 hover:text-white transition shadow-sm">
                        <FaUserEdit />
                      </button>
                      <button className="p-3 bg-zinc-50 rounded-xl text-rose-500 hover:bg-rose-500 hover:text-white transition shadow-sm">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
