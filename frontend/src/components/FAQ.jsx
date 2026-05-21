import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How does the AI resume builder work?',
    answer: 'Our AI analyzes your experience, skills, and target job descriptions to suggest optimized content. It uses advanced natural language processing to ensure your resume is ATS-friendly while maintaining a professional tone that appeals to hiring managers.'
  },
  {
    question: 'Is CareerForge Pro really free to use?',
    answer: 'Yes! Our free plan includes 1 template, basic AI suggestions, PDF export, and ATS scoring. You can create a professional resume without paying anything. Upgrade to Pro for unlimited templates and advanced features.'
  },
  {
    question: 'Will my resume pass ATS systems?',
    answer: 'Absolutely. All our templates are designed with ATS compatibility in mind. Our system checks your resume against common ATS filters and provides suggestions to improve your chances of getting past automated screening.'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your Pro subscription at any time with no cancellation fees. Your account will remain active until the end of your billing period, and you can always downgrade to the free plan.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee for all Pro subscriptions. If you\'re not satisfied with CareerForge Pro for any reason, contact our support team for a full refund.'
  },
  {
    question: 'Can I download my resume in different formats?',
    answer: 'Pro users can download resumes in PDF, Word (.docx), and plain text formats. Free users have access to PDF export. All exports maintain professional formatting and ATS compatibility.'
  },
  {
    question: 'Is my data secure and private?',
    answer: 'Security is our top priority. All data is encrypted in transit and at rest using industry-standard AES-256 encryption. We never share your information with third parties, and you can delete your data at any time.'
  },
  {
    question: 'Do you offer team or enterprise plans?',
    answer: 'Yes! Our Enterprise plan includes team collaboration features, custom branding, API access, dedicated account management, and SSO integration. Contact our sales team for custom pricing based on your organization\'s needs.'
  }
];

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-b border-slate-200 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-semibold text-slate-900 pr-8 group-hover:text-blue-600 transition-colors">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isOpen ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-700'
            }`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full mb-6"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-semibold text-slate-700">FAQ</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
            >
              Frequently asked
              <br />
              <span className="text-blue-800">
                questions
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 mb-8"
            >
              Everything you need to know about CareerForge Pro. Can't find what you're looking for? Contact our support team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-blue-50 rounded-2xl border border-blue-100"
            >
              <p className="text-sm font-semibold text-slate-900 mb-2">Still have questions?</p>
              <p className="text-sm text-slate-600 mb-4">
                Can't find the answer you're looking for? Please chat with our friendly team.
              </p>
              <a
                href="mailto:support@resumeforge.pro"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors"
              >
                Contact Support
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="bg-white rounded-3xl border border-slate-200 p-2 shadow-xl">
            <div className="divide-y divide-slate-100 px-6">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
