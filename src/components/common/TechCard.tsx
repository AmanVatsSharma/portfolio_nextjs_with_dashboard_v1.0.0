import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

function TechCard({ children, className = "", delay = 0 }: Props) {
    return (
        <motion.div
            className={`tech-card bg-[#1d1d1d]/50 backdrop-blur-lg border border-[#333] 
                       rounded-lg overflow-hidden p-6 hover:bg-[#1d1d1d]/70 
                       transition-colors ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
        >
            {children}
        </motion.div>
    );
}

export default TechCard; 