import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/mainPage';
import EducationPage from './components/EducationPage';
import ExperiencePage from './components/ExperiencePage';
import PublicationsPage from './components/PublicationsPage';
import ContactPage from './components/ContactPage';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;
