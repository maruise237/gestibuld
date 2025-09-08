import React from 'react';
import Icon from '../../../components/AppIcon';

const TimeSheetSummary = ({ 
  timeEntries = [], 
  selectedDate,
  weeklyTarget = 35 
}) => {
  const getWeekEntries = () => {
    if (!selectedDate) return [];
    
    const weekStart = new Date(selectedDate);
    const day = weekStart.getDay();
    const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
    weekStart.setDate(diff);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return timeEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= weekStart && entryDate <= weekEnd;
    });
  };

  const getDayEntries = () => {
    if (!selectedDate) return [];
    const dateStr = selectedDate.toISOString().split('T')[0];
    return timeEntries.filter(entry => entry.date === dateStr);
  };

  const calculateTotalHours = (entries) => {
    return entries.reduce((total, entry) => total + (entry.duration / 60), 0);
  };

  const calculateBreakTime = (entries) => {
    return entries.reduce((total, entry) => {
      if (entry.breaks) {
        return total + entry.breaks.reduce((breakTotal, breakItem) => breakTotal + breakItem.duration, 0);
      }
      return total;
    }, 0) / 60;
  };

  const weekEntries = getWeekEntries();
  const dayEntries = getDayEntries();
  
  const weeklyHours = calculateTotalHours(weekEntries);
  const dailyHours = calculateTotalHours(dayEntries);
  const dailyBreaks = calculateBreakTime(dayEntries);
  
  const weeklyProgress = (weeklyHours / weeklyTarget) * 100;
  
  const approvedEntries = weekEntries.filter(entry => entry.status === 'approved');
  const pendingEntries = weekEntries.filter(entry => entry.status === 'pending');
  
  const formatHours = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card">
      <h3 className="font-semibold text-foreground mb-4">Résumé des heures</h3>
      
      {selectedDate && (
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium text-foreground">
            {formatDate(selectedDate)}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Clock" size={20} className="text-primary" />
            <h4 className="font-medium text-foreground">Aujourd'hui</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Temps travaillé</span>
              <span className="text-sm font-medium text-foreground">
                {formatHours(dailyHours)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Pauses</span>
              <span className="text-sm font-medium text-foreground">
                {formatHours(dailyBreaks)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Entrées</span>
              <span className="text-sm font-medium text-foreground">
                {dayEntries.length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Calendar" size={20} className="text-accent" />
            <h4 className="font-medium text-foreground">Cette semaine</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-sm font-medium text-foreground">
                {formatHours(weeklyHours)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Objectif</span>
              <span className="text-sm font-medium text-foreground">
                {formatHours(weeklyTarget)}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full construction-transition"
                style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground text-center">
              {weeklyProgress.toFixed(1)}% de l'objectif
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Heures approuvées</span>
          </div>
          <span className="text-sm font-bold text-success">
            {formatHours(calculateTotalHours(approvedEntries))}
          </span>
        </div>

        <div className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">En attente d'approbation</span>
          </div>
          <span className="text-sm font-bold text-warning">
            {formatHours(calculateTotalHours(pendingEntries))}
          </span>
        </div>

        {weeklyHours > weeklyTarget && (
          <div className="flex items-center gap-2 p-3 bg-error/5 border border-error/20 rounded-lg">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <span className="text-sm text-error">
              Heures supplémentaires: {formatHours(weeklyHours - weeklyTarget)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSheetSummary;