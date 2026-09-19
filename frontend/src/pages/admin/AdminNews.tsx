import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Calendar, Newspaper, Loader2 } from 'lucide-react';

interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  publishedDate: string;
  author: string;
  thumbnailImage?: string;
  type?: 'berita' | 'buletin';
}

export const AdminNews: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
    author: 'Redaksi IAAJ',
    publishedDate: '',
    type: 'berita',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const fetchNews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/news', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setArticles(data);
      }
    } catch (err) {
      console.error('Failed to fetch news', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran gambar maksimal 2 MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus artikel ini?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchNews();
      } else {
        alert('Gagal menghapus berita.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      formData.append('author', form.author);
      formData.append('publishedDate', form.publishedDate);
      formData.append('type', form.type);
      if (imageFile) {
        formData.append('thumbnailImage', imageFile);
      }

      const res = await fetch('http://localhost:5000/api/news', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (res.ok) {
        setShowAdd(false);
        setForm({ title: '', content: '', author: 'Redaksi IAAJ', publishedDate: '', type: 'berita' });
        setImageFile(null);
        setImagePreview('');
        fetchNews();
      } else {
        alert('Gagal menerbitkan berita.');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background py-8">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Link to="/admin" className="text-xs font-semibold text-primary inline-flex items-center gap-1 mb-2 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Dashboard Admin</span>
            </Link>
            <h1 className="text-2xl font-display font-bold text-primary">
              Kelola Berita &amp; Publikasi
            </h1>
            <p className="text-xs text-on-surface-variant">
              Tulis artikel baru, kelola liputan kegiatan temu alumni, dan publikasi resmi.
            </p>
          </div>

          <button
            onClick={() => setShowAdd(true)}
            className="px-4 py-2 bg-secondary-container text-primary font-display font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tulis Berita Baru</span>
          </button>
        </div>

        {/* List of articles */}
        <div className="bg-surface-lowest rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 flex justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface border-b border-border-subtle text-outline font-display font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Artikel Berita</th>
                    <th className="p-4">Kategori</th>
                    <th className="p-4">Penulis</th>
                    <th className="p-4">Tanggal Rilis</th>
                    <th className="p-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {articles.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-outline">Belum ada berita.</td>
                    </tr>
                  ) : (
                    articles.map((art) => (
                      <tr key={art._id} className="hover:bg-surface/50 transition-colors">
                        <td className="p-4 flex items-center gap-3">
                          {art.thumbnailImage ? (
                            <img
                              src={`http://localhost:5000${art.thumbnailImage}`}
                              alt={art.title}
                              className="w-12 h-12 rounded-lg object-cover border border-border-subtle"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-surface-variant flex items-center justify-center">
                              <Newspaper className="w-5 h-5 text-outline" />
                            </div>
                          )}
                          <div>
                            <p className="font-bold text-primary text-sm line-clamp-1">{art.title}</p>
                            <p className="text-[11px] text-outline line-clamp-1">{art.content}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                            (art.type === 'buletin') 
                              ? 'bg-secondary-container text-secondary-dark' 
                              : 'bg-primary/10 text-primary'
                          }`}>
                            {art.type === 'buletin' ? 'Buletin' : 'Berita'}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-on-surface">
                          {art.author}
                        </td>
                        <td className="p-4 text-outline">
                          {new Date(art.publishedDate).toLocaleDateString('id-ID')}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDelete(art._id)}
                            className="p-1.5 rounded-lg text-error hover:bg-error-container/40 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-surface-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-border-subtle max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-display font-bold text-primary mb-4">
              Tulis Artikel Berita Baru
            </h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Judul Artikel</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Judul Berita"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Kategori Publikasi</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as 'berita' | 'buletin' })}
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-surface"
                >
                  <option value="berita">Berita Utama</option>
                  <option value="buletin">Buletin</option>
                </select>
              </div>
              <div>
                <label className="font-semibold block mb-1">Penulis</label>
                <input
                  type="text"
                  required
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Isi Lengkap Artikel</label>
                <textarea
                  rows={6}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Tuliskan naskah berita lengkap..."
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Tanggal Rilis</label>
                <input
                  type="date"
                  required
                  value={form.publishedDate}
                  onChange={(e) => setForm({ ...form, publishedDate: e.target.value })}
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Gambar Headline Berita</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-container"
                  />
                  <p className="text-[11px] text-on-surface-variant">
                    * Ukuran rekomendasi (figsize) 1920x1080 px. Maksimal ukuran file 2 MB.
                  </p>
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-full max-w-[200px] h-auto rounded-md mt-2 border border-border-subtle" />
                  )}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="px-3 py-1.5 border border-border-subtle rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 bg-secondary-container text-primary font-bold rounded-lg flex items-center justify-center min-w-[100px]"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Terbitkan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
