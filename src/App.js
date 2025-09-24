import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/mainPage';
import EducationPage from './components/EducationPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/education" element={<EducationPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
