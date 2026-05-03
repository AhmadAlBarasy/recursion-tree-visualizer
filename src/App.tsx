import Canvas from "./components/Canvas";
import SidePanel from "./components/SidePanel";
import { CanvasProvider } from "./context/CanvasProvider";
import { VisualizationProvider } from "./context/VisualizationProvider";

function App() {
  return (
    <div className="flex w-full h-screen">
      <CanvasProvider>
        <VisualizationProvider>
          <SidePanel />
          <Canvas />
        </VisualizationProvider>
      </CanvasProvider>
    </div>
  );
}

export default App;
