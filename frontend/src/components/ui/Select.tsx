import type { SelectHTMLAttributes } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
}

export function Select({
  label,
  error,
  options,
  id,
  className = '',
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="block font-mono text-xs uppercase tracking-wider text-ink"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full border bg-surface px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none ${
          error ? 'border-signal' : 'border-hairline'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-signal">{error}</p>}
    </div>
  );
}
