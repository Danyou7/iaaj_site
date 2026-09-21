import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Briefcase, 
  Users, 
  BookOpen, 
  Award, 
  Building2, 
  Newspaper, 
  CheckCircle2, 
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';
import { initialNewsArticles, initialJobsList } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const { t, language } = useLanguage();
  const [heroSettings, setHeroSettings] = useState({
    headline: t('home.hero.default_headline'),
    subheadline: t('home.hero.default_subheadline'),
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop"
    ],
    aboutImage: '',
    careerImage: ''
  });

  useEffect(() => {
    // Fetch News
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setNews(data);
      })
      .catch(err => console.error('Gagal mengambil berita:', err));

    // Fetch Hero Settings (we pass a dummy token or hero endpoint might not require auth for GET if we want it public. 
    // Wait, in hero routes, GET is protected by authMiddleware! We should use a public endpoint or bypass auth for GET.
    // Actually, I'll just check if I can fetch it, if not I'll fall back to default.)
    const token = localStorage.getItem('adminToken');
    fetch('/api/settings/hero', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.headline) {
          // Note: if user changes language, dynamic backend data should ideally be re-fetched or localized,
          // but for static defaults we use context.
          setHeroSettings({
            headline: data.headline,
            subheadline: data.subheadline,
            images: data.images && data.images.length > 0 
              ? data.images.map((img: string) => `${img}`) 
              : heroSettings.images,
            aboutImage: data.aboutImage || '',
            careerImage: data.careerImage || ''
          });
        }
      })
      .catch(err => console.error('Gagal mengambil pengaturan hero:', err));
  }, []);

  // Update default hero if language changes (and we don't have dynamic data)
  useEffect(() => {
    setHeroSettings(prev => ({
      ...prev,
      headline: prev.headline === 'Sinergi Alumni untuk Almamater dan Bangsa' || prev.headline === 'Alumni Synergy for Alma Mater and Nation' ? t('home.hero.default_headline') : prev.headline,
      subheadline: prev.subheadline === 'Selamat datang di portal resmi Ikatan Alumni Aman Jaya. Wadah kolaborasi, berbagi inspirasi, dan mempererat tali persaudaraan antar alumni.' || prev.subheadline === 'Welcome to the official portal of the Aman Jaya Alumni Association. A space to collaborate, share inspiration, and strengthen ties between alumni.' ? t('home.hero.default_subheadline') : prev.subheadline,
    }));
  }, [language, t]);

  const featuredNews = news.length > 0 ? news[0] : null;
  const sideNews = news.slice(1, 3);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSettings.images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSettings.images.length]);

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative w-full overflow-hidden bg-primary text-on-primary py-20 lg:py-28">
        {/* Background Decorative Pattern & Gradient Slider */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="flex w-full h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {heroSettings.images.map((img, idx) => (
              <div 
                key={idx} 
                className="w-full h-full flex-shrink-0 relative"
              >
                <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-display font-semibold text-secondary-fixed">
                <Sparkles className="w-4 h-4 text-secondary-container" />
                <span>{t('home.hero.badge')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-display-lg font-display font-bold text-white leading-tight tracking-tight" dangerouslySetInnerHTML={{ __html: heroSettings.headline.replace('Almamater', '<span class="text-secondary-container underline decoration-secondary-container/50 decoration-wavy decoration-2">Almamater</span>').replace('Alma Mater', '<span class="text-secondary-container underline decoration-secondary-container/50 decoration-wavy decoration-2">Alma Mater</span>') }}>
              </h1>

              <p className="text-base sm:text-lg md:text-body-lg text-on-primary/85 max-w-2xl font-sans leading-relaxed">
                {heroSettings.subheadline}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/alumni"
                  className="inline-flex items-center gap-2.5 bg-secondary-container hover:bg-secondary-fixed text-primary font-display font-bold text-sm sm:text-base px-7 py-3.5 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg shadow-secondary-container/20"
                >
                  <Users className="w-5 h-5" />
                  <span>{t('home.hero.btn_directory')}</span>
                </Link>

                <Link
                  to="/loker"
                  className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-display font-semibold text-sm sm:text-base px-6 py-3.5 rounded-lg hover:bg-white/10 transition-all"
                >
                  <span>{t('home.hero.btn_learn')}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: TENTANG KAMI */}
      <section className="py-16 sm:py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="w-16 h-16 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-display font-bold text-primary mb-4">{t('home.about.title')}</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                {t('home.about.desc')}
              </p>
              <Link
                to="/tentang-kami"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-white font-display font-bold px-8 py-4 rounded-xl transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>{t('home.about.btn')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            {/* Image Space - Kanan */}
            {heroSettings.aboutImage ? (
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={heroSettings.aboutImage} alt="Tentang IAAJ" className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            ) : (
              <div className="rounded-2xl bg-surface-variant flex items-center justify-center h-64 sm:h-80 lg:h-full min-h-[300px]">
                <span className="text-on-surface-variant/50 flex flex-col items-center gap-2">
                  <Building2 className="w-10 h-10" />
                  Space Gambar Tentang IAAJ
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. SECTION: PELUANG KARIR */}
      <section className="py-16 sm:py-20 bg-surface-lowest border-t border-border-subtle">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Image Space - Kiri */}
            {heroSettings.careerImage ? (
              <div className="rounded-2xl overflow-hidden shadow-xl order-last lg:order-first">
                <img src={heroSettings.careerImage} alt="Peluang Karir" className="w-full h-auto object-cover max-h-[500px]" />
              </div>
            ) : (
              <div className="rounded-2xl bg-surface-variant flex items-center justify-center h-64 sm:h-80 lg:h-full min-h-[300px] order-last lg:order-first">
                <span className="text-on-surface-variant/50 flex flex-col items-center gap-2">
                  <Briefcase className="w-10 h-10" />
                  Space Gambar Peluang Karir
                </span>
              </div>
            )}
            
            <div className="text-right flex flex-col items-end">
              <div className="w-16 h-16 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center mb-6">
                <Briefcase className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-display font-bold text-primary mb-4">{t('home.jobs.title')}</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-xl">
                {t('home.jobs.desc')}
              </p>
              <Link
                to="/loker"
                className="inline-flex items-center gap-2 bg-secondary-container hover:bg-secondary-fixed text-primary font-display font-bold px-8 py-4 rounded-xl transition-all shadow-md hover:-translate-y-0.5"
              >
                <span>{t('home.jobs.btn')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SECTION: DIREKTORI ALUMNI TEASER */}
      <section className="py-16 sm:py-20 bg-surface-container-lowest border-y border-border-subtle">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-primary mb-3">
              {t('home.alumni.title')}
            </h2>
            <div className="w-16 h-1 bg-secondary-container mx-auto rounded-full mb-4"></div>
            <p className="text-on-surface-variant text-base mb-8 leading-relaxed">
              {t('home.alumni.desc')}
            </p>
            <div className="flex justify-center">
              <Link
                to="/alumni"
                className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary-container text-white font-display font-bold text-base px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Users className="w-5 h-5" />
                <span>{t('home.alumni.btn')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION: KABAR ALUMNI TERBARU (BENTO GRID) */}
      <section className="py-16 sm:py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-display font-bold text-secondary tracking-widest uppercase mb-1 block">
                {t('home.news.subtitle')}
              </span>
              <h2 className="text-3xl font-display font-bold text-primary">
                {t('home.news.title')}
              </h2>
            </div>
            <Link
              to="/berita"
              className="inline-flex items-center gap-1.5 text-sm font-display font-bold text-primary hover:text-primary-container transition-colors"
            >
              <span>{t('home.news.btn_all')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Featured Main Article */}
            {featuredNews ? (
              <article className="lg:col-span-7 bg-surface-lowest rounded-xl border border-border-subtle overflow-hidden hover-lift flex flex-col group shadow-level1">
                <div className="relative h-64 sm:h-72 overflow-hidden bg-surface-variant">
                  {featuredNews.thumbnailImage && (
                    <img
                      src={`${featuredNews.thumbnailImage}`}
                      alt={featuredNews.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-display font-semibold">
                    {t('home.news.badge')}
                  </div>
                </div>
                <div className="p-6 sm:p-8 flex-grow flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-outline mb-2">
                    <span>{new Date(featuredNews.publishedDate).toLocaleDateString('id-ID')}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-primary group-hover:text-primary-container transition-colors mb-3 leading-snug">
                    <Link to={`/berita/${featuredNews._id}`}>{featuredNews.title}</Link>
                  </h3>
                  <p className="text-on-surface-variant text-sm line-clamp-3 mb-6 leading-relaxed">
                    {featuredNews.content}
                  </p>
                  <div className="mt-auto pt-4 border-t border-border-subtle flex items-center justify-between">
                    <span className="text-xs text-outline font-medium">{t('home.news.by')} {featuredNews.author}</span>
                    <Link
                      to={`/berita/${featuredNews._id}`}
                      className="inline-flex items-center gap-1 text-sm font-display font-bold text-primary group-hover:text-primary-container"
                    >
                      <span>{t('home.news.read_article')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ) : (
              <div className="lg:col-span-12 py-12 text-center">
                <p className="text-on-surface-variant">{t('home.news.empty')}</p>
              </div>
            )}

            {/* Side Column: 2 News Cards */}
            {sideNews.length > 0 && (
              <div className="lg:col-span-5 flex flex-col gap-6">
                {sideNews.map((newsItem) => (
                  <article
                    key={newsItem._id}
                    className="bg-surface-lowest rounded-xl border border-border-subtle overflow-hidden hover-lift flex flex-col sm:flex-row group shadow-level1 flex-1"
                  >
                    <div className="sm:w-2/5 h-48 sm:h-auto overflow-hidden shrink-0 bg-surface-variant">
                      {newsItem.thumbnailImage && (
                        <img
                          src={`${newsItem.thumbnailImage}`}
                          alt={newsItem.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <span className="text-xs font-semibold text-secondary mb-1.5 block">
                          {t('home.news.badge')}
                        </span>
                        <h4 className="text-base sm:text-lg font-display font-bold text-primary group-hover:text-primary-container transition-colors line-clamp-2 mb-2 leading-snug">
                          <Link to={`/berita/${newsItem._id}`}>{newsItem.title}</Link>
                        </h4>
                        <p className="text-xs text-on-surface-variant line-clamp-2 mb-3">
                          {newsItem.content}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-outline pt-3 border-t border-border-subtle">
                        <span>{new Date(newsItem.publishedDate).toLocaleDateString('id-ID')}</span>
                        <Link to={`/berita/${newsItem._id}`} className="font-semibold text-primary hover:text-primary-container inline-flex items-center gap-1">
                          <span>{t('home.news.read')}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="bg-primary-container text-on-primary py-16">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-on-primary/80 text-base max-w-2xl mx-auto mb-8">
            {t('home.cta.desc')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/hubungi-kami"
              className="px-6 py-3 rounded-lg bg-secondary-container hover:bg-secondary-fixed text-primary font-display font-bold text-sm transition-colors shadow-md"
            >
              {t('home.cta.btn_contact')}
            </Link>
            <Link
              to="/loker"
              className="px-6 py-3 rounded-lg border border-white/30 hover:border-white text-white font-display font-semibold text-sm hover:bg-white/10 transition-colors"
            >
              {t('home.cta.btn_career')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
