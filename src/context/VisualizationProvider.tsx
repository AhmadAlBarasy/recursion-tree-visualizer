import { useState, type ReactNode } from "react";
import { VisualizationContext } from "./VisualizationContext";


export function VisualizationProvider({ children }: { children: ReactNode }) {
  const [ongoingVisualization, setOngoingVisualization] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('');

  return (
    <VisualizationContext.Provider
    value={{
        ongoingVisualization,
        setOngoingVisualization,
        selectedAlgorithm,
        setSelectedAlgorithm,
    }}>
      {children}
    </VisualizationContext.Provider>
  );
}