"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

interface TimerSettings {
  focusTime: number;
  shortBreakTime: number;
  longBreakTime: number;
  cyclesBeforeLongBreak: number;
  breakType: "short" | "long";
  betaFeatures: {
    metrics: boolean;
  };
}

interface TimerMetrics {
  focusSessions: number;
  shortBreaks: number;
  longBreaks: number;
  totalFocusTime: number;
  totalBreakTime: number;
  lastUpdated: Date;
  dailyStreak: number;
  totalTasksCompleted: number;
  bestFocusStreak: number;
}

interface TimerContextType {
  settings: TimerSettings;
  updateSettings: (newSettings: Partial<TimerSettings>) => void;
  metrics: TimerMetrics;
  updateMetrics: (type: keyof TimerMetrics, value: number) => void;
  resetMetrics: () => void;
}

const defaultSettings: TimerSettings = {
  focusTime: 25,
  shortBreakTime: 5,
  longBreakTime: 15,
  cyclesBeforeLongBreak: 4,
  breakType: "short",
  betaFeatures: {
    metrics: false,
  },
};

const defaultMetrics: TimerMetrics = {
  focusSessions: 0,
  shortBreaks: 0,
  longBreaks: 0,
  totalFocusTime: 0,
  totalBreakTime: 0,
  lastUpdated: new Date(),
  dailyStreak: 0,
  totalTasksCompleted: 0,
  bestFocusStreak: 0,
};

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<TimerSettings>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("timerSettings");
      return saved ? JSON.parse(saved) : defaultSettings;
    }
    return defaultSettings;
  });

  const [metrics, setMetrics] = useState<TimerMetrics>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("timerMetrics");
      return saved ? JSON.parse(saved) : defaultMetrics;
    }
    return defaultMetrics;
  });

  const updateSettings = (newSettings: Partial<TimerSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("timerSettings", JSON.stringify(updated));
      return updated;
    });
  };

  const updateMetrics = (type: keyof TimerMetrics, value: number) => {
    setMetrics((prev) => {
      const updated = {
        ...prev,
        [type]:
          type === "lastUpdated"
            ? new Date()
            : type === "dailyStreak" ||
              type === "totalTasksCompleted" ||
              type === "bestFocusStreak"
            ? value
            : prev[type] + value,
      };
      localStorage.setItem("timerMetrics", JSON.stringify(updated));
      return updated;
    });
  };

  const resetMetrics = () => {
    setMetrics(defaultMetrics);
    localStorage.setItem("timerMetrics", JSON.stringify(defaultMetrics));
  };

  return (
    <TimerContext.Provider
      value={{ settings, updateSettings, metrics, updateMetrics, resetMetrics }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error("useTimerContext must be used within a TimerProvider");
  }
  return context;
}
