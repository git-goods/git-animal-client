import { useState } from "react";
import { ArrowUpDown, MoreVertical } from "lucide-react";

const tableData = [
  {
    id: 1,
    project: "웹사이트 리디자인",
    client: "Acme Corp",
    status: "진행 중",
    priority: "높음",
    dueDate: "2025-12-15",
    progress: 75,
    assignee: "김철수",
  },
  {
    id: 2,
    project: "모바일 앱 개발",
    client: "TechStart Inc",
    status: "진행 중",
    priority: "긴급",
    dueDate: "2025-12-10",
    progress: 60,
    assignee: "이영희",
  },
  {
    id: 3,
    project: "브랜드 아이덴티티",
    client: "Creative Studios",
    status: "검토",
    priority: "보통",
    dueDate: "2025-12-20",
    progress: 90,
    assignee: "박민수",
  },
  {
    id: 4,
    project: "이커머스 플랫폼",
    client: "ShopFlow",
    status: "완료",
    priority: "높음",
    dueDate: "2025-12-01",
    progress: 100,
    assignee: "정수현",
  },
  {
    id: 5,
    project: "마케팅 캠페인",
    client: "Growth Co",
    status: "진행 중",
    priority: "보통",
    dueDate: "2025-12-18",
    progress: 45,
    assignee: "최지은",
  },
  {
    id: 6,
    project: "대시보드 분석",
    client: "DataViz Pro",
    status: "계획",
    priority: "낮음",
    dueDate: "2025-12-25",
    progress: 20,
    assignee: "강동훈",
  },
  {
    id: 7,
    project: "API 통합 개발",
    client: "IntegraTech",
    status: "진행 중",
    priority: "높음",
    dueDate: "2025-12-22",
    progress: 55,
    assignee: "윤서연",
  },
  {
    id: 8,
    project: "보안 감사",
    client: "SecureCo",
    status: "검토",
    priority: "긴급",
    dueDate: "2025-12-08",
    progress: 85,
    assignee: "한지우",
  },
];

const statusColors = {
  "진행 중": "bg-blue-100 text-blue-700",
  검토: "bg-yellow-100 text-yellow-700",
  완료: "bg-cyan-100 text-cyan-700",
  계획: "bg-slate-100 text-slate-700",
};

const priorityColors = {
  긴급: "bg-red-100 text-red-700",
  높음: "bg-orange-100 text-orange-700",
  보통: "bg-yellow-100 text-yellow-700",
  낮음: "bg-slate-100 text-slate-700",
};

export function DataTable() {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="px-3 py-2 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-slate-900 mb-0 text-base">최근 프로젝트</h2>
            <p className="text-slate-600 text-xs">프로젝트 진행 상황을 관리하고 추적하세요</p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-xs">전체 보기</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-3 py-1.5 text-slate-600 text-xs">
                <button
                  onClick={() => handleSort("project")}
                  className="flex items-center gap-1 hover:text-slate-900"
                >
                  프로젝트
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left px-3 py-1.5 text-slate-600 text-xs">클라이언트</th>
              <th className="text-left px-3 py-1.5 text-slate-600 text-xs">상태</th>
              <th className="text-left px-3 py-1.5 text-slate-600 text-xs">우선순위</th>
              <th className="text-left px-3 py-1.5 text-slate-600 text-xs">진행률</th>
              <th className="text-left px-3 py-1.5 text-slate-600 text-xs">마감일</th>
              <th className="text-left px-3 py-1.5 text-slate-600 text-xs">담당자</th>
              <th className="text-left px-3 py-1.5 text-slate-600 text-xs"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tableData.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-3 py-2">
                  <div className="text-slate-900 text-xs">{row.project}</div>
                </td>
                <td className="px-3 py-2">
                  <div className="text-slate-600 text-xs">{row.client}</div>
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`inline-flex px-1.5 py-0.5 rounded-full text-[10px] ${
                      statusColors[row.status as keyof typeof statusColors]
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`inline-flex px-1.5 py-0.5 rounded-full text-[10px] ${
                      priorityColors[row.priority as keyof typeof priorityColors]
                    }`}
                  >
                    {row.priority}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="flex-1 bg-slate-200 rounded-full h-1 max-w-[70px]">
                      <div
                        className="bg-blue-500 h-1 rounded-full transition-all"
                        style={{ width: `${row.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-600 text-[10px] min-w-[30px]">{row.progress}%</span>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <div className="text-slate-600 text-xs">{row.dueDate}</div>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px]">
                      {row.assignee.substring(0, 2)}
                    </div>
                    <span className="text-slate-600 text-xs hidden xl:inline">{row.assignee}</span>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <button className="p-0.5 hover:bg-slate-200 rounded transition-colors">
                    <MoreVertical className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-3 py-2 border-t border-slate-200 flex items-center justify-between">
        <div className="text-slate-600 text-xs">
          총 {tableData.length}개 항목 중 1-{tableData.length} 표시
        </div>
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-50 text-slate-600 text-xs">
            이전
          </button>
          <button className="px-2 py-1 bg-blue-600 text-white rounded shadow-sm text-xs">1</button>
          <button className="px-2 py-1 border border-slate-300 rounded hover:bg-slate-50 text-slate-600 text-xs">
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
