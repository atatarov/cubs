type CounterRowProps = {
  label: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

export function CounterRow({
  label,
  value,
  onDecrement,
  onIncrement,
}: CounterRowProps) {
  return (
    <div className="counter-row">
      <span className="counter-row__label">{label}</span>

      <div className="counter-row__controls">
        <button
          type="button"
          className="counter-button"
          onClick={onDecrement}
          disabled={value === 0}
          aria-label={`Уменьшить количество: ${label}`}
        >
          −
        </button>

        <span className="counter-row__value">{value}</span>

        <button
          type="button"
          className="counter-button"
          onClick={onIncrement}
          aria-label={`Увеличить количество: ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}