
import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="w-full py-4 bg-farm-green text-white text-center shadow-md">
      <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;
