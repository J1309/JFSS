'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, OrbitControls, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  name: string;
}

export const HERO_THEMES: Record<string, ThemeColors> = {
  rose: {
    primary: '#D4A0A0',
    secondary: '#6B2D3E',
    accent: '#C9A96E',
    name: 'Dusty Rose & Gold',
  },
  green: {
    primary: '#7A9E6A',
    secondary: '#3D5635',
    accent: '#E8A838',
    name: 'Mehendi & Saffron',
  },
  blue: {
    primary: '#4A6AB0',
    secondary: '#1A2744',
    accent: '#DBBF8A',
    name: 'Royal Blue & Silver',
  },
  saffron: {
    primary: '#F0C46A',
    secondary: '#722F37',
    accent: '#FAF7F0',
    name: 'Saffron & Maroon',
  },
};

/* ---------- Flowing Fabric Plane with Dynamic Colors ---------- */
function FabricPlane({ theme }: { theme: ThemeColors }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(theme.primary) },
        uColor2: { value: new THREE.Color(theme.secondary) },
        uColor3: { value: new THREE.Color(theme.accent) },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;

        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

        float snoise(vec3 v){
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 1.0/7.0;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          vUv = uv;
          vec3 pos = position;
          float wave1 = snoise(vec3(pos.x * 1.5, pos.y * 1.5, uTime * 0.35)) * 0.35;
          float wave2 = snoise(vec3(pos.x * 3.0 + 10.0, pos.y * 2.0, uTime * 0.25)) * 0.18;
          float wave3 = snoise(vec3(pos.x * 0.8, pos.y * 0.8, uTime * 0.2)) * 0.45;
          pos.z += wave1 + wave2 + wave3;
          vElevation = pos.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform float uTime;
        varying vec2 vUv;
        varying float vElevation;

        void main() {
          float mixFactor = smoothstep(-0.35, 0.35, vElevation);
          vec3 color = mix(uColor1, uColor2, mixFactor);
          float shimmer = smoothstep(0.1, 0.5, vElevation) * 0.4;
          color = mix(color, uColor3, shimmer);
          float alpha = smoothstep(0.0, 0.25, vUv.y) * smoothstep(0.0, 0.25, 1.0 - vUv.y);
          alpha *= smoothstep(0.0, 0.2, vUv.x) * smoothstep(0.0, 0.2, 1.0 - vUv.x);
          gl_FragColor = vec4(color, alpha * 0.88);
        }
      `,
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uColor1.value.lerp(new THREE.Color(theme.primary), 0.05);
      materialRef.current.uniforms.uColor2.value.lerp(new THREE.Color(theme.secondary), 0.05);
      materialRef.current.uniforms.uColor3.value.lerp(new THREE.Color(theme.accent), 0.05);
    }
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} position={[0.6, -0.2, 0]} rotation={[-0.3, -0.4, 0.2]}>
      <planeGeometry args={[4.5, 5.5, 72, 72]} />
      <shaderMaterial
        ref={materialRef}
        {...shaderData}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ---------- Spiraling Silk Ribbon ---------- */
function SilkRibbon({ theme }: { theme: ThemeColors }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
    if (materialRef.current) {
      materialRef.current.color.lerp(new THREE.Color(theme.accent), 0.05);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 1.1, 0]}>
      <torusKnotGeometry args={[0.75, 0.035, 128, 16, 2, 3]} />
      <meshStandardMaterial
        ref={materialRef}
        color={theme.accent}
        metalness={0.7}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
}

/* ---------- Abstract Mannequin ---------- */
function Mannequin({ theme }: { theme: ThemeColors }) {
  const groupRef = useRef<THREE.Group>(null);
  const torsoMatRef = useRef<any>(null);
  const skirtMatRef = useRef<any>(null);
  const accentMatRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.18 + 0.15;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.06;
    }
    if (torsoMatRef.current) {
      torsoMatRef.current.color.lerp(new THREE.Color(theme.primary), 0.05);
    }
    if (skirtMatRef.current) {
      skirtMatRef.current.color.lerp(new THREE.Color(theme.secondary), 0.05);
    }
    if (accentMatRef.current) {
      accentMatRef.current.color.lerp(new THREE.Color(theme.accent), 0.05);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Head */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[0, 2.25, 0]}>
          <sphereGeometry args={[0.32, 32, 32]} />
          <MeshDistortMaterial
            color="#FAF7F0"
            metalness={0.2}
            roughness={0.3}
            distort={0.06}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Neck */}
      <mesh position={[0, 1.88, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.3, 16]} />
        <meshStandardMaterial color="#F5F0E8" metalness={0.15} roughness={0.4} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 1.18, 0]}>
        <capsuleGeometry args={[0.36, 0.92, 8, 16]} />
        <MeshDistortMaterial
          ref={torsoMatRef}
          color={theme.primary}
          metalness={0.25}
          roughness={0.3}
          distort={0.08}
          speed={1.5}
        />
      </mesh>

      {/* Left Shoulder/Arm */}
      <mesh position={[-0.56, 1.58, 0]} rotation={[0, 0, 0.32]}>
        <capsuleGeometry args={[0.1, 0.72, 8, 16]} />
        <MeshDistortMaterial
          color={theme.primary}
          metalness={0.2}
          roughness={0.3}
          distort={0.05}
          speed={1}
        />
      </mesh>

      {/* Right Shoulder/Arm */}
      <mesh position={[0.56, 1.58, 0]} rotation={[0, 0, -0.32]}>
        <capsuleGeometry args={[0.1, 0.72, 8, 16]} />
        <MeshDistortMaterial
          color={theme.primary}
          metalness={0.2}
          roughness={0.3}
          distort={0.05}
          speed={1}
        />
      </mesh>

      {/* Skirt / Flared Base */}
      <mesh position={[0, 0.02, 0]}>
        <coneGeometry args={[0.65, 1.55, 32, 1, true]} />
        <MeshWobbleMaterial
          ref={skirtMatRef}
          color={theme.secondary}
          metalness={0.2}
          roughness={0.35}
          factor={0.12}
          speed={1.2}
        />
      </mesh>

      {/* Waist Sash */}
      <mesh position={[0, 0.68, 0.05]}>
        <torusGeometry args={[0.38, 0.045, 8, 32]} />
        <meshStandardMaterial ref={accentMatRef} color={theme.accent} metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Neckpiece */}
      <mesh position={[0, 1.68, 0.15]}>
        <torusGeometry args={[0.21, 0.03, 8, 32]} />
        <meshStandardMaterial color={theme.accent} metalness={0.75} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* ---------- Golden Particles ---------- */
function GoldenParticles({ theme }: { theme: ThemeColors }) {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      sizes[i] = Math.random() * 3 + 1;
    }

    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.025;
      const pos = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        pos.setY(i, y + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.0012);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={sizes.length}
        />
      </bufferGeometry>
      <pointsMaterial
        color={theme.accent}
        size={0.035}
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- Camera Rig ---------- */
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.08) * 0.25;
    camera.position.y = Math.cos(t * 0.12) * 0.08 + 1.05;
    camera.lookAt(0, 1, 0);
  });

  return null;
}

/* ---------- Main HeroScene Component ---------- */
export default function HeroScene({ themeKey = 'rose' }: { themeKey?: string }) {
  const theme = HERO_THEMES[themeKey] || HERO_THEMES.rose;

  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 1.05, 4.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <CameraRig />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          color="#FFFDF8"
        />
        <directionalLight
          position={[-4, 3, -2]}
          intensity={0.5}
          color={theme.primary}
        />
        <pointLight position={[0, 3, 2]} intensity={0.7} color={theme.accent} />

        <Environment preset="studio" />

        {/* Scene Objects */}
        <Mannequin theme={theme} />
        <SilkRibbon theme={theme} />
        <FabricPlane theme={theme} />
        <GoldenParticles theme={theme} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
          rotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
