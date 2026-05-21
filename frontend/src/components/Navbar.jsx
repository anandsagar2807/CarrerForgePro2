import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { UserButton, useUser } from '@clerk/react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '/#powerful-features', isHash: true },
    { label: 'ATS Score', href: '/ai-tools/ats-optimizer', isHash: false },
    { label: 'Templates', href: '/templates', isHash: false },
    { label: 'Pricing', href: '/pricing', isHash: false },
  ];

  const handleNavClick = (link) => {
    if (link.isHash) {
      if (window.location.pathname === '/') {
        const hash = link.href.substring(2);
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(link.href);
      }
      return;
    }
    navigate(link.href);
  };


  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'backdrop-blur-xl bg-white/60 shadow-lg shadow-black/5 border-b border-slate-200/50' : 'bg-transparent'
        }`}
    >
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="CareerForgePro" className="h-8 w-auto" />
            <span className="text-lg font-semibold text-dark tracking-tight">
              CareerForge<span className="text-primary">Pro</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className={`text-sm font-medium transition-colors duration-150 ${(location.pathname === link.href && !link.isHash) ? 'text-primary' : 'text-slate-600 hover:text-dark'
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/sign-in" />
            ) : (
              <>
                <button
                  onClick={() => navigate('/sign-in')}
                  className="px-5 py-2.5 rounded-xl bg-white/70 backdrop-blur-md border border-slate-200/60 text-slate-700 text-sm font-semibold hover:shadow-md hover:shadow-primary/10 hover:bg-white transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/sign-up')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden p-2 text-slate-600 hover:text-dark hover:bg-slate-100 rounded-xl transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-3 border-t border-slate-200/50">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      handleNavClick(link);
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left block px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors text-slate-700 hover:bg-slate-50"
                  >
                    {link.label}
                  </button>
                ))}

                {isSignedIn ? (
                  <div className="flex justify-center pt-2">
                    <UserButton afterSignOutUrl="/sign-in" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigate('/sign-in');
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-5 py-2.5 rounded-xl border border-slate-200/60 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-all duration-200"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        navigate('/sign-up');
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all duration-200"
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
