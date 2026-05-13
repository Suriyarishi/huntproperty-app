
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectListingFlow from '../components/ProjectListingFlow';

export const AddProject: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <ProjectListingFlow onCancel={() => navigate(-1)} />
        </div>
    );
};
