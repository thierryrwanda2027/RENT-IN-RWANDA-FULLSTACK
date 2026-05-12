import { getPendingListings } from "@/lib/listings";
import Image from "next/image";

export default async function ModerationPage() {
  const pending = await getPendingListings();

  return (
    <div>
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Moderation Queue</h1>
        <p className="text-gray-500">Review and approve new property submissions</p>
      </header>

      {pending.length === 0 ? (
        <div className="bg-white p-20 rounded-2xl border text-center shadow-sm">
          <p className="text-gray-500 text-lg">Hooray! The queue is empty.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-semibold text-sm">Property</th>
                <th className="px-6 py-4 font-semibold text-sm">Location</th>
                <th className="px-6 py-4 font-semibold text-sm">Price</th>
                <th className="px-6 py-4 font-semibold text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pending.map((listing) => (
                <tr key={listing.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={listing.img} alt={listing.title} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-sm">{listing.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{listing.location}</td>
                  <td className="px-6 py-4 text-sm font-semibold">{listing.price.toLocaleString()} RWF</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded uppercase">Pending</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="px-3 py-1 bg-rose-500 text-white text-xs font-bold rounded hover:bg-rose-600 transition">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded hover:bg-gray-300 transition">
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
