import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { HOTEL_INFO, TRANSLATIONS } from '../constants';

const Footer: React.FC = () => {
  const { language } = useAppContext();
  const t = (key: string) => TRANSLATIONS[key][language];

  return (
    <footer className="bg-navy-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-4">
             <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-gold-400">Antalya</span>
                <span className="text-xs tracking-[0.3em] uppercase text-gray-400">Hotel Amman</span>
             </div>
             <p className="text-gray-400 text-sm leading-relaxed">
               {language === 'en' 
                 ? "Experience luxury and comfort in the heart of Amman. A perfect blend of traditional Jordanian hospitality and modern elegance."
                 : "جرب الفخامة والراحة في قلب عمان. مزيج مثالي من الضيافة الأردنية التقليدية والأناقة الحديثة."}
             </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-6 border-b border-gold-500/30 pb-2 inline-block">
              {language === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li><Link to="/about" className="hover:text-gold-400 transition">{t('aboutUs')}</Link></li>
              <li><Link to="/rooms" className="hover:text-gold-400 transition">{t('rooms')}</Link></li>
              <li><Link to="/facilities" className="hover:text-gold-400 transition">{t('facilities')}</Link></li>
              <li><Link to="/gallery" className="hover:text-gold-400 transition">{t('gallery')}</Link></li>
              <li><Link to="/admin" className="hover:text-gold-400 transition opacity-50 text-xs">{t('admin')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-6 border-b border-gold-500/30 pb-2 inline-block">
              {t('contact')}
            </h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold-500 shrink-0 mt-1" size={16} />
                <a 
                  href="https://maps.app.goo.gl/vDy1wtCaDj5bJNXs7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gold-400 transition"
                >
                  {HOTEL_INFO.location}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold-500 shrink-0" size={16} />
                <span dir="ltr">{HOTEL_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold-500 shrink-0" size={16} />
                <span>{HOTEL_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Social */}
          <div>
            <h3 className="text-lg font-serif font-bold text-white mb-6 border-b border-gold-500/30 pb-2 inline-block">
              {language === 'en' ? 'Follow Us' : 'تابعنا'}
            </h3>
            <div className="flex space-x-4 space-x-reverse mb-6">
              <a href="#" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>{t('footerText')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;