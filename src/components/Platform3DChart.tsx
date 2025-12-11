import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

interface ViolinData {
  platform: string;
  density: number[];
  mean: number;
}

interface ViolinProps {
  position: [number, number, number];
  density: number[];
  mean: number;
  color: string;
  label: string;
}

const Violin = ({ position, density, mean, color, label }: ViolinProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const bins = density.length;
    const height = 3;
    const maxWidth = 0.5;
    
    // Right side of violin
    shape.moveTo(0, 0);
    for (let i = 0; i < bins; i++) {
      const y = (i / (bins - 1)) * height;
      const width = density[i] * maxWidth;
      shape.lineTo(width, y);
    }
    
    // Left side of violin (mirrored)
    for (let i = bins - 1; i >= 0; i--) {
      const y = (i / (bins - 1)) * height;
      const width = -density[i] * maxWidth;
      shape.lineTo(width, y);
    }
    
    shape.closePath();
    
    const extrudeSettings = {
      steps: 1,
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [density]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef} geometry={geometry} position={[0, 0, -0.15]}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Mean line */}
      <mesh position={[0, mean * 3, 0.2]}>
        <boxGeometry args={[0.8, 0.03, 0.03]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Platform label */}
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.22}
        color={color}
        anchorX="center"
        anchorY="top"
        font="/fonts/Inter-Bold.woff"
      >
        {label}
      </Text>
      
      {/* Mean value label */}
      <Text
        position={[0, 3.3, 0]}
        fontSize={0.18}
        color="#ffffff"
        anchorX="center"
        anchorY="bottom"
      >
        {(mean * 100).toFixed(1)}%
      </Text>
    </group>
  );
};

interface Platform3DChartProps {
  data: ViolinData[];
  colors: string[];
}

export const Platform3DChart = ({ data, colors }: Platform3DChartProps) => {
  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border border-border bg-card/50">
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffd02f" />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ffffff" />
        
        <group position={[-3, -1.5, 0]}>
          {data.map((item, index) => (
            <Violin
              key={item.platform}
              position={[index * 2, 0, 0]}
              density={item.density}
              mean={item.mean}
              color={colors[index]}
              label={item.platform}
            />
          ))}
        </group>
        
        {/* Y-axis labels */}
        <group position={[-4.2, -1.5, 0]}>
          <Text position={[0, 0, 0]} fontSize={0.15} color="#ffffff" anchorX="right">0%</Text>
          <Text position={[0, 1.5, 0]} fontSize={0.15} color="#ffffff" anchorX="right">50%</Text>
          <Text position={[0, 3, 0]} fontSize={0.15} color="#ffffff" anchorX="right">100%</Text>
        </group>
        
        {/* Grid floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1, -1.5, 0]}>
          <planeGeometry args={[10, 6, 10, 6]} />
          <meshStandardMaterial
            color="#09003b"
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
        
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
};
