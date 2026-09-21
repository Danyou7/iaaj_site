import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, User, ArrowRight, Tag, Bookmark } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const News: React.FC = () => {
  const { t } = useLanguage();
  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const categories = ['Semua', 'Pengumuman', 'Acara', 'Karir', 'Prestasi'];

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNewsArticles(data);
        }
      })
      .catch(err => console.error('Gagal mengambil berita:', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredNews = useMemo(() => {
    return newsArticles.filter((article) => {
      // Backend doesn't store category currently, so we simulate it or just match 'Semua'
      // If we implement category later, we can check it.
      const matchCat = selectedCategory === 'Semua';
      
      const title = article.title || '';
      const content = article.content || '';
      const matchQuery =
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCat && matchQuery;
    });
  }, [newsArticles, selectedCategory, searchQuery]);

  const beritaArticles = useMemo(() => filteredNews.filter(a => a.type !== 'buletin'), [filteredNews]);
  const buletinArticles = useMemo(() => filteredNews.filter(a => a.type === 'buletin'), [filteredNews]);

  const featured = beritaArticles.length > 0 ? beritaArticles[0] : null;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. HERO HEADER */}
      <section className="bg-primary text-on-primary py-16">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-secondary-container font-display font-semibold text-xs tracking-wider uppercase mb-3">
            {t('news.hero.badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-headline-lg font-display font-bold text-white mb-4">
            {t('news.hero.title')}
          </h1>
          <p className="text-sm sm:text-base text-on-primary/80 max-w-2xl mx-auto font-sans">
            {t('news.hero.desc')}
          </p>
        </div>
      </section>

      {/* 2. CATEGORY PILLS & SEARCH */}
      <section className="bg-white border-b border-border-subtle py-6 shadow-md sticky top-20 z-40">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-display font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface text-on-surface hover:bg-border-subtle'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('news.search.placeholder')}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-lg border border-border-subtle bg-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* 3. FEATURED HIGHLIGHT (If showing 'Semua' and no query) */}
      {selectedCategory === 'Semua' && searchQuery === '' && featured && (
        <section className="py-12 bg-surface">
          <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
            <div className="bg-surface-lowest rounded-2xl border border-border-subtle overflow-hidden shadow-level1 hover-lift grid grid-cols-1 lg:grid-cols-12 group">
              <div className="lg:col-span-7 h-72 lg:h-auto relative overflow-hidden bg-surface-variant">
                {featured.thumbnailImage && (
                  <img
                    src={`${featured.thumbnailImage}`}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute top-4 left-4 bg-secondary-container text-primary font-bold px-3 py-1 rounded-full text-xs">
                  {t('news.highlight.badge')}
                </div>
              </div>
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-outline mb-2 font-medium">
                    <span className="text-secondary font-bold">{t('news.highlight.news')}</span>
                    <span>•</span>
                    <span>{new Date(featured.publishedDate).toLocaleDateString('id-ID')}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-display font-bold text-primary group-hover:text-primary-container transition-colors mb-3 leading-snug">
                    <Link to={`/berita/${featured._id}`}>{featured.title}</Link>
                  </h2>
                  <p className="text-on-surface-variant text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                    {featured.content}
                  </p>
                </div>
                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <span className="text-xs text-outline font-semibold">{t('news.highlight.author')} {featured.author}</span>
                  <Link
                    to={`/berita/${featured._id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-primary hover:text-primary-container"
                  >
                    <span>{t('news.highlight.read_more')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. BERITA UTAMA GRID */}
      <section className="py-12 bg-surface">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-display font-bold text-primary">
              {selectedCategory === 'Semua' ? t('news.list.title_all') : `${t('news.list.title_cat')} ${selectedCategory}`}
            </h3>
            <span className="text-xs text-outline">{t('news.list.total').replace('{count}', beritaArticles.length.toString())}</span>
          </div>

          {loading ? (
            <div className="text-center py-20">{t('news.list.loading')}</div>
          ) : beritaArticles.length === 0 ? (
            <div className="text-center py-20 bg-surface-lowest rounded-2xl border border-border-subtle p-8">
              <Bookmark className="w-12 h-12 text-outline mx-auto mb-3 opacity-40" />
              <h4 className="text-lg font-display font-bold text-primary mb-1">{t('news.list.no_data')}</h4>
              <p className="text-xs text-on-surface-variant">{t('news.list.no_data_desc')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beritaArticles.map((article) => (
                <article
                  key={article._id}
                  className="bg-surface-lowest rounded-2xl border border-border-subtle overflow-hidden hover-lift flex flex-col justify-between shadow-level1 group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-surface-variant">
                      {article.thumbnailImage && (
                        <img
                          src={`${article.thumbnailImage}`}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <span className="absolute top-3 left-3 bg-primary text-white px-2.5 py-0.5 rounded text-[11px] font-semibold">
                        {t('news.card.news')}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-outline mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(article.publishedDate).toLocaleDateString('id-ID')}</span>
                        </span>
                      </div>

                      <h4 className="text-base font-display font-bold text-primary group-hover:text-primary-container transition-colors mb-2 leading-snug line-clamp-2">
                        <Link to={`/berita/${article._id}`}>{article.title}</Link>
                      </h4>

                      <p className="text-xs text-on-surface-variant line-clamp-3 leading-relaxed mb-4">
                        {article.content}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-border-subtle/50 mt-4 flex items-center justify-between text-xs">
                    <span className="text-outline truncate max-w-[150px]">{article.author}</span>
                    <Link
                      to={`/berita/${article._id}`}
                      className="font-display font-bold text-primary group-hover:text-primary-container inline-flex items-center gap-1"
                    >
                      <span>{t('news.card.read')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. BULETIN SECTION */}
      <section className="py-12 bg-surface-variant flex-grow">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-display font-bold text-primary flex items-center gap-2">
              <span className="w-2 h-6 bg-secondary rounded-full"></span>
              {t('news.bulletin.title')}
            </h3>
            <span className="text-xs text-outline">{t('news.bulletin.total').replace('{count}', buletinArticles.length.toString())}</span>
          </div>

          {!loading && buletinArticles.length === 0 ? (
            <div className="text-center py-12 bg-surface-lowest rounded-2xl border border-border-subtle p-8">
              <h4 className="text-base font-display font-bold text-primary mb-1">{t('news.bulletin.no_data')}</h4>
              <p className="text-xs text-on-surface-variant">{t('news.bulletin.no_data_desc')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {buletinArticles.map((buletin) => (
                <Link
                  key={buletin._id}
                  to={`/berita/${buletin._id}`}
                  className="bg-surface-lowest rounded-xl p-5 border border-border-subtle hover:border-secondary-container hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 rounded bg-secondary-container text-secondary-dark text-[10px] font-bold uppercase">
                        {t('news.bulletin.badge')}
                      </span>
                      <span className="text-[11px] text-outline">
                        {new Date(buletin.publishedDate).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <h4 className="text-sm font-display font-bold text-primary group-hover:text-secondary-dark line-clamp-2 mb-2">
                      {buletin.title}
                    </h4>
                    <p className="text-[11px] text-on-surface-variant line-clamp-3">
                      {buletin.content}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border-subtle flex items-center gap-1 text-xs font-semibold text-secondary-dark group-hover:gap-2 transition-all">
                    <span>{t('news.bulletin.detail')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
