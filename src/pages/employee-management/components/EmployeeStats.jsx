import React from 'react';
import Icon from '../../../components/AppIcon';

const EmployeeStats = ({ employees }) => {
  const calculateStats = () => {
    const total = employees.length;
    const active = employees.filter(emp => emp.status === 'active').length;
    const onLeave = employees.filter(emp => emp.status === 'on-leave').length;
    const online = employees.filter(emp => emp.isOnline).length;
    
    const expiredCertifications = employees.reduce((acc, emp) => {
      const expired = emp.certifications.filter(cert => {
        const expiryDate = new Date(cert.expiryDate);
        const today = new Date();
        return expiryDate < today;
      }).length;
      return acc + expired;
    }, 0);

    const expiringSoon = employees.reduce((acc, emp) => {
      const expiring = emp.certifications.filter(cert => {
        const expiryDate = new Date(cert.expiryDate);
        const today = new Date();
        const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
      }).length;
      return acc + expiring;
    }, 0);

    const unassigned = employees.filter(emp => !emp.currentProject).length;

    return {
      total,
      active,
      onLeave,
      online,
      expiredCertifications,
      expiringSoon,
      unassigned
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: 'Total Employés',
      value: stats.total,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Employés Actifs',
      value: stats.active,
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'En Congé',
      value: stats.onLeave,
      icon: 'Calendar',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'En Ligne',
      value: stats.online,
      icon: 'Wifi',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Cert. Expirées',
      value: stats.expiredCertifications,
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      title: 'Cert. Expirent Bientôt',
      value: stats.expiringSoon,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Non Assignés',
      value: stats.unassigned,
      icon: 'UserMinus',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-4 construction-hover-transition hover:shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <Icon name={stat.icon} size={20} className={stat.color} />
            </div>
            <div className="min-w-0">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground truncate">{stat.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeStats;