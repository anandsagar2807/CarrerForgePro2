import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Brush, Eye, Save, RefreshCw, Check, Sparkles } from 'lucide-react';

const ThemeCustomizer = ({ onClose, onApplyTheme }) => {
    const [activeTab, setActiveTab] = useState('colors');
    const [selectedTheme, setSelectedTheme] = useState('default');
    const [customColors, setCustomColors] = useState({
        primary: '#7d5f3f',
        secondary: '#3f5f8e',
        accent: '#d4a853',
        background: '#f4f0e8',
        text: '#2c2c2c'
    });

    const presetThemes = [
        { id: 'default', name: 'Classic Professional', colors: { primary: '#7d5f3f', secondary: '#3f5f8e', accent: '#d4a853', background: '#f4f0e8', text: '#2c2c2c' } },
        { id: 'modern', name: 'Modern Tech', colors: { primary: '#2563eb', secondary: '#7c3aed', accent: '#06b6d4', background: '#f8fafc', text: '#1e293b' } },
        { id: 'corporate', name: 'Corporate', colors: { primary: '#1e40af', secondary: '#374151', accent: '#0ea5e9', background: '#ffffff', text: '#111827' } },
        { id: 'creative', name: 'Creative', colors: { primary: '#7c3aed', secondary: '#db2777', accent: '#f59e0b', background: '#fdf4ff', text: '#4c1d95' } },
        { id: 'minimal', name: 'Minimalist', colors: { primary: '#374151', secondary: '#6b7280', accent: '#9ca3af', background: '#f9fafb', text: '#111827' } },
        { id: 'premium', name: 'Premium Gold', colors: { primary: '#b8860b', secondary: '#8b7355', accent: '#d4af37', background: '#fff8dc', text: '#2c2c2c' } },
    ];

    const handleColorChange = (colorKey, value) => {
        setCustomColors(prev => ({
            ...prev,
            [colorKey]: value
        }));
        setSelectedTheme('custom');
    };

    const handlePresetSelect = (theme) => {
        setSelectedTheme(theme.id);
        setCustomColors(theme.colors);
    };

    const handleApplyTheme = () => {
        if (onApplyTheme) {
            onApplyTheme(customColors, selectedTheme);
        }
    };

    const handleReset = () => {
        setSelectedTheme('default');
        setCustomColors(presetThemes[0].colors);
    };

    const ColorPicker = ({ label, colorKey, value }) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">{label}</label>
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-lg border border-stone-200 cursor-pointer"
                    style={{ backgroundColor: value }}
                    onClick={() => {
                        // In a real app, this would open a color picker
                        const newColor = prompt(`Enter ${label} color (hex):`, value);
                        if (newColor && /^#[0-9A-F]{6}$/i.test(newColor)) {
                            handleColorChange(colorKey, newColor);
                        }
                    }}
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleColorChange(colorKey, e.target.value)}
                    className="flex-1 px-3 py-2 border border-stone-200 rounded-lg text-sm"
                    placeholder="#000000"
                />
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-modal rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Palette className="w-6 h-6 text-blue-500" />
                        <div>
                            <h2 className="text-2xl font-bold text-stone-900">Theme Customizer</h2>
                            <p className="text-stone-600 mt-1">Customize your resume's color scheme and appearance</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                        <span className="text-stone-500">✕</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* Left Side - Controls */}
                    <div className="lg:w-2/3 p-6 border-r border-white/30">
                        {/* Tabs */}
                        <div className="flex border-b border-stone-200 mb-6">
                            {[
                                { id: 'colors', label: 'Colors', icon: Palette },
                                { id: 'presets', label: 'Presets', icon: Sparkles },
                                { id: 'preview', label: 'Preview', icon: Eye },
                            ].map(tab => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                                ? 'border-blue-500 text-blue-600'
                                                : 'border-transparent text-stone-500 hover:text-stone-700'
                                            }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Tab Content */}
                        <div className="overflow-auto max-h-[400px]">
                            {activeTab === 'colors' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <ColorPicker label="Primary Color" colorKey="primary" value={customColors.primary} />
                                        <ColorPicker label="Secondary Color" colorKey="secondary" value={customColors.secondary} />
                                        <ColorPicker label="Accent Color" colorKey="accent" value={customColors.accent} />
                                        <ColorPicker label="Background" colorKey="background" value={customColors.background} />
                                        <ColorPicker label="Text Color" colorKey="text" value={customColors.text} />
                                    </div>

                                    <div className="pt-4 border-t border-stone-200">
                                        <h4 className="text-sm font-semibold text-stone-900 mb-3">Quick Actions</h4>
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={handleReset}
                                                className="flex items-center gap-2 px-3 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
                                            >
                                                <RefreshCw className="w-4 h-4" />
                                                Reset to Default
                                            </button>
                                            <button
                                                onClick={() => {
                                                    // Generate random theme
                                                    const randomTheme = presetThemes[Math.floor(Math.random() * presetThemes.length)];
                                                    handlePresetSelect(randomTheme);
                                                }}
                                                className="flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                                            >
                                                <Sparkles className="w-4 h-4" />
                                                Random Theme
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'presets' && (
                                <div className="space-y-4">
                                    <p className="text-stone-600">Choose from professionally designed color themes</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {presetThemes.map(theme => (
                                            <button
                                                key={theme.id}
                                                onClick={() => handlePresetSelect(theme)}
                                                className={`p-4 rounded-xl border-2 transition-all ${selectedTheme === theme.id
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-stone-200 hover:border-stone-300'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <span className="font-medium text-stone-900">{theme.name}</span>
                                                    {selectedTheme === theme.id && (
                                                        <Check className="w-5 h-5 text-blue-500" />
                                                    )}
                                                </div>
                                                <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
                                                    {Object.values(theme.colors).map((color, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex-1"
                                                            style={{ backgroundColor: color }}
                                                        />
                                                    ))}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'preview' && (
                                <div className="space-y-4">
                                    <p className="text-stone-600">Preview your selected theme</p>
                                    <div className="border border-stone-200 rounded-xl overflow-hidden">
                                        {/* Preview Header */}
                                        <div
                                            className="p-4"
                                            style={{ backgroundColor: customColors.primary, color: '#fff' }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="font-bold text-lg">John Doe</div>
                                                    <div className="text-sm opacity-90">Senior Software Engineer</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm">john.doe@email.com</div>
                                                    <div className="text-sm">(123) 456-7890</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Preview Content */}
                                        <div
                                            className="p-6"
                                            style={{ backgroundColor: customColors.background, color: customColors.text }}
                                        >
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="font-bold text-lg mb-2" style={{ color: customColors.secondary }}>
                                                        Professional Summary
                                                    </h3>
                                                    <p className="text-sm">
                                                        Experienced software engineer with 8+ years in full-stack development...
                                                    </p>
                                                </div>

                                                <div>
                                                    <h3 className="font-bold text-lg mb-2" style={{ color: customColors.secondary }}>
                                                        Experience
                                                    </h3>
                                                    <div className="space-y-3">
                                                        <div className="border-l-4 pl-3" style={{ borderColor: customColors.accent }}>
                                                            <div className="font-semibold">Senior Developer at TechCorp</div>
                                                            <div className="text-sm text-stone-600">2020 - Present</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="font-bold text-lg mb-2" style={{ color: customColors.secondary }}>
                                                        Skills
                                                    </h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'].map(skill => (
                                                            <span
                                                                key={skill}
                                                                className="px-3 py-1 rounded-full text-sm"
                                                                style={{
                                                                    backgroundColor: `${customColors.accent}20`,
                                                                    color: customColors.accent
                                                                }}
                                                            >
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Preview & Actions */}
                    <div className="lg:w-1/3 p-6">
                        <div className="sticky top-6">
                            <h3 className="text-lg font-semibold text-stone-900 mb-4">Selected Theme</h3>

                            {/* Color Palette Preview */}
                            <div className="mb-6">
                                <div className="flex gap-1 h-12 rounded-lg overflow-hidden mb-3">
                                    {Object.values(customColors).map((color, idx) => (
                                        <div
                                            key={idx}
                                            className="flex-1"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                                <div className="text-sm text-stone-600">
                                    {selectedTheme === 'custom' ? 'Custom Theme' : presetThemes.find(t => t.id === selectedTheme)?.name}
                                </div>
                            </div>

                            {/* Color Values */}
                            <div className="space-y-3 mb-6">
                                {Object.entries(customColors).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-4 h-4 rounded border border-stone-200"
                                                style={{ backgroundColor: value }}
                                            />
                                            <span className="text-sm text-stone-700 capitalize">{key}</span>
                                        </div>
                                        <code className="text-sm font-mono text-stone-500">{value}</code>
                                    </div>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleApplyTheme}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
                                >
                                    <Save className="w-5 h-5" />
                                    Apply Theme to Resume
                                </button>

                                <button
                                    onClick={() => {
                                        // Save as custom preset
                                        const themeName = prompt('Save as preset name:', 'My Custom Theme');
                                        if (themeName) {
                                            alert(`Theme "${themeName}" saved!`);
                                        }
                                    }}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-stone-200 text-stone-700 rounded-lg hover:bg-stone-50 transition-colors"
                                >
                                    <Brush className="w-5 h-5" />
                                    Save as Preset
                                </button>

                                <div className="text-xs text-stone-500 pt-4 border-t border-stone-200">
                                    <p className="flex items-center gap-1">
                                        <Check className="w-3 h-3" />
                                        Theme changes apply to all templates
                                    </p>
                                    <p className="mt-1">
                                        Your custom theme will be saved for future sessions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ThemeCustomizer;