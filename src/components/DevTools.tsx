"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DevToolsProps {
  onSpeedChange: (speed: number) => void;
  onModeChange: (mode: "focus" | "shortBreak" | "longBreak") => void;
  onCycleChange: (cycle: number) => void;
  breakType: "short" | "long";
}

export function DevTools({
  onSpeedChange,
  onModeChange,
  onCycleChange,
  breakType,
}: DevToolsProps) {
  return (
    <div className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-gray-700 mt-4">
      <h3 className="text-lg font-medium text-gray-100 mb-4">Dev Tools</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="speed" className="text-gray-200">
            Timer Speed (x)
          </Label>
          <Input
            id="speed"
            type="number"
            min="1"
            max="1000"
            defaultValue="1"
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="bg-gray-700/50 border-gray-600 text-gray-100"
          />
        </div>
        <div>
          <Label className="text-gray-200">Force Mode</Label>
          <div className="flex space-x-2 mt-1">
            <Button
              onClick={() => onModeChange("focus")}
              variant="outline"
              size="sm"
            >
              Focus
            </Button>
            <Button
              onClick={() =>
                onModeChange(breakType === "short" ? "shortBreak" : "longBreak")
              }
              variant="outline"
              size="sm"
            >
              Break
            </Button>
          </div>
        </div>
        <div>
          <Label htmlFor="cycle" className="text-gray-200">
            Set Cycle Count
          </Label>
          <Input
            id="cycle"
            type="number"
            min="0"
            max="3"
            defaultValue="0"
            onChange={(e) => onCycleChange(Number(e.target.value))}
            className="bg-gray-700/50 border-gray-600 text-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
