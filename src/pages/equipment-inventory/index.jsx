import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MainNavigation from '../../components/ui/MainNavigation';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

import EquipmentCard from './components/EquipmentCard';
import EquipmentFilters from './components/EquipmentFilters';
import EquipmentDetailModal from './components/EquipmentDetailModal';
import ReservationModal from './components/ReservationModal';
import AddEquipmentModal from './components/AddEquipmentModal';

const EquipmentInventory = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    location: '',
    maintenance: ''
  });

  const [equipment, setEquipment] = useState([
    {
      id: 1,
      name: "Excavatrice CAT 320GC",
      category: "excavation",
      model: "CAT 320GC",
      serialNumber: "CAT320GC2024001",
      year: 2023,
      status: "available",
      location: "depot-central",
      currentProject: null,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400",
      nextMaintenance: "2024-07-25",
      totalHours: 1247,
      specifications: {
        weight: "20000 kg",
        power: "110 kW",
        capacity: "1.2 m³",
        fuel: "diesel"
      },
      purchaseDate: "2023-03-15",
      purchasePrice: "150000"
    },
    {
      id: 2,
      name: "Grue mobile Liebherr LTM 1030",
      category: "lifting",
      model: "LTM 1030-2.1",
      serialNumber: "LTM1030001",
      year: 2022,
      status: "in-use",
      location: "chantier-a",
      currentProject: "Chantier A - Résidentiel",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
      nextMaintenance: "2024-08-10",
      totalHours: 2156,
      specifications: {
        weight: "35000 kg",
        power: "240 kW",
        capacity: "30 tonnes",
        fuel: "diesel"
      },
      purchaseDate: "2022-06-20",
      purchasePrice: "280000"
    },
    {
      id: 3,
      name: "Camion benne Volvo FMX",
      category: "transport",
      model: "FMX 450",
      serialNumber: "VOLVOFMX001",
      year: 2024,
      status: "maintenance",
      location: "depot-central",
      currentProject: null,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      nextMaintenance: "2024-07-22",
      totalHours: 856,
      specifications: {
        weight: "18000 kg",
        power: "330 kW",
        capacity: "20 m³",
        fuel: "diesel"
      },
      purchaseDate: "2024-01-10",
      purchasePrice: "95000"
    },
    {
      id: 4,
      name: "Bétonnière Schwing Stetter",
      category: "concrete",
      model: "C3 Basic Line",
      serialNumber: "SCHWING001",
      year: 2023,
      status: "available",
      location: "chantier-b",
      currentProject: null,
      image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400",
      nextMaintenance: "2024-08-15",
      totalHours: 634,
      specifications: {
        weight: "12000 kg",
        power: "180 kW",
        capacity: "8 m³",
        fuel: "diesel"
      },
      purchaseDate: "2023-05-12",
      purchasePrice: "75000"
    },
    {
      id: 5,
      name: "Compacteur Bomag BW 213",
      category: "tools",
      model: "BW 213 D-5",
      serialNumber: "BOMAG001",
      year: 2022,
      status: "available",
      location: "chantier-c",
      currentProject: null,
      image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400",
      nextMaintenance: "2024-09-01",
      totalHours: 1523,
      specifications: {
        weight: "13500 kg",
        power: "129 kW",
        capacity: "2.13 m",
        fuel: "diesel"
      },
      purchaseDate: "2022-08-30",
      purchasePrice: "85000"
    },
    {
      id: 6,
      name: "Échafaudage mobile Layher",
      category: "safety",
      model: "Allround Scaffolding",
      serialNumber: "LAYHER001",
      year: 2023,
      status: "in-use",
      location: "chantier-a",
      currentProject: "Chantier A - Résidentiel",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      nextMaintenance: "2024-07-30",
      totalHours: 0,
      specifications: {
        weight: "2500 kg",
        power: "Manuel",
        capacity: "15 m hauteur",
        fuel: "manuel"
      },
      purchaseDate: "2023-04-18",
      purchasePrice: "12000"
    }
  ]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsFiltersVisible(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const user = {
    name: 'Pierre Dubois',
    role: 'Gestionnaire d\'équipement',
    email: 'pierre.dubois@gestibuld.com',
    avatar: null
  };

  // Filter equipment based on current filters
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = !filters.search || 
      item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.model.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesStatus = !filters.status || item.status === filters.status;
    const matchesLocation = !filters.location || item.location === filters.location;
    
    const matchesMaintenance = !filters.maintenance || (() => {
      const maintenanceDate = new Date(item.nextMaintenance);
      const today = new Date();
      const diffDays = Math.ceil((maintenanceDate - today) / (1000 * 60 * 60 * 24));
      
      switch (filters.maintenance) {
        case 'due-soon':
          return diffDays <= 7 && diffDays >= 0;
        case 'overdue':
          return diffDays < 0;
        case 'up-to-date':
          return diffDays > 7;
        default:
          return true;
      }
    })();

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation && matchesMaintenance;
  });

  // Calculate equipment statistics
  const equipmentStats = {
    total: equipment.length,
    available: equipment.filter(e => e.status === 'available').length,
    inUse: equipment.filter(e => e.status === 'in-use').length,
    maintenance: equipment.filter(e => e.status === 'maintenance').length
  };

  const handleToggleNavigation = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      location: '',
      maintenance: ''
    });
  };

  const handleViewDetails = (equipmentItem) => {
    setSelectedEquipment(equipmentItem);
    setIsDetailModalOpen(true);
  };

  const handleReserve = (equipmentItem) => {
    setSelectedEquipment(equipmentItem);
    setIsReservationModalOpen(true);
  };

  const handleUpdateStatus = (equipmentId, newStatus) => {
    setEquipment(prev => prev.map(item => 
      item.id === equipmentId 
        ? { ...item, status: newStatus, currentProject: newStatus === 'available' ? null : item.currentProject }
        : item
    ));
  };

  const handleUpdateEquipment = (updatedEquipment) => {
    setEquipment(prev => prev.map(item => 
      item.id === updatedEquipment.id ? updatedEquipment : item
    ));
    setIsDetailModalOpen(false);
  };

  const handleAddEquipment = (newEquipment) => {
    setEquipment(prev => [...prev, newEquipment]);
  };

  const handleReservationConfirm = (reservationData) => {
    // Update equipment status to in-use
    setEquipment(prev => prev.map(item => 
      item.id === reservationData.equipmentId 
        ? { 
            ...item, 
            status: 'in-use',
            currentProject: reservationData.project 
          }
        : item
    ));
    
    console.log('Reservation confirmed:', reservationData);
  };

  const handleExport = () => {
    const csvContent = [
      ['Nom', 'Catégorie', 'Modèle', 'Statut', 'Localisation', 'Prochaine maintenance'].join(','),
      ...filteredEquipment.map(item => [
        item.name,
        item.category,
        item.model,
        item.status,
        item.location,
        item.nextMaintenance
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `equipement-inventaire-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
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

      <main className={`pt-16 construction-transition ${
        isMobile ? 'pb-20' : isNavCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="p-4 lg:p-6 space-y-6">
          <BreadcrumbNavigation />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Inventaire des équipements</h1>
              <p className="text-muted-foreground">
                Gérez et suivez tous vos équipements de construction
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                iconName="Download"
                iconPosition="left"
              >
                Exporter
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={() => setIsAddModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Ajouter équipement
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{equipmentStats.total}</p>
                  <p className="text-sm text-muted-foreground">Total équipements</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{equipmentStats.available}</p>
                  <p className="text-sm text-muted-foreground">Disponibles</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{equipmentStats.inUse}</p>
                  <p className="text-sm text-muted-foreground">En cours</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 construction-shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={20} className="text-error" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{equipmentStats.maintenance}</p>
                  <p className="text-sm text-muted-foreground">Maintenance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Rechercher un équipement..."
                value={filters.search}
                onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={isFiltersVisible ? 'default' : 'outline'}
                size="sm"
                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                iconName="Filter"
                iconPosition="left"
              >
                Filtres
              </Button>
              
              <div className="hidden lg:flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-l-lg construction-hover-transition ${
                    viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Icon name="Grid3X3" size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-r-lg construction-hover-transition ${
                    viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <Icon name="List" size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            {isFiltersVisible && (
              <div className="xl:col-span-1">
                <EquipmentFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                  equipmentStats={equipmentStats}
                />
              </div>
            )}

            {/* Equipment Grid */}
            <div className={isFiltersVisible ? 'xl:col-span-3' : 'xl:col-span-4'}>
              {filteredEquipment.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <Icon name="Package" size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Aucun équipement trouvé</h3>
                  <p className="text-muted-foreground mb-4">
                    Aucun équipement ne correspond à vos critères de recherche.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearFilters}
                    iconName="X"
                    iconPosition="left"
                  >
                    Effacer les filtres
                  </Button>
                </div>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
                }`}>
                  {filteredEquipment.map((equipmentItem) => (
                    <EquipmentCard
                      key={equipmentItem.id}
                      equipment={equipmentItem}
                      onReserve={handleReserve}
                      onViewDetails={handleViewDetails}
                      onUpdateStatus={handleUpdateStatus}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <EquipmentDetailModal
        equipment={selectedEquipment}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onUpdate={handleUpdateEquipment}
      />

      <ReservationModal
        equipment={selectedEquipment}
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        onReserve={handleReservationConfirm}
      />

      <AddEquipmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEquipment}
      />
    </div>
  );
};

export default EquipmentInventory;