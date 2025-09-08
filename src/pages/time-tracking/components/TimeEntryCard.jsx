import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimeEntryCard = ({ 
  entry, 
  onApprove, 
  onReject, 
  onViewDetails, 
  userRole = 'employee' 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-success bg-success/10 border-success/20';
      case 'pending':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'rejected':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getLocationStatusIcon = (verified) => {
    return verified ? 
      { name: 'MapPin', color: 'text-success' } : 
      { name: 'MapPinOff', color: 'text-error' };
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const locationIcon = getLocationStatusIcon(entry.locationVerified);

  return (
    <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-1">{entry.projectName}</h3>
          <p className="text-sm text-muted-foreground">{entry.phase}</p>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(entry.status)}`}>
          {entry.status === 'approved' ? 'Approuvé' : 
           entry.status === 'pending' ? 'En attente' : 
           entry.status === 'rejected' ? 'Rejeté' : 'Brouillon'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <div>
            <p className="text-sm font-medium text-foreground">{formatDuration(entry.duration)}</p>
            <p className="text-xs text-muted-foreground">
              {entry.startTime} - {entry.endTime}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Icon name={locationIcon.name} size={16} className={locationIcon.color} />
          <div>
            <p className="text-sm font-medium text-foreground">
              {entry.locationVerified ? 'Vérifié' : 'Non vérifié'}
            </p>
            <p className="text-xs text-muted-foreground">{entry.location}</p>
          </div>
        </div>
      </div>

      {entry.description && (
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">{entry.description}</p>
        </div>
      )}

      {entry.photos && entry.photos.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Camera" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {entry.photos.length} photo{entry.photos.length > 1 ? 's' : ''} jointe{entry.photos.length > 1 ? 's' : ''}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {entry.breaks && entry.breaks.length > 0 && (
            <div className="flex items-center gap-1">
              <Icon name="Coffee" size={14} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {entry.breaks.length} pause{entry.breaks.length > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            onClick={() => onViewDetails(entry)}
          >
            Détails
          </Button>
          
          {userRole === 'manager' && entry.status === 'pending' && (
            <>
              <Button
                variant="success"
                size="sm"
                iconName="Check"
                onClick={() => onApprove(entry.id)}
              >
                Approuver
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="X"
                onClick={() => onReject(entry.id)}
              >
                Rejeter
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeEntryCard;