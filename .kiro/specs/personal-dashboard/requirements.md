# Dokumen Persyaratan: Personal Dashboard

## Pendahuluan

Personal Dashboard adalah aplikasi web berbasis client-side yang membantu pengguna mengelola fokus dan produktivitas sehari-hari. Aplikasi ini berjalan sepenuhnya di browser tanpa backend, menggunakan LocalStorage untuk persistensi data. Fitur-fitur yang tersedia meliputi: sapaan personal dengan jam real-time, focus timer 25 menit, daftar tugas (to-do list), quick links favorit, serta mode terang/gelap yang dapat dialihkan.

## Glosarium

- **Dashboard**: Antarmuka utama aplikasi web yang menampilkan semua widget dalam satu halaman.
- **App**: Aplikasi Personal Dashboard secara keseluruhan.
- **Clock**: Komponen yang menampilkan tanggal dan waktu saat ini secara real-time.
- **Greeting**: Komponen sapaan yang menampilkan teks berdasarkan waktu hari dan nama pengguna.
- **Timer**: Komponen countdown 25 menit (Focus Timer).
- **TodoList**: Komponen daftar tugas yang dapat ditambah, diedit, dihapus, dan diselesaikan.
- **TodoItem**: Satu entri tugas dalam TodoList, memiliki teks dan status selesai (`done`).
- **LinkManager**: Komponen pengelola quick links.
- **LinkItem**: Satu entri tautan dalam LinkManager, memiliki label dan URL.
- **LocalStorage**: Penyimpanan data browser yang digunakan App untuk persistensi.
- **ThemeToggle**: Tombol pemilih tema terang/gelap.
- **NameModal**: Dialog modal untuk memasukkan dan menyimpan nama pengguna.
- **Tema**: Skema warna antarmuka, bernilai `light` (terang) atau `dark` (gelap).

---

## Persyaratan

### Persyaratan 1: Jam dan Tanggal Real-Time

**User Story:** Sebagai pengguna, saya ingin melihat tanggal dan waktu yang selalu diperbarui secara real-time, sehingga saya dapat mengetahui waktu terkini tanpa harus membuka aplikasi lain.

#### Kriteria Penerimaan

1. THE Clock SHALL menampilkan tanggal lengkap dalam format `Hari, DD Bulan YYYY` dan waktu dalam format `HH:MM:SS`.
2. WHEN halaman pertama dimuat, THE Clock SHALL langsung menampilkan tanggal dan waktu saat ini.
3. WHILE halaman terbuka, THE Clock SHALL memperbarui tampilan waktu setiap 1 detik.
4. THE Clock SHALL menggunakan format jam 24 jam (00–23) dengan angka dua digit yang di-pad dengan nol.

---

### Persyaratan 2: Sapaan Personal Berdasarkan Waktu

**User Story:** Sebagai pengguna, saya ingin mendapatkan sapaan yang sesuai dengan waktu hari serta menyapa saya dengan nama saya sendiri, sehingga dashboard terasa lebih personal.

#### Kriteria Penerimaan

1. WHEN jam menunjukkan pukul 05.00–11.59, THE Greeting SHALL menampilkan teks "Good morning".
2. WHEN jam menunjukkan pukul 12.00–16.59, THE Greeting SHALL menampilkan teks "Good afternoon".
3. WHEN jam menunjukkan pukul 17.00–20.59, THE Greeting SHALL menampilkan teks "Good evening".
4. WHEN jam menunjukkan pukul 21.00–04.59, THE Greeting SHALL menampilkan teks "Good night".
5. WHILE nama pengguna tersimpan di LocalStorage, THE Greeting SHALL menampilkan nama tersebut setelah teks sapaan diikuti tanda koma dan tanda seru (contoh: "Good morning, Zahra!").
6. WHILE nama pengguna tidak tersimpan, THE Greeting SHALL menampilkan teks sapaan diikuti tanda seru tanpa nama (contoh: "Good morning!").
7. WHEN waktu hari berubah, THE Greeting SHALL memperbarui teks sapaan secara otomatis.

---

### Persyaratan 3: Nama Pengguna Kustom

**User Story:** Sebagai pengguna, saya ingin memasukkan dan menyimpan nama saya sendiri, sehingga sapaan di dashboard dapat menyebut nama saya secara personal.

#### Kriteria Penerimaan

1. WHEN pengguna menekan tombol edit nama (✏️), THE NameModal SHALL terbuka dan menampilkan nama yang tersimpan saat ini (jika ada) di kolom input.
2. WHEN pengguna menekan tombol "Save" dengan nama yang tidak kosong, THE App SHALL menyimpan nama ke LocalStorage dan menutup NameModal.
3. WHEN pengguna menekan tombol "Save" dengan input kosong atau hanya spasi, THE App SHALL menghapus nama dari LocalStorage dan menampilkan sapaan tanpa nama.
4. WHEN pengguna menekan tombol "Cancel" atau mengklik area luar NameModal, THE NameModal SHALL menutup tanpa menyimpan perubahan.
5. WHEN pengguna menekan tombol Enter di kolom input NameModal, THE App SHALL melakukan aksi yang sama dengan menekan tombol "Save".
6. WHEN pengguna menekan tombol Escape di kolom input NameModal, THE NameModal SHALL menutup tanpa menyimpan perubahan.
7. WHEN halaman dimuat ulang, THE App SHALL memuat nama dari LocalStorage dan menampilkannya di sapaan secara otomatis.

---

### Persyaratan 4: Mode Terang dan Gelap

**User Story:** Sebagai pengguna, saya ingin dapat mengalihkan antara tampilan terang dan gelap, sehingga saya dapat menyesuaikan dashboard dengan kondisi cahaya lingkungan dan preferensi pribadi.

#### Kriteria Penerimaan

1. THE ThemeToggle SHALL menampilkan ikon 🌙 ketika tema aktif adalah terang, dan ikon ☀️ ketika tema aktif adalah gelap.
2. WHEN pengguna menekan ThemeToggle, THE App SHALL mengalihkan tema antara `light` dan `dark`.
3. WHEN tema diubah, THE App SHALL menyimpan pilihan tema ke LocalStorage.
4. WHEN halaman dimuat ulang, THE App SHALL memuat tema dari LocalStorage dan menerapkannya secara otomatis.
5. IF tidak ada tema yang tersimpan di LocalStorage, THEN THE App SHALL menggunakan tema terang (`light`) sebagai default.
6. WHILE tema `dark` aktif, THE App SHALL menerapkan skema warna gelap pada seluruh antarmuka termasuk latar belakang, teks, kartu, dan tombol.
7. WHILE tema `light` aktif, THE App SHALL menerapkan skema warna terang pada seluruh antarmuka.

---

### Persyaratan 5: Focus Timer 25 Menit

**User Story:** Sebagai pengguna, saya ingin menggunakan timer hitung mundur 25 menit, sehingga saya dapat menerapkan teknik Pomodoro untuk meningkatkan fokus belajar atau bekerja.

#### Kriteria Penerimaan

1. THE Timer SHALL menampilkan countdown dalam format `MM:SS` dengan nilai awal `25:00`.
2. WHEN pengguna menekan tombol "Start" dan timer tidak sedang berjalan, THE Timer SHALL mulai menghitung mundur setiap 1 detik.
3. WHILE timer berjalan, THE Timer SHALL menonaktifkan tombol "Start" dan mengaktifkan tombol "Stop".
4. WHILE timer tidak berjalan, THE Timer SHALL mengaktifkan tombol "Start" dan menonaktifkan tombol "Stop".
5. WHEN pengguna menekan tombol "Stop" dan timer sedang berjalan, THE Timer SHALL berhenti menghitung mundur dan mempertahankan sisa waktu.
6. WHEN pengguna menekan tombol "Reset", THE Timer SHALL menghentikan hitungan dan mengembalikan tampilan ke `25:00`.
7. WHEN timer mencapai `00:00`, THE Timer SHALL berhenti secara otomatis dan menampilkan pesan bahwa sesi selesai.
8. THE Timer SHALL menampilkan pesan status yang mencerminkan kondisi timer saat ini (siap, berjalan, dijeda, atau selesai).

---

### Persyaratan 6: Daftar Tugas (To-Do List)

**User Story:** Sebagai pengguna, saya ingin membuat dan mengelola daftar tugas harian, sehingga saya dapat melacak pekerjaan yang perlu diselesaikan dan yang sudah selesai.

#### Kriteria Penerimaan

1. WHEN pengguna mengetik deskripsi tugas dan menekan tombol "Add" atau tombol Enter, THE TodoList SHALL menambahkan tugas baru ke dalam daftar.
2. WHEN pengguna mencoba menambahkan tugas dengan input kosong atau hanya spasi, THE TodoList SHALL menampilkan pesan error dan tidak menambahkan tugas.
3. WHEN pengguna mencoba menambahkan tugas yang teksnya sama (tidak peka huruf besar/kecil) dengan tugas yang sudah ada, THE TodoList SHALL menampilkan pesan error dan tidak menambahkan tugas duplikat.
4. WHEN tugas berhasil ditambahkan, THE TodoList SHALL mengosongkan kolom input dan mengembalikan fokus ke kolom input.
5. WHEN pengguna mencentang checkbox sebuah tugas, THE TodoList SHALL mengubah status tugas tersebut menjadi selesai (`done`), menampilkan garis coret pada teks, dan menyimpan perubahan ke LocalStorage.
6. WHEN pengguna mencentang ulang checkbox tugas yang sudah selesai, THE TodoList SHALL mengembalikan status tugas menjadi belum selesai.
7. WHEN pengguna menekan tombol edit (✏️) pada sebuah tugas, THE TodoList SHALL menampilkan kolom input inline yang dapat diedit dengan teks tugas saat ini.
8. WHEN pengguna menekan Enter atau memindahkan fokus dari kolom edit inline dengan teks yang valid, THE TodoList SHALL menyimpan perubahan nama tugas dan merender ulang daftar.
9. WHEN pengguna mencoba menyimpan hasil edit dengan teks yang sama (tidak peka huruf besar/kecil) dengan tugas lain yang ada, THE TodoList SHALL menampilkan pesan error dan membatalkan perubahan.
10. WHEN pengguna menekan Escape saat mengedit inline, THE TodoList SHALL membatalkan perubahan dan menampilkan teks tugas semula.
11. WHEN pengguna menekan tombol hapus (🗑️) pada sebuah tugas, THE TodoList SHALL menghapus tugas tersebut dari daftar dan menyimpan perubahan ke LocalStorage.
12. WHEN pengguna menekan tombol "Clear Done", THE TodoList SHALL menghapus semua tugas yang berstatus selesai dari daftar.
13. THE TodoList SHALL selalu menampilkan jumlah total tugas dan jumlah tugas yang sudah selesai.
14. WHEN halaman dimuat, THE App SHALL memuat daftar tugas dari LocalStorage dan menampilkannya.

---

### Persyaratan 7: Pengelola Quick Links

**User Story:** Sebagai pengguna, saya ingin menyimpan dan mengakses tautan web favorit saya dengan cepat dari dashboard, sehingga saya tidak perlu mengingat atau mencari URL setiap kali.

#### Kriteria Penerimaan

1. WHEN pengguna mengisi label dan URL lalu menekan tombol "Add" atau tombol Enter di kolom URL, THE LinkManager SHALL menambahkan tautan baru ke dalam daftar.
2. WHEN pengguna mencoba menambahkan tautan tanpa label, THE LinkManager SHALL menampilkan pesan error dan tidak menambahkan tautan.
3. WHEN URL yang dimasukkan tidak diawali dengan `http://` atau `https://`, THE LinkManager SHALL secara otomatis menambahkan awalan `https://` sebelum memvalidasi.
4. WHEN URL yang sudah diproses (setelah kemungkinan penambahan awalan) tidak valid sebagai URL, THE LinkManager SHALL menampilkan pesan error dan tidak menambahkan tautan.
5. WHEN tautan berhasil ditambahkan, THE LinkManager SHALL mengosongkan kolom input label dan URL, serta mengembalikan fokus ke kolom label.
6. WHEN pengguna menekan tombol hapus (✕) pada sebuah tautan, THE LinkManager SHALL menghapus tautan tersebut dari daftar dan menyimpan perubahan ke LocalStorage.
7. WHEN pengguna mengklik sebuah tautan, THE App SHALL membuka URL tersebut di tab baru dengan atribut `rel="noopener noreferrer"`.
8. WHEN halaman dimuat, THE App SHALL memuat daftar tautan dari LocalStorage dan menampilkannya.

---

### Persyaratan 8: Persistensi Data (LocalStorage)

**User Story:** Sebagai pengguna, saya ingin data saya tetap tersimpan saat halaman diperbarui atau browser ditutup dan dibuka kembali, sehingga saya tidak kehilangan pengaturan dan data yang sudah dimasukkan.

#### Kriteria Penerimaan

1. THE App SHALL menyimpan nama pengguna menggunakan kunci LocalStorage `dashboard_name`.
2. THE App SHALL menyimpan preferensi tema menggunakan kunci LocalStorage `dashboard_theme`.
3. THE App SHALL menyimpan daftar tugas menggunakan kunci LocalStorage `dashboard_todos` dalam format JSON.
4. THE App SHALL menyimpan daftar tautan menggunakan kunci LocalStorage `dashboard_links` dalam format JSON.
5. WHEN data LocalStorage untuk tugas atau tautan tidak valid atau rusak, THE App SHALL menggunakan array kosong sebagai fallback dan tidak menampilkan error ke pengguna.
6. WHEN pengguna mengubah data (tugas, tautan, nama, tema), THE App SHALL menyimpan perubahan ke LocalStorage secara langsung tanpa penundaan.

---

### Persyaratan 9: Aksesibilitas dan Antarmuka

**User Story:** Sebagai pengguna, saya ingin antarmuka yang dapat diakses dan responsif, sehingga dashboard dapat digunakan dengan nyaman di berbagai ukuran layar dan perangkat.

#### Kriteria Penerimaan

1. THE App SHALL menggunakan elemen HTML semantik (`header`, `main`, `section`, `ul`, `li`) untuk struktur konten.
2. THE App SHALL memberikan atribut `aria-label` pada tombol dan elemen interaktif yang tidak memiliki teks label yang jelas.
3. THE App SHALL memberikan atribut `aria-live="polite"` pada elemen yang diperbarui secara dinamis (display timer, pesan error, jumlah tugas).
4. THE App SHALL menggunakan atribut `aria-modal="true"` dan `aria-labelledby` pada elemen NameModal.
5. THE App SHALL menampilkan kartu-kartu widget dalam tata letak grid responsif yang menyesuaikan jumlah kolom berdasarkan lebar layar.
6. WHEN layar memiliki lebar maksimal 600px, THE App SHALL menyesuaikan padding, ukuran font, dan tata letak input untuk tampilan mobile.
