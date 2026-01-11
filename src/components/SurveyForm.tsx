import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { 
  ArrowRight, ArrowLeft, Building, Target, MessageSquare, 
  Globe, CheckCircle2, Loader2, Zap, Star, Layout, MousePointer2, Bot, BarChart3, Users, Sparkles
} from 'lucide-react';

const SurveyForm = () => {
  const fontStyle = { fontFamily: '"FbAsparagos", sans-serif' };

  const [formData, setFormData] = useState({
    // שלבים 1-5
    contactName: '', email: '', businessName: '', businessField: '',
    challenges: [], timeWasters: [], goals: [], successMetric: '',
    // שלבים 6-11 (מהתמונות)
    serviceManagement: '', leadSources: [], 
    monthlyLeads: '', responseTime: '', salesPain: '',
    starRatings: {}, 
    botGoals: [], botActiveTime: '',
    revenue: '', digitalPresence: ''
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
                  <div className="space-y-2 text-[#000ab9]"><label className="block italic">* שם מלא</label><input type="text" style={fontStyle} placeholder="השם שלך" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none" value={formData.contactName} onChange={(e)=>handleInputChange('contactName', e.target.value)} /></div>
                  <div className="space-y-2 text-[#000ab9]"><label className="block italic">* אימייל</label><input type="email" style={fontStyle} placeholder="email@example.com" dir="ltr" className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right" value={formData.email} onChange={(e)=>handleInputChange('email', e.target.value)} /></div>
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
                <textarea style={fontStyle} className="w-full p-6 bg-slate-50 rounded-3xl border-2 border-transparent focus:border-[#7cd6de] outline-none h-40 text-right text-lg shadow-inner" placeholder="לדוגמה: להגדיל אחוז המרה ב-25% תוך 4 חודשים..." value={formData.successMetric} onChange={(e)=>handleInputChange('successMetric', e.target.value)} />
              </div>
            )}

            {/* שלב 6 - ניהול פניות (מהתמונה) */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div className="text-center mb-8"><h2 className="text-3xl font-bold text-[#000ab9]">ניהול העסק וקבלת פניות</h2></div>
                <p className="font-bold text-slate-700">איך מנוהל שירות הלקוחות כיום?</p>
                <div className="space-y-3">
                  <RadioOption field="serviceManagement" label="אני בעצמי עונה לכל הפניות" value="self" />
                  <RadioOption field="serviceManagement" label="יש צוות שמטפל בפניות" value="team" />
                  <RadioOption field="serviceManagement" label="חלק אני וחלק העובדים" value="hybrid" />
                </div>
                <div className="mt-6">
                  <p className="font-bold text-slate-700 mb-3">מאיפה הפניות מתקבלות? (בחירה מרובה)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <CheckboxOption field="leadSources" label="וואטסאפ" emoji="📱" />
                    <CheckboxOption field="leadSources" label="פייסבוק/אינסטגרם" emoji="📸" />
                    <CheckboxOption field="leadSources" label="אתר אינטרנט" emoji="🌐" />
                    <CheckboxOption field="leadSources" label="גוגל" emoji="🔍" />
                  </div>
                </div>
              </div>
            )}

            {/* שלב 7 - תהליך מכירה */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="text-center"><h2 className="text-3xl font-bold text-[#000ab9]">תהליך המכירה</h2></div>
                <div className="space-y-4">
                  <p className="font-bold">כמות לידים ממוצעת בחודש?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['1-50', '50-100', '100-300', '300+'].map(v => (
                      <button key={v} onClick={()=>handleInputChange('monthlyLeads', v)} className={`p-4 rounded-xl border-2 font-bold transition-all ${formData.monthlyLeads === v ? 'bg-[#000ab9] text-white' : 'bg-slate-50 border-transparent text-slate-600'}`}>{v}</button>
                    ))}
                  </div>
                  <p className="font-bold pt-4">מהו זמן התגובה הממוצע לליד?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['מיידי', 'עד שעה', 'עד 24 שעות', 'יותר מיום'].map(v => (
                      <button key={v} onClick={()=>handleInputChange('responseTime', v)} className={`p-4 rounded-xl border-2 font-bold transition-all ${formData.responseTime === v ? 'bg-[#000ab9] text-white' : 'bg-slate-50 border-transparent text-slate-600'}`}>{v}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* שלב 8 - דרגת הזדהות (כוכבים) */}
            {currentStep === 8 && (
              <div className="space-y-6">
                <div className="text-center"><h2 className="text-3xl font-bold text-[#000ab9]">דרגת הזדהות עם אתגרים</h2><p className="text-slate-500 italic">5 כוכבים = מזדהה מאוד</p></div>
                {[
                  "המזכיר/ה שלי עסוק/ה בשאלות חוזרות",
                  "מתפספסים לי לידים ועסקאות",
                  "אין לי מספיק מעקב אחרי סטטוס לקוח",
                  "עומס של משימות חוזרות",
                ].map((q) => (
                  <div key={q} className="flex flex-col md:flex-row justify-between p-4 bg-slate-50 rounded-2xl gap-3">
                    <span className="font-bold text-slate-700 flex-1">{q}</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <MousePointer2 key={s} size={28} onClick={() => handleStarRating(q, s)} className={`cursor-pointer transition-colors ${formData.starRatings[q] >= s ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* שלב 9 - צרכי בוט */}
            {currentStep === 9 && (
              <div className="space-y-6">
                <div className="text-center"><h2 className="text-3xl font-bold text-[#000ab9]">מה הבוט צריך לעשות עבורכם?</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <CheckboxOption field="botGoals" label="מענה 24/7" emoji="🕒" />
                  <CheckboxOption field="botGoals" label="סינון לידים" emoji="🎯" />
                  <CheckboxOption field="botGoals" label="תיאום פגישות" emoji="📅" />
                  <CheckboxOption field="botGoals" label="מענה לשאלות נפוצות" emoji="❓" />
                </div>
                <div className="mt-6">
                  <p className="font-bold mb-3">מתי הבוט יהיה פעיל?</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {['24/7 כל השבוע', 'רק בשעות העבודה', 'בערבים ובסופ"ש'].map(v => (
                      <button key={v} onClick={()=>handleInputChange('botActiveTime', v)} className={`p-4 rounded-xl border-2 font-bold transition-all ${formData.botActiveTime === v ? 'bg-[#000ab9] text-white' : 'bg-slate-50 border-transparent text-slate-600'}`}>{v}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* שלב 10 - פיננסי */}
            {currentStep === 10 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><BarChart3 size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">מצב פיננסי</h2>
                <select style={fontStyle} className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-right font-bold text-lg" value={formData.revenue} onChange={(e)=>handleInputChange('revenue', e.target.value)}>
                  <option value="">בחרו טווח הכנסה חודשי</option>
                  <option value="0-30k">0 - 30,000 ₪</option>
                  <option value="30-100k">30,000 - 100,000 ₪</option>
                  <option value="100k+">מעל 100,000 ₪</option>
                </select>
              </div>
            )}

            {/* שלב 11 - דיגיטל */}
            {currentStep === 11 && (
              <div className="space-y-8 text-center">
                <div className="inline-block p-4 bg-blue-50 rounded-2xl text-[#000ab9] mb-4"><Globe size={40} /></div>
                <h2 className="text-3xl font-bold text-[#000ab9]">נוכחות דיגיטלית</h2>
                <p className="text-slate-500 italic">קישור לאתר או לעמוד עסקי (אם יש)</p>
                <input type="text" style={fontStyle} placeholder="https://..." className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-[#7cd6de] outline-none text-left" dir="ltr" value={formData.digitalPresence} onChange={(e)=>handleInputChange('digitalPresence', e.target.value)} />
              </div>
            )}

            {/* שלב 12 - סיום */}
            {currentStep === 12 && (
              <div className="text-center space-y-8 py-10">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce"><CheckCircle2 size={48} className="text-[#52de4a]" /></div>
                <h2 className="text-4xl font-bold text-[#000ab9]">זהו, אנחנו מוכנים! 🚀</h2>
                <p className="text-xl text-slate-600 font-bold">לחצו למטה כדי לשלוח את כל המידע והאבחון בדרך אליכם.</p>
              </div>
            )}

          </div>

          {/* כפתורי ניווט */}
          <div className="mt-12 flex justify-between items-center border-t pt-8">
            <button onClick={()=>setCurrentStep(prev => prev - 1)} disabled={isSubmitting} className={`flex items-center gap-2 text-slate-400 font-bold text-xl hover:text-[#000ab9] transition-all ${currentStep === 0 ? 'invisible' : ''}`}><ArrowRight size={24} /> חזרה</button>
            <button onClick={nextStep} disabled={isSubmitting} className={`px-12 py-5 rounded-full font-black text-2xl text-white shadow-xl flex items-center gap-3 transition-all ${currentStep === totalSteps ? 'bg-[#52de4a] hover:bg-[#45c33d]' : 'bg-[#000ab9] hover:bg-[#000890]'}`}>
              {isSubmitting ? <><Loader2 size={24} className="animate-spin" /> שולח...</> : <>{currentStep === 0 ? 'בואו נתחיל!' : currentStep === totalSteps ? 'שלח/י אבחון' : 'בואו נמשיך'} <ArrowLeft size={24} /></>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;