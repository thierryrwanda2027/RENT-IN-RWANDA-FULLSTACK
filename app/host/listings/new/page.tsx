"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createListing } from "@/actions/listings";
import { FaHome, FaImage, FaMapMarkerAlt, FaTag, FaInfoCircle, FaCoins, FaCheckCircle } from "react-icons/fa";

export default function NewListingPage() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleSubmit = async (formData: FormData) => {
    setIsPending(true);
    setError(null);
    
    const result = await createListing(formData);
    
    setIsPending(false);
    
    if (result.success) {
      router.push("/host/listings");
    } else {
      setError(result.error || "Something went wrong");
    }
  };

  const steps = [
    { id: 1, label: "Basics", icon: <FaHome /> },
    { id: 2, label: "Location", icon: <FaMapMarkerAlt /> },
    { id: 3, label: "Pricing", icon: <FaCoins /> },
    { id: 4, label: "Photos", icon: <FaImage /> },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-20 pt-12">
      <div className="max-w-3xl mx-auto px-4">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-black text-zinc-900 tracking-tight mb-4">Host your home</h1>
          <p className="text-zinc-500 font-medium">Join our community of hosts in Rwanda.</p>
        </header>

        {/* Step Indicator */}
        <div className="flex justify-between mb-12 bg-white p-6 rounded-3xl shadow-sm border border-zinc-100">
          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center gap-2 flex-1">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 ${step >= s.id ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200' : 'bg-zinc-100 text-zinc-400'}`}>
                {step > s.id ? <FaCheckCircle /> : s.icon}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s.id ? 'text-zinc-900' : 'text-zinc-400'}`}>{s.label}</span>
            </div>
          ))}
        </div>

        <form action={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden">
            {/* Step 1: Basics */}
            {step === 1 && (
              <div className="p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center"><FaTag /></div>
                  <h2 className="text-2xl font-black text-zinc-900">Tell us about your place</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Listing Title</label>
                    <input 
                      name="title" 
                      type="text" 
                      placeholder="e.g. Modern Villa with Volcano View"
                      required
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 font-bold focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 transition-all outline-none"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Category</label>
                    <select 
                      name="category" 
                      required
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 font-bold focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option value="modern">Modern</option>
                      <option value="beach">Beach</option>
                      <option value="mountain">Mountain</option>
                      <option value="city">City</option>
                      <option value="countryside">Countryside</option>
                      <option value="camping">Camping</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Description</label>
                    <textarea 
                      name="description" 
                      rows={5}
                      placeholder="Describe the unique features of your property..."
                      required
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 font-bold focus:bg-white focus:border-zinc-900 focus:ring-4 focus:ring-zinc-900/5 transition-all outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="p-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center"><FaMapMarkerAlt /></div>
                  <h2 className="text-2xl font-black text-zinc-900">Where's it located?</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Location Address</label>
                    <input 
                      name="location" 
                      type="text" 
                      placeholder="e.g. Nyarutarama, Kigali"
                      required
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 font-bold focus:bg-white focus:border-zinc-900 transition-all outline-none"
                    />
                  </div>
                  <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 flex gap-4">
                    <FaInfoCircle className="text-zinc-400 shrink-0 mt-1" />
                    <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                      Exact addresses are only shared with guests after they book. Make sure to include the district and province for better search visibility.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pricing */}
            {step === 3 && (
              <div className="p-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center"><FaCoins /></div>
                  <h2 className="text-2xl font-black text-zinc-900">Set your price</h2>
                </div>
                
                <div className="space-y-8 py-8 text-center">
                  <div className="relative inline-block w-full max-w-xs">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-zinc-400">RWF</span>
                    <input 
                      name="price" 
                      type="number" 
                      defaultValue={150000}
                      required
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-[2rem] pl-20 pr-8 py-8 text-4xl font-black text-zinc-900 focus:bg-white focus:border-zinc-900 transition-all outline-none"
                    />
                  </div>
                  <p className="text-zinc-500 font-bold">Recommended for your area: 120k - 180k RWF</p>
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {step === 4 && (
              <div className="p-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center"><FaImage /></div>
                  <h2 className="text-2xl font-black text-zinc-900">Add a stunning photo</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Image URL</label>
                    <input 
                      name="img" 
                      type="url" 
                      placeholder="https://images.unsplash.com/..."
                      required
                      className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-zinc-900 font-bold focus:bg-white focus:border-zinc-900 transition-all outline-none"
                    />
                  </div>
                  <p className="text-xs text-zinc-400 font-medium italic">Tip: Use high-quality architectural shots from Unsplash for better performance.</p>
                </div>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="bg-zinc-50 p-8 flex justify-between items-center border-t border-zinc-100">
              <button 
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={step === 1 || isPending}
                className="px-8 py-4 rounded-2xl font-black text-sm text-zinc-500 hover:text-zinc-900 transition disabled:opacity-0"
              >
                Back
              </button>
              
              {step < 4 ? (
                <button 
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="bg-zinc-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-zinc-800 transition shadow-xl shadow-zinc-200 transform active:scale-95"
                >
                  Continue
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={isPending}
                  className="bg-rose-500 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-rose-600 transition shadow-xl shadow-rose-200 transform active:scale-95 disabled:bg-zinc-400"
                >
                  {isPending ? "Publishing..." : "Publish Listing"}
                </button>
              )}
            </div>
          </div>
          
          {error && (
            <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl animate-shake">
              <p className="text-rose-600 font-bold text-sm text-center">{error}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
