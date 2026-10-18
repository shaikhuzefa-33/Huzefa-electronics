/**
 * Huzefa Electronics - Immersive 3D WebGL Showroom Engine
 * High-Fidelity Procedural 3D Models & Studio Lighting
 * Built with Three.js (r128 compatible)
 */

(function (window) {
  'use strict';

  // Helper: Dispose hierarchy to prevent memory leaks
  function disposeHierarchy(obj) {
    if (!obj) return;
    obj.traverse((child) => {
      if (child.isMesh) {
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

  // Create single sculpted earbud
  function createSingleEarbud(titaniumMat, chromeMat, accentMat) {
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

  // Procedural 3D Model Factory for 6 Flagship Electronics
  function buildProduct3D(type, accentHex) {
    const group = new THREE.Group();
    const accentColor = new THREE.Color(accentHex || '#0E4D57');

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x8b9095,
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
      emissive: accentColor.clone().multiplyScalar(0.25),
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      metalness: 0.75,
      roughness: 0.25,
      emissive: accentColor.clone().multiplyScalar(0.3),
    });

    const emissiveTeal = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
    });

    switch (type) {
      case 'laptop': {
        // 1. Titan Blade 18 Pro Gaming Laptop
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

        // Display Screen Lid (Open at ~115 degrees)
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

        screenGroup.rotation.x = -Math.PI * 0.28;
        group.add(screenGroup);
        group.position.y = -0.3;
        break;
      }

      case 'phone': {
        // 2. UltraVision Pro 5G Flagship Smartphone
        // Rounded Titanium Slab
        const bodyGeo = new THREE.BoxGeometry(1.25, 2.45, 0.12);
        const body = new THREE.Mesh(bodyGeo, titaniumMat);
        body.castShadow = true;
        group.add(body);

        // Glass Front Display
        const screenGeo = new THREE.BoxGeometry(1.2, 2.38, 0.02);
        const screen = new THREE.Mesh(screenGeo, glassScreenMat);
        screen.position.z = 0.06;
        group.add(screen);

        // Camera Bump on Rear
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

          const innerGlassGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.09, 24);
          innerGlassGeo.rotateX(Math.PI / 2);
          const innerGlass = new THREE.Mesh(innerGlassGeo, glassScreenMat);
          innerGlass.position.set(0.28, lensY, -0.105);
          group.add(innerGlass);
        }

        // Dynamic Island Front Pill
        const pillGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.2, 16);
        pillGeo.rotateZ(Math.PI / 2);
        const pill = new THREE.Mesh(pillGeo, new THREE.MeshBasicMaterial({ color: 0x000000 }));
        pill.position.set(0, 1.05, 0.072);
        group.add(pill);

        // Side Titanium Accent Chamfer
        const trimGeo = new THREE.BoxGeometry(1.26, 2.46, 0.04);
        const trim = new THREE.Mesh(trimGeo, accentMat);
        group.add(trim);
        break;
      }

      case 'tv': {
        // 3. Cinematic Master 77" 8K OLED evo TV
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

        // Ambient Rear Bias Glow Strip
        const biasGlowGeo = new THREE.PlaneGeometry(3.7, 2.15);
        const biasMat = new THREE.MeshBasicMaterial({
          color: 0x00e5ff,
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
        // 4. Acoustic Pro Spatial ANC Earbuds
        // Glossy Charging Case
        const caseGeo = new THREE.CylinderGeometry(0.7, 0.7, 0.85, 32);
        caseGeo.scale(1.25, 1, 0.8);
        const caseMesh = new THREE.Mesh(caseGeo, darkAlumMat);
        caseMesh.position.set(0, -0.4, 0);
        caseMesh.castShadow = true;
        group.add(caseMesh);

        // Case Lid Seam
        const seamGeo = new THREE.CylinderGeometry(0.705, 0.705, 0.02, 32);
        seamGeo.scale(1.26, 1, 0.81);
        const seam = new THREE.Mesh(seamGeo, chromeMat);
        seam.position.set(0, -0.18, 0);
        group.add(seam);

        // Status LED Dot
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
        // 5. Chronos Titanium Elite Smart Watch
        // 49mm Titanium Case
        const caseGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.25, 48);
        const watchCase = new THREE.Mesh(caseGeo, titaniumMat);
        watchCase.rotation.x = Math.PI / 2;
        watchCase.castShadow = true;
        group.add(watchCase);

        // Bezel Ring
        const bezelGeo = new THREE.TorusGeometry(0.94, 0.05, 16, 48);
        const bezel = new THREE.Mesh(bezelGeo, chromeMat);
        group.add(bezel);

        // Sapphire Crystal Face
        const faceGeo = new THREE.CircleGeometry(0.88, 48);
        const face = new THREE.Mesh(faceGeo, glassScreenMat);
        face.position.z = 0.13;
        group.add(face);

        // Rotating Digital Crown with accent ring
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

        // Watch Hands
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

        // Straps
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
        // 6. Alpha Cine 8K Cinema Camera
        const bodyGeo = new THREE.BoxGeometry(1.9, 1.25, 0.85);
        const body = new THREE.Mesh(bodyGeo, darkAlumMat);
        body.castShadow = true;
        group.add(body);

        // Ergonomic Grip
        const gripGeo = new THREE.BoxGeometry(0.45, 1.2, 0.7);
        const gripMat = new THREE.MeshStandardMaterial({
          color: 0x0a1012,
          roughness: 0.85,
        });
        const grip = new THREE.Mesh(gripGeo, gripMat);
        grip.position.set(0.8, -0.02, 0.3);
        group.add(grip);

        // Viewfinder Prism
        const prismGeo = new THREE.ConeGeometry(0.45, 0.35, 4);
        prismGeo.rotateY(Math.PI / 4);
        const prism = new THREE.Mesh(prismGeo, titaniumMat);
        prism.position.set(-0.1, 0.78, 0);
        group.add(prism);

        // Pro Lens Barrel
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
          color: 0x00e5ff,
          metalness: 0.95,
          roughness: 0.05,
          transparent: true,
          opacity: 0.85,
        });
        const opticGlass = new THREE.Mesh(glassElemGeo, opticMat);
        opticGlass.position.z = 0.72;
        lensGroup.add(opticGlass);

        group.add(lensGroup);

        // Shutter Dial
        const dialGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 24);
        const dial = new THREE.Mesh(dialGeo, chromeMat);
        dial.position.set(0.72, 0.68, 0.15);
        group.add(dial);
        break;
      }
    }

    return group;
  }

  // Showcase 3D Viewport Class
  class HuzefaShowroomViewer {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) {
        console.warn('HuzefaShowroomViewer: Container not found');
        return;
      }

      this.options = Object.assign(
        {
          modelType: 'laptop',
          accentColor: '#0E4D57',
          isAutoRotating: true,
          showParticles: true,
          cameraZ: 4.5,
        },
        options
      );

      this.modelType = this.options.modelType;
      this.accentColor = this.options.accentColor;
      this.isAutoRotating = this.options.isAutoRotating;

      this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isDown: false, prevX: 0, prevY: 0 };
      this.rotationOffset = { x: 0, y: 0 };
      this.animFrameId = null;

      this.initScene();
      this.bindEvents();
      this.loadModel(this.modelType, this.accentColor);
      this.animate();
    }

    initScene() {
      const width = this.container.clientWidth || 600;
      const height = this.container.clientHeight || 500;

      // 1. Scene
      this.scene = new THREE.Scene();

      // 2. Camera
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      this.camera.position.set(0, 0.5, this.options.cameraZ);

      // 3. Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (THREE.ACESFilmicToneMapping) {
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.35;
      }
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      this.container.innerHTML = '';
      this.container.appendChild(this.renderer.domElement);

      // 4. Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      this.scene.add(ambientLight);

      // Key Light (Crisp Silver Key)
      const keyLight = new THREE.DirectionalLight(0xf1f5f9, 2.2);
      keyLight.position.set(4, 5, 4);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      this.scene.add(keyLight);

      // Rim Light (Signature Luxury Teal)
      const rimLight = new THREE.DirectionalLight(0x00d4e8, 2.4);
      rimLight.position.set(-4, 3, -3);
      this.scene.add(rimLight);

      // Soft Matte Gray Fill
      const fillLight = new THREE.DirectionalLight(0x8b9095, 1.2);
      fillLight.position.set(0, -3, 3);
      this.scene.add(fillLight);

      // Subtle Showroom Ground Reflection Plane
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
      this.scene.add(ground);

      // Stardust Particles
      if (this.options.showParticles) {
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
          color: 0x8b9095,
          size: 0.035,
          transparent: true,
          opacity: 0.65,
        });
        this.particles = new THREE.Points(particleGeo, particleMat);
        this.scene.add(this.particles);
      }

      // Main Product Group
      this.productGroup = new THREE.Group();
      this.scene.add(this.productGroup);
    }

    loadModel(type, accentColor) {
      if (!this.productGroup) return;

      this.modelType = type;
      if (accentColor) this.accentColor = accentColor;

      // Clean previous model
      if (this.currentModel) {
        this.productGroup.remove(this.currentModel);
        disposeHierarchy(this.currentModel);
        this.currentModel = null;
      }

      // Generate new procedural model
      const newModel = buildProduct3D(type, this.accentColor);
      newModel.scale.set(0.01, 0.01, 0.01);
      this.productGroup.add(newModel);
      this.currentModel = newModel;

      // Smooth Scale In Animation
      let start = performance.now();
      const duration = 450;
      const animateScale = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        if (newModel) {
          newModel.scale.set(ease, ease, ease);
        }
        if (p < 1) requestAnimationFrame(animateScale);
      };
      requestAnimationFrame(animateScale);
    }

    setAccentColor(colorHex) {
      this.accentColor = colorHex;
      this.loadModel(this.modelType, colorHex);
    }

    setAutoRotate(enabled) {
      this.isAutoRotating = !!enabled;
    }

    bindEvents() {
      const container = this.container;

      this.handleMouseMove = (e) => {
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        this.mouse.targetX = normX;
        this.mouse.targetY = normY;

        if (this.mouse.isDown) {
          const deltaX = e.clientX - this.mouse.prevX;
          const deltaY = e.clientY - this.mouse.prevY;
          this.rotationOffset.y += deltaX * 0.012;
          this.rotationOffset.x += deltaY * 0.012;
          this.mouse.prevX = e.clientX;
          this.mouse.prevY = e.clientY;
        }
      };

      this.handleMouseDown = (e) => {
        this.mouse.isDown = true;
        this.mouse.prevX = e.clientX;
        this.mouse.prevY = e.clientY;
      };

      this.handleMouseUp = () => {
        this.mouse.isDown = false;
      };

      this.handleTouchMove = (e) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          const rect = container.getBoundingClientRect();
          this.mouse.targetX = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
          this.mouse.targetY = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);

          if (this.mouse.isDown) {
            const deltaX = touch.clientX - this.mouse.prevX;
            const deltaY = touch.clientY - this.mouse.prevY;
            this.rotationOffset.y += deltaX * 0.012;
            this.rotationOffset.x += deltaY * 0.012;
            this.mouse.prevX = touch.clientX;
            this.mouse.prevY = touch.clientY;
          }
        }
      };

      this.handleTouchStart = (e) => {
        if (e.touches.length > 0) {
          this.mouse.isDown = true;
          this.mouse.prevX = e.touches[0].clientX;
          this.mouse.prevY = e.touches[0].clientY;
        }
      };

      window.addEventListener('mousemove', this.handleMouseMove);
      container.addEventListener('mousedown', this.handleMouseDown);
      window.addEventListener('mouseup', this.handleMouseUp);
      container.addEventListener('touchstart', this.handleTouchStart, { passive: true });
      container.addEventListener('touchmove', this.handleTouchMove, { passive: true });
      window.addEventListener('touchend', this.handleMouseUp);

      // Resize observer
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0 && this.camera && this.renderer) {
            this.camera.aspect = width / height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(width, height);
          }
        }
      });
      this.resizeObserver.observe(container);
    }

    animate() {
      this.clock = this.clock || new THREE.Clock();

      const loop = () => {
        this.animFrameId = requestAnimationFrame(loop);
        const elapsed = this.clock.getElapsedTime();

        // Smooth mouse damping
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.06;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.06;

        // Particle subtle rotation
        if (this.particles) {
          this.particles.rotation.y = elapsed * 0.04;
          this.particles.rotation.x = Math.sin(elapsed * 0.03) * 0.1;
        }

        // Product animation
        if (this.productGroup) {
          // Floating bob
          this.productGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;

          if (this.isAutoRotating && !this.mouse.isDown) {
            this.rotationOffset.y += 0.015;
            this.rotationOffset.x *= 0.98;
          }

          this.productGroup.rotation.y = this.rotationOffset.y + this.mouse.x * 0.35;
          this.productGroup.rotation.x = this.rotationOffset.x + this.mouse.y * 0.25;
        }

        this.renderer.render(this.scene, this.camera);
      };

      loop();
    }

    destroy() {
      if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
      window.removeEventListener('mousemove', this.handleMouseMove);
      this.container.removeEventListener('mousedown', this.handleMouseDown);
      window.removeEventListener('mouseup', this.handleMouseUp);
      this.container.removeEventListener('touchstart', this.handleTouchStart);
      this.container.removeEventListener('touchmove', this.handleTouchMove);
      window.removeEventListener('touchend', this.handleMouseUp);
      if (this.resizeObserver) this.resizeObserver.disconnect();
      if (this.currentModel) disposeHierarchy(this.currentModel);
      if (this.renderer) this.renderer.dispose();
      this.container.innerHTML = '';
    }
  }

  // Expose globally
  window.HuzefaShowroomViewer = HuzefaShowroomViewer;
  window.buildProduct3D = buildProduct3D;
})(window);
