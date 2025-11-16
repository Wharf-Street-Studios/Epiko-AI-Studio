import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';
import { SparklesIcon, DiamondIcon, Camera01Icon, PaintBoardIcon, Moon02Icon, VideoReplayIcon, MagicWand02Icon } from 'hugeicons-react';

const enhanceStyles = [
  { id: 'standard', name: 'Standard HD', icon: SparklesIcon },
  { id: 'ultra', name: 'Ultra HD', icon: DiamondIcon },
  { id: 'portrait', name: 'Portrait Mode', icon: Camera01Icon },
  { id: 'vivid', name: 'Vivid Colors', icon: PaintBoardIcon },
  { id: 'black-white', name: 'B&W Classic', icon: Moon02Icon },
  { id: 'vintage', name: 'Vintage Film', icon: VideoReplayIcon },
];

const EnhanceTool: React.FC = () => {
  const config = {
    name: 'Enhance',
    icon: MagicWand02Icon,
    toolId: 'enhance',
    description: 'Improve photo quality to HD/Ultra HD',
    instructions: 'Upload Your Photo',
    uploadCount: 1,
    styles: enhanceStyles,
  };

  return <AIToolTemplate config={config} />;
};

export default EnhanceTool;
