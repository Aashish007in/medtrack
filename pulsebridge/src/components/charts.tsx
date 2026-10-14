import React from 'react';

/* ---------------- Bar chart with % labels + grid ---------------- */
export const BarChart: React.FC<{
  data: { day: string; value: number; highlight?: boolean; missed?: boolean }[];
  showGrid?: boolean;
}> = ({ data, showGrid = true }) => (
  <div className="relative w-full">
    {showGrid && (
      <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-semibold text-slate-400 pointer-events-none">
        <div className="flex items-center gap-2">
          <span className="w-7">100%</span>
          <div className="flex-1 border-t border-dashed border-blue-200" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-7">50%</span>
          <div className="flex-1 border-t border-dashed border-blue-200" />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-7">0%</span>
          <div className="flex-1 border-t border-blue-200" />
        </div>
      </div>
    )}
    <div className={`relative flex items-end gap-2 sm:gap-3 h-40 ${showGrid ? 'pl-9' : ''}`}>
      {data.map((d) => {
        const height = Math.max((d.value / 100) * 100, d.value === 0 ? 0 : 3);
        return (
          <div key={d.day} className="flex-1 flex flex-col items-center justify-end h-full">
            <span className="text-[11px] font-bold text-slate-600 mb-1">{d.value}%</span>
            <div
              className={`w-full max-w-[42px] rounded-t-lg transition-all ${
                d.missed
                  ? 'bg-rose-400'
                  : d.highlight
                    ? 'bg-blue-600'
                    : 'bg-blue-300 hover:bg-blue-400'
              }`}
              style={{ height: `${Math.max(height, 2)}%` }}
            />
            <span className="text-xs font-semibold text-slate-500 mt-1.5">{d.day}</span>
          </div>
        );
      })}
    </div>
  </div>
);

/* ---------------- Count-up-free animated progress donut ---------------- */
export interface DonutSegment {
  value: number;
  color: string;
}

export const DonutChart: React.FC<{
  percent: number;
  caption: string;
  segments?: DonutSegment[];
  size?: number;
}> = ({ percent, caption, segments, size = 170 }) => {
  const stroke = 16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const hasSegments = !!segments && segments.length > 0;
  const total = hasSegments ? segments.reduce((s, seg) => s + seg.value, 0) || 1 : 100;
  const rings: DonutSegment[] = hasSegments
    ? segments
    : [
        { value: percent, color: '#22c55e' },
        { value: Math.max(100 - percent, 0), color: '#e8eef7' },
      ];

  let offset = 0;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e8eef7" strokeWidth={stroke} />
        {rings.map((seg, i) => {
          const len = (seg.value / total) * c;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold text-slate-800">{percent}%</span>
        <span className="text-xs font-semibold text-slate-500">{caption}</span>
      </div>
    </div>
  );
};