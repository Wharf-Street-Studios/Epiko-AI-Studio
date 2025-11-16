import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';
import { FireIcon, HeartAddIcon, Rocket01Icon, MaskIcon, SmileIcon, Film01Icon, Image02Icon } from 'hugeicons-react';

const posterTemplates = [
  { id: 1, name: 'Action Movie', icon: FireIcon, category: 'Action' },
  { id: 2, name: 'Romance', icon: HeartAddIcon, category: 'Romance' },
  { id: 3, name: 'Sci-Fi', icon: Rocket01Icon, category: 'SciFi' },
  { id: 4, name: 'Horror', icon: MaskIcon, category: 'Horror' },
  { id: 5, name: 'Comedy', icon: SmileIcon, category: 'Comedy' },
  { id: 6, name: 'Drama', icon: Film01Icon, category: 'Drama' },
];

const PosterMakerTool: React.FC = () => {
  const config = {
    name: 'Poster Maker',
    icon: Image02Icon,
    toolId: 'poster-maker',
    description: 'Create professional movie-style posters',
    instructions: 'Upload Your Photo',
    uploadCount: 1,
    templates: posterTemplates,
  };

  return <AIToolTemplate config={config} />;
};

export default PosterMakerTool;
