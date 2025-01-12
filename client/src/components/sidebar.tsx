"use client";
import { useState, useEffect } from "react";
import Avatar from "boring-avatars";
import Link from "next/link";
import {
  Coins,
  LayoutDashboard,
  Wallet,
  Scale,
  Sparkles,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar as AvatarHead } from "@/components/ui/avatar";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CustomConnectButton from "./connect-wallet";
import { useAccount, useDisconnect } from "wagmi";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [showText, setShowText] = useState(false);
  const { address, isConnected } = useAccount();

  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (expanded) {
      const timer = setTimeout(() => setShowText(true), 100);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [expanded]);

  const handleMouseEnter = () => setExpanded(true);
  const handleMouseLeave = () => {
    setShowText(false);
    setTimeout(() => setExpanded(false), 200);
  };

  return (
    <motion.div
      className="bg-background/50 border-border/50 fixed inset-y-0 left-0 z-50 overflow-hidden border-r backdrop-blur-xl"
      animate={{
        width: expanded ? 256 : 64,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: expanded ? 0 : 0.2, // Delay collapse to let text fade out first
      }}
      onHoverStart={handleMouseEnter}
      onHoverEnd={handleMouseLeave}
    >
      <div className="flex h-full flex-col">
        {/* Logo Section */}
        <Link
          href="/"
          className="border-border/50 relative flex h-16 items-center overflow-hidden border-b"
        >
          <motion.div
            animate={{
              x: expanded ? 2 : 12,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
          >
            <Image
              src={"/zkml-logo.png"}
              width={176}
              height={176}
              alt="zkml-logo"
              className="ml-1 size-7"
            />
          </motion.div>

          <AnimatePresence mode="wait">
            {showText && (
              <motion.div
                className="ml-3 whitespace-nowrap text-lg font-medium"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
              >
                ZKML Auditor
              </motion.div>
            )}
          </AnimatePresence>
        </Link>

        {/* Main Navigation */}
        <div className="flex grow flex-col gap-2 px-2 py-4">
          {[
            { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
            {
              href: "/audit",
              icon: Scale,
              label: "Audit",
              decorator: (
                <Sparkles className="absolute -right-1 -top-1 size-2" />
              ),
            },
            { href: "/credits", icon: Coins, label: "Credits" },
          ].map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:bg-accent group relative flex h-10 items-center overflow-hidden rounded-lg px-2 transition-colors"
            >
              <motion.div
                className="absolute flex items-center"
                animate={{
                  x: expanded ? 0 : 4,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
              >
                <item.icon className="size-5" />
                {item.decorator}
              </motion.div>
              <AnimatePresence mode="wait">
                {showText && (
                  <motion.span
                    className="ml-10 whitespace-nowrap text-base"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      },
                    }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </div>

        {/* Bottom Profile/Wallet Section */}
        <div className="border-border/50 border-t p-4">
          {isConnected ? (
            <div className="relative flex h-10 cursor-default items-center overflow-hidden rounded-lg">
              <AvatarHead className="absolute size-8 overflow-hidden rounded-lg border">
                <Avatar name={address ?? ""} variant="beam" square />
              </AvatarHead>
              <AnimatePresence mode="wait">
                {showText && (
                  <div className="flex flex-1 items-center justify-between px-2">
                    <motion.span
                      className="ml-8 whitespace-nowrap"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                    >
                      {address?.slice(0, 6) + "..." + address?.slice(-4)}
                    </motion.span>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => disconnect()}
                      className="ml-2 h-8 w-auto rounded-lg px-3 text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-500"
                    >
                      <LogOut className="size-4" />
                    </Button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              variant="outline"
              className="relative flex h-10 w-full items-center justify-start overflow-hidden"
            >
              <Wallet className="absolute left-2 size-5" />
              <AnimatePresence mode="wait">
                {showText && (
                  <motion.span
                    className="ml-10 whitespace-nowrap"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                  >
                    <CustomConnectButton />
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
