import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';
import { Camera01Icon, PaintBoardIcon, UserIcon, CrownIcon, GlobeIcon, SnowIcon, SparklesIcon } from 'hugeicons-react';

const avatarStyles = [
  { id: 'realistic', name: 'Realistic Portrait', icon: Camera01Icon },
  { id: 'cartoon', name: 'Cartoon', icon: PaintBoardIcon },
  { id: 'superhero', name: 'Superhero', icon: UserIcon },
  { id: 'historical', name: 'Historical', icon: CrownIcon },
  { id: 'cultural', name: 'Cultural', icon: GlobeIcon },
  { id: 'seasonal', name: 'Seasonal', icon: SnowIcon },
];

const AIAvatarTool: React.FC = () => {
  const config = {
    name: 'AI Avatar',
    icon: SparklesIcon,
    toolId: 'ai-avatar',
    description: 'Transform your photo into a stylized avatar',
    instructions: 'Upload Your Photo',
    uploadCount: 1,
    styles: avatarStyles,
  };

  return <AIToolTemplate config={config} />;
};

export default AIAvatarTool;
