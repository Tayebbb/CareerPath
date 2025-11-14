/**
 * Firestore Data Seeding Script
 * 
 * This script helps you seed your Firebase Firestore database with sample job data
 * and demonstrates the required user profile structure.
 * 
 * INSTRUCTIONS:
 * 1. Make sure you're logged in to your app with a Firebase account
 * 2. Open the browser console on your app
 * 3. Copy and paste this entire script into the console
 * 4. The jobs will be uploaded to your Firestore database
 * 
 * IMPORTANT: Run this from your app's browser console while logged in, 
 * not from Node.js, since we're using the Firebase client SDK.
 */

// Sample jobs data
const sampleJobs = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovators Ltd",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["react", "javascript", "typescript", "tailwind", "css"],
    experienceRequired: "advanced",
    track: "frontend",
    description: "We are looking for an experienced Frontend Developer to join our dynamic team. You will be responsible for building modern, responsive web applications using React and TypeScript.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/frontend-developer",
      bdjobs: "https://www.bdjobs.com/jobs/frontend-developer",
      glassdoor: "https://www.glassdoor.com/job/frontend-developer"
    }
  },
  {
    title: "Full Stack Engineer",
    company: "Digital Solutions BD",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["react", "node.js", "mongodb", "express", "javascript"],
    experienceRequired: "intermediate",
    track: "fullstack",
    description: "Join our team as a Full Stack Engineer working on cutting-edge MERN stack applications.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/fullstack-engineer",
      bdjobs: "https://www.bdjobs.com/jobs/fullstack-engineer"
    }
  },
  {
    title: "Backend Developer - Node.js",
    company: "Cloud Systems Inc",
    location: "Chittagong, Bangladesh",
    skillsRequired: ["node.js", "express", "mongodb", "redis", "docker"],
    experienceRequired: "intermediate",
    track: "backend",
    description: "Design and implement scalable microservices architecture.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/backend-developer",
      glassdoor: "https://www.glassdoor.com/job/backend-developer"
    }
  },
  {
    title: "Junior React Developer",
    company: "StartupHub Bangladesh",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["react", "javascript", "html", "css", "git"],
    experienceRequired: "beginner",
    track: "frontend",
    description: "Perfect opportunity for fresh graduates or junior developers.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/junior-react-developer",
      bdjobs: "https://www.bdjobs.com/jobs/junior-react-developer"
    }
  },
  {
    title: "DevOps Engineer",
    company: "Infrastructure Solutions Ltd",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["docker", "kubernetes", "aws", "jenkins", "linux"],
    experienceRequired: "advanced",
    track: "devops",
    description: "Lead DevOps initiatives and manage cloud infrastructure.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/devops-engineer",
      glassdoor: "https://www.glassdoor.com/job/devops-engineer"
    }
  },
  {
    title: "Mobile App Developer - React Native",
    company: "AppVentures BD",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["react native", "javascript", "typescript", "ios", "android"],
    experienceRequired: "intermediate",
    track: "mobile",
    description: "Build cross-platform mobile applications.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/mobile-developer",
      bdjobs: "https://www.bdjobs.com/jobs/mobile-developer"
    }
  },
  {
    title: "Python Django Developer",
    company: "Web Solutions Bangladesh",
    location: "Sylhet, Bangladesh",
    skillsRequired: ["python", "django", "postgresql", "rest api", "docker"],
    experienceRequired: "intermediate",
    track: "backend",
    description: "Develop robust web applications using Django framework.",
    applyLinks: {
      bdjobs: "https://www.bdjobs.com/jobs/python-developer",
      glassdoor: "https://www.glassdoor.com/job/python-developer"
    }
  },
  {
    title: "Data Scientist",
    company: "Analytics Pro BD",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["python", "machine learning", "pandas", "tensorflow", "sql"],
    experienceRequired: "advanced",
    track: "data science",
    description: "Apply machine learning algorithms to solve business problems.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/data-scientist",
      glassdoor: "https://www.glassdoor.com/job/data-scientist"
    }
  },
  {
    title: "UI/UX Designer & Frontend Developer",
    company: "Creative Digital Agency",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["figma", "html", "css", "javascript", "react"],
    experienceRequired: "intermediate",
    track: "frontend",
    description: "Combine design skills with frontend development.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/ui-ux-frontend",
      bdjobs: "https://www.bdjobs.com/jobs/ui-ux-developer"
    }
  },
  {
    title: "QA Automation Engineer",
    company: "Quality First Software",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["selenium", "javascript", "cypress", "jest", "testing"],
    experienceRequired: "intermediate",
    track: "qa",
    description: "Design and implement automated test suites.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/qa-automation",
      bdjobs: "https://www.bdjobs.com/jobs/qa-engineer"
    }
  },
  {
    title: "WordPress Developer",
    company: "CMS Solutions BD",
    location: "Rajshahi, Bangladesh",
    skillsRequired: ["wordpress", "php", "mysql", "html", "css"],
    experienceRequired: "beginner",
    track: "fullstack",
    description: "Develop and customize WordPress themes and plugins.",
    applyLinks: {
      bdjobs: "https://www.bdjobs.com/jobs/wordpress-developer"
    }
  },
  {
    title: "Flutter Developer",
    company: "Mobile First Apps",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["flutter", "dart", "firebase", "rest api", "mobile"],
    experienceRequired: "intermediate",
    track: "mobile",
    description: "Build beautiful cross-platform mobile applications.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/flutter-developer",
      glassdoor: "https://www.glassdoor.com/job/flutter-developer"
    }
  },
  {
    title: "Java Spring Boot Developer",
    company: "Enterprise Solutions Ltd",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["java", "spring boot", "hibernate", "mysql", "microservices"],
    experienceRequired: "advanced",
    track: "backend",
    description: "Develop enterprise-grade applications using Java.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/java-developer",
      bdjobs: "https://www.bdjobs.com/jobs/java-developer"
    }
  },
  {
    title: "Vue.js Frontend Developer",
    company: "Modern Web Studios",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["vue.js", "javascript", "vuex", "nuxt", "tailwind"],
    experienceRequired: "intermediate",
    track: "frontend",
    description: "Build progressive web applications using Vue.js.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/vue-developer",
      bdjobs: "https://www.bdjobs.com/jobs/vue-developer"
    }
  },
  {
    title: "AWS Cloud Architect",
    company: "CloudTech Solutions",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["aws", "terraform", "kubernetes", "docker", "python"],
    experienceRequired: "advanced",
    track: "devops",
    description: "Design and implement cloud infrastructure on AWS.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/cloud-architect",
      glassdoor: "https://www.glassdoor.com/job/cloud-architect"
    }
  },
  {
    title: "Graphic Designer & Web Developer",
    company: "Design & Code Studio",
    location: "Khulna, Bangladesh",
    skillsRequired: ["photoshop", "illustrator", "html", "css", "javascript"],
    experienceRequired: "beginner",
    track: "frontend",
    description: "Create stunning graphics and bring them to life on the web.",
    applyLinks: {
      bdjobs: "https://www.bdjobs.com/jobs/graphic-web-developer"
    }
  },
  {
    title: "Machine Learning Engineer",
    company: "AI Innovations BD",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["python", "tensorflow", "pytorch", "machine learning", "deep learning"],
    experienceRequired: "advanced",
    track: "data science",
    description: "Develop and deploy machine learning models.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/ml-engineer",
      glassdoor: "https://www.glassdoor.com/job/ml-engineer"
    }
  },
  {
    title: "Angular Developer",
    company: "Enterprise Web Solutions",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["angular", "typescript", "rxjs", "html", "scss"],
    experienceRequired: "intermediate",
    track: "frontend",
    description: "Build enterprise-level single page applications.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/angular-developer",
      bdjobs: "https://www.bdjobs.com/jobs/angular-developer"
    }
  },
  {
    title: "MERN Stack Developer",
    company: "Full Stack Academy",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["mongodb", "express", "react", "node.js", "javascript"],
    experienceRequired: "intermediate",
    track: "fullstack",
    description: "Work on complete MERN stack applications.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/mern-developer",
      bdjobs: "https://www.bdjobs.com/jobs/mern-developer",
      glassdoor: "https://www.glassdoor.com/job/mern-developer"
    }
  },
  {
    title: "Cybersecurity Specialist",
    company: "SecureNet Bangladesh",
    location: "Dhaka, Bangladesh",
    skillsRequired: ["security", "penetration testing", "linux", "networking", "python"],
    experienceRequired: "advanced",
    track: "devops",
    description: "Protect infrastructure and conduct security audits.",
    applyLinks: {
      linkedin: "https://www.linkedin.com/jobs/view/cybersecurity",
      glassdoor: "https://www.glassdoor.com/job/cybersecurity"
    }
  }
];

// Function to seed jobs to Firestore
async function seedJobs() {
  try {
    // Import Firebase (make sure your app has access to these)
    const { collection, addDoc } = await import('firebase/firestore');
    const { db } = await import('./firebase'); // Adjust path as needed

    console.log('Starting to seed jobs...');
    let successCount = 0;
    
    for (const job of sampleJobs) {
      try {
        const docRef = await addDoc(collection(db, 'jobs'), job);
        console.log(`✓ Added: ${job.title} (ID: ${docRef.id})`);
        successCount++;
      } catch (error) {
        console.error(`✗ Failed to add ${job.title}:`, error);
      }
    }
    
    console.log(`\n✅ Successfully seeded ${successCount} out of ${sampleJobs.length} jobs!`);
  } catch (error) {
    console.error('❌ Error seeding jobs:', error);
  }
}

// User Profile Structure Example
const exampleUserProfile = {
  // Required fields for job matching
  skills: ["react", "javascript", "typescript", "node.js", "mongodb"],
  experienceLevel: "intermediate", // "beginner" | "intermediate" | "advanced"
  preferredTrack: "fullstack", // "frontend" | "backend" | "fullstack" | "mobile" | "devops" | "data science" | "qa"
  
  // Optional fields
  email: "user@example.com",
  displayName: "John Doe",
  bio: "Passionate developer",
  education: "BSc in Computer Science",
  location: "Dhaka, Bangladesh"
};

console.log(`
═══════════════════════════════════════════════════════════
  FIRESTORE DATA SEEDING INSTRUCTIONS
═══════════════════════════════════════════════════════════

📋 TO SEED JOBS:
   Run this in your browser console while on your app:
   > seedJobs()

👤 USER PROFILE STRUCTURE:
   Your user documents must have these fields:
   - skills: string[]
   - experienceLevel: "beginner" | "intermediate" | "advanced"
   - preferredTrack: string (e.g., "frontend", "backend", "fullstack")

📝 EXAMPLE USER PROFILE:
   ${JSON.stringify(exampleUserProfile, null, 2)}

🔧 TO UPDATE YOUR PROFILE:
   Go to Profile page in your app and add:
   - Your skills
   - Your experience level
   - Your preferred track

═══════════════════════════════════════════════════════════
`);

// Export for use
export { seedJobs, sampleJobs, exampleUserProfile };
