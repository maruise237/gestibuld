import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg">
          <Icon name="Building2" size={32} color="white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">GESTIBULD</h1>
        <p className="text-sm text-muted-foreground font-medium">
          Gestion de Construction BTP
        </p>
        <p className="text-xs text-muted-foreground">
          Plateforme de gestion de projets de construction
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;