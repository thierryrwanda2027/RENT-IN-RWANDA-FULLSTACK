"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { register } from "@/actions/auth";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaArrowRight } from "react-icons/fa";

export function AuthForm() {
  const searchParams = useSearchParams();
  const isRegisterPage = searchParams.get("register") === "true";
  const [isRegister, setIsRegister] = useState(isRegisterPage);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+250"); // Default Rwanda country code
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    startTransition(async () => {
      try {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid email or password");
        } else {
          // Fetch session to check role and redirect accordingly
          const response = await fetch('/api/auth/session');
          const session = await response.json();
          const role = (session?.user as any)?.role;

          if (role === 'ADMIN') {
            router.push("/admin");
          } else if (role === 'HOST') {
            router.push("/host");
          } else {
            router.push("/dashboard");
          }
          router.refresh();
        }
      } catch (err) {
        setError("Something went wrong");
      }
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("password", password);

    startTransition(async () => {
      const result = await register(formData);
      if (result.success) {
        // After successful registration, log them in
        const loginResult = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        
        if (loginResult?.error) {
          setError("Account created, but failed to log in automatically.");
        } else {
          router.push("/dashboard");
          router.refresh();
        }
      } else {
        setError(result.error || "Failed to register");
      }
    });
  };

  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-zinc-100 w-full max-w-lg transition-all duration-500">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-zinc-900 tracking-tight mb-2">
          {isRegister ? "Create an account" : "Welcome back"}
        </h2>
        <p className="text-zinc-500 font-medium">
          {isRegister ? "Join RENT IN RWANDA to start your journey." : "Log in to manage your stays and properties."}
        </p>
      </div>

      <form onSubmit={isRegister ? handleRegister : handleLogin} className="space-y-5">
        {isRegister && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">First Name</label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-rose-500 transition-colors" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                  placeholder="Thierry"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Last Name</label>
              <div className="relative group">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-rose-500 transition-colors" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                  placeholder="Ishimwe"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {isRegister && (
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Phone Number</label>
            <div className="relative group">
              <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-rose-500 transition-colors" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:bg-white focus:border-transparent outline-none transition-all font-medium"
                placeholder="+250 788 000 000"
                required
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
          <div className="relative group">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-rose-500 transition-colors" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:bg-white focus:border-transparent outline-none transition-all font-medium"
              placeholder="name@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Password</label>
          <div className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-rose-500 transition-colors" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:bg-white focus:border-transparent outline-none transition-all font-medium"
              placeholder="••••••••"
              required
            />
          </div>
        </div>
        
        {error && (
          <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2">
            <p className="text-rose-600 text-xs font-bold leading-tight">{error}</p>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-rose-500 text-white py-4 rounded-2xl font-black text-lg hover:bg-rose-600 transition-all shadow-xl shadow-rose-100 transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isPending ? (
            <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              {isRegister ? "Create Account" : "Log In"} <FaArrowRight size={14} />
            </>
          )}
        </button>
      </form>
      
      <div className="mt-10 pt-8 border-t border-zinc-50 text-center">
        <p className="text-sm font-bold text-zinc-500 mb-4">
          {isRegister ? "Already have an account?" : "Don't have an account yet?"}
        </p>
        <button 
          onClick={() => setIsRegister(!isRegister)}
          className="text-zinc-900 font-black underline hover:text-rose-500 transition"
        >
          {isRegister ? "Log in instead" : "Create an account"}
        </button>
      </div>

      {!isRegister && (
        <div className="mt-8 pt-6 border-t border-zinc-50 text-center text-[10px] text-zinc-400 uppercase tracking-widest">
          <p className="mb-2">Demo credentials</p>
          <div className="flex justify-center gap-4">
            <span className="font-bold text-zinc-500">Admin: admin@example.com</span>
            <span className="font-bold text-zinc-500">Guest: user@example.com</span>
          </div>
        </div>
      )}
    </div>
  );
}
