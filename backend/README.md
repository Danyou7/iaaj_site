# IAAJ Backend CMS API Documentation

Proyek ini adalah backend Node.js + MongoDB untuk mendukung antarmuka admin CMS Ikatan Alumni Aman Jaya (IAAJ).

## Persyaratan
- Node.js (v18+)
- MongoDB (Pastikan service MongoDB berjalan di komputer Anda secara lokal, atau siapkan koneksi ke MongoDB Atlas)

## Cara Menguji Endpoint

### 1. Inisialisasi Database
Pastikan Anda sudah menjalankan service MongoDB. Secara default, sistem akan terkoneksi ke `mongodb://localhost:27017/iaaj_cms` dan otomatis membuat database tersebut saat pertama kali menyimpan data. Anda bisa mengubahnya di file `.env`.


### 2. Menjalankan Server
Buka terminal di folder `backend`, lalu jalankan:
```bash
npm install
npm run dev
```
Server akan menyala di `http://localhost:5000` dan otomatis mensinkronkan tabel ke database.

### 3. Generate Akun Admin (Seed)
Karena Anda butuh akun untuk login, jalankan request berikut (bisa via Postman atau browser jika GET, tapi ini POST):
```bash
curl -X POST http://localhost:5000/api/auth/seed
```
*Username default:* `admin`
*Password default:* `admin123`

### 4. Login untuk Mendapatkan Token JWT
Gunakan `curl` atau Postman untuk login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin", "password":"admin123"}'
```
Salin nilai `token` dari respons JSON. Anda akan menggunakannya sebagai `Bearer Token` untuk mengakses endpoint lain.

### 5. Menguji Endpoint CRUD Berita (Contoh dengan Token)
Ganti `YOUR_TOKEN_HERE` dengan token yang Anda dapatkan dari proses login.

**Mendapatkan Semua Berita:**
```bash
curl -X GET http://localhost:5000/api/news \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Menambahkan Berita Baru (Tanpa Upload Gambar via curl):**
*Jika ingin mencoba upload gambar, disarankan menggunakan Postman (form-data) dengan key `thumbnailImage` bertipe File.*
```bash
curl -X POST http://localhost:5000/api/news \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"Berita Pertama", "content":"Isi berita disini", "publishedDate":"2026-09-07", "author":"Redaksi"}'
```

---

Semua endpoint lainnya (`/api/alumni`, `/api/jobs`, `/api/settings/hero`) mengikuti pola standar RESTful API yang serupa dan semuanya dilindungi oleh JWT Token (harus mengirim header `Authorization: Bearer <token>`).
