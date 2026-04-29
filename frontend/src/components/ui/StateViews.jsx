import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-stone-400" />
        </div>
      )}
      <h3 className="text-base font-medium text-stone-900 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-stone-500 max-w-xs mb-4">{description}</p>
      )}
      {action && actionLabel && (
        <Button onClick={action} variant="secondary" size="sm">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export const ErrorState = ({
  title = 'Something went wrong',
  description = 'Please try again later.',
  onRetry,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col items-center justify-center text-center py-12 px-6 ${className}`}
    >
      <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-base font-medium text-stone-900 mb-1">{title}</h3>
      <p className="text-sm text-stone-500 max-w-xs mb-4">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" size="sm">
          Try again
        </Button>
      )}
    </motion.div>
  );
};