import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProjectActionBar = ({ 
  viewMode, 
  onViewModeChange, 
  onNewProject, 
  selectedProjects, 
  onBulkAction,
  onExportPDF 
}) => {
  const [bulkActionOpen, setBulkActionOpen] = useState(false);

  const bulkActions = [
    { value: 'status-update', label: 'Mettre à jour le statut' },
    { value: 'assign-manager', label: 'Assigner un chef de projet' },
    { value: 'export-selected', label: 'Exporter la sélection' },
    { value: 'archive', label: 'Archiver' }
  ];

  const handleBulkAction = (action) => {
    onBulkAction(action, selectedProjects);
    setBulkActionOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={onNewProject}
        >
          Nouveau projet
        </Button>

        {selectedProjects.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedProjects.length} sélectionné(s)
            </span>
            <Select
              placeholder="Actions groupées"
              options={bulkActions}
              value=""
              onChange={handleBulkAction}
              className="min-w-48"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          onClick={onExportPDF}
          size="sm"
        >
          Exporter PDF
        </Button>

        <div className="flex items-center bg-muted rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-md construction-hover-transition ${
              viewMode === 'grid' ?'bg-card text-card-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="Grid3X3" size={16} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-md construction-hover-transition ${
              viewMode === 'list' ?'bg-card text-card-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name="List" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectActionBar;