import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const AddEmployeeModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    skills: [],
    certifications: [],
    contractType: '',
    salary: '',
    startDate: '',
    avatar: null
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const roleOptions = [
    { value: 'Site Manager', label: 'Chef de chantier' },
    { value: 'Foreman', label: 'Contremaître' },
    { value: 'Equipment Operator', label: 'Opérateur d\'équipement' },
    { value: 'Construction Worker', label: 'Ouvrier du bâtiment' },
    { value: 'Safety Inspector', label: 'Inspecteur sécurité' },
    { value: 'Electrician', label: 'Électricien' },
    { value: 'Plumber', label: 'Plombier' },
    { value: 'Carpenter', label: 'Charpentier' }
  ];

  const departmentOptions = [
    { value: 'Construction', label: 'Construction' },
    { value: 'Electrical', label: 'Électricité' },
    { value: 'Plumbing', label: 'Plomberie' },
    { value: 'Safety', label: 'Sécurité' },
    { value: 'Equipment', label: 'Équipement' },
    { value: 'Management', label: 'Direction' }
  ];

  const contractOptions = [
    { value: 'CDI', label: 'CDI - Contrat à durée indéterminée' },
    { value: 'CDD', label: 'CDD - Contrat à durée déterminée' },
    { value: 'Interim', label: 'Intérim' },
    { value: 'Freelance', label: 'Freelance' }
  ];

  const skillOptions = [
    { value: 'Maçonnerie', label: 'Maçonnerie' },
    { value: 'Charpenterie', label: 'Charpenterie' },
    { value: 'Électricité', label: 'Électricité' },
    { value: 'Plomberie', label: 'Plomberie' },
    { value: 'Conduite d\'engins', label: 'Conduite d\'engins' },
    { value: 'Soudure', label: 'Soudure' },
    { value: 'Peinture', label: 'Peinture' },
    { value: 'Carrelage', label: 'Carrelage' },
    { value: 'Couverture', label: 'Couverture' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
      if (!formData.email.trim()) newErrors.email = 'L\'email est requis';
      if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
      if (!formData.role) newErrors.role = 'Le rôle est requis';
      if (!formData.department) newErrors.department = 'Le département est requis';
    } else if (step === 2) {
      if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Le contact d\'urgence est requis';
      if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Le téléphone d\'urgence est requis';
    } else if (step === 3) {
      if (!formData.contractType) newErrors.contractType = 'Le type de contrat est requis';
      if (!formData.salary) newErrors.salary = 'Le salaire est requis';
      if (!formData.startDate) newErrors.startDate = 'La date de début est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      const newEmployee = {
        id: Date.now(),
        employeeId: `EMP${String(Date.now()).slice(-4)}`,
        ...formData,
        status: 'active',
        isOnline: false,
        currentProject: null,
        projectRole: null,
        avatar: formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        performance: {
          hoursThisMonth: 0,
          projectsCompleted: 0,
          attendanceRate: 100,
          rating: 4.0
        },
        weeklySchedule: [],
        location: null
      };

      onSave(newEmployee);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: '',
        skills: [],
        certifications: [],
        contractType: '',
        salary: '',
        startDate: '',
        avatar: null
      });
      setCurrentStep(1);
      setErrors({});
    }
  };

  const steps = [
    { number: 1, title: 'Informations personnelles', icon: 'User' },
    { number: 2, title: 'Contact et adresse', icon: 'MapPin' },
    { number: 3, title: 'Compétences', icon: 'Award' },
    { number: 4, title: 'Contrat et salaire', icon: 'FileText' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1200 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Ajouter un employé</h2>
          <Button variant="ghost" size="icon" onClick={onClose} iconName="X" />
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2 construction-transition
                  ${currentStep >= step.number 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'border-border text-muted-foreground'
                  }
                `}>
                  {currentStep > step.number ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    w-12 h-0.5 mx-2 construction-transition
                    ${currentStep > step.number ? 'bg-primary' : 'bg-border'}
                  `}></div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium text-foreground">{steps[currentStep - 1].title}</p>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-96">
          {currentStep === 1 && (
            <div className="space-y-4">
              <Input
                label="Nom complet"
                type="text"
                placeholder="Entrez le nom complet"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={errors.name}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="email@exemple.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  error={errors.email}
                  required
                />

                <Input
                  label="Téléphone"
                  type="tel"
                  placeholder="+33 1 23 45 67 89"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Rôle"
                  placeholder="Sélectionnez un rôle"
                  options={roleOptions}
                  value={formData.role}
                  onChange={(value) => handleInputChange('role', value)}
                  error={errors.role}
                  required
                />

                <Select
                  label="Département"
                  placeholder="Sélectionnez un département"
                  options={departmentOptions}
                  value={formData.department}
                  onChange={(value) => handleInputChange('department', value)}
                  error={errors.department}
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <Input
                label="Adresse"
                type="text"
                placeholder="Adresse complète"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                error={errors.address}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Contact d'urgence"
                  type="text"
                  placeholder="Nom du contact d'urgence"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  error={errors.emergencyContact}
                  required
                />

                <Input
                  label="Téléphone d'urgence"
                  type="tel"
                  placeholder="+33 1 23 45 67 89"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  error={errors.emergencyPhone}
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <Select
                label="Compétences"
                placeholder="Sélectionnez les compétences"
                options={skillOptions}
                value={formData.skills}
                onChange={(value) => handleInputChange('skills', value)}
                multiple
                searchable
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Certifications (optionnel)
                </label>
                <p className="text-sm text-muted-foreground">
                  Les certifications peuvent être ajoutées après la création du profil.
                </p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <Select
                label="Type de contrat"
                placeholder="Sélectionnez le type de contrat"
                options={contractOptions}
                value={formData.contractType}
                onChange={(value) => handleInputChange('contractType', value)}
                error={errors.contractType}
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Salaire mensuel (€)"
                  type="number"
                  placeholder="3000"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  error={errors.salary}
                  required
                />

                <Input
                  label="Date de début"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  error={errors.startDate}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Étape {currentStep} sur {steps.length}
          </div>
          
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious}>
                Précédent
              </Button>
            )}
            
            {currentStep < steps.length ? (
              <Button onClick={handleNext}>
                Suivant
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Créer l'employé
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;