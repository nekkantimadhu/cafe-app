// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Header = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center space-x-2 mb-4">
      <button onClick={() => navigate(-1)} className="p-1">
        <ArrowLeft />
      </button>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default Header;
