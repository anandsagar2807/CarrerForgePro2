import React from 'react';
import { SignIn } from '@clerk/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, CheckCircle, Star } from 'lucide-react';

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        </div>

        {/* Premium Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/30 via-indigo-900/20 to-blue-800/30 pointer-events-none" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-semibold">Back to Home</span>
          </button>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="CareerForge Pro" className="h-10 w-auto" />
            <div>
              <h1 className="text-2xl font-bold text-white">
                CareerForge <span className="text-blue-300">Pro</span>
              </h1>
              <p className="text-sm text-slate-400">AI-Powered Resume Builder</p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome back to your
              <br />
              career journey
            </h2>
            <p className="text-lg text-slate-300">
              Continue building resumes that get you hired at top companies.
            </p>
          </div>

          <div className="space-y-4">
            {[
              'AI-powered resume optimization',
              'ATS-friendly templates',
              'Real-time feedback & scoring',
              'Export to PDF, DOC, TXT'
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-slate-200 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="relative z-10"
        >
          <div className="flex items-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <p className="text-slate-300 text-sm">
            <span className="font-bold text-white">50,000+ professionals</span> have built their resumes with us
          </p>
        </motion.div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-semibold">Back to Home</span>
            </button>
            <div className="flex items-center justify-center gap-3 mb-3">
              <img src="/logo.png" alt="CareerForge Pro" className="h-10 w-auto" />
              <h1 className="text-3xl font-bold text-slate-900">
                CareerForge <span className="bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">Pro</span>
              </h1>
            </div>
          </div>

          {/* Sign In Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Welcome back
              </h2>
              <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
                Sign in to continue building your professional resume
              </p>
            </motion.div>
          </div>

          {/* Clerk Sign In Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <SignIn
              appearance={{
                elements: {
                  rootBox: 'w-full flex flex-col items-center',
                  card: 'shadow-2xl border-2 border-slate-200/60 rounded-3xl p-10 bg-white/80 backdrop-blur-sm max-w-md mx-auto w-full',
                  headerTitle: 'hidden',
                  headerSubtitle: 'hidden',
                  socialButtonsBlockButton: 'w-full bg-white border-2 border-slate-200 hover:border-blue-700 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all h-14 text-base shadow-sm hover:shadow-md',
                  socialButtonsBlockButtonText: 'font-bold text-base',
                  socialButtonsIconButton: 'border-2 border-slate-200 hover:border-blue-700 rounded-xl h-14 w-14',
                  formButtonPrimary: 'bg-gradient-to-r from-blue-700 to-blue-900 hover:shadow-xl hover:shadow-blue-900/30 text-white font-bold rounded-xl transition-all h-14 text-base',
                  formFieldInput: 'w-full border-2 border-slate-200 rounded-xl focus:border-blue-700 focus:ring-4 focus:ring-blue-700/10 transition-all h-14 text-base px-5 bg-white text-center',
                  formFieldLabel: 'font-bold text-slate-700 text-base mb-2.5 text-center w-full',
                  footerActionLink: 'text-blue-700 hover:text-blue-900 font-bold text-base underline-offset-2',
                  identityPreviewText: 'font-bold text-base',
                  formResendCodeLink: 'text-blue-700 hover:text-blue-900 font-bold text-base',
                  otpCodeFieldInput: 'border-2 border-slate-200 rounded-xl focus:border-blue-700 h-16 text-2xl font-bold',
                  formFieldInputShowPasswordButton: 'text-slate-600 hover:text-slate-900',
                  formFieldAction: 'text-base font-semibold',
                  footerActionText: 'text-slate-600 text-base',
                  dividerText: 'text-slate-500 text-sm font-medium',
                  dividerLine: 'bg-slate-200',
                  formFieldRow: 'gap-4',
                  footer: 'mt-8',
                  footerAction: 'mt-6',
                }
              }}
              redirectUrl={window.location.origin + '/templates'}
              signUpUrl="/sign-up"
            />
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10"
          >
            <div className="text-center">
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-4">Trusted by professionals from</p>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                {['Google', 'Microsoft', 'Amazon', 'Meta'].map((company) => (
                  <span key={company} className="text-base font-bold text-slate-400 hover:text-slate-600 transition-colors">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage;
