"use client";

import { ContactShadows, Environment } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
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
  rotation?: { pitch: number; yaw: number };
  slim?: boolean;
}

const WIDTH = 1.46;
const HEIGHT = 2.22;
const DEFAULT_DEPTH = 0.32;
const PHOTO_MATCHED_DEPTH = 0.15;
const COLUMNS = 26;
const ROWS = 34;

/**
 * Menghasilkan satu mesh tertutup (front + back yang mengembung + gusset
 * kiri/kanan + permukaan atas/bawah). Inilah bagian yang membentuk pouch 3D,
 * sehingga objek mempunyai volume fisik dan tidak dibangun dari PlaneGeometry.
 */
function createStandingPouchGeometry(depth = DEFAULT_DEPTH) {
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
    // Kedalaman mengecil tajam di seal atas/bawah: siluetnya jadi pouch
    // plastik terjepit, bukan balok dengan tutup datar.
    const sealedEdge = 0.18 + 0.82 * Math.pow(1 - normalizedY * normalizedY, 0.42);
    const centerBulge = 0.62 + 0.38 * (1 - normalizedX * normalizedX);
    const z = side * depth * sealedEdge * centerBulge;

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

function SealedPouchEdges({ depth }: { depth: number }) {
  const top = useMemo(
    () => new TubeGeometry(new CatmullRomCurve3([
      new Vector3(-WIDTH * 0.47, HEIGHT * 0.49, depth * 0.16),
      new Vector3(0, HEIGHT * 0.505, depth * 0.18),
      new Vector3(WIDTH * 0.47, HEIGHT * 0.49, depth * 0.16),
    ]), 28, 0.018, 8, false),
    [depth],
  );
  const bottom = useMemo(
    () => new TubeGeometry(new CatmullRomCurve3([
      new Vector3(-WIDTH * 0.46, -HEIGHT * 0.49, depth * 0.13),
      new Vector3(0, -HEIGHT * 0.505, depth * 0.16),
      new Vector3(WIDTH * 0.46, -HEIGHT * 0.49, depth * 0.13),
    ]), 28, 0.014, 8, false),
    [depth],
  );

  return (
    <group>
      <mesh geometry={top}><meshStandardMaterial color="#ece5dc" roughness={0.42} /></mesh>
      <mesh geometry={bottom}><meshStandardMaterial color="#d6ccc0" roughness={0.52} /></mesh>
    </group>
  );
}

function PouchMesh({ frontTexture, backTexture, alt, rotation, slim = false }: ProductPouchSceneProps) {
  const [frontMap, backMap] = useLoader(TextureLoader, [frontTexture, backTexture]) as [Texture, Texture];
  const depth = slim ? PHOTO_MATCHED_DEPTH : DEFAULT_DEPTH;
  const geometry = useMemo(() => createStandingPouchGeometry(depth), [depth]);

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
      roughness: 0.35,
      metalness: 0,
      clearcoat: 0.28,
      clearcoatRoughness: 0.3,
      side: DoubleSide,
    });

    return [
      makeMaterial(frontMap),
      makeMaterial(backMap),
      makeMaterial(undefined, "#f4f1eb"),
      makeMaterial(undefined, "#f4f1eb"),
      makeMaterial(undefined, "#faf8f3"),
      makeMaterial(undefined, "#e6e1d8"),
    ];
  }, [frontMap, backMap]);

  const pouchRotation = rotation ?? { pitch: slim ? 0 : -0.04, yaw: slim ? 0 : -0.28 };

  return (
    <group rotation={[pouchRotation.pitch, pouchRotation.yaw, 0]}>
      <mesh geometry={geometry} material={materials} castShadow receiveShadow name={alt} />
      {!slim && <SealedPouchEdges depth={depth} />}
    </group>
  );
}

export default function ProductPouchScene({ frontTexture, backTexture, alt, rotation, slim }: ProductPouchSceneProps) {
  return (
    <div className="viewer-3d-canvas" role="img" aria-label={`Model 3D kemasan ${alt}. Seret untuk melihat setiap sisi.`}>
      <Canvas camera={{ position: [0, 0.08, 4.05], fov: 31 }} dpr={[1, 1.75]} shadows gl={{ alpha: true, antialias: true }}>
        <color attach="background" args={["#f8f4ed"]} />
        <ambientLight intensity={1.35} />
        <directionalLight castShadow intensity={2.25} position={[3.2, 4.8, 4.2]} shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <directionalLight intensity={1.1} position={[-4, 1.8, -3]} />
        <PouchMesh frontTexture={frontTexture} backTexture={backTexture} alt={alt} rotation={rotation} slim={slim} />
        <ContactShadows position={[0, -1.17, 0]} opacity={0.28} scale={4.7} blur={2.7} far={2.2} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
