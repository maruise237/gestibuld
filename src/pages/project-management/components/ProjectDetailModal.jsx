import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectDetailModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !project) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR').format(new Date(date));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'en cours':
        return 'bg-primary text-primary-foreground';
      case 'terminé':
        return 'bg-success text-success-foreground';
      case 'en retard':
        return 'bg-error text-error-foreground';
      case 'planifié':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: 'LayoutDashboard' },
    { id: 'timeline', label: 'Chronologie', icon: 'Calendar' },
    { id: 'budget', label: 'Budget', icon: 'Euro' },
    { id: 'team', label: 'Équipe', icon: 'Users' },
    { id: 'photos', label: 'Photos', icon: 'Camera' }
  ];

  const milestones = [
    {
      id: 1,
      title: 'Préparation du terrain',
      date: '2025-01-15',
      status: 'terminé',
      description: 'Excavation et préparation des fondations'
    },
    {
      id: 2,
      title: 'Coulage des fondations',
      date: '2025-02-01',
      status: 'en cours',
      description: 'Coulage du béton pour les fondations'
    },
    {
      id: 3,
      title: 'Structure principale',
      date: '2025-03-15',
      status: 'planifié',
      description: 'Construction de la structure en béton armé'
    },
    {
      id: 4,
      title: 'Finitions',
      date: '2025-05-01',
      status: 'planifié',
      description: 'Travaux de finition et aménagements'
    }
  ];

  const budgetBreakdown = [
    { category: 'Matériaux', budgeted: 150000, spent: 125000 },
    { category: 'Main d\'œuvre', budgeted: 200000, spent: 180000 },
    { category: 'Équipement', budgeted: 75000, spent: 65000 },
    { category: 'Sous-traitance', budgeted: 100000, spent: 85000 },
    { category: 'Divers', budgeted: 25000, spent: 15000 }
  ];

  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      title: 'Vue d\'ensemble du chantier',
      date: '2025-01-20'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
      title: 'Fondations terminées',
      date: '2025-02-05'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1590725175499-8cb8bc2c8d3d?w=400',
      title: 'Progression structure',
      date: '2025-02-15'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',
      title: 'Équipement sur site',
      date: '2025-02-20'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-card-foreground mb-2">Informations générales</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Client:</span>
                <span className="font-medium">{project.client.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Localisation:</span>
                <span className="font-medium">{project.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date de début:</span>
                <span className="font-medium">{formatDate(project.startDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date de fin:</span>
                <span className="font-medium">{formatDate(project.endDate)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-card-foreground mb-2">Progression</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Avancement:</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full construction-transition"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-card-foreground mb-2">Description</h4>
        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <div key={milestone.id} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-4 h-4 rounded-full ${
              milestone.status === 'terminé' ? 'bg-success' :
              milestone.status === 'en cours'? 'bg-primary' : 'bg-muted'
            }`}></div>
            {index < milestones.length - 1 && (
              <div className="w-0.5 h-16 bg-border mt-2"></div>
            )}
          </div>
          <div className="flex-1 pb-8">
            <div className="flex items-center gap-2 mb-1">
              <h5 className="font-medium text-card-foreground">{milestone.title}</h5>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(milestone.status)}`}>
                {milestone.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-1">{milestone.description}</p>
            <p className="text-xs text-muted-foreground">{formatDate(milestone.date)}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderBudget = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted rounded-lg p-4">
          <h5 className="font-medium text-card-foreground mb-1">Budget total</h5>
          <p className="text-2xl font-bold text-primary">{formatCurrency(project.budget)}</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <h5 className="font-medium text-card-foreground mb-1">Dépensé</h5>
          <p className="text-2xl font-bold text-warning">{formatCurrency(470000)}</p>
        </div>
        <div className="bg-muted rounded-lg p-4">
          <h5 className="font-medium text-card-foreground mb-1">Restant</h5>
          <p className="text-2xl font-bold text-success">{formatCurrency(project.budget - 470000)}</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-card-foreground mb-4">Répartition par catégorie</h4>
        <div className="space-y-4">
          {budgetBreakdown.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-card-foreground">{item.category}</span>
                <span className="text-sm text-muted-foreground">
                  {formatCurrency(item.spent)} / {formatCurrency(item.budgeted)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full construction-transition ${
                    item.spent > item.budgeted ? 'bg-error' : 'bg-primary'
                  }`}
                  style={{ width: `${Math.min((item.spent / item.budgeted) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTeam = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.team.map((member) => (
          <div key={member.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Image
              src={member.avatar}
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h5 className="font-medium text-card-foreground">{member.name}</h5>
              <p className="text-sm text-muted-foreground">{member.role}</p>
              <p className="text-xs text-muted-foreground">{member.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div key={photo.id} className="space-y-2">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={photo.url}
              alt={photo.title}
              className="w-full h-48 object-cover construction-hover-transition hover:scale-105"
            />
          </div>
          <div>
            <h5 className="font-medium text-card-foreground text-sm">{photo.title}</h5>
            <p className="text-xs text-muted-foreground">{formatDate(photo.date)}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'timeline':
        return renderTimeline();
      case 'budget':
        return renderBudget();
      case 'team':
        return renderTeam();
      case 'photos':
        return renderPhotos();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="fixed inset-0 z-1200 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg construction-shadow-modal max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={project.image}
                alt={project.name}
                className="w-16 h-16 object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">{project.name}</h2>
              <p className="text-muted-foreground">Client: {project.client.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{project.progress}% terminé</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap construction-hover-transition ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;