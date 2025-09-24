import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/mainPage';
import EducationPage from './components/EducationPage';
import ExperiencePage from './components/ExperiencePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
