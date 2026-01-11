import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowRight, ArrowLeft, Building, Target, MessageSquare,
  Globe, CheckCircle2, Loader2, Zap, Star, Layout, MousePointer2, Bot, BarChart3, Users, Sparkles, Check
} from 'lucide-react';

const SurveyForm = () => {
  const fontStyle = { fontFamily: '"FbAsparagos", sans-serif' };

  const [formData, setFormData] = useState({
    // שלבים 1-5
    contactName: '', email: '', phone: '', businessName: '', businessField: '', discoverySource: '', businessSector: '', employeeCount: '',
    challenges: [], timeWasters: [], goals: [], successMetric: '',
    // שלבים 6-11
    serviceManagement: [], leadSources: [], commonQuestions: [],
    monthlyLeads: '', salesProcess: [], responseTime: '', hasKpi: '', upsellProcess: '', lostLeadsProcess: '',
    botGoals: [], botActiveTime: [], existingContent: '', designPreferences: '',
    starRatings: {},
    revenue: '', digitalPresence: '',
    priorExperience: '', userExperienceGoal: ''
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
      return { ...prev, [field]: current.includes(option) ? current.filter(i => i !== option) : [...current, option] };
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
        setError('נא למלא שם ואימייל תקינים');
        return;
      }
    }
    if (currentStep === totalSteps) { handleSubmit(); return; }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await emailjs.send(
        'service_04u46mc',
        'template_44cshno',
        { ...formData, star_ratings: JSON.stringify(formData.starRatings) },
        '0MvQ0-Daq0m7nbe2D'
      );
      setIsSuccess(true);
    } catch (err) {
      setError('שגיאה בשליחה. נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // רכיבי עזר לעיצוב
  const CheckboxOption = ({ field, label, emoji }) => (
    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer mb-2 ${formData[field]?.includes(label) ? 'border-[#000ab9] bg-blue-50 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}>
      <div className="flex items-center gap-3">
        <input type="checkbox" className="w-5 h-5 accent-[#000ab9]" checked={formData[field]?.includes(label)} onChange={() => handleCheckboxChange(field, label)} />
        <span className="font-bold text-slate-700">{label} {emoji}</span>
      </div>
    </label>
  );

  const RadioOption = ({ field, label, value }) => (
    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer mb-2 ${formData[field] === value ? 'border-[#000ab9] bg-blue-50 shadow-md' : 'border-slate-100 hover:border-slate-200'}`}>
      <div className="flex items-center gap-3">
        <input type="radio" name={field} className="w-5 h-5 accent-[#000ab9]" checked={formData[field] === value} onChange={() => handleInputChange(field, value)} />
        <span className="font-bold text-slate-700">{label}</span>
      </div>
    </label>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4" dir="rtl" style={fontStyle}>
        <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-lg w-full border-t-8 border-[#52de4a]">
          <CheckCircle2 size={80} className="text-[#52de4a] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#000ab9] mb-4">תודה רבה!</h2>
          <p className="text-slate-600 text-lg">האבחון נשלח אלינו בהצלחה.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-[#f8fafc]" dir="rtl" style={fontStyle}>
      <div className="max-w-4xl mx-auto">

        {/* Progress Bar */}
        {currentStep > 0 && (
          <div className="mb-8 px-4">
            <div className="flex justify-between items-end mb-4 font-bold text-[#000ab9]">
              <span className="text-xl font-black italic">הדסה מתן | אבחון עסק חכם</span>
              <span className="text-sm bg-blue-100 px-3 py-1 rounded-full">שלב {currentStep} מתוך {totalSteps}</span>
            </div>
            <div className="h-3 w-full bg-white rounded-full shadow-inner border border-slate-100 overflow-hidden p-0.5">
              <div className="h-full bg-gradient-to-r from-[#7cd6de] to-[#52de4a] rounded-full transition-all duration-700" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
            </div>
          </div>
        )}

        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-16 border-b-[12px] border-[#000ab9] min-h-[650px] flex flex-col justify-between">

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* שלב 0 - פתיחה */}
            {currentStep === 0 && (
              <div className="space-y-6 text-right leading-relaxed text-slate-700">
                <div className="text-center mb-8"><Zap size={48} className="text-[#000ab9] mx-auto animate-pulse" /><h1 className="text-4xl font-black text-[#000ab9] mt-4">שאלון לאבחון העסק 🤖</h1></div>
                <h2 className="text-3xl font-bold">היי 😄</h2>
                <p className="text-xl italic font-medium">אנחנו יודעים שאתם עמוסים – אולי בין לקוח לשיחה 📞, אולי רגע לפני הפסקת קפה ☕,</p>
                <p className="text-2xl font-bold text-[#000ab9]">אבל אם הגעתם לפה – כנראה שאתם רוצים להפוך את העסק שלכם לחכם, יעיל וחסכוני יותר 🧠</p>
                <div className="bg-slate-50 p-6 rounded-3xl border-r-4 border-[#7cd6de] font-bold text-xl italic">📋 השאלון לוקח כמה דקות בלבד ומאפשר לנו להגיע לשיחה מוכנים 🎯</div>
                <p className="text-center text-[#000ab9] font-black animate-bounce text-2xl pt-6">מוכנים להתחיל? מכאן 👇</p>
              </div>
            )}

            {/* שלב 1 - פרטים */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center"><Building size={40} className="text-[#000ab9] mx-auto mb-4" /><h2 className="text-3xl font-bold text-[#000ab9]">נעים להכיר</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right font-bold">
                  <div className="space-y-2 text-[#000ab9]"><label className="block italic">* שם מלא</label><input type="text" style={fontStyle} placeholder="השם שלך" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none" value={formData.contactName} onChange={(e) => handleInputChange('contactName', e.target.value)} /></div>
                  <div className="space-y-2 text-[#000ab9]"><label className="block italic">* אימייל</label><input type="email" style={fontStyle} placeholder="email@example.com" dir="ltr" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} /></div>
                  <div className="space-y-2 text-[#000ab9]"><label className="block italic">טלפון</label><input type="text" style={fontStyle} placeholder="050-0000000" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} /></div>
                  <div className="space-y-2 text-[#000ab9]"><label className="block italic">שם העסק</label><input type="text" style={fontStyle} placeholder="שם העסק שלך" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right" value={formData.businessName} onChange={(e) => handleInputChange('businessName', e.target.value)} /></div>
                  <div className="space-y-2 text-[#000ab9]"><label className="block italic">תחום העסק</label><input type="text" style={fontStyle} placeholder="במה העסק עוסק?" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right" value={formData.businessSector} onChange={(e) => handleInputChange('businessSector', e.target.value)} /></div>
                  <div className="space-y-2 text-[#000ab9]"><label className="block italic">מקור הגעה</label><input type="text" style={fontStyle} placeholder="איך הגעתם אלינו?" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right" value={formData.discoverySource} onChange={(e) => handleInputChange('discoverySource', e.target.value)} /></div>
                </div>
                {error && <p className="text-red-500 text-center font-bold">{error}</p>}
              </div>
            )}

            {/* שלב 2 - אתגרים */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center"><h2 className="text-3xl font-bold text-[#000ab9]">מה מפריע לכם היום בעסק?</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <CheckboxOption field="challenges" label="ניהול זמן לא יעיל" emoji="⏰" />
                  <CheckboxOption field="challenges" label="שירות לקוחות איטי" emoji="🎯" />
                  <CheckboxOption field="challenges" label="מעקב אחר לידים" emoji="📞" />
                  <CheckboxOption field="challenges" label="משימות חוזרות" emoji="🔄" />
                  <CheckboxOption field="challenges" label="זמינות 24/7" emoji="🕙" />
                  <CheckboxOption field="challenges" label="קושי בהגדלת העסק" emoji="📈" />
                </div>
              </div>
            )}

            {/* שלב 3 - גוזלי זמן */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center"><h2 className="text-3xl font-bold text-[#000ab9]">מהם גוזלי הזמן המרכזיים?</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <CheckboxOption field="timeWasters" label="שיחות טלפון חוזרות" emoji="📞" />
                  <CheckboxOption field="timeWasters" label="מענה למיילים" emoji="📧" />
                  <CheckboxOption field="timeWasters" label="תיאום פגישות" emoji="📅" />
                  <CheckboxOption field="timeWasters" label="הזנת נתונים" emoji="⌨️" />
                  <CheckboxOption field="timeWasters" label="שאלות בסיסיות" emoji="❓" />
                  <CheckboxOption field="timeWasters" label="מעקבים ותזכורות" emoji="👥" />
                </div>
              </div>
            )}

            {/* שלב 4 - מטרות */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center"><h2 className="text-3xl font-bold text-[#000ab9]">מה המטרה המרכזית שלכם?</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <CheckboxOption field="goals" label="לא לפספס לידים" emoji="🎯" />
                  <CheckboxOption field="goals" label="להגדיל מכירות" emoji="💰" />
                  <CheckboxOption field="goals" label="אוטומציה מלאה" emoji="🤖" />
                  <CheckboxOption field="goals" label="יותר זמן למשפחה" emoji="👨‍👩‍👧‍👦" />
                  <CheckboxOption field="goals" label="לשפר חוויית לקוח" emoji="✨" />
                  <CheckboxOption field="goals" label="סינון לידים איכותיים" emoji="🔍" />
                </div>
              </div>
            )}

            {/* שלב 5 - הצלחה */}
            {currentStep === 5 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><Target size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">מה ייחשב הצלחה עבורכם?</h2>
                <textarea style={fontStyle} className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-40 text-right text-lg shadow-inner" placeholder="לדוגמה: להגדיל אחוז המרה ב-25% תוך 4 חודשים..." value={formData.successMetric} onChange={(e) => handleInputChange('successMetric', e.target.value)} />
              </div>
            )}


            {/* שלב 6 - ניהול העסק וקבלת פניות */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-[#000ab9]">ניהול העסק וקבלת פניות</h2>
                </div>

                <div className="space-y-4">
                  <p className="font-bold text-slate-700 text-lg">איך כרגע מנוהל שירות הלקוחות בעסק שלכם? (ניתן לבחור כמה)</p>
                  <div className="grid grid-cols-1 gap-2">
                    <CheckboxOption field="serviceManagement" label="אני בעצמי עונה לכל הפניות" emoji="👤" />
                    <CheckboxOption field="serviceManagement" label="יש צוות שמטפל בפניות" emoji="👥" />
                    <CheckboxOption field="serviceManagement" label="חלק אני וחלק העובדים" emoji="🔄" />
                    <CheckboxOption field="serviceManagement" label="מיקור חוץ (אאוטסורסינג)" emoji="🏢" />
                  </div>
                </div>

                <div className="mt-8">
                  <p className="font-bold text-slate-700 mb-3 text-lg">מאיפה הפניות מתקבלות? (בחירה מרובה)</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <CheckboxOption field="leadSources" label="האתר שלנו" emoji="🌐" />
                    <CheckboxOption field="leadSources" label="פייסבוק" emoji="🔵" />
                    <CheckboxOption field="leadSources" label="גוגל אדס" emoji="🔍" />
                    <CheckboxOption field="leadSources" label="מייל" emoji="📧" />
                    <CheckboxOption field="leadSources" label="וואטסאפ" emoji="📱" />
                    <CheckboxOption field="leadSources" label="אינסטגרם" emoji="📸" />
                    <CheckboxOption field="leadSources" label="טלפון ישיר" emoji="📞" />
                    <CheckboxOption field="leadSources" label="הפניות מלקוחות" emoji="👤" />
                  </div>
                </div>

                <div className="mt-8">
                  <p className="font-bold text-slate-700 mb-3 text-lg">אילו סוגי שאלות נפוצות אתם מקבלים? (בחירה מרובה)</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <CheckboxOption field="commonQuestions" label="שאלות על מחירים" emoji="💰" />
                    <CheckboxOption field="commonQuestions" label="זמינות ותיאום" emoji="📅" />
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

            {/* שלב 7 - תהליך המכירה שלכם */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-block p-3 bg-blue-100 rounded-full text-[#000ab9] mb-2">
                    <Target size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-[#000ab9]">תהליך המכירה שלכם</h2>
                  <p className="text-slate-500">בואו נבין איך הלקוחות הופכים למכירות</p>
                </div>

                <div className="space-y-4">
                  <p className="font-bold text-slate-700">מהי כמות הלידים בחודש?</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {['1-50', '50-200', '200-500', 'יותר מ-500'].map(v => (
                      <button key={v} onClick={() => handleInputChange('monthlyLeads', v)} className={`p-3 rounded-xl border-2 font-bold transition-all text-sm ${formData.monthlyLeads === v ? 'bg-[#000ab9] text-white border-[#000ab9]' : 'bg-white border-slate-100 text-slate-600'}`}>{v}</button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <p className="font-bold text-slate-700">באיזה אופן תהליך המכירה קורה היום?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <CheckboxOption field="salesProcess" label="פרונטלי - פגישות פנים אל פנים" emoji="🤝" />
                    <CheckboxOption field="salesProcess" label="טלפוני" emoji="📞" />
                    <CheckboxOption field="salesProcess" label="דיגיטלי - דרך האתר" emoji="💻" />
                    <CheckboxOption field="salesProcess" label="כנסים ואירועים" emoji="🏢" />
                    <CheckboxOption field="salesProcess" label="וואטסאפ" emoji="📱" />
                    <CheckboxOption field="salesProcess" label="מייל" emoji="📧" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <p className="font-bold text-slate-700">כמה זמן לוקח מרגע קבלת הפנייה עד טיפול?</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { label: 'מיידי', icon: '⚡' },
                      { label: 'תוך 24 שעות', icon: '🕒' },
                      { label: '1-3 ימים', icon: '📅' },
                      { label: 'יותר מ-3 ימים', icon: '⏰' }
                    ].map(item => (
                      <button key={item.label} onClick={() => handleInputChange('responseTime', item.label)} className={`p-3 rounded-xl border-2 font-bold transition-all text-sm flex flex-col items-center gap-1 ${formData.responseTime === item.label ? 'bg-[#000ab9] text-white border-[#000ab9]' : 'bg-white border-slate-100 text-slate-600'}`}>
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="space-y-3">
                    <p className="font-bold text-slate-700">האם יש לכם מדדים לתהליכי המכירה/שיווק?</p>
                    <RadioOption field="hasKpi" label="כן, יש לנו מעקב KPI" value="yes" />
                    <RadioOption field="hasKpi" label="לא, אין לנו מעקב" value="no" />
                  </div>

                  <div className="space-y-3">
                    <p className="font-bold text-slate-700">יש לכם פעולות להגדלת שווי הלקוחות הקיימים?</p>
                    <RadioOption field="upsellProcess" label="כן, יש לנו תוכניות שדרוג" value="yes" />
                    <RadioOption field="upsellProcess" label="לא, אין לנו" value="no" />
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <p className="font-bold text-slate-700">תארו את התהליך שעוברים לידים שלא סגרו אתכם</p>
                  <textarea
                    style={fontStyle}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-32 text-right shadow-inner"
                    placeholder="איך אתם מתמודדים עם לידים שלא הפכו ללקוחות?"
                    value={formData.lostLeadsProcess}
                    onChange={(e) => handleInputChange('lostLeadsProcess', e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* שלב 8 - צרכים וציפיות מהאוטומציה */}
            {currentStep === 8 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-block p-3 bg-blue-100 rounded-full text-[#000ab9] mb-2">
                    <Bot size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-[#000ab9]">מה הייתם שמחים להפוך לאוטומטי וליצור שקט תפעולי?</h2>
                  <p className="text-slate-500">בואו נגדיר מה האוטומציה/הבוט צריכים לעשות בשבילכם</p>
                </div>

                <div className="space-y-4">
                  <p className="font-bold text-slate-700 text-lg">מהן המטרות העיקריות שלכם מהכנסת אוטומציות לעסק?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <CheckboxOption field="botGoals" label="מענה 24/7" emoji="🕒" />
                    <CheckboxOption field="botGoals" label="סינון וכישור לידים" emoji="🎯" />
                    <CheckboxOption field="botGoals" label="מענה לשאלות נפוצות" emoji="❓" />
                    <CheckboxOption field="botGoals" label="תיאום פגישות אוטומטי" emoji="📅" />
                    <CheckboxOption field="botGoals" label="שירות לקוחות בסיסי" emoji="🎧" />
                    <CheckboxOption field="botGoals" label="איסוף פרטי לידים" emoji="📝" />
                    <CheckboxOption field="botGoals" label="הקלה על העומס" emoji="⚡" />
                    <CheckboxOption field="botGoals" label="הכוונה במשפך מכירות" emoji="🔄" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <p className="font-bold text-slate-700 text-lg">מתי אתם רוצים שהבוט/אוטומציה יהיו זמינים?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <CheckboxOption field="botActiveTime" label="24/7 כל השבוע" emoji="🌍" />
                    <CheckboxOption field="botActiveTime" label="שעות העבודה בלבד" emoji="🕒" />
                    <CheckboxOption field="botActiveTime" label="גם בערבים" emoji="🌆" />
                    <CheckboxOption field="botActiveTime" label="גם בסופי שבוע" emoji="📅" />
                    <CheckboxOption field="botActiveTime" label="ללא שבתות וחגים" emoji="🕯️" />
                  </div>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="space-y-3">
                    <p className="font-bold text-slate-700">יש לכם מידע כתוב קיים שתרצו לשלב? (FAQ/מסמכי שירות)</p>
                    <RadioOption field="existingContent" label="כן, יש לנו תכנים מוכנים" value="yes" />
                    <RadioOption field="existingContent" label="לא, נצטרך לבנות מההתחלה" value="no" />
                  </div>

                  <div className="space-y-3">
                    <p className="font-bold text-slate-700">יש לכם העדפות עיצוביות או טכנולוגיות?</p>
                    <textarea
                      style={fontStyle}
                      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-24 text-right shadow-inner"
                      placeholder="צבעי מותג, סגנון עיצוב, פלטפורמות מועדפות..."
                      value={formData.designPreferences}
                      onChange={(e) => handleInputChange('designPreferences', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* שלב 9 - דרגת הזדהות עם אתגרים בעסק */}
            {currentStep === 9 && (
              <div className="space-y-6">
                <div className="text-center mb-9">
                  <Star size={40} className="text-yellow-400 mx-auto mb-2 fill-yellow-400" />
                  <h2 className="text-3xl font-black text-[#000ab9]">דרגת ההזדהות עם אתגרים בעסק</h2>
                  <p className="text-slate-500 italic">כוכב אחד = כלל לא מזדהה | חמישה כוכבים = מזדהה במידה רבה מאוד</p>
                </div>

                <div className="space-y-3">
                  {[
                    "המזכיר/ה שלי עסוק/ה רוב היום בשאלות חוזרות מלקוחות",
                    "מתפספסים לי לידים ועסקאות",
                    "אין לי מספיק מעקב אחרי סטטוס לקוח",
                    "יש אצלי עומס של משימות החוזרות על עצמן ביומיום",
                    "חוסר יכולת להעניק מענה מהיר לשאלות ופניות של לקוחות",
                    "עומס של המשימות הידניות גורם לי לאבד מידע חשוב",
                    "לקוחות שאינם מקבלים תשובות מהירות עלולים לבחור במתחרים",
                    "הצורך בגלישה בין כמה מערכות כדי לסנכרן מידע מבזבז לי זמן יקר",
                    "בזמן שאנחנו כותבים מיילים ומתקשרים, המתחרים שלנו מתקדמים",
                    "הלקוחות שלי מתקשים למצוא תשובות לשאלות נפוצות בצורה מהירה",
                    "הלקוחות שלי לא מצליחים להגיע לשירותים שהעסק שלי מציע בגלל חוסר במידע זמין ויעיל"
                  ].map((q) => (
                    <div key={q} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-50 rounded-2xl gap-4 border border-transparent hover:border-slate-200 transition-all">
                      <span className="font-bold text-slate-700 flex-1 text-sm md:text-base leading-tight">{q}</span>
                      <div className="flex gap-1 justify-center bg-white p-2 rounded-xl shadow-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleStarRating(q, star)}
                            className="focus:outline-none transform active:scale-90 transition-transform"
                          >
                            <Star
                              size={24}
                              className={`transition-colors ${formData.starRatings[q] >= star ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-blue-50 p-4 rounded-2xl border-r-4 border-[#000ab9] flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <p className="text-[#000ab9] font-bold text-sm">
                    <span className="underline">טיפ:</span> הדירוגים שלכם יעזרו לנו להתמקד בפתרונות שיביאו לכם את התוצאות הכי משמעותיות.
                  </p>
                </div>
              </div>
            )}

            {/* שלב 10 - פיננסי ודיגיטל */}
            {currentStep === 10 && (
              <div className="space-y-12">
                <div className="text-center">
                  <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><BarChart3 size={40} /></div>
                  <h2 className="text-3xl font-bold text-[#000ab9]">מצב פיננסי ודיגיטלי</h2>
                </div>
                
                <div className="space-y-4">
                   <p className="font-bold text-slate-700">מהו טווח ההכנסה החודשי של העסק?</p>
                   <select style={fontStyle} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right font-bold text-lg shadow-inner" value={formData.revenue} onChange={(e) => handleInputChange('revenue', e.target.value)}>
                    <option value="">בחרו טווח הכנסה</option>
                    <option value="0-30k">0 - 30,000 ₪</option>
                    <option value="30-100k">30,000 - 100,000 ₪</option>
                    <option value="100k+">מעל 100,000 ₪</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <p className="font-bold text-slate-700">נוכחות דיגיטלית (קישור לאתר או עמוד עסקי):</p>
                  <input type="text" style={fontStyle} placeholder="https://..." className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-left shadow-inner" dir="ltr" value={formData.digitalPresence} onChange={(e) => handleInputChange('digitalPresence', e.target.value)} />
                </div>
              </div>
            )}

            {/* שלב 11 - ניסיון קודם */}
            {currentStep === 11 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="inline-block p-3 bg-blue-100 rounded-full text-[#000ab9] mb-2">
                    <Sparkles size={32} />
                  </div>
                  <h2 className="text-3xl font-bold text-[#000ab9]">ניסיון קודם</h2>
                </div>

                <div className="space-y-4">
                  <p className="font-bold text-slate-700">יש לכם ניסיון קודם עם בוטים או מערכות אוטומטיות?</p>
                  <RadioOption field="priorExperience" label="כן, יש לנו ניסיון" value="yes" />
                  <RadioOption field="priorExperience" label="לא, זה יהיה הראשון" value="no" />
                </div>

                <div className="mt-8 space-y-3">
                  <p className="font-bold text-slate-700">איזה סוג של חוויית משתמש הייתם רוצים לספק בבוט?</p>
                  <textarea
                    style={fontStyle}
                    className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-32 text-right shadow-inner"
                    placeholder="איך אתם רוצים שהלקוחות ירגישו?"
                    value={formData.userExperienceGoal}
                    onChange={(e) => handleInputChange('userExperienceGoal', e.target.value)}
                  />
                </div>

                <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="text-[#000ab9] font-bold text-lg mb-2 flex items-center gap-2">🥳 כמעט סיימנו!</h3>
                  <p className="text-blue-800 text-sm leading-relaxed">אתם עומדים לסיים את השאלון. בצעד הבא תוכלו לסקור את המידע ולשלוח אותו.</p>
                </div>
              </div>
            )}

            {/* שלב 12 - סיכום ושליחה */}
            {currentStep === 12 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-[#000ab9]">סיכום ושליחה</h2>
                  <p className="text-slate-500">בדקו את הפרטים ושלחו את השאלון</p>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">פרטי התקשרות:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="font-bold text-slate-700">עסק:</span>
                      <span className="text-slate-600">{formData.businessName || "לא צוין"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="font-bold text-slate-700">איש קשר:</span>
                      <span className="text-slate-600">{formData.contactName || "לא צוין"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="font-bold text-slate-700">מייל:</span>
                      <span className="text-slate-600 font-mono text-sm">{formData.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="font-bold text-slate-700">טלפון:</span>
                      <span className="text-slate-600">{formData.phone || "לא צוין"}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="font-bold text-slate-700">תחום:</span>
                      <span className="text-slate-600">{formData.businessSector || "לא צוין"}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="text-[#000ab9] font-bold text-lg mb-4 flex items-center gap-2">🚀 מה קורה הלאה?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-blue-900"><Check size={16} /><span>נסקור את המידע ונתאים פתרון</span></li>
                    <li className="flex items-center gap-3 text-blue-900"><Check size={16} /><span>נכין הצעה להגדלת תוצאות</span></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-12">
            {currentStep > 0 && (
              <button onClick={prevStep} className="flex-1 py-5 rounded-3xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all flex items-center justify-center gap-2 text-xl">
                <ArrowRight size={24} /> חזרה
              </button>
            )}
            <button 
              onClick={nextStep} 
              disabled={isSubmitting}
              className={`flex-[2] py-5 rounded-3xl font-black transition-all flex items-center justify-center gap-2 text-xl shadow-xl ${isSubmitting ? 'bg-slate-400' : 'bg-gradient-to-r from-[#000ab9] to-[#000ab9] hover:scale-[1.02] active:scale-95 text-white'}`}
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : (currentStep === totalSteps ? 'שלח אבחון עכשיו 🚀' : 'המשך לשלב הבא')}
              {currentStep < totalSteps && <ArrowLeft size={24} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;