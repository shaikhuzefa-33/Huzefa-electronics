import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ProductModelType } from '../../types';

interface Hero3DCanvasProps {
  modelType: ProductModelType;
  accentColor?: string;
  isAutoRotating?: boolean;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({
  modelType,
  accentColor = '#0E4D57',
  isAutoRotating = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const productGroupRef = useRef<THREE.Group | null>(null);
  const currentModelRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isDown: false, prevX: 0, prevY: 0 });
  const rotationOffsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Studio Apple / Sony Showroom)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key Light (Crisp Silver Key)
    const keyLight = new THREE.DirectionalLight(0xf1f5f9, 2.2);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Rim Light (Signature Luxury Teal)
    const rimLight = new THREE.DirectionalLight(0x00d4e8, 2.4);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // Soft Matte Gray Fill
    const fillLight = new THREE.DirectionalLight(0x8B9095, 1.2);
    fillLight.position.set(0, -3, 3);
    scene.add(fillLight);

    // Subtle Showroom Ground Reflection
    const groundGeo = new THREE.PlaneGeometry(16, 16);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x072227,
      roughness: 0.4,
      metalness: 0.8,
      transparent: true,
      opacity: 0.45,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.35;
    ground.receiveShadow = true;
    scene.add(ground);

    // Floating Particles (Luxury stardust effect)
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8B9095,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Main Product Group
    const productGroup = new THREE.Group();
    scene.add(productGroup);
    productGroupRef.current = productGroup;

    // Mouse Parallax & Drag Handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;

      if (mouseRef.current.isDown) {
        const deltaX = e.clientX - mouseRef.current.prevX;
        const deltaY = e.clientY - mouseRef.current.prevY;
        rotationOffsetRef.current.y += deltaX * 0.012;
        rotationOffsetRef.current.x += deltaY * 0.012;
        mouseRef.current.prevX = e.clientX;
        mouseRef.current.prevY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouseRef.current.isDown = true;
      mouseRef.current.prevX = e.clientX;
      mouseRef.current.prevY = e.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        mouseRef.current.targetX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.targetY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0 && camera && renderer) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Particle floating
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = Math.sin(elapsed * 0.03) * 0.1;

      // Product animation
      if (productGroupRef.current) {
        // Subtle floating bounce
        productGroupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.08;

        if (isAutoRotating && !mouseRef.current.isDown) {
          rotationOffsetRef.current.y += 0.015;
          rotationOffsetRef.current.x *= 0.98; // Dampen X tilt
        }

        productGroupRef.current.rotation.y = rotationOffsetRef.current.y + mouseRef.current.x * 0.35;
        productGroupRef.current.rotation.x = rotationOffsetRef.current.x + mouseRef.current.y * 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchmove', handleTouchMove);
      resizeObserver.disconnect();
      renderer.dispose();
    };
  }, [isAutoRotating]);

  // Model builder when modelType or accentColor changes
  useEffect(() => {
    if (!productGroupRef.current) return;

    // Clear old model
    if (currentModelRef.current) {
      productGroupRef.current.remove(currentModelRef.current);
      disposeHierarchy(currentModelRef.current);
    }

    // Build new 3D procedural model based on category
    const newModel = buildProduct3D(modelType, accentColor);
    newModel.scale.set(0.01, 0.01, 0.01);
    productGroupRef.current.add(newModel);
    currentModelRef.current = newModel;

    // Animate scale up smoothly
    let start = performance.now();
    const duration = 500;
    const animateScale = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3); // ease-out cubic
      if (newModel) {
        newModel.scale.set(ease, ease, ease);
      }
      if (p < 1) requestAnimationFrame(animateScale);
    };
    requestAnimationFrame(animateScale);
  }, [modelType, accentColor]);

  return (
    <div
      ref={mountRef}
      className="relative w-full h-[460px] md:h-[540px] cursor-grab active:cursor-grabbing select-none flex items-center justify-center"
      title="Click and drag to rotate in 3D"
    />
  );
};

// Helper: Disposes geometries and materials to avoid memory leaks
function disposeHierarchy(obj: THREE.Object3D) {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    }
  });
}

// 3D Procedural Generator with High Material Fidelity
function buildProduct3D(type: ProductModelType, accentHex: string): THREE.Group {
  const group = new THREE.Group();

  const titaniumMat = new THREE.MeshStandardMaterial({
    color: 0x8B9095,
    metalness: 0.88,
    roughness: 0.22,
  });

  const darkAlumMat = new THREE.MeshStandardMaterial({
    color: 0x162429,
    metalness: 0.85,
    roughness: 0.35,
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xdde4eb,
    metalness: 0.95,
    roughness: 0.1,
  });

  const glassScreenMat = new THREE.MeshStandardMaterial({
    color: 0x051316,
    metalness: 0.9,
    roughness: 0.05,
    emissive: new THREE.Color(accentHex).multiplyScalar(0.2),
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(accentHex),
    metalness: 0.7,
    roughness: 0.25,
    emissive: new THREE.Color(accentHex).multiplyScalar(0.25),
  });

  const emissiveTeal = new THREE.MeshBasicMaterial({
    color: 0x00E5FF,
  });

  switch (type) {
    case 'laptop': {
      // Base Chassis
      const baseGeo = new THREE.BoxGeometry(2.5, 0.09, 1.7);
      const base = new THREE.Mesh(baseGeo, darkAlumMat);
      base.castShadow = true;
      base.receiveShadow = true;
      group.add(base);

      // Keyboard Recessed Area
      const kbGeo = new THREE.BoxGeometry(2.1, 0.02, 0.9);
      const kbMat = new THREE.MeshStandardMaterial({ color: 0x080c0e, roughness: 0.6 });
      const kb = new THREE.Mesh(kbGeo, kbMat);
      kb.position.set(0, 0.05, 0.1);
      group.add(kb);

      // Trackpad
      const trackpadGeo = new THREE.BoxGeometry(0.8, 0.01, 0.55);
      const trackpad = new THREE.Mesh(trackpadGeo, titaniumMat);
      trackpad.position.set(0, 0.05, -0.5);
      group.add(trackpad);

      // Display Screen Lid (Open at 115 degrees)
      const screenGroup = new THREE.Group();
      screenGroup.position.set(0, 0.045, 0.82);

      const lidGeo = new THREE.BoxGeometry(2.5, 1.6, 0.06);
      const lid = new THREE.Mesh(lidGeo, darkAlumMat);
      lid.position.set(0, 0.8, 0);
      lid.castShadow = true;
      screenGroup.add(lid);

      // Display Active Matrix
      const displayGeo = new THREE.BoxGeometry(2.38, 1.48, 0.01);
      const display = new THREE.Mesh(displayGeo, glassScreenMat);
      display.position.set(0, 0.8, -0.032);
      screenGroup.add(display);

      // Keyboard glow strip
      const glowGeo = new THREE.BoxGeometry(2.12, 0.01, 0.02);
      const glowMesh = new THREE.Mesh(glowGeo, emissiveTeal);
      glowMesh.position.set(0, 0.055, 0.56);
      group.add(glowMesh);

      // Huzefa Logo on Lid Exterior
      const logoGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.01, 32);
      const logoMesh = new THREE.Mesh(logoGeo, chromeMat);
      logoMesh.rotation.x = Math.PI / 2;
      logoMesh.position.set(0, 0.8, 0.035);
      screenGroup.add(logoMesh);

      screenGroup.rotation.x = -Math.PI * 0.28; // Opened backward
      group.add(screenGroup);
      group.position.y = -0.3;
      break;
    }

    case 'phone': {
      // Rounded Slim Phone Slab
      const bodyGeo = new THREE.BoxGeometry(1.25, 2.45, 0.12);
      const body = new THREE.Mesh(bodyGeo, titaniumMat);
      body.castShadow = true;
      group.add(body);

      // Glass Front Display
      const screenGeo = new THREE.BoxGeometry(1.2, 2.38, 0.02);
      const screen = new THREE.Mesh(screenGeo, glassScreenMat);
      screen.position.z = 0.06;
      group.add(screen);

      // Camera Island on Rear
      const camBumpGeo = new THREE.BoxGeometry(0.52, 0.75, 0.06);
      const camBump = new THREE.Mesh(camBumpGeo, darkAlumMat);
      camBump.position.set(0.28, 0.75, -0.08);
      group.add(camBump);

      // 3 Triple Optical Lenses with Chrome Bezel Rings
      for (let i = 0; i < 3; i++) {
        const lensGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.08, 24);
        lensGeo.rotateX(Math.PI / 2);
        const lens = new THREE.Mesh(lensGeo, chromeMat);
        const lensY = 0.95 - i * 0.22;
        lens.position.set(0.28, lensY, -0.1);
        group.add(lens);

        // Inner lens glass
        const innerGlassGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.09, 24);
        innerGlassGeo.rotateX(Math.PI / 2);
        const innerGlass = new THREE.Mesh(innerGlassGeo, glassScreenMat);
        innerGlass.position.set(0.28, lensY, -0.105);
        group.add(innerGlass);
      }

      // Dynamic Island / Front Camera Pill
      const pillGeo = new THREE.CapsuleGeometry(0.03, 0.12, 8, 16);
      pillGeo.rotateZ(Math.PI / 2);
      const pill = new THREE.Mesh(pillGeo, new THREE.MeshBasicMaterial({ color: 0x000000 }));
      pill.position.set(0, 1.05, 0.075);
      group.add(pill);

      // Side Titanium Accent Chamfer
      const trimGeo = new THREE.BoxGeometry(1.26, 2.46, 0.04);
      const trim = new THREE.Mesh(trimGeo, accentMat);
      group.add(trim);
      break;
    }

    case 'tv': {
      // 8K Cinema Master Screen
      const tvBodyGeo = new THREE.BoxGeometry(3.6, 2.05, 0.08);
      const tvBody = new THREE.Mesh(tvBodyGeo, darkAlumMat);
      tvBody.castShadow = true;
      group.add(tvBody);

      // Front OLED Glass
      const glassGeo = new THREE.BoxGeometry(3.52, 1.97, 0.02);
      const glass = new THREE.Mesh(glassGeo, glassScreenMat);
      glass.position.z = 0.045;
      group.add(glass);

      // Rear Electronics Module
      const rearGeo = new THREE.BoxGeometry(2.0, 1.2, 0.15);
      const rear = new THREE.Mesh(rearGeo, titaniumMat);
      rear.position.set(0, 0, -0.1);
      group.add(rear);

      // Ambient Bias Glow Strip behind TV
      const biasGlowGeo = new THREE.PlaneGeometry(3.7, 2.15);
      const biasMat = new THREE.MeshBasicMaterial({
        color: 0x00E5FF,
        transparent: true,
        opacity: 0.35,
        side: THREE.BackSide,
      });
      const biasGlow = new THREE.Mesh(biasGlowGeo, biasMat);
      biasGlow.position.z = -0.18;
      group.add(biasGlow);

      // Dual Pedestal Brushed Metal Feet
      const footGeo = new THREE.BoxGeometry(0.12, 0.45, 0.9);
      const footLeft = new THREE.Mesh(footGeo, chromeMat);
      footLeft.position.set(-1.2, -1.05, 0);
      footLeft.castShadow = true;
      group.add(footLeft);

      const footRight = new THREE.Mesh(footGeo, chromeMat);
      footRight.position.set(1.2, -1.05, 0);
      footRight.castShadow = true;
      group.add(footRight);
      break;
    }

    case 'earbuds': {
      // Case Body (Glossy unibody)
      const caseGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.85, 32);
      caseGeo.scale(1.25, 1, 0.8);
      const caseMesh = new THREE.Mesh(caseGeo, darkAlumMat);
      caseMesh.position.set(0, -0.4, 0);
      caseMesh.castShadow = true;
      group.add(caseMesh);

      // Case Silver Lid Seam
      const seamGeo = new THREE.CylinderGeometry(0.705, 0.705, 0.02, 32);
      seamGeo.scale(1.26, 1, 0.81);
      const seam = new THREE.Mesh(seamGeo, chromeMat);
      seam.position.set(0, -0.18, 0);
      group.add(seam);

      // Status LED dot
      const ledGeo = new THREE.SphereGeometry(0.04, 16, 16);
      const led = new THREE.Mesh(ledGeo, emissiveTeal);
      led.position.set(0, -0.28, 0.58);
      group.add(led);

      // Left Floating Earbud
      const leftEarbud = createSingleEarbud(titaniumMat, chromeMat, accentMat);
      leftEarbud.position.set(-0.65, 0.45, 0.2);
      leftEarbud.rotation.set(0.3, 0.4, -0.2);
      group.add(leftEarbud);

      // Right Floating Earbud
      const rightEarbud = createSingleEarbud(titaniumMat, chromeMat, accentMat);
      rightEarbud.position.set(0.65, 0.45, 0.2);
      rightEarbud.rotation.set(0.3, -0.4, 0.2);
      group.add(rightEarbud);
      break;
    }

    case 'watch': {
      // 49mm Titanium Case
      const caseGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.25, 48);
      const watchCase = new THREE.Mesh(caseGeo, titaniumMat);
      watchCase.rotation.x = Math.PI / 2;
      watchCase.castShadow = true;
      group.add(watchCase);

      // Bezel Ring with Chamfer
      const bezelGeo = new THREE.TorusGeometry(0.94, 0.05, 16, 48);
      const bezel = new THREE.Mesh(bezelGeo, chromeMat);
      group.add(bezel);

      // Sapphire Crystal Front Face
      const faceGeo = new THREE.CircleGeometry(0.88, 48);
      const face = new THREE.Mesh(faceGeo, glassScreenMat);
      face.position.z = 0.13;
      group.add(face);

      // Rotating Digital Crown with knurled orange/teal ring
      const crownGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.2, 24);
      crownGeo.rotateZ(Math.PI / 2);
      const crown = new THREE.Mesh(crownGeo, chromeMat);
      crown.position.set(1.04, 0.25, 0);
      group.add(crown);

      const crownAccentGeo = new THREE.CylinderGeometry(0.145, 0.145, 0.04, 24);
      crownAccentGeo.rotateZ(Math.PI / 2);
      const crownAccent = new THREE.Mesh(crownAccentGeo, accentMat);
      crownAccent.position.set(1.04, 0.25, 0);
      group.add(crownAccent);

      // Watch Luminous Hands
      const handHourGeo = new THREE.BoxGeometry(0.05, 0.45, 0.01);
      const handHour = new THREE.Mesh(handHourGeo, chromeMat);
      handHour.position.set(0.12, 0.18, 0.14);
      handHour.rotation.z = -0.8;
      group.add(handHour);

      const handMinGeo = new THREE.BoxGeometry(0.04, 0.65, 0.01);
      const handMin = new THREE.Mesh(handMinGeo, chromeMat);
      handMin.position.set(-0.15, 0.22, 0.14);
      handMin.rotation.z = 0.9;
      group.add(handMin);

      const secHandGeo = new THREE.BoxGeometry(0.015, 0.72, 0.01);
      const secHand = new THREE.Mesh(secHandGeo, emissiveTeal);
      secHand.position.set(0, 0, 0.145);
      group.add(secHand);

      // Strap (Top & Bottom Links)
      const strapGeo = new THREE.BoxGeometry(0.85, 1.2, 0.12);
      const strapTop = new THREE.Mesh(strapGeo, darkAlumMat);
      strapTop.position.set(0, 1.4, -0.05);
      strapTop.rotation.x = -0.25;
      group.add(strapTop);

      const strapBottom = new THREE.Mesh(strapGeo, darkAlumMat);
      strapBottom.position.set(0, -1.4, -0.05);
      strapBottom.rotation.x = 0.25;
      group.add(strapBottom);
      break;
    }

    case 'camera': {
      // Main Camera Body
      const bodyGeo = new THREE.BoxGeometry(1.9, 1.25, 0.85);
      const body = new THREE.Mesh(bodyGeo, darkAlumMat);
      body.castShadow = true;
      group.add(body);

      // Ergonomic Right Hand Grip
      const gripGeo = new THREE.BoxGeometry(0.45, 1.2, 0.7);
      const gripMat = new THREE.MeshStandardMaterial({
        color: 0x0a1012,
        roughness: 0.85,
      });
      const grip = new THREE.Mesh(gripGeo, gripMat);
      grip.position.set(0.8, -0.02, 0.3);
      group.add(grip);

      // Viewfinder Prism Top
      const prismGeo = new THREE.ConeGeometry(0.45, 0.35, 4);
      prismGeo.rotateY(Math.PI / 4);
      const prism = new THREE.Mesh(prismGeo, titaniumMat);
      prism.position.set(-0.1, 0.78, 0);
      group.add(prism);

      // Pro Lens Barrel (3-tier stepped cylinder)
      const lensGroup = new THREE.Group();
      lensGroup.position.set(-0.1, 0, 0.45);

      const barrelBaseGeo = new THREE.CylinderGeometry(0.55, 0.58, 0.45, 32);
      barrelBaseGeo.rotateX(Math.PI / 2);
      const barrelBase = new THREE.Mesh(barrelBaseGeo, darkAlumMat);
      lensGroup.add(barrelBase);

      const zoomRingGeo = new THREE.CylinderGeometry(0.53, 0.53, 0.35, 32);
      zoomRingGeo.rotateX(Math.PI / 2);
      const zoomRing = new THREE.Mesh(zoomRingGeo, titaniumMat);
      zoomRing.position.z = 0.35;
      lensGroup.add(zoomRing);

      const barrelTipGeo = new THREE.CylinderGeometry(0.58, 0.54, 0.25, 32);
      barrelTipGeo.rotateX(Math.PI / 2);
      const barrelTip = new THREE.Mesh(barrelTipGeo, chromeMat);
      barrelTip.position.z = 0.65;
      lensGroup.add(barrelTip);

      // Convex Front Optical Glass Element
      const glassElemGeo = new THREE.SphereGeometry(0.48, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4);
      glassElemGeo.rotateX(Math.PI / 2);
      const opticMat = new THREE.MeshStandardMaterial({
        color: 0x00E5FF,
        metalness: 0.95,
        roughness: 0.05,
        transparent: true,
        opacity: 0.85,
      });
      const opticGlass = new THREE.Mesh(glassElemGeo, opticMat);
      opticGlass.position.z = 0.72;
      lensGroup.add(opticGlass);

      group.add(lensGroup);

      // Top Shutter Dial
      const dialGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 24);
      const dial = new THREE.Mesh(dialGeo, chromeMat);
      dial.position.set(0.72, 0.68, 0.15);
      group.add(dial);
      break;
    }
  }

  return group;
}

// Sub-helper for sculpted earbud
function createSingleEarbud(
  titaniumMat: THREE.Material,
  chromeMat: THREE.Material,
  accentMat: THREE.Material
): THREE.Group {
  const g = new THREE.Group();

  // Head Acoustic Sphere
  const headGeo = new THREE.SphereGeometry(0.24, 24, 24);
  const head = new THREE.Mesh(headGeo, titaniumMat);
  g.add(head);

  // Soft Silicone Ear Tip
  const tipGeo = new THREE.ConeGeometry(0.18, 0.18, 24);
  tipGeo.rotateZ(Math.PI * 0.7);
  const tip = new THREE.Mesh(tipGeo, accentMat);
  tip.position.set(-0.16, 0.1, 0.08);
  g.add(tip);

  // Ergonomic Stem
  const stemGeo = new THREE.CylinderGeometry(0.06, 0.055, 0.55, 20);
  const stem = new THREE.Mesh(stemGeo, titaniumMat);
  stem.position.set(0.05, -0.32, 0);
  stem.rotation.z = -0.15;
  g.add(stem);

  // Metallic Charging Contact Tips
  const contactGeo = new THREE.CylinderGeometry(0.062, 0.062, 0.06, 20);
  const contact = new THREE.Mesh(contactGeo, chromeMat);
  contact.position.set(0.09, -0.58, 0);
  g.add(contact);

  return g;
}
