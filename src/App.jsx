import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateLetterPage } from './pages/CreateLetterPage';
import { LettersReceivedPage } from './pages/LettersReceivedPage';
import { LettersSentPage } from './pages/LettersSentPage';
import { LetterPage } from './pages/LetterPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-letter" element={<CreateLetterPage />} />
        <Route path="/letters-received" element={<LettersReceivedPage />} />
        <Route path="/letters-sent" element={<LettersSentPage />} />
        <Route path="/letter/:id" element={<LetterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
