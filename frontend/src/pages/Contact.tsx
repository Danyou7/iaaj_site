import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown,
  UserPlus,
  FileText
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    faculty: '',
    category: 'Pertanyaan Umum',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            faculty: '',
            category: 'Pertanyaan Umum',
            message: ''
          });
        }, 2500);
      }
    } catch (error) {
      console.error('Failed to submit message:', error);
      alert('Gagal mengirim pesan. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // State for Alumni Registration
  const [newAlumni, setNewAlumni] = useState({
    name: '',
    major: 'Nautika',
    batch: 50,
    currentRole: '',
    company: '',
    location: '',
    email: ''
  });
  const [alumniSubmitted, setAlumniSubmitted] = useState(false);
  const [isAlumniSubmitting, setIsAlumniSubmitting] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAlumniSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/alumni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAlumni),
      });

      if (response.ok) {
        setAlumniSubmitted(true);
        setTimeout(() => {
          setAlumniSubmitted(false);
          setNewAlumni({
            name: '',
            major: 'Nautika',
            batch: 50,
            currentRole: '',
            company: '',
            location: '',
            email: ''
          });
        }, 2500);
      }
    } catch (error) {
      console.error('Failed to register alumni:', error);
      alert('Gagal mendaftar. Silakan coba lagi.');
    } finally {
      setIsAlumniSubmitting(false);
    }
  };

  // State for Document Extension
  const [docFormData, setDocFormData] = useState({
    name: '',
    email: '',
    phone: '',
    documentType: '',
    description: ''
  });
  const [docSubmitted, setDocSubmitted] = useState(false);
  const [isDocSubmitting, setIsDocSubmitting] = useState(false);

  const handleDocSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDocSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: docFormData.name,
          email: docFormData.email,
          phone: docFormData.phone,
          documentType: docFormData.documentType,
          category: 'Perpanjang Dokumen',
          message: docFormData.description
        }),
      });
      if (response.ok) {
        setDocSubmitted(true);
        setTimeout(() => {
          setDocSubmitted(false);
          setDocFormData({
            name: '',
            email: '',
            phone: '',
            documentType: '',
            description: ''
          });
        }, 2500);
      }
    } catch (error) {
      console.error('Failed to submit document request:', error);
      alert('Gagal mengirim permohonan. Silakan coba lagi.');
    } finally {
      setIsDocSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'Bagaimana cara memperbarui data profil alumni saya?',
      a: 'Anda dapat masuk ke halaman Direktori Alumni dan menekan tombol "Perbarui Data", atau langsung menghubungi sekretariat melalui formulir di halaman ini.'
    },
    {
      q: 'Apakah perusahaan alumni dapat mempublikasikan lowongan kerja secara gratis?',
      a: 'Ya, seluruh alumni berhak mempublikasikan info loker perusahaannya melalui menu Peluang Karir secara cuma-cuma untuk sesama rekan alumni.'
    },
    {
      q: 'Bagaimana cara mengajukan proposal kerjasama atau donasi beasiswa?',
      a: 'Pilih kategori pesan "Kerjasama / Sponsorship" pada formulir ini, atau email langsung ke sekretariat@iaaj.or.id untuk dihubungkan dengan Divisi Kerjasama Industri & Dana Abadi.'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* 1. HERO HEADER */}
      <section className="bg-primary text-on-primary py-16">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-secondary-container font-display font-semibold text-xs tracking-wider uppercase mb-3">
            {t('contact.hero.badge')}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-headline-lg font-display font-bold text-white mb-4">
            {t('contact.hero.title')}
          </h1>
          <p className="text-sm sm:text-base text-on-primary/80 max-w-2xl mx-auto font-sans">
            {t('contact.hero.desc')}
          </p>
        </div>
      </section>

      {/* 2. ALUMNI REGISTRATION FORM (MOVED TO TOP) */}
      <section className="py-12 bg-surface">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="bg-surface-lowest rounded-2xl border border-border-subtle p-6 sm:p-10 shadow-level1 mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-subtle">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-primary">
                  {t('contact.alumni.badge')}
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  {t('contact.alumni.desc')}
                </p>
              </div>
            </div>

            {alumniSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-success-emerald mx-auto animate-bounce" />
                <h3 className="text-2xl font-display font-bold text-primary">
                  {t('contact.alumni.success')}
                </h3>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                  {t('contact.alumni.success_desc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-5 text-xs sm:text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">Nama Lengkap &amp; Gelar *</label>
                    <input
                      type="text"
                      required
                      value={newAlumni.name}
                      onChange={(e) => setNewAlumni({ ...newAlumni, name: e.target.value })}
                      placeholder="Contoh: Capt. Budi Santoso, M.Mar."
                      className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">Email Kontak *</label>
                    <input
                      type="email"
                      required
                      value={newAlumni.email}
                      onChange={(e) => setNewAlumni({ ...newAlumni, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">Program Studi *</label>
                    <select
                      value={newAlumni.major}
                      onChange={(e) => setNewAlumni({ ...newAlumni, major: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="Nautika">Nautika</option>
                      <option value="Teknika">Teknika</option>
                      <option value="KNPK">KNPK</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">Angkatan ke- *</label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={newAlumni.batch}
                      onChange={(e) => setNewAlumni({ ...newAlumni, batch: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">Pekerjaan / Jabatan</label>
                    <input
                      type="text"
                      value={newAlumni.currentRole}
                      onChange={(e) => setNewAlumni({ ...newAlumni, currentRole: e.target.value })}
                      placeholder="Contoh: Chief Officer"
                      className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">Perusahaan / Instansi</label>
                    <input
                      type="text"
                      value={newAlumni.company}
                      onChange={(e) => setNewAlumni({ ...newAlumni, company: e.target.value })}
                      placeholder="Contoh: PT Pelindo"
                      className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">Wilayah / Lokasi</label>
                    <input
                      type="text"
                      value={newAlumni.location}
                      onChange={(e) => setNewAlumni({ ...newAlumni, location: e.target.value })}
                      placeholder="Contoh: Jakarta"
                      className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>


                <div className="pt-4 text-right border-t border-border-subtle mt-6">
                  <button
                    type="submit"
                    disabled={isAlumniSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-container text-white font-display font-bold rounded-lg transition-colors shadow-sm text-sm disabled:opacity-50"
                  >
                    {isAlumniSubmitting ? t('contact.alumni.loading') : t('contact.alumni.btn')}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* DOCUMENT EXTENSION FORM */}
          <div className="bg-surface-lowest rounded-2xl border border-border-subtle p-6 sm:p-10 shadow-level1 mb-12">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-subtle">
              <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-primary">
                  {t('contact.doc.badge')}
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                  {t('contact.doc.desc')}
                </p>
              </div>
            </div>

            {docSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-success-emerald mx-auto animate-bounce" />
                <h3 className="text-2xl font-display font-bold text-primary">
                  {t('contact.doc.success')}
                </h3>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                  {t('contact.doc.success_desc')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleDocSubmit} className="space-y-5 text-xs sm:text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      value={docFormData.name}
                      onChange={(e) => setDocFormData({ ...docFormData, name: e.target.value })}
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">Email Aktif *</label>
                    <input
                      type="email"
                      required
                      value={docFormData.email}
                      onChange={(e) => setDocFormData({ ...docFormData, email: e.target.value })}
                      placeholder="nama@email.com"
                      className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">No. Telepon / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={docFormData.phone}
                      onChange={(e) => setDocFormData({ ...docFormData, phone: e.target.value })}
                      placeholder="08123456789"
                      className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">Jenis Dokumen *</label>
                    <select
                      required
                      value={docFormData.documentType}
                      onChange={(e) => setDocFormData({ ...docFormData, documentType: e.target.value })}
                      className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="" disabled>Pilih Jenis Dokumen</option>
                      <option value="BST MSC 560">BST MSC 560</option>
                      <option value="AFF">AFF</option>
                      <option value="MFA">MFA</option>
                      <option value="MC">MC</option>
                      <option value="SAT">SAT</option>
                      <option value="SDSD">SDSD</option>
                      <option value="RADAR">RADAR</option>
                      <option value="ARPA">ARPA</option>
                      <option value="ECDIS">ECDIS</option>
                      <option value="ERM">ERM</option>
                      <option value="BRM">BRM</option>
                      <option value="SSO">SSO</option>
                      <option value="GMDSS">GMDSS</option>
                      <option value="IMDG CODE">IMDG CODE</option>
                      <option value="CROWD">CROWD</option>
                      <option value="CRICIS">CRICIS</option>
                      <option value="MHV">MHV</option>
                      <option value="RATING DECK">RATING DECK</option>
                      <option value="RATING ENGGINE">RATING ENGGINE</option>
                      <option value="ABLE DECK">ABLE DECK</option>
                      <option value="ABLE ENGGINE">ABLE ENGGINE</option>
                      <option value="ISM CODE">ISM CODE</option>
                      <option value="SHIP HANDLING">SHIP HANDLING</option>
                      <option value="RS">RS</option>
                      <option value="AS">AS</option>
                      <option value="DIKLAT PENINGKATAN ANT/ATT I">DIKLAT PENINGKATAN ANT/ATT I</option>
                      <option value="DIKLAT PENINGKATAN ANT/ATT II">DIKLAT PENINGKATAN ANT/ATT II</option>
                      <option value="DIKLAT PENINGKATAN ANT/ATT III">DIKLAT PENINGKATAN ANT/ATT III</option>
                      <option value="DIKLAT PENINGKATAN ANT/ATT IV">DIKLAT PENINGKATAN ANT/ATT IV</option>
                      <option value="DIKLAT PENINGKATAN ANT/ATT V">DIKLAT PENINGKATAN ANT/ATT V</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-on-surface block mb-1.5">Keterangan Tambahan *</label>
                  <textarea
                    rows={4}
                    required
                    value={docFormData.description}
                    onChange={(e) => setDocFormData({ ...docFormData, description: e.target.value })}
                    placeholder="Tuliskan alasan atau keterangan perpanjangan dokumen..."
                    className="w-full px-4 py-2.5 border border-border-subtle bg-surface focus:bg-white rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="pt-4 text-right border-t border-border-subtle mt-6">
                  <button
                    type="submit"
                    disabled={isDocSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3 bg-secondary-container hover:bg-secondary-fixed text-primary font-display font-bold rounded-lg transition-colors shadow-sm text-sm disabled:opacity-50"
                  >
                    {isDocSubmitting ? t('contact.alumni.loading') : t('contact.doc.btn')}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 bg-surface-lowest rounded-2xl border border-border-subtle p-6 sm:p-10 shadow-level1">
              <h2 className="text-2xl font-display font-bold text-primary mb-2">
                {t('contact.message.title')}
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mb-8">
                {t('contact.message.desc')}
              </p>

              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-success-emerald mx-auto animate-bounce" />
                  <h3 className="text-2xl font-display font-bold text-primary">
                    {t('contact.message.success')}
                  </h3>
                  <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                    {t('contact.message.success_desc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Masukkan nama lengkap Anda"
                      className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none text-on-surface"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-on-surface block mb-1.5">
                        Email Aktif *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="nama@email.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none text-on-surface"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-on-surface block mb-1.5">
                        No. Telepon / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="08123456789"
                        className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none text-on-surface"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-on-surface block mb-1.5">
                        Angkatan
                      </label>
                      <input
                        type="text"
                        value={formData.faculty}
                        onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                        placeholder="Contoh: 50"
                        className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none text-on-surface"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-on-surface block mb-1.5">
                        Kategori Pesan *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none text-on-surface"
                      >
                        <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                        <option value="Update Data Alumni">Update Data Keanggotaan</option>
                        <option value="Kerjasama / Sponsorship">Kerjasama &amp; Kemitraan</option>
                        <option value="Publikasi Lowongan Kerja">Publikasi Info Loker</option>
                        <option value="Aspirasi / Kritik Saran">Kritik &amp; Saran</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-on-surface block mb-1.5">
                      Pesan / Aspirasi Anda *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan pesan Anda secara jelas dan lengkap..."
                      className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-surface focus:bg-white focus:ring-2 focus:ring-primary focus:outline-none text-on-surface"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-secondary-container hover:bg-secondary-fixed text-primary font-display font-bold px-8 py-3 rounded-lg shadow-sm transition-colors text-sm disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t('contact.alumni.loading') : t('contact.message.btn')}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Info Sekretariat & FAQ */}
            <div className="lg:col-span-5 space-y-8">
              {/* Office Details */}
              <div className="bg-surface-lowest rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-level1 space-y-5">
                <h3 className="text-xl font-display font-bold text-primary pb-3 border-b border-border-subtle">
                  {t('contact.info.title')}
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-on-surface">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-primary">{t('contact.info.address')}</p>
                      <p className="text-on-surface-variant leading-relaxed">
                        Jl.Gading Raya 1 Komplek TNI-AL Kelapa Gading Barat Jakarta Utara 14240
                      </p>
                    </div>
                  </div>



                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-primary">{t('contact.info.phone')}</p>
                      <p className="text-on-surface-variant">081218948866</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-primary">{t('contact.info.email')}</p>
                      <p className="text-on-surface-variant">iaajmaster@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div className="bg-surface-lowest rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-level1">
                <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border-subtle text-primary">
                  <HelpCircle className="w-5 h-5 text-secondary" />
                  <h3 className="text-lg font-display font-bold">{t('contact.faq.title')}</h3>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-border-subtle rounded-xl overflow-hidden bg-surface"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                        className="w-full text-left p-3.5 flex justify-between items-center text-xs sm:text-sm font-display font-semibold text-primary"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            activeFaq === index ? 'rotate-180 text-secondary' : 'text-outline'
                          }`}
                        />
                      </button>
                      {activeFaq === index && (
                        <div className="p-3.5 pt-0 text-xs text-on-surface-variant border-t border-border-subtle/50 leading-relaxed bg-white">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
