import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
interface NavbarProps {
  isAdmin?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isAdmin = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/tentang-kami' },
    { name: t('nav.alumni'), path: '/alumni' },
    { name: t('nav.jobs'), path: '/loker' },
    { name: t('nav.news'), path: '/berita' },
    { name: t('nav.contact'), path: '/hubungi-kami' },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Data Alumni', path: '/admin/alumni' },
    { name: 'Kelola Loker', path: '/admin/loker' },
    { name: 'Kelola Berita', path: '/admin/berita' },
    { name: 'Tentang Kami', path: '/admin/tentang' },
    { name: 'Pesan Masuk', path: '/admin/pesan' },
  ];

  const linksToRender = isAdmin ? adminLinks : navLinks;

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    if (path === '/admin' && location.pathname !== '/admin') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-primary text-on-primary shadow-md sticky top-0 z-50 transition-colors">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 md:px-gutter max-w-container-max mx-auto h-20">
        {/* Brand Logo */}
        <Link to={isAdmin ? '/admin' : '/'} className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Logo IAAJ"
            className="w-12 h-12 object-contain rounded-full shadow-md group-hover:scale-105 transition-transform bg-white/5 p-0.5"
          />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-display font-bold text-on-primary tracking-tight">
              IAAJ
            </span>
            <span className="text-xs text-on-primary-container font-sans hidden sm:inline">
              Ikatan Alumni Aman Jaya
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {linksToRender.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-display font-medium transition-all py-1 border-b-2 ${
                  active
                    ? 'text-secondary-container border-secondary-container font-bold'
                    : 'text-on-primary/85 hover:text-secondary-fixed border-transparent'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {isAdmin && (
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-display font-semibold bg-white/10 hover:bg-white/20 text-on-primary px-2 sm:px-4 py-2 rounded-lg transition-colors border border-white/20"
            >
              <span className="hidden sm:inline">Lihat Web Publik</span>
              <span className="sm:hidden">Web</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}

          {/* Language indicator */}
          <div className="hidden sm:flex items-center text-xs font-display text-on-primary/80 bg-primary-container px-2.5 py-1.5 rounded-md border border-white/10">
            <span 
              className={`cursor-pointer transition-colors ${language === 'id' ? 'text-secondary-container font-bold' : 'hover:text-white'}`}
              onClick={() => setLanguage('id')}
            >
              ID
            </span>
            <span className="mx-1.5 text-outline opacity-60">|</span>
            <span 
              className={`cursor-pointer transition-colors ${language === 'en' ? 'text-secondary-container font-bold' : 'hover:text-white'}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </span>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-on-primary p-2 rounded-lg hover:bg-primary-container transition-colors focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 w-full bg-primary border-t border-primary-container shadow-xl px-6 py-4 space-y-3 animate-fadeIn z-50">
          {linksToRender.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2.5 px-3 rounded-md text-sm font-display font-medium transition-colors ${
                  active
                    ? 'bg-primary-container text-secondary-container font-semibold'
                    : 'text-on-primary/90 hover:bg-primary-container/50 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/10 flex justify-between items-center">
            <span className="text-xs text-on-primary-container">{t('bahasa')}:</span>
            <div className="flex gap-2 text-xs font-semibold">
              <button 
                onClick={() => { setLanguage('id'); setMobileMenuOpen(false); }}
                className={`${language === 'id' ? 'text-secondary-container' : 'text-on-primary-container hover:text-white'}`}
              >
                ID
              </button>
              <span className="text-white/20">|</span>
              <button 
                onClick={() => { setLanguage('en'); setMobileMenuOpen(false); }}
                className={`${language === 'en' ? 'text-secondary-container' : 'text-on-primary-container hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
