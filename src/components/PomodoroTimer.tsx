"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import {
  Eye,
  Settings2,
  RotateCcw,
  Coffee,
  Play,
  Pause,
  SkipForward,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsModal } from "./SettingsModal";
import { DevTools } from "./DevTools";
import { useTimerContext } from "@/contexts/TimerContext";
import { motion, AnimatePresence } from "framer-motion";
import { PomodoroMiniWidget } from "./PomodoroMiniWidget";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type TimerMode = "focus" | "shortBreak" | "longBreak";

const ProgressCircle = memo(({ progress }: { progress: number }) => (
  <svg className="absolute transform -rotate-90 w-full h-full">
    <circle
      cx="150"
      cy="150"
      r="145"
      fill="none"
      stroke="rgba(75, 85, 99, 0.3)"
      strokeWidth="10"
    />
    <circle
      cx="150"
      cy="150"
      r="145"
      fill="none"
      stroke="rgba(209, 213, 219, 0.8)"
      strokeWidth="10"
      strokeDasharray={2 * Math.PI * 145}
      strokeDashoffset={2 * Math.PI * 145 * (1 - progress)}
      strokeLinecap="round"
      style={{
        transition: "stroke-dashoffset 0.5s ease",
        willChange: "stroke-dashoffset",
      }}
    />
  </svg>
));

ProgressCircle.displayName = "ProgressCircle";

const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const TimerDisplay = memo(
  ({
    time,
    mode,
    cycleCount,
  }: {
    time: number;
    mode: TimerMode;
    cycleCount: number;
  }) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center"
        >
          {mode === "focus" ? (
            <Eye className="w-5 h-5 mb-2 opacity-60" />
          ) : (
            <Coffee className="w-5 h-5 mb-2 opacity-60" />
          )}
          <div className="text-6xl font-light tracking-wider mb-1">
            {formatTime(time)}
          </div>
          <div className="text-sm tracking-[0.2em] opacity-60 mb-2">
            {mode === "focus"
              ? "FOCO"
              : mode === "shortBreak"
                ? "DESCANSO CURTO"
                : "DESCANSO LONGO"}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <TooltipProvider key={i}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className={`w-1 h-1 rounded-full ${i < cycleCount ? "bg-gray-200" : "bg-gray-400/60"
                    }`}
                />
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {`${cycleCount} cycles completed`}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  )
);

TimerDisplay.displayName = "TimerDisplay";

export default function PomodoroTimer() {
  const { settings, updateMetrics, metrics } = useTimerContext();
  const [time, setTime] = useState(settings.focusTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mode, setMode] = useState<TimerMode>("focus");
  const [cycleCount, setCycleCount] = useState(0);
  const [timerSpeed, setTimerSpeed] = useState(1);
  const [showDevTools, setShowDevTools] = useState(false);
  const [autoStart, setAutoStart] = useState(true);
  const [showMiniWidget, setShowMiniWidget] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  // const lastTimeRef = useRef(time);

  const timerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const progress = 1 - time / (settings[`${mode}Time`] * 60);

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setMode(newMode);
      // Only set initial time if we're starting fresh
      if (time === 0) {
        setTime(settings[`${newMode}Time`] * 60);
      }
      if (autoStart) {
        setIsActive(true);
      }
    },
    [settings, autoStart, time]
  );

  const nextMode = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.warn("Audio playback failed:", error);
      });
    }

    setIsActive(false);

    if (mode === "focus") {
      const newCycleCount = (cycleCount + 1) % settings.cyclesBeforeLongBreak;
      const shouldTakeLongBreak = newCycleCount === 0;
      const breakMode = shouldTakeLongBreak ? "longBreak" : "shortBreak";
      const newDuration = settings[`${breakMode}Time`] * 60;

      setMode(breakMode);
      setTime(newDuration);
      setCycleCount(newCycleCount);

      if (autoStart) {
        setIsActive(true);
      }
    } else {
      setMode("focus");
      setTime(settings.focusTime * 60);

      if (autoStart) {
        setIsActive(true);
      }
    }
  }, [mode, settings, autoStart, cycleCount]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = Math.max(prevTime - timerSpeed, 0);
          if (newTime === 0) {
            console.log('TIMEEEE')
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch((error) => {
                console.warn("Audio playback failed:", error);
              })
            };
            setIsActive(false);
            setTimeout(() => {
              if (mode === "focus") {
                const newCycleCount =
                  (cycleCount + 1) % settings.cyclesBeforeLongBreak;
                const shouldTakeLongBreak = newCycleCount === 0;
                const breakMode = shouldTakeLongBreak
                  ? "longBreak"
                  : "shortBreak";

                updateMetrics("focusSessions", 0.5);
                updateMetrics("totalFocusTime", 25 / 2);

                // Update streaks
                updateMetrics("dailyStreak", metrics.dailyStreak + 1);
                if (metrics.dailyStreak + 1 > metrics.bestFocusStreak) {
                  updateMetrics("bestFocusStreak", metrics.dailyStreak + 1);
                }

                if (shouldTakeLongBreak) {
                  updateMetrics("longBreaks", 0.5);
                }

                setMode(breakMode);
                setTime(settings[`${breakMode}Time`] * 60);
                setCycleCount(newCycleCount);

                if (autoStart) {
                  setIsActive(true);
                }
              } else {
                if (mode === "shortBreak") {
                  updateMetrics("shortBreaks", 0.5);
                }
                setMode("focus");
                setTime(settings.focusTime * 60);

                if (autoStart) {
                  setIsActive(true);
                }
              }
            }, 0);
          }
          return newTime;
        });
      }, 1000 / timerSpeed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isActive,
    time,
    timerSpeed,
    mode,
    settings,
    cycleCount,
    autoStart,
    updateMetrics,
    metrics,
  ]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowMiniWidget(!entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const currentRef = timerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // useEffect(() => {
  //   if (!isActive) {
  //     const timeSpent = lastTimeRef.current - time;
  //     if (timeSpent > 0) {
  //       if (mode === "focus") {
  //         updateMetrics("totalFocusTime", Math.floor(timeSpent / 60));
  //       } else {
  //         updateMetrics("totalBreakTime", Math.floor(timeSpent / 60));
  //       }
  //     }
  //   }
  //   lastTimeRef.current = time;
  // }, [isActive, time, mode, updateMetrics]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTime(settings[`${mode}Time`] * 60);
  };

  const handleSpeedChange = (speed: number) => {
    setTimerSpeed(speed);
  };

  const handleModeChange = (newMode: TimerMode) => {
    if (newMode !== "focus") {
      newMode = settings.breakType === "short" ? "shortBreak" : "longBreak";
    }
    switchMode(newMode);
  };

  const handleCycleChange = (cycle: number) => {
    setCycleCount(cycle);
  };

  const scrollToTimer = () => {
    timerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const containerClasses = "transform-gpu will-change-transform";
  const progressCircleClasses = "transform-gpu will-change-transform";

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <>
      <div
        className={`${containerClasses} bg-gray-800 relative max-h-[32rem] bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-700 w-full `}
        ref={timerRef}
      >
        <div className="relative flex flex-col items-center">
          <div className="relative w-done h-[300px]">

            {/* Progress circle */}
            <div
              className={`${progressCircleClasses} relative w-[300px] h-[300px]`}
            >
              <svg className="absolute transform -rotate-90 w-full h-full">
                <circle
                  cx="150"
                  cy="150"
                  r="145"
                  fill="none"
                  stroke="rgba(75, 85, 99, 0.3)"
                  strokeWidth="10"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="145"
                  fill="none"
                  stroke="rgba(209, 213, 219, 0.8)"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 145}
                  strokeDashoffset={2 * Math.PI * 145 * (1 - progress)}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>
            </div>

            {/* Timer content */}
            <TimerDisplay time={time} mode={mode} cycleCount={cycleCount} />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 md:gap-4 mt-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={resetTimer}
              className="rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 hover:text-gray-200 w-10 h-10 p-0"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={toggleTimer}
              className="rounded-full bg-gray-700/50 hover:bg-gray-600/50 hover:text-gray-200 text-gray-200 px-8 h-10"
            >
              {isActive ? (
                <Pause className="w-4 h-4 mr-2" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isActive ? "PAUSAR" : "INICIAR"}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextMode}
              className="rounded-full bg-gray-700/50 hover:bg-gray-600/50 hover:text-gray-200 text-gray-200 w-10 h-10 p-0"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(true)}
              className="rounded-full bg-gray-700/50 hover:bg-gray-600/50 hover:text-gray-200 text-gray-200 w-10 h-10 p-0"
            >
              <Settings2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 hover:text-gray-200 w-10 h-10 p-0"
            >
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </Button>
          </div>

          {/* Auto-start toggle */}
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="autoStart"
              checked={autoStart}
              onChange={(e) => setAutoStart(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="autoStart" className="text-gray-300 text-sm">
              Iniciar automaticamente a próxima sessão?
            </label>
          </div>


        </div>
        <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
      </div>
      {/* <PomodoroMiniWidget
        time={time}
        mode={mode}
        isVisible={showMiniWidget}
        onClick={scrollToTimer}
      /> */}
      <audio ref={audioRef} src="/bell2.wav" preload="auto" />
    </>
  );
}
