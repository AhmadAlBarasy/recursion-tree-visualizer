/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import FactorialFormFields from "./formFields/FactorialFormFields";
import FibonacciFormFields from "./formFields/FibonacciFormFields";
import BinarySearchFormFields from "./formFields/BinarySearchFormFields";
import { useVisualizationContext } from "../hooks/useVisualizationContext";
import { useCanvasContext } from "../hooks/useCanvasContext";

export default function AlgorithmForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    ongoingVisualization,
    setOngoingVisualization,
    selectedAlgorithm,
    setSelectedAlgorithm,
    visualizeFibonacci,
    visualizeFactorial,
    visualizeBinarySearch,
    setAbort,
  } = useVisualizationContext();

  const { setNodes, setEdges } = useCanvasContext();

  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
  };

  const handleAbort = (e: any) => {
    e.preventDefault();
    clearCanvas();
    setAbort(true);
    setOngoingVisualization(false);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setErrorMessage(null);

    if (selectedAlgorithm === 'fibonacci') {
      clearCanvas();
      const n = Number(formData.get("fibN"));
      setAbort(false);
      visualizeFibonacci(n, 'root', 0, -150 * n, 150 * n);
      setOngoingVisualization(true);
      return;
    }

    if (selectedAlgorithm === 'factorial') {
      clearCanvas();
      const n = Number(formData.get("factorialN"));
      setAbort(false);
      visualizeFactorial(n, 'root', 0, 0);
      setOngoingVisualization(true);
      return;
    }

    if (selectedAlgorithm === 'binarySearch') {
      clearCanvas();
      const arrayInput = String(formData.get("binaryArray") ?? "");
      const targetInput = String(formData.get("binaryTarget") ?? "");
      const values = arrayInput
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      if (values.length === 0) {
        setErrorMessage("Please enter a sorted array of integers.");
        setTimeout(() => setErrorMessage(null), 2000);
        return;
      }

      const arr = values.map((item) => Number(item));
      const target = Number(targetInput);

      const invalidNumber = arr.some((value) => Number.isNaN(value) || !Number.isInteger(value));
      if (invalidNumber) {
        setErrorMessage("Array must contain only integers.");
        setTimeout(() => setErrorMessage(null), 2000);
        return;
      }

      if (Number.isNaN(target) || !Number.isInteger(target)) {
        setErrorMessage("Target must be an integer.");
        setTimeout(() => setErrorMessage(null), 2000);
        return;
      }

      const isSorted = arr.every((value, index) => index === 0 || value >= arr[index - 1]);
      if (!isSorted) {
        setErrorMessage("Array must be sorted in ascending order.");
        setTimeout(() => setErrorMessage(null), 2000);
        return;
      }

      setAbort(false);
      visualizeBinarySearch(arr, target, 'root', 0, arr.length - 1, 0);
      setOngoingVisualization(true);
      return;
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
        <option value="binarySearch">Binary Search</option>
      </select>
      {
        selectedAlgorithm === "fibonacci" ? (
            <FibonacciFormFields/>
        ) : selectedAlgorithm === "factorial" ? (
            <FactorialFormFields/>
        ) : selectedAlgorithm === "binarySearch" ? (
            <BinarySearchFormFields />
        ) : null
      }
      {errorMessage && (
        <div className="text-red-400 text-sm bg-red-950/20 p-2 rounded-md">
          {errorMessage}
        </div>
      )}
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
