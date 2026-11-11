function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return { qEn, qId, optionsEn, optionsId, correctIndex: correctIdx, expEn, expId };
}

const packs = {};

// ==========================================
// SMP 3 ICT (4 themes)
// ==========================================
packs['smp-3::ict::Databases and Information Management'] = [
  makeQ(
    "What specialized programming language is standardly used to query, manage, and manipulate relational databases?",
    "Bahasa komputer standar apakah yang digunakan untuk membuat kueri, mengelola, dan memanipulasi data pada basis data relasional?",
    ["SQL (Structured Query Language)", "HTML", "CSS", "Assembly"],
    ["SQL (Structured Query Language)", "HTML", "CSS", "Assembly"],
    0,
    "SQL is the domain-specific standard for querying and modifying tabular relational database schemas.",
    "SQL adalah bahasa standar untuk berinteraksi dengan sistem manajemen basis data relasional (RDBMS)."
  ),
  makeQ(
    "In relational database design, what is a 'Primary Key'?",
    "Dalam perancangan tabel basis data relasional, apakah yang dimaksud dengan 'Primary Key' (Kunci Utama)?",
    ["A column or set of columns containing strictly unique non-null values that identify each row in a table", "The password used to unlock the computer", "A random number that changes every second", "A decorative text label"],
    ["Kolom khusus yang nilainya dijamin unik dan tidak boleh kosong (NOT NULL) untuk mengidentifikasi setiap baris rekaman secara tunggal", "Kata sandi masuk komputer", "Angka acak yang selalu berubah", "Label judul hiasan"],
    0,
    "Primary keys enforce entity integrity, guaranteeing each record can be uniquely addressed and linked.",
    "Primary Key berfungsi sebagai tanda pengenal unik bagi setiap baris rekaman sehingga tidak ada duplikasi data."
  ),
  makeQ(
    "Which SQL statement is used to retrieve data from one or more database tables?",
    "Perintah SQL manakah yang digunakan untuk mengambil atau menampilkan data dari tabel basis data?",
    ["SELECT", "UPDATE", "INSERT INTO", "DROP TABLE"],
    ["SELECT", "UPDATE", "INSERT INTO", "DROP TABLE"],
    0,
    "The SELECT statement extracts specified fields from tables, often filtered by a WHERE clause.",
    "Perintah SELECT digunakan untuk memilih dan menampilkan kolom rekaman dari tabel basis data."
  ),
  makeQ(
    "In relational database modeling, what is a 'Foreign Key' used for?",
    "Apakah fungsi dari 'Foreign Key' (Kunci Asing / Kunci Tamu) dalam tabel basis data relasional?",
    ["To establish a link between data in two tables by referencing the primary key of another table", "To translate database records into foreign languages", "To encrypt user bank accounts", "To delete the database automatically"],
    ["Menghubungkan relasi antara dua tabel dengan mereferensikan primary key dari tabel induk", "Menerjemahkan data ke bahasa asing", "Mengenkripsi rekening perbankan", "Menghapus basis data"],
    0,
    "Foreign keys enforce referential integrity between child tables and parent table primary keys.",
    "Foreign key menciptakan relasi antar-tabel dan memastikan data anak selalu memiliki acuan yang sah pada tabel induk."
  ),
  makeQ(
    "What does the database acronym DBMS stand for?",
    "Apakah kepanjangan dari singkatan istilah sistem basis data DBMS?",
    ["Database Management System", "Data Binary Memory Storage", "Digital Byte Machine Service", "Direct Block Multiplex Switch"],
    ["Database Management System (Sistem Manajemen Basis Data)", "Data Binary Memory Storage", "Digital Byte Machine Service", "Direct Block Multiplex Switch"],
    0,
    "A DBMS (e.g. PostgreSQL, MySQL, SQLite) provides administrative, querying, and storage interfaces for data.",
    "DBMS adalah perangkat lunak yang mengelola penyimpanan, pengambilan, dan keamanan basis data."
  ),
  makeQ(
    "What database design process organizes table attributes to eliminate duplicate redundant data and prevent update anomalies?",
    "Proses perancangan basis data yang bertujuan menghilangkan redundansi (duplikasi data) dan mencegah anomali pembaruan disebut?",
    ["Normalization (Normalisasi basis data: 1NF, 2NF, 3NF)", "Serialization", "Fragmentation", "Decryption"],
    ["Normalisasi (Database Normalization: 1NF, 2NF, 3NF)", "Serialisasi", "Fragmentasi", "Dekripsi"],
    0,
    "Normalization decomposes tables to ensure data dependencies are logical and avoid wasteful redundancy.",
    "Normalisasi menyusun struktur tabel secara sistematis agar data efisien, konsisten, dan bebas dari anomali data."
  ),
  makeQ(
    "In the SQL command: SELECT name FROM students WHERE score >= 80; what does the WHERE clause do?",
    "Pada perintah SQL: SELECT nama FROM siswa WHERE nilai >= 80; apakah fungsi dari klausa WHERE tersebut?",
    ["It filters rows, returning only records that meet the condition (score of 80 or higher)", "It calculates the average of all grades", "It deletes students with scores over 80", "It renames the table to score"],
    ["Menyaring baris rekaman sehingga hanya menampilkan siswa yang memenuhi kriteria nilai 80 ke atas", "Menghitung rata-rata nilai siswa", "Menghapus siswa yang bernilai 80", "Mengganti nama tabel menjadi score"],
    0,
    "The WHERE clause specifies boolean filtering criteria for records retrieved by queries.",
    "Klausa WHERE digunakan untuk menyaring (filter) baris data yang ingin diambil sesuai kriteria logis."
  ),
  makeQ(
    "What ACID property in database transactions guarantees that all operations in a transaction complete successfully, or all are rolled back?",
    "Prinsip integritas transaksi basis data (ACID) manakah yang menjamin seluruh tahapan transaksi harus sukses bersama atau dibatalkan total jika ada kegagalan?",
    ["Atomicity (Atomisitas - all or nothing)", "Consistency", "Isolation", "Durability"],
    ["Atomisitas (Atomicity - semua tuntas atau batal seluruhnya)", "Konsistensi (Consistency)", "Isolasi (Isolation)", "Daya tahan (Durability)"],
    0,
    "Atomicity ensures transactions are indivisible: partial commits cannot leave databases in corrupted states.",
    "Prinsip Atomicity memastikan transaksi perbankan atau basis data berjalan utuh; bila satu langkah gagal, seluruh transaksi di-rollback."
  ),
  makeQ(
    "What type of modern databases (like MongoDB or Redis) store unstructured or semi-structured data using documents or key-value pairs instead of tables?",
    "Jenis basis data modern (seperti MongoDB atau Redis) yang menyimpan data dokumen tanpa skema tabel kaku disebut?",
    ["NoSQL database (Non-relational database)", "Flat-file magnetic tape", "Relational calculus engine", "Linear punchcard array"],
    ["Basis data NoSQL (Non-relational)", "Pita magnetik flat-file", "Kalkulus relasional", "Larik kartu berlubang"],
    0,
    "NoSQL databases provide flexible schema-less structures (documents, key-value, graph) for horizontal scalability.",
    "Basis data NoSQL menyimpan data dalam format dokumen JSON atau pasangan key-value yang fleksibel untuk data berskala masif."
  ),
  makeQ(
    "What database structure is built on table columns (similar to an index in a textbook) to drastically speed up search queries?",
    "Struktur data tambahan apakah yang dibuat pada kolom tabel untuk mempercepat proses pencarian kueri rekaman?",
    ["Index (Indeks basis data / B-Tree index)", "Trigger", "Stored procedure", "Cursor"],
    ["Indeks (Database Index / Indeks B-Tree)", "Pemicu (Trigger)", "Prosedur tersimpan", "Kursor"],
    0,
    "Database indexes use balanced trees (B-trees) or hashes to look up records in logarithmic time without full table scans.",
    "Indeks basis data memungkinkan mesin mencari data secara cepat tanpa harus memindai seluruh jutaan baris tabel dari awal."
  )
];

packs['smp-3::ict::Networks, Protocols, and Internet Services'] = [
  makeQ(
    "How many layers comprise the theoretical Open Systems Interconnection (OSI) network reference model?",
    "Berapa lapiskah (layer) yang menyusun model referensi jaringan komputer OSI (Open Systems Interconnection)?",
    ["7 layers", "4 layers", "5 layers", "10 layers"],
    ["7 lapisan (7 Layers)", "4 lapisan", "5 lapisan", "10 lapisan"],
    0,
    "The 7 OSI layers: Physical, Data Link, Network, Transport, Session, Presentation, Application.",
    "Model OSI terdiri atas 7 lapisan: Fisik, Data Link, Network, Transport, Session, Presentation, dan Application."
  ),
  makeQ(
    "Which transport protocol provides reliable, ordered, error-checked delivery of packets via a three-way handshake?",
    "Protokol pada lapisan transport manakah yang menjamin pengiriman paket data yang andal, berurutan, dan bebas galat melalui mekanisme 3-way handshake?",
    ["TCP (Transmission Control Protocol)", "UDP (User Datagram Protocol)", "ICMP", "ARP"],
    ["TCP (Transmission Control Protocol)", "UDP (User Datagram Protocol)", "ICMP", "ARP"],
    0,
    "TCP establishes connections, verifies acknowledgments, and retransmits lost packets reliably.",
    "TCP melakukan pengecekan penerimaan (acknowledgment) dan mengurutkan kembali paket data agar utuh tanpa ada yang hilang."
  ),
  makeQ(
    "Which transport protocol is connectionless and prioritizes minimal latency over reliability, making it ideal for live streaming and online gaming?",
    "Protokol transport manakah yang bersifat connectionless dan mengutamakan kecepatan tanpa menunggu konfirmasi penerimaan sehingga ideal untuk game online dan live video?",
    ["UDP (User Datagram Protocol)", "TCP", "SSH", "FTP"],
    ["UDP (User Datagram Protocol)", "TCP", "SSH", "FTP"],
    0,
    "UDP transmits datagrams without handshake delays or retransmission overhead, favoring speed over perfection.",
    "UDP mengirimkan data dengan cepat tanpa retransmisi paket rusak sehingga cocok untuk panggilan suara dan game online."
  ),
  makeQ(
    "What network service protocol automatically assigns IP addresses, subnet masks, and default gateways to client devices joining a network?",
    "Protokol jaringan apakah yang secara otomatis memberikan konfigurasi alamat IP, subnet mask, dan gateway ke perangkat yang baru tersambung?",
    ["DHCP (Dynamic Host Configuration Protocol)", "DNS", "SNMP", "NTP"],
    ["DHCP (Dynamic Host Configuration Protocol)", "DNS", "SNMP", "NTP"],
    0,
    "DHCP servers lease dynamic IP addresses from a managed pool without requiring manual static network setups.",
    "DHCP mengalokasikan alamat IP secara otomatis kepada gawai pengguna sehingga tidak perlu pengaturan manual."
  ),
  makeQ(
    "What protocol is standardly used by network administrators to establish secure, encrypted command-line remote terminal sessions?",
    "Protokol terminal jarak jauh terenkripsi aman apakah yang digunakan administrator untuk mengelola server dari jarak jauh?",
    ["SSH (Secure Shell)", "Telnet", "HTTP", "POP3"],
    ["SSH (Secure Shell)", "Telnet", "HTTP", "POP3"],
    0,
    "SSH replaces unencrypted Telnet, securing remote logins and administrative shells using public-key cryptography.",
    "SSH mengenkripsi seluruh sesi login dan perintah terminal sehingga aman dari penyadapan lalu lintas jaringan."
  ),
  makeQ(
    "In the Client-Server internet architecture model, what is the role of the 'Server'?",
    "Dalam model arsitektur internet Klien-Server, apakah peran utama dari komputer 'Server'?",
    ["To host central resources, listen for incoming client network requests, and serve requested data responses", "To display images on the user's desk", "To turn on user monitors", "To operate keyboard keys"],
    ["Menyediakan sumber daya terpusat, memproses permintaan dari klien, dan mengirimkan kembali data respon yang diminta", "Menampilkan gambar di layar meja", "Menyalakan monitor klien", "Menekan tombol keyboard"],
    0,
    "Servers provide centralized services (web, database, files) upon requests received from distributed clients.",
    "Server adalah komputer pusat berkemampuan tinggi yang melayani permintaan data dari banyak perangkat klien secara bersamaan."
  ),
  makeQ(
    "What cloud computing deployment model delivers complete software applications over the internet to end users on a subscription basis (like Google Docs or Microsoft 365)?",
    "Model layanan komputasi awan (Cloud Computing) yang menyediakan aplikasi siap pakai lewat peramban web (seperti Google Docs atau Canva) disebut?",
    ["Software as a Service (SaaS)", "Infrastructure as a Service (IaaS)", "Platform as a Service (PaaS)", "Bare metal hosting"],
    ["Software as a Service (SaaS / Perangkat Lunak sebagai Layanan)", "Infrastructure as a Service (IaaS)", "Platform as a Service (PaaS)", "Hosting perangkat keras murni"],
    0,
    "SaaS delivers turnkey cloud-hosted applications accessible via web browsers without local installation.",
    "SaaS memungkinkan pengguna langsung memakai aplikasi melalui internet tanpa perlu menginstal atau memikirkan pemeliharaan server."
  ),
  makeQ(
    "What email retrieval protocol downloads messages from the mail server to a local device and standardly deletes them from the server?",
    "Protokol surat elektronik yang mengunduh pesan email ke komputer lokal dan secara standar menghapusnya dari server adalah?",
    ["POP3 (Post Office Protocol version 3)", "IMAP", "SMTP", "DNS"],
    ["POP3 (Post Office Protocol)", "IMAP", "SMTP", "DNS"],
    0,
    "POP3 downloads inbox messages to a single client, whereas IMAP synchronizes folders bidirectionally across devices.",
    "POP3 mengunduh email ke satu perangkat lokal, berbeda dengan IMAP yang menyinkronkan email di semua gawai secara online."
  ),
  makeQ(
    "What protocol is universally used by email servers to SEND and relay outgoing emails across the Internet?",
    "Protokol komunikasi standar apakah yang digunakan untuk MENGIRIMKAN surat elektronik (email) keluar melintasi jaringan internet?",
    ["SMTP (Simple Mail Transfer Protocol)", "POP3", "IMAP", "FTP"],
    ["SMTP (Simple Mail Transfer Protocol)", "POP3", "IMAP", "FTP"],
    0,
    "SMTP handles outgoing mail transmission between client agents and Mail Transfer Agents (MTAs).",
    "SMTP adalah protokol khusus untuk mengirim dan meneruskan pesan email antar server surat di internet."
  ),
  makeQ(
    "What is the function of a Content Delivery Network (CDN) on the global Internet?",
    "Apakah fungsi dari jaringan pengiriman konten CDN (Content Delivery Network) di internet global?",
    ["To cache web static assets on geographically distributed edge servers near users, accelerating loading speeds", "To print physical paper brochures", "To increase website latency", "To stop search engines from indexing pages"],
    ["Menyimpan salinan berkas web di jaringan server tepi (edge) yang tersebar di seluruh dunia agar situs memuat lebih cepat", "Mencetak selebaran kertas", "Memperlambat koneksi situs", "Memblokir mesin pencari"],
    0,
    "CDNs store cached copies of media closer to end-users geographically, slashing latency and server loads.",
    "CDN menyebarkan salinan cache gambar dan skrip web ke server terdekat dengan lokasi pengunjung untuk mempercepat waktu buka halaman."
  )
];

packs['smp-3::ict::Programming and Problem Solving'] = [
  makeQ(
    "What fundamental data structure organizes items in a Last-In, First-Out (LIFO) order?",
    "Struktur data dasar apakah yang menerapkan mekanisme pengurutan LIFO (Last-In, First-Out / Terakhir Masuk, Pertama Keluar)?",
    ["Stack (Tumpukan)", "Queue (Antrean)", "Binary Search Tree", "Linked list"],
    ["Stack (Tumpukan)", "Queue (Antrean)", "Pohon Biner (Binary Tree)", "Linked List"],
    0,
    "A Stack operates like a stack of plates: push adds to the top, and pop removes from the top (LIFO).",
    "Struktur Stack bekerja seperti tumpukan buku; elemen yang terakhir ditambahkan akan menjadi yang pertama diambil (LIFO)."
  ),
  makeQ(
    "What data structure operates on a First-In, First-Out (FIFO) principle, where the first element added is the first removed?",
    "Struktur data manakah yang menerapkan prinsip FIFO (First-In, First-Out / Pertama Masuk, Pertama Keluar)?",
    ["Queue (Antrean)", "Stack", "Binary Heap", "Hash map"],
    ["Queue (Antrean)", "Stack (Tumpukan)", "Binary Heap", "Hash Map"],
    0,
    "A Queue processes items in arrival order (FIFO), as in customer service lines or print spoolers.",
    "Queue bekerja persis seperti antrean tiket: elemen yang pertama datang akan dilayani dan keluar paling awal (FIFO)."
  ),
  makeQ(
    "What algorithmic problem-solving approach solves a problem by defining a function that calls itself with smaller sub-problems?",
    "Teknik pemecahan masalah dalam pemrograman di mana sebuah fungsi memanggil dirinya sendiri untuk menyelesaikan sub-masalah yang lebih kecil disebut?",
    ["Recursion (Rekursi)", "Linear iteration only", "Infinite caching", "Hardcoded indexing"],
    ["Rekursi (Recursion)", "Iterasi linier saja", "Caching permanen", "Pengindeksan statis"],
    0,
    "Recursion breaks problems into base cases and self-referential steps (e.g. calculating factorials or tree traversals).",
    "Fungsi rekursif memanggil dirinya sendiri secara berulang dengan parameter yang semakin mengecil hingga mencapai kondisi dasar (base case)."
  ),
  makeQ(
    "What is the average time complexity of searching a sorted array of N elements using the Binary Search algorithm?",
    "Berapakah kompleksitas waktu (Big O) dari algoritma Binary Search saat mencari data pada larik terurut berisi N elemen?",
    ["O(log N)", "O(N)", "O(N^2)", "O(1)"],
    ["O(log N)", "O(N)", "O(N^2)", "O(1)"],
    0,
    "Binary search halves the search space each step, achieving logarithmic O(log N) time.",
    "Binary search membagi dua ruang pencarian pada setiap tahap sehingga membutuhkan waktu efisien O(log N)."
  ),
  makeQ(
    "Which sorting algorithm repeatedly compares adjacent elements and swaps them if they are in the wrong order?",
    "Algoritma pengurutan data manakah yang bekerja dengan cara membandingkan elemen yang bersebelahan dan menukarnya jika urutannya keliru?",
    ["Bubble Sort", "Merge Sort", "Quick Sort", "Radix Sort"],
    ["Bubble Sort (Pengurutan Gelembung)", "Merge Sort", "Quick Sort", "Radix Sort"],
    0,
    "Bubble sort bubbles larger elements to the end through sequential pairwise swaps (O(N^2) time).",
    "Bubble Sort membandingkan pasangan elemen yang berdampingan dan menukarnya hingga seluruh deret terurut rapi."
  ),
  makeQ(
    "In Object-Oriented Programming (OOP), what is a 'Class'?",
    "Dalam paradigma Pemrograman Berorientasi Objek (PBO / OOP), apakah yang dimaksud dengan 'Class'?",
    ["A blueprint or template defining the attributes (data) and methods (behavior) of objects", "A physical room with school chairs", "An active running process in the CPU", "A printed error report"],
    ["Cetak biru (blueprint) atau templat yang mendefinisikan atribut data dan fungsi metode dari suatu objek", "Ruang kelas fisik", "Proses aktif di CPU", "Laporan kesalahan cetak"],
    0,
    "A class serves as an extensible blueprint from which individual concrete object instances are instantiated.",
    "Class adalah cetak biru rancangan objek yang memuat variabel (atribut) dan fungsi (metode) bersama."
  ),
  makeQ(
    "What OOP concept refers to bundling data fields and methods together while restricting direct outside access to internal state?",
    "Konsep OOP manakah yang membungkus data dan metode ke dalam satu unit serta membatasi akses langsung dari luar demi keamanan data?",
    ["Encapsulation (Enkapsulasi)", "Inheritance", "Polymorphism", "Abstraction"],
    ["Enkapsulasi (Encapsulation)", "Pewarisan (Inheritance)", "Polimorfisme (Polymorphism)", "Abstraksi"],
    0,
    "Encapsulation hides internal object states behind public getter and setter accessors.",
    "Enkapsulasi menyembunyikan detail implementasi internal objek sehingga data terlindungi dari manipulasi langsung yang tidak sah."
  ),
  makeQ(
    "What OOP concept allows a child subclass to inherit attributes and methods from an existing parent superclass?",
    "Prinsip OOP apakah yang memungkinkan sebuah kelas turunan mewarisi sifat dan fungsi dari kelas induknya?",
    ["Inheritance (Pewarisan sifat)", "Encapsulation", "Compilation", "Garbage collection"],
    ["Pewarisan sifat (Inheritance)", "Enkapsulasi", "Kompilasi", "Pembersihan memori"],
    0,
    "Inheritance allows derivative classes to reuse and extend methods and properties of base parent classes.",
    "Inheritance memungkinkan kelas baru menyerap seluruh properti dan metode dari kelas yang sudah ada tanpa menulis ulang kode."
  ),
  makeQ(
    "What is the output of the logical expression: NOT (True AND False)?",
    "Apakah hasil evaluasi dari ekspresi logika berikut: NOT (True AND False)?",
    ["True", "False", "Error", "Undefined"],
    ["True (Benar)", "False (Salah)", "Error", "Tidak terdefinisi"],
    0,
    "True AND False evaluates to False. Then NOT False inverts to True.",
    "(True AND False) bernilai False. Operasi NOT membalik nilai False menjadi True (Benar)."
  ),
  makeQ(
    "What computational principle breaks a complex problem down into smaller, more manageable sub-problems?",
    "Prinsip berpikir komputasional (Computational Thinking) yang memecah masalah besar dan rumit menjadi bagian-bagian kecil yang lebih mudah diselesaikan disebut?",
    ["Decomposition (Dekomposisi)", "Pattern Recognition", "Abstraction", "Algorithm design"],
    ["Dekomposisi (Decomposition)", "Pengenalan Pola", "Abstraksi", "Perancangan Algoritma"],
    0,
    "Decomposition partitions large problems into independently solvable modular components.",
    "Dekomposisi adalah strategi membagi permasalahan kompleks menjadi sub-masalah sederhana agar dapat dianalisis dan diselesaikan bertahap."
  )
];

packs['smp-3::ict::AI, Digital Ethics, and Information Evaluation'] = [
  makeQ(
    "What branch of computer science focuses on building systems capable of performing tasks that traditionally require human intelligence?",
    "Cabang ilmu komputer yang berfokus menciptakan sistem cerdas yang mampu melakukan tugas-tugas yang membutuhkan kecerdasan manusia disebut?",
    ["Artificial Intelligence (AI / Kecerdasan Buatan)", "Quantum mechanics", "Telecommunications hardware", "Analog printing"],
    ["Kecerdasan Buatan (Artificial Intelligence / AI)", "Mekanika kuantum", "Perangkat keras telekomunikasi", "Percetakan analog"],
    0,
    "Artificial Intelligence develops algorithms capable of perception, reasoning, decision-making, and natural language understanding.",
    "Kecerdasan Buatan (AI) memungkinkan mesin belajar dari data, mengenali pola, memecahkan masalah, dan meniru fungsi kognitif manusia."
  ),
  makeQ(
    "What subfield of AI trains mathematical models on large datasets so computers can learn and improve from experience without explicit hand-coded rules?",
    "Bagian dari kecerdasan buatan di mana komputer mempelajari pola dari sejumlah besar data tanpa harus diprogram secara manual disebut?",
    ["Machine Learning (Pembelajaran Mesin)", "Hardcoded scripting", "Manual compilation", "Database defragmentation"],
    ["Pembelajaran Mesin (Machine Learning / ML)", "Skrip aturan kaku", "Kompilasi manual", "Defragmentasi data"],
    0,
    "Machine Learning algorithms (supervised, unsupervised, reinforcement) optimize parameters empirically from training data.",
    "Machine Learning menggunakan algoritma statistik untuk melatih model komputer agar dapat membuat prediksi berdasarkan data masa lalu."
  ),
  makeQ(
    "What ethical risk occurs when an AI model makes unfair or discriminatory decisions due to historical prejudices in its training data?",
    "Risiko etika apakah yang timbul ketika sistem AI menghasilkan keputusan yang tidak adil atau diskriminatif akibat data pelatihan yang tidak seimbang?",
    ["Algorithmic Bias (Bias Algoritma)", "System overclock", "Memory leak", "Hardware degradation"],
    ["Bias Algoritma (Algorithmic Bias)", "Overclock sistem", "Kebocoran memori", "Penurunan kualitas perangkat keras"],
    0,
    "Algorithmic bias reflects systemic human disparities and sample imbalances present in training corpora.",
    "Bias algoritma terjadi saat model AI mewarisi prasangka atau ketimpangan yang ada pada data latihan sehingga merugikan kelompok tertentu."
  ),
  makeQ(
    "What term describes hyper-realistic synthetic media (videos, audio, or images) generated by deep generative AI models to depict people doing things they never did?",
    "Konten video atau audio tiruan hiper-realistis yang dibuat menggunakan kecerdasan buatan untuk memanipulasi wajah atau suara seseorang disebut?",
    ["Deepfake", "Bitmap screenshot", "Vector icon", "Podcast clip"],
    ["Deepfake", "Tangkapan layar bitmap", "Ikon vektor", "Klip rekaman asli"],
    0,
    "Deepfakes use Generative Adversarial Networks (GANs) and diffusion models to forge convincing counterfeit likenesses.",
    "Deepfake memanfaatkan kecerdasan buatan untuk merekayasa video dan suara tiruan yang tampak sangat meyakinkan demi tujuan manipulasi."
  ),
  makeQ(
    "What critical evaluation method helps internet users verify digital information by searching across multiple independent authoritative sources?",
    "Metode evaluasi kritis apakah yang dilakukan pengguna internet untuk memverifikasi kebenaran informasi dengan membuka banyak sumber berita terpercaya lain?",
    ["Lateral Reading / Fact-Checking (Membaca Lateral / Cek Fakta)", "Believing the first social media post", "Sharing rumors immediately", "Relying on font color"],
    ["Membaca Lateral / Cek Fakta (Lateral Reading / Fact-Checking)", "Langsung mempercayai unggahan pertama di media sosial", "Menyebarkan kabar burung seketika", "Menilai berita dari warna teks"],
    0,
    "Lateral reading opens new browser tabs to investigate the credibility, funding, and consensus regarding a source.",
    "Membaca lateral adalah kebiasaan membuka tab baru untuk membandingkan klaim berita dengan sumber-sumber resmi terpercaya."
  ),
  makeQ(
    "What legal framework protects the exclusive rights of creators over their original intellectual, artistic, and software works?",
    "Hukum perlindungan apakah yang memberikan hak eksklusif kepada pencipta atas karya seni, tulisan, dan perangkat lunak ciptaannya?",
    ["Copyright (Hak Cipta / Intellectual Property)", "Domain registration", "Browser cookie", "Traffic bandwidth"],
    ["Hak Cipta (Copyright / Hak Kekayaan Intelektual)", "Registrasi domain", "Cookie peramban", "Bandwidth jaringan"],
    0,
    "Copyright grants authors exclusive legal privileges to reproduce, adapt, and distribute their creative expressions.",
    "Hak cipta melindungi karya intelektual orisinal pencipta dari plagiarisme dan penggandaan tanpa izin."
  ),
  makeQ(
    "What is 'Plagiarism' in academic and professional contexts?",
    "Apakah yang dimaksud dengan 'Plagiarisme' dalam dunia akademis dan kepenulisan digital?",
    ["Using someone else's work, ideas, or words and presenting them as one's own without proper citation", "Citing sources properly in a bibliography", "Writing original essays", "Reading public library books"],
    ["Mengambil karya, tulisan, atau ide orang lain dan mengakuinya sebagai karya sendiri tanpa mencantumkan sumber rujukan", "Mencantumkan daftar pustaka secara jujur", "Menulis karangan sendiri", "Membaca buku perpustakaan"],
    0,
    "Plagiarism is ethical misconduct involving appropriating intellectual property without attribution.",
    "Plagiarisme adalah tindakan tidak terpuji yang menjiplak karya orang lain tanpa menyebutkan sumber aslinya secara sah."
  ),
  makeQ(
    "What digital footprint risk is associated with oversharing personal geolocation data and home addresses on social media?",
    "Bahaya privasi apakah yang dapat terjadi akibat kebiasaan mengunggah foto lokasi real-time dan alamat rumah secara berlebihan di media sosial?",
    ["Doxxing, stalking, and identity theft risks", "Improved Wi-Fi speeds", "Free cloud storage awards", "Faster typing speeds"],
    ["Risiko doxxing, penguntitan (stalking), dan pencurian identitas pribadi", "Kecepatan Wi-Fi meningkat", "Mendapat hadiah kuota", "Mengetik lebih cepat"],
    0,
    "Oversharing PII (Personally Identifiable Information) leaves permanent traces that bad actors can exploit for fraud or harassment.",
    "Penyebaran data pribadi sembarangan memudahkan pelaku kejahatan siber melakukan penipuan identitas atau tindak kejahatan nyata."
  ),
  makeQ(
    "What is the 'Digital Divide' in socioeconomic technology studies?",
    "Apakah yang dimaksud dengan istilah 'Kesenjangan Digital' (Digital Divide) dalam sosiologi teknologi?",
    ["The economic and geographical disparity in access to modern information technologies and high-speed internet", "The physical width of a computer monitor", "The gap between keyboard buttons", "The difference between Mac and Windows"],
    ["Kesenjangan sosial-ekonomi terkait akses terhadap teknologi informasi modern dan koneksi internet cepat", "Lebar fisik layar monitor", "Jarak antara tombol keyboard", "Perbedaan antara sistem Mac dan Windows"],
    0,
    "The digital divide highlights inequities in hardware access, literacy, and broadband connectivity worldwide.",
    "Kesenjangan digital adalah jurang pemisah antara kelompok masyarakat yang memiliki akses internet layak dan mereka yang terisolasi teknologi."
  ),
  makeQ(
    "What international public licensing system (like CC BY-SA) lets creators grant public permissions to share and use their creative work under specified conditions?",
    "Sistem lisensi publik internasional (seperti CC BY-SA) apakah yang memudahkan pencipta memberikan izin pemakaian karyanya secara gratis dengan syarat tertentu?",
    ["Creative Commons (CC Licenses)", "Patented Trade Secret", "Strict NDA", "Top Secret Classification"],
    ["Creative Commons (Lisensi CC)", "Rahasia dagang tertutup", "Perjanjian NDA kaku", "Klasifikasi rahasia negara"],
    0,
    "Creative Commons provides standardized legal tools enabling creators to share copyright-protected works flexibly.",
    "Lisensi Creative Commons memberikan kepastian hukum bagi pencipta untuk membagikan karyanya kepada publik secara terbuka dan etis."
  )
];

module.exports = packs;
