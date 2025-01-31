"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  Globe,
  Twitter,
  Send,
  Copy,
  TrendingDown,
  TrendingUp,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Avatar from "boring-avatars";
import { ScrollArea } from "@/components/ui/scroll-area";
import TradingViewChart from "@/components/trading-view-chart";

const DolphinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="#75CEF9"
      d="M11.887 14.53s-.1-.484-.248-.615c-.184-.165-.736-.272-.736-.272-.341-.127-.96-.323-1.494-.257-.723.09-1.11.233-1.48.528.626.68 1.433 1.288 2.463 1.633 1.538.516 1.69-.032 1.495-1.017z"
    ></path>
    <path
      fill="#6BBEF6"
      d="M10.903 13.643a8.863 8.863 0 01-.654-.786l-.397.055c-1.046.144-1.917.158-2.633.1.205.303.44.609.71.902.562.006 1.2-.031 1.922-.131.36-.05.71-.097 1.052-.14z"
    ></path>
    <path
      fill="#90D8F9"
      d="M19.259 23.267c-.406-.406.28-1.128-.002-1.553-.281-.424-.426-.173-.902-.725-.263-.306-.265-.693-.214-.98a.241.241 0 00-.28-.279c-.285.052-.673.05-.978-.213-.552-.477-.3-.621-.726-.902-.424-.281-1.147.404-1.553-.002-.172-.173-.22-.444-.166-.748-.436.616-.615 1.277-.463 1.428.406.406 1.128-.28 1.553.002.425.281.173.426.726.902.552.476 1.375.096 1.375.096s-.38.823.096 1.376c.477.552.621.3.902.725.282.425-.404 1.147.002 1.553.135.135.671.01 1.222-.326a1.34 1.34 0 01-.592-.354z"
    ></path>
    <path
      fill="#B1E4F9"
      d="M15.36 3.366c.472-1.857 1.829-3.538-.204-3.352-2.515.23-4.054 1.885-4.802 2.965C3.77 3.773 3.6 8.957 3.6 8.957S.825 10.05.75 11.545c0 0 .167.167.207.306.033.116.003.396.003.396.76.84 3.449-.143 3.449-.143s5.71.771 5.84.754c1.83-.247 3.397-.404 4.727-.32 0 0 2.387-.72 3.736.553 2.37 2.237-.22 4.687-.22 4.687-1.859-1.858-3.323-.949-4.057.087-.175.416-.228.736-.056.909.407.406 1.129-.28 1.553.002.425.28.173.425.726.901.305.264.693.265.979.214a.24.24 0 01.28.28c-.052.286-.05.673.213.978.476.553.62.301.902.726.281.425-.404 1.147.002 1.553.18.181.598.252.815.193 1.11-.678 2.274-2.211.293-4.192 6.19-5.27 2.155-13.926-4.783-16.063z"
    ></path>
    <path
      fill="#EEF1F3"
      d="M17.95 11.574c-3.065-1.448-13.536.53-13.536.53s1.446 1.36 5.443.808c3.997-.553 6.777-.748 8.606.91 1.828 1.658.033 3.955.033 3.955 1.924-.95 2.585-4.725-.546-6.203z"
    ></path>
    <path
      fill="#B1E4F9"
      d="M14.445 15.187c.796.13 1.25-.119 1.386-.575-.311-.973-1.227-2.446-1.241-3.811l-5.254.515c.823 1.42 2.681 3.47 5.11 3.87z"
    ></path>
    <path
      fill="#90D8F9"
      d="M14.448 14.778c-2.428-.4-4.229-2.317-5.11-3.462l-.01.001s1.609 3.752 5.12 4.332c1.48.244 1.646-.22 1.386-1.036-.174.223-.59.297-1.386.165z"
    ></path>
    <path
      fill="#75CEF9"
      d="M3.58 10.866a.363.363 0 00-.455-.24c-.835.26-1.764.65-2.373.92-.007.132.007.268.047.407a.73.73 0 00.162.294c.59-.264 1.546-.669 2.379-.927a.363.363 0 00.24-.454z"
    ></path>
    <path
      fill="#2B4D66"
      d="M6.29 8.098v.591a.364.364 0 10.727 0V8.1a.363.363 0 10-.728 0z"
    ></path>
  </svg>
);

const ShrimpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="#FF4E15"
      d="M4.65 4.2C3.741 4.2 3 4.93 3 5.85c0 .92.741 1.65 1.65 1.65h2.776c.4 0 .4-.6 0-.6H4.65c-.587 0-1.05-.471-1.05-1.05 0-.578.463-1.05 1.05-1.05H5.7c.4 0 .4-.6 0-.6H4.65z"
    ></path>
    <path
      fill="#FF6B3C"
      d="M12.34 9.447l-.9 1.499a.3.3 0 00.007.32l.6.9c.221.336.725.002.501-.332l-.496-.742.804-1.337a.3.3 0 10-.516-.308zM13.844 9.447l-.9 1.499a.3.3 0 00.007.32l.6.9c.222.334.722.002.501-.332l-.496-.742.804-1.337a.3.3 0 10-.516-.308zM10.84 9.447l-.9 1.499a.3.3 0 00.007.32l.6.9c.222.334.722.002.501-.332l-.496-.742.804-1.337a.3.3 0 10-.516-.308z"
    ></path>
    <path
      fill="#FF6B3C"
      d="M12.901 16.8c2.114-.19 3.746-1.531 3.746-3.508 0-1.68-1.288-3.206-2.92-3.746h-.526V4.8l1.2.001c3.49 0 6.6 2.943 6.6 6.598 0 3.656-2.7 6.598-6.9 6.598h-1.18L12.9 16.8z"
    ></path>
    <path
      fill="#FF6B3C"
      d="M11.412 17.602a2.854 2.854 0 01-2.017-3.492.3.3 0 01.212-.213 2.852 2.852 0 013.492 3.492.3.3 0 01-.21.212 2.84 2.84 0 01-1.477 0zM6.9 4.499a.3.3 0 00-.3.301c0 2.875 1.938 5.1 4.5 5.1h2.28c.569 0 1.063-.342 1.396-.835.332-.493.525-1.148.525-1.867 0-.72-.193-1.372-.525-1.864-.333-.493-.828-.835-1.395-.835H6.9z"
    ></path>
    <path
      fill="#FF4E15"
      d="M20.399 10.8c0 3.655-2.7 6.598-6.9 6.598h-.59l.008.6h1.181c4.2 0 6.9-2.943 6.9-6.598 0-1.952-.89-3.695-2.248-4.9 1.014 1.153 1.649 2.652 1.649 4.3z"
    ></path>
    <path
      fill="#FF5D29"
      d="M11.87 15.727c.182-.156.083-.557-.17-.728-.253-.17-.666-.128-.744.11-.055.169.127.204.379.374s.354.399.535.244z"
    ></path>
    <path
      fill="#FF4E15"
      d="M17.487 5.602c.257 2.423-.822 4.132-1.984 5.06.141.145.271.298.39.46 1.221-.983 2.329-2.74 2.225-5.125a6.771 6.771 0 00-.631-.395zM16.58 12.634c.039.196.06.396.064.598 1.812-.324 3.432-1.468 4.221-3.139a6.399 6.399 0 00-.278-.956c-.53 1.847-2.147 3.15-4.008 3.496zM20.458 14.093a4.733 4.733 0 01-2.377.647c-.56 0-1.115-.105-1.643-.302-.07.19-.158.372-.263.543a5.29 5.29 0 001.905.358c.656 0 1.304-.125 1.915-.362.177-.28.331-.576.463-.885zM15.47 15.795a3.875 3.875 0 01-.492.353c.492.537 1.083 1.044 1.985 1.327.306-.121.596-.262.871-.42-1.197-.165-1.798-.646-2.365-1.26zM13.688 16.67c.091.45.293.884.622 1.323.252-.006.498-.023.738-.05-.476-.525-.7-.973-.783-1.454a4.9 4.9 0 01-.578.18z"
    ></path>
    <path
      fill="#FFA88D"
      d="M13.105 16.8c2.114-.19 3.746-1.53 3.746-3.507 0-1.681-1.288-3.207-2.92-3.747h-.205c1.632.54 2.92 2.066 2.92 3.747 0 1.976-1.633 3.317-3.746 3.507h.206z"
    ></path>
    <path
      fill="#FF4E15"
      d="M10.745 17.327a2.857 2.857 0 001.401.372c.248.001.498-.03.745-.097a.3.3 0 00.21-.212c.076-.282.102-.569.09-.852a2.85 2.85 0 00-.445-.037 2.845 2.845 0 00-2 .826z"
    ></path>
    <path
      fill="#FFA88D"
      d="M6.823 4.925c-.1.008-.185.097-.21.225.003.07.004.14.01.208.042.132.144.218.25.21.135-.011.232-.164.219-.341-.013-.165-.119-.296-.244-.303h-.025zM16.454 12.182c.085.033.17.032.244-.001.183-.084.24-.349.13-.59-.088-.193-.261-.319-.426-.312a.285.285 0 00-.107.026.31.31 0 00-.158.181c.13.222.235.456.317.697z"
    ></path>
    <path
      fill="#FF5D29"
      d="M18.678 9.255c-.293-.434-.685-.609-.418-.92.267-.313.957-.142 1.25.293.293.434.22 1.144-.188 1.278-.29.095-.35-.217-.643-.65zM12.514 6.705c-.293-.434-.685-.609-.418-.92.267-.313.957-.142 1.25.293.293.434.22 1.144-.188 1.278-.29.095-.35-.217-.644-.65z"
    ></path>
    <path
      fill="#FF4E15"
      d="M14.18 4.741c.33.492.52 1.142.52 1.857 0 .716-.192 1.374-.524 1.867-.333.493-.828.835-1.396.835H10.5a4.18 4.18 0 01-2.695-.978C8.615 9.3 9.772 9.9 11.099 9.9h2.281c.569 0 1.063-.342 1.395-.835.333-.493.525-1.147.525-1.867 0-.719-.192-1.371-.525-1.864a2.07 2.07 0 00-.595-.593z"
    ></path>
    <path
      fill="#FFA88D"
      d="M6.903 4.499a.3.3 0 00-.301.299V4.8c0 1.554.57 2.915 1.494 3.84-.792-.951-1.27-2.245-1.27-3.701 0-.174.14-.315.314-.316h6.797l.029.002a1.432 1.432 0 00-.583-.126h-6.48z"
    ></path>
    <path
      fill="#FF4E15"
      d="M6.149 3c-.91 0-1.65.73-1.65 1.65 0 .92.741 1.65 1.65 1.65h1.95c.4 0 .4-.6 0-.6H6.15c-.587 0-1.05-.471-1.05-1.05 0-.578.463-1.05 1.05-1.05h8.25c.4 0 .4-.6 0-.6H6.15z"
    ></path>
    <path
      fill="#FFA88D"
      d="M10.138 16.865c.36.36.802.61 1.277.737.16.043.323.066.489.081a2.844 2.844 0 01-1.61-.804 2.854 2.854 0 01-.74-2.755.3.3 0 01.213-.212 2.85 2.85 0 01.99-.081 2.867 2.867 0 00-1.146.066.3.3 0 00-.212.212c-.264.984.02 2.035.74 2.755z"
    ></path>
    <path
      fill="#FF6B3C"
      d="M12.148 17.1a2.84 2.84 0 00-2.01.834 2.854 2.854 0 00-.74 2.755.3.3 0 00.213.213 2.853 2.853 0 003.493-3.492.3.3 0 00-.21-.213 2.845 2.845 0 00-.745-.097z"
    ></path>
    <path
      fill="#FFA88D"
      d="M9.942 18.157a.155.155 0 00.05.083c.082.068.22.036.31-.072.09-.108.096-.25.015-.318a.142.142 0 00-.051-.027c-.042.038-.088.071-.128.112-.07.07-.133.146-.195.223z"
    ></path>
    <path
      fill="#FF5D29"
      d="M11.71 18.495c.181.156.081.557-.171.727-.253.171-.666.129-.744-.11-.055-.168.126-.203.379-.373.252-.171.354-.399.535-.244z"
    ></path>
    <path
      fill="#FF4E15"
      d="M11.765 19.565a2.851 2.851 0 01-2.431.802c.016.108.035.216.064.323a.3.3 0 00.212.213 2.853 2.853 0 003.493-3.492.3.3 0 00-.21-.213 2.879 2.879 0 00-.327-.064c.131.886-.159 1.79-.8 2.432v-.001z"
    ></path>
    <path
      fill="#FFA88D"
      d="M9.399 20.69a.298.298 0 00.066.121.31.31 0 01-.02-.05 2.855 2.855 0 013.495-3.493.3.3 0 01.144.09.3.3 0 00-.191-.161 2.84 2.84 0 00-1.477 0 2.854 2.854 0 00-2.017 3.492zM9.647 16.11c.04.006.078 0 .11-.016.11-.058.136-.221.06-.365-.076-.144-.225-.214-.334-.156a.168.168 0 00-.052.043c.021.062.038.126.063.187.045.106.099.207.153.307z"
    ></path>
  </svg>
);

const WhaleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.5547 12.3125L10.0234 14.8906L13.9766 20.0082H15.2656C19.9118 19.6722 22.3026 15.9275 22.768 13.6016L16.5547 12.3125ZM15.9102 7.15625C16.2664 7.15625 16.5547 6.86793 16.5547 6.51172C16.5547 6.15551 16.8434 5.86719 17.1992 5.86719C17.555 5.86719 17.8438 6.15594 17.8438 6.51172V9.08984C17.8438 9.44605 18.1321 9.73438 18.4883 9.73438C18.8445 9.73438 19.1328 9.44605 19.1328 9.08984V3.93359C19.1328 3.57781 19.4216 3.28906 19.7773 3.28906C20.1331 3.28906 20.4219 3.57781 20.4219 3.93359C20.4219 4.28938 20.7102 4.57812 21.0664 4.57812C21.4226 4.57812 21.7109 4.2898 21.7109 3.93359C21.7109 2.86754 20.8434 2 19.7773 2C18.7113 2 17.8438 2.86754 17.8438 3.93359V4.69672C17.6414 4.62453 17.4261 4.57812 17.1992 4.57812C16.1332 4.57812 15.2656 5.44566 15.2656 6.51172C15.2656 6.86793 15.5539 7.15625 15.9102 7.15625Z"
      fill="#EAF6FF"
    ></path>
    <path
      d="M22.3555 11.0234H10.668C9.08242 11.0234 7.76758 9.87617 7.49687 8.36797C8.94062 8.0457 10.0234 6.75664 10.0234 5.22266V3.93359C10.0234 3.57266 9.73984 3.28906 9.37891 3.28906H8.08984C7.03281 3.28906 6.10469 3.7918 5.51172 4.57812C4.91875 3.7918 3.99062 3.28906 2.93359 3.28906H1.64453C1.28359 3.28906 1 3.57266 1 3.93359V5.22266C1 6.78242 2.10859 8.08437 3.57812 8.38086V11.668C3.57812 16.0766 7.08008 19.6859 11.3984 20.0211V21.9805C11.3984 22.3414 11.682 22.625 12.043 22.625C13.1129 22.625 13.9766 21.7613 13.9766 20.6914V17.4202C14.1948 17.4443 14.4127 17.4675 14.6297 17.4675C17.0488 17.4675 19.2587 15.9472 20.0859 13.6016H22.768C22.9227 12.9828 23 12.3383 23 11.668C23 11.307 22.7164 11.0234 22.3555 11.0234ZM16.6093 15.7178C15.7911 16.1217 14.8871 16.2476 13.9766 16.1213V15.5352C13.9766 14.4652 14.8402 13.6016 15.9102 13.6016H18.6662C18.2361 14.5013 17.5387 15.2593 16.6093 15.7178Z"
      fill="#367EFF"
    ></path>
    <defs>
      <linearGradient
        id="paint0_linear_1824_54097"
        x1="16.3957"
        y1="20.0082"
        x2="16.3957"
        y2="2"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#ADDCFF"></stop>
        <stop offset="0.5" stopColor="#EAF6FF"></stop>
        <stop offset="1" stopColor="#EAF6FF"></stop>
      </linearGradient>
      <linearGradient
        id="paint1_linear_1824_54097"
        x1="12"
        y1="22.625"
        x2="12"
        y2="3.28906"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5558FF"></stop>
        <stop offset="1" stopColor="#00C0FF"></stop>
      </linearGradient>
    </defs>
  </svg>
);

const TradeValueIndicator = ({ amount }) => {
  const value = parseFloat(amount.replace(/[$,]/g, ""));
  if (value < 5000) {
    return <ShrimpIcon />;
  } else if (value < 10000) {
    return <DolphinIcon />;
  } else {
    return <WhaleIcon />;
  }
};

const formatTimeAgo = (timestamp: string | number | Date) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffSeconds = Math.floor((now - date) / 1000);

  if (diffSeconds < 60) return "just now";
  if (diffSeconds < 3600) {
    const minutes = Math.floor(diffSeconds / 60);
    return `${minutes}m ago`;
  }
  if (diffSeconds < 86400) {
    const hours = Math.floor(diffSeconds / 3600);
    return `${hours}h ago`;
  }
  const days = Math.floor(diffSeconds / 86400);
  return `${days}d ago`;
};

const trades = [
  {
    timestamp: "2025-01-31T19:13:24",
    type: "sell",
    total: "$89.04",
    amountETH: "0.03479",
    amountToken: "1,066,818",
    by: "HqaIJ...N5gD",
    platform: "raydium",
  },
  {
    timestamp: "2025-01-31T19:13:16",
    type: "sell",
    total: "$2420.35",
    amountETH: "0.03480",
    amountToken: "2,902,426",
    by: "71Xbf...HhGp",
    platform: "raydium",
  },
  {
    timestamp: "2025-01-31T19:12:50",
    type: "buy",
    total: "$130.36",
    amountETH: "0.03481",
    amountToken: "160,000.00",
    by: "DJqmp...9aH5",
    platform: "raydium",
  },
  {
    timestamp: "2025-01-31T19:12:45",
    type: "buy",
    total: "$54030.21",
    amountETH: "0.03482",
    amountToken: "245,123.45",
    by: "kL8mN...pQ2r",
    platform: "raydium",
  },
  {
    timestamp: "2025-01-31T19:12:30",
    type: "sell",
    total: "$7890.15",
    amountETH: "0.03483",
    amountToken: "892,567.89",
    by: "xY3vW...tU4s",
    platform: "raydium",
  },
  {
    timestamp: "2024-01-31T19:12:15",
    type: "buy",
    total: "$3210.45",
    amountETH: "0.03484",
    amountToken: "156,789.12",
    by: "aB5cD...eF6g",
    platform: "raydium",
  },
];
export default function Token() {
  const [tradeType, setTradeType] = React.useState("buy");

  return (
    <div className="grid min-h-[80vh] grid-cols-5">
      <div className="col-span-1 divide-y divide-gray-800">
        {/* Token Info */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/dummy-token.jpg"
                width={32}
                height={32}
                alt="USDC"
                className="rounded-full"
              />
              <span className="font-semibold">GAIA</span>
            </div>
            <div className="text-sm font-mono text-gray-400 break-all">
              0XEPd...dnj3
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 hover:bg-gray-800"
              >
                <Copy className="h-3 w-3 text-gray-400" />
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-gray-800 font-medium text-gray-400 hover:bg-gray-800"
            >
              <Globe className="mr-1 h-4 w-4" />
              Website
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-gray-800 font-medium text-gray-400 hover:bg-gray-800"
            >
              <Twitter className="mr-1 h-4 w-4" />
              Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-gray-800 font-medium text-gray-400 hover:bg-gray-800"
            >
              <Send className="mr-1 h-4 w-4" />
              Telegram
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 divide-x divide-gray-800 text-center">
          {[
            { label: "30m", value: "+0%", color: "text-green-500" },
            { label: "1H", value: "0%", color: "text-gray-400" },
            { label: "2H", value: "+0%", color: "text-green-500" },
            { label: "4H", value: "-0.01%", color: "text-red-500" },
            { label: "8H", value: "+0%", color: "text-green-500" },
            { label: "24H", value: "-0.01%", color: "text-red-500" },
          ].map((item, i) => (
            <div key={i} className="p-3">
              <div className="text-xs text-gray-400">{item.label}</div>
              <div className={`text-sm ${item.color}`}>{item.value}</div>
            </div>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 divide-x divide-gray-800">
          {[
            { label: "Liquidity", value: "$23.2B" },
            { label: "FDV", value: "$9.56B" },
            { label: "Total Supply", value: "9.56B" },
            { label: "Markets", value: "3.6K" },
            { label: "Holders", value: "3.59M" },
            { label: "Watchers", value: "2" },
          ].map((metric, i) => (
            <div key={i} className="p-3 text-center">
              <div className="text-xs text-gray-400">{metric.label}</div>
              <div className="text-sm font-medium">{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Sentiment */}
        <div className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">Community Trust</div>
            <div className="text-sm">15</div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex-1 bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: "93.33%" }}
              ></div>
            </div>
            <div className="text-xs text-gray-400">93.33%</div>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-1 text-green-500">
              <ThumbsUp className="h-4 w-4" /> 14
            </div>
            <div className="flex items-center gap-1 text-red-500">
              <ThumbsDown className="h-4 w-4" /> 1
            </div>
          </div>
        </div>

        {/* Top Holders */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm font-medium">TOP 10 HOLDERS</div>
            <div className="text-sm text-gray-400">32.7734%</div>
          </div>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {[
                { address: "9WzDXwBbmk", percent: "10.1028%" },
                { address: "AVzP2GeRmq", percent: "5.203%" },
                { address: "Binance", percent: "5.0363%" },
                { address: "A8nPhpCJqt", percent: "3.8276%" },
                { address: "Circle", percent: "3.5287%" },
                { address: "Drift Prot...", percent: "1.6128%" },
                { address: "DBD8hAwLDR", percent: "1.0843%" },
                { address: "9DiruRpjnA", percent: "1.012%" },
                { address: "3csxXZKah5", percent: "0.729%" },
                { address: "Kraken", percent: "0.6365%" },
              ].map((holder, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center hover:bg-gray-800/50 p-2 rounded"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-400">{i + 1}</div>
                    <div className="text-sm text-blue-400">
                      {holder.address}
                    </div>
                    <Copy className="h-3 w-3 text-gray-400 cursor-pointer" />
                  </div>
                  <div className="text-sm">{holder.percent}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      {/* Middle chart column */}
      <div className="col-span-3 flex flex-col border-x border-gray-800">
        {/* Top price info section - More compact */}
        <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold">$0.99998</span>
            <span className="text-sm font-medium text-green-500">+12.34%</span>
            <span className="text-sm text-gray-400">Created Jan 30, 2024</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">24h Volume:</span>
            <span className="font-medium">$1.32M</span>
          </div>
        </div>

        {/* Chart area */}
        <div className="h-[400px] border-b border-gray-800">
          <TradingViewChart />
        </div>

        {/* Tabs section */}
        <Tabs defaultValue="trades" className="flex-1">
          <div className="border-b border-gray-800">
            <TabsList className="bg-transparent px-0">
              <TabsTrigger
                value="trades"
                className="data-[state=active]:bg-primary rounded-none px-4 py-2.5"
              >
                Recent Trades
              </TabsTrigger>
              <TabsTrigger
                value="holders"
                className="data-[state=active]:bg-primary rounded-none border-x border-gray-800 px-4 py-2.5"
              >
                Holders
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="data-[state=active]:bg-primary rounded-none px-4 py-2.5"
              >
                Comments
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="trades" className="mt-0">
            <div className="bg-muted/40 grid grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_40px] gap-2 border-b border-gray-800 p-3 text-xs text-gray-400">
              <div>TIME</div>
              <div>TYPE</div>
              <div>TOTAL</div>
              <div>AMOUNT ETH</div>
              <div>AMOUNT TOKEN</div>
              <div>BY</div>
              <div></div>
            </div>
            <ScrollArea className="flex-1 h-[200px]">
              <div className="divide-y divide-gray-800">
                {trades.map((trade, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_40px]  items-center gap-2 p-3 text-sm hover:bg-gray-900/30"
                  >
                    {/* Time */}
                    <div className="text-gray-400">
                      {formatTimeAgo(trade.timestamp)}
                    </div>

                    {/* Type */}
                    <div className="flex items-center gap-2">
                      {trade.type === "buy" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={
                          trade.type === "buy"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {trade.type}
                      </span>
                    </div>

                    {/* Total with Size Indicator */}
                    <div className="flex items-center gap-2 font-medium">
                      <TradeValueIndicator amount={trade.total} />
                      {trade.total}
                    </div>

                    {/* Amount ETH */}
                    <div
                      className={`font-medium ${trade.type === "buy" ? "text-red-500" : "text-green-500"}`}
                    >
                      {trade.amountETH}
                    </div>

                    {/* Amount Token */}
                    <div
                      className={`font-medium ${trade.type === "sell" ? "text-red-500" : "text-green-500"}`}
                    >
                      {trade.amountToken}
                    </div>

                    {/* Trader */}
                    <div className="font-mono text-[#66B3FF]">{trade.by}</div>

                    {/* External Link */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 hover:bg-gray-800"
                    >
                      <ExternalLink className="size-4 text-gray-400" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="holders" className="mt-0">
            <div className="">
              <div className="bg-muted/40 grid grid-cols-4 gap-4 border-b border-gray-800 p-3 text-xs text-gray-400">
                <div>WALLET</div>
                <div>AMOUNT</div>
                <div>VALUE</div>
                <div className="text-right">SHARE</div>
              </div>
              <ScrollArea className="h-[200px] flex-1">
                <div className="divide-y divide-gray-800">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-4 gap-4 p-3 text-sm hover:bg-gray-900/30"
                      >
                        <span className="flex items-center gap-2">
                          <Avatar name="0x1231232" variant="pixel" size={24} />
                          <div className="font-mono">0x1234...5678</div>
                        </span>
                        <div>1,000,000 GAIA</div>
                        <div>$990,000</div>
                        <div className="text-right">5.23%</div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="mt-0">
            <div className="mt-4 h-[200px] p-4">
              <div className="text-center text-sm text-gray-400">
                Comments section coming soon...
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Column */}
      <div className="col-span-1 divide-y divide-gray-800">
        {/* Buy/Sell Section */}
        <div className="space-y-4 pb-4">
          {/* Buy/Sell Tabs with border */}
          <div className="rounded border border-gray-800">
            <div className="flex">
              <Button
                className={`flex-1 rounded-none ${
                  tradeType === "buy"
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-transparent text-gray-400 hover:bg-gray-800"
                } font-medium`}
                variant={tradeType === "buy" ? "default" : "ghost"}
                onClick={() => setTradeType("buy")}
              >
                Buy
              </Button>
              <Separator orientation="vertical" className="h-10 bg-gray-800" />
              <Button
                className={`flex-1 rounded-none ${
                  tradeType === "sell"
                    ? "bg-primary hover:bg-primary/90"
                    : "bg-transparent text-gray-400 hover:bg-gray-800"
                } font-medium`}
                variant={tradeType === "sell" ? "default" : "ghost"}
                onClick={() => setTradeType("sell")}
              >
                Sell
              </Button>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-4 p-4">
            <div>
              <label className="text-sm font-medium text-gray-400">
                Amount ({tradeType === "buy" ? "ETH" : "GAIA"})
              </label>
              <div className="relative mt-1">
                <Input
                  type="number"
                  placeholder="0.00"
                  className="border-gray-800 bg-transparent font-medium"
                />
                <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                  <span className="font-medium text-gray-400">
                    {tradeType === "buy" ? "ETH" : "GAIA"}
                  </span>
                  {tradeType === "sell" && (
                    <img
                      src="/dummy-token.jpg"
                      alt="Token"
                      className="size-5 rounded-full"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="flex gap-2">
              {[
                tradeType === "buy" ? "0.1 ETH" : "25%",
                tradeType === "buy" ? "0.5 ETH" : "50%",
                tradeType === "buy" ? "1 ETH" : "75%",
                ...(tradeType === "sell" ? ["100%"] : []),
              ].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  className="flex-1 border-gray-800 text-xs font-medium text-gray-400 hover:bg-gray-800"
                >
                  {amount}
                </Button>
              ))}
            </div>

            {/* Place Trade Button */}
            <Button
              className={"bg-primary hover:bg-primary/90 w-full font-medium"}
            >
              Place Trade
            </Button>
          </div>
        </div>

        {/* Bonding Curve Progress */}
        <div className="space-y-2 p-4">
          <h3 className="text-sm font-medium">Bonding Curve Progress</h3>
          <div className="h-2 w-full rounded-full bg-gray-800">
            <div className="bg-primary h-2 w-[46%] rounded-full"></div>
          </div>
          <p className="text-sm font-medium text-gray-400">
            Graduate this coin to Dex at $98,410 market cap.
            <br />
            There is 15.418 ETH in the bonding curve.
          </p>
        </div>

        {/* Token Info Section */}
        <div className="py-4">
          <div className="mb-6 border-b border-gray-800 px-4">
            <span className="flex items-center gap-2">
              <Image
                src="/dummy-token.jpg"
                alt="token-img"
                width={100}
                height={100}
                className="size-10 rounded-full"
              />
              <h2 className="text-lg font-semibold">GAIA Token</h2>
            </span>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm font-medium text-gray-400">
                Created by
              </span>
              <span className="font-mono text-sm text-gray-400">
                0xFZM...0x45
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-6 hover:bg-gray-800"
              >
                <Copy className="size-4 text-gray-400" />
              </Button>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-gray-800 font-medium text-gray-400 hover:bg-gray-800"
              >
                <Globe className="mr-1 size-4" />
                Website
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-gray-800 font-medium text-gray-400 hover:bg-gray-800"
              >
                <Twitter className="mr-1 size-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-gray-800 font-medium text-gray-400 hover:bg-gray-800"
              >
                <Send className="mr-1 size-4" />
                Telegram
              </Button>
            </div>
          </div>

          <div className="space-y-4 px-4">
            <div>
              <h3 className="mb-2 text-sm font-medium">Description</h3>
              <p className="text-sm leading-relaxed text-gray-400">
                The Gaia Token was created with the purpose of strengthening the
                community passionate about the values of the Gaia platform while
                also providing an innovative means of fundraising for the
                development and enhancement of its projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
