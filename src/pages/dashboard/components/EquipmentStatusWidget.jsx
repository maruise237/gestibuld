import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EquipmentStatusWidget = () => {
  const equipmentData = [
    {
      id: 1,
      name: 'Excavatrice CAT 320',
      code: 'EX-001',
      status: 'active',
      location: 'Chantier A - Résidence Les Jardins',
      operator: 'Pierre Dubois',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300',
      nextMaintenance: '2025-08-15',
      hoursUsed: 1247
    },
    {
      id: 2,
      name: 'Grue Mobile Liebherr',
      code: 'GR-002',
      status: 'maintenance',
      location: 'Atelier Central',
      operator: null,
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300',
      nextMaintenance: '2025-07-25',
      hoursUsed: 892
    },
    {
      id: 3,
      name: 'Bétonnière Volvo',
      code: 'BT-003',
      status: 'available',
      location: 'Dépôt Principal',
      operator: null,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
      nextMaintenance: '2025-09-10',
      hoursUsed: 634
    },
    {
      id: 4,
      name: 'Bulldozer Caterpillar',
      code: 'BD-004',
      status: 'active',
      location: 'Chantier B - Centre Commercial',
      operator: 'Marie Laurent',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300',
      nextMaintenance: '2025-08-30',
      hoursUsed: 1156
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return {
          color: 'bg-success',
          text: 'En Service',
          icon: 'Play',
          textColor: 'text-success'
        };
      case 'maintenance':
        return {
          color: 'bg-warning',
          text: 'Maintenance',
          icon: 'Wrench',
          textColor: 'text-warning'
        };
      case 'available':
        return {
          color: 'bg-primary',
          text: 'Disponible',
          icon: 'CheckCircle',
          textColor: 'text-primary'
        };
      case 'unavailable':
        return {
          color: 'bg-error',
          text: 'Indisponible',
          icon: 'XCircle',
          textColor: 'text-error'
        };
      default:
        return {
          color: 'bg-muted',
          text: 'Inconnu',
          icon: 'Minus',
          textColor: 'text-muted-foreground'
        };
    }
  };

  const getMaintenanceUrgency = (nextMaintenance) => {
    const today = new Date();
    const maintenanceDate = new Date(nextMaintenance);
    const daysUntil = Math.ceil((maintenanceDate - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntil <= 7) return 'urgent';
    if (daysUntil <= 30) return 'soon';
    return 'normal';
  };

  const getMaintenanceColor = (urgency) => {
    switch (urgency) {
      case 'urgent':
        return 'text-error';
      case 'soon':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const statusSummary = {
    active: equipmentData.filter(eq => eq.status === 'active').length,
    maintenance: equipmentData.filter(eq => eq.status === 'maintenance').length,
    available: equipmentData.filter(eq => eq.status === 'available').length,
    total: equipmentData.length
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 construction-shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">État des Équipements</h3>
        <div className="flex items-center gap-2">
          <Icon name="Wrench" size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">{statusSummary.total} équipements</span>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-success/10 rounded-lg">
          <p className="text-lg font-bold text-success">{statusSummary.active}</p>
          <p className="text-xs text-muted-foreground">En Service</p>
        </div>
        <div className="text-center p-3 bg-primary/10 rounded-lg">
          <p className="text-lg font-bold text-primary">{statusSummary.available}</p>
          <p className="text-xs text-muted-foreground">Disponibles</p>
        </div>
        <div className="text-center p-3 bg-warning/10 rounded-lg">
          <p className="text-lg font-bold text-warning">{statusSummary.maintenance}</p>
          <p className="text-xs text-muted-foreground">Maintenance</p>
        </div>
      </div>

      {/* Equipment List */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {equipmentData.map((equipment) => {
          const statusConfig = getStatusConfig(equipment.status);
          const maintenanceUrgency = getMaintenanceUrgency(equipment.nextMaintenance);
          const maintenanceColor = getMaintenanceColor(maintenanceUrgency);

          return (
            <div key={equipment.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 construction-hover-transition">
              <div className="relative">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src={equipment.image}
                    alt={equipment.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusConfig.color} rounded-full border-2 border-card flex items-center justify-center`}>
                  <Icon name={statusConfig.icon} size={8} color="white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground truncate">{equipment.name}</p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs font-mono text-muted-foreground">{equipment.code}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.color} text-white`}>
                    {statusConfig.text}
                  </span>
                  {equipment.operator && (
                    <span className="text-xs text-muted-foreground">
                      Opérateur: {equipment.operator}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground truncate">{equipment.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {equipment.hoursUsed}h
                    </span>
                    <span className={`text-xs ${maintenanceColor}`}>
                      Maint: {formatDate(equipment.nextMaintenance)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Utilisation moyenne: 982h
          </span>
          <button className="text-primary hover:text-primary/80 construction-hover-transition">
            Voir inventaire complet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentStatusWidget;