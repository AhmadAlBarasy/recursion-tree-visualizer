import { useContext } from "react";
import { CanvasContext } from "../context/CanvasContext";

export function useCanvasContext (){
  const canvasContext = useContext(CanvasContext);
  if (!canvasContext){
    throw new Error("No canvas context provided");
  }
  return canvasContext;
}