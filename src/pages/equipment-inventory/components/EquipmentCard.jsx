import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EquipmentCard = ({ equipment, onReserve, onViewDetails, onUpdateStatus }) => {
  const [isQRVisible, setIsQRVisible] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success text-success-foreground';
      case 'in-use':
        return 'bg-warning text-warning-foreground';
      case 'maintenance':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'in-use':
        return 'Clock';
      case 'maintenance':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  const formatMaintenanceDate = (date) => {
    if (!date) return 'N/A';
    const maintenanceDate = new Date(date);
    const today = new Date();
    const diffTime = maintenanceDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `En retard de ${Math.abs(diffDays)} jour(s)`;
    } else if (diffDays === 0) {
      return 'Aujourd\'hui';
    } else if (diffDays <= 7) {
      return `Dans ${diffDays} jour(s)`;
    } else {
      return maintenanceDate.toLocaleDateString('fr-FR');
    }
  };

  const isMaintenanceDue = (date) => {
    if (!date) return false;
    const maintenanceDate = new Date(date);
    const today = new Date();
    const diffTime = maintenanceDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card construction-hover-transition hover:shadow-lg">
      {/* Equipment Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg h-48">
        <Image
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-full object-cover"
        />
        
        {/* Status Badge */}
        <div className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(equipment.status)}`}>
          <Icon name={getStatusIcon(equipment.status)} size={12} />
          {equipment.status === 'available' && 'Disponible'}
          {equipment.status === 'in-use' && 'En cours'}
          {equipment.status === 'maintenance' && 'Maintenance'}
        </div>

        {/* QR Code Button */}
        <button
          onClick={() => setIsQRVisible(!isQRVisible)}
          className="absolute top-2 right-2 p-2 bg-card/90 backdrop-blur-sm rounded-lg construction-hover-transition hover:bg-card"
        >
          <Icon name="QrCode" size={16} />
        </button>

        {/* Maintenance Alert */}
        {isMaintenanceDue(equipment.nextMaintenance) && (
          <div className="absolute bottom-2 left-2 right-2 bg-warning/90 backdrop-blur-sm text-warning-foreground px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <Icon name="AlertTriangle" size={12} />
            Maintenance due
          </div>
        )}
      </div>

      {/* QR Code Modal */}
      {isQRVisible && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000" onClick={() => setIsQRVisible(false)}>
          <div className="bg-card p-6 rounded-lg max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Code QR - {equipment.name}</h3>
              <button onClick={() => setIsQRVisible(false)}>
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="bg-white p-4 rounded-lg mb-4 flex items-center justify-center">
              <div className="w-32 h-32 bg-black flex items-center justify-center text-white text-xs">
                QR: {equipment.id}
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Scannez ce code pour accéder aux détails de l'équipement
            </p>
          </div>
        </div>
      )}

      {/* Equipment Info */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-foreground mb-1">{equipment.name}</h3>
          <p className="text-sm text-muted-foreground">{equipment.category}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Localisation:</span>
            <span className="font-medium">{equipment.location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Prochaine maintenance:</span>
            <span className={`font-medium ${isMaintenanceDue(equipment.nextMaintenance) ? 'text-warning' : ''}`}>
              {formatMaintenanceDate(equipment.nextMaintenance)}
            </span>
          </div>

          {equipment.currentProject && (
            <div className="flex items-center gap-2 text-sm">
              <Icon name="Building2" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Projet:</span>
              <span className="font-medium">{equipment.currentProject}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(equipment)}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            Détails
          </Button>
          
          {equipment.status === 'available' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onReserve(equipment)}
              className="flex-1"
              iconName="Calendar"
              iconPosition="left"
            >
              Réserver
            </Button>
          )}
          
          {equipment.status === 'maintenance' && (
            <Button
              variant="warning"
              size="sm"
              onClick={() => onUpdateStatus(equipment.id, 'available')}
              className="flex-1"
              iconName="Wrench"
              iconPosition="left"
            >
              Réparer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EquipmentCard;