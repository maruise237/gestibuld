import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTabs = ({ activeTab, onTabChange, projectCounts }) => {
  const tabs = [
    {
      id: 'active',
      label: 'Projets actifs',
      icon: 'Play',
      count: projectCounts.active || 0
    },
    {
      id: 'completed',
      label: 'Terminés',
      icon: 'CheckCircle',
      count: projectCounts.completed || 0
    },
    {
      id: 'planning',
      label: 'En planification',
      icon: 'Calendar',
      count: projectCounts.planning || 0
    }
  ];

  return (
    <div className="border-b border-border mb-6">
      <div className="flex overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap construction-hover-transition ${
              activeTab === tab.id
                ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectTabs;