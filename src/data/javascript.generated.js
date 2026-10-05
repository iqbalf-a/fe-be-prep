/**
 * AUTO-GENERATED from the source study guide - do not edit by hand.
 *
 * Source: Materi_Persiapan_Technical_Test_JavaScript_BSI_Interactive.html - 13 modules, 93 chapters.
 *
 * Regenerate with: npm run migrate
 * Any deliberate change should be applied in scripts/migrate-html.mjs or
 * made in the hand-written companion data files instead.
 */

export const javascriptModules = [
  {
    "id": "m1",
    "track": "js",
    "no": "1",
    "title": "JavaScript Fundamental",
    "plainTitle": "1 JavaScript Fundamental",
    "desc": "Inti dari semua materi. Hafal aturan main-nya, bukan hafal daftar tipe.",
    "priorityNote": "Wajib dikuasai",
    "minutes": 66,
    "chapters": [
      {
        "id": "c1",
        "no": 1,
        "title": "<code>var</code>, <code>let</code>, dan <code>const</code>",
        "plainTitle": "var, let, dan const",
        "priority": "P1",
        "minutes": 10,
        "short": "var, let, const",
        "tags": [
          "var",
          "let",
          "const",
          "es6",
          "scope"
        ],
        "notePlaceholder": "Tulis rumusan jawaban Anda di sini...",
        "blocks": [
          {
            "type": "code",
            "code": "var nama = \"Moh Iqbal\";   // function scope, bisa di-declare ulang\nlet umur = 26;           // block scope, value bisa diganti\nconst kota = \"Jakarta\";  // block scope, reference tidak bisa diganti",
            "lang": "js"
          },
          {
            "type": "table",
            "head": [
              "",
              "<code>var</code>",
              "<code>let</code>",
              "<code>const</code>"
            ],
            "rows": [
              [
                "Scope",
                "Function",
                "Block",
                "Block"
              ],
              [
                "Bisa di-declare ulang",
                "Bisa",
                "Tidak",
                "Tidak"
              ],
              [
                "Hoisting",
                "Di-hoist sebagai <code>undefined</code>",
                "Hoist tapi masuk TDZ",
                "Hoist tapi masuk TDZ"
              ],
              [
                "Top-level global",
                "jadi properti <code>window</code>",
                "Tidak",
                "Tidak"
              ]
            ]
          },
          {
            "type": "h4",
            "html": "Aturan praktis"
          },
          {
            "type": "ul",
            "items": [
              "Default: <strong><code>const</code></strong> selalu. Gunakan <code>let</code> hanya jika value memang perlu diganti.",
              "<code>const</code> hanya mengunci <em>reference</em>, bukan isi nilainya."
            ]
          },
          {
            "type": "code",
            "code": "const user = { nama: \"A\" };\nuser.nama = \"B\";      // OK, isi object boleh diubah\nuser.umur = 20;       // OK, tambah properti baru\nuser = { nama: \"C\" }; // Error: assignment ke constant",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "const list = [1, 2];\nlist.push(3);         // OK\nlist = [4];           // Error",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Saya pakai const sebagai default karena nilainya tidak di-reassign, dan let ketika memang perlu berubah. var saya hindari karena function scope dan bisa di-declare ulang sehingga rawan bug.\"",
            "body": []
          }
        ],
        "searchText": "var, let, dan const var, let, const var let const es6 scope var nama = \"Moh Iqbal\"; // function scope, bisa di-declare ulang let umur = 26; // block scope, value bisa diganti const kota = \"Jakarta\"; // block scope, reference tidak bisa diganti <code>var</code> <code>let</code> <code>const</code> Scope Function Block Block Bisa di-declare ulang Bisa Tidak Tidak Hoisting Di-hoist sebagai <code>undefined</code> Hoist tapi masuk TDZ Hoist tapi masuk TDZ Top-level global jadi properti <code>window</code> Tidak Tidak Aturan praktis Default: const selalu. Gunakan let hanya jika value memang perlu diganti. const hanya mengunci reference, bukan isi nilainya. const user = { nama: \"A\" }; user.nama = \"B\"; // OK, isi object boleh diubah user.umur = 20; // OK, tambah properti baru user = { nama: \"C\" }; // Error: assignment ke constant const list = [1, 2]; list.push(3); // OK list = [4]; // Error Jawab singkat: \"Saya pakai const sebagai default karena nilainya tidak di-reassign, dan let ketika memang perlu berubah. var saya hindari karena function scope dan bisa di-declare ulang sehingga rawan bug.\""
      },
      {
        "id": "c2",
        "no": 2,
        "title": "Tipe Data dan <code>typeof</code>",
        "plainTitle": "Tipe Data dan typeof",
        "priority": "P1",
        "minutes": 10,
        "short": "Tipe data & typeof",
        "tags": [
          "tipe",
          "data",
          "typeof",
          "primitive",
          "reference",
          "bigint",
          "symbol"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "<strong>7 primitive:</strong> <code>string</code>, <code>number</code>, <code>bigint</code>, <code>boolean</code>, <code>undefined</code>, <code>null</code>, <code>symbol</code>."
          },
          {
            "type": "p",
            "html": "<strong>Object (reference type):</strong> object, array, function, date, regex, map, set."
          },
          {
            "type": "code",
            "code": "typeof \"halo\"        // \"string\"\ntypeof 10            // \"number\"\ntypeof 10n           // \"bigint\"\ntypeof true          // \"boolean\"\ntypeof undefined     // \"undefined\"\ntypeof Symbol(\"id\")  // \"symbol\"\ntypeof null          // \"object\"   typeof \"halo\"        // \"string\"\ntypeof 10            // \"number\"\ntypeof 10n           // \"bigint\"\ntypeof true          // \"boolean\"\ntypeof undefined     // \"undefined\"\ntypeof Symbol(\"id\")  // \"symbol\"\ntypeof null          // \"object\"   <-- bug historis (bukan error)\ntypeof {}            // \"object\"\ntypeof []            // \"object\"   typeof \"halo\"        // \"string\"\ntypeof 10            // \"number\"\ntypeof 10n           // \"bigint\"\ntypeof true          // \"boolean\"\ntypeof undefined     // \"undefined\"\ntypeof Symbol(\"id\")  // \"symbol\"\ntypeof null          // \"object\"   <-- bug historis (bukan error)\ntypeof {}            // \"object\"\ntypeof []            // \"object\"   <-- array adalah object\ntypeof function(){}  // \"function\"",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Jebakan yang sering ditanya"
          },
          {
            "type": "ul",
            "items": [
              "<code>typeof null === \"object\"</code> — bug dari implementasi ECMAScript versi lama, sudah tidak bisa dihapus karena backward compatibility.",
              "<code>Array.isArray([])</code> adalah cara benar mengecek array.",
              "Primitive di-<em>copy</em> nilainya, object Passed by <em>reference</em>."
            ]
          },
          {
            "type": "code",
            "code": "const a = { n: 1 };\nconst b = a;   b.n = 2;\nconsole.log(a.n); // 2  -> reference sama\n\nconst c = [1,2]; const d = [...c];  // spread = copy",
            "lang": "js"
          }
        ],
        "searchText": "Tipe Data dan typeof Tipe data & typeof tipe data typeof primitive reference bigint symbol 7 primitive: string, number, bigint, boolean, undefined, null, symbol. Object (reference type): object, array, function, date, regex, map, set. typeof \"halo\" // \"string\" typeof 10 // \"number\" typeof 10n // \"bigint\" typeof true // \"boolean\" typeof undefined // \"undefined\" typeof Symbol(\"id\") // \"symbol\" typeof null // \"object\" typeof \"halo\" // \"string\" typeof 10 // \"number\" typeof 10n // \"bigint\" typeof true // \"boolean\" typeof undefined // \"undefined\" typeof Symbol(\"id\") // \"symbol\" typeof null // \"object\" <-- bug historis (bukan error) typeof {} // \"object\" typeof [] // \"object\" typeof \"halo\" // \"string\" typeof 10 // \"number\" typeof 10n // \"bigint\" typeof true // \"boolean\" typeof undefined // \"undefined\" typeof Symbol(\"id\") // \"symbol\" typeof null // \"object\" <-- bug historis (bukan error) typeof {} // \"object\" typeof [] // \"object\" <-- array adalah object typeof function(){} // \"function\" Jebakan yang sering ditanya typeof null === \"object\" — bug dari implementasi ECMAScript versi lama, sudah tidak bisa dihapus karena backward compatibility. Array.isArray([]) adalah cara benar mengecek array. Primitive di- copy nilainya, object Passed by reference. const a = { n: 1 }; const b = a; b.n = 2; console.log(a.n); // 2 -> reference sama const c = [1,2]; const d = [...c]; // spread = copy"
      },
      {
        "id": "c3",
        "no": 3,
        "title": "<code>==</code> vs <code>===</code>",
        "plainTitle": "== vs ===",
        "priority": "P1",
        "minutes": 12,
        "short": "== vs ===",
        "tags": [
          "equality",
          "loose",
          "strict",
          "coercion",
          "object.is",
          "nan"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "<code>==</code> (loose) melakukan <strong>type coercion</strong> dulu; <code>===</code> (strict) membandingkan <strong>type DAN value</strong>."
          },
          {
            "type": "code",
            "code": "5 == \"5\"      // true  -> \"5\" diubah jadi number\n5 === \"5\"     // false -> type berbeda\n\nnull == undefined    // true  (kebTfalsy dari keduanya)\nnull === undefined   // false\nnull == 0            // false (!)\n\"\" == 0              // true\n\"0\" == 0             // true\nNaN == NaN           // false\nNaN === NaN          // false\n0 == \"\"             // true\n[] == false          // true",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Versus <code>Object.is()</code>"
          },
          {
            "type": "ul",
            "items": [
              "<code>Object.is(NaN, NaN)</code> → <code>true</code> (beda dari <code>===</code>).",
              "<code>Object.is(0, -0)</code> → <code>false</code> (beda dari <code>===</code>).",
              "Untuk sisanya sama dengan <code>===</code>."
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Saya selalu pakai === karena lebih predictable — tidak ada coercion yang tidak terduga. == hanya berguna saat sengaja mengecek null/undefined, dan itu lebih rapi ditulis x === null || x === undefined atau optional chaining.\"",
            "body": []
          }
        ],
        "searchText": "== vs === == vs === equality loose strict coercion object.is nan == (loose) melakukan type coercion dulu; === (strict) membandingkan type DAN value. 5 == \"5\" // true -> \"5\" diubah jadi number 5 === \"5\" // false -> type berbeda null == undefined // true (kebTfalsy dari keduanya) null === undefined // false null == 0 // false (!) \"\" == 0 // true \"0\" == 0 // true NaN == NaN // false NaN === NaN // false 0 == \"\" // true [] == false // true Versus Object.is() Object.is(NaN, NaN) → true (beda dari ===). Object.is(0, -0) → false (beda dari ===). Untuk sisanya sama dengan ===. Jawab singkat: \"Saya selalu pakai === karena lebih predictable — tidak ada coercion yang tidak terduga. == hanya berguna saat sengaja mengecek null/undefined, dan itu lebih rapi ditulis x === null || x === undefined atau optional chaining.\""
      },
      {
        "id": "c4",
        "no": 4,
        "title": "Truthy dan Falsy",
        "plainTitle": "Truthy dan Falsy",
        "priority": "P1",
        "minutes": 8,
        "short": "Truthy & falsy",
        "tags": [
          "truthy",
          "falsy",
          "condition",
          "if",
          "boolean"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Hanya <strong>8 nilai falsy</strong>. Selain itu semua truthy."
          },
          {
            "type": "code",
            "code": "false\n0\n-0\n0n\n\"\"        // string kosong\nnull\nundefined\nNaN",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "if (\"halo\") console.log(\"masuk\");   // masuk -> string non-kosong truthy\nif ([])   console.log(\"masuk\");   // masuk -> array kosong tetap truthy!\nif ([])   console.log(\"kosong\");  // tidak masuk -> karena object itu truthy\nif ({})   console.log(\"ada\");     // ada\n\nBoolean(0)          // false\nBoolean(\"false\")    // true  if (\"halo\") console.log(\"masuk\");   // masuk -> string non-kosong truthy\nif ([])   console.log(\"masuk\");   // masuk -> array kosong tetap truthy!\nif ([])   console.log(\"kosong\");  // tidak masuk -> karena object itu truthy\nif ({})   console.log(\"ada\");     // ada\n\nBoolean(0)          // false\nBoolean(\"false\")    // true  <-- jebakan\n!!\"\"                // false (cara paling cepat coerce ke boolean)",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Polis dari interview"
          },
          {
            "type": "ul",
            "items": [
              "Nullish coalescing <code>??</code> hanya menyeleksi <code>null</code>/<code>undefined</code> (bukan <code>0</code>/<code>\"\"</code>).",
              "Logical OR <code>||</code> menyeleksi semua falsy — hati-hati dengan angka 0.",
              "Default parameter hanya berlaku untuk <code>undefined</code>, bukan <code>null</code>."
            ]
          },
          {
            "type": "code",
            "code": "0 || \"default\"    // \"default\"  (kurang tepat untuk angka)\n0 ?? \"default\"    // 0          (tepat)\n0 || 5             // 5\n0 ?? 5             // 0",
            "lang": "js"
          }
        ],
        "searchText": "Truthy dan Falsy Truthy & falsy truthy falsy condition if boolean Hanya 8 nilai falsy. Selain itu semua truthy. false 0 -0 0n \"\" // string kosong null undefined NaN if (\"halo\") console.log(\"masuk\"); // masuk -> string non-kosong truthy if ([]) console.log(\"masuk\"); // masuk -> array kosong tetap truthy! if ([]) console.log(\"kosong\"); // tidak masuk -> karena object itu truthy if ({}) console.log(\"ada\"); // ada Boolean(0) // false Boolean(\"false\") // true if (\"halo\") console.log(\"masuk\"); // masuk -> string non-kosong truthy if ([]) console.log(\"masuk\"); // masuk -> array kosong tetap truthy! if ([]) console.log(\"kosong\"); // tidak masuk -> karena object itu truthy if ({}) console.log(\"ada\"); // ada Boolean(0) // false Boolean(\"false\") // true <-- jebakan !!\"\" // false (cara paling cepat coerce ke boolean) Polis dari interview Nullish coalescing?? hanya menyeleksi null / undefined (bukan 0 / \"\"). Logical OR || menyeleksi semua falsy — hati-hati dengan angka 0. Default parameter hanya berlaku untuk undefined, bukan null. 0 || \"default\" // \"default\" (kurang tepat untuk angka) 0 ?? \"default\" // 0 (tepat) 0 || 5 // 5 0 ?? 5 // 0"
      },
      {
        "id": "c5",
        "no": 5,
        "title": "Operator, Precedence, dan Coercion",
        "plainTitle": "Operator, Precedence, dan Coercion",
        "priority": "P2",
        "minutes": 8,
        "short": "Operator & coercion",
        "tags": [
          "operator",
          "precedence",
          "ternary",
          "unary",
          "increment"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "table",
            "head": [
              "Operator",
              "Contoh",
              "Hasil"
            ],
            "rows": [
              [
                "Exponent",
                "<code>2 ** 3</code>",
                "8"
              ],
              [
                "Modulo/sisa",
                "<code>7 % 3</code>",
                "1"
              ],
              [
                "Increment",
                "<code>let x = 1; x++</code>",
                "x = 2 <em>setelah</em> baris selesai"
              ],
              [
                "Prefix inc",
                "<code>++x</code>",
                "x naik <em>sebelum</em> dipakai"
              ],
              [
                "Logical AND",
                "<code>0 &amp;&amp; 5</code>",
                "0 (short-circuit)"
              ],
              [
                "Nullish",
                "<code>null ?? 5</code>",
                "5"
              ],
              [
                "Exponent kiri-kanan",
                "<code>2 ** 3 ** 2</code>",
                "512 (right-associative)"
              ],
              [
                "Ternary",
                "<code>a ? b : c</code>",
                "short-circuit"
              ]
            ]
          },
          {
            "type": "code",
            "code": "let x = 5;\nconst y = x++ + 1;   // y = 6, baru x jadi 6\nconsole.log(x);      // 6\n\nconst z = ++x + 1;   // z = 8 (x jadi 7 dulu)",
            "lang": "js"
          },
          {
            "type": "p",
            "html": "Coercion saat <code>+</code>: jika salah satu operand string, keduanya jadi string."
          },
          {
            "type": "code",
            "code": "1 + 2        // 3   (number)\n\"1\" + 2      // \"12\" (string!)\n1 + 2 + \"3\"  // \"33\"\n\"1\" - 1      // 0   ( Arithmetic memaksa number )\n\"5\" * \"2\"    // 10",
            "lang": "js"
          }
        ],
        "searchText": "Operator, Precedence, dan Coercion Operator & coercion operator precedence ternary unary increment Operator Contoh Hasil Exponent <code>2 ** 3</code> 8 Modulo/sisa <code>7 % 3</code> 1 Increment <code>let x = 1; x++</code> x = 2 <em>setelah</em> baris selesai Prefix inc <code>++x</code> x naik <em>sebelum</em> dipakai Logical AND <code>0 &amp;&amp; 5</code> 0 (short-circuit) Nullish <code>null ?? 5</code> 5 Exponent kiri-kanan <code>2 ** 3 ** 2</code> 512 (right-associative) Ternary <code>a ? b : c</code> short-circuit let x = 5; const y = x++ + 1; // y = 6, baru x jadi 6 console.log(x); // 6 const z = ++x + 1; // z = 8 (x jadi 7 dulu) Coercion saat +: jika salah satu operand string, keduanya jadi string. 1 + 2 // 3 (number) \"1\" + 2 // \"12\" (string!) 1 + 2 + \"3\" // \"33\" \"1\" - 1 // 0 ( Arithmetic memaksa number ) \"5\" * \"2\" // 10"
      },
      {
        "id": "c6",
        "no": 6,
        "title": "String dan Template Literal",
        "plainTitle": "String dan Template Literal",
        "priority": "P1",
        "minutes": 10,
        "short": "String & template literal",
        "tags": [
          "string",
          "slice",
          "replace",
          "split",
          "trim",
          "includes",
          "padStart",
          "uppercase",
          "regex"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "String bersifat <strong>immutable</strong> — method selalu mengembalikan string baru."
          },
          {
            "type": "code",
            "code": "const nama = \"Moh Iqbal\", umur = 26;\nconst s = `Halo ${nama}, umur ${umur} tahun`;\nconst s2 = `Total: ${1 + 2}`;\nconst s3 = `Line1\nLine2`;\nconst s4 = `Nama: ${nama.toUpperCase()}`;  // ekspresi di dalam ${} boleh statement",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Method yang paling sering dipakai"
          },
          {
            "type": "code",
            "code": "\"Halo Dunia\".toUpperCase()      // \"HALO DUNIA\"\n\"Halo\".indexOf(\"l\")                // 2  (tidak ada = -1)\n\"Halo\".includes(\"al\")              // true\n\"Halo Dunia\".split(\" \")            // [\"Halo\",\"Dunia\"]\n\"Halo\".slice(1, 3)                 // \"al\"\n\"Halo\".substring(1, 3)             // \"al\"\n\"Halo\".replace(\"a\", \"o\")           // \"Holo\"  (hanya yang pertama)\n\"Halo\".replaceAll(\"a\", \"o\")        // \"Holo\"\n\"  halo  \".trim()                  // \"halo\"\n\"abc\".padStart(5, \"0\")             // \"00abc\"\n\"abc\".at(-1)                       // \"c\"  (index negatif)\n\"abc\".charAt(0)                    // \"a\"\n[...\"abc\"]                          // [\"a\",\"b\",\"c\"]\n\"a-b-c\".replaceAll(\"-\", \"+\")       // \"a+b+c\"",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Perbandingan string"
          },
          {
            "type": "code",
            "code": "\"a\" < \"b\"      // true  -> banding leksikografis (huruf kecil)\n\"10\" < \"9\"      // true  -> string dibandingkan karakter demi karakter!\n10 < 9           // false ->number dibandingkan secara numerik\n\"b\" > \"a\"       // true",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "warn",
            "title": "Penting: selalu konversi ke number saat membandingkan angka: Number(a) &gt; Number(b) atau +a &gt; +b. Gunakan String() untuk konversi eksplisit.",
            "body": []
          }
        ],
        "searchText": "String dan Template Literal String & template literal string slice replace split trim includes padStart uppercase regex String bersifat immutable — method selalu mengembalikan string baru. const nama = \"Moh Iqbal\", umur = 26; const s = `Halo ${nama}, umur ${umur} tahun`; const s2 = `Total: ${1 + 2}`; const s3 = `Line1 Line2`; const s4 = `Nama: ${nama.toUpperCase()}`; // ekspresi di dalam ${} boleh statement Method yang paling sering dipakai \"Halo Dunia\".toUpperCase() // \"HALO DUNIA\" \"Halo\".indexOf(\"l\") // 2 (tidak ada = -1) \"Halo\".includes(\"al\") // true \"Halo Dunia\".split(\" \") // [\"Halo\",\"Dunia\"] \"Halo\".slice(1, 3) // \"al\" \"Halo\".substring(1, 3) // \"al\" \"Halo\".replace(\"a\", \"o\") // \"Holo\" (hanya yang pertama) \"Halo\".replaceAll(\"a\", \"o\") // \"Holo\" \" halo \".trim() // \"halo\" \"abc\".padStart(5, \"0\") // \"00abc\" \"abc\".at(-1) // \"c\" (index negatif) \"abc\".charAt(0) // \"a\" [...\"abc\"] // [\"a\",\"b\",\"c\"] \"a-b-c\".replaceAll(\"-\", \"+\") // \"a+b+c\" Perbandingan string \"a\" < \"b\" // true -> banding leksikografis (huruf kecil) \"10\" < \"9\" // true -> string dibandingkan karakter demi karakter! 10 < 9 // false ->number dibandingkan secara numerik \"b\" > \"a\" // true Penting: selalu konversi ke number saat membandingkan angka: Number(a) &gt; Number(b) atau +a &gt; +b. Gunakan String() untuk konversi eksplisit."
      },
      {
        "id": "c7",
        "no": 7,
        "title": "Optional Chaining <code>?.</code> dan Nullish <code>??</code>",
        "plainTitle": "Optional Chaining ?. dan Nullish ??",
        "priority": "P2",
        "minutes": 8,
        "short": "?. dan ??",
        "tags": [
          "optional",
          "chaining",
          "nullish",
          "coalescing",
          "es2020",
          "safety"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "const user = { profile: { nama: \"A\" } };\n\nuser?.profile?.nama          // \"A\"\nuser?.profile?.alamat?.kota // undefined, tidak error\nuser?.profile.alamat.kota   // undefined juga (yang optional = profile)\n\nconst arr = null;\narr?.[0]                     // undefined (optional untuk index)\narr?.length                  // undefined\n\nconst fn = null;\nfn?.()                       // tidak dipanggil, tidak error",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "// Perbedaan || vs ??\nconst total = 0, data = null;\ntotal || 10     // 10   // Perbedaan || vs ??\nconst total = 0, data = null;\ntotal || 10     // 10   <-- salah, 0 seharusnya tetap 0\ntotal ?? 10     // 0    // Perbedaan || vs ??\nconst total = 0, data = null;\ntotal || 10     // 10   <-- salah, 0 seharusnya tetap 0\ntotal ?? 10     // 0    <-- benar\ndata ?? \"kosong\" // \"kosong\"\n\ndata || \"kosong\" // \"kosong\" (null ikut terseleksi)",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "warn",
            "title": "Tidak boleh dicampur tanpa kurung: a || b?.c adalah SyntaxError. Tulis (a || b)?.c.",
            "body": []
          }
        ],
        "searchText": "Optional Chaining ?. dan Nullish ?? ?. dan ?? optional chaining nullish coalescing es2020 safety const user = { profile: { nama: \"A\" } }; user?.profile?.nama // \"A\" user?.profile?.alamat?.kota // undefined, tidak error user?.profile.alamat.kota // undefined juga (yang optional = profile) const arr = null; arr?.[0] // undefined (optional untuk index) arr?.length // undefined const fn = null; fn?.() // tidak dipanggil, tidak error // Perbedaan || vs ?? const total = 0, data = null; total || 10 // 10 // Perbedaan || vs ?? const total = 0, data = null; total || 10 // 10 <-- salah, 0 seharusnya tetap 0 total ?? 10 // 0 // Perbedaan || vs ?? const total = 0, data = null; total || 10 // 10 <-- salah, 0 seharusnya tetap 0 total ?? 10 // 0 <-- benar data ?? \"kosong\" // \"kosong\" data || \"kosong\" // \"kosong\" (null ikut terseleksi) Tidak boleh dicampur tanpa kurung: a || b?.c adalah SyntaxError. Tulis (a || b)?.c."
      }
    ]
  },
  {
    "id": "m2",
    "track": "js",
    "no": "2",
    "title": "Fungsi, <code>this</code>, dan Closure",
    "plainTitle": "2 Fungsi, this, dan Closure",
    "desc": "Bagian yang paling sering \"jebakan\" di interview. Pahami <em>kenapa</em>, bukan hanya syntax-nya.",
    "priorityNote": "Wajib dikuasai",
    "minutes": 57,
    "chapters": [
      {
        "id": "c8",
        "no": 1,
        "title": "Tiga Cara Mendeklarasikan Fungsi",
        "plainTitle": "Tiga Cara Mendeklarasikan Fungsi",
        "priority": "P1",
        "minutes": 12,
        "short": "3 cara declare function",
        "tags": [
          "function",
          "declaration",
          "expression",
          "arrow",
          "hoisting",
          "anonymous"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "// 1. Function Declaration -> di-hoist, bisa dipanggil sebelum dideklarasikan\nfunction tambah(a, b) { return a + b; }\n\n// 2. Function Expression -> TIDAK di-hoist, harus dipanggil setelah dideklarasikan\nconst kali = function (a, b) { return a * b; };\nconst anon  = function () {};          // anonymous\n\n// 3. Arrow Function -> TIDAK punya this sendiri, tidak ada arguments\nconst bagi = (a, b) => a / b;\nconst satuArg = a => a * 2;\nconst tanpaArg = () => \"halo\";\nconst blok = () => { return 1; };",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "tambah(1, 2);        // OK (hoisted)\nkali(2, 3);         // ReferenceError!\n\nconst f = function nama() {};  // named expression -> bisa rekursif\nconst g = function() { g(); }; //anonymous, hanya bisa rekursif lewat variabel",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Arrow vs Regular — perbedaan nyata"
          },
          {
            "type": "table",
            "head": [
              "Aspek",
              "Regular function",
              "Arrow function"
            ],
            "rows": [
              [
                "<code>this</code>",
                "Ditentukan cara dipanggil",
                "Diambil dari lexical scope"
              ],
              [
                "<code>arguments</code>",
                "Ada",
                "Tidak ada (gunakan rest <code>...args</code>)"
              ],
              [
                "Hoisting",
                "Ya (declaration)",
                "Tidak (mirip variabel)"
              ],
              [
                "Dipakai sebagai constructor",
                "Bisa (<code>new</code>)",
                "<strong>Tidak bisa</strong>"
              ],
              [
                "Method object",
                "Rekomendasi",
                "Hindari (this jadi object luar)"
              ],
              [
                "Jumlah parameter",
                "Bisa banyak",
                "Harus tepat 1"
              ]
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Kapan pakai apa: arrow untuk callback, function pendek, dan logic yang tidak butuh this. Regular function untuk method object, constructor, event handler yang butuh this, atau saat butuh arguments.",
            "body": []
          }
        ],
        "searchText": "Tiga Cara Mendeklarasikan Fungsi 3 cara declare function function declaration expression arrow hoisting anonymous // 1. Function Declaration -> di-hoist, bisa dipanggil sebelum dideklarasikan function tambah(a, b) { return a + b; } // 2. Function Expression -> TIDAK di-hoist, harus dipanggil setelah dideklarasikan const kali = function (a, b) { return a * b; }; const anon = function () {}; // anonymous // 3. Arrow Function -> TIDAK punya this sendiri, tidak ada arguments const bagi = (a, b) => a / b; const satuArg = a => a * 2; const tanpaArg = () => \"halo\"; const blok = () => { return 1; }; tambah(1, 2); // OK (hoisted) kali(2, 3); // ReferenceError! const f = function nama() {}; // named expression -> bisa rekursif const g = function() { g(); }; //anonymous, hanya bisa rekursif lewat variabel Arrow vs Regular — perbedaan nyata Aspek Regular function Arrow function <code>this</code> Ditentukan cara dipanggil Diambil dari lexical scope <code>arguments</code> Ada Tidak ada (gunakan rest <code>...args</code>) Hoisting Ya (declaration) Tidak (mirip variabel) Dipakai sebagai constructor Bisa (<code>new</code>) <strong>Tidak bisa</strong> Method object Rekomendasi Hindari (this jadi object luar) Jumlah parameter Bisa banyak Harus tepat 1 Kapan pakai apa: arrow untuk callback, function pendek, dan logic yang tidak butuh this. Regular function untuk method object, constructor, event handler yang butuh this, atau saat butuh arguments."
      },
      {
        "id": "c9",
        "no": 2,
        "title": "<code>this</code>, <code>call</code>, <code>apply</code>, <code>bind</code>",
        "plainTitle": "this, call, apply, bind",
        "priority": "P1",
        "minutes": 15,
        "short": "this, call, apply, bind",
        "tags": [
          "this",
          "binding",
          "implicit",
          "explicit",
          "call",
          "apply",
          "bind",
          "mode",
          "strict"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "<code>this</code> ditentukan oleh <strong>cara fungsi dipanggil</strong>, bukan di mana ditulis. Empat aturannya:"
          },
          {
            "type": "ol",
            "items": [
              "<strong>Default binding</strong> — dipanggil tanpa konteks → <code>this</code> = <code>undefined</code> di strict mode, <code>globalThis</code> di sloppy mode.",
              "<strong>Implicit binding</strong> — dipanggil sebagai <code>obj.method()</code> → <code>this</code> = <code>obj</code>.",
              "<strong>Explicit binding</strong> — <code>call</code>/<code>apply</code>/<code>bind</code> menentukan <code>this</code> manual.",
              "<strong><code>new</code> binding</strong> — <code>this</code> = object baru yang dibuat."
            ]
          },
          {
            "type": "code",
            "code": "const user = { nama: \"A\", sapa() { return \"Halo \" + this.nama; } };\n\nuser.sapa();                      // \"Halo A\"  (implicit)\n\n// dipassing sebagai callback -> this hilang\nconst f = user.sapa;\nf();                              // Error/ undefined\n\n// bind permanen\nconst f2 = user.sapa.bind(user);\nf2();                             // \"Halo A\"\n\n// call: panggil sekarang, tentukan this + argument terpisah\nuser.sapa.call({ nama: \"B\" });                    // \"Halo B\"\nuser.sapa.call({ nama: \"B\" }, \"extra\");            // argumen setelah this\n\n// apply: sama seperti call tapi argumen berupa array\nuser.sapa.apply({ nama: \"C\" });                   // \"Halo C\"\n\n// Arrow function mengunci this\nconst obj = {\n  nama: \"X\",\n  delaysaya() {\n    setTimeout(() => console.log(this.nama), 100); // \"X\"  (arrow)\n    setTimeout(function () { console.log(this.nama); }, 100); // error\n  }\n};",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"this di regular function ditentukan dari cara dipanggil. Arrow function tidak punya this sendiri, dia mengambil dari scope di atasnya, jadi aman untuk callback.\"",
            "body": []
          }
        ],
        "searchText": "this, call, apply, bind this, call, apply, bind this binding implicit explicit call apply bind mode strict this ditentukan oleh cara fungsi dipanggil, bukan di mana ditulis. Empat aturannya: Default binding — dipanggil tanpa konteks → this = undefined di strict mode, globalThis di sloppy mode. Implicit binding — dipanggil sebagai obj.method() → this = obj. Explicit binding — call / apply / bind menentukan this manual. new binding — this = object baru yang dibuat. const user = { nama: \"A\", sapa() { return \"Halo \" + this.nama; } }; user.sapa(); // \"Halo A\" (implicit) // dipassing sebagai callback -> this hilang const f = user.sapa; f(); // Error/ undefined // bind permanen const f2 = user.sapa.bind(user); f2(); // \"Halo A\" // call: panggil sekarang, tentukan this + argument terpisah user.sapa.call({ nama: \"B\" }); // \"Halo B\" user.sapa.call({ nama: \"B\" }, \"extra\"); // argumen setelah this // apply: sama seperti call tapi argumen berupa array user.sapa.apply({ nama: \"C\" }); // \"Halo C\" // Arrow function mengunci this const obj = { nama: \"X\", delaysaya() { setTimeout(() => console.log(this.nama), 100); // \"X\" (arrow) setTimeout(function () { console.log(this.nama); }, 100); // error } }; Jawab singkat: \"this di regular function ditentukan dari cara dipanggil. Arrow function tidak punya this sendiri, dia mengambil dari scope di atasnya, jadi aman untuk callback.\""
      },
      {
        "id": "c10",
        "no": 3,
        "title": "Closure",
        "plainTitle": "Closure",
        "priority": "P1",
        "minutes": 12,
        "short": "Closure",
        "tags": [
          "closure",
          "counter",
          "memoize",
          "private",
          "state",
          "iife"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Closure = sebuah function yang masih ingat variabel dari scope di tempat ia didefinisikan, <strong>meski scope itu sudah selesai dieksekusi</strong>."
          },
          {
            "type": "code",
            "code": "function buatCounter() {\n  let count = 0;                      // variabel privat\n  return function () { count++; return count; };\n}\nconst next = buatCounter();\nnext(); // 1\nnext(); // 2\nnext(); // 3  -> count tidak hilang, hidup di closure",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Closure ++"
          },
          {
            "type": "code",
            "code": "const konter = buatCounter(); const konter2 = buatCounter();\nkonter(); konter();  // konter  -> 2\nkonter2();           // konter2 -> 1  (setiap panggilan = state terpisah)",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Pola memoization (closure + cache)"
          },
          {
            "type": "code",
            "code": "function memoize(fn) {\n  const cache = {};\n  return function (...args) {\n    const key = JSON.stringify(args);\n    if (cache[key]) return cache[key];\n    cache[key] = fn.apply(this, args);\n    return cache[key];\n  };\n}\nconst lambat = memoize((n) => n * 2);\nlambat(5); lambat(5);   // perhitungan kedua tidak diulang",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Bug klasik: closure di dalam loop"
          },
          {
            "type": "code",
            "code": "// var -> semua callback memakai variable yang SAMA (nilai terakhir)\nfor (var i = 0; i < 3; i++) setTimeout(() => console.log(i));   // 3 3 3\n\n// let -> variable baru tiap iterasi\nfor (let i = 0; i < 3; i++) setTimeout(() => console.log(i));   // 0 1 2",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Dipakai di: encapsulation/private state, factory function, callback, event handler, memoization, dan-most sering: fungsi counter di atas.",
            "body": []
          }
        ],
        "searchText": "Closure Closure closure counter memoize private state iife Closure = sebuah function yang masih ingat variabel dari scope di tempat ia didefinisikan, meski scope itu sudah selesai dieksekusi. function buatCounter() { let count = 0; // variabel privat return function () { count++; return count; }; } const next = buatCounter(); next(); // 1 next(); // 2 next(); // 3 -> count tidak hilang, hidup di closure Closure ++ const konter = buatCounter(); const konter2 = buatCounter(); konter(); konter(); // konter -> 2 konter2(); // konter2 -> 1 (setiap panggilan = state terpisah) Pola memoization (closure + cache) function memoize(fn) { const cache = {}; return function (...args) { const key = JSON.stringify(args); if (cache[key]) return cache[key]; cache[key] = fn.apply(this, args); return cache[key]; }; } const lambat = memoize((n) => n * 2); lambat(5); lambat(5); // perhitungan kedua tidak diulang Bug klasik: closure di dalam loop // var -> semua callback memakai variable yang SAMA (nilai terakhir) for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 3 3 3 // let -> variable baru tiap iterasi for (let i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 0 1 2 Dipakai di: encapsulation/private state, factory function, callback, event handler, memoization, dan-most sering: fungsi counter di atas."
      },
      {
        "id": "c11",
        "no": 4,
        "title": "IIFE dan Module Pattern",
        "plainTitle": "IIFE dan Module Pattern",
        "priority": "P2",
        "minutes": 8,
        "short": "IIFE & module pattern",
        "tags": [
          "iife",
          "module",
          "pattern",
          "encapsulation",
          "revealing",
          "pattern"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "<strong>IIFE</strong> (Immediately Invoked Function Expression): function yang langsung dipanggil saat dideklarasikan. Kegunaan: membuat private scope, avoiding global pollution."
          },
          {
            "type": "code",
            "code": "(function () {\n  const rahasia = \"hanya di dalam sini\";\n  console.log(rahasia);\n})();\nconsole.log(rahasia);   // ReferenceError\n\n// versi modern dengan arrow\n(() => { console.log(\"halo\"); })();\n\n// Module pattern\nconst Module = (function () {\n  const nilai = 0;\n  return {\n    tambah(x) { nilai += x; },\n    get() { return nilai; }\n  };\n})();\nModule.tambah(5); Module.get(); // 5",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Dalam ES6+, sebagian besar kasus IIFE sudah digantikan oleh block scope + const. Module pattern kini lebih relevan sebagai pola encapsulation ketika butuh API publik yang terbatas.",
            "body": []
          }
        ],
        "searchText": "IIFE dan Module Pattern IIFE & module pattern iife module pattern encapsulation revealing pattern IIFE (Immediately Invoked Function Expression): function yang langsung dipanggil saat dideklarasikan. Kegunaan: membuat private scope, avoiding global pollution. (function () { const rahasia = \"hanya di dalam sini\"; console.log(rahasia); })(); console.log(rahasia); // ReferenceError // versi modern dengan arrow (() => { console.log(\"halo\"); })(); // Module pattern const Module = (function () { const nilai = 0; return { tambah(x) { nilai += x; }, get() { return nilai; } }; })(); Module.tambah(5); Module.get(); // 5 Dalam ES6+, sebagian besar kasus IIFE sudah digantikan oleh block scope + const. Module pattern kini lebih relevan sebagai pola encapsulation ketika butuh API publik yang terbatas."
      },
      {
        "id": "c12",
        "no": 5,
        "title": "Parameter: Default, Rest, Destructuring",
        "plainTitle": "Parameter: Default, Rest, Destructuring",
        "priority": "P1",
        "minutes": 10,
        "short": "Parameter: default, rest, destructuring",
        "tags": [
          "default",
          "parameter",
          "rest",
          "spread",
          "destructuring",
          "arguments"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "// Default parameter (hanya berlaku untuk undefined, bukan null)\nfunction sapa(nama = \"Teman\") { return \"Halo \" + nama; }\nsapa();        // \"Halo Teman\"\nsapa(null);    // \"Halo null\"  // Default parameter (hanya berlaku untuk undefined, bukan null)\nfunction sapa(nama = \"Teman\") { return \"Halo \" + nama; }\nsapa();        // \"Halo Teman\"\nsapa(null);    // \"Halo null\"  <-- jebakan!\nsapa(\"A\");     // \"Halo A\"\n\n// Rest parameter -> array dari sisa argumen\nfunction jumlah(...nums) { return nums.reduce((a, b) => a + b, 0); }\njumlah(1, 2, 3);      // 6\n\n// Destructuring di parameter\nfunction jualkan({ produk, qty = 1, harga }) {\n  return { produk, total: qty * harga };\n}\njualkan({ produk: \"Kopi\", harga: 15000 });   // total 15000\n\n// Destructuring array + default\nconst [a = 0, b = 0] = [10];\nconsole.log(b);   // 0\n\n// Rename saat destructure\nconst { nama: namaBaru } = { nama: \"A\" };   // namaBaru = \"A\"",
            "lang": "js"
          }
        ],
        "searchText": "Parameter: Default, Rest, Destructuring Parameter: default, rest, destructuring default parameter rest spread destructuring arguments // Default parameter (hanya berlaku untuk undefined, bukan null) function sapa(nama = \"Teman\") { return \"Halo \" + nama; } sapa(); // \"Halo Teman\" sapa(null); // \"Halo null\" // Default parameter (hanya berlaku untuk undefined, bukan null) function sapa(nama = \"Teman\") { return \"Halo \" + nama; } sapa(); // \"Halo Teman\" sapa(null); // \"Halo null\" <-- jebakan! sapa(\"A\"); // \"Halo A\" // Rest parameter -> array dari sisa argumen function jumlah(...nums) { return nums.reduce((a, b) => a + b, 0); } jumlah(1, 2, 3); // 6 // Destructuring di parameter function jualkan({ produk, qty = 1, harga }) { return { produk, total: qty * harga }; } jualkan({ produk: \"Kopi\", harga: 15000 }); // total 15000 // Destructuring array + default const [a = 0, b = 0] = [10]; console.log(b); // 0 // Rename saat destructure const { nama: namaBaru } = { nama: \"A\" }; // namaBaru = \"A\""
      }
    ]
  },
  {
    "id": "m3",
    "track": "js",
    "no": "3",
    "title": "Scope, Hoisting, dan TDZ",
    "plainTitle": "3 Scope, Hoisting, dan TDZ",
    "desc": "Topik yang sering ditanya hanya untuk satu baris kode, tapi menentukan benar atau salahnya program Anda.",
    "priorityNote": "Wajib dikuasai",
    "minutes": 30,
    "chapters": [
      {
        "id": "c13",
        "no": 1,
        "title": "Tiga Jenis Scope",
        "plainTitle": "Tiga Jenis Scope",
        "priority": "P1",
        "minutes": 10,
        "short": "3 jenis scope",
        "tags": [
          "scope",
          "global",
          "function",
          "block",
          "closure",
          "module",
          "lexical"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "const global = \"global\";              // 1. Global scope\n\nfunction luar() {\n  const lokal = \"lokal\";               // 2. Function scope\n  if (true) {\n    const blok = \"blok\";               // 3. Block scope ({} baru)\n    console.log(blok, lokal, global);  // semua bisa diakses\n  }\n  console.log(blok);   // ReferenceError: blok tidak dikenal di sini\n}\nconsole.log(lokal);    // ReferenceError",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "<strong>Global scope</strong> — variabel paling luar, bisa diakses dari mana saja. <code>var</code> di level atas menjadi properti <code>window</code>.",
              "<strong>Function scope</strong> — di dalam function. Hanya <code>var</code> dan parameter yang ikut ter-hoist ke sini.",
              "<strong>Block scope</strong> — di dalam <code>{}</code>: <code>if</code>, <code>for</code>, <code>while</code>, <code>try</code>, atau blok <code>{}</code> biasa. Berlaku untuk <code>let</code>, <code>const</code>, <code>class</code>.",
              "<strong>Module scope</strong> — setiap file ES module punya scope sendiri, tidak Bocor ke global."
            ]
          },
          {
            "type": "code",
            "code": "for (let i = 0; i < 3; i++) { }\nconsole.log(i);      // ReferenceError -> let tidak keluar dari blok for\n\nvar j = 1;\n{ var j = 2; }        // var BOCOR keluar blok\nconsole.log(j);       // 2",
            "lang": "js"
          }
        ],
        "searchText": "Tiga Jenis Scope 3 jenis scope scope global function block closure module lexical const global = \"global\"; // 1. Global scope function luar() { const lokal = \"lokal\"; // 2. Function scope if (true) { const blok = \"blok\"; // 3. Block scope ({} baru) console.log(blok, lokal, global); // semua bisa diakses } console.log(blok); // ReferenceError: blok tidak dikenal di sini } console.log(lokal); // ReferenceError Global scope — variabel paling luar, bisa diakses dari mana saja. var di level atas menjadi properti window. Function scope — di dalam function. Hanya var dan parameter yang ikut ter-hoist ke sini. Block scope — di dalam {}: if, for, while, try, atau blok {} biasa. Berlaku untuk let, const, class. Module scope — setiap file ES module punya scope sendiri, tidak Bocor ke global. for (let i = 0; i < 3; i++) { } console.log(i); // ReferenceError -> let tidak keluar dari blok for var j = 1; { var j = 2; } // var BOCOR keluar blok console.log(j); // 2"
      },
      {
        "id": "c14",
        "no": 2,
        "title": "Hoisting dan Temporal Dead Zone",
        "plainTitle": "Hoisting dan Temporal Dead Zone",
        "priority": "P1",
        "minutes": 12,
        "short": "Hoisting & TDZ",
        "tags": [
          "hoisting",
          "tdz",
          "temporal",
          "dead",
          "zone",
          "function",
          "hoisting",
          "var",
          "let",
          "const"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "<strong>Hoisting</strong> = deklarasi diproses ke atas sebelum kode dieksekusi. Yang dipindahkan ke atas hanya <strong>deklarasi</strong>, bukan nilai."
          },
          {
            "type": "h4",
            "html": "Pada <code>var</code> dan function declaration"
          },
          {
            "type": "code",
            "code": "console.log(nilai);   // undefined  (tidak error)\nconsole.log(sapa());   // \"halo\"     (function declaration ikut ter-hoist penuh)\nvar nilai = 10;\nfunction sapa() { return \"halo\"; }\n\n// secara konsep menjadi:\nvar nilai;               // declaration naik\nconsole.log(nilai);\nnilai = 10;              // assignment tetap di tempat",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Pada <code>let</code> dan <code>const</code>"
          },
          {
            "type": "code",
            "code": "console.log(umur);   // ReferenceError!\nlet umur = 26;\n// Sinkron: variabel sudah \"ada\" tapi belum diinisialisasi\n// -> disebut Temporal Dead Zone (TDZ)",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Perbandingan"
          },
          {
            "type": "table",
            "head": [
              "Warna",
              "Sebelum deklarasi"
            ],
            "rows": [
              [
                "<code>var</code>",
                "<code>undefined</code>"
              ],
              [
                "<code>function</code>",
                "fungsi bisa langsung dipanggil"
              ],
              [
                "<code>let</code> / <code>const</code>",
                "<strong>ReferenceError</strong> (TDZ)"
              ],
              [
                "<code>class</code>",
                "ReferenceError (seperti let)"
              ]
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Hoisting adalah proses JavaScript memindahkan deklarasi ke atas scope sebelum eksekusi. var di-hoist jadi undefined, sedangkan let/const masuk TDZ sehingga memicu error kalau diakses sebelum deklarasi. Karena itu best practice kita declare di atas dan hindari var.\"",
            "body": []
          }
        ],
        "searchText": "Hoisting dan Temporal Dead Zone Hoisting & TDZ hoisting tdz temporal dead zone function hoisting var let const Hoisting = deklarasi diproses ke atas sebelum kode dieksekusi. Yang dipindahkan ke atas hanya deklarasi, bukan nilai. Pada var dan function declaration console.log(nilai); // undefined (tidak error) console.log(sapa()); // \"halo\" (function declaration ikut ter-hoist penuh) var nilai = 10; function sapa() { return \"halo\"; } // secara konsep menjadi: var nilai; // declaration naik console.log(nilai); nilai = 10; // assignment tetap di tempat Pada let dan const console.log(umur); // ReferenceError! let umur = 26; // Sinkron: variabel sudah \"ada\" tapi belum diinisialisasi // -> disebut Temporal Dead Zone (TDZ) Perbandingan Warna Sebelum deklarasi <code>var</code> <code>undefined</code> <code>function</code> fungsi bisa langsung dipanggil <code>let</code> / <code>const</code> <strong>ReferenceError</strong> (TDZ) <code>class</code> ReferenceError (seperti let) Jawab singkat: \"Hoisting adalah proses JavaScript memindahkan deklarasi ke atas scope sebelum eksekusi. var di-hoist jadi undefined, sedangkan let/const masuk TDZ sehingga memicu error kalau diakses sebelum deklarasi. Karena itu best practice kita declare di atas dan hindari var.\""
      },
      {
        "id": "c15",
        "no": 3,
        "title": "JavaScript di Browser: <code>window</code> dan <code>document</code>",
        "plainTitle": "JavaScript di Browser: window dan document",
        "priority": "P2",
        "minutes": 8,
        "short": "JavaScript di browser",
        "tags": [
          "window",
          "document",
          "console",
          "global",
          "object",
          "alert",
          "prompt",
          "confirm"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Browser menyediakan objek global: <code>window</code> (atau <code>globalThis</code>) dan <code>document</code>."
          },
          {
            "type": "code",
            "code": "console.log(\"halo\");        // println ke console\nalert(\"halo\");               // popup\nprompt(\"Nama?\");             // input teks -> string / null\nconfirm(\"Lanjut?\");          // true / false",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "<code>setTimeout(fn, ms)</code> — jalankan sekali setelah ms.",
              "<code>setInterval(fn, ms)</code> — jalankan berulang setiap ms. Butuh <code>clearInterval</code>.",
              "<code>location</code> — URL halaman. <code>location.href = url</code> untuk pindah halaman.",
              "<code>history.back()</code> / <code>history.forward()</code>.",
              "<code>globalThis</code> — cara universal untuk mengambil objek global (browser &amp; Node)."
            ]
          }
        ],
        "searchText": "JavaScript di Browser: window dan document JavaScript di browser window document console global object alert prompt confirm Browser menyediakan objek global: window (atau globalThis) dan document. console.log(\"halo\"); // println ke console alert(\"halo\"); // popup prompt(\"Nama?\"); // input teks -> string / null confirm(\"Lanjut?\"); // true / false setTimeout(fn, ms) — jalankan sekali setelah ms. setInterval(fn, ms) — jalankan berulang setiap ms. Butuh clearInterval. location — URL halaman. location.href = url untuk pindah halaman. history.back() / history.forward(). globalThis — cara universal untuk mengambil objek global (browser &amp; Node)."
      }
    ]
  },
  {
    "id": "m4",
    "track": "js",
    "no": "4",
    "title": "Object, Array, dan Destructuring",
    "plainTitle": "4 Object, Array, dan Destructuring",
    "desc": "Struktur data sehari-hari. Object = koleksi properti, Array = koleksi berurutan.",
    "priorityNote": "Wajib dikuasai",
    "minutes": 52,
    "chapters": [
      {
        "id": "c16",
        "no": 1,
        "title": "Object: Properti, Method, Akses",
        "plainTitle": "Object: Properti, Method, Akses",
        "priority": "P1",
        "minutes": 12,
        "short": "Object dasar",
        "tags": [
          "object",
          "property",
          "method",
          "key",
          "shorthand",
          "computed",
          "delete",
          "in",
          "hasOwn"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "const user = {\n  nama: \"Moh Iqbal\",\n  umur: 26,\n  kerja: () => \"QA\",\n  sapa() { return \"Halo \" + this.nama; }   // method (this = object)\n};\n\nuser.nama;        // \"Moh Iqbal\"   (dot notation)\nuser[\"nama\"];    // \"Moh Iqbal\"   (bracket, wajib untuk key dinamis)\nuser.kerja();     // \"QA\"\nuser.sapa();      // \"Halo Moh Iqbal\"\n\n// shorthand: nama variabel = nama properti\nconst umur = 26;\nconst u1 = { umur };          // sama dengan { umur: umur }\n\n// computed property (key dinamis)\nconst key = \"umur\";\nconst u2 = { [key]: 26 };     // { umur: 26 }\nconst u3 = { [`${key}_lama`]: 20 };  // { umur_lama: 20 }",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Operasi object"
          },
          {
            "type": "code",
            "code": "user.kota = \"Jakarta\";    // tambah\ndelete user.kota;           // hapus\n\"nama\" in user;             // true\nObject.keys(user);          // [\"nama\",\"umur\",\"kerja\",\"sapa\"]\nObject.values(user);\nObject.entries(user);       // [[\"nama\",\"Moh Iqbal\"], ...]\nObject.hasOwn(user, \"nama\"); // true  (P2, lebih baik dari in)\nObject.assign({}, a, b);    // gabung object ( shallow )\nObject.freeze(user);        // kunci, tidak bisa diubah\nObject.isFrozen(user);      // true",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "warn",
            "title": "Catatan: Object.assign dan ... pada object hanya shallow copy — object di dalam tetap jadi reference yang sama.",
            "body": []
          }
        ],
        "searchText": "Object: Properti, Method, Akses Object dasar object property method key shorthand computed delete in hasOwn const user = { nama: \"Moh Iqbal\", umur: 26, kerja: () => \"QA\", sapa() { return \"Halo \" + this.nama; } // method (this = object) }; user.nama; // \"Moh Iqbal\" (dot notation) user[\"nama\"]; // \"Moh Iqbal\" (bracket, wajib untuk key dinamis) user.kerja(); // \"QA\" user.sapa(); // \"Halo Moh Iqbal\" // shorthand: nama variabel = nama properti const umur = 26; const u1 = { umur }; // sama dengan { umur: umur } // computed property (key dinamis) const key = \"umur\"; const u2 = { [key]: 26 }; // { umur: 26 } const u3 = { [`${key}_lama`]: 20 }; // { umur_lama: 20 } Operasi object user.kota = \"Jakarta\"; // tambah delete user.kota; // hapus \"nama\" in user; // true Object.keys(user); // [\"nama\",\"umur\",\"kerja\",\"sapa\"] Object.values(user); Object.entries(user); // [[\"nama\",\"Moh Iqbal\"], ...] Object.hasOwn(user, \"nama\"); // true (P2, lebih baik dari in) Object.assign({}, a, b); // gabung object ( shallow ) Object.freeze(user); // kunci, tidak bisa diubah Object.isFrozen(user); // true Catatan: Object.assign dan ... pada object hanya shallow copy — object di dalam tetap jadi reference yang sama."
      },
      {
        "id": "c17",
        "no": 2,
        "title": "Array: Indeks, Panjang, dan Metode yang Mengubah",
        "plainTitle": "Array: Indeks, Panjang, dan Metode yang Mengubah",
        "priority": "P1",
        "minutes": 10,
        "short": "Array dasar & mutating",
        "tags": [
          "array",
          "index",
          "push",
          "pop",
          "shift",
          "unshift",
          "slice",
          "splice",
          "concat",
          "length",
          "mutating"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "const arr = [10, 20, 30];\narr[0];        // 10\narr[5];        // undefined  (bukan error, indeks boleh lompat)\narr.length;    // 3\narr.length = 2;// boleh, akan MEMOTONG array -> [10, 20]",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Metode yang <strong>mengubah</strong> array asli (mutating)"
          },
          {
            "type": "table",
            "head": [
              "Metode",
              "Fungsi",
              "Hasil"
            ],
            "rows": [
              [
                "<code>push(x)</code>",
                "tambah di akhir",
                "length baru"
              ],
              [
                "<code>pop()</code>",
                "hapus di akhir",
                "elemen terakhir"
              ],
              [
                "<code>unshift(x)</code>",
                "tambah di depan",
                "length baru"
              ],
              [
                "<code>shift()</code>",
                "hapus di depan",
                "elemen pertama"
              ],
              [
                "<code>splice(i, hapus, ...tambah)</code>",
                "mengubah tengah",
                "array elemen terhapus"
              ],
              [
                "<code>sort()</code>",
                "urutkan (mengubah!)",
                "array itu sendiri"
              ],
              [
                "<code>reverse()</code>",
                "balik (mengubah)",
                "array itu sendiri"
              ]
            ]
          },
          {
            "type": "code",
            "code": "const a = [1, 2, 3];\na.push(4);      // [1,2,3,4]  length 4\na.pop();        // 4, a = [1,2,3]\na.unshift(0);   // [0,1,2,3]\na.shift();      // 0, a = [1,2,3]\n\na.splice(1, 2);        // hapus 2 elemen mulai index 1 -> a = [1]\nconst b = [1,2,3,4,5];\nb.splice(1, 2, \"a\", \"b\");  // sisip -> [1, \"a\", \"b\", 4, 5]\n\n// slice = TIDAK mengubah (salinan bagian)\nconst c = [1,2,3,4,5];\nc.slice(1, 3);     // [2,3]\nc.slice(-2);       // [4,5]  (negatif: dari belakang)\nc.slice(1);        // [2,3,4,5]\nc.concat([6,7]);   // [1,2,3,4,5,6,7]  (tidak mengubah)",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Method seperti push, pop, splice, sort mengubah array asal, sementara slice, concat, dan semua method higher-order seperti map/filter mengembalikan array baru.\"",
            "body": []
          }
        ],
        "searchText": "Array: Indeks, Panjang, dan Metode yang Mengubah Array dasar & mutating array index push pop shift unshift slice splice concat length mutating const arr = [10, 20, 30]; arr[0]; // 10 arr[5]; // undefined (bukan error, indeks boleh lompat) arr.length; // 3 arr.length = 2;// boleh, akan MEMOTONG array -> [10, 20] Metode yang mengubah array asli (mutating) Metode Fungsi Hasil <code>push(x)</code> tambah di akhir length baru <code>pop()</code> hapus di akhir elemen terakhir <code>unshift(x)</code> tambah di depan length baru <code>shift()</code> hapus di depan elemen pertama <code>splice(i, hapus, ...tambah)</code> mengubah tengah array elemen terhapus <code>sort()</code> urutkan (mengubah!) array itu sendiri <code>reverse()</code> balik (mengubah) array itu sendiri const a = [1, 2, 3]; a.push(4); // [1,2,3,4] length 4 a.pop(); // 4, a = [1,2,3] a.unshift(0); // [0,1,2,3] a.shift(); // 0, a = [1,2,3] a.splice(1, 2); // hapus 2 elemen mulai index 1 -> a = [1] const b = [1,2,3,4,5]; b.splice(1, 2, \"a\", \"b\"); // sisip -> [1, \"a\", \"b\", 4, 5] // slice = TIDAK mengubah (salinan bagian) const c = [1,2,3,4,5]; c.slice(1, 3); // [2,3] c.slice(-2); // [4,5] (negatif: dari belakang) c.slice(1); // [2,3,4,5] c.concat([6,7]); // [1,2,3,4,5,6,7] (tidak mengubah) Jawab singkat: \"Method seperti push, pop, splice, sort mengubah array asal, sementara slice, concat, dan semua method higher-order seperti map/filter mengembalikan array baru.\""
      },
      {
        "id": "c18",
        "no": 3,
        "title": "Destructuring",
        "plainTitle": "Destructuring",
        "priority": "P1",
        "minutes": 10,
        "short": "Destructuring",
        "tags": [
          "destructuring",
          "object",
          "array",
          "nested",
          "default",
          "rename",
          "swap"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Mengambil nilai dari array/object langsung ke variabel — satu baris, bukan <code>x[0]</code> atau <code>obj.a</code>."
          },
          {
            "type": "code",
            "code": "// Object\nconst user = { nama: \"A\", umur: 26, kota: \"Jakarta\" };\nconst { nama, umur } = user;          // nama = \"A\", umur = 26\n\n// Rename\nconst { nama: namaLain } = user;     // namaLain = \"A\"\n\n// Default value\nconst { negara = \"Indonesia\" } = user;  // negara = \"Indonesia\"\n\n// Nested\nconst { profile: { email } } = { profile: { email: \"a@b.c\" } };\n\n// Object di parameter fungsi\nfunction tampilkan({ nama, umur }) { console.log(nama, umur); }\ntampilkan(user);\n\n// Array\nconst [a, b, c] = [1, 2, 3];         // a=1, b=2, c=3\nconst [pertama, , ketiga] = [1,2,3];  // kedua dilewati (el kosong)\nconst [x = 10, y = 20] = [];          // x=10, y=20\n\n// Tukar nilai tanpa variabel sementara\nlet a = 1, b = 2;\n[a, b] = [b, a];",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Nested destructuring tanpa default akan error jika objectnya null — combine dengan default: const { profile: { email } = {} } = user || {};",
            "body": []
          }
        ],
        "searchText": "Destructuring Destructuring destructuring object array nested default rename swap Mengambil nilai dari array/object langsung ke variabel — satu baris, bukan x[0] atau obj.a. // Object const user = { nama: \"A\", umur: 26, kota: \"Jakarta\" }; const { nama, umur } = user; // nama = \"A\", umur = 26 // Rename const { nama: namaLain } = user; // namaLain = \"A\" // Default value const { negara = \"Indonesia\" } = user; // negara = \"Indonesia\" // Nested const { profile: { email } } = { profile: { email: \"a@b.c\" } }; // Object di parameter fungsi function tampilkan({ nama, umur }) { console.log(nama, umur); } tampilkan(user); // Array const [a, b, c] = [1, 2, 3]; // a=1, b=2, c=3 const [pertama, , ketiga] = [1,2,3]; // kedua dilewati (el kosong) const [x = 10, y = 20] = []; // x=10, y=20 // Tukar nilai tanpa variabel sementara let a = 1, b = 2; [a, b] = [b, a]; Nested destructuring tanpa default akan error jika objectnya null — combine dengan default: const { profile: { email } = {} } = user || {};"
      },
      {
        "id": "c19",
        "no": 4,
        "title": "Spread (<code>...</code>) dan Rest",
        "plainTitle": "Spread (...) dan Rest",
        "priority": "P1",
        "minutes": 10,
        "short": "Spread & Rest",
        "tags": [
          "spread",
          "rest",
          "object",
          "array",
          "copy",
          "merge",
          "clone"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "<strong>Rest</strong> = mengumpulkan sisa nilai jadi array/object. <strong>Spread</strong> = menyebarkan array/object jadi elemen individual. Sintaksnya sama (<code>...</code>), letaknya yang berbeda."
          },
          {
            "type": "code",
            "code": "// SPREAD: salin & gabung\nconst a = [1, 2];\nconst b = [...a, 3, 4];       // [1,2,3,4]\nconst c = [...a, ...b];       // [1,2,1,2,3,4]\n\nconst u1 = { nama: \"A\", umur: 26 };\nconst u2 = { ...u1, umur: 27 };   // { nama: \"A\", umur: 27 } (nimpa)\nconst u3 = { ...u1, kota: \"JKT\" }; // menambah properti baru\n\n// Spread sebagai argumen function\nfunction sum(a, b, c) { return a + b + c; }\nconst nums = [1, 2, 3];\nsum(...nums);     // 6\n\n// REST: kumpulkan argumen\nfunction jumlah(...args) { return args.reduce((x, y) => x + y, 0); }\njumlah(1, 2, 3);  // 6\n\n// REST di destructure object\nfunction tampilkan({ nama, ...sisa }) { console.log(nama, sisa); }\ntampilkan({ nama: \"A\", umur: 26, kota: \"JKT\" });\n// sisa = { umur: 26, kota: \"JKT\" }",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "warn",
            "title": "Spread hanya shallow copy. Untuk object di dalam object, Spread tidak meng-copy isinya.",
            "body": []
          }
        ],
        "searchText": "Spread (...) dan Rest Spread & Rest spread rest object array copy merge clone Rest = mengumpulkan sisa nilai jadi array/object. Spread = menyebarkan array/object jadi elemen individual. Sintaksnya sama (...), letaknya yang berbeda. // SPREAD: salin & gabung const a = [1, 2]; const b = [...a, 3, 4]; // [1,2,3,4] const c = [...a, ...b]; // [1,2,1,2,3,4] const u1 = { nama: \"A\", umur: 26 }; const u2 = { ...u1, umur: 27 }; // { nama: \"A\", umur: 27 } (nimpa) const u3 = { ...u1, kota: \"JKT\" }; // menambah properti baru // Spread sebagai argumen function function sum(a, b, c) { return a + b + c; } const nums = [1, 2, 3]; sum(...nums); // 6 // REST: kumpulkan argumen function jumlah(...args) { return args.reduce((x, y) => x + y, 0); } jumlah(1, 2, 3); // 6 // REST di destructure object function tampilkan({ nama, ...sisa }) { console.log(nama, sisa); } tampilkan({ nama: \"A\", umur: 26, kota: \"JKT\" }); // sisa = { umur: 26, kota: \"JKT\" } Spread hanya shallow copy. Untuk object di dalam object, Spread tidak meng-copy isinya."
      },
      {
        "id": "c20",
        "no": 5,
        "title": "<code>Set</code> dan <code>Map</code>",
        "plainTitle": "Set dan Map",
        "priority": "P2",
        "minutes": 10,
        "short": "Set & Map",
        "tags": [
          "set",
          "map",
          "collection",
          "unique",
          "key",
          "value",
          "iteration"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "<strong>Set</strong> = koleksi nilai <strong>unik</strong> (duplikat otomatis dihapus). <strong>Map</strong> = koleksi pasangan key-value dengan key unik (berbeda dari object biasa yang key-nya selalu string)."
          },
          {
            "type": "code",
            "code": "// SET\nconst set = new Set([1, 2, 2, 3, 3, 3]);\nconsole.log(set);            // Set(3) { 1, 2, 3 }\nset.size;                     // 3\nset.has(2);                   // true\nset.add(4); set.delete(1);\n[...set];                     // [2, 3, 4]\n\n// Hapus duplikat\nconst unik = [...new Set([1,1,2,2,3])];   // [1,2,3]\nconst unik2 = [...new Set([\"a\",\"a\",\"b\"])]; // [\"a\",\"b\"]\n\n// MAP\nconst map = new Map();\nmap.set(\"nama\", \"A\");\nmap.set(\"umur\", 26);\nmap.get(\"nama\");      // \"A\"\nmap.has(\"nama\");      // true\nmap.size;             // 2\nmap.delete(\"umur\");\nmap.keys();  map.values();  map.entries();\n[...map];              // [[\"nama\",\"A\"]]\n\n// Map bisa punya key non-string\nconst m2 = new Map([[1, \"satu\"], [true, \"ya\"]]);",
            "lang": "js"
          }
        ],
        "searchText": "Set dan Map Set & Map set map collection unique key value iteration Set = koleksi nilai unik (duplikat otomatis dihapus). Map = koleksi pasangan key-value dengan key unik (berbeda dari object biasa yang key-nya selalu string). // SET const set = new Set([1, 2, 2, 3, 3, 3]); console.log(set); // Set(3) { 1, 2, 3 } set.size; // 3 set.has(2); // true set.add(4); set.delete(1); [...set]; // [2, 3, 4] // Hapus duplikat const unik = [...new Set([1,1,2,2,3])]; // [1,2,3] const unik2 = [...new Set([\"a\",\"a\",\"b\"])]; // [\"a\",\"b\"] // MAP const map = new Map(); map.set(\"nama\", \"A\"); map.set(\"umur\", 26); map.get(\"nama\"); // \"A\" map.has(\"nama\"); // true map.size; // 2 map.delete(\"umur\"); map.keys(); map.values(); map.entries(); [...map]; // [[\"nama\",\"A\"]] // Map bisa punya key non-string const m2 = new Map([[1, \"satu\"], [true, \"ya\"]]);"
      }
    ]
  },
  {
    "id": "m5",
    "track": "js",
    "no": "5",
    "title": "Array Methods — Prioritas Tertinggi",
    "plainTitle": "5 Array Methods — Prioritas Tertinggi",
    "desc": "Ini yang paling sering dipakai di coding test. Kuasai sampai bisa memilih method yang tepat dalam 1 detik.",
    "priorityNote": "Wajib dikuasai",
    "minutes": 74,
    "chapters": [
      {
        "id": "c21",
        "no": 1,
        "title": "<code>map()</code>",
        "plainTitle": "map()",
        "priority": "P1",
        "minutes": 8,
        "short": "map()",
        "tags": [
          "map",
          "transform",
          "array",
          "baru",
          "return"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Ubah setiap elemen → <strong>balik array baru</strong> dengan panjang yang sama. Callback bisa menerima <code>(item, index, array)</code>."
          },
          {
            "type": "code",
            "code": "const nums = [1, 2, 3];\nnums.map(n => n * 2);          // [2, 4, 6]\nnums.map((n, i) => n + i);     // [1, 3, 5]\n\nconst users = [{ nama: \"A\", umur: 20 }, { nama: \"B\", umur: 30 }];\nusers.map(u => u.nama);        // [\"A\", \"B\"]  -> ubah object jadi string\nusers.map(u => ({ ...u, aktif: true }));  // tambah properti baru\n\n// map selalu return array baru, walau kosong\n[].map(x => x * 2);            // []",
            "lang": "js"
          }
        ],
        "searchText": "map() map() map transform array baru return Ubah setiap elemen → balik array baru dengan panjang yang sama. Callback bisa menerima (item, index, array). const nums = [1, 2, 3]; nums.map(n => n * 2); // [2, 4, 6] nums.map((n, i) => n + i); // [1, 3, 5] const users = [{ nama: \"A\", umur: 20 }, { nama: \"B\", umur: 30 }]; users.map(u => u.nama); // [\"A\", \"B\"] -> ubah object jadi string users.map(u => ({ ...u, aktif: true })); // tambah properti baru // map selalu return array baru, walau kosong [].map(x => x * 2); // []"
      },
      {
        "id": "c22",
        "no": 2,
        "title": "<code>filter()</code>",
        "plainTitle": "filter()",
        "priority": "P1",
        "minutes": 8,
        "short": "filter()",
        "tags": [
          "filter",
          "condition",
          "subset",
          "array",
          "baru"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Ambil elemen yang memenuhi kondisi (callback return truthy) → array baru, <strong>panjang bisa lebih pendek</strong>."
          },
          {
            "type": "code",
            "code": "const nums = [1, 2, 3, 4, 5, 6];\nnums.filter(n => n % 2 === 0);      // [2, 4, 6]\nnums.filter(n => n > 3);           // [4, 5, 6]\n\nconst users = [\n  { nama: \"A\", aktif: true },\n  { nama: \"B\", aktif: false },\n  { nama: \"C\", aktif: true }\n];\nusers.filter(u => u.aktif).map(u => u.nama);   // [\"A\", \"C\"]\n\n// filter string\n[\"apple\",\"banana\",\"cherry\"].filter(w => w.length > 5);  // [\"banana\",\"cherry\"]",
            "lang": "js"
          }
        ],
        "searchText": "filter() filter() filter condition subset array baru Ambil elemen yang memenuhi kondisi (callback return truthy) → array baru, panjang bisa lebih pendek. const nums = [1, 2, 3, 4, 5, 6]; nums.filter(n => n % 2 === 0); // [2, 4, 6] nums.filter(n => n > 3); // [4, 5, 6] const users = [ { nama: \"A\", aktif: true }, { nama: \"B\", aktif: false }, { nama: \"C\", aktif: true } ]; users.filter(u => u.aktif).map(u => u.nama); // [\"A\", \"C\"] // filter string [\"apple\",\"banana\",\"cherry\"].filter(w => w.length > 5); // [\"banana\",\"cherry\"]"
      },
      {
        "id": "c23",
        "no": 3,
        "title": "<code>find()</code> dan <code>findIndex()</code>",
        "plainTitle": "find() dan findIndex()",
        "priority": "P1",
        "minutes": 8,
        "short": "find() & findIndex()",
        "tags": [
          "find",
          "findIndex",
          "first",
          "match",
          "object",
          "search"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Cari <strong>satu</strong> elemen pertama yang cocok. <code>find</code> mengembalikan elemennya, <code>findIndex</code> mengembalikan indeksnya (-1 jika tidak ada)."
          },
          {
            "type": "code",
            "code": "const users = [\n  { id: 1, nama: \"A\" }, { id: 2, nama: \"B\" }, { id: 3, nama: \"C\" }\n];\nusers.find(u => u.id === 2);        // { id: 2, nama: \"B\" }\nusers.find(u => u.nama === \"Z\");    // undefined\nusers.findIndex(u => u.id === 2);   // 1\nusers.findIndex(u => u.id === 99);  // -1\n\n// Perbandingan penting: filter vs find\nusers.filter(u => u.id === 2);      // [{ id: 2, ... }]  (array)\nusers.find(u => u.id === 2);        // { id: 2, ... }    (object)",
            "lang": "js"
          }
        ],
        "searchText": "find() dan findIndex() find() & findIndex() find findIndex first match object search Cari satu elemen pertama yang cocok. find mengembalikan elemennya, findIndex mengembalikan indeksnya (-1 jika tidak ada). const users = [ { id: 1, nama: \"A\" }, { id: 2, nama: \"B\" }, { id: 3, nama: \"C\" } ]; users.find(u => u.id === 2); // { id: 2, nama: \"B\" } users.find(u => u.nama === \"Z\"); // undefined users.findIndex(u => u.id === 2); // 1 users.findIndex(u => u.id === 99); // -1 // Perbandingan penting: filter vs find users.filter(u => u.id === 2); // [{ id: 2, ... }] (array) users.find(u => u.id === 2); // { id: 2, ... } (object)"
      },
      {
        "id": "c24",
        "no": 4,
        "title": "<code>some()</code> dan <code>every()</code>",
        "plainTitle": "some() dan every()",
        "priority": "P1",
        "minutes": 8,
        "short": "some() & every()",
        "tags": [
          "some",
          "every",
          "boolean",
          "exist",
          "all",
          "condition"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Keduanya mengembalikan <strong>boolean</strong>, bukan array. <code>some</code> = minimal satu benar. <code>every</code> = semua benar. Keduanya <strong>short-circuit</strong> (berhenti di jawaban pertama)."
          },
          {
            "type": "code",
            "code": "[1,2,3].some(n => n > 2);       // true  (ada yang > 2)\n[1,2,3].every(n => n > 2);      // false (tidak semua)\n[2,4,6].every(n => n % 2 === 0); // true\n[].some(n => n > 0);            // false  (array kosong)\n[].every(n => n > 0);           // true   (vacuously true!)\n\n// Cek string kosong\nconst validasi = [\"a\", \"\", \"c\"];\nvalidasi.some(s => s === \"\");     // true -> ada yang kosong",
            "lang": "js"
          }
        ],
        "searchText": "some() dan every() some() & every() some every boolean exist all condition Keduanya mengembalikan boolean, bukan array. some = minimal satu benar. every = semua benar. Keduanya short-circuit (berhenti di jawaban pertama). [1,2,3].some(n => n > 2); // true (ada yang > 2) [1,2,3].every(n => n > 2); // false (tidak semua) [2,4,6].every(n => n % 2 === 0); // true [].some(n => n > 0); // false (array kosong) [].every(n => n > 0); // true (vacuously true!) // Cek string kosong const validasi = [\"a\", \"\", \"c\"]; validasi.some(s => s === \"\"); // true -> ada yang kosong"
      },
      {
        "id": "c25",
        "no": 5,
        "title": "<code>reduce()</code>",
        "plainTitle": "reduce()",
        "priority": "P1",
        "minutes": 12,
        "short": "reduce()",
        "tags": [
          "reduce",
          "accumulator",
          "sum",
          "total",
          "object",
          "group",
          "flatten",
          "initial"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Kalikan seluruh array menjadi <strong>satu nilai</strong>. Signature: <code>reduce((accumulator, item) =&gt; ..., initialValue)</code>. Nilai awal WAJIB diberikan agar tidak bug saat array kosong."
          },
          {
            "type": "code",
            "code": "const nums = [1, 2, 3, 4];\nnums.reduce((sum, n) => sum + n, 0);          // 10\nnums.reduce((sum, n) => sum + n);             // 10 (tanpa initial = mulai dari elemen pertama)\n\nconst products = [\n  { nama: \"Kopi\", harga: 15000 },\n  { nama: \"Teh\",  harga: 8000 }\n];\nproducts.reduce((total, p) => total + p.harga, 0);   // 23000\n\n// Menghasilkan OBJECT (grouping)\nconst words = [\"apple\", \"banana\", \"apple\"];\nwords.reduce((acc, w) => {\n  acc[w] = (acc[w] || 0) + 1;\n  return acc;\n}, {});   // { apple: 2, banana: 1 }\n\n// Menghasilkan ARRAY (flattening 2D)\nconst matrix = [[1,2],[3,4]];\nmatrix.reduce((acc, row) => acc.concat(row), []);   // [1,2,3,4]\n\n// Max dari array\n[3,9,2].reduce((max, n) => n > max ? n : max);    // 9",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"reducexsl-mengaccumulasikan seluruh elemen array menjadi satu nilai. Saya selalu initializer value supaya aman untuk array kosong, dan sering memakainya untuk total, grouping ke object, atau flattening.\"",
            "body": []
          }
        ],
        "searchText": "reduce() reduce() reduce accumulator sum total object group flatten initial Kalikan seluruh array menjadi satu nilai. Signature: reduce((accumulator, item) =&gt;..., initialValue). Nilai awal WAJIB diberikan agar tidak bug saat array kosong. const nums = [1, 2, 3, 4]; nums.reduce((sum, n) => sum + n, 0); // 10 nums.reduce((sum, n) => sum + n); // 10 (tanpa initial = mulai dari elemen pertama) const products = [ { nama: \"Kopi\", harga: 15000 }, { nama: \"Teh\", harga: 8000 } ]; products.reduce((total, p) => total + p.harga, 0); // 23000 // Menghasilkan OBJECT (grouping) const words = [\"apple\", \"banana\", \"apple\"]; words.reduce((acc, w) => { acc[w] = (acc[w] || 0) + 1; return acc; }, {}); // { apple: 2, banana: 1 } // Menghasilkan ARRAY (flattening 2D) const matrix = [[1,2],[3,4]]; matrix.reduce((acc, row) => acc.concat(row), []); // [1,2,3,4] // Max dari array [3,9,2].reduce((max, n) => n > max ? n : max); // 9 Jawab singkat: \"reducexsl-mengaccumulasikan seluruh elemen array menjadi satu nilai. Saya selalu initializer value supaya aman untuk array kosong, dan sering memakainya untuk total, grouping ke object, atau flattening.\""
      },
      {
        "id": "c26",
        "no": 6,
        "title": "<code>sort()</code>, <code>reverse()</code>, <code>flat()</code>",
        "plainTitle": "sort(), reverse(), flat()",
        "priority": "P1",
        "minutes": 10,
        "short": "sort(), reverse, flat()",
        "tags": [
          "sort",
          "reverse",
          "flat",
          "flatMap",
          "numeric",
          "comparator"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "h4",
            "html": "sort — jebakan klasik"
          },
          {
            "type": "code",
            "code": "const nums = [10, 9, 100, 1];\nnums.sort();                    // [1, 10, 100, 9]  const nums = [10, 9, 100, 1];\nnums.sort();                    // [1, 10, 100, 9]  <-- SALAH! Jadi string!\nnums.sort((a, b) => a - b);   // [1, 9, 10, 100]  const nums = [10, 9, 100, 1];\nnums.sort();                    // [1, 10, 100, 9]  <-- SALAH! Jadi string!\nnums.sort((a, b) => a - b);   // [1, 9, 10, 100]  <-- BENAR\n\n// descending\nnums.sort((a, b) => b - a);   // [100, 10, 9, 1]\n\n// sort object by property\nusers.sort((a, b) => a.umur - b.umur);\nusers.sort((a, b) => a.nama.localeCompare(b.nama));",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "<code>sort()</code> <strong>mengubah array asal</strong> dan selalu return array yang sama (bukan salinan).",
              "<code>sort()</code> tanpa comparator mengurutkan sebagai <strong>string</strong>."
            ]
          },
          {
            "type": "h4",
            "html": "reverse"
          },
          {
            "type": "code",
            "code": "const arr = [1, 2, 3];\n\narr.reverse();      // [3, 2, 1]  → mengubah array asal (mutating)\n// arr sekarang: [3, 2, 1]",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "flat / flatMap"
          },
          {
            "type": "code",
            "code": "[1, [2, [3, [4]]]].flat();        // [1, 2, [3, [4]]]  (1 level)\n[1, [2, [3, [4]]]].flat(Infinity);   // [1, 2, 3, 4]\n[[1,2],[3,4]].flat();                // [1, 2, 3, 4]\n\n[[1,2],[3,4]].flatMap(x => x);     // [1,2,3,4]\n[1,2].flatMap(n => [n, n*2]);      // [1,2,2,4]",
            "lang": "js"
          }
        ],
        "searchText": "sort(), reverse(), flat() sort(), reverse, flat() sort reverse flat flatMap numeric comparator sort — jebakan klasik const nums = [10, 9, 100, 1]; nums.sort(); // [1, 10, 100, 9] const nums = [10, 9, 100, 1]; nums.sort(); // [1, 10, 100, 9] <-- SALAH! Jadi string! nums.sort((a, b) => a - b); // [1, 9, 10, 100] const nums = [10, 9, 100, 1]; nums.sort(); // [1, 10, 100, 9] <-- SALAH! Jadi string! nums.sort((a, b) => a - b); // [1, 9, 10, 100] <-- BENAR // descending nums.sort((a, b) => b - a); // [100, 10, 9, 1] // sort object by property users.sort((a, b) => a.umur - b.umur); users.sort((a, b) => a.nama.localeCompare(b.nama)); sort() mengubah array asal dan selalu return array yang sama (bukan salinan). sort() tanpa comparator mengurutkan sebagai string. reverse const arr = [1, 2, 3]; arr.reverse(); // [3, 2, 1] → mengubah array asal (mutating) // arr sekarang: [3, 2, 1] flat / flatMap [1, [2, [3, [4]]]].flat(); // [1, 2, [3, [4]]] (1 level) [1, [2, [3, [4]]]].flat(Infinity); // [1, 2, 3, 4] [[1,2],[3,4]].flat(); // [1, 2, 3, 4] [[1,2],[3,4]].flatMap(x => x); // [1,2,3,4] [1,2].flatMap(n => [n, n*2]); // [1,2,2,4]"
      },
      {
        "id": "c27",
        "no": 7,
        "title": "Memilih Method yang Tepat: <code>forEach</code>, <code>for</code>, <code>for...of</code>",
        "plainTitle": "Memilih Method yang Tepat: forEach, for, for...of",
        "priority": "P1",
        "minutes": 10,
        "short": "forEach vs map vs for loop",
        "tags": [
          "foreach",
          "for",
          "loop",
          "iteration",
          "chaining",
          "choose",
          "method"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "table",
            "head": [
              "Method",
              "Return",
              "Kalau perlu..."
            ],
            "rows": [
              [
                "<code>map</code>",
                "Array baru",
                "transformasi tiap elemen"
              ],
              [
                "<code>filter</code>",
                "Array baru (subset)",
                "ambil yang sesuai kondisi"
              ],
              [
                "<code>forEach</code>",
                "<code>undefined</code>",
                "side effect (log, push, render)"
              ],
              [
                "<code>reduce</code>",
                "1 nilai",
                "akumulasi (total, group)"
              ],
              [
                "<code>find</code>",
                "1 elemen",
                "cari satu item"
              ],
              [
                "<code>some/every</code>",
                "Boolean",
                "cek kondisi"
              ]
            ]
          },
          {
            "type": "code",
            "code": "const nums = [1, 2, 3];\n\n// forEach: untuk AKSI, bukan membuat nilai baru\nnums.forEach(n => console.log(n));        // return undefined\nnums.forEach((n, i) => console.log(i, n)); // callback punya index\n\n// for: saat butuh index atau kontrol lebih banyak\nfor (let i = 0; i < nums.length; i++) { console.log(i, nums[i]); }\n\n// for...of: iterasi nilai (paling rapi untuk array)\nfor (const n of nums) { console.log(n); }\n\n// for...in: iterasi KEY/properti (untuk object, bukan array!)\nconst u = { nama: \"A\", umur: 1 };\nfor (const key in u) { console.log(key, u[key]); }   // \"nama\", \"umur\"",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "warn",
            "title": "Jangan pakai for...in untuk array — urutan bisa tidak dijamin dan bisa ikut properti tambahan.",
            "body": []
          }
        ],
        "searchText": "Memilih Method yang Tepat: forEach, for, for...of forEach vs map vs for loop foreach for loop iteration chaining choose method Method Return Kalau perlu... <code>map</code> Array baru transformasi tiap elemen <code>filter</code> Array baru (subset) ambil yang sesuai kondisi <code>forEach</code> <code>undefined</code> side effect (log, push, render) <code>reduce</code> 1 nilai akumulasi (total, group) <code>find</code> 1 elemen cari satu item <code>some/every</code> Boolean cek kondisi const nums = [1, 2, 3]; // forEach: untuk AKSI, bukan membuat nilai baru nums.forEach(n => console.log(n)); // return undefined nums.forEach((n, i) => console.log(i, n)); // callback punya index // for: saat butuh index atau kontrol lebih banyak for (let i = 0; i < nums.length; i++) { console.log(i, nums[i]); } // for...of: iterasi nilai (paling rapi untuk array) for (const n of nums) { console.log(n); } // for...in: iterasi KEY/properti (untuk object, bukan array!) const u = { nama: \"A\", umur: 1 }; for (const key in u) { console.log(key, u[key]); } // \"nama\", \"umur\" Jangan pakai for...in untuk array — urutan bisa tidak dijamin dan bisa ikut properti tambahan."
      },
      {
        "id": "c28",
        "no": 8,
        "title": "Chaining dan Early Return",
        "plainTitle": "Chaining dan Early Return",
        "priority": "P1",
        "minutes": 10,
        "short": "Chaining & early return",
        "tags": [
          "chaining",
          "pipeline",
          "short",
          "circuit",
          "early",
          "return",
          "optional",
          "chaining",
          "in",
          "loop"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Karena <code>map/filter/reduce</code> return array baru, method-method itu bisa dirangkai. Urutan penting: <code>filter</code> dulu baru <code>map</code>/<code>reduce</code>."
          },
          {
            "type": "code",
            "code": "const data = [\n  { nama: \"A\", umur: 20, kota: \"JKT\" },\n  { nama: \"B\", umur: 35, kota: \"JKT\" },\n  { nama: \"C\", umur: 28, kota: \"BDG\" }\n];\n\n// filter -> map -> reduce\nconst total = data\n  .filter(u => u.kota === \"JKT\")\n  .map(u => u.umur)\n  .reduce((a, b) => a + b, 0);       // 55\n\n// dengan early return: ?. dan || sebagai guard\nfunction proses(data) {\n  return data?.filter(Boolean).map(...) || [];\n}",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "Urutan paling umum &amp; efisien: <strong>filter → map → reduce</strong>.",
              "Jangan menumpuk terlalu dalam (lebih dari 3) — pecah ke variabel per tahap agar readable.",
              "<code>filter(Boolean)</code> berguna untuk membuang nilai falsy dari hasil map."
            ]
          },
          {
            "type": "code",
            "code": "const mixed = [1, null, 2, undefined, 3];\n\nmixed.filter(Boolean);   // [1, 2, 3]\n// → membuang nilai falsy: null, undefined",
            "lang": "js"
          }
        ],
        "searchText": "Chaining dan Early Return Chaining & early return chaining pipeline short circuit early return optional chaining in loop Karena map/filter/reduce return array baru, method-method itu bisa dirangkai. Urutan penting: filter dulu baru map / reduce. const data = [ { nama: \"A\", umur: 20, kota: \"JKT\" }, { nama: \"B\", umur: 35, kota: \"JKT\" }, { nama: \"C\", umur: 28, kota: \"BDG\" } ]; // filter -> map -> reduce const total = data .filter(u => u.kota === \"JKT\") .map(u => u.umur) .reduce((a, b) => a + b, 0); // 55 // dengan early return: ?. dan || sebagai guard function proses(data) { return data?.filter(Boolean).map(...) || []; } Urutan paling umum &amp; efisien: filter → map → reduce. Jangan menumpuk terlalu dalam (lebih dari 3) — pecah ke variabel per tahap agar readable. filter(Boolean) berguna untuk membuang nilai falsy dari hasil map. const mixed = [1, null, 2, undefined, 3]; mixed.filter(Boolean); // [1, 2, 3] // → membuang nilai falsy: null, undefined"
      }
    ]
  },
  {
    "id": "m6",
    "track": "js",
    "no": "6",
    "title": "OOP: Prototype dan <code>class</code>",
    "plainTitle": "6 OOP: Prototype dan class",
    "desc": "JavaScript bersifat prototype-based, bukan class-based murni. Class hanyalah syntactic sugar di atas prototype.",
    "priorityNote": "Sering ditanyakan",
    "minutes": 40,
    "chapters": [
      {
        "id": "c29",
        "no": 1,
        "title": "Prototype dan Prototype Chain",
        "plainTitle": "Prototype dan Prototype Chain",
        "priority": "P2",
        "minutes": 10,
        "short": "Prototype & prototype chain",
        "tags": [
          "prototype",
          "inheritance",
          "oop",
          "new",
          "__proto__",
          "chain",
          "property",
          "lookup"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Semua object JavaScript punya <strong>prototype</strong>. Saat properti tidak ditemukan di object itu, JS mencarinya di prototype, lalu prototype dari prototype, dan seterusnya. Rangkaian ini = <strong>prototype chain</strong>. Itu adalah dasar <em>inheritance</em> di JavaScript."
          },
          {
            "type": "code",
            "code": "function Motor(warna) {\n  this.warna = warna;        // properti instance\n  this.nyalakan = function () { return \"Nyala!\"; };  // method per-instance (boros memori)\n}\n\nMotor.prototype.ROPASI = \"Besar\";\nMotor.prototype.mesin = function () { return \"150cc\"; };\n\nconst m1 = new Motor(\"Merah\");\nm1.warna;      // \"Merah\"   -> ditemukan di object\nm1.mesin();    // \"150cc\"   -> tidak ada di object, cari di prototype -> ditemukan\nm1.ROPASI;     // \"Besar\"\nm1.nama;       // undefined -> menelusuri seluruh chain, tidak ditemukan\n\n// new itu apa? 4 langkah:\n// 1. buat object kosong baru  2. panggil constructor dengan this = object itu\n// 3. hasilkan return this    4. set prototype object = prototype constructor\n\n\"motor\" in m1;                  // true\nObject.hasOwn(m1, \"warna\");     // true\nObject.hasOwn(m1, \"mesin\");     // false -> datang dari prototype",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Kenapa penting: method yang ditulis di prototype hanya dibuat satu kali dan dipakai bersama semua instance — jauh lebih hemat memori daripada membuat function di dalam constructor. Modern JS pakai class yang otomatis melakukan ini.",
            "body": []
          }
        ],
        "searchText": "Prototype dan Prototype Chain Prototype & prototype chain prototype inheritance oop new __proto__ chain property lookup Semua object JavaScript punya prototype. Saat properti tidak ditemukan di object itu, JS mencarinya di prototype, lalu prototype dari prototype, dan seterusnya. Rangkaian ini = prototype chain. Itu adalah dasar inheritance di JavaScript. function Motor(warna) { this.warna = warna; // properti instance this.nyalakan = function () { return \"Nyala!\"; }; // method per-instance (boros memori) } Motor.prototype.ROPASI = \"Besar\"; Motor.prototype.mesin = function () { return \"150cc\"; }; const m1 = new Motor(\"Merah\"); m1.warna; // \"Merah\" -> ditemukan di object m1.mesin(); // \"150cc\" -> tidak ada di object, cari di prototype -> ditemukan m1.ROPASI; // \"Besar\" m1.nama; // undefined -> menelusuri seluruh chain, tidak ditemukan // new itu apa? 4 langkah: // 1. buat object kosong baru 2. panggil constructor dengan this = object itu // 3. hasilkan return this 4. set prototype object = prototype constructor \"motor\" in m1; // true Object.hasOwn(m1, \"warna\"); // true Object.hasOwn(m1, \"mesin\"); // false -> datang dari prototype Kenapa penting: method yang ditulis di prototype hanya dibuat satu kali dan dipakai bersama semua instance — jauh lebih hemat memori daripada membuat function di dalam constructor. Modern JS pakai class yang otomatis melakukan ini."
      },
      {
        "id": "c30",
        "no": 2,
        "title": "<code>class</code>: Constructor, Method, Static",
        "plainTitle": "class: Constructor, Method, Static",
        "priority": "P2",
        "minutes": 10,
        "short": "class",
        "tags": [
          "class",
          "constructor",
          "method",
          "static",
          "field",
          "getter",
          "setter",
          "template"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "class Mobil {\n  cc = 0;   // field (properti instance, selalu ada di setiap objek)\n\n  constructor(merk, warna) {\n    this.merk = merk;      // wajib this\n    this.warna = warna;\n  }\n  // method instance -> ada di prototype\n  info() {\n    return this.merk + \" \" + this.warna + \" \" + this.cc + \"cc\";\n  }\n  // static method -> milik class, dipanggil dari class\n  static buatDefault() {\n    return new Mobil(\"Bawaan\", \"Putih\");\n  }\n}\n\nconst m = new Mobil(\"Honda\", \"Hitam\");\nm.info();                    // \"Honda Hitam\"\nMobil.buatDefault().merk;    // \"Bawaan\"\n\n// class TIDAK bisa dipanggil tanpa new\n// Mobil();                // TypeError: Class constructor cannot be invoked without 'new'\n\n// class juga TIDAK di-hoist penuh -> error kalau dipakai sebelum dideklarasikan\n// new Mobil();  // ReferenceError (berbeda dengan function declaration)",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "class User {\n  #rahasia = \"password123\";   // private field (ES2022) -> hanya bisa diakses di dalam class\n\n  constructor(nama) { this.nama = nama; }\n\n  login(pw) {\n    return pw === this.#rahasia;\n  }\n}\nconst u = new User(\"A\");\nu.nama;             // \"A\"\nu.#rahasia;         // SyntaxError -> tidak boleh diakses dari luar\nu.login(\"password123\");  // true",
            "lang": "js"
          }
        ],
        "searchText": "class: Constructor, Method, Static class class constructor method static field getter setter template class Mobil { cc = 0; // field (properti instance, selalu ada di setiap objek) constructor(merk, warna) { this.merk = merk; // wajib this this.warna = warna; } // method instance -> ada di prototype info() { return this.merk + \" \" + this.warna + \" \" + this.cc + \"cc\"; } // static method -> milik class, dipanggil dari class static buatDefault() { return new Mobil(\"Bawaan\", \"Putih\"); } } const m = new Mobil(\"Honda\", \"Hitam\"); m.info(); // \"Honda Hitam\" Mobil.buatDefault().merk; // \"Bawaan\" // class TIDAK bisa dipanggil tanpa new // Mobil(); // TypeError: Class constructor cannot be invoked without 'new' // class juga TIDAK di-hoist penuh -> error kalau dipakai sebelum dideklarasikan // new Mobil(); // ReferenceError (berbeda dengan function declaration) class User { #rahasia = \"password123\"; // private field (ES2022) -> hanya bisa diakses di dalam class constructor(nama) { this.nama = nama; } login(pw) { return pw === this.#rahasia; } } const u = new User(\"A\"); u.nama; // \"A\" u.#rahasia; // SyntaxError -> tidak boleh diakses dari luar u.login(\"password123\"); // true"
      },
      {
        "id": "c31",
        "no": 3,
        "title": "Inheritance, <code>super</code>, Getter/Setter",
        "plainTitle": "Inheritance, super, Getter/Setter",
        "priority": "P2",
        "minutes": 12,
        "short": "Inheritance, super, getter/setter",
        "tags": [
          "extends",
          "super",
          "inheritance",
          "override",
          "getter",
          "setter",
          "polymorphism",
          "composition"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "class Kendaraan {\n  constructor(nama) { this.nama = nama; }\n  info() { return \"Kendaraan: \" + this.nama; }\n}\n\nclass Mobil extends Kendaraan {\n  constructor(nama, cc) {\n    super(nama);                 // WAJIB dipanggil sebelum pakai this\n    this.cc = cc;\n  }\n  info() { return \"Mobil: \" + this.nama + \" \" + this.cc + \"cc\"; }  // override\n}\n\nconst m = new Mobil(\"Brio\", 120);\nm.info();        // \"Mobil: Brio 120cc\"\nm instanceof Kendaraan;   // true\nm instanceof Mobil;       // true",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "class Produk {\n  #harga;\n  constructor(nama, harga) { this.nama = nama; this.#harga = harga; }\n  get harga() { return this.#harga; }              // akses: produk.harga (tanpa())\n  set harga(v) { this.#harga = v > 0 ? v : 0; }    // validasi saat set\n}\nconst p = new Produk(\"Kopi\", 15000);\np.harga;          // 15000\np.harga = -5;\np.harga;          // 0  -> tervalidasi otomatis",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Override &amp; polymorphism"
          },
          {
            "type": "ul",
            "items": [
              "Subclass boleh override method parent; object yang memanggil tetap memakai versi yang paling spesifik.",
              "Static method di-<strong>tidak</strong> di-inherit. Instance method ya.",
              "<code>super</code> hanya boleh dipakai di dalam method class, dan hanya di awal saat memakai <code>this</code>."
            ]
          },
          {
            "type": "quote",
            "variant": "warn",
            "title": "Di frontend modern, composition sering lebih baik daripada inheritance (program ke interface, bukan ke subclass). Tapi polymorphism tetap perlu dikuasai untuk interview.",
            "body": []
          }
        ],
        "searchText": "Inheritance, super, Getter/Setter Inheritance, super, getter/setter extends super inheritance override getter setter polymorphism composition class Kendaraan { constructor(nama) { this.nama = nama; } info() { return \"Kendaraan: \" + this.nama; } } class Mobil extends Kendaraan { constructor(nama, cc) { super(nama); // WAJIB dipanggil sebelum pakai this this.cc = cc; } info() { return \"Mobil: \" + this.nama + \" \" + this.cc + \"cc\"; } // override } const m = new Mobil(\"Brio\", 120); m.info(); // \"Mobil: Brio 120cc\" m instanceof Kendaraan; // true m instanceof Mobil; // true class Produk { #harga; constructor(nama, harga) { this.nama = nama; this.#harga = harga; } get harga() { return this.#harga; } // akses: produk.harga (tanpa()) set harga(v) { this.#harga = v > 0 ? v : 0; } // validasi saat set } const p = new Produk(\"Kopi\", 15000); p.harga; // 15000 p.harga = -5; p.harga; // 0 -> tervalidasi otomatis Override &amp; polymorphism Subclass boleh override method parent; object yang memanggil tetap memakai versi yang paling spesifik. Static method di- tidak di-inherit. Instance method ya. super hanya boleh dipakai di dalam method class, dan hanya di awal saat memakai this. Di frontend modern, composition sering lebih baik daripada inheritance (program ke interface, bukan ke subclass). Tapi polymorphism tetap perlu dikuasai untuk interview."
      },
      {
        "id": "c32",
        "no": 4,
        "title": "Memeriksa Jenis dan Properti Object",
        "plainTitle": "Memeriksa Jenis dan Properti Object",
        "priority": "P2",
        "minutes": 8,
        "short": "instanceof vs hasOwnProperty vs in",
        "tags": [
          "instanceof",
          "hasOwn",
          "in",
          "typeof",
          "check",
          "type",
          "object"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "class Kucing {}\nconst k = new Kucing();\n\nk instanceof Kucing;    // true  -> cek apakah objek punya constructor ini di chain-nya\ntypeof k;               // \"object\"\n\nArray.isArray([]);      // true  -> cara benar cek array\ntypeof [];              // \"object\" (tidak berguna)\n\n\"nama\" in user;                        // true (termasuk yang dari prototype)\nObject.hasOwn(user, \"nama\");           // true (hanya milik objek itu sendiri)\nuser.hasOwnProperty(\"nama\");           // true (cara lama, bisa ditimpa)\n// lebih baik pakai Object.hasOwn() karena aman dari malicious override\n\n// masalah: null & undefined tidak punya properti\nnull.hasOwnProperty(\"x\");    // TypeError",
            "lang": "js"
          },
          {
            "type": "table",
            "head": [
              "Cara",
              "Cek apa",
              "Contoh"
            ],
            "rows": [
              [
                "<code>typeof</code>",
                "Jenis primitif",
                "<code>typeof 5 === \"number\"</code>"
              ],
              [
                "<code>Array.isArray</code>",
                "Array",
                "<code>Array.isArray(x)</code>"
              ],
              [
                "<code>instanceof</code>",
                "Kelas / constructor",
                "<code>x instanceof Kucing</code>"
              ],
              [
                "<code>in</code>",
                "Properti ada (termasuk prototype)",
                "<code>\"x\" in obj</code>"
              ],
              [
                "<code>Object.hasOwn</code>",
                "Properti milik sendiri",
                "<code>Object.hasOwn(obj, \"x\")</code>"
              ]
            ]
          }
        ],
        "searchText": "Memeriksa Jenis dan Properti Object instanceof vs hasOwnProperty vs in instanceof hasOwn in typeof check type object class Kucing {} const k = new Kucing(); k instanceof Kucing; // true -> cek apakah objek punya constructor ini di chain-nya typeof k; // \"object\" Array.isArray([]); // true -> cara benar cek array typeof []; // \"object\" (tidak berguna) \"nama\" in user; // true (termasuk yang dari prototype) Object.hasOwn(user, \"nama\"); // true (hanya milik objek itu sendiri) user.hasOwnProperty(\"nama\"); // true (cara lama, bisa ditimpa) // lebih baik pakai Object.hasOwn() karena aman dari malicious override // masalah: null & undefined tidak punya properti null.hasOwnProperty(\"x\"); // TypeError Cara Cek apa Contoh <code>typeof</code> Jenis primitif <code>typeof 5 === \"number\"</code> <code>Array.isArray</code> Array <code>Array.isArray(x)</code> <code>instanceof</code> Kelas / constructor <code>x instanceof Kucing</code> <code>in</code> Properti ada (termasuk prototype) <code>\"x\" in obj</code> <code>Object.hasOwn</code> Properti milik sendiri <code>Object.hasOwn(obj, \"x\")</code>"
      }
    ]
  },
  {
    "id": "m7",
    "track": "js",
    "no": "7",
    "title": "Asynchronous JavaScript",
    "plainTitle": "7 Asynchronous JavaScript",
    "desc": "Topik paling sering ditanyakan di interview JavaScript. Pahami urutannya, bukan hafal syntax-nya.",
    "priorityNote": "Wajib dikuasai",
    "minutes": 107,
    "chapters": [
      {
        "id": "c33",
        "no": 1,
        "title": "Synchronous vs Asynchronous",
        "plainTitle": "Synchronous vs Asynchronous",
        "priority": "P1",
        "minutes": 10,
        "short": "Sync vs async",
        "tags": [
          "synchronous",
          "asynchronous",
          "blocking",
          "call",
          "stack",
          "example"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "<strong>Synchronous</strong> = dieksekusi berurutan, baris demi baris. Jika satu baris lambat, semua baris berikutnya tertahan (<em>blocking</em>)."
          },
          {
            "type": "p",
            "html": "<strong>Asynchronous</strong> = operasi yang berjalan di luar call stack (misal menunggu network, timer), sementara eksekusi kode lain terus berjalan. Hasilnya(callback) dipanggil <em>nanti</em>."
          },
          {
            "type": "code",
            "code": "console.log(\"A\");\nconsole.log(\"B\");\n// Output: A B  (berurutan)",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "console.log(\"A\");\n\nsetTimeout(() => console.log(\"B\"), 1000);   // async, jalan di background\n\nconsole.log(\"C\");\n// Output: A C B  console.log(\"A\");\n\nsetTimeout(() => console.log(\"B\"), 1000);   // async, jalan di background\n\nconsole.log(\"C\");\n// Output: A C B  <-- B jalan paling akhir walau delay-nya cuma 1 detik",
            "lang": "js"
          },
          {
            "type": "p",
            "html": "Yang membuat JavaScript bisa non-blocking adalah <strong>call stack</strong> (untuk kode sync) + <strong>Web API / libuv</strong> (untuk operasi berat) + <strong>queue</strong> (antrean callback)."
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Contoh operasi asynchronous: setTimeout, setInterval, fetch, XMLHttpRequest, requestAnimationFrame, pembacaan file, operasi database, I/O file di Node.",
            "body": []
          }
        ],
        "searchText": "Synchronous vs Asynchronous Sync vs async synchronous asynchronous blocking call stack example Synchronous = dieksekusi berurutan, baris demi baris. Jika satu baris lambat, semua baris berikutnya tertahan (blocking). Asynchronous = operasi yang berjalan di luar call stack (misal menunggu network, timer), sementara eksekusi kode lain terus berjalan. Hasilnya(callback) dipanggil nanti. console.log(\"A\"); console.log(\"B\"); // Output: A B (berurutan) console.log(\"A\"); setTimeout(() => console.log(\"B\"), 1000); // async, jalan di background console.log(\"C\"); // Output: A C B console.log(\"A\"); setTimeout(() => console.log(\"B\"), 1000); // async, jalan di background console.log(\"C\"); // Output: A C B <-- B jalan paling akhir walau delay-nya cuma 1 detik Yang membuat JavaScript bisa non-blocking adalah call stack (untuk kode sync) + Web API / libuv (untuk operasi berat) + queue (antrean callback). Contoh operasi asynchronous: setTimeout, setInterval, fetch, XMLHttpRequest, requestAnimationFrame, pembacaan file, operasi database, I/O file di Node."
      },
      {
        "id": "c34",
        "no": 2,
        "title": "Event Loop: Microtask vs Macrotask",
        "plainTitle": "Event Loop: Microtask vs Macrotask",
        "priority": "P1",
        "minutes": 15,
        "short": "Event loop & microtask/macrotask",
        "tags": [
          "event",
          "loop",
          "microtask",
          "macrotask",
          "call",
          "stack",
          "queue",
          "promise",
          "setTimeout",
          "order"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "JavaScript single-thread punya satu <strong>call stack</strong>. Kode sync berjalan di sana. Setelah stack kosong, <strong>event loop</strong> mengambil satu callback dari antrean dan menjalankannya. Ada dua jenis antrean:"
          },
          {
            "type": "code",
            "code": "Code synchronous\n      |\n      v\nCall Stack  --selesai-->  Event Loop\n                             |\n             +---------------+----------------+\n             |                                |\n    Microtask Queue                  Macrotask Queue\n    (Promise.then, await,           (setTimeout, setInterval,\n     queueMicrotask, MutationObserver) I/O, event DOM)\n             |                                |\n   SELALU diproses lebih dulu        baru diproses jika microtask kosong",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "console.log(\"1\");\n\nsetTimeout(() => console.log(\"2\"), 0);          // macrotask\n\nPromise.resolve().then(() => console.log(\"3\"));  // microtask\n\nconsole.log(\"4\");\n\n// Output: 1 -> 4 -> 3 -> 2\n// Sync dulu (1, 4), lalu microtask (3), terakhir macrotask (2)",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "setTimeout(() => console.log(\"timeout 1\"));\nsetTimeout(() => console.log(\"timeout 2\"));\nPromise.resolve().then(() => console.log(\"microtask 1\"));\nPromise.resolve().then(() => console.log(\"microtask 2\"));\n\n// Output semua microtask DULUAN, sebelum timeout yang 0 milisecond\n// microtask 1, microtask 2, timeout 1, timeout 2",
            "lang": "js"
          },
          {
            "type": "table",
            "head": [
              "",
              "Microtask",
              "Macrotask"
            ],
            "rows": [
              [
                "Contoh",
                "<code>.then()</code>, <code>.catch()</code>, <code>async/await</code>, <code>queueMicrotask</code>",
                "<code>setTimeout</code>, <code>setInterval</code>, I/O, event handler"
              ],
              [
                "Prioritas",
                "<strong>Tinggi</strong>",
                "Rendah"
              ],
              [
                "Diproses",
                "Setelah semua microtask selesai, satu per satu",
                "Setelah microtask queue benar-benar kosong"
              ]
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"Event loop adalah mekanisme yang memungkinkan JavaScript menangani operasi asynchronous meski single-threaded. Saat call stack kosong, event loop mengambil callback dari antrean. Microtask seperti Promise selalu diproses sebelum macrotask seperti setTimeout, dan setelah tiap macrotask semua microtask dikuras dulu.\"",
            "body": []
          }
        ],
        "searchText": "Event Loop: Microtask vs Macrotask Event loop & microtask/macrotask event loop microtask macrotask call stack queue promise setTimeout order JavaScript single-thread punya satu call stack. Kode sync berjalan di sana. Setelah stack kosong, event loop mengambil satu callback dari antrean dan menjalankannya. Ada dua jenis antrean: Code synchronous | v Call Stack --selesai--> Event Loop | +---------------+----------------+ | | Microtask Queue Macrotask Queue (Promise.then, await, (setTimeout, setInterval, queueMicrotask, MutationObserver) I/O, event DOM) | | SELALU diproses lebih dulu baru diproses jika microtask kosong console.log(\"1\"); setTimeout(() => console.log(\"2\"), 0); // macrotask Promise.resolve().then(() => console.log(\"3\")); // microtask console.log(\"4\"); // Output: 1 -> 4 -> 3 -> 2 // Sync dulu (1, 4), lalu microtask (3), terakhir macrotask (2) setTimeout(() => console.log(\"timeout 1\")); setTimeout(() => console.log(\"timeout 2\")); Promise.resolve().then(() => console.log(\"microtask 1\")); Promise.resolve().then(() => console.log(\"microtask 2\")); // Output semua microtask DULUAN, sebelum timeout yang 0 milisecond // microtask 1, microtask 2, timeout 1, timeout 2 Microtask Macrotask Contoh <code>.then()</code>, <code>.catch()</code>, <code>async/await</code>, <code>queueMicrotask</code> <code>setTimeout</code>, <code>setInterval</code>, I/O, event handler Prioritas <strong>Tinggi</strong> Rendah Diproses Setelah semua microtask selesai, satu per satu Setelah microtask queue benar-benar kosong Jawab singkat: \"Event loop adalah mekanisme yang memungkinkan JavaScript menangani operasi asynchronous meski single-threaded. Saat call stack kosong, event loop mengambil callback dari antrean. Microtask seperti Promise selalu diproses sebelum macrotask seperti setTimeout, dan setelah tiap macrotask semua microtask dikuras dulu.\""
      },
      {
        "id": "c35",
        "no": 3,
        "title": "Callback dan Callback Hell",
        "plainTitle": "Callback dan Callback Hell",
        "priority": "P1",
        "minutes": 8,
        "short": "Callback & callback hell",
        "tags": [
          "callback",
          "callback",
          "hell",
          "error",
          "first",
          "node",
          "style",
          "async",
          "error",
          "handling"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Callback = function yang dikirim sebagai argument ke function lain, lalu dipanggil setelah operasi selesai."
          },
          {
            "type": "code",
            "code": "function prosesData(data, callback) {\n  setTimeout(() => callback(null, data), 100);   // pola Node: error di argumen pertama\n}\nprosesData(\"Halo\", (err, hasil) => {\n  if (err) console.error(\"Gagal:\", err);\n  else console.log(hasil);\n});",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Callback hell"
          },
          {
            "type": "code",
            "code": "// increasingly deeply nested — sulit dibaca & Russell error handling\ngetData(\"user\", (err, user) => {\n  getOrder(user.id, (err, order) => {\n    getShipping(order.id, (err, ship) => {\n      getTracking(ship.id, (err, track) => {\n        console.log(track);      // 4 level indentasi = sulit dirawat\n      });\n    });\n  });\n});",
            "lang": "js"
          },
          {
            "type": "p",
            "html": "Solusinya: <strong>Promise</strong> dan <strong>async/await</strong> (lihat bab berikutnya)."
          }
        ],
        "searchText": "Callback dan Callback Hell Callback & callback hell callback callback hell error first node style async error handling Callback = function yang dikirim sebagai argument ke function lain, lalu dipanggil setelah operasi selesai. function prosesData(data, callback) { setTimeout(() => callback(null, data), 100); // pola Node: error di argumen pertama } prosesData(\"Halo\", (err, hasil) => { if (err) console.error(\"Gagal:\", err); else console.log(hasil); }); Callback hell // increasingly deeply nested — sulit dibaca & Russell error handling getData(\"user\", (err, user) => { getOrder(user.id, (err, order) => { getShipping(order.id, (err, ship) => { getTracking(ship.id, (err, track) => { console.log(track); // 4 level indentasi = sulit dirawat }); }); }); }); Solusinya: Promise dan async/await (lihat bab berikutnya)."
      },
      {
        "id": "c36",
        "no": 4,
        "title": "Promise: Status dan <code>.then()</code>",
        "plainTitle": "Promise: Status dan .then()",
        "priority": "P1",
        "minutes": 12,
        "short": "Promise: status, then/catch/finally",
        "tags": [
          "promise",
          "pending",
          "fulfilled",
          "rejected",
          "then",
          "catch",
          "finally",
          "resolve",
          "reject",
          "state"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Promise = object yang merepresentasikan hasil operasi async yang <strong>belum selesai</strong>. Statusnya berubah satu kali dan tidak bisa balik:"
          },
          {
            "type": "table",
            "head": [
              "Status",
              "Arti"
            ],
            "rows": [
              [
                "<code>pending</code>",
                "Sedang berjalan (nilai awal)"
              ],
              [
                "<code>fulfilled</code>",
                "Berhasil, punya nilai hasil"
              ],
              [
                "<code>rejected</code>",
                "Gagal, punya alasan error"
              ]
            ]
          },
          {
            "type": "code",
            "code": "const promise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    const sukses = true;\n    if (sukses) resolve(\"Data berhasil diambil\");\n    else reject(new Error(\"Gagal mengambil data\"));\n  }, 1000);\n});\n\npromise\n  .then(result => console.log(result))       // dipanggil saat fulfilled\n  .catch(error => console.error(error))     // dipanggil saat rejected\n  .finally(() => console.log(\"selesai\"));   // selalu dipanggil",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "<code>resolve(value)</code> hanya berjalan sekali — panggilan berikutnya diabaikan.",
              "<code>reject(error)</code> membuat promise menjadi rejected. <strong>Selalu lempar <code>Error</code> object, bukan string, agar ada stack trace.</strong>",
              "<code>.catch()</code> juga menangkap error dari <code>.then()</code> sebelumnya (error propagation).",
              "Tidak ada <code>.catch()</code>? Error-nya menjadi unhandled rejection dan bisa meng crash aplikasi."
            ]
          }
        ],
        "searchText": "Promise: Status dan .then() Promise: status, then/catch/finally promise pending fulfilled rejected then catch finally resolve reject state Promise = object yang merepresentasikan hasil operasi async yang belum selesai. Statusnya berubah satu kali dan tidak bisa balik: Status Arti <code>pending</code> Sedang berjalan (nilai awal) <code>fulfilled</code> Berhasil, punya nilai hasil <code>rejected</code> Gagal, punya alasan error const promise = new Promise((resolve, reject) => { setTimeout(() => { const sukses = true; if (sukses) resolve(\"Data berhasil diambil\"); else reject(new Error(\"Gagal mengambil data\")); }, 1000); }); promise .then(result => console.log(result)) // dipanggil saat fulfilled .catch(error => console.error(error)) // dipanggil saat rejected .finally(() => console.log(\"selesai\")); // selalu dipanggil resolve(value) hanya berjalan sekali — panggilan berikutnya diabaikan. reject(error) membuat promise menjadi rejected. Selalu lempar Error object, bukan string, agar ada stack trace. .catch() juga menangkap error dari.then() sebelumnya (error propagation). Tidak ada.catch()? Error-nya menjadi unhandled rejection dan bisa meng crash aplikasi."
      },
      {
        "id": "c37",
        "no": 5,
        "title": "Promise Chaining dan Promise dari API",
        "plainTitle": "Promise Chaining dan Promise dari API",
        "priority": "P1",
        "minutes": 10,
        "short": "Promise chaining & new Promise",
        "tags": [
          "promise",
          "chaining",
          "return",
          "new",
          "promise",
          "resolve",
          "reject",
          "async",
          "function",
          "promise",
          "error",
          "propagation"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Kunci: <strong><code>.then()</code> harus di-<code>return</code></strong> kalau ingin mengoperasikan hasil ke promise berikutnya. Kalau tidak di-return, hasil bercabang ke promise terpisah dan urutan bisa kacau."
          },
          {
            "type": "code",
            "code": "// BENAR\nPromise.resolve(1)\n  .then(n => n + 1)          // return otomatis\n  .then(n => n * 2)          // jadi 4\n  .then(console.log);          // 4\n\n// SALAH\nPromise.resolve(1)\n  .then(n => { n + 1; })     // lupa return\n  .then(console.log);          // undefined",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "// Membungkus API callback-based (misal di Node/SDK lama) jadi Promise\nfunction getData(url) {\n  return new Promise((resolve, reject) => {\n    http.get(url, (res) => {\n      let data = \"\";\n      res.on(\"data\", (chunk) => (data += chunk));\n      res.on(\"end\", () => resolve(data));\n    }).on(\"error\", (err) => reject(err));\n  });\n}\n\n// Fungsi async otomatis mengembalikan Promise\nasync function ambilUser(id) {\n  return { id, nama: \"A\" };\n}\nambilUser(1).then(u => console.log(u.nama));",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Promise hanya bisa selesai satu kali dan tidak bisa dibatalkan. Karena itu pola new Promise dipakai saat perlu membungkus callback — bukan saat membuat Promise dari nol.",
            "body": []
          }
        ],
        "searchText": "Promise Chaining dan Promise dari API Promise chaining & new Promise promise chaining return new promise resolve reject async function promise error propagation Kunci:.then() harus di- return kalau ingin mengoperasikan hasil ke promise berikutnya. Kalau tidak di-return, hasil bercabang ke promise terpisah dan urutan bisa kacau. // BENAR Promise.resolve(1) .then(n => n + 1) // return otomatis .then(n => n * 2) // jadi 4 .then(console.log); // 4 // SALAH Promise.resolve(1) .then(n => { n + 1; }) // lupa return .then(console.log); // undefined // Membungkus API callback-based (misal di Node/SDK lama) jadi Promise function getData(url) { return new Promise((resolve, reject) => { http.get(url, (res) => { let data = \"\"; res.on(\"data\", (chunk) => (data += chunk)); res.on(\"end\", () => resolve(data)); }).on(\"error\", (err) => reject(err)); }); } // Fungsi async otomatis mengembalikan Promise async function ambilUser(id) { return { id, nama: \"A\" }; } ambilUser(1).then(u => console.log(u.nama)); Promise hanya bisa selesai satu kali dan tidak bisa dibatalkan. Karena itu pola new Promise dipakai saat perlu membungkus callback — bukan saat membuat Promise dari nol."
      },
      {
        "id": "c38",
        "no": 6,
        "title": "<code>Promise.all</code>, <code>race</code>, <code>allSettled</code>, <code>any</code>",
        "plainTitle": "Promise.all, race, allSettled, any",
        "priority": "P1",
        "minutes": 10,
        "short": "Promise.all / race / allSettled / any",
        "tags": [
          "promise",
          "all",
          "race",
          "allsettled",
          "any",
          "concurrent",
          "parallel",
          "aggregate"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "// all: jalankan semua paralel, tunggu SEMUA selesai.\n// Kalau satu GAGAL, seluruhnya GAGAL (fail fast).\nconst [user, order] = await Promise.all([getUser(1), getOrder(1)]);\n\n// race: ambil yang SELESAI LEBIH CEPAT, langsung dipakai, abaikan yang lain.\nconst hasil = await Promise.race([getViaA(), getViaB()]);\n\n// allSettled: tunggu semua, tapi TIDAK gagal kalau ada yang rejected.\nconst res = await Promise.allSettled([getUser(1), getOrder(1)]);\nres.forEach(r => console.log(r.status, r.value || r.reason));\n\n// any: berhasil kalau SALAH SATU fulfilled (mirip all tapi success-oriented).\nconst hasil2 = await Promise.any([getViaA(), getViaB()]);",
            "lang": "js"
          },
          {
            "type": "table",
            "head": [
              "Method",
              "Selesai saat",
              "Kalau ada yang gagal"
            ],
            "rows": [
              [
                "<code>all</code>",
                "semua selesai",
                "<strong>langsung reject</strong>"
              ],
              [
                "<code>race</code>",
                "<strong>yang pertama</strong> selesai",
                "reject kalau yang duluan gagal"
              ],
              [
                "<code>allSettled</code>",
                "semua selesai",
                "tidak masalah, tetap success"
              ],
              [
                "<code>any</code>",
                "<strong>yang pertama</strong> berhasil",
                "reject hanya jika semua gagal"
              ]
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Contoh nyata: Promise.all untuk ambil 3 data yang saling independen (dengan try/catch di tiap fetch bila tidak ingin fail fast), Promise.race untuk timeout — Promise.race([request, timeout]).",
            "body": []
          }
        ],
        "searchText": "Promise.all, race, allSettled, any Promise.all / race / allSettled / any promise all race allsettled any concurrent parallel aggregate // all: jalankan semua paralel, tunggu SEMUA selesai. // Kalau satu GAGAL, seluruhnya GAGAL (fail fast). const [user, order] = await Promise.all([getUser(1), getOrder(1)]); // race: ambil yang SELESAI LEBIH CEPAT, langsung dipakai, abaikan yang lain. const hasil = await Promise.race([getViaA(), getViaB()]); // allSettled: tunggu semua, tapi TIDAK gagal kalau ada yang rejected. const res = await Promise.allSettled([getUser(1), getOrder(1)]); res.forEach(r => console.log(r.status, r.value || r.reason)); // any: berhasil kalau SALAH SATU fulfilled (mirip all tapi success-oriented). const hasil2 = await Promise.any([getViaA(), getViaB()]); Method Selesai saat Kalau ada yang gagal <code>all</code> semua selesai <strong>langsung reject</strong> <code>race</code> <strong>yang pertama</strong> selesai reject kalau yang duluan gagal <code>allSettled</code> semua selesai tidak masalah, tetap success <code>any</code> <strong>yang pertama</strong> berhasil reject hanya jika semua gagal Contoh nyata: Promise.all untuk ambil 3 data yang saling independen (dengan try/catch di tiap fetch bila tidak ingin fail fast), Promise.race untuk timeout — Promise.race([request, timeout])."
      },
      {
        "id": "c39",
        "no": 7,
        "title": "<code>async</code> / <code>await</code> dan Error Handling",
        "plainTitle": "async / await dan Error Handling",
        "priority": "P1",
        "minutes": 12,
        "short": "async / await + error handling",
        "tags": [
          "async",
          "await",
          "try",
          "catch",
          "finally",
          "parallel",
          "sequential",
          "return",
          "promise"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "<code>async</code> menandai function yang selalu mengembalikan Promise. <code>await</code> menunggu Promise selesai dan \"membuka\" nilainya, membuat kode async terlihat seperti sync."
          },
          {
            "type": "code",
            "code": "async function getUser(id) {\n  try {\n    const response = await fetch(`/api/users/${id}`);\n\n    if (!response.ok) {                       // WAJIB cek manual, fetch tidak reject otomatis\n      throw new Error(\"HTTP \" + response.status);\n    }\n\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error(\"Gagal:\", error.message);\n    return null;                               // atau lempar ulang: throw error\n  } finally {\n    console.log(\"selesai\");                    // selalu jalan\n  }\n}\n\n// await di dalam loop = sequential (lambat)\nfor (const id of ids) {\n  const u = await getUser(id);                 // satu per satu\n}\n// faster: paralel\nconst users = await Promise.all(ids.map(id => getUser(id)));",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "<code>await</code> hanya bisa dipakai di dalam function yang ditandai <code>async</code>.",
              "<code>await</code> pada value biasa (bukan Promise) tetap jalan, hanya Nilainya dikembalikan langsung.",
              "Error dari <code>await</code> ditangkap oleh <code>try/catch</code> seperti error biasa.",
              "<code>try/catch</code> <strong>tidak</strong> menangkap error dari callback sinkron di dalam Promise, dan tidak menangkap error dari process exit.",
              "Urutan <code>await</code> selalu berurutan(top-down). Untuk paralel harus <code>Promise.all</code>."
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jawab singkat: \"async/await bekerja di atas Promise, hanya memberi syntax yang lebih mudah dibaca. Fungsi async selalu mengembalikan Promise, dan error-nya ditangkap dengan try/catch seperti kode biasa.\"",
            "body": []
          }
        ],
        "searchText": "async / await dan Error Handling async / await + error handling async await try catch finally parallel sequential return promise async menandai function yang selalu mengembalikan Promise. await menunggu Promise selesai dan \"membuka\" nilainya, membuat kode async terlihat seperti sync. async function getUser(id) { try { const response = await fetch(`/api/users/${id}`); if (!response.ok) { // WAJIB cek manual, fetch tidak reject otomatis throw new Error(\"HTTP \" + response.status); } const data = await response.json(); return data; } catch (error) { console.error(\"Gagal:\", error.message); return null; // atau lempar ulang: throw error } finally { console.log(\"selesai\"); // selalu jalan } } // await di dalam loop = sequential (lambat) for (const id of ids) { const u = await getUser(id); // satu per satu } // faster: paralel const users = await Promise.all(ids.map(id => getUser(id))); await hanya bisa dipakai di dalam function yang ditandai async. await pada value biasa (bukan Promise) tetap jalan, hanya Nilainya dikembalikan langsung. Error dari await ditangkap oleh try/catch seperti error biasa. try/catch tidak menangkap error dari callback sinkron di dalam Promise, dan tidak menangkap error dari process exit. Urutan await selalu berurutan(top-down). Untuk paralel harus Promise.all. Jawab singkat: \"async/await bekerja di atas Promise, hanya memberi syntax yang lebih mudah dibaca. Fungsi async selalu mengembalikan Promise, dan error-nya ditangkap dengan try/catch seperti kode biasa.\""
      },
      {
        "id": "c40",
        "no": 8,
        "title": "<code>setTimeout</code>, Debounce, dan Throttle",
        "plainTitle": "setTimeout, Debounce, dan Throttle",
        "priority": "P2",
        "minutes": 10,
        "short": "setTimeout, debounce, throttle",
        "tags": [
          "settimeout",
          "setinterval",
          "debounce",
          "throttle",
          "delay",
          "performance",
          "search",
          "input"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "setTimeout(fn, 1000);            // jalankan sekali setelah 1 detik\nconst id = setInterval(fn, 1000);  // jalankan tiap 1 detik\nclearTimeout(id);\nclearInterval(id);\n\n// delay minimum, bukan tepat\nsetTimeout(fn, 0);   // tetap asynchronous, minimal ~4ms di browser",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Debounce — jalan hanya setelah user <strong>berhenti</strong> aktivitas"
          },
          {
            "type": "code",
            "code": "function debounce(fn, delay = 300) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\nconst cari = debounce((q) => console.log(\"cari:\", q), 500);\ninput.addEventListener(\"input\", e => cari(e.target.value));\n// Ketik cepat \"a\" \"ab\" \"abc\" -> request HANYA untuk \"abc\"",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Throttle — jalan maksimal sekali dalam interval tertentu"
          },
          {
            "type": "code",
            "code": "function throttle(fn, limit = 300) {\n  let waiting = false;\n  return function (...args) {\n    if (waiting) return;\n    waiting = true;\n    fn.apply(this, args);\n    setTimeout(() => (waiting = false), limit);\n  };\n}\nwindow.addEventListener(\"scroll\", throttle(() => console.log(\"scroll\"), 200));",
            "lang": "js"
          },
          {
            "type": "table",
            "head": [
              "",
              "Debounce",
              "Throttle"
            ],
            "rows": [
              [
                "Kapan jalan",
                "Setelah berhenti",
                "Tiap interval, maksimal"
              ],
              [
                "Untuk",
                "Search input, autocomplete, resize",
                "Scroll, mousemove, drag"
              ]
            ]
          }
        ],
        "searchText": "setTimeout, Debounce, dan Throttle setTimeout, debounce, throttle settimeout setinterval debounce throttle delay performance search input setTimeout(fn, 1000); // jalankan sekali setelah 1 detik const id = setInterval(fn, 1000); // jalankan tiap 1 detik clearTimeout(id); clearInterval(id); // delay minimum, bukan tepat setTimeout(fn, 0); // tetap asynchronous, minimal ~4ms di browser Debounce — jalan hanya setelah user berhenti aktivitas function debounce(fn, delay = 300) { let timer; return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; } const cari = debounce((q) => console.log(\"cari:\", q), 500); input.addEventListener(\"input\", e => cari(e.target.value)); // Ketik cepat \"a\" \"ab\" \"abc\" -> request HANYA untuk \"abc\" Throttle — jalan maksimal sekali dalam interval tertentu function throttle(fn, limit = 300) { let waiting = false; return function (...args) { if (waiting) return; waiting = true; fn.apply(this, args); setTimeout(() => (waiting = false), limit); }; } window.addEventListener(\"scroll\", throttle(() => console.log(\"scroll\"), 200)); Debounce Throttle Kapan jalan Setelah berhenti Tiap interval, maksimal Untuk Search input, autocomplete, resize Scroll, mousemove, drag"
      },
      {
        "id": "c41",
        "no": 9,
        "title": "<code>fetch()</code>, REST API, dan HTTP Status",
        "plainTitle": "fetch(), REST API, dan HTTP Status",
        "priority": "P1",
        "minutes": 12,
        "short": "fetch() + REST API + status",
        "tags": [
          "fetch",
          "rest",
          "api",
          "http",
          "method",
          "status",
          "code",
          "header",
          "body",
          "request",
          "response"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "<code>fetch()</code> mengembalikan Promise yang berisi <code>Response</code>. <strong>Penting:</strong> <code>fetch</code> hanya reject pada error jaringan, <strong>bukan</strong> pada HTTP 404/500. Jadi <code>response.ok</code> WAJIB dicek manual."
          },
          {
            "type": "code",
            "code": "// GET\nasync function getUsers() {\n  const res = await fetch(\"/api/users\", {\n    headers: { \"Content-Type\": \"application/json\" }\n  });\n  if (!res.ok) throw new Error(\"HTTP \" + res.status);\n  return res.json();\n}\n\n// POST\nasync function createUser(user) {\n  const res = await fetch(\"/api/users\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/json\" },\n    body: JSON.stringify(user)\n  });\n  if (!res.status === 201) throw new Error(\"Gagal create\");\n  return res.json();\n}\n\n// DELETE (sering tanpa body)\nawait fetch(\"/api/users/1\", { method: \"DELETE\" });\n\n// options lain: PUT (ganti penuh), PATCH (update sebagian)",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "HTTP Method"
          },
          {
            "type": "table",
            "head": [
              "Method",
              "Fungsi",
              "Idempotent"
            ],
            "rows": [
              [
                "GET",
                "Ambil data",
                "Ya"
              ],
              [
                "POST",
                "Buat data baru",
                "Tidak"
              ],
              [
                "PUT",
                "Ganti seluruh resource",
                "Ya"
              ],
              [
                "PATCH",
                "Update sebagian",
                "Tidak"
              ],
              [
                "DELETE",
                "Hapus",
                "Ya"
              ]
            ]
          },
          {
            "type": "h4",
            "html": "Status code yang harus hafal"
          },
          {
            "type": "table",
            "head": [
              "Code",
              "Arti",
              "Contoh"
            ],
            "rows": [
              [
                "200",
                "OK",
                "GET berhasil"
              ],
              [
                "201",
                "Created",
                "POST berhasil"
              ],
              [
                "204",
                "No Content",
                "DELETE berhasil, tanpa body"
              ],
              [
                "400",
                "Bad Request",
                "input tidak valid"
              ],
              [
                "401",
                "Unauthorized",
                "belum login / token invalid"
              ],
              [
                "403",
                "Forbidden",
                "login tapi tidak punya izin"
              ],
              [
                "404",
                "Not Found",
                "resource tidak ada"
              ],
              [
                "500",
                "Internal Server Error",
                "bug di server"
              ]
            ]
          },
          {
            "type": "quote",
            "variant": "warn",
            "title": "401 vs 403: 401 = \"siapa kamu?\" (authentication gagal). 403 = \"kamu siapa, tapi kamu tidak boleh\" (authorization gagal).",
            "body": []
          }
        ],
        "searchText": "fetch(), REST API, dan HTTP Status fetch() + REST API + status fetch rest api http method status code header body request response fetch() mengembalikan Promise yang berisi Response. Penting: fetch hanya reject pada error jaringan, bukan pada HTTP 404/500. Jadi response.ok WAJIB dicek manual. // GET async function getUsers() { const res = await fetch(\"/api/users\", { headers: { \"Content-Type\": \"application/json\" } }); if (!res.ok) throw new Error(\"HTTP \" + res.status); return res.json(); } // POST async function createUser(user) { const res = await fetch(\"/api/users\", { method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify(user) }); if (!res.status === 201) throw new Error(\"Gagal create\"); return res.json(); } // DELETE (sering tanpa body) await fetch(\"/api/users/1\", { method: \"DELETE\" }); // options lain: PUT (ganti penuh), PATCH (update sebagian) HTTP Method Method Fungsi Idempotent GET Ambil data Ya POST Buat data baru Tidak PUT Ganti seluruh resource Ya PATCH Update sebagian Tidak DELETE Hapus Ya Status code yang harus hafal Code Arti Contoh 200 OK GET berhasil 201 Created POST berhasil 204 No Content DELETE berhasil, tanpa body 400 Bad Request input tidak valid 401 Unauthorized belum login / token invalid 403 Forbidden login tapi tidak punya izin 404 Not Found resource tidak ada 500 Internal Server Error bug di server 401 vs 403: 401 = \"siapa kamu?\" (authentication gagal). 403 = \"kamu siapa, tapi kamu tidak boleh\" (authorization gagal)."
      },
      {
        "id": "c42",
        "no": 10,
        "title": "<code>JSON.stringify</code> dan <code>JSON.parse</code>",
        "plainTitle": "JSON.stringify dan JSON.parse",
        "priority": "P1",
        "minutes": 8,
        "short": "JSON.stringify & parse",
        "tags": [
          "json",
          "stringify",
          "parse",
          "object",
          "api",
          "serialization",
          "deep",
          "copy",
          "gotcha"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "const user = { nama: \"A\", umur: 26, aktiv: true };\n\n// Object -> string JSON\nconst json = JSON.stringify(user);      // '{\"nama\":\"A\",\"umur\":26,\"aktiv\":true}'\nJSON.stringify(user, null, 2);          // format rapi (indent)\n\n// String -> object\nconst obj = JSON.parse(json);            // { nama: \"A\", ... }\n\n// Gabung dua proses (copy lewat JSON)\nconst copy = JSON.parse(JSON.stringify(user));",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "Hanya menyimpan <strong>JSON-valid</strong>: string, number, boolean, null, array, object. <code>undefined</code>, function, dan symbol <strong>dihilangkan</strong>.",
              "Tanggal menjadi <strong>string</strong> ISO: <code>new Date().toISOString()</code>.",
              "JSON hanya mendukung <strong>satu level</strong> — tidak ada komentar, tidak ada trailing comma.",
              "<code>JSON.parse()</code> gagal (throw SyntaxError) jika string bukan JSON valid."
            ]
          },
          {
            "type": "code",
            "code": "const d = new Date();\nJSON.stringify({ d });        // '{\"d\":\"2026-10-02T07:00:00.000Z\"}' -> bukan Date lagi\nJSON.stringify({ fn(){}, x: undefined });   // '{}'",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Jebakan: JSON.parse(JSON.stringify(obj)) terlihat seperti deep copy, tapi kehilangan tipe (Date jadi string, Map/Set jadi {}, dan referensi melingkar (circular reference) akan error). Untuk deep copy yang aman pakai structuredClone(obj) (Node 17+ / modern browser).",
            "body": []
          }
        ],
        "searchText": "JSON.stringify dan JSON.parse JSON.stringify & parse json stringify parse object api serialization deep copy gotcha const user = { nama: \"A\", umur: 26, aktiv: true }; // Object -> string JSON const json = JSON.stringify(user); // '{\"nama\":\"A\",\"umur\":26,\"aktiv\":true}' JSON.stringify(user, null, 2); // format rapi (indent) // String -> object const obj = JSON.parse(json); // { nama: \"A\", ... } // Gabung dua proses (copy lewat JSON) const copy = JSON.parse(JSON.stringify(user)); Hanya menyimpan JSON-valid: string, number, boolean, null, array, object. undefined, function, dan symbol dihilangkan. Tanggal menjadi string ISO: new Date().toISOString(). JSON hanya mendukung satu level — tidak ada komentar, tidak ada trailing comma. JSON.parse() gagal (throw SyntaxError) jika string bukan JSON valid. const d = new Date(); JSON.stringify({ d }); // '{\"d\":\"2026-10-02T07:00:00.000Z\"}' -> bukan Date lagi JSON.stringify({ fn(){}, x: undefined }); // '{}' Jebakan: JSON.parse(JSON.stringify(obj)) terlihat seperti deep copy, tapi kehilangan tipe (Date jadi string, Map/Set jadi {}, dan referensi melingkar (circular reference) akan error). Untuk deep copy yang aman pakai structuredClone(obj) (Node 17+ / modern browser)."
      }
    ]
  },
  {
    "id": "m8",
    "track": "js",
    "no": "8",
    "title": "Browser: DOM, Event, dan Storage",
    "plainTitle": "8 Browser: DOM, Event, dan Storage",
    "desc": "Jika posisi ternyata frontend, ini yang paling ditanya. DOM = cara JavaScript mengubah halaman.",
    "priorityNote": "Sering ditanyakan",
    "minutes": 38,
    "chapters": [
      {
        "id": "c43",
        "no": 1,
        "title": "DOM: Memilih dan Mengubah Elemen",
        "plainTitle": "DOM: Memilih dan Mengubah Elemen",
        "priority": "P2",
        "minutes": 12,
        "short": "DOM: pilih, buat, ubah",
        "tags": [
          "dom",
          "queryselector",
          "getelementbyid",
          "createelement",
          "appendchild",
          "textcontent",
          "classlist",
          "innerhtml"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "DOM adalah representasi object dari dokumen HTML. JavaScript mengubah tampilan halaman dengan memanipulasi object tersebut."
          },
          {
            "type": "code",
            "code": "<div id=\"app\">\n  <p class=\"teks\">Halo</p>\n</div>",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Memilih elemen"
          },
          {
            "type": "code",
            "code": "document.getElementById(\"app\");        // 1 elemen, paling cepat (by id)\ndocument.querySelector(\".teks\");        // 1 elemen pertama, selector CSS\ndocument.querySelectorAll(\".teks\");     // NodeList semua, pakai selector CSS\ndocument.getElementsByClassName(\"teks\"); // HTMLCollection (lama)\ndocument.getElementsByTagName(\"p\");\ndocument.body;\ndocument.documentElement;",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Mengubah isi &amp; atribut"
          },
          {
            "type": "code",
            "code": "const el = document.querySelector(\".teks\");\nel.textContent = \"Halo Dunia\";     // teks saja, AMAN (otomatis escape)\nel.innerHTML = \"<b>Tebal</b>\";   // parses HTML, bisa parses HTML dari user -> risiko XSS\nel.classList.add(\"aktif\");\nel.classList.remove(\"aktif\");\nel.classList.toggle(\"aktif\");\nel.setAttribute(\"data-id\", \"1\");\nel.getAttribute(\"data-id\");\nel.style.color = \"red\";",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Membuat &amp; menghapus elemen"
          },
          {
            "type": "code",
            "code": "const p = document.createElement(\"p\");\np.textContent = \"Elemen baru\";\ndocument.getElementById(\"app\").appendChild(p);   // tambah di akhir\nparent.prepend(p);            // tambah di depan\nparent.insertBefore(p, ref);  // sebelum elemen tertentu\np.remove();                   // hapus (modern, lebih bersih dari parent.removeChild)",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "warn",
            "title": "Selalu pakai textContent untuk data dari user, bukan innerHTML, untuk mencegah XSS.",
            "body": []
          }
        ],
        "searchText": "DOM: Memilih dan Mengubah Elemen DOM: pilih, buat, ubah dom queryselector getelementbyid createelement appendchild textcontent classlist innerhtml DOM adalah representasi object dari dokumen HTML. JavaScript mengubah tampilan halaman dengan memanipulasi object tersebut. <div id=\"app\"> <p class=\"teks\">Halo</p> </div> Memilih elemen document.getElementById(\"app\"); // 1 elemen, paling cepat (by id) document.querySelector(\".teks\"); // 1 elemen pertama, selector CSS document.querySelectorAll(\".teks\"); // NodeList semua, pakai selector CSS document.getElementsByClassName(\"teks\"); // HTMLCollection (lama) document.getElementsByTagName(\"p\"); document.body; document.documentElement; Mengubah isi &amp; atribut const el = document.querySelector(\".teks\"); el.textContent = \"Halo Dunia\"; // teks saja, AMAN (otomatis escape) el.innerHTML = \"<b>Tebal</b>\"; // parses HTML, bisa parses HTML dari user -> risiko XSS el.classList.add(\"aktif\"); el.classList.remove(\"aktif\"); el.classList.toggle(\"aktif\"); el.setAttribute(\"data-id\", \"1\"); el.getAttribute(\"data-id\"); el.style.color = \"red\"; Membuat &amp; menghapus elemen const p = document.createElement(\"p\"); p.textContent = \"Elemen baru\"; document.getElementById(\"app\").appendChild(p); // tambah di akhir parent.prepend(p); // tambah di depan parent.insertBefore(p, ref); // sebelum elemen tertentu p.remove(); // hapus (modern, lebih bersih dari parent.removeChild) Selalu pakai textContent untuk data dari user, bukan innerHTML, untuk mencegah XSS."
      },
      {
        "id": "c44",
        "no": 2,
        "title": "Event Handling, Bubbling, dan Delegation",
        "plainTitle": "Event Handling, Bubbling, dan Delegation",
        "priority": "P2",
        "minutes": 10,
        "short": "Event handling & delegation",
        "tags": [
          "event",
          "addEventListener",
          "bubbling",
          "propagation",
          "delegation",
          "preventdefault",
          "target",
          "preventpropagation"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "const btn = document.getElementById(\"submit\");\n\n// Cara modern (rekomendasi) — mendukung chaining\nbtn.addEventListener(\"click\", function (event) {\n  console.log(\"diklik\");\n  console.log(event.target);          // elemen yang diklik\n  console.log(event.currentTarget);   // elemen yang punya listener\n  event.preventDefault();             // batalkan aksi default (misal submit form)\n  event.stopPropagation();            // hentikan naik ke parent\n});\n\n// Cara lama: atribut HTML (avoid, inline & hard to remove)\n<button onclick=\"klik()\">Klik</button>",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Event yang paling sering dipakai"
          },
          {
            "type": "code",
            "code": "click        submit       input        change\nkeydown      keyup        focus        blur\nmouseover    mouseenter   scroll       load\nerror        DOMContentLoaded  resize",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Bubbling vs Capturing"
          },
          {
            "type": "code",
            "code": "// Bubbling (default): dari target naik ke atas\nel.addEventListener(\"click\", fn);                 // fase bubble\n\n// Capturing: dari atas turun ke target\nel.addEventListener(\"click\", fn, true);           // fase capture",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Event delegation (pola penting)"
          },
          {
            "type": "code",
            "code": "// Daripada menempelkan listener di tiap item, tempelkan di induknya\ndocument.getElementById(\"list\").addEventListener(\"click\", (e) => {\n  const item = e.target.closest(\".item\");   // cari elemen target terdekat\n  if (!item) return;\n  console.log(\"Item diklik:\", item.dataset.id);\n});\n// => 1 listener saja, tetap bekerja walau item baru di-add",
            "lang": "js"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Kapan pakai delegation: pada list dinamis (chat, todo, hasil search) — Menghemat listener dan otomatis bekerja untuk elemen yang belum ada saat listener dipasang.",
            "body": []
          }
        ],
        "searchText": "Event Handling, Bubbling, dan Delegation Event handling & delegation event addEventListener bubbling propagation delegation preventdefault target preventpropagation const btn = document.getElementById(\"submit\"); // Cara modern (rekomendasi) — mendukung chaining btn.addEventListener(\"click\", function (event) { console.log(\"diklik\"); console.log(event.target); // elemen yang diklik console.log(event.currentTarget); // elemen yang punya listener event.preventDefault(); // batalkan aksi default (misal submit form) event.stopPropagation(); // hentikan naik ke parent }); // Cara lama: atribut HTML (avoid, inline & hard to remove) <button onclick=\"klik()\">Klik</button> Event yang paling sering dipakai click submit input change keydown keyup focus blur mouseover mouseenter scroll load error DOMContentLoaded resize Bubbling vs Capturing // Bubbling (default): dari target naik ke atas el.addEventListener(\"click\", fn); // fase bubble // Capturing: dari atas turun ke target el.addEventListener(\"click\", fn, true); // fase capture Event delegation (pola penting) // Daripada menempelkan listener di tiap item, tempelkan di induknya document.getElementById(\"list\").addEventListener(\"click\", (e) => { const item = e.target.closest(\".item\"); // cari elemen target terdekat if (!item) return; console.log(\"Item diklik:\", item.dataset.id); }); // => 1 listener saja, tetap bekerja walau item baru di-add Kapan pakai delegation: pada list dinamis (chat, todo, hasil search) — Menghemat listener dan otomatis bekerja untuk elemen yang belum ada saat listener dipasang."
      },
      {
        "id": "c45",
        "no": 3,
        "title": "<code>localStorage</code> dan <code>sessionStorage</code>",
        "plainTitle": "localStorage dan sessionStorage",
        "priority": "P2",
        "minutes": 8,
        "short": "Local/session storage, cookie",
        "tags": [
          "localstorage",
          "sessionstorage",
          "cookie",
          "persist",
          "json",
          "token",
          "client",
          "side"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "// Simpan (hanya string!)\nlocalStorage.setItem(\"username\", \"A\");\n\n// Ambil\nconst u = localStorage.getItem(\"username\");   // string\nconst n = localStorage.getItem(\"nope\");       // null jika tidak ada\n\n// Untuk object -> harus JSON.stringify\nlocalStorage.setItem(\"user\", JSON.stringify({ nama: \"A\" }));\nconst user = JSON.parse(localStorage.getItem(\"user\"));\n\n// Hapus\nlocalStorage.removeItem(\"username\");\nlocalStorage.clear();        // hapus semua\nlocalStorage.length;         // jumlah key\nObject.keys(localStorage);   // daftar key (localStorage = object-like)",
            "lang": "js"
          },
          {
            "type": "table",
            "head": [
              "",
              "localStorage",
              "sessionStorage",
              "cookie"
            ],
            "rows": [
              [
                "Umur",
                "Permanen",
                "Per tab / session",
                "Disesuaikan"
              ],
              [
                "Kirim ke server",
                "Tidak",
                "Tidak",
                "<strong>Ya</strong>"
              ],
              [
                "Ukuran",
                "~5 MB",
                "~5 MB",
                "~4 KB per cookie"
              ],
              [
                "Akses",
                "JS",
                "JS",
                "JS + server"
              ],
              [
                "HttpOnly",
                "Tidak",
                "Tidak",
                "Bisa (aman dari JS)"
              ]
            ]
          },
          {
            "type": "quote",
            "variant": "warn",
            "title": "Jangan simpan token sensitif di localStorage — bisa dibaca oleh script pihak ketiga (XSS). Untuk session token yang tidak bisa diakses JavaScript, pakai cookie HttpOnly.",
            "body": []
          }
        ],
        "searchText": "localStorage dan sessionStorage Local/session storage, cookie localstorage sessionstorage cookie persist json token client side // Simpan (hanya string!) localStorage.setItem(\"username\", \"A\"); // Ambil const u = localStorage.getItem(\"username\"); // string const n = localStorage.getItem(\"nope\"); // null jika tidak ada // Untuk object -> harus JSON.stringify localStorage.setItem(\"user\", JSON.stringify({ nama: \"A\" })); const user = JSON.parse(localStorage.getItem(\"user\")); // Hapus localStorage.removeItem(\"username\"); localStorage.clear(); // hapus semua localStorage.length; // jumlah key Object.keys(localStorage); // daftar key (localStorage = object-like) localStorage sessionStorage cookie Umur Permanen Per tab / session Disesuaikan Kirim ke server Tidak Tidak <strong>Ya</strong> Ukuran ~5 MB ~5 MB ~4 KB per cookie Akses JS JS JS + server HttpOnly Tidak Tidak Bisa (aman dari JS) Jangan simpan token sensitif di localStorage — bisa dibaca oleh script pihak ketiga (XSS). Untuk session token yang tidak bisa diakses JavaScript, pakai cookie HttpOnly."
      },
      {
        "id": "c46",
        "no": 4,
        "title": "Form Handling dan Validasi",
        "plainTitle": "Form Handling dan Validasi",
        "priority": "P2",
        "minutes": 8,
        "short": "Form handling & validation",
        "tags": [
          "form",
          "submit",
          "validation",
          "required",
          "regex",
          "preventdefault",
          "checkbox",
          "event.target.value"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "const form = document.getElementById(\"login-form\");\n\nform.addEventListener(\"submit\", async (e) => {\n  e.preventDefault();                      // penting: jangan reload halaman\n\n  const data = {\n    email: form.email.value,\n    password: form.password.value\n  };\n\n  if (!validate(data)) return;             // validasi client side dulu\n\n  try {\n    const res = await fetch(\"/api/login\", {\n      method: \"POST\",\n      headers: { \"Content-Type\": \"application/json\" },\n      body: JSON.stringify(data)\n    });\n    if (!res.ok) throw new Error(\"Login gagal\");\n    const result = await res.json();\n    localStorage.setItem(\"token\", result.token);\n  } catch (err) {\n    showError(err.message);\n  }\n});\n\n// checkbox / radio\nform.querySelector(\"#agree\").checked   // boolean",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "Validasi di client hanya untuk UX. <strong>Server wajib validasi ulang</strong> — client bisa dimanipulasi.",
              "Atribut HTML: <code>required</code>, <code>type=\"email\"</code>, <code>minlength</code>, <code>pattern</code> — browser validasi otomatis.",
              "Validasi regex umum: <code>/^\\S+@\\S+\\.\\S+$/</code> untuk email."
            ]
          }
        ],
        "searchText": "Form Handling dan Validasi Form handling & validation form submit validation required regex preventdefault checkbox event.target.value const form = document.getElementById(\"login-form\"); form.addEventListener(\"submit\", async (e) => { e.preventDefault(); // penting: jangan reload halaman const data = { email: form.email.value, password: form.password.value }; if (!validate(data)) return; // validasi client side dulu try { const res = await fetch(\"/api/login\", { method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify(data) }); if (!res.ok) throw new Error(\"Login gagal\"); const result = await res.json(); localStorage.setItem(\"token\", result.token); } catch (err) { showError(err.message); } }); // checkbox / radio form.querySelector(\"#agree\").checked // boolean Validasi di client hanya untuk UX. Server wajib validasi ulang — client bisa dimanipulasi. Atribut HTML: required, type=\"email\", minlength, pattern — browser validasi otomatis. Validasi regex umum: /^\\S+@\\S+\\.\\S+$/ untuk email."
      }
    ]
  },
  {
    "id": "m9",
    "track": "js",
    "no": "9",
    "title": "Node.js, Express, dan Git",
    "plainTitle": "9 Node.js, Express, dan Git",
    "desc": "Wajib kalau role-nya backend JavaScript. Kalau tidak, cukup pahami konsep besarnya.",
    "priorityNote": "Pelajari jika ada waktu",
    "minutes": 62,
    "chapters": [
      {
        "id": "c47",
        "no": 1,
        "title": "Node.js dan Sistem Module",
        "plainTitle": "Node.js dan Sistem Module",
        "priority": "P3",
        "minutes": 8,
        "short": "Node.js & module system",
        "tags": [
          "node.js",
          "require",
          "import",
          "export",
          "commonjs",
          "esm",
          "module",
          "process",
          "env"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Node.js = runtime JavaScript di luar browser (server, CLI, script). Got utamanya: Node punya <strong>CommonJS</strong>, browser punya <strong>ES Module</strong>."
          },
          {
            "type": "table",
            "head": [
              "",
              "CommonJS (Node)",
              "ES Module (standar)"
            ],
            "rows": [
              [
                "Import",
                "<code>const x = require(\"x\")</code>",
                "<code>import x from \"x\"</code>"
              ],
              [
                "Export",
                "<code>module.exports = x</code>",
                "<code>export default x</code>"
              ],
              [
                "Load",
                "saat runtime",
                "saat compile (hoisted)"
              ],
              [
                "Ekstensi",
                "<code>.js</code>",
                "<code>.mjs</code> atau <code>\"type\":\"module\"</code>"
              ]
            ]
          },
          {
            "type": "code",
            "code": "// app.js\nconst http = require(\"http\");              // module bawaan Node\nconst express = require(\"express\");        // module dari npm\n\nconst { PORT } = require(\"./config\");      // module lokal\n\n// ESM (versi modern)\nimport http from \"http\";\nimport express from \"express\";\nimport { PORT } from \"./config.js\";         // WAJIB menulis ekstensi .js",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "// Node global objects\nconsole.log(__dirname);      // folder file sekarang (CJS)\nconsole.log(process.env);    // environment variable\nconsole.log(process.argv);    // argumen dari command line\nprocess.exit(0);",
            "lang": "js"
          }
        ],
        "searchText": "Node.js dan Sistem Module Node.js & module system node.js require import export commonjs esm module process env Node.js = runtime JavaScript di luar browser (server, CLI, script). Got utamanya: Node punya CommonJS, browser punya ES Module. CommonJS (Node) ES Module (standar) Import <code>const x = require(\"x\")</code> <code>import x from \"x\"</code> Export <code>module.exports = x</code> <code>export default x</code> Load saat runtime saat compile (hoisted) Ekstensi <code>.js</code> <code>.mjs</code> atau <code>\"type\":\"module\"</code> // app.js const http = require(\"http\"); // module bawaan Node const express = require(\"express\"); // module dari npm const { PORT } = require(\"./config\"); // module lokal // ESM (versi modern) import http from \"http\"; import express from \"express\"; import { PORT } from \"./config.js\"; // WAJIB menulis ekstensi .js // Node global objects console.log(__dirname); // folder file sekarang (CJS) console.log(process.env); // environment variable console.log(process.argv); // argumen dari command line process.exit(0);"
      },
      {
        "id": "c48",
        "no": 2,
        "title": "npm dan <code>package.json</code>",
        "plainTitle": "npm dan package.json",
        "priority": "P3",
        "minutes": 8,
        "short": "npm & package.json",
        "tags": [
          "npm",
          "package.json",
          "dependency",
          "devdependency",
          "script",
          "version",
          "lockfile"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "npm init -y                  // buat package.json\nnpm install express          // dependency (dependencies)\nnpm install --save-dev nodemon  // developmentDependency\nnpm uninstall express\nnpm install                  // jalankan sesuai package.json\nnpm run dev                  // jalankan script dari package.json",
            "lang": "bash"
          },
          {
            "type": "code",
            "code": "{\n  \"name\": \"app-saya\",\n  \"version\": \"1.0.0\",\n  \"description\": \"API untuk aplikasi\",\n  \"main\": \"server.js\",\n  \"scripts\": {\n    \"start\": \"node server.js\",\n    \"dev\": \"nodemon server.js\",\n    \"test\": \"jest\"\n  },\n  \"dependencies\": { \"express\": \"^4.18.0\" },\n  \"devDependencies\": { \"nodemon\": \"^3.0.0\" }\n}",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "<code>dependencies</code> = dipakai saat aplikasi jalan (express). <code>devDependencies</code> = hanya saat pengembangan (nodemon, jest).",
              "<code>^4.18.0</code> artinya versi 4.18.0 atau lebih baru tapi <strong>masih major 4</strong> — bukan versi 5.",
              "<code>package-lock.json</code> = mengunci versi persis agar konsisten antar tim. Jangan dihapus.",
              "Jangan pernah commit <code>node_modules/</code> (masukkan ke <code>.gitignore</code>)."
            ]
          }
        ],
        "searchText": "npm dan package.json npm & package.json npm package.json dependency devdependency script version lockfile npm init -y // buat package.json npm install express // dependency (dependencies) npm install --save-dev nodemon // developmentDependency npm uninstall express npm install // jalankan sesuai package.json npm run dev // jalankan script dari package.json { \"name\": \"app-saya\", \"version\": \"1.0.0\", \"description\": \"API untuk aplikasi\", \"main\": \"server.js\", \"scripts\": { \"start\": \"node server.js\", \"dev\": \"nodemon server.js\", \"test\": \"jest\" }, \"dependencies\": { \"express\": \"^4.18.0\" }, \"devDependencies\": { \"nodemon\": \"^3.0.0\" } } dependencies = dipakai saat aplikasi jalan (express). devDependencies = hanya saat pengembangan (nodemon, jest). ^4.18.0 artinya versi 4.18.0 atau lebih baru tapi masih major 4 — bukan versi 5. package-lock.json = mengunci versi persis agar konsisten antar tim. Jangan dihapus. Jangan pernah commit node_modules/ (masukkan ke.gitignore)."
      },
      {
        "id": "c49",
        "no": 3,
        "title": "Express.js dan Routing",
        "plainTitle": "Express.js dan Routing",
        "priority": "P3",
        "minutes": 10,
        "short": "Express & routing",
        "tags": [
          "express",
          "route",
          "get",
          "post",
          "put",
          "patch",
          "delete",
          "req",
          "res",
          "json",
          "status",
          "send",
          "listen",
          "middleware"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "const express = require(\"express\");\nconst app = express();\n\napp.use(express.json());                        // parse body JSON\napp.use(express.urlencoded({ extended: true })); // parse body form\n\n// Object Route\nconst users = [{ id: 1, nama: \"A\" }];\n\napp.get(\"/api/users\", (req, res) => {\n  res.json(users);\n});\napp.get(\"/api/users/:id\", (req, res) => {\n  const user = users.find(u => u.id == req.params.id);\n  if (!user) return res.status(404).json({ message: \"Tidak ditemukan\" });\n  res.json(user);\n});\napp.post(\"/api/users\", (req, res) => {\n  const newUser = { id: users.length + 1, ...req.body };\n  users.push(newUser);\n  res.status(201).json(newUser);                // 201 Created\n});\napp.patch(\"/api/users/:id\", (req, res) => {\n  res.json({ message: \"Updated\" });\n});\napp.delete(\"/api/users/:id\", (req, res) => {\n  res.status(204).send();                       // 204 No Content\n});\n\napp.listen(3000, () => console.log(\"Server jalan di port 3000\"));",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "<strong>req</strong> = request (params, query, body, headers), <strong>res</strong> = response (json, status, send).",
              "<code>:id</code> = parameter dinamis → <code>req.params.id</code>.",
              "<code>?page=1&amp;limit=10</code> = query string → <code>req.query.page</code>.",
              "<code>res.status(404).json({...})</code> = pola wajib: set status dulu, baru kirim body.",
              "<code>express.static(\"public\")</code> untuk menyajikan file frontend."
            ]
          }
        ],
        "searchText": "Express.js dan Routing Express & routing express route get post put patch delete req res json status send listen middleware const express = require(\"express\"); const app = express(); app.use(express.json()); // parse body JSON app.use(express.urlencoded({ extended: true })); // parse body form // Object Route const users = [{ id: 1, nama: \"A\" }]; app.get(\"/api/users\", (req, res) => { res.json(users); }); app.get(\"/api/users/:id\", (req, res) => { const user = users.find(u => u.id == req.params.id); if (!user) return res.status(404).json({ message: \"Tidak ditemukan\" }); res.json(user); }); app.post(\"/api/users\", (req, res) => { const newUser = { id: users.length + 1, ...req.body }; users.push(newUser); res.status(201).json(newUser); // 201 Created }); app.patch(\"/api/users/:id\", (req, res) => { res.json({ message: \"Updated\" }); }); app.delete(\"/api/users/:id\", (req, res) => { res.status(204).send(); // 204 No Content }); app.listen(3000, () => console.log(\"Server jalan di port 3000\")); req = request (params, query, body, headers), res = response (json, status, send). :id = parameter dinamis → req.params.id. ?page=1&amp;limit=10 = query string → req.query.page. res.status(404).json({...}) = pola wajib: set status dulu, baru kirim body. express.static(\"public\") untuk menyajikan file frontend."
      },
      {
        "id": "c50",
        "no": 4,
        "title": "Middleware dan Error Handling",
        "plainTitle": "Middleware dan Error Handling",
        "priority": "P3",
        "minutes": 10,
        "short": "Middleware & error handling",
        "tags": [
          "middleware",
          "next",
          "function",
          "order",
          "error",
          "handling",
          "try",
          "catch",
          "async",
          "custom",
          "error"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "Middleware = function yang dijalankan di antara request masuk dan response keluar. Ada 3 bentuk:"
          },
          {
            "type": "table",
            "head": [
              "Bentuk",
              "Fungsi",
              "Contoh"
            ],
            "rows": [
              [
                "Logging",
                "Mencatat request",
                "log method &amp; URL"
              ],
              [
                "Auth",
                "Mengecek token",
                "JWT verification"
              ],
              [
                "Validation",
                "Validasi input",
                "Cek field wajib"
              ],
              [
                "Error handler",
                "Tangkap error",
                "Kirim 500"
              ]
            ]
          },
          {
            "type": "code",
            "code": "// 1. Logger\napp.use((req, res, next) => {\n  console.log(`${req.method} ${req.url}`);\n  next();                       // WAJIB next() atau request macet\n});\n\n// 2. Auth (hanya untuk route tertentu)\nfunction auth(req, res, next) {\n  const token = req.headers.authorization;\n  if (!token) return res.status(401).json({ message: \"Unauthorized\" });\n  next();\n}\napp.get(\"/api/profile\", auth, (req, res) => res.json({ ok: true }));\n\n// 3. Error handler (HARUS di paling akhir, 4 parameter)\napp.use((err, req, res, next) => {\n  console.error(err);\n  res.status(err.status || 500).json({ message: err.message });\n});",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "// try/catch di dalam async route (Express 5 sudah tangani otomatis)\napp.post(\"/api/users\", async (req, res, next) => {\n  try {\n    const user = await db.create(req.body);\n    res.status(201).json(user);\n  } catch (err) {\n    next(err);                 // teruskan ke error handler\n  }\n});",
            "lang": "js"
          }
        ],
        "searchText": "Middleware dan Error Handling Middleware & error handling middleware next function order error handling try catch async custom error Middleware = function yang dijalankan di antara request masuk dan response keluar. Ada 3 bentuk: Bentuk Fungsi Contoh Logging Mencatat request log method &amp; URL Auth Mengecek token JWT verification Validation Validasi input Cek field wajib Error handler Tangkap error Kirim 500 // 1. Logger app.use((req, res, next) => { console.log(`${req.method} ${req.url}`); next(); // WAJIB next() atau request macet }); // 2. Auth (hanya untuk route tertentu) function auth(req, res, next) { const token = req.headers.authorization; if (!token) return res.status(401).json({ message: \"Unauthorized\" }); next(); } app.get(\"/api/profile\", auth, (req, res) => res.json({ ok: true })); // 3. Error handler (HARUS di paling akhir, 4 parameter) app.use((err, req, res, next) => { console.error(err); res.status(err.status || 500).json({ message: err.message }); }); // try/catch di dalam async route (Express 5 sudah tangani otomatis) app.post(\"/api/users\", async (req, res, next) => { try { const user = await db.create(req.body); res.status(201).json(user); } catch (err) { next(err); // teruskan ke error handler } });"
      },
      {
        "id": "c51",
        "no": 5,
        "title": "Authentication vs Authorization, dan JWT",
        "plainTitle": "Authentication vs Authorization, dan JWT",
        "priority": "P3",
        "minutes": 10,
        "short": "AuthN/AuthZ & JWT",
        "tags": [
          "authentication",
          "authorization",
          "jwt",
          "token",
          "bcrypt",
          "hash",
          "login",
          "session",
          "security"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "p",
            "html": "<strong>Authentication</strong> = \"Siapa kamu?\" (login). <strong>Authorization</strong> = \"Apa yang boleh kamu lakukan?\" (akses)."
          },
          {
            "type": "code",
            "code": "Admin  -> bisa hapus user\nUser   -> tidak bisa hapus user\n(Authentication sama-sama berhasil, Authorization berbeda)",
            "lang": "js"
          },
          {
            "type": "h4",
            "html": "Alur login dengan JWT"
          },
          {
            "type": "code",
            "code": "User login (email + password)\n     |\n     v\nServer verifikasi password (bcrypt.compare)\n     |\n     v\nServer buat token JWT dan kirim ke client\n     |\n     v\nClient simpan token (localStorage atau cookie HttpOnly)\n     |\n     v\nSetiap request: header \"Authorization: Bearer <token>\"\n     |\n     v\nServer verifikasi signature token -> izinkan atau 401/403",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "// Bentuk JWT\nHeader.Payload.Signature\n// eyJhbGciOi....eyJ1aWQiOjEyMw.SflKxwRJ...\n\n// Header  : algoritma\n// Payload : data (bisa DIBACA orang, jangan taruh password di sini)\n// Signature: hash header+payload dengan secret (menjaga keaslian)",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "<strong>Password TIDAK PERNAH disimpan apa adanya</strong> — pakai <code>bcrypt</code>/<code>argon2</code> (hash + salt).",
              "JWT bisa di-<em>decode</em> tanpa secret (payload-nya readable), tapi tidak bisa di-<em>verify</em>. Jangan simpan data sensitif di payload.",
              "Untuk sistem sensitif (bank), <strong>session server-side</strong> lebih aman daripada JWT karena bisa langsung di-revoke.",
              "Selalu validasi di server. Menyembunyikan tombol di UI bukan otorisasi."
            ]
          }
        ],
        "searchText": "Authentication vs Authorization, dan JWT AuthN/AuthZ & JWT authentication authorization jwt token bcrypt hash login session security Authentication = \"Siapa kamu?\" (login). Authorization = \"Apa yang boleh kamu lakukan?\" (akses). Admin -> bisa hapus user User -> tidak bisa hapus user (Authentication sama-sama berhasil, Authorization berbeda) Alur login dengan JWT User login (email + password) | v Server verifikasi password (bcrypt.compare) | v Server buat token JWT dan kirim ke client | v Client simpan token (localStorage atau cookie HttpOnly) | v Setiap request: header \"Authorization: Bearer <token>\" | v Server verifikasi signature token -> izinkan atau 401/403 // Bentuk JWT Header.Payload.Signature // eyJhbGciOi....eyJ1aWQiOjEyMw.SflKxwRJ... // Header : algoritma // Payload : data (bisa DIBACA orang, jangan taruh password di sini) // Signature: hash header+payload dengan secret (menjaga keaslian) Password TIDAK PERNAH disimpan apa adanya — pakai bcrypt / argon2 (hash + salt). JWT bisa di- decode tanpa secret (payload-nya readable), tapi tidak bisa di- verify. Jangan simpan data sensitif di payload. Untuk sistem sensitif (bank), session server-side lebih aman daripada JWT karena bisa langsung di-revoke. Selalu validasi di server. Menyembunyikan tombol di UI bukan otorisasi."
      },
      {
        "id": "c52",
        "no": 6,
        "title": "Integrasi Database (Konsep)",
        "plainTitle": "Integrasi Database (Konsep)",
        "priority": "P3",
        "minutes": 8,
        "short": "Database integration",
        "tags": [
          "database",
          "sql",
          "nosql",
          "mysql",
          "postgres",
          "mongodb",
          "query",
          "index",
          "crud",
          "restful"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "// SQL (relasional: MySQL, PostgreSQL) — tabel, relasi, schema tetap\nSELECT id, nama, email FROM users WHERE umur > 25 ORDER BY nama LIMIT 10;\nINSERT INTO users (nama, email) VALUES ('A', 'a@b.c');\n\n// NoSQL (MongoDB, Redis) — dokumen JSON, schema bebas\ndb.collection(\"users\").find({ umur: { $gt: 25 } }).toArray()",
            "lang": "js"
          },
          {
            "type": "ul",
            "items": [
              "Object-relational mapping (ORM) seperti <strong>Sequelize</strong>, <strong>Prisma</strong>, atau <strong>Mongoose</strong>.",
              "Basic CRUD: Create, Read, Update, Delete — empat operasi dasar yang sama untuk semua database.",
              "<strong>Index</strong> mempercepat query pada kolom yang sering difilter/sortir.",
              "Joins (SQL) vs embedding/referencing (NoSQL) — embedded lebih cepat untuk data 1:N kecil.",
              "Selalu wajib: prepared statement (hindari SQL injection) dan validasi input."
            ]
          }
        ],
        "searchText": "Integrasi Database (Konsep) Database integration database sql nosql mysql postgres mongodb query index crud restful // SQL (relasional: MySQL, PostgreSQL) — tabel, relasi, schema tetap SELECT id, nama, email FROM users WHERE umur > 25 ORDER BY nama LIMIT 10; INSERT INTO users (nama, email) VALUES ('A', 'a@b.c'); // NoSQL (MongoDB, Redis) — dokumen JSON, schema bebas db.collection(\"users\").find({ umur: { $gt: 25 } }).toArray() Object-relational mapping (ORM) seperti Sequelize, Prisma, atau Mongoose. Basic CRUD: Create, Read, Update, Delete — empat operasi dasar yang sama untuk semua database. Index mempercepat query pada kolom yang sering difilter/sortir. Joins (SQL) vs embedding/referencing (NoSQL) — embedded lebih cepat untuk data 1:N kecil. Selalu wajib: prepared statement (hindari SQL injection) dan validasi input."
      },
      {
        "id": "c53",
        "no": 7,
        "title": "Git dan Alur Kerja",
        "plainTitle": "Git dan Alur Kerja",
        "priority": "P2",
        "minutes": 8,
        "short": "Git & workflow",
        "tags": [
          "git",
          "branch",
          "commit",
          "merge",
          "pull",
          "push",
          "conflict",
          "stash",
          "rebase",
          "workflow"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "git clone <url>          // ambil repo\ngit status               // apa yang berubah\ngit add .                // stage semua perubahan\ngit commit -m \"pesan\"    // simpan versi\ngit pull                 // ambil perubahan dari remote\ngit push                 // kirim commit ke remote\ngit branch fitur-a       // buat branch baru\ngit switch fitur-a       // pindah branch (modern, ganti checkout)\ngit merge fitur-a        // gabungkan branch\ngit log --oneline        // riwayat commit ringkas\ngit diff                 // bandingkan perubahan",
            "lang": "bash"
          },
          {
            "type": "h4",
            "html": "Alur kerja harian"
          },
          {
            "type": "code",
            "code": "git pull                  // sync dengan tim dulu\ngit switch -c fitur-baru   // buat branch baru\n// ... ngoding ...\ngit add .\ngit commit -m \"add endpoint users\"\ngit push                    // kirim ke remote\n// Setelah di-review: buat PR, lalu merge",
            "lang": "bash"
          },
          {
            "type": "h4",
            "html": "Kalau ada conflict"
          },
          {
            "type": "ul",
            "items": [
              "<code>git pull</code> → conflict muncul (file ditandai <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>).",
              "Buka file, pilih versi yang benar, hapus penanda conflict.",
              "<code>git add file</code> → <code>git commit</code>.",
              "<code>git stash</code> untuk menyimpan perubahan sementara bila belum siap commit."
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Commit message yang baik: Ringkas, jelas, konsisten — contoh: fix: validasi email tidak bisa kosong. Format umum: feat: fitur baru, fix: perbaikan bug, refactor: ubah struktur tanpa mengubah fungsi.",
            "body": []
          }
        ],
        "searchText": "Git dan Alur Kerja Git & workflow git branch commit merge pull push conflict stash rebase workflow git clone <url> // ambil repo git status // apa yang berubah git add . // stage semua perubahan git commit -m \"pesan\" // simpan versi git pull // ambil perubahan dari remote git push // kirim commit ke remote git branch fitur-a // buat branch baru git switch fitur-a // pindah branch (modern, ganti checkout) git merge fitur-a // gabungkan branch git log --oneline // riwayat commit ringkas git diff // bandingkan perubahan Alur kerja harian git pull // sync dengan tim dulu git switch -c fitur-baru // buat branch baru // ... ngoding ... git add . git commit -m \"add endpoint users\" git push // kirim ke remote // Setelah di-review: buat PR, lalu merge Kalau ada conflict git pull → conflict muncul (file ditandai &lt;&lt;&lt;&lt;&lt;&lt;&lt;). Buka file, pilih versi yang benar, hapus penanda conflict. git add file → git commit. git stash untuk menyimpan perubahan sementara bila belum siap commit. Commit message yang baik: Ringkas, jelas, konsisten — contoh: fix: validasi email tidak bisa kosong. Format umum: feat: fitur baru, fix: perbaikan bug, refactor: ubah struktur tanpa mengubah fungsi."
      }
    ]
  },
  {
    "id": "m10",
    "track": "js",
    "no": "10",
    "title": "Coding Test: Pola dan Soal Practice",
    "plainTitle": "10 Coding Test: Pola dan Soal Practice",
    "desc": "Kerjakan setiap soal di <strong>Playground</strong> (tombol kanan bawah) sebelum melihat jawabannya. Jangan baca jawaban duluan.",
    "priorityNote": "Wajib dikuasai",
    "minutes": 160,
    "chapters": [
      {
        "id": "c54",
        "no": 1,
        "title": "Cara Menjawab Soal Coding Live",
        "plainTitle": "Cara Menjawab Soal Coding Live",
        "priority": "P1",
        "minutes": 10,
        "short": "Cara menjawab soal coding",
        "tags": [
          "live",
          "coding",
          "tips",
          "approach",
          "klarifikasi",
          "pseudocode",
          "edge",
          "case",
          "time",
          "complexity",
          "interview"
        ],
        "notePlaceholder": "Tulis kalimat pembuka yang akan Anda pakai saat klarifikasi...",
        "blocks": [
          {
            "type": "ol",
            "items": [
              "<strong>Klarifikasi dulu (jangan langsung ngetik).</strong> \"Saya boleh pastikan dulu — input-nya berupa string dan output-nya string yang dibalik, benar? Edge case-nya string kosong dianggap valid?\"",
              "<strong>Sampaikan rencana dengan lisan.</strong> \"Saya akan pakai <code>split</code> untuk mengubah string jadi array karakter, <code>reverse</code> untuk membalik, lalu <code>join</code> untuk menggabungnya kembali.\"",
              "<strong>Tulis kode perlahan dan rapi.</strong> Beri nama variabel jelas, indentasi konsisten. Jangan buru-buru.",
              "<strong>Uji dengan contoh.</strong> Jalankan dengan 1 contoh normal + 1 edge case, lalu sebutkan hasilnya dengan suara.",
              "<strong>Bahas edge case.</strong> Array kosong, <code>null</code>/<code>undefined</code>, duplikat, negatif, duplikasi kapital.",
              "<strong>Sebut kompleksitas kalau relevan.</strong> O(n) untuk satu loop, O(n²) untuk loop di dalam loop."
            ]
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "Yang dinilai: cara berpikir &amp; komunikasi, bukan hanya jawaban benar. Kalau tidak tahu solusi optimal, katakan fitur apa yang Anda kuasai lalu gunakan itu.",
            "body": []
          }
        ],
        "searchText": "Cara Menjawab Soal Coding Live Cara menjawab soal coding live coding tips approach klarifikasi pseudocode edge case time complexity interview Klarifikasi dulu (jangan langsung ngetik). \"Saya boleh pastikan dulu — input-nya berupa string dan output-nya string yang dibalik, benar? Edge case-nya string kosong dianggap valid?\" Sampaikan rencana dengan lisan. \"Saya akan pakai split untuk mengubah string jadi array karakter, reverse untuk membalik, lalu join untuk menggabungnya kembali.\" Tulis kode perlahan dan rapi. Beri nama variabel jelas, indentasi konsisten. Jangan buru-buru. Uji dengan contoh. Jalankan dengan 1 contoh normal + 1 edge case, lalu sebutkan hasilnya dengan suara. Bahas edge case. Array kosong, null / undefined, duplikat, negatif, duplikasi kapital. Sebut kompleksitas kalau relevan. O(n) untuk satu loop, O(n²) untuk loop di dalam loop. Yang dinilai: cara berpikir &amp; komunikasi, bukan hanya jawaban benar. Kalau tidak tahu solusi optimal, katakan fitur apa yang Anda kuasai lalu gunakan itu."
      },
      {
        "id": "c55",
        "no": 2,
        "title": "Soal 1 — Reverse String",
        "plainTitle": "Soal 1 — Reverse String",
        "priority": "P1",
        "minutes": 8,
        "short": "Soal 1: Reverse string",
        "tags": [
          "reverse",
          "string",
          "split",
          "reverse",
          "join",
          "interview"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Balik urutan karakter pada sebuah string.",
            "io": "<b>Input:</b> <code>\"hello\"</code>  →  <b>Output:</b> <code>\"olleh\"</code>",
            "seed": "// Soal: Reverse String\n// Balik urutan karakter pada string.\n// \"hello\" -> \"olleh\", \"\" -> \"\"\n\nfunction reverseString(str) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(reverseString(\"hello\"));\nconsole.log(reverseString(\"\"));\nconsole.log(reverseString(\"a\"));"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "function reverseString(str) {\n  return str.split(\"\").reverse().join(\"\");\n}",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "<strong>Alternatif tanpa split:</strong> <code>[...str].reverse().join(\"\")</code> — lebih aman untuk karakter Unicode (emoji, aksara)."
              },
              {
                "type": "p",
                "html": "<strong>Kompleksitas:</strong> O(n) waktu, O(n) memori."
              }
            ]
          }
        ],
        "searchText": "Soal 1 — Reverse String Soal 1: Reverse string reverse string split reverse join interview Balik urutan karakter pada sebuah string. Input: \"hello\" → Output: \"olleh\" // Soal: Reverse String // Balik urutan karakter pada string. // \"hello\" -> \"olleh\", \"\" -> \"\" function reverseString(str) { // Tulis solusi Anda di sini } console.log(reverseString(\"hello\")); console.log(reverseString(\"\")); console.log(reverseString(\"a\")); Lihat jawaban function reverseString(str) { return str.split(\"\").reverse().join(\"\"); } Alternatif tanpa split: [...str].reverse().join(\"\") — lebih aman untuk karakter Unicode (emoji, aksara). Kompleksitas: O(n) waktu, O(n) memori."
      },
      {
        "id": "c56",
        "no": 3,
        "title": "Soal 2 — Palindrome",
        "plainTitle": "Soal 2 — Palindrome",
        "priority": "P1",
        "minutes": 10,
        "short": "Soal 2: Palindrome",
        "tags": [
          "palindrome",
          "reverse",
          "compare",
          "case",
          "insensitive",
          "regex"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Cek apakah string dibaca sama dari depan dan belakang.",
            "io": "<b>Input:</b> <code>\"katak\"</code> → <code>true</code> · <code>\"hello\"</code> → <code>false</code> · <code>\"A man, a plan, a canal: Panama\"</code> → <code>true</code>",
            "seed": "// Soal: Palindrome\n// Abaikan huruf besar/kecil, spasi, dan tanda baca.\n\nfunction isPalindrome(str) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(isPalindrome(\"katak\"));            // true\nconsole.log(isPalindrome(\"hello\"));            // false\nconsole.log(isPalindrome(\"A man, a plan, a canal: Panama\")); // true"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "// Versi sederhana\nfunction isPalindrome(str) {\n  const reversed = str.split(\"\").reverse().join(\"\");\n  return str === reversed;\n}\n\n// Versi robust: abaikan non-huruf & huruf besar\nfunction isPalindrome(str) {\n  const bersih = str.toLowerCase().replace(/[^a-z0-9]/g, \"\");\n  return bersih === [...bersih].reverse().join(\"\");\n}",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "<strong>Alternatif tanpa reverse:</strong> bandingkan karakter dari dua arah pakai loop/two-pointer — O(n) waktu tanpa array tambahan."
              }
            ]
          }
        ],
        "searchText": "Soal 2 — Palindrome Soal 2: Palindrome palindrome reverse compare case insensitive regex Cek apakah string dibaca sama dari depan dan belakang. Input: \"katak\" → true · \"hello\" → false · \"A man, a plan, a canal: Panama\" → true // Soal: Palindrome // Abaikan huruf besar/kecil, spasi, dan tanda baca. function isPalindrome(str) { // Tulis solusi Anda di sini } console.log(isPalindrome(\"katak\")); // true console.log(isPalindrome(\"hello\")); // false console.log(isPalindrome(\"A man, a plan, a canal: Panama\")); // true Lihat jawaban // Versi sederhana function isPalindrome(str) { const reversed = str.split(\"\").reverse().join(\"\"); return str === reversed; } // Versi robust: abaikan non-huruf & huruf besar function isPalindrome(str) { const bersih = str.toLowerCase().replace(/[^a-z0-9]/g, \"\"); return bersih === [...bersih].reverse().join(\"\"); } Alternatif tanpa reverse: bandingkan karakter dari dua arah pakai loop/two-pointer — O(n) waktu tanpa array tambahan."
      },
      {
        "id": "c57",
        "no": 4,
        "title": "Soal 3 — Cari Angka Terbesar &amp; Kedua Terbesar",
        "plainTitle": "Soal 3 — Cari Angka Terbesar & Kedua Terbesar",
        "priority": "P1",
        "minutes": 8,
        "short": "Soal 3: Angka terbesar & kedua",
        "tags": [
          "max",
          "number",
          "largest",
          "spread",
          "math.max",
          "reduce",
          "sort"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Cari nilai terbesar (dan terbesar kedua) dari array angka.",
            "io": "<b>Input:</b> <code>[1, 5, 3, 9, 2]</code> → <b>Terbesar:</b> <code>9</code>, <b>Kedua:</b> <code>5</code>",
            "seed": "// Soal: Angka terbesar & kedua terbesar\n\nfunction maxNumber(numbers) {\n  // Tulis solusi Anda di sini\n}\n\nfunction secondMax(numbers) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(maxNumber([1, 5, 3, 9, 2]));   // 9\nconsole.log(secondMax([1, 5, 3, 9, 2]));  // 5"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "// Terbesar\nfunction maxNumber(numbers) {\n  return Math.max(...numbers);\n}\nfunction maxNumber2(numbers) {\n  return numbers.reduce((m, n) => (n > m ? n : m));\n}\n\n// Kedua terbesar (perhatikan: TIDAK boleh duplikat)\nfunction secondMax(numbers) {\n  const urut = [...numbers].sort((a, b) => b - a);\n  return urut.find(n => n !== urut[0]);\n}\n\n// Versi satu loop, lebih efisien\nfunction secondMax(numbers) {\n  let terbesar = -Infinity, kedua = -Infinity;\n  for (const n of numbers) {\n    if (n > terbesar) { kedua = terbesar; terbesar = n; }\n    else if (n < terbesar && n > kedua) { kedua = n; }\n  }\n  return kedua;\n}",
                "lang": "js"
              }
            ]
          }
        ],
        "searchText": "Soal 3 — Cari Angka Terbesar & Kedua Terbesar Soal 3: Angka terbesar & kedua max number largest spread math.max reduce sort Cari nilai terbesar (dan terbesar kedua) dari array angka. Input: [1, 5, 3, 9, 2] → Terbesar: 9, Kedua: 5 // Soal: Angka terbesar & kedua terbesar function maxNumber(numbers) { // Tulis solusi Anda di sini } function secondMax(numbers) { // Tulis solusi Anda di sini } console.log(maxNumber([1, 5, 3, 9, 2])); // 9 console.log(secondMax([1, 5, 3, 9, 2])); // 5 Lihat jawaban // Terbesar function maxNumber(numbers) { return Math.max(...numbers); } function maxNumber2(numbers) { return numbers.reduce((m, n) => (n > m ? n : m)); } // Kedua terbesar (perhatikan: TIDAK boleh duplikat) function secondMax(numbers) { const urut = [...numbers].sort((a, b) => b - a); return urut.find(n => n !== urut[0]); } // Versi satu loop, lebih efisien function secondMax(numbers) { let terbesar = -Infinity, kedua = -Infinity; for (const n of numbers) { if (n > terbesar) { kedua = terbesar; terbesar = n; } else if (n < terbesar && n > kedua) { kedua = n; } } return kedua; }"
      },
      {
        "id": "c58",
        "no": 5,
        "title": "Soal 4 — FizzBuzz",
        "plainTitle": "Soal 4 — FizzBuzz",
        "priority": "P1",
        "minutes": 8,
        "short": "Soal 4: FizzBuzz",
        "tags": [
          "fizzbuzz",
          "loop",
          "modulo",
          "string",
          "number",
          "classic"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Untuk angka 1..n: kelipatan 3 → \"Fizz\", kelipatan 5 → \"Buzz\", kelipatan 15 → \"FizzBuzz\", selain itu angka itu sendiri.",
            "io": "<b>Output (n=5):</b> <code>[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"]</code>",
            "seed": "// Soal: FizzBuzz\n// 3 dan 5 -> FizzBuzz, 3 -> Fizz, 5 -> Buzz, selain itu angka\n\nfunction fizzBuzz(n) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(fizzBuzz(5));\n// [\"1\", \"2\", \"Fizz\", \"4\", \"Buzz\"]"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "function fizzBuzz(n) {\n  const hasil = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) hasil.push(\"FizzBuzz\");\n    else if (i % 3 === 0) hasil.push(\"Fizz\");\n    else if (i % 5 === 0) hasil.push(\"Buzz\");\n    else hasil.push(i);\n  }\n  return hasil;\n}\n\n// Versi map\nfunction fizzBuzz(n) {\n  return Array.from({ length: n }, (_, i) => {\n    i++;\n    const f = i % 3 === 0, b = i % 5 === 0;\n    return f && b ? \"FizzBuzz\" : f ? \"Fizz\" : b ? \"Buzz\" : i;\n  });\n}",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "<strong>Jebakan:</strong> cek kelipatan <strong>15</strong> (atau 3&amp;5) <strong>lebih dulu</strong>, kalau tidak akan salah jadi \"FizzBuzz\" → \"Fizz\"."
              }
            ]
          }
        ],
        "searchText": "Soal 4 — FizzBuzz Soal 4: FizzBuzz fizzbuzz loop modulo string number classic Untuk angka 1..n: kelipatan 3 → \"Fizz\", kelipatan 5 → \"Buzz\", kelipatan 15 → \"FizzBuzz\", selain itu angka itu sendiri. Output (n=5): [\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"] // Soal: FizzBuzz // 3 dan 5 -> FizzBuzz, 3 -> Fizz, 5 -> Buzz, selain itu angka function fizzBuzz(n) { // Tulis solusi Anda di sini } console.log(fizzBuzz(5)); // [\"1\", \"2\", \"Fizz\", \"4\", \"Buzz\"] Lihat jawaban function fizzBuzz(n) { const hasil = []; for (let i = 1; i <= n; i++) { if (i % 15 === 0) hasil.push(\"FizzBuzz\"); else if (i % 3 === 0) hasil.push(\"Fizz\"); else if (i % 5 === 0) hasil.push(\"Buzz\"); else hasil.push(i); } return hasil; } // Versi map function fizzBuzz(n) { return Array.from({ length: n }, (_, i) => { i++; const f = i % 3 === 0, b = i % 5 === 0; return f && b ? \"FizzBuzz\" : f ? \"Fizz\" : b ? \"Buzz\" : i; }); } Jebakan: cek kelipatan 15 (atau 3&amp;5) lebih dulu, kalau tidak akan salah jadi \"FizzBuzz\" → \"Fizz\"."
      },
      {
        "id": "c59",
        "no": 6,
        "title": "Soal 5 — Ambil Angka Genap",
        "plainTitle": "Soal 5 — Ambil Angka Genap",
        "priority": "P1",
        "minutes": 8,
        "short": "Soal 5: Filter angka genap",
        "tags": [
          "filter",
          "even",
          "odd",
          "array",
          "loop",
          "return"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Kembalikan array baru berisi semua angka genap.",
            "io": "<b>Input:</b> <code>[1,2,3,4,5,6]</code> → <b>Output:</b> <code>[2,4,6]</code>",
            "seed": "// Soal: Filter angka genap\n// Kembalikan array baru yang hanya berisi angka genap\n\nfunction getEvenNumbers(numbers) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(getEvenNumbers([1,2,3,4,5,6]));   // [2,4,6]"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "function getEvenNumbers(numbers) {\n  return numbers.filter(n => n % 2 === 0);\n}\n\n// Versi loop (kalau diminta tanpa method bawaan)\nfunction getEvenNumbers(numbers) {\n  const hasil = [];\n  for (const n of numbers) {\n    if (n % 2 === 0) hasil.push(n);\n  }\n  return hasil;\n}",
                "lang": "js"
              }
            ]
          }
        ],
        "searchText": "Soal 5 — Ambil Angka Genap Soal 5: Filter angka genap filter even odd array loop return Kembalikan array baru berisi semua angka genap. Input: [1,2,3,4,5,6] → Output: [2,4,6] // Soal: Filter angka genap // Kembalikan array baru yang hanya berisi angka genap function getEvenNumbers(numbers) { // Tulis solusi Anda di sini } console.log(getEvenNumbers([1,2,3,4,5,6])); // [2,4,6] Lihat jawaban function getEvenNumbers(numbers) { return numbers.filter(n => n % 2 === 0); } // Versi loop (kalau diminta tanpa method bawaan) function getEvenNumbers(numbers) { const hasil = []; for (const n of numbers) { if (n % 2 === 0) hasil.push(n); } return hasil; }"
      },
      {
        "id": "c60",
        "no": 7,
        "title": "Soal 6 — Menghitung Total dan Rata-rata",
        "plainTitle": "Soal 6 — Menghitung Total dan Rata-rata",
        "priority": "P1",
        "minutes": 8,
        "short": "Soal 6: Menghitung total",
        "tags": [
          "reduce",
          "sum",
          "total",
          "average",
          "mean",
          "accumulator"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Jumlahkan semua elemen (dan hitung rata-ratanya).",
            "io": "<b>Input:</b> <code>[1,2,3,4]</code> → <b>Total:</b> <code>10</code>, <b>Rata-rata:</b> <code>2.5</code>",
            "seed": "// Soal: Total & rata-rata\n\nfunction calculateTotal(numbers) {\n  // Tulis solusi Anda di sini\n}\n\nfunction average(numbers) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(calculateTotal([1,2,3,4]));  // 10\nconsole.log(average([1,2,3,4]));         // 2.5"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "function calculateTotal(numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\n\nfunction calculateTotalLoop(numbers) {\n  let total = 0;\n  for (const n of numbers) total += n;\n  return total;\n}\n\nfunction average(numbers) {\n  if (numbers.length === 0) return 0;   // hindari NaN\n  return calculateTotal(numbers) / numbers.length;\n}",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "<strong>Jebakan:</strong> <code>reduce</code> tanpa <strong>initial value</strong> akan error kalau array kosong dan bisa menghasilkan hasil tak terduga untuk string."
              }
            ]
          }
        ],
        "searchText": "Soal 6 — Menghitung Total dan Rata-rata Soal 6: Menghitung total reduce sum total average mean accumulator Jumlahkan semua elemen (dan hitung rata-ratanya). Input: [1,2,3,4] → Total: 10, Rata-rata: 2.5 // Soal: Total & rata-rata function calculateTotal(numbers) { // Tulis solusi Anda di sini } function average(numbers) { // Tulis solusi Anda di sini } console.log(calculateTotal([1,2,3,4])); // 10 console.log(average([1,2,3,4])); // 2.5 Lihat jawaban function calculateTotal(numbers) { return numbers.reduce((total, n) => total + n, 0); } function calculateTotalLoop(numbers) { let total = 0; for (const n of numbers) total += n; return total; } function average(numbers) { if (numbers.length === 0) return 0; // hindari NaN return calculateTotal(numbers) / numbers.length; } Jebakan: reduce tanpa initial value akan error kalau array kosong dan bisa menghasilkan hasil tak terduga untuk string."
      },
      {
        "id": "c61",
        "no": 8,
        "title": "Soal 7 — Menghitung Frekuensi",
        "plainTitle": "Soal 7 — Menghitung Frekuensi",
        "priority": "P1",
        "minutes": 10,
        "short": "Soal 7: Hitung frekuensi",
        "tags": [
          "frequency",
          "count",
          "group",
          "by",
          "reduce",
          "object",
          "map",
          "kata",
          "duplikat"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Hitung berapa kali tiap nilai muncul.",
            "io": "<b>Input:</b> <code>[\"apple\",\"banana\",\"apple\",\"orange\",\"banana\",\"apple\"]</code>",
            "seed": "// Soal: Frekuensi nilai dalam array\n// [\"apple\",\"banana\",\"apple\"] -> { apple: 2, banana: 1 }\n\nfunction countFrequency(items) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(countFrequency([\"apple\",\"banana\",\"apple\",\"orange\",\"banana\",\"apple\"]));"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "// Versi reduce\nfunction countFrequency(items) {\n  return items.reduce((acc, item) => {\n    acc[item] = (acc[item] || 0) + 1;\n    return acc;\n  }, {});\n}\n\n// Versi Map (lebih aman untuk key \"__proto__\" atau nilai non-string)\nfunction countFrequency(items) {\n  const map = new Map();\n  for (const item of items) map.set(item, (map.get(item) || 0) + 1);\n  return Object.fromEntries(map);\n}\n\n// Versi loop biasa\nfunction countFrequency(items) {\n  const hasil = {};\n  for (const item of items) {\n    hasil[item] = (hasil[item] || 0) + 1;\n  }\n  return hasil;\n}",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "<strong>Variasi yang sering muncul:</strong> \"cari nilai yang paling sering muncul\" → <code>Object.entries(freq).sort((a,b) =&gt; b[1]-a[1])[0][0]</code>."
              }
            ]
          }
        ],
        "searchText": "Soal 7 — Menghitung Frekuensi Soal 7: Hitung frekuensi frequency count group by reduce object map kata duplikat Hitung berapa kali tiap nilai muncul. Input: [\"apple\",\"banana\",\"apple\",\"orange\",\"banana\",\"apple\"] // Soal: Frekuensi nilai dalam array // [\"apple\",\"banana\",\"apple\"] -> { apple: 2, banana: 1 } function countFrequency(items) { // Tulis solusi Anda di sini } console.log(countFrequency([\"apple\",\"banana\",\"apple\",\"orange\",\"banana\",\"apple\"])); Lihat jawaban // Versi reduce function countFrequency(items) { return items.reduce((acc, item) => { acc[item] = (acc[item] || 0) + 1; return acc; }, {}); } // Versi Map (lebih aman untuk key \"__proto__\" atau nilai non-string) function countFrequency(items) { const map = new Map(); for (const item of items) map.set(item, (map.get(item) || 0) + 1); return Object.fromEntries(map); } // Versi loop biasa function countFrequency(items) { const hasil = {}; for (const item of items) { hasil[item] = (hasil[item] || 0) + 1; } return hasil; } Variasi yang sering muncul: \"cari nilai yang paling sering muncul\" → Object.entries(freq).sort((a,b) =&gt; b[1]-a[1])[0][0]."
      },
      {
        "id": "c62",
        "no": 9,
        "title": "Soal 8 — Hapus Duplikat",
        "plainTitle": "Soal 8 — Hapus Duplikat",
        "priority": "P1",
        "minutes": 8,
        "short": "Soal 8: Hapus duplikat",
        "tags": [
          "duplicates",
          "unique",
          "set",
          "remove",
          "dedupe",
          "array"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Hapus nilai duplikat, pertahankan urutan pertama kemunculan.",
            "io": "<b>Input:</b> <code>[1,2,2,3,1,4]</code> → <b>Output:</b> <code>[1,2,3,4]</code>",
            "seed": "// Soal: Hapus duplikat, pertahankan urutan\n// [1,2,2,3,1,4] -> [1,2,3,4]\n\nfunction removeDuplicates(arr) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(removeDuplicates([1,2,2,3,1,4]));   // [1,2,3,4]"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "// Cara tercepat\nfunction removeDuplicates(arr) {\n  return [...new Set(arr)];\n}\n\n// Versi filter (pertahankan urutan, jalan di browser lama)\nfunction removeDuplicates(arr) {\n  return arr.filter((item, i) => arr.indexOf(item) === i);\n}\n\n// Versi reduce dengan object (cepat, tapi hati-hati key \"__proto__\")\nfunction removeDuplicates(arr) {\n  return arr.reduce((acc, item) => {\n    acc[item] = true;\n    return acc;\n  }, Object.create(null));\n}",
                "lang": "js"
              }
            ]
          }
        ],
        "searchText": "Soal 8 — Hapus Duplikat Soal 8: Hapus duplikat duplicates unique set remove dedupe array Hapus nilai duplikat, pertahankan urutan pertama kemunculan. Input: [1,2,2,3,1,4] → Output: [1,2,3,4] // Soal: Hapus duplikat, pertahankan urutan // [1,2,2,3,1,4] -> [1,2,3,4] function removeDuplicates(arr) { // Tulis solusi Anda di sini } console.log(removeDuplicates([1,2,2,3,1,4])); // [1,2,3,4] Lihat jawaban // Cara tercepat function removeDuplicates(arr) { return [...new Set(arr)]; } // Versi filter (pertahankan urutan, jalan di browser lama) function removeDuplicates(arr) { return arr.filter((item, i) => arr.indexOf(item) === i); } // Versi reduce dengan object (cepat, tapi hati-hati key \"__proto__\") function removeDuplicates(arr) { return arr.reduce((acc, item) => { acc[item] = true; return acc; }, Object.create(null)); }"
      },
      {
        "id": "c63",
        "no": 10,
        "title": "Soal 9 — Flatten Array Bersarang",
        "plainTitle": "Soal 9 — Flatten Array Bersarang",
        "priority": "P1",
        "minutes": 10,
        "short": "Soal 9: Flatten array",
        "tags": [
          "flatten",
          "flat",
          "flatmap",
          "nested",
          "array",
          "multidimensional",
          "reduce",
          "concat"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Ratakan array bertingkat menjadi satu array datar.",
            "io": "<b>Input:</b> <code>[1,[2,[3,[4,[5]]]]]</code> → <b>Output:</b> <code>[1,2,3,4,5]</code>",
            "seed": "// Soal: Flatten array (tak terbatas kedalaman)\n// [1,[2,[3,[4]]]] -> [1,2,3,4]\n\nfunction flatten(arr) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(flatten([1,[2,[3,[4,[5]]]]]));   // [1,2,3,4,5]"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "// Cara modern (satu tingkat)\n[1, [2, [3]]].flat(Infinity);          // [1, 2, 3]\n\n// Cara manual dengan reduce\nfunction flatten(arr) {\n  return arr.reduce((acc, item) =>\n    Array.isArray(item) ? acc.concat(flatten(item)) : acc.concat(item), []);\n}\n\n// Cara manual dengan loop\nfunction flatten(arr) {\n  const hasil = [];\n  for (const item of arr) {\n    if (Array.isArray(item)) hasil.push(...flatten(item));\n    else hasil.push(item);\n  }\n  return hasil;\n}",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "<strong>Variasi:</strong> flatten dengan kedalaman tertentu — <code>flat(1)</code> untuk satu level, <code>flat(Infinity)</code> untuk semua level."
              }
            ]
          }
        ],
        "searchText": "Soal 9 — Flatten Array Bersarang Soal 9: Flatten array flatten flat flatmap nested array multidimensional reduce concat Ratakan array bertingkat menjadi satu array datar. Input: [1,[2,[3,[4,[5]]]]] → Output: [1,2,3,4,5] // Soal: Flatten array (tak terbatas kedalaman) // [1,[2,[3,[4]]]] -> [1,2,3,4] function flatten(arr) { // Tulis solusi Anda di sini } console.log(flatten([1,[2,[3,[4,[5]]]]])); // [1,2,3,4,5] Lihat jawaban // Cara modern (satu tingkat) [1, [2, [3]]].flat(Infinity); // [1, 2, 3] // Cara manual dengan reduce function flatten(arr) { return arr.reduce((acc, item) => Array.isArray(item) ? acc.concat(flatten(item)) : acc.concat(item), []); } // Cara manual dengan loop function flatten(arr) { const hasil = []; for (const item of arr) { if (Array.isArray(item)) hasil.push(...flatten(item)); else hasil.push(item); } return hasil; } Variasi: flatten dengan kedalaman tertentu — flat(1) untuk satu level, flat(Infinity) untuk semua level."
      },
      {
        "id": "c64",
        "no": 11,
        "title": "Soal 10 — Pecah Array Jadi Potongan",
        "plainTitle": "Soal 10 — Pecah Array Jadi Potongan",
        "priority": "P1",
        "minutes": 10,
        "short": "Soal 10: Chunk array",
        "tags": [
          "chunk",
          "split",
          "group",
          "array",
          "size",
          "loop",
          "slice",
          "interview"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Pecah array menjadi array-array kecil berukuran <code>size</code>.",
            "io": "<b>Input:</b> <code>[1,2,3,4,5], size=2</code> → <b>Output:</b> <code>[[1,2],[3,4],[5]]</code>",
            "seed": "// Soal: Chunk array\n// [1,2,3,4,5] size 2 -> [[1,2],[3,4],[5]]\n\nfunction chunk(arr, size) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(chunk([1,2,3,4,5], 2));   // [[1,2],[3,4],[5]]"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "function chunk(arr, size) {\n  const hasil = [];\n  for (let i = 0; i < arr.length; i += size) {\n    hasil.push(arr.slice(i, i + size));\n  }\n  return hasil;\n}\n\n// Versi modern\nfunction chunk(arr, size) {\n  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>\n    arr.slice(i * size, i * size + size)\n  );\n}",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "<strong>Ingat:</strong> <code>slice</code> aman dipanggil di indeks lebih besar dari panjang array."
              }
            ]
          }
        ],
        "searchText": "Soal 10 — Pecah Array Jadi Potongan Soal 10: Chunk array chunk split group array size loop slice interview Pecah array menjadi array-array kecil berukuran size. Input: [1,2,3,4,5], size=2 → Output: [[1,2],[3,4],[5]] // Soal: Chunk array // [1,2,3,4,5] size 2 -> [[1,2],[3,4],[5]] function chunk(arr, size) { // Tulis solusi Anda di sini } console.log(chunk([1,2,3,4,5], 2)); // [[1,2],[3,4],[5]] Lihat jawaban function chunk(arr, size) { const hasil = []; for (let i = 0; i < arr.length; i += size) { hasil.push(arr.slice(i, i + size)); } return hasil; } // Versi modern function chunk(arr, size) { return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) => arr.slice(i * size, i * size + size) ); } Ingat: slice aman dipanggil di indeks lebih besar dari panjang array."
      },
      {
        "id": "c65",
        "no": 12,
        "title": "Soal 11 — Two Sum (Klasik)",
        "plainTitle": "Soal 11 — Two Sum (Klasik)",
        "priority": "P1",
        "minutes": 12,
        "short": "Soal 11: Two Sum",
        "tags": [
          "two",
          "sum",
          "pair",
          "hashmap",
          "object",
          "map",
          "target",
          "interview",
          "classic"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Cari dua angka yang jumlahnya <code>target</code>, kembalikan indeks keduanya.",
            "io": "<b>Input:</b> <code>nums=[2,7,11,15], target=9</code> → <b>Output:</b> <code>[0,1]</code>",
            "seed": "// Soal: Two Sum\n// Cari indeks dua angka yang jumlahnya = target\n// nums [2,7,11,15] target 9 -> [0,1]\n\nfunction twoSum(nums, target) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(twoSum([2,7,11,15], 9));   // [0,1]\nconsole.log(twoSum([3,2,4], 6));       // [1,2]"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "// O(n) dengan object sebagai hashmap: simpan nilai yang sudah dilewati\nfunction twoSum(nums, target) {\n  const seen = {};\n  for (let i = 0; i < nums.length; i++) {\n    const cari = target - nums[i];\n    if (seen[cari] !== undefined) return [seen[cari], i];\n    seen[nums[i]] = i;\n  }\n  return [];\n}\n\n// O(n²) — cara paling naive, tapi sering jadi baseline saat interview\nfunction twoSum(nums, target) {\n  for (let i = 0; i < nums.length; i++) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] + nums[j] === target) return [i, j];\n    }\n  }\n  return [];\n}",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "<strong>Penting:</strong> <code>if (seen[cari] !== undefined)</code> — jangan pakai <code>if (seen[cari])</code> karena nilai bisa bernilai 0 (index 0 = falsy-ish di sini). Ini detail yang sering menjatuhkan kandidat."
              }
            ]
          }
        ],
        "searchText": "Soal 11 — Two Sum (Klasik) Soal 11: Two Sum two sum pair hashmap object map target interview classic Cari dua angka yang jumlahnya target, kembalikan indeks keduanya. Input: nums=[2,7,11,15], target=9 → Output: [0,1] // Soal: Two Sum // Cari indeks dua angka yang jumlahnya = target // nums [2,7,11,15] target 9 -> [0,1] function twoSum(nums, target) { // Tulis solusi Anda di sini } console.log(twoSum([2,7,11,15], 9)); // [0,1] console.log(twoSum([3,2,4], 6)); // [1,2] Lihat jawaban // O(n) dengan object sebagai hashmap: simpan nilai yang sudah dilewati function twoSum(nums, target) { const seen = {}; for (let i = 0; i < nums.length; i++) { const cari = target - nums[i]; if (seen[cari] !== undefined) return [seen[cari], i]; seen[nums[i]] = i; } return []; } // O(n²) — cara paling naive, tapi sering jadi baseline saat interview function twoSum(nums, target) { for (let i = 0; i < nums.length; i++) { for (let j = i + 1; j < nums.length; j++) { if (nums[i] + nums[j] === target) return [i, j]; } } return []; } Penting: if (seen[cari]!== undefined) — jangan pakai if (seen[cari]) karena nilai bisa bernilai 0 (index 0 = falsy-ish di sini). Ini detail yang sering menjatuhkan kandidat."
      },
      {
        "id": "c66",
        "no": 13,
        "title": "Soal 12 — Ubah Jadi Title Case",
        "plainTitle": "Soal 12 — Ubah Jadi Title Case",
        "priority": "P1",
        "minutes": 8,
        "short": "Soal 12: Title case",
        "tags": [
          "string",
          "capitalize",
          "split",
          "map",
          "join",
          "upper",
          "case",
          "title",
          "case"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Huruf pertama tiap kata jadi kapital, sisanya lowercase.",
            "io": "<b>Input:</b> <code>\"hallo dunia\"</code> → <b>Output:</b> <code>\"Hallo Dunia\"</code>",
            "seed": "// Soal: Title case\n// \"hallo dunia\" -> \"Hallo Dunia\"\n\nfunction toTitleCase(str) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(toTitleCase(\"hallo dunia JAWA\"));"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "function toTitleCase(str) {\n  return str\n    .split(\" \")\n    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())\n    .join(\" \");\n}\n\n// Versi regex\nfunction toTitleCase(str) {\n  return str.replace(/\\w\\S*/g, (t) =>\n    t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()\n  );\n}",
                "lang": "js"
              }
            ]
          }
        ],
        "searchText": "Soal 12 — Ubah Jadi Title Case Soal 12: Title case string capitalize split map join upper case title case Huruf pertama tiap kata jadi kapital, sisanya lowercase. Input: \"hallo dunia\" → Output: \"Hallo Dunia\" // Soal: Title case // \"hallo dunia\" -> \"Hallo Dunia\" function toTitleCase(str) { // Tulis solusi Anda di sini } console.log(toTitleCase(\"hallo dunia JAWA\")); Lihat jawaban function toTitleCase(str) { return str .split(\" \") .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) .join(\" \"); } // Versi regex function toTitleCase(str) { return str.replace(/\\w\\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase() ); }"
      },
      {
        "id": "c67",
        "no": 14,
        "title": "Soal 13 — Deep Clone Object",
        "plainTitle": "Soal 13 — Deep Clone Object",
        "priority": "P1",
        "minutes": 12,
        "short": "Soal 13: Deep clone",
        "tags": [
          "deep",
          "clone",
          "copy",
          "object",
          "nested",
          "array",
          "reference",
          "structuredclone",
          "recursion",
          "json"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Salin object beserta seluruh object di dalamnya (bukan cuma reference).",
            "io": "<b>Contoh:</b> <code>{ a: { b: 1 } }</code> → ubah <code>copy.a.b</code> tidak boleh mengubah aslinya",
            "seed": "// Soal: Deep clone\n// Pastikan mengubah copy TIDAK mengubah original\n\nfunction deepClone(obj) {\n  // Tulis solusi Anda di sini\n}\n\nconst asli = { a: { b: 1 }, list: [1, 2] };\nconst salinan = deepClone(asli);\nsalinan.a.b = 99;\nconsole.log(asli.a.b);   // harus tetap 1"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "// Cara tercepat (Node 17+ / browser modern)\nfunction deepClone(obj) {\n  return structuredClone(obj);\n}\n\n// Cara manual dengan rekursi\nfunction deepClone(obj) {\n  if (obj === null || typeof obj !== \"object\") return obj;\n  if (Array.isArray(obj)) return obj.map(deepClone);\n  const hasil = {};\n  for (const key in obj) {\n    if (Object.hasOwn(obj, key)) hasil[key] = deepClone(obj[key]);\n  }\n  return hasil;\n}\n\n// Cara cepat tapi ada kekurangan\nconst salinan = JSON.parse(JSON.stringify(asli));",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "<strong>Ingat:</strong> Spread <code>{...obj}</code> hanya <strong>shallow copy</strong>. Untuk object bersarang, setiap level butuh copy sendiri."
              }
            ]
          }
        ],
        "searchText": "Soal 13 — Deep Clone Object Soal 13: Deep clone deep clone copy object nested array reference structuredclone recursion json Salin object beserta seluruh object di dalamnya (bukan cuma reference). Contoh: {a: {b: 1}} → ubah copy.a.b tidak boleh mengubah aslinya // Soal: Deep clone // Pastikan mengubah copy TIDAK mengubah original function deepClone(obj) { // Tulis solusi Anda di sini } const asli = { a: { b: 1 }, list: [1, 2] }; const salinan = deepClone(asli); salinan.a.b = 99; console.log(asli.a.b); // harus tetap 1 Lihat jawaban // Cara tercepat (Node 17+ / browser modern) function deepClone(obj) { return structuredClone(obj); } // Cara manual dengan rekursi function deepClone(obj) { if (obj === null || typeof obj !== \"object\") return obj; if (Array.isArray(obj)) return obj.map(deepClone); const hasil = {}; for (const key in obj) { if (Object.hasOwn(obj, key)) hasil[key] = deepClone(obj[key]); } return hasil; } // Cara cepat tapi ada kekurangan const salinan = JSON.parse(JSON.stringify(asli)); Ingat: Spread {...obj} hanya shallow copy. Untuk object bersarang, setiap level butuh copy sendiri."
      },
      {
        "id": "c68",
        "no": 15,
        "title": "Soal 14 — Irisan dan Gabungan Dua Array",
        "plainTitle": "Soal 14 — Irisan dan Gabungan Dua Array",
        "priority": "P1",
        "minutes": 10,
        "short": "Soal 14: Irisan & gabungan array",
        "tags": [
          "intersection",
          "union",
          "set",
          "array",
          "compare",
          "includes",
          "filter",
          "two",
          "array"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Temukan nilai yang ada di kedua array (irisan), dan nilai yang ada di salah satu saja (gabungan).",
            "io": "<b>Input:</b> <code>a=[1,2,3], b=[2,3,4]</code> → <b>Irisan:</b> <code>[2,3]</code>, <b>Gabungan unik:</b> <code>[1,2,3,4]</code>",
            "seed": "// Soal: Irisan & gabungan\n// a=[1,2,3] b=[2,3,4] -> irisan [2,3], gabungan [1,2,3,4]\n\nfunction intersection(a, b) {\n  // Tulis solusi Anda di sini\n}\n\nfunction union(a, b) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(intersection([1,2,3],[2,3,4]));   // [2,3]\nconsole.log(union([1,2,3],[2,3,4]));         // [1,2,3,4]"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "function intersection(a, b) {\n  const setB = new Set(b);\n  return a.filter(x => setB.has(x));\n}\n\nfunction union(a, b) {\n  return [...new Set([...a, ...b])];\n}\n\n// Tanpa Set\nfunction intersection(a, b) {\n  return a.filter(x => b.includes(x));\n}\nfunction union(a, b) {\n  return [...a, ...b.filter(x => !a.includes(x))];\n}",
                "lang": "js"
              }
            ]
          }
        ],
        "searchText": "Soal 14 — Irisan dan Gabungan Dua Array Soal 14: Irisan & gabungan array intersection union set array compare includes filter two array Temukan nilai yang ada di kedua array (irisan), dan nilai yang ada di salah satu saja (gabungan). Input: a=[1,2,3], b=[2,3,4] → Irisan: [2,3], Gabungan unik: [1,2,3,4] // Soal: Irisan & gabungan // a=[1,2,3] b=[2,3,4] -> irisan [2,3], gabungan [1,2,3,4] function intersection(a, b) { // Tulis solusi Anda di sini } function union(a, b) { // Tulis solusi Anda di sini } console.log(intersection([1,2,3],[2,3,4])); // [2,3] console.log(union([1,2,3],[2,3,4])); // [1,2,3,4] Lihat jawaban function intersection(a, b) { const setB = new Set(b); return a.filter(x => setB.has(x)); } function union(a, b) { return [...new Set([...a, ...b])]; } // Tanpa Set function intersection(a, b) { return a.filter(x => b.includes(x)); } function union(a, b) { return [...a, ...b.filter(x => !a.includes(x))]; }"
      },
      {
        "id": "c69",
        "no": 16,
        "title": "Soal 15 — Counter dengan Closure",
        "plainTitle": "Soal 15 — Counter dengan Closure",
        "priority": "P1",
        "minutes": 10,
        "short": "Soal 15: Closure counter",
        "tags": [
          "closure",
          "counter",
          "increment",
          "private",
          "state",
          "iife",
          "counter",
          "classic",
          "interview"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Buat fungsi <code>createCounter()</code> yang mengembalikan object/function penghitung dengan state privat.",
            "io": "<b>Contoh:</b> <code>const c = createCounter(); c.inc(); c.inc(); c.get();</code> → <code>2</code>",
            "seed": "// Soal: Counter dengan closure\n// Setiap createCounter() harus punya state TERPISAH\n\nfunction createCounter() {\n  // Tulis solusi Anda di sini\n  // kembalikan object { inc, dec, get }\n}\n\nconst c1 = createCounter();\nc1.inc(); c1.inc();\nconsole.log(c1.get());   // 2\n\nconst c2 = createCounter();\nc2.inc();\nconsole.log(c2.get());   // 1\nconsole.log(c1.get());   // 2 (tidak terpengaruh)"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "function createCounter() {\n  let count = 0;                       // variabel privat di closure\n  return {\n    inc() { count++; return this; },\n    dec() { count--; return this; },\n    get() { return count; }\n  };\n}\n\n// Versi mengembalikan function\nfunction buatCounter() {\n  let count = 0;\n  return function () { count++; return count; };\n}",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "Bedanya dengan modul: state <code>count</code> tidak bisa diakses dari luar, hanya lewat method yang disediakan — itu inti <strong>encapsulation</strong> lewat closure."
              }
            ]
          }
        ],
        "searchText": "Soal 15 — Counter dengan Closure Soal 15: Closure counter closure counter increment private state iife counter classic interview Buat fungsi createCounter() yang mengembalikan object/function penghitung dengan state privat. Contoh: const c = createCounter(); c.inc(); c.inc(); c.get(); → 2 // Soal: Counter dengan closure // Setiap createCounter() harus punya state TERPISAH function createCounter() { // Tulis solusi Anda di sini // kembalikan object { inc, dec, get } } const c1 = createCounter(); c1.inc(); c1.inc(); console.log(c1.get()); // 2 const c2 = createCounter(); c2.inc(); console.log(c2.get()); // 1 console.log(c1.get()); // 2 (tidak terpengaruh) Lihat jawaban function createCounter() { let count = 0; // variabel privat di closure return { inc() { count++; return this; }, dec() { count--; return this; }, get() { return count; } }; } // Versi mengembalikan function function buatCounter() { let count = 0; return function () { count++; return count; }; } Bedanya dengan modul: state count tidak bisa diakses dari luar, hanya lewat method yang disediakan — itu inti encapsulation lewat closure."
      },
      {
        "id": "c70",
        "no": 17,
        "title": "Soal 16 — Grouping dan Sorting Data",
        "plainTitle": "Soal 16 — Grouping dan Sorting Data",
        "priority": "P2",
        "minutes": 10,
        "short": "Soal 16: Grouping & sorting objek",
        "tags": [
          "group",
          "by",
          "sort",
          "object",
          "reduce",
          "sortby",
          "property",
          "map",
          "ranking"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "problem",
            "task": "Kelompokkan transaksi berdasarkan kategori, lalu urutkan produk berdasarkan harga (descending).",
            "io": "",
            "seed": "// Soal: Grouping & sorting\n// Kelompokkan berdasarkan kategori, urutkan produk by harga desc\n\nconst transaksi = [\n  { nama: \"Kopi\", kategori: \"minuman\", harga: 15000 },\n  { nama: \"Teh\",  kategori: \"minuman\", harga: 8000 },\n  { nama: \"Roti\",  kategori: \"makanan\", harga: 20000 }\n];\n\nfunction groupBy(items, key) {\n  // Tulis solusi Anda di sini\n}\n\nfunction urutByHarga(products) {\n  // Tulis solusi Anda di sini\n}\n\nconsole.log(groupBy(transaksi, \"kategori\"));\nconsole.log(urutByHarga(transaksi).map(p => p.nama));"
          },
          {
            "type": "reveal",
            "summary": "Lihat jawaban",
            "body": [
              {
                "type": "code",
                "code": "function groupBy(items, key) {\n  return items.reduce((acc, item) => {\n    const nilai = item[key];\n    (acc[nilai] ||= []).push(item);\n    return acc;\n  }, {});\n}\n\nfunction urutByHarga(products) {\n  return [...products].sort((a, b) => b.harga - a.harga);\n}",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "<strong>Ingat:</strong> pakai <code>[...array]</code> sebelum <code>sort</code> supaya array asli tidak ikut berubah."
              }
            ]
          }
        ],
        "searchText": "Soal 16 — Grouping dan Sorting Data Soal 16: Grouping & sorting objek group by sort object reduce sortby property map ranking Kelompokkan transaksi berdasarkan kategori, lalu urutkan produk berdasarkan harga (descending). // Soal: Grouping & sorting // Kelompokkan berdasarkan kategori, urutkan produk by harga desc const transaksi = [ { nama: \"Kopi\", kategori: \"minuman\", harga: 15000 }, { nama: \"Teh\", kategori: \"minuman\", harga: 8000 }, { nama: \"Roti\", kategori: \"makanan\", harga: 20000 } ]; function groupBy(items, key) { // Tulis solusi Anda di sini } function urutByHarga(products) { // Tulis solusi Anda di sini } console.log(groupBy(transaksi, \"kategori\")); console.log(urutByHarga(transaksi).map(p => p.nama)); Lihat jawaban function groupBy(items, key) { return items.reduce((acc, item) => { const nilai = item[key]; (acc[nilai] ||= []).push(item); return acc; }, {}); } function urutByHarga(products) { return [...products].sort((a, b) => b.harga - a.harga); } Ingat: pakai [...array] sebelum sort supaya array asli tidak ikut berubah."
      }
    ]
  },
  {
    "id": "m11",
    "track": "js",
    "no": "11",
    "title": "Interview: Pertanyaan &amp; Jawaban",
    "plainTitle": "11 Interview: Pertanyaan & Jawaban",
    "desc": "Format \"disebutkan, lalu jelaskan sekilas\". Coba rekam suara lalu putar ulang untuk latihan komunikasi.",
    "priorityNote": "Wajib latihan",
    "minutes": 100,
    "chapters": [
      {
        "id": "c71",
        "no": 1,
        "title": "Q1. Bedakan <code>let</code>, <code>const</code>, dan <code>var</code>?",
        "plainTitle": "Q1. Bedakan let, const, dan var?",
        "priority": "P1",
        "minutes": 5,
        "short": "Q: let/const/var?",
        "tags": [
          "var",
          "let",
          "const",
          "scope",
          "hoisting",
          "reassign",
          "re-declare"
        ],
        "notePlaceholder": "Ucapkan: var function scoped + hoist, let/const block scoped, const tidak reassign...",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<code>var</code> memiliki <strong>function scope</strong>, hoisting penuh, bisa di-declare ulang dan di-reassign. <code>let</code> memiliki <strong>block scope</strong>, tidak bisa di-declare ulang di scope yang sama, bisa di-reassign. <code>const</code> block scope, tidak bisa di-reassign sama sekali."
              },
              {
                "type": "p",
                "html": "Aturan: gunakan <code>const</code> secara default, <code>let</code> jika memang perlu berubah, dan <strong>hindari <code>var</code></strong> kecuali kompatibilitas lama."
              },
              {
                "type": "ul",
                "items": [
                  "<code>typeof null</code> → <code>\"object\"</code> (bug historis)."
                ]
              }
            ]
          }
        ],
        "searchText": "Q1. Bedakan let, const, dan var? Q: let/const/var? var let const scope hoisting reassign re-declare Jawaban ringkas var memiliki function scope, hoisting penuh, bisa di-declare ulang dan di-reassign. let memiliki block scope, tidak bisa di-declare ulang di scope yang sama, bisa di-reassign. const block scope, tidak bisa di-reassign sama sekali. Aturan: gunakan const secara default, let jika memang perlu berubah, dan hindari var kecuali kompatibilitas lama. typeof null → \"object\" (bug historis)."
      },
      {
        "id": "c72",
        "no": 2,
        "title": "Q2. <code>==</code> vs <code>===</code>, kapan pakai?",
        "plainTitle": "Q2. == vs ===, kapan pakai?",
        "priority": "P1",
        "minutes": 5,
        "short": "Q: == vs ===",
        "tags": [
          "equality",
          "loose",
          "strict",
          "coercion",
          "object.is"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<code>==</code> (<em>loose</em>) melakukan <strong>type coercion</strong> sebelum membandingkan; <code>===</code> (<em>strict</em>) membandingkan <strong>value <em>dan</em> type</strong>."
              },
              {
                "type": "ul",
                "items": [
                  "<code>5 == \"5\"</code> → <code>true</code> · <code>5 === \"5\"</code> → <code>false</code>",
                  "<code>0 == false</code> → <code>true</code> · <code>0 === false</code> → <code>false</code>",
                  "<code>null == undefined</code> → <code>true</code> · <code>null === undefined</code> → <code>false</code>"
                ]
              },
              {
                "type": "p",
                "html": "Saya pakai <code>===</code> secara default karena lebih predictable dan mencegah coercion tak terduga. Gunakan <code>==</code> hanya saat sengaja mau membandingkan <code>null/undefined</code>, atau pakai <code>Object.is()</code> untuk <code>NaN</code>/sign 0."
              }
            ]
          }
        ],
        "searchText": "Q2. == vs ===, kapan pakai? Q: == vs === equality loose strict coercion object.is Jawaban ringkas == (loose) melakukan type coercion sebelum membandingkan; === (strict) membandingkan value dan type. 5 == \"5\" → true · 5 === \"5\" → false 0 == false → true · 0 === false → false null == undefined → true · null === undefined → false Saya pakai === secara default karena lebih predictable dan mencegah coercion tak terduga. Gunakan == hanya saat sengaja mau membandingkan null/undefined, atau pakai Object.is() untuk NaN /sign 0."
      },
      {
        "id": "c73",
        "no": 3,
        "title": "Q3. Apa itu hoisting dan TDZ?",
        "plainTitle": "Q3. Apa itu hoisting dan TDZ?",
        "priority": "P1",
        "minutes": 5,
        "short": "Q: Hoisting & TDZ",
        "tags": [
          "hoisting",
          "tdz",
          "temporal",
          "dead",
          "zone",
          "var",
          "let",
          "const",
          "function"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "Hoisting = proses JavaScript memindahkan <strong>deklarasi</strong> ke atas scope sebelum kode dieksekusi."
              },
              {
                "type": "ul",
                "items": [
                  "<code>var x</code> dan function declaration → naik, namun hanya <strong>nilainya</strong> (bukan seluruh statement), assignment tetap di bawah. <code>console.log(x)</code> sebelum <code>var x = 10</code> → <code>undefined</code>.",
                  "Function declaration → naik <strong>utuh</strong>, bisa dipanggil sebelum dideklarasikan.",
                  "<code>let</code>/<code>const</code>/<code>class</code> → ada di atas namun masuk <strong>Temporal Dead Zone (TDZ)</strong>; diakses sebelum deklarasi → <code>ReferenceError</code>."
                ]
              }
            ]
          }
        ],
        "searchText": "Q3. Apa itu hoisting dan TDZ? Q: Hoisting & TDZ hoisting tdz temporal dead zone var let const function Jawaban ringkas Hoisting = proses JavaScript memindahkan deklarasi ke atas scope sebelum kode dieksekusi. var x dan function declaration → naik, namun hanya nilainya (bukan seluruh statement), assignment tetap di bawah. console.log(x) sebelum var x = 10 → undefined. Function declaration → naik utuh, bisa dipanggil sebelum dideklarasikan. let / const / class → ada di atas namun masuk Temporal Dead Zone (TDZ); diakses sebelum deklarasi → ReferenceError."
      },
      {
        "id": "c74",
        "no": 4,
        "title": "Q4. Scope vs Closure — penjelasan singkat?",
        "plainTitle": "Q4. Scope vs Closure — penjelasan singkat?",
        "priority": "P1",
        "minutes": 6,
        "short": "Q: Scope vs Closure",
        "tags": [
          "scope",
          "closure",
          "lexical",
          "environment",
          "nested"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<strong>Scope</strong> = area penglihatan (visibility) variabel — mana variabel yang bisa diakses dari lokasi kode."
              },
              {
                "type": "p",
                "html": "<strong>Closure</strong> = function yang masih bisa <em>ingat</em> variabel dari outer scope meskipun outer function sudah selesai. Artinya function \"membawa\" environment leksikalnya."
              },
              {
                "type": "code",
                "code": "function buat(n) { return x => x + n; }\nconst tambah3 = buat(3);   // n=3 \"terjebak\" di closure\ntambah3(5);                // 8",
                "lang": "js"
              },
              {
                "type": "ul",
                "items": [
                  "Dipakai untuk: encapsulation, factory, memoization, React hooks, dan counter."
                ]
              }
            ]
          }
        ],
        "searchText": "Q4. Scope vs Closure — penjelasan singkat? Q: Scope vs Closure scope closure lexical environment nested Jawaban ringkas Scope = area penglihatan (visibility) variabel — mana variabel yang bisa diakses dari lokasi kode. Closure = function yang masih bisa ingat variabel dari outer scope meskipun outer function sudah selesai. Artinya function \"membawa\" environment leksikalnya. function buat(n) { return x => x + n; } const tambah3 = buat(3); // n=3 \"terjebak\" di closure tambah3(5); // 8 Dipakai untuk: encapsulation, factory, memoization, React hooks, dan counter."
      },
      {
        "id": "c75",
        "no": 5,
        "title": "Q5. Apa itu <code>this</code> dan aturannya?",
        "plainTitle": "Q5. Apa itu this dan aturannya?",
        "priority": "P1",
        "minutes": 6,
        "short": "Q: this",
        "tags": [
          "this",
          "binding",
          "4",
          "rule",
          "strict",
          "mode",
          "window"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<code>this</code> merujuk ke <strong>objek yang menjadi konteks eksekusi</strong>, yang ditentukan oleh cara fungsi dipanggil, bukan di mana ditulis."
              },
              {
                "type": "ul",
                "items": [
                  "<strong>Default binding</strong>: dipanggil sendiri, <code>this</code> = <code>undefined</code> (strict mode) atau global.",
                  "<strong>Implicit binding</strong>: <code>obj.metode()</code>, <code>this</code> = <code>obj</code>.",
                  "<strong>Explicit binding</strong>: <code>call</code>/<code>apply</code>/<code>bind</code> menentukan <code>this</code> secara manual.",
                  "<strong><code>new</code> binding</strong>: <code>new</code> membuat objek, <code>this</code> = objek baru."
                ]
              }
            ]
          }
        ],
        "searchText": "Q5. Apa itu this dan aturannya? Q: this this binding 4 rule strict mode window Jawaban ringkas this merujuk ke objek yang menjadi konteks eksekusi, yang ditentukan oleh cara fungsi dipanggil, bukan di mana ditulis. Default binding: dipanggil sendiri, this = undefined (strict mode) atau global. Implicit binding: obj.metode(), this = obj. Explicit binding: call / apply / bind menentukan this secara manual. new binding: new membuat objek, this = objek baru."
      },
      {
        "id": "c76",
        "no": 6,
        "title": "Q6. <code>map()</code> vs <code>forEach()</code>?",
        "plainTitle": "Q6. map() vs forEach()?",
        "priority": "P1",
        "minutes": 5,
        "short": "Q: map vs forEach",
        "tags": [
          "map",
          "foreach",
          "transform",
          "iterate",
          "return",
          "new",
          "array",
          "side",
          "effect"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<code>map()</code> mengembalikan <strong>array baru</strong> yang berisi hasil transformasi tiap elemen — berguna banget bila ingin membuat array lain dari array sekarang."
              },
              {
                "type": "p",
                "html": "<code>forEach()</code> tidak mengembalikan apa-apa (<code>undefined</code>) — pakai saat mau melakukan <em>aksi</em> untuk tiap elemen (misalnya render, console.log, push ke luar)."
              },
              {
                "type": "code",
                "code": "const angka = [1,2,3];\nangka.map(n => n * 2);        // [2,4,6]\nangka.forEach(n => console.log(n));  // log tiapnya, return undefined\n// forEach juga punya index dan array penuh, mirip map.",
                "lang": "js"
              }
            ]
          }
        ],
        "searchText": "Q6. map() vs forEach()? Q: map vs forEach map foreach transform iterate return new array side effect Jawaban ringkas map() mengembalikan array baru yang berisi hasil transformasi tiap elemen — berguna banget bila ingin membuat array lain dari array sekarang. forEach() tidak mengembalikan apa-apa (undefined) — pakai saat mau melakukan aksi untuk tiap elemen (misalnya render, console.log, push ke luar). const angka = [1,2,3]; angka.map(n => n * 2); // [2,4,6] angka.forEach(n => console.log(n)); // log tiapnya, return undefined // forEach juga punya index dan array penuh, mirip map."
      },
      {
        "id": "c77",
        "no": 7,
        "title": "Q7. <code>filter()</code> vs <code>find()</code>?",
        "plainTitle": "Q7. filter() vs find()?",
        "priority": "P1",
        "minutes": 5,
        "short": "Q: filter vs find",
        "tags": [
          "filter",
          "find",
          "return",
          "array",
          "single",
          "element"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<code>filter()</code> mengembalikan <strong>array</strong> dengan <em>semua elemen</em> yang memenuhi kondisi — berguna saat kamu tahu ada banyak dan semua perlu ditampilkan."
              },
              {
                "type": "p",
                "html": "<code>find()</code> mengembalikan <strong>elemen pertama</strong> yang cocok → praktis kalau kamu hanya butuh satu, seperti mencari user by ID."
              },
              {
                "type": "code",
                "code": "const users = [{id:1,nama:\"A\"},{id:2,nama:\"B\"},{id:3,nama:\"A\"}];\nusers.filter(u => u.nama === \"A\");  // [{id:1,...},{id:3,...}]\nusers.find(u => u.nama === \"A\");     // {id:1,...}\nusers.findIndex(u => u.id === 2);    // 1",
                "lang": "js"
              }
            ]
          }
        ],
        "searchText": "Q7. filter() vs find()? Q: filter vs find filter find return array single element Jawaban ringkas filter() mengembalikan array dengan semua elemen yang memenuhi kondisi — berguna saat kamu tahu ada banyak dan semua perlu ditampilkan. find() mengembalikan elemen pertama yang cocok → praktis kalau kamu hanya butuh satu, seperti mencari user by ID. const users = [{id:1,nama:\"A\"},{id:2,nama:\"B\"},{id:3,nama:\"A\"}]; users.filter(u => u.nama === \"A\"); // [{id:1,...},{id:3,...}] users.find(u => u.nama === \"A\"); // {id:1,...} users.findIndex(u => u.id === 2); // 1"
      },
      {
        "id": "c78",
        "no": 8,
        "title": "Q8. Cara kerja <code>reduce()</code> — penjelasan singkat?",
        "plainTitle": "Q8. Cara kerja reduce() — penjelasan singkat?",
        "priority": "P1",
        "minutes": 5,
        "short": "Q: reduce",
        "tags": [
          "reduce",
          "accumulator",
          "initialValue"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<code>reduce</code> mengubah seluruh elemen array menjadi <strong>satu nilai</strong> (jumlah, string, object, bahkan array baru)."
              },
              {
                "type": "code",
                "code": "const total = [1, 2, 3].reduce((acc, n) => {\n  return acc + n;        // akumulasi tiap elemen\n}, 0);                  // nilai awal accumulator = 0\n// total => 6",
                "lang": "js"
              },
              {
                "type": "ul",
                "items": [
                  "<strong>accumulator</strong> = nilai yang dikembalikan tiap iterasi.",
                  "<strong>initial value</strong> → sangat penting: kalau array kosong, <code>reduce</code> tanpa initial value akan menyebabkan TypeError.",
                  "Bisa dipakai untuk hitung frekuensi, flatten, group, atau bahkan replace <code>map</code> / <code>filter</code>."
                ]
              }
            ]
          }
        ],
        "searchText": "Q8. Cara kerja reduce() — penjelasan singkat? Q: reduce reduce accumulator initialValue Jawaban ringkas reduce mengubah seluruh elemen array menjadi satu nilai (jumlah, string, object, bahkan array baru). const total = [1, 2, 3].reduce((acc, n) => { return acc + n; // akumulasi tiap elemen }, 0); // nilai awal accumulator = 0 // total => 6 accumulator = nilai yang dikembalikan tiap iterasi. initial value → sangat penting: kalau array kosong, reduce tanpa initial value akan menyebabkan TypeError. Bisa dipakai untuk hitung frekuensi, flatten, group, atau bahkan replace map / filter."
      },
      {
        "id": "c79",
        "no": 9,
        "title": "Q9. Perbedaan Spread <code>...</code> dan Rest parameter?",
        "plainTitle": "Q9. Perbedaan Spread ... dan Rest parameter?",
        "priority": "P2",
        "minutes": 6,
        "short": "Q: Destructuring & Spread",
        "tags": [
          "destructuring",
          "spread",
          "rest",
          "copy",
          "merge",
          "rename"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "Keduanya pakai sintaks <code>...</code>, tapi kegunaannya beda: <strong>spread</strong> <em>menyebar</em> array/object jadi elemen terpisah, sementara <strong>rest</strong> <em> jadi array.</em>"
              },
              {
                "type": "ul",
                "items": [
                  "<strong>Spread</strong>: <code>const arr2 = [...arr]</code> (copy), <code>const gabung = [...a, ...b]</code>, <code>Math.max(...nums)</code>, <code>const u2 = { ...user, umur: 20 }</code>.",
                  "<strong>Rest</strong>: <code>function sum(...nums)</code> (parameter), <code>const [a, ...rest] = arr</code> (destructuring)."
                ]
              }
            ]
          }
        ],
        "searchText": "Q9. Perbedaan Spread ... dan Rest parameter? Q: Destructuring & Spread destructuring spread rest copy merge rename Jawaban ringkas Keduanya pakai sintaks..., tapi kegunaannya beda: spread menyebar array/object jadi elemen terpisah, sementara rest jadi array. Spread: const arr2 = [...arr] (copy), const gabung = [...a,...b], Math.max(...nums), const u2 = {...user, umur: 20}. Rest: function sum(...nums) (parameter), const [a,...rest] = arr (destructuring)."
      },
      {
        "id": "c80",
        "no": 10,
        "title": "Q10. Apa itu Event Loop — cara kerjanya?",
        "plainTitle": "Q10. Apa itu Event Loop — cara kerjanya?",
        "priority": "P1",
        "minutes": 8,
        "short": "Q: Event loop",
        "tags": [
          "event",
          "loop",
          "microtask",
          "macrotask",
          "call",
          "stack",
          "queue"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "Event loop = mekanisme agar JavaScript — meskipun hanya single-threaded — bisa menangani operasi asynchronous."
              },
              {
                "type": "p",
                "html": "Alur:"
              },
              {
                "type": "ol",
                "items": [
                  "Kode sync dijalankan berurutan di <strong>call stack</strong>.",
                  "Operasi async dikerjakan oleh Web API (timer, network, I/O).",
                  "Setelah selesai, callback masuk ke <strong>queue</strong>.",
                  "Event loop memindahkan satu callback dari queue ke call stack saat stack kosong.",
                  "Ikutan prioritas: <strong>microtask</strong> (Promise.then, await) diproses <strong>sebelum macrotask (setTimeout, I/O)</strong>."
                ]
              },
              {
                "type": "code",
                "code": "console.log(\"a\");            // 1. sync\nsetTimeout(() => log(\"b\"));  // macrotask\nPromise.resolve().then(() => log(\"c\"));  // microtask\nconsole.log(\"d\");            // 2. sync\n// urutan keluaran: a, d, c, b",
                "lang": "js"
              }
            ]
          }
        ],
        "searchText": "Q10. Apa itu Event Loop — cara kerjanya? Q: Event loop event loop microtask macrotask call stack queue Jawaban ringkas Event loop = mekanisme agar JavaScript — meskipun hanya single-threaded — bisa menangani operasi asynchronous. Alur: Kode sync dijalankan berurutan di call stack. Operasi async dikerjakan oleh Web API (timer, network, I/O). Setelah selesai, callback masuk ke queue. Event loop memindahkan satu callback dari queue ke call stack saat stack kosong. Ikutan prioritas: microtask (Promise.then, await) diproses sebelum macrotask (setTimeout, I/O). console.log(\"a\"); // 1. sync setTimeout(() => log(\"b\")); // macrotask Promise.resolve().then(() => log(\"c\")); // microtask console.log(\"d\"); // 2. sync // urutan keluaran: a, d, c, b"
      },
      {
        "id": "c81",
        "no": 11,
        "title": "Q11. <code>async/await</code> vs Promise?",
        "plainTitle": "Q11. async/await vs Promise?",
        "priority": "P1",
        "minutes": 6,
        "short": "Q: async/await vs Promise",
        "tags": [
          "async",
          "await",
          "promise",
          "then",
          "catch",
          "finally",
          "over",
          "promise"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<code>async/await</code> sebenarnya <strong>di atas Promise</strong> — hanya memberi syntax yang lebih bersih sehingga asynchronous terlihat seperti synchronous."
              },
              {
                "type": "ul",
                "items": [
                  "<code>async</code> otomatis membuat function kembali <code>Promise</code>, dan <code>await</code> \"membuka\" nilai resolved.",
                  "Error ditangkap dengan <code>try/catch</code>, dan chaining <code>.then</code> tidak perlu dipakai lagi.",
                  "Kalau perlu jalankan beberapa async paralel, pakai <code>Promise.all</code> — jangan <code>await</code> di dalam loop kecuali memang harus sequential."
                ]
              }
            ]
          }
        ],
        "searchText": "Q11. async/await vs Promise? Q: async/await vs Promise async await promise then catch finally over promise Jawaban ringkas async/await sebenarnya di atas Promise — hanya memberi syntax yang lebih bersih sehingga asynchronous terlihat seperti synchronous. async otomatis membuat function kembali Promise, dan await \"membuka\" nilai resolved. Error ditangkap dengan try/catch, dan chaining.then tidak perlu dipakai lagi. Kalau perlu jalankan beberapa async paralel, pakai Promise.all — jangan await di dalam loop kecuali memang harus sequential."
      },
      {
        "id": "c82",
        "no": 12,
        "title": "Q12. <code>fetch()</code> vs Axios — bedanya?",
        "plainTitle": "Q12. fetch() vs Axios — bedanya?",
        "priority": "P1",
        "minutes": 6,
        "short": "Q: fetch vs axios",
        "tags": [
          "fetch",
          "axios",
          "interceptor",
          "promise",
          "async",
          "http",
          "api",
          "browser"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<code>fetch</code> adalah API browser (promise-based) untuk request HTTP. Lebih ringan karena built-in, <strong>tapi tidak reject otomatis saat status &gt;=400</strong>, jadi harus cek <code>response.ok</code> manual."
              },
              {
                "type": "p",
                "html": "<strong>Axios</strong> adalah library pihak ketiga yang otomatis reject saat status 4xx/5xx, ada <em>interceptors</em> (log, token otomatis), dan dukung <code>timeout</code>."
              },
              {
                "type": "ul",
                "items": [
                  "Untuk interview: cukup tahu fetch + cek status, it's enough.",
                  "Axios lebih nyaman di produksi karena otomatis handle banyak hal; fetch lebih ringan."
                ]
              }
            ]
          }
        ],
        "searchText": "Q12. fetch() vs Axios — bedanya? Q: fetch vs axios fetch axios interceptor promise async http api browser Jawaban ringkas fetch adalah API browser (promise-based) untuk request HTTP. Lebih ringan karena built-in, tapi tidak reject otomatis saat status &gt;=400, jadi harus cek response.ok manual. Axios adalah library pihak ketiga yang otomatis reject saat status 4xx/5xx, ada interceptors (log, token otomatis), dan dukung timeout. Untuk interview: cukup tahu fetch + cek status, it's enough. Axios lebih nyaman di produksi karena otomatis handle banyak hal; fetch lebih ringan."
      },
      {
        "id": "c83",
        "no": 13,
        "title": "Q13. 401 vs 403 vs 404 — apa artinya?",
        "plainTitle": "Q13. 401 vs 403 vs 404 — apa artinya?",
        "priority": "P1",
        "minutes": 5,
        "short": "Q: HTTP status 401/403/404",
        "tags": [
          "http",
          "status",
          "code",
          "401",
          "unauthorized",
          "403",
          "forbidden",
          "404",
          "not",
          "found",
          "400",
          "409",
          "500",
          "rest",
          "api"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "code",
                "code": "400 - Bad Request     : permintaan salah (validation error)\n401 - Unauthorized    : belum login / token tidak ada atau kadaluarsa (authN)\n403 - Forbidden         : sudah login tapi tidak punya izin (authZ)\n404 - Not Found         : resource tidak ada\n409 - Conflict          : duplikat / konflik (misal email terdaftar)\n500 - Server Error      : error di server",
                "lang": "js"
              },
              {
                "type": "p",
                "html": "<strong>Bidikan utama interview:</strong> bedakan <code>401</code> = \"<em>kamu belum teridentifikasi</em>\", <code>403</code> = \"<em>kamu sudah teridentifikasi tapi tidak punya akses</em>\"."
              }
            ]
          }
        ],
        "searchText": "Q13. 401 vs 403 vs 404 — apa artinya? Q: HTTP status 401/403/404 http status code 401 unauthorized 403 forbidden 404 not found 400 409 500 rest api Jawaban ringkas 400 - Bad Request : permintaan salah (validation error) 401 - Unauthorized : belum login / token tidak ada atau kadaluarsa (authN) 403 - Forbidden : sudah login tapi tidak punya izin (authZ) 404 - Not Found : resource tidak ada 409 - Conflict : duplikat / konflik (misal email terdaftar) 500 - Server Error : error di server Bidikan utama interview: bedakan 401 = \" kamu belum teridentifikasi \", 403 = \" kamu sudah teridentifikasi tapi tidak punya akses \"."
      },
      {
        "id": "c84",
        "no": 14,
        "title": "Q14. Authentication vs Authorization, dan JWT?",
        "plainTitle": "Q14. Authentication vs Authorization, dan JWT?",
        "priority": "P2",
        "minutes": 6,
        "short": "Q: AuthN vs AuthZ vs JWT",
        "tags": [
          "authentication",
          "authorization",
          "jwt",
          "token",
          "cookie",
          "session"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<strong>Authentication</strong> = verifikasi identitas (\"<em>siapa kamu?</em>\"). <strong>Authorization</strong> = cek permission (\"<em>apa yang boleh kamu lakukan?</em>\")."
              },
              {
                "type": "p",
                "html": "<strong>JWT</strong> = token berisi payload + signature, dipakai untuk mengirim klaim antara client dan server. Biasanya <code>Authorization: Bearer &lt;token&gt;</code>. Payload JWT bisa dibaca orang, jadi jangan pernah menaruh informasi sensitif (password, secret) di dalam payload."
              },
              {
                "type": "ul",
                "items": [
                  "Password di-server disimpan hashed+salted (bcrypt/argon2), <em>tidak pernah plaintext</em>.",
                  "Token JWT tidak bisa dibatalkan begitu saja — untuk hal sensitif lebih aman pakai session di server-side."
                ]
              }
            ]
          }
        ],
        "searchText": "Q14. Authentication vs Authorization, dan JWT? Q: AuthN vs AuthZ vs JWT authentication authorization jwt token cookie session Jawaban ringkas Authentication = verifikasi identitas (\" siapa kamu? \"). Authorization = cek permission (\" apa yang boleh kamu lakukan? \"). JWT = token berisi payload + signature, dipakai untuk mengirim klaim antara client dan server. Biasanya Authorization: Bearer &lt;token&gt;. Payload JWT bisa dibaca orang, jadi jangan pernah menaruh informasi sensitif (password, secret) di dalam payload. Password di-server disimpan hashed+salted (bcrypt/argon2), tidak pernah plaintext. Token JWT tidak bisa dibatalkan begitu saja — untuk hal sensitif lebih aman pakai session di server-side."
      },
      {
        "id": "c85",
        "no": 15,
        "title": "Q15. Shallow copy vs Deep copy?",
        "plainTitle": "Q15. Shallow copy vs Deep copy?",
        "priority": "P2",
        "minutes": 6,
        "short": "Q: Shallow vs deep copy",
        "tags": [
          "shallow",
          "deep",
          "copy",
          "clone",
          "spread",
          "structuredclone",
          "json"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<strong>Shallow copy</strong> = menyalin reference level pertama saja — object di dalamnya masih <em>shared</em> dengan aslinya."
              },
              {
                "type": "p",
                "html": "<strong>Deep copy</strong> = menyalin penuh termasuk object/array bersarang."
              },
              {
                "type": "ul",
                "items": [
                  "Shallow: <code>{...obj}</code> atau <code>[...arr]</code>.",
                  "Deep: <code>structuredClone(obj)</code> (modern), atau <code>JSON.parse(JSON.stringify(obj))</code> (ada kekurangan: kehilangan Date/Fun/map, dan error pada circular reference).",
                  "<code>Object.freeze</code> membuat <strong>shallow immutable</strong> — object di dalamnya masih bisa berubah."
                ]
              }
            ]
          }
        ],
        "searchText": "Q15. Shallow copy vs Deep copy? Q: Shallow vs deep copy shallow deep copy clone spread structuredclone json Jawaban ringkas Shallow copy = menyalin reference level pertama saja — object di dalamnya masih shared dengan aslinya. Deep copy = menyalin penuh termasuk object/array bersarang. Shallow: {...obj} atau [...arr]. Deep: structuredClone(obj) (modern), atau JSON.parse(JSON.stringify(obj)) (ada kekurangan: kehilangan Date/Fun/map, dan error pada circular reference). Object.freeze membuat shallow immutable — object di dalamnya masih bisa berubah."
      },
      {
        "id": "c86",
        "no": 16,
        "title": "Q16. Module: <code>require</code> (CJS) vs <code>import</code> (ESM)?",
        "plainTitle": "Q16. Module: require (CJS) vs import (ESM)?",
        "priority": "P2",
        "minutes": 5,
        "short": "Q: Module CJS vs ESM",
        "tags": [
          "module",
          "commonjs",
          "esm",
          "import",
          "export",
          "require",
          "dynamic",
          "import"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<code>require(\"x\")</code> itu CommonJS (Node), dieksekusi saat dipanggil. <code>import</code> itu ES Module, dieksekusi <strong>compile-time</strong> dan di-<em>hoist</em> — mirip \"load semua dulu\"."
              },
              {
                "type": "ul",
                "items": [
                  "ESM wajib ekstensi file: <code>import x from \"./a.js\"</code>.",
                  "ESM mendukung <strong>dynamic import</strong> (<code>import()</code>) untuk lazy-load.",
                  "Browser sekarang mendukung ESM langsung lewat <code>&lt;script type=\"module\"&gt;</code>.",
                  "CJS mendukung <code>module.exports / require</code>; ESM punya <code>export / import</code>."
                ]
              }
            ]
          }
        ],
        "searchText": "Q16. Module: require (CJS) vs import (ESM)? Q: Module CJS vs ESM module commonjs esm import export require dynamic import Jawaban ringkas require(\"x\") itu CommonJS (Node), dieksekusi saat dipanggil. import itu ES Module, dieksekusi compile-time dan di- hoist — mirip \"load semua dulu\". ESM wajib ekstensi file: import x from \"./a.js\". ESM mendukung dynamic import (import()) untuk lazy-load. Browser sekarang mendukung ESM langsung lewat &lt;script type=\"module\"&gt;. CJS mendukung module.exports / require; ESM punya export / import."
      },
      {
        "id": "c87",
        "no": 17,
        "title": "Q17. Memakai <code>Object.keys</code> dan <code>hasOwn</code> untuk apa?",
        "plainTitle": "Q17. Memakai Object.keys dan hasOwn untuk apa?",
        "priority": "P1",
        "minutes": 5,
        "short": "Q: Object.keys/entries & hasOwn",
        "tags": [
          "object",
          "keys",
          "values",
          "entries",
          "hasown",
          "own",
          "property",
          "enumerate"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "<code>Object.keys/Values/Entries</code> mengembalikan array semua properti yang dapat di-<em>enumerate</em>. Dipakai untuk mengubah object jadi array, cek apakah object kosong (<code>Object.keys(obj).length === 0</code>), atau iterasi."
              },
              {
                "type": "p",
                "html": "<code>Object.hasOwn(obj, \"x\")</code> memeriksa properti <em>yang dimiliki sendiri</em> (bukan turunan prototype) — aman dan tidak bisa ditimpa seperti <code>hasOwnProperty</code> lama."
              }
            ]
          }
        ],
        "searchText": "Q17. Memakai Object.keys dan hasOwn untuk apa? Q: Object.keys/entries & hasOwn object keys values entries hasown own property enumerate Jawaban ringkas Object.keys/Values/Entries mengembalikan array semua properti yang dapat di- enumerate. Dipakai untuk mengubah object jadi array, cek apakah object kosong (Object.keys(obj).length === 0), atau iterasi. Object.hasOwn(obj, \"x\") memeriksa properti yang dimiliki sendiri (bukan turunan prototype) — aman dan tidak bisa ditimpa seperti hasOwnProperty lama."
      },
      {
        "id": "c88",
        "no": 18,
        "title": "Q18. Kenapa <em>immutability</em> penting?",
        "plainTitle": "Q18. Kenapa immutability penting?",
        "priority": "P2",
        "minutes": 5,
        "short": "Q: Immutability",
        "tags": [
          "immutability",
          "pure",
          "function",
          "side",
          "effect",
          "functional"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "qa",
            "question": "Jawaban ringkas",
            "answer": [
              {
                "type": "p",
                "html": "Hindari <strong>side effect</strong> — ubah data asli justru membuat kode sulit dilacak, apalagi di framework reaktif (React/Vue) yang butuh reference baru agar re-render terdeteksi."
              },
              {
                "type": "ul",
                "items": [
                  "Ganti <code>push</code> dengan <code>arr.concat(x)</code> atau <code>[...arr, x]</code>.",
                  "Ganti <code>arr[i] = x</code> dengan <code>arr.map</code> atau membuat salinan dulu.",
                  "Di Redux/State, <strong>jangan mutate state langsung</strong> — kembalikan state baru."
                ]
              }
            ]
          }
        ],
        "searchText": "Q18. Kenapa immutability penting? Q: Immutability immutability pure function side effect functional Jawaban ringkas Hindari side effect — ubah data asli justru membuat kode sulit dilacak, apalagi di framework reaktif (React/Vue) yang butuh reference baru agar re-render terdeteksi. Ganti push dengan arr.concat(x) atau [...arr, x]. Ganti arr[i] = x dengan arr.map atau membuat salinan dulu. Di Redux/State, jangan mutate state langsung — kembalikan state baru."
      }
    ]
  },
  {
    "id": "m12",
    "track": "js",
    "no": "12",
    "title": "Cheat Sheet Ringkas",
    "plainTitle": "12 Cheat Sheet Ringkas",
    "desc": "Cetak / simpan ini untuk review 1 halaman sebelum interview.",
    "priorityNote": "Ringkasan",
    "minutes": 8,
    "chapters": [
      {
        "id": "c89",
        "no": 1,
        "title": "Cheat Sheet 1 — Variabel, Operator, Truthy",
        "plainTitle": "Cheat Sheet 1 — Variabel, Operator, Truthy",
        "priority": "P1",
        "minutes": 3,
        "short": "Cheat sheet 1: Variabel & operator",
        "tags": [
          "variable",
          "let",
          "const",
          "var",
          "truthy",
          "falsy",
          "equality",
          "ternary"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "const x = 10;        // tidak bisa reassign\nlet  y = 20;           // bisa reassign\nvar z = 30;            // hindari (function scope, hoist)\n\n5 == \"5\"               // true  (coercion)\n5 === \"5\"              // false (strict)\nObject.is(NaN, NaN)    // true\nObject.is(0, -0)       // false\n\n// Falsy: false, 0, -0, 0n, \"\", null, undefined, NaN\n// Semua selain itu truthy, termasuk [] {} !!",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "const a = [1,2,3];\n\n// Array methods (pilih yang tepat)\na.map(n => n*2)           // transform, balik array baru\na.filter(n => n > 1)          // subset, balik array baru\na.find(n => n > 1)           // elemen pertama, bukan array\na.reduce((s,n) => s+n, 0)      // 1 nilai akhir\na.some(n => n > 5); a.every(n => n > 0)  // boolean\n\n[3,1,20,5].sort((a,b) => a - b);   // angka! jangan .sort() polos\n[1,2,3].slice(0,2)      // [1,2] tidak mengubah array\n[1,2,3].splice(1,1,\"x\") // mengubah array; hapus 1 mulai index 1, ganti \"x\"\n[1,[2,[3]]].flat()      // [1,2,[3]] ; flat(Infinity) = [1,2,3]",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "// Object\nconst { nama, ...rest } = user;\nObject.keys(user); Object.values(user); Object.entries(user);\nObject.hasOwn(user, \"nama\");           // properti milik sendiri\nObject.assign({}, a, b);               // shallow merge\nObject.freeze(obj);                    // shallow immutable\n\n// Spread & copy\nconst copy = [...arr, ...obj];\nconst deep = JSON.parse(JSON.stringify(obj));\nconst deep2 = structuredClone(obj);    // modern, aman circular",
            "lang": "js"
          },
          {
            "type": "code",
            "code": "// Promise\nconst p = new Promise((resolve, reject) => { resolve(\"data\"); });\np.then(v => log(v)).catch(e => err(e)).finally(() => x);\n\n// Async / await\ntry {\n  const r = await fetch(url);\n  if (!r.ok) throw new Error(\"HTTP \" + r.status);\n  const d = await r.json();\n} catch (e) { console.error(e); }\n// Paralel: Promise.all, race, allSettled, any\n\n// Event loop urutan: sync -> microtask -> macrotask\n// console.log(\"a\"); setTimeout(() => log(\"b\")); Promise.resolve().then(() => log(\"c\")); log(\"d\");\n// Output: a d c b",
            "lang": "js"
          }
        ],
        "searchText": "Cheat Sheet 1 — Variabel, Operator, Truthy Cheat sheet 1: Variabel & operator variable let const var truthy falsy equality ternary const x = 10; // tidak bisa reassign let y = 20; // bisa reassign var z = 30; // hindari (function scope, hoist) 5 == \"5\" // true (coercion) 5 === \"5\" // false (strict) Object.is(NaN, NaN) // true Object.is(0, -0) // false // Falsy: false, 0, -0, 0n, \"\", null, undefined, NaN // Semua selain itu truthy, termasuk [] {} !! const a = [1,2,3]; // Array methods (pilih yang tepat) a.map(n => n*2) // transform, balik array baru a.filter(n => n > 1) // subset, balik array baru a.find(n => n > 1) // elemen pertama, bukan array a.reduce((s,n) => s+n, 0) // 1 nilai akhir a.some(n => n > 5); a.every(n => n > 0) // boolean [3,1,20,5].sort((a,b) => a - b); // angka! jangan .sort() polos [1,2,3].slice(0,2) // [1,2] tidak mengubah array [1,2,3].splice(1,1,\"x\") // mengubah array; hapus 1 mulai index 1, ganti \"x\" [1,[2,[3]]].flat() // [1,2,[3]] ; flat(Infinity) = [1,2,3] // Object const { nama, ...rest } = user; Object.keys(user); Object.values(user); Object.entries(user); Object.hasOwn(user, \"nama\"); // properti milik sendiri Object.assign({}, a, b); // shallow merge Object.freeze(obj); // shallow immutable // Spread & copy const copy = [...arr, ...obj]; const deep = JSON.parse(JSON.stringify(obj)); const deep2 = structuredClone(obj); // modern, aman circular // Promise const p = new Promise((resolve, reject) => { resolve(\"data\"); }); p.then(v => log(v)).catch(e => err(e)).finally(() => x); // Async / await try { const r = await fetch(url); if (!r.ok) throw new Error(\"HTTP \" + r.status); const d = await r.json(); } catch (e) { console.error(e); } // Paralel: Promise.all, race, allSettled, any // Event loop urutan: sync -> microtask -> macrotask // console.log(\"a\"); setTimeout(() => log(\"b\")); Promise.resolve().then(() => log(\"c\")); log(\"d\"); // Output: a d c b"
      },
      {
        "id": "c90",
        "no": 2,
        "title": "Cheat Sheet 2 — Array Methods",
        "plainTitle": "Cheat Sheet 2 — Array Methods",
        "priority": "P1",
        "minutes": 3,
        "short": "Array methods cheat",
        "tags": [
          "array",
          "map",
          "filter",
          "reduce",
          "find",
          "sort",
          "splice",
          "slice"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "table",
            "head": [
              "Method",
              "Return",
              "Cocok untuk"
            ],
            "rows": [
              [
                "map",
                "array baru",
                "ubah tiap elemen"
              ],
              [
                "filter",
                "array baru",
                "ambil yang memenuhi syarat"
              ],
              [
                "find(findIndex)",
                "1 elemen",
                "cari satu"
              ],
              [
                "some/every",
                "boolean",
                "cek kondisi"
              ],
              [
                "reduce",
                "1 nilai",
                "akumulasi (total, group)"
              ],
              [
                "sort",
                "array (mutate!)",
                "urutkan — pakai comparator untuk angka"
              ],
              [
                "slice",
                "array baru",
                "salin sebagian, tidak ubah asli"
              ],
              [
                "splice",
                "array (mutate!)",
                "ubah di tengah, hapus, sisip"
              ],
              [
                "flat/flatMap",
                "array baru",
                "akan nested array"
              ],
              [
                "forEach",
                "undefined",
                "efek samping (render, log)"
              ]
            ]
          },
          {
            "type": "p",
            "html": "<strong>Urutan filter → map → reduce</strong> paling umum. Ingat semua except <code>slice/concat/filter/...</code> tidak mengubah array asal."
          }
        ],
        "searchText": "Cheat Sheet 2 — Array Methods Array methods cheat array map filter reduce find sort splice slice Method Return Cocok untuk map array baru ubah tiap elemen filter array baru ambil yang memenuhi syarat find(findIndex) 1 elemen cari satu some/every boolean cek kondisi reduce 1 nilai akumulasi (total, group) sort array (mutate!) urutkan — pakai comparator untuk angka slice array baru salin sebagian, tidak ubah asli splice array (mutate!) ubah di tengah, hapus, sisip flat/flatMap array baru akan nested array forEach undefined efek samping (render, log) Urutan filter → map → reduce paling umum. Ingat semua except slice/concat/filter/... tidak mengubah array asal."
      },
      {
        "id": "c91",
        "no": 3,
        "title": "Cheat Sheet 3 — Regex, Math &amp; Date",
        "plainTitle": "Cheat Sheet 3 — Regex, Math & Date",
        "priority": "P2",
        "minutes": 2,
        "short": "Regex, Math/Date utility",
        "tags": [
          "regex",
          "math",
          "date",
          "random",
          "round",
          "floor",
          "parseint",
          "string"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "code",
            "code": "// Regex\n/email/.test(text)            // boolean\ntext.match(/(\\d+)/g)          // semua angka\ntext.replace(/\\s+/g, \"-\")     // ganti whitespace\n\"abc\".replace(\"a\",\"o\")        // pertama\n\"aaa\".replaceAll(\"a\",\"o\")     // semua\n\"  x  \".trim()\n\n// Math & Number\nMath.max(...nums); Math.min(...nums);\nMath.round(2.5)   // 3\nMath.floor(2.9)   // 2\nMath.random()     // 0..1\nMath.floor(Math.random() * 100) + 1;   // 1..100\nparseInt(\"101\", 10); parseFloat(\"3.14\");\nNumber(\"123\"); String(123); Boolean(0);\nMath.random().toFixed(2);     // \"0.37\"",
            "lang": "js"
          }
        ],
        "searchText": "Cheat Sheet 3 — Regex, Math & Date Regex, Math/Date utility regex math date random round floor parseint string // Regex /email/.test(text) // boolean text.match(/(\\d+)/g) // semua angka text.replace(/\\s+/g, \"-\") // ganti whitespace \"abc\".replace(\"a\",\"o\") // pertama \"aaa\".replaceAll(\"a\",\"o\") // semua \" x \".trim() // Math & Number Math.max(...nums); Math.min(...nums); Math.round(2.5) // 3 Math.floor(2.9) // 2 Math.random() // 0..1 Math.floor(Math.random() * 100) + 1; // 1..100 parseInt(\"101\", 10); parseFloat(\"3.14\"); Number(\"123\"); String(123); Boolean(0); Math.random().toFixed(2); // \"0.37\""
      }
    ]
  },
  {
    "id": "m13",
    "track": "js",
    "no": "13",
    "title": "Checklist dan Tips Akhir",
    "plainTitle": "13 Checklist dan Tips Akhir",
    "desc": "Persiapan logistik + cara menjawab saat tak yakin.",
    "priorityNote": "Penting",
    "minutes": 11,
    "chapters": [
      {
        "id": "c92",
        "no": 1,
        "title": "Checklist Sebelum Technical Test",
        "plainTitle": "Checklist Sebelum Technical Test",
        "priority": "P1",
        "minutes": 5,
        "short": "Checklist teknis & logistik",
        "tags": [
          "checklist",
          "laptop",
          "kamera",
          "koneksi",
          "environment"
        ],
        "notePlaceholder": "Catat troubleshooting spesifik yang sudah pernah Anda alami...",
        "blocks": [
          {
            "type": "p",
            "html": "Persiapan logistik — jangan keluhi teknis saja. Progres per-item ini disimpan terpisah."
          },
          {
            "type": "checklist",
            "items": [
              {
                "id": "c92-0",
                "label": "Laptop sudah di-charge",
                "text": "Laptop sudah di-charge"
              },
              {
                "id": "c92-1",
                "label": "Charger laptop tersedia",
                "text": "Charger laptop tersedia"
              },
              {
                "id": "c92-2",
                "label": "Browser siap (Chrome / Edge)",
                "text": "Browser siap (Chrome / Edge)"
              },
              {
                "id": "c92-3",
                "label": "VS Code terbuka + terminal siap",
                "text": "VS Code terbuka + terminal siap"
              },
              {
                "id": "c92-4",
                "label": "Node.js terpasang (<code>node -v</code>)",
                "text": "Node.js terpasang (node -v)"
              },
              {
                "id": "c92-5",
                "label": "Git tersedia (<code>git --version</code>)",
                "text": "Git tersedia (git --version)"
              },
              {
                "id": "c92-6",
                "label": "Microphone berfungsi (tes di pengaturan sistem)",
                "text": "Microphone berfungsi (tes di pengaturan sistem)"
              },
              {
                "id": "c92-7",
                "label": "Speaker / headset jelas",
                "text": "Speaker / headset jelas"
              },
              {
                "id": "c92-8",
                "label": "Notifikasi penting dimatikan (DND)",
                "text": "Notifikasi penting dimatikan (DND)"
              },
              {
                "id": "c92-9",
                "label": "Tidak ada Windows Update yang berjalan",
                "text": "Tidak ada Windows Update yang berjalan"
              },
              {
                "id": "c92-10",
                "label": "Hotspot HP siap sebagai backup internet",
                "text": "Hotspot HP siap sebagai backup internet"
              }
            ]
          },
          {
            "type": "h4",
            "html": "10 menit sebelum mulai (09.50 WIB — kamera wajib ON)"
          },
          {
            "type": "ul",
            "items": [
              "Join meeting, nyalakan kamera + mikrofon, pastikan nama akun benar;",
              "Buka VS Code, buka terminal, dan buka tab ini;",
              "Minum segelas air, duduk tegak, napas dalam-dalam;",
              "Rekam poin-poin kuncimu jadi \"cheat sheet pribadi\" agar tenang."
            ]
          }
        ],
        "searchText": "Checklist Sebelum Technical Test Checklist teknis & logistik checklist laptop kamera koneksi environment Persiapan logistik — jangan keluhi teknis saja. Progres per-item ini disimpan terpisah. Laptop sudah di-charge Charger laptop tersedia Browser siap (Chrome / Edge) VS Code terbuka + terminal siap Node.js terpasang (node -v) Git tersedia (git --version) Microphone berfungsi (tes di pengaturan sistem) Speaker / headset jelas Notifikasi penting dimatikan (DND) Tidak ada Windows Update yang berjalan Hotspot HP siap sebagai backup internet 10 menit sebelum mulai (09.50 WIB — kamera wajib ON) Join meeting, nyalakan kamera + mikrofon, pastikan nama akun benar; Buka VS Code, buka terminal, dan buka tab ini; Minum segelas air, duduk tegak, napas dalam-dalam; Rekam poin-poin kuncimu jadi \"cheat sheet pribadi\" agar tenang."
      },
      {
        "id": "c93",
        "no": 2,
        "title": "Jawaban saat Posisi Tidak Spesifik atau \"Saya Nggak Tahu\"",
        "plainTitle": "Jawaban saat Posisi Tidak Spesifik atau \"Saya Nggak Tahu\"",
        "priority": "P1",
        "minutes": 6,
        "short": "Tips jika bingung/ditanya posisi",
        "tags": [
          "interview",
          "tips",
          "jawaban",
          "aman",
          "posisi",
          "background",
          "transition",
          "tidak",
          "tahu"
        ],
        "notePlaceholder": "",
        "blocks": [
          {
            "type": "h4",
            "html": "Jika ditanya: \"<em>Posisi ini sebenarnya kamu tahu apa?</em>\""
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "\"Informasi yang saya terima hanya mencantumkan Javascript. Jadi saya menyiapkan fundamental JS, coding problem, async programming, REST API, serta basic DOM dan Node.js — cukup fleksibel untuk frontend maupun backend.\"",
            "body": []
          },
          {
            "type": "h4",
            "html": "Mobil dari pengalaman QA Performance (nilai tambah)"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "\"Background sekitar tiga tahun di performance testing (JMeter, LoadRunner). Di sana saya tidak hanya menjalankan test, tapi membuat dan menyesuaikan skenario berdasarkan kebutuhan, melakukan troubleshooting, serta menganalisis respon aplikasi mulai dari HTTP sampai database dan monitoring tools.\"",
            "body": []
          },
          {
            "type": "h4",
            "html": "Alasan transisi ke development"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "\"Saya memiliki dasar Java dan Spring Boot dari pelatihan sebelumnya, dan kini sedang memperluas kemampuan ke JavaScript karena fleksibel dipakai untuk frontend maupun backend. Kemampuan analitis dari performance testing saya rasa Langsung bisa diaplikasikan ke penulisan kode yang testable dan efisien.\"",
            "body": []
          },
          {
            "type": "h4",
            "html": "Kalau memang tidak tahu"
          },
          {
            "type": "quote",
            "variant": "tip",
            "title": "\"Untuk bagian ini saya belum cukup familiar, jadi saya tidak ingin memberikan jawaban yang keliru. Berdasarkan pemahaman saya, yang saya ketahui adalah... — dan saya bisa mencoba memecahkan dengan pendekatan yang saya kuasai.\" Lalu jelaskan apa yang diketahui.",
            "body": []
          },
          {
            "type": "quote",
            "variant": "warn",
            "title": "Jangan pernah mengarang jawaban penuh. Katakan apa yang Anda tidak tahu dengan jujur, lalu tunjukkan cara berpikir Anda untuk memecahkan masalah serupa.",
            "body": []
          }
        ],
        "searchText": "Jawaban saat Posisi Tidak Spesifik atau \"Saya Nggak Tahu\" Tips jika bingung/ditanya posisi interview tips jawaban aman posisi background transition tidak tahu Jika ditanya: \" Posisi ini sebenarnya kamu tahu apa? \" \"Informasi yang saya terima hanya mencantumkan Javascript. Jadi saya menyiapkan fundamental JS, coding problem, async programming, REST API, serta basic DOM dan Node.js — cukup fleksibel untuk frontend maupun backend.\" Mobil dari pengalaman QA Performance (nilai tambah) \"Background sekitar tiga tahun di performance testing (JMeter, LoadRunner). Di sana saya tidak hanya menjalankan test, tapi membuat dan menyesuaikan skenario berdasarkan kebutuhan, melakukan troubleshooting, serta menganalisis respon aplikasi mulai dari HTTP sampai database dan monitoring tools.\" Alasan transisi ke development \"Saya memiliki dasar Java dan Spring Boot dari pelatihan sebelumnya, dan kini sedang memperluas kemampuan ke JavaScript karena fleksibel dipakai untuk frontend maupun backend. Kemampuan analitis dari performance testing saya rasa Langsung bisa diaplikasikan ke penulisan kode yang testable dan efisien.\" Kalau memang tidak tahu \"Untuk bagian ini saya belum cukup familiar, jadi saya tidak ingin memberikan jawaban yang keliru. Berdasarkan pemahaman saya, yang saya ketahui adalah... — dan saya bisa mencoba memecahkan dengan pendekatan yang saya kuasai.\" Lalu jelaskan apa yang diketahui. Jangan pernah mengarang jawaban penuh. Katakan apa yang Anda tidak tahu dengan jujur, lalu tunjukkan cara berpikir Anda untuk memecahkan masalah serupa."
      }
    ]
  }
];
