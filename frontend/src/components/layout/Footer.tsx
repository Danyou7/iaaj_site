import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-primary text-on-primary border-t border-primary-container mt-auto">
      {/* Main Footer Info */}
      <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Logo IAAJ"
                className="w-12 h-12 object-contain rounded-full shadow-md bg-white/5 p-0.5"
              />
              <div>
                <h3 className="text-xl font-display font-bold text-on-primary tracking-tight">
                  IAAJ
                </h3>
                <p className="text-xs text-on-primary-container">Ikatan Alumni Aman Jaya</p>
              </div>
            </div>
            <p className="text-sm text-on-primary/75 leading-relaxed">
              {t('footer.brand.desc')}
            </p>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-display font-semibold text-secondary-container tracking-wider uppercase">
              {t('footer.links.title')}
            </h4>
            <ul className="space-y-2 text-sm text-on-primary/80">
              <li>
                <Link to="/" className="hover:text-secondary-fixed transition-colors">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/tentang-kami" className="hover:text-secondary-fixed transition-colors">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/alumni" className="hover:text-secondary-fixed transition-colors">{t('nav.alumni')}</Link>
              </li>
              <li>
                <Link to="/loker" className="hover:text-secondary-fixed transition-colors">{t('nav.jobs')}</Link>
              </li>
              <li>
                <Link to="/berita" className="hover:text-secondary-fixed transition-colors">{t('nav.news')}</Link>
              </li>
              <li>
                <Link to="/hubungi-kami" className="hover:text-secondary-fixed transition-colors">{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Program Studi */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-display font-semibold text-secondary-container tracking-wider uppercase">
              {t('footer.programs.title')}
            </h4>
            <ul className="space-y-2 text-sm text-on-primary/80">
              <li className="flex items-center gap-1.5 hover:text-secondary-fixed transition-colors cursor-pointer">
                <span>Nautika</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </li>
              <li className="flex items-center gap-1.5 hover:text-secondary-fixed transition-colors cursor-pointer">
                <span>KNPK</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </li>
              <li className="flex items-center gap-1.5 hover:text-secondary-fixed transition-colors cursor-pointer">
                <span>Teknika</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
              </li>
            </ul>
          </div>

          {/* Col 4: Sekretariat */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-display font-semibold text-secondary-container tracking-wider uppercase">
              {t('footer.contact.title')}
            </h4>
            <div className="space-y-3 text-sm text-on-primary/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-secondary-container shrink-0 mt-1" />
                <span>Jl.Gading Raya 1 Komplek TNI-AL Kelapa Gading Barat Jakarta Utara 14240</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-secondary-container shrink-0" />
                <span>081218948866</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-secondary-container shrink-0" />
                <span>iaajmaster@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-primary-container flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-primary/60">
          <p>Copyright © {new Date().getFullYear()} Victory studio.</p>
        </div>
      </div>
    </footer>
  );
};
