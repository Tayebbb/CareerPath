import { useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';
import { Upload, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import sampleJobsData from '../data/sampleJobs.json';

/**
 * JobSeeder Component
 * Admin tool to seed Firestore with sample job data
 * 
 * Usage: Navigate to /admin/seed-jobs (after adding route)
 * Or embed this component in your Dashboard for admins
 */
const JobSeeder = () => {
  const [seeding, setSeeding] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [jobCount, setJobCount] = useState(0);
  const [stats, setStats] = useState({ success: 0, failed: 0 });

  const checkExistingJobs = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'jobs'));
      setJobCount(snapshot.size);
      return snapshot.size;
    } catch (error) {
      console.error('Error checking jobs:', error);
      return 0;
    }
  };

  const seedJobs = async () => {
    try {
      setSeeding(true);
      setStats({ success: 0, failed: 0 });

      const jobs = sampleJobsData.jobs;
      let successCount = 0;
      let failedCount = 0;

      for (const job of jobs) {
        try {
          await addDoc(collection(db, 'jobs'), job);
          successCount++;
        } catch (error) {
          console.error(`Failed to add ${job.title}:`, error);
          failedCount++;
        }
      }

      setStats({ success: successCount, failed: failedCount });
      
      if (successCount > 0) {
        toast.success(`Successfully seeded ${successCount} jobs!`);
      }
      if (failedCount > 0) {
        toast.error(`Failed to seed ${failedCount} jobs`);
      }

      await checkExistingJobs();
    } catch (error) {
      console.error('Error seeding jobs:', error);
      toast.error('Failed to seed jobs');
    } finally {
      setSeeding(false);
    }
  };

  const deleteAllJobs = async () => {
    if (!window.confirm('Are you sure you want to delete ALL jobs? This cannot be undone!')) {
      return;
    }

    try {
      setDeleting(true);
      const snapshot = await getDocs(collection(db, 'jobs'));
      
      const deletePromises = snapshot.docs.map(jobDoc => 
        deleteDoc(doc(db, 'jobs', jobDoc.id))
      );

      await Promise.all(deletePromises);
      
      toast.success(`Deleted ${snapshot.size} jobs`);
      await checkExistingJobs();
    } catch (error) {
      console.error('Error deleting jobs:', error);
      toast.error('Failed to delete jobs');
    } finally {
      setDeleting(false);
    }
  };

  // Check on mount
  useState(() => {
    checkExistingJobs();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0E1C] py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="neon-card p-8">
          <h1 className="text-3xl font-bold text-main mb-2 flex items-center gap-3">
            <Upload className="text-primary" size={32} />
            Job Data Seeder
          </h1>
          <p className="text-muted mb-8">
            Upload sample job data to your Firestore database for testing the Job Matching feature
          </p>

          {/* Current Status */}
          <div className="mb-8 p-4 bg-[#11152B] rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted mb-1">Current Jobs in Database</p>
                <p className="text-3xl font-bold text-primary">{jobCount}</p>
              </div>
              <button
                onClick={checkExistingJobs}
                className="btn-outline-neon text-sm"
              >
                Refresh Count
              </button>
            </div>
          </div>

          {/* Sample Data Info */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h3 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
              <AlertCircle size={20} />
              What will be seeded?
            </h3>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• <strong>20 diverse job postings</strong> across different tracks</li>
              <li>• Frontend, Backend, Fullstack, Mobile, DevOps, Data Science, QA</li>
              <li>• Each job includes: title, company, skills, experience, track, apply links</li>
              <li>• All jobs are from Bangladesh companies/locations</li>
            </ul>
          </div>

          {/* Last Seeding Stats */}
          {stats.success > 0 && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <CheckCircle size={20} />
                <span className="font-semibold">Last Seeding Results</span>
              </div>
              <div className="text-sm text-green-200">
                <p>✓ Successfully added: <strong>{stats.success}</strong> jobs</p>
                {stats.failed > 0 && (
                  <p className="text-red-300">✗ Failed: <strong>{stats.failed}</strong> jobs</p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={seedJobs}
              disabled={seeding}
              className="btn-primary flex items-center justify-center gap-2 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload size={20} />
              {seeding ? 'Seeding Jobs...' : 'Seed Sample Jobs'}
            </button>

            <button
              onClick={deleteAllJobs}
              disabled={deleting || jobCount === 0}
              className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Trash2 size={20} />
              {deleting ? 'Deleting...' : 'Delete All Jobs'}
            </button>
          </div>

          {/* Warning */}
          <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-300">
              ⚠️ <strong>Note:</strong> Seeding will ADD jobs to your database. If you already have jobs, 
              this will create duplicates. Use "Delete All Jobs" first if you want to start fresh.
            </p>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-[#11152B] rounded-lg border border-primary/20">
            <h3 className="font-semibold text-main mb-3">📋 Next Steps After Seeding</h3>
            <ol className="text-sm text-muted space-y-2 list-decimal list-inside">
              <li>Complete your profile with skills, experience level, and preferred track</li>
              <li>Navigate to the "Job Matches" page</li>
              <li>View your personalized job recommendations with match percentages</li>
              <li>Use search and filters to find the best opportunities</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeeder;
