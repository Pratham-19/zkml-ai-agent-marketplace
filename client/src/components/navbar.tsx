import Avatar from "boring-avatars";
import { Search, Plus } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function Navbar() {
  return (
    <nav className="border-b border-gray-800 py-3">
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
              size={32}
              name="John Doe"
              variant="pixel"
              square
              className="rounded"
            />
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
