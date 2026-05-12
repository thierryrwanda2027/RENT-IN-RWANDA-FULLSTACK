import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserBookings } from "@/lib/listings";
import Image from "next/image";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const bookings = await getUserBookings(session.user.email!);

  return (
    <div className="container mx-auto px-4 md:px-10 py-12">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Trips</h1>
        
        {bookings.length === 0 ? (
          <div className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-2">No trips booked...yet!</h2>
            <p className="text-gray-500 mb-6">Time to dust off your bags and start planning your next adventure.</p>
            <Link 
              href="/" 
              className="inline-block px-6 py-3 border-2 border-black rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Start searching
            </Link>
            
            <div className="mt-20 relative aspect-[21/9] rounded-2xl overflow-hidden">
               <Image 
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=80"
                alt="Travel inspiration"
                fill
                className="object-cover"
               />
               <div className="absolute inset-0 bg-black/20 flex items-center p-12">
                 <p className="text-white text-3xl font-bold max-w-xs leading-tight">Where will you go next?</p>
               </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <div key={booking.id} className="group border rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={booking.img} 
                    alt={booking.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-green-700">
                    {booking.status}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1">{booking.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{booking.location}</p>
                  
                  <div className="flex justify-between border-t pt-4">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">Stay dates</p>
                      <p className="text-sm font-semibold">{booking.checkIn} - {booking.checkOut}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-gray-400">Total Price</p>
                      <p className="text-sm font-bold text-rose-500">{booking.price.toLocaleString()} RWF</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
