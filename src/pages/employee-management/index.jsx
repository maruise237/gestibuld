import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import EmployeeCard from './components/EmployeeCard';
import EmployeeDetailsPanel from './components/EmployeeDetailsPanel';
import EmployeeTable from './components/EmployeeTable';
import EmployeeFilters from './components/EmployeeFilters';
import AddEmployeeModal from './components/AddEmployeeModal';
import EmployeeStats from './components/EmployeeStats';

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailsPanel, setShowDetailsPanel] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filters, setFilters] = useState({
    status: '',
    role: '',
    project: '',
    certification: '',
    skill: '',
    onlineOnly: false,
    availableOnly: false
  });

  const [employees, setEmployees] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      name: 'Pierre Dubois',
      email: 'pierre.dubois@gestibuld.com',
      phone: '+33 1 23 45 67 89',
      role: 'Site Manager',
      department: 'Management',
      status: 'active',
      isOnline: true,
      currentProject: 'Résidence Les Jardins',
      projectRole: 'Chef de chantier principal',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      address: '15 Rue de la Paix, 75001 Paris',
      emergencyContact: 'Marie Dubois',
      emergencyPhone: '+33 1 98 76 54 32',
      skills: [
        { name: 'Management d\'équipe', level: 'expert' },
        { name: 'Planification de projet', level: 'expert' },
        { name: 'Sécurité chantier', level: 'advanced' },
        { name: 'Lecture de plans', level: 'expert' }
      ],
      certifications: [
        { name: 'CACES R482', issuer: 'AFPA', expiryDate: '2025-06-15' },
        { name: 'Sécurité Chantier', issuer: 'OPPBTP', expiryDate: '2024-12-20' },
        { name: 'Management HSE', issuer: 'INRS', expiryDate: '2025-03-10' }
      ],
      contractType: 'CDI',
      salary: '4500',
      startDate: '2020-03-15',
      performance: {
        hoursThisMonth: 168,
        projectsCompleted: 12,
        attendanceRate: 98,
        rating: 4.8
      },
      weeklySchedule: [
        { day: 'Lundi', project: 'Résidence Les Jardins', hours: '8h-17h', location: 'Chantier A' },
        { day: 'Mardi', project: 'Résidence Les Jardins', hours: '8h-17h', location: 'Chantier A' },
        { day: 'Mercredi', project: 'Résidence Les Jardins', hours: '8h-17h', location: 'Chantier A' },
        { day: 'Jeudi', project: 'Résidence Les Jardins', hours: '8h-17h', location: 'Chantier A' },
        { day: 'Vendredi', project: 'Résidence Les Jardins', hours: '8h-16h', location: 'Chantier A' }
      ],
      location: { lat: 48.8566, lng: 2.3522 }
    },
    {
      id: 2,
      employeeId: 'EMP002',
      name: 'Marie Leroy',
      email: 'marie.leroy@gestibuld.com',
      phone: '+33 1 34 56 78 90',
      role: 'Foreman',
      department: 'Construction',
      status: 'active',
      isOnline: false,
      currentProject: 'Centre Commercial Atlantis',
      projectRole: 'Contremaître équipe béton',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      address: '28 Avenue des Champs, 92100 Boulogne',
      emergencyContact: 'Jean Leroy',
      emergencyPhone: '+33 1 87 65 43 21',
      skills: [
        { name: 'Maçonnerie', level: 'expert' },
        { name: 'Béton armé', level: 'expert' },
        { name: 'Encadrement équipe', level: 'advanced' },
        { name: 'Contrôle qualité', level: 'advanced' }
      ],
      certifications: [
        { name: 'Maçonnerie Professionnelle', issuer: 'CFA BTP', expiryDate: '2025-09-30' },
        { name: 'Travail en Hauteur', issuer: 'OPPBTP', expiryDate: '2024-08-15' }
      ],
      contractType: 'CDI',
      salary: '3200',
      startDate: '2019-09-01',
      performance: {
        hoursThisMonth: 172,
        projectsCompleted: 8,
        attendanceRate: 95,
        rating: 4.5
      },
      weeklySchedule: [
        { day: 'Lundi', project: 'Centre Commercial Atlantis', hours: '7h-16h', location: 'Zone B' },
        { day: 'Mardi', project: 'Centre Commercial Atlantis', hours: '7h-16h', location: 'Zone B' },
        { day: 'Mercredi', project: 'Centre Commercial Atlantis', hours: '7h-16h', location: 'Zone B' },
        { day: 'Jeudi', project: 'Centre Commercial Atlantis', hours: '7h-16h', location: 'Zone B' },
        { day: 'Vendredi', project: 'Centre Commercial Atlantis', hours: '7h-15h', location: 'Zone B' }
      ],
      location: null
    },
    {
      id: 3,
      employeeId: 'EMP003',
      name: 'Antoine Martin',
      email: 'antoine.martin@gestibuld.com',
      phone: '+33 1 45 67 89 01',
      role: 'Equipment Operator',
      department: 'Equipment',
      status: 'active',
      isOnline: true,
      currentProject: 'Immeuble de Bureaux Horizon',
      projectRole: 'Opérateur grue',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      address: '42 Rue du Commerce, 94200 Ivry',
      emergencyContact: 'Sophie Martin',
      emergencyPhone: '+33 1 76 54 32 10',
      skills: [
        { name: 'Conduite d\'engins', level: 'expert' },
        { name: 'Maintenance préventive', level: 'advanced' },
        { name: 'Sécurité équipement', level: 'expert' },
        { name: 'Grue mobile', level: 'expert' }
      ],
      certifications: [
        { name: 'CACES R483', issuer: 'AFPA', expiryDate: '2025-01-20' },
        { name: 'CACES R490', issuer: 'AFPA', expiryDate: '2024-11-30' },
        { name: 'Maintenance Engins', issuer: 'Constructys', expiryDate: '2023-12-15' }
      ],
      contractType: 'CDI',
      salary: '3800',
      startDate: '2021-01-10',
      performance: {
        hoursThisMonth: 165,
        projectsCompleted: 6,
        attendanceRate: 100,
        rating: 4.7
      },
      weeklySchedule: [
        { day: 'Lundi', project: 'Immeuble de Bureaux Horizon', hours: '6h-15h', location: 'Site C' },
        { day: 'Mardi', project: 'Immeuble de Bureaux Horizon', hours: '6h-15h', location: 'Site C' },
        { day: 'Mercredi', project: 'Immeuble de Bureaux Horizon', hours: '6h-15h', location: 'Site C' },
        { day: 'Jeudi', project: 'Immeuble de Bureaux Horizon', hours: '6h-15h', location: 'Site C' },
        { day: 'Vendredi', project: 'Immeuble de Bureaux Horizon', hours: '6h-14h', location: 'Site C' }
      ],
      location: { lat: 48.8138, lng: 2.3668 }
    },
    {
      id: 4,
      employeeId: 'EMP004',
      name: 'Julien Moreau',
      email: 'julien.moreau@gestibuld.com',
      phone: '+33 1 56 78 90 12',
      role: 'Electrician',
      department: 'Electrical',
      status: 'on-leave',
      isOnline: false,
      currentProject: null,
      projectRole: null,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      address: '7 Boulevard Saint-Michel, 75005 Paris',
      emergencyContact: 'Claire Moreau',
      emergencyPhone: '+33 1 65 43 21 09',
      skills: [
        { name: 'Électricité générale', level: 'expert' },
        { name: 'Domotique', level: 'advanced' },
        { name: 'Tableaux électriques', level: 'expert' },
        { name: 'Éclairage LED', level: 'intermediate' }
      ],
      certifications: [
        { name: 'Habilitation Électrique B2V', issuer: 'APAVE', expiryDate: '2025-04-10' },
        { name: 'NF C 15-100', issuer: 'Promotelec', expiryDate: '2024-07-25' }
      ],
      contractType: 'CDI',
      salary: '3400',
      startDate: '2020-06-01',
      performance: {
        hoursThisMonth: 0,
        projectsCompleted: 15,
        attendanceRate: 92,
        rating: 4.3
      },
      weeklySchedule: [],
      location: null
    },
    {
      id: 5,
      employeeId: 'EMP005',
      name: 'Sophie Bernard',
      email: 'sophie.bernard@gestibuld.com',
      phone: '+33 1 67 89 01 23',
      role: 'Safety Inspector',
      department: 'Safety',
      status: 'active',
      isOnline: true,
      currentProject: 'Rénovation Hôtel Bellevue',
      projectRole: 'Responsable sécurité',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      address: '33 Rue de Rivoli, 75001 Paris',
      emergencyContact: 'Paul Bernard',
      emergencyPhone: '+33 1 54 32 10 98',
      skills: [
        { name: 'Audit sécurité', level: 'expert' },
        { name: 'Formation sécurité', level: 'expert' },
        { name: 'Réglementation HSE', level: 'expert' },
        { name: 'Gestion des risques', level: 'advanced' }
      ],
      certifications: [
        { name: 'IPRP Sécurité', issuer: 'INRS', expiryDate: '2025-12-31' },
        { name: 'Coordinateur SPS', issuer: 'OPPBTP', expiryDate: '2025-08-20' },
        { name: 'Formateur PRAP', issuer: 'INRS', expiryDate: '2024-10-15' }
      ],
      contractType: 'CDI',
      salary: '4000',
      startDate: '2018-11-15',
      performance: {
        hoursThisMonth: 160,
        projectsCompleted: 20,
        attendanceRate: 97,
        rating: 4.9
      },
      weeklySchedule: [
        { day: 'Lundi', project: 'Rénovation Hôtel Bellevue', hours: '8h-17h', location: 'Tous sites' },
        { day: 'Mardi', project: 'Rénovation Hôtel Bellevue', hours: '8h-17h', location: 'Tous sites' },
        { day: 'Mercredi', project: 'Formation sécurité', hours: '9h-16h', location: 'Bureau' },
        { day: 'Jeudi', project: 'Rénovation Hôtel Bellevue', hours: '8h-17h', location: 'Tous sites' },
        { day: 'Vendredi', project: 'Audit chantiers', hours: '8h-16h', location: 'Déplacements' }
      ],
      location: { lat: 48.8606, lng: 2.3376 }
    },
    {
      id: 6,
      employeeId: 'EMP006',
      name: 'Lucas Petit',
      email: 'lucas.petit@gestibuld.com',
      phone: '+33 1 78 90 12 34',
      role: 'Construction Worker',
      department: 'Construction',
      status: 'active',
      isOnline: false,
      currentProject: 'Résidence Les Jardins',
      projectRole: 'Ouvrier polyvalent',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
      address: '12 Rue des Lilas, 93200 Saint-Denis',
      emergencyContact: 'Emma Petit',
      emergencyPhone: '+33 1 43 21 09 87',
      skills: [
        { name: 'Maçonnerie', level: 'intermediate' },
        { name: 'Coffrage', level: 'advanced' },
        { name: 'Ferraillage', level: 'intermediate' },
        { name: 'Finitions', level: 'beginner' }
      ],
      certifications: [
        { name: 'SST Sauveteur Secouriste', issuer: 'Croix Rouge', expiryDate: '2024-09-10' },
        { name: 'Travail en Hauteur', issuer: 'OPPBTP', expiryDate: '2025-02-28' }
      ],
      contractType: 'CDD',
      salary: '2800',
      startDate: '2023-04-01',
      performance: {
        hoursThisMonth: 175,
        projectsCompleted: 3,
        attendanceRate: 94,
        rating: 4.1
      },
      weeklySchedule: [
        { day: 'Lundi', project: 'Résidence Les Jardins', hours: '7h-16h', location: 'Bâtiment A' },
        { day: 'Mardi', project: 'Résidence Les Jardins', hours: '7h-16h', location: 'Bâtiment A' },
        { day: 'Mercredi', project: 'Résidence Les Jardins', hours: '7h-16h', location: 'Bâtiment A' },
        { day: 'Jeudi', project: 'Résidence Les Jardins', hours: '7h-16h', location: 'Bâtiment A' },
        { day: 'Vendredi', project: 'Résidence Les Jardins', hours: '7h-15h', location: 'Bâtiment A' }
      ],
      location: null
    }
  ]);

  const [filteredEmployees, setFilteredEmployees] = useState(employees);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setShowDetailsPanel(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let filtered = [...employees];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.phone.includes(searchTerm) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(emp => emp.status === filters.status);
    }

    // Role filter
    if (filters.role) {
      filtered = filtered.filter(emp => emp.role === filters.role);
    }

    // Project filter
    if (filters.project) {
      filtered = filtered.filter(emp => emp.currentProject === filters.project);
    }

    // Certification filter
    if (filters.certification) {
      filtered = filtered.filter(emp => {
        if (filters.certification === 'expired') {
          return emp.certifications.some(cert => {
            const expiryDate = new Date(cert.expiryDate);
            const today = new Date();
            return expiryDate < today;
          });
        } else if (filters.certification === 'expiring') {
          return emp.certifications.some(cert => {
            const expiryDate = new Date(cert.expiryDate);
            const today = new Date();
            const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
          });
        } else if (filters.certification === 'valid') {
          return emp.certifications.every(cert => {
            const expiryDate = new Date(cert.expiryDate);
            const today = new Date();
            return expiryDate >= today;
          });
        }
        return true;
      });
    }

    // Skill filter
    if (filters.skill) {
      filtered = filtered.filter(emp =>
        emp.skills.some(skill => skill.name === filters.skill)
      );
    }

    // Online only filter
    if (filters.onlineOnly) {
      filtered = filtered.filter(emp => emp.isOnline);
    }

    // Available only filter
    if (filters.availableOnly) {
      filtered = filtered.filter(emp => emp.status === 'active' && !emp.currentProject);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredEmployees(filtered);
  }, [employees, searchTerm, filters, sortConfig]);

  const handleMenuToggle = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    if (isMobile) {
      setShowDetailsPanel(true);
    }
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      role: '',
      project: '',
      certification: '',
      skill: '',
      onlineOnly: false,
      availableOnly: false
    });
    setSearchTerm('');
  };

  const handleAddEmployee = (newEmployee) => {
    setEmployees(prev => [...prev, newEmployee]);
  };

  const customBreadcrumbs = [
    { label: 'Tableau de bord', path: '/dashboard', icon: 'Home' },
    { label: 'Équipe', path: '#', icon: 'Users' },
    { label: 'Gestion des employés', path: '/employee-management', icon: 'UserCheck', isLast: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={{ name: 'Pierre Dubois', role: 'Administrateur', avatar: null }}
        onMenuToggle={handleMenuToggle}
        isMenuCollapsed={isMenuCollapsed}
      />

      <MainNavigation
        userRole="admin"
        isCollapsed={isMenuCollapsed}
        onToggleCollapse={handleMenuToggle}
      />

      <main className={`
        pt-16 construction-transition
        ${isMobile ? 'pb-20' : isMenuCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      `}>
        <div className="p-4 lg:p-6">
          <BreadcrumbNavigation customBreadcrumbs={customBreadcrumbs} />

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Gestion des Employés</h1>
              <p className="text-muted-foreground mt-1">
                Gérez votre équipe, compétences et certifications
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  iconName="Table"
                />
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  iconName="Grid3X3"
                />
              </div>

              <Button
                onClick={() => setShowAddModal(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Ajouter Employé
              </Button>
            </div>
          </div>

          <EmployeeStats employees={employees} />

          <EmployeeFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className={`${showDetailsPanel && !isMobile ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
              {viewMode === 'table' ? (
                <EmployeeTable
                  employees={filteredEmployees}
                  selectedEmployee={selectedEmployee}
                  onEmployeeSelect={handleEmployeeSelect}
                  onSort={handleSort}
                  sortConfig={sortConfig}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredEmployees.map(employee => (
                    <EmployeeCard
                      key={employee.id}
                      employee={employee}
                      isSelected={selectedEmployee?.id === employee.id}
                      onClick={handleEmployeeSelect}
                    />
                  ))}
                </div>
              )}

              {filteredEmployees.length === 0 && (
                <div className="bg-card rounded-lg border border-border p-12 text-center">
                  <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Aucun employé trouvé</h3>
                  <p className="text-muted-foreground mb-4">
                    Aucun employé ne correspond aux critères de recherche actuels.
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Effacer les filtres
                  </Button>
                </div>
              )}
            </div>

            {showDetailsPanel && !isMobile && (
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <EmployeeDetailsPanel
                    employee={selectedEmployee}
                    onClose={() => setShowDetailsPanel(false)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Details Panel */}
      {showDetailsPanel && isMobile && (
        <div className="fixed inset-0 z-1100 bg-background">
          <EmployeeDetailsPanel
            employee={selectedEmployee}
            onClose={() => setShowDetailsPanel(false)}
          />
        </div>
      )}

      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeeManagement;