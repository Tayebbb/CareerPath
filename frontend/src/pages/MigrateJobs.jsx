/**
 * Job Migration Admin Page
 * Run this page once to migrate all jobs to the new format
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, CheckCircle, AlertCircle, RefreshCw, ArrowLeft } from 'lucide-react';
import { migrateJobs } from '../utils/migrateJobs';
import { useNavigate } from 'react-router-dom';

const MigrateJobs = () => {
  const [migrating, setMigrating] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleMigrate = async () => {
    setMigrating(true);
    setResult(null);
    
    try {
      const migrationResult = await migrateJobs();
      setResult(migrationResult);
    } catch (error) {
      setResult({
        success: false,
        message: error.message
      });
    } finally {
      setMigrating(false);
    }
  };

  return (
    <div className="min-h-screen bg-base">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-8 flex items-center gap-2 text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 rounded-2xl bg-gradient-to-r from-[#A855F7] to-[#D500F9] mb-4">
            <Database size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold glow-text mb-4">Job Database Migration</h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            This tool will update all existing jobs in Firebase with the new required fields:
            <strong className="text-primary"> skillsRequired</strong>,
            <strong className="text-primary"> experienceRequired</strong>, and
            <strong className="text-primary"> track</strong>
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="neon-card p-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <RefreshCw className="text-primary" size={24} />
            Migration Process
          </h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <CheckCircle className="text-blue-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-semibold text-blue-400 mb-1">What this does:</p>
                <ul className="text-sm text-muted space-y-1 list-disc list-inside">
                  <li>Analyzes each job title and description</li>
                  <li>Automatically assigns relevant skills based on content</li>
                  <li>Determines experience level (Entry/Mid/Senior)</li>
                  <li>Categorizes into career tracks</li>
                  <li>Skips jobs that are already migrated</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
              <AlertCircle className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-semibold text-yellow-400 mb-1">Important:</p>
                <ul className="text-sm text-muted space-y-1 list-disc list-inside">
                  <li>This is safe to run multiple times</li>
                  <li>Existing data will not be lost</li>
                  <li>You can manually edit jobs in Firebase after migration</li>
                  <li>Run this once before using the job matching feature</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Migration Button */}
          <button
            onClick={handleMigrate}
            disabled={migrating}
            className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {migrating ? (
              <>
                <RefreshCw className="animate-spin" size={24} />
                Migrating Jobs...
              </>
            ) : (
              <>
                <Database size={24} />
                Start Migration
              </>
            )}
          </button>

          {/* Results */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mt-6 p-6 rounded-xl border-2 ${
                result.success
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                {result.success ? (
                  <CheckCircle className="text-green-400" size={32} />
                ) : (
                  <AlertCircle className="text-red-400" size={32} />
                )}
                <div>
                  <h3 className={`text-xl font-bold ${
                    result.success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {result.success ? 'Migration Successful!' : 'Migration Failed'}
                  </h3>
                  <p className="text-muted">{result.message}</p>
                </div>
              </div>

              {result.success && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-lg bg-white/5">
                    <p className="text-2xl font-bold text-green-400">{result.updated}</p>
                    <p className="text-sm text-muted">Jobs Updated</p>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5">
                    <p className="text-2xl font-bold text-blue-400">{result.skipped}</p>
                    <p className="text-sm text-muted">Already Migrated</p>
                  </div>
                </div>
              )}

              {result.success && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-muted mb-4">Next steps:</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => navigate('/profile')}
                      className="w-full btn-outline-neon py-3 text-left"
                    >
                      1. Complete your profile with skills, experience, and track
                    </button>
                    <button
                      onClick={() => navigate('/jobs')}
                      className="w-full btn-outline-neon py-3 text-left"
                    >
                      2. View jobs with AI-powered match percentages
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Developer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-6 rounded-xl bg-white/5 border border-white/10"
        >
          <h3 className="font-semibold mb-2 text-primary">For Developers:</h3>
          <p className="text-sm text-muted mb-2">
            This migration script is located at <code className="px-2 py-1 bg-black/30 rounded">frontend/src/utils/migrateJobs.js</code>
          </p>
          <p className="text-sm text-muted">
            You can customize the skill mappings and defaults in that file before running the migration.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MigrateJobs;
