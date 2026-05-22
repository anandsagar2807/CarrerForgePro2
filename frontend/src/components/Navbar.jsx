import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react';

const Navbar = ({ isDark = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '/#features', isHash: true },
    { label: 'Templates', href: '/templates', isHash: false },
    { label: 'AI Tools', href: '/ai-tools', isHash: false },
    { label: 'Cover Letter', href: '/cover-letter', isHash: false },
    { label: 'Interview Prep', href: '/interview-prep', isHash: false },
    { label: 'Pricing', href: '/pricing', isHash: false },
  ];

  const handleNavClick = (link) => {
    if (link.isHash) {
      if (window.location.pathname === '/') {
        const hash = link.href.substring(2);
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(link.href);
      }
    } else {
      navigate(link.href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
        ? isDark 
          ? 'bg-[#020617]/70 backdrop-blur-2xl border-b border-white/5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' 
          : 'bg-white/70 backdrop-blur-2xl border-b border-slate-200 py-3 shadow-lg'
        : 'bg-transparent py-6'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-xl blur opacity-0 group-hover:opacity-40 transition duration-1000 group-hover:duration-300" />
              <div className="relative bg-[#0f172a] p-1.5 rounded-xl border border-white/10 group-hover:border-blue-500/50 transition-colors">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Zaalima<span className="text-blue-500">Forge</span>
              </span>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-blue-400/80 -mt-1">Pro Edition</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className={`px-5 py-2.5 text-xs font-bold transition-all duration-300 rounded-xl relative group ${
                  location.pathname === link.href || (link.isHash && location.hash === link.href.substring(1))
                    ? 'bg-blue-600 text-white shadow-lg'
                    : isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                   <motion.div layoutId="nav-glow" className="absolute inset-0 bg-blue-400/20 blur-md rounded-xl -z-10" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/templates')}
                  className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all border ${
                    isDark 
                      ? 'text-white border-white/10 hover:bg-white/5' 
                      : 'text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  My Resumes
                </button>
                <div className="h-8 w-px bg-white/10 mx-2" />
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <SignInButton mode="modal">
                  <button className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    isDark ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900'
                  }`}>
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-6 py-2.5 text-xs font-black bg-white text-slate-900 rounded-xl hover:bg-blue-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-white/20 active:scale-95">
                    Start Free
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute top-full left-0 right-0 mt-2 mx-4 p-6 rounded-2xl border ${
                isDark 
                  ? 'bg-[#0f172a] border-white/5 shadow-2xl shadow-black' 
                  : 'bg-white border-slate-200 shadow-xl'
              } md:hidden`}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      handleNavClick(link);
                      setIsMenuOpen(false);
                    }}
                    className={`text-left px-4 py-3 rounded-xl font-bold transition-all ${
                      isDark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="h-px bg-white/5 my-2" />
                {isSignedIn ? (
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl"
                  >
                    Go to Dashboard
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => navigate('/sign-in')}
                      className={`py-3 font-bold rounded-xl ${
                        isDark ? 'text-white border border-white/10' : 'text-slate-700 border border-slate-200'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => navigate('/sign-up')}
                      className="py-3 bg-blue-600 text-white font-bold rounded-xl"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
