import { useVisualizationContext } from "../../hooks/useVisualizationContext";

export default function FactorialFormFields() {

  const { ongoingVisualization } = useVisualizationContext();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="factorialN" className="text-gray-300 font-medium">
        Enter a non-negative integer between 1 and 50:
      </label>
      <input
        id="factorialN"
        type="number"
        disabled={ongoingVisualization}
        step="1"
        min="0"
        max="50"
        placeholder="e.g. 6"
        required
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
