# Panduan Menjalankan Web & CMS IAAJ

Karena proyek ini sudah menggunakan arsitektur **Frontend (React/Vite)** dan **Backend (Node.js + MongoDB)**, Anda perlu menjalankan kedua layanannya secara bersamaan.

Berikut adalah langkah-langkah untuk menjalankan website ini di komputer Anda:

## 1. Pastikan MongoDB Sudah Berjalan
Sebelum menjalankan backend, pastikan layanan **MongoDB** sudah menyala di komputer Anda (biasanya berjalan otomatis di latar belakang pada port `27017` jika Anda sudah menginstalnya).

## 2. Jalankan Server Backend (API & Database)
Buka terminal / Command Prompt baru, lalu ikuti perintah berikut:
```bash
# Masuk ke folder backend
cd backend

# Jalankan server
npm run dev
```
> *Backend akan berjalan di **http://localhost:5000**. Biarkan terminal ini tetap terbuka.*

## 3. Jalankan Server Frontend (Tampilan Web)
Buka terminal / Command Prompt **baru** (biarkan terminal backend yang sebelumnya tetap menyala), pastikan Anda berada di folder utama proyek (folder `web`), lalu jalankan:
```bash
# Jalankan server frontend Vite
npm run dev
```
> *Frontend akan berjalan di **http://localhost:5173**. Biarkan terminal ini tetap terbuka.*

## 4. Buka di Browser
Setelah kedua terminal di atas berjalan, Anda bisa mengakses website melalui browser:
- **Halaman Utama (Publik):** [http://localhost:5173](http://localhost:5173)
- **Halaman Admin (CMS):** [http://localhost:5173/admin](http://localhost:5173/admin)

### Akun Admin Default:
- **Username:** `admin`
- **Password:** `admin123`

---
*Catatan: Jika sewaktu-waktu Anda menutup terminal, server akan mati. Anda harus mengulangi langkah 2 dan 3 untuk menyalakannya kembali.*
