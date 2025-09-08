import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationStatus = ({ 
  onLocationUpdate, 
  requiredLocation = null,
  userRole = 'employee' 
}) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = () => {
    setIsLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("La géolocalisation n'est pas supportée par ce navigateur");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: new Date().toISOString()
        };
        
        setCurrentLocation(location);
        setAccuracy(position.coords.accuracy);
        setIsLoading(false);
        
        if (onLocationUpdate) {
          onLocationUpdate(location);
        }
      },
      (error) => {
        let errorMessage = "Erreur de géolocalisation";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Accès à la localisation refusé";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Position non disponible";
            break;
          case error.TIMEOUT:
            errorMessage = "Délai d'attente dépassé";
            break;
        }
        setLocationError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c * 1000; // Distance en mètres
  };

  const isLocationVerified = () => {
    if (!currentLocation || !requiredLocation) return false;
    
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      requiredLocation.latitude,
      requiredLocation.longitude
    );
    
    return distance <= 100; // 100 mètres de tolérance
  };

  const getAccuracyStatus = () => {
    if (!accuracy) return { text: 'Inconnue', color: 'text-muted-foreground' };
    
    if (accuracy <= 10) return { text: 'Excellente', color: 'text-success' };
    if (accuracy <= 50) return { text: 'Bonne', color: 'text-primary' };
    if (accuracy <= 100) return { text: 'Moyenne', color: 'text-warning' };
    return { text: 'Faible', color: 'text-error' };
  };

  const accuracyStatus = getAccuracyStatus();
  const locationVerified = isLocationVerified();

  return (
    <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Statut de localisation</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="RefreshCw"
          loading={isLoading}
          onClick={getCurrentLocation}
        >
          Actualiser
        </Button>
      </div>

      {locationError ? (
        <div className="flex items-center gap-3 p-4 bg-error/10 border border-error/20 rounded-lg">
          <Icon name="AlertCircle" size={20} className="text-error" />
          <div>
            <p className="font-medium text-error">Erreur de localisation</p>
            <p className="text-sm text-error/80">{locationError}</p>
          </div>
        </div>
      ) : currentLocation ? (
        <div className="space-y-4">
          <div className={`
            flex items-center gap-3 p-4 rounded-lg border
            ${locationVerified 
              ? 'bg-success/10 border-success/20' :'bg-warning/10 border-warning/20'
            }
          `}>
            <Icon 
              name={locationVerified ? "MapPin" : "MapPinOff"} 
              size={20} 
              className={locationVerified ? "text-success" : "text-warning"} 
            />
            <div>
              <p className={`font-medium ${locationVerified ? "text-success" : "text-warning"}`}>
                {locationVerified ? "Position vérifiée" : "Position non vérifiée"}
              </p>
              <p className={`text-sm ${locationVerified ? "text-success/80" : "text-warning/80"}`}>
                {locationVerified 
                  ? "Vous êtes sur le site de travail" :"Vous n'êtes pas sur le site requis"
                }
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Target" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Précision</span>
              </div>
              <p className={`text-sm ${accuracyStatus.color}`}>
                {accuracyStatus.text} ({Math.round(accuracy)}m)
              </p>
            </div>

            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Dernière MAJ</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(currentLocation.timestamp).toLocaleTimeString('fr-FR')}
              </p>
            </div>
          </div>

          {requiredLocation && (
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Building2" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Site requis</span>
              </div>
              <p className="text-sm text-muted-foreground">{requiredLocation.name}</p>
              <p className="text-xs text-muted-foreground">
                {requiredLocation.address}
              </p>
            </div>
          )}

          {userRole === 'manager' && !locationVerified && (
            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                iconName="Shield"
                fullWidth
              >
                Autoriser manuellement
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <Icon name="MapPin" size={32} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">Localisation en cours...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationStatus;