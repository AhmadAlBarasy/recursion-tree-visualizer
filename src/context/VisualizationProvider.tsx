import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import { VisualizationContext } from "./VisualizationContext";
import { useCanvasContext } from "../hooks/useCanvasContext";
import { useReactFlow } from "@xyflow/react";
import SimulationStepNode from "../classes/SimulationStepNode";
import type { SimulationStep } from "../classes/SimulationStepNode";

function createStepNode(data: SimulationStep) {
  return new SimulationStepNode(data);
}

function buildFactorialSteps(
  n: number,
  id: string,
  x: number,
  y: number,
  parentId?: string,
) {
  const rootStep = createStepNode({
    nodeId: id,
    text: `fact(${n})`,
    action: "create",
    position: { x, y },
    parentId,
  });

  let tail = rootStep;

  if (n > 1) {
    const child = buildFactorialSteps(n - 1, `${id}_C`, x, y + 100, id);
    tail.next = child.head;
    child.head.prev = tail;
    tail = child.tail;
  }

  const deleteStep = createStepNode({
    nodeId: id,
    text: `fact(${n})`,
    action: "delete",
    position: { x, y },
    parentId,
  });

  tail.next = deleteStep;
  deleteStep.prev = tail;
  tail = deleteStep;

  return { head: rootStep, tail };
}

function buildFibonacciSteps(
  n: number,
  id: string,
  y: number,
  minX: number,
  maxX: number,
  parentId?: string,
) {
  const x = (minX + maxX) / 2;
  const rootStep = createStepNode({
    nodeId: id,
    text: `fib(${n})`,
    action: "create",
    position: { x, y },
    parentId,
  });

  let tail = rootStep;

  if (n > 1) {
    const left = buildFibonacciSteps(
      n - 1,
      `${id}_L`,
      y + 100,
      minX - 50,
      (minX + maxX) / 2,
      id,
    );
    tail.next = left.head;
    left.head.prev = tail;
    tail = left.tail;

    const right = buildFibonacciSteps(
      n - 2,
      `${id}_R`,
      y + 100,
      100 + (minX + maxX) / 2,
      maxX,
      id,
    );
    tail.next = right.head;
    right.head.prev = tail;
    tail = right.tail;
  }

  const deleteStep = createStepNode({
    nodeId: id,
    text: `fib(${n})`,
    action: "delete",
    position: { x, y },
    parentId,
  });

  tail.next = deleteStep;
  deleteStep.prev = tail;
  tail = deleteStep;

  return { head: rootStep, tail };
}

function buildBinarySearchSteps(
  arr: number[],
  target: number,
  id: string,
  left: number,
  right: number,
  y: number,
  minX: number,
  maxX: number,
  parentId?: string,
) {
  const x = (minX + maxX) / 2;
  const text = `binarySearch(${left}, ${right}, arr)`;

  const rootStep = createStepNode({
    nodeId: id,
    text,
    action: "create",
    position: { x, y },
    parentId,
  });

  let tail = rootStep;

  if (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = arr[mid];

    if (target < midValue) {
      const leftBranch = buildBinarySearchSteps(
        arr,
        target,
        `${id}_L`,
        left,
        mid - 1,
        y + 100,
        minX,
        x - 50,
        id,
      );
      tail.next = leftBranch.head;
      leftBranch.head.prev = tail;
      tail = leftBranch.tail;
    } else if (target > midValue) {
      const rightBranch = buildBinarySearchSteps(
        arr,
        target,
        `${id}_R`,
        mid + 1,
        right,
        y + 100,
        x + 50,
        maxX,
        id,
      );
      tail.next = rightBranch.head;
      rightBranch.head.prev = tail;
      tail = rightBranch.tail;
    }
  }

  const deleteStep = createStepNode({
    nodeId: id,
    text,
    action: "delete",
    position: { x, y },
    parentId,
  });

  tail.next = deleteStep;
  deleteStep.prev = tail;
  tail = deleteStep;

  return { head: rootStep, tail };
}

export function VisualizationProvider({ children }: { children: ReactNode }) {
  const [ongoingVisualization, setOngoingVisualization] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepListHead, setStepListHead] = useState<SimulationStepNode | null>(null);
  const [currentStep, setCurrentStep] = useState<SimulationStepNode | null>(null);

  const { setNodes, setEdges } = useCanvasContext();
  const { setCenter } = useReactFlow();
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const applySimulationStep = useCallback((step: SimulationStepNode) => {
    const { nodeId, text, position, parentId, action } = step.data;

    if (action === "create") {
      setNodes((nodes) => [
        ...nodes,
        {
          id: nodeId,
          position,
          data: { label: text, },
          style: { width: 60 },
        },
      ]);

      if (parentId) {
        setEdges((edges) => [
          ...edges,
          {
            id: `edge-${nodeId}`,
            source: parentId,
            target: nodeId,
            markerEnd: {
              type: "arrow",
              color: "#888",
              width: 25,
              height: 25,
            },
          },
        ]);
      }

      setCenter(position.x, position.y, { zoom: 1, duration: 1000 });
      return;
    }

    setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
    setEdges((edges) =>
      edges.filter(
        (edge) =>
          edge.id !== `edge-${nodeId}` && edge.source !== nodeId && edge.target !== nodeId,
      ),
    );
      setCenter(position.x, position.y, { zoom: 1, duration: 1000 });
  }, [setCenter, setEdges, setNodes]);

  const revertSimulationStep = useCallback((step: SimulationStepNode) => {
    const { nodeId, text, position, parentId, action } = step.data;

    if (action === "create") {
      setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
      setEdges((edges) =>
        edges.filter(
          (edge) =>
            edge.id !== `edge-${nodeId}` && edge.source !== nodeId && edge.target !== nodeId,
        ),
      );
      setCenter(position.x, position.y, { zoom: 1, duration: 1000 });
      return;
    }

    setNodes((nodes) => [
      ...nodes,
      {
        id: nodeId,
        position,
        data: { label: text },
        style: { width: 60 },
      },
    ]);

    if (parentId) {
      setEdges((edges) => [
        ...edges,
        {
          id: `edge-${nodeId}`,
          source: parentId,
          target: nodeId,
          markerEnd: {
            type: "arrow",
            color: "#888",
            width: 25,
            height: 25,
          },
        },
      ]);
    }

    setCenter(position.x, position.y, { zoom: 1, duration: 1000 });
  }, [setCenter, setEdges, setNodes]);

  const canGoPrevious = currentStep !== null;
  const canGoNext = stepListHead !== null && (currentStep ? currentStep.next !== null : true);

  const goNextStep = () => {
    if (!stepListHead) return;

    const nextStep = currentStep ? currentStep.next : stepListHead;
    if (!nextStep) return;

    applySimulationStep(nextStep);
    setCurrentStep(nextStep);
  };

  const goPreviousStep = () => {
    if (!currentStep) return;
    revertSimulationStep(currentStep);
    setCurrentStep(currentStep.prev);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!stepListHead) return;
    setIsPlaying((current) => !current);
    setOngoingVisualization(true);
  };

  const setAbort = useCallback((bool: boolean) => {
    if (!bool) return;
    clearTimer();
    setIsPlaying(false);
    setCurrentStep(null);
    setStepListHead(null);
    setOngoingVisualization(false);
  }, [clearTimer]);

  useEffect(() => {

    if (!isPlaying || !stepListHead) return;

    const nextStep = currentStep ? currentStep.next : stepListHead;
    if (!nextStep) {
      return;
    }

    clearTimer();
    timerRef.current = window.setTimeout(() => {
      applySimulationStep(nextStep);
      setCurrentStep(nextStep);
      if (nextStep.next === null) {
        setAbort(true);
      }
    }, 1200);

    return clearTimer;
  }, [isPlaying, currentStep, stepListHead, applySimulationStep, clearTimer, setAbort]);

  const visualizeFactorial = (n: number, id: string, x: number, y: number) => {
    const steps = buildFactorialSteps(n, id, x, y);
    clearTimer();
    setStepListHead(steps.head);
    setCurrentStep(null);
    setOngoingVisualization(true);
    setIsPlaying(true);
  };

  const visualizeFibonacci = (n: number, id: string, y: number, minX: number, maxX: number) => {
    const steps = buildFibonacciSteps(n, id, y, minX, maxX);
    clearTimer();
    setStepListHead(steps.head);
    setCurrentStep(null);
    setOngoingVisualization(true);
    setIsPlaying(true);
  };

  const visualizeBinarySearch = (
    arr: number[],
    target: number,
    id: string,
    left: number,
    right: number,
    y: number,
    minX: number,
    maxX: number,
  ) => {
    const steps = buildBinarySearchSteps(arr, target, id, left, right, y, minX, maxX);
    clearTimer();
    setStepListHead(steps.head);
    setCurrentStep(null);
    setOngoingVisualization(true);
    setIsPlaying(true);
  };

  return (
    <VisualizationContext.Provider
      value={{
        ongoingVisualization,
        setOngoingVisualization,
        selectedAlgorithm,
        setSelectedAlgorithm,
        isPlaying,
        togglePlay,
        goNextStep,
        goPreviousStep,
        visualizeFibonacci,
        visualizeFactorial,
        visualizeBinarySearch,
        setAbort,
        canGoNext,
        canGoPrevious,
      }}
    >
      {children}
    </VisualizationContext.Provider>
  );
}
