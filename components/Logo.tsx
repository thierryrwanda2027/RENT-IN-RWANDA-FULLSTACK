"use client";

import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-xl md:text-2xl font-black tracking-tighter text-zinc-900 group-hover:text-zinc-700 transition-colors uppercase">
            Rent in
          </span>
          <div className="ml-2 flex items-center">
             <span className="text-xl md:text-2xl font-black tracking-tighter uppercase relative overflow-hidden">
                <span className="text-[#00A1DE]">R</span>
                <span className="text-[#00A1DE]">w</span>
                <span className="text-[#FAD201]">a</span>
                <span className="text-[#FAD201]">n</span>
                <span className="text-[#20603D]">d</span>
                <span className="text-[#20603D]">a</span>
                <div className="absolute bottom-0 left-0 w-full h-[3px] flex">
                  <div className="h-full w-[40%] bg-[#00A1DE]"></div>
                  <div className="h-full w-[30%] bg-[#FAD201]"></div>
                  <div className="h-full w-[30%] bg-[#20603D]"></div>
                </div>
             </span>
          </div>
        </div>
        <div className="flex gap-1 mt-[-2px]">
          <div className="h-[2px] w-8 bg-[#00A1DE]"></div>
          <div className="h-[2px] w-6 bg-[#FAD201]"></div>
          <div className="h-[2px] w-4 bg-[#20603D]"></div>
        </div>
      </div>
      
      {/* Rwandan Flag Sun Icon stylized */}
      <div className="relative w-8 h-8 md:w-10 md:h-10">
        <div className="absolute inset-0 bg-white rounded-full shadow-sm border border-zinc-100 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-6 h-6 md:w-8 md:h-8">
            {/* Sun from Rwandan flag */}
            <circle cx="50" cy="50" r="20" fill="#FAD201" />
            {[...Array(24)].map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="25"
                x2="50"
                y2="15"
                stroke="#FAD201"
                strokeWidth="4"
                transform={`rotate(${i * 15} 50 50)`}
              />
            ))}
          </svg>
        </div>
        <div className="absolute -bottom-1 -right-1 flex gap-[2px]">
          <div className="w-2 h-2 rounded-full bg-[#00A1DE]"></div>
          <div className="w-2 h-2 rounded-full bg-[#FAD201]"></div>
          <div className="w-2 h-2 rounded-full bg-[#20603D]"></div>
        </div>
      </div>
    </Link>
  );
}
