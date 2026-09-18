const WAYPOINTS = [
  [38, 192],
  [120, 152],
  [220, 122],
  [300, 92],
  [352, 72],
];

function pointAt(points, t) {
  const lens = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i += 1) {
    const dx = points[i + 1][0] - points[i][0];
    const dy = points[i + 1][1] - points[i][1];
    const l = Math.hypot(dx, dy);
    lens.push(l);
    total += l;
  }
  let target = Math.max(0, Math.min(1, t)) * total;
  for (let i = 0; i < lens.length; i += 1) {
    if (target <= lens[i]) {
      const ratio = lens[i] === 0 ? 0 : target / lens[i];
      return [
        points[i][0] + (points[i + 1][0] - points[i][0]) * ratio,
        points[i][1] + (points[i + 1][1] - points[i][1]) * ratio,
      ];
    }
    target -= lens[i];
  }
  return points[points.length - 1];
}

const FIELDS = [
  [10, 10, 90, 70],
  [110, 10, 90, 70],
  [210, 10, 90, 70],
  [310, 10, 80, 70],
  [10, 95, 90, 70],
  [110, 95, 90, 70],
  [210, 95, 90, 70],
  [310, 95, 80, 70],
  [10, 180, 90, 55],
  [110, 180, 90, 55],
  [210, 180, 90, 55],
  [310, 180, 80, 55],
];

function RoutePath({ points, dashed = false, color = '#16a34a', width = 4 }) {
  const d = `M${points.map((p) => p.join(' ')).join(' L')}`;
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? '10 8' : undefined}
    />
  );
}

export default function MapPlaceholder({ progress = 0, from = 'Farm', to = 'Destination', distance = 0, legend = true, className }) {
  const vehicle = pointAt(WAYPOINTS, progress / 100);

  return (
    <div className={className}>
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-[#eef6ee]">
        <svg viewBox="0 0 400 250" className="block h-auto w-full" role="img" aria-label={`Route map from ${from} to ${to}`}>
          {FIELDS.map((f) => (
            <rect key={f.join('-')} x={f[0]} y={f[1]} width={f[2]} height={f[3]} rx={8} fill={f[1] % 180 < 90 ? '#dcefdc' : '#e6f3e4'} />
          ))}

          <path d="M0 92 H400" stroke="#cbd5e1" strokeWidth={5} strokeLinecap="round" fill="none" />
          <path d="M0 176 H400" stroke="#cbd5e1" strokeWidth={5} strokeLinecap="round" fill="none" />
          <path d="M196 0 V250" stroke="#cbd5e1" strokeWidth={4} strokeLinecap="round" fill="none" />
          <path d="M70 0 V250" stroke="#e2e8f0" strokeWidth={2} strokeLinecap="round" fill="none" />
          <path d="M332 0 V250" stroke="#e2e8f0" strokeWidth={2} strokeLinecap="round" fill="none" />

          <RoutePath points={WAYPOINTS} dashed color="#94a3b8" width={6} />
          <RoutePath points={WAYPOINTS} color="#16a34a" width={4} />

          <circle cx={WAYPOINTS[0][0]} cy={WAYPOINTS[0][1]} r={12} fill="#16a34a" />
          <text x={WAYPOINTS[0][0]} y={WAYPOINTS[0][1] + 4} textAnchor="middle" fontSize={12}>🏠</text>
          <text x={WAYPOINTS[0][0] - 4} y={WAYPOINTS[0][1] + 34} fontSize={11} fontWeight={700} fill="#16a34a">Farm</text>

          <circle cx={WAYPOINTS[WAYPOINTS.length - 1][0]} cy={WAYPOINTS[WAYPOINTS.length - 1][1]} r={12} fill="#f59e0b" />
          <text x={WAYPOINTS[WAYPOINTS.length - 1][0]} y={WAYPOINTS[WAYPOINTS.length - 1][1] + 4} textAnchor="middle" fontSize={12}>🏬</text>
          <text x={WAYPOINTS[WAYPOINTS.length - 1][0] - 6} y={WAYPOINTS[WAYPOINTS.length - 1][1] + 34} fontSize={11} fontWeight={700} fill="#f59e0b">Mandi</text>

          {progress > 0 && progress < 100 && (
            <g>
              <circle cx={vehicle[0]} cy={vehicle[1]} r={16} fill="rgba(22,163,74,0.15)">
                <animate attributeName="r" values="14;20;14" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <circle cx={vehicle[0]} cy={vehicle[1]} r={12} fill="#ffffff" stroke="#16a34a" strokeWidth={2} />
              <text x={vehicle[0]} y={vehicle[1] + 4} textAnchor="middle" fontSize={12}>🚚</text>
            </g>
          )}
        </svg>
      </div>

      {legend && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-gray-500">
          <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary-600" aria-hidden="true" /> {from}</span>
          <span className="h-px w-6 bg-gray-300" aria-hidden="true" />
          <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-accent-500" aria-hidden="true" /> {to}</span>
          {distance > 0 && <span className="font-bold text-gray-700">· {distance} km</span>}
        </div>
      )}
    </div>
  );
}