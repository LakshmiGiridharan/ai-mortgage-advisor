import EligibilityForm from "./components/EligibilityForm";
import RefinanceCalculator from "./components/RefinanceCalculator";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto grid gap-10">
        <EligibilityForm />
        <RefinanceCalculator />
      </div>
    </div>
  );
}

export default App;
