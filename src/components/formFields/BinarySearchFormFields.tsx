import { useVisualizationContext } from "../../hooks/useVisualizationContext";

export default function BinarySearchFormFields() {
  const { ongoingVisualization } = useVisualizationContext();

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="binaryArray" className="text-gray-300 font-medium">
        Enter a sorted array of integers, separated by commas:
      </label>
      <input
        id="binaryArray"
        name="binaryArray"
        type="text"
        disabled={ongoingVisualization}
        placeholder="e.g. 1, 3, 5, 7, 9"
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
      <label htmlFor="binaryTarget" className="text-gray-300 font-medium">
        Enter the target integer to search for:
      </label>
      <input
        id="binaryTarget"
        name="binaryTarget"
        type="number"
        disabled={ongoingVisualization}
        step="1"
        required
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
