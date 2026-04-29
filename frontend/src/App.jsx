import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/LandingPage';
import TemplatesPage from './pages/TemplatesPage';
import Analyze from './pages/Analyze';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import CoverLetterPage from './pages/CoverLetterPage';
import ChatPage from './pages/ChatPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import FloatingAIAssistant from './components/FloatingAIAssistant';

function App() {
    return (
        <ThemeProvider>
            <ResumeProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/templates" element={<TemplatesPage />} />
                        <Route path="/analyze" element={<Analyze />} />
                        <Route path="/builder/:templateId" element={<ResumeBuilderPage />} />
                        <Route path="/builder" element={<ResumeBuilderPage />} />
                        <Route path="/cover-letter" element={<CoverLetterPage />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/interview-prep" element={<InterviewPrepPage />} />
                    </Routes>
                    <FloatingAIAssistant />
                </Router>
            </ResumeProvider>
        </ThemeProvider>
    );
}

export default App;
