"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const loggedIn = localStorage.getItem("1fi_logged_in");
      if (loggedIn === "true") {
        router.replace("/shop");
      } else {
        router.replace("/login");
      }
    } catch {
      router.replace("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-[#712CDC] flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}
