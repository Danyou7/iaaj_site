import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle, 
  UserPlus, 
  GraduationCap,
  Download,
  Upload
} from 'lucide-react';
import type { Alumni } from '../../data/mockData';
import * as XLSX from 'xlsx';

export const AdminAlumni: React.FC = () => {
  const [list, setList] = useState<Alumni[]>([]);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    major: 'Nautika',
    batch: 50,
    graduationYear: 2023,
    currentRole: '',
    company: '',
    location: 'Jakarta',
    bio: ''
  });

  const resetForm = () => {
    setForm({
      name: '',
      email: '',
      major: 'Nautika',
      batch: 50,
      graduationYear: 2023,
      currentRole: '',
      company: '',
      location: 'Jakarta',
      bio: ''
    });
  };

  const fetchAlumni = async () => {
    try {
      const response = await fetch('/api/alumni?status=approved');
      if (response.ok) {
        const data = await response.json();
        const mappedData = data.map((item: any) => ({
          ...item,
          id: item._id,
        }));
        setList(mappedData);
      }
    } catch (error) {
      console.error('Failed to fetch alumni:', error);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const filtered = list.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    (item.major && item.major.toLowerCase().includes(search.toLowerCase())) ||
    (item.company && item.company.toLowerCase().includes(search.toLowerCase())) ||
    `angkatan ke-${item.batch}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus data alumni ini dari database?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/alumni/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          setList(list.filter((a) => a.id !== id));
        } else {
          console.error('Failed to delete alumni, check permissions.');
        }
      } catch (error) {
        console.error('Failed to delete alumni:', error);
      }
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/alumni', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...form, status: 'approved' })
      });
      
      if (response.ok) {
        await fetchAlumni();
        setShowAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to add alumni:', error);
    }
  };

  const handleEditClick = (item: Alumni) => {
    setForm({
      name: item.name,
      email: item.email || '',
      major: item.major,
      batch: item.batch,
      graduationYear: item.graduationYear || 2023,
      currentRole: item.currentRole || '',
      company: item.company || '',
      location: item.location || '',
      bio: item.bio || ''
    });
    setEditingId(item.id);
    setShowEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/alumni/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        await fetchAlumni();
        setShowEditModal(false);
        setEditingId(null);
        resetForm();
      } else {
        console.error('Failed to edit alumni, check permissions.');
      }
    } catch (error) {
      console.error('Failed to edit alumni:', error);
    }
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(list.map(item => ({
      'Nama Lengkap': item.name,
      'Email': item.email || '',
      'Program Studi': item.major,
      'Angkatan': item.batch,
      'Tahun Lulus': item.graduationYear || '',
      'Jabatan': item.currentRole || '',
      'Perusahaan': item.company || '',
      'Lokasi': item.location || ''
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Alumni");
    XLSX.writeFile(workbook, "Data_Alumni.xlsx");
  };

  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        
        // Asumsi data array of objects
        // Lakukan pengiriman data per baris atau bulk insert
        let successCount = 0;
        for (const row of data as any[]) {
          const mappedItem = {
            name: row['Nama Lengkap'] || '',
            email: row['Email'] || '',
            major: row['Program Studi'] || 'Nautika',
            batch: Number(row['Angkatan']) || 50,
            graduationYear: Number(row['Tahun Lulus']) || 2023,
            currentRole: row['Jabatan'] || '',
            company: row['Perusahaan'] || '',
            location: row['Lokasi'] || '',
            status: 'approved'
          };
          if (mappedItem.name) {
            const res = await fetch('/api/alumni', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(mappedItem)
            });
            if (res.ok) successCount++;
          }
        }
        alert(`Berhasil mengimpor ${successCount} data alumni.`);
        fetchAlumni();
      } catch (err) {
        console.error('Failed to import excel', err);
        alert('Gagal membaca file Excel.');
      }
    };
    reader.readAsBinaryString(file);
    e.target.value = ''; // Reset input
  };


  return (
    <div className="flex flex-col min-h-screen bg-background py-8">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <Link to="/admin" className="text-xs font-semibold text-primary inline-flex items-center gap-1 mb-2 hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Dashboard Admin</span>
            </Link>
            <h1 className="text-2xl font-display font-bold text-primary">
              Kelola Database Alumni
            </h1>
            <p className="text-xs text-on-surface-variant">
              Tambah, perbarui data verifikasi, atau hapus data keanggotaan alumni.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="file"
              accept=".xlsx, .xls"
              className="hidden"
              id="import-excel"
              onChange={handleImportExcel}
            />
            <label
              htmlFor="import-excel"
              className="px-4 py-2.5 bg-surface-variant hover:bg-surface-variant/80 text-primary font-display font-bold text-xs rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Import Excel</span>
            </label>
            <button
              onClick={handleExportExcel}
              className="px-4 py-2.5 bg-surface-variant hover:bg-surface-variant/80 text-primary font-display font-bold text-xs rounded-lg shadow-sm flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 bg-secondary-container hover:bg-secondary-fixed text-primary font-display font-bold text-xs rounded-lg shadow-sm flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Tambah Alumni Baru</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="bg-surface-lowest p-4 rounded-xl border border-border-subtle mb-6 flex items-center gap-3">
          <Search className="w-4 h-4 text-outline" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari berdasarkan nama, fakultas, atau perusahaan..."
            className="w-full text-xs bg-transparent focus:outline-none text-on-surface"
          />
        </div>

        {/* Table */}
        <div className="bg-surface-lowest rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface border-b border-border-subtle text-outline font-display font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Alumni</th>
                  <th className="p-4">Program Studi</th>
                  <th className="p-4">Angkatan ke-</th>
                  <th className="p-4">Pekerjaan &amp; Instansi</th>
                  <th className="p-4">Lokasi</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-primary text-sm">{item.name}</p>
                      <p className="text-[11px] text-outline">{item.email || 'Belum ada email'}</p>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold px-2.5 py-0.5 rounded-full text-[11px] bg-surface border border-border-subtle text-primary">
                        {item.major}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-on-surface">Angkatan ke-{item.batch}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-on-surface block">{item.currentRole}</span>
                      <span className="text-outline">{item.company}</span>
                    </td>
                    <td className="p-4 text-on-surface-variant">
                      {item.location}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-1.5 rounded-lg text-primary hover:bg-primary-container/40 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg text-error hover:bg-error-container/40 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-surface-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-border-subtle">
            <h3 className="text-lg font-display font-bold text-primary mb-4">
              Tambah Data Alumni Baru
            </h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Capt. Budi Santoso, M.Mar."
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nama@email.com"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Program Studi</label>
                  <select
                    value={form.major}
                    onChange={(e) => setForm({ ...form, major: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-white"
                  >
                    <option value="Nautika">Nautika</option>
                    <option value="Teknika">Teknika</option>
                    <option value="KNPK">KNPK</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Angkatan ke-</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={form.batch}
                    onChange={(e) => setForm({ ...form, batch: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">Pekerjaan &amp; Instansi</label>
                <input
                  type="text"
                  required
                  value={form.currentRole}
                  onChange={(e) => setForm({ ...form, currentRole: e.target.value })}
                  placeholder="Jabatan"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg mb-2"
                />
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Nama Perusahaan"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Lokasi / Wilayah</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Contoh: Jakarta"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="px-3 py-1.5 border border-border-subtle rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-secondary-container text-primary font-bold rounded-lg"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-surface-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-border-subtle">
            <h3 className="text-lg font-display font-bold text-primary mb-4">
              Edit Data Alumni
            </h3>
            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Capt. Budi Santoso, M.Mar."
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nama@email.com"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Program Studi</label>
                  <select
                    value={form.major}
                    onChange={(e) => setForm({ ...form, major: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg bg-white"
                  >
                    <option value="Nautika">Nautika</option>
                    <option value="Teknika">Teknika</option>
                    <option value="KNPK">KNPK</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1">Angkatan ke-</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={form.batch}
                    onChange={(e) => setForm({ ...form, batch: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="font-semibold block mb-1">Pekerjaan &amp; Instansi</label>
                <input
                  type="text"
                  required
                  value={form.currentRole}
                  onChange={(e) => setForm({ ...form, currentRole: e.target.value })}
                  placeholder="Jabatan"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg mb-2"
                />
                <input
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  placeholder="Nama Perusahaan"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div>
                <label className="font-semibold block mb-1">Lokasi / Wilayah</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Contoh: Jakarta"
                  className="w-full px-3 py-2 border border-border-subtle rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingId(null);
                    resetForm();
                  }}
                  className="px-3 py-1.5 border border-border-subtle rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-secondary-container text-primary font-bold rounded-lg"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
