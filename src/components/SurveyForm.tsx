import React, { useState, useEffect, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowRight, ArrowLeft, Building, Target,
  CheckCircle2, Loader2, Zap, Star, BarChart3, Sparkles, Check
} from 'lucide-react';

const SurveyForm = () => {
  // ====== EmailJS config (שימי כאן את שלך) ======
  const EMAILJS_SERVICE_ID = 'service_04u46mc';
  const EMAILJS_TEMPLATE_ID = 'template_44cshno';
  const EMAILJS_PUBLIC_KEY = '0MvQ0-Daq0m7nbe2D';

  // ====== Fonts ======
  // public/fonts:
  // FbAsparagos-Regular.otf
  // FbAsparagos-Bold.otf
  // FbAsparagos-Black.otf
  // FbRimonaEng-Regular.otf (לא חובה כאן, אבל נשאיר לך אופציה)
  const fontStyle = useMemo(() => ({ fontFamily: '"FbAsparagos", sans-serif' }), []);

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

  // ✅ init EmailJS פעם אחת
  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }, []);

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
      starRatings: { ...(prev.starRatings || {}), [question]: rating }
    }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.contactName.trim() || !formData.email.trim()) {
        setError('נא למלא שם ואימייל תקינים כדי שנוכל לחזור אליך 🙂');
        return;
      }
    }

    if (currentStep < totalSteps) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  // ====== Helper formatting for email message ======
  const fmt = (label, value) => {
    const v = (value ?? '').toString().trim();
    return `${label}: ${v ? v : 'לא צוין'}`;
  };

  const fmtList = (label, arr) => {
    const list = Array.isArray(arr) ? arr : [];
    return `${label}: ${list.length ? list.join(', ') : 'לא צוין'}`;
  };

  const buildMessage = () => {
    const stars = Object.entries(formData.starRatings || {})
      .map(([q, r]) => `• ${q} — ${r}/5`)
      .join('\n');

    return [
      '📩 התקבל שאלון אבחון חדש',
      '────────────────────────',
      fmt('שם מלא', formData.contactName),
      fmt('אימייל', formData.email),
      fmt('טלפון', formData.phone),
      fmt('שם העסק', formData.businessName),
      fmt('תחום העסק', formData.businessSector),
      fmt('איך הגיעו אלינו', formData.discoverySource),
      '────────────────────────',
      fmtList('אתגרים (Challenges)', formData.challenges),
      fmtList('גוזלי זמן (Time Wasters)', formData.timeWasters),
      fmtList('מטרות (Goals)', formData.goals),
      '────────────────────────',
      fmt('מה ייחשב הצלחה (Success Metric)', formData.successMetric),
      '────────────────────────',
      fmtList('ניהול שירות (Service Management)', formData.serviceManagement),
      fmtList('מקורות לידים (Lead Sources)', formData.leadSources),
      fmtList('שאלות נפוצות (Common Questions)', formData.commonQuestions),
      '────────────────────────',
      fmt('לידים בחודש (Monthly Leads)', formData.monthlyLeads),
      fmtList('תהליך מכירה (Sales Process)', formData.salesProcess),
      fmt('זמן תגובה לליד (Response Time)', formData.responseTime),
      fmt('תהליך ללידים אבודים (Lost Leads Process)', formData.lostLeadsProcess),
      '────────────────────────',
      fmtList('מטרות בוט (Bot Goals)', formData.botGoals),
      fmtList('זמני פעילות בוט (Bot Active Time)', formData.botActiveTime),
      '────────────────────────',
      fmt('טווח הכנסה (Revenue)', formData.revenue),
      fmt('נוכחות דיגיטלית (Digital Presence)', formData.digitalPresence),
      fmt('ניסיון קודם (Prior Experience)', formData.priorExperience),
      fmt('חוויית משתמש רצויה (UX Goal)', formData.userExperienceGoal),
      '────────────────────────',
      '⭐ דירוגי הזדהות:',
      stars ? stars : 'לא מולאו דירוגים'
    ].join('\n');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const message = buildMessage();

      // ✅ שולחים גם message אחד "מאוחד" כדי שהמייל לא יגיע ריק אף פעם
      const templateParams = {
        ...formData,

        // נפוץ בתבניות:
        from_name: formData.contactName || 'שאלון חדש',
        reply_to: formData.email || '',

        // שדה "בטוח" שהטמפלט יכול להדפיס
        message,

        // נשאיר גם את כל השדות כדי שתראי אותם ב-EmailJS ולמקרה שאת משתמשת בהם בתבנית
        star_ratings: Object.entries(formData.starRatings || {})
          .map(([q, r]) => `${q}: ${r}/5`)
          .join('\n'),

        challenges: (formData.challenges || []).join(', '),
        timeWasters: (formData.timeWasters || []).join(', '),
        goals: (formData.goals || []).join(', '),
        serviceManagement: (formData.serviceManagement || []).join(', '),
        leadSources: (formData.leadSources || []).join(', '),
        commonQuestions: (formData.commonQuestions || []).join(', '),
        salesProcess: (formData.salesProcess || []).join(', '),
        botGoals: (formData.botGoals || []).join(', '),
        botActiveTime: (formData.botActiveTime || []).join(', ')
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('חלה שגיאה בשליחת הטופס. נסי שוב בעוד רגע 🙏');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CheckboxOption = ({ field, label, emoji }) => (
    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer mb-2 group ${
      formData[field]?.includes(label)
        ? 'border-[#000ab9] bg-blue-50 shadow-md transform scale-[1.01]'
        : 'border-slate-100 hover:border-slate-200 bg-white hover:shadow-sm'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
          formData[field]?.includes(label) ? 'bg-[#000ab9] border-[#000ab9]' : 'border-slate-300 group-hover:border-slate-400'
        }`}>
          {formData[field]?.includes(label) && <Check size={16} className="text-white" />}
        </div>
        <span className="font-black text-slate-700 text-lg">{label} <span className="opacity-80">{emoji}</span></span>
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
    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer mb-2 group ${
      formData[field] === value
        ? 'border-[#000ab9] bg-blue-50 shadow-md transform scale-[1.01]'
        : 'border-slate-100 hover:border-slate-200 bg-white hover:shadow-sm'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          formData[field] === value ? 'border-[#000ab9]' : 'border-slate-300 group-hover:border-slate-400'
        }`}>
          {formData[field] === value && <div className="w-3 h-3 bg-[#000ab9] rounded-full" />}
        </div>
        <span className="font-black text-slate-700 text-lg">{label}</span>
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
          @font-face { font-family: 'FbAsparagos'; src: url('/fonts/FbAsparagos-Regular.otf') format('opentype'); font-weight: 400; font-style: normal; }
          @font-face { font-family: 'FbAsparagos'; src: url('/fonts/FbAsparagos-Bold.otf') format('opentype'); font-weight: 700; font-style: normal; }
          @font-face { font-family: 'FbAsparagos'; src: url('/fonts/FbAsparagos-Black.otf') format('opentype'); font-weight: 900; font-style: normal; }
          * { font-family: "FbAsparagos", sans-serif !important; }
        `}</style>

        <div className="bg-white p-12 rounded-[40px] shadow-2xl text-center max-w-2xl w-full border-t-[12px] border-[#52de4a] animate-in zoom-in duration-500">
          <div className="mb-8 bg-green-50 w-28 h-28 rounded-full flex items-center justify-center mx-auto shadow-inner animate-in fade-in duration-700">
            <CheckCircle2 size={70} className="text-[#52de4a]" />
          </div>

          <h2 className="text-5xl font-black text-[#000ab9] mb-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
            סיכום נשלח בהצלחה ✅
          </h2>

          <div className="space-y-6 text-slate-600 text-2xl font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700">
            <p>איזה כיף! קיבלנו את כל הפרטים.</p>

            <div className="bg-blue-50 p-8 rounded-[30px] border-r-8 border-[#000ab9] text-[#000ab9] font-black shadow-sm">
              בתוך 24 שעות נחזור אלייך עם <span className="underline decoration-[#52de4a] decoration-4 underline-offset-4">מפת דרכים טכנולוגית</span> והמלצות פרקטיות לייעול העסק 🚀
            </div>

            <p className="text-lg text-slate-400 italic">נתראה ממש בקרוב 🙂</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-[#f8fafc] selection:bg-blue-100" dir="rtl" style={fontStyle}>
      <style>{`
        @font-face { font-family: 'FbAsparagos'; src: url('/fonts/FbAsparagos-Regular.otf') format('opentype'); font-weight: 400; font-style: normal; }
        @font-face { font-family: 'FbAsparagos'; src: url('/fonts/FbAsparagos-Bold.otf') format('opentype'); font-weight: 700; font-style: normal; }
        @font-face { font-family: 'FbAsparagos'; src: url('/fonts/FbAsparagos-Black.otf') format('opentype'); font-weight: 900; font-style: normal; }

        * { font-family: "FbAsparagos", sans-serif !important; }
        input::placeholder, textarea::placeholder { font-family: "FbAsparagos", sans-serif !important; }
        button, input, select, textarea { outline: none !important; }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {currentStep > 0 && (
          <div className="mb-10 px-4 animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-4 font-black text-[#000ab9]">
              <span className="text-2xl font-black italic tracking-tight">הדסה מתן | אבחון עסק חכם</span>
              <span className="text-base bg-blue-100 px-4 py-1.5 rounded-full shadow-sm">
                שלב {currentStep} מתוך {totalSteps}
              </span>
            </div>

            <div className="h-4 w-full bg-white rounded-full shadow-inner border border-slate-100 overflow-hidden p-1">
              <div
                className="h-full bg-gradient-to-r from-[#7cd6de] to-[#52de4a] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-white rounded-[50px] shadow-2xl p-10 md:p-20 border-b-[15px] border-[#000ab9] min-h-[700px] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 -z-0" />

          <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 relative z-10 text-right">
            {/* ===== Step 0 (שיפור טקסט + היררכיה + אנימציות עדינות) ===== */}
            {currentStep === 0 && (
              <div className="space-y-8 leading-relaxed text-slate-700">
                <div className="text-center mb-10">
                  <div className="bg-blue-50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-12 shadow-sm animate-in zoom-in duration-500">
                    <Zap size={50} className="text-[#000ab9] animate-pulse" />
                  </div>

                  <h1 className="text-5xl font-black text-[#000ab9] mt-4 tracking-tighter animate-in fade-in duration-700">
                    שאלון לאבחון העסק 🤖
                  </h1>

                  <p className="text-slate-500 text-xl font-bold mt-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    כמה דקות עכשיו — וחוסכים שעות אחר כך 💡
                  </p>
                </div>

                <div className="space-y-5">
                  <h2 className="text-4xl font-black text-slate-800 animate-in fade-in slide-in-from-bottom-3 duration-700">
                    היי 😄
                  </h2>

                  <p className="text-2xl font-medium leading-relaxed">
                    אנחנו יודעים שאתם עמוסים — אולי בין לקוח לשיחה 📞, אולי רגע לפני קפה ☕
                  </p>

                  <p className="text-3xl font-black text-[#000ab9] leading-tight">
                    אבל אם הגעתם לפה… כנראה שהגיע הזמן להפוך את העסק ל-
                    <span className="underline decoration-[#52de4a] decoration-4 underline-offset-4">חכם</span>,
                    <span className="underline decoration-[#7cd6de] decoration-4 underline-offset-4 mx-2">יעיל</span>
                    ויותר <span className="underline decoration-[#000ab9] decoration-4 underline-offset-4">רגוע</span> 🧠
                  </p>

                  <div className="bg-gradient-to-l from-slate-50 to-white p-8 rounded-[35px] border-r-8 border-[#7cd6de] shadow-sm">
                    <div className="text-2xl font-black text-slate-800 mb-2">מה יוצא לכם מזה?</div>
                    <ul className="text-xl font-bold text-slate-600 space-y-2">
                      <li className="flex items-start gap-2"><span>✅</span><span>מפת דרכים טכנולוגית ברורה ומדויקת לעסק</span></li>
                      <li className="flex items-start gap-2"><span>✅</span><span>זיהוי גוזלי הזמן והצעות לאוטומציה</span></li>
                      <li className="flex items-start gap-2"><span>✅</span><span>המלצות ראשוניות לבינה מלאכותית בתכל׳ס</span></li>
                    </ul>
                  </div>

                  <div className="text-center pt-6">
                    <p className="text-[#000ab9] font-black text-3xl animate-bounce">
                      מוכנים להתחיל? מכאן 👇
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ===== Step 1 ===== */}
            {currentStep === 1 && (
              <div className="space-y-10">
                <div className="text-center">
                  <Building size={50} className="text-[#000ab9] mx-auto mb-4 animate-in zoom-in duration-500" />
                  <h2 className="text-4xl font-black text-[#000ab9]">נעים להכיר</h2>
                  <p className="text-slate-500 text-xl mt-2 font-bold">בואו נכיר — ספרו לנו על העסק שלכם</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-bold">
                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">* שם מלא</label>
                    <input
                      type="text"
                      placeholder="השם שלך"
                      className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl shadow-inner"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">* אימייל</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      dir="ltr"
                      className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl text-right shadow-inner"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">טלפון</label>
                    <input
                      type="text"
                      placeholder="050-0000000"
                      className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl text-right shadow-inner"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">שם העסק</label>
                    <input
                      type="text"
                      placeholder="שם העסק שלך"
                      className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl text-right shadow-inner"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange('businessName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">תחום העסק</label>
                    <input
                      type="text"
                      placeholder="במה העסק עוסק?"
                      className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl text-right shadow-inner"
                      value={formData.businessSector}
                      onChange={(e) => handleInputChange('businessSector', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3 text-[#000ab9]">
                    <label className="block text-xl italic">איך הגעתם אלינו?</label>
                    <input
                      type="text"
                      placeholder="פייסבוק, המלצה, גוגל..."
                      className="w-full p-5 bg-slate-50 rounded-[25px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white transition-all text-xl text-right shadow-inner"
                      value={formData.discoverySource}
                      onChange={(e) => handleInputChange('discoverySource', e.target.value)}
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-center font-black border-r-4 border-red-500 animate-in fade-in duration-300">
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* ===== Step 2 ===== */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-black text-[#000ab9]">מה מפריע לכם היום בעסק?</h2>
                  <p className="text-slate-500 text-xl font-bold">אפשר לבחור כמה אופציות</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CheckboxOption field="challenges" label="ניהול זמן לא יעיל" emoji="⏰" />
                  <CheckboxOption field="challenges" label="שירות לקוחות איטי מדי" emoji="🎯" />
                  <CheckboxOption field="challenges" label="קושי במעקב אחר לידים" emoji="📞" />
                  <CheckboxOption field="challenges" label="עומס משימות חוזרות" emoji="🔄" />
                  <CheckboxOption field="challenges" label="חוסר זמינות 24/7" emoji="🕙" />
                  <CheckboxOption field="challenges" label="קושי בהגדלת העסק (סקיילאביליטי)" emoji="📈" />
                </div>
              </div>
            )}

            {/* ===== Step 3 ===== */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-black text-[#000ab9]">מהם גוזלי הזמן המרכזיים?</h2>
                  <p className="text-slate-500 text-xl font-bold">איפה אתם מרגישים שאתם “מתבזבזים”?</p>
                </div>
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

            {/* ===== Step 4 ===== */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-black text-[#000ab9]">מה המטרה המרכזית שלכם?</h2>
                  <p className="text-slate-500 text-xl font-bold">מה הכי חשוב לכם להשיג?</p>
                </div>
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

            {/* ===== Step 5 ===== */}
            {currentStep === 5 && (
              <div className="space-y-10 text-center">
                <div className="inline-block p-6 bg-blue-50 rounded-[35px] text-[#000ab9] mb-4 shadow-sm transform -rotate-3 animate-in zoom-in duration-500">
                  <Target size={60} />
                </div>
                <h2 className="text-4xl font-black text-[#000ab9]">מה ייחשב הצלחה עבורכם?</h2>
                <p className="text-slate-500 text-xl font-bold">תארו את המצב האידיאלי בעוד כמה חודשים</p>
                <textarea
                  className="w-full p-8 bg-slate-50 rounded-[40px] border-2 border-transparent focus:border-[#7cd6de] focus:bg-white outline-none h-56 text-right text-2xl shadow-inner transition-all"
                  placeholder="לדוגמה: להגדיל אחוז המרה ב-25% תוך 4 חודשים..."
                  value={formData.successMetric}
                  onChange={(e) => handleInputChange('successMetric', e.target.value)}
                />
              </div>
            )}

            {/* ===== Step 6 ===== */}
            {currentStep === 6 && (
              <div className="space-y-10">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black text-[#000ab9]">ניהול העסק וקבלת פניות</h2>
                </div>

                <div className="space-y-6">
                  <p className="font-black text-slate-700 text-2xl border-r-4 border-[#7cd6de] pr-4">
                    איך כרגע מנוהל שירות הלקוחות בעסק שלכם?
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CheckboxOption field="serviceManagement" label="אני בעצמי עונה לכל הפניות" emoji="👤" />
                    <CheckboxOption field="serviceManagement" label="יש לי צוות שמטפל בפניות" emoji="👥" />
                    <CheckboxOption field="serviceManagement" label="חלק אני וחלק העובדים" emoji="🔄" />
                    <CheckboxOption field="serviceManagement" label="יש לנו מיקור חוץ" emoji="🏢" />
                  </div>
                </div>

                <div className="mt-12 space-y-6">
                  <p className="font-black text-slate-700 text-2xl border-r-4 border-[#7cd6de] pr-4">
                    מאיפה הפניות מתקבלות? (אפשר לבחור כמה)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CheckboxOption field="leadSources" label="האתר שלנו" emoji="🌐" />
                    <CheckboxOption field="leadSources" label="פייסבוק" emoji="🔵" />
                    <CheckboxOption field="leadSources" label="גוגל אדס" emoji="
