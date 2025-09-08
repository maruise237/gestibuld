import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginBackground from './components/LoginBackground';
import ComplianceFooter from './components/ComplianceFooter';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      // Redirect based on role
      switch (userData.role) {
        case 'admin': case'manager': navigate('/dashboard');
          break;
        case 'accountant': navigate('/dashboard');
          break;
        case 'employee': navigate('/time-tracking');
          break;
        default:
          navigate('/dashboard');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Login Form */}
      <div className="flex-1 lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md mx-auto">
          <LoginHeader />
          <div className="bg-card border border-border rounded-2xl p-8 construction-shadow-modal">
            <LoginForm />
          </div>
          <ComplianceFooter />
        </div>
      </div>

      {/* Right side - Background Image */}
      <LoginBackground />
    </div>
  );
};

export default LoginPage;