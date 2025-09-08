import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = ({ customBreadcrumbs = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/project-management': { label: 'Project Management', icon: 'Building2' },
    '/equipment-inventory': { label: 'Equipment Inventory', icon: 'Wrench' },
    '/employee-management': { label: 'Employee Management', icon: 'UserCheck' },
    '/time-tracking': { label: 'Time Tracking', icon: 'Clock' }
  };

  const generateBreadcrumbs = () => {
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ label: 'Home', path: '/dashboard', icon: 'Home' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap[currentPath];
      
      if (routeInfo) {
        breadcrumbs.push({
          label: routeInfo.label,
          path: currentPath,
          icon: routeInfo.icon,
          isLast: index === pathSegments.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleNavigation = (path) => {
    if (path && path !== location.pathname) {
      navigate(path);
    }
  };

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="mx-2" />
          )}
          
          <button
            onClick={() => handleNavigation(crumb.path)}
            className={`
              flex items-center gap-1.5 px-2 py-1 rounded-md construction-hover-transition
              ${crumb.isLast 
                ? 'text-foreground font-medium cursor-default' 
                : 'hover:text-foreground hover:bg-muted cursor-pointer'
              }
            `}
            disabled={crumb.isLast}
          >
            {crumb.icon && (
              <Icon 
                name={crumb.icon} 
                size={14} 
                className={crumb.isLast ? 'text-primary' : ''} 
              />
            )}
            <span className="hidden sm:inline">{crumb.label}</span>
            <span className="sm:hidden">{crumb.label.split(' ')[0]}</span>
          </button>
        </div>
      ))}
    </nav>
  );
};

export default BreadcrumbNavigation;