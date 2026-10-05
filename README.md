# FE/BE Interview Prep

Aplikasi belajar mandiri untuk persiapan technical test dan interview: **JavaScript**, **Frontend (React)**, **Backend (Spring Boot, Kafka, Redis)**, dan **bank pertanyaan interview** yang juga memuat cara memposisikan pengalaman Performance Test Engineer secara jujur.

Seluruh materi diturunkan dari dokumen HTML sumber (`Materi_Persiapan_Technical_Test_JavaScript_BSI_Interactive.html`) dan dikonversi menjadi data terstruktur, lalu dilengkapi dengan topik yang belum ada di dokumen sumber: React, Spring Boot, Kafka, Redis, system design, dan Performance Test Engineer.

Aplikasi 100% berjalan di browser. Tidak ada backend, tidak ada akun, tidak ada request jaringan saat belajar.

## Fitur

- **Empat track**: JavaScript (13 modul, 93 bab), Frontend (4 modul, 15 bab), Backend (11 modul, 44 bab), Interview (9 modul, 18 bab). Total 170 bab.
- **Progres tersimpan di LocalStorage**: bab selesai, checklist latihan, catatan pribadi, dan bab terakhir yang dibaca.
- **Pencarian global** yang mencakup judul, tag, isi tabel, kode, dan isi kartu tanya jawab yang tersembunyi. Case-insensitive, dengan navigasi ke bab hasil dan sorotan pada kata kunci.
- **Tema terang/gelap** yang tersimpan terpisah dari progres, jadi mengganti tema tidak pernah menyentuh data belajar.
- **Syntax highlighting offline** untuk Java, JavaScript, JSX, SQL, YAML, shell, dan JSON, lengkap dengan tombol salin.
- **Kartu tanya jawab** berbentuk `<details>` dari dokumen sumber, plus blok latihan, problem, dan reveal jawaban.
- **Navigasi**: sidebar sticky setinggi viewport di desktop (tetap penuh ke bawah walaupun track-nya sedikit modul), drawer collapsible di mobile, tombol back-to-top, dan shortcut `/` untuk membuka pencarian.
- **Tombol "Tandai selesai" yang jelas tapi tidak mengganggu**: tombol solid bertanda centang di akhir bab, pil ringkas yang muncul di bawah pane baca hanya saat tombol itu di luar layar, plus shortcut `S`.
- **Tampilan**: kolom konten selalu ter-center, panel kode tetap gelap di kedua tema seperti dokumen sumber.
- **Routing hash** sehingga aplikasi bisa di-deploy sebagai file statis di mana saja tanpa rewrite server.

## Tech stack

- React 18 + Vite 6
- Tailwind CSS v4 (`@tailwindcss/vite`), palet diambil dari dokumen sumber
- JavaScript (JSX), tanpa TypeScript
- Tanpa routing library, tanpa state library, tanpa syntax highlighter eksternal

## Tema

Palet warna, nama variabel, dan perilaku panel kode mengikuti dokumen sumber:

| Token | Light (default) | Dark |
| --- | --- | --- |
| `--bg` | `#f4f6fb` | `#0d1117` |
| `--panel` | `#ffffff` | `#161b22` |
| `--ink` | `#1c2330` | `#e6edf3` |
| `--brand` | `#2563eb` | `#60a5fa` |
| `--ok` | `#16a34a` | `#4ade80` |
| `--code` | `#0f172a` | `#010409` |

Token didefinisikan sekali di `src/index.css` lalu dipetakan ke utilitas Tailwind lewat `@theme inline`, sehingga `bg-canvas`, `text-ink`, atau `border-line` otomatis mengikuti `html[data-theme]`. Mode gelap memakai `@custom-variant dark` yang terikat ke atribut data, bukan `prefers-color-scheme`.

**Default adalah light** dan tidak mengikuti preferensi sistem: tema gelap hanya aktif bila pengguna memilihnya lewat tombol di top bar. Nilai tersimpan di `bsi-theme`.

Panel kode sengaja tetap gelap di kedua tema, sama seperti dokumen sumber.

## Instalasi

```bash
npm install
```

## Menjalankan secara lokal

```bash
npm run dev
```

Buka `http://localhost:5173`.

## Build produksi

```bash
npm run build
npm run preview
```

Hasil build ada di `dist/` dan bisa langsung disajikan oleh file server mana pun.

## Deploy ke Vercel

1. Push repository ke GitHub.
2. Di Vercel, pilih **Add New → Project** lalu import repository.
3. Vercel mendeteksi Vite secara otomatis:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy. Tidak ada environment variable yang dibutuhkan.

Karena routing memakai hash (`#/track/js/c1`), tidak perlu rewrite rule sama sekali.

## Verifikasi

```bash
npm run verify          # lint + parity konten + render SSR + build
```

Rinciannya:

| Perintah | Fungsi |
| --- | --- |
| `npm run lint` | ESLint 9 flat config, termasuk plugin React Hooks |
| `npm run verify:content` | Membandingkan hasil migrasi dengan dokumen sumber: jumlah modul, bab, code block, tabel, list, problem, Q&A, checklist, dan urutan bab |
| `npm run verify:render` | Me-render seluruh 217 layar (home, overview tiap track, sidebar tiap modul, seluruh 170 bab, panel pencarian, dan shell aplikasi) dengan `react-dom/server` untuk menangkap block yang tidak ter-render atau prop yang hilang |
| `npm run build` | Build produksi Vite |

Pemeriksaan end-to-end di browser sungguhan:

```bash
npx playwright install chromium   # sekali saja
npm run build
npm run preview                   # terminal terpisah
npm run verify:e2e                # 45 pemeriksaan
```

`verify:e2e` menutup navigasi keempat track, LocalStorage (progres, catatan, checklist, tema), pencarian beserta navigasi hasil dan sorotan, back-to-top, sidebar mobile, pemusatan kolom konten, sidebar yang mengisi tinggi viewport di setiap track, tombol tandai selesai (ukuran ringkas + ikon, state setelah klik, shortcut `S`, pil mengambang yang menyingkir saat tombol utama terlihat), default tema light meski OS dalam mode gelap, serta memastikan tidak ada error konsol.

## Struktur project

```
INITIAL-PROJECT.MD                                   spesifikasi aplikasi
Materi_Persiapan_Technical_Test_..._.html            dokumen sumber (source of truth)

scripts/
  lib/parser.mjs                                     parser HTML tanpa dependency
  lib/source.mjs                                     pemuat sumber + perbaikan markup sumber
  migrate-html.mjs                                   menghasilkan *.generated.js
  verify-parity.mjs                                  verifikasi kesetaraan konten
  smoke-body.mjs / smoke-render.mjs                  render SSR seluruh layar
  browser-check.mjs                                  pemeriksaan end-to-end Playwright

src/
  data/
    javascript.generated.js    13 modul JavaScript dari dokumen sumber
    backend-node.generated.js  3 modul Node.js/Express/SQL dari dokumen sumber
    frontend.js                track React dan keamanan web (ditulis manual)
    spring.js                  8 modul Spring Boot sampai system design
    interview.js               8 kategori pertanyaan interview
    performance-test.js        cara menjawab sebagai Performance Test Engineer
    blocks.js                  constructor singkat untuk content block
    build.js                   normalisasi modul dan bab, indeks pencarian
    catalog.js                 registri tunggal seluruh materi
  components/                  shell, sidebar, top bar, chapter view, renderer block
                              plus ui.jsx (Button, Badge, ProgressBar, ikon inline)
  context/                     StudyContext (progres) dan ThemeContext (tema)
  hooks/                       useHashRoute, usePersistentState
  utils/                       Inline (renderer HTML aman) dan highlight (tokenizer)
  App.jsx, main.jsx
  index.css                    entry Tailwind: token tema, base, primitif konten

src/data/javascript.generated.js dan backend-node.generated.js
  hasil generate — jangan diedit manual. Ubah sumbernya, lalu `npm run migrate`.
```

## Model data

Konten disimpan sebagai data, bukan JSX, supaya komponen hanya tinggal merender. Satu bab punya bentuk berikut:
```js
{
  id: 'sp3-transactional',
  title: '@Transactional: Cara Kerja dan Jebakan',
  priority: 'P1',        // P1 wajib, P2 sering, P3 tambahan
  minutes: 12,
  tags: ['@transactional', 'proxy', 'rollback'],
  blocks: [ /* p, h4, code, ul, ol, table, quote, qa, reveal, problem, checklist, group */ ],
}
```

`src/data/build.js` menambah `no`, `plainTitle`, dan `searchText` secara otomatis. Semua teks yang mengandung penandaan inline melewati `src/utils/inline.jsx`, yang hanya mengizinkan `<code>`, `<strong>`, `<em>`, dan `<br>` — tidak ada `dangerouslySetInnerHTML`.

## Migrasi konten

```bash
npm run migrate
```

Script membaca dokumen sumber, memperbaikinya di memori, lalu menulis ulang dua file `*.generated.js` dan `scripts/source-inventory.json`. Setelah itu, selalu jalankan `npm run verify:content` untuk memastikan tidak ada materi yang hilang.

## LocalStorage

| Key | Isi |
| --- | --- |
| `bsi-js-interview-v10` | `{ completed, checklists, notes, lastChapter }` |
| `bsi-theme` | `"light"` atau `"dark"` |

Bentuk key progres sengaja sama dengan dokumen sumber, sehingga progres yang sudah ada tidak hilang saat migrasi. Chord yang sudah tidak ada di katalog dibersihkan otomatis saat aplikasi dimuat.

## Future improvements

- Code-split per track agar bundel awal lebih kecil (sekarang sekitar 170 kB gzip, sebagian besar data).
- Import dan export progres sebagai file JSON untuk pindah perangkat.
- Mode latihan dengan timer dan skor per bab.
- Checklist readiness per perusahaan atau per role.
- Tes unit untuk `normalizeModules` dan parser.

## Catatan

Materi ditulis sebagai bahan belajar, bukan dokumentasi produksi. Untuk keputusan teknis di kode production, selalu validasi dengan dokumentasi framework terbaru.
