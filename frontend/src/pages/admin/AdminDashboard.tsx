import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  Newspaper, 
  Mail, 
  TrendingUp, 
  PlusCircle, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  Upload,
  LogOut,
  Loader2
} from 'lucide-react';
import { initialAlumniList, initialJobsList, initialNewsArticles } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  const [heroFiles, setHeroFiles] = useState<(File | null)[]>([null, null, null, null]);
  const [heroPreviews, setHeroPreviews] = useState<string[]>(['', '', '', '']);
  const [savingHero, setSavingHero] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleHeroImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran gambar maksimal 2 MB');
        return;
      }
      const newFiles = [...heroFiles];
      newFiles[index] = file;
      setHeroFiles(newFiles);

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...heroPreviews];
        newPreviews[index] = reader.result as string;
        setHeroPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveHeroSettings = async () => {
    const hasFiles = heroFiles.some(f => f !== null);
    if (!hasFiles) {
      alert('Pilih setidaknya 1 gambar baru untuk diunggah.');
      return;
    }

    setSavingHero(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      heroFiles.forEach(file => {
        if (file) {
          formData.append('images', file);
        }
      });

      const res = await fetch('http://localhost:5000/api/settings/hero', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        alert('Pengaturan Hero berhasil disimpan');
      } else {
        alert('Gagal menyimpan pengaturan');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan pengaturan hero.');
    } finally {
      setSavingHero(false);
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top Banner */}
      <section className="bg-primary text-on-primary py-10 px-4 sm:px-6 md:px-gutter">
        <div className="max-w-container-max mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-secondary-container text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Portal Manajemen Resmi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Dashboard Pengurus IAAJ
            </h1>
            <p className="text-xs sm:text-sm text-on-primary/75 mt-1">
              Selamat datang, {adminUser.username || 'Admin'}. Pantau keaktifan anggota, lowongan pekerjaan, dan publikasi portal alumni.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/alumni"
              className="px-4 py-2 bg-secondary-container hover:bg-secondary-fixed text-primary font-display font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tambah Alumni</span>
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-error hover:bg-error/90 text-white font-display font-bold text-xs rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </section>


      {/* Quick Nav & Activities */}
      <section className="py-8 flex-grow">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Quick Actions (6 cols) */}
            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-lg font-display font-bold text-primary">Modul Pengelolaan</h3>

              <div className="space-y-3">
                <Link
                  to="/admin/alumni"
                  className="block p-4 rounded-xl bg-surface-lowest border border-border-subtle hover:border-primary transition-colors group shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-primary group-hover:text-primary-container">
                          Database Alumni
                        </h4>
                        <p className="text-xs text-outline">Kelola dan verifikasi anggota</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link
                  to="/admin/loker"
                  className="block p-4 rounded-xl bg-surface-lowest border border-border-subtle hover:border-primary transition-colors group shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-primary group-hover:text-primary-container">
                          Peluang Karir
                        </h4>
                        <p className="text-xs text-outline">Tinjau dan tayangkan loker</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link
                  to="/admin/berita"
                  className="block p-4 rounded-xl bg-surface-lowest border border-border-subtle hover:border-primary transition-colors group shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-tertiary-container flex items-center justify-center">
                        <Newspaper className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-primary group-hover:text-primary-container">
                          Kabar &amp; Publikasi
                        </h4>
                        <p className="text-xs text-outline">Tulis dan jadwalkan artikel</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link
                  to="/admin/pesan"
                  className="block p-4 rounded-xl bg-surface-lowest border border-border-subtle hover:border-primary transition-colors group shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-surface-variant text-primary flex items-center justify-center">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-primary group-hover:text-primary-container">
                          Pesan Masuk
                        </h4>
                        <p className="text-xs text-outline">5 pesan perlu ditindaklanjuti</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
                <Link
                  to="/admin/tentang"
                  className="block p-4 rounded-xl bg-surface-lowest border border-border-subtle hover:border-primary transition-colors group shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-primary group-hover:text-primary-container">
                          Tentang Kami
                        </h4>
                        <p className="text-xs text-outline">Kelola sejarah & dewan pengurus</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>
            </div>

            {/* Hero Section Settings (6 cols) */}
            <div className="lg:col-span-6 bg-surface-lowest rounded-2xl border border-border-subtle p-6 sm:p-8 shadow-level1">
              <h3 className="text-lg font-display font-bold text-primary mb-2 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-secondary" />
                Pengaturan Foto Header Section Beranda
              </h3>
              <p className="text-xs text-on-surface-variant mb-6 pb-4 border-b border-border-subtle">
                Unggah maksimal 4 foto untuk ditampilkan sebagai slider pada halaman utama. <br/>
                <span className="font-semibold text-tertiary-container mt-1 inline-block">Catatan:</span> Ukuran rekomendasi (figsize) 1920x1080 px, Maksimal ukuran file 2 MB.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-outline">Foto {idx + 1}</span>
                    <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border-subtle rounded-xl hover:bg-surface hover:border-primary transition-colors cursor-pointer group relative overflow-hidden">
                      {heroPreviews[idx] ? (
                        <img src={heroPreviews[idx]} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="w-8 h-8 rounded-full bg-surface-variant group-hover:bg-primary/10 text-primary flex items-center justify-center mb-2">
                            <Upload className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] text-outline group-hover:text-primary font-medium text-center px-2">
                            Klik untuk unggah<br/>(Max 2MB)
                          </span>
                        </>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleHeroImageChange(idx, e)} />
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={saveHeroSettings}
                  disabled={savingHero}
                  className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-sm font-display font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2"
                >
                  {savingHero ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Perubahan'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
