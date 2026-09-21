import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Check, 
  MessageCircle, 
  Globe, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const NewsDetail: React.FC = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch article by ID
        const articleRes = await fetch(`/api/news/${id}`);
        if (!articleRes.ok) throw new Error('Not found');
        const articleData = await articleRes.json();
        setArticle(articleData);

        // Fetch all news for related articles
        const allRes = await fetch('/api/news');
        if (allRes.ok) {
          const allData = await allRes.json();
          setRelatedArticles(allData.filter((a: any) => a._id !== id).slice(0, 2));
        }
      } catch (err) {
        console.error('Failed to fetch article details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-primary mb-4">{t('news_detail.not_found')}</h2>
        <button onClick={() => navigate('/berita')} className="px-4 py-2 bg-primary text-white rounded-lg">{t('news_detail.back_btn')}</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. BREADCRUMBS */}
      <div className="bg-surface border-b border-border-subtle py-3">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <nav className="flex items-center gap-2 text-xs text-outline overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-primary transition-colors">{t('news_detail.breadcrumb.home')}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/berita" className="hover:text-primary transition-colors">{t('news_detail.breadcrumb.news')}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-on-surface font-medium truncate max-w-xs">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* 2. ARTICLE CONTENT SECTION */}
      <article className="py-10 sm:py-16">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Article Body (8 cols) */}
            <div className="lg:col-span-8">
              {/* Back button */}
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 text-xs font-display font-semibold text-primary hover:text-primary-container mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>{t('news_detail.back_btn')}</span>
              </button>

              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                  {article.type === 'buletin' ? t('news_detail.type.bulletin') : t('news_detail.type.news')}
                </span>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary leading-tight">
                  {article.title}
                </h1>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border-subtle text-xs text-outline">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-on-surface">{article.author}</p>
                    </div>
                  </div>

                  <div className="hidden sm:block h-6 w-[1px] bg-border-subtle"></div>

                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.publishedDate).toLocaleDateString('id-ID')}</span>
                  </div>
                </div>

                {/* Featured Image */}
                {article.thumbnailImage && (
                  <div className="rounded-2xl overflow-hidden shadow-level1 my-6 border border-border-subtle">
                    <img
                      src={`${article.thumbnailImage}`}
                      alt={article.title}
                      className="w-full h-auto max-h-[480px] object-cover"
                    />
                  </div>
                )}

                {/* Full Article Body */}
                <div className="text-sm sm:text-base text-on-surface leading-relaxed space-y-5 font-sans">
                  {article.content.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="pt-6 mt-8 border-t border-border-subtle flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-outline">{t('news_detail.category')}</span>
                  <span
                    className="text-xs bg-surface px-3 py-1 rounded-md text-primary font-medium border border-border-subtle"
                  >
                    #{article.type === 'buletin' ? 'buletin' : 'beritautama'}
                  </span>
                </div>

                {/* Social Share Box */}
                <div className="bg-surface-lowest rounded-2xl border border-border-subtle p-6 my-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                  <div className="flex items-center gap-2 text-primary font-display font-bold text-sm">
                    <Share2 className="w-4 h-4 text-secondary" />
                    <span>{t('news_detail.share.title')}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="px-3.5 py-1.5 rounded-lg border border-border-subtle text-xs font-semibold hover:bg-surface text-on-surface flex items-center gap-1.5 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-success-emerald" /> : <Share2 className="w-3.5 h-3.5" />}
                      <span>{copied ? t('news_detail.share.copied') : t('news_detail.share.copy')}</span>
                    </button>

                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      title="Bagikan ke WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#0077b5] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                      title="Bagikan ke LinkedIn"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Box 1: Berita Terkait */}
              <div className="bg-surface-lowest rounded-2xl border border-border-subtle p-6 shadow-level1">
                <h3 className="font-display font-bold text-primary text-base mb-4 pb-2 border-b border-border-subtle">
                  {t('news_detail.related.title')}
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((rel) => (
                    <div key={rel._id} className="group flex gap-3">
                      {rel.thumbnailImage && (
                        <img
                          src={`${rel.thumbnailImage}`}
                          alt={rel.title}
                          className="w-20 h-20 rounded-xl object-cover shrink-0 border border-border-subtle"
                        />
                      )}
                      <div className="flex flex-col justify-center">
                        <span className="text-[11px] font-semibold text-secondary">
                          {rel.type === 'buletin' ? t('news_detail.type.bulletin') : t('news_detail.type.news')}
                        </span>
                        <h4 className="font-display font-bold text-xs text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          <Link to={`/berita/${rel._id}`}>{rel.title}</Link>
                        </h4>
                        <span className="text-[11px] text-outline mt-1">
                          {new Date(rel.publishedDate).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 2: Callout Punya Berita */}
              <div className="bg-primary text-on-primary rounded-2xl p-6 relative overflow-hidden">
                <h4 className="font-display font-bold text-white text-base mb-2">
                  {t('news_detail.callout.title')}
                </h4>
                <p className="text-xs text-on-primary/80 leading-relaxed mb-4">
                  {t('news_detail.callout.desc')}
                </p>
                <Link
                  to="/hubungi-kami"
                  className="inline-flex items-center gap-2 bg-secondary-container hover:bg-secondary-fixed text-primary font-display font-bold text-xs px-4 py-2 rounded-lg transition-colors"
                >
                  <span>{t('news_detail.callout.btn')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
