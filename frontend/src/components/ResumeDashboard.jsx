import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Target, Award, Zap, BarChart3, PieChart, 
  CheckCircle, AlertCircle, Clock, Users, Briefcase, 
  GraduationCap, Star, Download, Share2, RefreshCw
} from 'lucide-react';

const ResumeDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    overallScore: 78,
    atsScore: 85,
    designScore: 72,
    contentScore: 80,
    industryBenchmark: 72,
    lastUpdated: '2 hours ago',
    improvementAreas: [
      { id: 1, name: 'Keyword Optimization', score: 65, target: 85, priority: 'high' },
      { id: 2, name: 'Experience Quantification', score: 70, target: 90, priority: 'medium' },
      { id: 3, name: 'Skill Diversity', score: 80, target: 85, priority: 'low' },
      { id: 4, name: 'Summary Strength', score: 75, target: 90, priority: 'medium' },
    ],
    metrics: [
      { id: 1, name: 'ATS Compatibility', value: 'Excellent', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
      { id: 2, name: 'Readability', value: 'Good', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
      { id: 3, name: 'Keyword Density', value: 'Optimal', icon: Target, color: 'text-blue-500', bg: 'bg-blue-50' },
      { id: 4, name: 'Formatting', value: 'Professional', icon: Star, color: 'text-purple-500', bg: 'bg-purple-50' },
    ],
    recentAnalyses: [
      { id: 1, jobTitle: 'Senior Frontend Developer', company: 'TechCorp', score: 82, date: '2024-01-15' },
      { id: 2, jobTitle: 'Full Stack Engineer', company: 'StartupXYZ', score: 75, date: '2024-01-10' },
      { id: 3, jobTitle: 'UI/UX Developer', company: 'DesignCo', score: 88, date: '2024-01-05' },
    ],
    sectionScores: [
      { name: 'Personal Info', score: 95 },
      { name: 'Experience', score: 80 },
      { name: 'Education', score: 90 },
      { name: 'Skills', score: 75 },
      { name: 'Projects', score: 85 },
      { name: 'Summary', score: 70 },
    ]
  });

  const [timeRange, setTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setDashboardData(prev => ({
        ...prev,
        overallScore: Math.min(100, prev.overallScore + 2),
        lastUpdated: 'Just now'
      }));
      setIsRefreshing(false);
    }, 1000);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 85) return 'bg-green-500';
    if (score >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-stone-600 bg-stone-50';
    }
  };

  return (
    <div className="glass-card-premium rounded-2xl p-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Resume Scoring Dashboard</h2>
          <p className="text-stone-600 mt-1">Track your resume performance and improvement over time</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Clock className="w-4 h-4" />
            Updated {dashboardData.lastUpdated}
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Main Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-5 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-semibold text-stone-700">Overall Score</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-bold ${getScoreBgColor(dashboardData.overallScore)} text-white`}>
              {dashboardData.overallScore >= 85 ? 'Excellent' : dashboardData.overallScore >= 70 ? 'Good' : 'Needs Work'}
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-900">{dashboardData.overallScore}%</div>
          <div className="h-2 bg-stone-100 rounded-full overflow-hidden mt-2">
            <div 
              className={`h-full rounded-full ${getScoreBgColor(dashboardData.overallScore)}`}
              style={{ width: `${dashboardData.overallScore}%` }}
            />
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-500" />
              <span className="text-sm font-semibold text-stone-700">ATS Score</span>
            </div>
            <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
              ATS Ready
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-900">{dashboardData.atsScore}%</div>
          <div className="h-2 bg-stone-100 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full rounded-full bg-green-500"
              style={{ width: `${dashboardData.atsScore}%` }}
            />
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-semibold text-stone-700">Design Score</span>
            </div>
            <div className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
              Modern
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-900">{dashboardData.designScore}%</div>
          <div className="h-2 bg-stone-100 rounded-full overflow-hidden mt-2">
            <div 
              className="h-full rounded-full bg-amber-500"
              style={{ width: `${dashboardData.designScore}%` }}
            />
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-semibold text-stone-700">Industry Avg</span>
            </div>
            <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
              Benchmark
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-900">{dashboardData.industryBenchmark}%</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="text-sm text-stone-600">
              {dashboardData.overallScore > dashboardData.industryBenchmark ? '+' : ''}
              {dashboardData.overallScore - dashboardData.industryBenchmark}% above average
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Improvement Areas */}
        <div className="glass-card p-5 rounded-xl">
          <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" />
            Improvement Areas
          </h3>
          <div className="space-y-4">
            {dashboardData.improvementAreas.map(area => (
              <div key={area.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-stone-700">{area.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(area.priority)}`}>
                      {area.priority}
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${getScoreColor(area.score)}`}>
                    {area.score}% → {area.target}%
                  </span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getScoreBgColor(area.score)}`}
                    style={{ width: `${area.score}%` }}
                  />
                </div>
                <div className="text-xs text-stone-500">
                  Target: {area.target}% • Gap: {area.target - area.score}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Scores */}
        <div className="glass-card p-5 rounded-xl">
          <h3 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-blue-500" />
            Section Breakdown
          </h3>
          <div className="space-y-4">
            {dashboardData.sectionScores.map((section, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-stone-700">{section.name}</span>
                  <span className={`text-sm font-bold ${getScoreColor(section.score)}`}>
                    {section.score}%
                  </span>
                </div>
                <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${getScoreBgColor(section.score)}`}
                    style={{ width: `${section.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Analyses & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Analyses */}
        <div className="glass-card p-5 rounded-xl">
          <h3 className="text-lg font-semibold text-stone-900 mb-4">Recent Job Analyses</h3>
          <div className="space-y-3">
            {dashboardData.recentAnalyses.map(analysis => (
              <div key={analysis.id} className="flex items-center justify-between p-3 hover:bg-stone-50 rounded-lg transition-colors">
                <div>
                  <div className="font-medium text-stone-900">{analysis.jobTitle}</div>
                  <div className="text-sm text-stone-500">{analysis.company} • {analysis.date}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(analysis.score)} bg-stone-100`}>
                  {analysis.score}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="glass-card p-5 rounded-xl">
          <h3 className="text-lg font-semibold text-stone-900 mb-4">Quality Metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            {dashboardData.metrics.map(metric => {
              const Icon = metric.icon;
              return (
                <div key={metric.id} className={`${metric.bg} p-4 rounded-xl`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                    <span className="text-sm font-semibold text-stone-700">{metric.name}</span>
                  </div>
                  <div className="text-xl font-bold text-stone-900">{metric.value}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dashboard Actions */}
      <div className="mt-8 pt-6 border-t border-white/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-stone-500">
          <Zap className="w-4 h-4 inline mr-2" />
          Dashboard updates automatically with each resume analysis
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all">
            <Share2 className="w-4 h-4" />
            Share Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeDashboard;