import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ userRole = 'admin' }) => {
  const navigate = useNavigate();

  const getActionsForRole = () => {
    const commonActions = [
      {
        label: 'Nouveau Rapport',
        icon: 'FileText',
        variant: 'default',
        action: () => console.log('Create new report')
      },
      {
        label: 'Pointage Rapide',
        icon: 'Clock',
        variant: 'outline',
        action: () => navigate('/time-tracking')
      }
    ];

    const roleSpecificActions = {
      admin: [
        {
          label: 'Nouveau Projet',
          icon: 'Plus',
          variant: 'default',
          action: () => navigate('/project-management')
        },
        {
          label: 'Gérer Équipe',
          icon: 'Users',
          variant: 'outline',
          action: () => navigate('/employee-management')
        },
        {
          label: 'Inventaire',
          icon: 'Package',
          variant: 'outline',
          action: () => navigate('/equipment-inventory')
        }
      ],
      manager: [
        {
          label: 'Assigner Tâche',
          icon: 'UserPlus',
          variant: 'default',
          action: () => console.log('Assign task')
        },
        {
          label: 'Planifier Équipe',
          icon: 'Calendar',
          variant: 'outline',
          action: () => navigate('/time-tracking')
        }
      ],
      accountant: [
        {
          label: 'Nouvelle Facture',
          icon: 'Receipt',
          variant: 'default',
          action: () => console.log('Create invoice')
        },
        {
          label: 'Suivi Budget',
          icon: 'TrendingUp',
          variant: 'outline',
          action: () => console.log('Track budget')
        }
      ],
      employee: [
        {
          label: 'Pointer Arrivée',
          icon: 'LogIn',
          variant: 'success',
          action: () => console.log('Clock in')
        },
        {
          label: 'Voir Planning',
          icon: 'Calendar',
          variant: 'outline',
          action: () => navigate('/time-tracking')
        }
      ]
    };

    return [...(roleSpecificActions[userRole] || []), ...commonActions];
  };

  const actions = getActionsForRole();

  return (
    <div className="bg-card rounded-lg border border-border p-6 construction-shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Actions Rapides</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            iconName={action.icon}
            iconPosition="left"
            onClick={action.action}
            className="justify-start"
            fullWidth
          >
            {action.label}
          </Button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Dernière mise à jour: {new Date().toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
};

export default QuickActionsPanel;