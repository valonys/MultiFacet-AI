
import React from 'react';

interface TabButtonProps {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, icon, isActive, onClick }) => {
  const activeClasses = 'bg-sky-500/10 text-sky-400';
  const inactiveClasses = 'hover:bg-slate-700/50 text-slate-300';

  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${isActive ? activeClasses : inactiveClasses}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default TabButton;
