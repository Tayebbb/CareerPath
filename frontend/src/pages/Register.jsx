/**
 * Register Page
 * New user registration with profile setup
 */

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, GraduationCap, Briefcase, Target, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    education: 'Undergraduate',
    experienceLevel: 'Student',
    careerTrack: 'Web Development',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser, signup, logout, signInWithGoogle } = useAuth();

  useEffect(() => {
    if (currentUser) navigate('/dashboard');
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password.length < 6) {
      return;
    }

    setLoading(true);
    try {
      await signup(formData.email, formData.password, formData.name);
      // Redirect to dashboard instead of home
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
    setLoading(false);
  };

  const educationOptions = ['High School', 'Undergraduate', 'Graduate', 'Postgraduate', 'Other'];
  const experienceLevels = ['Student', 'Fresher', 'Junior', 'Mid-level', 'Senior'];
  const careerTracks = [
    'Web Development',
    'Mobile Development',
    'Data Science',
    'UI/UX Design',
    'Digital Marketing',
    'Content Writing',
    'Graphic Design',
    'Business',
    'Other',
  ];

  // If user is already logged in, show logout option
  if (currentUser) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-4">Already Logged In</h2>
            <p className="text-gray-600 mb-6">
              You are already logged in as {currentUser.displayName || currentUser.email}
            </p>
            <div className="space-y-4">
              <Link to="/dashboard" className="w-full btn-primary block">
                Go to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl font-bold mb-2 text-gray-900">Start Your Journey</h2>
          <p className="text-gray-600">Create your CareerPath account and discover opportunities</p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field pl-11"
                    placeholder="John Doe"
                    aria-label="Full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field pl-11"
                    placeholder="you@example.com"
                    aria-label="Email address"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password * (min. 6 characters)
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-11"
                  placeholder="••••••••"
                  aria-label="Password"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Education */}
              <div>
                <label htmlFor="education" className="block text-sm font-medium mb-2">
                  <GraduationCap className="inline mr-1" size={16} />
                  Education
                </label>
                <select
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="input-field"
                  aria-label="Education level"
                >
                  {educationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Level */}
              <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium mb-2">
                  <Briefcase className="inline mr-1" size={16} />
                  Experience
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  className="input-field"
                  aria-label="Experience level"
                >
                  {experienceLevels.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Career Track */}
              <div>
                <label htmlFor="careerTrack" className="block text-sm font-medium mb-2">
                  <Target className="inline mr-1" size={16} />
                  Career Track
                </label>
                <select
                  id="careerTrack"
                  name="careerTrack"
                  value={formData.careerTrack}
                  onChange={handleChange}
                  className="input-field"
                  aria-label="Career track"
                >
                  {careerTracks.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Google Sign In */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-3 w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </button>
          </div>

          {/* Divider */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
