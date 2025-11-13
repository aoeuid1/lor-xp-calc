import React, { useState, useEffect } from 'react';

const MIN_BONUS = 1;
const MAX_BONUS = 10;

interface BonusInputProps {
  value: number;
  onChange: (value: number) => void;
}

const BonusInput: React.FC<BonusInputProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    // Sync with parent state if it changes
    if (parseFloat(inputValue) !== value) {
        setInputValue(value.toString());
    }
  }, [value]);

  const processAndSubmitValue = () => {
    let num = parseFloat(inputValue);

    if (isNaN(num)) {
      setInputValue(value.toString());
      return;
    }

    const clampedValue = Math.max(MIN_BONUS, Math.min(MAX_BONUS, num));
    
    // Format to a reasonable number of decimal places to avoid floating point weirdness
    const finalValue = parseFloat(clampedValue.toFixed(2));

    if (finalValue !== value) {
      onChange(finalValue);
    }
    
    // Always normalize the displayed value after processing
    setInputValue(finalValue.toString());
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
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <label htmlFor="xp-bonus" className="text-sm text-brand-text-secondary uppercase tracking-wider">
        XP Bonus
      </label>
      <input
        id="xp-bonus"
        type="number"
        step="0.1"
        min={MIN_BONUS}
        max={MAX_BONUS}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-24 text-center bg-brand-bg/70 border border-brand-secondary rounded-md text-brand-primary font-semibold p-1 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
        aria-label="XP Bonus Multiplier"
      />
    </div>
  );
};

export default BonusInput;
