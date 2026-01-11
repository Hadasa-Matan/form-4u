import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  ArrowRight, ArrowLeft, Building, Sparkles, Target, 
  Users, BarChart3, MessageSquare, Globe, Rocket, CheckCircle2, Loader2, Zap
} from 'lucide-react';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    contactName: '', email: '', businessName: '', businessField: '',
    challenges: [], timeWasters: [], goals: [], 
    successMetric: '', businessOperation: '', revenue: '', digitalPresence: ''
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 9;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleCheckboxChange = (field: string, option: string) => {
    setFormData(prev => {
      const currentOptions = prev[field] || [];
      if (currentOptions.includes(option)) {
        return { ...prev, [field]: currentOptions.filter(item => item !== option) };
      } else {
        return { ...prev, [field]: [...currentOptions, option] };
      }
    });
  };

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        'service_04u46mc', 
        'template_44cshno',
        {
          contact_name: formData.contactName,
          contact_email: formData.email,
          business_name: formData.businessName,
          challenges: formData.challenges.join(', '),
          time_wasters: formData.timeWasters.join(', '),
          goals: formData.goals.join(', '),
          success_metric: formData.successMetric,
          business_operation: formData.businessOperation,
          revenue: formData.revenue,
          digital_presence: formData.digitalPresence
        },
        '0MvQ0-Daq0m7nbe2D'
      );
      setIsSuccess(true);
    } catch (err) {
      setError('חלה שגיאה בשליחה.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.contactName.trim()) { setError('חובה להזין שם מלא'); return; }
      if (!isValidEmail(formData.email)) { setError('חובה להזין אימייל תקין'); return; }
    }
    if (currentStep === totalSteps) { handleSubmit(); return; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const CheckboxOption = ({ field, label, emoji }) => (
    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${formData[field]?.includes(label) ? 'border-[#7cd6de] bg-blue-50 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}>
      <input type="checkbox" className="w-5 h-5 accent-[#000ab9]" checked={formData[field]?.includes(label)} onChange={() => handleCheckboxChange(field, label)} />
      <span className="font-medium text-slate-700">{emoji} {label}</span>
    </label>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4" dir="rtl">
        <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-lg w-full border-t-8 border-[#52de4a]">
          <CheckCircle2 size={80} className="text-[#52de4a] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#000ab9] mb-4">תודה רבה!</h2>
          <p className="text-slate-600 text-lg">האבחון נשלח אלינו בהצלחה, ניצור קשר בהקדם.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-[#f8fafc]" dir="rtl" style={{ fontFamily: 'sans-serif' }}>
      <div className="max-w-4xl mx-auto">
        
        {currentStep > 0 && (
          <div className="mb-10 px-4">
            <div className="flex justify-between items-end mb-4 font-bold text-[#000ab9]">
              <span className="text-xl font-black italic">הדסה מתן | אבחון עסק חכם</span>
              <span className="text-sm bg-blue-100 px-3 py-1 rounded-full">שלב {currentStep} מתוך {totalSteps}</span>
            </div>
            <div className="h-3 w-full bg-white rounded-full shadow-inner border border-slate-100 overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-[#7cd6de] to-[#52de4a] rounded-full transition-all duration-700" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
            </div>
          </div>
        )}

        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border-b-[12px] border-[#000ab9] min-h-[600px] flex flex-col justify-between">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {currentStep === 0 && (
              <div className="space-y-6 text-right leading-relaxed text-slate-700">
                <div className="text-center mb-8"><Zap size={48} className="text-[#000ab9] mx-auto animate-pulse" /><h1 className="text-4xl font-black text-[#000ab9] mt-4">שאלון לאבחון העסק 🤖</h1></div>
                <h2 className="text-2xl font-bold">היי 😄</h2>
                <p className="text-xl italic font-medium">אנחנו יודעים שאתם עמוסים – אולי בין לקוח לשיחה 📞, אולי רגע לפני הפסקת קפה ☕,</p>
                <p className="text-xl font-bold text-[#000ab9]">אבל אם הגעתם לפה – כנראה שאתם רוצים להפוך את העסק שלכם לחכם, יעיל וחסכוני יותר 🧠</p>
                <div className="bg-slate-50 p-6 rounded-3xl border-r-4 border-[#7cd6de] font-bold">📋 השאלון לוקח כמה דקות בלבד ומאפשר לנו להגיע לשיחה מוכנים 🎯</div>
                <p className="text-center text-[#000ab9] font-black animate-bounce text-2xl pt-6">מוכנים להתחיל? מכאן 👇</p>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center"><Building size={40} className="text-[#000ab9] mx-auto mb-4" /><h2 className="text-3xl font-bold text-[#000ab9]">נעים להכיר</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
                  <div className="space-y-2 font-bold text-[#000ab9]"><label className="block italic">* שם מלא</label><input type="text" placeholder="השם שלך" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none" value={formData.contactName} onChange={(e)=>handleInputChange('contactName', e.target.value)} /></div>
                  <div className="space-y-2 font-bold text-[#000ab9]"><label className="block italic">* אימייל</label><input type="email" placeholder="email@example.com" dir="ltr" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right" value={formData.email} onChange={(e)=>handleInputChange('email', e.target.value)} /></div>
                </div>
                {error && <p className="text-red-500 text-center font-bold">{error}</p>}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center"><h2 className="text-3xl font-bold text-[#000ab9]">מה מפריע לכם היום בעסק?</h2><p className="text-slate-500 italic">(ניתן לבחור מספר אפשרויות)</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CheckboxOption field="challenges" label="ניהול זמן לא יעיל" emoji="⏰" />
                  <CheckboxOption field="challenges" label="שירות לקוחות איטי" emoji="🎯" />
                  <CheckboxOption field="challenges" label="מעקב אחר לידים" emoji="📞" />
                  <CheckboxOption field="challenges" label="משימות חוזרות" emoji="🔄" />
                  <CheckboxOption field="challenges" label="זמינות 24/7" emoji="🕙" />
                  <CheckboxOption field="challenges" label="קושי בהגדלת העסק" emoji="📈" />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center"><h2 className="text-3xl font-bold text-[#000ab9]">מהם גוזלי הזמן המרכזיים?</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CheckboxOption field="timeWasters" label="שיחות טלפון חוזרות" emoji="📞" />
                  <CheckboxOption field="timeWasters" label="מענה למיילים" emoji="📧" />
                  <CheckboxOption field="timeWasters" label="תיאום פגישות" emoji="📅" />
                  <CheckboxOption field="timeWasters" label="הזנת נתונים" emoji="⌨️" />
                  <CheckboxOption field="timeWasters" label="שאלות בסיסיות" emoji="❓" />
                  <CheckboxOption field="timeWasters" label="מעקבים ותזכורות" emoji="👥" />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center"><h2 className="text-3xl font-bold text-[#000ab9]">מה המטרה המרכזית שלכם?</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CheckboxOption field="goals" label="לא לפספס לידים" emoji="🎯" />
                  <CheckboxOption field="goals" label="להגדיל מכירות" emoji="💰" />
                  <CheckboxOption field="goals" label="אוטומציה מלאה" emoji="🤖" />
                  <CheckboxOption field="goals" label="יותר זמן למשפחה" emoji="👨‍👩‍👧‍👦" />
                  <CheckboxOption field="goals" label="לשפר חוויית לקוח" emoji="✨" />
                  <CheckboxOption field="goals" label="סינון לידים איכותיים" emoji="🔍" />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><Target size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">מה ייחשב הצלחה עבורכם?</h2>
                <p className="text-slate-500 italic">שתפו אותנו ביעד מדיד (לדוגמה: הגדלת אחוז המרה ב-10%)</p>
                <textarea className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-40 resize-none text-right shadow-inner" placeholder="הקלידו כאן..." value={formData.successMetric} onChange={(e)=>handleInputChange('successMetric', e.target.value)} />
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><MessageSquare size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">איך העסק פועל היום?</h2>
                <p className="text-slate-500 italic">איך אתם מנהלים פניות ולקוחות כרגע?</p>
                <textarea className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-40 resize-none text-right shadow-inner" placeholder="למשל: אקסל, מחברת, וואטסאפ..." value={formData.businessOperation} onChange={(e)=>handleInputChange('businessOperation', e.target.value)} />
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><BarChart3 size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">מצב פיננסי</h2>
                <select className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right font-bold" value={formData.revenue} onChange={(e)=>handleInputChange('revenue', e.target.value)}>
                  <option value="">בחרו טווח הכנסה חודשי</option>
                  <option value="0-30k">0 - 30,000 ₪</option>
                  <option value="30-100k">30,000 - 100,000 ₪</option>
                  <option value="100k+">מעל 100,000 ₪</option>
                </select>
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><Globe size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">נוכחות דיגיטלית</h2>
                <p className="text-slate-500 mb-4 italic">צרפו קישור לאתר או לעמוד עסקי (אם יש)</p>
                <input type="text" placeholder="https://..." className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-left" dir="ltr" value={formData.digitalPresence} onChange={(e)=>handleInputChange('digitalPresence', e.target.value)} />
              </div>
            )}

            {currentStep === 9 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-8 bg-green-50 rounded-full text-[#52de4a] mb-4 animate-bounce"><CheckCircle2 size={64} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">זהו, אנחנו מוכנים!</h2>
                <p className="text-xl text-slate-600 font-medium">האבחון המקצועי שלך כמעט בדרך. לחצו על הכפתור כדי לשלוח אלינו את כל הפרטים.</p>
              </div>
            )}
          </div>

          <div className="mt-12 flex justify-between items-center border-t pt-8">
            <button onClick={prevStep} disabled={isSubmitting} className={`flex items-center gap-2 text-slate-400 font-bold hover:text-[#000ab9] transition-colors ${currentStep === 0 || isSubmitting ? 'invisible' : ''}`}><ArrowRight size={20} /> חזרה</button>
            <button onClick={nextStep} disabled={isSubmitting} className={`px-10 py-4 rounded-full font-bold text-xl text-white shadow-xl flex items-center gap-2 transition-all ${currentStep === totalSteps ? 'bg-[#52de4a] hover:bg-[#45c33d]' : 'bg-[#000ab9] hover:bg-[#000890]'}`}>
              {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> שולח...</> : <>{currentStep === 0 ? 'בואו נתחיל!' : currentStep === totalSteps ? 'שלח/י אבחון' : 'קדימה ממשיכים'} <ArrowLeft size={20} /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;