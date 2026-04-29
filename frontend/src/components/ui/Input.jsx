import React, { forwardRef } from 'react';

export const Input = forwardRef(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full px-4 py-2.5 bg-white border rounded-lg text-stone-900
          placeholder:text-stone-400
          transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500
          hover:border-stone-300
          disabled:bg-stone-50 disabled:text-stone-500 disabled:cursor-not-allowed
          ${error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-stone-200'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export const Textarea = forwardRef(({
  label,
  error,
  className = '',
  rows = 4,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-stone-700 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`
          w-full px-4 py-2.5 bg-white border rounded-lg text-stone-900
          placeholder:text-stone-400 resize-none
          transition-all duration-150
          focus:outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500
          hover:border-stone-300
          disabled:bg-stone-50 disabled:text-stone-500 disabled:cursor-not-allowed
          ${error ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' : 'border-stone-200'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';