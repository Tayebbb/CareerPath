/**
 * Firebase Job Migration Script
 * Run this once to add skillsRequired, experienceRequired, and track fields to existing jobs
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8za3ZI4m9gUrYsueUum907vpuKzV8H0Q",
  authDomain: "iiuc25.firebaseapp.com",
  projectId: "iiuc25",
  storageBucket: "iiuc25.firebasestorage.app",
  messagingSenderId: "75690391713",
  appId: "1:75690391713:web:4c72c5316547c8bc68d8e0",
  measurementId: "G-82V42TWJ9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Default mapping for common job titles to skills, experience, and track
 */
const jobDefaults = {
  'Junior Software Developer': {
    skillsRequired: ['JavaScript', 'HTML', 'CSS', 'React', 'Git'],
    experienceRequired: 'Entry Level',
    track: 'Software Development'
  },
  'Senior Software Developer': {
    skillsRequired: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'System Design', 'Leadership'],
    experienceRequired: 'Senior',
    track: 'Software Development'
  },
  'UI UX Designer': {
    skillsRequired: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
    experienceRequired: 'Mid Level',
    track: 'Design'
  },
  'Full Stack Developer': {
    skillsRequired: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'REST APIs', 'Git'],
    experienceRequired: 'Mid Level',
    track: 'Software Development'
  },
  'Frontend Developer': {
    skillsRequired: ['JavaScript', 'React', 'CSS', 'HTML', 'TypeScript', 'Responsive Design'],
    experienceRequired: 'Mid Level',
    track: 'Software Development'
  },
  'Backend Developer': {
    skillsRequired: ['Node.js', 'Python', 'SQL', 'REST APIs', 'MongoDB', 'System Design'],
    experienceRequired: 'Mid Level',
    track: 'Software Development'
  },
  'Data Scientist': {
    skillsRequired: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow', 'Data Analysis'],
    experienceRequired: 'Mid Level',
    track: 'Data Science'
  },
  'Machine Learning Engineer': {
    skillsRequired: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'MLOps'],
    experienceRequired: 'Senior',
    track: 'Data Science'
  },
  'DevOps Engineer': {
    skillsRequired: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Terraform'],
    experienceRequired: 'Mid Level',
    track: 'DevOps'
  },
  'Product Manager': {
    skillsRequired: ['Product Strategy', 'Agile', 'User Research', 'Data Analysis', 'Communication'],
    experienceRequired: 'Mid Level',
    track: 'Product Management'
  }
};

/**
 * Extract likely skills from job details text
 */
const extractSkillsFromText = (text) => {
  const commonSkills = [
    'JavaScript', 'Python', 'Java', 'C++', 'React', 'Angular', 'Vue',
    'Node.js', 'Django', 'Flask', 'SQL', 'MongoDB', 'PostgreSQL',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'HTML', 'CSS',
    'TypeScript', 'Machine Learning', 'Data Analysis', 'Agile',
    'REST APIs', 'GraphQL', 'Figma', 'Adobe XD', 'UI/UX'
  ];
  
  const foundSkills = [];
  const lowerText = text.toLowerCase();
  
  commonSkills.forEach(skill => {
    if (lowerText.includes(skill.toLowerCase())) {
      foundSkills.push(skill);
    }
  });
  
  return foundSkills.length > 0 ? foundSkills : ['Programming', 'Problem Solving', 'Teamwork'];
};

/**
 * Determine experience level from job title or description
 */
const determineExperience = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('senior') || text.includes('lead') || text.includes('principal')) {
    return 'Senior';
  } else if (text.includes('junior') || text.includes('entry') || text.includes('graduate')) {
    return 'Entry Level';
  } else {
    return 'Mid Level';
  }
};

/**
 * Determine career track from job title or description
 */
const determineTrack = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('data') || text.includes('machine learning') || text.includes('ai')) {
    return 'Data Science';
  } else if (text.includes('design') || text.includes('ui') || text.includes('ux')) {
    return 'Design';
  } else if (text.includes('devops') || text.includes('infrastructure') || text.includes('cloud')) {
    return 'DevOps';
  } else if (text.includes('product') || text.includes('manager')) {
    return 'Product Management';
  } else if (text.includes('mobile') || text.includes('android') || text.includes('ios')) {
    return 'Mobile Development';
  } else {
    return 'Software Development';
  }
};

/**
 * Main migration function
 */
export const migrateJobs = async () => {
  try {
    console.log('🚀 Starting job migration...');
    
    // Try 'Jobs' collection first (your current collection)
    const jobsRef = collection(db, 'Jobs');
    const snapshot = await getDocs(jobsRef);
    
    if (snapshot.empty) {
      console.log('❌ No jobs found in Jobs collection');
      return { success: false, message: 'No jobs found' };
    }
    
    let updated = 0;
    let skipped = 0;
    
    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const jobId = docSnap.id;
      
      // Check if already has new format
      if (data.skillsRequired && data.experienceRequired && data.track) {
        console.log(`⏭️  Skipping ${jobId} - already migrated`);
        skipped++;
        continue;
      }
      
      // Get job details
      const title = jobId; // In your old format, job ID is the title
      const description = data['Job Details'] || data.JobDetails || '';
      
      // Check if we have defaults for this title
      let updates = jobDefaults[title];
      
      if (!updates) {
        // Generate based on content
        updates = {
          skillsRequired: extractSkillsFromText(`${title} ${description}`),
          experienceRequired: determineExperience(title, description),
          track: determineTrack(title, description)
        };
      }
      
      // Add additional fields for better job management
      updates.title = title;
      updates.description = description;
      updates.company = data['Company Name'] || data.CompanyName || 'Company not specified';
      updates.salary = data.Salary || 'Not specified';
      updates.location = data.Location || 'Remote';
      
      // Update the document
      const jobDocRef = doc(db, 'Jobs', jobId);
      await updateDoc(jobDocRef, updates);
      
      console.log(`✅ Updated ${jobId}:`, updates);
      updated++;
    }
    
    console.log(`\n🎉 Migration complete!`);
    console.log(`   Updated: ${updated} jobs`);
    console.log(`   Skipped: ${skipped} jobs`);
    
    return {
      success: true,
      updated,
      skipped,
      message: `Successfully migrated ${updated} jobs`
    };
    
  } catch (error) {
    console.error('❌ Migration error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

// Export for use in component
export default migrateJobs;
