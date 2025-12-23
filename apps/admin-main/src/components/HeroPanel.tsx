import { Award, Target, TrendingUp, Users } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { month: "1월", value: 4200, projects: 12 },
  { month: "2월", value: 3800, projects: 15 },
  { month: "3월", value: 5100, projects: 18 },
  { month: "4월", value: 4600, projects: 14 },
  { month: "5월", value: 6200, projects: 22 },
  { month: "6월", value: 7100, projects: 26 },
];

const achievements = [
  { label: "총 매출", value: "₩124,500,000", change: "+12.5%", icon: TrendingUp, color: "blue" },
  { label: "활성 사용자", value: "2,847", change: "+8.2%", icon: Users, color: "cyan" },
  { label: "완료율", value: "94.2%", change: "+3.1%", icon: Target, color: "indigo" },
  { label: "달성 목표", value: "156", change: "+24", icon: Award, color: "sky" },
];

export function HeroPanel() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3">
      {/* Summary Header */}
      <div className="mb-3">
        <h1 className="text-slate-900 mb-0.5 text-lg">환영합니다, 관리자님!</h1>
        <p className="text-slate-600 text-xs">오늘의 프로젝트 현황을 확인하세요.</p>
      </div>

      {/* Achievement Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          const colorClasses = {
            blue: "bg-blue-50 text-blue-600 border-blue-100",
            cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
            indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
            sky: "bg-sky-50 text-sky-600 border-sky-100",
          };

          const changeBg = {
            blue: "bg-blue-100 text-blue-700",
            cyan: "bg-cyan-100 text-cyan-700",
            indigo: "bg-indigo-100 text-indigo-700",
            sky: "bg-sky-100 text-sky-700",
          };

          return (
            <div
              key={index}
              className={`${colorClasses[achievement.color as keyof typeof colorClasses]} rounded-lg p-2.5 border transition-all hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={`${changeBg[achievement.color as keyof typeof changeBg]} px-1.5 py-0.5 rounded text-[10px]`}
                >
                  {achievement.change}
                </span>
              </div>
              <div className="text-slate-600 text-[10px] mb-0.5">{achievement.label}</div>
              <div className="text-slate-900 text-sm">{achievement.value}</div>
            </div>
          );
        })}
      </div>

      {/* Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
        {/* Area Chart */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
          <h3 className="text-slate-900 mb-2 text-xs">매출 추이</h3>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: "10px" }} />
              <YAxis stroke="#64748b" style={{ fontSize: "10px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  fontSize: "11px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-200">
          <h3 className="text-slate-900 mb-2 text-xs">월별 프로젝트</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" style={{ fontSize: "10px" }} />
              <YAxis stroke="#64748b" style={{ fontSize: "10px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  fontSize: "11px",
                }}
              />
              <Bar dataKey="projects" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
