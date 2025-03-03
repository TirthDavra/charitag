import DashboardHome from "@/components/common/Home/index";

export default function Home({
  searchParams,
}: {
  searchParams: {
    per_page: string;
    charity_id: string;
    prev_campaign: string;
    sort_field?: string;
    country_id?: string;
    page: number;
  };
}) {
  return (
    <main>
      <DashboardHome searchParams={searchParams} />
    </main>
  );
}
