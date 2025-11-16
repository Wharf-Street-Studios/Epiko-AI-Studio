import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';
import { Sun03Icon, BoatIcon, MountainIcon, Building03Icon, Castle01Icon, ChurchIcon } from 'hugeicons-react';
import { Heart } from 'lucide-react';

const coupleTemplates = [
  { id: 1, name: 'Romantic Sunset', icon: Sun03Icon, category: 'Romantic' },
  { id: 2, name: 'Beach Paradise', icon: BoatIcon, category: 'Travel' },
  { id: 3, name: 'Mountain Adventure', icon: MountainIcon, category: 'Adventure' },
  { id: 4, name: 'City Lights', icon: Building03Icon, category: 'Urban' },
  { id: 5, name: 'Fairy Tale', icon: Castle01Icon, category: 'Fantasy' },
  { id: 6, name: 'Wedding Day', icon: ChurchIcon, category: 'Special' },
];

const CouplePhotoTool: React.FC = () => {
  const config = {
    name: 'Duo Portrait', // Updated per PRD v2.0
    icon: Heart,
    toolId: 'duo-portrait', // Updated to match CREDIT_COSTS
    description: 'Create romantic scenes with your partner',
    instructions: 'Upload 2 Photos',
    uploadCount: 2,
    templates: coupleTemplates,
  };

  return <AIToolTemplate config={config} />;
};

export default CouplePhotoTool;
