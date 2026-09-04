"use client";

import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type ComponentRef } from "react";
import {
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  MeshPhysicalMaterial,
  SRGBColorSpace,
  Texture,
  TextureLoader,
  TubeGeometry,
  Vector3,
} from "three";

interface ProductPouchSceneProps {
  frontTexture: string;
  backTexture: string;
  alt: string;
  resetVersion: number;
}

const WIDTH = 1.46;
const HEIGHT = 2.22;
const DEPTH = 0.32;
const COLUMNS = 26;
const ROWS = 34;

/**
 * Menghasilkan satu mesh tertutup (front + back yang mengembung + gusset
 * kiri/kanan + permukaan atas/bawah). Inilah bagian yang membentuk pouch 3D,
 * sehingga objek mempunyai volume fisik dan tidak dibangun dari PlaneGeometry.
 */
function createStandingPouchGeometry() {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const geometry = new BufferGeometry();
  const frontOffset = 0;
  const backOffset = (COLUMNS + 1) * (ROWS + 1);

  const pointAt = (column: number, row: number, side: 1 | -1) => {
    const normalizedX = (column / COLUMNS) * 2 - 1;
    const normalizedY = (row / ROWS) * 2 - 1;
    const taper = 1 - 0.075 * Math.pow(Math.abs(normalizedY), 4);
    const sealedEdge = 0.72 + 0.28 * Math.pow(1 - Math.abs(normalizedY), 0.28);
    const centerBulge = 0.62 + 0.38 * (1 - normalizedX * normalizedX);
    const z = side * DEPTH * sealedEdge * centerBulge;

    return new Vector3(
      normalizedX * (WIDTH / 2) * taper,
      normalizedY * (HEIGHT / 2),
      z,
    );
  };

  const vertexIndex = (column: number, row: number, side: "front" | "back") =>
    (side === "front" ? frontOffset : backOffset) + row * (COLUMNS + 1) + column;

  for (const side of ["front", "back"] as const) {
    const sign = side === "front" ? 1 : -1;

    for (let row = 0; row <= ROWS; row += 1) {
      for (let column = 0; column <= COLUMNS; column += 1) {
        const point = pointAt(column, row, sign);
        positions.push(point.x, point.y, point.z);
        // Back UV dibalik agar tulisan kemasan tidak tampak seperti cermin.
        uvs.push(side === "front" ? column / COLUMNS : 1 - column / COLUMNS, row / ROWS);
      }
    }
  }

  const frontStart = indices.length;
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      const a = vertexIndex(column, row, "front");
      const b = vertexIndex(column + 1, row, "front");
      const c = vertexIndex(column + 1, row + 1, "front");
      const d = vertexIndex(column, row + 1, "front");
      indices.push(a, b, d, b, c, d);
    }
  }
  geometry.addGroup(frontStart, indices.length - frontStart, 0);

  const backStart = indices.length;
  for (let row = 0; row < ROWS; row += 1) {
    for (let column = 0; column < COLUMNS; column += 1) {
      const a = vertexIndex(column, row, "back");
      const b = vertexIndex(column + 1, row, "back");
      const c = vertexIndex(column + 1, row + 1, "back");
      const d = vertexIndex(column, row + 1, "back");
      indices.push(a, d, b, b, d, c);
    }
  }
  geometry.addGroup(backStart, indices.length - backStart, 1);

  const connectEdge = (
    count: number,
    getFront: (step: number) => number,
    getBack: (step: number) => number,
    materialIndex: number,
  ) => {
    const start = indices.length;
    for (let step = 0; step < count; step += 1) {
      const frontA = getFront(step);
      const frontB = getFront(step + 1);
      const backA = getBack(step);
      const backB = getBack(step + 1);
      indices.push(frontA, backA, frontB, frontB, backA, backB);
    }
    geometry.addGroup(start, indices.length - start, materialIndex);
  };

  // Empat edge berikut menutup mesh dan menciptakan gusset/volume pouch.
  connectEdge(ROWS, (row) => vertexIndex(0, row, "front"), (row) => vertexIndex(0, row, "back"), 2);
  connectEdge(ROWS, (row) => vertexIndex(COLUMNS, row, "back"), (row) => vertexIndex(COLUMNS, row, "front"), 3);
  connectEdge(COLUMNS, (column) => vertexIndex(column, ROWS, "front"), (column) => vertexIndex(column, ROWS, "back"), 4);
  connectEdge(COLUMNS, (column) => vertexIndex(column, 0, "back"), (column) => vertexIndex(column, 0, "front"), 5);

  geometry.setIndex(indices);
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();
  return geometry;
}

function SealedPouchEdges() {
  const top = useMemo(
    () => new TubeGeometry(new CatmullRomCurve3([
      new Vector3(-WIDTH * 0.47, HEIGHT * 0.49, DEPTH * 0.66),
      new Vector3(0, HEIGHT * 0.505, DEPTH * 0.69),
      new Vector3(WIDTH * 0.47, HEIGHT * 0.49, DEPTH * 0.66),
    ]), 28, 0.018, 8, false),
    [],
  );
  const bottom = useMemo(
    () => new TubeGeometry(new CatmullRomCurve3([
      new Vector3(-WIDTH * 0.46, -HEIGHT * 0.49, DEPTH * 0.51),
      new Vector3(0, -HEIGHT * 0.505, DEPTH * 0.55),
      new Vector3(WIDTH * 0.46, -HEIGHT * 0.49, DEPTH * 0.51),
    ]), 28, 0.014, 8, false),
    [],
  );

  return (
    <group>
      <mesh geometry={top}><meshStandardMaterial color="#ece5dc" roughness={0.42} /></mesh>
      <mesh geometry={bottom}><meshStandardMaterial color="#d6ccc0" roughness={0.52} /></mesh>
    </group>
  );
}

function PouchMesh({ frontTexture, backTexture, alt }: Omit<ProductPouchSceneProps, "resetVersion">) {
  const [frontMap, backMap] = useLoader(TextureLoader, [frontTexture, backTexture]) as [Texture, Texture];
  const geometry = useMemo(() => createStandingPouchGeometry(), []);

  useEffect(() => {
    for (const texture of [frontMap, backMap]) {
      texture.colorSpace = SRGBColorSpace;
      texture.anisotropy = 8;
      texture.needsUpdate = true;
    }
  }, [frontMap, backMap]);

  const materials = useMemo(() => {
    const makeMaterial = (map?: Texture, color = "#f0ebe3") => new MeshPhysicalMaterial({
      color: new Color(color),
      map,
      roughness: 0.46,
      metalness: 0,
      clearcoat: 0.18,
      clearcoatRoughness: 0.42,
      side: DoubleSide,
    });

    return [
      makeMaterial(frontMap),
      makeMaterial(backMap),
      makeMaterial(undefined, "#e5ded4"),
      makeMaterial(undefined, "#e5ded4"),
      makeMaterial(undefined, "#efe9e0"),
      makeMaterial(undefined, "#d8cec1"),
    ];
  }, [frontMap, backMap]);

  useEffect(() => () => {
    geometry.dispose();
    materials.forEach((material) => material.dispose());
  }, [geometry, materials]);

  return (
    <group rotation={[0.04, -0.28, 0]}>
      <mesh geometry={geometry} material={materials} castShadow receiveShadow name={alt} />
      <SealedPouchEdges />
    </group>
  );
}

function SceneControls({ resetVersion }: Pick<ProductPouchSceneProps, "resetVersion">) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.08, 4.05);
    controls.current?.target.set(0, 0, 0);
    controls.current?.update();
  }, [camera, resetVersion]);

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={2.8}
      maxDistance={5.2}
      minPolarAngle={0.34}
      maxPolarAngle={Math.PI - 0.34}
      rotateSpeed={0.72}
      zoomSpeed={0.7}
    />
  );
}

export default function ProductPouchScene({ frontTexture, backTexture, alt, resetVersion }: ProductPouchSceneProps) {
  return (
    <div className="viewer-3d-canvas" role="img" aria-label={`Model 3D kemasan ${alt}. Seret untuk melihat setiap sisi.`}>
      <Canvas camera={{ position: [0, 0.08, 4.05], fov: 31 }} dpr={[1, 1.75]} shadows gl={{ alpha: true, antialias: true }}>
        <color attach="background" args={["#f8f4ed"]} />
        <ambientLight intensity={1.35} />
        <directionalLight castShadow intensity={2.25} position={[3.2, 4.8, 4.2]} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <directionalLight intensity={1.1} position={[-4, 1.8, -3]} />
        <PouchMesh frontTexture={frontTexture} backTexture={backTexture} alt={alt} />
        <ContactShadows position={[0, -1.17, 0]} opacity={0.28} scale={4.7} blur={2.7} far={2.2} />
        <Environment preset="studio" />
        <SceneControls resetVersion={resetVersion} />
      </Canvas>
    </div>
  );
}
