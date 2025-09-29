
import React from 'react';

interface FeatureContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FeatureContainer: React.FC<FeatureContainerProps> = ({ title, description, children }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
      <p className="text-slate-400 mb-8">{description}</p>
      {children}
    </div>
  );
};

export default FeatureContainer;
