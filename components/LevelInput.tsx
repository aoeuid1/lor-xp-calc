
import React, { useState, useEffect } from 'react';
import { MAX_LEVEL, MIN_LEVEL } from '../constants';

interface LevelInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const LevelInput: React.FC<LevelInputProps> = ({ label, value, onChange }) => {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    // Sync local state if parent's value changes, e.g., due to the other input's logic.
    // This ensures the input reflects the canonical state from the parent App component.
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow the user to type freely, including an empty string.
    setInputValue(e.target.value);
  };

  const processAndSubmitValue = () => {
    let num = parseInt(inputValue, 10);

    if (isNaN(num)) {
      // If the input is empty or not a valid number, revert to the last valid value from the parent.
      setInputValue(value.toString());
      return;
    }
    
    // Clamp the value to be within the allowed min/max range.
    const clampedValue = Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, num));

    if (clampedValue !== value) {
      // If the processed value is different, notify the parent component.
      onChange(clampedValue);
    } else {
      // If the underlying value is unchanged, but the text might be different (e.g., "01" vs "1"),
      // normalize the input's text to match the canonical value.
      setInputValue(clampedValue.toString());
    }
  };

  const handleBlur = () => {
    processAndSubmitValue();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processAndSubmitValue();
      // Blur the input to signify completion of editing.
      (e.target as HTMLInputElement).blur();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor={label} className="mb-2 text-sm font-medium text-brand-text-secondary uppercase tracking-wider">
        {label}
      </label>
      <input
        id={label}
        type="number"
        // We handle validation manually, so we remove native min/max to allow temporary out-of-range values during typing.
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full max-w-[150px] text-center bg-brand-bg/50 border-2 border-brand-secondary rounded-lg text-brand-primary text-3xl font-bold p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
      />
    </div>
  );
};

export default LevelInput;
