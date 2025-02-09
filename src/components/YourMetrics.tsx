"use client";

import React from "react";
import { useTimerContext } from "@/contexts/TimerContext";
import { Card } from "@/components/ui/card";
import {
  Trophy,
  Clock,
  Calendar,
  CheckCircle2,
  Zap,
  Timer,
  Coffee,
  Target,
} from "lucide-react";

interface MetricItemProps {
  label: string;
  value: string | number;
  className?: string;
  icon?: React.ReactNode;
}

const MetricItem: React.FC<MetricItemProps> = ({
  label,
  value,
  className,
  icon,
}) => (
  <div
    className={`p-4 rounded-lg ${className} transition-all duration-200 hover:scale-105`}
  >
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <div className="text-sm text-gray-300">{label}</div>
    </div>
    <div className="text-2xl font-semibold text-gray-100">
      {typeof value === "number" ? value.toLocaleString() : value}
    </div>
  </div>
);

export const YourMetrics: React.FC = () => {
  const { metrics } = useTimerContext();

  const calculateAverageFocusTime = () => {
    if (metrics.focusSessions === 0) return "0 mins";
    const average = Math.round(metrics.totalFocusTime / metrics.focusSessions);
    return `${average} mins`;
  };

  return (
    <Card className="bg-gray-800/50 backdrop-blur-lg border-gray-700 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-gray-100">Estatísticas</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricItem
            label="Sessões de foco"
            value={metrics.focusSessions}
            className="bg-blue-500/20 hover:bg-blue-500/30"
            icon={<Target className="w-4 h-4 text-blue-400" />}
          />
          {/*           <MetricItem
            label="Total Focus Time"
            value={`${Math.round(metrics.totalFocusTime)} mins`}
            className="bg-green-500/20 hover:bg-green-500/30"
            icon={<Clock className="w-4 h-4 text-green-400" />}
          /> */}
          {/* <MetricItem
            label="Daily Streak"
            value={metrics.dailyStreak}
            className="bg-yellow-500/20 hover:bg-yellow-500/30"
            icon={<Calendar className="w-4 h-4 text-yellow-400" />}
          />
          <MetricItem
            label="Tasks Completed"
            value={metrics.totalTasksCompleted}
            className="bg-purple-500/20 hover:bg-purple-500/30"
            icon={<CheckCircle2 className="w-4 h-4 text-purple-400" />}
          />
          <MetricItem
            label="Best Focus Streak"
            value={metrics.bestFocusStreak}
            className="bg-red-500/20 hover:bg-red-500/30"
            icon={<Trophy className="w-4 h-4 text-red-400" />}
          />
          <MetricItem
            label="Avg. Focus Time"
            value={calculateAverageFocusTime()}
            className="bg-indigo-500/20 hover:bg-indigo-500/30"
            icon={<Timer className="w-4 h-4 text-indigo-400" />}
          /> */}
          <MetricItem
            label="Descansos curtos"
            value={metrics.shortBreaks}
            className="bg-orange-500/20 hover:bg-orange-500/30"
            icon={<Coffee className="w-4 h-4 text-orange-400" />}
          />
          <MetricItem
            label="Descansos longos"
            value={metrics.longBreaks}
            className="bg-teal-500/20 hover:bg-teal-500/30"
            icon={<Zap className="w-4 h-4 text-teal-400" />}
          />
        </div>
      </div>
    </Card>
  );
};
