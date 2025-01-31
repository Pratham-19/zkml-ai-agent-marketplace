"use client";
import React from "react";
import {
  Search,
  User,
  Plus,
  ExternalLink,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Avatar from "boring-avatars";

const DashboardPage = () => {
  const marqueeTokens = [
    {
      rank: "#1",
      name: "TRUMP",
      change: "-8.73%",
      isPositive: false,
      logo: "/dummy-token.jpg",
      price: "$0.0234",
    },
    {
      rank: "#2",
      name: "VINE",
      change: "-24.25%",
      isPositive: false,
      logo: "/dummy-token.jpg",
      price: "$1.234",
    },
    {
      rank: "#3",
      name: "RUG",
      change: "+37.66%",
      isPositive: true,
      logo: "/dummy-token.jpg",
      price: "$0.567",
    },
    {
      rank: "#4",
      name: "SAGA",
      change: "+15.23%",
      isPositive: true,
      logo: "/dummy-token.jpg",
      price: "$2.345",
    },
    {
      rank: "#5",
      name: "PEPE",
      change: "-12.45%",
      isPositive: false,
      logo: "/dummy-token.jpg",
      price: "$0.789",
    },
    {
      rank: "#6",
      name: "DOGE",
      change: "+5.67%",
      isPositive: true,
      logo: "/dummy-token.jpg",
      price: "$0.145",
    },
  ];

  const recentTrades = [
    {
      token: "TRUMP",
      tokenLogo: "/dummy-token.jpg",
      value: "$10.71K",
      trade: {
        sell: "-10.72K USDC",
        buy: "+2.59K TRUMP",
      },
      trader: "0x46f08032",
      time: "6m ago",
    },
    {
      token: "SAGA",
      tokenLogo: "/dummy-token.jpg",
      value: "$12.3K",
      trade: {
        sell: "-5.2K SAGA",
        buy: "+15.5K USDC",
      },
      trader: "0x62310ee2",
      time: "8m ago",
    },
  ];

  const topTraders = [
    {
      address: "0x1234...5678",
      avatar: "/dummy-token.jpg",
      pnl7d: "+$146.11M",
      volume: "$238.63M",
    },
    {
      address: "0x8765...4321",
      avatar: "/dummy-token.jpg",
      pnl7d: "+$125.29M",
      volume: "$323.29M",
    },
  ];

  const tokens = [
    {
      logo: "/dummy-token.jpg",
      name: "G.A.M.E",
      symbol: "$GAME",
      address: "0x1CHC...F463a3",
      category: "Productivity",
      marketCap: "$79.18m",
      change24h: "+8.85%",
      tvl: "$13.48m",
      holders: "182,395",
      volume24h: "$1.26m",
    },
    {
      logo: "/dummy-token.jpg",
      name: "Luna",
      symbol: "$LUNA",
      address: "0x5cb...2d7ee4",
      category: "Entertainment",
      marketCap: "$34.57m",
      change24h: "-2.2%",
      tvl: "$6.89m",
      holders: "288,041",
      volume24h: "$301.85k",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="flex h-14 items-center px-4">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="rounded bg-orange-500 p-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" />
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" />
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-xl font-bold">SAGEOS</span>
            </div>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Overview
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              Analytics
            </Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              How it Works
            </Button>
          </div>

          {/* Search Section */}
          <div className="mx-auto flex max-w-2xl flex-1 px-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <div className="flex rounded-lg border border-orange-500/20 bg-orange-500/10">
                <Input
                  placeholder="Search tokens, markets, traders..."
                  className="border-0 bg-transparent px-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <div className="flex items-center border-l border-orange-500/20 px-3">
                  <span className="text-orange-500">/</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="text-gray-300 hover:text-white">
              PRO
            </Button>
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              <Plus className="mr-2 size-4" />
              Create Token
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-300">
              {/* <User className="size-5" /> */}
              <Avatar
                size={24}
                name="John Doe"
                variant="pixel"
                square
                className="rounded"
              />
            </Button>
          </div>
        </div>
      </nav>

      {/* Token Marquee with smoother transition */}
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
                  <img
                    src={token.logo}
                    alt={token.name}
                    className="size-6 rounded-full"
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

      {/* Trading Section */}
      <div className="grid grid-cols-4 border-b border-gray-800">
        {/* Recent Trades */}
        <div className="col-span-1 border-r border-gray-800">
          <div className="flex items-center justify-between border-b border-gray-800 p-3">
            <h2 className="font-medium">Recent Trades</h2>
            <Button
              variant="link"
              size="sm"
              className="text-blue-500 no-underline hover:text-blue-400"
            >
              View More
            </Button>
          </div>
          <div className="border-b border-gray-800 bg-gray-900/50">
            <div className="p-2">
              <div className="grid grid-cols-[2fr_4fr_1fr_40px] gap-4 text-xs text-gray-400">
                <div>TOKEN</div>
                <div className="text-center">TRADE</div>
                <div className="text-right">TIME</div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-800">
            {recentTrades.map((trade, idx) => (
              <div key={idx} className="hover:bg-gray-900/30">
                <div className="p-3">
                  <div className="grid grid-cols-[2fr_4fr_1fr_40px] items-center gap-4">
                    <div className="flex min-w-0 items-center gap-2">
                      <img
                        src={trade.tokenLogo}
                        alt={trade.token}
                        className="size-8 shrink-0 rounded-full"
                      />
                      <span className="truncate text-sm font-medium">
                        {trade.token}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-3 overflow-hidden whitespace-nowrap text-sm">
                      <div className="flex items-center gap-1 text-red-500">
                        <span className="">
                          {trade.trade.sell.split(" ")[0]}
                        </span>
                        <span className="text-xs ">
                          {trade.trade.sell.split(" ")[1]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-green-500">
                        <span className="">
                          {trade.trade.buy.split(" ")[0]}
                        </span>
                        <span className="text-xs ">
                          {trade.trade.buy.split(" ")[1]}
                        </span>
                      </div>
                    </div>
                    <span className="whitespace-nowrap text-right font-mono text-sm text-gray-400">
                      {trade.time}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 p-0 hover:bg-gray-800"
                    >
                      <ExternalLink className="size-4 text-gray-400" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Traders */}
        <div className="col-span-1 border-r border-gray-800">
          <div className="flex items-center justify-between border-b border-gray-800 p-3">
            <h2 className="font-medium">Profitable Traders</h2>
            <Button
              variant="link"
              size="sm"
              className="text-blue-500 no-underline hover:text-blue-400 "
            >
              View More
            </Button>
          </div>
          <div className="border-b border-gray-800 bg-gray-900/50">
            <div className="p-2">
              <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 text-xs text-gray-400">
                <div>TRADER</div>
                <div>7D PNL</div>
                <div className="text-right">VOLUME</div>
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-800">
            {topTraders.map((trader, idx) => (
              <div key={idx} className="hover:bg-gray-900/30">
                <div className="p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono">{trader.address}</span>

                    <span className="text-green-500">{trader.pnl7d}</span>
                    <span className="text-gray-400">{trader.volume}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bubble Chart */}
        <div className="col-span-2">
          <div className="flex items-center justify-between border-b border-gray-800 p-3">
            <h2 className="font-medium">Market Bubbles</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                24H
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                7D
              </Button>
              <Button variant="ghost" size="sm" className="text-xs">
                ALL
              </Button>
            </div>
          </div>
          <div className="h-[500px] p-4">
            <div className="relative size-full rounded-lg bg-gray-900/20">
              {/* Sample bubbles for visualization */}
              <div className="absolute left-1/4 top-1/4 flex size-32 items-center justify-center rounded-full border border-green-500 bg-green-500/20">
                <div className="text-center">
                  <div className="text-sm">TRUMP</div>
                  <div className="text-xs text-green-500">+8.73%</div>
                </div>
              </div>
              <div className="absolute bottom-1/4 right-1/4 flex size-24 items-center justify-center rounded-full border border-red-500 bg-red-500/20">
                <div className="text-center">
                  <div className="text-sm">SAGA</div>
                  <div className="text-xs text-red-500">-12.45%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tokens List */}
      <div className="border-b border-gray-800">
        <div className="grid grid-cols-8 border-b border-gray-800 p-3 text-xs text-gray-400">
          <div className="col-span-2">TOKEN</div>
          <div>MARKET CAP</div>
          <div>24H CHG</div>
          <div>TVL</div>
          <div>HOLDERS</div>
          <div>24H VOL</div>
          <div>CATEGORY</div>
        </div>
        <div className="divide-y divide-gray-800">
          {tokens.map((token, idx) => (
            <div
              key={idx}
              className="grid grid-cols-8 items-center px-3 py-4 hover:bg-gray-900/30"
            >
              <div className="col-span-2 flex items-center gap-3">
                <img src={token.logo} alt="" className="size-8 rounded-full" />
                <div>
                  <div className="font-medium">{token.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{token.symbol}</span>
                    <span className="font-mono text-xs">{token.address}</span>
                  </div>
                </div>
              </div>
              <div>{token.marketCap}</div>
              <div
                className={
                  token.change24h.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {token.change24h}
              </div>
              <div>{token.tvl}</div>
              <div>{token.holders}</div>
              <div>{token.volume24h}</div>
              <div className="text-gray-400">{token.category}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
