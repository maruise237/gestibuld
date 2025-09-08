import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import WeatherWidget from './components/WeatherWidget';
import KPICard from './components/KPICard';
import ProjectStatusCard from './components/ProjectStatusCard';
import QuickActionsPanel from './components/QuickActionsPanel';
import TeamScheduleWidget from './components/TeamScheduleWidget';
import BudgetOverviewChart from './components/BudgetOverviewChart';
import RecentActivitiesPanel from './components/RecentActivitiesPanel';
import EquipmentStatusWidget from './components/EquipmentStatusWidget';

const Dashboard = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [userRole, setUserRole] = useState('admin'); // admin, manager, accountant, employee
  const [isMobile, setIsMobile] = useState(false);

  // Mock user data
  const currentUser = {
    name: 'Jean Dupont',
    role: userRole === 'admin' ? 'Administrateur' : 
          userRole === 'manager' ? 'Chef de Projet' :
          userRole === 'accountant' ? 'Comptable' : 'Employé',
    email: 'jean.dupont@gestibuld.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  };

  // Mock projects data
  const projectsData = [
    {
      id: 1,
      name: 'Résidence Les Jardins',
      client: 'Immobilière Parisienne',
      status: 'En cours',
      progress: 68,
      deadline: '15/09/2025',
      budget: '€450,000',
      teamSize: 12,
      location: 'Paris 15ème',
      priority: 'Haute',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300'
    },
    {
      id: 2,
      name: 'Centre Commercial Atlantis',
      client: 'Groupe Retail France',
      status: 'En cours',
      progress: 42,
      deadline: '30/11/2025',
      budget: '€1,200,000',
      teamSize: 25,
      location: 'Nantes',
      priority: 'Moyenne',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300'
    },
    {
      id: 3,
      name: 'Bureaux Tech Park',
      client: 'Innovation Hub SAS',
      status: 'En retard',
      progress: 25,
      deadline: '20/08/2025',
      budget: '€800,000',
      teamSize: 18,
      location: 'Lyon',
      priority: 'Haute',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300'
    }
  ];

  // KPI data based on user role
  const getKPIData = () => {
    const baseKPIs = [
      {
        title: 'Projets Actifs',
        value: '12',
        change: '+2',
        changeType: 'positive',
        icon: 'Building2',
        subtitle: '3 nouveaux ce mois'
      },
      {
        title: 'Équipe Présente',
        value: '47/52',
        change: '+5',
        changeType: 'positive',
        icon: 'Users',
        subtitle: '90% de présence'
      }
    ];

    const roleSpecificKPIs = {
      admin: [
        {
          title: 'Chiffre d\'Affaires',
          value: '€2.4M',
          change: '+12%',
          changeType: 'positive',
          icon: 'TrendingUp',
          subtitle: 'Objectif: €2.8M'
        },
        {
          title: 'Marge Bénéficiaire',
          value: '18.5%',
          change: '+2.1%',
          changeType: 'positive',
          icon: 'PieChart',
          subtitle: 'Amélioration continue'
        }
      ],
      manager: [
        {
          title: 'Tâches Complétées',
          value: '156',
          change: '+23',
          changeType: 'positive',
          icon: 'CheckCircle',
          subtitle: 'Cette semaine'
        },
        {
          title: 'Retards Projets',
          value: '3',
          change: '-1',
          changeType: 'positive',
          icon: 'AlertTriangle',
          subtitle: 'Amélioration'
        }
      ],
      accountant: [
        {
          title: 'Factures Traitées',
          value: '89',
          change: '+12',
          changeType: 'positive',
          icon: 'Receipt',
          subtitle: 'Ce mois'
        },
        {
          title: 'Budget Utilisé',
          value: '87%',
          change: '+5%',
          changeType: 'negative',
          icon: 'Euro',
          subtitle: 'Surveillance requise'
        }
      ],
      employee: [
        {
          title: 'Heures Travaillées',
          value: '38.5h',
          change: '+2.5h',
          changeType: 'positive',
          icon: 'Clock',
          subtitle: 'Cette semaine'
        },
        {
          title: 'Tâches Assignées',
          value: '8',
          change: '+3',
          changeType: 'neutral',
          icon: 'ListTodo',
          subtitle: 'En cours'
        }
      ]
    };

    return [...baseKPIs, ...(roleSpecificKPIs[userRole] || [])];
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 1024) {
        setIsNavCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavToggle = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const kpiData = getKPIData();

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={currentUser}
        onMenuToggle={handleNavToggle}
        isMenuCollapsed={isNavCollapsed}
      />
      
      <MainNavigation 
        userRole={userRole}
        isCollapsed={isNavCollapsed}
        onToggleCollapse={handleNavToggle}
      />

      <main className={`
        pt-16 construction-transition
        ${isMobile ? 'pb-20' : `${isNavCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}
      `}>
        <div className="p-4 lg:p-6">
          <BreadcrumbNavigation />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Bonjour, {currentUser.name.split(' ')[0]} 👋
            </h1>
            <p className="text-muted-foreground">
              Voici un aperçu de vos activités de construction aujourd'hui
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                change={kpi.change}
                changeType={kpi.changeType}
                icon={kpi.icon}
                subtitle={kpi.subtitle}
                trend={true}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Projects Section - Show for admin and manager */}
              {(userRole === 'admin' || userRole === 'manager') && (
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-4">Projets en Cours</h2>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {projectsData.slice(0, 2).map((project) => (
                      <ProjectStatusCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              )}

              {/* Budget Overview */}
              <BudgetOverviewChart userRole={userRole} />

              {/* Team Schedule - Show for admin and manager */}
              {(userRole === 'admin' || userRole === 'manager') && (
                <TeamScheduleWidget />
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <WeatherWidget />
              <QuickActionsPanel userRole={userRole} />
              
              {/* Equipment Status - Show for admin and manager */}
              {(userRole === 'admin' || userRole === 'manager') && (
                <EquipmentStatusWidget />
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivitiesPanel />
            
            {/* Additional Project Card for larger screens */}
            {(userRole === 'admin' || userRole === 'manager') && projectsData[2] && (
              <div className="hidden lg:block">
                <h2 className="text-xl font-semibold text-foreground mb-4">Projet Prioritaire</h2>
                <ProjectStatusCard project={projectsData[2]} />
              </div>
            )}
          </div>

          {/* Role Switcher for Demo (Remove in production) */}
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-card border border-border rounded-lg p-3 construction-shadow-modal">
              <p className="text-xs text-muted-foreground mb-2">Demo - Changer de rôle:</p>
              <div className="flex gap-1">
                {['admin', 'manager', 'accountant', 'employee'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setUserRole(role)}
                    className={`px-2 py-1 text-xs rounded construction-hover-transition ${
                      userRole === role 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;