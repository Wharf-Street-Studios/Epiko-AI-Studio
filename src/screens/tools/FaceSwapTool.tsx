import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui';
import { ArrowLeft01Icon, Camera01Icon, Image02Icon, SparklesIcon, Download04Icon, Share08Icon, Rotate01Icon, UserIcon } from 'hugeicons-react';
import { aiAPI } from '../../services/api';

type Step = 'upload' | 'template' | 'generate' | 'result';

const templates = [
  { id: 1, name: 'Romantic Sunset', category: 'Romantic', Icon: SparklesIcon },
  { id: 2, name: 'Professional', category: 'Business', Icon: SparklesIcon },
  { id: 3, name: 'Vintage', category: 'Retro', Icon: Camera01Icon },
  { id: 4, name: 'Dreamy', category: 'Fantasy', Icon: SparklesIcon },
  { id: 5, name: 'Beach Vibes', category: 'Travel', Icon: SparklesIcon },
  { id: 6, name: 'City Lights', category: 'Urban', Icon: SparklesIcon },
];

const FaceSwapTool: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('upload');
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string);
        setCurrentStep('template');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
  };

  const handleGenerate = async () => {
    setCurrentStep('generate');
    setIsGenerating(true);
    setProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 300);

      // Call API with uploaded photo
      const result = await aiAPI.generateFaceSwap(
        uploadedPhoto || '',
        uploadedPhoto || '' // In demo mode, we use the same photo
      );

      clearInterval(progressInterval);
      setProgress(100);

      if (result.success && result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        setIsGenerating(false);
        setTimeout(() => {
          setCurrentStep('result');
        }, 500);
      } else {
        throw new Error(result.error || 'Generation failed');
      }
    } catch (error: any) {
      setIsGenerating(false);
      alert(`Error generating image: ${error.message}`);
      setCurrentStep('template');
    }
  };

  const handlePublish = () => {
    alert('Content published to Discovery Feed!');
    navigate('/discover');
  };

  const handleTryAgain = () => {
    setCurrentStep('upload');
    setUploadedPhoto(null);
    setSelectedTemplate(null);
    setGeneratedImage(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <header
        className="bg-black/60 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-10"
        style={{
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        }}
      >
        <div className="px-4 py-4 max-w-2xl mx-auto">
          <div className="flex items-center mb-2">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all backdrop-blur-md"
            >
              <ArrowLeft01Icon size={24} color="#ffffff" />
            </button>
            <h1 className="text-xl font-bold text-white ml-3 drop-shadow-lg">Face Swap</h1>
          </div>
          {/* Demo Mode Badge */}
          <div className="flex items-center justify-center">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full"
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            >
              <SparklesIcon size={14} color="#3b82f6" />
              <span className="text-xs font-semibold text-blue-400">Demo Mode</span>
            </div>
          </div>
        </div>
      </header>


      {/* Content */}
      <main className="px-4 py-6 max-w-2xl mx-auto">
        {/* Step 1: Upload Photo */}
        {currentStep === 'upload' && (
          <div>
            <div className="text-center mb-6">
              <div className="mb-4 flex justify-center">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl flex items-center justify-center border border-white/10">
                  <UserIcon size={48} color="#ffffff" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Upload Your Photo</h2>
              <p className="text-dark-500">Choose a clear photo with your face visible</p>
            </div>

            <input
              type="file"
              id="file-upload"
              accept="image/jpeg,image/png"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="block w-full h-64 border-2 border-dashed border-dark-100 bg-dark-100/50 rounded-3xl hover:border-white cursor-pointer transition-all duration-200"
            >
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <Image02Icon size={60} color="#ffffff" />
                <div className="text-center">
                  <p className="font-semibold text-white">Tap to upload photo</p>
                  <p className="text-sm text-dark-500 mt-1">JPG or PNG, max 10MB</p>
                </div>
              </div>
            </label>

            <div className="mt-6">
              <Button variant="secondary" size="large" fullWidth>
                <Camera01Icon size={20} color="#ffffff" className="mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Choose Template */}
        {currentStep === 'template' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Choose Template</h2>
            <p className="text-dark-500 mb-6">Select a template for your face swap</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`bg-dark-100 rounded-3xl p-5 aspect-square flex flex-col items-center justify-center gap-2 transition-all ${
                    selectedTemplate === template.id ? 'border-2 border-white bg-dark-150' : 'hover:bg-dark-150'
                  }`}
                >
                  <template.Icon size={48} color="#ffffff" />
                  <span className="font-semibold text-white text-sm text-center">
                    {template.name}
                  </span>
                  <span className="text-xs text-dark-500">{template.category}</span>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={handleGenerate}
                disabled={!selectedTemplate}
              >
                Generate
              </Button>
              <Button
                variant="outline"
                size="large"
                fullWidth
                onClick={() => setCurrentStep('upload')}
              >
                Back
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Generating */}
        {currentStep === 'generate' && (
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-dark-100 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
              <SparklesIcon size={64} color="#ffffff" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Creating Magic...</h2>
            <p className="text-dark-500 mb-8">This usually takes 10-30 seconds</p>

            <div className="max-w-xs mx-auto">
              <div className="w-full h-3 bg-dark-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-dark-500 mt-2">{progress}% complete</p>
            </div>
          </div>
        )}

        {/* Step 4: Result View */}
        {currentStep === 'result' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Your Creation</h2>

            {/* Result Preview */}
            <div className="w-full aspect-square bg-dark-100 rounded-3xl mb-6 flex items-center justify-center overflow-hidden">
              {generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated face swap"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl flex items-center justify-center border border-white/10 mx-auto mb-4">
                    <UserIcon size={64} color="#ffffff" />
                  </div>
                  <p className="text-dark-500 font-medium">Generated Image Preview</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button variant="primary" size="large" fullWidth onClick={handlePublish}>
                <Share08Icon size={20} color="#000000" className="mr-2" />
                Publish
              </Button>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" size="medium" fullWidth>
                  <Download04Icon size={20} color="#ffffff" />
                </Button>
                <Button variant="outline" size="medium" fullWidth>
                  <Share08Icon size={20} color="#ffffff" />
                </Button>
                <Button variant="outline" size="medium" fullWidth onClick={handleTryAgain}>
                  <Rotate01Icon size={20} color="#ffffff" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FaceSwapTool;
