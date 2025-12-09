import type { Node, Edge } from "@xyflow/react";
import { useState, type ReactNode } from "react";
import { CanvasContext } from "./CanvasContext";
import { ReactFlowProvider } from '@xyflow/react';

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export function CanvasProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  return (
    <ReactFlowProvider>
      <CanvasContext.Provider value={{ nodes, edges, setNodes, setEdges }}>
        {children}
      </CanvasContext.Provider>
    </ReactFlowProvider>
  );
}