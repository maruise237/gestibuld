import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EmployeeCard = ({ employee, isSelected, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'on-leave':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'inactive':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getCertificationStatus = (certifications) => {
    const expiringSoon = certifications.filter(cert => {
      const expiryDate = new Date(cert.expiryDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    }).length;

    const expired = certifications.filter(cert => {
      const expiryDate = new Date(cert.expiryDate);
      const today = new Date();
      return expiryDate < today;
    }).length;

    if (expired > 0) return { status: 'expired', count: expired, color: 'text-error' };
    if (expiringSoon > 0) return { status: 'expiring', count: expiringSoon, color: 'text-warning' };
    return { status: 'valid', count: 0, color: 'text-success' };
  };

  const certStatus = getCertificationStatus(employee.certifications);

  return (
    <div
      onClick={() => onClick(employee)}
      className={`
        p-4 rounded-lg border construction-hover-transition cursor-pointer
        ${isSelected 
          ? 'border-primary bg-primary/5 shadow-sm' 
          : 'border-border bg-card hover:border-primary/50 hover:shadow-sm'
        }
      `}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          <Image
            src={employee.avatar}
            alt={employee.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
            employee.isOnline ? 'bg-success' : 'bg-muted'
          }`}></div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-foreground truncate">{employee.name}</h3>
              <p className="text-sm text-muted-foreground">{employee.role}</p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(employee.status)}`}>
              {employee.status}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Building2" size={14} />
              <span className="truncate">{employee.currentProject || 'Unassigned'}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Phone" size={14} />
              <span>{employee.phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Award" size={14} className={certStatus.color} />
                <span className={`text-sm ${certStatus.color}`}>
                  {certStatus.status === 'expired' && `${certStatus.count} expired`}
                  {certStatus.status === 'expiring' && `${certStatus.count} expiring`}
                  {certStatus.status === 'valid' && 'All valid'}
                </span>
              </div>

              {employee.location && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Icon name="MapPin" size={12} />
                  <span>On site</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;