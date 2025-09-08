import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const BudgetOverviewChart = ({ userRole = 'admin' }) => {
  const budgetData = [
    { name: 'Jan', planned: 45000, actual: 42000 },
    { name: 'Fév', planned: 52000, actual: 48000 },
    { name: 'Mar', planned: 48000, actual: 51000 },
    { name: 'Avr', planned: 61000, actual: 58000 },
    { name: 'Mai', planned: 55000, actual: 62000 },
    { name: 'Jun', planned: 67000, actual: 65000 }
  ];

  const expenseCategories = [
    { name: 'Main d\'œuvre', value: 45, color: '#2563EB' },
    { name: 'Matériaux', value: 30, color: '#F97316' },
    { name: 'Équipements', value: 15, color: '#059669' },
    { name: 'Autres', value: 10, color: '#DC2626' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 construction-shadow-modal">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'planned' ? 'Planifié' : 'Réel'}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (userRole === 'employee') {
    return (
      <div className="bg-card rounded-lg border border-border p-6 construction-shadow-card">
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <Icon name="Lock" size={32} className="mx-auto mb-2 text-muted-foreground" />
            <p className="text-muted-foreground">Accès restreint aux données budgétaires</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 construction-shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Aperçu Budgétaire</h3>
        <div className="flex items-center gap-2">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-sm text-success font-medium">+5.2%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget vs Actual Chart */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Budget vs Réalisé (6 mois)</h4>
          <div className="w-full h-64" aria-label="Budget vs Actual Bar Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={budgetData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  tickFormatter={(value) => `${value/1000}k€`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="planned" fill="var(--color-primary)" name="Planifié" radius={[2, 2, 0, 0]} />
                <Bar dataKey="actual" fill="var(--color-accent)" name="Réel" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Categories */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Répartition des Dépenses</h4>
          <div className="w-full h-64" aria-label="Expense Categories Pie Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Pourcentage']}
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {expenseCategories.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-xs text-muted-foreground">{category.name}</span>
                <span className="text-xs font-medium text-foreground">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-muted-foreground">Budget Total</p>
            <p className="text-lg font-semibold text-foreground">{formatCurrency(328000)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Dépensé</p>
            <p className="text-lg font-semibold text-foreground">{formatCurrency(286000)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Restant</p>
            <p className="text-lg font-semibold text-success">{formatCurrency(42000)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverviewChart;