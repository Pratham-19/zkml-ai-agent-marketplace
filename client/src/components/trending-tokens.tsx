import { marqueeTokens } from "@/lib/constants";
import { TrendingUp, TrendingDown } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function TrendingTokens() {
  return (
    <div className="border-b border-gray-800 bg-black">
      <div className="relative overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap py-2">
          {[...marqueeTokens, ...marqueeTokens, ...marqueeTokens].map(
            (token, idx) => (
              <div
                key={idx}
                className="group inline-flex cursor-pointer items-center gap-3 px-6"
              >
                <span className="text-sm text-gray-500">{token.rank}</span>
                <Image
                  src={token.logo}
                  alt={token.name}
                  className="size-6 rounded-full"
                  width={50}
                  height={50}
                />
                <span className="font-medium">{token.name}</span>
                <span className="text-gray-400">{token.price}</span>
                <div
                  className={`flex items-center gap-1 ${
                    token.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {token.isPositive ? (
                    <TrendingUp className="size-4" />
                  ) : (
                    <TrendingDown className="size-4" />
                  )}
                  {token.change}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
