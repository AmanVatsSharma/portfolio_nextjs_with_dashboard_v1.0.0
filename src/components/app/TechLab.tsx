import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

type Props = {};

function TechLab({}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isInteracting, setIsInteracting] = useState(false);
    const interactionPosition = useRef({ x: 0, y: 0 });
    const particlesMesh = useRef<THREE.Points | null>(null);
    const rotationSpeed = useRef({ x: 0, y: 0 });
    const lastTouchTime = useRef(0);

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
        
        // Create custom shader material with improved glow effect
        const particlesMaterial = new THREE.ShaderMaterial({
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                varying float vDistance;
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    vDistance = -mvPosition.z;
                    gl_PointSize = size * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vDistance;
                void main() {
                    float distanceFromCenter = length(gl_PointCoord - vec2(0.5));
                    if (distanceFromCenter > 0.5) discard;
                    float alpha = 1.0 - smoothstep(0.45, 0.5, distanceFromCenter);
                    float glow = exp(-distanceFromCenter * 4.0) * 0.3;
                    vec3 glowColor = mix(vColor, vec3(1.0), 0.5);
                    gl_FragColor = vec4(mix(vColor, glowColor, glow), alpha);
                }
            `,
            transparent: true,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
        });
        
        particlesMesh.current = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh.current);

        camera.position.z = 3;

        // Mouse move handler
        const handleMouseMove = (event: MouseEvent) => {
            event.preventDefault();
            interactionPosition.current = {
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1
            };
        };

        // Touch move handler
        const handleTouchMove = (event: TouchEvent) => {
            if (!isInteracting) return;
            event.preventDefault();
            const touch = event.touches[0];
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return;
            
            interactionPosition.current = {
                x: ((touch.clientX - rect.left) / rect.width) * 2 - 1,
                y: -((touch.clientY - rect.top) / rect.height) * 2 + 1
            };
        };

        // Touch start handler
        const handleTouchStart = (event: TouchEvent) => {
            event.preventDefault();
            setIsInteracting(true);
            const now = Date.now();
            if (now - lastTouchTime.current < 300) {
                // Double tap detected - add special effect
                if (particlesMesh.current) {
                    rotationSpeed.current = {
                        x: Math.random() * 0.2 - 0.1,
                        y: Math.random() * 0.2 - 0.1
                    };
                }
            }
            lastTouchTime.current = now;
            
            // Set initial touch position
            const touch = event.touches[0];
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return;
            
            interactionPosition.current = {
                x: ((touch.clientX - rect.left) / rect.width) * 2 - 1,
                y: -((touch.clientY - rect.top) / rect.height) * 2 + 1
            };
        };

        // Touch end handler
        const handleTouchEnd = () => {
            setIsInteracting(false);
            rotationSpeed.current = { x: 0, y: 0 };
        };

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);

            if (particlesMesh.current) {
                // Basic rotation with momentum
                particlesMesh.current.rotation.y += 0.001 + rotationSpeed.current.y;
                particlesMesh.current.rotation.x += rotationSpeed.current.x;
                
                // Interactive movement based on interaction position
                if (isInteracting) {
                    const targetRotationX = interactionPosition.current.y * Math.PI * 0.5;
                    const targetRotationY = interactionPosition.current.x * Math.PI * 0.5;
                    
                    particlesMesh.current.rotation.x += (targetRotationX - particlesMesh.current.rotation.x) * 0.05;
                    particlesMesh.current.rotation.y += (targetRotationY - particlesMesh.current.rotation.y) * 0.05;
                } else {
                    // Smooth return to default rotation
                    particlesMesh.current.rotation.x *= 0.95;
                    rotationSpeed.current.x *= 0.95;
                    rotationSpeed.current.y *= 0.95;
                }

                // Dynamic particle effects
                const positions = particlesMesh.current.geometry.attributes.position.array as Float32Array;
                const sizes = particlesMesh.current.geometry.attributes.size.array as Float32Array;
                const time = Date.now() * 0.001;
                
                for(let i = 0; i < positions.length; i += 3) {
                    const x = positions[i];
                    const y = positions[i + 1];
                    const z = positions[i + 2];

                    // Add more dynamic wave motion
                    positions[i + 1] = y + Math.sin(time + x) * 0.003;
                    positions[i] = x + Math.cos(time + y) * 0.002;
                    
                    // Dynamic size pulsing
                    const sizeIndex = i / 3;
                    const basePulse = (Math.sin(time + x) + 2) * 0.01;
                    const interactionBoost = isInteracting ? 0.005 : 0;
                    sizes[sizeIndex] = basePulse + interactionBoost;
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

        // Add event listeners
        window.addEventListener('resize', handleResize);
        canvasRef.current.addEventListener('mousemove', handleMouseMove);
        canvasRef.current.addEventListener('mousedown', () => setIsInteracting(true));
        canvasRef.current.addEventListener('mouseup', () => setIsInteracting(false));
        canvasRef.current.addEventListener('mouseleave', () => setIsInteracting(false));
        canvasRef.current.addEventListener('touchstart', handleTouchStart, { passive: false });
        canvasRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
        canvasRef.current.addEventListener('touchend', handleTouchEnd);
        canvasRef.current.addEventListener('touchcancel', handleTouchEnd);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (canvasRef.current) {
                canvasRef.current.removeEventListener('mousemove', handleMouseMove);
                canvasRef.current.removeEventListener('mousedown', () => setIsInteracting(true));
                canvasRef.current.removeEventListener('mouseup', () => setIsInteracting(false));
                canvasRef.current.removeEventListener('mouseleave', () => setIsInteracting(false));
                canvasRef.current.removeEventListener('touchstart', handleTouchStart);
                canvasRef.current.removeEventListener('touchmove', handleTouchMove);
                canvasRef.current.removeEventListener('touchend', handleTouchEnd);
                canvasRef.current.removeEventListener('touchcancel', handleTouchEnd);
            }
        };
    }, [isInteracting]);

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
            >
                <canvas ref={canvasRef} className="w-full h-full touch-none" />
                
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
                        Touch, drag, or move your mouse to interact with this dynamic visualization. 
                        Double-tap or click for special effects! Each particle represents a piece of 
                        technology in my stack, floating in perfect harmony.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default TechLab; 