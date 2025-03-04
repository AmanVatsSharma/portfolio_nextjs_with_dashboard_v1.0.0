export interface TechStack {
    name: string;
    type: 'frontend' | 'backend' | 'database' | 'devops' | 'security' | 'other';
    proficiency: number; // 0-100
    experience: number; // years
}

export interface ProjectMetric {
    category: string;
    count: number;
    description: string;
}

export interface CodeActivity {
    type: string;
    project: string;
    description: string;
    tech: string[];
    date: string;
}

export const TECH_STACK: TechStack[] = [
    // Frontend
    { name: 'Next.js', type: 'frontend', proficiency: 95, experience: 3 },
    { name: 'React', type: 'frontend', proficiency: 98, experience: 4 },
    { name: 'Angular', type: 'frontend', proficiency: 85, experience: 2 },
    { name: 'TypeScript', type: 'frontend', proficiency: 95, experience: 4 },
    { name: 'Tailwind CSS', type: 'frontend', proficiency: 90, experience: 3 },
    { name: 'Three.js', type: 'frontend', proficiency: 80, experience: 2 },

    // Backend
    { name: 'NestJS', type: 'backend', proficiency: 92, experience: 3 },
    { name: 'Node.js', type: 'backend', proficiency: 95, experience: 4 },
    { name: 'Python', type: 'backend', proficiency: 88, experience: 3 },
    { name: 'FastAPI', type: 'backend', proficiency: 85, experience: 2 },
    { name: 'GraphQL', type: 'backend', proficiency: 88, experience: 2 },

    // Database
    { name: 'PostgreSQL', type: 'database', proficiency: 90, experience: 4 },
    { name: 'MongoDB', type: 'database', proficiency: 92, experience: 3 },
    { name: 'Redis', type: 'database', proficiency: 85, experience: 2 },

    // DevOps
    { name: 'Docker', type: 'devops', proficiency: 88, experience: 3 },
    { name: 'Kubernetes', type: 'devops', proficiency: 82, experience: 2 },
    { name: 'AWS', type: 'devops', proficiency: 85, experience: 3 },
    { name: 'CI/CD', type: 'devops', proficiency: 90, experience: 3 },

    // Security
    { name: 'Penetration Testing', type: 'security', proficiency: 75, experience: 1 },
    { name: 'OAuth/JWT', type: 'security', proficiency: 90, experience: 3 },
    { name: 'Security Auditing', type: 'security', proficiency: 78, experience: 1 },
];

export const PROJECT_METRICS: ProjectMetric[] = [
    {
        category: 'Full-Stack Apps',
        count: 25,
        description: 'Enterprise-grade applications with Next.js and NestJS'
    },
    {
        category: 'API Services',
        count: 38,
        description: 'RESTful and GraphQL microservices'
    },
    {
        category: 'DevOps Pipelines',
        count: 45,
        description: 'Automated deployment and testing workflows'
    },
    {
        category: 'Security Audits',
        count: 12,
        description: 'Vulnerability assessments and fixes'
    }
];

export const CODE_METRICS = {
    totalProjects: 85,
    codeReviewRate: 98,
    testCoverage: 92,
    successfulDeployments: 450,
    technicalDocumentation: 125, // pages
    microservicesDeployed: 32,
    securityVulnerabilitiesFixed: 85,
    performanceOptimizations: 120
};

export const RECENT_ACTIVITIES: CodeActivity[] = [
    {
        type: 'Project Launch',
        project: 'E-Commerce Platform',
        description: 'Launched a high-performance e-commerce platform with Next.js, NestJS, and PostgreSQL',
        tech: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis'],
        date: '2024-02-28'
    },
    {
        type: 'Security Update',
        project: 'Authentication Service',
        description: 'Implemented biometric authentication and enhanced JWT security',
        tech: ['TypeScript', 'NestJS', 'OAuth2'],
        date: '2024-02-25'
    },
    {
        type: 'Architecture Design',
        project: 'Microservices Framework',
        description: 'Designed and implemented a scalable microservices architecture',
        tech: ['Kubernetes', 'Docker', 'GraphQL', 'TypeScript'],
        date: '2024-02-20'
    },
    {
        type: 'Performance Optimization',
        project: 'Analytics Dashboard',
        description: 'Improved dashboard performance by 70% using React optimization techniques',
        tech: ['React', 'TypeScript', 'Three.js'],
        date: '2024-02-15'
    }
]; 