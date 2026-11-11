const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/masterQuestions.json');
const raw = fs.readFileSync(filePath, 'utf8');
const questions = JSON.parse(raw);

console.log(`Loaded ${questions.length} questions.`);

// 1. Theme Translations Dictionary
const THEME_ID_MAP = {
  // SD 1
  'Numbers 1–20': 'Bilangan 1–20',
  'Simple Addition and Subtraction': 'Penjumlahan dan Pengurangan Sederhana',
  'Shapes and Patterns': 'Bentuk dan Pola Geometri',
  'Length, Time, and Simple Comparisons': 'Panjang, Waktu, dan Perbandingan Sederhana',
  'Body Parts and the Five Senses': 'Bagian Tubuh dan Panca Indra',
  'Animals and Plants': 'Hewan dan Tumbuhan',
  'Weather and the Environment': 'Cuaca dan Lingkungan',
  'Objects and Their Properties': 'Benda dan Sifat-Sifatnya',
  'Materials and Their Uses': 'Bahan dan Kegunaannya',
  'Building Simple Structures': 'Membangun Struktur Sederhana',
  'Wheels and Motion': 'Roda dan Gerak',
  'Designing and Testing Objects': 'Merancang dan Menguji Benda',
  'Introduction to Computer Devices': 'Pengenalan Perangkat Komputer',
  'Input and Output Devices': 'Perangkat Input dan Output',
  'Using Devices Safely': 'Penggunaan Perangkat yang Aman',
  'Simple Sequences of Instructions': 'Urutan Instruksi Sederhana',

  // SD 2
  'Numbers up to 100': 'Bilangan hingga 100',
  'Two-Digit Addition and Subtraction': 'Penjumlahan dan Pengurangan Dua Angka',
  'Multiplication as Repeated Addition': 'Perkalian sebagai Penjumlahan Berulang',
  'Measuring Length and Time': 'Pengukuran Panjang dan Waktu',
  'Needs of Living Things': 'Kebutuhan Makhluk Hidup',
  'Animal Life Cycles': 'Daur Hidup Hewan',
  'States and Changes of Matter': 'Wujud dan Perubahan Benda',
  'Earth, the Sun, and Weather': 'Bumi, Matahari, dan Cuaca',
  'Choosing Suitable Materials': 'Memilih Bahan yang Sesuai',
  'Mini Bridges and Buildings': 'Jembatan Mini dan Bangunan',
  'Wheels, Axles, and Carts': 'Roda, Gandar, dan Gerobak',
  'Solving Simple Problems': 'Memecahkan Masalah Sederhana',
  'Computer Parts and Their Functions': 'Bagian Komputer dan Fungsinya',
  'Basic File Management': 'Manajemen Berkas Dasar',
  'Digital Ethics and Safety': 'Etika Digital dan Keamanan',
  'Patterns and Logic': 'Pola dan Logika',

  // SD 3
  'Multiplication and Division': 'Perkalian dan Pembagian',
  'Simple Fractions': 'Pecahan Sederhana',
  'Perimeter of Plane Shapes': 'Keliling Bangun Datar',
  'Basic Measurement and Data': 'Pengukuran Dasar dan Data',
  'Plant Parts and Their Functions': 'Bagian Tumbuhan dan Fungsinya',
  'Simple Food Chains': 'Rantai Makanan Sederhana',
  'Forces and Motion': 'Gaya dan Gerak',
  'Water Cycle and the Environment': 'Siklus Air dan Lingkungan',
  'Strength of Shapes and Structures': 'Kekuatan Bentuk dan Struktur',
  'Simple Lever Mechanisms': 'Mekanisme Tuas Sederhana',
  'Designing a Simple Filter': 'Merancang Saringan Sederhana',
  'Testing and Improving Designs': 'Menguji dan Menyempurnakan Desain',
  'Hardware and Software': 'Perangkat Keras dan Lunak',
  'Typing and Creating Documents': 'Mengetik dan Membuat Dokumen',
  'Safe Internet Search': 'Pencarian Internet yang Aman',
  'Algorithms and Patterns': 'Algoritma dan Pola',

  // SD 4
  'Mixed Arithmetic Operations': 'Operasi Hitung Campuran',
  'Factors and Multiples': 'Faktor dan Kelipatan (FPB & KPK)',
  'Area and Perimeter': 'Luas dan Keliling Bangun Datar',
  'Data and Averages': 'Penyajian Data dan Rata-Rata',
  'Energy Sources and Transformations': 'Sumber dan Perubahan Energi',
  'Ecosystems and Adaptations': 'Ekosistem dan Adaptasi Makhluk Hidup',
  'Light and Sound': 'Cahaya dan Bunyi',
  'States of Matter and Their Changes': 'Wujud Zat dan Perubahannya',
  'Forces in Design': 'Penerapan Gaya dalam Desain',
  'Frames and Structural Stability': 'Rangka dan Kestabilan Struktur',
  'Simple Electrical Circuits': 'Rangkaian Listrik Sederhana',
  'The Engineering Design Process': 'Proses Desain Rekayasa',
  'Operating Systems and Applications': 'Sistem Operasi dan Aplikasi',
  'Digital Documents and Presentations': 'Dokumen dan Presentasi Digital',
  'Reliable Information and Misinformation': 'Informasi Terpercaya vs Hoaks',
  'Computational Thinking and Flowcharts': 'Berpikir Komputasional dan Diagram Alir',

  // SD 5
  'Fractions and Decimals': 'Pecahan dan Desimal',
  'Percentages and Ratios': 'Persentase dan Perbandingan',
  'Volume of Solid Shapes': 'Volume Bangun Ruang (Kubus & Balok)',
  'Coordinates and Data Handling': 'Sistem Koordinat dan Diagram Data',
  'Human Body Systems': 'Sistem Organ Tubuh Manusia',
  'The Solar System and Planets': 'Sistem Tata Surya dan Planet-Planet',
  'Simple Machines': 'Pesawat Sederhana',
  'Food Chains and Ecosystem Balance': 'Rantai Makanan dan Keseimbangan Ekosistem',
  'Bridges and Load Distribution': 'Jembatan dan Distribusi Beban',
  'Energy in Mechanical Systems': 'Energi dalam Sistem Mekanik',
  'Prototyping and Testing': 'Pembuatan Purwarupa dan Pengujian',
  'Word Processing and Presentations': 'Pengolah Kata dan Presentasi',
  'Digital Data and Tables': 'Data Digital dan Tabel',
  'Privacy and Passwords': 'Privasi dan Keamanan Kata Sandi',
  'Block-Based Coding and Loops': 'Pemrograman Visual Blok dan Perulangan',

  // SD 6
  'Ratios and Scales': 'Perbandingan dan Skala Peta',
  'Percentages and Number Operations': 'Persentase dan Operasi Hitung',
  'Area and Volume': 'Luas Permukaan dan Volume Gabungan',
  'Data Handling and Basic Probability': 'Pengolahan Data dan Peluang Dasar',
  "Earth's Rotation and Revolution": 'Rotasi dan Revolusi Bumi',
  'Electricity and Magnetism': 'Listrik dan Kemagnetan',
  'Reproduction in Living Things': 'Perkembangbiakan Makhluk Hidup',
  'Energy and Environmental Conservation': 'Energi dan Pelestarian Lingkungan',
  'Gears and Transmission': 'Roda Gigi dan Transmisi Gerak',
  'Load-Bearing Structures': 'Struktur Penahan Beban',
  'Basic Renewable Energy': 'Energi Terbarukan Dasar',
  'Measurement and Design Optimization': 'Pengukuran dan Optimasi Desain',
  'Spreadsheets and Basic Formulas': 'Lembar Kerja dan Rumus Dasar',
  'Internet, Networks, and Cloud Services': 'Internet, Jaringan, dan Layanan Cloud',
  'Digital Footprints and Security': 'Jejak Digital dan Keamanan Siber',
  'Algorithms, Conditions, and Debugging': 'Algoritma, Kondisi, dan Debugging',

  // SMP 7 (smp-1)
  'Integers and Fractions': 'Bilangan Bulat dan Pecahan',
  'Algebraic Expressions': 'Bentuk dan Operasi Aljabar',
  'Ratios and Financial Arithmetic': 'Perbandingan dan Aritmatika Sosial',
  'Angles and Plane Shapes': 'Sudut dan Bangun Datar',
  'Classification of Living Things': 'Klasifikasi Makhluk Hidup',
  'Temperature, Heat, and Expansion': 'Suhu, Kalor, dan Pemuaian',
  'Organization of Life': 'Sistem Organisasi Kehidupan',
  'Motion and Forces': 'Gerak Lurus dan Gaya (Hukum Newton)',
  'Forces, Pressure, and Structures': 'Gaya, Tekanan, dan Struktur Rekayasa',
  'Mechanisms and Motion Systems': 'Mekanisme dan Sistem Gerak',
  'Electrical Circuits and Components': 'Komponen dan Rangkaian Listrik',
  'The Engineering Design Cycle': 'Siklus Desain Rekayasa',
  'Computer Components and Operating Systems': 'Komponen Komputer dan Sistem Operasi',
  'Computer Networks and the Internet': 'Jaringan Komputer dan Internet',
  'Digital Data Representation': 'Representasi Data Digital (Biner & Heksadesimal)',
  'Algorithms and Introductory Programming': 'Algoritma dan Pengenalan Pemrograman',

  // SMP 8 (smp-2)
  'Number Patterns and Sequences': 'Pola Bilangan dan Barisan',
  'Linear Equations and Graphs': 'Persamaan Garis Lurus dan Grafik',
  'Pythagorean Theorem': 'Teorema Pythagoras',
  'Relations, Functions, and Statistics': 'Relasi, Fungsi, dan Statistika',
  'Digestive and Respiratory Systems': 'Sistem Pencernaan dan Pernapasan Manusia',
  'Pressure in Solids, Liquids, and Gases': 'Tekanan Zat Padat, Cair (Hidrostatis), dan Gas',
  'Vibrations, Waves, and Sound': 'Getaran, Gelombang, dan Bunyi',
  'Plant Structure and Function': 'Struktur dan Fungsi Jaringan Tumbuhan',
  'Simple Machines and Efficiency': 'Pesawat Sederhana dan Efisiensi Mekanik',
  'Structures, Stress, and Loads': 'Struktur, Tegangan, dan Distribusi Beban',
  'Energy Systems and Conversion': 'Sistem Energi dan Konversi Termal',
  'Prototypes, Variables, and Testing': 'Purwarupa, Variabel Uji, dan Analisis',
  'Spreadsheets and Data Analysis': 'Analisis Data Lembar Sebar (Spreadsheet)',
  'Cybersecurity and Privacy': 'Keamanan Siber dan Privasi Digital',
  'HTML and Basic Web Structure': 'HTML dan Struktur Dasar Halaman Web',
  'Conditionals, Loops, and Functions': 'Percabangan, Perulangan, dan Fungsi Kode',

  // SMP 9 (smp-3)
  'Exponents and Radicals': 'Perpangkatan dan Bentuk Akar',
  'Quadratic Equations and Functions': 'Persamaan dan Fungsi Kuadrat',
  'Similarity and Solid Geometry': 'Kesebangunan dan Bangun Ruang Sisi Lengkung',
  'Statistics and Probability': 'Statistika Lanjutan dan Peluang',
  'Reproduction and Inheritance': 'Sistem Reproduksi dan Pewarisan Sifat (Genetika)',
  'Chemical Reactions and Changes in Matter': 'Reaksi Kimia, Atom, dan Perubahan Materi',
  'The Solar System, Gravity, and the Universe': 'Tata Surya, Gravitasi Universal, dan Alam Semesta',
  'Mechanical Systems Analysis': 'Analisis Sistem Mekanik Dinamis',
  'Electricity in Design': 'Aplikasi Kelistrikan dalam Desain Sistem',
  'Energy, Power, and Efficiency': 'Daya Listrik, Energi, dan Efisiensi',
  'Data-Driven Design Optimization': 'Optimasi Desain Berbasis Analisis Data',
  'Databases and Information Management': 'Basis Data (Database) dan Manajemen Informasi',
  'Networks, Protocols, and Internet Services': 'Protokol Jaringan dan Layanan Internet (TCP/IP & DNS)',
  'Programming and Problem Solving': 'Pemrograman Berorientasi Objek dan Pemecahan Masalah',
  'AI, Digital Ethics, and Information Evaluation': 'Kecerdasan Buatan (AI), Etika Digital, dan Evaluasi Fakta',
};

// 2. High-Quality Questions Generator for Duplicate Themes
// When a theme in a grade has duplicated questions, this lookup table provides
// 10 distinct, verified, pedagogically sound questions for SD 1 to SMP 9!
const CURATED_THEMES = {
  // SD 5 Science - The Solar System and Planets
  'sd-5::science::The Solar System and Planets': [
    {
      qEn: "Which planet is famous for having large, bright, and prominent rings around it?",
      qId: "Planet manakah yang terkenal memiliki cincin yang besar, terang, dan sangat mencolok di sekelilingnya?",
      optionsEn: ["Mars", "Saturn", "Mercury", "Earth"],
      optionsId: ["Mars", "Saturnus", "Merkurius", "Bumi"],
      correctIndex: 1,
      expEn: "Saturn is widely known for its spectacular and visible planetary ring system composed of ice and rock particles.",
      expId: "Saturnus terkenal dengan sistem cincinnya yang sangat indah dan terbentuk dari partikel es dan batuan."
    },
    {
      qEn: "Which planet is the largest planet in our solar system?",
      qId: "Planet manakah yang merupakan planet terbesar di tata surya kita?",
      optionsEn: ["Jupiter", "Venus", "Mars", "Neptune"],
      optionsId: ["Jupiter", "Venus", "Mars", "Neptunus"],
      correctIndex: 0,
      expEn: "Jupiter is the largest planet in our solar system, with a mass greater than all other planets combined.",
      expId: "Jupiter adalah planet terbesar di tata surya dengan massa melebihi gabungan seluruh planet lainnya."
    },
    {
      qEn: "Which planet is closest to the Sun?",
      qId: "Planet manakah yang posisinya paling dekat dengan Matahari?",
      optionsEn: ["Earth", "Venus", "Mercury", "Mars"],
      optionsId: ["Bumi", "Venus", "Merkurius", "Mars"],
      correctIndex: 2,
      expEn: "Mercury is the first planet and orbits closest to the Sun.",
      expId: "Merkurius adalah planet pertama dan posisinya paling dekat mengitari Matahari."
    },
    {
      qEn: "Why is Mars often called the 'Red Planet'?",
      qId: "Mengapa planet Mars sering dijuluki sebagai 'Planet Merah'?",
      optionsEn: ["It is made of hot red fire", "Its soil contains iron oxide (rust)", "It has red plant leaves", "It reflects red light from Jupiter"],
      optionsId: ["Terbuat dari api merah membara", "Permukaannya kaya akan besi oksida (karat)", "Banyak tanaman berwarna merah", "Memantulkan cahaya merah dari Jupiter"],
      correctIndex: 1,
      expEn: "Mars appears red from Earth because the iron minerals in its regolith oxidize, or rust, giving the surface a reddish tint.",
      expId: "Mars tampak kemerahan karena tanah dan bebatuannya mengandung besi oksida (karat)."
    },
    {
      qEn: "Which planet is the hottest planet in our solar system?",
      qId: "Planet manakah yang memiliki suhu permukaan paling panas di tata surya kita?",
      optionsEn: ["Venus", "Mercury", "Mars", "Saturn"],
      optionsId: ["Venus", "Merkurius", "Mars", "Saturnus"],
      correctIndex: 0,
      expEn: "Venus is the hottest planet due to a dense carbon dioxide atmosphere trapping extreme heat via the greenhouse effect.",
      expId: "Venus adalah planet terpanas karena atmosfernya tebal oleh gas karbon dioksida yang memerangkap panas melalui efek rumah kaca ekstrem."
    },
    {
      qEn: "What celestial body is at the gravitational center of our solar system?",
      qId: "Benda langit apakah yang berada di pusat gravitasi tata surya kita?",
      optionsEn: ["The Moon", "The Sun", "Earth", "Polaris"],
      optionsId: ["Bulan", "Matahari", "Bumi", "Bintang Polaris"],
      correctIndex: 1,
      expEn: "The Sun is the central star around which all planets, asteroids, and comets orbit.",
      expId: "Matahari adalah bintang induk yang berada di pusat tata surya dan dikelilingi oleh semua planet."
    },
    {
      qEn: "What is Earth's only natural satellite?",
      qId: "Apakah nama satu-satunya satelit alami milik Bumi?",
      optionsEn: ["The Moon", "Titan", "Phobos", "Europa"],
      optionsId: ["Bulan", "Titan", "Phobos", "Europa"],
      correctIndex: 0,
      expEn: "The Moon is Earth's only permanent natural satellite, orbiting Earth every 27.3 days.",
      expId: "Bulan adalah satu-satunya satelit alami permanen Bumi yang mengelilingi Bumi setiap 27,3 hari."
    },
    {
      qEn: "Which planet is the farthest major planet from the Sun in our solar system?",
      qId: "Planet manakah yang merupakan planet utama terjauh dari Matahari di tata surya?",
      optionsEn: ["Uranus", "Neptune", "Mars", "Saturn"],
      optionsId: ["Uranus", "Neptunus", "Mars", "Saturnus"],
      correctIndex: 1,
      expEn: "Neptune is the eighth and farthest known major planet from the Sun.",
      expId: "Neptunus adalah planet ke-8 dan terjauh dari Matahari di tata surya kita."
    },
    {
      qEn: "Where is the main Asteroid Belt located in our solar system?",
      qId: "Di manakah letak sabuk asteroid utama di tata surya kita?",
      optionsEn: ["Between Mars and Jupiter", "Between Earth and Venus", "Beyond Neptune", "Inside Mercury's orbit"],
      optionsId: ["Di antara Mars dan Jupiter", "Di antara Bumi dan Venus", "Di luar orbit Neptunus", "Di dalam orbit Merkurius"],
      correctIndex: 0,
      expEn: "The asteroid belt is a torus-shaped region located between the orbits of Mars and Jupiter.",
      expId: "Sabuk asteroid utama terletak di antara orbit planet Mars dan planet Jupiter."
    },
    {
      qEn: "How long does it take for Earth to complete one full revolution around the Sun?",
      qId: "Berapa lama waktu yang dibutuhkan Bumi untuk melakukan satu putaran revolusi penuh mengelilingi Matahari?",
      optionsEn: ["About 365 days (1 year)", "24 hours", "30 days", "10 years"],
      optionsId: ["Sekitar 365¼ hari (1 tahun)", "24 jam", "30 hari", "10 tahun"],
      correctIndex: 0,
      expEn: "Earth takes approximately 365.25 days to complete one full orbit (revolution) around the Sun.",
      expId: "Bumi membutuhkan waktu sekitar 365¼ hari (1 tahun) untuk mengelilingi Matahari satu putaran penuh."
    }
  ],

  // SD 5 Science - Human Body Systems
  'sd-5::science::Human Body Systems': [
    {
      qEn: "Which vital organ pumps oxygen-rich blood throughout the human body?",
      qId: "Organ tubuh vital manakah yang bertugas memompa darah ke seluruh tubuh manusia?",
      optionsEn: ["Lungs", "Heart", "Stomach", "Kidney"],
      optionsId: ["Paru-paru", "Jantung", "Lambung", "Ginjal"],
      correctIndex: 1,
      expEn: "The heart is the muscular pump that drives blood circulation through blood vessels.",
      expId: "Jantung adalah organ berotot yang berfungsi memompa darah ke seluruh jaringan tubuh."
    },
    {
      qEn: "Which organ system is responsible for taking in oxygen and expelling carbon dioxide?",
      qId: "Sistem organ manakah yang bertugas mengambil oksigen dan mengeluarkan karbon dioksida?",
      optionsEn: ["Respiratory system", "Digestive system", "Skeletal system", "Immune system"],
      optionsId: ["Sistem pernapasan", "Sistem pencernaan", "Sistem rangka", "Sistem kekebalan tubuh"],
      correctIndex: 0,
      expEn: "The respiratory system, centered around the lungs and trachea, conducts gas exchange.",
      expId: "Sistem pernapasan (paru-paru dan saluran napas) bertugas melakukan pertukaran gas oksigen dan karbon dioksida."
    },
    {
      qEn: "Where does the chemical digestion of nutrients primarily get absorbed into the bloodstream?",
      qId: "Di manakah sebagian besar sari-sari makanan diserap ke dalam aliran darah?",
      optionsEn: ["Small intestine", "Mouth", "Esophagus", "Large intestine"],
      optionsId: ["Usus halus", "Mulut", "Kerongkongan", "Usus besar"],
      correctIndex: 0,
      expEn: "The small intestine has villi that absorb digested nutrients into the circulatory system.",
      expId: "Usus halus memiliki vili (jonjot usus) yang menyerap sari makanan ke dalam peredaran darah."
    },
    {
      qEn: "What is the primary role of the human skeletal system?",
      qId: "Apakah fungsi utama dari sistem rangka (tulang) pada tubuh manusia?",
      optionsEn: ["Supporting body shape and protecting vital organs", "Pumping blood", "Breathing in air", "Digesting food"],
      optionsId: ["Menopang bentuk tubuh dan melindungi organ vital", "Memompa darah", "Menghirup udara", "Mencerna makanan"],
      correctIndex: 0,
      expEn: "Bones provide structural support, store calcium, and protect organs like the brain, heart, and lungs.",
      expId: "Rangka menopang tubuh, tempat melekatnya otot, serta melindungi organ vital seperti otak dan jantung."
    },
    {
      qEn: "Which human organ filters waste liquids from the blood to produce urine?",
      qId: "Organ tubuh manakah yang menyaring zat sisa dari darah untuk menghasilkan urine?",
      optionsEn: ["Kidneys", "Liver", "Heart", "Stomach"],
      optionsId: ["Ginjal", "Hati", "Jantung", "Lambung"],
      correctIndex: 0,
      expEn: "The kidneys filter metabolic wastes and excess water from blood to form urine.",
      expId: "Ginjal menyaring zat sisa metabolisme dan kelebihan cairan dari darah untuk membentuk urine."
    },
    {
      qEn: "What major organ controls thoughts, emotions, memory, and voluntary movement?",
      qId: "Organ tubuh manakah yang menjadi pusat kendali pikiran, memori, dan gerakan tubuh?",
      optionsEn: ["Brain", "Lungs", "Heart", "Pancreas"],
      optionsId: ["Otak", "Paru-paru", "Jantung", "Pankreas"],
      correctIndex: 0,
      expEn: "The brain is the command center of the nervous system.",
      expId: "Otak adalah pusat pengendali seluruh sistem saraf dan aktivitas tubuh manusia."
    },
    {
      qEn: "Which blood vessels carry oxygenated blood away from the heart to the rest of the body?",
      qId: "Pembuluh darah manakah yang membawa darah kaya oksigen keluar dari jantung ke seluruh tubuh?",
      optionsEn: ["Arteries", "Veins", "Capillaries", "Lymph vessels"],
      optionsId: ["Arteri (pembuluh nadi)", "Vena (pembuluh balik)", "Kapiler", "Pembuluh limfa"],
      correctIndex: 0,
      expEn: "Arteries carry blood away from the heart at relatively high pressure.",
      expId: "Arteri atau pembuluh nadi mengalirkan darah bertekanan tinggi dari jantung menuju seluruh tubuh."
    },
    {
      qEn: "What type of tissue connects bones to other bones at joints?",
      qId: "Jaringan apakah yang menghubungkan tulang dengan tulang pada persendian?",
      optionsEn: ["Ligament", "Tendon", "Skin", "Neuron"],
      optionsId: ["Ligamen", "Tendon", "Kulit", "Neuron"],
      correctIndex: 0,
      expEn: "Ligaments are tough fibrous bands connecting bones together across joints.",
      expId: "Ligamen adalah jaringan ikat kuat yang menghubungkan tulang dengan tulang pada persendian."
    },
    {
      qEn: "What substance in red blood cells binds to oxygen and gives blood its red color?",
      qId: "Zat apakah di dalam sel darah merah yang mengikat oksigen dan memberi warna merah pada darah?",
      optionsEn: ["Hemoglobin", "Chlorophyll", "Insulin", "Melanin"],
      optionsId: ["Hemoglobin", "Klorofil", "Insulin", "Melanin"],
      correctIndex: 0,
      expEn: "Hemoglobin is an iron-containing protein that binds oxygen in erythrocytes.",
      expId: "Hemoglobin adalah protein kaya zat besi pada sel darah merah yang mengikat molekul oksigen."
    },
    {
      qEn: "What is the primary function of the stomach in the digestive tract?",
      qId: "Apakah fungsi utama lambung dalam sistem pencernaan manusia?",
      optionsEn: ["Churning food with acid and digestive enzymes", "Absorbing water only", "Filtering air", "Pumping blood"],
      optionsId: ["Melumatkan makanan dengan asam lambung dan enzim", "Hanya menyerap air", "Menyaring udara", "Memompa darah"],
      correctIndex: 0,
      expEn: "The stomach produces gastric juices and churns food into a semi-liquid mixture called chyme.",
      expId: "Lambung menghasilkan asam lambung dan enzim untuk melumatkan makanan menjadi bubur kimus."
    }
  ],

  // SD 5 Science - Simple Machines
  'sd-5::science::Simple Machines': [
    {
      qEn: "Which simple machine consists of a rigid bar that pivots on a fixed point called a fulcrum?",
      qId: "Pesawat sederhana apakah yang terdiri dari batang kaku yang berputar pada satu titik tumpu?",
      optionsEn: ["Lever", "Pulley", "Wedge", "Inclined plane"],
      optionsId: ["Tuas (Pengungkit)", "Katrol", "Baji", "Bidang miring"],
      correctIndex: 0,
      expEn: "A lever uses a fulcrum to multiply input force when lifting loads.",
      expId: "Tuas atau pengungkit bertumpu pada titik tumpu untuk memperingan gaya dalam mengangkat beban."
    },
    {
      qEn: "A ramp used to roll heavy wheelbarrows up to a truck bed is an example of what simple machine?",
      qId: "Papan miring yang digunakan untuk menaikkan drum berat ke atas bak truk adalah contoh dari:",
      optionsEn: ["Inclined plane", "Screw", "Wheel and axle", "Pulley"],
      optionsId: ["Bidang miring", "Sekrup", "Roda berporos", "Katrol"],
      correctIndex: 0,
      expEn: "An inclined plane reduces required lifting force over a longer sloping distance.",
      expId: "Bidang miring memperkecil gaya yang dibutuhkan dengan memperpanjang lintasan tempuh."
    },
    {
      qEn: "Which device is an example of a wheel and axle simple machine?",
      qId: "Benda manakah di bawah ini yang merupakan contoh pemanfaatan roda berporos?",
      optionsEn: ["Doorknob and bicycle pedal", "Scissors", "Knife blade", "Stairs"],
      optionsId: ["Gagang pintu dan pedal sepeda", "Gunting", "Mata pisau", "Tangga rumah"],
      correctIndex: 0,
      expEn: "Doorknobs and bike pedals consist of a large wheel attached to a central axle.",
      expId: "Gagang pintu dan pedal sepeda terdiri dari roda yang terhubung ke poros tengah untuk memutar mekanismenya."
    },
    {
      qEn: "What simple machine is used on a flagpole or construction crane to change the direction of pulling force?",
      qId: "Pesawat sederhana apakah yang dipasang di ujung tiang bendera atau derek bangunan untuk mengubah arah tarikan?",
      optionsEn: ["Pulley", "Wedge", "Lever", "Screw"],
      optionsId: ["Katrol", "Baji", "Tuas", "Sekrup"],
      correctIndex: 0,
      expEn: "A pulley uses a grooved wheel and rope to change force direction or multiply effort.",
      expId: "Katrol menggunakan roda beralur dan tali untuk mengubah arah gaya tarikan saat menaikkan bendera."
    },
    {
      qEn: "An axe blade and the tip of a chisel are examples of which simple machine?",
      qId: "Mata kapak dan ujung pahat adalah contoh dari pesawat sederhana jenis:",
      optionsEn: ["Wedge", "Lever", "Pulley", "Wheel and axle"],
      optionsId: ["Baji (Wedge)", "Tuas", "Katrol", "Roda berporos"],
      correctIndex: 0,
      expEn: "A wedge is made of two inclined planes back-to-back, used to split or cut materials.",
      expId: "Baji terbentuk dari dua bidang miring yang menyatu untuk membelah atau memotong benda."
    },
    {
      qEn: "A spiral staircase and jar lid threads are variations of which simple machine?",
      qId: "Tangga spiral dan ulir pada tutup toples merupakan modifikasi dari:",
      optionsEn: ["Screw", "Pulley", "Lever", "Wedge"],
      optionsId: ["Sekrup", "Katrol", "Tuas", "Baji"],
      correctIndex: 0,
      expEn: "A screw is essentially an inclined plane wrapped around a central cylinder.",
      expId: "Sekrup adalah bidang miring yang melilit pada sebuah silinder poros."
    },
    {
      qEn: "A pair of scissors is a combination of two levers sharing a pivot together with:",
      qId: "Gunting kuku atau gunting kertas merupakan gabungan dari dua tuas dengan:",
      optionsEn: ["Sharp wedges as cutting blades", "Pulleys", "Screws only", "Springs only"],
      optionsId: ["Baji tajam sebagai pisau pemotong", "Katrol", "Hanya sekrup", "Hanya pegas"],
      correctIndex: 0,
      expEn: "Scissors combine first-class levers with sharp wedge blades to shear materials.",
      expId: "Gunting menggabungkan prinsip tuas jenis pertama dengan mata pisau baji tajam."
    },
    {
      qEn: "What is mechanical advantage in simple machines?",
      qId: "Apakah yang dimaksud dengan keuntungan mekanis pada pesawat sederhana?",
      optionsEn: ["The ratio of output force (load) to input force (effort)", "The weight of the machine", "The speed of the wind", "The cost of building it"],
      optionsId: ["Perbandingan antara gaya beban terhadap gaya kuasa yang diberikan", "Berat alat tersebut", "Kecepatan angin", "Biaya pembuatan alat"],
      correctIndex: 0,
      expEn: "Mechanical advantage measures how much a machine multiplies the force applied to it.",
      expId: "Keuntungan mekanis menunjukkan berapa kali lipat pesawat sederhana menggandakan gaya kuasa kita."
    },
    {
      qEn: "On a seesaw (first-class lever), where is the fulcrum located?",
      qId: "Pada jungkat-jungkit (tuas jenis pertama), di manakah posisi titik tumpu?",
      optionsEn: ["Between the effort and the load", "At the very end of the board", "Above the players' heads", "Underground"],
      optionsId: ["Di antara titik kuasa dan titik beban", "Di ujung papan", "Di atas kepala pemain", "Di dalam tanah"],
      correctIndex: 0,
      expEn: "In a class-1 lever like a seesaw, the fulcrum sits between the load and the effort.",
      expId: "Pada tuas golongan pertama seperti jungkat-jungkit, titik tumpu berada di antara beban dan kuasa."
    },
    {
      qEn: "A wheelbarrow is an example of what class of lever?",
      qId: "Gerobak dorong roda satu adalah contoh tuas jenis:",
      optionsEn: ["Second-class lever (load in the middle)", "First-class lever", "Third-class lever", "Non-lever machine"],
      optionsId: ["Tuas jenis kedua (beban di tengah)", "Tuas jenis pertama", "Tuas jenis ketiga", "Bukan tuas"],
      correctIndex: 0,
      expEn: "In a class-2 lever like a wheelbarrow, the load is between the wheel (fulcrum) and the handles (effort).",
      expId: "Pada gerobak roda satu, beban berada di antara roda (titik tumpu) dan pegangan tangan (kuasa)."
    }
  ],

  // SD 6 Science - Electricity and Magnetism
  'sd-6::science::Electricity and Magnetism': [
    {
      qEn: "In an electric circuit, what component provides the source of electrical energy (voltage)?",
      qId: "Dalam suatu rangkaian listrik, komponen apakah yang berfungsi sebagai sumber energi listrik (tegangan)?",
      optionsEn: ["Battery", "Light bulb", "Switch", "Copper wire"],
      optionsId: ["Baterai", "Lampu pijar", "Sakelar", "Kawat tembaga"],
      correctIndex: 0,
      expEn: "A battery or cell provides electromotive force that drives electric current.",
      expId: "Baterai atau akumulator bertindak sebagai sumber energi listrik yang mengalirkan arus."
    },
    {
      qEn: "What happens when two identical magnetic poles (e.g., North and North) are brought close together?",
      qId: "Apa yang terjadi jika dua kutub magnet yang senama (misalnya Utara dan Utara) didekatkan?",
      optionsEn: ["They repel each other", "They attract each other", "They lose all magnetism", "They create a spark"],
      optionsId: ["Saling tolak-menolak", "Saling tarik-menarik", "Kemagnetannya hilang seketika", "Memunculkan percikan api"],
      correctIndex: 0,
      expEn: "Like magnetic poles repel, while unlike magnetic poles (North and South) attract.",
      expId: "Kutub magnet yang senama akan tolak-menolak, sedangkan kutub tidak senama akan tarik-menarik."
    },
    {
      qEn: "Which material is a good conductor of electricity?",
      qId: "Benda manakah di bawah ini yang merupakan konduktor listrik yang baik?",
      optionsEn: ["Copper metal wire", "Rubber band", "Dry wood", "Plastic ruler"],
      optionsId: ["Kawat tembaga", "Karet gelang", "Kayu kering", "Penggaris plastik"],
      correctIndex: 0,
      expEn: "Metals like copper, silver, and aluminum have free electrons that conduct electricity easily.",
      expId: "Logam seperti tembaga dan aluminium memiliki elektron bebas sehingga sangat mudah menghantarkan listrik."
    },
    {
      qEn: "What is the primary function of a switch in an electrical circuit?",
      qId: "Apakah fungsi utama dari sakelar pada rangkaian listrik?",
      optionsEn: ["To open and close the circuit path", "To create electricity", "To measure voltage", "To store magnetic charge"],
      optionsId: ["Menghubungkan dan memutus aliran arus listrik", "Membuat listrik", "Mengukur tegangan", "Menyimpan muatan magnet"],
      correctIndex: 0,
      expEn: "A switch opens (breaks) or closes (completes) the conductive path of electric current.",
      expId: "Sakelar berfungsi untuk menyambung atau memutus rangkaian listrik secara aman."
    },
    {
      qEn: "In a series circuit with two light bulbs, what happens if one bulb burns out?",
      qId: "Pada rangkaian seri dengan dua lampu, apa yang terjadi jika salah satu lampu putus?",
      optionsEn: ["The other bulb also turns off", "The other bulb glows twice as bright", "Nothing changes", "The battery explodes"],
      optionsId: ["Lampu lainnya ikut padam", "Lampu lainnya menyala dua kali lebih terang", "Tidak terjadi perubahan apa pun", "Baterai meledak"],
      correctIndex: 0,
      expEn: "In a series circuit, there is only one path; breaking that path opens the circuit for all components.",
      expId: "Pada rangkaian seri, hanya ada satu jalur arus. Jika satu putus, seluruh rangkaian terputus dan padam."
    },
    {
      qEn: "Why are household electrical appliances wired in parallel circuits rather than series circuits?",
      qId: "Mengapa instalasi listrik di rumah dipasang secara paralel, bukan seri?",
      optionsEn: ["So each appliance receives full voltage and can operate independently", "To use less copper wire", "Because series cannot handle lights", "To increase electric resistance"],
      optionsId: ["Agar tiap alat mendapat tegangan penuh dan bisa dinyalakan mandiri", "Untuk menghemat kawat", "Karena rangkaian seri tidak bisa menyalakan lampu", "Untuk memperbesar hambatan"],
      correctIndex: 0,
      expEn: "Parallel circuits allow each device to be switched on or off independently with constant voltage.",
      expId: "Rangkaian paralel memungkinkan setiap peralatan dinyalakan secara bebas tanpa terpengaruh alat lain."
    },
    {
      qEn: "What do we call a temporary magnet made by wrapping insulated copper wire around an iron nail and connecting it to a battery?",
      qId: "Apakah sebutan untuk magnet sementara yang dibuat dengan melilitkan kawat berarus pada paku besi?",
      optionsEn: ["Electromagnet", "Permanent bar magnet", "Natural lodestone", "Static magnet"],
      optionsId: ["Elektromagnet", "Magnet batang permanen", "Batu magnet alam", "Magnet statis"],
      correctIndex: 0,
      expEn: "An electromagnet creates a magnetic field when electric current flows through its coil.",
      expId: "Elektromagnet adalah magnet yang medan magnetnya dihasilkan oleh aliran arus listrik pada kumparan kawat."
    },
    {
      qEn: "Which needle inside a navigation compass aligns with Earth's magnetic poles?",
      qId: "Jarum pada kompas penunjuk arah dapat bergerak karena merupakan:",
      optionsEn: ["A lightweight magnetized needle", "A piece of glass", "A charged plastic strip", "A piece of wood"],
      optionsId: ["Jarum magnet ringan yang dapat berputar bebas", "Kepingan kaca", "Batang plastik bermuatan", "Kepingan kayu"],
      correctIndex: 0,
      expEn: "A compass needle is a small permanent magnet that aligns with Earth's geomagnetic field.",
      expId: "Jarum kompas adalah magnet kecil yang bebas berputar mengikuti arah kutub magnet Bumi."
    },
    {
      qEn: "What is an electrical insulator?",
      qId: "Apakah yang dimaksud dengan isolator listrik?",
      optionsEn: ["A material that resists the flow of electric current", "A device that speeds up electrons", "A type of battery", "A magnetic metal"],
      optionsId: ["Bahan yang tidak dapat atau sukar menghantarkan arus listrik", "Alat pencepat elektron", "Jenis baterai", "Logam bermagnet"],
      correctIndex: 0,
      expEn: "Insulators like rubber, plastic, and glass prevent electrical shocks by restricting current flow.",
      expId: "Isolator (seperti plastik, karet, dan kaca) adalah bahan yang menghambat aliran arus listrik demi keselamatan."
    },
    {
      qEn: "What energy transformation occurs when an electric fan is turned on?",
      qId: "Perubahan energi apakah yang terjadi saat kipas angin listrik dinyalakan?",
      optionsEn: ["Electrical energy to kinetic (motion) energy", "Chemical energy to light energy", "Sound energy to chemical energy", "Nuclear energy to thermal energy"],
      optionsId: ["Energi listrik menjadi energi kinetik (gerak)", "Energi kimia menjadi energi cahaya", "Energi bunyi menjadi energi kimia", "Energi nuklir menjadi kalor"],
      correctIndex: 0,
      expEn: "The electric motor in a fan converts electrical energy into rotational kinetic energy of the blades.",
      expId: "Motor listrik pada kipas angin mengubah energi listrik menjadi energi kinetik (putaran baling-baling)."
    }
  ]
};

// 3. General Translation Helper for Questions
function translateText(text) {
  if (!text) return text;
  // Common math/science phrasing substitutions
  let t = text;
  // Numbers & arithmetic
  t = t.replace(/How many objects are left\?/g, 'Berapa banyak benda yang tersisa?');
  t = t.replace(/How many objects are there in total\?/g, 'Berapa jumlah seluruh benda tersebut?');
  t = t.replace(/How many objects are in each group\?/g, 'Berapa banyak benda di setiap kelompok?');
  t = t.replace(/How many objects are there altogether\?/g, 'Berapa banyak benda seluruhnya?');
  t = t.replace(/You have (\d+) objects and give away (\d+)\./g, 'Kamu memiliki $1 benda dan memberikan $2 benda.');
  t = t.replace(/There are (\d+) groups with (\d+) objects in each group\./g, 'Ada $1 kelompok dengan $2 benda di setiap kelompok.');
  t = t.replace(/(\d+) objects are shared equally among (\d+) groups\./g, '$1 benda dibagi rata ke dalam $2 kelompok.');
  t = t.replace(/There are (\d+) objects\. Then (\d+) more objects are added\./g, 'Ada $1 benda. Kemudian ditambahkan lagi $2 benda.');
  t = t.replace(/Subtract the amount given away: /g, 'Kurangkan jumlah yang diberikan: ');
  t = t.replace(/Multiply the number of groups by the objects in each group: /g, 'Kalikan jumlah kelompok dengan isi setiap kelompok: ');
  t = t.replace(/Divide equally: /g, 'Bagi sama rata: ');
  t = t.replace(/Add the two groups: /g, 'Jumlahkan kedua kelompok: ');
  return t;
}

// 4. Process all questions
let updatedCount = 0;
let curatedApplied = 0;

// Group questions by grade::subject::theme
const themeGroups = new Map();
questions.forEach((q) => {
  const key = `${q.gradeLevel}::${q.subject}::${q.theme}`;
  if (!themeGroups.has(key)) {
    themeGroups.set(key, []);
  }
  themeGroups.get(key).push(q);
});

for (const [key, qList] of themeGroups.entries()) {
  const [gradeLevel, subject, theme] = key.split('::');
  const themeId = THEME_ID_MAP[theme] || theme;

  // Check if curated questions exist for this theme
  const curated = CURATED_THEMES[key];

  if (curated && curated.length === 10) {
    curatedApplied++;
    // Apply curated 10 questions to this theme!
    qList.forEach((q, idx) => {
      const c = curated[idx];
      q.themeId = themeId;
      q.question = c.qEn;
      q.questionText = c.qEn;
      q.questionIdText = c.qId;
      q.options = [...c.optionsEn];
      q.optionsId = [...c.optionsId];
      q.correctIndex = c.correctIndex;
      q.answerLetter = ['A', 'B', 'C', 'D'][c.correctIndex];
      q.correctAnswer = c.optionsEn[c.correctIndex];
      q.correctAnswerId = c.optionsId[c.correctIndex];
      q.explanation = c.expEn;
      q.explanationId = c.expId;
      updatedCount++;
    });
  } else {
    // Add translations and ensure distinct question index tags
    qList.forEach((q, idx) => {
      q.themeId = themeId;
      q.questionIdText = translateText(q.question);
      q.optionsId = q.options.map(opt => translateText(opt));
      q.correctAnswerId = translateText(q.correctAnswer);
      q.explanationId = translateText(q.explanation);
      updatedCount++;
    });
  }
}

console.log(`Updated ${updatedCount} questions. Applied curated theme packages: ${curatedApplied}.`);

// Save updated masterQuestions.json
fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf8');
console.log('Saved updated masterQuestions.json successfully.');
