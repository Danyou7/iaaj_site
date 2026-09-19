import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Building, MapPin, Briefcase, CheckCircle, X, Edit2 } from 'lucide-react';
import type { Job } from '../../data/mockData';
export const AdminJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [postJobSuccess, setPostJobSuccess] = useState(false);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time' as Job['type'],
    salary: '',
    experienceLevel: '',
    description: '',
    requirements: '',
    contactEmail: '',
    deadline: ''
  });
  const fetchJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
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

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Hapus lowongan kerja ini?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          setJobs(jobs.filter((j) => j.id !== id));
        } else {
          console.error('Failed to delete job, check permissions.');
        }
      } catch (error) {
        console.error('Failed to delete job:', error);
      }
    }
  };

  const handleEditClick = (job: Job) => {
    setEditingJobId(job.id);
    setNewJob({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary,
      experienceLevel: job.experienceLevel,
      description: job.description,
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : '',
      contactEmail: job.contactEmail,
      deadline: job.deadline
    });
    setPosterFile(null);
    setIsPostJobOpen(true);
  };

  const handlePostJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newJob.title);
      formData.append('company', newJob.company);
      formData.append('location', newJob.location);
      formData.append('type', newJob.type);
      formData.append('salary', newJob.salary || 'Kompetitif');
      formData.append('experienceLevel', newJob.experienceLevel || '1-3 tahun');
      formData.append('description', newJob.description);
      formData.append('contactEmail', newJob.contactEmail);
      formData.append('deadline', newJob.deadline);

      const requirementsArray = newJob.requirements.split('\n').filter((r) => r.trim() !== '');
      formData.append('requirements', JSON.stringify(requirementsArray));

      if (posterFile) {
        formData.append('posterImage', posterFile);
      }

      const url = editingJobId 
        ? `http://localhost:5000/api/jobs/${editingJobId}`
        : 'http://localhost:5000/api/jobs';
      
      const method = editingJobId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const savedJob = {
          ...data.job,
          id: data.job._id,
          postedDate: new Date(data.job.createdAt).toLocaleDateString('id-ID'),
        };
        
        if (editingJobId) {
          setJobs(jobs.map((j) => j.id === editingJobId ? savedJob : j));
        } else {
          setJobs([savedJob, ...jobs]);
        }
        
        setPostJobSuccess(true);
        setTimeout(() => {
          setPostJobSuccess(false);
          setIsPostJobOpen(false);
          setNewJob({
            title: '',
            company: '',
            location: '',
            type: 'Full-time',
            salary: '',
            experienceLevel: '',
            description: '',
            requirements: '',
            contactEmail: '',
            deadline: ''
          });
          setPosterFile(null);
        }, 1500);
      }
    } catch (error) {
      console.error('Failed to post job:', error);
    }
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
              Kelola Lowongan Kerja
            </h1>
            <p className="text-xs text-on-surface-variant">
              Tinjau, setujui, atau hapus lowongan kerja yang tayang di portal alumni.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingJobId(null);
              setNewJob({
                title: '',
                company: '',
                location: '',
                type: 'Full-time',
                salary: '',
                experienceLevel: '',
                description: '',
                requirements: '',
                contactEmail: '',
                deadline: ''
              });
              setPosterFile(null);
              setIsPostJobOpen(true);
            }}
            className="px-4 py-2 bg-secondary-container text-primary font-display font-bold text-xs rounded-lg shadow-sm"
          >
            Buka Form Pasang Loker
          </button>
        </div>

        {/* Table */}
        <div className="bg-surface-lowest rounded-2xl border border-border-subtle shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface border-b border-border-subtle text-outline font-display font-semibold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Posisi &amp; Perusahaan</th>
                  <th className="p-4">Tipe &amp; Lokasi</th>
                  <th className="p-4">Rentang Gaji</th>
                  <th className="p-4">Batas Akhir</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-surface/50 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-primary text-sm">{job.title}</p>
                      <p className="text-[11px] text-outline font-medium">{job.company}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-primary-fixed text-primary inline-block mb-1">
                        {job.type}
                      </span>
                      <p className="text-outline">{job.location}</p>
                    </td>
                    <td className="p-4 font-semibold text-on-surface">
                      {job.salary}
                    </td>
                    <td className="p-4 text-outline">
                      {job.deadline}
                    </td>
                    <td className="p-4 text-right flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(job)}
                        className="p-1.5 rounded-lg text-primary hover:bg-surface transition-colors"
                        title="Edit Lowongan"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="p-1.5 rounded-lg text-error hover:bg-error-container/40 transition-colors"
                        title="Hapus Lowongan"
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

      {/* POST JOB MODAL */}
      {isPostJobOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-surface-lowest rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-border-subtle my-8">
            <button
              onClick={() => setIsPostJobOpen(false)}
              className="absolute top-4 right-4 p-2 text-outline hover:text-on-surface rounded-full hover:bg-surface transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-display font-bold text-primary mb-1">
              {editingJobId ? 'Edit Lowongan Kerja' : 'Pasang Lowongan Kerja'}
            </h3>
            <p className="text-xs text-on-surface-variant mb-6">
              {editingJobId 
                ? 'Perbarui informasi lowongan kerja yang sudah ada.' 
                : 'Bagikan peluang karir di perusahaan Anda untuk keluarga besar alumni Aman Jaya.'}
            </p>

            {postJobSuccess ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle className="w-14 h-14 text-success-emerald mx-auto animate-bounce" />
                <h4 className="text-lg font-display font-bold text-primary">
                  {editingJobId ? 'Lowongan Berhasil Diperbarui!' : 'Lowongan Berhasil Ditayangkan!'}
                </h4>
                <p className="text-xs text-on-surface-variant">Lowongan kini sudah dapat dilihat oleh para pencari kerja alumni.</p>
              </div>
            ) : (
              <form onSubmit={handlePostJobSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-on-surface block mb-1">Judul Posisi Pekerjaan *</label>
                  <input
                    type="text"
                    required
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="Contoh: Digital Marketing Specialist"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1">Nama Perusahaan *</label>
                    <input
                      type="text"
                      required
                      value={newJob.company}
                      onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                      placeholder="Contoh: PT Kreasi Bangsa"
                      className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-on-surface block mb-1">Tipe Pekerjaan *</label>
                    <select
                      value={newJob.type}
                      onChange={(e) => setNewJob({ ...newJob, type: e.target.value as Job['type'] })}
                      className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="Remote">Remote</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Magang">Magang</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1">Lokasi Kerja *</label>
                    <input
                      type="text"
                      required
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      placeholder="Jakarta Selatan"
                      className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-on-surface block mb-1">Estimasi Rentang Gaji</label>
                    <input
                      type="text"
                      value={newJob.salary}
                      onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                      placeholder="Rp 10.000.000 - Rp 15.000.000"
                      className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-on-surface block mb-1">Batas Akhir (Deadline) *</label>
                  <input
                    type="date"
                    required
                    value={newJob.deadline}
                    onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-on-surface block mb-1">Poster Loker (Opsional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPosterFile(e.target.files ? e.target.files[0] : null)}
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-on-surface block mb-1">Deskripsi Singkat *</label>
                  <textarea
                    rows={3}
                    required
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    placeholder="Tuliskan gambaran umum tanggung jawab posisi ini..."
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-on-surface block mb-1">Persyaratan (Satu per baris) *</label>
                  <textarea
                    rows={3}
                    required
                    value={newJob.requirements}
                    onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                    placeholder="Minimal S1&#10;Pengalaman 2 tahun di bidang terkait&#10;Menguasai tools analitik"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-on-surface block mb-1">Email Penerimaan Lamaran *</label>
                  <input
                    type="email"
                    required
                    value={newJob.contactEmail}
                    onChange={(e) => setNewJob({ ...newJob, contactEmail: e.target.value })}
                    placeholder="hrd@perusahaan.com"
                    className="w-full px-3 py-2 border border-border-subtle rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPostJobOpen(false)}
                    className="px-4 py-2 border border-border-subtle rounded-lg hover:bg-surface font-medium text-outline"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-secondary-container hover:bg-secondary-fixed text-primary font-display font-bold rounded-lg shadow-sm"
                  >
                    {editingJobId ? 'Simpan Perubahan' : 'Tayangkan Lowongan'}
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
