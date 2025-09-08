import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user roles
  const mockCredentials = {
    admin: { email: 'admin@gestibuld.com', password: 'Admin123!', role: 'admin' },
    manager: { email: 'manager@gestibuld.com', password: 'Manager123!', role: 'manager' },
    accountant: { email: 'comptable@gestibuld.com', password: 'Comptable123!', role: 'accountant' },
    employee: { email: 'employe@gestibuld.com', password: 'Employe123!', role: 'employee' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check credentials
    const user = Object.values(mockCredentials).find(
      cred => cred.email === formData.email && cred.password === formData.password
    );
    
    if (user) {
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        email: user.email,
        role: user.role,
        name: user.role === 'admin' ? 'Jean Dupont' : 
              user.role === 'manager' ? 'Marie Martin' :
              user.role === 'accountant' ? 'Pierre Durand' : 'Sophie Moreau',
        rememberMe: formData.rememberMe
      }));
      
      // Redirect based on role
      switch (user.role) {
        case 'admin': case'manager': navigate('/dashboard');
          break;
        case 'accountant': navigate('/dashboard');
          break;
        case 'employee': navigate('/time-tracking');
          break;
        default:
          navigate('/dashboard');
      }
    } else {
      setErrors({
        general: `Identifiants incorrects. Utilisez les identifiants de test :\nAdmin: admin@gestibuld.com / Admin123!\nManager: manager@gestibuld.com / Manager123!\nComptable: comptable@gestibuld.com / Comptable123!\nEmployé: employe@gestibuld.com / Employe123!`
      });
    }
    
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    alert('Fonctionnalité de récupération de mot de passe - À implémenter');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-error mb-1">Erreur de connexion</p>
                <pre className="text-xs text-error/80 whitespace-pre-wrap font-mono">
                  {errors.general}
                </pre>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Adresse email"
            type="email"
            name="email"
            placeholder="votre.email@gestibuld.com"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            required
            className="w-full"
          />

          <Input
            label="Mot de passe"
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            required
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <Checkbox
            label="Se souvenir de moi"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />

          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 construction-hover-transition"
          >
            Mot de passe oublié ?
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;