import BreakdownForm from "./pages/BreakdownForm";
import LiveTracking from "./pages/LiveTracking";
import MapView from "./components/MapView";

export default function App() {
  return (
    <div>
      <h1>RoadRescue360</h1>
      <BreakdownForm />
      <MapView />
      <LiveTracking />
    </div>
  );
}
