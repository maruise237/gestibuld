import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClockInOutButton = ({ 
  isActive, 
  onClockIn, 
  onClockOut, 
  currentProject,
  locationVerified = false,
  isLoading = false 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAction = () => {
    if (isActive) {
      onClockOut();
    } else {
      onClockIn();
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 construction-shadow-card">
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-foreground mb-2">
          {formatTime(currentTime)}
        </div>
        <div className="text-sm text-muted-foreground">
          {formatDate(currentTime)}
        </div>
      </div>

      {currentProject && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Building2" size={20} className="text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">{currentProject.name}</h3>
              <p className="text-sm text-muted-foreground">{currentProject.phase}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Icon 
              name={locationVerified ? "MapPin" : "MapPinOff"} 
              size={16} 
              className={locationVerified ? "text-success" : "text-error"} 
            />
            <span className={`text-sm ${locationVerified ? "text-success" : "text-error"}`}>
              {locationVerified ? "Position vérifiée" : "Position non vérifiée"}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Button
          variant={isActive ? "destructive" : "default"}
          size="lg"
          fullWidth
          iconName={isActive ? "StopCircle" : "PlayCircle"}
          iconPosition="left"
          loading={isLoading}
          onClick={handleAction}
          disabled={!currentProject || (!locationVerified && !isActive)}
          className="h-14 text-lg font-semibold"
        >
          {isActive ? "Pointer la sortie" : "Pointer l'entrée"}
        </Button>

        {!locationVerified && !isActive && (
          <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <p className="text-sm text-warning">
              Vérification de position requise pour pointer
            </p>
          </div>
        )}

        {isActive && (
          <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="Clock" size={16} className="text-success" />
            <p className="text-sm text-success">
              Temps de travail en cours depuis {formatTime(new Date(Date.now() - 2 * 60 * 60 * 1000))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClockInOutButton;