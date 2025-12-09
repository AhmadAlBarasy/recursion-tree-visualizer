import Canvas from "./components/Canvas";
import SidePanel from "./components/SidePanel";
import { CanvasProvider } from "./context/CanvasProvider";
import { VisualizationProvider } from "./context/VisualizationProvider";

function App() {
  return <div className="flex w-full h-screen">
    <VisualizationProvider>
      <CanvasProvider>
        <SidePanel />
        <Canvas />
      </CanvasProvider>
    </VisualizationProvider>
  </div>
}

export default App;
