import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const UserProfileDropdown = ({ 
  user = { 
    name: 'John Doe', 
    role: 'Site Manager', 
    email: 'john.doe@gestibuld.com',
    avatar: null 
  } 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'Profile Settings',
      icon: 'User',
      action: () => {
        console.log('Navigate to profile settings');
        setIsOpen(false);
      }
    },
    {
      label: 'Account Settings',
      icon: 'Settings',
      action: () => {
        console.log('Navigate to account settings');
        setIsOpen(false);
      }
    },
    {
      label: 'Help & Support',
      icon: 'HelpCircle',
      action: () => {
        console.log('Navigate to help');
        setIsOpen(false);
      }
    },
    {
      label: 'Sign Out',
      icon: 'LogOut',
      action: () => {
        navigate('/login');
        setIsOpen(false);
      },
      variant: 'destructive'
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted construction-hover-transition"
      >
        <div className="flex items-center gap-2">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              {getUserInitials(user.name)}
            </div>
          )}
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`hidden md:block construction-transition ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-popover border border-border rounded-lg construction-shadow-modal z-1100">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {getUserInitials(user.name)}
                </div>
              )}
              <div>
                <p className="font-medium text-popover-foreground">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.role}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </div>
          
          <div className="p-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-md text-left construction-hover-transition
                  ${item.variant === 'destructive' ?'text-destructive hover:bg-destructive/10' :'text-popover-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={item.icon} size={16} />
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;