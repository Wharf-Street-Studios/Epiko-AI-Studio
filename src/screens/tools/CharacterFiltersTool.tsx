import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import {
  ArrowLeft01Icon,
  SparklesIcon,
  Camera01Icon,
  Download04Icon,
  Share08Icon,
  Rotate01Icon,
  UserIcon,
  SmileDizzyIcon,
  MagicWand02Icon
} from 'hugeicons-react';
import { useCredits } from '../../context/TokenContext';

type FilterMode = 'face' | 'character';
type Step = 'select-mode' | 'select-filter' | 'ar-mode' | 'result';

interface Filter {
  id: number;
  name: string;
  type: FilterMode;
  preview: string;
  description: string;
  effect: string;
}

const filters: Filter[] = [
  // Face Filters
  { id: 1, name: 'Sparkle Glow', type: 'face', preview: 'https://images.unsplash.com/photo-1514846326710-096e4a8035e0?w=300', description: 'Glowing particles', effect: 'sparkle' },
  { id: 2, name: 'Galaxy Eyes', type: 'face', preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300', description: 'Cosmic eye effect', effect: 'galaxy' },
  { id: 3, name: 'Rainbow Aura', type: 'face', preview: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300', description: 'Colorful halo', effect: 'rainbow' },
  { id: 4, name: 'Neon Outline', type: 'face', preview: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300', description: 'Glowing edges', effect: 'neon' },
  { id: 5, name: 'Cyber Mask', type: 'face', preview: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300', description: 'Futuristic overlay', effect: 'cyber' },
  { id: 6, name: 'Crystal Crown', type: 'face', preview: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300', description: 'Magical headpiece', effect: 'crown' },

  // Character Filters
  { id: 7, name: 'Fantasy Dragon', type: 'character', preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300', description: '3D dragon companion', effect: 'dragon' },
  { id: 8, name: 'Cute Robot', type: 'character', preview: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300', description: 'Friendly AI robot', effect: 'robot' },
  { id: 9, name: 'Magic Butterfly', type: 'character', preview: 'https://images.unsplash.com/photo-1517427411088-3e03a5d3b78c?w=300', description: 'Animated butterfly', effect: 'butterfly' },
  { id: 10, name: 'Hologram Avatar', type: 'character', preview: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=300', description: 'Futuristic clone', effect: 'hologram' },
  { id: 11, name: 'Pet Companion', type: 'character', preview: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300', description: 'Virtual pet', effect: 'pet' },
  { id: 12, name: 'Cosmic Being', type: 'character', preview: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300', description: 'Ethereal figure', effect: 'cosmic' },
];

const CharacterFiltersTool: React.FC = () => {
  const navigate = useNavigate();
  const { balance, spendCredits } = useCredits();
  const [currentStep, setCurrentStep] = useState<Step>('select-mode');
  const [selectedMode, setSelectedMode] = useState<FilterMode | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Filter | null>(null);
  const [isARActive, setIsARActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const arSceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const TOOL_COST = 2;

  const handleSelectMode = (mode: FilterMode) => {
    setSelectedMode(mode);
    setCurrentStep('select-filter');
  };

  const handleSelectFilter = (filter: Filter) => {
    if (balance < TOOL_COST) {
      alert(`Insufficient credits! You need ${TOOL_COST} credits. Current balance: ${balance}`);
      navigate('/wallet');
      return;
    }

    setSelectedFilter(filter);
    spendCredits(TOOL_COST, `AR Filter - ${filter.name}`);
    handleEnterAR(filter);
  };

  const handleEnterAR = async (filter: Filter) => {
    setIsARActive(true);
    setCurrentStep('ar-mode');

    try {
      // Request camera permissions - front camera for face filters, back for characters
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: filter.type === 'face' ? 'user' : 'environment' },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Initialize AR scene after DOM is ready
      setTimeout(() => {
        if (filter.type === 'face') {
          initializeFaceTracking(filter);
        } else {
          initializeCharacterPlacement(filter);
        }
      }, 500);
    } catch (error) {
      console.error('Camera access error:', error);
      alert('Camera access is required for AR filters. Please grant permission.');
      setIsARActive(false);
      setCurrentStep('select-filter');
    }
  };

  const initializeFaceTracking = (filter: Filter) => {
    if (!arSceneRef.current) return;

    // Create A-Frame scene for face tracking
    const scene = document.createElement('a-scene');
    scene.setAttribute('mindar-face', 'autoStart: true');
    scene.setAttribute('color-space', 'sRGB');
    scene.setAttribute('renderer', 'colorManagement: true, physicallyCorrectLights');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.setAttribute('device-orientation-permission-ui', 'enabled: false');
    scene.style.position = 'absolute';
    scene.style.top = '0';
    scene.style.left = '0';
    scene.style.width = '100%';
    scene.style.height = '100%';

    // Create camera
    const camera = document.createElement('a-camera');
    camera.setAttribute('active', 'false');
    camera.setAttribute('position', '0 0 0');
    scene.appendChild(camera);

    // Create face anchor
    const faceEntity = document.createElement('a-entity');
    faceEntity.setAttribute('mindar-face-target', 'anchorIndex: 1');

    // Add filter effect based on type
    switch (filter.effect) {
      case 'sparkle':
        // Glowing particles
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('a-sphere');
          const x = (Math.random() - 0.5) * 0.3;
          const y = (Math.random() - 0.5) * 0.3;
          const z = (Math.random() - 0.5) * 0.1;
          particle.setAttribute('position', `${x} ${y} ${z}`);
          particle.setAttribute('radius', '0.005');
          particle.setAttribute('color', '#00ff88');
          particle.setAttribute('opacity', '0.8');
          particle.setAttribute('animation', `property: position; to: ${x} ${y + 0.2} ${z}; loop: true; dur: ${2000 + Math.random() * 1000}; easing: linear`);
          particle.setAttribute('animation__opacity', 'property: opacity; from: 0.8; to: 0; loop: true; dur: 2000');
          faceEntity.appendChild(particle);
        }
        break;

      case 'galaxy':
        // Eye glow effect
        const leftEye = document.createElement('a-sphere');
        leftEye.setAttribute('position', '-0.06 0.05 0.05');
        leftEye.setAttribute('radius', '0.02');
        leftEye.setAttribute('color', '#4c1d95');
        leftEye.setAttribute('opacity', '0.7');
        leftEye.setAttribute('animation', 'property: scale; from: 1 1 1; to: 1.2 1.2 1.2; dir: alternate; loop: true; dur: 1000');
        faceEntity.appendChild(leftEye);

        const rightEye = document.createElement('a-sphere');
        rightEye.setAttribute('position', '0.06 0.05 0.05');
        rightEye.setAttribute('radius', '0.02');
        rightEye.setAttribute('color', '#4c1d95');
        rightEye.setAttribute('opacity', '0.7');
        rightEye.setAttribute('animation', 'property: scale; from: 1 1 1; to: 1.2 1.2 1.2; dir: alternate; loop: true; dur: 1000');
        faceEntity.appendChild(rightEye);
        break;

      case 'crown':
        // Simple crown
        const crown = document.createElement('a-cone');
        crown.setAttribute('position', '0 0.18 0');
        crown.setAttribute('radius-bottom', '0.08');
        crown.setAttribute('radius-top', '0.02');
        crown.setAttribute('height', '0.12');
        crown.setAttribute('color', '#ffd700');
        crown.setAttribute('metalness', '0.8');
        crown.setAttribute('roughness', '0.2');
        crown.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 3000; easing: linear');
        faceEntity.appendChild(crown);
        break;

      case 'neon':
        // Neon outline
        const outline = document.createElement('a-ring');
        outline.setAttribute('position', '0 0 0.05');
        outline.setAttribute('radius-inner', '0.15');
        outline.setAttribute('radius-outer', '0.18');
        outline.setAttribute('color', '#00ffff');
        outline.setAttribute('opacity', '0.8');
        outline.setAttribute('animation', 'property: scale; from: 1 1 1; to: 1.1 1.1 1.1; dir: alternate; loop: true; dur: 800');
        faceEntity.appendChild(outline);
        break;

      default:
        // Default sparkle effect
        const defaultSphere = document.createElement('a-sphere');
        defaultSphere.setAttribute('position', '0 0.15 0');
        defaultSphere.setAttribute('radius', '0.03');
        defaultSphere.setAttribute('color', '#ff00ff');
        defaultSphere.setAttribute('opacity', '0.7');
        defaultSphere.setAttribute('animation', 'property: position; to: 0 0.2 0; dir: alternate; loop: true; dur: 1500');
        faceEntity.appendChild(defaultSphere);
    }

    scene.appendChild(faceEntity);
    arSceneRef.current.appendChild(scene);
  };

  const initializeCharacterPlacement = (filter: Filter) => {
    if (!arSceneRef.current) return;

    // Create A-Frame scene for character placement (simplified, no image tracking needed)
    const scene = document.createElement('a-scene');
    scene.setAttribute('embedded', '');
    scene.setAttribute('vr-mode-ui', 'enabled: false');
    scene.style.position = 'absolute';
    scene.style.top = '0';
    scene.style.left = '0';
    scene.style.width = '100%';
    scene.style.height = '100%';

    // Create camera
    const camera = document.createElement('a-entity');
    camera.setAttribute('camera', '');
    camera.setAttribute('position', '0 0 0');
    scene.appendChild(camera);

    // Create character based on effect
    const character = document.createElement('a-entity');
    character.setAttribute('position', '0 0 -2');

    switch (filter.effect) {
      case 'dragon':
        // Simple dragon representation
        const dragonBody = document.createElement('a-sphere');
        dragonBody.setAttribute('radius', '0.3');
        dragonBody.setAttribute('color', '#8b0000');
        character.appendChild(dragonBody);

        const dragonWing1 = document.createElement('a-plane');
        dragonWing1.setAttribute('position', '-0.4 0 0');
        dragonWing1.setAttribute('rotation', '0 0 45');
        dragonWing1.setAttribute('width', '0.5');
        dragonWing1.setAttribute('height', '0.3');
        dragonWing1.setAttribute('color', '#ff6347');
        dragonWing1.setAttribute('opacity', '0.7');
        dragonWing1.setAttribute('animation', 'property: rotation; to: 0 0 90; dir: alternate; loop: true; dur: 500');
        character.appendChild(dragonWing1);

        const dragonWing2 = document.createElement('a-plane');
        dragonWing2.setAttribute('position', '0.4 0 0');
        dragonWing2.setAttribute('rotation', '0 0 -45');
        dragonWing2.setAttribute('width', '0.5');
        dragonWing2.setAttribute('height', '0.3');
        dragonWing2.setAttribute('color', '#ff6347');
        dragonWing2.setAttribute('opacity', '0.7');
        dragonWing2.setAttribute('animation', 'property: rotation; to: 0 0 -90; dir: alternate; loop: true; dur: 500');
        character.appendChild(dragonWing2);
        break;

      case 'robot':
        // Simple robot
        const robotHead = document.createElement('a-box');
        robotHead.setAttribute('width', '0.3');
        robotHead.setAttribute('height', '0.3');
        robotHead.setAttribute('depth', '0.3');
        robotHead.setAttribute('color', '#silver');
        robotHead.setAttribute('metalness', '0.9');
        character.appendChild(robotHead);

        const robotEye1 = document.createElement('a-sphere');
        robotEye1.setAttribute('position', '-0.1 0.05 0.16');
        robotEye1.setAttribute('radius', '0.03');
        robotEye1.setAttribute('color', '#00ffff');
        robotEye1.setAttribute('animation', 'property: components.material.material.color; type: color; from: #00ffff; to: #ff0000; dir: alternate; loop: true; dur: 1000');
        character.appendChild(robotEye1);

        const robotEye2 = document.createElement('a-sphere');
        robotEye2.setAttribute('position', '0.1 0.05 0.16');
        robotEye2.setAttribute('radius', '0.03');
        robotEye2.setAttribute('color', '#00ffff');
        robotEye2.setAttribute('animation', 'property: components.material.material.color; type: color; from: #00ffff; to: #ff0000; dir: alternate; loop: true; dur: 1000');
        character.appendChild(robotEye2);
        break;

      case 'butterfly':
        // Butterfly
        const butterflyBody = document.createElement('a-cylinder');
        butterflyBody.setAttribute('radius', '0.02');
        butterflyBody.setAttribute('height', '0.2');
        butterflyBody.setAttribute('color', '#8b4513');
        character.appendChild(butterflyBody);

        const wing1 = document.createElement('a-circle');
        wing1.setAttribute('position', '-0.15 0.05 0');
        wing1.setAttribute('radius', '0.15');
        wing1.setAttribute('color', '#ff69b4');
        wing1.setAttribute('animation', 'property: rotation; to: 0 0 30; dir: alternate; loop: true; dur: 300; easing: easeInOutQuad');
        character.appendChild(wing1);

        const wing2 = document.createElement('a-circle');
        wing2.setAttribute('position', '0.15 0.05 0');
        wing2.setAttribute('radius', '0.15');
        wing2.setAttribute('color', '#ff69b4');
        wing2.setAttribute('animation', 'property: rotation; to: 0 0 -30; dir: alternate; loop: true; dur: 300; easing: easeInOutQuad');
        character.appendChild(wing2);
        break;

      default:
        // Default character - glowing orb
        const orb = document.createElement('a-sphere');
        orb.setAttribute('radius', '0.2');
        orb.setAttribute('color', '#00ff88');
        orb.setAttribute('opacity', '0.8');
        orb.setAttribute('animation', 'property: scale; from: 1 1 1; to: 1.2 1.2 1.2; dir: alternate; loop: true; dur: 1000');
        character.appendChild(orb);
    }

    // Add floating animation to character
    character.setAttribute('animation__float', 'property: position; to: 0 0.2 -2; dir: alternate; loop: true; dur: 2000; easing: easeInOutQuad');
    character.setAttribute('animation__rotate', 'property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear');

    scene.appendChild(character);
    arSceneRef.current.appendChild(scene);
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');

      // Draw video frame
      ctx?.drawImage(videoRef.current, 0, 0);

      // Note: In production, you'd need to overlay the AR scene
      // This is a simplified version
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
      setCurrentStep('result');
      handleExitAR();
    }
  };

  const handleExitAR = () => {
    setIsARActive(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    if (arSceneRef.current) {
      arSceneRef.current.innerHTML = '';
    }
  };

  const handleDownload = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.download = 'ar-filter.png';
      link.href = capturedImage;
      link.click();
    }
  };

  const handlePublish = () => {
    alert('AR Filter photo published to Discovery Feed!');
    navigate('/discover');
  };

  const handleTryAgain = () => {
    handleExitAR();
    setCurrentStep('select-mode');
    setSelectedMode(null);
    setSelectedFilter(null);
    setCapturedImage(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      handleExitAR();
    };
  }, []);

  const filteredFilters = selectedMode ? filters.filter(f => f.type === selectedMode) : [];

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header
        className="bg-black/60 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50"
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        }}
      >
        <div className="px-4 py-4 flex items-center justify-between max-w-2xl mx-auto">
          <button
            onClick={() => {
              if (currentStep === 'select-filter' && !isARActive) {
                setCurrentStep('select-mode');
              } else {
                navigate('/tools');
              }
            }}
            className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft01Icon size={20} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white">AR Filters</h1>
          <div className="flex items-center gap-2 px-3 py-2 backdrop-blur-md rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.3))',
              border: '1px solid rgba(251, 191, 36, 0.4)',
            }}>
            <SparklesIcon size={18} color="#fbbf24" />
            <span className="font-semibold text-white text-sm">{balance}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-2xl mx-auto">
        {currentStep === 'select-mode' && (
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MagicWand02Icon size={24} color="#ffffff" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-lg mb-2">AR Character Filters</h2>
                  <p className="text-sm text-white/70 mb-3">
                    Apply real-time face filters or place 3D characters in your environment
                  </p>
                  <div className="flex items-center gap-2 text-amber-400">
                    <SparklesIcon size={16} />
                    <span className="text-sm font-semibold">{TOOL_COST} credits per filter</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mode Selection */}
            <div>
              <h3 className="text-white font-bold text-base mb-4">Choose AR Mode</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSelectMode('face')}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/10 transition-all group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <SmileDizzyIcon size={32} color="#ffffff" />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">Face Filters</h4>
                  <p className="text-sm text-white/70">Real-time face tracking effects</p>
                </button>

                <button
                  onClick={() => handleSelectMode('character')}
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/10 transition-all group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UserIcon size={32} color="#ffffff" />
                  </div>
                  <h4 className="font-bold text-white text-lg mb-2">AR Characters</h4>
                  <p className="text-sm text-white/70">Place 3D characters in your space</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'select-filter' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold text-base mb-4">
                {selectedMode === 'face' ? 'Face Filters' : 'AR Characters'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {filteredFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleSelectFilter(filter)}
                    className="rounded-2xl overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 group relative"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    }}
                  >
                    <div className="aspect-square relative">
                      <img
                        src={filter.preview}
                        alt={filter.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="font-bold text-white text-sm mb-1">{filter.name}</h4>
                        <p className="text-xs text-white/70">{filter.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {isARActive && (
          <div className="fixed inset-0 z-50 bg-black">
            {/* AR View */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div ref={arSceneRef} className="absolute inset-0" />

            {/* AR Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-4 px-4">
              <button
                onClick={handleExitAR}
                className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30"
              >
                <ArrowLeft01Icon size={24} color="#ffffff" />
              </button>
              <button
                onClick={handleCapture}
                className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
              >
                <Camera01Icon size={28} color="#000000" />
              </button>
              <button
                onClick={() => {
                  if (videoRef.current?.srcObject) {
                    const stream = videoRef.current.srcObject as MediaStream;
                    const videoTrack = stream.getVideoTracks()[0];
                    const settings = videoTrack.getSettings();
                    const constraints = videoTrack.getConstraints();
                    // Toggle camera (simplified)
                    console.log('Toggle camera');
                  }
                }}
                className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30"
              >
                <Rotate01Icon size={24} color="#ffffff" />
              </button>
            </div>

            {/* AR Instructions */}
            <div className="absolute top-20 left-0 right-0 flex justify-center">
              <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
                <p className="text-white text-sm">
                  {selectedFilter?.type === 'face' ? 'Look at the camera' : 'Point at a surface to place character'}
                </p>
              </div>
            </div>
          </div>
        )}

        {currentStep === 'result' && capturedImage && (
          <div className="space-y-6">
            {/* Result Image */}
            <div className="rounded-3xl overflow-hidden">
              <img src={capturedImage} alt="AR Capture" className="w-full" />
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleDownload}
                className="bg-white/10 backdrop-blur-xl text-white border border-white/20 font-semibold py-3.5 rounded-xl hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Download04Icon size={20} />
                Download
              </button>
              <button
                onClick={handlePublish}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Share08Icon size={20} />
                Publish
              </button>
            </div>

            <Button
              onClick={handleTryAgain}
              variant="secondary"
              fullWidth
            >
              Try Another Filter
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CharacterFiltersTool;
