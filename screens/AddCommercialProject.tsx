
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CommercialProjectFlow } from '../components/CommercialProjectFlow';

export const AddCommercialProject: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <CommercialProjectFlow 
        onCancel={() => navigate(-1)} 
        onSuccess={() => navigate('/dashboard')} 
      />
    </div>
  );
};
