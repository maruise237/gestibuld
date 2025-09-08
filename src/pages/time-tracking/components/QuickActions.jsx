import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActions = ({ 
  onTakePhoto, 
  onLogBreak, 
  onAddNote,
  isActive = false 
}) => {
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [breakDuration, setBreakDuration] = useState('');
  const [breakType, setBreakType] = useState('lunch');
  const [note, setNote] = useState('');

  const breakTypes = [
    { value: 'lunch', label: 'Déjeuner', icon: 'Utensils' },
    { value: 'coffee', label: 'Pause café', icon: 'Coffee' },
    { value: 'personal', label: 'Pause personnelle', icon: 'User' },
    { value: 'meeting', label: 'Réunion', icon: 'Users' }
  ];

  const handleBreakSubmit = () => {
    if (breakDuration && breakType) {
      onLogBreak({
        type: breakType,
        duration: parseInt(breakDuration),
        timestamp: new Date().toISOString()
      });
      setBreakDuration('');
      setBreakType('lunch');
      setShowBreakModal(false);
    }
  };

  const handleNoteSubmit = () => {
    if (note.trim()) {
      onAddNote({
        content: note.trim(),
        timestamp: new Date().toISOString()
      });
      setNote('');
      setShowNoteModal(false);
    }
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card">
        <h3 className="font-semibold text-foreground mb-4">Actions rapides</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button
            variant="outline"
            iconName="Camera"
            iconPosition="left"
            onClick={onTakePhoto}
            disabled={!isActive}
            className="h-12"
          >
            Prendre photo
          </Button>
          
          <Button
            variant="outline"
            iconName="Coffee"
            iconPosition="left"
            onClick={() => setShowBreakModal(true)}
            disabled={!isActive}
            className="h-12"
          >
            Pause
          </Button>
          
          <Button
            variant="outline"
            iconName="FileText"
            iconPosition="left"
            onClick={() => setShowNoteModal(true)}
            disabled={!isActive}
            className="h-12"
          >
            Ajouter note
          </Button>
        </div>

        {!isActive && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Info" size={16} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Pointez votre entrée pour utiliser les actions rapides
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Break Modal */}
      {showBreakModal && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md construction-shadow-modal">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Enregistrer une pause</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowBreakModal(false)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Type de pause
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {breakTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setBreakType(type.value)}
                      className={`
                        p-3 rounded-lg border construction-hover-transition
                        ${breakType === type.value
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background hover:bg-muted border-border'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Icon name={type.icon} size={20} />
                        <span className="text-xs">{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Input
                label="Durée (minutes)"
                type="number"
                placeholder="30"
                value={breakDuration}
                onChange={(e) => setBreakDuration(e.target.value)}
                min="1"
                max="120"
              />

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowBreakModal(false)}
                >
                  Annuler
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleBreakSubmit}
                  disabled={!breakDuration || !breakType}
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md construction-shadow-modal">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Ajouter une note</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowNoteModal(false)}
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Note de travail
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Décrivez votre activité, observations, problèmes rencontrés..."
                  className="w-full h-24 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowNoteModal(false)}
                >
                  Annuler
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleNoteSubmit}
                  disabled={!note.trim()}
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActions;