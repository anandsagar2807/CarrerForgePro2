import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Copy, Download, Trash2, Eye, Edit3, Plus,
    Calendar, FileText, Star, Clock, CheckCircle,
    AlertCircle, FolderOpen, Share2, Filter
} from 'lucide-react';

const ResumeVersionManager = ({ onClose }) => {
    const [versions, setVersions] = useState([
        {
            id: 1,
            name: 'Software Engineer - TechCorp',
            template: 'modern',
            createdAt: '2024-01-15',
            lastModified: '2024-01-20',
            isPrimary: true,
            score: 85
        },
        {
            id: 2,
            name: 'Full Stack Developer - StartupXYZ',
            template: 'creative',
            createdAt: '2024-01-10',
            lastModified: '2024-01-12',
            isPrimary: false,
            score: 78
        },
        {
            id: 3,
            name: 'Senior Developer - DesignCo',
            template: 'professional',
            createdAt: '2024-01-05',
            lastModified: '2024-01-08',
            isPrimary: false,
            score: 82
        },
        {
            id: 4,
            name: 'Frontend Lead - Agency',
            template: 'minimalist',
            createdAt: '2023-12-20',
            lastModified: '2023-12-22',
            isPrimary: false,
            score: 75
        },
    ]);

    const [selectedVersions, setSelectedVersions] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [filter, setFilter] = useState('all'); // 'all', 'primary', 'recent'

    const filteredVersions = versions.filter(version => {
        if (filter === 'primary') return version.isPrimary;
        if (filter === 'recent') {
            const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            return new Date(version.lastModified) > thirtyDaysAgo;
        }
        return true;
    });

    const handleSelectVersion = (versionId) => {
        if (selectedVersions.includes(versionId)) {
            setSelectedVersions(selectedVersions.filter(id => id !== versionId));
        } else {
            setSelectedVersions([...selectedVersions, versionId]);
        }
    };

    const handleSetPrimary = (versionId) => {
        setVersions(prev => prev.map(v => ({
            ...v,
            isPrimary: v.id === versionId
        })));
    };

    const handleDuplicate = (versionId) => {
        const version = versions.find(v => v.id === versionId);
        if (version) {
            const newVersion = {
                ...version,
                id: versions.length + 1,
                name: `${version.name} (Copy)`,
                createdAt: new Date().toISOString().split('T')[0],
                lastModified: new Date().toISOString().split('T')[0],
                isPrimary: false
            };
            setVersions([newVersion, ...versions]);
        }
    };

    const handleDelete = (versionId) => {
        if (confirm('Are you sure you want to delete this resume version?')) {
            setVersions(prev => prev.filter(v => v.id !== versionId));
            setSelectedVersions(prev => prev.filter(id => id !== versionId));
        }
    };

    const handleRename = (versionId) => {
        const version = versions.find(v => v.id === versionId);
        if (version) {
            const newName = prompt('Enter new name:', version.name);
            if (newName && newName !== version.name) {
                setVersions(prev => prev.map(v =>
                    v.id === versionId ? { ...v, name: newName } : v
                ));
            }
        }
    };

    const getScoreColor = (score) => {
        if (score >= 85) return 'text-green-600';
        if (score >= 70) return 'text-amber-600';
        return 'text-red-600';
    };

    const getScoreBgColor = (score) => {
        if (score >= 85) return 'bg-green-100';
        if (score >= 70) return 'bg-amber-100';
        return 'bg-red-100';
    };

    const getTemplateColor = (template) => {
        const colors = {
            modern: 'bg-blue-500',
            creative: 'bg-purple-500',
            professional: 'bg-slate-600',
            minimalist: 'bg-emerald-500',
            ats: 'bg-green-500',
            executive: 'bg-amber-600',
            tech: 'bg-indigo-500'
        };
        return colors[template] || 'bg-stone-500';
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-modal rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/30 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-stone-900">Resume Versions</h2>
                        <p className="text-stone-600 mt-1">Manage and compare multiple resume versions</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                        <span className="text-stone-500">✕</span>
                    </button>
                </div>

                {/* Toolbar */}
                <div className="p-6 border-b border-white/30 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-stone-500" />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-3 py-2 border border-stone-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Versions</option>
                                <option value="primary">Primary Only</option>
                                <option value="recent">Recent (30 days)</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-stone-500">
                                {filteredVersions.length} version{filteredVersions.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                            <span className="text-sm text-stone-600">Selected: {selectedVersions.length}</span>
                        </div>
                        {selectedVersions.length > 0 && (
                            <button
                                onClick={() => {
                                    // In a real app, this would compare selected versions
                                    alert('Comparison feature coming soon!');
                                }}
                                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                                <Eye className="w-4 h-4" />
                                Compare Selected
                            </button>
                        )}
                        <button
                            onClick={() => {
                                // In a real app, this would create a new version
                                alert('Create new version feature coming soon!');
                            }}
                            className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            New Version
                        </button>
                    </div>
                </div>

                {/* View Toggle */}
                <div className="px-6 py-3 border-b border-white/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-stone-700">View:</span>
                        <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-stone-600 hover:bg-stone-200'
                                    }`}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-stone-600 hover:bg-stone-200'
                                    }`}
                            >
                                List
                            </button>
                        </div>
                    </div>
                    <div className="text-xs text-stone-500">
                        {selectedVersions.length > 0 && `Comparing ${selectedVersions.length} versions`}
                    </div>
                </div>

                {/* Versions List */}
                <div className="overflow-auto max-h-[400px] p-6">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredVersions.map(version => (
                                <motion.div
                                    key={version.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`glass-card p-4 rounded-xl cursor-pointer transition-all ${selectedVersions.includes(version.id) ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
                                        }`}
                                    onClick={() => handleSelectVersion(version.id)}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedVersions.includes(version.id)}
                                                onChange={() => handleSelectVersion(version.id)}
                                                className="w-4 h-4 rounded border-stone-300"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-stone-900">{version.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTemplateColor(version.template)} text-white`}>
                                                        {version.template}
                                                    </span>
                                                    {version.isPrimary && (
                                                        <Star className="w-3 h-3 text-amber-500" fill="currentColor" />
                          )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {version.isPrimary ? (
                                                <button
                                                    onClick={() => handleSetPrimary(version.id)}
                                                    className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors"
                                                    title="Already primary"
                                                >
                                                    <Star className="w-4 h-4 text-amber-500" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleSetPrimary(version.id)}
                                                    className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors"
                                                    title="Set as primary"
                                                >
                                                    <Star className="w-4 h-4 text-stone-300" />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Score Badge */}
                                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getScoreColor(version.score)} ${getScoreBgColor(version.score)}`}>
                                        <CheckCircle className="w-3 h-3" />
                                        {version.score}%
                                    </div>

                                    {/* Metadata */}
                                    <div className="space-y-2 mt-3">
                                        <div className="flex items-center gap-2 text-xs text-stone-500">
                                            <Calendar className="w-3 h-3" />
                                            Created: {new Date(version.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-stone-500">
                                            <Clock className="w-3 h-3" />
                                            Modified: {new Date(version.lastModified).toLocaleDateString()}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
                                        <button
                                            onClick={() => handleRename(version.id)}
                                            className="flex-1 items-center justify-center gap-1.5 px-3 py-2 text-stone-600 hover:text-stone-800 hover:bg-stone-50 rounded-lg transition-colors text-sm"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                            Rename
                                        </button>
                                        <button
                                            onClick={() => handleDuplicate(version.id)}
                                            className="flex-1 items-center justify-center gap-1.5 px-3 py-2 text-stone-600 hover:text-stone-800 hover:bg-stone-50 rounded-lg transition-colors text-sm"
                                        >
                                            <Copy className="w-4 h-4" />
                                            Duplicate
                                        </button>
                                        <button
                                            onClick={() => handleDelete(version.id)}
                                            className="flex-1 items-center justify-center gap-1.5 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors text-sm"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredVersions.map(version => (
                                <motion.div
                                    key={version.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`glass-card p-4 rounded-xl cursor-pointer transition-all ${selectedVersions.includes(version.id) ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
                                        }`}
                                    onClick={() => handleSelectVersion(version.id)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedVersions.includes(version.id)}
                                                onChange={() => handleSelectVersion(version.id)}
                                                className="w-4 h-4 rounded border-stone-300"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-stone-900">{version.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTemplateColor(version.template)} text-white`}>
                                                        {version.template}
                                                    </span>
                                                    {version.isPrimary && (
                                                        <Star className="w-3 h-3 text-amber-500" fill="currentColor" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getScoreColor(version.score)} ${getScoreBgColor(version.score)}`}>
                                            <CheckCircle className="w-3 h-3" />
                                            {version.score}%
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-stone-500">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(version.createdAt).toLocaleDateString()}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleRename(version.id)}
                                            className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors"
                                        >
                                            <Edit3 className="w-4 h-4 text-stone-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDuplicate(version.id)}
                                            className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors"
                                        >
                                            <Copy className="w-4 h-4 text-stone-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(version.id)}
                                            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/30 flex items-center justify-between">
                    <div className="text-sm text-stone-500">
                        <FolderOpen className="w-4 h-4 inline mr-2" />
                        {selectedVersions.length > 0
                            ? `Ready to compare ${selectedVersions.length} versions`
                            : 'Select versions to compare'}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-4 py-2.5 border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                        >
                            Close
                        </button>
                        {selectedVersions.length > 0 && (
                            <button
                                onClick={() => {
                                    // In a real app, this would export selected versions
                                    alert('Export comparison coming soon!');
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                            >
                                <Download className="w-4 h-4" />
                                Export Comparison
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ResumeVersionManager;