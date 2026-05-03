import AlgorithmForm from "./AlgorithmForm";
import PlayController from "./PlayController";
import { Github, Linkedin } from 'lucide-react';
import { useVisualizationContext } from "../hooks/useVisualizationContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function SidePanel() {
  const { selectedAlgorithm, ongoingVisualization } = useVisualizationContext();

  const getAlgorithmCode = (algorithm: string) => {
    switch (algorithm) {
      case 'fibonacci':
        return `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;
      case 'factorial':
        return `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`;
      default:
        return '';
    }
  };

  return (
    <div
      className="
        w-full
        h-[50vh]
        bg-bv
        text-white
        p-6
        fixed bottom-0
        md:relative
        md:w-1/2
        md:h-screen
        flex flex-col
        justify-between
        overflow-y-auto 
        md:overflow-hidden
      "
    >
      {/* Main content */}
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Recursion Visualizer
        </h1>
        <p className="mb-6 text-gray-300 text-center">
          Select an algorithm and visualize its recursive calls step by step!
        </p>
        <AlgorithmForm/>
        {selectedAlgorithm && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Algorithm Code:</h2>
            <div className="bg-black rounded-md p-4 overflow-x-auto">
              <SyntaxHighlighter
                language="javascript"
                style={atomDark}
                customStyle={{ background: 'transparent', padding: 0, margin: 0 }}
              >
                {getAlgorithmCode(selectedAlgorithm)}
              </SyntaxHighlighter>
            </div>
            {ongoingVisualization && <PlayController />}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 text-center text-gray-400 text-sm">
        <p>Built by: Ahmad Albarasy</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://github.com/ahmadAlbarasy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <Github className="w-5 h-5 inline" />
          </a>
          <a
            href="https://linkedin.com/in/ahmad-albarasy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <Linkedin className="w-5 h-5 inline" />
          </a>
        </div>
      </div>
    </div>
  );
}
