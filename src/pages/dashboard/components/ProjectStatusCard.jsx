import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectStatusCard = ({ project }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'en cours':
        return 'bg-primary text-primary-foreground';
      case 'terminé':
        return 'bg-success text-success-foreground';
      case 'en retard':
        return 'bg-error text-error-foreground';
      case 'planifié':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority.toLowerCase()) {
      case 'haute':
        return { name: 'AlertTriangle', color: 'text-error' };
      case 'moyenne':
        return { name: 'AlertCircle', color: 'text-warning' };
      case 'basse':
        return { name: 'Info', color: 'text-success' };
      default:
        return { name: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const priorityConfig = getPriorityIcon(project.priority);

  return (
    <div className="bg-card rounded-lg border border-border p-6 construction-shadow-card construction-hover-transition hover:shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
            <Icon 
              name={priorityConfig.name} 
              size={16} 
              className={priorityConfig.color} 
            />
          </div>
          <p className="text-sm text-muted-foreground mb-2">{project.client}</p>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
        {project.image && (
          <div className="w-16 h-16 rounded-lg overflow-hidden ml-4">
            <Image 
              src={project.image} 
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progression</span>
            <span className="text-sm font-medium text-foreground">{project.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full construction-transition"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Échéance:</span>
          </div>
          <span className="text-foreground font-medium">{project.deadline}</span>
          
          <div className="flex items-center gap-2">
            <Icon name="Euro" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Budget:</span>
          </div>
          <span className="text-foreground font-medium">{project.budget}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Icon name="Users" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{project.teamSize} membres</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{project.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStatusCard;