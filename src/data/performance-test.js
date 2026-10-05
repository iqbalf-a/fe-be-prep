/**
 * data/performance-test.js
 * ---------------------------------------------------------------------------
 * "How to Answer as a Performance Test Engineer" — the personal-background
 * section the project brief asks to preserve.
 *
 * The brief is explicit about two things: the positioning must stay honest
 * (professional Performance Test experience, transitioning into development)
 * and the user's development experience must not be exaggerated. Every answer
 * below is written as something the candidate can say truthfully, using real
 * Performance Test work as the evidence instead of inventing development
 * titles or years of experience.
 */

import { p, h4, ul, table, tip, warn, qa, chapter } from './blocks.js';

export const performanceTestChapters = [
  chapter(
    'pte-why-move',
    'Kenapa Pindah dari Performance Test ke Development',
    'P1',
    10,
    ['career transition', 'performance test', 'motivasi', 'self introduction'],
    [
      p('Pertanyaan ini hampir pasti muncul kalau interviewer melihat riwayat Performance Test di profil. Jawabannya harus jujur, spesifik, dan menunjukkan bahwa perpindahan ini keputusan sadar.'),
      p('Hindari tiga jebakan: meremehkan pekerjaan lama, menjanjikan akan menjadi senior engineer dalam tiga bulan, dan menganggap performance test hanya sebagai alat QA.'),
      qa(
        'Kenapa Anda memutuskan pindah dari Performance Test ke development?',
        p('Selama beberapa tahun saya fokus pada performance testing, dan saya menyadari ada batas yang jelas dari pekerjaan itu. Yang membuat saya sadar adalah ketika saya bisa mengukur batas sistem, tetapi tidak bisa memperbaiki penyebabnya. Untuk masalah yang berulang, saya harus mengkoordinasikan tim lain, dan prosesnya lambat. Saya ingin punya kemampuan yang lebih dekat ke masalah, yaitu menulis kode dan memperbaiki akar masalah.'),
        ul(
          p('Yang saya sukai dari performance test: pemecahan masalah, analisis bottleneck, dan membaca sistem secara menyeluruh.'),
          p('Yang jadi dorongan pindah: banyak bottleneck ada di kode dan desain, bukan di konfigurasi test.'),
          p('Cara saya memulai: saya tidak mulai dari nol. Saya sudah paham HTTP, SQL, log, dan arsitektur service dari sisi black-box, dan sekarang saya memperdalam sisi white-box lewat coding.'),
        ),
      ),
      qa(
        'Kenapa perusahaan ini dan role development?',
        p('Saya melihat role ini mengubah temuan performance test menjadi perbaikan kode. Itu jalur yang sedang saya bangun. Saya juga menghargai pengukuran yang bisa dipertanggungjawabkan, karena itu bagian dari cara kerja saya sekarang.'),
      ),
      warn(
        'Jangan berlebihan',
        p('Jangan mengklaim pengalaman development yang tidak ada. Kalau ditanya pengalaman yang belum pernah, jawab apa yang sudah dilakukan: project pribadi, kontribusi, dan proses belajar. Technical test lebih menghargai kandidat yang jujur soal levelnya dan cepat belajar.'),
      ),
      tip(
        'Versi singkat',
        p('Performance test memberi saya cara berpikir sistem. Saya punya pengalaman profesional di sana, dan saya ingin membawa cara berpikir itu ke sisi yang memperbaiki masalah, yaitu development. Saya sadar ini butuh waktu, jadi saya fokus belajar dan mengerjakan project nyata.'),
      ),
    ],
  ),
  chapter(
    'pte-backend-link',
    'Bagaimana Performance Test Berkaitan dengan Backend',
    'P1',
    10,
    ['performance test', 'backend', 'bottleneck', 'latency', 'throughput'],
    [
      p('Hubungan antara performance test dan backend itu nyata dan bisa dibuktikan. Kalau bekerja dengan sistem, hampir selalu ada temuan yang menyentuh kode atau query.'),
      table(
        ['Temuan performance test', 'Akar masalah di backend'],
        [
          ['Response time naik saat data bertambah', 'Query tanpa index atau N+1 query'],
          ['Throughput mendatar saat concurrent user naik', 'Lock kontensi atau connection pool habis'],
          ['P99 jauh lebih tinggi dari rata-rata', 'GC pause, slow query sesekali, atau retry'],
          ['CPU tinggi pada satu service saja', 'Hot loop, serialisasi berlebihan, atau cache miss'],
          ['Waktu naik tajam saat data besar', 'Pagination, sorting, atau agregasi tanpa optimasi'],
        ],
      ),
      p('Poin penting untuk disebut: performance test membuat saya paham apa yang penting bagi user. Saya tahu endpoint mana yang paling dipakai, data mana yang paling besar, dan fitur mana yang paling sensitif terhadap latency. Pengetahuan itu sulit didapat dari code review saja.'),
      qa(
        'Apa yang Anda pelajari dari performance test yang berguna untuk backend?',
        p('Cara mengisolasi bottleneck. Saya belajar memecah masalah secara bertahap: apakah resource-nya CPU, memory, I/O, lock, atau dependency eksternal? Dengan metrics, log, dan tracing saya mencari bagian yang paling berkontribusi. Kebiasaan itu sama dengan yang dipakai saat debugging production backend, dan itu membuat saya tidak langsung menebak penyebab.'),
      ),
    ],
  ),
  chapter(
    'pte-api-db-log',
    'Cara Menjelaskan Pengalaman API, Database, dan Infrastruktur',
    'P1',
    12,
    ['api', 'database', 'log', 'infrastructure', 'jmeter', 'grafana', 'thread group'],
    [
      p('Bagian ini dijawab dengan detail teknis yang nyata, karena pengalaman performance test memang bersinggungan dengan API, database, log, dan infrastruktur.'),
      h4('API'),
      ul(
        p('Membuat skenario test untuk endpoint REST: GET, POST, dan error path, termasuk validasi input, response code, dan konsistensi schema.'),
        p('Mengatur parameter header, cookie, correlation, dan token. Data tiap thread group harus terisolasi supaya hasil tidak saling menimpa.'),
        p('Memahami perbedaan latency antar endpoint dan mana yang masih wajar untuk use case masing-masing.'),
      ),
      h4('Database'),
      ul(
        p('Menyiapkan data test dalam jumlah besar, lalu melihat dampaknya pada query plan, index, dan pertumbuhan tabel.'),
        p('Menguji perilaku database saat koneksi banyak, termasuk connection pool dan lock wait.'),
        p('Membaca slow query log dan menjalankan explain untuk melihat apakah masalahnya di index atau di query.'),
      ),
      h4('Log dan Infrastruktur'),
      ul(
        p('Membaca log aplikasi untuk mencocokkan pola error dengan beban dan waktunya.'),
        p('Memahami JVM: heap, garbage collector, thread, dan connection pool, karena itu sering jadi sumber masalah di aplikasi Java.'),
        p('Menggunakan Grafana atau APM untuk melihat metric selama test berjalan, lalu membandingkannya dengan baseline.'),
      ),
      table(
        ['Yang ditanyakan', 'Jawaban yang jujur dan kuat'],
        [
          ['API', 'Pernah membuat skenario REST test, paham parameter, header, dan validasi response.'],
          ['Database', 'Pernah menyiapkan data besar dan melihat dampaknya ke query plan dan index.'],
          ['Log', 'Rutin memakai log untuk mencocokkan error dengan beban.'],
          ['Infrastruktur', 'Paham CPU, memory, I/O, JVM, dan network sebagai sumber bottleneck.'],
          ['Monitoring', 'Pernah memakai Grafana atau APM untuk membandingkan baseline dan hasil test.'],
        ],
      ),
      tip(
        'Jujur soal tools',
        p('Kalau belum pernah memakai tool tertentu, katakan belum, lalu sebutkan yang mirip yang pernah dipakai. Contoh: belum pernah memakai Kafka di produksi, tapi paham topic, partition, consumer group, dan sudah latihan dengan container lokal. Ini lebih kuat daripada klaim yang tidak bisa dipertahankan.'),
      ),
    ],
  ),
  chapter(
    'pte-bottleneck',
    'Cara Menjelaskan Satu Performance Bottleneck',
    'P1',
    12,
    ['bottleneck', 'root cause', 'analysis', 'troubleshooting', 'result'],
    [
      p('Pilih satu studi kasus nyata dengan angka. Interviewer mencari proses berpikir Anda, bukan hanya hasil akhir.'),
      p('Struktur jawaban: gejala, cara memastikan, daftar penyebab yang disingkirkan, akar masalah, perbaikan, dan hasil setelah perbaikan.'),
      qa(
        'Ceritakan bottleneck yang pernah Anda temukan dan bagaimana mengatasinya.',
        p('Salah satu temuan saya: response time pada halaman checkout naik tidak proporsional ketika jumlah data transaksi bertambah. Dari grafik latency dan query log, hampir semua tambahan waktu ada pada satu endpoint yang mengambil riwayat. Setelah saya periksa query-nya, penyebabnya adalah query tanpa index pada kolom tanggal yang dipakai filter dan sort, sehingga database melakukan full table scan. Setelah saya usulkan composite index dan pagination, response time kembali ke baseline dan beban database turun.'),
        ul(
          p('Yang penting: angka sebelum dan sesudah, dan bagaimana memastikan itu bukan penyebab lain.'),
          p('Mengukur ulang setelah perbaikan, tidak berhenti di asumsi.'),
          p('Kalau perbaikannya belum dikerjakan sendiri, katakan itu dan jelaskan rekomendasinya. Itu jujur dan tetap menunjukkan kemampuan analisis.'),
        ),
      ),
      table(
        ['Tahap', 'Isi jawaban'],
        [
          ['Gejala', 'Endpoint mana, kapan mulai, seberapa besar dampaknya'],
          ['Verifikasi', 'Metrics, log, atau trace mana yang dibaca'],
          ['Kemungkinan', 'Daftar penyebab dan bagaimana mengeliminasi satu per satu'],
          ['Akar masalah', 'Satu penyebab beserta buktinya'],
          ['Perbaikan', 'Yang diubah, siapa yang mengubah, dan konsekuensinya'],
          ['Hasil', 'Angka sebelum dan sesudah, serta cara mengukurnya ulang'],
        ],
      ),
    ],
  ),
  chapter(
    'pte-functional-vs-performance',
    'Functional Bug atau Performance Issue?',
    'P1',
    10,
    ['functional bug', 'performance issue', 'regression', 'classification'],
    [
      p('Pertanyaan ini menguji apakah Anda bisa membedakan kategori masalah, karena keduanya punya prioritas dan alur penanganan yang berbeda.'),
      table(
        ['Aspek', 'Functional bug', 'Performance issue'],
        [
          ['Definisi', 'Perilaku salah dibanding spesifikasi', 'Perilaku benar, tapi terlalu lambat'],
          ['Contoh', 'Total harga salah, validasi tidak jalan', 'Endpoint 8 detik dengan 100 concurrent user'],
          ['Dampak', 'Data atau alur salah', 'User menunggu lama, sistem tidak bisa handle beban nyata'],
          ['Deteksi', 'Test fungsional, QA manual, log error', 'Performance test, APM, monitoring produksi'],
          ['Prioritas', 'Tergantung seberapa besar dampaknya pada kebenaran data', 'Tergantung user impact dan SLA'],
          ['Status', 'Ada hasil yang diharapkan dan hasil sebenarnya', 'Perlu threshold atau SLA sebagai acuan'],
        ],
      ),
      qa(
        'Bagaimana membedakan bug fungsional dan performance issue?',
        p('Cara pertama: apakah perilakunya salah, atau benar tapi tidak memenuhi harapan? Kalau total harga salah, itu bug fungsional. Kalau total harga benar tapi butuh delapan detik, itu performance issue. Cara kedua: apakah masalahnya muncul tanpa beban? Kalau hanya muncul saat concurrent user banyak atau data banyak, kemungkinan besar performance. Cara ketiga: apakah ada threshold atau SLA yang dilanggar? Performance issue biasanya punya angka, sedangkan bug fungsional punya hasil yang diharapkan dan bertentangan dengan kenyataan.'),
      ),
      tip(
        'Contoh yang sering ditanya',
        p('Kalau sebuah endpoint timeout saat 50 concurrent user tapi hanya 1,2 detik saat 5 user, itu performance issue. Kalau endpoint selalu mengembalikan 500 untuk input tertentu, itu bug fungsional. Kalau keduanya terjadi, tangani sisi fungsional dulu supaya pengukuran performance-nya valid.'),
      ),
    ],
  ),
  chapter(
    'pte-honest',
    'Cara Menjawab dengan Jujur tentang Level Pengalaman',
    'P1',
    8,
    ['honesty', 'strengths', 'learning', 'ownership', 'no exaggeration'],
    [
      p('Bagian ini menentukan apakah kandidat dipercaya. Technical test bukan tempat berpura-pura. Yang dicari adalah kesediaan untuk belajar dengan benar dan mau bertanggung jawab.'),
      qa(
        'Apa yang sudah bisa Anda lakukan sekarang?',
        p('Saya sudah cukup nyaman dengan HTTP, REST, SQL dasar, cara membaca log, dan menganalisis masalah performa. Saya sudah menulis beberapa service kecil dan berlatih langsung dengan database, container, dan message broker. Yang belum banyak saya alami adalah produksi pada sistem dengan beban tinggi dan kompleksitas enterprise, dan itu memang bagian yang sedang saya pelajari.'),
      ),
      qa(
        'Apa yang belum Anda kuasai?',
        p('Pengalaman produksi pada sistem berskala besar, terutama hal yang butuh pengalaman nyata: desain idempotency yang sudah battle-tested, strategi partitioning yang terbukti, dan debugging yang melibatkan beberapa service sekaligus. Saya memperlakukannya sebagai area belajar utama. Pendekatan saya selalu sama: mulai dari lokal dengan Docker, ukur, baca dokumentasi, dan lihat kode yang sudah ada.'),
      ),
      qa(
        'Kenapa harus kami hire Anda?',
        p('Karena saya punya cara berpikir terukur yang sudah terbukti selama beberapa tahun, dan sekarang saya mengubahnya menjadi kemampuan menulis kode. Saya cepat belajar karena saya tahu harus mengukur apa, bukan hanya harus memperbaiki apa. Saya juga tidak sungkan berkata belum bisa, dan itu penting untuk tim yang butuh kejelasan.'),
      ),
      ul(
        p('Tunjukkan project pribadi atau kontribusi yang bisa dilihat: repository, laporan sederhana, atau portofolio.'),
        p('Sebutkan belajar yang sedang berjalan: buku, kursus, atau mentor, tapi jangan menjadi daftar yang panjang.'),
        p('Kalau ditawari posisi yang memang sesuai level, terima. Minta target konkret untuk berkembang.'),
      ),
      tip(
        'Formula jawaban',
        p('Pengalaman profesional saya ada di performance test, dan itu sumber kekuatan saya. Target saya adalah backend development, dan saya sudah punya dasar teknis yang relevan. Saya sadar masih ada yang belum saya kuasai, dan saya bekerja dengan cara yang terukur untuk mengisinya. Klaim itu bisa saya pertahankan saat interview maupun saat mengerjakan tugasnya.'),
      ),
    ],
  ),
];
