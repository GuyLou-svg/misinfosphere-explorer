import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { ChartDataPoint } from '@/types/data';

interface DataPointProps {
  position: [number, number, number];
  color: string;
  size: number;
  data: ChartDataPoint;
}

const DataPoint = ({ position, color, size, data }: DataPointProps) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const scale = hovered ? size * 1.5 : size;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1));
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.6 : 0.2}
        roughness={0.3}
        metalness={0.8}
      />
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-card border border-border px-3 py-2 rounded-md shadow-lg min-w-[150px]">
            <p className="text-xs font-mono text-muted-foreground">{data.platform}</p>
            <p className="text-sm font-semibold text-foreground">
              Toxicity: {(data.toxicity * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">
              Engagement: {data.engagement.toLocaleString()}
            </p>
            {data.isMisinformation && (
              <span className="inline-block mt-1 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                Misinformation
              </span>
            )}
          </div>
        </Html>
      )}
    </mesh>
  );
};

interface ScatterPointsProps {
  data: ChartDataPoint[];
}

const ScatterPoints = ({ data }: ScatterPointsProps) => {
  return (
    <group>
      {data.map((point, index) => (
        <DataPoint
          key={index}
          position={[point.x, point.y, point.z]}
          color={point.isMisinformation ? '#f5c842' : '#2a4a6f'}
          size={Math.min(point.engagement / 5000, 2) + 0.5}
          data={point}
        />
      ))}
    </group>
  );
};

const AxisLabels = () => {
  return (
    <group>
      {/* X axis - Toxicity */}
      <mesh position={[0, -2, 0]}>
        <boxGeometry args={[5, 0.02, 0.02]} />
        <meshStandardMaterial color="#f5c842" />
      </mesh>
      
      {/* Y axis - Engagement */}
      <mesh position={[-2.5, 0, 0]}>
        <boxGeometry args={[0.02, 4, 0.02]} />
        <meshStandardMaterial color="#f5c842" />
      </mesh>
      
      {/* Z axis */}
      <mesh position={[-2.5, -2, 0]}>
        <boxGeometry args={[0.02, 0.02, 3]} />
        <meshStandardMaterial color="#f5c842" opacity={0.5} transparent />
      </mesh>
    </group>
  );
};

interface Toxicity3DScatterProps {
  data: ChartDataPoint[];
}

export const Toxicity3DScatter = ({ data }: Toxicity3DScatterProps) => {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-border bg-card/50">
      <Canvas camera={{ position: [4, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#f5c842" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a6fa5" />
        
        <ScatterPoints data={data} />
        <AxisLabels />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};
