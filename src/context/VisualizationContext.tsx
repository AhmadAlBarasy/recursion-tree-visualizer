import { createContext } from "react";

export type VisualizationContextType = {
  ongoingVisualization: boolean;
  setOngoingVisualization: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAlgorithm: string;
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<string>>;
  isPlaying: boolean;
  togglePlay: () => void;
  goNextStep: () => void;
  goPreviousStep: () => void;
  visualizeFibonacci: (n: number, id: string, y: number, minX: number, maxX: number) => void;
  visualizeFactorial: (n: number, id: string, x: number, y: number) => void;
  setAbort: (bool: boolean) => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
};

export const VisualizationContext = createContext<VisualizationContextType | null>(null);