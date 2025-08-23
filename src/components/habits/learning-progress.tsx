'use client';

import { useState } from 'react';

interface LearningProgressProps {
  totalEntries: number;
  entriesThisWeek: number;
  entriesThisMonth: number;
}

export default function LearningProgress({ 
  totalEntries, 
  entriesThisWeek,
  entriesThisMonth 
}: LearningProgressProps) {
  const [monthlyGoal] = useState(20);
  const progress = Math.round((entriesThisMonth / monthlyGoal) * 100);

  return (
    <div className="simple-progress-container">
      <div className="progress-header">
        <h2>Journey Tracker</h2>
        <span className="total-entries">{totalEntries}</span>
      </div>
      
      <div className="progress-stats">
        <div className="stat-item">
          <span className="stat-value">{entriesThisWeek}</span>
          <span className="stat-label">This Week</span>
        </div>
        <div className="progress-circle">
          <div className="circle-progress" style={{
            background: `conic-gradient(#22c55e ${progress * 3.6}deg, #e5e7eb 0deg)`
          }}>
            <div className="circle-inner">
              <span className="progress-percent">{progress}%</span>
            </div>
          </div>
        </div>
        <div className="stat-item">
          <span className="stat-value">{entriesThisMonth}</span>
          <span className="stat-label">This Month</span>
        </div>
      </div>
      
      <div className="goal-text">
        Goal: {monthlyGoal} entries this month
      </div>
    </div>
  );
}
