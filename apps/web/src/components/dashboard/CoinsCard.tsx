"use client";

import { useTopGainers } from "@/hooks/useTopGainers";

export function CoinsCard() {
  const { data, isLoading, isError } = useTopGainers();

  return (
    <div className="bg-neutral-900 rounded-xl p-6 h-full overflow-y-auto">
      <h2 className="text-lg font-semibold text-neutral-100 mb-4">
        Top Gainers
      </h2>

      {isLoading && (
        <p className="text-neutral-400 text-sm">Carregando...</p>
      )}

      {isError && (
        <p className="text-red-400 text-sm">
          Não foi possível carregar os dados de mercado.
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