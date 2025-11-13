import React, { useState, useEffect } from 'react';

const MIN_BONUS = 0;
const MAX_BONUS = 10000;
const STEP = 100;

interface BonusInputProps {
  value: number;
  onChange: (value: number) => void;
}

const BonusInput: React.FC<BonusInputProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    // This effect syncs the local input value with the parent component's state.
    // It's crucial for when the parent state changes due to stepping or validation.
    setInputValue(value.toString());
  }, [value]);

  const processAndSubmitValue = () => {
    let num = parseInt(inputValue, 10);

    if (isNaN(num)) {
      // If user leaves the input empty or invalid, revert to the last valid value from parent state.
      setInputValue(value.toString());
      return;
    }
    
    const clampedValue = Math.max(MIN_BONUS, Math.min(MAX_BONUS, num));

    if (clampedValue !== value) {
      onChange(clampedValue);
    } else {
      // Normalize the input field if the text is different but the value is the same (e.g., user typed "050")
      setInputValue(clampedValue.toString());
    }
  };

  const handleStep = (direction: 'up' | 'down') => {
    // When stepping, we base the calculation on the number currently in the input field.
    let currentNum = parseInt(inputValue, 10);
    
    // If the input is empty or invalid, we'll start stepping from 0.
    if (isNaN(currentNum)) {
      currentNum = 0;
    }

    const nextValue = direction === 'up' ? currentNum + STEP : currentNum - STEP;
    const clampedValue = Math.max(MIN_BONUS, Math.min(MAX_BONUS, nextValue));
    
    // Immediately commit the new value to the parent state.
    onChange(clampedValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    processAndSubmitValue();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processAndSubmitValue();
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      handleStep('up');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      handleStep('down');
    }
  };

  const StepperButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void; }) => (
    <button
      type="button"
      onClick={onClick}
      className="w-9 h-9 flex items-center justify-center bg-brand-secondary text-brand-primary rounded-md font-bold text-2xl transition-all hover:bg-brand-primary hover:text-brand-bg focus:outline-none focus:ring-2 focus:ring-brand-primary"
      aria-hidden="true"
    >
      {children}
    </button>
  );

  return (
    <div className="w-44">
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1">
        <label
          htmlFor="xp-bonus"
          className="text-sm text-brand-text-secondary uppercase tracking-wider"
        >
          XP Bonus
        </label>
        <StepperButton onClick={() => handleStep('up')}>+</StepperButton>

        <div className="relative flex items-center">
          <span className="absolute left-3 text-brand-text-secondary font-semibold pointer-events-none">
            +
          </span>
          <input
            id="xp-bonus"
            type="number"
            min={MIN_BONUS}
            max={MAX_BONUS}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full text-center bg-brand-bg/70 border border-brand-secondary rounded-md text-brand-primary font-semibold p-1 pl-7 pr-8 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all no-spinner"
            aria-label="XP Bonus Percentage"
          />
          <span className="absolute right-3 text-brand-text-secondary font-semibold pointer-events-none">
            %
          </span>
        </div>
        <StepperButton onClick={() => handleStep('down')}>-</StepperButton>
      </div>
    </div>
  );
};

export default BonusInput;
