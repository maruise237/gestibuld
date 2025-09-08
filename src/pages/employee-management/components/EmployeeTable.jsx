import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const EmployeeTable = ({ employees, selectedEmployee, onEmployeeSelect, onSort, sortConfig }) => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedEmployees(employees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectEmployee = (employeeId, checked) => {
    if (checked) {
      setSelectedEmployees(prev => [...prev, employeeId]);
    } else {
      setSelectedEmployees(prev => prev.filter(id => id !== employeeId));
    }
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success/10 text-success border-success/20';
      case 'on-leave':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'inactive':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getCertificationStatus = (certifications) => {
    const expiringSoon = certifications.filter(cert => {
      const expiryDate = new Date(cert.expiryDate);
      const today = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    }).length;

    const expired = certifications.filter(cert => {
      const expiryDate = new Date(cert.expiryDate);
      const today = new Date();
      return expiryDate < today;
    }).length;

    if (expired > 0) return { icon: 'AlertCircle', color: 'text-error', tooltip: `${expired} expirées` };
    if (expiringSoon > 0) return { icon: 'AlertTriangle', color: 'text-warning', tooltip: `${expiringSoon} expirent bientôt` };
    return { icon: 'CheckCircle', color: 'text-success', tooltip: 'Toutes valides' };
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedEmployees.length === employees.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('name')}
                  className="flex items-center gap-2 font-semibold text-foreground hover:text-primary construction-hover-transition"
                >
                  Employé
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('role')}
                  className="flex items-center gap-2 font-semibold text-foreground hover:text-primary construction-hover-transition"
                >
                  Rôle
                  <Icon name={getSortIcon('role')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('currentProject')}
                  className="flex items-center gap-2 font-semibold text-foreground hover:text-primary construction-hover-transition"
                >
                  Projet actuel
                  <Icon name={getSortIcon('currentProject')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => onSort('status')}
                  className="flex items-center gap-2 font-semibold text-foreground hover:text-primary construction-hover-transition"
                >
                  Statut
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="text-left p-4">Certifications</th>
              <th className="text-left p-4">Contact</th>
              <th className="text-center p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              const certStatus = getCertificationStatus(employee.certifications);
              const isSelected = selectedEmployee?.id === employee.id;
              
              return (
                <tr
                  key={employee.id}
                  onClick={() => onEmployeeSelect(employee)}
                  className={`
                    border-b border-border construction-hover-transition cursor-pointer
                    ${isSelected ? 'bg-primary/5' : 'hover:bg-muted/50'}
                  `}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.includes(employee.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectEmployee(employee.id, e.target.checked);
                      }}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                          employee.isOnline ? 'bg-success' : 'bg-muted'
                        }`}></div>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{employee.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {employee.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-foreground">{employee.role}</div>
                    <div className="text-sm text-muted-foreground">{employee.department}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-foreground">{employee.currentProject || 'Non assigné'}</div>
                    {employee.projectRole && (
                      <div className="text-sm text-muted-foreground">{employee.projectRole}</div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(employee.status)}`}>
                      {employee.status === 'active' ? 'Actif' : 
                       employee.status === 'on-leave' ? 'En congé' : 'Inactif'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={certStatus.icon} 
                        size={16} 
                        className={certStatus.color}
                        title={certStatus.tooltip}
                      />
                      <span className="text-sm text-muted-foreground">
                        {employee.certifications.length} cert.
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      <div className="text-foreground">{employee.phone}</div>
                      <div className="text-muted-foreground truncate max-w-32">{employee.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="Edit"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Edit employee:', employee.id);
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="MessageSquare"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Message employee:', employee.id);
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="MoreVertical"
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('More actions:', employee.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedEmployees.length > 0 && (
        <div className="p-4 bg-primary/5 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedEmployees.length} employé(s) sélectionné(s)
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" iconName="Calendar">
                Planifier
              </Button>
              <Button variant="outline" size="sm" iconName="Mail">
                Envoyer message
              </Button>
              <Button variant="outline" size="sm" iconName="Download">
                Exporter
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;