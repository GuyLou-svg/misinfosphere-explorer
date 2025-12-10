import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PlatformStats } from '@/types/data';

interface BarProps {
  position: [number, number, number];
  height: number;
  color: string;
  label: string;
  value: number;
}

const Bar = ({ position, height, color, label, value }: BarProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.scale.y = THREE.MathUtils.lerp(
      meshRef.current.scale.y,
      height,
      0.05
    );
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} position={[0, height / 2, 0]}>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <Text
        position={[0, -0.5, 0]}
        fontSize={0.25}
        color="#ffd02f"
        anchorX="center"
        anchorY="top"
      >
        {label}
      </Text>
      <Text
        position={[0, height + 0.3, 0]}
        fontSize={0.2}
        color="#ffd02f"
        anchorX="center"
        anchorY="bottom"
      >
        {value.toFixed(0)}
      </Text>
    </group>
  );
};

interface PlatformBarsProps {
  data: PlatformStats[];
}

const PlatformBars = ({ data }: PlatformBarsProps) => {
  const maxEngagement = Math.max(...data.map(d => d.avgEngagement));
  
  const colors = ['#ffd02f', '#ffcb0f', '#ffcf54', '#ffe291'];
  
  return (
    <group position={[-2.5, -1, 0]}>
      {data.map((platform, index) => (
        <Bar
          key={platform.platform}
          position={[index * 1.5, 0, 0]}
          height={(platform.avgEngagement / maxEngagement) * 3 + 0.5}
          color={colors[index % colors.length]}
          label={platform.platform}
          value={platform.avgEngagement}
        />
      ))}
    </group>
  );
};

interface Platform3DChartProps {
  data: PlatformStats[];
}

export const Platform3DChart = ({ data }: Platform3DChartProps) => {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-border bg-card/50">
      <Canvas camera={{ position: [4, 3, 6], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffd02f" />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4a6fa5" />
        
        <PlatformBars data={data} />
        
        {/* Grid floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, -1, 0]}>
          <planeGeometry args={[8, 6, 8, 6]} />
          <meshStandardMaterial
            color="#1a2744"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
          //autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
