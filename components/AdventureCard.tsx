
import React, { useMemo } from 'react';
import { Adventure } from '../types';
import { StarIcon } from './Icons';

interface AdventureCardProps {
  adventure: Adventure;
  xpNeeded: number;
}

const AdventureCard: React.FC<AdventureCardProps> = ({ adventure, xpNeeded }) => {
  const runsNeeded = useMemo(() => {
    if (xpNeeded <= 0 || adventure.xp <= 0) return 0;
    return Math.ceil(xpNeeded / adventure.xp);
  }, [xpNeeded, adventure.xp]);

  return (
    <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105 duration-300">
      <div className="p-5 flex-grow">
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-brand-text pr-2">{adventure.name}</h3>
            <div className="flex items-center space-x-1 text-yellow-400 flex-shrink-0">
                <span className="font-bold">{adventure.stars}</span>
                <StarIcon className="w-4 h-4" />
            </div>
        </div>
        <p className="text-sm text-brand-text-secondary mt-1">{adventure.xp.toLocaleString()} XP per run</p>
      </div>
      <div className="bg-brand-bg/50 px-5 py-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-brand-text-secondary uppercase">Runs Needed</span>
          <span className="text-2xl font-bold text-brand-primary">{runsNeeded.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AdventureCard;
