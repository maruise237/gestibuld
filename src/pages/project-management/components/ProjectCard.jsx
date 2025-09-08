import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails, onStatusUpdate, onPhotoUpload }) => {
  const [isHovered, setIsHovered] = useState(false);

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
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'haute':
        return 'text-error';
      case 'moyenne':
        return 'text-warning';
      case 'faible':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR').format(new Date(date));
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-6 construction-shadow-card construction-hover-transition hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            Client: {project.client.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
          <Icon 
            name="MoreVertical" 
            size={16} 
            className="text-muted-foreground cursor-pointer hover:text-foreground"
          />
        </div>
      </div>

      {/* Project Image */}
      <div className="mb-4 overflow-hidden rounded-lg">
        <Image
          src={project.image}
          alt={project.name}
          className="w-full h-32 object-cover construction-hover-transition hover:scale-105"
        />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">Progression</span>
          <span className="text-sm text-muted-foreground">{project.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full construction-transition"
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Échéance</span>
          </div>
          <span className="text-sm font-medium text-card-foreground">
            {formatDate(project.endDate)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Euro" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Budget</span>
          </div>
          <span className="text-sm font-medium text-card-foreground">
            {formatCurrency(project.budget)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="AlertTriangle" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Priorité</span>
          </div>
          <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
            {project.priority}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Localisation</span>
          </div>
          <span className="text-sm font-medium text-card-foreground">
            {project.location}
          </span>
        </div>
      </div>

      {/* Team Members */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">Équipe</span>
          <span className="text-xs text-muted-foreground">
            {project.team.length} membres
          </span>
        </div>
        <div className="flex items-center gap-2">
          {project.team.slice(0, 4).map((member, index) => (
            <div key={member.id} className="relative">
              <Image
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-card"
                style={{ marginLeft: index > 0 ? '-8px' : '0' }}
              />
            </div>
          ))}
          {project.team.length > 4 && (
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground border-2 border-card" style={{ marginLeft: '-8px' }}>
              +{project.team.length - 4}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={`flex items-center gap-2 construction-transition ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(project)}
          className="flex-1"
        >
          Voir détails
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Camera"
          onClick={() => onPhotoUpload(project)}
        />
        <Button
          variant="ghost"
          size="sm"
          iconName="Edit"
          onClick={() => onStatusUpdate(project)}
        />
      </div>
    </div>
  );
};

export default ProjectCard;