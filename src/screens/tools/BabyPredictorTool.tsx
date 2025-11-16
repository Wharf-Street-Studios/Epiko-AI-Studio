import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';
import { Baby01Icon } from 'hugeicons-react';

const BabyPredictorTool: React.FC = () => {
  const config = {
    name: 'Baby Predictor',
    icon: Baby01Icon,
    toolId: 'baby-predictor',
    description: 'See what your future baby might look like',
    instructions: 'Upload 2 Parent Photos',
    uploadCount: 2,
  };

  return <AIToolTemplate config={config} />;
};

export default BabyPredictorTool;
