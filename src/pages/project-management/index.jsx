import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ProjectCard from './components/ProjectCard';
import ProjectFilters from './components/ProjectFilters';
import ProjectDetailModal from './components/ProjectDetailModal';
import ProjectTabs from './components/ProjectTabs';
import ProjectActionBar from './components/ProjectActionBar';
import ProjectListView from './components/ProjectListView';

const ProjectManagement = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    manager: '',
    client: '',
    startDate: '',
    endDate: ''
  });

  // Mock projects data
  const mockProjects = [
    {
      id: 1,
      name: 'Centre Commercial Rivoli',
      client: {
        name: 'Mairie de Paris',
        contact: 'contact@paris.fr'
      },
      status: 'En cours',
      priority: 'Haute',
      progress: 65,
      budget: 550000,
      location: 'Paris 1er',
      startDate: '2025-01-01',
      endDate: '2025-06-30',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
      description: `Construction d'un centre commercial moderne de 5000m² avec espaces commerciaux, restaurants et parking souterrain. Le projet inclut des installations écologiques avec panneaux solaires et système de récupération d'eau de pluie.`,
      team: [
        {
          id: 1,
          name: 'Jean Dupont',
          role: 'Chef de projet',
          email: 'jean.dupont@gestibuld.com',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          id: 2,
          name: 'Marie Martin',
          role: 'Architecte',
          email: 'marie.martin@gestibuld.com',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
          id: 3,
          name: 'Pierre Bernard',
          role: 'Ingénieur structure',
          email: 'pierre.bernard@gestibuld.com',
          avatar: 'https://randomuser.me/api/portraits/men/56.jpg'
        },
        {
          id: 4,
          name: 'Sophie Durand',
          role: 'Contremaître',
          email: 'sophie.durand@gestibuld.com',
          avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
        }
      ]
    },
    {
      id: 2,
      name: 'Résidence Les Jardins',
      client: {
        name: 'Bouygues Construction',
        contact: 'projets@bouygues.fr'
      },
      status: 'Planifié',
      priority: 'Moyenne',
      progress: 15,
      budget: 750000,
      location: 'Neuilly-sur-Seine',
      startDate: '2025-03-01',
      endDate: '2025-12-31',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
      description: `Complexe résidentiel de 45 appartements avec espaces verts, aire de jeux et parking. Architecture moderne respectant les normes environnementales RT2020.`,
      team: [
        {
          id: 5,
          name: 'Luc Moreau',
          role: 'Chef de projet',
          email: 'luc.moreau@gestibuld.com',
          avatar: 'https://randomuser.me/api/portraits/men/78.jpg'
        },
        {
          id: 6,
          name: 'Claire Petit',
          role: 'Architecte',
          email: 'claire.petit@gestibuld.com',
          avatar: 'https://randomuser.me/api/portraits/women/23.jpg'
        }
      ]
    },
    {
      id: 3,
      name: 'Rénovation Hôtel de Ville',
      client: {
        name: 'VINCI Construction',
        contact: 'contact@vinci.com'
      },
      status: 'En retard',
      priority: 'Haute',
      progress: 45,
      budget: 320000,
      location: 'Lyon 2ème',
      startDate: '2024-10-01',
      endDate: '2025-04-30',
      image: 'https://images.unsplash.com/photo-1590725175499-8cb8bc2c8d3d?w=400',
      description: `Rénovation complète de l'hôtel de ville historique avec mise aux normes, isolation thermique et restauration des façades classées.`,
      team: [
        {
          id: 7,
          name: 'Antoine Roux',role: 'Chef de projet',email: 'antoine.roux@gestibuld.com',avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
        },
        {
          id: 8,
          name: 'Isabelle Blanc',role: 'Spécialiste patrimoine',email: 'isabelle.blanc@gestibuld.com',avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
        },
        {
          id: 9,
          name: 'Thomas Leroy',role: 'Maçon spécialisé',email: 'thomas.leroy@gestibuld.com',avatar: 'https://randomuser.me/api/portraits/men/89.jpg'
        }
      ]
    },
    {
      id: 4,
      name: 'Pont Autoroutier A86',
      client: {
        name: 'Eiffage Construction',contact: 'infrastructure@eiffage.fr'
      },
      status: 'Terminé',priority: 'Haute',progress: 100,budget: 1200000,location: 'Créteil',startDate: '2024-01-15',endDate: '2024-12-20',image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400',description: `Construction d'un pont autoroutier de 180m avec voies cyclables et piétonnes. Structure en béton précontraint avec finitions architecturales.`,
      team: [
        {
          id: 10,
          name: 'François Girard',
          role: 'Ingénieur ponts',
          email: 'francois.girard@gestibuld.com',
          avatar: 'https://randomuser.me/api/portraits/men/12.jpg'
        },
        {
          id: 11,
          name: 'Nathalie Simon',
          role: 'Chef de chantier',
          email: 'nathalie.simon@gestibuld.com',
          avatar: 'https://randomuser.me/api/portraits/women/34.jpg'
        }
      ]
    },
    {
      id: 5,
      name: 'École Primaire Voltaire',
      client: {
        name: 'Mairie de Marseille',
        contact: 'education@marseille.fr'
      },
      status: 'En cours',
      priority: 'Moyenne',
      progress: 80,
      budget: 450000,
      location: 'Marseille 8ème',
      startDate: '2024-09-01',
      endDate: '2025-05-31',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
      description: `Construction d'une école primaire de 12 classes avec cantine, gymnase et espaces extérieurs. Bâtiment basse consommation avec matériaux écologiques.`,
      team: [
        {
          id: 12,
          name: 'Sylvie Dubois',role: 'Chef de projet',email: 'sylvie.dubois@gestibuld.com',avatar: 'https://randomuser.me/api/portraits/women/56.jpg'
        },
        {
          id: 13,
          name: 'Marc Rousseau',role: 'Électricien',email: 'marc.rousseau@gestibuld.com',avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
        }
      ]
    },
    {
      id: 6,
      name: 'Parking Souterrain Opéra',
      client: {
        name: 'Ville de Nice',contact: 'urbanisme@nice.fr'
      },
      status: 'Planifié',priority: 'Faible',progress: 5,budget: 680000,location: 'Nice Centre',startDate: '2025-04-01',endDate: '2025-11-30',image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      description: `Parking souterrain de 3 niveaux avec 200 places, bornes électriques et système de ventilation intelligent. Accès sécurisé par badge.`,
      team: [
        {
          id: 14,
          name: 'Olivier Fabre',role: 'Ingénieur géotechnique',email: 'olivier.fabre@gestibuld.com',avatar: 'https://randomuser.me/api/portraits/men/78.jpg'
        }
      ]
    }
  ];

  const user = {
    name: 'Jean Dupont',
    role: 'Chef de projet',
    email: 'jean.dupont@gestibuld.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 1024) {
        setIsFiltersCollapsed(false);
      } else {
        setIsFiltersCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filterProjects = (projects) => {
    return projects.filter(project => {
      // Tab filter
      if (activeTab === 'active' && !['En cours', 'En retard'].includes(project.status)) return false;
      if (activeTab === 'completed' && project.status !== 'Terminé') return false;
      if (activeTab === 'planning' && project.status !== 'Planifié') return false;

      // Search filter
      if (filters.search && !project.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !project.client.name.toLowerCase().includes(filters.search.toLowerCase())) return false;

      // Status filter
      if (filters.status && project.status.toLowerCase() !== filters.status.toLowerCase()) return false;

      // Priority filter
      if (filters.priority && project.priority.toLowerCase() !== filters.priority.toLowerCase()) return false;

      // Date filters
      if (filters.startDate && new Date(project.startDate) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(project.endDate) > new Date(filters.endDate)) return false;

      return true;
    });
  };

  const filteredProjects = filterProjects(mockProjects);

  const projectCounts = {
    active: mockProjects.filter(p => ['En cours', 'En retard'].includes(p.status)).length,
    completed: mockProjects.filter(p => p.status === 'Terminé').length,
    planning: mockProjects.filter(p => p.status === 'Planifié').length
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  const handleStatusUpdate = (project) => {
    console.log('Update status for project:', project.name);
    // Implementation for status update modal
  };

  const handlePhotoUpload = (project) => {
    console.log('Upload photo for project:', project.name);
    // Implementation for photo upload
  };

  const handleNewProject = () => {
    console.log('Create new project');
    // Implementation for new project modal
  };

  const handleBulkAction = (action, projectIds) => {
    console.log('Bulk action:', action, 'for projects:', projectIds);
    // Implementation for bulk actions
  };

  const handleExportPDF = () => {
    console.log('Export projects to PDF');
    // Implementation for PDF export
  };

  const handleToggleNavigation = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <>
      <Helmet>
        <title>Gestion des Projets - GESTIBULD</title>
        <meta name="description" content="Gérez vos projets de construction avec suivi en temps réel, budgets et équipes" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header 
          user={user}
          onMenuToggle={handleToggleNavigation}
          isMenuCollapsed={isNavCollapsed}
        />
        
        <MainNavigation 
          userRole="admin"
          isCollapsed={isNavCollapsed}
          onToggleCollapse={handleToggleNavigation}
        />

        <main className={`construction-transition ${
          isMobile ? 'pt-16 pb-20' : `pt-16 ${isNavCollapsed ? 'pl-16' : 'pl-60'}`
        }`}>
          <div className="p-6">
            <BreadcrumbNavigation />
            
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Projets</h1>
              <p className="text-muted-foreground">
                Suivez et gérez tous vos projets de construction en temps réel
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters Sidebar */}
              <div className={`${isFiltersCollapsed ? 'hidden lg:block lg:w-80' : 'w-full lg:w-80'}`}>
                <ProjectFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  isCollapsed={isFiltersCollapsed && isMobile}
                  onToggleCollapse={() => setIsFiltersCollapsed(!isFiltersCollapsed)}
                />
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <ProjectTabs
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  projectCounts={projectCounts}
                />

                <ProjectActionBar
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  onNewProject={handleNewProject}
                  selectedProjects={selectedProjects}
                  onBulkAction={handleBulkAction}
                  onExportPDF={handleExportPDF}
                />

                {/* Mobile Filters Toggle */}
                {isFiltersCollapsed && isMobile && (
                  <div className="mb-4">
                    <ProjectFilters
                      filters={filters}
                      onFiltersChange={setFilters}
                      isCollapsed={true}
                      onToggleCollapse={() => setIsFiltersCollapsed(false)}
                    />
                  </div>
                )}

                {/* Projects Display */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onViewDetails={handleViewDetails}
                        onStatusUpdate={handleStatusUpdate}
                        onPhotoUpload={handlePhotoUpload}
                      />
                    ))}
                  </div>
                ) : (
                  <ProjectListView
                    projects={filteredProjects}
                    selectedProjects={selectedProjects}
                    onProjectSelect={setSelectedProjects}
                    onViewDetails={handleViewDetails}
                    onStatusUpdate={handleStatusUpdate}
                    onPhotoUpload={handlePhotoUpload}
                  />
                )}

                {filteredProjects.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏗️</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Aucun projet trouvé
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Aucun projet ne correspond aux critères de recherche actuels.
                    </p>
                    <button
                      onClick={() => setFilters({
                        search: '',
                        status: '',
                        priority: '',
                        manager: '',
                        client: '',
                        startDate: '',
                        endDate: ''
                      })}
                      className="text-primary hover:text-primary/80 construction-hover-transition"
                    >
                      Réinitialiser les filtres
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <ProjectDetailModal
          project={selectedProject}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
        />
      </div>
    </>
  );
};

export default ProjectManagement;