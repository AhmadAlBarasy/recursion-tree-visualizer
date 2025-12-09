/* eslint-disable @typescript-eslint/no-explicit-any */
import FactorialFormFields from "./form fields/FactorialFormFields";
import FibonacciFormFields from "./form fields/FibonacciFormFields";
import { useVisualizationContext } from "../hooks/useVisualizationContext";
import { useVisualization } from "../hooks/useVisualization";
import { useCanvasContext } from "../hooks/useCanvasContext";

export default function AlgorithmForm() {

  const {
    ongoingVisualization,
    setOngoingVisualization,
    selectedAlgorithm, 
    setSelectedAlgorithm
    } = useVisualizationContext();

  const { setNodes, setEdges } = useCanvasContext();
  const { visualizeFibonacci, setAbort } = useVisualization();

  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
  };

  const handleAbort = (e: any) => {
    e.preventDefault();
    setAbort(true);
    setOngoingVisualization(false);
    clearCanvas();
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if(selectedAlgorithm === 'fibonacci'){
      clearCanvas();
      const n = Number(formData.get("fibN"));
      setAbort(false);
      visualizeFibonacci(n, 'root', 0, 0);
      setOngoingVisualization(true);  
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="mySelect" className="text-gray-300 font-medium">
        Choose an algorithm:
      </label>
      <select
        id="mySelect"
        disabled={ongoingVisualization}
        value={selectedAlgorithm}
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
        className="
          bg-gray-800 text-white
          p-2
          rounded-md
          border border-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition
        "
      >
        <option value="">Select</option>
        <option value="fibonacci">Fibonacci</option>
        <option value="factorial">Factorial</option>
      </select>
      {
        selectedAlgorithm === "fibonacci" ? (
            <FibonacciFormFields/>
        ):
        selectedAlgorithm === "factorial" ? (
            <FactorialFormFields/>
        ):
        null
      }
      <button
        type="submit"
        disabled={selectedAlgorithm == ""}
        hidden={ongoingVisualization}
        className="
          bg-blue-600 text-white font-semibold
          py-2 px-4 rounded-md
          hover:bg-blue-700
          disabled:bg-gray-500 disabled:cursor-not-allowed
          transition
        "
      >
        Visualize
      </button>
      <button
        type="button"
        hidden={!ongoingVisualization}
        onClick={handleAbort}
        className="
          bg-red-600 text-white font-semibold
          py-2 px-4 rounded-md
          hover:bg-red-700
          disabled:bg-gray-500 disabled:cursor-not-allowed
          transition
        "
      >
        Abort
      </button>
    </form>
  );
}
