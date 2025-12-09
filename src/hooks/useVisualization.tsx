import { useRef } from "react";
import { useCanvasContext } from "./useCanvasContext";
import { useVisualizationContext } from "./useVisualizationContext";
import { useReactFlow } from "@xyflow/react";

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export function useVisualization() {
  const { setNodes, setEdges } = useCanvasContext();
  const { setOngoingVisualization } = useVisualizationContext();
  const { fitView } = useReactFlow();

  const abortRef = useRef(false);

  const setAbort = (bool: boolean) => {
    abortRef.current = bool;
  };

  const visualizeFibonacci = async (
    n: number,
    id: string,
    x: number,
    y: number,
  ): Promise<number> => {

    if (abortRef.current) return 0;

    setNodes((nodes) => [
      ...nodes,
      {
        id,
        position: { x, y },
        data: { label: `fib(${n})` },
      },
    ]);

    if(id !== 'root'){
      setEdges((edges) => {
        return [
          ...edges,
          {
            id,
            source: `${id.substring(0, id.length - 2)}`, // parent
            target: id, // current node 
          }
        ]
      });
    }

    if (n <= 1) return n;
    
    fitView();
    await delay(1000);

    const right = await visualizeFibonacci(n - 1, `${id}_L`, x - (100 * n), y + 100);
    await delay(1500);
    const left = await visualizeFibonacci(n - 2, `${id}_R`, x + (100 * 0.75 * n), y + 200);

    if(id === 'root'){
      setOngoingVisualization(false);
    }

    return  right + left;
  };

  return { visualizeFibonacci, setAbort };
}
