
type SimulationStep = {
  text: string;
  nodeId: string;
};

class LinkedListNode {
  data: SimulationStep;
  next: LinkedListNode | null = null;
  prev: LinkedListNode | null = null;

  constructor(data: SimulationStep) {
    this.data = data;
  }
}

export default LinkedListNode;