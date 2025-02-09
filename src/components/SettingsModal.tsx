"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTimerContext } from "@/contexts/TimerContext";
import { useState, useEffect } from "react";
import { VisuallyHidden } from "@/components/visually-hidden";
import { Switch } from "./ui/switch";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { settings, updateSettings } = useTimerContext();
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleSave = () => {
    updateSettings(localSettings);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle asChild>
        <VisuallyHidden>Timer Settings</VisuallyHidden>
      </DialogTitle>
      <DialogContent className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg border-gray-700 text-gray-100 p-0 rounded-2xl shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-medium">Configurações</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="focusTime">Duração do foco (em minutos)</Label>
            <Input
              id="focusTime"
              type="number"
              value={localSettings.focusTime}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  focusTime: Number(e.target.value),
                })
              }
              className="bg-gray-700/50 border-gray-600 text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shortBreakTime">
              Duração do descanso curto (em minutos)
            </Label>
            <Input
              id="shortBreakTime"
              type="number"
              value={localSettings.shortBreakTime}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  shortBreakTime: Number(e.target.value),
                })
              }
              className="bg-gray-700/50 border-gray-600 text-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longBreakTime">Duração do descanso longo (em minutos)</Label>
            <Input
              id="longBreakTime"
              type="number"
              value={localSettings.longBreakTime}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  longBreakTime: Number(e.target.value),
                })
              }
              className="bg-gray-700/50 border-gray-600 text-gray-100"
            />
          </div>
          {/*  <div className="space-y-2">
            <Label>Tipo de descanso</Label>
            <RadioGroup
              value={localSettings.breakType}
              onValueChange={(value) =>
                setLocalSettings({
                  ...localSettings,
                  breakType: value as "short" | "long",
                })
              }
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="short" id="short-break" className="bg-gray-200" />
                <Label htmlFor="short-break">Descanso curto</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="long" id="long-break" className="bg-gray-200" />
                <Label htmlFor="long-break">Descanso longo</Label>
              </div>
            </RadioGroup>
          </div> */}
          <div className="space-y-2">
            <Label htmlFor="cyclesBeforeLongBreak">
              Número de sessões de foco antes do descanso longo
            </Label>
            <Input
              id="cyclesBeforeLongBreak"
              type="number"
              min="1"
              max="10"
              value={localSettings.cyclesBeforeLongBreak}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  cyclesBeforeLongBreak: Math.max(
                    1,
                    Math.min(10, Number(e.target.value))
                  ),
                })
              }
              className="bg-gray-700/50 border-gray-600 text-gray-100"
            />
          </div>
          <div className="border-t py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <label className="text-sm font-medium">Mostrar estatísticas</label>
                {/* <p className="text-sm text-muted-foreground">
                  Mostrar estatísticas
                </p> */}
              </div>
              <Switch
                className="bg-white"
                checked={localSettings.betaFeatures.metrics}
                onCheckedChange={(checked) =>
                  setLocalSettings({
                    ...localSettings,
                    betaFeatures: {
                      ...localSettings.betaFeatures,
                      metrics: checked,
                    },
                  })
                }
              />
            </div>
          </div>
          <Button
            onClick={handleSave}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-100 font-semibold"
          >
            Salvar configurações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
