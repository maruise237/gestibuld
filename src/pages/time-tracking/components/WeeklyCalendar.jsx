import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WeeklyCalendar = ({ 
  selectedDate, 
  onDateChange, 
  timeEntries = [],
  projectAssignments = [] 
}) => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const getWeekDates = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  };

  const weekDates = getWeekDates(currentWeek);

  const navigateWeek = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction * 7));
    setCurrentWeek(newWeek);
  };

  const getDateEntries = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return timeEntries.filter(entry => entry.date === dateStr);
  };

  const getDateAssignments = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return projectAssignments.filter(assignment => assignment.date === dateStr);
  };

  const getTotalHours = (entries) => {
    return entries.reduce((total, entry) => total + (entry.duration / 60), 0);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric'
    });
  };

  const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  return (
    <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Calendrier hebdomadaire</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => navigateWeek(-1)}
          />
          <span className="text-sm font-medium text-foreground px-3">
            {formatMonthYear(weekDates[0])}
          </span>
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            onClick={() => navigateWeek(1)}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, index) => {
          const entries = getDateEntries(date);
          const assignments = getDateAssignments(date);
          const totalHours = getTotalHours(entries);
          const hasAssignment = assignments.length > 0;

          return (
            <button
              key={index}
              onClick={() => onDateChange(date)}
              className={`
                p-3 rounded-lg text-center construction-hover-transition border
                ${isSelected(date) 
                  ? 'bg-primary text-primary-foreground border-primary' 
                  : isToday(date)
                  ? 'bg-accent/10 text-accent border-accent/20' :'bg-background hover:bg-muted border-border'
                }
              `}
            >
              <div className="text-xs font-medium mb-1">
                {dayNames[index]}
              </div>
              <div className={`text-lg font-bold mb-1 ${isSelected(date) ? 'text-primary-foreground' : 'text-foreground'}`}>
                {date.getDate()}
              </div>
              
              {hasAssignment && (
                <div className="flex items-center justify-center mb-1">
                  <div className={`w-2 h-2 rounded-full ${assignments[0].projectColor || 'bg-primary'}`}></div>
                </div>
              )}
              
              {totalHours > 0 && (
                <div className={`text-xs ${isSelected(date) ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {totalHours.toFixed(1)}h
                </div>
              )}
              
              {entries.length > 0 && (
                <div className="flex items-center justify-center mt-1">
                  {entries.some(e => e.status === 'pending') && (
                    <Icon name="Clock" size={10} className="text-warning" />
                  )}
                  {entries.some(e => e.status === 'approved') && (
                    <Icon name="CheckCircle" size={10} className="text-success" />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Assigné</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={12} className="text-warning" />
              <span className="text-muted-foreground">En attente</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={12} className="text-success" />
              <span className="text-muted-foreground">Approuvé</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendar;