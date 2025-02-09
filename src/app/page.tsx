"use client";

import PomodoroTimer from "@/components/PomodoroTimer";
import KanbanBoard from "@/components/KanbanBoard";
import { TimerProvider, useTimerContext } from "@/contexts/TimerContext";
import { SpotifyWidget } from "@/components/SpotifyWidget";
import { Footer } from "@/components/Footer";
import { YourMetrics } from "@/components/YourMetrics";

function AppContent() {
  const { settings } = useTimerContext();

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <main className="flex-grow p-3">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-medium text-gray-100 text-center">
            Pomokan
          </h1>
          <div className="flex flex-col gap-5">
            <PomodoroTimer />
            {/* <SpotifyWidget /> */}

            <div className="md:col-span-2">
              <KanbanBoard />
            </div>
            {settings.betaFeatures.metrics && (
              <div className="md:col-span-2">
                <YourMetrics />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <TimerProvider>
      <AppContent />
    </TimerProvider>
  );
}
