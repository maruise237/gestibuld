import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReservationModal = ({ equipment, isOpen, onClose, onReserve }) => {
  const [reservationData, setReservationData] = useState({
    project: '',
    operator: '',
    startDate: '',
    endDate: '',
    startTime: '08:00',
    endTime: '17:00',
    notes: ''
  });

  const [conflicts, setConflicts] = useState([]);

  if (!isOpen || !equipment) return null;

  const projectOptions = [
    { value: '', label: 'Sélectionner un projet' },
    { value: 'chantier-a', label: 'Chantier A - Résidentiel' },
    { value: 'chantier-b', label: 'Chantier B - Commercial' },
    { value: 'chantier-c', label: 'Chantier C - Infrastructure' },
    { value: 'maintenance', label: 'Maintenance préventive' }
  ];

  const operatorOptions = [
    { value: '', label: 'Sélectionner un opérateur' },
    { value: 'michel-rodriguez', label: 'Michel Rodriguez' },
    { value: 'sophie-laurent', label: 'Sophie Laurent' },
    { value: 'pierre-martin', label: 'Pierre Martin' },
    { value: 'marie-dubois', label: 'Marie Dubois' },
    { value: 'jean-leroy', label: 'Jean Leroy' }
  ];

  // Mock existing reservations for conflict detection
  const existingReservations = [
    {
      id: 1,
      project: 'Chantier B - Commercial',
      startDate: '2024-07-25',
      endDate: '2024-07-27',
      operator: 'Sophie Laurent'
    }
  ];

  const handleInputChange = (field, value) => {
    setReservationData(prev => ({
      ...prev,
      [field]: value
    }));

    // Check for conflicts when dates change
    if (field === 'startDate' || field === 'endDate') {
      checkConflicts({ ...reservationData, [field]: value });
    }
  };

  const checkConflicts = (data) => {
    if (!data.startDate || !data.endDate) {
      setConflicts([]);
      return;
    }

    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    const foundConflicts = existingReservations.filter(reservation => {
      const resStart = new Date(reservation.startDate);
      const resEnd = new Date(reservation.endDate);
      
      return (startDate <= resEnd && endDate >= resStart);
    });

    setConflicts(foundConflicts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (conflicts.length > 0) {
      alert('Il y a des conflits de réservation. Veuillez choisir d\'autres dates.');
      return;
    }

    const reservation = {
      ...reservationData,
      equipmentId: equipment.id,
      equipmentName: equipment.name,
      id: Date.now(),
      status: 'pending'
    };

    onReserve(reservation);
    onClose();
    
    // Reset form
    setReservationData({
      project: '',
      operator: '',
      startDate: '',
      endDate: '',
      startTime: '08:00',
      endTime: '17:00',
      notes: ''
    });
  };

  const isFormValid = () => {
    return reservationData.project && 
           reservationData.operator && 
           reservationData.startDate && 
           reservationData.endDate &&
           conflicts.length === 0;
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Réserver l'équipement</h2>
            <p className="text-sm text-muted-foreground">{equipment.name} • {equipment.model}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg construction-hover-transition"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Equipment Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Wrench" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{equipment.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {equipment.category} • Localisation: {equipment.location}
                </p>
              </div>
            </div>
          </div>

          {/* Project and Operator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Projet"
              required
              options={projectOptions}
              value={reservationData.project}
              onChange={(value) => handleInputChange('project', value)}
            />

            <Select
              label="Opérateur"
              required
              options={operatorOptions}
              value={reservationData.operator}
              onChange={(value) => handleInputChange('operator', value)}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date de début"
              type="date"
              required
              min={getTomorrowDate()}
              value={reservationData.startDate}
              onChange={(e) => handleInputChange('startDate', e.target.value)}
            />

            <Input
              label="Date de fin"
              type="date"
              required
              min={reservationData.startDate || getTomorrowDate()}
              value={reservationData.endDate}
              onChange={(e) => handleInputChange('endDate', e.target.value)}
            />
          </div>

          {/* Times */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Heure de début"
              type="time"
              value={reservationData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
            />

            <Input
              label="Heure de fin"
              type="time"
              value={reservationData.endTime}
              onChange={(e) => handleInputChange('endTime', e.target.value)}
            />
          </div>

          {/* Conflicts Warning */}
          {conflicts.length > 0 && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <span className="font-medium text-error">Conflit de réservation détecté</span>
              </div>
              <div className="space-y-2">
                {conflicts.map((conflict, index) => (
                  <div key={index} className="text-sm text-error/80">
                    {conflict.project} du {conflict.startDate} au {conflict.endDate} 
                    (Opérateur: {conflict.operator})
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notes (optionnel)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
              placeholder="Instructions spéciales, remarques..."
              value={reservationData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
          </div>

          {/* Calendar Preview */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
              <Icon name="Calendar" size={16} />
              Aperçu de la réservation
            </h4>
            {reservationData.startDate && reservationData.endDate ? (
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Durée:</span>
                  <span className="text-foreground font-medium">
                    {Math.ceil((new Date(reservationData.endDate) - new Date(reservationData.startDate)) / (1000 * 60 * 60 * 24))} jour(s)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="User" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Opérateur:</span>
                  <span className="text-foreground font-medium">
                    {operatorOptions.find(op => op.value === reservationData.operator)?.label || 'Non sélectionné'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Building2" size={14} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Projet:</span>
                  <span className="text-foreground font-medium">
                    {projectOptions.find(proj => proj.value === reservationData.project)?.label || 'Non sélectionné'}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Sélectionnez les dates pour voir l'aperçu</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={!isFormValid()}
              className="flex-1"
              iconName="Calendar"
              iconPosition="left"
            >
              Confirmer la réservation
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;