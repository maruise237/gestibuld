import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddEquipmentModal = ({ isOpen, onClose, onAdd }) => {
  const [equipmentData, setEquipmentData] = useState({
    name: '',
    category: '',
    model: '',
    serialNumber: '',
    year: new Date().getFullYear(),
    location: '',
    status: 'available',
    purchaseDate: '',
    purchasePrice: '',
    specifications: {
      weight: '',
      power: '',
      capacity: '',
      fuel: ''
    },
    notes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  if (!isOpen) return null;

  const categoryOptions = [
    { value: '', label: 'Sélectionner une catégorie' },
    { value: 'excavation', label: 'Excavation' },
    { value: 'lifting', label: 'Levage' },
    { value: 'transport', label: 'Transport' },
    { value: 'concrete', label: 'Béton' },
    { value: 'tools', label: 'Outils' },
    { value: 'safety', label: 'Sécurité' }
  ];

  const locationOptions = [
    { value: '', label: 'Sélectionner une localisation' },
    { value: 'depot-central', label: 'Dépôt Central' },
    { value: 'chantier-a', label: 'Chantier A - Résidentiel' },
    { value: 'chantier-b', label: 'Chantier B - Commercial' },
    { value: 'chantier-c', label: 'Chantier C - Infrastructure' }
  ];

  const statusOptions = [
    { value: 'available', label: 'Disponible' },
    { value: 'maintenance', label: 'En maintenance' }
  ];

  const fuelOptions = [
    { value: '', label: 'Type de carburant' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'essence', label: 'Essence' },
    { value: 'electrique', label: 'Électrique' },
    { value: 'hybride', label: 'Hybride' },
    { value: 'manuel', label: 'Manuel' }
  ];

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEquipmentData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setEquipmentData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newEquipment = {
      ...equipmentData,
      id: Date.now(),
      image: getDefaultImage(equipmentData.category),
      nextMaintenance: getNextMaintenanceDate(),
      totalHours: 0,
      currentProject: null
    };

    onAdd(newEquipment);
    onClose();
    
    // Reset form
    setEquipmentData({
      name: '',
      category: '',
      model: '',
      serialNumber: '',
      year: new Date().getFullYear(),
      location: '',
      status: 'available',
      purchaseDate: '',
      purchasePrice: '',
      specifications: {
        weight: '',
        power: '',
        capacity: '',
        fuel: ''
      },
      notes: ''
    });
    setCurrentStep(1);
  };

  const getDefaultImage = (category) => {
    const imageMap = {
      'excavation': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
      'lifting': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
      'transport': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      'concrete': 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400',
      'tools': 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400',
      'safety': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'
    };
    return imageMap[category] || 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400';
  };

  const getNextMaintenanceDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3); // 3 months from now
    return date.toISOString().split('T')[0];
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return equipmentData.name && equipmentData.category && equipmentData.model;
      case 2:
        return equipmentData.serialNumber && equipmentData.location && equipmentData.year;
      case 3:
        return true; // Optional step
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Informations de base</h3>
        <p className="text-sm text-muted-foreground">Renseignez les informations principales de l'équipement</p>
      </div>

      <Input
        label="Nom de l'équipement"
        required
        placeholder="Ex: Excavatrice CAT 320"
        value={equipmentData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />

      <Select
        label="Catégorie"
        required
        options={categoryOptions}
        value={equipmentData.category}
        onChange={(value) => handleInputChange('category', value)}
      />

      <Input
        label="Modèle"
        required
        placeholder="Ex: CAT 320GC"
        value={equipmentData.model}
        onChange={(e) => handleInputChange('model', e.target.value)}
      />

      <Input
        label="Année"
        type="number"
        min="1990"
        max={new Date().getFullYear() + 1}
        value={equipmentData.year}
        onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Identification et localisation</h3>
        <p className="text-sm text-muted-foreground">Informations d'identification et de localisation</p>
      </div>

      <Input
        label="Numéro de série"
        required
        placeholder="Ex: CAT320GC2024001"
        value={equipmentData.serialNumber}
        onChange={(e) => handleInputChange('serialNumber', e.target.value)}
      />

      <Select
        label="Localisation actuelle"
        required
        options={locationOptions}
        value={equipmentData.location}
        onChange={(value) => handleInputChange('location', value)}
      />

      <Select
        label="Statut initial"
        options={statusOptions}
        value={equipmentData.status}
        onChange={(value) => handleInputChange('status', value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date d'achat"
          type="date"
          value={equipmentData.purchaseDate}
          onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
        />

        <Input
          label="Prix d'achat (€)"
          type="number"
          placeholder="Ex: 150000"
          value={equipmentData.purchasePrice}
          onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">Spécifications techniques</h3>
        <p className="text-sm text-muted-foreground">Informations techniques optionnelles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Poids (kg)"
          type="number"
          placeholder="Ex: 20000"
          value={equipmentData.specifications.weight}
          onChange={(e) => handleInputChange('specifications.weight', e.target.value)}
        />

        <Input
          label="Puissance (kW)"
          type="number"
          placeholder="Ex: 110"
          value={equipmentData.specifications.power}
          onChange={(e) => handleInputChange('specifications.power', e.target.value)}
        />

        <Input
          label="Capacité"
          placeholder="Ex: 1.2 m³"
          value={equipmentData.specifications.capacity}
          onChange={(e) => handleInputChange('specifications.capacity', e.target.value)}
        />

        <Select
          label="Carburant"
          options={fuelOptions}
          value={equipmentData.specifications.fuel}
          onChange={(value) => handleInputChange('specifications.fuel', value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Notes additionnelles
        </label>
        <textarea
          className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          rows={3}
          placeholder="Informations supplémentaires, remarques..."
          value={equipmentData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Ajouter un équipement</h2>
            <p className="text-sm text-muted-foreground">Étape {currentStep} sur {totalSteps}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg construction-hover-transition"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div
                key={index}
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  index + 1 <= currentStep
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full construction-transition"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Précédent
            </Button>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
              >
                Annuler
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  variant="default"
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                >
                  Ajouter l'équipement
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEquipmentModal;