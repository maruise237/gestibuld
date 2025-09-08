import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon, 
  subtitle,
  trend = null 
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 construction-shadow-card construction-hover-transition hover:shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        </div>
        {trend && (
          <div className="flex items-center gap-1">
            <Icon name={getChangeIcon()} size={16} className={getChangeColor()} />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        {change && (
          <div className="flex items-center gap-2">
            <Icon name={getChangeIcon()} size={14} className={getChangeColor()} />
            <span className={`text-sm font-medium ${getChangeColor()}`}>
              {change}
            </span>
            <span className="text-xs text-muted-foreground">vs mois dernier</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;