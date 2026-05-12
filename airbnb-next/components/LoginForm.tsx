"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome back</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
            placeholder="admin@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        
        {error && <p className="text-rose-500 text-sm">{error}</p>}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-500 text-white py-3 rounded-lg font-bold hover:bg-rose-600 transition-colors disabled:opacity-50 mt-4"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      
      <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
        <p>Demo accounts:</p>
        <p className="mt-1 font-mono">admin@example.com / password (Admin)</p>
        <p className="font-mono">user@example.com / password (Guest)</p>
      </div>
    </div>
  );
}
