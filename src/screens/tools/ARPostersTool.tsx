import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import {
  ArrowLeft01Icon,
  Image02Icon,
  SparklesIcon,
  Camera01Icon,
  Download04Icon,
  Share08Icon,
  Rotate01Icon,
  ViewIcon,
  GridIcon
} from 'hugeicons-react';
import { aiAPI } from '../../services/api';
import { useCredits } from '../../context/TokenContext';

type Step = 'select-poster' | 'ar-mode' | 'result';

interface PosterTemplate {
  id: number;
  name: string;
  preview: string;
  category: string;
}

const posterTemplates: PosterTemplate[] = [
  { id: 1, name: 'Movie Night', preview: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400', category: 'Entertainment' },
  { id: 2, name: 'Motivational', preview: 'https://images.unsplash.com/photo-1534081333815-ae5019106622?w=400', category: 'Inspire' },
  { id: 3, name: 'Concert Vibes', preview: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400', category: 'Music' },
  { id: 4, name: 'Product Launch', preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', category: 'Business' },
  { id: 5, name: 'Event Promo', preview: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400', category: 'Events' },
  { id: 6, name: 'Art Exhibition', preview: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400', category: 'Art' },
];

const ARPostersTool: React.FC = () => {
  const navigate = useNavigate();
  const { balance, spendCredits } = useCredits();
  const [currentStep, setCurrentStep] = useState<Step>('select-poster');
  const [selectedPoster, setSelectedPoster] = useState<PosterTemplate | null>(null);
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const arSceneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const TOOL_COST = 3;

  const handleGeneratePoster = async (template: PosterTemplate) => {
    if (balance < TOOL_COST) {
      alert(`Insufficient credits! You need ${TOOL_COST} credits. Current balance: ${balance}`);
      navigate('/wallet');
      return;
    }

    setSelectedPoster(template);
    setIsGenerating(true);

    try {
      const result = await aiAPI.generateARPoster({
        style: template.category,
        title: template.name,
      });

      if (result.success && result.imageUrl) {
        setGeneratedPoster(result.imageUrl);
        spendCredits(TOOL_COST, `AR Poster - ${template.name}`);
        setCurrentStep('ar-mode');
      } else {
        throw new Error(result.error || 'Generation failed');
      }
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEnterAR = async () => {
    setIsARActive(true);

    try {
      // Request camera permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Initialize AR scene after a short delay to ensure DOM is ready
      setTimeout(() => {
        initializeARScene();
      }, 500);
    } catch (error) {
      console.error('Camera access error:', error);
      alert('Camera access is required for AR features. Please grant permission.');
      setIsARActive(false);
    }
  };

  const initializeARScene = () => {
    if (!arSceneRef.current || !generatedPoster) return;

    // Create A-Frame scene dynamically
    const scene = document.createElement('a-scene');
    scene.setAttribute('mindar-image', 'imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/image-tracking/assets/card-example/card.mind;');
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
    camera.setAttribute('position', '0 0 0');
    camera.setAttribute('look-controls', 'enabled: false');
    scene.appendChild(camera);

    // Create AR target
    const entity = document.createElement('a-entity');
    entity.setAttribute('mindar-image-target', 'targetIndex: 0');

    // Create poster plane with image
    const plane = document.createElement('a-plane');
    plane.setAttribute('src', generatedPoster);
    plane.setAttribute('position', '0 0 0');
    plane.setAttribute('height', '0.552');
    plane.setAttribute('width', '1');
    plane.setAttribute('rotation', '0 0 0');

    // Add animations
    plane.setAttribute('animation', 'property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear');
    plane.setAttribute('animation__scale', 'property: scale; from: 0.8 0.8 0.8; to: 1 1 1; dir: alternate; loop: true; dur: 2000; easing: easeInOutQuad');

    // Add particle effects (glowing border)
    const glow = document.createElement('a-plane');
    glow.setAttribute('position', '0 0 -0.01');
    glow.setAttribute('height', '0.6');
    glow.setAttribute('width', '1.08');
    glow.setAttribute('color', '#00ff88');
    glow.setAttribute('opacity', '0.3');
    glow.setAttribute('animation', 'property: opacity; from: 0.3; to: 0.7; dir: alternate; loop: true; dur: 1500');

    entity.appendChild(glow);
    entity.appendChild(plane);
    scene.appendChild(entity);

    arSceneRef.current.appendChild(scene);
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
      setCurrentStep('result');
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
      link.download = 'ar-poster.png';
      link.href = capturedImage;
      link.click();
    }
  };

  const handlePublish = () => {
    alert('AR Poster published to Discovery Feed!');
    navigate('/discover');
  };

  const handleTryAgain = () => {
    handleExitAR();
    setCurrentStep('select-poster');
    setSelectedPoster(null);
    setGeneratedPoster(null);
    setCapturedImage(null);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      handleExitAR();
    };
  }, []);

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
            onClick={() => navigate('/tools')}
            className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft01Icon size={20} color="#ffffff" />
          </button>
          <h1 className="text-xl font-bold text-white">AR Posters</h1>
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
        {currentStep === 'select-poster' && (
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <GridIcon size={24} color="#ffffff" />
                </div>
                <div>
                  <h2 className="font-bold text-white text-lg mb-2">AR Poster Experience</h2>
                  <p className="text-sm text-white/70 mb-3">
                    Generate AI posters and place them in your real environment with stunning 3D animations
                  </p>
                  <div className="flex items-center gap-2 text-amber-400">
                    <SparklesIcon size={16} />
                    <span className="text-sm font-semibold">{TOOL_COST} credits per poster</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Poster Templates Grid */}
            <div>
              <h3 className="text-white font-bold text-base mb-4">Choose a Poster Style</h3>
              <div className="grid grid-cols-2 gap-4">
                {posterTemplates.map((template, index) => (
                  <button
                    key={template.id}
                    onClick={() => handleGeneratePoster(template)}
                    disabled={isGenerating}
                    className="rounded-2xl overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 group relative"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    }}
                  >
                    <div className="aspect-[3/4] relative">
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="font-bold text-white text-sm mb-1">{template.name}</h4>
                        <p className="text-xs text-white/70">{template.category}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {isGenerating && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-white font-semibold">Generating your AR poster...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 'ar-mode' && !isARActive && (
          <div className="space-y-6">
            {/* Preview */}
            <div className="rounded-3xl overflow-hidden">
              <img src={generatedPoster || ''} alt="Generated Poster" className="w-full" />
            </div>

            {/* Instructions */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <h3 className="font-bold text-white text-lg mb-4">Enter AR Mode</h3>
              <ul className="space-y-2 text-sm text-white/70 mb-6">
                <li className="flex items-start gap-2">
                  <ViewIcon size={16} className="mt-0.5 flex-shrink-0" color="#00ff88" />
                  <span>Point your camera at a flat surface or wall</span>
                </li>
                <li className="flex items-start gap-2">
                  <GridIcon size={16} className="mt-0.5 flex-shrink-0" color="#00ff88" />
                  <span>Tap to place the animated poster in your space</span>
                </li>
                <li className="flex items-start gap-2">
                  <Camera01Icon size={16} className="mt-0.5 flex-shrink-0" color="#00ff88" />
                  <span>Capture photos or videos of your AR creation</span>
                </li>
              </ul>
              <button
                onClick={handleEnterAR}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 rounded-2xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Camera01Icon size={20} />
                Enter AR Mode
              </button>
            </div>

            <Button
              onClick={handleTryAgain}
              variant="secondary"
              fullWidth
            >
              Try Different Poster
            </Button>
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
                onClick={() => {}}
                className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30"
              >
                <Rotate01Icon size={24} color="#ffffff" />
              </button>
            </div>

            {/* AR Instructions */}
            <div className="absolute top-20 left-0 right-0 flex justify-center">
              <div className="bg-black/60 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20">
                <p className="text-white text-sm">Point camera at a surface to place poster</p>
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
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
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
              Create Another
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ARPostersTool;
