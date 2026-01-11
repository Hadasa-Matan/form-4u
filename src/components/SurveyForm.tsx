import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, 
  Building, Sparkles, Target
} from 'lucide-react';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    businessName: '', contactName: '', email: '', phone: '', businessField: '', howStarted: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 9;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => currentStep < totalSteps && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  return (
    <div className="min-h-screen py-12 px-4" dir="rtl" style={{ fontFamily: 'sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="mb-8 px-4">
          <div className="flex justify-between items-end mb-3 font-bold text-[#000ab9]">
            <span>אבחון עסק חכם | הדסה מתן</span>
            <span className="text-sm opacity-50">שלב {currentStep} מתוך {totalSteps}</span>
          </div>
          <div className="h-2 w-full bg-white rounded-full shadow-inner overflow-hidden">
            <div 
              className="h-full bg-[#52de4a] transition-all duration-700 ease-in-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border-b-[12px] border-[#000ab9] min-h-[550px] flex flex-col justify-between transition-all duration-500">
          
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            {currentStep === 1 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-full text-[#000ab9]"><Building size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">בואי נכיר</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="שם העסק" className="p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none" onChange={(e)=>handleInputChange('businessName', e.target.value)} />
                  <input type="text" placeholder="שם מלא" className="p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none" onChange={(e)=>handleInputChange('contactName', e.target.value)} />
                  <input type="email" placeholder="אימייל" className="p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none" onChange={(e)=>handleInputChange('email', e.target.value)} />
                  <input type="tel" placeholder="טלפון" className="p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none" onChange={(e)=>handleInputChange('phone', e.target.value)} />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-full text-[#000ab9]"><Sparkles size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">הסיפור של העסק</h2>
                <div className="space-y-4">
                   <input type="text" placeholder="מה תחום העסק?" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none" />
                   <textarea placeholder="איך הכל התחיל?" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-32" />
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 flex justify-between items-center border-t pt-8">
            <button onClick={prevStep} className={`flex items-center gap-2 text-slate-400 font-bold ${currentStep === 1 ? 'invisible' : ''}`}>
              <ArrowRight size={20} /> חזרה
            </button>
            <button 
              onClick={nextStep}
              className="px-10 py-4 rounded-full font-bold text-xl text-white shadow-xl bg-[#000ab9] hover:bg-[#000890] transition-all flex items-center gap-2"
            >
              {currentStep === totalSteps ? 'שלחי לי אבחון' : 'השלב הבא'} <ArrowLeft size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
