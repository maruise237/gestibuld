import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import TimeEntryCard from './components/TimeEntryCard';
import ClockInOutButton from './components/ClockInOutButton';
import WeeklyCalendar from './components/WeeklyCalendar';
import QuickActions from './components/QuickActions';
import LocationStatus from './components/LocationStatus';
import TimeSheetSummary from './components/TimeSheetSummary';

const TimeTracking = () => {
  const navigate = useNavigate();
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentProject, setCurrentProject] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [locationVerified, setLocationVerified] = useState(false);
  const [userRole] = useState('employee');
  const [viewMode, setViewMode] = useState('daily');

  // Mock data
  const mockUser = {
    name: "Pierre Dubois",
    role: "Ouvrier spécialisé",
    email: "pierre.dubois@gestibuld.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  const mockProjects = [
    {
      id: 1,
      name: "Résidence Les Jardins",
      phase: "Gros œuvre - Étage 2",
      location: {
        name: "Chantier Les Jardins",
        address: "15 Avenue des Tilleuls, 69000 Lyon",
        latitude: 45.7640,
        longitude: 4.8357
      },
      color: "bg-blue-500"
    },
    {
      id: 2,
      name: "Centre Commercial Confluence",
      phase: "Finitions intérieures",
      location: {
        name: "Centre Confluence",
        address: "112 Cours Charlemagne, 69002 Lyon",
        latitude: 45.7370,
        longitude: 4.8186
      },
      color: "bg-green-500"
    }
  ];

  const mockTimeEntries = [
    {
      id: 1,
      projectName: "Résidence Les Jardins",
      phase: "Gros œuvre - Étage 2",
      date: "2025-01-22",
      startTime: "08:00",
      endTime: "12:00",
      duration: 240,
      location: "Chantier Les Jardins",
      locationVerified: true,
      status: "approved",
      description: "Coulage dalle béton étage 2, zone A et B",
      photos: ["photo1.jpg", "photo2.jpg"],
      breaks: [
        { type: "coffee", duration: 15, time: "10:15" }
      ]
    },
    {
      id: 2,
      projectName: "Résidence Les Jardins",
      phase: "Gros œuvre - Étage 2",
      date: "2025-01-22",
      startTime: "13:00",
      endTime: "17:00",
      duration: 240,
      location: "Chantier Les Jardins",
      locationVerified: true,
      status: "pending",
      description: "Pose armatures ferraillage zone C",
      photos: ["photo3.jpg"],
      breaks: []
    },
    {
      id: 3,
      projectName: "Centre Commercial Confluence",
      phase: "Finitions intérieures",
      date: "2025-01-21",
      startTime: "08:30",
      endTime: "16:30",
      duration: 480,
      location: "Centre Confluence",
      locationVerified: true,
      status: "approved",
      description: "Installation cloisons sèches niveau 1",
      photos: [],
      breaks: [
        { type: "lunch", duration: 60, time: "12:00" },
        { type: "coffee", duration: 15, time: "15:00" }
      ]
    }
  ];

  const mockProjectAssignments = [
    {
      date: "2025-01-22",
      projectId: 1,
      projectName: "Résidence Les Jardins",
      projectColor: "bg-blue-500"
    },
    {
      date: "2025-01-23",
      projectId: 1,
      projectName: "Résidence Les Jardins",
      projectColor: "bg-blue-500"
    },
    {
      date: "2025-01-24",
      projectId: 2,
      projectName: "Centre Commercial Confluence",
      projectColor: "bg-green-500"
    }
  ];

  useEffect(() => {
    // Set current project based on today's assignment
    const today = new Date().toISOString().split('T')[0];
    const todayAssignment = mockProjectAssignments.find(a => a.date === today);
    if (todayAssignment) {
      const project = mockProjects.find(p => p.id === todayAssignment.projectId);
      setCurrentProject(project);
    }
  }, []);

  const handleMenuToggle = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const handleClockIn = () => {
    if (locationVerified && currentProject) {
      setIsActive(true);
      console.log('Clock in:', {
        project: currentProject,
        timestamp: new Date().toISOString(),
        location: 'current location'
      });
    }
  };

  const handleClockOut = () => {
    setIsActive(false);
    console.log('Clock out:', {
      timestamp: new Date().toISOString()
    });
  };

  const handleLocationUpdate = (location) => {
    if (currentProject && currentProject.location) {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        currentProject.location.latitude,
        currentProject.location.longitude
      );
      setLocationVerified(distance <= 100);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c * 1000;
  };

  const handleTakePhoto = () => {
    console.log('Take photo for work documentation');
  };

  const handleLogBreak = (breakData) => {
    console.log('Log break:', breakData);
  };

  const handleAddNote = (noteData) => {
    console.log('Add note:', noteData);
  };

  const handleApproveEntry = (entryId) => {
    console.log('Approve entry:', entryId);
  };

  const handleRejectEntry = (entryId) => {
    console.log('Reject entry:', entryId);
  };

  const handleViewDetails = (entry) => {
    console.log('View entry details:', entry);
  };

  const getFilteredEntries = () => {
    if (viewMode === 'daily') {
      const dateStr = selectedDate.toISOString().split('T')[0];
      return mockTimeEntries.filter(entry => entry.date === dateStr);
    } else {
      // Weekly view
      const weekStart = new Date(selectedDate);
      const day = weekStart.getDay();
      const diff = weekStart.getDate() - day + (day === 0 ? -6 : 1);
      weekStart.setDate(diff);
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return mockTimeEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= weekStart && entryDate <= weekEnd;
      });
    }
  };

  const filteredEntries = getFilteredEntries();

  const viewModeOptions = [
    { value: 'daily', label: 'Vue journalière' },
    { value: 'weekly', label: 'Vue hebdomadaire' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={mockUser}
        onMenuToggle={handleMenuToggle}
        isMenuCollapsed={isMenuCollapsed}
      />
      
      <MainNavigation 
        userRole={userRole}
        isCollapsed={isMenuCollapsed}
        onToggleCollapse={handleMenuToggle}
      />

      <main className={`
        pt-16 construction-transition
        ${isMenuCollapsed ? 'lg:pl-16' : 'lg:pl-60'}
        pb-20 lg:pb-4
      `}>
        <div className="p-4 lg:p-6">
          <BreadcrumbNavigation />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Suivi du temps
              </h1>
              <p className="text-muted-foreground">
                Gérez vos heures de travail avec validation GPS
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Select
                options={viewModeOptions}
                value={viewMode}
                onChange={setViewMode}
                className="w-40"
              />
              <Button
                variant="outline"
                iconName="Download"
                onClick={() => console.log('Export timesheet')}
              >
                Exporter
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Clock In/Out Section */}
              <ClockInOutButton
                isActive={isActive}
                onClockIn={handleClockIn}
                onClockOut={handleClockOut}
                currentProject={currentProject}
                locationVerified={locationVerified}
              />

              {/* Quick Actions */}
              <QuickActions
                onTakePhoto={handleTakePhoto}
                onLogBreak={handleLogBreak}
                onAddNote={handleAddNote}
                isActive={isActive}
              />

              {/* Weekly Calendar */}
              <WeeklyCalendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                timeEntries={mockTimeEntries}
                projectAssignments={mockProjectAssignments}
              />

              {/* Time Entries */}
              <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">
                    {viewMode === 'daily' ? 'Entrées du jour' : 'Entrées de la semaine'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {filteredEntries.length} entrée{filteredEntries.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredEntries.length === 0 ? (
                    <div className="text-center py-8">
                      <Icon name="Clock" size={32} className="mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Aucune entrée pour cette période
                      </p>
                    </div>
                  ) : (
                    filteredEntries.map(entry => (
                      <TimeEntryCard
                        key={entry.id}
                        entry={entry}
                        onApprove={handleApproveEntry}
                        onReject={handleRejectEntry}
                        onViewDetails={handleViewDetails}
                        userRole={userRole}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Status & Summary */}
            <div className="space-y-6">
              {/* Location Status */}
              <LocationStatus
                onLocationUpdate={handleLocationUpdate}
                requiredLocation={currentProject?.location}
                userRole={userRole}
              />

              {/* Time Sheet Summary */}
              <TimeSheetSummary
                timeEntries={mockTimeEntries}
                selectedDate={selectedDate}
                weeklyTarget={35}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TimeTracking;