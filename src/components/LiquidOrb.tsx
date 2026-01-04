"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

// --- GLSL Shaders ---

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uDarkMode; // 0.0 for Light, 1.0 for Dark

varying vec2 vUv;

// Smooth Minimum for Metaballs
float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

// Sphere SDF
float sdSphere(vec3 p, float r) {
    return length(p) - r;
}

// Scene Mapping
float map(vec3 p) {
    // Floating Mother Blob (Center)
    vec3 pMother = p - vec3(0.0, sin(uTime * 0.5) * 0.2, 0.0);
    float dMother = sdSphere(pMother, 1.0);

    // Mouse Blob (Follows cursor)
    vec3 mPos = vec3(uMouse.x * 2.5, uMouse.y * 2.5, 0.5 * sin(uTime));
    float dMouse = sdSphere(p - mPos, 0.6);

    // Orbiting Blob (Automatic)
    vec3 oPos = vec3(cos(uTime * 0.8) * 1.8, sin(uTime * 0.8) * 1.8, cos(uTime * 0.5));
    float dOrbit = sdSphere(p - oPos, 0.5);
    
    // Trailing Blob
    vec3 tPos = mPos * 0.6 + vec3(sin(uTime * 2.0)*0.3, cos(uTime*2.0)*0.3, 0.0);
    float dTrail = sdSphere(p - tPos, 0.4);

    // Smooth Union
    float d = smin(dMother, dMouse, 0.8);
    d = smin(d, dOrbit, 0.6);
    d = smin(d, dTrail, 0.5);

    return d;
}

// Calculate Normal
vec3 calcNormal(vec3 p) {
    const float eps = 0.001;
    vec2 e = vec2(eps, 0.0);
    return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
    ));
}

// Raymarching Loop
void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;

    vec3 ro = vec3(0.0, 0.0, 7.0); 
    vec3 rd = normalize(vec3(uv, -1.8)); 

    // Background Color
    vec3 bgDark = vec3(0.0, 0.0, 0.0);
    vec3 bgLight = vec3(1.0, 0.984, 0.968); // #FFFBF7 Cream
    vec3 col = mix(bgLight, bgDark, uDarkMode);

    float t = 0.0; 
    float tMax = 20.0;
    
    // Optimized loop for mobile performance (was 90)
    for(int i = 0; i < 48; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        
        if(d < 0.001) {
            vec3 n = calcNormal(p);
            
            vec3 lightDir = normalize(vec3(0.5, 1.0, 1.0));
            vec3 viewDir = -rd;
            vec3 halfDir = normalize(lightDir + viewDir);

            // Lighting Terms
            float diffuse = max(dot(n, lightDir), 0.0);
            float spec = pow(max(dot(n, halfDir), 0.0), 60.0);
            float fresnel = pow(clamp(1.0 - dot(viewDir, n), 0.0, 1.0), 3.0); // Rim term
            float border = smoothstep(0.5, 0.9, fresnel); // Sharp edge

            // --- LIGHT MODE AESTHETIC ("NextPure") ---
            // Concept: Warm Silver Liquid with Sharp Maroon Border
            vec3 lmBase = vec3(0.98, 0.96, 0.96); // Warm white
            vec3 lmShadow = vec3(0.34, 0.145, 0.145); // Deep Maroon (#572525)
            
            // 1. Diffuse Shading
            vec3 lmColor = mix(lmShadow, lmBase, diffuse * 0.7 + 0.3);
            
            // 2. Maroon Sharp Border
            lmColor = mix(lmColor, lmShadow, border * 0.9); // Use Maroon for border
            
            // 3. White Highlights
            lmColor += vec3(1.0) * spec * 1.5;


            // --- DARK MODE AESTHETIC ---
            // Concept: Obsidian with Glowing Blue/White Rim
            vec3 dmBase = vec3(0.05, 0.05, 0.08);
            
            vec3 dmColor = dmBase;
            // 1. Blueish Rim/Border
            dmColor += vec3(0.4, 0.6, 1.0) * fresnel * 2.0; // Strong rim
            
            // 2. White Highlights
            dmColor += vec3(1.0) * spec * 1.0;


            // Final Mix based on Theme
            col = mix(lmColor, dmColor, uDarkMode);

            break; 
        }
        
        t += d;
        if(t > tMax) break;
    }

    gl_FragColor = vec4(col, 1.0);
}
`;

// --- Scene Setup ---

const MetaballsScene = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size, pointer, viewport } = useThree();
    const [isDark, setIsDark] = useState(0.0); // Default Light

    // Check for Dark Mode safely
    useEffect(() => {
        // Observer for class change on <html>
        const html = document.documentElement;

        const checkTheme = () => {
            setIsDark(html.classList.contains("dark") ? 1.0 : 0.0);
        };

        checkTheme();

        const observer = new MutationObserver(checkTheme);
        observer.observe(html, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uDarkMode: { value: 0.0 }
        }),
        []
    );

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.elapsedTime;

            // Lerp dark mode value for smooth color transition
            material.uniforms.uDarkMode.value = THREE.MathUtils.lerp(
                material.uniforms.uDarkMode.value,
                isDark,
                0.05
            );

            material.uniforms.uMouse.value.copy(pointer);
            material.uniforms.uResolution.value.set(size.width, size.height);
        }
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};

export default function LiquidOrb() {
    return (
        <div className="w-full h-full min-h-[500px] relative overflow-hidden transition-colors duration-1000 bg-[var(--bg-deep)]">
            {/* Reduced dpr to 1 for consistent performance across devices */}
            <Canvas dpr={1} camera={{ position: [0, 0, 5], fov: 45 }}>
                <MetaballsScene />
            </Canvas>
        </div>
    );
}
