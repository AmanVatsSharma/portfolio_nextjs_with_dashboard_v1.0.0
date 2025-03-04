import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

function TechLoader() {
    const [text] = useTypewriter({
        words: [
            'Welcome to my Portfolio',
            'Full Stack Developer',
            'Tech Enthusiast',
            'Problem Solver',
            'Loading your experience...'
        ],
        loop: true,
        delaySpeed: 2000,
    });

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#111]/90 backdrop-blur-lg z-50">
            {/* Portfolio title */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#f7ab0a] text-2xl md:text-3xl font-bold mb-12 text-center px-4"
            >
                Portfolio Experience
            </motion.h1>

            <div className="relative">
                {/* Outer rotating hexagon */}
                <motion.div
                    className="absolute inset-0 border-2 border-[#f7ab0a] rounded-xl"
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                
                {/* Inner pulsing container */}
                <motion.div
                    className="relative w-32 h-32 flex items-center justify-center"
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {/* Tech circuit lines */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#f7ab0a] to-transparent"
                            style={{
                                transform: `rotate(${i * 60}deg)`
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0.8, 1, 0.8],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}

                    {/* Center dot with electric sparks */}
                    <motion.div
                        className="w-4 h-4 bg-[#f7ab0a] rounded-full relative"
                        animate={{
                            scale: [1, 1.2, 1],
                            boxShadow: [
                                "0 0 10px #f7ab0a",
                                "0 0 20px #f7ab0a",
                                "0 0 10px #f7ab0a"
                            ]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Electric sparks */}
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="electric-spark"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                    transform: `rotate(${i * 90}deg) translateX(20px)`
                                }}
                            />
                        ))}
                    </motion.div>
                </motion.div>

                {/* Dynamic typing text */}
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full min-w-[250px] text-center">
                    <motion.div
                        className="text-[#f7ab0a] text-sm md:text-base font-mono mb-2"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <span>{text}</span>
                        <Cursor cursorColor="#f7ab0a" />
                    </motion.div>
                    
                    {/* Progress dots */}
                    <div className="flex justify-center gap-1">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1.5 h-1.5 bg-[#f7ab0a] rounded-full"
                                animate={{
                                    opacity: [0.2, 1, 0.2],
                                    scale: [1, 1.2, 1],
                                }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechLoader; 