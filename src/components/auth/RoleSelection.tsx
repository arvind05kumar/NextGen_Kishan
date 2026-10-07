import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Tractor, FlaskConical, Truck, Heart, Stethoscope,
  ArrowRight, ArrowLeft, Sparkles
} from 'lucide-react';
import leavesBg from '../../assets/Leaves-bg.png';

interface RoleData {
  id: 'farmer' | 'lab' | 'vet' | 'driver' | 'ngo';
  nameEn: string;
  nameHi: string;
  nameReg: string;
  badgeEn: string;
  badgeHi: string;
  descriptionEn: string;
  descriptionHi: string;
  descriptionReg: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  gradient: string;
  color: string;
  bgLight: string;
  borderColor: string;
  emoji: string;
}

const rolesData: RoleData[] = [
  {
    id: 'farmer',
    nameEn: 'Farmer',
    nameHi: 'किसान',
    nameReg: 'ਕਿਸਾਨ (ਜ਼ਿਮੀਂਦਾਰ)',
    badgeEn: '🌾 Core User',
    badgeHi: '🌾 मुख्य उपयोगकर्ता',
    descriptionEn: 'Access soil testing, crop health scanning, veterinary visits & farm transport booking.',
    descriptionHi: 'मृदा परीक्षण, फसल रोग स्कैनिंग, पशु चिकित्सा और कृषि परिवहन सेवाओं का सीधा लाभ उठाएं।',
    descriptionReg: 'ਮਿੱਟੀ ਪਰਖ, ਫ਼ਸਲ ਰੋਗ ਸਕੈਨਿੰਗ, ਪਸ਼ੂ ਚਿਕਿਤਸਾ ਅਤੇ ਖੇਤੀ ਢੋਆ-ਢੁਆਈ ਬੁਕਿੰਗ ਦੀ ਸਿੱਧੀ ਸਹੂਲਤ ਲਵੋ।',
    icon: Tractor,
    gradient: 'linear-gradient(135deg, #15803d 0%, #22c55e 100%)',
    color: '#16a34a',
    bgLight: '#f0fdf4',
    borderColor: '#86efac',
    emoji: '🌾',
  },
  {
    id: 'vet',
    nameEn: 'Veterinarian',
    nameHi: 'पशु चिकित्सक',
    nameReg: 'ਪਸ਼ੂ ਡਾਕਟਰ',
    badgeEn: '🩺 Healthcare',
    badgeHi: '🩺 पशु स्वास्थ्य',
    descriptionEn: 'Provide livestock healthcare, diagnosis, vaccinations & schedule on-farm home visits.',
    descriptionHi: 'गाँव के पशुपालकों के मवेशियों की जांच, टीकाकरण और मौके पर जाकर चिकित्सा सेवाएं दें।',
    descriptionReg: 'ਪਸ਼ੂਆਂ ਦੀ ਬਿਮਾਰੀ ਦੀ ਜਾਂਚ, ਟੀਕਾਕਰਨ ਅਤੇ ਮੌਕੇ ਤੇ ਜਾ ਕੇ ਇਲਾਜ ਦੀਆਂ ਸੇਵਾਵਾਂ ਦਿਓ।',
    icon: Stethoscope,
    gradient: 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)',
    color: '#7c3aed',
    bgLight: '#faf5ff',
    borderColor: '#d8b4fe',
    emoji: '🩺',
  },
  {
    id: 'lab',
    nameEn: 'Lab Technician',
    nameHi: 'प्रयोगशाला तकनीशियन',
    nameReg: 'ਲੈਬ ਟੈਕਨੀਸ਼ੀਅਨ',
    badgeEn: '🔬 Testing & Reports',
    badgeHi: '🔬 मृदा व फसल जांच',
    descriptionEn: 'Process soil & crop samples, generate digital nutrient health cards and expert reports.',
    descriptionHi: 'मिट्टी और फसल के नमूनों का वैज्ञानिक विश्लेषण करें और डिजिटल सॉइल हेल्थ कार्ड बनाएं।',
    descriptionReg: 'ਮਿੱਟੀ ਅਤੇ ਫ਼ਸਲ ਨਮੂਨਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਡਿਜੀਟਲ ਹੈਲਥ ਕਾਰਡ ਜਾਰੀ ਕਰੋ।',
    icon: FlaskConical,
    gradient: 'linear-gradient(135deg, #047857 0%, #10b981 100%)',
    color: '#059669',
    bgLight: '#ecfdf5',
    borderColor: '#a7f3d0',
    emoji: '🔬',
  },
  {
    id: 'driver',
    nameEn: 'Transport Driver',
    nameHi: 'कृषि वाहन चालक',
    nameReg: 'ਗੱਡੀ ਡਰਾਈਵਰ',
    badgeEn: '🚛 Logistics',
    badgeHi: '🚛 कृषि परिवहन',
    descriptionEn: 'Accept transport trips for crops, livestock, fertilizer and agricultural machinery delivery.',
    descriptionHi: 'फसल, अनाज मंडी ढुलाई, मवेशी और कृषि उपकरणों के परिवहन ऑर्डर्स स्वीकार करें।',
    descriptionReg: 'ਮੰਡੀ ਵਿੱਚ ਫ਼ਸਲ ਲਿਜਾਣ, ਪਸ਼ੂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਸਾਜ਼ੋ-ਸਾਮਾਨ ਦੀ ਢੋਆ-ਢੁਆਈ ਕਰੋ।',
    icon: Truck,
    gradient: 'linear-gradient(135deg, #c2410c 0%, #f97316 100%)',
    color: '#ea580c',
    bgLight: '#fff7ed',
    borderColor: '#fed7aa',
    emoji: '🚛',
  },
  {
    id: 'ngo',
    nameEn: 'NGO Worker',
    nameHi: 'एनजीओ कार्यकर्ता',
    nameReg: 'ਸਮਾਜ ਸੇਵਕ',
    badgeEn: '🤝 Community Welfare',
    badgeHi: '🤝 किसान सहायता',
    descriptionEn: 'Support underprivileged farmers, manage relief schemes, field workers and crisis response.',
    descriptionHi: 'किसानों तक सरकारी व सामाजिक कल्याण योजनाएं, सहायता और आपातकालीन राहत पहुंचाएं।',
    descriptionReg: 'ਕਿਸਾਨਾਂ ਤੱਕ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ, ਸਹਾਇਤਾ ਅਤੇ ਆਫ਼ਤ ਵੇਲੇ ਤੁਰੰਤ ਰਾਹਤ ਪਹੁੰਚਾਓ।',
    icon: Heart,
    gradient: 'linear-gradient(135deg, #be185d 0%, #ec4899 100%)',
    color: '#db2777',
    bgLight: '#fdf2f8',
    borderColor: '#fbcfe8',
    emoji: '🤝',
  },
];

const RoleSelection: React.FC = () => {
  const { user, setUser, setCurrentStep, language, phoneNumber } = useAuth();

  const handleRoleSelect = (roleId: string) => {
    setUser({
      phone: phoneNumber || user?.phone || '9876543210',
      role: roleId as any,
      verified: false
    });

    if (roleId === 'farmer') {
      setCurrentStep('farmer-verification');
    } else {
      setCurrentStep('professional-verification');
    }
  };

  const isHindi = language === 'hindi';
  const isRegional = language === 'regional';

  const headingText = isHindi
    ? 'अपनी भूमिका का चयन करें'
    : isRegional
      ? 'ਆਪਣੀ ਭੂਮਿਕਾ ਚੁਣੋ'
      : 'Select Your Role';

  const subtitleText = isHindi
    ? 'चुनें कि आप NextGen किसान पोर्टल पर किस रूप में जुड़ना चाहते हैं'
    : isRegional
      ? 'ਚੁਣੋ ਕਿ ਤੁਸੀਂ NextGen ਕਿਸਾਨ ਪੋਰਟਲ ਨਾਲ ਕਿਸ ਰੂਪ ਵਿੱਚ ਜੁੜਨਾ ਚਾਹੁੰਦੇ ਹੋ'
      : 'Choose how you want to use the NextGen ਕਿਸਾਨ platform';

  const backText = isHindi
    ? '← लॉगिन पर वापस जाएं'
    : isRegional
      ? '← ਵਾਪਸ ਲੌਗਇਨ ਤੇ ਜਾਓ'
      : '← Back to login';

  return (
    <div
      className="min-h-screen bg-cover bg-center py-6 px-3 sm:py-10 sm:px-6 flex flex-col justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 253, 244, 0.92), rgba(220, 252, 231, 0.92)), url(${leavesBg})`,
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header Branding */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-green-200 shadow-sm mb-3 sm:mb-4">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-[11px] sm:text-xs font-bold tracking-wider text-green-800 uppercase">
              NextGen ਕਿਸਾਨ • User Portals
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2 sm:mb-3">
            {headingText}
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto font-medium px-2">
            {subtitleText}
          </p>
        </div>

        {/* Symmetrical Tiles Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
          {rolesData.map((role, index) => {
            const IconComponent = role.icon;
            const roleName = isHindi ? role.nameHi : isRegional ? role.nameReg : role.nameEn;
            const roleBadge = isHindi ? role.badgeHi : role.badgeEn;
            const roleDesc = isHindi ? role.descriptionHi : isRegional ? role.descriptionReg : role.descriptionEn;
            const ctaText = isHindi ? `${roleName} के रूप में चुनें →` : `Continue as ${roleName} →`;

            // Symmetry positioning for desktop (lg:grid-cols-6):
            // 0: cols 1-2 (Row 1 Col 1)
            // 1: cols 3-4 (Row 1 Col 2)
            // 2: cols 5-6 (Row 1 Col 3)
            // 3: cols 2-3 (Row 2 Col 1 centered)
            // 4: cols 4-5 (Row 2 Col 2 centered)
            let colClass = 'lg:col-span-2';
            if (index === 3) {
              colClass = 'lg:col-span-2 lg:col-start-2';
            } else if (index === 4) {
              colClass = 'lg:col-span-2';
            }

            // Tablet (sm:grid-cols-2) symmetry: last item centered across 2 cols
            const tabletClass = index === 4 ? 'sm:col-span-2 sm:max-w-md sm:mx-auto w-full' : '';

            return (
              <div
                key={role.id}
                className={`${colClass} ${tabletClass} flex`}
              >
                <button
                  onClick={() => handleRoleSelect(role.id)}
                  className="group relative w-full bg-white rounded-2xl border-2 border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 flex flex-col justify-between text-left overflow-hidden hover:-translate-y-2 cursor-pointer outline-none"
                  style={{
                    backgroundColor: '#ffffff',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = role.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.9)';
                  }}
                >
                  {/* Subtle Top Accent Strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-300 group-hover:h-2"
                    style={{ background: role.gradient }}
                  />

                  {/* Top section: Icon & Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-5 mt-1">
                      {/* Floating Gradient Icon */}
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{ background: role.gradient }}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>

                      {/* Pill Badge */}
                      <span
                        className="text-xs font-bold px-3 py-1 rounded-full border shadow-sm"
                        style={{
                          backgroundColor: role.bgLight,
                          color: role.color,
                          borderColor: role.borderColor,
                        }}
                      >
                        {roleBadge}
                      </span>
                    </div>

                    {/* Role Title */}
                    <div className="mb-2">
                      <h3
                        className="text-xl font-extrabold text-gray-900 transition-colors duration-200"
                        style={{ color: '#0f172a' }}
                      >
                        {roleName}
                      </h3>
                      {/* Secondary English subtitle if viewing Hindi, or Hindi subtitle if viewing English */}
                      <p className="text-xs font-semibold text-gray-400">
                        {isHindi ? role.nameEn : role.nameHi}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {roleDesc}
                    </p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div
                    className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm font-bold transition-colors duration-200"
                    style={{ color: role.color }}
                  >
                    <span>{ctaText}</span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1"
                      style={{
                        backgroundColor: role.bgLight,
                        border: `1px solid ${role.borderColor}`
                      }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Back Link */}
        <div className="text-center mt-10">
          <button
            onClick={() => setCurrentStep('login')}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-green-700 bg-white/70 hover:bg-white px-5 py-2.5 rounded-xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            {backText}
          </button>
        </div>

      </div>
    </div>
  );
};

export default RoleSelection;