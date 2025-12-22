import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { authUtils } from "@/lib/auth";
import { validateToken } from "@/lib/auth/validateToken";
import { queryClient } from "@/lib/query/client";
import LoginPage from "@/pages/auth/LoginPage";
import ComingSoonPage from "@/pages/ComingSoonPage";
import DashboardPage from "@/pages/DashboardPage";
import DesignSystemPage from "@/pages/DesignSystemPage";
import PointAdjustmentPage from "@/pages/PointAdjustmentPage";
import PointsPage from "@/pages/PointsPage";

import { Sidebar } from "./components/Sidebar";

function ProtectedLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // 1. localStorage에 토큰이 있는지 확인
      const hasToken = authUtils.isAuthenticated();

      if (!hasToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // 2. 토큰이 있으면 서버에 유효성 검증
      console.log("🔐 토큰 유효성 검증 시작...");
      const isValid = await validateToken();

      if (isValid) {
        console.log("✅ 토큰 유효함");
        setIsAuthenticated(true);
      } else {
        console.log("❌ 토큰 무효 - 로그아웃 처리");
        setIsAuthenticated(false);
        // 쿼리 캐시 초기화
        queryClient.clear();
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-600">로딩 중...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 ml-64">
        <div className="max-w-[1600px] mx-auto px-3 py-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<LoginPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/points" element={<PointsPage />} />
            <Route path="/point-adjustment" element={<PointAdjustmentPage />} />
            <Route path="/users" element={<ComingSoonPage pageName="사용자" />} />
            <Route path="/analytics" element={<ComingSoonPage pageName="분석" />} />
            <Route path="/reports" element={<ComingSoonPage pageName="리포트" />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/settings" element={<ComingSoonPage pageName="설정" />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
