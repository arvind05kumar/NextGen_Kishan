import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink, ChevronUp, ChevronDown, ShieldCheck,
  Sparkles, Landmark, Pause, Play, CheckCircle2,
  X, Search, ArrowRight, Radio
} from 'lucide-react';
import { createPortal } from 'react-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GOVT_SCHEMES_DATA, GovtScheme } from '../../data/govtSchemesData';

interface GovtSchemesTickerProps {
  className?: string;
  onOpenAllSchemesModal?: () => void;
}

const GovtSchemesTicker: React.FC<GovtSchemesTickerProps> = ({
  className = '',
}) => {
  const { language } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [animDirection, setAnimDirection] = useState<'up' | 'down'>('up');
  const [slideKey, setSlideKey] = useState(0);

  const isHindi = language === 'hindi';
  const isPunjabi = language === 'regional';
  const langKey = isHindi ? 'hindi' : isPunjabi ? 'regional' : 'english';

  const schemes = GOVT_SCHEMES_DATA;
  const currentScheme = schemes[currentIndex];

  // Auto-slide up ticker every 4.2 seconds
  useEffect(() => {
    if (isPaused || showAllModal) return;

    const timer = setInterval(() => {
      setAnimDirection('up');
      setCurrentIndex((prev) => (prev + 1) % schemes.length);
      setSlideKey((prev) => prev + 1);
    }, 4200);

    return () => clearInterval(timer);
  }, [isPaused, showAllModal, schemes.length]);

  const handleNext = () => {
    setAnimDirection('up');
    setCurrentIndex((prev) => (prev + 1) % schemes.length);
    setSlideKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    setAnimDirection('down');
    setCurrentIndex((prev) => (prev - 1 + schemes.length) % schemes.length);
    setSlideKey((prev) => prev + 1);
  };

  // Filter schemes in modal
  const filteredSchemes = schemes.filter((s) => {
    const title = (s.title[langKey] || s.title.english).toLowerCase();
    const desc = (s.description[langKey] || s.description.english).toLowerCase();
    const highlight = (s.highlight[langKey] || s.highlight.english).toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || title.includes(q) || desc.includes(q) || highlight.includes(q) || s.domainName.includes(q);
    const matchesCategory = selectedCategory === 'all' || s.id.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Live Govt Schemes Upward Ticker Tile */}
      <div
        className={`relative bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-2xl p-3 sm:p-4 shadow-md border border-emerald-500/30 overflow-hidden transition-all duration-300 hover:border-emerald-400/60 hover:shadow-lg ${className}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Ambient Top Glow line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-75" />

        {/* Top Header Bar inside the Tile */}
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            {/* Live Pulsing Beacon Dot */}
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>

            {/* Title / Badge */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-emerald-300 flex items-center gap-1">
                <span>{isHindi ? 'लाइव सरकारी योजनाएं व सब्सिडी' : isPunjabi ? 'ਲਾਈਵ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਤੇ ਸਬਸਿਡੀਆਂ' : 'LIVE GOVT SCHEMES & SUBSIDIES'}</span>
              </span>
              <span className="hidden sm:inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.2 rounded-full">
                {isHindi ? '2026 अपडेट' : isPunjabi ? '2026 ਅੱਪਡੇਟ' : '2026 Official'}
              </span>
            </div>
          </div>

          {/* Right Controls: Pause, Up/Down, Counter, View All */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Counter */}
            <span className="text-[11px] font-mono text-emerald-200/80 font-bold bg-white/10 px-2 py-0.5 rounded-md hidden xs:inline-block">
              {String(currentIndex + 1).padStart(2, '0')}/{String(schemes.length).padStart(2, '0')}
            </span>

            {/* Manual Up/Down Upward Navigation buttons */}
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/10">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 text-emerald-200 hover:text-white hover:bg-white/15 rounded transition-colors cursor-pointer"
                title={isHindi ? 'पिछला संदेश (ऊपर)' : 'Previous Scheme'}
                aria-label="Previous scheme"
              >
                <ChevronUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-1 text-emerald-200 hover:text-white hover:bg-white/15 rounded transition-colors cursor-pointer"
                title={isHindi ? 'अगला संदेश (नीचे से ऊपर)' : 'Next Scheme'}
                aria-label="Next scheme"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Play/Pause Toggle */}
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              className="p-1 text-emerald-200 hover:text-white hover:bg-white/15 rounded-lg border border-white/10 transition-colors cursor-pointer"
              title={isPaused ? (isHindi ? 'शुरू करें (Play)' : 'Play Ticker') : (isHindi ? 'रोकें (Pause)' : 'Pause Ticker')}
              aria-label={isPaused ? 'Resume ticker' : 'Pause ticker'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-amber-300" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            {/* View All Button */}
            <button
              type="button"
              onClick={() => setShowAllModal(true)}
              className="bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-200 hover:text-white border border-emerald-400/30 text-[10px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 active:scale-95"
            >
              <span>{isHindi ? 'सभी देखें' : isPunjabi ? 'ਸਭ ਵੇਖੋ' : 'View All'}</span>
              <span className="hidden sm:inline">({schemes.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Upward Sliding Message Viewport Container */}
        <div className="relative overflow-hidden min-h-[68px] sm:min-h-[64px] flex items-center">
          <div
            key={slideKey}
            className={`w-full flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-3 ${
              animDirection === 'up' ? 'animate-ticker-slide-up' : 'animate-ticker-slide-down'
            }`}
          >
            {/* Left Column: Emoji + Scheme Title + Benefit highlight */}
            <div className="flex items-start gap-2.5 min-w-0 flex-1">
              {/* Scheme Category Emoji / Icon */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-inner">
                {currentScheme.emoji}
              </div>

              <div className="min-w-0 flex-1">
                {/* Badges line: Category + Tag */}
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span
                    className="text-[10px] font-bold px-2 py-0.2 rounded-md border"
                    style={{
                      backgroundColor: `${currentScheme.badgeColor}25`,
                      color: '#a7f3d0',
                      borderColor: `${currentScheme.badgeColor}60`
                    }}
                  >
                    {currentScheme.badge[langKey] || currentScheme.badge.english}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-300/80 truncate">
                    {currentScheme.category[langKey] || currentScheme.category.english}
                  </span>
                  <span className="text-[9px] text-gray-400 font-mono hidden md:inline">
                    • {currentScheme.domainName}
                  </span>
                </div>

                {/* Scheme Title (Clickable) */}
                <a
                  href={currentScheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-xs sm:text-sm text-white hover:text-emerald-300 transition-colors line-clamp-1 block leading-snug group"
                  title={currentScheme.title[langKey] || currentScheme.title.english}
                >
                  <span className="group-hover:underline">
                    {currentScheme.title[langKey] || currentScheme.title.english}
                  </span>
                </a>

                {/* Short Benefit Highlight */}
                <p className="text-[11px] sm:text-xs text-emerald-100/90 line-clamp-1 font-medium mt-0.5">
                  ✨ {currentScheme.highlight[langKey] || currentScheme.highlight.english}
                </p>
              </div>
            </div>

            {/* Right Column: Clickable Live Official Portal Button */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <a
                href={currentScheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-extrabold text-[11px] sm:text-xs rounded-xl shadow-md hover:shadow-emerald-500/30 transition-all duration-200 active:scale-95 cursor-pointer border border-emerald-300/40 group"
                title={`Visit official ${currentScheme.domainName}`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-200 group-hover:scale-110 transition-transform" />
                <span>{isHindi ? 'सरकारी पोर्टल खोलें' : isPunjabi ? 'ਸਰਕਾਰੀ ਪੋਰਟਲ ਖੋਲ੍ਹੋ' : 'Open Official Portal'}</span>
                <ExternalLink className="w-3 h-3 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom subtle progress indicator line */}
        <div className="w-full bg-white/10 h-[2px] rounded-full mt-2 overflow-hidden">
          <div
            key={slideKey}
            className={`h-full bg-gradient-to-r from-emerald-400 to-green-500 ${
              isPaused ? 'w-full opacity-40' : 'animate-ticker-progress'
            }`}
          />
        </div>
      </div>

      {/* Complete Schemes Directory Modal (Opens on "View All") */}
      {showAllModal && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-[100000] overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAllModal(false);
          }}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full my-6 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-emerald-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-950 text-white p-4 sm:p-6 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20 shadow-inner">
                  <Landmark className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-xl font-black">
                      {isHindi ? 'सभी सक्रिय सरकारी कृषि योजनाएं एवं सब्सिडी' : isPunjabi ? 'ਸਾਰੀਆਂ ਸਰਕਾਰੀ ਖੇਤੀ ਸਕੀਮਾਂ ਤੇ ਗ੍ਰਾਂਟਾਂ' : 'Active Government Agricultural Schemes & Subsidies'}
                    </h2>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      2026 Live
                    </span>
                  </div>
                  <p className="text-xs text-emerald-200 mt-0.5">
                    {isHindi
                      ? 'भारत सरकार एवं कृषि मंत्रालय द्वारा किसानों के लिए जारी आधिकारिक पोर्टल लिंक'
                      : isPunjabi
                      ? 'ਭਾਰਤ ਸਰਕਾਰ ਵੱਲੋਂ ਕਿਸਾਨਾਂ ਲਈ ਅਧਿਕਾਰਤ ਸਰਕਾਰੀ ਪੋਰਟਲ ਲਿੰਕ'
                      : 'Official government portal links verified by Ministry of Agriculture & Farmers Welfare'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="text-white/80 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isHindi
                      ? 'योजना का नाम, सब्सिडी या कीवर्ड खोजें (जैसे: PM-Kisan, सोलर, खाद)...'
                      : isPunjabi
                      ? 'ਸਕੀਮ ਦਾ ਨਾਂ ਜਾਂ ਕੀਵਰਡ ਖੋਜੋ...'
                      : 'Search scheme by name, subsidy keyword, or portal...'
                  }
                  className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                {[
                  { id: 'all', label: isHindi ? 'सभी योजनाएं' : 'All Schemes' },
                  { id: 'kisan', label: 'PM-Kisan' },
                  { id: 'bima', label: isHindi ? 'फसल बीमा' : 'Crop Insurance' },
                  { id: 'kusum', label: isHindi ? 'सोलर पंप' : 'Solar Pump' },
                  { id: 'machinery', label: isHindi ? 'ट्रैक्टर/यंत्र' : 'Machinery' },
                  { id: 'kcc', label: isHindi ? 'KCC लोन' : 'KCC Loan' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Schemes List Content */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 flex-1">
              {filteredSchemes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-2">🔍</div>
                  <h3 className="font-bold text-gray-800 text-sm">
                    {isHindi ? 'कोई योजना नहीं मिली' : 'No schemes match your search'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {isHindi ? 'कृपया अन्य कीवर्ड खोजें या फिल्टर साफ़ करें।' : 'Try different keywords or clear filters.'}
                  </p>
                </div>
              ) : (
                filteredSchemes.map((scheme) => {
                  const title = scheme.title[langKey] || scheme.title.english;
                  const desc = scheme.description[langKey] || scheme.description.english;
                  const highlight = scheme.highlight[langKey] || scheme.highlight.english;
                  const category = scheme.category[langKey] || scheme.category.english;
                  const badge = scheme.badge[langKey] || scheme.badge.english;
                  const department = scheme.department[langKey] || scheme.department.english;

                  return (
                    <div
                      key={scheme.id}
                      className="bg-white border-2 border-slate-100 hover:border-emerald-300 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xl">{scheme.emoji}</span>
                          <span
                            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border"
                            style={{
                              backgroundColor: `${scheme.badgeColor}15`,
                              color: scheme.badgeColor,
                              borderColor: `${scheme.badgeColor}40`
                            }}
                          >
                            {badge}
                          </span>
                          <span className="text-xs font-semibold text-gray-500">
                            {category}
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-extrabold text-gray-900 leading-snug">
                          {title}
                        </h3>

                        <p className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 inline-block">
                          ✨ {highlight}
                        </p>

                        <p className="text-xs text-gray-600 leading-relaxed">
                          {desc}
                        </p>

                        <div className="text-[11px] text-gray-400 flex items-center gap-1.5 pt-1">
                          <Landmark className="w-3.5 h-3.5 text-gray-400" />
                          <span>{department}</span>
                          <span className="font-mono text-emerald-600 font-semibold">• {scheme.domainName}</span>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                        <a
                          href={scheme.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-all cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-200" />
                          <span>{isHindi ? 'आधिकारिक पोर्टल खोलें' : isPunjabi ? 'ਸਰਕਾਰੀ ਪੋਰਟਲ ਖੋਲ੍ਹੋ' : 'Apply on Official Portal'}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <span className="text-[10px] text-gray-400 font-medium hidden sm:inline">
                          ✓ Verified .gov.in Portal
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {isHindi ? 'सभी लिंक भारत सरकार के प्रमाणित कृषि पोर्टल्स के हैं।' : 'All links redirect directly to verified Govt of India portals.'}
              </span>
              <button
                type="button"
                onClick={() => setShowAllModal(false)}
                className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-gray-800 font-bold rounded-lg text-xs transition-colors cursor-pointer"
              >
                {isHindi ? 'बंद करें' : 'Close'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default GovtSchemesTicker;

