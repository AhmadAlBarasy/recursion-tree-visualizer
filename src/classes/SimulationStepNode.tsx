
export type action = 'create' | 'delete';

export type Position = {
  x: number;
  y: number;
};

export type SimulationStep = {
  text: string;
  nodeId: string;
  action: action;
  position: Position;
  parentId?: string;
};

class SimulationStepNode {
  data: SimulationStep;
  next: SimulationStepNode | null = null;
  prev: SimulationStepNode | null = null;

  constructor(data: SimulationStep) {
    this.data = data;
  }
}

export default SimulationStepNode;