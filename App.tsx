import React, { useState, useMemo } from 'react';
import { CUMULATIVE_XP_PER_LEVEL, ADVENTURES, MAX_LEVEL, MIN_LEVEL } from './constants';
import LevelInput from './components/LevelInput';
import AdventureTabs from './components/AdventureTabs';
import BonusInput from './components/BonusInput';

function App() {
  const [currentLevel, setCurrentLevel] = useState(MIN_LEVEL);
  const [targetLevel, setTargetLevel] = useState(30);
  const [xpBonusPercent, setXpBonusPercent] = useState(0);

  const xpNeeded = useMemo(() => {
    if (targetLevel <= currentLevel || CUMULATIVE_XP_PER_LEVEL[targetLevel] == null || CUMULATIVE_XP_PER_LEVEL[currentLevel] == null) {
      return 0;
    }
    const targetXp = CUMULATIVE_XP_PER_LEVEL[targetLevel];
    const currentXp = CUMULATIVE_XP_PER_LEVEL[currentLevel];
    return targetXp - currentXp;
  }, [currentLevel, targetLevel]);
  
  const xpMultiplier = useMemo(() => 1 + (xpBonusPercent / 100), [xpBonusPercent]);

  const handleCurrentLevelChange = (level: number) => {
    if (level >= MIN_LEVEL && level <= MAX_LEVEL) {
      setCurrentLevel(level);
      if (level > targetLevel) {
        setTargetLevel(level);
      }
    }
  };

  const handleTargetLevelChange = (level: number) => {
    if (level >= MIN_LEVEL && level <= MAX_LEVEL) {
      setTargetLevel(level);
       if (level < currentLevel) {
        setCurrentLevel(level);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 font-sans">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-primary tracking-tight">LoR Adventure XP Calculator</h1>
        <p className="text-lg text-brand-text-secondary mt-2">
          Calculate how many adventures you need to reach your target Champion level.
        </p>
      </header>

      <main className="w-full max-w-5xl">
        <div className="bg-brand-surface rounded-xl shadow-2xl p-6 sm:p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <LevelInput
              label="Current Level"
              value={currentLevel}
              onChange={handleCurrentLevelChange}
            />
            <div className="text-center text-brand-text-secondary font-bold text-2xl hidden md:block">→</div>
             <LevelInput
              label="Target Level"
              value={targetLevel}
              onChange={handleTargetLevelChange}
            />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-brand-bg/50 rounded-lg p-4 gap-4">
            <div className="text-center sm:text-left">
              <span className="text-brand-text-secondary uppercase text-sm tracking-wider">Total XP Required</span>
              <p className="text-4xl font-bold text-brand-primary tracking-tighter">
                {xpNeeded.toLocaleString()}
              </p>
            </div>
            <BonusInput value={xpBonusPercent} onChange={setXpBonusPercent} />
          </div>
        </div>

        <AdventureTabs adventures={ADVENTURES} xpNeeded={xpNeeded} xpBonus={xpMultiplier} />
      </main>
      
      <footer className="w-full max-w-5xl text-center mt-12 text-brand-text-secondary text-sm">
        <p>Data sourced from the fan-run Legends of Runeterra Wiki.</p>
        <p>This is an unofficial tool and is not affiliated with Riot Games.</p>
      </footer>
    </div>
  );
}

export default App;