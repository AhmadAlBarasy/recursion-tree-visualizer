/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCanvasContext } from '../hooks/useCanvasContext';
 
export default function Canvas(){

  const { nodes, edges, setNodes, setEdges } = useCanvasContext();

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [setEdges],
  );

  return (
    <div className="
      w-full
      md:w-1/2
      h-1/2 md:h-screen
  ">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodesDraggable={true}
        panOnDrag={true}
        snapToGrid={true}
        panOnScroll={true}
        zoomOnPinch={true}
        zoomOnScroll={false}
        onConnect={() => {}}
        colorMode='dark'
        fitView
      >
        <Background
          gap={20}
          size={1}
          color="#666666"
        />
        <Controls
          position='bottom-left'
          orientation='horizontal'
        />
      </ReactFlow>
    </div>
  );
};