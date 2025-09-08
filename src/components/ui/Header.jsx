import React, { useState } from 'react';
import Icon from '../AppIcon';
import UserProfileDropdown from './UserProfileDropdown';
import NotificationCenter from './NotificationCenter';

const Header = ({ 
  user = { name: 'John Doe', role: 'Site Manager', avatar: null },
  onMenuToggle,
  isMenuCollapsed = false
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (onMenuToggle) {
      onMenuToggle();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-muted construction-hover-transition"
          >
            <Icon name="Menu" size={20} />
          </button>
          
          <button
            onClick={onMenuToggle}
            className="hidden lg:flex p-2 rounded-lg hover:bg-muted construction-hover-transition"
          >
            <Icon name={isMenuCollapsed ? 'Menu' : 'X'} size={18} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Building2" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-foreground">GESTIBULD</h1>
              <p className="text-xs text-muted-foreground">Construction Management</p>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          <NotificationCenter />
          <UserProfileDropdown user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;