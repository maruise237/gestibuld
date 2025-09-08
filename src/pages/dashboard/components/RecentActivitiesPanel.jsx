import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivitiesPanel = () => {
  const activities = [
    {
      id: 1,
      type: 'project_update',
      user: {
        name: 'Pierre Dubois',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      },
      action: 'a mis à jour le projet',
      target: 'Résidence Les Jardins',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      icon: 'Building2',
      iconColor: 'text-primary'
    },
    {
      id: 2,
      type: 'equipment_maintenance',
      user: {
        name: 'Marie Laurent',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
      },
      action: 'a programmé la maintenance de',
      target: 'Excavatrice EX-001',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      icon: 'Wrench',
      iconColor: 'text-warning'
    },
    {
      id: 3,
      type: 'time_tracking',
      user: {
        name: 'Jean Martin',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      action: 'a pointé son arrivée sur',
      target: 'Chantier Centre Commercial',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'Clock',
      iconColor: 'text-success'
    },
    {
      id: 4,
      type: 'budget_alert',
      user: {
        name: 'Sophie Bernard',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
      },
      action: 'a signalé un dépassement budgétaire sur',
      target: 'Projet Bureaux Tech Park',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'AlertTriangle',
      iconColor: 'text-error'
    },
    {
      id: 5,
      type: 'document_upload',
      user: {
        name: 'Luc Moreau',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
      },
      action: 'a téléchargé un rapport pour',
      target: 'Inspection sécurité - Site A',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'FileText',
      iconColor: 'text-primary'
    },
    {
      id: 6,
      type: 'team_assignment',
      user: {
        name: 'Emma Rousseau',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
      },
      action: 'a assigné une équipe au projet',
      target: 'Rénovation École Primaire',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      icon: 'Users',
      iconColor: 'text-primary'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / 60000);
    
    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `Il y a ${diffInDays}j`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 construction-shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Activités Récentes</h3>
        <button className="text-sm text-primary hover:text-primary/80 construction-hover-transition">
          Voir tout
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 construction-hover-transition">
            <div className="relative">
              <Image
                src={activity.user.avatar}
                alt={activity.user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-card rounded-full border border-border flex items-center justify-center">
                <Icon 
                  name={activity.icon} 
                  size={8} 
                  className={activity.iconColor}
                />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-foreground">
                  <span className="font-medium">{activity.user.name}</span>
                  {' '}
                  <span className="text-muted-foreground">{activity.action}</span>
                  {' '}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {activities.length} activités aujourd'hui
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Temps réel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivitiesPanel;