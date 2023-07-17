import './App.css';
import StackedBarChart from './components/StackedBarChart';
import { useAppContext } from './provider/AppProvider';

function App() {
  const { userMeta } = useAppContext();

  const transformedData = Object.entries(userMeta).map(([category, value]) => {
    return { label: category, data: value.data };
  });

  return <StackedBarChart data={transformedData} />;
}

export default App;
