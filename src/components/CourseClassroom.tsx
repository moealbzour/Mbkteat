import React, { useState } from 'react';
import { CourseLesson, Language, MembershipTier } from '../types';
import { GraduationCap, Play, CheckCircle2, Lock, Clock, BookOpen, Award, FileText } from 'lucide-react';

interface CourseClassroomProps {
  lang: Language;
  userTier: MembershipTier;
  onUpgradeTier: () => void;
}

const LESSONS: CourseLesson[] = [
  {
    id: 'les-1',
    title: 'The Interbank Algorithm & Liquidity Delivery Framework',
    titleAr: 'خوارزمية تسليم الأسعار البنكية وهيكل السيولة',
    duration: '38 min',
    module: 'Module 1: Market Mechanics',
    moduleAr: 'الوحدة 1: آليات السوق',
    isCompleted: true,
    description: 'How central bank dealers and institutional automated algorithms engineer liquidity pools on US100 index futures.'
  },
  {
    id: 'les-2',
    title: 'Precision Order Blocks (+OB / -OB) & Mitigation Criteria',
    titleAr: 'تحديد مناطق صانع السوق وشروط التخفيف الدقيقة',
    duration: '45 min',
    module: 'Module 2: Order Flow',
    moduleAr: 'الوحدة 2: تدفق الأوامر',
    isCompleted: true,
    description: 'Distinguishing valid high-probability institutional order blocks from retail supply/demand fakeouts.'
  },
  {
    id: 'les-3',
    title: 'Fair Value Gaps (FVG) & Imbalance Inversion Models',
    titleAr: 'الفجوات السعرية العادلة ونماذج انعكاس عدم التوازن',
    duration: '52 min',
    module: 'Module 2: Order Flow',
    moduleAr: 'الوحدة 2: تدفق الأوامر',
    isCompleted: false,
    description: 'Trading the 03:00 AM London and 10:00 AM New York Silver Bullet FVG sweeps with sub-15 pip stop losses.'
  },
  {
    id: 'les-4',
    title: 'Volume Profile, Point of Control (POC) & VWAP Anchoring',
    titleAr: 'ملف الحجم، نقطة التحكم ونقاط الارتكاز المؤسسية',
    duration: '41 min',
    module: 'Module 3: Volume & Footprint',
    moduleAr: 'الوحدة 3: الحجم والبصمة السعرية',
    isCompleted: false,
    description: 'Using high volume nodes and value area highs (VAH) to execute runner targets on Gold spot (XAUUSD).'
  },
  {
    id: 'les-5',
    title: 'Passing $100K - $200K Prop Firm Challenges with 1:3 R:R',
    titleAr: 'اجتياز اختبارات شركات التمويل بنموذج 1:3 للمخاطرة',
    duration: '60 min',
    module: 'Module 4: Risk & Funded Execution',
    moduleAr: 'الوحدة 4: إدارة المخاطر والتمويل',
    isCompleted: false,
    description: 'Drawdown recovery rules, position sizing spreadsheets, and psychological resilience protocols.'
  }
];

export const CourseClassroom: React.FC<CourseClassroomProps> = ({
  lang,
  userTier,
  onUpgradeTier,
}) => {
  const [lessons, setLessons] = useState<CourseLesson[]>(LESSONS);
  const [activeLessonId, setActiveLessonId] = useState(lessons[0].id);

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];
  const isLocked = userTier !== 'pro';

  const completedCount = lessons.filter(l => l.isCompleted).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const toggleComplete = (id: string) => {
    setLessons(prev => prev.map(l => {
      if (l.id === id) return { ...l, isCompleted: !l.isCompleted };
      return l;
    }));
  };

  return (
    <div className="w-full flex-1 p-6 bg-slate-950 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Course Progress */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'ar' ? 'أكاديمية إم بي كي المؤسسية' : 'Learn Mode · Video Classroom'}</span>
            </div>
            <h1 className="text-xl font-bold text-white font-sans">
              {lang === 'ar' 
                ? 'دورة تدفق الأوامر وصناع السوق (من الصفر إلى حساب ممول)'
                : 'Institutional Order Flow Masterclass (Zero to Funded)'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'ar'
                ? 'المنهج الشامل للتداول الخوارزمي وهيكل السوق مع ماركوس فانس وإيلينا روستوفا.'
                : 'Complete video curriculum by Marcus Vance (CIO) & Elena Rostova.'}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-400">{lang === 'ar' ? 'التقدم في الدورة' : 'Course Progress'}</span>
              <span className="font-bold text-emerald-400">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Classroom Grid: Video Player + Modules List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Viewport */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video rounded-xl bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
              {isLocked ? (
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-10">
                  <Lock className="w-8 h-8 text-amber-400 mb-2" />
                  <h3 className="text-sm font-bold text-white mb-1">
                    {lang === 'ar' ? 'محتوى حصري لمشتركي Pro VIP' : 'Pro VIP Membership Required'}
                  </h3>
                  <p className="text-xs text-slate-400 max-w-md mb-4">
                    {lang === 'ar'
                      ? 'قم بالترقية لحساب Pro ($99/mo) لفتح الدورة الكاملة مع المؤشرات وإشارات التداول.'
                      : 'Upgrade to Pro ($99/mo) to unlock the full 18-hour masterclass, downloadable PDF workbooks, and PineScript indicator suite.'}
                  </p>
                  <button
                    onClick={onUpgradeTier}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold rounded cursor-pointer"
                  >
                    {lang === 'ar' ? 'ترقية الحساب الآن' : 'Unlock Pro Access ($99/mo)'}
                  </button>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center relative bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30">
                  <div className="w-16 h-16 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 cursor-pointer transition-transform hover:scale-105">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                  <div className="mt-4 text-center font-mono text-xs text-slate-300">
                    <div>{activeLesson.module}</div>
                    <div className="text-white font-bold text-sm mt-0.5">{lang === 'ar' ? activeLesson.titleAr : activeLesson.title}</div>
                    <div className="text-slate-500 text-[11px] mt-1">Duration: {activeLesson.duration} · 1080p Ultra HD</div>
                  </div>
                </div>
              )}
            </div>

            {/* Lesson Details */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-emerald-400 font-semibold">{activeLesson.module}</span>
                <span className="font-mono text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeLesson.duration}</span>
                </span>
              </div>
              <h2 className="text-base font-bold text-white mb-2">
                {lang === 'ar' ? activeLesson.titleAr : activeLesson.title}
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeLesson.description}
              </p>
            </div>
          </div>

          {/* Modules List Sidebar */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 h-fit">
            <div className="font-bold text-xs text-white uppercase tracking-wider font-mono mb-3">
              {lang === 'ar' ? 'دروس المنهج' : 'Course Curriculum'}
            </div>

            <div className="space-y-2">
              {lessons.map((les, idx) => {
                const isActive = activeLessonId === les.id;

                return (
                  <div
                    key={les.id}
                    onClick={() => setActiveLessonId(les.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 border-emerald-500/80'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleComplete(les.id);
                          }}
                          className="mt-0.5 text-slate-500 hover:text-emerald-400 cursor-pointer"
                        >
                          <CheckCircle2 className={`w-4 h-4 ${les.isCompleted ? 'text-emerald-400 fill-emerald-400/20' : 'text-slate-600'}`} />
                        </button>

                        <div>
                          <div className="text-[10px] font-mono text-slate-400">{les.module}</div>
                          <div className={`text-xs font-semibold mt-0.5 leading-snug ${isActive ? 'text-emerald-300' : 'text-slate-200'}`}>
                            {lang === 'ar' ? les.titleAr : les.title}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {les.duration}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
