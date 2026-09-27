# Backend API - Mini Project CRUD & Authentication

Repositori ini berisi kode sumber untuk backend API pada aplikasi Mini Project CRUD. Project ini dibangun menggunakan Node.js dan menyediakan fitur autentikasi serta manajemen data (CRUD).

##  Fitur Utama
- **Authentication**: Register dan Login menggunakan JWT (JSON Web Token).
- **CRUD Operations**: Manajemen data dengan validasi input.
- **API Testing**: Menyertakan Postman Collection yang siap di-import untuk pengujian langsung.

---

##  Prasyarat (Prerequisites)
Sebelum menjalankan proyek ini, pastikan Anda telah menginstal software berikut di komputer Anda:
- [Node.js](https://nodejs.org) (Versi LTS direkomendasikan)
- [MySQL](https://mysql.com) atau aplikasi database server seperti XAMPP 

---

##  Langkah Instalasi & Konfigurasi

### 1. Clone Repositori & Masuk ke Folder Project
Jika Anda mengunduh dalam bentuk ZIP, ekstrak terlebih dahulu. Buka terminal/command prompt, lalu masuk ke direktori backend:
```bash
cd fwd-12-mini-project-crud-frontend-starter-main/backend
```

### 2. Instalasi Dependency
Instal semua package Node.js yang dibutuhkan dengan menjalankan perintah:
```bash
npm install
```

### 3. Konfigurasi Environment Variables (`.env`)
Buat sebuah file baru bernama `.env` di dalam root folder `backend`. Salin template di bawah ini dan sesuaikan dengan konfigurasi database lokal Anda:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=marketplace
JWT_SECRET=123
```
> **PENTING:** Jangan pernah mengunggah atau menyertakan file `.env` asli yang berisi password atau `JWT_SECRET` ke dalam Git repository demi keamanan credential Anda.

### 4. Import Database
1. Buka aplikasi manajemen database Anda (seperti **phpMyAdmin**).
2. Buat database baru (misalnya dengan nama sesuai yang Anda tulis di `.env`).
3. Import file database (biasanya berformat `.sql`) yang tersedia di dalam folder project ini ke dalam database baru tersebut.

---

## Menjalankan Server

Setelah instalasi dan konfigurasi selesai, Anda bisa menjalankan server backend dengan perintah:

```bash
npm start
```
Jika berhasil, Anda akan melihat pesan di terminal bahwa server telah berjalan (misalnya pada port `3000`).

---

## 🧪 Pengujian API (Testing Collection)

Proyek ini dilengkapi dengan file **Postman Collection** untuk memudahkan pengujian semua *endpoint* API (termasuk fitur autentikasi).

### Cara Menggunakan Postman Collection:
1. Buka aplikasi **Postman** di komputer Anda.
2. Klik tombol **Import** di pojok kiri atas.
3. Pilih file JSON Postman yang ada di folder project ini:  
   `Fauzan Hafizh Zulfikar - Authentication dan Testing API.postman_collection.json`
4. Setelah berhasil di-import, Anda akan melihat daftar request API mulai dari Register, Login, hingga operasi CRUD.
5. Pastikan server backend Anda **sudah berjalan** sebelum mengirim request (*Send*) di Postman.