import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, Trash2, Mail, FileText, UserPlus, MessageSquare } from 'lucide-react';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  documentType?: string;
  createdAt: string;
  isRead: boolean;
}

interface AlumniData {
  _id: string;
  name: string;
  email: string;
  major: string;
  batch: number;
  company: string;
  currentRole: string;
  location: string;
  createdAt: string;
}

export const AdminMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [alumniRequests, setAlumniRequests] = useState<AlumniData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pesan' | 'dokumen' | 'alumni'>('pesan');
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [msgRes, alumniRes] = await Promise.all([
        fetch('/api/messages', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/alumni?status=pending', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData);
      }
      if (alumniRes.ok) {
        const alumniData = await alumniRes.json();
        setAlumniRequests(alumniData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ isRead: !currentStatus })
      });
      if (response.ok) {
        setMessages(messages.map(m => m._id === id ? { ...m, isRead: !currentStatus } : m));
      } else {
        const errData = await response.json();
        alert(`Gagal update: ${errData.message}`);
      }
    } catch (error: any) {
      console.error('Error toggling read status:', error);
      alert(`Gagal: ${error.message}`);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm('Hapus pesan ini?')) {
      try {
        const response = await fetch(`/api/messages/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          setMessages(messages.filter(m => m._id !== id));
        } else {
          const errData = await response.json();
          alert(`Gagal hapus: ${errData.message}`);
        }
      } catch (error: any) {
        console.error('Error deleting message:', error);
        alert(`Gagal: ${error.message}`);
      }
    }
  };

  const handleDeleteAlumni = async (id: string) => {
    if (confirm('Hapus data pendaftaran ini?')) {
      try {
        const response = await fetch(`/api/alumni/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) {
          setAlumniRequests(alumniRequests.filter(a => a._id !== id));
        } else {
          const errData = await response.json();
          alert(`Gagal hapus alumni: ${errData.message}`);
        }
      } catch (error: any) {
        console.error('Error deleting alumni:', error);
        alert(`Gagal: ${error.message}`);
      }
    }
  };

  const handleApproveAlumni = async (id: string) => {
    if (confirm('Setujui pendaftaran ini agar masuk ke Data Alumni?')) {
      try {
        const response = await fetch(`/api/alumni/${id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify({ status: 'approved' })
        });
        if (response.ok) {
          setAlumniRequests(alumniRequests.filter(a => a._id !== id));
        } else {
          const errData = await response.json();
          alert(`Gagal menyetujui: ${errData.message}`);
        }
      } catch (error: any) {
        console.error('Error approving alumni:', error);
        alert(`Gagal: ${error.message}`);
      }
    }
  };

  const aspirasiMessages = messages.filter(m => m.category !== 'Perpanjang Dokumen');
  const dokumenMessages = messages.filter(m => m.category === 'Perpanjang Dokumen');

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background py-8">
      <div className="max-w-container-max mx-auto px-4 sm:px-6 md:px-gutter w-full">
        <div className="mb-6">
          <Link to="/admin" className="text-xs font-semibold text-primary inline-flex items-center gap-1 mb-2 hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Dashboard Admin</span>
          </Link>
          <h1 className="text-2xl font-display font-bold text-primary">
            Kotak Masuk (Dari Kontak Publik)
          </h1>
          <p className="text-xs text-on-surface-variant">
            Pesan, formulir perpanjangan dokumen, dan pendaftaran alumni baru.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border-subtle mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('pesan')}
            className={`flex items-center gap-2 px-4 py-2 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'pesan' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Pesan & Aspirasi ({aspirasiMessages.length})
          </button>
          <button
            onClick={() => setActiveTab('dokumen')}
            className={`flex items-center gap-2 px-4 py-2 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'dokumen' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            <FileText className="w-4 h-4" />
            Perpanjang Dokumen ({dokumenMessages.length})
          </button>
          <button
            onClick={() => setActiveTab('alumni')}
            className={`flex items-center gap-2 px-4 py-2 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${
              activeTab === 'alumni' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-primary'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            Pendaftaran Alumni ({alumniRequests.length})
          </button>
        </div>

        <div className="space-y-4">
          {/* PESAN & ASPIRASI */}
          {activeTab === 'pesan' && (
            aspirasiMessages.length === 0 ? (
              <div className="bg-surface-lowest p-8 rounded-2xl border border-border-subtle text-center">
                <Mail className="w-12 h-12 text-outline mx-auto mb-3" />
                <p className="text-on-surface-variant">Belum ada pesan & aspirasi.</p>
              </div>
            ) : (
              aspirasiMessages.map((msg) => (
                <MessageCard key={msg._id} msg={msg} onToggleRead={() => toggleRead(msg._id, msg.isRead)} onDelete={() => handleDeleteMessage(msg._id)} />
              ))
            )
          )}

          {/* PERPANJANG DOKUMEN */}
          {activeTab === 'dokumen' && (
            dokumenMessages.length === 0 ? (
              <div className="bg-surface-lowest p-8 rounded-2xl border border-border-subtle text-center">
                <FileText className="w-12 h-12 text-outline mx-auto mb-3" />
                <p className="text-on-surface-variant">Belum ada permohonan perpanjang dokumen.</p>
              </div>
            ) : (
              dokumenMessages.map((msg) => (
                <MessageCard key={msg._id} msg={msg} isDoc onToggleRead={() => toggleRead(msg._id, msg.isRead)} onDelete={() => handleDeleteMessage(msg._id)} />
              ))
            )
          )}

          {/* PENDAFTARAN ALUMNI */}
          {activeTab === 'alumni' && (
            alumniRequests.length === 0 ? (
              <div className="bg-surface-lowest p-8 rounded-2xl border border-border-subtle text-center">
                <UserPlus className="w-12 h-12 text-outline mx-auto mb-3" />
                <p className="text-on-surface-variant">Belum ada pendaftaran alumni baru.</p>
              </div>
            ) : (
              alumniRequests.map((alumni) => (
                <div key={alumni._id} className="bg-white p-6 rounded-2xl border border-primary/30 shadow-md ring-1 ring-primary/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-secondary-container"></div>
                      <h3 className="font-display font-bold text-primary text-base">{alumni.name}</h3>
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-surface-variant text-on-surface-variant">Pendaftaran Baru</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-outline">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(alumni.createdAt).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="text-xs text-outline space-x-3 mb-3">
                    <span>Email: <strong className="text-on-surface">{alumni.email}</strong></span>
                    <span>•</span>
                    <span>Prodi: <strong className="text-on-surface">{alumni.major}</strong></span>
                    <span>•</span>
                    <span>Angkatan: <strong className="text-on-surface">{alumni.batch}</strong></span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-surface leading-relaxed mb-4 bg-surface p-4 rounded-xl border border-border-subtle whitespace-pre-wrap">
                    Pekerjaan: {alumni.currentRole} di {alumni.company} ({alumni.location})
                  </p>
                  <div className="flex justify-end items-center gap-3 pt-2">
                    <button onClick={() => handleApproveAlumni(alumni._id)} className="text-xs font-semibold text-success-emerald hover:text-success-emerald/80 inline-flex items-center gap-1 bg-success-emerald/10 px-3 py-1.5 rounded-lg transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Setujui</span>
                    </button>
                    <button onClick={() => handleDeleteAlumni(alumni._id)} className="p-1.5 rounded-lg text-error hover:bg-error-container/40 transition-colors" title="Tolak & Hapus">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

const MessageCard = ({ msg, onToggleRead, onDelete, isDoc = false }: { msg: Message, onToggleRead: () => void, onDelete: () => void, isDoc?: boolean }) => (
  <div className={`p-6 rounded-2xl border transition-all shadow-sm ${msg.isRead ? 'bg-surface-lowest border-border-subtle opacity-80' : 'bg-white border-primary/30 shadow-md ring-1 ring-primary/10'}`}>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${msg.isRead ? 'bg-outline/40' : 'bg-secondary-container animate-pulse'}`}></div>
        <h3 className="font-display font-bold text-primary text-base">{msg.name}</h3>
        <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-surface-variant text-on-surface-variant">{msg.category}</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-outline">
        <Clock className="w-3.5 h-3.5" />
        <span>{new Date(msg.createdAt).toLocaleString('id-ID')}</span>
      </div>
    </div>
    <div className="text-xs text-outline space-x-3 mb-3">
      <span>Email: <strong className="text-on-surface">{msg.email}</strong></span>
      <span>•</span>
      <span>WhatsApp: <strong className="text-on-surface">{msg.phone}</strong></span>
    </div>
    <p className="text-xs sm:text-sm text-on-surface leading-relaxed mb-4 bg-surface p-4 rounded-xl border border-border-subtle whitespace-pre-wrap">
      {isDoc && <><strong className="block mb-1 text-primary">Dokumen: {msg.documentType}</strong></>}
      "{msg.message}"
    </p>
    <div className="flex justify-end items-center gap-3 pt-2">
      <button onClick={onToggleRead} className="text-xs font-semibold text-primary hover:text-primary-container inline-flex items-center gap-1">
        <CheckCircle2 className="w-4 h-4" />
        <span>{msg.isRead ? 'Tandai Belum Dibaca' : 'Tandai Sudah Selesai'}</span>
      </button>
      <button onClick={onDelete} className="p-1.5 rounded-lg text-error hover:bg-error-container/40 transition-colors" title="Hapus">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  </div>
);
