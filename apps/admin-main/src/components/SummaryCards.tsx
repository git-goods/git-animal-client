import { AlertCircle, CheckCircle, Clock, TrendingUp } from "lucide-react";

const summaryData = [
  {
    title: "진행 중",
    count: 12,
    description: "활성 프로젝트",
    icon: Clock,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    title: "완료됨",
    count: 48,
    description: "이번 달 완료",
    icon: CheckCircle,
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    borderColor: "border-cyan-200",
  },
  {
    title: "검토 대기",
    count: 7,
    description: "승인 대기 중",
    icon: AlertCircle,
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-200",
  },
  {
    title: "성장률",
    count: "+23%",
    description: "지난 달 대비",
    icon: TrendingUp,
    bgColor: "bg-sky-50",
    iconColor: "text-sky-600",
    borderColor: "border-sky-200",
  },
];

export function SummaryCards() {
  return (
    <div>
      <h2 className="text-slate-900 mb-2 text-base">빠른 개요</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {summaryData.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`${card.bgColor} border ${card.borderColor} rounded-lg p-2.5 hover:shadow-md transition-all`}
            >
              <div className="flex items-start justify-between mb-2">
                <div
                  className={`w-9 h-9 bg-white rounded-lg flex items-center justify-center ${card.iconColor} shadow-sm`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-slate-900 mb-0.5 text-lg">{card.count}</div>
              <div className="text-slate-900 text-xs mb-0.5">{card.title}</div>
              <div className="text-slate-600 text-[10px]">{card.description}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
