import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({
    location: "Paris, France",
    temperature: 18,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: "Aujourd\'hui", temp: 18, condition: "Nuageux", icon: "Cloud" },
      { day: "Demain", temp: 22, condition: "Ensoleillé", icon: "Sun" },
      { day: "Mercredi", temp: 15, condition: "Pluvieux", icon: "CloudRain" },
      { day: "Jeudi", temp: 20, condition: "Partiellement nuageux", icon: "CloudSun" }
    ]
  });

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'ensoleillé':
        return 'Sun';
      case 'nuageux': case'partly cloudy':
        return 'Cloud';
      case 'pluvieux':
        return 'CloudRain';
      case 'partiellement nuageux':
        return 'CloudSun';
      default:
        return 'Cloud';
    }
  };

  const getImpactColor = (temp) => {
    if (temp < 5) return 'text-error';
    if (temp > 30) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 construction-shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Météo du Chantier</h3>
        <Icon name="CloudSun" size={20} className="text-primary" />
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <Icon name={getWeatherIcon(weatherData.condition)} size={32} className="text-primary" />
          <div>
            <p className="text-2xl font-bold text-foreground">{weatherData.temperature}°C</p>
            <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{weatherData.location}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Droplets" size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">Humidité: {weatherData.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Wind" size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">Vent: {weatherData.windSpeed} km/h</span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Prévisions 4 jours</h4>
        {weatherData.forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Icon name={day.icon} size={16} className="text-primary" />
              <span className="text-sm text-foreground">{day.day}</span>
            </div>
            <div className="text-right">
              <span className={`text-sm font-medium ${getImpactColor(day.temp)}`}>
                {day.temp}°C
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
        <div className="flex items-center gap-2 mb-1">
          <Icon name="AlertTriangle" size={16} className="text-warning" />
          <span className="text-sm font-medium text-warning">Impact Planification</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Pluie prévue mercredi - Prévoir protection équipements extérieurs
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;