import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmployeeDetailsPanel = ({ employee, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!employee) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Sélectionnez un employé</h3>
          <p className="text-muted-foreground">Choisissez un employé dans la liste pour voir ses détails</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Aperçu', icon: 'User' },
    { id: 'certifications', label: 'Certifications', icon: 'Award' },
    { id: 'schedule', label: 'Planning', icon: 'Calendar' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' }
  ];

  const getSkillLevel = (level) => {
    const levels = {
      'beginner': { label: 'Débutant', color: 'bg-error', width: '25%' },
      'intermediate': { label: 'Intermédiaire', color: 'bg-warning', width: '50%' },
      'advanced': { label: 'Avancé', color: 'bg-primary', width: '75%' },
      'expert': { label: 'Expert', color: 'bg-success', width: '100%' }
    };
    return levels[level] || levels.beginner;
  };

  const getCertificationStatus = (expiryDate) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) return { status: 'Expiré', color: 'text-error' };
    if (daysUntilExpiry <= 30) return { status: 'Expire bientôt', color: 'text-warning' };
    return { status: 'Valide', color: 'text-success' };
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b border-border">
        <Image
          src={employee.avatar}
          alt={employee.name}
          className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-foreground">{employee.name}</h2>
        <p className="text-muted-foreground">{employee.role}</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className={`w-2 h-2 rounded-full ${employee.isOnline ? 'bg-success' : 'bg-muted'}`}></div>
          <span className="text-sm text-muted-foreground">
            {employee.isOnline ? 'En ligne' : 'Hors ligne'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-foreground mb-3">Informations de contact</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <span className="text-sm">{employee.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-sm">{employee.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={16} className="text-muted-foreground" />
              <span className="text-sm">{employee.address}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3">Compétences</h3>
          <div className="space-y-3">
            {employee.skills.map((skill, index) => {
              const skillInfo = getSkillLevel(skill.level);
              return (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{skillInfo.label}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${skillInfo.color}`}
                      style={{ width: skillInfo.width }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-3">Projet actuel</h3>
          <div className="p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Building2" size={16} className="text-primary" />
              <span className="font-medium">{employee.currentProject}</span>
            </div>
            <p className="text-sm text-muted-foreground">{employee.projectRole}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Certifications</h3>
      <div className="space-y-3">
        {employee.certifications.map((cert, index) => {
          const status = getCertificationStatus(cert.expiryDate);
          return (
            <div key={index} className="p-3 border border-border rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-foreground">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
                <span className={`text-xs font-medium ${status.color}`}>
                  {status.status}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Expire le: {new Date(cert.expiryDate).toLocaleDateString('fr-FR')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Planning de la semaine</h3>
      <div className="space-y-2">
        {employee.weeklySchedule.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div>
              <span className="font-medium">{day.day}</span>
              <p className="text-sm text-muted-foreground">{day.project}</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium">{day.hours}</span>
              <p className="text-xs text-muted-foreground">{day.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">Métriques de performance</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-primary">{employee.performance.hoursThisMonth}</div>
          <div className="text-xs text-muted-foreground">Heures ce mois</div>
        </div>
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-success">{employee.performance.projectsCompleted}</div>
          <div className="text-xs text-muted-foreground">Projets terminés</div>
        </div>
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-warning">{employee.performance.attendanceRate}%</div>
          <div className="text-xs text-muted-foreground">Taux de présence</div>
        </div>
        <div className="p-3 bg-muted rounded-lg text-center">
          <div className="text-2xl font-bold text-accent">{employee.performance.rating}/5</div>
          <div className="text-xs text-muted-foreground">Évaluation</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Détails de l'employé</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          iconName="X"
          className="lg:hidden"
        />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 construction-hover-transition whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={tab.icon} size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'certifications' && renderCertifications()}
          {activeTab === 'schedule' && renderSchedule()}
          {activeTab === 'performance' && renderPerformance()}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" iconName="Edit" className="flex-1">
            Modifier
          </Button>
          <Button variant="outline" size="sm" iconName="MessageSquare" className="flex-1">
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsPanel;