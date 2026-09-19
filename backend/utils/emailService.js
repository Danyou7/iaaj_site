const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = 'danutirta690@gmail.com';
const SENDER_EMAIL = 'onboarding@resend.dev';

/**
 * Notifikasi Pendaftaran Alumni Baru
 */
const sendAlumniNotification = async (alumni) => {
  try {
    const data = await resend.emails.send({
      from: `Sistem Alumni <${SENDER_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `[Notifikasi] Pendaftaran Alumni Baru - ${alumni.name}`,
      html: `
        <h2>Ada Pendaftaran Alumni Baru!</h2>
        <p><strong>Nama:</strong> ${alumni.name}</p>
        <p><strong>Email:</strong> ${alumni.email || '-'}</p>
        <p><strong>Jurusan:</strong> ${alumni.major}</p>
        <p><strong>Angkatan:</strong> ${alumni.batch}</p>
        <p><strong>Tahun Lulus:</strong> ${alumni.graduationYear || '-'}</p>
        <p><strong>Pekerjaan Saat Ini:</strong> ${alumni.currentRole || '-'}</p>
        <p><strong>Perusahaan:</strong> ${alumni.company || '-'}</p>
        <p><strong>Lokasi:</strong> ${alumni.location || '-'}</p>
        <p><strong>LinkedIn:</strong> ${alumni.linkedin || '-'}</p>
      `
    });
    console.log('Email pendaftaran alumni terkirim:', data);
    return data;
  } catch (error) {
    console.error('Gagal mengirim email pendaftaran alumni:', error);
  }
};

/**
 * Notifikasi Perpanjangan Dokumen
 */
const sendDocumentRenewalNotification = async (message) => {
  try {
    const data = await resend.emails.send({
      from: `Sistem Dokumen <${SENDER_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `[Notifikasi] Permohonan Perpanjang Dokumen - ${message.name}`,
      html: `
        <h2>Permohonan Perpanjang Dokumen!</h2>
        <p><strong>Nama Pemohon:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>No. HP:</strong> ${message.phone || '-'}</p>
        <p><strong>Jenis Dokumen:</strong> ${message.documentType || '-'}</p>
        <p><strong>Fakultas:</strong> ${message.faculty || '-'}</p>
        <p><strong>Pesan/Alasan:</strong></p>
        <p>${message.message}</p>
      `
    });
    console.log('Email perpanjang dokumen terkirim:', data);
    return data;
  } catch (error) {
    console.error('Gagal mengirim email perpanjang dokumen:', error);
  }
};

/**
 * Notifikasi Pesan atau Aspirasi
 */
const sendAspirationNotification = async (message) => {
  try {
    const data = await resend.emails.send({
      from: `Sistem Aspirasi <${SENDER_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `[Aspirasi Masuk] Kategori: ${message.category || 'General'} - dari ${message.name}`,
      html: `
        <h2>Ada Aspirasi / Pesan Baru!</h2>
        <p><strong>Nama:</strong> ${message.name}</p>
        <p><strong>Email:</strong> ${message.email}</p>
        <p><strong>No. HP:</strong> ${message.phone || '-'}</p>
        <p><strong>Kategori:</strong> ${message.category || '-'}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message.message}</p>
      `
    });
    console.log('Email aspirasi terkirim:', data);
    return data;
  } catch (error) {
    console.error('Gagal mengirim email aspirasi:', error);
  }
};

module.exports = {
  sendAlumniNotification,
  sendDocumentRenewalNotification,
  sendAspirationNotification
};
