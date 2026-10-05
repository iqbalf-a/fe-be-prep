/**
 * data/interview.js
 * ---------------------------------------------------------------------------
 * Interview track: predicted technical-test questions, grouped exactly as the
 * project brief requires (Frontend, Backend, JavaScript, Security, Database,
 * Kafka/Redis, System Design, Personal Experience / Background).
 *
 * The source document keeps 18 question/answer cards in JavaScript module 11.
 * Those stay in javascript.generated.js; this file adds the predicted questions
 * the brief lists on top of them, so the source material is read, not repeated.
 *
 * Each answer shape: question, compact answer, optional key points. `tip`
 * blocks hold the short scripted version worth memorising.
 */

import { p, ul, ol, table, tip, qa, chapter, module } from './blocks.js';

export const interviewSections = [
  module(
    'iv-fe',
    'IV1',
    'Frontend Interview',
    'React, rendering, hooks, forms, dan API state.',
    'Fokus technical test',
    [
      chapter(
        'iv-fe-render',
        'React Re-render, Effect, dan Referential Equality',
        'P1',
        14,
        ['useeffect', 'rerender', 'object.is', 'reference equality', 'state vs props', 'key', 'cleanup'],
        [
          p('Topik di bawah paling sering muncul di technical test React. Jawab dengan mekanisme, bukan definisi: sebutkan apa yang memicu, kenapa terjadi, dan apa konsekuensinya.'),
          qa(
            'Kenapa useEffect jalan lagi?',
            p('Effect berjalan setelah commit. Setiap render membuat effect baru, lalu React menjalankan lagi kalau nilai pada dependency array berubah. Perubahan state atau props dari parent hampir selalu mengubah referensi, jadi effect ikut jalan lagi. Di development, StrictMode sengaja menjalankan effect dua kali supaya bug pada cleanup cepat ketahuan.'),
            ul(
              p('Effect bukan untuk menyamakan state dengan props. Untuk itu cukup hitung di render.'),
              p('Effect yang menulis state bisa membuat loop: effect, setState, render, effect.'),
              p('Kalau nilai tidak dipakai di luar effect, pindahkan ke dalam effect daripada menyimpannya di state.'),
            ),
          ),
          qa(
            'Kenapa perlu dependency array?',
            p('Dependency array membuat effect hanya berjalan ulang saat nilai yang terdaftar berubah. Tanpa array, effect berjalan setelah setiap render. Array juga membuat dependensi eksplisit: nilai yang dibaca di dalam effect harus nama-nya muncul di array. ESLint plugin react-hooks menegakkan aturan ini.'),
          ),
          qa(
            'Bagaimana React membandingkan nilai di dependency array?',
            p('React memakai Object.is, dengan dua pengecualian. Object.is(NaN, NaN) dianggap sama, dan +0 serta -0 dianggap berbeda. Perbandingan untuk object, function, dan array bersifat referensial, bukan membandingkan isi. Makanya nilai yang dibuat inline di render selalu dianggap berubah.'),
          ),
          qa(
            'State atau props?',
            p('Props datang dari parent dan read-only dari sisi child. State milik komponen sendiri dan memicu render. Kalau nilainya berubah tanpa ada yang mengetahuinya dari luar, itu state. Kalau parent harus bisa mengubahnya, naikkan ke parent sebagai props. Jangan menyalin props menjadi state kecuali memang state awal yang dimiliki komponen.'),
          ),
          qa(
            'Kapan pakai useMemo dan useCallback?',
            p('useMemo menyimpan hasil perhitungan yang mahal. useCallback menyimpan referensi fungsi. Keduanya berguna kalau referensinya benar-benar dipakai sebagai dependency, nilai context, atau argumen memoized component. Hook ini sendiri punya biaya, jadi jangan dipakai untuk perhitungan sepele. Kalau perhitungannya murah, tulis langsung di render.'),
            p('Catatan penting: memoization bukan pengganti memindahkan state lebih dekat ke tempat yang memakainya. Mengubah struktur state sering lebih efektif daripada membungkus segalanya di useMemo.'),
          ),
          qa(
            'Apa itu stale closure?',
            p('Callback yang dibuat di render lama masih memakai nilai dari render itu. Kalau nilainya berubah di render berikutnya, closure lama tetap memegang nilai lama. Contoh klasik: setInterval yang selalu membaca nilai awal karena effect tidak membaca state itu. Solusinya: masukkan nilai ke dependency array, atau pakai functional update setState(prev => next) karena itu menerima nilai terbaru.'),
          ),
          qa(
            'Kapan cleanup wajib?',
            p('Setiap effect yang membuat resource perlu cleanup: subscription, timer, event listener, request network, atau observer. Cleanup membatalkan atau berhenti berlangganan saat komponen unmount atau saat effect berjalan ulang, supaya listener tidak menumpuk dan tidak ada setState pada komponen yang sudah hilang.'),
            p('Return function dari useEffect selalu berarti cleanup. Untuk logika async, gunakan AbortController supaya request lama dibatalkan saat effect berikutnya berjalan.'),
          ),
          qa(
            'Kenapa key penting, dan kenapa index berbahaya?',
            p('key memberi identitas stabil antar render. React memakainya untuk mencocokkan element lama dengan element baru. Dengan index, urutan data berubah membuat state ikut pindah ke baris yang salah. Input yang sedang diketik bisa tiba-tiba berisi nilai baris lain. Pakai key yang stabil: id dari data atau nama field yang unik.'),
          ),
          qa(
            'Controlled atau uncontrolled input?',
            p('Controlled berarti nilai input berasal dari state React, jadi React adalah sumber kebenaran dan validasi bisa dilakukan sebelum submit. Uncontrolled berarti input mengelola nilainya sendiri lewat ref atau form. Uncontrolled menghasilkan render lebih sedikit dan cocok untuk form besar atau integrasi pihak ketiga. Controlled lebih mudah dikontrol dan dites.'),
          ),
          qa(
            'Bagaimana menangani loading, error, dan data kosong?',
            p('Pisahkan empat state secara eksplisit: loading, error, data, dan empty. Ambil data di effect dengan AbortController supaya request lama tidak menimpa data baru, dan cegah setState setelah unmount. Untuk error, tampilkan aksi yang jelas seperti tombol coba lagi. Jangan hanya mengandalkan flag loading yang awalnya selalu false.'),
          ),
          tip(
            'Cara menjawab soal useEffect',
            p('Jangan mulai dari definisi. Mulai dari: effect berjalan setelah commit, dan berjalan lagi kalau referensi pada dependency array berubah menurut Object.is. Baru jelaskan konsekuensinya, lalu sebutkan bahwa nilai yang dibuat inline di render selalu berubah.'),
          ),
        ],
      ),
    ],
  ),
  module(
    'iv-be',
    'IV2',
    'Backend Interview',
    'Spring Boot, transaction, persistence, resilience, observability.',
    'Fokus technical test',
    [
      chapter(
        'iv-be-spring',
        'Spring Core: IoC, Layering, dan Annotations',
        'P1',
        12,
        ['ioc', 'di', 'layering', 'dto vs entity', '@valid', '@controlleradvice'],
        [
          qa(
            'Jelaskan IoC dan DI, lalu constructor atau field injection?',
            p('IoC berarti pembuatan objek diserahkan ke container Spring. DI adalah mekanismenya: container menyuntikkan dependency lewat constructor. Saya pilih constructor injection karena dependency menjadi final, object otomatis fully constructed, dan unit test cukup new OrderService(fakeRepo) tanpa framework mocking. Field injection merusak encapsulation, menyulitkan test, dan menyembunyikan circular dependency sampai runtime.'),
          ),
          qa(
            'Kenapa ada Controller, Service, dan Repository?',
            p('Pemisahan responsibility: controller menangani concern HTTP, service menangani business rule dan orkestrasi, repository menangani akses data. Aturannya, controller tidak boleh menulis query dan repository tidak boleh mengambil keputusan bisnis. Service ada supaya aturan bisnis bisa dipakai ulang dan dites tanpa HTTP.'),
          ),
          qa(
            'Kenapa perlu DTO, tidak bisa kirim entity langsung?',
            p('Entity mengikuti skema database, sedangkan DTO mengikuti kebutuhan consumer. Kalau saya kirim entity, saya membocorkan struktur internal dan kolom yang tidak boleh dipublikasikan. Serialisasi entity juga bisa memicu lazy loading di luar transaction. DTO membuat penambahan field baru tidak breaking, dan membatasi field mana yang boleh masuk dari payload.'),
          ),
          qa(
            'Apa bedanya @Valid dan @Validated?',
            p('@Valid adalah trigger validasi cascade dari Bean Validation. Dipakai di @RequestBody dan juga pada field object atau item di dalam collection. @Validated dipakai pada level class untuk memvalidasi parameter method seperti @RequestParam dan @PathVariable, serta untuk memilih validation group. Keduanya bukan pengganti validasi bisnis: cek seperti email sudah terdaftar butuh database, jadi dilakukan di service.'),
          ),
          qa(
            'Bagaimana menangani exception secara global?',
            p('Satu @RestControllerAdvice dengan @ExceptionHandler per jenis exception, dipetakan ke status yang tepat. 400 untuk format salah, 404 untuk tidak ada, 403 untuk tidak berwenang, 409 untuk konflik, 422 untuk semantik tidak valid, dan 500 untuk bug. Semua response menyertakan correlation ID. Fallback 500 hanya mengembalikan pesan generik dan mencatat detailnya di log, supaya pesan database atau stack trace tidak bocor ke client.'),
          ),
          qa(
            'Anotasi controller apa yang penting hafal?',
            p('@RestController untuk JSON. @RequestMapping dengan @GetMapping sampai @DeleteMapping untuk mapping route. @PathVariable untuk path, @RequestParam untuk query, @RequestBody untuk payload, @RequestHeader untuk header, @ResponseStatus untuk status sukses. Yang sering dilupakan: @RequestBody membalas 400 otomatis kalau JSON rusak, dan DELETE kedua kali boleh mengembalikan 404 tanpa itu dianggap bug.'),
          ),
          qa(
            'Apa kelemahan microservices?',
            p('Microservices memindahkan masalah dari dalam proses ke jaringan. Network bisa gagal, sebagian service bisa gagal, dan data akhirnya konsisten. Konsekuensi nyatanya: transaksi lintas service harus dibongkar menjadi saga dengan kompensasi, observability jadi wajib karena satu request menyentuh banyak service, dan deployment jadi banyak pipeline. Karena itu saya mulai dari monolith modular dan memecah hanya dengan alasan yang terukur.'),
          ),
          qa(
            'REST API: method dan status code yang benar?',
            p('GET aman dan idempotent dengan status 200. POST membuat resource dengan 201 dan header Location, atau 202 kalau diproses asinkron. PUT mengganti seluruh resource dan idempotent. PATCH mengganti sebagian field. DELETE idempotent, boleh 204 atau 404 pada panggilan kedua. Status code adalah bagian dari kontrak: 400 format salah, 401 belum terautentikasi, 403 tidak berwenang, 404 tidak ada, 409 konflik, 422 semantik tidak valid, 429 rate limit, 500 kesalahan server.'),
          ),
        ],
      ),
      chapter(
        'iv-be-transaction',
        'Transaction dan Persistence',
        'P1',
        12,
        ['@transactional', 'propagation', 'isolation', 'n+1', 'locking', 'optimistic', 'pessimistic'],
        [
          qa(
            'Apa itu @Transactional dan apa jebakannya?',
            p('Annotation itu membuka transaksi di sekitar method, commit saat return, dan rollback saat RuntimeException. Jebakan utamanya: Spring memakai proxy, jadi tidak ada transaksi untuk method private, static, final, atau self-invocation dari method lain di kelas yang sama. Rollback default hanya berlaku untuk unchecked exception, sedangkan checked exception perlu rollbackFor. Dan jangan menaruh panggilan HTTP ke service lain di dalam boundary transaksi, karena lock database ditahan selama menunggu respons jaringan.'),
          ),
          qa(
            'Jelaskan transaction propagation.',
            p('REQUIRED adalah default: ikut transaksi yang ada, atau buat baru kalau tidak ada. REQUIRES_NEW selalu membuat transaksi baru dan menunda yang luar; dipakai untuk audit log yang harus tetap tersimpan walau pemanggil rollback. SUPPORTS ikut kalau ada. MANDATORY wajib ada, kalau tidak error. NOT_SUPPORTED berjalan tanpa transaksi. NEVER wajib tanpa transaksi. NESTED memakai savepoint untuk rollback sebagian saja.'),
            p('Jebakan yang sering ditanya: inner transaction REQUIRED menandai rollback-only lalu exception-nya di-catch. Transaksi luar tetap gagal saat commit. Solusinya REQUIRES_NEW, noRollbackFor, atau TransactionTemplate dengan propagation terpisah.'),
          ),
          qa(
            'Isolation level dan pencegahan lost update?',
            p('READ COMMITTED mencegah dirty read, tapi non-repeatable read dan lost update masih mungkin. REPEATABLE READ memberi satu snapshot per transaksi; phantom masih mungkin terjadi. SERIALIZABLE mencegah semuanya, tapi throughput turun. Untuk inventori, isolation saja tidak cukup: saya pakai optimistic locking dengan @Version supaya update yang versinya sudah basi gagal, atau SELECT FOR UPDATE untuk mengunci baris. Pilih selalu level atau lock paling ringan yang memenuhi kebutuhan.'),
          ),
          qa(
            'Apa itu N+1 query dan bagaimana mengatasinya?',
            p('N+1 terjadi saat satu query mengambil parent, lalu tiap akses relasi memicu query tambahan per parent: satu query untuk daftar, lalu satu per item. Deteksi lewat SQL logging atau statistik Hibernate. Solusinya @EntityGraph atau JOIN FETCH untuk relasi yang dipakai, @BatchSize untuk collection besar, dan DTO projection untuk list endpoint karena paling hemat dan tidak hydrate entity sama sekali.'),
          ),
          qa(
            'Optimistic atau pessimistic locking?',
            p('Optimistic memakai kolom @Version dan menolak write kalau versi sudah berubah. Cocok kalau konflik jarang dan reader banyak, karena tidak memblokir. Pessimistic memakai lock baris di database: cocok kalau konflik sering dan satu writer per data, tetapi lock ditahan selama transaksi dan menurunkan throughput. Keduanya wajib punya batas retry dan batas waktu agar request tidak menggantung.'),
          ),
          qa(
            'Bagaimana membuat halaman deep tidak melambat?',
            p('OFFSET/LIMIT memaksa database membaca dan membuang semua baris yang dilewati, jadi makin dalam makin lambat dan tidak stabil saat data berubah. Keyset pagination memfilter dengan WHERE (created_at, id) < nilai terakhir, memakai index range scan dan biaya konstan. Urutan sort juga harus total order: tambahkan kolom unik sebagai tie-breaker supaya satu item tidak muncul dua kali antar halaman.'),
          ),
        ],
      ),
      chapter(
        'iv-be-resilience',
        'Resilience, Observability, dan Communication',
        'P1',
        10,
        ['retry', 'timeout', 'circuit breaker', 'sync vs async', 'observability', 'metrics', 'tracing'],
        [
          qa(
            'Kapan retry, dan apa bahayanya?',
            p('Retry hanya untuk error transient seperti timeout atau 503, dan hanya untuk operasi idempotent atau yang punya idempotency key. Bahayanya retry storm: kalau satu database lambat, semua aplikasi retry serempak, database makin terbebani, lalu semuanya retry lagi. Mitigasinya exponential backoff dengan jitter, retry budget, circuit breaker, dan timeout di setiap lapisan.'),
          ),
          qa(
            'Jelaskan circuit breaker.',
            p('Circuit breaker punya tiga state. CLOSED: lintas normal sambil menghitung failure rate. OPEN: semua request ditolak tanpa memanggil service tujuan, supaya sistem yang sakit tidak dibebani lagi. HALF_OPEN: setelah menunggu, sebagian kecil request diizinkan sebagai tes, lalu kembali ke CLOSED kalau sukses. Inilah yang membedakan pola ini dari sekadar retry, dan membuat retry berhenti saat breaker OPEN.'),
          ),
          qa(
            'Synchronous atau asynchronous?',
            p('Sinkron kalau user menunggu jawabannya dan sistem butuh kepastian sekarang, misalnya validasi stok atau pembuatan payment intent. Asinkron lewat event untuk pekerjaan yang tidak perlu ditunggu: email, laporan, notifikasi, sink analitik. Pola hibrida paling umum: request utama sinkron supaya UX jelas, efek sampingnya jadi event. Risikonya terlalu banyak panggilan sinkron berantai: latency dijumlahkan dan satu service lambat menggagalkan semuanya.'),
          ),
          qa(
            'Bagaimana debug masalah production?',
            p('Mulai dari metrics: endpoint mana yang naik, jam berapa, p99 atau error rate. Lalu trace untuk menemukan span yang lambat dan urutan panggilan lintas service. Terus log terstruktur dengan correlation ID untuk melihat detail event di service yang tepat. Kalau masalahnya langka, naikkan sampling sementara atau pakai feature flag untuk mereproduksi pada user yang sama.'),
          ),
          qa(
            'Metric apa yang wajib dipantau?',
            p('RED per endpoint: Rate, Error rate, dan Duration. Duration pakai percentile atau histogram, bukan rata-rata, karena rata-rata menutupi tail latency. Lalu saturasi: koneksi pool, thread pool, queue depth, CPU, memory, replication lag. Dan business counter seperti order gagal atau payment ditolak, yang sering lebih berguna daripada HTTP error rate.'),
          ),
          qa(
            'Apa itu idempotency dan di mana dibutuhkan?',
            p('Idempotent berarti operasi yang sama bisa diulang tanpa efek tambahan. DIBUTUHKAN di dua tempat. Di server untuk create order atau payment, lewat Idempotency-Key yang disimpan bersama hasil response sehingga retry mengembalikan response yang sama. Di consumer Kafka, karena at-least-once pasti menghasilkan duplikasi. Di database, conditional update dan upsert dengan natural key adalah pola idempotent yang paling sederhana.'),
          ),
          table(
            ['Pola', 'Kapan dipakai'],
            [
              ['Timeout', 'Selalu, di setiap panggilan keluar'],
              ['Retry + backoff + jitter', 'Error transient, operasi idempotent'],
              ['Circuit breaker', 'Dependency sering gagal supaya dihentikan sementara'],
              ['Bulkhead', 'Batasi request konkuren per dependency'],
              ['Rate limit', 'Lindungi dari abuse dan lonjakan tak terduga'],
              ['Fallback dan degraded response', 'Jaga UX tetap berguna saat dependency down'],
            ],
          ),
          tip(
            'Jawab singkat soal resilience',
            p('Urutannya: timeout dulu, baru retry dengan backoff dan jitter, lalu circuit breaker supaya retry berhenti saat dependency sakit. Semua request keluar punya deadline total yang diteruskan ke lapisan bawah, dan setiap response menyertakan correlation ID supaya bisa ditelusuri.'),
          ),
        ],
      ),
    ],
  ),
  module(
    'iv-js',
    'IV3',
    'JavaScript Interview',
    'Bahasa, asynchronous, dan browser.',
    'Fokus technical test',
    [
      chapter(
        'iv-js-language',
        'Bahasa: Scope, this, dan Prototype',
        'P1',
        12,
        ['var let const', 'hoisting', 'tdz', 'closure', 'this', 'arrow function', 'prototype', 'spread rest', 'destructuring'],
        [
          p('Source document menyediakan 18 kartu tanya jawab di modul JavaScript 11. Kartu itu tetap menjadi rujukan utama untuk let-const-var, == versus ===, hoisting, TDZ, this, map/filter/reduce, spread-rest, event loop, async-await, 401-403-404, authentication versus authorization, shallow versus deep copy, CJS versus ESM, Object.keys, dan immutability. Berikut tambahan yang sering muncul.'),
          qa(
            'var, let, dan const bedanya?',
            p('var punya function scope dan di-hoisting sebagai undefined. let dan const punya block scope dan mengalami TDZ: diakses sebelum deklarasi selesai akan ReferenceError. const tidak berarti nilai tidak bisa berubah, hanya binding-nya tidak bisa ditugaskan ulang; isi object atau array masih bisa dimutasi.'),
          ),
          qa(
            'Closure itu apa?',
            p('Closure adalah fungsi yang masih mengingat variabel dari scope tempat ia dibuat, walaupun scope itu sudah selesai dijalankan. Ini dasar dari counter, private field, dan cache. Konsekuensinya: variabel yang ditangkap tidak bisa di garbage collect selama closure hidup, jadi jangan menyimpan data besar di dalam closure.'),
          ),
          qa(
            'Aturan this?',
            p('this ditentukan oleh cara fungsi dipanggil. Sebagai method, this adalah objek itu. Sebagai function biasa, this undefined di mode strict. Dipanggil dengan new, this adalah object baru. Arrow function tidak punya this sendiri dan memakai this dari scope tempat ia dibuat. Karena itu arrow function tidak bisa dipakai sebagai method yang butuh this, dan tidak punya arguments maupun prototype.'),
          ),
          qa(
            'Prototype chain dan class?',
            p('Setiap object JavaScript punya prototype. Akses properti berjalan menyusuri prototype chain sampai null. Method di prototype dipakai bersama oleh semua instance. Class di JavaScript adalah syntactic sugar di atas prototype: method yang dideklarasikan di dalam class ada di prototype, sedangkan property yang di-assign di constructor ada di instance sendiri.'),
          ),
          qa(
            'Destructuring, spread, dan rest?',
            p('Destructuring memecah object atau array menjadi variabel, dengan default, rename, dan nested. Spread membuat salinan object atau array, sedangkan rest mengumpulkan sisanya. Perhatikan: spread hanya shallow, jadi object bersarang masih berbagi reference yang sama.'),
          ),
          qa(
            'Shallow copy versus deep copy?',
            p('Shallow copy membuat object baru, tetapi properti bersarang masih menunjuk object yang sama, jadi mengubah nested mengubah data asli. Deep copy membuat seluruh graf object baru; cara paling sederhana sekarang adalah structuredClone, atau JSON.parse(JSON.stringify(data)) untuk data JSON-safe. Untuk logika bisnis, immutable update dengan spread tetap paling aman.'),
          ),
          qa(
            'map, filter, dan reduce()?',
            p('map mengubah setiap elemen dan mengembalikan array baru dengan panjang sama. filter menyaring, jadi panjangnya bisa berubah. reduce melipat array menjadi satu nilai, misalnya total atau object pengelompokan. Karena map dan filter mengembalikan array baru, rantainya aman untuk immutable update: setItems(prev => prev.filter(...).map(...)).'),
          ),
          qa(
            'map versus forEach?',
            p('map mengembalikan array baru, sedangkan forEach hanya iterasi dan mengembalikan undefined. Kalau butuh nilai balik atau ingin menyusunnya dengan filter dan reduce, pakai map. forEach hanya untuk efek samping seperti logging atau animasi.'),
          ),
          qa(
            'Apa itu event loop?',
            p('JavaScript single-thread punya call stack dan heap. Kode synchronous berjalan di call stack. Saat menemukan operasi asynchronous, callback-nya masuk ke task queue atau microtask queue. Setelah call stack kosong, event loop memproses semua microtask sampai habis, baru satu task dari task queue, lalu mengulang. Continuation async-await masuk microtask queue, jadi urutannya lebih cepat dari setTimeout 0.'),
          ),
          qa(
            'Promise.all, allSettled, race, atau any?',
            p('Promise.all menolak begitu ada satu yang reject, dan mengembalikan array hasil kalau semuanya berhasil. allSettled menunggu semua lalu mengembalikan status per promise; dipakai saat mau tahu hasil meskipun ada yang gagal. race mengembalikan yang pertama selesai, sukses atau gagal. any mengembalikan yang pertama sukses. Ingat: Promise.all menolak lebih dulu, jadi request yang lambat tetap berjalan walau tidak ada yang memakai hasilnya.'),
          ),
          qa(
            'Debounce versus throttle?',
            p('Debounce menunda eksekusi sampai pengguna berhenti memicu selama waktu tunggu, jadi satu panggilan untuk satu rangkaian event. Throttle membatasi frekuensi: fungsi berjalan paling sering sekali per interval, jadi berguna untuk scroll, resize, dan drag. Untuk input pencarian saya pakai debounce, untuk scroll handler saya pakai throttle.'),
          ),
          qa(
            'Event bubbling versus capturing?',
            p('Bubbling adalah aliran default dari target ke atas menuju document lalu window. Capturing sebaliknya, dari window turun ke target. addEventListener punya opsi useCapture. Praktik umum: tulis handler di parent untuk event yang|delegasikan, dan panggil stopPropagation ketika memang tidak ingin event naik.'),
          ),
          qa(
            'Kenapa imutabilitas penting di React?',
            p('React mendeteksi perubahan dengan membandingkan reference. Mutasi objek atau array di tempat tidak mengubah reference, jadi React tidak tahu harus render ulang dan state jadi tidak sinkron dengan yang tampil. Karena itu setState selalu memakai objek baru: spread, filter, atau map.'),
          ),
          qa(
            'fetch atau Axios?',
            p('fetch adalah API bawaan browser dan Node modern, berbasis Promise, tapi tidak menolak pada status 4xx atau 5xx, jadi response.ok harus dicek manual. Axios menambah interceptor, transform JSON otomatis, dan melempar error pada status gagal, jadi lebih ringkas di aplikasi. Keduanya butuh AbortController untuk membatalkan request.'),
          ),
        ],
      ),
    ],
  ),
  module(
    'iv-sec',
    'IV4',
    'Security Interview',
    'XSS, CSRF, CORS, dan autentikasi.',
    'Sering ditanyakan',
    [
      chapter(
        'iv-sec-web',
        'XSS, CSRF, dan CORS',
        'P1',
        12,
        ['xss', 'csrf', 'cors', 'sanitize', 'csp', 'same site', 'preflight'],
        [
          qa(
            'Apa itu XSS dan bagaimana cegahnya?',
            p('XSS terjadi ketika data penyerang masuk ke HTML atau dieksekusi sebagai JavaScript. Pencegahan utamanya adalah output encoding sesuai konteks: encode untuk HTML, untuk atribut, untuk URL, dan untuk JavaScript. Aplikasi React aman secara default karena tidak menginterpret HTML mentah, tetapi tetap berbahaya di dangerouslySetInnerHTML. Kalau memang perlu menerima HTML dari user, sanitasi seperti DOMPurify, lalu tambahkan Content Security Policy sebagai lapisan kedua.'),
            p('Tiga jenis utamanya: stored, reflected, dan DOM-based. Stored dan reflected melewati server, sedangkan DOM-based sepenuhnya di sisi client.'),
          ),
          qa(
            'Apa itu CSRF dan bagaimana mencegahnya?',
            p('CSRF memanfaatkan browser yang otomatis mengirim cookie ke domain yang sedang dikunjungi, sehingga request dari situs lain bisa terotorisasi. Pencegahan utama sekarang: SameSite=Lax atau Strict pada cookie sesi, CSRF token pada request yang mengubah state, dan pemeriksaan Origin atau Referer. SameSite=Lax masih mengirim cookie untuk GET, jadi operasi yang mengubah state harus memakai POST.'),
          ),
          qa(
            'CORS itu apa, dan kenapa bukan mekanisme keamanan?',
            p('CORS adalah mekanisme browser yang membatasi resource lintas origin berdasarkan header yang dikembalikan server. Browser mengirim preflight OPTIONS untuk request yang tidak simple, lalu server harus mengembalikan Access-Control-Allow-Origin dan header terkait. CORS melindungi user di sisi browser; panggilan server ke server sama sekali tidak terpengaruh. Karena itu CORS bukan pengganti autentikasi atau otorisasi.'),
          ),
          qa(
            'Authentication atau authorization?',
            p('Authentication menjawab siapa Anda: username dan password, MFA, atau SSO, yang menghasilkan identity dan credential seperti token. Authorization menjawab apa yang boleh Anda lakukan: role, permission, atau policy yang dievaluasi terhadap resource. Token hanya membawa klaim; keputusan akses tetap diambil di server.'),
          ),
          table(
            ['Ancaman', 'Pencegahan utama'],
            [
              ['XSS', 'Output encoding, sanitasi, CSP, React tanpa HTML mentah'],
              ['CSRF', 'SameSite cookie, CSRF token, cek Origin'],
              ['SQL injection', 'Prepared statement atau parameter binding, bukan string concat'],
              ['IDOR', 'Cek kepemilikan resource di dalam query, bukan hanya dengan token'],
              ['Credential bocor', 'Hash password dengan bcrypt atau Argon2, salt otomatis'],
              ['Token dicuri', 'Waktu hidup pendek, refresh token, httpOnly cookie'],
              ['Brute force', 'Rate limit per akun dan per IP, lockout, MFA'],
              ['Data in transit', 'TLS untuk semua hop, HSTS'],
            ],
          ),
          tip(
            'Jawab singkat',
            p('Untuk XSS: output encoding atau sanitasi. Untuk CSRF: SameSite plus CSRF token. Otorisasi selalu dicek di server. CORS hanya dukungan browser, jadi tidak boleh jadi satu-satunya pertahanan.'),
          ),
        ],
      ),
      chapter(
        'iv-sec-token',
        'JWT, Password Storage, dan API Security',
        'P2',
        10,
        ['jwt', 'access token', 'refresh token', 'bcrypt', 'argon2', 'rbac', 'secrets'],
        [
          qa(
            'Bagaimana JWT bekerja dan apa risikonya?',
            p('JWT berisi header, payload berisi klaim, dan signature. Server memverifikasi signature untuk memastikan token tidak diubah, lalu membaca klaim seperti subject, role, dan expiry. Karena payload tidak terenkripsi, jangan menaruh data sensitif di dalamnya. Risikonya token yang bocor tetap berlaku sampai kedaluwarsa, jadi access token dibuat berumur pendek dan dikombinasikan dengan refresh token yang bisa dicabut.'),
          ),
          qa(
            'Di mana token disimpan?',
            p('Ada dua pilihan umum. Cookie httpOnly dengan SameSite aman dari XSS pencuri token, tetapi rentan CSRF dan butuh CSRF token. LocalStorage atau sessionStorage tidak dikirim otomatis sehingga bebas CSRF, tetapi bisa dicuri kalau ada XSS. Praktisnya: httpOnly cookie untuk web app dengan proteksi CSRF, dan access token berumur pendek untuk mobile atau API client.'),
          ),
          qa(
            'Bagaimana menyimpan password dengan aman?',
            p('Hash dengan algoritma lambat yang disengaja: bcrypt, scrypt, atau Argon2id. Salt otomatis per password supaya dua password sama menghasilkan hash berbeda, dan pepper bisa ditambahkan dari secret. Yang tidak boleh: MD5 atau SHA-1 tanpa salt, karena terlalu cepat dan bisa dipecah dengan GPU.'),
          ),
          qa(
            'Bagaimana menangani otorisasi API?',
            p('Autentikasi di filter atau interceptor, otorisasi dekat dengan akses resource. Untuk kasus umum cukup validasi JWT, cek role, dan cek kepemilikan resource di dalam query yang sama, supaya user tidak bisa membaca data orang lain hanya dengan menebak id. Untuk kebutuhan lebih rumit pakai policy-based authorization atau permission per resource.'),
            p('Semua endpoint default deny, dan akses antar service internal tetap butuh autentikasi. Jangan dipercaya begitu saja hanya karena berasal dari jaringan internal.'),
          ),
        ],
      ),
    ],
  ),
  module(
    'iv-db',
    'IV5',
    'Database Interview',
    'Index, JOIN, ACID, dan query lambat.',
    'Wajib dikuasai',
    [
      chapter(
        'iv-db-core',
        'Index, JOIN, dan Slow Query',
        'P1',
        12,
        ['index', 'composite index', 'leftmost prefix', 'join', 'acid', 'explain', 'normalization'],
        [
          qa(
            'Bagaimana index bekerja dan kenapa composite index berurutan?',
            p('Index umumnya B-tree: seimbang, mendukung pencarian equality dan range scan sekaligus, serta menyimpan kolom terurut. Composite index mengikuti aturan leftmost prefix: query bisa memakai kolom pertama saja, atau kolom pertama dan kedua, tapi tidak bisa melompat ke kolom kedua. Karena itu kolom yang lebih selektif sering diletakkan lebih dulu, dan kolom untuk sorting diletakkan setelah kolom equality.'),
          ),
          qa(
            'Kapan sebuah index tidak dipakai?',
            p('Query yang mengambil sebagian besar baris biasanya lebih baik memakai sequential scan, sehingga index justru menambah I/O tanpa manfaat. Index juga tidak dipakai untuk LIKE yang diawali wildcard, untuk kolom yang selalu NULL, atau kalau urutan kolom composite tidak cocok. Cara memastikan: baca EXPLAIN ANALYZE dan lihat apakah plan memakai index yang diharapkan.'),
          ),
          qa(
            'Apa bedanya INNER JOIN dan LEFT JOIN?',
            p('INNER JOIN hanya menghasilkan baris yang cocok di kedua tabel, jadi dipakai untuk relasi wajib seperti order dan customer. LEFT JOIN mempertahankan semua baris tabel kiri dan mengisi kolom kanan dengan NULL kalau tidak ada pasangan, jadi dipakai untuk relasi opsional seperti order yang belum dibayar. Perhatikan: kondisi di WHERE pada kolom tabel kanan mengubah LEFT JOIN menjadi INNER JOIN.'),
          ),
          qa(
            'Apa itu ACID?',
            p('Atomicity berarti semua operasi commit atau tidak sama sekali. Consistency berarti data selalu memenuhi constraint. Isolation berarti transaksi yang berjalan bersamaan tidak saling merusak hasil. Durability berarti data bertahan setelah commit. Konsekuensi praktisnya: dalam mode autocommit setiap statement adalah satu unit, jadi operasi yang harus serempak harus dibungkus BEGIN sampai COMMIT secara eksplisit.'),
          ),
          qa(
            'Bagaimana mendiagnosis query lambat?',
            p('Pertama, baca execution plan dengan EXPLAIN ANALYZE. Cari sequential scan di tabel besar, estimasi baris yang jauh berbeda dari aktual, dan join yang inefficient. Kedua, cek apakah kolom predicate punya index. Ketiga, perbarui statistik dengan ANALYZE kalau data berubah banyak. Keempat, periksa N+1 di lapisan aplikasi, yang terlihat dari banyak query kecil berulang. Terakhir, kalau datanya memang terlalu besar untuk satu mesin, jawabannya partisi atau replika baca.'),
          ),
          qa(
            'Kapan perlu denormalisasi?',
            p('Ketika read jauh lebih sering dari write dan join-nya mahal. Contohnya counters atau ringkasan order yang menyimpan total hasil perhitungan, supaya list endpoint tidak perlu agregasi setiap kali. Biayanya adalah data bisa tidak sinkron, jadi harus ada mekanisme sinkronisasi atau perhitungan ulang berkala.'),
          ),
          qa(
            'Apa itu normalisasi dan kapan berhenti di tahap mana?',
            p('Normalisasi mengurangi duplikasi dan ketergantungan: 1NF membagi nilai menjadi atom, 2NF menghapus dependensi parsial pada composite key, 3NF menghapus dependensi transitif. Praktisnya, normalisasi sampai 3NF sering sudah cukup, lalu sebagian tabel dipecah secara sadar untuk performa pada query yang sudah diketahui. Denormalisasi selalu trade-off yang disengaja, bukan default.'),
          ),
        ],
      ),
    ],
  ),
  module(
    'iv-kr',
    'IV6',
    'Kafka dan Redis Interview',
    'Partition, consumer group, offset, idempotency, cache.',
    'Sering ditanyakan',
    [
      chapter(
        'iv-kr-kafka',
        'Kafka: Partition, Consumer Group, dan Offset',
        'P1',
        10,
        ['kafka', 'partition', 'consumer group', 'offset', 'duplicate', 'idempotency', 'rebalance'],
        [
          qa(
            'Jelaskan partition, consumer group, dan offset.',
            p('Kafka menyimpan topic sebagai log yang dipecah menjadi partition. Offset adalah posisi message dalam partition, disimpan per consumer group. Di dalam satu group, setiap partition hanya dioperasikan satu consumer, jadi jumlah partition adalah batas paralelisme; group berbeda membaca log secara independen. Urutan hanya dijamin dalam satu partition, dan key yang sama selalu diarahkan ke partition yang sama.'),
          ),
          qa(
            'Kenapa pesan bisa sampai dua kali?',
            p('Karena default-nya at-least-once: consumer memproses pesan lalu commit offset. Kalau crash di antara keduanya, pesan diproses ulang setelah restart. Rebalance juga bisa membuat pesan yang belum di-commit terulang. Jadi consumer wajib idempotent: simpan messageId dengan unique constraint, atau pakai conditional update atau upsert dengan natural key.'),
          ),
          qa(
            'Bagaimana menangani consumer yang gagal?',
            p('Tangkap exception, publish ke retry topic dengan backoff yang makin lama, lalu setelah attempt habis pindahkan ke dead letter queue untuk diperiksa manual. Retry tanpa batas hanya menyembunyikan bug. Listener juga perlu batas waktu: kalau batch besar gagal di tengah, seluruh batch diproses ulang, sehingga idempotency check wajib ada.'),
          ),
          qa(
            'Bagaimana menjaga data tetap sinkron antara database dan Kafka?',
            p('Tidak ada cara atomik antara database dan broker, sehingga dual write bisa kehilangan event. Solusinya transactional outbox: tulis event ke tabel outbox di dalam transaksi yang sama, lalu publisher mengirimkannya setelah commit. Alternatifnya change data capture lewat binlog. Konsekuensinya event bisa terlambat beberapa detik, jadi sistem harus dirancang eventual consistent.'),
          ),
          qa(
            'Kapan memakai sinkron, kapan event?',
            p('Sinkron untuk hal yang harus sudah benar sebelum menjawab: validasi stok, pembuatan payment intent, atau pencatatan order. Event untuk pekerjaan yang boleh menyusul: email, cetak label, analitik, dan sink ke data warehouse. Kunci keputusannya: apakah user perlu menunggu hasilnya, dan apakah kegagalan boleh ditunda.'),
          ),
        ],
      ),
      chapter(
        'iv-kr-redis',
        'Redis: Cache-aside dan Invalidasi',
        'P1',
        10,
        ['cache aside', 'invalidasi', 'ttl', 'cache penetration', 'cache stampede', 'cache avalanche', 'distributed lock'],
        [
          qa(
            'Jelaskan cache-aside.',
            p('Cache-aside berarti aplikasi yang memutuskan. Read: coba cache dulu, kalau miss baru baca database lalu simpan ke cache. Write: update database dulu, baru hapus key cache. Urutan ini penting. Menghapus cache lebih dulu membuka jendela di mana request lain membaca data lama lalu menimpanya, dan setelah database di-update tidak ada lagi yang menghapus cache. TTL selalu dipasang sebagai pengaman kalau invalidasi gagal.'),
          ),
          qa(
            'Apa itu cache penetration, stampede, dan avalanche?',
            p('Penetration: key untuk data yang memang tidak ada, sehingga tiap request menembus database. Solusinya cache hasil negatif dengan TTL pendek plus validasi format input. Stampede: key populer kedaluwarsa dan ribuan request jatuh ke database bersamaan. Solusinya single-flight supaya hanya satu request yang mengisi cache, TTL jitter, dan sesekali lock. Avalanche: banyak key expire serempak; solusinya sebar TTL dan tambahkan jitter acak.'),
          ),
          qa(
            'Redis sebagai distributed lock, apa jebakannya?',
            p('Ada dua jebakan: lock bisa kedaluwarsa saat operasi masih berjalan, dan unlock salah orang. Karena itu pakai SET dengan NX dan TTL serta nilai unik per owner, lalu unlock dengan script Lua yang hanya menghapus kalau nilainya masih token kita. Untuk jaminan lebih kuat tambahkan fencing token yang diterima database, sehingga owner lama otomatis ditolak. Kalau tersedia fitur database seperti advisory lock, itu lebih sederhana dan lebih kuat.'),
          ),
          qa(
            'Apakah Redis selalu benar untuk cache?',
            p('Redis ada di memori, jadi paling cocok untuk data yang boleh basi sebentar dan bisa dihitung ulang, seperti hasil query mahal atau session. Untuk data yang harus selalu fresh, atau yang kehilangan berarti kesalahan bisnis, lebih tepat simpan di database dan memakai cache hanya sebagai akselerator baca. Kalau durability tinggi dibutuhkan, Redis dengan AOF dan replication tetap harus menyimpan sumber kebenaran di tempat lain.'),
          ),
        ],
      ),
    ],
  ),
  module(
    'iv-sd',
    'IV7',
    'System Design Interview',
    'Kerangka menjawab, trade-off, dan studi kasus.',
    'Penting untuk interview',
    [
      chapter(
        'iv-sd-framework',
        'Kerangka Menjawab System Design',
        'P1',
        12,
        ['system design', 'requirement', 'capacity estimation', 'trade-off', 'bottleneck'],
        [
          ol(
            p('Klarifikasi requirement dan tulis angkanya: siapa pengguna, fitur wajib, QPS, latency target, dan apakah boleh eventual consistent.'),
            p('Estimasi kapasitas: traffic, storage, bandwidth, dan pertumbuhan. Contoh: 100 ribu user dengan 20 request per hari berarti sekitar 23 QPS rata-rata; dengan lonjakan sepuluh kali jadi sekitar 700 QPS yang harus dipenuhi.'),
            p('Gambar arsitektur high-level: client, load balancer, service stateless, cache, database, message broker, dan storage.'),
            p('Deep dive satu atau dua komponen yang paling kritis: skema database dan index, strategi cache, pola messaging, konsistensi.'),
            p('Tutup dengan failure mode, monitoring, scaling, biaya, dan evolusi berikutnya.'),
          ),
          p('Yang dinilai bukan diagram yang ramai, tapi urutan berpikir: requirement dulu, angka kedua, baru arsitektur. Trade-off harus disebut eksplisit, dan kondisi gagal harus selalu dibahas.'),
          table(
            ['Pertanyaan klasik', 'Yang dicari'],
            [
              ['URL shortener', 'ID generation, custom slug, cache read path, redirect latency'],
              ['Rate limiter', 'Algoritma, penyimpanan counter lintas instance, fail-open atau fail-closed'],
              ['Chat atau news feed', 'Fan-out on write versus read, penyimpanan timeline, ordering, notifikasi'],
              ['Job scheduler', 'Leader election, sharding, at-least-once, dead letter queue, misfire handling'],
              ['Notification service', 'Fan-out ke banyak kanal, retry per kanal, prioritas'],
            ],
          ),
          tip(
            'Kalau tidak tahu',
            p('Akui dengan jujur, lalu tunjukkan cara mencari jawabannya: apa yang perlu diukur, mana yang menjadi bottleneck, dan trade-off mana yang akan dipilih. Cara berpikir yang benar dinilai lebih tinggi daripada angka yang terdengar meyakinkan tetapi salah.'),
          ),
        ],
      ),
    ],
  ),
  module(
    'iv-personal',
    'IV8',
    'Personal Experience dan Background',
    'Ceritakan pengalaman secara jujur dan relevan.',
    'Penting untuk interview',
    [
      chapter(
        'iv-personal-story',
        'Menjawab Pertanyaan Pengalaman Pribadi',
        'P1',
        10,
        ['personal experience', 'background', 'career transition', 'self introduction', 'star'],
        [
          p('Pertanyaan background diuji struktur berpikir dan kejujuran, bukan hafalan kata. Gunakan pola STAR: Situation, Task, Action, Result. Fokus pada apa yang kamu kerjakan, keputusan apa yang kamu ambil, dan apa dampaknya.'),
          qa(
            'Ceritakan tentang diri Anda.',
            p('Mulai dari posisi sekarang, lalu pengalaman yang paling relevan, lalu alasan kenapa Anda tertarik pada posisi ini. Singkat, sekitar enam puluh detik, dan diakhiri dengan hal konkret yang ingin Anda kerjakan.'),
          ),
          qa(
            'Ceritakan proyek yang paling menantang.',
            p('Pilih satu masalah nyata yang punya angka. Jelaskan konteksnya singkat, hambatan teknis yang Anda hadapi, opsi yang Anda pertimbangkan, keputusan Anda beserta alasannya, dan hasilnya yang terukur. Sebutkan juga apa yang akan Anda lakukan berbeda kalau mengulanginya; itu menunjukkan Anda belajar.'),
          ),
          qa(
            'Apa kelemahan Anda?',
            p('Sebutkan satu kelemahan nyata yang relevan dengan kerja, jelaskan apa yang sudah Anda lakukan untuk mengatasinya, dan tunjukkan bukti perubahannya. Hindari kelemahan yang sebenarnya kelebihan, dan hindari kelemahan yang merusak kepercayaan seperti kurang teliti atau sulit menentukan batas.'),
          ),
          qa(
            'Kenapa perusahaan ini?',
            p('Sebutkan hal konkret dari produk, cara kerja, atau industri yang benar-benar Anda minati, lalu hubungkan dengan pengalaman Anda. Hindari jawaban yang hanya tentang kompensasi, atau yang bisa ditulis untuk perusahaan mana saja.'),
          ),
          qa(
            'Ada pertanyaan untuk saya?',
            p('Selalu siapkan dua atau tiga. Bagus untuk ditanyakan: bagaimana mereka mengukur keberhasilan di role ini, bagaimana proses code review, dan apa tantangan teknis terbesar saat ini. Pertanyaan seperti ini menunjukkan Anda berpikir serius dan membantu Anda menilai kecocokan.'),
          ),
          tip(
            'Prinsipnya',
            p('Jujur soal pengalaman, konkret soal hasil, dan spesifik soal alasan. Untuk latar belakang Performance Test Engineer, lihat bagian How to Answer as a Performance Test Engineer.'),
          ),
        ],
      ),
    ],
  ),
];
