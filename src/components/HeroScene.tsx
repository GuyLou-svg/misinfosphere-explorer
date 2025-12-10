import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const DataParticles = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 150;
  
  const { positions, colors, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    const yellowColor = new THREE.Color('#ffd02f');
    const navyColor = new THREE.Color('#1a2744');
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      
      const isMisinfo = Math.random() > 0.5;
      const color = isMisinfo ? yellowColor : navyColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      scales[i] = 0.02 + Math.random() * 0.08;
    }
    
    return { positions, colors, scales };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();
    
    for (let i = 0; i < count; i++) {
      const x = positions[i * 3] + Math.sin(time * 0.5 + i) * 0.3;
      const y = positions[i * 3 + 1] + Math.cos(time * 0.3 + i * 0.5) * 0.2;
      const z = positions[i * 3 + 2] + Math.sin(time * 0.2 + i * 0.3) * 0.2;
      
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scales[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        vertexColors
        emissive="#ffd02f"
        emissiveIntensity={0.3}
        roughness={0.3}
        metalness={0.8}
      />
    </instancedMesh>
  );
};

const CentralSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#ffd02f"
          wireframe
          emissive="#ffd02f"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffd02f" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#09003b" />
        
        <Stars
          radius={50}
          depth={50}
          count={1000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />
        
        <DataParticles />
        <CentralSphere />
      </Canvas>
    </div>
  );
};
