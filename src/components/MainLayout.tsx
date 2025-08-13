import React from 'react';
import SurveyForm from './SurveyForm';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-4">
        <SurveyForm />
      </div>
    </div>
  );
};

export default MainLayout;