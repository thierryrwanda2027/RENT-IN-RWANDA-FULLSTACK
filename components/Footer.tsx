import Link from "next/link";
import { FaGlobe, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b">
          <div>
            <h5 className="font-bold text-sm mb-4">Support</h5>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:underline">Help Center</Link></li>
              <li><Link href="#" className="hover:underline">AirCover</Link></li>
              <li><Link href="#" className="hover:underline">Supporting people with disabilities</Link></li>
              <li><Link href="#" className="hover:underline">Cancellation options</Link></li>
              <li><Link href="#" className="hover:underline">Our COVID-19 Response</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm mb-4">Community</h5>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:underline">Airbnb.org: disaster relief housing</Link></li>
              <li><Link href="#" className="hover:underline">Combating discrimination</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm mb-4">Hosting</h5>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:underline">Airbnb your home</Link></li>
              <li><Link href="#" className="hover:underline">AirCover for Hosts</Link></li>
              <li><Link href="#" className="hover:underline">Explore hosting resources</Link></li>
              <li><Link href="#" className="hover:underline">Visit our community forum</Link></li>
              <li><Link href="#" className="hover:underline">How to host responsibly</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-sm mb-4">Airbnb</h5>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="#" className="hover:underline">Newsroom</Link></li>
              <li><Link href="#" className="hover:underline">Learn about new features</Link></li>
              <li><Link href="#" className="hover:underline">Letter from our founders</Link></li>
              <li><Link href="#" className="hover:underline">Careers</Link></li>
              <li><Link href="#" className="hover:underline">Investors</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-sm text-gray-600">
            <span>© 2026 THIERRY BNB, Inc.</span>
            <span className="hidden md:inline">·</span>
            <Link href="#" className="hover:underline">Privacy</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Terms</Link>
            <span>·</span>
            <Link href="#" className="hover:underline">Sitemap</Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 font-semibold text-sm cursor-pointer">
              <FaGlobe />
              <span>English (US)</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-sm cursor-pointer">
              <span>RWF</span>
            </div>
            <div className="flex items-center gap-4 text-gray-800">
              <FaFacebook size={18} />
              <FaTwitter size={18} />
              <FaInstagram size={18} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
