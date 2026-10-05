/**
 * AUTO-GENERATED from the source study guide - do not edit by hand.
 *
 * Source: Materi_Persiapan_Technical_Test_JavaScript_BSI_Interactive.html - 3 modules, 9 chapters.
 *
 * Regenerate with: npm run migrate
 * Any deliberate change should be applied in scripts/migrate-html.mjs or
 * made in the hand-written companion data files instead.
 */

export const backendNodeModules = [
  {
    "id": "mB1",
    "track": "backend",
    "no": "B1",
    "title": "Node.js &amp; Runtime",
    "plainTitle": "B1 Node.js & Runtime",
    "desc": "Arsitektur Node.js, event loop, modul, dan I/O non-blocking.",
    "priorityNote": "Wajib",
    "minutes": 34,
    "chapters": [
      {
        "id": "c94",
        "no": 1,
        "title": "Event Loop &amp; Non-blocking I/O",
        "plainTitle": "Event Loop & Non-blocking I/O",
        "priority": "P1",
        "minutes": 10,
        "short": "Event loop & non-blocking I/O",
        "tags": [
          "event",
          "loop",
          "libuv",
          "non-blocking",
          "io",
          "callback",
          "queue",
          "microtasks"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Node.js pakai libuv untuk menjadwalkan I/O asinkron. Satu thread utama (event loop) mengeksekusi call stack, lalu mengosongkan antrean macro-task."
          },
          {
            "type": "code",
            "code": "// event loop tidak menunggu I/O selesai — kode tetap berjalan\nconst fs = require('fs');\nconsole.log('A');\nfs.readFile('big.txt', 'utf8', (err, data) => {\n  console.log('C', data.length);\n});\nconsole.log('B');",
            "lang": "js"
          },
          {
            "type": "p",
            "html": "Keluaran: <code>A → B → C</code>. Callback <code>readFile</code> baru masuk antrean setelah I/O selesai &amp; call stack kosong."
          },
          {
            "type": "h4",
            "html": "Tahapan event loop (urutan)"
          },
          {
            "type": "ol",
            "items": [
              "<strong>Timers</strong> — jalankan <code>setTimeout</code>/<code>setInterval</code>.",
              "<strong>Pending callbacks</strong> — callback I/O selain <code>close</code>.",
              "<strong>Idle, prepare</strong> — internal libuv.",
              "<strong>Poll</strong> — ambil event I/O baru; tunggu bila belum ada.",
              "<strong>Check</strong> — jalankan <code>setImmediate</code> callback.",
              "<strong>Close callbacks</strong> — <code>close</code> event callback."
            ]
          },
          {
            "type": "p",
            "html": "<strong>Microtask (Promise) selalu lebih dulu</strong> dari macrotask — dikerjakan setelah satu fase sebelum kontrol kembali ke loop."
          },
          {
            "type": "code",
            "code": "console.log('1');\nPromise.resolve().then(() => console.log('3'));\nsetTimeout(() => console.log('2'), 0);\nconsole.log('4');",
            "lang": "js"
          },
          {
            "type": "p",
            "html": "Keluaran: <code>1 → 4 → 3 → 2</code>. Mengapa? <code>1</code> &amp; <code>4</code> sinkron langsung; microtask <code>3</code> di-flush sebelum macrotask <code>2</code>."
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Event loop Node.js memproses satu thread: menjalankan call stack, lalu mengosongkan antrean. I/O dikerjakan di threadpool/libuv non-blocking, jadi satu proses bisa tangani ribuan koneksi. Microtask (Promise) lebih prioritas dari macrotask (setTimeout/I/O).\"",
            "body": []
          }
        ],
        "searchText": "Event Loop & Non-blocking I/O Event loop & non-blocking I/O event loop libuv non-blocking io callback queue microtasks Node.js pakai libuv untuk menjadwalkan I/O asinkron. Satu thread utama (event loop) mengeksekusi call stack, lalu mengosongkan antrean macro-task. // event loop tidak menunggu I/O selesai — kode tetap berjalan const fs = require('fs'); console.log('A'); fs.readFile('big.txt', 'utf8', (err, data) => { console.log('C', data.length); }); console.log('B'); Keluaran: A → B → C. Callback readFile baru masuk antrean setelah I/O selesai &amp; call stack kosong. Tahapan event loop (urutan) Timers — jalankan setTimeout / setInterval. Pending callbacks — callback I/O selain close. Idle, prepare — internal libuv. Poll — ambil event I/O baru; tunggu bila belum ada. Check — jalankan setImmediate callback. Close callbacks — close event callback. Microtask (Promise) selalu lebih dulu dari macrotask — dikerjakan setelah satu fase sebelum kontrol kembali ke loop. console.log('1'); Promise.resolve().then(() => console.log('3')); setTimeout(() => console.log('2'), 0); console.log('4'); Keluaran: 1 → 4 → 3 → 2. Mengapa? 1 &amp; 4 sinkron langsung; microtask 3 di-flush sebelum macrotask 2. Jawab singkat: \"Event loop Node.js memproses satu thread: menjalankan call stack, lalu mengosongkan antrean. I/O dikerjakan di threadpool/libuv non-blocking, jadi satu proses bisa tangani ribuan koneksi. Microtask (Promise) lebih prioritas dari macrotask (setTimeout/I/O).\""
      },
      {
        "id": "c95",
        "no": 2,
        "title": "Modul: CommonJS vs ESM",
        "plainTitle": "Modul: CommonJS vs ESM",
        "priority": "P1",
        "minutes": 8,
        "short": "Modul: CommonJS vs ESM",
        "tags": [
          "require",
          "import",
          "module.exports",
          "__dirname",
          "esm",
          "commonjs",
          "ecmascript",
          "modules"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "table",
            "head": [
              "Ciri",
              "CommonJS",
              "ESM"
            ],
            "rows": [
              [
                "Sintaks",
                "<code>require()</code> / <code>module.exports</code>",
                "<code>import</code> / <code>export</code>"
              ],
              [
                "Loading",
                "Synchronous",
                "Asynchronous (compile-time)"
              ],
              [
                "Top-level this",
                "module.exports",
                "undefined"
              ],
              [
                "Dukungan dinamis",
                "Ya",
                "<code>import()</code>"
              ],
              [
                "Tree-shaking",
                "Tidak",
                "Ya"
              ]
            ]
          },
          {
            "type": "code",
            "code": "// CommonJS (legacy)\nconst { readFile } = require('fs/promises');\nmodule.exports = { hello: () => 'hi' };",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "// ESM (modern) — butuh \"type\": \"module\" di package.json\nimport { readFile } from 'fs/promises';\nexport const hello = () => 'hi';\nexport default function main() { return main; }",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Saya pilih ESM di project baru karena import/export statis mendukung tree-shaking dan sintaks rapi. Tapi tetap pahami require/module.exports untuk kode lama dan library yang belum ESM.\"",
            "body": []
          }
        ],
        "searchText": "Modul: CommonJS vs ESM Modul: CommonJS vs ESM require import module.exports __dirname esm commonjs ecmascript modules Ciri CommonJS ESM Sintaks <code>require()</code> / <code>module.exports</code> <code>import</code> / <code>export</code> Loading Synchronous Asynchronous (compile-time) Top-level this module.exports undefined Dukungan dinamis Ya <code>import()</code> Tree-shaking Tidak Ya // CommonJS (legacy) const { readFile } = require('fs/promises'); module.exports = { hello: () => 'hi' }; // ESM (modern) — butuh \"type\": \"module\" di package.json import { readFile } from 'fs/promises'; export const hello = () => 'hi'; export default function main() { return main; } Jawab singkat: \"Saya pilih ESM di project baru karena import/export statis mendukung tree-shaking dan sintaks rapi. Tapi tetap pahami require/module.exports untuk kode lama dan library yang belum ESM.\""
      },
      {
        "id": "c96",
        "no": 3,
        "title": "npm &amp; package.json",
        "plainTitle": "npm & package.json",
        "priority": "P2",
        "minutes": 7,
        "short": "npm & package.json",
        "tags": [
          "npm",
          "package.json",
          "dependency",
          "script",
          "semver",
          "lock",
          "registry",
          "npx"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "{\n  \"name\": \"api\",\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"main\": \"src/index.js\",\n  \"scripts\": {\n    \"start\": \"node src/index.js\",\n    \"dev\": \"nodemon src/index.js\",\n    \"test\": \"jest --coverage\"\n  },\n  \"dependencies\":   { \"express\": \"^4.18.0\" },\n  \"devDependencies\": { \"jest\": \"^29.0.0\" }\n}",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Praktik baik"
          },
          {
            "type": "ul",
            "items": [
              "Semver: <code>^</code> untuk minor/patch, <code>~</code> untuk patch saja.",
              "<code>npm ci</code> di CI agar install deterministik dari lock file.",
              "Pisahkan <code>dependencies</code> (runtime) dan <code>devDependencies</code> (build/test).",
              "Jalankan <code>npm audit</code> rutin; perbarui dependency kritis."
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Saya pakai ^ untuk dependensi umum, ~ untuk lib kritis, dan npm ci di CI. Lock file selalu di-commit agar build reproducible.\"",
            "body": []
          }
        ],
        "searchText": "npm & package.json npm & package.json npm package.json dependency script semver lock registry npx { \"name\": \"api\", \"version\": \"1.0.0\", \"type\": \"module\", \"main\": \"src/index.js\", \"scripts\": { \"start\": \"node src/index.js\", \"dev\": \"nodemon src/index.js\", \"test\": \"jest --coverage\" }, \"dependencies\": { \"express\": \"^4.18.0\" }, \"devDependencies\": { \"jest\": \"^29.0.0\" } } Praktik baik Semver: ^ untuk minor/patch, ~ untuk patch saja. npm ci di CI agar install deterministik dari lock file. Pisahkan dependencies (runtime) dan devDependencies (build/test). Jalankan npm audit rutin; perbarui dependency kritis. Jawab singkat: \"Saya pakai ^ untuk dependensi umum, ~ untuk lib kritis, dan npm ci di CI. Lock file selalu di-commit agar build reproducible.\""
      },
      {
        "id": "c97",
        "no": 4,
        "title": "Built-in Modules <code>fs</code>, <code>path</code>, <code>http</code>",
        "plainTitle": "Built-in Modules fs, path, http",
        "priority": "P1",
        "minutes": 9,
        "short": "Built-in: fs, path, http",
        "tags": [
          "fs",
          "promises",
          "readFile",
          "path",
          "join",
          "http",
          "createServer",
          "request",
          "response"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "// fs/promises — async, JANGAN pakai fs.*Sync di request handler\nimport { readFile, writeFile } from 'fs/promises';\nconst data = await readFile('users.json', 'utf8');\nawait writeFile('log.txt', data);",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "// path — aman lintas platform (ESM); __dirname tidak otomatis tersedia\nimport path from 'path';\nconst __dirname = path.dirname(new URL(import.meta.url).pathname);\nconst file = path.join(__dirname, 'data', 'users.json');\npath.extname(file); // '.json'",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "// http — server tanpa framework\nimport http from 'http';\nconst server = http.createServer((req, res) => {\n  if (req.method === 'GET' && req.url === '/ping') {\n    res.writeHead(200, { 'Content-Type': 'text/plain' });\n    return res.end('pong');\n  }\n  res.writeHead(404); res.end('Not Found');\n});\nserver.listen(3000);",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "API penting"
          },
          {
            "type": "ul",
            "items": [
              "<code>fs/promises.*</code> — gunakan versi async; hindari <code>*Sync</code> di request handler.",
              "<code>path.join</code> aman lintas OS; <code>path.resolve</code> menghasilkan absolute path.",
              "<code>req.method</code>, <code>req.url</code>, <code>req.headers</code>; <code>res.writeHead()</code>, <code>res.end()</code>."
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Saya pakai fs/promises agar I/O tidak blokir, path.join untuk path aman lintas OS, dan http.createServer hanya untuk debug — di produksi pakai Express karena routing+middleware jauh lebih bersih.\"",
            "body": []
          }
        ],
        "searchText": "Built-in Modules fs, path, http Built-in: fs, path, http fs promises readFile path join http createServer request response // fs/promises — async, JANGAN pakai fs.*Sync di request handler import { readFile, writeFile } from 'fs/promises'; const data = await readFile('users.json', 'utf8'); await writeFile('log.txt', data); // path — aman lintas platform (ESM); __dirname tidak otomatis tersedia import path from 'path'; const __dirname = path.dirname(new URL(import.meta.url).pathname); const file = path.join(__dirname, 'data', 'users.json'); path.extname(file); // '.json' // http — server tanpa framework import http from 'http'; const server = http.createServer((req, res) => { if (req.method === 'GET' && req.url === '/ping') { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end('pong'); } res.writeHead(404); res.end('Not Found'); }); server.listen(3000); API penting fs/promises.* — gunakan versi async; hindari *Sync di request handler. path.join aman lintas OS; path.resolve menghasilkan absolute path. req.method, req.url, req.headers; res.writeHead(), res.end(). Jawab singkat: \"Saya pakai fs/promises agar I/O tidak blokir, path.join untuk path aman lintas OS, dan http.createServer hanya untuk debug — di produksi pakai Express karena routing+middleware jauh lebih bersih.\""
      }
    ]
  },
  {
    "id": "mB2",
    "track": "backend",
    "no": "B2",
    "title": "Express.js &amp; REST API",
    "plainTitle": "B2 Express.js & REST API",
    "desc": "Routing, middleware, penanganan error, dan status code REST yang benar.",
    "priorityNote": "Wajib",
    "minutes": 35,
    "chapters": [
      {
        "id": "c98",
        "no": 1,
        "title": "Routing, Params &amp; Query",
        "plainTitle": "Routing, Params & Query",
        "priority": "P1",
        "minutes": 10,
        "short": "Routing & params",
        "tags": [
          "express",
          "routing",
          "route",
          "params",
          "query",
          "middleware",
          "req",
          "res"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "import express from 'express';\nconst app = express();\napp.use(express.json()); // parse JSON body\n\napp.get('/users/:id', (req, res) => {\n  const { id } = req.params;      // '123' (string)\n  const { active } = req.query;   // dari ?active=true\n  res.json({ id: Number(id), active: active === 'true' });\n});\n\n// router modular\nimport userRouter from './routes/user.js';\napp.use('/api/users', userRouter);",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Konvensi REST"
          },
          {
            "type": "table",
            "head": [
              "Method",
              "Path",
              "Action"
            ],
            "rows": [
              [
                "GET",
                "/api/items",
                "List"
              ],
              [
                "GET",
                "/api/items/:id",
                "Read"
              ],
              [
                "POST",
                "/api/items",
                "Create"
              ],
              [
                "PUT",
                "/api/items/:id",
                "Replace"
              ],
              [
                "PATCH",
                "/api/items/:id",
                "Update sebagian"
              ],
              [
                "DELETE",
                "/api/items/:id",
                "Delete"
              ]
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Saya pisahkan route ke router modular (app.use('/api/users', userRouter)), pakai req.params untuk path dinamis dan req.query untuk filter. Body JSON otomatis diparsing dengan express.json().\"",
            "body": []
          }
        ],
        "searchText": "Routing, Params & Query Routing & params express routing route params query middleware req res import express from 'express'; const app = express(); app.use(express.json()); // parse JSON body app.get('/users/:id', (req, res) => { const { id } = req.params; // '123' (string) const { active } = req.query; // dari ?active=true res.json({ id: Number(id), active: active === 'true' }); }); // router modular import userRouter from './routes/user.js'; app.use('/api/users', userRouter); Konvensi REST Method Path Action GET /api/items List GET /api/items/:id Read POST /api/items Create PUT /api/items/:id Replace PATCH /api/items/:id Update sebagian DELETE /api/items/:id Delete Jawab singkat: \"Saya pisahkan route ke router modular (app.use('/api/users', userRouter)), pakai req.params untuk path dinamis dan req.query untuk filter. Body JSON otomatis diparsing dengan express.json().\""
      },
      {
        "id": "c99",
        "no": 2,
        "title": "Middleware",
        "plainTitle": "Middleware",
        "priority": "P1",
        "minutes": 9,
        "short": "Middleware",
        "tags": [
          "express",
          "middleware",
          "next",
          "error",
          "handling",
          "order"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Middleware = <code>(req, res, next) =&gt;</code>. Urutan <code>app.use</code> menentukan urutan eksekusi — penting!"
          },
          {
            "type": "code",
            "code": "// logging middleware\napp.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next(); // lanjut ke middleware / route berikutnya\n});\n// error handler — 4 param, letakkan LAST\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: 'Internal Server Error' });\n});",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Jebakan umum"
          },
          {
            "type": "ul",
            "items": [
              "Lupa <code>return res.status(...).json(...)</code> → response terkirim dua kali.",
              "Route dideklarasikan sebelum <code>express.json()</code> → <code>req.body</code> <code>undefined</code>.",
              "Middleware error harus punya <strong>4 param</strong> agar Express kenali sebagai error handler."
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Middleware dijalankan berurutan; panggil next() untuk lanjut. Error handler wajib 4 parameter (err, req, res, next) dan diletakkan paling bawah supaya menangkap semua error.\"",
            "body": []
          }
        ],
        "searchText": "Middleware Middleware express middleware next error handling order Middleware = (req, res, next) =&gt;. Urutan app.use menentukan urutan eksekusi — penting! // logging middleware app.use((req, res, next) => { console.log(req.method, req.url); next(); // lanjut ke middleware / route berikutnya }); // error handler — 4 param, letakkan LAST app.use((err, req, res, next) => { console.error(err.stack); res.status(500).json({ error: 'Internal Server Error' }); }); Jebakan umum Lupa return res.status(...).json(...) → response terkirim dua kali. Route dideklarasikan sebelum express.json() → req.body undefined. Middleware error harus punya 4 param agar Express kenali sebagai error handler. Jawab singkat: \"Middleware dijalankan berurutan; panggil next() untuk lanjut. Error handler wajib 4 parameter (err, req, res, next) dan diletakkan paling bawah supaya menangkap semua error.\""
      },
      {
        "id": "c100",
        "no": 3,
        "title": "Error Handling &amp; Status Code",
        "plainTitle": "Error Handling & Status Code",
        "priority": "P1",
        "minutes": 8,
        "short": "Error handling & status code",
        "tags": [
          "http",
          "status",
          "code",
          "200",
          "400",
          "401",
          "403",
          "404",
          "500",
          "try",
          "catch"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "table",
            "head": [
              "Kode",
              "Artinya"
            ],
            "rows": [
              [
                "200",
                "OK / request berhasil"
              ],
              [
                "201",
                "Created (POST berhasil)"
              ],
              [
                "400",
                "Bad Request (validasi gagal)"
              ],
              [
                "401",
                "Unauthorized (belum login / token hilang)"
              ],
              [
                "403",
                "Forbidden (login tapi tidak punya akses)"
              ],
              [
                "404",
                "Not Found (resource / route tidak ada)"
              ],
              [
                "409",
                "Conflict (duplikat data unik)"
              ],
              [
                "500",
                "Internal Server Error"
              ]
            ]
          },
          {
            "type": "code",
            "code": "app.get('/api/items/:id', async (req, res, next) => {\n  try {\n    const item = await Item.findById(req.params.id);\n    if (!item) return res.status(404).json({ error: 'Not found' });\n    res.json(item);\n  } catch (err) {\n    next(err); // ke error-handling middleware\n  }\n});",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Saya bungkus async di try/catch dan lempir ke next(err). Pakai kode tepat: 400 validasi, 401/403 auth, 404 resource hilang, 409 duplikat. Error tak terduga jadi 500 via error middleware.\"",
            "body": []
          }
        ],
        "searchText": "Error Handling & Status Code Error handling & status code http status code 200 400 401 403 404 500 try catch Kode Artinya 200 OK / request berhasil 201 Created (POST berhasil) 400 Bad Request (validasi gagal) 401 Unauthorized (belum login / token hilang) 403 Forbidden (login tapi tidak punya akses) 404 Not Found (resource / route tidak ada) 409 Conflict (duplikat data unik) 500 Internal Server Error app.get('/api/items/:id', async (req, res, next) => { try { const item = await Item.findById(req.params.id); if (!item) return res.status(404).json({ error: 'Not found' }); res.json(item); } catch (err) { next(err); // ke error-handling middleware } }); Jawab singkat: \"Saya bungkus async di try/catch dan lempir ke next(err). Pakai kode tepat: 400 validasi, 401/403 auth, 404 resource hilang, 409 duplikat. Error tak terduga jadi 500 via error middleware.\""
      },
      {
        "id": "c101",
        "no": 4,
        "title": "Validasi &amp; Keamanan (helmet, cors, dotenv)",
        "plainTitle": "Validasi & Keamanan (helmet, cors, dotenv)",
        "priority": "P2",
        "minutes": 8,
        "short": "Validasi & keamanan",
        "tags": [
          "joi",
          "validation",
          "helmet",
          "cors",
          "dotenv",
          "security",
          "header"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "import helmet from 'helmet';\nimport cors from 'cors';\nimport dotenv from 'dotenv';\ndotenv.config();\napp.use(helmet()); // security headers (HSTS, X-Frame-Options, dll.)\napp.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Validasi input (Joi)"
          },
          {
            "type": "code",
            "code": "import Joi from 'joi';\nconst schema = Joi.object({\n  email: Joi.string().email().required(),\n  age: Joi.number().integer().min(17).max(60)\n});\nconst { error, value } = schema.validate(req.body);\nif (error) return res.status(400).json({ error: error.details[0].message });",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "<code>helmet</code> mengatur security headers.",
              "<code>cors</code> kontrol origin — jangan pakai <code>*</code> bila ada kredensial.",
              "Secret jangan hard-code; <code>.env</code> ke <code>.gitignore</code>.",
              "Validasi <em>selalu</em> di server, meski sudah divalidasi di frontend."
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Saya pakai helmet untuk security headers, cors terbatas (bukan * bila ada kredensial), baca env lewat dotenv. Validasi pakai Joi/Zod di server — frontend validation bukan keamanan.\"",
            "body": []
          }
        ],
        "searchText": "Validasi & Keamanan (helmet, cors, dotenv) Validasi & keamanan joi validation helmet cors dotenv security header import helmet from 'helmet'; import cors from 'cors'; import dotenv from 'dotenv'; dotenv.config(); app.use(helmet()); // security headers (HSTS, X-Frame-Options, dll.) app.use(cors({ origin: process.env.CORS_ORIGIN || '*' })); Validasi input (Joi) import Joi from 'joi'; const schema = Joi.object({ email: Joi.string().email().required(), age: Joi.number().integer().min(17).max(60) }); const { error, value } = schema.validate(req.body); if (error) return res.status(400).json({ error: error.details[0].message }); helmet mengatur security headers. cors kontrol origin — jangan pakai * bila ada kredensial. Secret jangan hard-code;.env ke.gitignore. Validasi selalu di server, meski sudah divalidasi di frontend. Jawab singkat: \"Saya pakai helmet untuk security headers, cors terbatas (bukan * bila ada kredensial), baca env lewat dotenv. Validasi pakai Joi/Zod di server — frontend validation bukan keamanan.\""
      }
    ]
  },
  {
    "id": "mB3",
    "track": "backend",
    "no": "B3",
    "title": "Database &amp; Persistence",
    "plainTitle": "B3 Database & Persistence",
    "desc": "SQL vs NoSQL, ORM/Prisma, koneksi pool, dan transaksi.",
    "priorityNote": "Wajib",
    "minutes": 10,
    "chapters": [
      {
        "id": "c102",
        "no": 1,
        "title": "SQL: SELECT, JOIN, Transaction",
        "plainTitle": "SQL: SELECT, JOIN, Transaction",
        "priority": "P1",
        "minutes": 10,
        "short": "SQL (PostgreSQL/MySQL)",
        "tags": [
          "sql",
          "select",
          "join",
          "transaction",
          "acidd",
          "query",
          "parameter"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "-- SELECT + WHERE + ORDER BY + LIMIT\nSELECT id, name, email FROM users\nWHERE active = true\nORDER BY created_at DESC\nLIMIT 10;",
            "lang": "sql"
          },
          {
            "type": "code",
            "code": "-- INNER JOIN (hanya yang cocok) vs LEFT JOIN (semua baris kiri)\nSELECT u.name, p.title\nFROM users u\nINNER JOIN posts p ON p.user_id = u.id;",
            "lang": "sql"
          },
          {
            "type": "h4",
            "html": "Transaction (ACID)"
          },
          {
            "type": "h4",
            "html": "Transaction (ACID)"
          },
          {
            "type": "code",
            "code": "-- transfer dana atomik\nBEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;  -- ROLLBACK; bila gagal",
            "lang": "sql"
          }
        ],
        "searchText": "SQL: SELECT, JOIN, Transaction SQL (PostgreSQL/MySQL) sql select join transaction acidd query parameter -- SELECT + WHERE + ORDER BY + LIMIT SELECT id, name, email FROM users WHERE active = true ORDER BY created_at DESC LIMIT 10; -- INNER JOIN (hanya yang cocok) vs LEFT JOIN (semua baris kiri) SELECT u.name, p.title FROM users u INNER JOIN posts p ON p.user_id = u.id; Transaction (ACID) Transaction (ACID) -- transfer dana atomik BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; UPDATE accounts SET balance = balance + 100 WHERE id = 2; COMMIT; -- ROLLBACK; bila gagal"
      }
    ]
  }
];
