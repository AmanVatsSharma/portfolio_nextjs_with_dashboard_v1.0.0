import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, GitBranch, Database, Cloud, Shield, Blocks } from 'lucide-react';
import { format } from 'date-fns';
import { TECH_STACK, PROJECT_METRICS, CODE_METRICS, RECENT_ACTIVITIES } from '@/constants/profile-data';
import SectionWrapper from '../common/SectionWrapper';
import TechCard from '../common/TechCard';

type Props = {};

function CodeMetrics({}: Props) {
    const [selectedCategory, setSelectedCategory] = useState<'frontend' | 'backend' | 'database' | 'devops' | 'security'>('frontend');

    const categoryIcons = {
        frontend: <Code2 className="w-5 h-5" />,
        backend: <Blocks className="w-5 h-5" />,
        database: <Database className="w-5 h-5" />,
        devops: <Cloud className="w-5 h-5" />,
        security: <Shield className="w-5 h-5" />
    };

    const filteredTechStack = TECH_STACK.filter(tech => tech.type === selectedCategory);

    return (
        <SectionWrapper id="tech" title="Tech Expertise">
            <div className="space-y-8">
                {/* Tech Categories */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {Object.entries(categoryIcons).map(([category, icon]) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category as any)}
                            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all
                                ${selectedCategory === category 
                                    ? 'bg-[#f7ab0a]/20 text-[#f7ab0a]' 
                                    : 'text-gray-400 hover:text-[#f7ab0a] hover:bg-[#f7ab0a]/10'}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {icon}
                            <span className="capitalize hidden sm:inline">{category}</span>
                        </motion.button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Tech Stack Display */}
                    <TechCard className="lg:col-span-2">
                        <h4 className="text-xl font-semibold text-[#f7ab0a] mb-6">Technology Proficiency</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {filteredTechStack.map((tech, index) => (
                                <motion.div 
                                    key={tech.name}
                                    className="bg-[#1d1d1d]/50 p-4 rounded-lg space-y-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#f7ab0a]">{tech.name}</span>
                                        <span className="text-gray-400">{tech.experience}+ years</span>
                                    </div>
                                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full bg-[#f7ab0a] rounded-full"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${tech.proficiency}%` }}
                                            transition={{ duration: 1, delay: index * 0.1 }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </TechCard>

                    {/* Metrics Overview */}
                    <TechCard>
                        <h4 className="text-xl font-semibold text-[#f7ab0a] mb-6">Performance Metrics</h4>
                        <div className="space-y-4">
                            {Object.entries({
                                'Code Review Rate': `${CODE_METRICS.codeReviewRate}%`,
                                'Test Coverage': `${CODE_METRICS.testCoverage}%`,
                                'Successful Deployments': `${CODE_METRICS.successfulDeployments}+`,
                                'Microservices': CODE_METRICS.microservicesDeployed
                            }).map(([label, value], index) => (
                                <motion.div 
                                    key={label}
                                    className="flex justify-between items-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <span className="text-gray-400">{label}</span>
                                    <span className="text-[#f7ab0a]">{value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </TechCard>
                </div>

                {/* Project Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PROJECT_METRICS.map((metric, index) => (
                        <TechCard key={metric.category} delay={index * 0.1}>
                            <h5 className="text-lg font-semibold text-[#f7ab0a] mb-2">{metric.category}</h5>
                            <div className="text-3xl font-bold text-white mb-2">{metric.count}+</div>
                            <p className="text-sm text-gray-400">{metric.description}</p>
                        </TechCard>
                    ))}
                </div>

                {/* Recent Activity */}
                <TechCard delay={0.4}>
                    <h4 className="text-xl font-semibold text-[#f7ab0a] mb-6">Recent Projects</h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {RECENT_ACTIVITIES.map((activity, i) => (
                            <motion.div 
                                key={i}
                                className="flex items-start space-x-4 p-4 rounded-lg bg-[#1d1d1d]/50 hover:bg-[#1d1d1d]/70 transition-all"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ x: 10 }}
                            >
                                <GitBranch className="w-5 h-5 text-[#f7ab0a] flex-shrink-0 mt-1" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-2 mb-1">
                                        <p className="text-[#f7ab0a] font-medium truncate">{activity.project}</p>
                                        <span className="text-gray-500 hidden sm:inline">•</span>
                                        <p className="text-gray-500 text-sm hidden sm:inline">
                                            {format(new Date(activity.date), 'MMM d, yyyy')}
                                        </p>
                                    </div>
                                    <p className="text-gray-300 text-sm mb-2 line-clamp-2">{activity.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {activity.tech.map((tech, index) => (
                                            <span 
                                                key={index}
                                                className="text-xs px-2 py-1 rounded-full bg-[#f7ab0a]/10 text-[#f7ab0a]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </TechCard>
            </div>
        </SectionWrapper>
    );
}

export default CodeMetrics; 