import { AuthForm } from "@/components/AuthForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] px-4 py-20">
      <Suspense fallback={<div className="animate-pulse bg-white w-full max-w-lg h-[600px] rounded-[2.5rem]"></div>}>
        <AuthForm />
      </Suspense>
    </div>
  );
}
