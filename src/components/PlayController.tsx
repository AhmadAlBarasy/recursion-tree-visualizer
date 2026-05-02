import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useVisualizationContext } from "../hooks/useVisualizationContext";

export default function PlayController() {
  const {
    isPlaying,
    togglePlay,
    goNextStep,
    goPreviousStep,
    canGoNext,
    canGoPrevious,
  } = useVisualizationContext();

  return (
    <div className="mt-4 bg-gray-900/90 w-fit rounded-3xl p-2 mx-auto">
      <div className="flex items-center justify-center gap-2">
        <button
          type="button"
          aria-label="Previous step"
          disabled={!canGoPrevious}
          onClick={goPreviousStep}
          className="grid place-items-center w-11 h-11 bg-gray-800 text-white rounded-2xl border border-gray-700 hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label={isPlaying ? "Pause visualization" : "Resume visualization"}
          onClick={togglePlay}
          className="grid place-items-center w-12 h-12 bg-violet-600 text-white rounded-2xl border border-violet-700 hover:bg-violet-700 transition"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        <button
          type="button"
          aria-label="Next step"
          disabled={!canGoNext}
          onClick={goNextStep}
          className="grid place-items-center w-11 h-11 bg-gray-800 text-white rounded-2xl border border-gray-700 hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
