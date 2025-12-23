import { useState } from "react";
import { Coins, History, Minus, Plus, Search, TrendingUp, Users } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  level: string;
  joinDate: string;
}

const usersData: User[] = [
  {
    id: 1,
    name: "김철수",
    email: "kim@example.com",
    points: 15200,
    level: "골드",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "이영희",
    email: "lee@example.com",
    points: 28450,
    level: "플래티넘",
    joinDate: "2023-11-20",
  },
  {
    id: 3,
    name: "박민수",
    email: "park@example.com",
    points: 8900,
    level: "실버",
    joinDate: "2024-03-10",
  },
  {
    id: 4,
    name: "정수현",
    email: "jung@example.com",
    points: 42100,
    level: "다이아",
    joinDate: "2023-08-05",
  },
  {
    id: 5,
    name: "최지은",
    email: "choi@example.com",
    points: 12300,
    level: "골드",
    joinDate: "2024-02-28",
  },
  {
    id: 6,
    name: "강동훈",
    email: "kang@example.com",
    points: 5600,
    level: "브론즈",
    joinDate: "2024-05-12",
  },
  {
    id: 7,
    name: "윤서연",
    email: "yoon@example.com",
    points: 19800,
    level: "골드",
    joinDate: "2024-01-08",
  },
  {
    id: 8,
    name: "한지우",
    email: "han@example.com",
    points: 35600,
    level: "플래티넘",
    joinDate: "2023-09-15",
  },
];

const recentTransactions = [
  {
    id: 1,
    user: "이영희",
    type: "지급",
    amount: 500,
    reason: "이벤트 참여",
    date: "2025-12-05 14:30",
  },
  {
    id: 2,
    user: "김철수",
    type: "차감",
    amount: 300,
    reason: "포인트 사용",
    date: "2025-12-05 13:20",
  },
  {
    id: 3,
    user: "정수현",
    type: "지급",
    amount: 1000,
    reason: "리뷰 작성",
    date: "2025-12-05 11:15",
  },
  {
    id: 4,
    user: "박민수",
    type: "지급",
    amount: 200,
    reason: "출석 보너스",
    date: "2025-12-05 09:45",
  },
  {
    id: 5,
    user: "최지은",
    type: "차감",
    amount: 500,
    reason: "상품 구매",
    date: "2025-12-04 18:20",
  },
  {
    id: 6,
    user: "윤서연",
    type: "지급",
    amount: 800,
    reason: "추천인 보너스",
    date: "2025-12-04 16:10",
  },
  {
    id: 7,
    user: "한지우",
    type: "지급",
    amount: 1500,
    reason: "프로젝트 완료",
    date: "2025-12-04 14:25",
  },
  {
    id: 8,
    user: "강동훈",
    type: "차감",
    amount: 200,
    reason: "서비스 이용",
    date: "2025-12-04 11:30",
  },
];

export function PointsManagement() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [pointAmount, setPointAmount] = useState("");
  const [reason, setReason] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddPoints = () => {
    if (selectedUser && pointAmount && reason) {
      alert(`${selectedUser.name}님에게 ${pointAmount} 포인트를 지급했습니다.\n사유: ${reason}`);
      setPointAmount("");
      setReason("");
      setSelectedUser(null);
    }
  };

  const handleDeductPoints = () => {
    if (selectedUser && pointAmount && reason) {
      alert(
        `${selectedUser.name}님으로부터 ${pointAmount} 포인트를 차감했습니다.\n사유: ${reason}`,
      );
      setPointAmount("");
      setReason("");
      setSelectedUser(null);
    }
  };

  const totalPoints = usersData.reduce((sum, user) => sum + user.points, 0);
  const avgPoints = Math.round(totalPoints / usersData.length);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div>
        <h1 className="text-slate-900 mb-0.5 text-lg">포인트 관리</h1>
        <p className="text-slate-600 text-xs">사용자의 포인트를 조회하고 관리하세요</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 bg-white text-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <Coins className="w-4 h-4" />
            </div>
            <span className="text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded text-[10px]">
              +12.5%
            </span>
          </div>
          <div className="text-slate-600 text-[10px] mb-0.5">총 포인트</div>
          <div className="text-slate-900 text-sm">{totalPoints.toLocaleString()} P</div>
        </div>

        <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 bg-white text-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
              <Users className="w-4 h-4" />
            </div>
            <span className="text-cyan-700 bg-cyan-100 px-1.5 py-0.5 rounded text-[10px]">
              +{usersData.length - 6}
            </span>
          </div>
          <div className="text-slate-600 text-[10px] mb-0.5">전체 사용자</div>
          <div className="text-slate-900 text-sm">{usersData.length}명</div>
        </div>

        <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 bg-white text-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded text-[10px]">
              +5.2%
            </span>
          </div>
          <div className="text-slate-600 text-[10px] mb-0.5">평균 포인트</div>
          <div className="text-slate-900 text-sm">{avgPoints.toLocaleString()} P</div>
        </div>
      </div>

      {/* Point Adjustment Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3">
        <h2 className="text-slate-900 mb-2 text-base">포인트 조정</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Left: User Selection */}
          <div>
            <label className="block text-slate-700 mb-1.5 text-xs">사용자 검색 및 선택</label>
            <div className="relative mb-2">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="이름 또는 이메일로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-xs"
              />
            </div>

            <div className="max-h-72 overflow-y-auto border border-slate-200 rounded-lg">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full text-left p-2 border-b border-slate-100 hover:bg-blue-50 transition-colors ${
                    selectedUser?.id === user.id ? "bg-blue-50 border-l-4 border-l-blue-600" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-slate-900 text-xs">{user.name}</div>
                      <div className="text-slate-500 text-[10px]">{user.email}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-blue-600 text-xs">{user.points.toLocaleString()} P</div>
                      <div className="text-slate-500 text-[10px]">{user.level}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Point Adjustment Form */}
          <div>
            <label className="block text-slate-700 mb-1.5 text-xs">포인트 조정</label>

            {selectedUser ? (
              <div className="space-y-2">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                  <div className="text-slate-600 text-[10px] mb-0.5">선택된 사용자</div>
                  <div className="text-slate-900 text-xs">{selectedUser.name}</div>
                  <div className="text-slate-600 text-[10px]">{selectedUser.email}</div>
                  <div className="text-blue-600 mt-1 text-xs">
                    현재 포인트: {selectedUser.points.toLocaleString()} P
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 text-xs">포인트 금액</label>
                  <input
                    type="number"
                    placeholder="금액 입력"
                    value={pointAmount}
                    onChange={(e) => setPointAmount(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 text-xs">조정 사유</label>
                  <textarea
                    placeholder="포인트 조정 사유를 입력하세요"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={2}
                    className="w-full px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-xs"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddPoints}
                    disabled={!pointAmount || !reason}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-sm text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    포인트 지급
                  </button>
                  <button
                    onClick={handleDeductPoints}
                    disabled={!pointAmount || !reason}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-sm text-xs"
                  >
                    <Minus className="w-3.5 h-3.5" />
                    포인트 차감
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 p-6">
                <div className="text-center">
                  <Users className="w-8 h-8 text-slate-400 mx-auto mb-1.5" />
                  <p className="text-slate-500 text-xs">왼쪽에서 사용자를 선택하세요</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200">
        <div className="px-3 py-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <History className="w-4 h-4 text-blue-600" />
            <h2 className="text-slate-900 text-base">최근 포인트 내역</h2>
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-xs">전체 보기</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-3 py-1.5 text-slate-600 text-xs">사용자</th>
                <th className="text-left px-3 py-1.5 text-slate-600 text-xs">유형</th>
                <th className="text-left px-3 py-1.5 text-slate-600 text-xs">금액</th>
                <th className="text-left px-3 py-1.5 text-slate-600 text-xs">사유</th>
                <th className="text-left px-3 py-1.5 text-slate-600 text-xs">날짜</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-50">
                  <td className="px-3 py-2 text-slate-900 text-xs">{transaction.user}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`inline-flex px-1.5 py-0.5 rounded-full text-[10px] ${
                        transaction.type === "지급"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-xs ${
                        transaction.type === "지급" ? "text-blue-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "지급" ? "+" : "-"}
                      {transaction.amount.toLocaleString()} P
                    </span>
                  </td>
                  <td className="px-3 py-2 text-slate-600 text-xs">{transaction.reason}</td>
                  <td className="px-3 py-2 text-slate-600 text-xs">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
