import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/react';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';
import { AIToolsProvider } from './context/AIToolsContext';
import Home from './pages/Home';
import TemplatesPage from './pages/TemplatesPage';
import Analyze from './pages/Analyze';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import CoverLetterPage from './pages/CoverLetterPage';
import ChatPage from './pages/ChatPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import AIDashboard from './pages/AIDashboard';
import BrutalHonestReview from './pages/BrutalHonestReview';
import ATSOptimizer from './pages/ATSOptimizer';
import BulletPointTransformer from './pages/BulletPointTransformer';
import IndustryToneMatch from './pages/IndustryToneMatch';
import FinalPolishReview from './pages/FinalPolishReview';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PricingPage from './pages/PricingPage';
import SSOCallback from './pages/SSOCallback';
import FloatingAIAssistant from './components/FloatingAIAssistant';

const ClerkProviderWithNavigate = ({ children }) => {
    const navigate = useNavigate();
    return (
        <ClerkProvider
            publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
            afterSignUpUrl="/templates"
            afterSignInUrl="/templates"
            afterSignOutUrl="/"
            signInUrl="/sign-in"
            signUpUrl="/sign-up"
            navigate={(to) => navigate(to)}
        >
            {children}
        </ClerkProvider>
    );
};

function App() {
    return (
        <ThemeProvider>
            <ResumeProvider>
                <AIToolsProvider>
                    <Router>
                        <ClerkProviderWithNavigate>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/templates" element={<TemplatesPage />} />
                                <Route path="/analyze" element={<Analyze />} />
                                <Route path="/builder/:templateId" element={<ResumeBuilderPage />} />
                                <Route path="/builder" element={<ResumeBuilderPage />} />
                                <Route path="/cover-letter" element={<CoverLetterPage />} />
                                <Route path="/chat" element={<ChatPage />} />
                                <Route path="/interview-prep" element={<InterviewPrepPage />} />
                                <Route path="/ai-tools" element={<AIDashboard />} />
                                <Route path="/ai-tools/brutal-review" element={<BrutalHonestReview />} />
                                <Route path="/ai-tools/ats-optimizer" element={<ATSOptimizer />} />
                                <Route path="/ai-tools/bullet-transformer" element={<BulletPointTransformer />} />
                                <Route path="/ai-tools/industry-tone" element={<IndustryToneMatch />} />
                                <Route path="/ai-tools/final-polish" element={<FinalPolishReview />} />
                                <Route path="/sign-in/*" element={<SignInPage />} />
                                <Route path="/sign-up/*" element={<SignUpPage />} />
                                <Route path="/pricing" element={<PricingPage />} />
                                <Route path="/sso-callback" element={<SSOCallback />} />
                            </Routes>
                            <FloatingAIAssistant />
                        </ClerkProviderWithNavigate>
                    </Router>
                </AIToolsProvider>
            </ResumeProvider>
        </ThemeProvider>
    );
}

export default App;
