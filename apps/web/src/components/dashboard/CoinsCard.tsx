"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useSpot } from "../../hooks/useSpot";

function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 4 : 2,
  }).format(value);
}

export function CoinsCard() {
  const { data, isLoading, isError } = useSpot();
  const [query, setQuery] = useState("");

  const coins = data?.data.filter(
    (coin) =>
      coin.symbol.toLowerCase().includes(query.toLowerCase()) ||
      coin.name.toLowerCase().includes(query.toLowerCase())
  );

  const maxMarketCap = coins?.length
    ? Math.max(...coins.map((c) => c.marketCap))
    : 1;

  return (
    <div className="bg-neutral-900 rounded-xl p-6 h-full overflow-y-auto no-scrollbar">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-neutral-100">Spot</h2>

        <div className="relative w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full bg-neutral-800 text-neutral-200 placeholder-neutral-500 text-sm rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-1 focus:ring-neutral-600"
          />
        </div>
      </div>

      {isLoading && <p className="text-neutral-400 text-sm">Loading...</p>}

      {isError && (
        <p className="text-red-400 text-sm">Failed to load market data.</p>
      )}

      {coins && (
        <table className="w-full text-sm border-separate border-spacing-0">
          <thead>
            <tr className="text-left text-neutral-500 text-xs uppercase tracking-wide">
              <th className="font-medium pb-3 border-b border-neutral-800">
                Asset
              </th>
              <th className="font-medium pb-3 border-b border-neutral-800">
                Price
              </th>
              <th className="font-medium pb-3 border-b border-neutral-800">
                Market Cap
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              const isPositive = coin.priceChangePercentage24h >= 0;
              const barWidth = Math.max(
                4,
                (coin.marketCap / maxMarketCap) * 100
              );

              return (
                <tr
                  key={coin.id}
                  className="border-b border-neutral-800/60 last:border-0"
                >
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-neutral-100 font-medium">
                        {coin.symbol.toUpperCase()}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-100 font-mono">
                        {formatPrice(coin.currentPrice)}
                      </span>
                      <span
                        className={`text-xs font-mono ${
                          isPositive ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {isPositive ? "+" : "-"}
                        {Math.abs(coin.priceChangePercentage24h).toFixed(2)}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-neutral-100 font-mono text-xs">
                        {formatCompact(coin.marketCap)}
                      </span>
                      <div className="h-1 w-24 bg-neutral-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            isPositive ? "bg-emerald-500" : "bg-red-500"
                          }`}
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}