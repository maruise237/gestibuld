import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ProjectFilters = ({ filters, onFiltersChange, isCollapsed, onToggleCollapse }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'en cours', label: 'En cours' },
    { value: 'terminé', label: 'Terminé' },
    { value: 'en retard', label: 'En retard' },
    { value: 'planifié', label: 'Planifié' }
  ];

  const priorityOptions = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'haute', label: 'Haute' },
    { value: 'moyenne', label: 'Moyenne' },
    { value: 'faible', label: 'Faible' }
  ];

  const managerOptions = [
    { value: '', label: 'Tous les managers' },
    { value: 'jean-dupont', label: 'Jean Dupont' },
    { value: 'marie-martin', label: 'Marie Martin' },
    { value: 'pierre-bernard', label: 'Pierre Bernard' },
    { value: 'sophie-durand', label: 'Sophie Durand' }
  ];

  const clientOptions = [
    { value: '', label: 'Tous les clients' },
    { value: 'mairie-paris', label: 'Mairie de Paris' },
    { value: 'bouygues', label: 'Bouygues Construction' },
    { value: 'vinci', label: 'VINCI Construction' },
    { value: 'eiffage', label: 'Eiffage Construction' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      search: '',
      status: '',
      priority: '',
      manager: '',
      client: '',
      startDate: '',
      endDate: ''
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const hasActiveFilters = Object.values(localFilters).some(value => value !== '');

  if (isCollapsed) {
    return (
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          iconName="Filter"
          iconPosition="left"
          onClick={onToggleCollapse}
          className="w-full"
        >
          Filtres {hasActiveFilters && `(${Object.values(localFilters).filter(v => v !== '').length})`}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
          <Icon name="Filter" size={18} />
          Filtres
        </h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground"
            >
              Réinitialiser
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onToggleCollapse}
            className="lg:hidden"
          />
        </div>
      </div>

      <div className="space-y-4">
        {/* Search */}
        <Input
          type="search"
          placeholder="Rechercher un projet..."
          value={localFilters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full"
        />

        {/* Status Filter */}
        <Select
          label="Statut"
          options={statusOptions}
          value={localFilters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        {/* Priority Filter */}
        <Select
          label="Priorité"
          options={priorityOptions}
          value={localFilters.priority}
          onChange={(value) => handleFilterChange('priority', value)}
        />

        {/* Manager Filter */}
        <Select
          label="Chef de projet"
          options={managerOptions}
          value={localFilters.manager}
          onChange={(value) => handleFilterChange('manager', value)}
        />

        {/* Client Filter */}
        <Select
          label="Client"
          options={clientOptions}
          value={localFilters.client}
          onChange={(value) => handleFilterChange('client', value)}
        />

        {/* Date Range */}
        <div className="space-y-2">
          <Input
            type="date"
            label="Date de début"
            value={localFilters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
          />
          <Input
            type="date"
            label="Date de fin"
            value={localFilters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
          />
        </div>

        {/* Active Filters Count */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {Object.values(localFilters).filter(v => v !== '').length} filtre(s) actif(s)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;