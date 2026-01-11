import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  ArrowRight, ArrowLeft, Building, Sparkles, Target, 
  Users, BarChart3, MessageSquare, Globe, Rocket, CheckCircle2, Loader2
} from 'lucide-react';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    contactName: '', email: '', businessName: '', businessField: '',
    revenue: '', targetAudience: '', mainChallenge: '', goals: '', marketing: '', digitalPresence: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 9;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // כאן את מחברת את ה-Service ID, Template ID וה-Public Key שלך
      await emailjs.send(
        'YOUR_SERVICE_ID', 
        'YOUR_TEMPLATE_ID',
        {
          from_name: formData.contactName,
          from_email: formData.email,
          business_name: formData.businessName,
          business_field: formData.businessField,
          goals: formData.goals,
          revenue: formData.revenue,
          challenge: formData.mainChallenge,
          marketing: formData.marketing,
          digital: formData.digitalPresence
        },
        'YOUR_PUBLIC_KEY'
      );
      setIsSuccess(true);
    } catch (err) {
      setError('חלה שגיאה בשליחה. אנא נסו שוב מאוחר יותר.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.contactName.trim()) { setError('חובה להזין שם מלא'); return; }
      if (!isValidEmail(formData.email)) { setError('חובה להזין אימייל תקין'); return; }
    }
    
    if (currentStep === totalSteps) {
      handleSubmit();
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4" dir="rtl">
        <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-lg w-full border-t-8 border-[#52de4a]">
          <CheckCircle2 size={80} className="text-[#52de4a] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#000ab9] mb-4">השליחה הצליחה!</h2>
          <p className="text-slate-600 text-lg">תודה רבה. האבחון נשלח אלינו ונעבד אותו בהקדם.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-[#f8fafc]" dir="rtl" style={{ fontFamily: 'sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        <div className="mb-10 px-4">
          <div className="flex justify-between items-end mb-4 font-bold text-[#000ab9]">
            <span className="text-xl font-black">אבחון עסק חכם | הדסה מתן</span>
            <span className="text-sm bg-blue-100 px-3 py-1 rounded-full">שלב {currentStep} מתוך {totalSteps}</span>
          </div>
          <div className="h-3 w-full bg-white rounded-full shadow-inner border border-slate-100 overflow-hidden p-0.5">
            <div 
              className="h-full bg-gradient-to-r from-[#7cd6de] to-[#52de4a] rounded-full transition-all duration-700"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border-b-[12px] border-[#000ab9] min-h-[550px] flex flex-col justify-between">
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><Building size={40} /></div>
                  <h2 className="text-3xl font-bold text-[#000ab9]">נעים להכיר</h2>
                  <p className="text-slate-500 italic font-medium">נשמח לדעת עם מי יש לנו את הכבוד</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-right font-bold text-[#000ab9]">
                    <label className="mr-2 block italic text-sm">* שם מלא</label>
                    <input type="text" placeholder="השם שלך" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none" value={formData.contactName} onChange={(e)=>handleInputChange('contactName', e.target.value)} />
                  </div>
                  <div className="space-y-2 text-right font-bold text-[#000ab9]">
                    <label className="mr-2 block italic text-sm">* אימייל</label>
                    <input type="email" placeholder="email@example.com" dir="ltr" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right" value={formData.email} onChange={(e)=>handleInputChange('email', e.target.value)} />
                  </div>
                </div>
                {error && <p className="text-red-500 text-center font-bold animate-pulse">{error}</p>}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><Rocket size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">פרטי העסק</h2>
                <div className="space-y-4">
                  <input type="text" placeholder="שם העסק" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right" onChange={(e)=>handleInputChange('businessName', e.target.value)} />
                  <input type="text" placeholder="מה תחום העיסוק המרכזי?" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right" onChange={(e)=>handleInputChange('businessField', e.target.value)} />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><Target size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">חזון ומטרות</h2>
                <p className="text-slate-500 italic">מהו היעד המרכזי של העסק לשנה הקרובה?</p>
                <textarea placeholder="למשל: הגדלת מכירות ב-20%, השקת מוצר חדש..." className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-40 resize-none text-right" onChange={(e)=>handleInputChange('goals', e.target.value)} />
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><Users size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">קהל יעד</h2>
                <p className="text-slate-500 italic font-medium">מי הלקוח האידיאלי שלך? תארו אותו בקצרה</p>
                <textarea placeholder="גיל, מיקום, צורך מרכזי..." className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-40 resize-none text-right" onChange={(e)=>handleInputChange('targetAudience', e.target.value)} />
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><BarChart3 size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">מצב פיננסי</h2>
                <p className="text-slate-500 italic font-medium">לא חובה, אך עוזר לדיוק האבחון</p>
                <select className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right" onChange={(e)=>handleInputChange('revenue', e.target.value)}>
                  <option value="">בחרו טווח הכנסה חודשי ממוצע</option>
                  <option value="0-10k">0 - 10,000 ₪</option>
                  <option value="10-30k">10,000 - 30,000 ₪</option>
                  <option value="30-100k">30,000 - 100,000 ₪</option>
                  <option value="100k+">מעל 100,000 ₪</option>
                </select>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><MessageSquare size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">שיווק ופרסום</h2>
                <p className="text-slate-500 italic">איך אנשים מגיעים אליך היום?</p>
                <textarea placeholder="פייסבוק, המלצות, אינסטגרם, גוגל..." className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-40 resize-none text-right" onChange={(e)=>handleInputChange('marketing', e.target.value)} />
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><Sparkles size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">האתגר הגדול</h2>
                <p className="text-slate-500 italic">מה הדבר שהכי מעכב אותך כרגע?</p>
                <textarea placeholder="חוסר זמן, קושי במכירות, טכנולוגיה..." className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-40 resize-none text-right" onChange={(e)=>handleInputChange('mainChallenge', e.target.value)} />
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><Globe size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">נוכחות דיגיטלית</h2>
                <input type="text" placeholder="קישור לאתר או לעמוד העסקי (אם יש)" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-left" dir="ltr" onChange={(e)=>handleInputChange('digitalPresence', e.target.value)} />
              </div>
            )}

            {currentStep === 9 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-8 bg-green-50 rounded-full text-[#52de4a] mb-4 animate-bounce"><CheckCircle2 size={64} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">זהו, אנחנו מוכנים!</h2>
                <p className="text-xl text-slate-600 px-4 font-medium">הפרטים שלך נשמרו. לחצו על הכפתור למטה כדי לשלוח את הפרטים ולקבל את האבחון המקצועי.</p>
                {error && <p className="text-red-500 font-bold">{error}</p>}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center border-t pt-8">
            <button 
              onClick={prevStep} 
              disabled={isSubmitting}
              className={`flex items-center gap-2 text-slate-400 font-bold hover:text-[#000ab9] transition-colors ${currentStep === 1 || isSubmitting ? 'invisible' : ''}`}
            >
              <ArrowRight size={20} /> חזרה
            </button>
            
            <button 
              onClick={nextStep}
              disabled={isSubmitting}
              className={`px-10 py-4 rounded-full font-bold text-xl text-white shadow-xl transition-all flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''} ${currentStep === totalSteps ? 'bg-[#52de4a] hover:bg-[#45c33d]' : 'bg-[#000ab9] hover:bg-[#000890]'}`}
            >
              {isSubmitting ? (
                <>שולח... <Loader2 size={20} className="animate-spin" /></>
              ) : (
                <>
                  {currentStep === totalSteps ? 'שליחת אבחון' : 'קדימה ממשיכים'} 
                  <ArrowLeft size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
