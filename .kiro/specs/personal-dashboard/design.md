# Dokumen Desain: Personal Dashboard

## Ikhtisar

Personal Dashboard adalah aplikasi web satu halaman (Single Page Application) yang berjalan sepenuhnya di sisi klien (client-side). Tidak ada server, tidak ada API, tidak ada dependensi eksternal saat runtime. Semua data disimpan di LocalStorage browser pengguna.

Aplikasi ini dibangun dengan tiga file:
- `index.html` — struktur dan markup HTML semantik
- `css/style.css` — semua styling menggunakan CSS Variables untuk theming
- `js/app.js` — semua logika aplikasi menggunakan Vanilla JavaScript (strict mode)

---

## Arsitektur

Arsitektur aplikasi mengikuti pola **Module-in-one-file**: semua logika dikumpulkan dalam satu file `app.js` yang dibagi menjadi bagian-bagian berdasarkan fitur menggunakan komentar seksi. Tidak ada framework, tidak ada build tool, tidak ada transpiler.

```
┌─────────────────────────────────────────────────┐
│                   Browser                       │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │              index.html                  │   │
│  │  ┌──────────┐  ┌────────────────────┐   │   │
│  │  │style.css │  │     app.js          │   │   │
│  │  │          │  │  ┌──────────────┐  │   │   │
│  │  │CSS Vars  │  │  │  1. Clock    │  │   │   │
│  │  │Light/Dark│  │  │  2. Name     │  │   │   │
│  │  │  Theme   │  │  │  3. Theme    │  │   │   │
│  │  └──────────┘  │  │  4. Timer    │  │   │   │
│  │                │  │  5. TodoList │  │   │   │
│  │                │  │  6. Links    │  │   │   │
│  │                │  └──────────────┘  │   │   │
│  │                └────────────────────┘   │   │
│  └──────────────────────────────────────────┘   │
│                       │                         │
│              ┌─────────────────┐                │
│              │   LocalStorage  │                │
│              │ dashboard_name  │                │
│              │ dashboard_theme │                │
│              │ dashboard_todos │                │
│              │ dashboard_links │                │
│              └─────────────────┘                │
└─────────────────────────────────────────────────┘
```

**Alur data:**
1. Halaman dimuat → `app.js` berjalan → semua data di-load dari LocalStorage → UI dirender
2. Pengguna berinteraksi → event handler terpicu → state di-update → data disimpan ke LocalStorage → UI dirender ulang

---

## Komponen dan Antarmuka

### 1. Clock & Greeting (`// --- CLOCK & GREETING ---`)

**Elemen DOM:**
- `#datetime` — menampilkan tanggal dan waktu
- `#greeting-text` — menampilkan teks sapaan (contoh: "Good morning,")
- `#greeting-name` — menampilkan nama pengguna (contoh: "Zahra!")

**Fungsi utama:**
- `formatDateTime(): string` — memformat objek `Date` saat ini menjadi string tampilan
- `getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night'` — mengembalikan periode hari berdasarkan jam
- `updateClock(): void` — memperbarui elemen DOM dengan waktu dan sapaan terkini

**Trigger:** `setInterval(updateClock, 1000)` — dijalankan setiap 1 detik

---

### 2. Custom Name & NameModal (`// --- CUSTOM NAME ---`)

**Elemen DOM:**
- `#edit-name-btn` — tombol untuk membuka modal
- `#name-modal` — elemen modal (dialog)
- `#name-input` — kolom input nama
- `#name-save-btn` — tombol simpan
- `#name-cancel-btn` — tombol batal

**Fungsi utama:**
- `loadName(): void` — memuat nama dari LocalStorage dan memperbarui UI
- `openNameModal(): void` — menampilkan NameModal dan mengisi input dengan nama saat ini
- `closeNameModal(): void` — menyembunyikan NameModal
- `saveName(): void` — menyimpan nama ke LocalStorage, memperbarui UI, menutup modal

---

### 3. Light/Dark Mode (`// --- THEME ---`)

**Elemen DOM:**
- `#theme-toggle` — tombol toggle tema
- `#theme-icon` — ikon di dalam tombol toggle

**Fungsi utama:**
- `applyTheme(theme: 'light' | 'dark'): void` — menerapkan tema ke `data-theme` attribute pada `<html>`, memperbarui ikon, menyimpan ke LocalStorage
- `loadTheme(): void` — memuat tema dari LocalStorage (default: `light`) dan menerapkannya

---

### 4. Focus Timer (`// --- TIMER ---`)

**Elemen DOM:**
- `#timer-display` — tampilan MM:SS
- `#timer-start`, `#timer-stop`, `#timer-reset` — tombol kontrol
- `#timer-status` — pesan status teks

**State internal:**
```
timerSeconds: number    // sisa detik (0–1500)
timerInterval: number   // ID dari setInterval
timerRunning: boolean   // apakah timer sedang berjalan
```

**Fungsi utama:**
- `formatTime(seconds: number): string` — mengonversi detik menjadi format `MM:SS`
- `renderTimer(): void` — memperbarui `#timer-display` dengan `formatTime(timerSeconds)`
- `startTimer(): void` — mulai interval, update tombol dan status
- `stopTimer(): void` — hentikan interval, update tombol dan status
- `resetTimer(): void` — hentikan interval, kembalikan ke 25:00, update UI

---

### 5. To-Do List (`// --- TODO ---`)

**Elemen DOM:**
- `#todo-input` — kolom input tugas baru
- `#todo-add-btn` — tombol tambah
- `#todo-list` — `<ul>` daftar tugas
- `#todo-error` — pesan error
- `#todo-count` — penghitung tugas
- `#todo-clear-btn` — hapus semua yang done

**State internal:**
```
todos: TodoItem[]
```

**Fungsi utama:**
- `loadTodos(): void` — memuat dari LocalStorage, fallback ke `[]` jika JSON rusak
- `saveTodos(): void` — serialisasi `todos` ke LocalStorage sebagai JSON
- `isDuplicateTask(text: string): boolean` — cek duplikat case-insensitive
- `addTodo(): void` — validasi input, cek duplikat, tambah ke `todos`, simpan, render
- `toggleTodo(index: number): void` — balik status `done`, simpan, render
- `deleteTodo(index: number): void` — hapus dari `todos`, simpan, render
- `startEditTodo(index, li, textSpan): void` — ganti text span dengan input inline
- `clearDoneTodos(): void` — filter out semua yang `done`, simpan, render
- `renderTodos(): void` — render ulang seluruh `#todo-list` dari state `todos`
- `updateTodoCount(): void` — perbarui teks penghitung

---

### 6. Quick Links (`// --- LINKS ---`)

**Elemen DOM:**
- `#link-name-input` — kolom input label
- `#link-url-input` — kolom input URL
- `#link-add-btn` — tombol tambah
- `#links-grid` — kontainer tampilan link
- `#link-error` — pesan error

**State internal:**
```
links: LinkItem[]
```

**Fungsi utama:**
- `loadLinks(): void` — memuat dari LocalStorage, fallback ke `[]`
- `saveLinks(): void` — serialisasi `links` ke LocalStorage sebagai JSON
- `isValidUrl(string: string): boolean` — validasi menggunakan `new URL()`, cek protokol http/https
- `addLink(): void` — validasi label, prepend `https://` jika perlu, validasi URL, tambah ke `links`, simpan, render
- `deleteLink(index: number): void` — hapus dari `links`, simpan, render
- `renderLinks(): void` — render ulang seluruh `#links-grid`

---

## Model Data

### TodoItem

```json
{
  "text": "string",   // deskripsi tugas, tidak boleh kosong, maksimal 100 karakter
  "done": "boolean"   // status selesai
}
```

**LocalStorage key:** `dashboard_todos`
**Format penyimpanan:** `JSON.stringify(TodoItem[])`

### LinkItem

```json
{
  "label": "string",  // nama tampilan link, tidak boleh kosong, maksimal 30 karakter
  "url": "string"     // URL lengkap dengan protokol http/https, maksimal 200 karakter
}
```

**LocalStorage key:** `dashboard_links`
**Format penyimpanan:** `JSON.stringify(LinkItem[])`

### Data Primitif

| Kunci LocalStorage  | Tipe    | Nilai Default |
|---------------------|---------|---------------|
| `dashboard_name`    | string  | (tidak ada)   |
| `dashboard_theme`   | string  | `"light"`     |

---

## Properti Kebenaran

*Sebuah properti adalah karakteristik atau perilaku yang harus selalu benar di semua eksekusi sistem yang valid — pada dasarnya, pernyataan formal tentang apa yang harus dilakukan sistem. Properti berfungsi sebagai jembatan antara spesifikasi yang dapat dibaca manusia dan jaminan kebenaran yang dapat diverifikasi mesin.*

### Properti 1: Pemformatan Waktu Selalu Valid

*Untuk semua* nilai detik yang valid (bilangan bulat 0–1499), fungsi `formatTime(seconds)` HARUS menghasilkan string dengan format tepat `MM:SS` di mana bagian menit adalah bilangan bulat dua digit dan bagian detik adalah bilangan bulat dua digit (masing-masing di-pad dengan nol jika perlu).

**Memvalidasi: Persyaratan 1.1, 1.4, 5.1**

---

### Properti 2: Pemetaan Waktu Hari Lengkap dan Konsisten

*Untuk semua* nilai jam yang valid (bilangan bulat 0–23), fungsi `getTimeOfDay()` HARUS mengembalikan tepat satu dari empat nilai: `'morning'`, `'afternoon'`, `'evening'`, atau `'night'`, dan nilai yang dikembalikan HARUS konsisten dengan rentang jam yang ditentukan (5–11 pagi, 12–16 siang, 17–20 petang, 21–4 malam).

**Memvalidasi: Persyaratan 2.1, 2.2, 2.3, 2.4**

---

### Properti 3: Penambahan Tugas Memperbesar Daftar

*Untuk semua* daftar tugas dan deskripsi tugas yang valid (non-kosong, bukan duplikat), menambahkan tugas baru ke daftar HARUS menghasilkan daftar yang panjangnya bertambah tepat 1.

**Memvalidasi: Persyaratan 6.1**

---

### Properti 4: Penolakan Input Kosong atau Hanya Spasi

*Untuk semua* string yang kosong atau hanya terdiri dari karakter spasi (termasuk spasi, tab, newline), operasi `addTodo` HARUS menolak input dan panjang daftar tugas HARUS tetap tidak berubah.

**Memvalidasi: Persyaratan 6.2**

---

### Properti 5: Penolakan Duplikat Case-Insensitive

*Untuk semua* daftar tugas yang berisi setidaknya satu tugas, dan semua variasi huruf besar/kecil dari teks tugas yang sudah ada (contoh: "Belajar", "BELAJAR", "belajar"), operasi `addTodo` HARUS menolak penambahan dan panjang daftar tugas HARUS tetap tidak berubah.

**Memvalidasi: Persyaratan 6.3**

---

### Properti 6: Toggle Status Tugas Adalah Operasi Round-Trip

*Untuk semua* tugas di dalam daftar, melakukan toggle status (`done`) dua kali berturut-turut HARUS mengembalikan tugas ke status semula (idempotency pasangan toggle).

**Memvalidasi: Persyaratan 6.5, 6.6**

---

### Properti 7: Serialisasi Round-Trip TodoList

*Untuk semua* array `TodoItem[]` yang valid, serialisasi ke JSON kemudian deserialisasi kembali (`JSON.parse(JSON.stringify(todos))`) HARUS menghasilkan array yang ekuivalen secara nilai (setiap item memiliki `text` dan `done` yang sama).

**Memvalidasi: Persyaratan 8.3**

---

### Properti 8: Serialisasi Round-Trip LinkList

*Untuk semua* array `LinkItem[]` yang valid, serialisasi ke JSON kemudian deserialisasi kembali HARUS menghasilkan array yang ekuivalen secara nilai (setiap item memiliki `label` dan `url` yang sama).

**Memvalidasi: Persyaratan 8.4**

---

### Properti 9: Fallback pada Data LocalStorage yang Rusak

*Untuk semua* string JSON yang tidak valid atau rusak (yang menyebabkan `JSON.parse()` melempar error), fungsi `loadTodos()` dan `loadLinks()` HARUS mengembalikan array kosong `[]` tanpa melempar error ke pengguna.

**Memvalidasi: Persyaratan 8.5**

---

### Properti 10: Prepend URL Otomatis Idempoten

*Untuk semua* string URL yang tidak diawali `http://` atau `https://`, logika prepend HARUS menambahkan awalan `https://` tepat satu kali. Menjalankan logika prepend dua kali pada string yang sama HARUS menghasilkan URL yang sama (tidak ada awalan ganda).

**Memvalidasi: Persyaratan 7.3**

---

### Properti 11: Penghitung Tugas Selalu Akurat

*Untuk semua* array `TodoItem[]`, nilai yang ditampilkan oleh `updateTodoCount()` HARUS selalu sama dengan panjang aktual array (total) dan jumlah item dengan `done === true` (selesai).

**Memvalidasi: Persyaratan 6.13**

---

## Penanganan Error

| Situasi | Penanganan |
|---------|------------|
| `JSON.parse()` gagal saat load todos | `try/catch`, fallback ke `[]` |
| `JSON.parse()` gagal saat load links | `try/catch`, fallback ke `[]` |
| Input todo kosong | Tampilkan pesan error via `showTodoError()`, jangan tambah item |
| Input todo duplikat | Tampilkan pesan error, select input, jangan tambah item |
| Label link kosong | Tampilkan pesan error via `showLinkError()`, jangan tambah item |
| URL tidak valid setelah prepend | Tampilkan pesan error, jangan tambah item |
| Edit todo menghasilkan teks kosong | Batalkan edit, kembalikan teks semula (revert) |
| Edit todo menghasilkan duplikat | Tampilkan pesan error, biarkan input tetap aktif |

Pesan error menggunakan elemen dengan `aria-live="polite"` agar dapat dibaca screen reader. Pesan error otomatis disembunyikan setelah 3 detik.

---

## Strategi Pengujian

### Pendekatan Ganda

Pengujian menggunakan dua pendekatan yang saling melengkapi:
1. **Unit test berbasis contoh**: Untuk skenario spesifik, edge case, dan kondisi error
2. **Property-based test**: Untuk memverifikasi properti universal di berbagai input

### Framework yang Direkomendasikan

Karena ini adalah proyek Vanilla JavaScript tanpa build tool, gunakan:
- **[fast-check](https://fast-check.dev/)** — library property-based testing untuk JavaScript/TypeScript
- **[Vitest](https://vitest.dev/)** atau **[Jest](https://jestjs.io/)** — sebagai test runner

Catatan: Library pengujian hanya dibutuhkan sebagai dev dependency dan tidak akan disertakan dalam bundle produksi.

### Fungsi yang Dapat Diuji Secara Langsung (Pure Functions)

Fungsi-fungsi berikut adalah fungsi murni yang dapat diuji tanpa simulasi DOM:

| Fungsi | Jenis Pengujian |
|--------|-----------------|
| `formatTime(seconds)` | Property-based + unit |
| `getTimeOfDay()` | Property-based + unit |
| `isDuplicateTask(text)` | Property-based |
| `isValidUrl(string)` | Property-based + unit |
| Logika prepend URL | Property-based |
| `JSON.parse/stringify` round-trip | Property-based |

### Property-Based Test (Menggunakan fast-check)

Setiap property-based test harus berjalan minimal **100 iterasi**. Setiap test harus diberi tag komentar yang merujuk ke nomor properti dalam dokumen desain ini.

Contoh format tag:
```javascript
// Feature: personal-dashboard, Property 1: Pemformatan Waktu Selalu Valid
test('formatTime menghasilkan MM:SS yang valid untuk semua detik 0-1499', () => {
  fc.assert(
    fc.property(fc.integer({ min: 0, max: 1499 }), (seconds) => {
      const result = formatTime(seconds);
      expect(result).toMatch(/^\d{2}:\d{2}$/);
      // ...
    }),
    { numRuns: 100 }
  );
});
```

### Unit Test (Berbasis Contoh)

Unit test fokus pada:
- **Nilai batas**: `formatTime(0)` → `'00:00'`, `formatTime(1500)` → `'25:00'`
- **Kondisi error**: input kosong, input duplikat, URL tidak valid
- **Perilaku spesifik**: auto-prepend `https://`, fallback LocalStorage rusak

### Cakupan Minimal yang Direkomendasikan

| Modul | Property Tests | Unit Tests |
|-------|---------------|------------|
| Clock/Greeting | Properti 1, 2 | Format tanggal, edge case jam |
| To-Do List | Properti 3, 4, 5, 6, 7, 11 | Toggle, hapus, edit duplikat |
| Quick Links | Properti 8, 10 | Validasi URL, prepend |
| LocalStorage | Properti 7, 8, 9 | Fallback data rusak |
