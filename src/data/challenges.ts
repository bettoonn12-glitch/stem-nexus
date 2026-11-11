import { Challenge } from '../types';
import { marsImage, greenhouseImage } from '../assets/images';

export const CHALLENGES: Challenge[] = [
  // -------------------------------------------------------------
  // MATHEMATICS MODULE (SD Grade 1-6 & SMP Grade 7-9 Curriculum)
  // -------------------------------------------------------------
  {
    id: 'math-1',
    subject: 'math',
    title: 'Luas & Keliling Lapangan Sekolah',
    subtitle: 'Materi Geometri Dasar: Luas Persegi Panjang (SD Kelas 3-6 / SMP 7)',
    difficulty: 'Foundation',
    points: 100,
    scenario:
      'Sekolah dasar sedang merenovasi lapangan olahraga berbentuk persegi panjang. Guru olahraga mengukur panjang lapangan adalah 20 meter dan lebarnya adalah 10 meter. Para murid diajak menghitung luas total lapangan tersebut.',
    question:
      'Sebuah lapangan olahraga berbentuk persegi panjang memiliki panjang 20 meter dan lebar 10 meter. Berapakah luas total lapangan tersebut dalam meter persegi (m²)?',
    inputType: 'number',
    unit: 'm²',
    correctAnswer: 200,
    tolerance: 0,
    hints: [
      'Gunakan rumus luas persegi panjang: Luas = Panjang × Lebar.',
      'Kalikan 20 meter dengan 10 meter.',
      '20 × 10 = ?',
    ],
    explanation: {
      overview:
        'Luas persegi panjang dihitung dengan mengalikan ukuran sisi panjang dengan sisi lebarnya.',
      steps: [
        {
          step: 'Identifikasi Nilai Panjang dan Lebar',
          detail: 'Panjang (p) = 20 meter, Lebar (l) = 10 meter.',
          formula: 'p = 20 m, l = 10 m',
        },
        {
          step: 'Terapkan Rumus Luas Persegi Panjang',
          detail: 'Luas = Panjang × Lebar.',
          formula: 'Luas = 20 m × 10 m = 200 m²',
        },
      ],
      keyTakeaway:
        'Luas menyatakan besarnya area permukaan lapangan dalam satuan persegi (m²).',
      realWorldApplication:
        'Menghitung luas digunakan saat memasang rumput lapangan, ubin kelas, dan merancang denah rumah.',
    },
    interactiveWidgetType: 'desalination-ratio',
  },
  {
    id: 'math-2',
    subject: 'math',
    title: 'Diskon Belanja Alat Tulis Sekolah',
    subtitle: 'Materi Aritmetika Sosial: Persentase Diskon (SD Kelas 4-6 / SMP 7)',
    difficulty: 'Foundation',
    points: 100,
    scenario:
      'Di koperasi sekolah, sebuah buku ensiklopedia sains dijual dengan harga Rp 50.000. Untuk menyambut tahun ajaran baru, toko memberikan diskon spesial sebesar 20%.',
    question:
      'Buku ensiklopedia seharga Rp 50.000 mendapat potongan harga (diskon) sebesar 20%. Berapakah besar rupiah potongan harga (diskon) yang didapatkan pembeli?',
    inputType: 'number',
    unit: 'Rupiah',
    correctAnswer: 10000,
    tolerance: 0,
    hints: [
      'Ubah 20% menjadi pecahan: 20/100 atau 0,2.',
      'Kalikan persentase diskon dengan harga awal buku.',
      '20% × Rp 50.000 = (20 / 100) × 50.000.',
    ],
    explanation: {
      overview:
        'Potongan harga (diskon) dihitung dengan mengalikan persentase diskon dengan harga barang semula.',
      steps: [
        {
          step: 'Ubah Persentase ke Pecahan',
          detail: '20% artinya 20 per 100 = 0,2.',
          formula: 'Diskon = 20% = 20/100',
        },
        {
          step: 'Hitung Besar Potongan Harga',
          detail: 'Kalikan 20/100 dengan Rp 50.000.',
          formula: 'Potongan = (20 / 100) × 50.000 = Rp 10.000',
        },
      ],
      keyTakeaway:
        'Setelah dipotong diskon Rp 10.000, pembeli hanya perlu membayar Rp 40.000.',
      realWorldApplication:
        'Menghitung diskon sangat penting dalam berbelanja cerdas di supermarket dan mengelola tabungan saku.',
    },
    interactiveWidgetType: 'battery-drain',
  },
  {
    id: 'math-3',
    subject: 'math',
    title: 'Perbandingan Resep Kue & Minuman Sehat',
    subtitle: 'Materi Perbandingan Senilai (SD Kelas 5-6 / SMP 7)',
    difficulty: 'Foundation',
    points: 120,
    scenario:
      'Di kantin sekolah sehat, membuat 1 teko teh herbal membutuhkan 2 sendok makan madu alami. Hari ini para siswa ingin membuat 5 teko teh herbal untuk seluruh anggota kelas.',
    question:
      'Jika 1 teko teh membutuhkan 2 sendok makan madu, berapa sendok makan madu yang dibutuhkan untuk membuat 5 teko teh herbal yang sama?',
    inputType: 'number',
    unit: 'Sendok',
    correctAnswer: 10,
    tolerance: 0,
    hints: [
      'Gunakan perbandingan senilai.',
      'Jumlah madu = Jumlah teko × madu per teko.',
      '5 × 2 = ?',
    ],
    explanation: {
      overview:
        'Pada perbandingan senilai, jika jumlah barang yang dibuat bertambah banyak, maka kebutuhan bahan juga bertambah secara proporsional.',
      steps: [
        {
          step: 'Tentukan Rasio Bahan Dasar',
          detail: '1 teko membutuhkan 2 sendok madu.',
          formula: 'Rasio = 2 sendok / teko',
        },
        {
          step: 'Kalikan dengan Jumlah Teko',
          detail: '5 teko × 2 sendok = 10 sendok makan madu.',
          formula: 'Total = 5 × 2 = 10 sendok',
        },
      ],
      keyTakeaway:
        'Bahan meningkat 5 kali lipat seiring jumlah minuman yang disiapkan.',
      realWorldApplication:
        'Koki memasak, ilmuwan laboratorium, dan apoteker obat menggunakan perbandingan senilai dalam meracik bahan.',
    },
    interactiveWidgetType: 'biomass-growth',
  },
  {
    id: 'math-4',
    subject: 'math',
    title: 'Kecepatan, Jarak, dan Waktu Tempuh',
    subtitle: 'Materi Gerak & Kecepatan: Jarak = Kecepatan × Waktu (SD Kelas 5-6 / SMP 7)',
    difficulty: 'Intermediate',
    points: 120,
    scenario:
      'Budi bersepeda santai ke rumah kakek dengan kecepatan tetap 15 km/jam. Budi menempuh perjalanan selama 2 jam tanpa berhenti.',
    question:
      'Sebuah sepeda melaju dengan kecepatan rata-rata 15 km/jam selama 2 jam. Berapakah jarak total yang ditempuh sepeda tersebut (dalam kilometer)?',
    inputType: 'number',
    unit: 'km',
    correctAnswer: 30,
    tolerance: 0,
    hints: [
      'Gunakan rumus gerak: Jarak = Kecepatan × Waktu.',
      'Kecepatan = 15 km/jam, Waktu = 2 jam.',
      '15 × 2 = ?',
    ],
    explanation: {
      overview:
        'Jarak tempuh adalah perkalian antara kecepatan kendaraan dengan lama waktu tempuhnya.',
      steps: [
        {
          step: 'Tuliskan Rumus Jarak',
          detail: 's = v × t (Jarak = Kecepatan × Waktu).',
          formula: 's = 15 km/jam × 2 jam',
        },
        {
          step: 'Hitung Jarak Akhir',
          detail: '15 dikali 2 menghasilkan 30 km.',
          formula: 's = 30 km',
        },
      ],
      keyTakeaway:
        'Semakin lama waktu berkendara pada kecepatan yang sama, semakin jauh jarak yang ditempuh.',
      realWorldApplication:
        'Aplikasi peta digital seperti Google Maps menghitung estimasi waktu tiba (ETA) berdasarkan rumus kecepatan dan jarak ini.',
    },
    interactiveWidgetType: 'gear-ratio',
  },

  // -------------------------------------------------------------
  // SCIENCE MODULE (SD Grade 1-6 & SMP Grade 7-9 Curriculum)
  // -------------------------------------------------------------
  {
    id: 'sci-1',
    subject: 'science',
    title: 'Rangkaian Listrik & Hukum Ohm',
    subtitle: 'Materi IPA Fisika: Arus Listrik I = V / R (SD Kelas 6 / SMP 8-9)',
    difficulty: 'Foundation',
    points: 100,
    scenario:
      'Di laboratorium IPA sekolah, siswa merangkai baterai 6 Volt ke sebuah lampu senter kecil. Alat ukur menunjukkan lampu memiliki nilai hambatan listrik sebesar 2 Ohm (Ω).',
    question:
      'Sebuah baterai 6 Volt dihubungkan pada lampu dengan hambatan 2 Ohm. Sesuai Hukum Ohm (Kuat Arus = Tegangan ÷ Hambatan), berapakah kuat arus listrik yang mengalir (dalam Ampere)?',
    inputType: 'number',
    unit: 'Ampere',
    correctAnswer: 3,
    tolerance: 0,
    hints: [
      'Gunakan rumus Hukum Ohm: I = V ÷ R.',
      'Tegangan V = 6 Volt, Hambatan R = 2 Ohm.',
      'Bagi 6 dengan 2.',
    ],
    explanation: {
      overview:
        'Hukum Ohm menyatakan bahwa kuat arus listrik (I) sebanding dengan tegangan (V) dan berbanding terbalik dengan hambatan (R).',
      steps: [
        {
          step: 'Tulis Rumus Hukum Ohm',
          detail: 'I = V / R.',
          formula: 'I = 6 V / 2 Ω',
        },
        {
          step: 'Hitung Kuat Arus',
          detail: '6 dibagi 2 menghasilkan 3 Ampere.',
          formula: 'I = 3 Ampere',
        },
      ],
      keyTakeaway:
        'Kuat arus listrik diukur dalam satuan Ampere (A).',
      realWorldApplication:
        'Pemasangan sekring listrik di rumah menggunakan perhitungan kuat arus agar kabel tidak kelebihan beban dan terbakar.',
    },
    interactiveWidgetType: 'parallel-circuit',
  },
  {
    id: 'sci-2',
    subject: 'science',
    title: 'Suhu & Titik Didih Air',
    subtitle: 'Materi IPA Zat dan Kalor: Perubahan Wujud Benda (SD Kelas 4-6 / SMP 7)',
    difficulty: 'Foundation',
    points: 100,
    scenario:
      'Pada praktikum pemanasan air di kelas sains, air dipanaskan dalam gelas kimia menggunakan pembakar bunsen hingga mendidih dan berubah menjadi uap air.',
    question:
      'Pada tekanan udara normal (1 atmosfer), pada suhu berapakah air bersih mulai mendidih (dalam derajat Celsius / °C)?',
    inputType: 'number',
    unit: '°C',
    correctAnswer: 100,
    tolerance: 0,
    hints: [
      'Titik beku air adalah 0 °C.',
      'Titik didih air adalah skala seratus pada termometer Celsius.',
      'Angkanya adalah 100.',
    ],
    explanation: {
      overview:
        'Pada tekanan standar, air murni berubah wujud dari cair menjadi gas (mendidih) pada suhu tepat 100 derajat Celsius.',
      steps: [
        {
          step: 'Kenali Titik Tetap Termometer Celsius',
          detail: 'Titik beku es = 0 °C, Titik didih air = 100 °C.',
          formula: 'Titik Didih = 100 °C',
        },
      ],
      keyTakeaway:
        'Saat air mendidih pada 100 °C, suhunya tidak akan naik lagi selama proses penguapan berlangsung.',
      realWorldApplication:
        'Merebus air hingga 100 °C membunuh bakteri patogen sehingga air aman untuk diminum.',
    },
    interactiveWidgetType: 'ph-neutralization',
  },
  {
    id: 'sci-3',
    subject: 'science',
    title: 'Tata Surya: Planet Utama Mengelilingi Matahari',
    subtitle: 'Materi IPA Tata Surya (SD Kelas 6 / SMP 7)',
    difficulty: 'Foundation',
    points: 100,
    scenario:
      'Dalam pelajaran astronomi sekolah, siswa belajar tentang sistem tata surya kita. Planet-planet beredar mengelilingi matahari secara teratur pada garis edarnya (orbit).',
    question:
      'Berapakah jumlah planet utama dalam sistem Tata Surya kita (mulai dari Merkurius sampai Neptunus)?',
    inputType: 'number',
    unit: 'Planet',
    correctAnswer: 8,
    tolerance: 0,
    hints: [
      'Sebutkan namanya: Merkurius, Venus, Bumi, Mars, Yupiter, Saturnus, Uranus, Neptunus.',
      'Pluto kini digolongkan sebagai planet katai (kerdil).',
      'Total ada 8 planet utama.',
    ],
    explanation: {
      overview:
        'Berdasarkan persatuan astronomi internasional (IAU), Tata Surya kita memiliki 8 planet utama yang mengorbit Matahari.',
      steps: [
        {
          step: 'Daftar 8 Planet Utama',
          detail: '1. Merkurius, 2. Venus, 3. Bumi, 4. Mars, 5. Yupiter, 6. Saturnus, 7. Uranus, 8. Neptunus.',
          formula: 'Jumlah = 8 Planet',
        },
      ],
      keyTakeaway:
        'Yupiter adalah planet terbesar, sedangkan Merkurius adalah planet terdekat dengan Matahari.',
      realWorldApplication:
        'Misi luar angkasa teleskop James Webb dan satelit penjelajah mempelajari orbit dan atmosfer ke-8 planet ini.',
    },
    interactiveWidgetType: 'cardiac-oxygen',
  },
  {
    id: 'sci-4',
    subject: 'science',
    title: 'Daur Air & Titik Beku Air Menjadi Es',
    subtitle: 'Materi IPA Wujud Benda: Pembekuan Air (SD Kelas 3-5 / SMP 7)',
    difficulty: 'Foundation',
    points: 100,
    scenario:
      'Di musim dingin atau di dalam lemari es freezer, air cair dapat berubah wujud membeku menjadi bongkahan es padat saat suhunya mencapai titik beku.',
    question:
      'Pada skala termometer Celsius (°C), pada suhu berapakah air bersih mulai membeku menjadi es?',
    inputType: 'number',
    unit: '°C',
    correctAnswer: 0,
    tolerance: 0,
    hints: [
      'Angkanya adalah angka nol.',
      'Suhu di bawah angka ini akan bernilai minus (-).',
      '0 °C adalah titik beku air.',
    ],
    explanation: {
      overview:
        'Air murni melepaskan kalor dan membeku menjadi es padat pada suhu 0 derajat Celsius pada tekanan normal.',
      steps: [
        {
          step: 'Titik Beku Termometer Celsius',
          detail: 'Skala Celsius dirancang dengan menetapkan titik beku air murni pada 0 °C.',
          formula: 'Titik Beku = 0 °C',
        },
      ],
      keyTakeaway:
        'Saat air membeku pada 0 °C, volumenya sedikit mengembang sehingga es terapung di atas air cair.',
      realWorldApplication:
        'Pengawetan makanan beku di kulkas dan pencegahan pembekuan air di pipa radiator mobil di negara bermusim dingin.',
    },
    interactiveWidgetType: 'gravity-drop',
  },

  // -------------------------------------------------------------
  // ICT MODULE (SD Grade 1-6 & SMP Grade 7-9 Curriculum)
  // -------------------------------------------------------------
  {
    id: 'ict-1',
    subject: 'ict',
    title: 'Satuan Memori Komputer: Byte dan Bit',
    subtitle: 'Materi Informatika: Satuan Data Digital (SD Kelas 4-6 / SMP 7-8)',
    difficulty: 'Foundation',
    points: 100,
    scenario:
      'Dalam pelajaran informatika, guru menjelaskan bahwa komputer menyimpan data gambar, tulisan, dan game dalam kode biner 0 dan 1 yang disebut bit. Gabungan bit membentuk 1 Byte data.',
    question:
      'Satu Byte (1 Byte) dalam sistem komputer terdiri dari berapakah bit biner?',
    inputType: 'number',
    unit: 'bit',
    correctAnswer: 8,
    tolerance: 0,
    hints: [
      'Byte digunakan untuk menyimpan 1 karakter huruf.',
      'Jumlah bit dalam satu byte adalah delapan.',
      '1 Byte = 8 bit.',
    ],
    explanation: {
      overview:
        'Dalam arsitektur komputer digital, 1 Byte didefinisikan sebagai paket yang terdiri dari 8 bit biner.',
      steps: [
        {
          step: 'Definisi Satuan Byte',
          detail: 'Bit adalah satuan terkecil (0 atau 1). Kumpulan 8 bit membentuk 1 Byte.',
          formula: '1 Byte = 8 bits',
        },
      ],
      keyTakeaway:
        '1 Kilobyte (KB) setara dengan 1.024 byte, dan 1 Megabyte (MB) setara dengan 1.024 KB.',
      realWorldApplication:
        'Kapasitas memori flashdisk, file dokumen teks, dan kecepatan kuota internet dihitung menggunakan satuan byte dan bit.',
    },
    interactiveWidgetType: 'binary-register',
  },
  {
    id: 'ict-2',
    subject: 'ict',
    title: 'Logika Komputer AND: Saklar Seri',
    subtitle: 'Materi Berpikir Komputasional: Gerbang Logika AND (SMP Kelas 7-9)',
    difficulty: 'Foundation',
    points: 100,
    scenario:
      'Dua saklar lampu A dan B dipasang secara seri membentuk gerbang logika AND. Lampu Q hanya menyala jika kedua saklar sama-sama dihidupkan (bernilai 1). Jika salah satu atau keduanya mati (0), maka lampu padam.',
    question:
      'Pada gerbang logika AND, jika Saklar A bernilai ON (1) dan Saklar B bernilai ON (1), berapakah nilai sinyal keluaran Q (Ketik 1 untuk MENYALA, 0 untuk PADAM)?',
    inputType: 'number',
    unit: 'Sinyal (0 atau 1)',
    correctAnswer: 1,
    tolerance: 0,
    hints: [
      'Rumus logika AND: 1 AND 1 = 1.',
      'Karena kedua saklar menyala, lampu akan menyala.',
      'Ketik angka 1.',
    ],
    explanation: {
      overview:
        'Gerbang AND menghasilkan nilai TRUE (1) HANYA jika seluruh masukannya bernilai TRUE (1).',
      steps: [
        {
          step: 'Tabel Kebenaran Gerbang AND',
          detail: '1 AND 1 menghasilkan 1. Jika ada yang 0, hasilnya menjadi 0.',
          formula: '1 AND 1 = 1 (Lampu Menyala)',
        },
      ],
      keyTakeaway:
        'Logika AND menjamin keamanan ganda sebelum suatu sistem komputer memberikan izin akses.',
      realWorldApplication:
        'Sistem login memerlukan Username BENAR dan Password BENAR (AND) agar akun pengguna dapat terbuka.',
    },
    interactiveWidgetType: 'logic-gates',
  },
  {
    id: 'ict-3',
    subject: 'ict',
    title: 'Tombol Shortcut Keyboard untuk Salin (Copy)',
    subtitle: 'Materi Praktik Komputer: Pintasan Papan Tik (SD Kelas 3-6 / SMP 7)',
    difficulty: 'Foundation',
    points: 100,
    scenario:
      'Saat mengetik tugas sekolah di komputer, kita sering menggunakan pintasan keyboard (shortcut) Ctrl + C untuk menyalin teks (Copy) tanpa harus mengklik menu mouse berkali-kali.',
    question:
      'Pintasan keyboard untuk menyalin teks (Copy) adalah dengan menekan kombinasi tombol Ctrl + C. Berapa jumlah tombol keyboard yang ditekan secara bersamaan dalam pintasan ini?',
    inputType: 'number',
    unit: 'Tombol',
    correctAnswer: 2,
    tolerance: 0,
    hints: [
      'Tombol pertama adalah Ctrl (Control).',
      'Tombol kedua adalah huruf C.',
      'Total ada 2 tombol yang ditekan bersama.',
    ],
    explanation: {
      overview:
        'Shortcut Ctrl + C menggabungkan tombol modifier Ctrl dan huruf C untuk memberi instruksi salin secara cepat.',
      steps: [
        {
          step: 'Identifikasi Tombol Pintasan',
          detail: '1. Tombol Ctrl, 2. Tombol C. Total = 2 tombol.',
          formula: 'Ctrl + C = 2 Tombol',
        },
      ],
      keyTakeaway:
        'Untuk menempelkan (Paste) hasil salinan, kita menekan pintasan Ctrl + V.',
      realWorldApplication:
        'Menguasai tombol pintasan keyboard meningkatkan efisiensi dan kecepatan bekerja di komputer hingga 50%.',
    },
    interactiveWidgetType: 'network-latency',
  },
  {
    id: 'ict-4',
    subject: 'ict',
    title: 'Mengenal Angka Biner 4-Bit Sederhana',
    subtitle: 'Materi Sistem Bilangan Komputer: Biner ke Desimal (SD Kelas 5-6 / SMP 7-9)',
    difficulty: 'Foundation',
    points: 120,
    scenario:
      'Komputer menghitung dengan angka biner berbasis 2. Setiap digit dari kanan memiliki nilai kelipatan: bit 0 bernilai 1, bit 1 bernilai 2, bit 2 bernilai 4, dan bit 3 bernilai 8.',
    question:
      'Berapakah nilai angka desimal biasa dari kode biner 0101₂ (dihitung dari: 0×8 + 1×4 + 0×2 + 1×1)?',
    inputType: 'number',
    unit: 'Desimal',
    correctAnswer: 5,
    tolerance: 0,
    hints: [
      'Jumlahkan angka yang berbobot 1: ada angka 4 dan angka 1.',
      '4 + 1 = ?',
      'Hasilnya adalah 5.',
    ],
    explanation: {
      overview:
        'Bilangan biner 0101₂ diubah ke desimal dengan menjumlahkan nilai tempat pada digit yang bernilai 1.',
      steps: [
        {
          step: 'Uraikan Berdasarkan Bobot Nilai',
          detail: '(0 × 8) + (1 × 4) + (0 × 2) + (1 × 1) = 0 + 4 + 0 + 1 = 5.',
          formula: '0101₂ = 4 + 1 = 5₁₀',
        },
      ],
      keyTakeaway:
        'Semua angka yang kita ketik di keyboard diubah prosesor menjadi serangkaian angka biner 0 dan 1.',
      realWorldApplication:
        'Sensor digital membaca tegangan listrik tinggi (1) dan rendah (0) lalu menerjemahkannya ke angka biner ini.',
    },
    interactiveWidgetType: 'parity-check',
  },

  // -------------------------------------------------------------
  // INTEGRATED MISSIONS (COMBINING MATH + SCIENCE + ICT FOR SD/SMP)
  // -------------------------------------------------------------
  {
    id: 'int-1',
    subject: 'integrated',
    title: 'Misi Rover Penjelajah Sains Sekolah',
    subtitle: 'Integrasi Matematika Kecepatan, Sains Robotika, dan Perintah Komputer',
    difficulty: 'Foundation',
    points: 150,
    scenario:
      'Klub robotika sekolah sedang menguji coba robot penjelajah beroda di halaman sekolah. Robot diprogram bergerak lurus sejauh 6 meter dalam waktu 2 detik.',
    question:
      'Robot penjelajah menempuh jarak 6 meter dalam waktu 2 detik. Berapakah kecepatan rata-rata robot tersebut dalam meter per detik (m/s)?',
    inputType: 'number',
    unit: 'm/s',
    correctAnswer: 3,
    tolerance: 0,
    hints: [
      'Rumus Kecepatan = Jarak ÷ Waktu.',
      'Jarak = 6 meter, Waktu = 2 detik.',
      'Bagi 6 dengan 2.',
    ],
    explanation: {
      overview:
        'Kecepatan rata-rata robot dihitung dengan membagi total jarak tempuh dengan lama waktu perjalanan.',
      steps: [
        {
          step: 'Tulis Rumus Kecepatan',
          detail: 'v = s / t.',
          formula: 'v = 6 meter / 2 detik = 3 m/s',
        },
      ],
      keyTakeaway:
        'Robot melaju dengan kecepatan stabil 3 meter setiap detiknya.',
      realWorldApplication:
        'Mobil otonom pintar dan robot pengantar paket menggunakan kalkulasi kecepatan ini untuk navigasi aman.',
    },
    interactiveWidgetType: 'integrated-mission',
    metaImage: marsImage,
  },
  {
    id: 'int-2',
    subject: 'integrated',
    title: 'Misi Kebun Hidroponik Sekolah Cerdas',
    subtitle: 'Integrasi Perbandingan Kimia Pupuk, Sains Tanaman, dan Sensor Otomatis',
    difficulty: 'Foundation',
    points: 150,
    scenario:
      'Siswa mengelola kebun sayur hidroponik sekolah. Tangki air nutrisi berkapasitas 50 liter membutuhkan campuran nutrisi cair pekat dan air bersih dengan perbandingan 1 bagian nutrisi pekat untuk 4 bagian air (total 5 bagian).',
    question:
      'Untuk mengisi tangki hidroponik bervolume 50 liter dengan perbandingan 1 bagian nutrisi dan 4 bagian air (total 5 bagian), berapa liter nutrisi pekat yang dibutuhkan (50 ÷ 5)?',
    inputType: 'number',
    unit: 'Liter',
    correctAnswer: 10,
    tolerance: 0,
    hints: [
      'Total bagian larutan = 1 + 4 = 5 bagian.',
      'Nutrisi mengambil 1/5 dari total volume 50 liter.',
      'Bagi 50 dengan 5 = 10 liter.',
    ],
    explanation: {
      overview:
        'Pada campuran perbandingan 1 : 4, nutrisi pekat mencakup 1 dari 5 bagian total campuran cairan tangki.',
      steps: [
        {
          step: 'Hitung Volume per Bagian',
          detail: '50 Liter dibagi 5 bagian sama dengan 10 Liter per bagian.',
          formula: '50 L / 5 = 10 Liter Nutrisi Pekat (dan 40 L Air Bersih)',
        },
      ],
      keyTakeaway:
        'Takaran nutrisi yang pas membuat tanaman sayur bayam dan selada tumbuh subur dan hijau.',
      realWorldApplication:
        'Pertanian vertikal modern di perkotaan menghemat 90% air dibandingkan berkebun di tanah.',
    },
    interactiveWidgetType: 'integrated-mission',
    metaImage: greenhouseImage,
  },
  {
    id: 'int-3',
    subject: 'integrated',
    title: 'Misi Panel Surya Ramah Lingkungan',
    subtitle: 'Integrasi Penjumlahan Daya Listrik, Energi Terbarukan, dan Pemantauan Digital',
    difficulty: 'Foundation',
    points: 150,
    scenario:
      'Atap sekolah dipasangi 3 unit panel surya untuk menghasilkan listrik ramah lingkungan dari cahaya matahari. Setiap panel surya dapat menghasilkan daya listrik sebesar 100 Watt saat cuaca cerah.',
    question:
      'Jika sekolah memasang 3 unit panel surya dan masing-masing panel menghasilkan daya 100 Watt, berapakah total daya listrik yang dihasilkan ketiga panel tersebut (dalam Watt)?',
    inputType: 'number',
    unit: 'Watt',
    correctAnswer: 300,
    tolerance: 0,
    hints: [
      'Ada 3 panel surya.',
      'Masing-masing menghasilkan 100 Watt.',
      '3 × 100 = ?',
    ],
    explanation: {
      overview:
        'Total daya dari beberapa panel surya yang dihubungkan bersama adalah jumlah daya dari seluruh panel tersebut.',
      steps: [
        {
          step: 'Kalikan Jumlah Panel dengan Daya Tiap Panel',
          detail: '3 panel dikali 100 Watt per panel menghasilkan 300 Watt.',
          formula: 'Daya Total = 3 × 100 Watt = 300 Watt',
        },
      ],
      keyTakeaway:
        'Energi surya tidak menghasilkan polusi asap dan dapat dipakai menyalakan lampu dan kipas angin kelas.',
      realWorldApplication:
        'Sekolah dan rumah modern memanfaatkan energi matahari untuk mengurangi tagihan listrik dan melestarikan bumi.',
    },
    interactiveWidgetType: 'integrated-mission',
  },
];
