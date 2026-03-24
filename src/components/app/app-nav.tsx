"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PenLine, History, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/generate", label: "Générer", icon: PenLine },
  { href: "/history", label: "Historique", icon: History },
];

export function AppNav({ user }: { user: any }) {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 border-r border-border bg-surface flex flex-col h-screen sticky top-0 hidden md:flex">
      <div className="p-6">
        <Link href="/dashboard" className="font-display text-2xl font-bold flex items-center gap-2">
           <span className="text-accent">✦</span> CopyNiche
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
               "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium",
               isActive ? "bg-accent/10 text-accent" : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            )}>
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-3 py-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-border-strong flex items-center justify-center text-accent text-sm font-bold shrink-0">
            {user?.name?.[0] || user?.email?.[0] || "?"}
          </div>
          <div className="flex-1 overflow-hidden text-ellipsis">
            <p className="text-sm font-medium truncate leading-tight">{user?.name || "Utilisateur"}</p>
            <p className="text-xs text-text-muted truncate leading-tight">{user?.email}</p>
          </div>
        </div>
        <Link href="/api/auth/signout" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-text-muted hover:text-text-primary hover:bg-red-500/10 hover:text-red-400 transition-colors">
          <LogOut className="w-4 h-4" />
          Déconnexion
        </Link>
      </div>
    </aside>
  );
}
