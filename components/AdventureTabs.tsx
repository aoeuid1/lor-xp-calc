
import React, { useState } from 'react';
import { Campaign, Adventure } from '../types';
import AdventureCard from './AdventureCard';

interface AdventureTabsProps {
  adventures: Adventure[];
  xpNeeded: number;
}

const TABS = Object.values(Campaign);

const AdventureTabs: React.FC<AdventureTabsProps> = ({ adventures, xpNeeded }) => {
  const [activeTab, setActiveTab] = useState<Campaign>(TABS[0]);

  const filteredAdventures = adventures.filter(adv => adv.campaign === activeTab);

  return (
    <div>
      <div className="mb-6 border-b-2 border-brand-surface flex justify-center space-x-2 sm:space-x-4">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-6 py-3 text-sm sm:text-base font-semibold uppercase tracking-wider transition-colors duration-200 focus:outline-none ${
              activeTab === tab
                ? 'border-b-2 border-brand-primary text-brand-primary'
                : 'border-b-2 border-transparent text-brand-text-secondary hover:text-brand-text'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredAdventures.map(adv => (
          <AdventureCard key={adv.name} adventure={adv} xpNeeded={xpNeeded} />
        ))}
      </div>
    </div>
  );
};

export default AdventureTabs;
