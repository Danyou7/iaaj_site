import React, { useState, useMemo, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building, 
  Send, 
  X, 
  CheckCircle, 
  PlusCircle, 
  Filter 
} from 'lucide-react';
import type { Job } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Jobs: React.FC = () => {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (response.ok) {
          const data = await response.json();
          const mappedData = data.map((item: any) => ({
            ...item,
            id: item._id,
            postedDate: new Date(item.createdAt).toLocaleDateString('id-ID'),
          }));
          setJobs(mappedData);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');

  // Modal States
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyModalJob, setApplyModalJob] = useState<Job | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);

  // Application Form State
  const [applicant, setApplicant] = useState({
    name: '',
    email: '',
    phone: '',
    cvUrl: '',
    message: ''
  });



  const jobTypes = [t('jobs.filter.all_type'), 'Full-time', 'Part-time', 'Hybrid', 'Remote', 'Magang'];

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        (job.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (job.company?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (job.location?.toLowerCase() || '').includes(searchQuery.toLowerCase());

      const matchType =
        selectedType === 'ALL' ||
        selectedType === t('jobs.filter.all_type') ||
        job.type === selectedType;

      return matchSearch && matchType;
    });
  }, [jobs, searchQuery, selectedType]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setApplyModalJob(null);
      setApplicant({ name: '', email: '', phone: '', cvUrl: '', message: '' });
    }, 1500);
  };



  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. HEADER SECTION */}
      <section className="bg-primary text-on-primary py-16">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-secondary-container font-display font-semibold text-xs tracking-wider uppercase mb-3">
            {t('jobs.hero.badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-headline-lg font-display font-bold text-white mb-4">
            {t('jobs.hero.title')}
          </h1>
          <p className="text-sm sm:text-base text-on-primary/80 max-w-2xl mx-auto font-sans">
            {t('jobs.hero.desc')}
          </p>
        </div>
      </section>

      {/* 2. SEARCH & FILTER BAR */}
      <section className="bg-surface-lowest border-b border-border-subtle py-8 shadow-sm">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 text-outline absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('jobs.search.placeholder')}
                className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-border-subtle text-sm bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all text-on-surface"
              />
            </div>

            {/* Type selector & Post Button */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-outline shrink-0 hidden sm:block" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full sm:w-auto px-3.5 py-2.5 rounded-lg border border-border-subtle text-sm bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-on-surface"
                >
                  {jobTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. JOBS LIST */}
      <section className="py-12 sm:py-16 bg-surface flex-grow">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-sm text-on-surface-variant font-medium">
              {t('jobs.list.total').split('{count}').map((part, i, arr) => 
                i === arr.length - 1 ? part : <React.Fragment key={i}>{part}<span className="font-bold text-primary">{filteredJobs.length}</span></React.Fragment>
              )}
            </p>
          </div>

          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-surface-lowest rounded-2xl border border-border-subtle p-6 hover-lift flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-level1"
              >
                <div className="space-y-3 flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-fixed text-primary">
                      {job.type}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-surface-variant text-on-surface-variant">
                      {job.experienceLevel}
                    </span>
                    <span className="text-xs text-outline ml-auto lg:ml-2">
                      {t('jobs.card.posted').replace('{date}', job.postedDate)}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-primary hover:text-primary-container transition-colors cursor-pointer"
                    onClick={() => setSelectedJob(job)}>
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-on-surface-variant">
                    <div className="flex items-center gap-1.5 font-semibold text-on-surface">
                      <Building className="w-4 h-4 text-secondary" />
                      <span>{job.company}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-outline" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-semibold text-tertiary-container">
                      <DollarSign className="w-4 h-4 text-secondary" />
                      <span>{job.salary}</span>
                    </div>
                  </div>

                  <p className="text-xs text-on-surface-variant line-clamp-2 max-w-3xl leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {Array.isArray(job.requirements) && job.requirements.slice(0, 3).map((req, idx) => (
                      <span key={idx} className="text-[11px] bg-surface text-on-surface-variant px-2.5 py-1 rounded border border-border-subtle">
                        ✓ {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-border-subtle">
                  <span className="text-[11px] text-outline">{t('jobs.card.deadline').replace('{date}', job.deadline)}</span>
                  <div className="flex gap-2 w-full lg:w-auto">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-4 py-2 border border-border-subtle rounded-lg text-xs font-display font-semibold hover:bg-surface text-primary transition-colors"
                    >
                      {t('jobs.card.detail')}
                    </button>
                    <button
                      onClick={() => setApplyModalJob(job)}
                      className="px-5 py-2 bg-secondary-container hover:bg-secondary-fixed text-primary text-xs font-display font-bold rounded-lg transition-colors shadow-sm"
                    >
                      {t('jobs.card.apply')}
                    </button>
                    <a
                      href={`mailto:${job.contactEmail}?subject=Lamaran Pekerjaan: ${job.title}`}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-display font-bold rounded-lg transition-colors shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DETAIL JOB MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-surface-lowest rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-border-subtle my-8">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-2 text-outline hover:text-on-surface rounded-full hover:bg-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-fixed text-primary inline-block mb-2">
              {selectedJob.type}
            </span>
            <h3 className="text-2xl font-display font-bold text-primary mb-1">
              {selectedJob.title}
            </h3>
            <p className="text-sm font-semibold text-secondary mb-4">
              {selectedJob.company} • {selectedJob.location}
            </p>

            {selectedJob.posterImage && (
              <div className="mb-6 rounded-xl overflow-hidden border border-border-subtle bg-surface-lowest flex justify-center">
                <img
                  src={`${selectedJob.posterImage}`}
                  alt={`Poster ${selectedJob.title}`}
                  className="w-full h-auto object-contain max-h-[300px]"
                />
              </div>
            )}


            <div className="grid grid-cols-2 gap-3 bg-surface p-4 rounded-xl border border-border-subtle mb-6 text-xs">
              <div>
                <span className="text-outline block">{t('jobs.modal.salary')}</span>
                <span className="font-bold text-primary">{selectedJob.salary}</span>
              </div>
              <div>
                <span className="text-outline block">{t('jobs.modal.deadline')}</span>
                <span className="font-bold text-primary">{selectedJob.deadline}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-on-surface leading-relaxed mb-6">
              <div>
                <h4 className="font-display font-bold text-primary text-base mb-2">{t('jobs.modal.desc')}</h4>
                <p className="text-on-surface-variant leading-relaxed">{selectedJob.description}</p>
              </div>

              <div>
                <h4 className="font-display font-bold text-primary text-base mb-2">{t('jobs.modal.req')}</h4>
                <ul className="space-y-2 text-on-surface-variant">
                  {Array.isArray(selectedJob.requirements) && selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-secondary-container font-bold text-base">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border-subtle">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-4 py-2 border border-border-subtle rounded-lg text-xs font-semibold text-outline hover:bg-surface"
              >
                {t('jobs.modal.close')}
              </button>
              <button
                onClick={() => {
                  const target = selectedJob;
                  setSelectedJob(null);
                  setApplyModalJob(target);
                }}
                className="px-6 py-2 bg-secondary-container hover:bg-secondary-fixed text-primary text-xs font-display font-bold rounded-lg shadow-sm"
              >
                {t('jobs.modal.apply')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. APPLY JOB MODAL */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-surface-lowest rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-border-subtle my-8">
            <button
              onClick={() => setApplyModalJob(null)}
              className="absolute top-4 right-4 p-2 text-outline hover:text-on-surface rounded-full hover:bg-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold text-primary mb-1">
              {t('jobs.apply.title')}
            </h3>
            <p className="text-xs text-on-surface-variant mb-6">
              {applyModalJob.title} di <strong className="text-primary">{applyModalJob.company}</strong>
            </p>

            {applySuccess ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle className="w-14 h-14 text-success-emerald mx-auto animate-bounce" />
                <h4 className="text-lg font-display font-bold text-primary">{t('jobs.apply.success')}</h4>
                <p className="text-xs text-on-surface-variant">{t('jobs.apply.success_desc')}</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-on-surface block mb-1">{t('jobs.apply.name')}</label>
                  <input
                    type="text"
                    required
                    value={applicant.name}
                    onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                    placeholder="Nama Anda"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1">{t('jobs.apply.email')}</label>
                    <input
                      type="email"
                      required
                      value={applicant.email}
                      onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                      placeholder="email@domain.com"
                      className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-on-surface block mb-1">{t('jobs.apply.phone')}</label>
                    <input
                      type="tel"
                      required
                      value={applicant.phone}
                      onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                      placeholder="08123456789"
                      className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-on-surface block mb-1">{t('jobs.apply.cv')}</label>
                  <input
                    type="url"
                    required
                    value={applicant.cvUrl}
                    onChange={(e) => setApplicant({ ...applicant, cvUrl: e.target.value })}
                    placeholder="https://drive.google.com/... atau https://linkedin.com/in/..."
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-on-surface block mb-1">{t('jobs.apply.note')}</label>
                  <textarea
                    rows={3}
                    value={applicant.message}
                    onChange={(e) => setApplicant({ ...applicant, message: e.target.value })}
                    placeholder="Tuliskan motivasi singkat atau kualifikasi utama Anda..."
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setApplyModalJob(null)}
                    className="px-4 py-2 border border-border-subtle rounded-lg hover:bg-surface font-medium text-outline"
                  >
                    {t('jobs.apply.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-secondary-container hover:bg-secondary-fixed text-primary font-display font-bold rounded-lg shadow-sm"
                  >
                    {t('jobs.apply.submit')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
