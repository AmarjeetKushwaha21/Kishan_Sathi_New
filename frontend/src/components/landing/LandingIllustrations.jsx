/**
 * Vector illustrations tailored for Kishan Sathi's agriculture theme.
 * Zero external asset dependencies, sharp resolution, instant rendering, dark mode compatible.
 */

export function TractorIllustration({ className = 'w-48 h-32' }) {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Soil / Ground line */}
      <path
        d="M10 145C50 142 90 146 130 143C170 140 210 144 235 142"
        stroke="#16A34A"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="20" cy="148" r="2" fill="#15803D" />
      <circle cx="55" cy="149" r="1.5" fill="#15803D" />
      <circle cx="105" cy="147" r="2" fill="#15803D" />
      <circle cx="170" cy="148" r="1.5" fill="#15803D" />
      <circle cx="215" cy="147" r="2" fill="#15803D" />

      {/* Tractor Body */}
      <rect x="75" y="70" width="85" height="42" rx="6" fill="#16A34A" />
      <path d="M105 45L128 45L145 70L95 70Z" fill="#15803D" />
      <rect x="108" y="50" width="22" height="15" rx="2" fill="#BBF7D0" />
      {/* Exhaust pipe */}
      <rect x="148" y="42" width="5" height="28" rx="2.5" fill="#374151" />
      <path d="M150 36C150 34 153 32 156 30" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />

      {/* Hood & Engine Grill */}
      <rect x="145" y="76" width="30" height="34" rx="4" fill="#15803D" />
      <line x1="168" y1="82" x2="168" y2="102" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
      <line x1="163" y1="82" x2="163" y2="102" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />

      {/* Front Light */}
      <circle cx="175" cy="85" r="4" fill="#FEF08A" />

      {/* Steering & Seat */}
      <path d="M100 66L92 66C89 66 87 64 87 61L87 56" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      <line x1="112" y1="62" x2="106" y2="68" stroke="#374151" strokeWidth="3" strokeLinecap="round" />

      {/* Large Rear Wheel */}
      <circle cx="70" cy="115" r="32" fill="#1F2937" />
      <circle cx="70" cy="115" r="22" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
      <circle cx="70" cy="115" r="9" fill="#16A34A" />
      {/* Rear Wheel Treads */}
      <path
        d="M70 85L70 91M70 139L70 145M40 115L46 115M94 115L100 115M49 94L54 98M86 132L91 136M49 136L54 132M86 98L91 94"
        stroke="#4B5563"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Small Front Wheel */}
      <circle cx="165" cy="125" r="20" fill="#1F2937" />
      <circle cx="165" cy="125" r="13" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="2" />
      <circle cx="165" cy="125" r="6" fill="#16A34A" />
      {/* Front Wheel Treads */}
      <path
        d="M165 106L165 111M165 139L165 144M146 125L151 125M179 125L184 125"
        stroke="#4B5563"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FarmerIllustration({ className = 'w-36 h-36' }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="160" height="160" rx="24" fill="#F0FDF4" />
      {/* Background soft green circle */}
      <circle cx="80" cy="80" r="60" fill="#DCFCE7" />

      {/* Field plants in background */}
      <path d="M25 140Q40 110 50 140" stroke="#16A34A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M35 140Q48 100 60 140" stroke="#22C55E" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M100 140Q112 100 125 140" stroke="#22C55E" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M115 140Q125 110 135 140" stroke="#16A34A" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Body / Kurta */}
      <path
        d="M40 160C40 126 58 116 80 116C102 116 120 126 120 160Z"
        fill="#15803D"
      />
      <path d="M80 116L80 145" stroke="#BBF7D0" strokeWidth="2.5" strokeLinecap="round" />
      {/* White/cream scarf (Gamchha) */}
      <path
        d="M56 120C64 128 72 132 80 132C88 132 96 128 104 120L100 160H88L80 138L72 160H60Z"
        fill="#FEF3C7"
      />

      {/* Neck */}
      <rect x="73" y="98" width="14" height="20" rx="3" fill="#E0A97E" />

      {/* Face */}
      <ellipse cx="80" cy="80" rx="20" ry="24" fill="#EAA777" />
      {/* Ears */}
      <circle cx="59" cy="80" r="5" fill="#EAA777" />
      <circle cx="101" cy="80" r="5" fill="#EAA777" />
      {/* Eyes */}
      <circle cx="72" cy="78" r="2.5" fill="#1F2937" />
      <circle cx="88" cy="78" r="2.5" fill="#1F2937" />
      {/* Eyebrows */}
      <path d="M68 73Q73 71 77 73" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      <path d="M83 73Q87 71 92 73" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
      {/* Nose */}
      <path d="M80 77V84H83" stroke="#C87F55" strokeWidth="2" strokeLinecap="round" />
      {/* Moustache */}
      <path
        d="M68 90C74 88 78 92 80 93C82 92 86 88 92 90C90 94 84 96 80 95C76 96 70 94 68 90Z"
        fill="#374151"
      />
      {/* Smile */}
      <path d="M75 99Q80 102 85 99" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />

      {/* Traditional Indian Pagdi / Turban */}
      <path
        d="M56 64C56 46 66 38 80 38C94 38 104 46 104 64C104 66 56 66 56 64Z"
        fill="#F59E0B"
      />
      <path
        d="M54 62C62 52 76 50 86 52C94 54 105 60 105 66C98 72 82 72 74 70C64 68 56 65 54 62Z"
        fill="#D97706"
      />
      <path
        d="M58 56C68 46 88 46 98 55C92 60 76 60 68 58C62 57 59 56 58 56Z"
        fill="#FBBF24"
      />
      {/* Turban fold fan on top */}
      <path
        d="M74 38L78 28C80 27 82 27 84 28L88 38Z"
        fill="#F59E0B"
      />
    </svg>
  );
}

export function CompanyIllustration({ className = 'w-36 h-36' }) {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="160" height="160" rx="24" fill="#F0FDF4" />
      {/* Background circle */}
      <circle cx="80" cy="80" r="60" fill="#DCFCE7" />

      {/* Tall modern eco towers */}
      {/* Tower 1 (back) */}
      <rect x="42" y="55" width="30" height="85" rx="4" fill="#15803D" />
      {/* Windows Tower 1 */}
      <rect x="48" y="62" width="5" height="5" rx="1" fill="#BBF7D0" />
      <rect x="58" y="62" width="5" height="5" rx="1" fill="#BBF7D0" />
      <rect x="48" y="73" width="5" height="5" rx="1" fill="#BBF7D0" />
      <rect x="58" y="73" width="5" height="5" rx="1" fill="#BBF7D0" />
      <rect x="48" y="84" width="5" height="5" rx="1" fill="#BBF7D0" />
      <rect x="58" y="84" width="5" height="5" rx="1" fill="#BBF7D0" />
      <rect x="48" y="95" width="5" height="5" rx="1" fill="#BBF7D0" />
      <rect x="58" y="95" width="5" height="5" rx="1" fill="#BBF7D0" />

      {/* Tower 2 (main center) */}
      <rect x="76" y="38" width="42" height="102" rx="5" fill="#16A34A" />
      {/* Windows Tower 2 */}
      <rect x="83" y="46" width="6" height="6" rx="1.5" fill="#FFFFFF" />
      <rect x="94" y="46" width="6" height="6" rx="1.5" fill="#FFFFFF" />
      <rect x="105" y="46" width="6" height="6" rx="1.5" fill="#FFFFFF" />
      <rect x="83" y="58" width="6" height="6" rx="1.5" fill="#BBF7D0" />
      <rect x="94" y="58" width="6" height="6" rx="1.5" fill="#BBF7D0" />
      <rect x="105" y="58" width="6" height="6" rx="1.5" fill="#BBF7D0" />
      <rect x="83" y="70" width="6" height="6" rx="1.5" fill="#BBF7D0" />
      <rect x="94" y="70" width="6" height="6" rx="1.5" fill="#BBF7D0" />
      <rect x="105" y="70" width="6" height="6" rx="1.5" fill="#BBF7D0" />
      <rect x="83" y="82" width="6" height="6" rx="1.5" fill="#BBF7D0" />
      <rect x="94" y="82" width="6" height="6" rx="1.5" fill="#BBF7D0" />
      <rect x="105" y="82" width="6" height="6" rx="1.5" fill="#BBF7D0" />
      <rect x="83" y="94" width="6" height="6" rx="1.5" fill="#FFFFFF" />
      <rect x="94" y="94" width="6" height="6" rx="1.5" fill="#FFFFFF" />
      <rect x="105" y="94" width="6" height="6" rx="1.5" fill="#FFFFFF" />

      {/* Glass Entrance */}
      <rect x="91" y="124" width="12" height="16" rx="2" fill="#E0E7FF" />

      {/* Green foliage / Plants on buildings and foreground */}
      <path
        d="M26 140C26 128 36 122 45 125C50 120 60 120 64 126C72 122 80 126 80 140Z"
        fill="#22C55E"
      />
      <path
        d="M106 140C106 126 116 120 124 123C130 118 140 120 144 128C150 126 156 130 156 140Z"
        fill="#22C55E"
      />

      {/* Green Leaf Canopy on roof */}
      <path
        d="M97 38C97 30 106 24 116 26C122 32 118 38 112 40C104 40 97 38 97 38Z"
        fill="#4ADE80"
      />
      <path
        d="M78 38C78 32 72 26 64 28C60 34 64 40 70 41C74 41 78 38 78 38Z"
        fill="#22C55E"
      />
    </svg>
  );
}

export function SproutIllustration({ className = 'w-24 h-24' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Soil mound */}
      <ellipse cx="50" cy="85" rx="36" ry="10" fill="#78350F" />
      <ellipse cx="50" cy="83" rx="30" ry="7" fill="#92400E" />
      <circle cx="32" cy="85" r="2" fill="#451A03" />
      <circle cx="68" cy="84" r="2" fill="#451A03" />
      <circle cx="48" cy="87" r="1.5" fill="#451A03" />

      {/* Sprout Stem */}
      <path
        d="M50 83C50 68 50 50 50 36"
        stroke="#16A34A"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Left Leaf */}
      <path
        d="M50 54C40 54 28 46 26 34C38 34 46 44 50 54Z"
        fill="#22C55E"
      />
      <path
        d="M50 54C42 47 34 42 26 34"
        stroke="#15803D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Right Leaf */}
      <path
        d="M50 44C62 44 74 34 76 20C62 20 54 32 50 44Z"
        fill="#4ADE80"
      />
      <path
        d="M50 44C58 36 66 30 76 20"
        stroke="#16A34A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Top tiny budding leaf */}
      <path
        d="M50 36C47 30 48 24 51 22C54 24 53 30 50 36Z"
        fill="#86EFAC"
      />
    </svg>
  );
}

export function FarmerHeroSilhouette({ className = 'w-64 h-64' }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="90" fill="#DCFCE7" fillOpacity="0.4" />
      {/* Farmland hills in background */}
      <path
        d="M20 160Q60 135 100 155Q140 130 180 160V190H20Z"
        fill="#86EFAC"
        fillOpacity="0.6"
      />
      {/* Farmer Looking at Fields (Silhouette with Indian Turban) */}
      <path
        d="M75 190C75 155 88 142 105 142C122 142 135 155 135 190Z"
        fill="#15803D"
      />
      {/* Shoulder wrap */}
      <path
        d="M85 145Q105 160 125 145L128 175Q105 185 82 175Z"
        fill="#FEF3C7"
      />
      {/* Head */}
      <circle cx="105" cy="120" r="14" fill="#EAA777" />
      {/* Turban */}
      <path
        d="M92 118C92 104 100 98 108 98C118 98 124 104 124 118C124 122 92 122 92 118Z"
        fill="#F59E0B"
      />
      <path
        d="M90 114C98 106 112 106 122 114"
        stroke="#D97706"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Wheat stalk in hand */}
      <path
        d="M125 155L145 110"
        stroke="#CA8A04"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="145" cy="108" r="3" fill="#EAB308" />
      <circle cx="142" cy="114" r="2.5" fill="#EAB308" />
      <circle cx="147" cy="118" r="2.5" fill="#EAB308" />
      <circle cx="138" cy="122" r="2" fill="#EAB308" />
    </svg>
  );
}
