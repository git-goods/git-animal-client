import { CircleAlert } from "lucide-react";

interface ComingSoonProps {
  type?: "text" | "icon";
}

export default function ComingSoon({ type = "text" }: ComingSoonProps) {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
      {type === "text" && (
        <div className="flex items-center justify-center h-full">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 text-center">
            <div className="text-slate-400 mb-1 text-sm">페이지 개발 중</div>
            <div className="text-slate-600 text-sm">페이지는 곧 추가될 예정입니다.</div>
          </div>
        </div>
      )}
      {type === "icon" && <CircleAlert className="w-8 h-8 text-white" />}
    </div>
  );
}
