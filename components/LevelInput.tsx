
import React from 'react';
import { MAX_LEVEL, MIN_LEVEL } from '../constants';

interface LevelInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const LevelInput: React.FC<LevelInputProps> = ({ label, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = parseInt(e.target.value, 10);
    if (!isNaN(numValue)) {
      onChange(numValue);
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
        min={MIN_LEVEL}
        max={MAX_LEVEL}
        value={value}
        onChange={handleChange}
        className="w-full max-w-[150px] text-center bg-brand-bg/50 border-2 border-brand-secondary rounded-lg text-brand-primary text-3xl font-bold p-2 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
      />
    </div>
  );
};

export default LevelInput;
