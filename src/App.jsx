import './App.css';
import StackedBarChart from './components/StackedBarChart';
import { useAppContext } from './provider/AppProvider';

function App() {
  const { transformedData } = useAppContext();
  return <StackedBarChart data={transformedData} />;
}

export default App;
