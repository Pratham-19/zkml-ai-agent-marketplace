import React from "react";
import {
  Search,
  Plus,
  ExternalLink,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Avatar from "boring-avatars";
import Bubble from "@/components/bubble";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  marqueeTokens,
  recentTrades,
  topTraders,
  coins,
  tokens,
} from "@/lib/constants";

const DashboardPage = async () => {
  return (
    <div className="min-h-screen bg-black text-white">
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
          <ScrollArea className="h-[400px] flex-1">
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
          </ScrollArea>
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
          <ScrollArea className="h-[400px] flex-1">
            <div className="divide-y divide-gray-800">
              {topTraders.map((trader, idx) => (
                <div key={idx} className="hover:bg-gray-900/30">
                  <div className="p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <Avatar
                          size={24}
                          name={trader.address}
                          variant="pixel"
                        />
                        <h2 className="font-mono">{trader.address}</h2>
                      </span>

                      <span className="text-green-500">{trader.pnl7d}</span>
                      <span className="text-gray-400">{trader.volume}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
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
          <div className="h-[400px] p-2">
            <Bubble height={500} width={500} coins={coins} />
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
        <ScrollArea className="h-[600px] flex-1">
          <div className="divide-y divide-gray-800">
            {tokens.map((token, idx) => (
              <div
                key={idx}
                className="grid grid-cols-8 items-center px-3 py-4 hover:bg-gray-900/30"
              >
                <div className="col-span-2 flex items-center gap-3">
                  <img
                    src={token.logo}
                    alt=""
                    className="size-8 rounded-full"
                  />
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
        </ScrollArea>
      </div>
    </div>
  );
};

export default DashboardPage;
