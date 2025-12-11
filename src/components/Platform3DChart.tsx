import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { PlatformStats } from '@/types/data';

interface ViolinProps {
  position: [number, number, number];
  distribution: number[];
  color: string;
  label: string;
}

const Violin = ({ position, distribution, color, label }: ViolinProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const bins = 20;
    const histogram = new Array(bins).fill(0);
    
    distribution.forEach(value => {
      const binIndex = Math.floor((value / 100) * bins);
      const clampedIndex = Math.min(Math.max(binIndex, 0), bins - 1);
      histogram[clampedIndex]++;
    });
    
    const maxCount = Math.max(...histogram, 1);
    const normalizedHist = histogram.map(count => count / maxCount);
    
    const shape = new THREE.Shape();
    const width = 0.6;
    const height = 3;
    
    shape.moveTo(0, 0);
    
    for (let i = 0; i < bins; i++) {
      const y = (i / bins) * height;
      const x = (normalizedHist[i] * width) / 2;
      shape.lineTo(x, y);
    }
    
    for (let i = bins - 1; i >= 0; i--) {
      const y = (i / bins) * height;
      const x = -(normalizedHist[i] * width) / 2;
      shape.lineTo(x, y);
    }
    
    shape.lineTo(0, 0);
    
    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 2
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [distribution]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const mean = distribution.length > 0 
    ? distribution.reduce((a, b) => a + b, 0) / distribution.length 
    : 0;

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, -0.15]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      <mesh position={[0, (mean / 100) * 3, 0]}>
        <boxGeometry args={[0.8, 0.02, 0.4]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={0.5} />
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
    </group>
  );
};

interface PlatformViolinsProps {
  rawData: any[];
}

const PlatformViolins = ({ rawData }: PlatformViolinsProps) => {
  const platforms = ['Reddit', 'Twitter', 'Facebook', 'Telegram'];
  const colors = ['#ffd02f', '#ffcb0f', '#ffcf54', '#ffe291'];
  
  const platformDistributions = useMemo(() => {
    return platforms.map(platform => {
      const platformData = rawData.filter(d => d.platform === platform);
      return platformData.map(d => (d.toxicity_score || 0) * 100);
    });
  }, [rawData]);
  
  return (
    <group position={[-2.5, -1, 0]}>
      {platforms.map((platform, index) => (
        <Violin
          key={platform}
          position={[index * 1.5, 0, 0]}
          distribution={platformDistributions[index]}
          color={colors[index]}
          label={platform}
        />
      ))}
    </group>
  );
};

const ScaleBar = () => {
  return (
    <group position={[-4, -1, 0]}>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.05, 3, 0.05]} />
        <meshStandardMaterial color="#ffd02f" />
      </mesh>
      
      {[0, 25, 50, 75, 100].map((value) => (
        <group key={value}>
          <mesh position={[0, (value / 100) * 3, 0]}>
            <boxGeometry args={[0.2, 0.02, 0.02]} />
            <meshStandardMaterial color="#ffd02f" />
          </mesh>
          <Text
            position={[-0.3, (value / 100) * 3, 0]}
            fontSize={0.2}
            color="#ffd02f"
            anchorX="right"
            anchorY="middle"
          >
            {value}%
          </Text>
        </group>
      ))}
    </group>
  );
};

interface Platform3DChartProps {
  data: PlatformStats[];
  rawData?: any[];
}

export const Platform3DChart = ({ data, rawData = [] }: Platform3DChartProps) => {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-border bg-card/50">
      <Canvas camera={{ position: [4, 3, 6], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffd02f" />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#4a6fa5" />
        
        <PlatformViolins rawData={rawData} />
        <ScaleBar />
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
};
