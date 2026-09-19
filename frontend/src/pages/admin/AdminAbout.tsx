import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ImageIcon, Upload, Loader2, Users, Plus, Edit2, Trash2, X
} from 'lucide-react';

export const AdminAbout: React.FC = () => {
  const [historyImageFile, setHistoryImageFile] = useState<File | null>(null);
  const [historyImagePreview, setHistoryImagePreview] = useState<string>('');
  const [saving, setSaving] = useState(false);
  
  const [members, setMembers] = useState<any[]>([]);
  const [memberFiles, setMemberFiles] = useState<{[key: number]: File}>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [memberForm, setMemberForm] = useState({
    name: '', role: '', period: '', description: '', imagePreview: '', file: null as File | null
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/settings/about')
      .then(res => res.json())
      .then(data => {
        if (data.historyImage) {
          setHistoryImagePreview(data.historyImage.startsWith('http') ? data.historyImage : `http://localhost:5000${data.historyImage}`);
        }
        if (data.members) {
          setMembers(data.members.map((m: any) => ({
            ...m,
            image: m.image ? (m.image.startsWith('http') ? m.image : `http://localhost:5000${m.image}`) : ''
          })));
        }
      })
      .catch(err => console.error('Error fetching about settings:', err));
  }, []);

  const handleHistoryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Ukuran gambar maksimal 2 MB');
        return;
      }
      setHistoryImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setHistoryImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      
      if (historyImageFile) {
        formData.append('historyImage', historyImageFile);
      }
      
      const cleanMembers = members.map(m => {
        const { imageFile, ...rest } = m;
        return rest;
      });
      
      formData.append('members', JSON.stringify(cleanMembers));
      
      Object.keys(memberFiles).forEach(indexStr => {
        formData.append(`memberImage_${indexStr}`, memberFiles[parseInt(indexStr)]);
      });

      const response = await fetch('http://localhost:5000/api/settings/about', {
        method: 'PUT',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: formData
      });

      if (!response.ok) throw new Error('Gagal menyimpan');
      
      alert('Data Tentang Kami berhasil disimpan');
      setHistoryImageFile(null);
      setMemberFiles({});
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setSaving(false);
    }
  };

  const openModal = (index: number | null = null) => {
    if (index !== null) {
      const m = members[index];
      setMemberForm({
        name: m.name, role: m.role, period: m.period, description: m.description, 
        imagePreview: m.image || '', file: null
      });
      setEditingIndex(index);
    } else {
      setMemberForm({
        name: '', role: '', period: '', description: '', imagePreview: '', file: null
      });
      setEditingIndex(null);
    }
    setIsModalOpen(true);
  };

  const saveMember = () => {
    const newMembers = [...members];
    const memberData = {
      name: memberForm.name,
      role: memberForm.role,
      period: memberForm.period,
      description: memberForm.description,
      image: memberForm.imagePreview
    };

    let targetIndex = editingIndex;
    if (targetIndex !== null) {
      newMembers[targetIndex] = memberData;
    } else {
      newMembers.push(memberData);
      targetIndex = newMembers.length - 1;
    }

    if (memberForm.file) {
      setMemberFiles(prev => ({ ...prev, [targetIndex as number]: memberForm.file as File }));
    }

    setMembers(newMembers);
    setIsModalOpen(false);
  };

  const deleteMember = (index: number) => {
    if(confirm('Yakin ingin menghapus pengurus ini?')) {
      const newMembers = [...members];
      newMembers.splice(index, 1);
      setMembers(newMembers);
      
      const newFiles = { ...memberFiles };
      delete newFiles[index];
      // Shift indices in newFiles if necessary, or just rely on the backend logic which might need exact indices
      // This is a simplification; for a robust app, we'd update index map or save immediately
      setMemberFiles(newFiles);
    }
  };

  const handleMemberImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemberForm({ ...memberForm, imagePreview: reader.result as string, file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background py-8 relative">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Link to="/admin" className="text-xs font-semibold text-primary inline-flex items-center gap-1 mb-2 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Dashboard Admin</span>
            </Link>
            <h1 className="text-2xl font-display font-bold text-primary">
              Kelola Tentang Kami
            </h1>
            <p className="text-xs text-on-surface-variant">
              Ubah gambar sejarah & kilas balik, dan kelola dewan pengurus organisasi.
            </p>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="w-full sm:w-auto justify-center px-6 py-2.5 bg-primary hover:bg-primary-container text-white text-sm font-display font-bold rounded-lg transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Simpan Semua Perubahan'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Kelola Gambar Sejarah */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-lowest rounded-2xl border border-border-subtle p-6 shadow-level1">
              <h3 className="text-lg font-display font-bold text-primary mb-2 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-secondary" />
                Gambar Sejarah
              </h3>
              <p className="text-xs text-on-surface-variant mb-6 pb-4 border-b border-border-subtle">
                Ganti gambar pada bagian "Sejarah & Kilas Balik".
                <span className="font-semibold text-tertiary-container mt-1 inline-block block">Max ukuran: 2 MB.</span>
              </p>

              <div className="flex flex-col gap-2">
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border-subtle rounded-xl hover:bg-surface hover:border-primary transition-colors cursor-pointer group relative overflow-hidden">
                  {historyImagePreview ? (
                    <img src={historyImagePreview} alt="Preview Sejarah" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-surface-variant group-hover:bg-primary/10 text-primary flex items-center justify-center mb-2">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-[12px] text-outline group-hover:text-primary font-medium text-center px-2">
                        Klik untuk unggah<br/>gambar baru
                      </span>
                    </>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleHistoryImageChange} />
                </label>
              </div>
            </div>
          </div>

          {/* Kelola Dewan Pengurus */}
          <div className="lg:col-span-8">
            <div className="bg-surface-lowest rounded-2xl border border-border-subtle overflow-hidden shadow-level1">
              <div className="p-6 border-b border-border-subtle flex justify-between items-center bg-surface">
                <div>
                  <h3 className="text-lg font-display font-bold text-primary flex items-center gap-2">
                    <Users className="w-5 h-5 text-secondary" />
                    Dewan Pengurus
                  </h3>
                </div>
                <button 
                  onClick={() => openModal()}
                  className="px-4 py-2 bg-secondary-container hover:bg-secondary-fixed text-primary text-xs font-display font-bold rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Tambah Pengurus</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-lowest text-xs font-display text-outline border-b border-border-subtle">
                      <th className="px-6 py-4 font-semibold w-16">Foto</th>
                      <th className="px-6 py-4 font-semibold">Nama Lengkap</th>
                      <th className="px-6 py-4 font-semibold">Jabatan</th>
                      <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {members.map((member, idx) => (
                      <tr key={idx} className="hover:bg-surface/50 transition-colors">
                        <td className="px-6 py-4">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-border-subtle" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-xs text-outline">No</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-primary">{member.name}</p>
                          <p className="text-xs text-outline">{member.period}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-fixed text-primary">
                            {member.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openModal(idx)} className="p-1.5 text-outline hover:text-primary hover:bg-primary-fixed rounded transition-colors" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteMember(idx)} className="p-1.5 text-outline hover:text-error hover:bg-error/10 rounded transition-colors" title="Hapus">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {members.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-sm text-outline">
                          Belum ada data pengurus
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-surface-lowest rounded-2xl border border-border-subtle p-6 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-1 text-outline hover:text-primary">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-display font-bold text-primary mb-4">
              {editingIndex !== null ? 'Edit Pengurus' : 'Tambah Pengurus'}
            </h3>
            
            <div className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Nama Lengkap</label>
                <input type="text" value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-surface" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Jabatan</label>
                  <input type="text" value={memberForm.role} onChange={e => setMemberForm({...memberForm, role: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-surface" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Periode (ex: 2024-2028)</label>
                  <input type="text" value={memberForm.period} onChange={e => setMemberForm({...memberForm, period: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-surface" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Deskripsi Singkat</label>
                <textarea rows={2} value={memberForm.description} onChange={e => setMemberForm({...memberForm, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-surface"></textarea>
              </div>
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Foto Pengurus</label>
                <div className="flex items-center gap-4">
                  {memberForm.imagePreview ? (
                    <img src={memberForm.imagePreview} alt="Preview" className="w-12 h-12 rounded-full object-cover border" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center text-xs text-outline">No Img</div>
                  )}
                  <input type="file" accept="image/*" onChange={handleMemberImageChange} className="text-xs w-full" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors">Batal</button>
              <button onClick={saveMember} className="px-4 py-2 bg-primary text-white text-sm font-display font-bold rounded-lg hover:bg-primary-container transition-colors">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
