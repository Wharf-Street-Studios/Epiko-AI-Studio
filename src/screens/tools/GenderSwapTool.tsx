import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';
import { Rotate01Icon } from 'hugeicons-react';

const GenderSwapTool: React.FC = () => {
  const config = {
    name: 'Gender Swap',
    icon: Rotate01Icon,
    toolId: 'gender-swap',
    description: 'Transform your gender appearance with AI',
    instructions: 'Upload Your Photo',
    uploadCount: 1,
  };

  return <AIToolTemplate config={config} />;
};

export default GenderSwapTool;
