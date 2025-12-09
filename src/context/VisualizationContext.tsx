import { createContext } from "react";

export type VisualizationContextType = {
  ongoingVisualization: boolean,
  setOngoingVisualization: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAlgorithm: string,
  setSelectedAlgorithm: React.Dispatch<React.SetStateAction<string>>;
};

export const VisualizationContext = createContext<VisualizationContextType | null>(null);