import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ProjectListView = ({ 
  projects, 
  selectedProjects, 
  onProjectSelect, 
  onViewDetails, 
  onStatusUpdate, 
  onPhotoUpload 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR').format(new Date(date));
  };

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

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden construction-shadow-card">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-muted border-b border-border text-sm font-medium text-muted-foreground">
        <div className="col-span-1">
          <Checkbox
            checked={selectedProjects.length === projects.length}
            indeterminate={selectedProjects.length > 0 && selectedProjects.length < projects.length}
            onChange={(e) => {
              if (e.target.checked) {
                onProjectSelect(projects.map(p => p.id));
              } else {
                onProjectSelect([]);
              }
            }}
          />
        </div>
        <div className="col-span-3">Projet</div>
        <div className="col-span-2">Client</div>
        <div className="col-span-1">Statut</div>
        <div className="col-span-1">Progression</div>
        <div className="col-span-1">Budget</div>
        <div className="col-span-1">Échéance</div>
        <div className="col-span-1">Priorité</div>
        <div className="col-span-1">Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {projects.map((project) => (
          <div
            key={project.id}
            className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 construction-hover-transition"
          >
            {/* Checkbox */}
            <div className="col-span-1 flex items-center">
              <Checkbox
                checked={selectedProjects.includes(project.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    onProjectSelect([...selectedProjects, project.id]);
                  } else {
                    onProjectSelect(selectedProjects.filter(id => id !== project.id));
                  }
                }}
              />
            </div>

            {/* Project Info */}
            <div className="col-span-3 flex items-center gap-3">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.name}
                  className="w-12 h-12 object-cover"
                />
              </div>
              <div>
                <h4 className="font-medium text-card-foreground">{project.name}</h4>
                <p className="text-sm text-muted-foreground">{project.location}</p>
              </div>
            </div>

            {/* Client */}
            <div className="col-span-2 flex items-center">
              <div>
                <p className="font-medium text-card-foreground">{project.client.name}</p>
                <p className="text-sm text-muted-foreground">{project.client.contact}</p>
              </div>
            </div>

            {/* Status */}
            <div className="col-span-1 flex items-center">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>

            {/* Progress */}
            <div className="col-span-1 flex items-center">
              <div className="w-full">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-card-foreground">{project.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full construction-transition"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="col-span-1 flex items-center">
              <span className="font-medium text-card-foreground">
                {formatCurrency(project.budget)}
              </span>
            </div>

            {/* Due Date */}
            <div className="col-span-1 flex items-center">
              <span className="text-sm text-card-foreground">
                {formatDate(project.endDate)}
              </span>
            </div>

            {/* Priority */}
            <div className="col-span-1 flex items-center">
              <span className={`text-sm font-medium ${getPriorityColor(project.priority)}`}>
                {project.priority}
              </span>
            </div>

            {/* Actions */}
            <div className="col-span-1 flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                onClick={() => onViewDetails(project)}
              />
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
        ))}
      </div>

      {projects.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Building2" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">Aucun projet trouvé</h3>
          <p className="text-muted-foreground">
            Aucun projet ne correspond aux critères de recherche actuels.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectListView;