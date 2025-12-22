interface ComingSoonPageProps {
  pageName: string;
}

export default function ComingSoonPage({ pageName }: ComingSoonPageProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 text-center">
      <div className="text-slate-400 mb-1 text-sm">페이지 개발 중</div>
      <div className="text-slate-600 text-sm">{pageName} 페이지는 곧 추가될 예정입니다.</div>
    </div>
  );
}
