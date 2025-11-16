import React from 'react';
import AIToolTemplate from '../../components/ui/AIToolTemplate';
import { Baby01Icon, StudentIcon, UserIcon, UserCircleIcon, UserAccountIcon, UserGroupIcon, Time01Icon } from 'hugeicons-react';

const ageStyles = [
  { id: 'child', name: 'Child (5 years)', icon: Baby01Icon },
  { id: 'teen', name: 'Teen (15 years)', icon: StudentIcon },
  { id: 'young', name: 'Young Adult (25)', icon: UserIcon },
  { id: 'middle', name: 'Middle Age (50)', icon: UserCircleIcon },
  { id: 'senior', name: 'Senior (70)', icon: UserAccountIcon },
  { id: 'elder', name: 'Elder (90)', icon: UserGroupIcon },
];

const AgeTransformTool: React.FC = () => {
  const config = {
    name: 'Age Transform',
    icon: Time01Icon,
    toolId: 'age-transform',
    description: 'See yourself at different ages',
    instructions: 'Upload Your Photo',
    uploadCount: 1,
    styles: ageStyles,
  };

  return <AIToolTemplate config={config} />;
};

export default AgeTransformTool;
