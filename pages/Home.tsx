import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Wifi, MapPin, Coffee } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TRANSLATIONS, INITIAL_ROOMS } from '../constants';

const Home: React.FC = () => {
  const { language, rooms } = useAppContext();
  const t = (key: string) => TRANSLATIONS[key][language];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/630411930.jpg?k=11a0570f2dd6cce51a6c0fa764c3d0e06a43583349207c42f539d838d5f5ce0b&o=" 
            alt="Luxury Hotel Lobby" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/60 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
           <div className="mb-6 flex justify-center space-x-2 space-x-reverse">
              {[1,2,3,4,5].map(i => <Star key={i} className="text-gold-500 fill-current" size={24} />)}
           </div>
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
             {t('heroTitle')}
           </h1>
           <p className="text-lg md:text-xl text-gray-200 mb-10 font-light tracking-wide">
             {t('heroSubtitle')}
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/rooms" className="px-8 py-4 bg-gold-500 text-navy-900 font-bold uppercase tracking-wider hover:bg-gold-400 transition transform hover:-translate-y-1 shadow-lg rounded-sm">
               {t('bookNow')}
             </Link>
             <Link to="/rooms" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-navy-900 transition transform hover:-translate-y-1 rounded-sm">
               {t('viewRooms')}
             </Link>
           </div>
        </div>
      </section>

      {/* Intro/About Preview */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-gold-600 uppercase tracking-widest text-sm font-bold">Antalya Hotel Amman</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-900 mt-2 mb-6">
                {language === 'en' ? 'Redefining Luxury in Jordan' : 'إعادة تعريف الفخامة في الأردن'}
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {language === 'en' 
                  ? "Located in the prestigious district of Amman, Antalya Hotel offers a haven of sophistication. Whether you are traveling for business or leisure, our bespoke services and elegant interiors ensure a memorable stay."
                  : "يقع فندق أنطاليا في أرقى أحياء عمان، ويوفر ملاذاً من الرقي. سواء كنت مسافراً للعمل أو الترفيه، تضمن لك خدماتنا المخصصة وتصميماتنا الداخلية الأنيقة إقامة لا تُنسى."}
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Wifi size={32} />, titleEn: 'High-Speed Wi-Fi', titleAr: 'واي فاي عالي السرعة' },
                { icon: <Coffee size={32} />, titleEn: 'Fine Dining', titleAr: 'مطاعم فاخرة' },
                { icon: <MapPin size={32} />, titleEn: 'Prime Location', titleAr: 'موقع مميز' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 text-center shadow-sm border-b-2 border-gold-500 hover:shadow-lg transition">
                   <div className="text-navy-900 mb-4 flex justify-center">{item.icon}</div>
                   <h3 className="text-xl font-serif font-bold text-navy-800 mb-2">
                     {language === 'en' ? item.titleEn : item.titleAr}
                   </h3>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
             <div>
               <span className="text-gold-500 uppercase tracking-widest text-sm font-bold">{t('rooms')}</span>
               <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2">
                 {language === 'en' ? 'Our Suites' : 'أجنحتنا'}
               </h2>
             </div>
             <Link to="/rooms" className="text-gold-400 hover:text-white transition hidden md:block border-b border-gold-400 pb-1">
               {t('viewRooms')}
             </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.slice(0, 3).map(room => (
              <div key={room.id} className="group relative overflow-hidden rounded-sm cursor-pointer">
                 <img 
                  src={room.imageUrl} 
                  alt={room.titleEn} 
                  className="w-full h-[400px] object-cover transition duration-700 transform group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-90"></div>
                 <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-xl font-serif font-bold text-white mb-1">
                      {language === 'en' ? room.titleEn : room.titleAr}
                    </h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-gold-400 font-bold text-lg">${room.price} <span className="text-xs text-gray-300 font-normal">{t('night')}</span></span>
                      <Link to={`/rooms`} className="bg-white text-navy-900 px-4 py-2 text-xs font-bold uppercase rounded-sm hover:bg-gold-500 transition">
                        {t('bookNow')}
                      </Link>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;