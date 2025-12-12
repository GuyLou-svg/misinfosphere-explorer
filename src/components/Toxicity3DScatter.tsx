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
      <meshPhysicalMaterial
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 1.2 : 0.5}
        roughness={0.1}
        metalness={0.2}
        transparent
        opacity={0.92}
        transmission={0.3}
        thickness={0.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
      {hovered && (
        <Html distanceFactor={5} style={{ pointerEvents: 'none' }}>
          <div className="bg-card/95 border border-border px-2 py-1.5 rounded shadow-lg text-[10px] whitespace-nowrap">
            <p className="font-mono text-muted-foreground">{data.platform}</p>
            <p className="font-semibold text-foreground">
              Toxicity: {(data.toxicity * 100).toFixed(1)}%
            </p>
            <p className="text-muted-foreground">
              Eng: {data.engagement.toLocaleString()}
            </p>
            {data.isMisinformation && (
              <span className="inline-block mt-0.5 bg-primary/20 text-primary px-1 py-0.5 rounded">
                Misinfo
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
          color={point.isMisinformation ? '#ffd02f' : '#f5f5f5'}
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
        <boxGeometry args={[5, 0.03, 0.03]} />
        <meshStandardMaterial color="#ffd02f" emissive="#ffd02f" emissiveIntensity={0.3} />
      </mesh>
      <Html position={[2.8, -2, 0]} center>
        <span className="text-xs font-mono text-[#ffd02f] whitespace-nowrap">Toxicity →</span>
      </Html>
      
      {/* Y axis - Engagement */}
      <mesh position={[-2.5, 0, 0]}>
        <boxGeometry args={[0.03, 4, 0.03]} />
        <meshStandardMaterial color="#ffd02f" emissive="#ffd02f" emissiveIntensity={0.3} />
      </mesh>
      <Html position={[-2.5, 2.3, 0]} center>
        <span className="text-xs font-mono text-[#ffd02f] whitespace-nowrap">↑ Engagement</span>
      </Html>
      
      {/* Z axis */}
      <mesh position={[-2.5, -2, 0]}>
        <boxGeometry args={[0.03, 0.03, 3]} />
        <meshStandardMaterial color="#ffd02f" emissive="#ffd02f" emissiveIntensity={0.2} opacity={0.8} transparent />
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
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#ffd02f" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#09003b" />
        <spotLight position={[5, 8, 5]} intensity={1.5} angle={0.4} penumbra={0.5} color="#ffffff" />
        <pointLight position={[0, 5, 0]} intensity={0.6} color="#ffffff" />
        
        <ScatterPoints data={data} />
        <AxisLabels />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};
