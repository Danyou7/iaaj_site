import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Target, 
  Eye, 
  Award, 
  Users, 
  HeartHandshake, 
  Compass, 
  GraduationCap,
  ArrowRight,
  Link as LinkIcon
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const [historyImage, setHistoryImage] = useState<string>('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80');
  const [members, setMembers] = useState<any[]>([]);
  const [advisors, setAdvisors] = useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/settings/about')
      .then(res => res.json())
      .then(data => {
        if (data.historyImage) {
          if (data.historyImage.startsWith('http')) {
            setHistoryImage(data.historyImage);
          } else {
            setHistoryImage(`${data.historyImage}`);
          }
        }
        if (data.advisors && data.advisors.length > 0) {
          setAdvisors(data.advisors.map((m: any) => ({
            ...m,
            image: m.image ? (m.image.startsWith('http') ? m.image : `${m.image}`) : ''
          })));
        }
        if (data.members && data.members.length > 0) {
          setMembers(data.members.map((m: any) => ({
            ...m,
            image: m.image ? (m.image.startsWith('http') ? m.image : `${m.image}`) : ''
          })));
        }
      })
      .catch(err => console.error('Error fetching about settings:', err));
  }, []);
  const pillars = [
    {
      title: 'Sinergi Profesional',
      description: 'Membangun jembatan karir dan kemitraan strategis antar alumni dari berbagai bidang industri dan keilmuan.',
      icon: Users
    },
    {
      title: 'Dedikasi untuk Almamater',
      description: 'Mendukung kemajuan akademik, riset, dan fasilitas kampus melalui dana abadi dan mentoring mahasiswa.',
      icon: GraduationCap
    },
    {
      title: 'Kepedulian Sosial',
      description: 'Menginisiasi bakti sosial, tanggap bencana, dan pendampingan UMKM sebagai bentuk kepedulian bagi masyarakat luas.',
      icon: HeartHandshake
    },
    {
      title: 'Integritas & Keunggulan',
      description: 'Menjunjung tinggi nilai moral, etika kepemimpinan berintegritas, dan etos kerja unggul di kancah nasional.',
      icon: Award
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. HERO HEADER */}
      <section className="bg-primary text-on-primary py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fdcb2c_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter relative z-10 text-center">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/10 text-secondary-container font-display font-semibold text-xs tracking-wider uppercase mb-4">
            {t('about.hero.badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            {t('about.hero.title')}
          </h1>
          <p className="text-base sm:text-lg text-on-primary/80 max-w-2xl mx-auto font-sans leading-relaxed">
            {t('about.hero.desc')}
          </p>
        </div>
      </section>

      {/* 2. SEJARAH & KILAS BALIK */}
      <section className="py-16 sm:py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-display font-bold text-secondary tracking-widest uppercase">
                {t('about.history.badge')}
              </span>
              <h2 className="text-3xl font-display font-bold text-primary leading-tight">
                {t('about.history.title')}
              </h2>
              <p className="text-on-surface-variant text-base leading-relaxed">
                {t('about.history.p1')}
              </p>
              <p className="text-on-surface-variant text-base leading-relaxed">
                {t('about.history.p2')}
              </p>
              <div className="pt-2">
                <Link
                  to="/alumni"
                  className="inline-flex items-center gap-2 text-primary font-display font-bold text-sm hover:text-primary-container"
                >
                  <span>{t('about.history.btn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border-subtle">
                <img
                  src={historyImage}
                  alt="Alumni Universitas Aman Jaya"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white text-sm font-medium">
                    {t('about.history.img_cap')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI */}
      <section className="py-16 sm:py-20 bg-surface-container-lowest border-y border-border-subtle">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Visi */}
            <div className="bg-surface p-8 sm:p-10 rounded-2xl border border-border-subtle shadow-level1">
              <div className="w-14 h-14 rounded-xl bg-primary text-white flex items-center justify-center mb-6 shadow-md">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-primary mb-4">{t('about.vision.title')}</h3>
              <p className="text-on-surface-variant text-base leading-relaxed">
                {t('about.vision.desc')}
              </p>
            </div>

            {/* Misi */}
            <div className="bg-surface p-8 sm:p-10 rounded-2xl border border-border-subtle shadow-level1">
              <div className="w-14 h-14 rounded-xl bg-secondary-container text-primary flex items-center justify-center mb-6 shadow-md">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-primary mb-4">{t('about.mission.title')}</h3>
              <ul className="space-y-3 text-on-surface-variant text-base">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary-container mt-2 shrink-0"></span>
                  <span>{t('about.mission.li1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary-container mt-2 shrink-0"></span>
                  <span>{t('about.mission.li2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-secondary-container mt-2 shrink-0"></span>
                  <span>{t('about.mission.li3')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NILAI-NILAI UTAMA (Pillars) */}
      {/*<section className="py-16 sm:py-20 bg-surface">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-display font-bold text-primary mb-3">
              Nilai-Nilai Utama Organisasi
            </h2>
            <div className="w-16 h-1 bg-secondary-container mx-auto rounded-full mb-4"></div>
            <p className="text-on-surface-variant text-base">
              Prinsip yang menjiwai setiap program kerja dan interaksi seluruh jajaran pengurus dan anggota.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface-lowest p-6 rounded-xl border border-border-subtle hover-lift flex flex-col shadow-level1"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary-fixed text-primary flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-primary mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>*/}

      {/* 5. STRUKTUR PENGURUS PUSAT */}
      <section className="py-16 sm:py-20 bg-surface-container-lowest border-t border-border-subtle">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-display font-bold text-secondary tracking-widest uppercase mb-1 block">
              {t('about.board.badge')}
            </span>
            <h2 className="text-3xl font-display font-bold text-primary mb-3">
              {t('about.board.title')}
            </h2>
            <div className="w-16 h-1 bg-secondary-container mx-auto rounded-full mb-4"></div>
            <p className="text-on-surface-variant text-base">
              {t('about.board.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {members.length > 0 ? members.map((member, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-2xl border border-border-subtle overflow-hidden text-center hover-lift p-6 shadow-level1"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
                />
                <span className="px-3 py-1 rounded-full text-xs font-display font-semibold bg-secondary-container text-primary inline-block mb-2">
                  {member.role}
                </span>
                <h3 className="font-display font-bold text-primary text-lg mb-1">
                  {member.name}
                </h3>
                <p className="text-xs text-outline mb-3 font-semibold">
                  {t('about.board.period')} {member.period}
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {member.description}
                </p>
                {member.socialLink && (
                  <a href={member.socialLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-display font-bold text-secondary hover:text-secondary-container transition-colors">
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Profil Sosial</span>
                  </a>
                )}
              </div>
            )) : (
              <p className="text-center col-span-3 text-on-surface-variant">{t('about.board.empty')}</p>
            )}
          </div>
        </div>
      </section>

      {/* 6. STRUKTUR DEWAN PEMBINA */}
      <section className="py-16 sm:py-20 bg-surface-container-lowest border-t border-border-subtle">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-display font-bold text-secondary tracking-widest uppercase mb-1 block">
              Dewan Pembina
            </span>
            <h2 className="text-3xl font-display font-bold text-primary mb-3">
              Susunan Dewan Pembina
            </h2>
            <div className="w-16 h-1 bg-secondary-container mx-auto rounded-full mb-4"></div>
            <p className="text-on-surface-variant text-base">
              Tokoh-tokoh pengarah yang senantiasa membimbing langkah strategis ikatan alumni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {advisors.length > 0 ? advisors.map((advisor, idx) => (
              <div
                key={idx}
                className="bg-surface rounded-2xl border border-border-subtle overflow-hidden text-center hover-lift p-6 shadow-level1"
              >
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
                />
                <span className="px-3 py-1 rounded-full text-xs font-display font-semibold bg-secondary-container text-primary inline-block mb-2">
                  {advisor.role}
                </span>
                <h3 className="font-display font-bold text-primary text-lg mb-1">
                  {advisor.name}
                </h3>
                <p className="text-xs text-outline mb-3 font-semibold">
                  {t('about.board.period')} {advisor.period}
                </p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {advisor.description}
                </p>
                {advisor.socialLink && (
                  <a href={advisor.socialLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-display font-bold text-secondary hover:text-secondary-container transition-colors">
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Profil Sosial</span>
                  </a>
                )}
              </div>
            )) : (
              <p className="text-center col-span-3 text-on-surface-variant">Belum ada data dewan pembina.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
