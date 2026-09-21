import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Globe, 
  Mail, 
  MapPin, 
  Building, 
  GraduationCap, 
  UserPlus, 
  X, 
  CheckCircle,
  ExternalLink,
  Ship,
  Compass,
  Anchor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Alumni } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const AlumniDirectory: React.FC = () => {
  const { t } = useLanguage();
  const [alumniList, setAlumniList] = useState<Alumni[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProdi, setSelectedProdi] = useState('ALL');
  const [selectedBatch, setSelectedBatch] = useState('ALL');
  
  // Modal states
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);

  const programStudiOptions = [t('alumni.filter.all_prodi'), 'Nautika', 'Teknika', 'KNPK'];

  const fetchAlumni = async () => {
    try {
      const response = await fetch('/api/alumni?status=approved');
      if (response.ok) {
        const data = await response.json();
        // Map _id from mongo to id for frontend
        const mappedData = data.map((item: any) => ({
          ...item,
          id: item._id,
        }));
        setAlumniList(mappedData);
      }
    } catch (error) {
      console.error('Failed to fetch alumni:', error);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const batchOptions = useMemo(() => {
    const unique = Array.from(new Set(alumniList.map((a) => a.batch)))
      .filter((b): b is number => typeof b === 'number' && !isNaN(b))
      .sort((a, b) => b - a);
    return [t('alumni.filter.all_batch'), ...unique.map((b) => `Angkatan ke-${b}`)];
  }, [alumniList, t]);

  const filteredAlumni = useMemo(() => {
    return alumniList.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        item.name.toLowerCase().includes(q) ||
        item.major.toLowerCase().includes(q) ||
        `angkatan ke-${item.batch}`.toLowerCase().includes(q) ||
        item.batch?.toString().includes(q) ||
        (item.company && item.company.toLowerCase().includes(q)) ||
        (item.currentRole && item.currentRole.toLowerCase().includes(q));

      const matchProdi =
        selectedProdi === 'ALL' ||
        selectedProdi === t('alumni.filter.all_prodi') ||
        item.major.toLowerCase() === selectedProdi.toLowerCase();

      const matchBatch =
        selectedBatch === 'ALL' ||
        selectedBatch === t('alumni.filter.all_batch') ||
        `Angkatan ke-${item.batch}` === selectedBatch;

      return matchSearch && matchProdi && matchBatch;
    });
  }, [alumniList, searchQuery, selectedProdi, selectedBatch]);



  const getProdiBadge = (major: string) => {
    switch (major?.toLowerCase()) {
      case 'nautika':
      case 'nautica':
        return 'bg-blue-100 text-blue-900 border border-blue-200';
      case 'teknika':
        return 'bg-amber-100 text-amber-900 border border-amber-200';
      case 'knpk':
        return 'bg-emerald-100 text-emerald-900 border border-emerald-200';
      default:
        return 'bg-surface text-on-surface border border-border-subtle';
    }
  };

  const getProdiIcon = (major: string) => {
    switch (major?.toLowerCase()) {
      case 'nautika':
      case 'nautica':
        return <Compass className="w-3.5 h-3.5 text-blue-700" />;
      case 'teknika':
        return <Anchor className="w-3.5 h-3.5 text-amber-700" />;
      case 'knpk':
        return <Ship className="w-3.5 h-3.5 text-emerald-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. HEADER SECTION */}
      <section className="bg-primary text-on-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fdcb2c_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter text-center relative z-10">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-secondary-container font-display font-semibold text-xs tracking-wider uppercase mb-3">
            {t('alumni.hero.badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-headline-lg font-display font-bold text-white mb-4">
            {t('alumni.hero.title')}
          </h1>
          <p className="text-sm sm:text-base text-on-primary/80 max-w-2xl mx-auto font-sans leading-relaxed">
           {t('alumni.hero.desc')}
          </p>
        </div>
      </section>

      {/* 2. SEARCH & FILTER BAR */}
      <section className="bg-white border-b border-border-subtle py-6 shadow-md sticky top-20 z-40">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-5 h-5 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('alumni.search.placeholder')}
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-border-subtle text-sm bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all text-on-surface"
              />
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-outline shrink-0 hidden sm:block" />
                <select
                  value={selectedProdi}
                  onChange={(e) => setSelectedProdi(e.target.value)}
                  className="w-full sm:w-auto px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-on-surface font-medium"
                >
                  {programStudiOptions.map((prodi) => (
                    <option key={prodi} value={prodi === t('alumni.filter.all_prodi') ? 'ALL' : prodi}>
                      {prodi}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-on-surface font-medium"
              >
                {batchOptions.map((batch) => (
                  <option key={batch} value={batch === t('alumni.filter.all_batch') ? 'ALL' : batch}>
                    {batch}
                  </option>
                ))}
              </select>

              <Link
                to="/hubungi-kami"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary-container hover:bg-secondary-fixed text-primary font-display font-bold text-sm transition-colors shrink-0 shadow-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>{t('alumni.filter.btn')}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALUMNI TABLE SECTION */}
      <section className="py-10 sm:py-14 bg-surface flex-grow">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          {/* Quick Filters Pill Bar */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-primary">
                {t('alumni.table.title')}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5">
                {t('alumni.table.total').replace('{count}', filteredAlumni.length.toString())}
              </p>
            </div>

            {/* Quick Filter Buttons for Program Studi */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['Semua', 'Nautika', 'Teknika', 'KNPK'].map((prodi) => {
                const isSelected =
                  (selectedProdi === 'ALL' && prodi === 'Semua') ||
                  (prodi !== 'Semua' && selectedProdi.toLowerCase() === prodi.toLowerCase());
                return (
                  <button
                    key={prodi}
                    onClick={() => setSelectedProdi(prodi === 'Semua' ? 'ALL' : prodi)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                      isSelected
                        ? 'bg-primary text-white shadow-sm font-semibold'
                        : 'bg-surface-lowest text-on-surface-variant hover:bg-surface-container border border-border-subtle'
                    }`}
                  >
                    {prodi === 'Semua' ? t('alumni.filter.all_prodi') : prodi}
                  </button>
                );
              })}
            </div>
          </div>

          {filteredAlumni.length === 0 ? (
            <div className="text-center py-16 bg-surface-lowest rounded-2xl border border-border-subtle p-8 shadow-sm">
              <GraduationCap className="w-14 h-14 text-outline mx-auto mb-3 opacity-40" />
              <h3 className="text-lg font-display font-bold text-primary mb-1">
                {t('alumni.table.no_data')}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto mb-5">
                {t('alumni.table.no_data_desc')}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedProdi('ALL');
                  setSelectedBatch('ALL');
                }}
                className="px-4 py-2 bg-primary text-white text-xs font-display font-semibold rounded-lg hover:bg-primary-container transition-colors"
              >
                {t('alumni.table.reset')}
              </button>
            </div>
          ) : (
            <div className="bg-surface-lowest rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface border-b border-border-subtle text-xs font-display font-bold text-primary uppercase tracking-wider">
                      <th className="py-4 px-4 sm:px-6 w-16 text-center">{t('alumni.table.col.no')}</th>
                      <th className="py-4 px-4 sm:px-6">{t('alumni.table.col.name')}</th>
                      <th className="py-4 px-4 sm:px-6">{t('alumni.table.col.prodi')}</th>
                      <th className="py-4 px-4 sm:px-6">{t('alumni.table.col.batch')}</th>
                      <th className="py-4 px-4 sm:px-6 text-right">{t('alumni.table.col.action')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle text-sm">
                    {filteredAlumni.map((alumni, index) => {
                      const prodiBadge = getProdiBadge(alumni.major);
                      return (
                        <tr
                          key={alumni.id}
                          className="hover:bg-primary/[0.03] transition-colors group cursor-pointer"
                          onClick={() => setSelectedAlumni(alumni)}
                        >
                          <td className="py-4 px-4 sm:px-6 text-center text-xs font-semibold text-outline">
                            {index + 1}
                          </td>
                          <td className="py-4 px-4 sm:px-6">
                            <span className="font-display font-bold text-primary group-hover:text-primary-container transition-colors block text-sm sm:text-base">
                              {alumni.name}
                            </span>
                            {alumni.currentRole && (
                              <span className="text-xs text-on-surface-variant block mt-0.5">
                                {alumni.currentRole} {alumni.company ? `• ${alumni.company}` : ''}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-xs ${prodiBadge}`}>
                              {getProdiIcon(alumni.major)}
                              <span>{alumni.major}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-md bg-surface border border-border-subtle text-xs font-semibold text-on-surface font-sans">
                              Angkatan ke-{alumni.batch}
                            </span>
                          </td>
                          <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setSelectedAlumni(alumni)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-display font-semibold text-primary hover:bg-primary/10 transition-colors"
                            >
                              <span>{t('alumni.table.detail')}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-3.5 bg-surface border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-outline">
                <span>{t('alumni.table.total').replace('{count}', filteredAlumni.length.toString())}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. DETAIL ALUMNI MODAL (Tanpa Foto Profil) */}
      {selectedAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-surface-lowest rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-border-subtle">
            <button
              onClick={() => setSelectedAlumni(null)}
              className="absolute top-4 right-4 p-2 text-outline hover:text-on-surface rounded-full hover:bg-surface transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Detail: Clean Typography & Badge without Profile Photo */}
            <div className="mb-6 pt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getProdiBadge(selectedAlumni.major)}`}>
                  {getProdiIcon(selectedAlumni.major)}
                  <span>Program Studi {selectedAlumni.major}</span>
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface border border-border-subtle text-xs font-semibold text-primary">
                  Angkatan ke-{selectedAlumni.batch}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-primary">
                {selectedAlumni.name}
              </h3>
            </div>

            <div className="space-y-4 text-sm bg-surface p-5 rounded-xl border border-border-subtle mb-6">
              <div>
                <span className="text-xs text-outline block mb-0.5">{t('alumni.modal.role')}</span>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-secondary shrink-0" />
                  <p className="font-semibold text-primary text-sm">{selectedAlumni.currentRole || '-'}</p>
                </div>
                {selectedAlumni.company && (
                  <p className="text-xs text-on-surface-variant pl-6 mt-0.5">{selectedAlumni.company}</p>
                )}
              </div>

              {selectedAlumni.location && (
                <div>
                  <span className="text-xs text-outline block mb-0.5">{t('alumni.modal.location')}</span>
                  <div className="flex items-center gap-2 text-xs text-on-surface">
                    <MapPin className="w-3.5 h-3.5 text-outline shrink-0" />
                    <span>{selectedAlumni.location}</span>
                  </div>
                </div>
              )}

              {selectedAlumni.bio && (
                <div>
                  <span className="text-xs text-outline block mb-0.5">{t('alumni.modal.notes')}</span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {selectedAlumni.bio}
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {selectedAlumni.email ? (
                <a
                  href={`mailto:${selectedAlumni.email}`}
                  className="flex-1 inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg bg-primary text-white font-display font-semibold text-xs hover:bg-primary-container transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>{t('alumni.modal.email')}</span>
                </a>
              ) : (
                <div className="flex-1 text-center py-2 text-xs text-outline">
                  {t('alumni.modal.no_email')}
                </div>
              )}

              {selectedAlumni.linkedin && (
                <a
                  href={selectedAlumni.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg bg-[#0077b5] text-white font-display font-semibold text-xs hover:opacity-90 transition-opacity"
                >
                  <Globe className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
