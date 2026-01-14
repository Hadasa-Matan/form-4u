import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowRight, ArrowLeft, Building, Target, MessageSquare,
  Globe, CheckCircle2, Loader2, Zap, Star, Layout, MousePointer2, Bot, BarChart3, Users, Sparkles, Check
} from 'lucide-react';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    businessName: '',
    businessField: '',
    discoverySource: '',
    businessSector: '',
    employeeCount: '',
    challenges: [],
    timeWasters: [],
    goals: [],
    successMetric: '',
    serviceManagement: [],
    leadSources: [],
    commonQuestions: [],
    monthlyLeads: '',
    salesProcess: [],
    responseTime: '',
    hasKpi: '',
    upsellProcess: '',
    lostLeadsProcess: '',
    botGoals: [],
    botActiveTime: [],
    existingContent: '',
    designPreferences: '',
    starRatings: {},
    revenue: '',
    digitalPresence: '',
    priorExperience: '',
    userExperienceGoal: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 12;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleCheckboxChange = (field, option) => {
    setFormData(prev => {
      const current = prev[field] || [];
      if (current.includes(option)) {
        return { ...prev, [field]: current.filter(i => i !== option) };
      }
      return { ...prev, [field]: [...current, option] };
    });
  };

  const handleStarRating = (question, rating) => {
    setFormData(prev => ({
      ...prev,
      starRatings: { ...prev.starRatings, [question]: rating }
    }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.contactName.trim() || !formData.email.trim()) {
        setError('נא למלא שם ואימייל תקינים כדי שנוכל לחזור אליך');
        return;
      }
    }
    
    if (currentStep < totalSteps) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      // חלק את הנתונים לשני חלקים קטנים יותר
      const basicInfo = {
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        businessName: formData.businessName,
        businessSector: formData.businessSector,
        discoverySource: formData.discoverySource,
        challenges: formData.challenges.join(', '),
        timeWasters: formData.timeWasters.join(', '),
        goals: formData.goals.join(', '),
        successMetric: formData.successMetric
      };

      const detailedInfo = {
        email: formData.email, // למזהה
        serviceManagement: formData.serviceManagement.join(', '),
        leadSources: formData.leadSources.join(', '),
        commonQuestions: formData.commonQuestions.join(', '),
        monthlyLeads: formData.monthlyLeads,
        salesProcess: formData.salesProcess.join(', '),
        responseTime: formData.responseTime,
        lostLeadsProcess: formData.lostLeadsProcess,
        botGoals: formData.botGoals.join(', '),
        botActiveTime: formData.botActiveTime.join(', '),
        star_ratings: Object.entries(formData.starRatings)
          .map(([q, r]) => `${q}: ${r}/5`)
          .join('\n'),
        revenue: formData.revenue,
        digitalPresence: formData.digitalPresence,
        priorExperience: formData.priorExperience,
        userExperienceGoal: formData.userExperienceGoal
      };

     // איחוד כל המידע למייל אחד
const mergedInfo = {
  ...basicInfo,
  ...detailedInfo,
  // אם יש התנגשות שמות – האחרון מנצח
};

await Promise.race([
  emailjs.send(
    'service_w75vmod',
    'template_206bp7e',
    mergedInfo,
    'krNFSrf3lJxEvj1R9'
  ),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), 15000)
  )
]);
      
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      if (err.message === 'Timeout') {
        setError('הבקשה לקחה זמן רב מדי. אנא נסו שוב או צרו איתנו קשר ישירות.');
      } else {
        setError('חלה שגיאה בשליחת הטופס. נא לבדוק את החיבור לאינטרנט ולנסות שוב.');
      }
      console.error('EmailJS Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CheckboxOption = ({ field, label, emoji }) => (
    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer mb-2 ${
      formData[field]?.includes(label) 
        ? 'border-[#000ab9] bg-blue-50 shadow-md transform scale-[1.01]' 
        : 'border-slate-100 hover:border-slate-200 bg-white'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
          formData[field]?.includes(label) ? 'bg-[#000ab9] border-[#000ab9]' : 'border-slate-300'
        }`}>
          {formData[field]?.includes(label) && <Check size={16} className="text-white" />}
        </div>
        <span className="font-bold text-slate-700 text-lg">{label} {emoji}</span>
      </div>
      <input 
        type="checkbox" 
        className="hidden" 
        checked={formData[field]?.includes(label)} 
        onChange={() => handleCheckboxChange(field, label)} 
      />
    </label>
  );

  const RadioOption = ({ field, label, value }) => (
    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer mb-2 ${
      formData[field] === value 
        ? 'border-[#000ab9] bg-blue-50 shadow-md transform scale-[1.01]' 
        : 'border-slate-100 hover:border-slate-200 bg-white'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          formData[field] === value ? 'border-[#000ab9]' : 'border-slate-300'
        }`}>
          {formData[field] === value && <div className="w-3 h-3 bg-[#000ab9] rounded-full" />}
        </div>
        <span className="font-bold text-slate-700 text-lg">{label}</span>
      </div>
      <input 
        type="radio" 
        className="hidden" 
        name={field}
        checked={formData[field] === value} 
        onChange={() => handleInputChange(field, value)} 
      />
    </label>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 text-right" dir="rtl">
        <style>{`
          @font-face {
            font-family: 'FbAsparagos';
            src: url('./fonts/FbAsparagos-Regular.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: 'FbAsparagos';
            src: url('./fonts/FbAsparagos-Bold.ttf') format('truetype');
            font-weight: bold;
            font-style: normal;
          }
          * { font-family: 'FbAsparagos', sans-serif !important; }
        `}</style>
        <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-2xl w-full border-t-[12px] border-[#52de4a] animate-in zoom-in duration-500">
          <div className="mb-8 bg-green-50 w-28 h-28 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={70} className="text-[#52de4a]" />
          </div>
          <h2 className="text-5xl font-black text-[#000ab9] mb-6">האבחון נשלח בהצלחה!</h2>
          <div className="space-y-6 text-slate-600 text-2xl font-medium leading-relaxed">
            <p>תודה רבה על השיתוף ועל הזמן שהקדשת.</p>
            <div className="bg-blue-50 p-8 rounded-[30px] border-r-8 border-[#000ab9] text-[#000ab9] font-bold shadow-sm">
              ב-24 השעות הקרובות ישלח אליך סיכום האבחון המלא יחד עם המלצות ראשוניות לייעול והטמעת פתרונות טכנולוגיים בעסק שלך. 🚀
            </div>
            <p className="text-lg text-slate-400 italic">נתראה בקרוב!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-[#f8fafc] selection:bg-blue-100" dir="rtl">
      <style>{`
        @font-face {
          font-family: 'FbAsparagos';
          src: url('./fonts/FbAsparagos-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'FbAsparagos';
          src: url('./fonts/FbAsparagos-Bold.ttf') format('truetype');
          font-weight: bold;
          font-style: normal;
        }
        * { font-family: 'FbAsparagos', sans-serif !important; }
        input::placeholder, textarea::placeholder { font-family: 'FbAsparagos', sans-serif !important; }
        button, input, select, textarea { outline: none !important; }
      `}</style>
      
      <div className="max-w-4xl mx-auto">
        {currentStep > 0 && (
          <div className="mb-10 px-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-black text-[#000ab9]">הדסה מתן | אבחון עסק חכם</span>
              <span className="text-base font-bold bg-blue-100 px-4 py-1.5 rounded-full shadow-sm text-[#000ab9]">שלב {currentStep} מתוך {totalSteps}</span>
            </div>
            <div className="h-4 w-full bg-white rounded-full shadow-inner border border-slate-100 overflow-hidden p-1">
              <div 
                className="h-full bg-gradient-to-r from-[#7cd6de] to-[#52de4a] rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }} 
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-[50px] shadow-2xl p-10 md:p-20 border-b-[15px] border-[#000ab9] min-h-[700px] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 -z-0" />
          
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10 text-right">

            {currentStep === 0 && (
              <div className="space-y-8 leading-relaxed text-slate-700">
                <div className="text-center mb-10">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-32 h-32 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg relative">
                    <div className="absolute inset-0 bg-blue-200 rounded-3xl opacity-20 animate-pulse"></div>
                    <Zap size={60} className="text-[#000ab9] relative z-10" />
                  </div>
                  <h1 className="text-5xl font-black text-[#000ab9] mt-4 tracking-tight">שאלון לאבחון העסק 🤖</h1>
                </div>
                <h2 className="text-4xl font-bold text-slate-800">היי 😄</h2>
                <p className="text-2xl italic font-medium leading-relaxed">אנחנו יודעים שאתם עמוסים – אולי בין לקוח לשיחה 📞, אולי רגע לפני הפסקת קפה ☕,</p>
                <p className="text-3xl font-black text-[#000ab9] leading-tight">אבל אם הגעתם לפה – כנראה שאתם רוצים להפוך את העסק שלכם לחכם, יעיל וחסכוני יותר 🧠</p>
                <div className="bg-gradient-to-l from-slate-50 to-white p-8 rounded-[35px] border-r-8 border-[#7cd6de] font-bold text-2xl italic shadow-sm">
                  📋 השאלון לוקח כמה דקות בלבד ומאפשר לנו להגיע לשיחה מוכנים ומדויקים עבורכם 🎯
                </div>
                <p className="text-center text-[#000ab9] font-black animate-bounce text-3xl pt-10">מוכנים להתחיל? מכאן 👇</p>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-10">
                <div className="text-center">
                  <Building size={50} className="text-[#000ab9] mx-auto mb-4" />
                  <h2 className="text-4xl font-black text-[#000ab9]">נעים להכיר</h2>
                  <p className="text-slate-500 text-xl mt-2 font-bold">בואו נתחיל מהבסיס</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-bold">
                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">* שם מלא</label>
                    <input type="text" placeholder="השם שלך" className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl shadow-inner" value={formData.contactName} onChange={(e) => handleInputChange('contactName', e.target.value)} />
                  </div>
                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">* אימייל</label>
                    <input type="email" placeholder="email@example.com" dir="ltr" className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl text-right shadow-inner" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                  </div>
                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">טלפון</label>
                    <input type="text" placeholder="050-0000000" className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl text-right shadow-inner" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                  </div>
                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">שם העסק</label>
                    <input type="text" placeholder="שם העסק שלך" className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl text-right shadow-inner" value={formData.businessName} onChange={(e) => handleInputChange('businessName', e.target.value)} />
                  </div>
                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">תחום העסק</label>
                    <input type="text" placeholder="במה העסק עוסק?" className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl text-right shadow-inner" value={formData.businessSector} onChange={(e) => handleInputChange('businessSector', e.target.value)} />
                  </div>
                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">איך הגעתם אלינו?</label>
                    <input type="text" placeholder="חברה, המלצה, גוגל..." className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl text-right shadow-inner" value={formData.discoverySource} onChange={(e) => handleInputChange('discoverySource', e.target.value)} />
                  </div>
                </div>
                {error && <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-center font-black border-r-4 border-red-500 animate-bounce">{error}</div>}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center mb-10"><h2 className="text-4xl font-black text-[#000ab9]">מה מפריע לכם היום בעסק?</h2><p className="text-slate-500 text-xl font-bold">ניתן לבחור כמה אופציות</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CheckboxOption field="challenges" label="ניהול זמן לא יעיל" emoji="⏰" />
                  <CheckboxOption field="challenges" label="שירות לקוחות איטי מדי" emoji="🎯" />
                  <CheckboxOption field="challenges" label="קושי במעקב אחר לידים" emoji="📞" />
                  <CheckboxOption field="challenges" label="עומס משימות חוזרות" emoji="🔄" />
                  <CheckboxOption field="challenges" label="חוסר זמינות 24/7" emoji="🕙" />
                  <CheckboxOption field="challenges" label="קושי בהגדלת העסק" emoji="📈" />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-10"><h2 className="text-4xl font-black text-[#000ab9]">מהם גוזלי הזמן המרכזיים?</h2><p className="text-slate-500 text-xl font-bold">איפה אתם מרגישים שאתם "מתבזבזים"?</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CheckboxOption field="timeWasters" label="שיחות טלפון חוזרות" emoji="📞" />
                  <CheckboxOption field="timeWasters" label="מענה למיילים" emoji="📧" />
                  <CheckboxOption field="timeWasters" label="תיאום פגישות" emoji="📅" />
                  <CheckboxOption field="timeWasters" label="הזנת נתונים ידנית" emoji="⌨️" />
                  <CheckboxOption field="timeWasters" label="מענה לשאלות בסיסיות" emoji="❓" />
                  <CheckboxOption field="timeWasters" label="ביצוע מעקבים ותזכורות" emoji="👥" />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center mb-10"><h2 className="text-4xl font-black text-[#000ab9]">מה המטרה המרכזית שלכם?</h2><p className="text-slate-500 text-xl font-bold">מה הכי חשוב לכם להשיג?</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CheckboxOption field="goals" label="לא לפספס אף ליד" emoji="🎯" />
                  <CheckboxOption field="goals" label="להגדיל את המכירות" emoji="💰" />
                  <CheckboxOption field="goals" label="אוטומציה מלאה של תהליכים" emoji="🤖" />
                  <CheckboxOption field="goals" label="לפנות זמן למשפחה/פנאי" emoji="👨‍👩‍👧‍👦" />
                  <CheckboxOption field="goals" label="לשפר את חוויית הלקוח" emoji="✨" />
                  <CheckboxOption field="goals" label="סינון לידים איכותיים בלבד" emoji="🔍" />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-10 text-center">
                <div className="inline-block p-6 bg-blue-50 rounded-[35px] text-[#000ab9] mb-4 shadow-sm transform -rotate-3"><Target size={60} /></div>
                <h2 className="text-4xl font-black text-[#000ab9]">מה ייחשב הצלחה עבורכם?</h2>
                <p className="text-slate-500 text-xl font-bold">תארו את המצב האידיאלי בעוד כמה חודשים</p>
                <textarea className="w-full p-8 bg-slate-50 rounded-[40px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white outline-none h-56 text-right text-2xl shadow-inner transition-all" placeholder="לדוגמה: להגדיל אחוז המרה ב-25% תוך 4 חודשים..." value={formData.successMetric} onChange={(e) => handleInputChange('successMetric', e.target.value)} />
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-10">
                <div className="text-center mb-8"><h2 className="text-4xl font-black text-[#000ab9]">ניהול העסק וקבלת פניות</h2></div>
                <div className="space-y-6">
                  <p className="font-bold text-slate-700 text-2xl border-r-4 border-[#7cd6de] pr-4">איך כרגע מנוהל שירות הלקוחות בעסק שלכם?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CheckboxOption field="serviceManagement" label="אני בעצמי עונה לכל הפניות" emoji="👤" />
                    <CheckboxOption field="serviceManagement" label="יש לי צוות שמטפל בפניות" emoji="👥" />
                    <CheckboxOption field="serviceManagement" label="חלק אני וחלק העובדים" emoji="🔄" />
                    <CheckboxOption field="serviceManagement" label="יש לנו מיקור חוץ" emoji="🏢" />
                  </div>
                </div>
                <div className="mt-12 space-y-6">
                  <p className="font-bold text-slate-700 text-2xl border-r-4 border-[#7cd6de] pr-4">מאיפה הפניות מתקבלות? (ניתן לבחור כמה)</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CheckboxOption field="leadSources" label="האתר שלנו" emoji="🌐" />
                    <CheckboxOption field="leadSources" label="פייסבוק" emoji="🔵" />
                    <CheckboxOption field="leadSources" label="גוגל אדס" emoji="🔍" />
                    <CheckboxOption field="leadSources" label="מייל" emoji="📧" />
                    <CheckboxOption field="leadSources" label="וואטסאפ" emoji="📱" />
                    <CheckboxOption field="leadSources" label="אינסטגרם" emoji="📸" />
                    <CheckboxOption field="leadSources" label="טלפון ישיר" emoji="📞" />
                    <CheckboxOption field="leadSources" label="הפניות מלקוחות קיימים" emoji="👤" />
                  </div>
                </div>
                <div className="mt-12 space-y-6">
                  <p className="font-bold text-slate-700 text-2xl border-r-4 border-[#7cd6de] pr-4">אילו סוגי שאלות נפוצות אתם מקבלים?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CheckboxOption field="commonQuestions" label="שאלות על מחירים" emoji="💰" />
                    <CheckboxOption field="commonQuestions" label="זמינות ותיאום פגישות" emoji="📅" />
                    <CheckboxOption field="commonQuestions" label="פרטים על השירותים" emoji="🔧" />
                    <CheckboxOption field="commonQuestions" label="איך התהליך עובד" emoji="📋" />
                    <CheckboxOption field="commonQuestions" label="תשלומים וחשבוניות" emoji="💵" />
                    <CheckboxOption field="commonQuestions" label="מיקום וכתובת" emoji="📍" />
                    <CheckboxOption field="commonQuestions" label="תמיכה טכנית" emoji="🛠️" />
                    <CheckboxOption field="commonQuestions" label="מדיניות החזרות" emoji="↩️" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-10">
                <div className="text-center mb-8"><h2 className="text-4xl font-black text-[#000ab9]">תהליך המכירה שלכם</h2></div>
                <div className="space-y-6">
                  <p className="font-bold text-slate-700 text-2xl">מהי כמות הלידים הממוצעת בחודש?</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['1-50', '50-200', '200-500', 'יותר מ-500'].map(v => (
                      <button key={v} onClick={() => handleInputChange('monthlyLeads', v)} className={`p-5 rounded-[25px] border-2 font-bold transition-all text-xl shadow-sm ${formData.monthlyLeads === v ? 'bg-[#000ab9] text-white border-[#000ab9] transform scale-105' : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300'}`}>{v}</button>
                    ))}
                  </div>
                </div>
                <div className="mt-12 space-y-6">
                  <p className="font-bold text-slate-700 text-2xl">באיזה אופן תהליך המכירה קורה היום?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CheckboxOption field="salesProcess" label="פרונטלי - פגישות פנים אל פנים" emoji="🤝" />
                    <CheckboxOption field="salesProcess" label="מכירה טלפונית" emoji="📞" />
                    <CheckboxOption field="salesProcess" label="מכירה דיגיטלית מלאה באתר" emoji="💻" />
                    <CheckboxOption field="salesProcess" label="כנסים ואירועים" emoji="🏢" />
                    <CheckboxOption field="salesProcess" label="וואטסאפ" emoji="📱" />
                    <CheckboxOption field="salesProcess" label="מייל" emoji="📧" />
                  </div>
                </div>
                <div className="mt-12 space-y-6">
                  <p className="font-bold text-slate-700 text-2xl">מהו זמן התגובה הממוצע לליד?</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['מיידי', 'עד 24 שעות', '1-3 ימים', 'יותר מ-3 ימים'].map(v => (
                      <button key={v} onClick={() => handleInputChange('responseTime', v)} className={`p-5 rounded-[25px] border-2 font-bold transition-all text-lg shadow-sm ${formData.responseTime === v ? 'bg-[#000ab9] text-white border-[#000ab9] transform scale-105' : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300'}`}>{v}</button>
                    ))}
                  </div>
                </div>
                <div className="mt-12 space-y-4">
                   <p className="font-bold text-slate-700 text-2xl">תארו את התהליך שעוברים לידים שלא סגרו אתכם:</p>
                   <textarea className="w-full p-6 bg-slate-50 rounded-[30px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white outline-none h-32 text-right text-xl shadow-inner transition-all" placeholder="איך אתם מתמודדים עם לידים שלא הפכו ללקוחות?" value={formData.lostLeadsProcess} onChange={(e) => handleInputChange('lostLeadsProcess', e.target.value)} />
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-10">
                <div className="text-center mb-10"><h2 className="text-4xl font-black text-[#000ab9]">חזון האוטומציה בעסק</h2></div>
                <div className="space-y-6">
                  <p className="font-bold text-slate-700 text-2xl border-r-4 border-[#7cd6de] pr-4">באילו תחומים הייתם רוצים שהאוטומציה תחליף את העבודה הידנית שלכם?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CheckboxOption field="botGoals" label="מענה 24/7 ללקוחות" emoji="🕒" />
                    <CheckboxOption field="botGoals" label="זיהוי לידים איכותיים וסינון פניות לא מתאימות" emoji="🎯" />
                    <CheckboxOption field="botGoals" label="מענה לשאלות נפוצות" emoji="❓" />
                    <CheckboxOption field="botGoals" label="תיאום פגישות אוטומטי" emoji="📅" />
                    <CheckboxOption field="botGoals" label="שירות לקוחות בסיסי" emoji="🎧" />
                    <CheckboxOption field="botGoals" label="איסוף פרטי לידים חדשים" emoji="📝" />
                    <CheckboxOption field="botGoals" label="הקלה על העומס של הצוות" emoji="⚡" />
                    <CheckboxOption field="botGoals" label="הכוונה במשפך המכירות" emoji="🔄" />
                  </div>
                </div>
                <div className="mt-12 space-y-6">
                  <p className="font-bold text-slate-700 text-2xl border-r-4 border-[#7cd6de] pr-4">מתי תרצו שהאוטומציה תהיה פעילה?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CheckboxOption field="botActiveTime" label="24/7 כל השבוע" emoji="🌍" />
                    <CheckboxOption field="botActiveTime" label="בשעות העבודה בלבד" emoji="🕒" />
                    <CheckboxOption field="botActiveTime" label="גם בערבים (אחרי שעות העבודה)" emoji="🌆" />
                    <CheckboxOption field="botActiveTime" label="גם בסופי שבוע" emoji="📅" />
                    <CheckboxOption field="botActiveTime" label="ללא שבתות וחגים" emoji="🕯️" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 9 && (
              <div className="space-y-8">
                <div className="text-center mb-10">
                  <div className="bg-yellow-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Star size={45} className="text-yellow-400 fill-yellow-400" />
                  </div>
                  <h2 className="text-4xl font-black text-[#000ab9]">דרגת ההזדהות עם אתגרים</h2>
                  <p className="text-slate-500 text-xl font-bold mt-2">עד כמה המשפטים הבאים מתארים את העסק שלכם?</p>
                </div>
                <div className="space-y-4">
                  {[
                    "המזכיר/ה שלי עסוק/ה רוב היום בשאלות חוזרות מלקוחות",
                    "מתפספסים לי לידים ועסקאות בגלל חוסר מענה מהיר",
                    "אין לי מספיק מעקב אחרי סטטוס לקוח בתהליך המכירה",
                    "יש אצלי עומס של משימות החוזרות על עצמן ביומיום",
                    "חוסר יכולת להעניק מענה מהיר לשאלות ופניות של לקוחות",
                    "עומס של המשימות הידניות גורם לי לאבד מידע חשוב",
                    "לקוחות שאינם מקבלים תשובות מהירות עלולים לבחור במתחרים",
                    "הצורך בגלישה בין כמה מערכות כדי לסנכרן מידע מבזבז לי זמן יקר",
                    "בזמן שאנחנו כותבים מיילים ומתקשרים, המתחרים שלנו מתקדמים",
                    "הלקוחות שלי מתקשים למצוא תשובות לשאלות נפוצות בצורה מהירה",
                    "הלקוחות שלי לא מצליחים להגיע לשירותים שהעסק שלי מציע בגלל חוסר במידע זמין ויעיל"
                  ].map((q) => (
                    <div key={q} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-50 rounded-[25px] gap-6 border border-transparent hover:border-slate-200 hover:bg-white transition-all shadow-sm">
                      <span className="font-bold text-slate-700 flex-1 text-lg leading-tight">{q}</span>
                      <div className="flex gap-2 justify-center bg-white p-3 rounded-2xl shadow-inner border border-slate-100">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button 
                            key={star} 
                            onClick={() => handleStarRating(q, star)} 
                            className="focus:outline-none transform active:scale-90 transition-all duration-200"
                          >
                            <Star 
                              size={32} 
                              className={`transition-colors ${formData.starRatings[q] >= star ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 hover:text-yellow-200'}`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 10 && (
              <div className="space-y-12">
                <div className="text-center">
                  <BarChart3 size={50} className="text-[#000ab9] mx-auto mb-4" />
                  <h2 className="text-4xl font-black text-[#000ab9]">מצב פיננסי ודיגיטלי</h2>
                </div>
                <div className="space-y-6">
                   <p className="font-bold text-slate-700 text-2xl pr-4 border-r-4 border-[#000ab9]">מהו טווח ההכנסה החודשי הממוצע של העסק?</p>
                   <select 
                    className="w-full p-6 bg-slate-50 rounded-[30px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white outline-none text-right font-bold text-xl shadow-inner appearance-none cursor-pointer" 
                    value={formData.revenue} 
                    onChange={(e) => handleInputChange('revenue', e.target.value)}
                   >
                    <option value="">בחרו טווח הכנסה</option>
                    <option value="0-30k">0 - 30,000 ₪</option>
                    <option value="30-100k">30,000 - 100,000 ₪</option>
                    <option value="100k+">מעל 100,000 ₪</option>
                  </select>
                </div>
                <div className="space-y-6">
                  <p className="font-bold text-slate-700 text-2xl pr-4 border-r-4 border-[#000ab9]">נוכחות דיגיטלית (קישור לאתר או עמוד עסקי):</p>
                  <input type="text" placeholder="https://..." className="w-full p-6 bg-slate-50 rounded-[30px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white outline-none text-left shadow-inner font-mono text-xl" dir="ltr" value={formData.digitalPresence} onChange={(e) => handleInputChange('digitalPresence', e.target.value)} />
                </div>
              </div>
            )}

            {currentStep === 11 && (
              <div className="space-y-10">
                <div className="text-center mb-8">
                  <Sparkles size={50} className="text-[#000ab9] mx-auto mb-4" />
                  <h2 className="text-4xl font-black text-[#000ab9]">חוויית משתמש וניסיון קודם</h2>
                </div>
                <div className="space-y-6 text-right mb-10">
                  <p className="font-bold text-slate-700 text-2xl border-r-4 border-[#000ab9] pr-4">האם התנסיתם בעבר בהטמעת מערכות אוטומטיות או שירות דיגיטלי?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RadioOption field="priorExperience" label="כן, יש לנו ניסיון קודם" value="yes" />
                    <RadioOption field="priorExperience" label="לא, זו תיהיה הפעם הראשונה שלנו" value="no" />
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="font-bold text-slate-700 text-2xl border-r-4 border-[#000ab9] pr-4">יש עוד משהו שתרצו לשתף אותנו? א</p>
                  <textarea className="w-full p-8 bg-slate-50 rounded-[40px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white outline-none h-48 text-right text-xl shadow-inner transition-all" placeholder="הבמה שלכם: ספרו לנו על כל משימה ידנית שהייתם רוצים להפוך לאוטומטית, או שתפו אותנו בכל פרט נוסף שיוכל לעזור לנו לדייק את הפתרון עבורכם." value={formData.userExperienceGoal} onChange={(e) => handleInputChange('userExperienceGoal', e.target.value)} />
                </div>
              </div>
            )}

            {currentStep === 12 && (
              <div className="space-y-10">
                <div className="text-center mb-10">
                  <CheckCircle2 size={60} className="text-[#000ab9] mx-auto mb-4" />
                  <h2 className="text-4xl font-black text-[#000ab9]">סיכום ושליחה</h2>
                  <p className="text-slate-500 text-xl font-bold mt-2 italic">כל המידע נאסף. אנחנו מוכנים לאבחן את העסק שלך!</p>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-white p-10 rounded-[40px] border-2 border-slate-100 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#000ab9]" />
                  <h3 className="text-2xl font-black text-slate-800 mb-8 border-b pb-4">תקציר פרטים:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-black text-slate-500">עסק:</span>
                      <span className="text-xl font-bold text-[#000ab9]">{formData.businessName || "לא צוין"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-black text-slate-500">איש קשר:</span>
                      <span className="text-xl font-bold text-[#000ab9]">{formData.contactName || "לא צוין"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-black text-slate-500">מייל:</span>
                      <span className="text-xl font-bold text-[#000ab9] font-mono">{formData.email}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                      <span className="font-black text-slate-500">טלפון:</span>
                      <span className="text-xl font-bold text-[#000ab9]">{formData.phone || "לא צוין"}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-6 mt-16 relative z-10">
            {currentStep > 0 && (
              <button 
                onClick={prevStep} 
                className="flex-1 py-6 rounded-[30px] font-black text-slate-500 bg-slate-100 hover:bg-slate-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 text-2xl shadow-lg border-b-4 border-slate-300"
              >
                <ArrowRight size={30} /> חזרה
              </button>
            )}
            <button 
              onClick={currentStep === totalSteps ? handleSubmit : nextStep} 
              disabled={isSubmitting}
              className={`flex-[2] py-6 rounded-[30px] font-black transition-all flex items-center justify-center gap-3 text-2xl shadow-2xl border-b-4 ${
                isSubmitting 
                  ? 'bg-slate-400 border-slate-500 cursor-not-allowed' 
                  : 'bg-[#000ab9] hover:bg-blue-800 hover:scale-[1.03] active:scale-95 text-white border-blue-900'
              }`}
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin" size={30} /> שולח אבחון...</>
              ) : (
                <>
                  {currentStep === totalSteps ? 'שלח אבחון עכשיו 🚀' : 'המשך לשלב הבא'}
                  {currentStep < totalSteps && <ArrowLeft size={30} />}
                </>
              )}
            </button>
          </div>
          {error && <p className="text-red-500 text-center font-black mt-6 text-xl animate-pulse">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;