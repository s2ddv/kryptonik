"use client";

import { useSpot } from "../../hooks/useSpot";

export function CoinsCard() {
  const { data, isLoading, isError } = useSpot();

  return (
    <div className="bg-neutral-900 rounded-xl p-6 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold text-neutral-100 mb-4">
        Spot
      </h2>

      {isLoading && (
        <p className="text-neutral-400 text-sm">Loading...</p>
      )}

      {isError && (
        <p className="text-red-400 text-sm">
          Failed to load market data.
        </p>
      )}

      {data && (
        <ul className="space-y-2">
          {data.data.map((coin) => (
            <li
              key={coin.id}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-5 h-5" />
                <span className="text-neutral-200">{coin.symbol.toUpperCase()}</span>
              </div>
              <span className="text-green-400">
                +{coin.priceChangePercentage24h.toFixed(2)}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}