export type ProgramStudi = 'Nautika' | 'Teknika' | 'KNPK';

export interface Alumni {
  id: string;
  name: string;
  avatar?: string;
  faculty?: string;
  major: 'Nautika' | 'Teknika' | 'KNPK' | string;
  batch: number; // Angkatan ke-
  graduationYear?: number;
  currentRole: string;
  company: string;
  location: string;
  bio: string;
  linkedin?: string;
  email?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote' | 'Hybrid' | 'Magang';
  salary: string;
  experienceLevel: string;
  postedDate: string;
  deadline: string;
  description: string;
  requirements: string[];
  contactEmail: string;
  posterImage?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Pengumuman' | 'Acara' | 'Karir' | 'Prestasi' | 'Sosial';
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  isFeatured?: boolean;
  tags: string[];
}

export const initialAlumniList: Alumni[] = [
  {
    id: 'alm-1',
    name: 'Capt. Bambang Kusuma, M.Mar.',
    major: 'Nautika',
    batch: 38,
    graduationYear: 2012,
    currentRole: 'Master Mariner / Nakhoda',
    company: 'PT Pelayaran Samudera Jaya',
    location: 'Jakarta, Indonesia',
    bio: 'Berpengalaman lebih dari 12 tahun menakhodai kapal kargo internasional lintas rute Asia Pasifik.',
    linkedin: 'https://linkedin.com',
    email: 'bambang.kusuma@alumni.amanjaya.ac.id'
  },
  {
    id: 'alm-2',
    name: 'Dr. Ir. Muhammad Hidayat, M.Mar.E.',
    major: 'Teknika',
    batch: 40,
    graduationYear: 2014,
    currentRole: 'Chief Engineer',
    company: 'PT Pertamina Trans Kontinental',
    location: 'Surabaya, Jawa Timur',
    bio: 'Ahli sistem propulsi kapal tanker dan manajemen perawatan permesinan kapal laut modern.',
    linkedin: 'https://linkedin.com',
    email: 'm.hidayat@alumni.amanjaya.ac.id'
  },
  {
    id: 'alm-3',
    name: 'Stephanie Wardhani, S.Tr.Tra.',
    major: 'KNPK',
    batch: 42,
    graduationYear: 2016,
    currentRole: 'Terminal Operations Manager',
    company: 'PT Pelindo Terminal Petikemas',
    location: 'Tanjung Priok, Jakarta',
    bio: 'Fokus pada manajemen operasional dermaga, logistik rantai pasok pelabuhan, dan efisiensi dwell time.',
    linkedin: 'https://linkedin.com',
    email: 'stephanie.w@alumni.amanjaya.ac.id'
  },
  {
    id: 'alm-4',
    name: 'Capt. Andi Wijaya, M.Mar.',
    major: 'Nautika',
    batch: 41,
    graduationYear: 2015,
    currentRole: 'Marine Pilot (Pandu Maritim)',
    company: 'Pelindo Marine Service',
    location: 'Batam, Kepulauan Riau',
    bio: 'Pandu kapal bersertifikasi kelas 1 di perairan Selat Malaka dan kawasan perairan lepas pantai.',
    linkedin: 'https://linkedin.com',
    email: 'andi.wijaya@alumni.amanjaya.ac.id'
  },
  {
    id: 'alm-5',
    name: 'Hendra Gunawan, S.T., M.Mar.E.',
    major: 'Teknika',
    batch: 43,
    graduationYear: 2017,
    currentRole: 'Technical Superintendent',
    company: 'PT Wintermar Offshore Marine Tbk',
    location: 'Jakarta Utara',
    bio: 'Menangani inspeksi teknis armada kapal AHTS dan audit keselamatan maritim ISM Code.',
    linkedin: 'https://linkedin.com',
    email: 'hendra.gunawan@alumni.amanjaya.ac.id'
  },
  {
    id: 'alm-6',
    name: 'Ratna Sari Dewi, S.E., M.M.Tr.',
    major: 'KNPK',
    batch: 44,
    graduationYear: 2018,
    currentRole: 'Logistics & Freight Forwarding Head',
    company: 'Kuehne + Nagel Indonesia',
    location: 'Jakarta Pusat',
    bio: 'Spesialis kepabeanan ekspor-impor, chartering kapal niaga, dan supply chain maritim terpadu.',
    linkedin: 'https://linkedin.com',
    email: 'ratna.dewi@alumni.amanjaya.ac.id'
  },
  {
    id: 'alm-7',
    name: 'Capt. Rian Pratama, M.Mar.',
    major: 'Nautika',
    batch: 46,
    graduationYear: 2020,
    currentRole: 'Marine Safety & Quality Inspector',
    company: 'Bureau Veritas Marine',
    location: 'Balikpapan, Kalimantan Timur',
    bio: 'Auditor keselamatan navigasi dan kepatuhan regulasi maritim internasional (SOLAS & MARPOL).',
    linkedin: 'https://linkedin.com',
    email: 'rian.pratama@alumni.amanjaya.ac.id'
  },
  {
    id: 'alm-8',
    name: 'Budi Santoso, A.Md.Tra.',
    major: 'Teknika',
    batch: 47,
    graduationYear: 2021,
    currentRole: 'Second Engineer',
    company: 'Meratus Line',
    location: 'Surabaya, Jawa Timur',
    bio: 'Bertanggung jawab atas pengoperasian mesin induk dan generator listrik pada armada peti kemas domestik.',
    linkedin: 'https://linkedin.com',
    email: 'budi.santoso@alumni.amanjaya.ac.id'
  },
  {
    id: 'alm-9',
    name: 'Clara Anindita, S.M.',
    major: 'KNPK',
    batch: 48,
    graduationYear: 2022,
    currentRole: 'Shipping Agent & Agency Coordinator',
    company: 'Samudera Indonesia',
    location: 'Semarang, Jawa Tengah',
    bio: 'Mengkoordinasikan keagenan kapal asing, port clearance, dan layanan stevedoring pelabuhan.',
    linkedin: 'https://linkedin.com',
    email: 'clara.anindita@alumni.amanjaya.ac.id'
  },
  {
    id: 'alm-10',
    name: 'Dimas Prasetyo, A.Md.Tra.',
    major: 'Nautika',
    batch: 50,
    graduationYear: 2023,
    currentRole: 'Chief Officer / Mualim I',
    company: 'PT ASDP Indonesia Ferry (Persero)',
    location: 'Merak, Banten',
    bio: 'Mengelola navigasi harian, stabilitas pemuatan muatan kapal roro, dan keselamatan penumpang.',
    linkedin: 'https://linkedin.com',
    email: 'dimas.prasetyo@alumni.amanjaya.ac.id'
  },
  {
    id: 'alm-11',
    name: 'Fajar Nugroho, A.Md.Tra.',
    major: 'Teknika',
    batch: 50,
    graduationYear: 2023,
    currentRole: 'Third Engineer',
    company: 'Spil Shipping',
    location: 'Surabaya, Jawa Timur',
    bio: 'Spesialis sistem pendingin kontainer (reefer) dan auxiliary boilers perkapalan.',
    linkedin: 'https://linkedin.com',
    email: 'fajar.nugroho@alumni.amanjaya.ac.id'
  },
  {
    id: 'alm-12',
    name: 'Siti Rahmawati, S.Tr.Tra.',
    major: 'KNPK',
    batch: 51,
    graduationYear: 2024,
    currentRole: 'Port Logistics Specialist',
    company: 'Pelabuhan Indonesia (Pelindo)',
    location: 'Makassar, Sulawesi Selatan',
    bio: 'Pengembangan operasional pelabuhan modern terintegrasi di kawasan Indonesia Timur.',
    linkedin: 'https://linkedin.com',
    email: 'siti.rahmawati@alumni.amanjaya.ac.id'
  }
];

export const initialJobsList: Job[] = [
  {
    id: 'job-1',
    title: 'Senior Fullstack Engineer (React & Go)',
    company: 'PT Teknologi Nusantara Inovasi',
    location: 'Jakarta (Hybrid)',
    type: 'Full-time',
    salary: 'Rp 22.000.000 - Rp 35.000.000',
    experienceLevel: 'Senior (4+ tahun)',
    postedDate: '2 hari lalu',
    deadline: '30 September 2026',
    description: 'Kami mencari Senior Fullstack Engineer berpengalaman untuk memimpin pengembangan platform perbankan digital generasi baru. Posisi ini diprioritaskan bagi alumni Aman Jaya yang berdedikasi tinggi.',
    requirements: [
      'Minimal 4 tahun pengalaman dengan React, TypeScript, dan Go/Node.js',
      'Memahami arsitektur Microservices dan event-driven architecture (Kafka/RabbitMQ)',
      'Pengalaman dengan PostgreSQL, Redis, dan CI/CD pipeline',
      'Kemampuan komunikasi kolaboratif yang baik'
    ],
    contactEmail: 'karir@nusantarainovasi.co.id'
  },
  {
    id: 'job-2',
    title: 'Corporate Financial Analyst',
    company: 'Bank Mandiri Utama Tbk',
    location: 'Jakarta Pusat',
    type: 'Full-time',
    salary: 'Rp 14.000.000 - Rp 20.000.000',
    experienceLevel: 'Mid-Level (2-4 tahun)',
    postedDate: '5 hari lalu',
    deadline: '15 Oktober 2026',
    description: 'Bertanggung jawab dalam analisis model valuasi korporasi, penyusunan forecast anggaran tahunan, dan evaluasi portofolio investasi kredit komersial.',
    requirements: [
      'Lulusan S1 Ekonomi / Keuangan / Akuntansi',
      'Keahlian tinggi dalam pemodelan keuangan (Financial Modeling) Excel',
      'Memiliki sertifikasi CFA Level 1 menjadi nilai tambah besar',
      'Mampu berbahasa Inggris lisan dan tulisan secara profesional'
    ],
    contactEmail: 'talent@mandiriutama.co.id'
  },
  {
    id: 'job-3',
    title: 'Product Design Lead (UI/UX)',
    company: 'GoKarya Digital',
    location: 'Remote (Indonesia)',
    type: 'Remote',
    salary: 'Rp 18.000.000 - Rp 28.000.000',
    experienceLevel: 'Senior (5+ tahun)',
    postedDate: '1 minggu lalu',
    deadline: '20 Oktober 2026',
    description: 'Memimpin tim perancang antarmuka produk SaaS B2B, merancang design system terpadu, dan melakukan validasi usability research dengan pengguna aktif.',
    requirements: [
      'Portofolio produk digital terbukti yang sudah live',
      'Penguasaan mendalam Figma, Design Tokens, dan Design Systems',
      'Kemampuan memimpin sprint desain dan kolaborasi erat bersama tim tech'
    ],
    contactEmail: 'design-jobs@gokarya.id'
  },
  {
    id: 'job-4',
    title: 'Management Trainee - Business Development',
    company: 'Aman Jaya Group',
    location: 'Jakarta & Surabaya',
    type: 'Full-time',
    salary: 'Rp 9.000.000 - Rp 12.000.000',
    experienceLevel: 'Fresh Graduate / Entry Level',
    postedDate: 'Baru saja',
    deadline: '31 Oktober 2026',
    description: 'Program akselerasi kepemimpinan 12 bulan yang dirancang khusus bagi lulusan terbaik Universitas Aman Jaya untuk dipersiapkan menjadi manajer operasional.',
    requirements: [
      'Lulusan baru (maksimal 2 tahun kelulusan)',
      'IPK minimal 3.30 dari semua jurusan',
      'Aktif berorganisasi kemahasiswaan atau kepanitiaan kampus',
      'Bersedia ditempatkan di cabang operasional di Jawa & Bali'
    ],
    contactEmail: 'mt@amanjayagroup.com'
  }
];

export const initialNewsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Peluncuran Aplikasi IAAJ Connect: Mempermudah Kolaborasi dan Sinergi Alumni',
    slug: 'peluncuran-aplikasi-iaaj-connect',
    category: 'Pengumuman',
    excerpt: 'Platform digital terbaru yang dirancang khusus untuk memfasilitasi komunikasi, berbagi lowongan kerja, dan memperluas jaringan profesional antar alumni.',
    content: `Ikatan Alumni Aman Jaya (IAAJ) dengan bangga mengumumkan peluncuran resmi platform digital terpadu "IAAJ Connect". Platform ini dihadirkan sebagai wujud komitmen pengurus pusat dalam mempererat ikatan kekeluargaan serta menciptakan sinergi kolaboratif antar generasi alumni.

Ketua Umum IAAJ menyampaikan bahwa di era disrupsi teknologi saat ini, kecepatan pertukaran informasi dan kekuatan jaringan profesional memegang peranan krusial. Melalui portal ini, setiap alumni dapat memperbarui data profesi, menelusuri rekan seangkatan melalui Direktori Alumni, mempublikasikan lowongan pekerjaan di perusahaan masing-masing, serta mendapatkan kabar terbaru mengenai perkembangan almamater tercinta.

"Kami ingin memastikan tidak ada alumni yang merasa berjalan sendirian. IAAJ Connect adalah rumah bersama untuk saling mendukung, berbagi ilmu, dan melangkah maju bersama demi kemajuan bangsa," ungkapnya dalam seremoni peluncuran yang dihadiri lebih dari 500 alumni secara hybrid.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG5eeGExdVBY04w-wdcHKxeikrvAsKhipD5V7XmcijzQp4msEgJjGUXPXfjIm6oC0gpXDMKpVtjlLy3SnVWeVr2F8vg1zgEa6WG6I6F0HradHXInA0dHMEGMVnmpL1H1-HASw5f6nLTTSUi08urFoNR9LdGbBf0Mq68M6Q2haBNrrRdYagApVSeT9zb6MhqFzytc2Thm-x_0U1Je3x3UcZzxxrNu8NTGlzjscxoJfRrC_h-8M8QxTp',
    author: 'Sekretariat Pengurus Pusat',
    authorRole: 'Humas IAAJ',
    publishedDate: '04 September 2026',
    readTime: '4 menit baca',
    isFeatured: true,
    tags: ['IAAJ Connect', 'Digitalisasi', 'Komunitas Alumni']
  },
  {
    id: 'news-2',
    title: 'Reuni Akbar Angkatan 2010 Berlangsung Meriah di Grand Ballroom',
    slug: 'reuni-akbar-angkatan-2010-meriah',
    category: 'Acara',
    excerpt: 'Menghadirkan lebih dari 350 alumni dari seluruh penjuru negeri untuk merayakan 16 tahun persahabatan dan kontribusi bagi masyarakat.',
    content: `Suasana hangat dan penuh nostalgia menyelimuti Grand Ballroom Hotel Aman Jaya akhir pekan lalu saat perayaan Reuni Akbar Angkatan 2010 diselenggarakan. Acara yang mengusung tema "Merajut Kenangan, Menatap Masa Depan" ini berhasil mempertemukan ratusan rekan alumni dari berbagai fakultas.

Selain sesi temu kangen, acara diisi dengan penyerahan donasi beasiswa pendidikan bagi mahasiswa berprestasi yang kurang mampu, lelang karya seni alumni, serta diskusi panel bertajuk kepemimpinan berkelanjutan.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgdgmmXHP9n5eX0z-V4mDnenWxJ2QmlABVEyeJAjSOvClbEH1MjdPuX77cLdyA7n36vZdJZVvDr8yGKbIQSiDMJg9puLW1r-3epShiplaehRwF8KtYK94_Ung2LwKyismpgKO5zaZ8H_7N2ybEZoUsQBSBrMI99-ABAc4FeDRHRZfEOPZ51sCAPMwFG1CdgOLpwTo1SaTAGVwQhdChWQqB-Kp6r6QBz-ORBmLUb1lxsO5gA3uL2ip2',
    author: 'Panitia Reuni 2010',
    authorRole: 'Koordinator Acara',
    publishedDate: '28 Agustus 2026',
    readTime: '3 menit baca',
    tags: ['Reuni', 'Angkatan 2010', 'Silaturahmi']
  },
  {
    id: 'news-3',
    title: 'Seminar Karir: Menghadapi Dinamika dan Peluang Baru di Era Artificial Intelligence',
    slug: 'seminar-karir-dinamika-ai-2026',
    category: 'Karir',
    excerpt: 'Para pakar industri teknologi dan pimpinan korporat alumni berbagi strategi adaptasi karir dan reskilling bagi para fresh graduate.',
    content: `Perkembangan pesat teknologi kecerdasan buatan (AI) menuntut para profesional untuk terus beradaptasi dan meningkatkan keterampilan. Melalui kolaborasi antara IAAJ Career Hub dan Career Development Center kampus, telah terselenggara seminar nasional bertajuk "Navigating Career Resilience in the AI Era".

Tiga narasumber utama yang merupakan alumni sukses di bidang teknologi kecerdasan buatan, perbankan, dan hukum ketenagakerjaan memaparkan pentingnya memadukan hard-skill teknis dengan kemampuan berpikir kritis, empati, dan kepemimpinan adaptif.`,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALco6Rj0n8IjE0SmXZG0Lt4bR7LUPculCatGkZmQKdLFxNsZ_FsM72p_g-Ol5op_xn0DSLdHBEqFqPXWrg_oHoHn_nzELyvE0G3l-AppzOVO-igTNZBnvfREYdNXHwT3VbaJVwrUlk0JQ1x0v1vgyjkVLqp6VeT2bIPauSoIMPBcbwh7Q_0IM-eHDfpeDxlnYBCjcdnOsa3M6eIFOkqLQgvztlJ9-N_NAvPrqz8-_-zZow4UccYF-M',
    author: 'Divisi Karir & Pengembangan',
    authorRole: 'IAAJ Career Center',
    publishedDate: '15 Agustus 2026',
    readTime: '5 menit baca',
    tags: ['Seminar', 'AI', 'Karir & Pelatihan']
  }
];

export const organizationalMembers = [
  {
    role: 'Ketua Umum',
    name: 'Dr. Hendra Gunawan, S.E., M.M.',
    period: '2024 - 2028',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    description: 'Memimpin visi kebersamaan alumni yang berdampak nyata bagi almamater dan Indonesia.'
  },
  {
    role: 'Sekretaris Jenderal',
    name: 'Ratna Sari Dewi, S.H., M.Kn.',
    period: '2024 - 2028',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    description: 'Mengelola tata kelola organisasi, keanggotaan, dan komunikasi lintas pengurus cabang.'
  },
  {
    role: 'Bendahara Umum',
    name: 'David Hartono, S.Kom., M.B.A.',
    period: '2024 - 2028',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    description: 'Bertanggung jawab atas pengelolaan dana abadi, sponsorship kegiatan, dan transparansi keuangan.'
  }
];
