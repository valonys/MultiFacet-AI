
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="p-4 flex items-center border-b border-slate-700/60">
      <img 
        src="https://github.com/valonys/DigiTwin/blob/29dd50da95bec35a5abdca4bdda1967f0e5efff6/ValonyLabs_Logo.png?raw=true" 
        alt="Logo" 
        className="h-10 w-10 mr-4" 
      />
      <div>
        <h1 className="text-xl font-bold text-white">MultiFacet AI</h1>
        <p className="text-sm text-sky-400">AI Beyond Compare</p>
      </div>
    </header>
  );
};

export default Header;
