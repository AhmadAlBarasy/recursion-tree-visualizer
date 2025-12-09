import { useContext } from "react";
import { VisualizationContext } from "../context/VisualizationContext";

export function useVisualizationContext (){
  const visualizationContext = useContext(VisualizationContext);
  if (!visualizationContext){
    throw new Error("No visualization context provided");
  }
  return visualizationContext;
}