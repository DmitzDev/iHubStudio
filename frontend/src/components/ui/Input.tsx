import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({
  label,
  error,
  hint,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block font-mono text-xs uppercase tracking-wider text-ink"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none ${
          error ? 'border-signal' : 'border-hairline'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-signal">{error}</p>}
      {!error && hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({
  label,
  error,
  hint,
  id,
  className = '',
  ...props
}: TextareaProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block font-mono text-xs uppercase tracking-wider text-ink"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={`w-full border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/60 focus:border-accent focus:outline-none ${
          error ? 'border-signal' : 'border-hairline'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-signal">{error}</p>}
      {!error && hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}
