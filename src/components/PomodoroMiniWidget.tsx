"use client";

import { motion } from "framer-motion";
import { Eye, Coffee } from "lucide-react";

interface PomodoroMiniWidgetProps {
  time: number;
  mode: "focus" | "shortBreak" | "longBreak";
  isVisible: boolean;
  onClick: () => void;
}

export function PomodoroMiniWidget({
  time,
  mode,
  isVisible,
  onClick,
}: PomodoroMiniWidgetProps) {
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progress =
    1 - time / ((mode === "focus" ? 25 : mode === "shortBreak" ? 5 : 15) * 60);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-4 right-4 bg-gray-800 bg-opacity-30 border-gray-700 backdrop-filter backdrop-blur-lg rounded-full shadow-lg border cursor-pointer z-50 p-2"
      onClick={onClick}
    >
      <div className="relative w-16 h-16">
        <svg className="absolute transform -rotate-90 w-full h-full">
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="rgba(75, 85, 99, 0.3)"
            strokeWidth="4"
          />
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="rgba(209, 213, 219, 0.8)"
            strokeWidth="4"
            strokeDasharray={2 * Math.PI * 30}
            strokeDashoffset={2 * Math.PI * 30 * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center ">
          {mode === "focus" ? (
            <Eye className="w-4 h-4 text-primary mb-1 text-white" />
          ) : (
            <Coffee className="w-4 h-4 text-primary mb-1 text-white" />
          )}
          <span className="text-xs font-medium text-white">
            {formatTime(time)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
