import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={14} />
            <span>Conforme RGPD</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Lock" size={14} />
            <span>Données sécurisées</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Award" size={14} />
            <span>Certifié BTP</span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p>© {currentYear} GESTIBULD. Tous droits réservés.</p>
          <p className="mt-1">
            Plateforme de gestion BTP conforme aux réglementations françaises
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-xs">
          <button className="text-muted-foreground hover:text-foreground construction-hover-transition">
            Conditions d'utilisation
          </button>
          <span className="text-border">•</span>
          <button className="text-muted-foreground hover:text-foreground construction-hover-transition">
            Politique de confidentialité
          </button>
          <span className="text-border">•</span>
          <button className="text-muted-foreground hover:text-foreground construction-hover-transition">
            Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceFooter;