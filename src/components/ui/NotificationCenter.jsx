import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Budget Alert',
      message: 'Project Alpha is 15% over budget',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Equipment Delivered',
      message: 'Excavator #EX-001 delivered to Site B',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'error',
      title: 'Maintenance Required',
      message: 'Crane #CR-003 requires immediate inspection',
      time: '2 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'info',
      title: 'Schedule Update',
      message: 'Team meeting moved to 3:00 PM',
      time: '3 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'warning',
      title: 'Weather Alert',
      message: 'Heavy rain expected tomorrow',
      time: '4 hours ago',
      read: true
    }
  ]);

  const dropdownRef = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

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

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'warning':
        return { name: 'AlertTriangle', color: 'text-warning' };
      case 'error':
        return { name: 'AlertCircle', color: 'text-error' };
      default:
        return { name: 'Info', color: 'text-primary' };
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="relative p-2 rounded-lg hover:bg-muted construction-hover-transition"
      >
        <Icon name="Bell" size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs font-medium rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-popover border border-border rounded-lg construction-shadow-modal z-1100">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-popover-foreground">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-primary hover:text-primary/80 construction-hover-transition"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size={32} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="p-2">
                {notifications.map((notification) => {
                  const iconConfig = getNotificationIcon(notification.type);
                  return (
                    <button
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`
                        w-full p-3 rounded-lg text-left construction-hover-transition mb-1
                        ${notification.read 
                          ? 'hover:bg-muted' :'bg-primary/5 hover:bg-primary/10 border border-primary/20'
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <Icon 
                          name={iconConfig.name} 
                          size={16} 
                          className={`mt-0.5 ${iconConfig.color}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className={`text-sm font-medium ${notification.read ? 'text-muted-foreground' : 'text-popover-foreground'}`}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border">
            <button className="w-full text-sm text-primary hover:text-primary/80 construction-hover-transition">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;