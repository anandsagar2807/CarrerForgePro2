import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How does the AI resume builder work?',
    answer: 'Our AI analyzes your experience, skills, and target job descriptions to suggest optimized content. It uses advanced natural language processing to ensure your resume is ATS-friendly while maintaining a professional tone that appeals to hiring managers.'
  },
  {
    question: 'Is ResumeForge Pro really free to use?',
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
    answer: 'We offer a 30-day money-back guarantee for all Pro subscriptions. If you\'re not satisfied with ResumeForge Pro for any reason, contact our support team for a full refund.'
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
      className="border-b border-white/5 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className={`text-xl font-bold tracking-tight transition-all duration-300 ${isOpen ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'}`}>
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
            isOpen ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-white/5 border-white/5 text-slate-500 group-hover:border-blue-500/30 group-hover:text-blue-400'
          }`}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-slate-400 leading-relaxed font-medium text-lg max-w-2xl">
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
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden bg-[#020617]">
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Left Column - Header */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8"
            >
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-blue-100 uppercase tracking-widest">Help Center</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter"
            >
              Frequently Asked <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Questions</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 font-medium max-w-md leading-relaxed"
            >
              Got questions? We've got answers. If you don't find what you're looking for, 
              feel free to contact our 24/7 support team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 p-8 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10"
            >
              <p className="text-white font-bold mb-4">Still have questions?</p>
              <button className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl">
                Contact Support
              </button>
            </motion.div>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10">
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
    </section>
  );
};

export default FAQ;
