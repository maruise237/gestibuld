import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const EmployeeFilters = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'on-leave', label: 'En congé' },
    { value: 'inactive', label: 'Inactif' }
  ];

  const roleOptions = [
    { value: '', label: 'Tous les rôles' },
    { value: 'Site Manager', label: 'Chef de chantier' },
    { value: 'Foreman', label: 'Contremaître' },
    { value: 'Equipment Operator', label: 'Opérateur d\'équipement' },
    { value: 'Construction Worker', label: 'Ouvrier du bâtiment' },
    { value: 'Safety Inspector', label: 'Inspecteur sécurité' },
    { value: 'Electrician', label: 'Électricien' },
    { value: 'Plumber', label: 'Plombier' },
    { value: 'Carpenter', label: 'Charpentier' }
  ];

  const projectOptions = [
    { value: '', label: 'Tous les projets' },
    { value: 'Résidence Les Jardins', label: 'Résidence Les Jardins' },
    { value: 'Centre Commercial Atlantis', label: 'Centre Commercial Atlantis' },
    { value: 'Immeuble de Bureaux Horizon', label: 'Immeuble de Bureaux Horizon' },
    { value: 'Rénovation Hôtel Bellevue', label: 'Rénovation Hôtel Bellevue' }
  ];

  const certificationOptions = [
    { value: '', label: 'Toutes certifications' },
    { value: 'valid', label: 'Certifications valides' },
    { value: 'expiring', label: 'Expirent bientôt' },
    { value: 'expired', label: 'Expirées' }
  ];

  const skillOptions = [
    { value: '', label: 'Toutes compétences' },
    { value: 'Maçonnerie', label: 'Maçonnerie' },
    { value: 'Charpenterie', label: 'Charpenterie' },
    { value: 'Électricité', label: 'Électricité' },
    { value: 'Plomberie', label: 'Plomberie' },
    { value: 'Conduite d\'engins', label: 'Conduite d\'engins' },
    { value: 'Soudure', label: 'Soudure' },
    { value: 'Peinture', label: 'Peinture' }
  ];

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Icon name="Filter" size={18} />
          Filtres
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
          >
            Effacer les filtres
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="md:col-span-2 lg:col-span-1">
          <Input
            type="search"
            placeholder="Rechercher par nom, email, téléphone..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>

        <Select
          placeholder="Filtrer par statut"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => onFilterChange('status', value)}
        />

        <Select
          placeholder="Filtrer par rôle"
          options={roleOptions}
          value={filters.role}
          onChange={(value) => onFilterChange('role', value)}
        />

        <Select
          placeholder="Filtrer par projet"
          options={projectOptions}
          value={filters.project}
          onChange={(value) => onFilterChange('project', value)}
        />

        <Select
          placeholder="État des certifications"
          options={certificationOptions}
          value={filters.certification}
          onChange={(value) => onFilterChange('certification', value)}
        />

        <Select
          placeholder="Filtrer par compétence"
          options={skillOptions}
          value={filters.skill}
          onChange={(value) => onFilterChange('skill', value)}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="onlineOnly"
            checked={filters.onlineOnly}
            onChange={(e) => onFilterChange('onlineOnly', e.target.checked)}
            className="rounded border-border"
          />
          <label htmlFor="onlineOnly" className="text-sm text-foreground">
            En ligne uniquement
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="availableOnly"
            checked={filters.availableOnly}
            onChange={(e) => onFilterChange('availableOnly', e.target.checked)}
            className="rounded border-border"
          />
          <label htmlFor="availableOnly" className="text-sm text-foreground">
            Disponibles uniquement
          </label>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value || (typeof value === 'boolean' && !value)) return null;
              
              let displayValue = value;
              if (key === 'status') {
                displayValue = statusOptions.find(opt => opt.value === value)?.label || value;
              } else if (key === 'role') {
                displayValue = roleOptions.find(opt => opt.value === value)?.label || value;
              } else if (key === 'project') {
                displayValue = projectOptions.find(opt => opt.value === value)?.label || value;
              } else if (key === 'certification') {
                displayValue = certificationOptions.find(opt => opt.value === value)?.label || value;
              } else if (key === 'skill') {
                displayValue = skillOptions.find(opt => opt.value === value)?.label || value;
              } else if (typeof value === 'boolean') {
                displayValue = key === 'onlineOnly' ? 'En ligne' : 'Disponible';
              }

              return (
                <span
                  key={key}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded-md"
                >
                  {displayValue}
                  <button
                    onClick={() => onFilterChange(key, typeof value === 'boolean' ? false : '')}
                    className="hover:bg-primary/20 rounded-sm p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeFilters;