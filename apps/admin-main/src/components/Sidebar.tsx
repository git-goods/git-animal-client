import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  ChevronDown,
  Coins,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  Palette,
  Settings,
  Users,
} from "lucide-react";

import { identityQueryOptions } from "@/lib/api/identity";
import { authUtils } from "@/lib/auth";

import { Sheet, SheetContent, SheetTitle } from "./ui/sheet";
import { useIsMobile } from "./ui/use-mobile";

const menuItems = [
  { id: "dashboard", path: "/dashboard", label: "대시보드", icon: LayoutDashboard },
  { id: "points", path: "/points", label: "포인트 관리", icon: Coins },
  { id: "point-adjustment", path: "/point-adjustment", label: "포인트 증감", icon: Coins },
  { id: "quiz", path: "/quiz", label: "퀴즈 관리", icon: HelpCircle },
  { id: "users", path: "/users", label: "사용자", icon: Users },
  { id: "analytics", path: "/analytics", label: "분석", icon: BarChart3 },
  { id: "reports", path: "/reports", label: "리포트", icon: FileText },
  { id: "design-system", path: "/design-system", label: "디자인 시스템", icon: Palette },
  { id: "settings", path: "/settings", label: "설정", icon: Settings },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const queryClient = useQueryClient();

  const { data: userData } = useQuery(identityQueryOptions.user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    authUtils.removeToken();
    window.location.href = "/";
    queryClient.removeQueries();
  };

  return (
    <>
      {/* Logo */}
      <div className="p-3 border-b border-blue-800">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-cyan-500 rounded-lg flex items-center justify-center text-white shadow-md">
            D
          </div>
          <div>
            <div className="text-white text-sm">Dashboard</div>
            <div className="text-cyan-300 text-xs">관리자 패널</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <div className="space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-blue-200 hover:bg-blue-800/50 hover:text-white"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-2 border-t border-blue-800">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-blue-800/50 rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs">
              관리
            </div>
            <div className="flex-1 text-left">
              <div className="text-white text-xs">관리자</div>
              <div className="text-blue-300 text-[10px]">{userData?.username}</div>
            </div>
            <ChevronDown className="w-3 h-3 text-blue-300" />
          </button>

          {isDropdownOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-blue-900 rounded-lg shadow-lg border border-blue-700 py-0.5">
              <button className="w-full text-left px-3 py-1.5 text-blue-200 hover:bg-blue-800 flex items-center gap-2 text-xs">
                <Settings className="w-3 h-3" />
                설정
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-1.5 text-red-400 hover:bg-blue-800 flex items-center gap-2 text-xs"
              >
                <LogOut className="w-3 h-3" />
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-blue-950 flex flex-col z-50 shadow-xl">
      <SidebarContent />
    </aside>
  );
}

export function MobileHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const currentPage = menuItems.find((item) => item.path === location.pathname);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-slate-200 bg-white px-4 shadow-sm">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">메뉴 열기</span>
        </button>
        <span className="text-sm font-medium text-slate-900">
          {currentPage?.label ?? "Dashboard"}
        </span>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 bg-blue-950 p-0 border-none [&>button]:text-blue-300 [&>button]:hover:text-white"
        >
          <SheetTitle className="sr-only">내비게이션 메뉴</SheetTitle>
          <SidebarContent onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}

export { useIsMobile };
