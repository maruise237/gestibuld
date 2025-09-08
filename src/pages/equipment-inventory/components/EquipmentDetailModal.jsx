import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EquipmentDetailModal = ({ equipment, isOpen, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(equipment || {});

  if (!isOpen || !equipment) return null;

  const tabs = [
    { id: 'details', label: 'Détails', icon: 'Info' },
    { id: 'maintenance', label: 'Maintenance', icon: 'Wrench' },
    { id: 'history', label: 'Historique', icon: 'Clock' },
    { id: 'photos', label: 'Photos', icon: 'Camera' }
  ];

  const statusOptions = [
    { value: 'available', label: 'Disponible' },
    { value: 'in-use', label: 'En cours d\'utilisation' },
    { value: 'maintenance', label: 'En maintenance' }
  ];

  const locationOptions = [
    { value: 'depot-central', label: 'Dépôt Central' },
    { value: 'chantier-a', label: 'Chantier A - Résidentiel' },
    { value: 'chantier-b', label: 'Chantier B - Commercial' },
    { value: 'chantier-c', label: 'Chantier C - Infrastructure' }
  ];

  const maintenanceHistory = [
    {
      id: 1,
      date: '2024-07-15',
      type: 'Maintenance préventive',
      description: 'Vidange et vérification générale',
      technician: 'Pierre Martin',
      cost: '450€',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-06-20',
      type: 'Réparation',
      description: 'Remplacement du filtre hydraulique',
      technician: 'Marie Dubois',
      cost: '280€',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-05-10',
      type: 'Inspection',
      description: 'Contrôle technique annuel',
      technician: 'Jean Leroy',
      cost: '150€',
      status: 'completed'
    }
  ];

  const usageHistory = [
    {
      id: 1,
      project: 'Chantier A - Résidentiel',
      startDate: '2024-07-18',
      endDate: '2024-07-20',
      operator: 'Michel Rodriguez',
      hours: 24,
      status: 'completed'
    },
    {
      id: 2,
      project: 'Chantier B - Commercial',
      startDate: '2024-07-10',
      endDate: '2024-07-15',
      operator: 'Sophie Laurent',
      hours: 40,
      status: 'completed'
    }
  ];

  const equipmentPhotos = [
    'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400'
  ];

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(equipment);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success';
      case 'in-use':
        return 'text-warning';
      case 'maintenance':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Equipment Image */}
      <div className="relative h-64 overflow-hidden rounded-lg">
        <Image
          src={equipment.image}
          alt={equipment.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isEditing ? (
          <>
            <Input
              label="Nom de l'équipement"
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
            />
            <Input
              label="Modèle"
              value={editData.model}
              onChange={(e) => setEditData({...editData, model: e.target.value})}
            />
            <Input
              label="Numéro de série"
              value={editData.serialNumber}
              onChange={(e) => setEditData({...editData, serialNumber: e.target.value})}
            />
            <Input
              label="Année"
              type="number"
              value={editData.year}
              onChange={(e) => setEditData({...editData, year: e.target.value})}
            />
            <Select
              label="Statut"
              options={statusOptions}
              value={editData.status}
              onChange={(value) => setEditData({...editData, status: value})}
            />
            <Select
              label="Localisation"
              options={locationOptions}
              value={editData.location}
              onChange={(value) => setEditData({...editData, location: value})}
            />
          </>
        ) : (
          <>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nom</label>
              <p className="text-foreground font-medium">{equipment.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Modèle</label>
              <p className="text-foreground">{equipment.model}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Numéro de série</label>
              <p className="text-foreground">{equipment.serialNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Année</label>
              <p className="text-foreground">{equipment.year}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Statut</label>
              <p className={`font-medium ${getStatusColor(equipment.status)}`}>
                {equipment.status === 'available' && 'Disponible'}
                {equipment.status === 'in-use' && 'En cours d\'utilisation'}
                {equipment.status === 'maintenance' && 'En maintenance'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Localisation</label>
              <p className="text-foreground">{equipment.location}</p>
            </div>
          </>
        )}
      </div>

      {/* Specifications */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Spécifications techniques</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Poids</label>
            <p className="text-foreground">{equipment.specifications?.weight || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Puissance</label>
            <p className="text-foreground">{equipment.specifications?.power || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Capacité</label>
            <p className="text-foreground">{equipment.specifications?.capacity || 'N/A'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Carburant</label>
            <p className="text-foreground">{equipment.specifications?.fuel || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMaintenanceTab = () => (
    <div className="space-y-6">
      {/* Maintenance Status */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-foreground">État de maintenance</h4>
          <Button variant="outline" size="sm" iconName="Calendar">
            Programmer
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Dernière maintenance</label>
            <p className="text-foreground font-medium">15/07/2024</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Prochaine maintenance</label>
            <p className="text-warning font-medium">25/07/2024</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Heures d'utilisation</label>
            <p className="text-foreground font-medium">1,247h</p>
          </div>
        </div>
      </div>

      {/* Maintenance History */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Historique de maintenance</h4>
        <div className="space-y-3">
          {maintenanceHistory.map((record) => (
            <div key={record.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon name="Wrench" size={16} className="text-primary" />
                  <span className="font-medium text-foreground">{record.type}</span>
                </div>
                <span className="text-sm text-muted-foreground">{record.date}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{record.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Technicien: {record.technician}</span>
                <span className="font-medium text-foreground">{record.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-foreground mb-3">Historique d'utilisation</h4>
        <div className="space-y-3">
          {usageHistory.map((record) => (
            <div key={record.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon name="Building2" size={16} className="text-primary" />
                  <span className="font-medium text-foreground">{record.project}</span>
                </div>
                <span className="text-sm text-success font-medium">{record.status === 'completed' ? 'Terminé' : 'En cours'}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Opérateur: </span>
                  <span className="text-foreground">{record.operator}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Période: </span>
                  <span className="text-foreground">{record.startDate} - {record.endDate}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Heures: </span>
                  <span className="text-foreground">{record.hours}h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPhotosTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">Photos de l'équipement</h4>
        <Button variant="outline" size="sm" iconName="Upload">
          Ajouter
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {equipmentPhotos.map((photo, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg aspect-square">
            <Image
              src={photo}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover construction-hover-transition group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 construction-hover-transition flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-white opacity-0 group-hover:opacity-100 construction-hover-transition" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{equipment.name}</h2>
            <p className="text-sm text-muted-foreground">{equipment.category} • {equipment.model}</p>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                iconName="Edit"
                iconPosition="left"
              >
                Modifier
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                >
                  Annuler
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleSave}
                  iconName="Save"
                  iconPosition="left"
                >
                  Sauvegarder
                </Button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg construction-hover-transition"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 construction-hover-transition ${
                  activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'details' && renderDetailsTab()}
          {activeTab === 'maintenance' && renderMaintenanceTab()}
          {activeTab === 'history' && renderHistoryTab()}
          {activeTab === 'photos' && renderPhotosTab()}
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetailModal;