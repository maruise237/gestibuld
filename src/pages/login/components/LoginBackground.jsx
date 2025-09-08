import React from 'react';
import Image from '../../../components/AppImage';

const LoginBackground = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Construction site with modern building"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-accent/80"></div>
      </div>
      
      <div className="relative z-10 flex flex-col justify-center p-12 text-white">
        <div className="max-w-md">
          <h2 className="text-4xl font-bold mb-6">
            Digitalisez votre gestion BTP
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Gérez vos projets de construction, équipements et équipes en temps réel avec notre plateforme complète.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">✓</span>
              </div>
              <span className="text-white/90">Suivi de projets en temps réel</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">✓</span>
              </div>
              <span className="text-white/90">Gestion d'équipements et inventaire</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold">✓</span>
              </div>
              <span className="text-white/90">Pointage GPS et planning équipes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBackground;