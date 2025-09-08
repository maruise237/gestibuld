import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const EquipmentFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  equipmentStats 
}) => {
  const categoryOptions = [
    { value: '', label: 'Toutes les catégories' },
    { value: 'excavation', label: 'Excavation' },
    { value: 'lifting', label: 'Levage' },
    { value: 'transport', label: 'Transport' },
    { value: 'concrete', label: 'Béton' },
    { value: 'tools', label: 'Outils' },
    { value: 'safety', label: 'Sécurité' }
  ];

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'available', label: 'Disponible' },
    { value: 'in-use', label: 'En cours d\'utilisation' },
    { value: 'maintenance', label: 'En maintenance' }
  ];

  const locationOptions = [
    { value: '', label: 'Tous les sites' },
    { value: 'depot-central', label: 'Dépôt Central' },
    { value: 'chantier-a', label: 'Chantier A - Résidentiel' },
    { value: 'chantier-b', label: 'Chantier B - Commercial' },
    { value: 'chantier-c', label: 'Chantier C - Infrastructure' }
  ];

  const maintenanceOptions = [
    { value: '', label: 'Toutes les maintenances' },
    { value: 'due-soon', label: 'Maintenance due (7 jours)' },
    { value: 'overdue', label: 'Maintenance en retard' },
    { value: 'up-to-date', label: 'Maintenance à jour' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size={18} className="text-muted-foreground" />
          <h3 className="font-semibold text-foreground">Filtres</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Effacer
          </Button>
        )}
      </div>

      {/* Equipment Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-success/10 border border-success/20 rounded-lg p-3 text-center">
          <div className="text-lg font-semibold text-success">{equipmentStats.available}</div>
          <div className="text-xs text-success/80">Disponibles</div>
        </div>
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 text-center">
          <div className="text-lg font-semibold text-warning">{equipmentStats.inUse}</div>
          <div className="text-xs text-warning/80">En cours</div>
        </div>
        <div className="bg-error/10 border border-error/20 rounded-lg p-3 text-center">
          <div className="text-lg font-semibold text-error">{equipmentStats.maintenance}</div>
          <div className="text-xs text-error/80">Maintenance</div>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
          <div className="text-lg font-semibold text-primary">{equipmentStats.total}</div>
          <div className="text-xs text-primary/80">Total</div>
        </div>
      </div>

      {/* Search */}
      <div>
        <Input
          type="search"
          placeholder="Rechercher un équipement..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full"
        />
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Select
          label="Catégorie"
          options={categoryOptions}
          value={filters.category}
          onChange={(value) => handleFilterChange('category', value)}
        />

        <Select
          label="Statut"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />

        <Select
          label="Localisation"
          options={locationOptions}
          value={filters.location}
          onChange={(value) => handleFilterChange('location', value)}
        />

        <Select
          label="Maintenance"
          options={maintenanceOptions}
          value={filters.maintenance}
          onChange={(value) => handleFilterChange('maintenance', value)}
        />
      </div>

      {/* Quick Filters */}
      <div>
        <p className="text-sm font-medium text-foreground mb-2">Filtres rapides</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filters.status === 'available' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('status', filters.status === 'available' ? '' : 'available')}
            iconName="CheckCircle"
            iconPosition="left"
          >
            Disponibles
          </Button>
          <Button
            variant={filters.maintenance === 'due-soon' ? 'warning' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('maintenance', filters.maintenance === 'due-soon' ? '' : 'due-soon')}
            iconName="AlertTriangle"
            iconPosition="left"
          >
            Maintenance due
          </Button>
          <Button
            variant={filters.category === 'excavation' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('category', filters.category === 'excavation' ? '' : 'excavation')}
            iconName="Truck"
            iconPosition="left"
          >
            Excavation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentFilters;