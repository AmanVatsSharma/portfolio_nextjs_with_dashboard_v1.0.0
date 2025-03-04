import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

type Props = {};

function TechLab({}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const mousePosition = useRef({ x: 0, y: 0 });
    const particlesMesh = useRef<THREE.Points | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Three.js setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            alpha: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Create floating code particles with varying sizes
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        
        const positions = new Float32Array(particlesCount * 3);
        const colors = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);
        
        const color = new THREE.Color('#f7ab0a');
        
        for(let i = 0; i < particlesCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 5;
            if (i % 3 === 0) {
                colors[i] = color.r;
                colors[i + 1] = color.g;
                colors[i + 2] = color.b;
                sizes[i / 3] = Math.random() * 0.02;
            }
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Create custom shader material
        const particlesMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
                    gl_FragColor = vec4(vColor, 1.0);
                }
            `,
            transparent: true,
            vertexColors: true,
        });
        
        particlesMesh.current = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh.current);

        camera.position.z = 3;

        // Mouse move handler
        const handleMouseMove = (event: MouseEvent) => {
            mousePosition.current = {
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1
            };
        };

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            if (particlesMesh.current) {
                // Basic rotation
                particlesMesh.current.rotation.y += 0.001;
                
                // Interactive movement based on mouse position when hovering
                if (isHovering) {
                    particlesMesh.current.rotation.x += (mousePosition.current.y * 0.01 - particlesMesh.current.rotation.x) * 0.1;
                    particlesMesh.current.rotation.y += (mousePosition.current.x * 0.01 - particlesMesh.current.rotation.y) * 0.1;
                }

                // Pulsing effect
                const positions = particlesMesh.current.geometry.attributes.position.array as Float32Array;
                const sizes = particlesMesh.current.geometry.attributes.size.array as Float32Array;
                
                for(let i = 0; i < positions.length; i += 3) {
                    const x = positions[i];
                    const y = positions[i + 1];
                    const z = positions[i + 2];

                    // Add subtle wave motion
                    positions[i + 1] = y + Math.sin(Date.now() * 0.001 + x) * 0.002;
                    
                    // Pulse size
                    const sizeIndex = i / 3;
                    sizes[sizeIndex] = (Math.sin(Date.now() * 0.001 + x) + 2) * 0.01;
                }

                particlesMesh.current.geometry.attributes.position.needsUpdate = true;
                particlesMesh.current.geometry.attributes.size.needsUpdate = true;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHovering]);

    return (
        <div className="h-screen relative flex flex-col items-center justify-center text-center md:text-left md:flex-row max-w-7xl px-10 mx-auto">
            <h3 className="absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl">
                Tech Lab
            </h3>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="relative w-full h-[600px] mx-auto flex items-center justify-center"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <canvas ref={canvasRef} className="w-full h-full" />
                
                <motion.div 
                    className="absolute bottom-10 left-0 right-0 text-center space-y-4 z-20"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <h4 className="text-4xl font-semibold text-[#f7ab0a]">
                        Interactive Code Universe
                    </h4>
                    <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                        Move your mouse to interact with this dynamic visualization. 
                        Each particle represents a piece of technology in my stack, 
                        floating in perfect harmony.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default TechLab; 