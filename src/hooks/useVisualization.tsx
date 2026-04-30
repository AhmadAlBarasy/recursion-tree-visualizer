import { useRef } from "react";
import { useCanvasContext } from "./useCanvasContext";
import { useVisualizationContext } from "./useVisualizationContext";
import { useReactFlow } from "@xyflow/react";

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export function useVisualization() {
  const { setNodes, setEdges } = useCanvasContext();
  const { setOngoingVisualization } = useVisualizationContext();
  const { setCenter } = useReactFlow();

  const abortRef = useRef(false);
  const activeRunRef = useRef(0);

  const startRun = () => {
    abortRef.current = false;
    activeRunRef.current += 1;
    return activeRunRef.current;
  };

  const shouldAbort = (runId: number) => {
    return abortRef.current || activeRunRef.current !== runId;
  };

  const setAbort = (bool: boolean) => {
    if (bool) {
      abortRef.current = true;
    }
  };

  const visualizeFactorial = async (
    n: number,
    id: string,
    x: number,
    y: number,
    runId: number = startRun(),
  ): Promise<number> => {

    if (shouldAbort(runId)) return 0;

    setNodes((nodes) => [
      ...nodes,
      {
        id,
        position: { x, y },
        data: { label: `fact(${n})` },
        style: { width: 60 },
      },
    ]);

    setCenter(x, y, { zoom: 1, duration: 1000 });

    if(id !== 'root'){
      setEdges((edges) => {
        return [
          ...edges,
          {
            id,
            source: `${id.substring(0, id.length - 2)}`, // parent
            target: id, // current node
            markerEnd: {
              type: 'arrow',
              color: '#888',
                width: 25,
                height: 25,
            }
          }
        ]
      });
    }

    if (n == 1) return n;
    
    await delay(1500);
    if (shouldAbort(runId)) return 0;

    const childRes = await visualizeFactorial(n - 1, `${id}_C`, x, y + 100, runId) * n;
    
    if (shouldAbort(runId)) return 0;
    if(id === 'root' && runId === activeRunRef.current){
      setOngoingVisualization(false);
    }

    return n * childRes;

  }

  const visualizeFibonacci = async (
    n: number,
    id: string,
    y: number,
    minX: number,
    maxX: number,
    runId: number = startRun(),
  ): Promise<number> => {

    if (shouldAbort(runId)) return 0;

    const x = (minX + maxX) / 2;

    setNodes((nodes) => [
      ...nodes,
      {
        id,
        position: { x, y },
        data: { label: `fib(${n})` },
        style: { width: 60 },
      },
    ]);

    setCenter(x, y, { zoom: 1, duration: 1000 });

    if(id !== 'root'){
      setEdges((edges) => {
        return [
          ...edges,
          {
            id,
            source: `${id.substring(0, id.length - 2)}`, // parent
            target: id, // current node
            markerEnd: {
              type: 'arrow',
              color: '#888',
                width: 25,
                height: 25,
            }
          }
        ]
      });
    }

    if (n <= 1) return n;
    
    await delay(1500);
    if (shouldAbort(runId)) return 0;

    const leftResult = await visualizeFibonacci(
      n - 1,
      `${id}_L`,
      y + 100,
      minX - 50,
      (minX + maxX) / 2,
      runId,
    );
    await delay(1500);
    if (shouldAbort(runId)) return 0;
    const rightResult = await visualizeFibonacci(
      n - 2,
      `${id}_R`,
      y + 100,
      100 + ((minX + maxX) / 2),
      maxX,
      runId,
    );

    if (shouldAbort(runId)) return 0;
    if(id === 'root' && runId === activeRunRef.current){
      setOngoingVisualization(false);
    }

    return leftResult + rightResult;
  };

  return { visualizeFibonacci, visualizeFactorial, setAbort };
}
