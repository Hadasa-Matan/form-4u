import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowRight, ArrowLeft, CheckCircle2, Building, Users, Target, MessageSquare, Bot, Sparkles } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormData {
  // פרטים כלליים
  businessName: string;
  contactName: string;
  contactRole: string;
  preferredContact: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  employeeCount: string;
  partnerCount: string;
  
  // על העסק
  referralSource: string;
  businessField: string;
  businessAge: string;
  howStarted: string;
  vision: string;
  description: string;
  
  // רקע כללי
  leadership: string;
  importantInfo: string;
  uniqueness: string;
  
  // מטרות עסקיות
  currentProblems: string[];
  timeWasters: string[];
  leadGoals: string[];
  successMetrics: string;
  
  // ניהול העסק
  customerService: string;
  hasEmployees: boolean;
  inquiryVolume: string;
  inquirySources: string[];
  hasReps: boolean;
  commonQuestions: string[];
  timeConsumingProcesses: string[];
  mainChallenge: string;
  
  // תהליך מכירה
  monthlyLeads: string;
  salesProcess: string[];
  responseTime: string;
  hasKPIs: boolean;
  unclosedLeadsProcess: string;
  hasUpselling: boolean;
  upsellingDetails: string;
  
  // צרכים מהבוט
  botGoals: string[];
  availability: string[];
  hasExistingContent: boolean;
  existingContentDetails: string;
  designPreferences: string;
  
  // ניסיון קודם
  hasBotExperience: boolean;
  desiredUX: string;
}

const initialFormData: FormData = {
  businessName: '',
  contactName: '',
  contactRole: '',
  preferredContact: '',
  email: '',
  phone: '',
  address: '',
  website: '',
  employeeCount: '',
  partnerCount: '',
  referralSource: '',
  businessField: '',
  businessAge: '',
  howStarted: '',
  vision: '',
  description: '',
  leadership: '',
  importantInfo: '',
  uniqueness: '',
  currentProblems: [],
  timeWasters: [],
  leadGoals: [],
  successMetrics: '',
  customerService: '',
  hasEmployees: false,
  inquiryVolume: '',
  inquirySources: [],
  hasReps: false,
  commonQuestions: [],
  timeConsumingProcesses: [],
  mainChallenge: '',
  monthlyLeads: '',
  salesProcess: [],
  responseTime: '',
  hasKPIs: false,
  unclosedLeadsProcess: '',
  hasUpselling: false,
  upsellingDetails: '',
  botGoals: [],
  availability: [],
  hasExistingContent: false,
  existingContentDetails: '',
  designPreferences: '',
  hasBotExperience: false,
  desiredUX: '',
};

const SurveyForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const totalSteps = 8;
  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep]);

  const escapeHtml = (unsafe: string) => unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const humanizeKey = (key: string) => key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const buildHtmlTable = (data: Record<string, string>) => {
    const rows = Object.entries(data)
      .map(([k, v]) => `<tr><th style="text-align:right;padding:6px;border:1px solid #e5e7eb;background:#f8fafc;">${escapeHtml(humanizeKey(k))}</th><td style="padding:6px;border:1px solid #e5e7eb;">${escapeHtml(v)}</td></tr>`) 
      .join('');
    return `<table dir=\"rtl\" style=\"border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;\">${rows}</table>`;
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field: keyof FormData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleInputChange(field, newArray);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const toEmail = import.meta.env.VITE_FORM_RECEIVER_EMAIL;

      const normalized: Record<string, string> = {};
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          normalized[key] = value.join(', ');
        } else if (typeof value === 'boolean') {
          normalized[key] = value ? 'כן' : 'לא';
        } else {
          normalized[key] = String(value ?? '');
        }
      });

      const payload = {
        subject: 'שאלון חדש מאתר form-4u',
        reply_to: formData.email || toEmail,
        to_email: toEmail,
        submitted_at: new Date().toISOString(),
        table_html: buildHtmlTable(normalized),
        ...normalized,
      };

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const appsScriptUrl = import.meta.env.VITE_APPS_SCRIPT_URL;

      if (serviceId && templateId && publicKey) {
        const result = await emailjs.send(serviceId, templateId, payload, { publicKey });
        if (result.status !== 200) throw new Error('שליחה נכשלה');
        setIsSubmitted(true);
      } else if (appsScriptUrl) {
        try {
          const response = await fetch(appsScriptUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          // Apps Script may not return CORS headers; accept opaque/no JSON
          if (!response.ok && response.type !== 'opaque') {
            throw new Error('שליחה נכשלה');
          }
          setIsSubmitted(true);
        } catch (e) {
          // If strict CORS blocks reading response, still consider as sent
          setIsSubmitted(true);
        }
      } else if (toEmail) {
        const endpoint = `https://formsubmit.co/ajax/${toEmail.trim()}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: payload.subject,
            _replyto: payload.reply_to,
            _template: 'table',
            _captcha: 'false',
            ...normalized,
          })
        });
        const result = await response.json();
        if (!response.ok || !(result.success === true || result.success === 'true')) {
          throw new Error(result.message || 'שליחה נכשלה');
        }
        setIsSubmitted(true);
      } else {
        throw new Error('לא הוגדר מייל יעד');
      }
    } catch (err: any) {
      setSubmitError(err?.message || 'אירעה שגיאה בשליחה');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CheckboxOption = ({ field, value, label }: { field: keyof FormData, value: string, label: string }) => {
    const isSelected = (formData[field] as string[]).includes(value);
    return (
      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleMultiSelect(field, value)}
          className="hidden"
        />
        <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
          isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
        }`}>
          {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
        </div>
        <span className="text-sm">{label}</span>
      </label>
    );
  };

  const RadioOption = ({ field, value, label }: { field: keyof FormData, value: string, label: string }) => {
    const isSelected = formData[field] === value;
    return (
      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
        <input
          type="radio"
          name={field}
          checked={isSelected}
          onChange={() => handleInputChange(field, value)}
          className="hidden"
        />
        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
          isSelected ? 'border-blue-500' : 'border-gray-300'
        }`}>
          {isSelected && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
        </div>
        <span className="text-sm">{label}</span>
      </label>
    );
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">תודה רבה! 🎉</h2>
          <p className="text-gray-600 mb-6">השאלון נשלח בהצלחה. נחזור אליכם בקרוב עם פתרון מותאם אישית לעסק שלכם.</p>
                      <button 
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setFormData(initialFormData);
              }}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              מלאו שאלון נוסף
            </button>
            <p className="text-xs text-gray-500 mt-4">נשלח בהצלחה למייל</p>
</div>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">פרטים כלליים על העסק</h2>
              <p className="text-gray-600">בואו נכיר - ספרו לנו על העסק שלכם</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">שם העסק *</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="הזינו את שם העסק"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">שם איש הקשר *</label>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="השם המלא שלכם"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">תפקיד בעסק</label>
                <input
                  type="text"
                  value={formData.contactRole}
                  onChange={(e) => handleInputChange('contactRole', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="למשל: מנכ״ל, בעלים, מנהל שיווק"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">אופן התקשרות מומלץ</label>
                <div className="space-y-2">
                  <RadioOption field="preferredContact" value="email" label="📧 מייל" />
                  <RadioOption field="preferredContact" value="phone" label="📞 טלפון" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">כתובת מייל *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">טלפון</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="050-123-4567"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">מאיפה שמעתם עלינו?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <RadioOption field="referralSource" value="google" label="🔍 גוגל" />
                <RadioOption field="referralSource" value="referral" label="👤 הפניה מחבר/לקוח" />
                <RadioOption field="referralSource" value="website" label="🌐 האתר שלנו" />
                <RadioOption field="referralSource" value="email" label="📧 מייל שיווקי" />
                <RadioOption field="referralSource" value="event" label="🏢 אירוע/כנס" />
                <RadioOption field="referralSource" value="whatsapp" label="📱 וואטסאפ" />
                <RadioOption field="referralSource" value="ads" label="📢 פרסומת" />
                <RadioOption field="referralSource" value="other" label="🔄 אחר" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">מספר עובדים</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                <RadioOption field="employeeCount" value="1" label="רק אני" />
                <RadioOption field="employeeCount" value="2-5" label="2-5" />
                <RadioOption field="employeeCount" value="6-20" label="6-20" />
                <RadioOption field="employeeCount" value="21-50" label="21-50" />
                <RadioOption field="employeeCount" value="50+" label="50+" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">ספרו לנו על העסק שלכם</h2>
              <p className="text-gray-600">בואו נבין את הסיפור שלכם</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">מהו תחום העסק?</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <RadioOption field="businessField" value="טכנולוגיה" label="🖥️ טכנולוגיה" />
                <RadioOption field="businessField" value="קמעונאות" label="🛍️ קמעונאות" />
                <RadioOption field="businessField" value="שירותים" label="🔧 שירותים" />
                <RadioOption field="businessField" value="מזון ומשקאות" label="🍕 מזון ומשקאות" />
                <RadioOption field="businessField" value="בריאות" label="🏥 בריאות" />
                <RadioOption field="businessField" value="חינוך" label="🎓 חינוך" />
                <RadioOption field="businessField" value="פיננסים" label="💰 פיננסים" />
                <RadioOption field="businessField" value="נדל״ן" label="🏠 נדל״ן" />
                <RadioOption field="businessField" value="אחר" label="🔄 אחר" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">כמה זמן העסק קיים?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <RadioOption field="businessAge" value="new" label="פחות משנה" />
                <RadioOption field="businessAge" value="1-3" label="1-3 שנים" />
                <RadioOption field="businessAge" value="3-10" label="3-10 שנים" />
                <RadioOption field="businessAge" value="10+" label="יותר מ-10" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">איך הגעתם לעיסוק הזה ספציפית?</label>
              <textarea
                value={formData.howStarted}
                onChange={(e) => handleInputChange('howStarted', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="ספרו בקצרה על הדרך שהובילה אתכם לכאן..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">מה החזון והסיבה שפתחתם את העסק הזה?</label>
              <textarea
                value={formData.vision}
                onChange={(e) => handleInputChange('vision', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="מה המניע והחזון שלכם..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">המטרות העסקיות שלכם</h2>
              <p className="text-gray-600">בואו נבין מה האתגרים והמטרות שלכם</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">מה מפריע לכם היום בעסק? (ניתן לבחור מספר אפשרויות)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CheckboxOption field="currentProblems" value="time-management" label="⏰ ניהול זמן לא יעיל" />
                <CheckboxOption field="currentProblems" value="customer-service" label="🎯 שירות לקוחות איטי" />
                <CheckboxOption field="currentProblems" value="lead-followup" label="📞 מעקב אחר לידים" />
                <CheckboxOption field="currentProblems" value="repetitive-tasks" label="🔄 משימות חוזרות" />
                <CheckboxOption field="currentProblems" value="availability" label="🕐 זמינות 24/7" />
                <CheckboxOption field="currentProblems" value="scaling" label="📈 קושי בהגדלת העסק" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">מהם גוזלי הזמן המרכזיים שלכם?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CheckboxOption field="timeWasters" value="phone-calls" label="📞 שיחות טלפון חוזרות" />
                <CheckboxOption field="timeWasters" value="emails" label="📧 מענה למיילים" />
                <CheckboxOption field="timeWasters" value="scheduling" label="🗓️ תיאום פגישות" />
                <CheckboxOption field="timeWasters" value="basic-questions" label="❓ שאלות בסיסיות" />
                <CheckboxOption field="timeWasters" value="data-entry" label="⌨️ הזנת נתונים" />
                <CheckboxOption field="timeWasters" value="follow-ups" label="👥 מעקבים ותזכורות" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">מה המטרה המרכזית שלכם בתהליך איסוף לידים?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CheckboxOption field="leadGoals" value="no-missed-leads" label="🎯 לא לפספס לידים" />
                <CheckboxOption field="leadGoals" value="increase-sales" label="💰 להגדיל מכירות" />
                <CheckboxOption field="leadGoals" value="better-cx" label="✨ לשפר חוויית לקוח" />
                <CheckboxOption field="leadGoals" value="free-time" label="👨‍👩‍👧‍👦 יותר זמן למשפחה" />
                <CheckboxOption field="leadGoals" value="automation" label="🤖 אוטומציה מלאה" />
                <CheckboxOption field="leadGoals" value="qualify-leads" label="🔍 סינון לידים איכותיים" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">מה ייחשב הצלחה עבורכם? (מדיד, לדוגמא: להגדיל אחוז המרה מליד לפגישה מ-25% ל-30% תוך 4-5 חודשים)</label>
              <textarea
                value={formData.successMetrics}
                onChange={(e) => handleInputChange('successMetrics', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="תארו את המדדים המדויקים להצלחה..."
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <MessageSquare className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">ניהול העסק וקבלת פניות</h2>
              <p className="text-gray-600">בואו נבין איך העסק פועל היום</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">איך כרגע מתנהל שירות הלקוחות בעסק שלכם?</label>
              <div className="space-y-2">
                <RadioOption field="customerService" value="owner-only" label="🧑‍💼 אני בעצמי עונה לכל הפניות" />
                <RadioOption field="customerService" value="employees" label="👥 יש צוות שטיפול בפניות" />
                <RadioOption field="customerService" value="mixed" label="🔄 חלק אני וחלק העובדים" />
                <RadioOption field="customerService" value="outsourced" label="🏢 מיקור חוץ" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">מהי כמות הפניות שאתם מקבלים?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <RadioOption field="inquiryVolume" value="1-5-daily" label="1-5 ביום" />
                <RadioOption field="inquiryVolume" value="5-20-daily" label="5-20 ביום" />
                <RadioOption field="inquiryVolume" value="20-50-daily" label="20-50 ביום" />
                <RadioOption field="inquiryVolume" value="50+-daily" label="יותר מ-50 ביום" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">מאיפה הפניות מתקבלות?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CheckboxOption field="inquirySources" value="website" label="🌐 האתר שלנו" />
                <CheckboxOption field="inquirySources" value="phone" label="📞 טלפון ישיר" />
                <CheckboxOption field="inquirySources" value="facebook" label="📘 פייסבוק" />
                <CheckboxOption field="inquirySources" value="instagram" label="📸 אינסטגרם" />
                <CheckboxOption field="inquirySources" value="google-ads" label="🔍 גוגל אדס" />
                <CheckboxOption field="inquirySources" value="referrals" label="👤 הפניות מלקוחות" />
                <CheckboxOption field="inquirySources" value="email" label="📧 מייל" />
                <CheckboxOption field="inquirySources" value="whatsapp" label="📱 וואטסאפ" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">אילו סוגי שאלות נפוצות אתם מקבלים?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CheckboxOption field="commonQuestions" value="pricing" label="💰 שאלות על מחירים" />
                <CheckboxOption field="commonQuestions" value="availability" label="📅 זמינות ותיאום" />
                <CheckboxOption field="commonQuestions" value="services" label="🔧 פרטים על השירותים" />
                <CheckboxOption field="commonQuestions" value="process" label="📋 איך התהליך עובד" />
                <CheckboxOption field="commonQuestions" value="timeline" label="⏰ כמה זמן לוקח" />
                <CheckboxOption field="commonQuestions" value="location" label="📍 מיקום וכתובת" />
                <CheckboxOption field="commonQuestions" value="support" label="🛠️ תמיכה טכנית" />
                <CheckboxOption field="commonQuestions" value="refunds" label="↩️ מדיניות החזרות" />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">תהליך המכירה שלכם</h2>
              <p className="text-gray-600">בואו נבין איך הלקוחות הופכים למכירות</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">מהי כמות הלידים בחודש?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <RadioOption field="monthlyLeads" value="1-50" label="1-50" />
                <RadioOption field="monthlyLeads" value="50-200" label="50-200" />
                <RadioOption field="monthlyLeads" value="200-500" label="200-500" />
                <RadioOption field="monthlyLeads" value="500+" label="יותר מ-500" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">באיזה אופן תהליך המכירה קורה היום?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CheckboxOption field="salesProcess" value="face-to-face" label="🤝 פרונטלי - פגישות פנים אל פנים" />
                <CheckboxOption field="salesProcess" value="phone" label="📞 טלפוני" />
                <CheckboxOption field="salesProcess" value="digital" label="💻 דיגיטלי - דרך האתר" />
                <CheckboxOption field="salesProcess" value="events" label="🏢 כנסים ואירועים" />
                <CheckboxOption field="salesProcess" value="whatsapp" label="📱 וואטסאפ" />
                <CheckboxOption field="salesProcess" value="email" label="📧 מייל" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">כמה זמן לוקח מרגע קבלת הפנייה עד טיפול?</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <RadioOption field="responseTime" value="immediate" label="⚡ מיידי" />
                <RadioOption field="responseTime" value="1-24h" label="🕐 תוך 24 שעות" />
                <RadioOption field="responseTime" value="1-3d" label="📅 1-3 ימים" />
                <RadioOption field="responseTime" value="more" label="⏰ יותר מ-3 ימים" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">האם יש לכם מדדים לתהליכי המכירה/שיווק?</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasKPIs"
                      checked={formData.hasKPIs === true}
                      onChange={() => handleInputChange('hasKPIs', true)}
                      className="mr-2"
                    />
                    כן, יש לנו מעקב KPI
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasKPIs"
                      checked={formData.hasKPIs === false}
                      onChange={() => handleInputChange('hasKPIs', false)}
                      className="mr-2"
                    />
                    לא, אין לנו מעקב
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">יש לכם פעולות להגדלת שווי הלקוחות הקיימים?</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasUpselling"
                      checked={formData.hasUpselling === true}
                      onChange={() => handleInputChange('hasUpselling', true)}
                      className="mr-2"
                    />
                    כן, יש לנו תוכניות שדרוג
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasUpselling"
                      checked={formData.hasUpselling === false}
                      onChange={() => handleInputChange('hasUpselling', false)}
                      className="mr-2"
                    />
                    לא, אין לנו
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">תארו את התהליך שעוברים לידים שלא סגרו אתכם</label>
              <textarea
                value={formData.unclosedLeadsProcess}
                onChange={(e) => handleInputChange('unclosedLeadsProcess', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="איך אתם מתמודדים עם לידים שלא הפכו ללקוחות?"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Bot className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">צרכים וציפיות מהבוט</h2>
              <p className="text-gray-600">בואו נגדיר מה הבוט צריך לעשות בשבילכם</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">מהן המטרות העיקריות שלכם מהבוט?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CheckboxOption field="botGoals" value="24-7-support" label="🕐 מענה 24/7" />
                <CheckboxOption field="botGoals" value="lead-qualification" label="🎯 סינון וכישור לידים" />
                <CheckboxOption field="botGoals" value="appointment-scheduling" label="📅 תיאום פגישות אוטומטי" />
                <CheckboxOption field="botGoals" value="faq-answers" label="❓ מענה לשאלות נפוצות" />
                <CheckboxOption field="botGoals" value="lead-collection" label="📝 איסוף פרטי לידים" />
                <CheckboxOption field="botGoals" value="customer-service" label="🎧 שירות לקוחות בסיסי" />
                <CheckboxOption field="botGoals" value="sales-funnel" label="🔄 הכוונה במשפך מכירות" />
                <CheckboxOption field="botGoals" value="reduce-workload" label="⚡ הקלה על העומס" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">מתי אתם רוצים שהבוט יהיה זמין?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <CheckboxOption field="availability" value="24-7" label="🌍 24/7 כל השבוע" />
                <CheckboxOption field="availability" value="business-hours" label="🕘 שעות העבודה בלבד" />
                <CheckboxOption field="availability" value="evenings" label="🌆 גם בערבים" />
                <CheckboxOption field="availability" value="weekends" label="📅 גם בסופי שבוע" />
                <CheckboxOption field="availability" value="no-shabbat" label="🕯️ ללא שבת וחגים" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">יש לכם מידע כתוב קיים שתרצו לשלב?</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasExistingContent"
                      checked={formData.hasExistingContent === true}
                      onChange={() => handleInputChange('hasExistingContent', true)}
                      className="mr-2"
                    />
                    כן, יש לנו תכנים מוכנים
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasExistingContent"
                      checked={formData.hasExistingContent === false}
                      onChange={() => handleInputChange('hasExistingContent', false)}
                      className="mr-2"
                    />
                    לא, נצטרך לבנות מההתחלה
                  </label>
                </div>
              </div>
              
              {formData.hasExistingContent && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">פרטו על התכנים הקיימים</label>
                  <textarea
                    value={formData.existingContentDetails}
                    onChange={(e) => handleInputChange('existingContentDetails', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                    placeholder="שאלות נפוצות, קטלוגים, מדריכים וכו..."
                  />
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">יש לכם העדפות עיצוביות או טכנולוגיות?</label>
              <textarea
                value={formData.designPreferences}
                onChange={(e) => handleInputChange('designPreferences', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20 resize-none"
                placeholder="צבעי מותג, סגנון עיצוב, פלטפורמות מועדפות..."
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">ניסיון קודם</h2>
              <p className="text-gray-600">ספרו לנו על הניסיון שלכם עם אוטומציה</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">יש לכם ניסיון קודם עם בוטים או מערכות אוטומטיות?</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasBotExperience"
                      checked={formData.hasBotExperience === true}
                      onChange={() => handleInputChange('hasBotExperience', true)}
                      className="mr-2"
                    />
                    כן, יש לנו ניסיון
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="hasBotExperience"
                      checked={formData.hasBotExperience === false}
                      onChange={() => handleInputChange('hasBotExperience', false)}
                      className="mr-2"
                    />
                    לא, זה יהיה הראשון
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">איזה סוג של חוויית משתמש היתם רוצים לספק בבוט?</label>
              <textarea
                value={formData.desiredUX}
                onChange={(e) => handleInputChange('desiredUX', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                placeholder="איך אתם רוצים שהלקוחות ירגישו כשהם משתמשים בבוט? מה חשוב לכם בחוויה?"
              />
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">🎉 כמעט סיימנו!</h3>
              <p className="text-blue-700">
                אתם עומדים לסיים את השאלון. בצעד הבא תוכלו לסקור את כל המידע ולשלוח אותו אלינו.
                נחזור אליכם תוך 24 שעות עם הצעה מותאמת אישית לעסק שלכם! 🚀
              </p>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">סיכום ושליחה</h2>
              <p className="text-gray-600">בדקו את הפרטים ושלחו את השאלון</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">פרטי התקשרות:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>עסק:</strong> {formData.businessName}</div>
                <div><strong>איש קשר:</strong> {formData.contactName}</div>
                <div><strong>מייל:</strong> {formData.email}</div>
                <div><strong>טלפון:</strong> {formData.phone}</div>
                <div><strong>תחום:</strong> {formData.businessField}</div>
                <div><strong>מקור הגעה:</strong> {formData.referralSource}</div>
                <div><strong>עובדים:</strong> {formData.employeeCount}</div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-3">מה קורה הלאה? 🚀</h3>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  נסקור את המידע שלכם ונבין את הצרכים העסקיים
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  נכין הצעה מותאמת אישית, המדגישה פתרונות שיחסכו זמן ויגדילו תוצאות
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  נתקדם ליישום והטמעת הפתרונות, כדי לקדם את העסק ולהפוך את האוטומציות לתוצאות אמיתיות
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  נסגור 
                </li>
              </ul>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-lg font-medium transition-all transform shadow-lg ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:from-blue-600 hover:to-indigo-700 hover:scale-105'}`}
            >
              {isSubmitting ? 'שולח...' : '🚀 שלחו את השאלון'}
            </button>
            {submitError && (
              <p className="text-red-600 text-sm mt-2">{submitError}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-right" ref={topRef}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              טכנולוגי לי! 🤖
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              שאלון קצר שיעזור לנו להכין פתרונות טכנולוגיים מדויקים לעסק שלך – לחסוך זמן ולהגדיל מכירות
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">שלב {currentStep} מתוך {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {renderStep()}
          
          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {currentStep > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
              >
                הקודם
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <div />
            )}
            
            {currentStep < totalSteps && (
              <button
                onClick={nextStep}
                className="flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-md"
              >
                <ArrowLeft className="w-4 h-4 ml-2" />
                הבא
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
