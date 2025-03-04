import React from 'react';
import { motion } from 'framer-motion';

interface Props {
    children: React.ReactNode;
    id: string;
    title: string;
    className?: string;
}

function SectionWrapper({ children, id, title, className = "" }: Props) {
    return (
        <section 
            id={id} 
            className={`snap-start min-h-screen relative flex flex-col items-center justify-center 
                       py-20 md:py-32 px-4 md:px-10 mx-auto ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute top-24 md:top-28"
            >
                <h3 className="uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl">
                    {title}
                </h3>
            </motion.div>

            <div className="w-full max-w-7xl mt-16 md:mt-0">
                {children}
            </div>
        </section>
    );
}

export default SectionWrapper; 