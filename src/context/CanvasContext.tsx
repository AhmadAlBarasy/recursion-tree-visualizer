import { createContext } from "react";
import type { Node, Edge } from "@xyflow/react";

export type CanvasContextType = {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);
