import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './components/MainLayout';

function App() {
  return (
    <Router basename="/form-4u">
      <MainLayout />
    </Router>
  );
}

export default App;
