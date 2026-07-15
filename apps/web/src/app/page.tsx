import { CoinsCard } from "@/components/dashboard/CoinsCard";

export default function DashboardPage() {
  return (
    <div className="grid grid-rows-[2fr_1fr] gap-4 h-screen p-4">
      <div className="bg-neutral-900 rounded-xl p-6">
        {/* Wallet - próxima etapa */}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CoinsCard />
        <div className="bg-neutral-900 rounded-xl p-6">
          {/* News - próxima etapa */}
        </div>
      </div>
    </div>
  );
}