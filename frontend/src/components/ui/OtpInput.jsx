import { useRef } from 'react';

import { cn } from '@/utils/cn';

export default function OtpInput({ length = 4, value = '', onChange, error, disabled = false }) {
  const inputsRef = useRef([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? '');

  function handleChange(index, e) {
    const raw = e.target.value.replace(/\D/g, '');
    let next = value.split('');
    if (!raw) {
      next[index] = '';
      onChange?.(next.join(''));
      return;
    }
    next[index] = raw[raw.length - 1];
    onChange?.(next.join(''));

    if (index < length - 1 && raw) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pasted) {
      e.preventDefault();
      onChange?.(pasted);
      inputsRef.current[Math.min(pasted.length, length - 1)]?.focus();
    }
  }

  return (
    <div>
      <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            autoComplete="one-time-code"
            autoFocus={index === 0}
            disabled={disabled}
            value={digit}
            aria-label={`Digit ${index + 1} of ${length}`}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className={cn(
              'focus-ring h-14 w-full max-w-[72px] rounded-xl border border-gray-300 bg-white text-center font-display text-xl font-bold text-gray-900 transition focus:border-primary-500',
              error && 'border-red-400 focus:border-red-500',
              disabled && 'cursor-not-allowed bg-gray-100 opacity-60'
            )}
          />
        ))}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}