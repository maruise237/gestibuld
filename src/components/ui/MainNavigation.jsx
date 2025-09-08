import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const MainNavigation = ({ userRole = 'admin', isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      roles: ['admin', 'manager', 'accountant', 'employee']
    },
    {
      label: 'Projects',
      path: '/project-management',
      icon: 'Building2',
      roles: ['admin', 'manager']
    },
    {
      label: 'Team',
      icon: 'Users',
      roles: ['admin', 'manager'],
      children: [
        {
          label: 'Employee Management',
          path: '/employee-management',
          icon: 'UserCheck',
          roles: ['admin', 'manager']
        },
        {
          label: 'Time Tracking',
          path: '/time-tracking',
          icon: 'Clock',
          roles: ['admin', 'manager', 'employee']
        }
      ]
    },
    {
      label: 'Equipment',
      path: '/equipment-inventory',
      icon: 'Wrench',
      roles: ['admin', 'manager']
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const hasAccess = (roles) => {
    return roles.includes(userRole);
  };

  const renderNavItem = (item, isChild = false) => {
    if (!hasAccess(item.roles)) return null;

    const isActive = item.path ? isActiveRoute(item.path) : false;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.label} className={isChild ? 'ml-4' : ''}>
        <button
          onClick={() => handleNavigation(item.path)}
          className={`
            w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left construction-hover-transition
            ${isActive 
              ? 'bg-primary text-primary-foreground shadow-sm' 
              : 'text-foreground hover:bg-muted hover:text-foreground'
            }
            ${isCollapsed && !isMobile ? 'justify-center px-2' : ''}
            ${isMobile ? 'justify-center flex-col gap-1 py-3' : ''}
          `}
          disabled={!item.path}
        >
          <Icon 
            name={item.icon} 
            size={isMobile ? 20 : 18} 
            className="flex-shrink-0"
          />
          {(!isCollapsed || isMobile) && (
            <span className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>
              {item.label}
            </span>
          )}
        </button>
        
        {hasChildren && !isCollapsed && !isMobile && (
          <div className="mt-1 space-y-1">
            {item.children.map(child => renderNavItem(child, true))}
          </div>
        )}
      </div>
    );
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-900 bg-card border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {navigationItems.map(item => {
            if (item.children) {
              return item.children.map(child => renderNavItem(child));
            }
            return renderNavItem(item);
          })}
        </div>
      </nav>
    );
  }

  return (
    <aside className={`
      fixed left-0 top-16 bottom-0 z-900 bg-card border-r border-border construction-transition
      ${isCollapsed ? 'w-16' : 'w-60'}
    `}>
      <div className="flex flex-col h-full">
        <div className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {navigationItems.map(item => renderNavItem(item))}
        </div>
        
        <div className="p-3 border-t border-border">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-muted construction-hover-transition"
          >
            <Icon 
              name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} 
              size={18} 
            />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default MainNavigation;