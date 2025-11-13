
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
    // Sync local state if parent's value changes, e.g., due to the other input's logic
    // or after a value has been processed and submitted.
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Update local state immediately for a responsive feel.
    setInputValue(newValue);

    // This logic is primarily for the native stepper arrows to work.
    // When the steppers are used, `newValue` is a clean integer string.
    // We check for this and update the parent state immediately.
    // For more complex user input (like clearing the field, or typing "05"),
    // this condition will be false, and the update will be deferred to onBlur/onEnter,
    // preserving the improved UX for manual typing.
    const num = parseInt(newValue, 10);
    if (!isNaN(num) && num.toString() === newValue) {
      const clampedValue = Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, num));
      // Only call parent onChange if the value is actually different.
      if (clampedValue !== value) {
        onChange(clampedValue);
      }
    }
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
