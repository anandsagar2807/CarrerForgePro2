import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Mail, Phone, MapPin, Linkedin, Briefcase, GraduationCap, Code, Award, Github, Link as LinkIcon, FileText } from 'lucide-react';

const ResumePreview = () => {
  const { resumeData, selectedTemplate } = useResume();
  const { personalInfo, education, experience, skills, projects } = resumeData;

  const getTemplateStyles = () => {
    switch (selectedTemplate) {
      case 'modern':
        return {
          container: "bg-white min-h-full p-8 font-sans",
          header: "border-b-2 border-stone-800 pb-5 mb-5",
          name: "text-2xl font-semibold text-stone-900",
          sectionTitle: "text-sm font-semibold text-stone-800 uppercase tracking-wide mb-3 flex items-center gap-2",
          itemTitle: "font-semibold text-stone-800",
          itemSubtitle: "text-stone-600"
        };
      case 'professional':
        return {
          container: "bg-white min-h-full p-8",
          header: "text-center border-b border-stone-200 pb-5 mb-5",
          name: "text-2xl font-semibold text-stone-800",
          sectionTitle: "text-sm font-semibold text-stone-800 border-b border-stone-200 pb-1 mb-3",
          itemTitle: "font-semibold text-stone-800",
          itemSubtitle: "text-stone-600 italic"
        };
      case 'ats-friendly':
        return {
          container: "bg-white min-h-full p-8 font-sans text-sm",
          header: "mb-5",
          name: "text-xl font-semibold uppercase tracking-wide",
          sectionTitle: "text-sm font-semibold uppercase border-b border-stone-900 mb-2",
          itemTitle: "font-semibold",
          itemSubtitle: "font-medium"
        };
      case 'simple':
      default:
        return {
          container: "bg-white min-h-full p-8 font-sans",
          header: "mb-5",
          name: "text-2xl font-semibold text-stone-900",
          sectionTitle: "text-base font-semibold text-stone-900 mb-3 border-l-2 border-stone-900 pl-2.5",
          itemTitle: "font-semibold text-stone-800",
          itemSubtitle: "text-stone-600"
        };
    }
  };

  const styles = getTemplateStyles();

  const SectionHeader = ({ title, icon }) => (
    <div className={styles.sectionTitle}>
      {selectedTemplate === 'modern' && icon}
      {title}
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.name}>{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-stone-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {personalInfo.location}</span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1"><Linkedin className="w-3.5 h-3.5" /> {personalInfo.linkedin}</span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1"><Github className="w-3.5 h-3.5" /> {personalInfo.github}</span>
          )}
        </div>
        {personalInfo.summary && (
          <p className="mt-3 text-sm text-stone-600 leading-relaxed italic">
            {personalInfo.summary}
          </p>
        )}
      </header>

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <SectionHeader title="Experience" icon={<Briefcase className="w-4 h-4" />} />
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className={styles.itemTitle}>{exp.position}</h3>
                  <span className="text-xs font-medium text-stone-400 shrink-0">{exp.startDate} – {exp.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline gap-2">
                  <span className={styles.itemSubtitle}>{exp.company}</span>
                  {exp.location && <span className="text-xs text-stone-400 shrink-0">{exp.location}</span>}
                </div>
                <p className="mt-1.5 text-xs text-stone-500 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <SectionHeader title="Education" icon={<GraduationCap className="w-4 h-4" />} />
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className={styles.itemTitle}>{edu.institution}</h3>
                  <span className="text-xs font-medium text-stone-400 shrink-0">{edu.startDate} – {edu.endDate}</span>
                </div>
                <div className="flex justify-between items-baseline gap-2">
                  <span className={styles.itemSubtitle}>{edu.degree} in {edu.field}</span>
                  {edu.gpa && <span className="text-xs text-stone-400 shrink-0">GPA: {edu.gpa}</span>}
                </div>
                {edu.description && <p className="mt-1 text-xs text-stone-500">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <SectionHeader title="Skills" icon={<Code className="w-4 h-4" />} />
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className={`px-2 py-0.5 text-xs rounded font-medium ${
                  selectedTemplate === 'modern'
                    ? 'bg-stone-100 text-stone-700'
                    : 'border border-stone-200 text-stone-600'
                }`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <SectionHeader title="Projects" icon={<Award className="w-4 h-4" />} />
          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className={styles.itemTitle}>{proj.name}</h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-xs text-accent-600 flex items-center gap-0.5 shrink-0 hover:underline">
                      <LinkIcon className="w-3 h-3" /> Link
                    </a>
                  )}
                </div>
                <p className="mt-1 text-xs text-stone-500">{proj.description}</p>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {proj.technologies.map((tech, idx) => (
                      <span key={idx} className="text-[10px] text-stone-400 bg-stone-50 px-1.5 py-0.5 rounded border border-stone-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {experience.length === 0 && education.length === 0 && skills.length === 0 && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-stone-300">
          <FileText className="w-12 h-12 mb-3 opacity-30" />
          <p className="text-sm font-medium text-stone-400">No content yet</p>
          <p className="text-xs text-stone-400 mt-1">Fill in the form to see your resume</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;