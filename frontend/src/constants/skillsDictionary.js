/**
 * Comprehensive Skills Dictionary
 * Organized by category for easy autocomplete and suggestions
 */

export const SKILLS_DICTIONARY = {
  // Programming Languages
  'Programming Languages': [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Go',
    'Rust',
    'Ruby',
    'PHP',
    'Swift',
    'Kotlin',
    'Scala',
    'R',
    'MATLAB',
    'Dart',
    'Perl',
    'Shell Scripting',
    'SQL',
    'NoSQL'
  ],

  // Frontend Development
  'Frontend Development': [
    'React',
    'Angular',
    'Vue.js',
    'Next.js',
    'Nuxt.js',
    'Svelte',
    'HTML',
    'CSS',
    'SASS',
    'LESS',
    'Tailwind CSS',
    'Bootstrap',
    'Material-UI',
    'Chakra UI',
    'Redux',
    'MobX',
    'Webpack',
    'Vite',
    'Responsive Design',
    'Progressive Web Apps',
    'Web Components',
    'Accessibility (A11y)'
  ],

  // Backend Development
  'Backend Development': [
    'Node.js',
    'Express.js',
    'Django',
    'Flask',
    'FastAPI',
    'Spring Boot',
    'ASP.NET',
    'Ruby on Rails',
    'Laravel',
    'NestJS',
    'GraphQL',
    'REST APIs',
    'Microservices',
    'WebSocket',
    'gRPC',
    'API Gateway',
    'Server-Side Rendering',
    'Authentication & Authorization',
    'JWT',
    'OAuth'
  ],

  // Mobile Development
  'Mobile Development': [
    'React Native',
    'Flutter',
    'iOS Development',
    'Android Development',
    'SwiftUI',
    'Jetpack Compose',
    'Xamarin',
    'Ionic',
    'Mobile UI/UX',
    'App Store Optimization',
    'Firebase',
    'Push Notifications',
    'Mobile Analytics'
  ],

  // Database & Storage
  'Database & Storage': [
    'MongoDB',
    'PostgreSQL',
    'MySQL',
    'Redis',
    'Elasticsearch',
    'Cassandra',
    'DynamoDB',
    'Firebase Firestore',
    'SQLite',
    'Oracle',
    'Microsoft SQL Server',
    'MariaDB',
    'Neo4j',
    'Database Design',
    'Query Optimization',
    'Data Modeling',
    'Database Administration'
  ],

  // Cloud & DevOps
  'Cloud & DevOps': [
    'AWS',
    'Azure',
    'Google Cloud Platform',
    'Docker',
    'Kubernetes',
    'Jenkins',
    'GitLab CI/CD',
    'GitHub Actions',
    'Terraform',
    'Ansible',
    'Puppet',
    'Chef',
    'CircleCI',
    'Travis CI',
    'ArgoCD',
    'Helm',
    'Prometheus',
    'Grafana',
    'ELK Stack',
    'Nginx',
    'Apache',
    'Load Balancing',
    'Auto Scaling',
    'Cloud Architecture'
  ],

  // Data Science & ML
  'Data Science & ML': [
    'Machine Learning',
    'Deep Learning',
    'Neural Networks',
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Keras',
    'Pandas',
    'NumPy',
    'Data Analysis',
    'Data Visualization',
    'Matplotlib',
    'Seaborn',
    'Tableau',
    'Power BI',
    'Natural Language Processing',
    'Computer Vision',
    'Reinforcement Learning',
    'Feature Engineering',
    'Model Deployment',
    'MLOps',
    'Statistical Analysis',
    'A/B Testing',
    'Time Series Analysis'
  ],

  // Design
  'Design': [
    'UI/UX Design',
    'Figma',
    'Adobe XD',
    'Sketch',
    'Adobe Photoshop',
    'Adobe Illustrator',
    'InVision',
    'Prototyping',
    'Wireframing',
    'User Research',
    'Usability Testing',
    'Information Architecture',
    'Design Systems',
    'Visual Design',
    'Interaction Design',
    'Motion Design',
    'Brand Identity',
    'Typography',
    'Color Theory'
  ],

  // Testing & QA
  'Testing & QA': [
    'Unit Testing',
    'Integration Testing',
    'End-to-End Testing',
    'Test Automation',
    'Jest',
    'Mocha',
    'Cypress',
    'Selenium',
    'Playwright',
    'Postman',
    'JUnit',
    'PyTest',
    'Test-Driven Development',
    'Behavior-Driven Development',
    'Performance Testing',
    'Load Testing',
    'Security Testing',
    'Regression Testing',
    'Bug Tracking'
  ],

  // Security
  'Security': [
    'Cybersecurity',
    'Penetration Testing',
    'Security Auditing',
    'OWASP',
    'Encryption',
    'Network Security',
    'Application Security',
    'Cloud Security',
    'Identity Management',
    'Vulnerability Assessment',
    'Incident Response',
    'Security Compliance',
    'Firewall Configuration',
    'Intrusion Detection',
    'SIEM',
    'Zero Trust Architecture'
  ],

  // Tools & Platforms
  'Tools & Platforms': [
    'Git',
    'GitHub',
    'GitLab',
    'Bitbucket',
    'Jira',
    'Confluence',
    'Slack',
    'Trello',
    'Asana',
    'VS Code',
    'IntelliJ IDEA',
    'Postman',
    'Insomnia',
    'Chrome DevTools',
    'Linux',
    'Windows',
    'macOS',
    'Bash',
    'PowerShell'
  ],

  // Soft Skills
  'Soft Skills': [
    'Problem Solving',
    'Critical Thinking',
    'Communication',
    'Teamwork',
    'Leadership',
    'Time Management',
    'Project Management',
    'Agile Methodology',
    'Scrum',
    'Kanban',
    'Stakeholder Management',
    'Technical Documentation',
    'Code Review',
    'Mentoring',
    'Presentation Skills',
    'Conflict Resolution',
    'Adaptability',
    'Creativity'
  ],

  // Other Technologies
  'Other Technologies': [
    'Blockchain',
    'Web3',
    'Smart Contracts',
    'Ethereum',
    'IoT',
    'Edge Computing',
    'Serverless',
    'WebAssembly',
    'WebRTC',
    'WebSockets',
    'Message Queues',
    'RabbitMQ',
    'Apache Kafka',
    'Event-Driven Architecture',
    'Domain-Driven Design',
    'Clean Architecture',
    'Design Patterns',
    'Object-Oriented Programming',
    'Functional Programming',
    'Version Control',
    'CI/CD',
    'Monitoring & Logging'
  ]
};

// Flatten all skills into a single array for easy searching
export const ALL_SKILLS = Object.values(SKILLS_DICTIONARY).flat().sort();

// Get skills by category
export const getSkillsByCategory = (category) => {
  return SKILLS_DICTIONARY[category] || [];
};

// Search skills (case-insensitive)
export const searchSkills = (query) => {
  if (!query || query.trim() === '') return [];
  
  const searchTerm = query.toLowerCase();
  return ALL_SKILLS.filter(skill => 
    skill.toLowerCase().includes(searchTerm)
  ).slice(0, 20); // Limit to 20 suggestions
};

// Get all categories
export const SKILL_CATEGORIES = Object.keys(SKILLS_DICTIONARY);
