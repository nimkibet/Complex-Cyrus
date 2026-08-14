import Link from "next/link";
import { Zap, LayoutDashboard, Settings, LogOut } from "lucide-react";
import { cookies } from "next/headers";
import { logoutAction } from "@/app/actions/auth";

export const metadata = {
  title: "Admin Dashboard | Complex Cyrus",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_session")?.value === "authenticated";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      {isAuthenticated && (
        <header className="bg-blue-950 text-white shadow-xl sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center min-h-[4rem] py-2">
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" />
                <span className="font-black text-sm sm:text-xl tracking-tight hidden sm:block">
                  COMPLEX CYRUS <span className="text-blue-300">ADMIN</span>
                </span>
              </div>
              <nav className="flex flex-wrap items-center justify-end gap-3 sm:gap-6">
                <Link
                  href="/admin/pricing"
                  className="text-xs sm:text-sm font-bold text-white hover:text-yellow-400 flex items-center gap-1.5 sm:gap-2 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Pricing Manager</span>
                  <span className="sm:hidden">Pricing</span>
                </Link>

                <Link
                  href="/admin/settings"
                  className="text-xs sm:text-sm font-bold text-white hover:text-yellow-400 flex items-center gap-1.5 sm:gap-2 transition-colors"
                >
                  <Settings className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Settings</span>
                </Link>
                
                <div className="w-px h-5 sm:h-6 bg-blue-800 hidden sm:block"></div>
                
                <form action={logoutAction}>
                  <button className="text-xs sm:text-sm font-bold text-red-300 hover:text-red-400 flex items-center gap-1.5 sm:gap-2 transition-colors">
                    <LogOut className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Logout</span>
                  </button>
                </form>

                <Link
                  href="/"
                  className="text-xs sm:text-sm font-bold text-blue-300 hover:text-white transition-colors ml-1 sm:ml-2"
                >
                  <span className="hidden sm:inline">&larr; Back to Website</span>
                  <span className="sm:hidden">&larr; Web</span>
                </Link>
              </nav>
            </div>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}


