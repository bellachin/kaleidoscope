import './Pagination.css';

interface PaginationProps {
  count: number;
  active: number;
  onSelect?: (index: number) => void;
  /** Autoplay interval in ms; shows a progress fill on the active pill. Omit for no fill. */
  interval?: number;
  paused?: boolean;
}

/** Dots shrink the further they are from the active one; the active dot is a pill. */
export default function Pagination({ count, active, onSelect, interval, paused }: PaginationProps) {
  if (count < 2) return null;
  return (
    <div
      className={`pagination${paused ? ' pagination--paused' : ''}`}
      style={interval ? ({ '--interval': `${interval}ms` } as React.CSSProperties) : undefined}
      role="tablist"
      aria-label="Slides"
    >
      {Array.from({ length: count }, (_, i) => {
        const d = Math.abs(i - active);
        const size = d === 0 ? 'active' : d <= 3 ? 'md' : d === 4 ? 'sm' : 'xs';
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Go to slide ${i + 1}`}
            className={`pagination__dot pagination__dot--${size}`}
            onClick={() => onSelect?.(i)}
          />
        );
      })}
    </div>
  );
}
