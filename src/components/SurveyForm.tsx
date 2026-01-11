import React, { useState } from 'react';
import { 
  ArrowRight, ArrowLeft, CheckCircle2, 
  Building, Sparkles, Target, ClipboardList, Lightbulb, TrendingUp, Headphones, Settings, Zap
} from 'lucide-react';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    businessName: '', contactName: '', email: '', phone: '', businessField: '', howStarted: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 9;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-[#f8fafc]" dir="rtl" style={{ fontFamily: 'sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        
        {/* פס התקדמות יוקרתי */}
        <div className="mb-10 px-4">
          <div className="flex justify-between items-end mb-4 font-bold text-[#000ab9]">
            <span className="text-xl">אבחון עסק חכם | הדסה מתן</span>
            <span className="text-sm bg-blue-100 px-3 py-1 rounded-full">שלב {currentStep} מתוך {totalSteps}</span>
          </div>
          <div className="h-3 w-full bg-white rounded-full shadow-inner border border-slate-100 overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-[#7cd6de] to-[#52de4a] rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* הכרטיס המרכזי */}
        <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,10,185,0.08)] p-8 md:p-16 border-b-[12px] border-[#000ab9] min-h-[600px] flex flex-col justify-between relative">
          
          <div className="transition-opacity duration-500 ease-in-out">
            {currentStep === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center">
                  <div className="inline-block p-5 bg-blue-50 rounded-[25px] text-[#000ab9] mb-4"><Building size={48} /></div>
                  <h2 className="text-3xl font-bold text-[#000ab9] mb-2">נעים להכיר</h2>
                  <p className="text-slate-500">בואי נתחיל מהבסיס של העסק שלך</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#000ab9] mr-2">שם העסק</label>
                    <input type="text" placeholder="איך קוראים לבייבי שלך?" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] focus:bg-white outline-none transition-all" onChange={(e)=>handleInputChange('businessName', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#000ab9] mr-2">השם שלך</label>
                    <input type="text" placeholder="מה השם המלא שלך?" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] focus:bg-white outline-none transition-all" onChange={(e)=>handleInputChange('contactName', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#000ab9] mr-2">אימייל</label>
                    <input type="email" placeholder="נשלח לך את האבחון לכאן" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] focus:bg-white outline-none transition-all" onChange={(e)=>handleInputChange('email', e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#000ab9] mr-2">טלפון</label>
                    <input type="tel" placeholder="05x-xxxxxxx" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] focus:bg-white outline-none transition-all" onChange={(e)=>handleInputChange('phone', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">
                <div className="inline-block p-5 bg-blue-50 rounded-[25px] text-[#000ab9] mb-4"><Sparkles size={48} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9] mb-2">הסיפור של העסק</h2>
                <div className="space-y-6 text-right">
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-[#000ab9] mr-2">מהו תחום העיסוק המרכזי?</label>
                     <input type="text" placeholder="למשל: ייעוץ עסקי, חנות אונליין..." className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-[#000ab9] mr-2">איך הכל התחיל?</label>
                     <textarea placeholder="ספרי לי קצת על החזון וההתחלה..." className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-40 resize-none" />
                   </div>
                </div>
              </div>
            )}
            
            {/* הוסיפי כאן את שאר הצעדים באותו סגנון... */}
          </div>

          {/* כפתורי ניווט תחתיים */}
          <div className="mt-12 flex justify-between items-center border-t border-slate-100 pt-8">
            <button 
              onClick={prevStep} 
              className={`flex items-center gap-2 text-slate-400 font-bold hover:text-[#000ab9] transition-colors ${currentStep === 1 ? 'invisible' : ''}`}
            >
              <ArrowRight size={20} /> חזרה
            </button>
            
            <button 
              onClick={nextStep}
              className="px-12 py-5 rounded-full font-bold text-xl text-white shadow-[0_10px_30px_rgba(0,10,185,0.2)] bg-[#000ab9] hover:bg-[#000890] hover:scale-105 transition-all flex items-center gap-3"
            >
              {currentStep === totalSteps ? 'שלחי לי את האבחון' : 'בואי נמשיך'} 
              <ArrowLeft size={24} />
            </button>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-400 text-sm italic">
          המידע מאובטח ונשמר לטובת בניית אסטרטגיה חכמה עבורך ♡
        </p>
      </div>
    </div>
  );
};

export default SurveyForm;
