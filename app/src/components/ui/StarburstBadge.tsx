// Starburst Badge Component
export const StarburstBadge = ({ text, className = "" }: { text: string, className?: string }) => (
  <div className={`relative w-24 h-24 flex items-center justify-center ${className}`}>
    <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 120 120">
      <polygon points="60,5 70,45 110,45 78,70 90,110 60,85 30,110 42,70 10,45 50,45" 
        fill="#0B0C0F" stroke="#FF2D8F" strokeWidth="2"/>
    </svg>
    <span className="relative z-10 font-mono text-[10px] font-bold text-[#F4F6FA] text-center leading-tight px-2 uppercase">
      {text}
    </span>
  </div>
);
