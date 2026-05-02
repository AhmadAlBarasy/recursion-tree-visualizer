import { useVisualizationContext } from "../../hooks/useVisualizationContext";

export default function FibonacciFormFields() {

  const { ongoingVisualization } = useVisualizationContext();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="fibN" className="text-gray-300 font-medium">
        Enter a non-negative integer between 1 and 5:
      </label>
      <input
        id="fibN"
        name="fibN"
        type="number"
        min={1}
        step={1}
        max={5}
        required
        disabled={ongoingVisualization}
        placeholder="e.g. 5"
        className="
          bg-gray-800 text-white
          p-2
          rounded-md
          border border-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition
        "
      />
    </div>
  );
}
