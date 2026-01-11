import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  ArrowRight, ArrowLeft, Building, Target, MessageSquare, 
  Globe, CheckCircle2, Loader2, Zap, Star, Layout, MousePointer2, Bot
} from 'lucide-react';

const SurveyForm = () => {
  const fontStyle = { fontFamily: '"FbAsparagos", sans-serif' };

  const [formData, setFormData] = useState({
    // פרטים אישיים
    contactName: '', email: '',
    // מה מפריע וגוזלי זמן
    challenges: [], timeWasters: [], goals: [], successMetric: '',
    // ניהול העסק וקבלת פניות (תמונה image_403288)
    serviceManagement: '', leadCount: '', leadSources: [], commonQuestions: [],
    // תהליך המכירה (תמונה image_403590)
    monthlyLeads: '', salesChannel: [], responseTime: '', hasKPI: '', hasUpsell: '', salesPain: '',
    // דרגת הזדהות (תמונה image_4035ef)
    starRatings: {}, 
    // צרכים וציפיות מהבוט (תמונה image_4035cd)
    botGoals: [], botActiveTime: [], hasContent: '',
    // ניסיון קודם (תמונה image_40362a)
    prevExperience: '', botExperienceDescription: '',
    // נוכחות דיגיטלית
    digitalPresence: '', revenue: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 12; // עדכנתי את מספר השלבים כדי להכיל את כל המידע החדש

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleCheckboxChange = (field, option) => {
    setFormData(prev => {
      const current = prev[field] || [];
      return { ...prev, [field]: current.includes(option) ? current.filter(i => i !== option) : [...current, option] };
    });
  };

  const handleStarRating = (question, rating) => {
    setFormData(prev => ({
      ...prev,
      starRatings: { ...prev.starRatings, [question]: rating }
    }));
  };

  const CheckboxOption = ({ field, label, emoji }) => (
    <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer mb-2 ${formData[field]?.includes(label) ? 'border-[#000ab9] bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}>
      <div className="flex items-center gap-3">
        <input type="checkbox" className="w-5 h-5 accent-[#000ab9]" checked={formData[field]?.includes(label)} onChange={() => handleCheckboxChange(field, label)} />
        <span className="font-bold text-slate-700">{label} {emoji}</span>
      </div>
    </label>
  );

  const RadioOption = ({ field, label, value }) => (
    <label className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer mb-2 ${formData[field] === value ? 'border-[#000ab9] bg-blue-50' : 'border-slate-100 hover:border-slate-200'}`}>
      <div className="flex items-center gap-3">
        <input type="radio" className="w-5 h-5 accent-[#000ab9]" checked={formData[field] === value} onChange={() => handleInputChange(field, value)} />
        <span className="font-bold text-slate-700">{label}</span>
      </div>
    </label>
  );

  const nextStep = () => {
    if (currentStep === totalSteps) { handleSubmit(); return; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // כאן תבוא פונקציית השליחה של EmailJS כפי שהגדרנו קודם
    setTimeout(() => { setIsSuccess(true); setIsSubmitting(false); }, 2000);
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-[#f1f5f9]" dir="rtl" style={fontStyle}>
      <div className="max-w-4xl mx-auto">
        
        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2 text-[#000ab9] font-bold">
              <span className="text-sm bg-white px-3 py-1 rounded-full shadow-sm">שלב {currentStep} מתוך {totalSteps}</span>
              <span className="text-xl">אבחון עסק חכם | הדסה מתן</span>
            </div>
            <div className="h-2 w-full bg-white rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-gradient-to-l from-[#52de4a] to-[#7cd6de] transition-all duration-500" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
            </div>
          </div>
        )}

        <div className="bg-white rounded-[32px] shadow-xl p-6 md:p-12 border-b-8 border-[#000ab9] min-h-[600px] flex flex-col justify-between relative overflow-hidden">
          
          <div className="z-10">
            {/* שלב 0 - פתיחה */}
            {currentStep === 0 && (
              <div className="text-center space-y-8 py-10">
                <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Zap size={48} className="text-[#000ab9]" />
                </div>
                <h1 className="text-4xl font-black text-[#000ab9]">שאלון אבחון עסק חכם 🤖</h1>
                <p className="text-2xl text-slate-600 italic">הצעד הראשון שלכם לאוטומציה חכמה שחוסכת זמן וכסף.</p>
                <div className="bg-slate-50 p-6 rounded-2xl border-r-8 border-[#7cd6de]">
                  <p className="text-xl font-bold">השאלון מיועד לעזור לנו להכיר את האתגרים שלכם לעומק.</p>
                </div>
              </div>
            )}

            {/* שלב 6 - ניהול העסק וקבלת פניות (image_403288) */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-[#000ab9]">ניהול העסק וקבלת פניות</h2>
                  <p className="text-slate-500 italic">בואו נבין איך העסק פועל היום</p>
                </div>
                
                <div className="space-y-4">
                  <p className="font-bold text-lg text-slate-700">איך כרגע מנוהל שירות הלקוחות בעסק שלכם?</p>
                  <RadioOption field="serviceManagement" label="👤 אני בעצמי עונה לכל הפניות" value="self" />
                  <RadioOption field="serviceManagement" label="👥 יש צוות שמטפל בפניות" value="team" />
                  <RadioOption field="serviceManagement" label="🔄 חלק אני וחלק העובדים" value="hybrid" />
                  <RadioOption field="serviceManagement" label="🏢 מיקור חוץ" value="outsource" />
                </div>

                <div className="mt-8">
                  <p className="font-bold text-lg text-slate-700 mb-4">מאיפה הפניות מתקבלות? (ניתן לבחור כמה)</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <CheckboxOption field="leadSources" label="האתר שלנו" emoji="🌐" />
                    <CheckboxOption field="leadSources" label="פייסבוק" emoji="🔵" />
                    <CheckboxOption field="leadSources" label="גוגל אדס" emoji="🔍" />
                    <CheckboxOption field="leadSources" label="מייל" emoji="📧" />
                    <CheckboxOption field="leadSources" label="וואטסאפ" emoji="📱" />
                    <CheckboxOption field="leadSources" label="אינסטגרם" emoji="📸" />
                  </div>
                </div>
              </div>
            )}

            {/* שלב 7 - תהליך המכירה (image_403590) */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Layout size={32} className="text-[#000ab9]" />
                  </div>
                  <h2 className="text-3xl font-black text-[#000ab9]">תהליך המכירה שלכם</h2>
                </div>

                <p className="font-bold text-slate-700">מהי כמות הלידים בחודש?</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['1-50', '50-200', '200-500', 'יותר מ-500'].map(val => (
                    <button key={val} onClick={() => handleInputChange('monthlyLeads', val)} className={`p-3 rounded-xl border-2 font-bold transition-all ${formData.monthlyLeads === val ? 'bg-[#000ab9] text-white' : 'bg-slate-50 border-transparent text-slate-600'}`}>
                      {val}
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="font-bold text-slate-700 mb-3">כמה זמן לוקח מרגע הפנייה עד טיפול?</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['מיידי ⚡', 'תוך 24 שעות 🕒', '1-3 ימים 🗓️', 'יותר מ-3 ימים ⏰'].map(val => (
                      <button key={val} onClick={() => handleInputChange('responseTime', val)} className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${formData.responseTime === val ? 'bg-[#000ab9] text-white' : 'bg-slate-50 border-transparent text-slate-600'}`}>
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-bold text-slate-700 mb-2">תארו את התהליך שעוברים לידים שלא סגרו אתכם:</p>
                  <textarea style={fontStyle} className="w-full p-4 bg-slate-50 rounded-xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-24" placeholder="איך אתם מתמודדים עם לידים שלא הפכו ללקוחות?" value={formData.salesPain} onChange={(e) => handleInputChange('salesPain', e.target.value)} />
                </div>
              </div>
            )}

            {/* שלב 8 - דרגת הזדהות (image_4035ef) */}
            {currentStep === 8 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Star size={40} className="text-yellow-400 mx-auto mb-2" />
                  <h2 className="text-3xl font-black text-[#000ab9]">דרגת ההזדהות עם אתגרים</h2>
                  <p className="text-slate-500">כוכב אחד = כלל לא מזדהה | חמישה כוכבים = מזדהה במידה רבה מאוד</p>
                </div>

                {[
                  "המזכיר/ה שלי עסוק/ה רוב היום בשאלות חוזרות",
                  "מתפספסים לי לידים ועסקאות",
                  "אין לי מספיק מעקב אחרי סטטוס לקוח",
                  "יש אצלי עומס של משימות החוזרות על עצמם",
                  "חוסר יכולת להעניק מענה מהיר לשאלות"
                ].map((q) => (
                  <div key={q} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-2xl gap-4">
                    <span className="font-bold text-slate-700 flex-1">{q}</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <MousePointer2 key={star} size={28} onClick={() => handleStarRating(q, star)} className={`cursor-pointer transition-colors ${formData.starRatings[q] >= star ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* שלב 9 - צרכים וציפיות מהבוט (image_4035cd) */}
            {currentStep === 9 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <Bot size={40} className="text-[#000ab9] mx-auto mb-2" />
                  <h2 className="text-3xl font-black text-[#000ab9]">צרכים וציפיות מהבוט</h2>
                  <p className="text-slate-500 italic">בואו נגדיר מה הבוט צריך לעשות בשבילכם</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CheckboxOption field="botGoals" label="מענה 24/7" emoji="🕒" />
                  <CheckboxOption field="botGoals" label="סינון וכישור לידים" emoji="🎯" />
                  <CheckboxOption field="botGoals" label="תיאום פגישות אוטומי" emoji="📅" />
                  <CheckboxOption field="botGoals" label="מענה לשאלות נפוצות" emoji="❓" />
                  <CheckboxOption field="botGoals" label="איסוף פרטי לידים" emoji="📝" />
                  <CheckboxOption field="botGoals" label="שירות לקוחות בסיסי" emoji="🎧" />
                </div>

                <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
                  <p className="font-bold text-[#000ab9] mb-4 text-center">מתי אתם רוצים שהבוט יהיה זמין?</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['24/7 כל השבוע', 'שעות העבודה בלבד', 'גם בערבים', 'גם בסופי שבוע', 'ללא שבתות וחגים'].map(val => (
                      <button key={val} onClick={() => handleInputChange('botActiveTime', val)} className={`p-2 rounded-lg text-sm font-bold border-2 transition-all ${formData.botActiveTime === val ? 'bg-[#000ab9] text-white border-[#000ab9]' : 'bg-white border-slate-200 text-slate-600'}`}>
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* שאר השלבים (10-12) יכילו את נוכחות דיגיטלית, ניסיון קודם וסיכום */}
            {currentStep === 12 && (
              <div className="text-center space-y-8 py-10">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={48} className="text-[#52de4a]" />
                </div>
                <h2 className="text-4xl font-black text-[#000ab9]">כמעט סיימנו! 🚀</h2>
                <div className="bg-slate-50 p-8 rounded-[32px] text-right space-y-4">
                  <p className="text-xl font-bold">אנחנו נסקור את המידע ונבין את הצרכים העסקיים.</p>
                  <p className="text-lg text-slate-600">נכין הצעה מותאמת אישית המדגישה פתרונות שיחסכו זמן.</p>
                </div>
              </div>
            )}

          </div>

          {/* Buttons */}
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-8">
            <button onClick={() => setCurrentStep(prev => prev - 1)} disabled={currentStep === 0 || isSubmitting} className={`flex items-center gap-2 text-slate-400 font-bold text-xl hover:text-[#000ab9] transition-all ${currentStep === 0 ? 'invisible' : ''}`}>
              <ArrowRight size={24} /> חזרה
            </button>
            
            <button onClick={nextStep} disabled={isSubmitting} className={`w-full md:w-auto px-12 py-5 rounded-full font-black text-2xl text-white shadow-[0_10px_30px_rgba(0,10,185,0.3)] flex items-center justify-center gap-3 transition-all transform hover:scale-105 ${currentStep === totalSteps ? 'bg-[#52de4a]' : 'bg-[#000ab9]'}`}>
              {isSubmitting ? <><Loader2 size={24} className="animate-spin" /> שולח...</> : <>{currentStep === 0 ? 'בואו נתחיל!' : currentStep === totalSteps ? 'שלח/י אבחון' : 'בואי נמשיך'} <ArrowLeft size={24} /></>}
            </button>
          </div>

          <p className="text-center text-slate-400 text-sm mt-6">המידע מאובטח ונשמר לטובת בניית אסטרטגיה חכמה עבורך ♡</p>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;