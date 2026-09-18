import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

const Input = forwardRef(function Input(
  { label, error, hint, required, className, id, leftIcon: LeftIcon, rightIcon: RightIcon, ...props },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="label-base">
          {label}
          {required && (
            <span className="ml-0.5 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400 dark:text-gray-500">
            <LeftIcon className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={cn(
            'input-base',
            LeftIcon && '!pl-10',
            RightIcon && '!pr-10',
            error && 'input-error'
          )}
          {...props}
        />
        {RightIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 dark:text-gray-500">
            <RightIcon className="h-4 w-4" aria-hidden="true" />
          </div>
        )}
      </div>
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="mt-1.5 text-xs font-medium text-red-500">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-gray-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
});

export default Input;