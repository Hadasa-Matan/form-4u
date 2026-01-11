import React from 'react';
import SurveyForm from './SurveyForm';

const MainLayout: React.FC = () => {
  return (
    // הורדנו את ה-Padding המיותר ושינינו לרקע לבן/חלק כדי שהטופס יבלוט
    <main className="min-h-screen bg-[#f8fafc]"> 
      <div className="w-full">
        <SurveyForm />
      </div>
    </main>
  );
};

export default MainLayout;
