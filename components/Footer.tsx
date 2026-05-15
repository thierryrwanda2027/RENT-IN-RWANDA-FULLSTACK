import Link from "next/link";
import { FaGlobe, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-zinc-200">
          <div>
            <h5 className="font-bold text-[13px] text-zinc-900 mb-4 uppercase tracking-wider">Support</h5>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li><Link href="#" className="hover:underline">Help Center</Link></li>
              <li><Link href="#" className="hover:underline">AirCover</Link></li>
              <li><Link href="#" className="hover:underline">Supporting people with disabilities</Link></li>
              <li><Link href="#" className="hover:underline">Cancellation options</Link></li>
              <li><Link href="#" className="hover:underline">Our COVID-19 Response</Link></li>
              <li><Link href="#" className="hover:underline">Report a neighborhood concern</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[13px] text-zinc-900 mb-4 uppercase tracking-wider">Community</h5>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li><Link href="#" className="hover:underline">RENT IN RWANDA.org: disaster relief housing</Link></li>
              <li><Link href="#" className="hover:underline">Combating discrimination</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[13px] text-zinc-900 mb-4 uppercase tracking-wider">Hosting</h5>
            <ul className="space-y-3 text-sm text-zinc-600">
              <li><Link href="/host" className="hover:underline">RENT IN RWANDA your home</Link></li>
              <li><Link href="#" className="hover:underline">AirCover for Hosts</Link></li>
              <li><Link href="#" className="hover:underline">Explore hosting resources</Link></li>
              <li><Link href="#" className="hover:underline">Visit our community forum</Link></li>
              <li><Link href="#" className="hover:underline">How to host responsibly</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-zinc-600">
            <span className="font-medium text-zinc-900">© 2026 RENT IN RWANDA, Inc.</span>
            <span>·</span>
            <Link href="#" className="hover:underline">Privacy</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Terms</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Sitemap</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 cursor-pointer hover:underline">
              <FaGlobe />
              <span>English (US)</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 cursor-pointer hover:underline">
              <span>RWF</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-900">
              <FaFacebook size={18} className="hover:scale-110 transition cursor-pointer" />
              <FaTwitter size={18} className="hover:scale-110 transition cursor-pointer" />
              <FaInstagram size={18} className="hover:scale-110 transition cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
