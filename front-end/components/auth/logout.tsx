"use client";
import apiClient from "@/lib/api";
import { LogOut } from "lucide-react";
import { useState} from "react";
import { useRouter } from "next/navigation";

export const Logout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logoutUser = () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        await apiClient.delete("/auth/logout");
        router.push("/sign-in");
      } catch (error) {
        console.error("Error Deleting User:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div
      onClick={logoutUser}
      role="button"
      tabIndex={0}
      className="flex items-center gap-x- bg-sky-600/20 text-sm font-[500] pl-6"
    >
      <div
        className={`flex items-center gap-x-2 py-4 cursor-pointer ${
          loading ? "opacity-50" : ""
        }`}
      >
        <LogOut className="w-5 h-5 text-slate-500" size={19} />
        <p className="text-slate-500 text-sm font-medium">
          {loading ? "Logging out..." : "Logout"}
        </p>
      </div>
    </div>
  );
};
