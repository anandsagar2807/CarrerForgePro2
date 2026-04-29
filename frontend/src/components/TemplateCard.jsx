import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TemplateCard = ({ template }) => {
  const navigate = useNavigate();

  const renderPreview = () => {
    const mock = {
      name: "Sarah Kim",
      role: "Product Manager",
      email: "sarah.kim@gmail.com",
      phone: "(415) 555-0123",
    };

    switch (template.id) {
      case 'simple':
      case 'ats-friendly':
      case 'one-column':
        return (
          <div className="h-full p-5 text-[6px] leading-tight space-y-2 bg-white">
            <div className="text-center pb-2 border-b border-stone-100">
              <h4 className="font-semibold text-stone-900 text-[9px] uppercase tracking-wide">{mock.name}</h4>
              <p className="text-stone-400 mt-0.5 text-[5px]">{mock.email} · {mock.phone}</p>
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold text-stone-700 text-[6px] uppercase tracking-wider border-b border-stone-50 pb-0.5">Profile</p>
              <p className="text-stone-500 text-[5px]">Product leader with 8 years of experience scaling B2B SaaS products.</p>
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold text-stone-700 text-[6px] uppercase tracking-wider border-b border-stone-50 pb-0.5">Experience</p>
              <div className="space-y-1">
                <p className="font-semibold text-stone-800 text-[5.5px]">Senior PM, Linear</p>
                <p className="text-stone-400 text-[5px]">2022 – Present</p>
                <div className="h-0.5 bg-stone-50 rounded w-full" />
                <div className="h-0.5 bg-stone-50 rounded w-11/12" />
              </div>
            </div>
          </div>
        );
      case 'modern':
      case 'professional':
        return (
          <div className="h-full flex text-[6px]">
            <div className="w-[35%] bg-stone-50 p-3 border-r border-stone-100">
              <div className="w-8 h-8 rounded-md bg-stone-200 mx-auto mb-2" />
              <div className="space-y-1.5 text-[5px]">
                <div className="h-1 bg-stone-200 rounded-full w-full" />
                <div className="h-1 bg-stone-200 rounded-full w-4/5" />
                <div className="h-1 bg-stone-200 rounded-full w-3/5" />
              </div>
              <div className="mt-3 pt-2 border-t border-stone-100 space-y-1">
                <p className="font-semibold text-stone-500 text-[5px]">Skills</p>
                <div className="h-1 bg-stone-200 rounded-full w-full" />
                <div className="h-1 bg-stone-200 rounded-full w-11/12" />
                <div className="h-1 bg-stone-200 rounded-full w-5/6" />
              </div>
            </div>
            <div className="flex-1 p-3 space-y-2">
              <p className="font-semibold text-stone-900 text-[8px]">{mock.name}</p>
              <p className="text-accent-600 text-[5px] font-medium">{mock.role}</p>
              <div className="pt-1.5 space-y-1">
                <div className="h-0.5 bg-stone-200 rounded-full w-1/3" />
                <div className="space-y-0.5">
                  <div className="h-0.75 bg-stone-100 rounded-full w-full" />
                  <div className="h-0.75 bg-stone-100 rounded-full w-11/12" />
                  <div className="h-0.75 bg-stone-100 rounded-full w-10/12" />
                </div>
              </div>
              <div className="pt-1.5 space-y-1">
                <div className="h-0.5 bg-stone-200 rounded-full w-1/3" />
                <div className="space-y-0.5">
                  <div className="h-0.75 bg-stone-100 rounded-full w-full" />
                  <div className="h-0.75 bg-stone-100 rounded-full w-4/5" />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div className="h-full bg-stone-50 animate-pulse" />;
    }
  };

  return (
    <div
      onClick={() => navigate(`/builder/${template.id}`)}
      className="group flex flex-col bg-white rounded-xl border border-stone-100 overflow-hidden cursor-pointer transition-all duration-200 hover:border-stone-200 hover:shadow-md"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-stone-50">
        {renderPreview()}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-stone-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="btn-primary text-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-200">
            Use template
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="font-semibold text-stone-900">{template.name}</h3>
          <span className="text-xs text-stone-400 font-medium">Free</span>
        </div>
        <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
          {template.description}
        </p>
      </div>
    </div>
  );
};

export default TemplateCard;