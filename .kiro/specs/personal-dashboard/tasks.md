# Rencana Implementasi: Personal Dashboard

## Ikhtisar

Implementasi Personal Dashboard menggunakan Vanilla JavaScript, HTML, dan CSS tanpa framework. Setiap langkah membangun di atas langkah sebelumnya, dimulai dari struktur HTML dan fondasi CSS, dilanjutkan dengan logika JavaScript per fitur, hingga pengujian dan integrasi akhir.

---

## Tugas

- [ ] 1. Buat struktur HTML dasar dan fondasi CSS
  - [ ] 1.1 Buat `index.html` dengan elemen semantik lengkap
    - Buat `<header>` dengan `#datetime`, `#greeting-text`, `#greeting-name`, tombol `#edit-name-btn`, dan `#name-modal`
    - Buat `<main class="main-grid">` dengan tiga `<section class="card">`: timer, todo, quick links
    - Tambahkan semua atribut aksesibilitas: `aria-label`, `aria-live`, `aria-modal`, `aria-labelledby`, `role="dialog"`
    - Sertakan tag `<script src="js/app.js">` di akhir `<body>`
    - _Persyaratan: 9.1, 9.2, 9.3, 9.4_

  - [ ] 1.2 Buat `css/style.css` dengan CSS Variables untuk theming
    - Definisikan variabel `:root` untuk tema terang (`--bg`, `--surface`, `--text`, `--primary`, dll.)
    - Definisikan override `[data-theme="dark"]` untuk tema gelap
    - Buat style untuk komponen: `.header`, `.main-grid`, `.card`, `.btn`, `.input`, `.timer-display`
    - Buat style untuk todo list: `.todo-item`, `.todo-checkbox`, `.todo-text`, `.todo-edit-input`
    - Buat style untuk quick links: `.link-chip`, `.link-wrapper`, `.link-delete-btn`
    - Buat style untuk modal: `.modal`, `.modal-card`
    - Tambahkan media query untuk layar ≤600px
    - _Persyaratan: 9.5, 9.6_

- [ ] 2. Implementasikan logika dasar `app.js` (konstanta, DOM refs, dan utilitas)
  - [ ] 2.1 Setup awal `app.js`: strict mode, konstanta LocalStorage, dan referensi DOM
    - Tambahkan `'use strict';` di baris pertama
    - Definisikan konstanta: `KEY_NAME`, `KEY_THEME`, `KEY_TODOS`, `KEY_LINKS`
    - Deklarasikan semua referensi DOM di bagian atas, dikelompokkan per fitur
    - _Persyaratan: 8.1, 8.2, 8.3, 8.4_

- [ ] 3. Implementasikan fitur Clock dan Greeting
  - [ ] 3.1 Implementasikan fungsi `formatDateTime()` dan `getTimeOfDay()`
    - `formatDateTime()` menghasilkan string format `Hari, DD Bulan YYYY | HH:MM:SS`
    - `getTimeOfDay()` mengembalikan `morning/afternoon/evening/night` berdasarkan jam (0–23)
    - Jam 5–11: morning, Jam 12–16: afternoon, Jam 17–20: evening, Jam 21–4: night
    - _Persyaratan: 1.1, 1.4, 2.1, 2.2, 2.3, 2.4_

  - [ ] 3.2 Implementasikan `updateClock()` dan pasang interval
    - Perbarui `#datetime` dengan `formatDateTime()`
    - Perbarui `#greeting-text` dengan sapaan berdasarkan `getTimeOfDay()`
    - Pasang `setInterval(updateClock, 1000)` dan panggil `updateClock()` sekali saat halaman load
    - _Persyaratan: 1.2, 1.3, 2.7_

  - [ ]* 3.3 Tulis property test untuk `formatDateTime()` dan `getTimeOfDay()`
    - **Properti 1: Pemformatan Waktu Selalu Valid** — untuk semua detik 0–1499, `formatTime()` menghasilkan `MM:SS`
    - **Properti 2: Pemetaan Waktu Hari Lengkap dan Konsisten** — untuk semua jam 0–23, `getTimeOfDay()` mengembalikan tepat satu nilai yang sesuai
    - _Persyaratan: 1.1, 1.4, 2.1, 2.2, 2.3, 2.4_

- [ ] 4. Implementasikan fitur Custom Name & NameModal
  - [ ] 4.1 Implementasikan fungsi `loadName()`, `openNameModal()`, `closeNameModal()`, dan `saveName()`
    - `loadName()`: baca `KEY_NAME` dari LocalStorage, update `#greeting-name` dan `#greeting-text`
    - `openNameModal()`: hapus class `hidden` dari `#name-modal`, isi `#name-input` dengan nama saat ini, fokus ke input
    - `closeNameModal()`: tambah class `hidden` ke `#name-modal`
    - `saveName()`: trim input; jika ada, simpan ke LocalStorage dan update greeting; jika kosong, hapus dari LocalStorage; tutup modal
    - Pasang event listener: `#edit-name-btn` → `openNameModal`, `#name-save-btn` → `saveName`, `#name-cancel-btn` → `closeNameModal`
    - Pasang event listener keyboard: Enter → `saveName`, Escape → `closeNameModal`
    - Pasang event listener click-outside pada `#name-modal`
    - Panggil `loadName()` saat inisialisasi
    - _Persyaratan: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

- [ ] 5. Implementasikan fitur Light/Dark Mode
  - [ ] 5.1 Implementasikan fungsi `applyTheme()` dan `loadTheme()`
    - `applyTheme(theme)`: set `data-theme` attribute pada `<html>`, update `#theme-icon` (🌙/☀️), simpan ke `KEY_THEME`
    - `loadTheme()`: baca `KEY_THEME`, default ke `'light'` jika tidak ada, panggil `applyTheme()`
    - Pasang event listener: klik `#theme-toggle` → toggle tema (dark↔light)
    - Panggil `loadTheme()` saat inisialisasi
    - _Persyaratan: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [ ] 6. Implementasikan Focus Timer
  - [ ] 6.1 Implementasikan `formatTime()`, state timer, dan fungsi `renderTimer()`
    - Konstanta `TIMER_DURATION = 25 * 60`
    - State: `timerSeconds`, `timerInterval`, `timerRunning`
    - `formatTime(seconds)`: pad menit dan detik dengan nol, return `MM:SS`
    - `renderTimer()`: set `textContent` dari `#timer-display` dengan `formatTime(timerSeconds)`
    - Panggil `renderTimer()` saat inisialisasi
    - _Persyaratan: 5.1_

  - [ ] 6.2 Implementasikan `startTimer()`, `stopTimer()`, dan `resetTimer()`
    - `startTimer()`: cek `timerRunning`, set interval 1 detik, update tombol disabled, update status
    - Ketika countdown mencapai 0: hentikan interval, tampilkan pesan selesai
    - `stopTimer()`: clear interval, update tombol dan status "Paused"
    - `resetTimer()`: clear interval, kembalikan `timerSeconds` ke `TIMER_DURATION`, update UI ke "Ready to focus!"
    - Pasang event listener pada `#timer-start`, `#timer-stop`, `#timer-reset`
    - _Persyaratan: 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

  - [ ]* 6.3 Tulis property test untuk `formatTime()`
    - **Properti 1: Pemformatan Waktu Selalu Valid** — generate detik acak 0–1499, verifikasi output `MM:SS`
    - Verifikasi menit = `Math.floor(seconds/60)` dan detik = `seconds % 60`, keduanya di-pad 2 digit
    - _Persyaratan: 5.1_

- [ ] 7. Checkpoint — Pastikan semua tes lolos untuk fitur Clock, Greeting, dan Timer
  - Pastikan semua tes lolos, tanyakan kepada pengguna jika ada pertanyaan.

- [ ] 8. Implementasikan To-Do List
  - [ ] 8.1 Implementasikan utilitas todo: `loadTodos()`, `saveTodos()`, `isDuplicateTask()`
    - `loadTodos()`: `JSON.parse(localStorage.getItem(KEY_TODOS)) || []` dalam try/catch, fallback `[]`
    - `saveTodos()`: `localStorage.setItem(KEY_TODOS, JSON.stringify(todos))`
    - `isDuplicateTask(text)`: bandingkan `text.trim().toLowerCase()` dengan setiap todo yang ada
    - _Persyaratan: 6.3, 8.3, 8.5_

  - [ ]* 8.2 Tulis property test untuk `isDuplicateTask()` dan serialisasi todo
    - **Properti 5: Penolakan Duplikat Case-Insensitive** — generate string dan variasi case-nya, verifikasi duplikat terdeteksi
    - **Properti 7: Serialisasi Round-Trip TodoList** — generate `TodoItem[]` acak, verifikasi `JSON.parse(JSON.stringify(todos))` ekuivalen
    - **Properti 9: Fallback Data Rusak** — generate string JSON tidak valid, verifikasi `loadTodos()` mengembalikan `[]`
    - _Persyaratan: 6.3, 8.3, 8.5_

  - [ ] 8.3 Implementasikan `addTodo()` dan `renderTodos()`
    - `addTodo()`: validasi input kosong/spasi, cek duplikat, push ke `todos`, `saveTodos()`, `renderTodos()`, clear input, fokus
    - `renderTodos()`: clear `#todo-list`, buat `<li>` per todo dengan checkbox, text span, dan action buttons
    - Buat `checkbox` dengan `aria-label`, handler `change` → `toggleTodo(index)`
    - Buat tombol edit (`✏️`) dengan handler → `startEditTodo()`
    - Buat tombol hapus (`🗑️`) dengan handler → `deleteTodo(index)`
    - `updateTodoCount()`: update `#todo-count` dengan total dan jumlah done
    - _Persyaratan: 6.1, 6.2, 6.13_

  - [ ]* 8.4 Tulis property test untuk `addTodo()` dan penghitung
    - **Properti 3: Penambahan Tugas Memperbesar Daftar** — generate teks valid + daftar awal, verifikasi panjang +1
    - **Properti 4: Penolakan Input Kosong atau Hanya Spasi** — generate string whitespace-only, verifikasi daftar tidak berubah
    - **Properti 11: Penghitung Tugas Selalu Akurat** — generate `TodoItem[]` acak, verifikasi `updateTodoCount()` akurat
    - _Persyaratan: 6.1, 6.2, 6.13_

  - [ ] 8.5 Implementasikan `toggleTodo()`, `deleteTodo()`, dan `clearDoneTodos()`
    - `toggleTodo(index)`: balik `todos[index].done`, `saveTodos()`, `renderTodos()`
    - `deleteTodo(index)`: `todos.splice(index, 1)`, `saveTodos()`, `renderTodos()`
    - `clearDoneTodos()`: filter out item dengan `done === true`, `saveTodos()`, `renderTodos()`
    - Pasang event listener: `#todo-add-btn` → `addTodo`, Enter pada `#todo-input` → `addTodo`, `#todo-clear-btn` → `clearDoneTodos`
    - _Persyaratan: 6.5, 6.6, 6.11, 6.12_

  - [ ]* 8.6 Tulis property test untuk toggle round-trip
    - **Properti 6: Toggle Status Tugas Adalah Round-Trip** — generate `TodoItem` acak, verifikasi toggle dua kali = status awal
    - _Persyaratan: 6.5, 6.6_

  - [ ] 8.7 Implementasikan `startEditTodo()` dengan validasi duplikat
    - Ganti `textSpan` dengan `<input class="todo-edit-input">` berisi teks saat ini
    - Pada blur/Enter: validasi teks tidak kosong; jika kosong, revert; cek duplikat (kecualikan index saat ini); jika duplikat, tampilkan error
    - Pada Escape: batalkan perubahan, kembalikan `textSpan`
    - _Persyaratan: 6.7, 6.8, 6.9, 6.10_

  - Panggil `loadTodos()` dan `renderTodos()` saat inisialisasi
  - _Persyaratan: 6.14_

- [ ] 9. Checkpoint — Pastikan semua tes Todo List lolos
  - Pastikan semua tes lolos, tanyakan kepada pengguna jika ada pertanyaan.

- [ ] 10. Implementasikan Quick Links
  - [ ] 10.1 Implementasikan utilitas links: `loadLinks()`, `saveLinks()`, `isValidUrl()`
    - `loadLinks()`: `JSON.parse(localStorage.getItem(KEY_LINKS)) || []` dalam try/catch
    - `saveLinks()`: `localStorage.setItem(KEY_LINKS, JSON.stringify(links))`
    - `isValidUrl(string)`: gunakan `new URL(string)`, cek `url.protocol === 'http:' || 'https:'`
    - _Persyaratan: 7.4, 8.4, 8.5_

  - [ ]* 10.2 Tulis property test untuk `isValidUrl()` dan serialisasi links
    - **Properti 8: Serialisasi Round-Trip LinkList** — generate `LinkItem[]` acak, verifikasi round-trip JSON
    - **Properti 9: Fallback Data Rusak** — generate string JSON tidak valid, verifikasi `loadLinks()` mengembalikan `[]`
    - Tulis unit test untuk `isValidUrl()` dengan URL valid dan tidak valid
    - _Persyaratan: 7.4, 8.4, 8.5_

  - [ ] 10.3 Implementasikan `addLink()` dan `renderLinks()`
    - `addLink()`: validasi label tidak kosong; prepend `https://` jika URL tidak dimulai dengan `http`; validasi URL; push ke `links`; `saveLinks()`; `renderLinks()`; clear inputs; fokus ke `#link-name-input`
    - `renderLinks()`: clear `#links-grid`, buat `.link-wrapper` per link dengan `<a class="link-chip">` (target `_blank`, rel `noopener noreferrer`) dan tombol hapus (`.link-delete-btn`)
    - _Persyaratan: 7.1, 7.2, 7.3, 7.5, 7.7_

  - [ ]* 10.4 Tulis property test untuk logika prepend URL
    - **Properti 10: Prepend URL Otomatis Idempoten** — generate string URL tanpa awalan http, verifikasi setelah prepend dimulai dengan `https://` tepat sekali
    - _Persyaratan: 7.3_

  - [ ] 10.5 Implementasikan `deleteLink()` dan pasang event listeners
    - `deleteLink(index)`: `links.splice(index, 1)`, `saveLinks()`, `renderLinks()`
    - Pasang event listener: `#link-add-btn` → `addLink`, Enter pada `#link-url-input` → `addLink`, Enter pada `#link-name-input` → fokus ke `#link-url-input`
    - Panggil `loadLinks()` dan `renderLinks()` saat inisialisasi
    - _Persyaratan: 7.6, 7.8_

- [ ] 11. Checkpoint Final — Verifikasi integrasi dan semua tes
  - Pastikan semua tes lolos dan semua fitur berfungsi secara terintegrasi, tanyakan kepada pengguna jika ada pertanyaan.

---

## Catatan

- Tugas bertanda `*` bersifat opsional dan dapat dilewati untuk implementasi MVP yang lebih cepat
- Setiap tugas merujuk ke persyaratan spesifik untuk keterlacakan
- Property-based test menggunakan library **fast-check** dengan minimal **100 iterasi** per properti
- Setiap property test harus diberi komentar tag: `// Feature: personal-dashboard, Property N: [judul properti]`
- Semua logika yang dapat diuji diekstrak sebagai fungsi murni agar mudah di-test tanpa simulasi DOM

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["3.1", "4.1", "5.1", "6.1", "8.1", "10.1"] },
    { "id": 3, "tasks": ["3.2", "6.2", "8.3", "10.3"] },
    { "id": 4, "tasks": ["3.3", "6.3", "8.2", "8.4", "10.2", "10.4"] },
    { "id": 5, "tasks": ["8.5", "10.5"] },
    { "id": 6, "tasks": ["8.6", "8.7"] }
  ]
}
```
