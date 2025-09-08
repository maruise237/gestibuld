import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamScheduleWidget = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const teamSchedule = [
    {
      id: 1,
      name: "Pierre Dubois",
      role: "Chef d\'équipe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      project: "Résidence Les Jardins",
      status: "present",
      startTime: "07:00",
      endTime: "16:00",
      location: "Chantier A"
    },
    {
      id: 2,
      name: "Marie Laurent",
      role: "Maçon",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      project: "Centre Commercial",
      status: "present",
      startTime: "08:00",
      endTime: "17:00",
      location: "Chantier B"
    },
    {
      id: 3,
      name: "Jean Martin",
      role: "Électricien",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      project: "Résidence Les Jardins",
      status: "absent",
      startTime: "08:30",
      endTime: "17:30",
      location: "Chantier A"
    },
    {
      id: 4,
      name: "Sophie Bernard",
      role: "Plombier",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      project: "Bureaux Tech Park",
      status: "late",
      startTime: "07:30",
      endTime: "16:30",
      location: "Chantier C"
    }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'present':
        return { color: 'bg-success', text: 'Présent', icon: 'CheckCircle' };
      case 'absent':
        return { color: 'bg-error', text: 'Absent', icon: 'XCircle' };
      case 'late':
        return { color: 'bg-warning', text: 'Retard', icon: 'Clock' };
      default:
        return { color: 'bg-muted', text: 'Inconnu', icon: 'Minus' };
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 construction-shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Planning Équipe</h3>
        <div className="flex items-center gap-2">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground capitalize">
            {formatDate(selectedDate)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {teamSchedule.map((member) => {
          const statusConfig = getStatusConfig(member.status);
          return (
            <div key={member.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 construction-hover-transition">
              <div className="relative">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${statusConfig.color} rounded-full border-2 border-card flex items-center justify-center`}>
                  <Icon name={statusConfig.icon} size={8} color="white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{member.role}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{member.project}</p>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {member.startTime} - {member.endTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="MapPin" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{member.location}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color} text-white`}>
                  {statusConfig.text}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Présents: 2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Retards: 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-muted-foreground">Absents: 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamScheduleWidget;