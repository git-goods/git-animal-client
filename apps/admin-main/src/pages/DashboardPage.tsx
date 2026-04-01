import { useQuery } from "@tanstack/react-query";

import ComingSoon from "@/components/ComingSoon";
import { DataTable } from "@/components/DataTable";
import { HeroPanel } from "@/components/HeroPanel";
import { SummaryCards } from "@/components/SummaryCards";
import { identityQueryOptions } from "@/lib/api/identity";

export default function DashboardPage() {
  useQuery(identityQueryOptions.user);

  return (
    <>
      <ComingSoon />
      <HeroPanel />

      <div className="mt-3">
        <SummaryCards />
      </div>

      <div className="mt-3">
        <DataTable />
      </div>
    </>
  );
}
