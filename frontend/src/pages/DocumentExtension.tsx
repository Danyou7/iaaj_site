import React, { useState } from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const DocumentExtension: React.FC = () => {
  const { t } = useLanguage();
  
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
      const response = await fetch('/api/messages', {
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <section className="bg-primary text-on-primary py-16">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-secondary-container font-display font-semibold text-xs tracking-wider uppercase mb-3">
            {t('nav.document')}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-headline-lg font-display font-bold text-white mb-4">
            {t('nav.document')}
          </h1>
          <p className="text-sm sm:text-base text-on-primary/80 max-w-2xl mx-auto font-sans">
            {t('contact.doc.desc')}
          </p>
        </div>
      </section>

      <section className="py-12 bg-surface flex-grow">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="bg-surface-lowest rounded-2xl border border-border-subtle p-6 sm:p-10 shadow-level1 max-w-3xl mx-auto">
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
        </div>
      </section>
    </div>
  );
};
