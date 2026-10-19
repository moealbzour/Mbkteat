import React, { useState } from 'react';
import { Calendar, Clock, AlertTriangle, Filter, ChevronRight, TrendingUp } from 'lucide-react';
import { Language } from '../types';

interface EconomicCalendarProps {
  lang: Language;
}

interface EcoEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  eventAr: string;
  impact: 'High' | 'Medium' | 'Low';
  actual?: string;
  forecast: string;
  previous: string;
  status: 'upcoming' | 'released';
}

const EVENTS: EcoEvent[] = [
  {
    id: 'eco-1',
    time: '13:30 UTC',
    currency: 'USD',
    event: 'Core CPI (MoM / YoY)',
    eventAr: 'مؤشر أسعار المستهلكين الأساسي (شهري / سنوي)',
    impact: 'High',
    forecast: '0.3%',
    previous: '0.3%',
    status: 'upcoming'
  },
  {
    id: 'eco-2',
    time: '14:45 UTC',
    currency: 'USD',
    event: 'S&P Global US Manufacturing PMI',
    eventAr: 'مؤشر مديري المشتريات الصناعي الأمريكي',
    impact: 'High',
    forecast: '50.2',
    previous: '49.8',
    status: 'upcoming'
  },
  {
    id: 'eco-3',
    time: '18:00 UTC',
    currency: 'USD',
    event: 'FOMC Member Williams Speech (New York Fed)',
    eventAr: 'خطاب عضو الفيدرالي ويليامز (بنك نيويورك الاحتياطي)',
    impact: 'High',
    forecast: 'N/A',
    previous: 'N/A',
    status: 'upcoming'
  },
  {
    id: 'eco-4',
    time: '09:00 UTC',
    currency: 'EUR',
    event: 'ECB Monetary Policy Meeting Accounts',
    eventAr: 'محضر اجتماع السياسة النقدية للبنك المركزي الأوروبي',
    impact: 'Medium',
    actual: 'Hold',
    forecast: 'Hold',
    previous: 'Hold',
    status: 'released'
  },
  {
    id: 'eco-5',
    time: '10:30 UTC',
    currency: 'GBP',
    event: 'Bank of England Credit Conditions Survey',
    eventAr: 'مسح شروط الائتمان لبنك إنجلترا',
    impact: 'Low',
    actual: '4.2%',
    forecast: '4.4%',
    previous: '4.1%',
    status: 'released'
  }
];

export const EconomicCalendar: React.FC<EconomicCalendarProps> = ({ lang }) => {
  const [filterImpact, setFilterImpact] = useState<'ALL' | 'High'>('ALL');

  const filtered = EVENTS.filter(e => {
    if (filterImpact === 'High') return e.impact === 'High';
    return true;
  });

  return (
    <div className="w-full flex-1 p-6 bg-slate-950 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase mb-1">
              <Calendar className="w-4 h-4" />
              <span>{lang === 'ar' ? 'المفكرة الاقتصادية الفورية' : 'Institutional Macro Calendar'}</span>
            </div>
            <h1 className="text-xl font-bold text-white font-sans">
              {lang === 'ar' ? 'أحداث السيولة العالية ومؤشرات السوق' : 'High-Impact Economic Events'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'ar' 
                ? 'تنبيهات تقلبات السوق لأزواج الذهب والناسداك والدولار الأمريكي'
                : 'Key volatility drivers for US100 index futures, Gold spot, and USD order flow.'}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <button
              onClick={() => setFilterImpact('ALL')}
              className={`px-3 py-1.5 rounded cursor-pointer ${
                filterImpact === 'ALL' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setFilterImpact('High')}
              className={`px-3 py-1.5 rounded cursor-pointer ${
                filterImpact === 'High' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'text-slate-400 hover:text-white'
              }`}
            >
              High Impact Only
            </button>
          </div>
        </div>

        {/* Events Table */}
        <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/60 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Time (UTC)</th>
                <th className="px-4 py-3.5">Currency</th>
                <th className="px-4 py-3.5">Impact</th>
                <th className="px-5 py-3.5">Economic Release</th>
                <th className="px-4 py-3.5 text-right">Forecast</th>
                <th className="px-4 py-3.5 text-right">Previous</th>
                <th className="px-4 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filtered.map((ev) => (
                <tr key={ev.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-slate-300 tabular-nums">
                    {ev.time}
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-slate-100">
                    {ev.currency}
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        ev.impact === 'High'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800'
                          : ev.impact === 'Medium'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {ev.impact}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-white">
                    {lang === 'ar' ? ev.eventAr : ev.event}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-slate-300 tabular-nums">
                    {ev.forecast}
                  </td>
                  <td className="px-4 py-4 text-right font-mono text-slate-400 tabular-nums">
                    {ev.previous}
                  </td>
                  <td className="px-4 py-4 text-right">
                    {ev.status === 'upcoming' ? (
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
                        PENDING
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                        {ev.actual || 'RELEASED'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
