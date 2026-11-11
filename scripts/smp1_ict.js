function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return { qEn, qId, optionsEn, optionsId, correctIndex: correctIdx, expEn, expId };
}

const packs = {};

// ==========================================
// SMP 1 ICT (4 themes)
// ==========================================
packs['smp-1::ict::Computer Components and Operating Systems'] = [
  makeQ(
    "Which central hardware component is often referred to as the 'brain' of the computer, executing program instructions?",
    "Komponen perangkat keras utama manakah yang bertindak sebagai 'otak' komputer untuk menjalankan instruksi program?",
    ["Central Processing Unit (CPU)", "Hard Disk Drive (HDD)", "Power Supply Unit (PSU)", "Graphics card fan"],
    ["Central Processing Unit (CPU / Prosesor)", "Hard Disk Drive (HDD)", "Power Supply Unit (PSU)", "Kipas pendingin"],
    0,
    "The CPU fetches, decodes, and executes software instructions and calculations.",
    "CPU (prosesor) bertugas mengambil, menerjemahkan, dan mengeksekusi instruksi aritmatika dan logika program."
  ),
  makeQ(
    "What is the difference between RAM (Random Access Memory) and storage (such as SSD or HDD)?",
    "Apakah perbedaan utama antara RAM dan media penyimpanan permanen (seperti SSD atau HDD)?",
    ["RAM is volatile temporary working memory; SSD/HDD is non-volatile permanent storage", "RAM saves files permanently when powered off; SSD loses all data", "RAM is only for sound cards; SSD is for keyboards", "There is no functional difference"],
    ["RAM bersifat volatil (sementara saat hidup); SSD/HDD bersifat non-volatil (menyimpan data secara permanen)", "RAM menyimpan file selamanya saat listrik mati; SSD langsung terhapus", "RAM hanya untuk memproses suara", "Keduanya memiliki fungsi yang sama"],
    0,
    "RAM loses contents when power is turned off (volatile); SSDs retain files permanently (non-volatile).",
    "RAM menyimpan data kerja aktif yang hilang saat listrik mati; SSD/HDD menyimpan data secara permanen."
  ),
  makeQ(
    "What is the primary role of an Operating System (OS) such as Windows, Linux, or macOS?",
    "Apakah fungsi utama dari Sistem Operasi (Operating System) seperti Windows, Linux, atau macOS?",
    ["To manage computer hardware resources and provide a platform for application software to run", "To generate electricity for the motherboard", "To browse only one single website", "To clean dust off the processor"],
    ["Mengelola sumber daya perangkat keras dan menyediakan antarmuka bagi aplikasi untuk berjalan", "Menghasilkan daya listrik untuk motherboard", "Hanya untuk membuka satu situs web", "Membersihkan debu dari komponen"],
    0,
    "The OS coordinates memory, processes, files, and hardware I/O for user applications.",
    "Sistem operasi menjadi perantara antara perangkat keras dan aplikasi pengguna, mengelola memori dan berkas."
  ),
  makeQ(
    "What low-level firmware stored in ROM boots the computer hardware during power-on before the OS loads?",
    "Program tingkat rendah yang tersimpan pada chip ROM untuk memeriksa dan menginisialisasi perangkat keras saat komputer dinyalakan adalah?",
    ["BIOS / UEFI", "Web browser", "Spreadsheet application", "Device driver installer"],
    ["BIOS / UEFI", "Peramban web", "Aplikasi pengolah angka", "Program penginstal driver"],
    0,
    "BIOS/UEFI performs the Power-On Self-Test (POST) and initiates booting of the OS kernel.",
    "BIOS/UEFI melakukan pengujian perangkat keras awal (POST) sebelum memuat sistem operasi dari drive."
  ),
  makeQ(
    "Which computer port is universally used today to connect external peripherals like flash drives, mice, and keyboards?",
    "Jenis porta standar yang banyak digunakan saat ini untuk menghubungkan flashdisk, mouse, dan keyboard adalah?",
    ["Universal Serial Bus (USB)", "Parallel LPT port", "VGA analog port", "PS/2 keyboard port"],
    ["Universal Serial Bus (USB)", "Port Paralel LPT", "Port VGA analog", "Port bulat PS/2"],
    0,
    "USB provides a standardized interface for data communications and power delivery to peripherals.",
    "USB adalah standar konektivitas universal untuk komunikasi data dan transfer daya antarperangkat."
  ),
  makeQ(
    "What core component of an operating system manages CPU scheduling, memory allocation, and peripheral access?",
    "Bagian inti terdalam dari sistem operasi yang bertugas mengelola proses CPU, alokasi memori, dan akses perangkat keras disebut?",
    ["Kernel", "Desktop wallpaper", "Taskbar", "Recycle Bin"],
    ["Kernel", "Wallpaper desktop", "Taskbar", "Recycle Bin"],
    0,
    "The OS Kernel has direct control over hardware and manages execution processes securely.",
    "Kernel adalah inti sistem operasi yang mengontrol penuh sumber daya perangkat keras dan penjadwalan proses."
  ),
  makeQ(
    "Why are Solid State Drives (SSDs) significantly faster than traditional Hard Disk Drives (HDDs)?",
    "Mengapa Solid State Drive (SSD) jauh lebih cepat dibandingkan Hard Disk Drive (HDD) mekanik?",
    ["SSDs use flash memory chips with no moving mechanical parts; HDDs use spinning magnetic platters", "SSDs have rotating gears inside", "SSDs are powered by steam", "HDDs do not use electricity"],
    ["SSD menggunakan chip memori flash tanpa komponen mekanis yang berputar; HDD menggunakan piringan magnetik berputar", "SSD memiliki roda gigi di dalamnya", "SSD digerakkan oleh uap", "HDD tidak memakai listrik"],
    0,
    "Flash semiconductors in SSDs provide near-instantaneous random access without mechanical seek delays.",
    "SSD membaca data secara elektronik melalui chip memori silikon, tanpa waktu tunda putaran mekanik seperti HDD."
  ),
  makeQ(
    "What type of software translates user-level device requests into commands specific to a piece of hardware?",
    "Jenis perangkat lunak khusus yang bertindak sebagai penerjemah komunikasi antara sistem operasi dan perangkat keras baru disebut?",
    ["Device Driver (Driver perangkat)", "Antivirus database", "Word processing macro", "Font manager"],
    ["Driver perangkat (Device Driver)", "Basis data antivirus", "Makro pengolah kata", "Manajer font"],
    0,
    "A device driver provides a software interface to specific hardware devices for the OS.",
    "Driver perangkat memungkinkan sistem operasi mengenali dan mengontrol perangkat keras khusus seperti printer atau kartu grafis."
  ),
  makeQ(
    "In OS process management, what is a state where two or more processes cannot proceed because each is waiting for the other's resource?",
    "Kondisi ketika dua atau lebih program komputer terhenti total karena saling menunggu sumber daya yang sedang dikunci satu sama lain disebut?",
    ["Deadlock (Kebuntuan proses)", "Bootstrapping", "Paging", "Overclocking"],
    ["Deadlock (Kebuntuan proses)", "Bootstrapping", "Paging", "Overclocking"],
    0,
    "Deadlock occurs when circular dependency holds mutually exclusive resources indefinitely.",
    "Deadlock adalah kondisi macet total ketika program saling menunggu sumber daya yang tidak kunjung dilepas."
  ),
  makeQ(
    "What hierarchical file system structure is standardly used by operating systems to organize files?",
    "Struktur susunan berkas bertingkat seperti apakah yang digunakan sistem operasi untuk mengorganisasi file pengguna?",
    ["Tree directory structure with folders and subfolders", "Random single list without names", "Circle array with no folders", "Magnetic strip without hierarchy"],
    ["Struktur direktori pohon (Tree) yang tersusun atas folder dan subfolder", "Daftar acak tanpa nama berkas", "Larik lingkaran tanpa folder", "Pita magnetik tanpa hierarki"],
    0,
    "File systems use an inverted tree with a root directory containing files and nested subdirectories.",
    "Sistem berkas menyusun data dalam pohon direktori, dimulai dari direktori akar (root) bercabang ke folder dan berkas."
  )
];

packs['smp-1::ict::Computer Networks and the Internet'] = [
  makeQ(
    "What does the networking acronym LAN stand for?",
    "Apakah kepanjangan dari singkatan istilah jaringan LAN?",
    ["Local Area Network", "Large Amplitude Node", "Logical Access Number", "Linked Android Network"],
    ["Local Area Network (Jaringan Area Lokal)", "Large Amplitude Node", "Logical Access Number", "Linked Android Network"],
    0,
    "A Local Area Network connects computers within a limited geographical area like a school lab or home.",
    "LAN mencakup jaringan komputer pada area geografis terbatas seperti gedung sekolah atau rumah."
  ),
  makeQ(
    "What unique hardware address is permanently assigned to a Network Interface Card (NIC) by its manufacturer?",
    "Alamat fisik perangkat keras unik yang ditanam secara permanen pada kartu jaringan (NIC) oleh pabrik pembuatnya disebut?",
    ["MAC Address (Media Access Control)", "IP Address", "HTTP port", "URL link"],
    ["Alamat MAC (Media Access Control Address)", "Alamat IP", "Port HTTP", "Tautan URL"],
    0,
    "A MAC address is a 48-bit physical identifier burned into network interfaces.",
    "MAC Address adalah nomor identitas fisik unik pada kartu jaringan yang berfungsi pada lapisan data link."
  ),
  makeQ(
    "What networking protocol suite serves as the foundational communication language of the global Internet?",
    "Protokol komunikasi standar apakah yang menjadi fondasi utama pertukaran data di seluruh jaringan Internet global?",
    ["TCP/IP (Transmission Control Protocol / Internet Protocol)", "Bluetooth pairing mode", "MIDI audio stream", "ASCII text protocol"],
    ["TCP/IP (Transmission Control Protocol / Internet Protocol)", "Protokol penyandingan Bluetooth", "Aliran data MIDI", "Protokol teks ASCII"],
    0,
    "TCP/IP governs packet segmentation, routing, and delivery across heterogeneous interconnected networks.",
    "TCP/IP adalah sekumpulan protokol standar yang mengatur pengalamatan, rute, dan transmisi data di internet."
  ),
  makeQ(
    "What is the primary function of a Router in computer networking?",
    "Apakah fungsi utama perangkat Router dalam jaringan komputer?",
    ["To inspect destination IP addresses and forward packets between different interconnected networks", "To print papers over Wi-Fi", "To convert AC electricity into DC", "To display pixels on monitors"],
    ["Memeriksa alamat IP tujuan dan meneruskan paket data antarjaringan komputer yang berbeda", "Mencetak dokumen melalui jaringan", "Mengubah tegangan listrik AC ke DC", "Menampilkan gambar ke layar"],
    0,
    "Routers operate at the Network Layer (Layer 3) to route packets efficiently across networks.",
    "Router bertugas merutekan paket data dari satu jaringan ke jaringan lain berdasarkan alamat IP tujuan."
  ),
  makeQ(
    "What system translates human-friendly web domain names (like www.google.com) into numerical IP addresses (like 142.250.190.46)?",
    "Layanan jaringan apakah yang bertugas menerjemahkan nama domain situs web menjadi alamat IP numerik yang dipahami komputer?",
    ["Domain Name System (DNS)", "Dynamic Host Control", "File Transfer Protocol", "Hypertext Markup"],
    ["Domain Name System (DNS)", "Dynamic Host Control", "File Transfer Protocol", "Hypertext Markup"],
    0,
    "DNS acts as the phonebook of the Internet, resolving domain names into routable IP addresses.",
    "DNS menerjemahkan nama alamat web yang mudah diingat manusia menjadi alamat IP numerik server."
  ),
  makeQ(
    "What is the difference between IPv4 and IPv6 address formats?",
    "Apakah perbedaan utama antara format pengalamatan IPv4 dan IPv6?",
    ["IPv4 uses 32-bit addresses (approx. 4.3 billion); IPv6 uses 128-bit addresses to provide vastly more addresses", "IPv4 is for phones only; IPv6 is for desktop computers", "IPv4 uses letters; IPv6 uses only zeros", "IPv4 is wireless; IPv6 requires copper wires"],
    ["IPv4 menggunakan alamat 32-bit (sekitar 4,3 miliar alamat); IPv6 menggunakan alamat 128-bit untuk kuota tak terbatas", "IPv4 hanya untuk ponsel pintar", "IPv4 menggunakan teks huruf", "IPv4 adalah nirkabel sedangkan IPv6 kabel tembaga"],
    0,
    "IPv6 was created to solve IPv4 address exhaustion, offering 2^128 unique addresses.",
    "IPv6 menggunakan 128 bit yang menyediakan miliaran triliun alamat baru untuk mengatasi kelangkaan alamat IPv4 (32 bit)."
  ),
  makeQ(
    "What network topology connects all devices to one central node (such as a switch), where failure of one cable does not disable the others?",
    "Topologi jaringan manakah yang menghubungkan setiap komputer ke satu konsentrator pusat (seperti switch/hub)?",
    ["Star Topology (Topologi Bintang)", "Bus Topology", "Ring Topology", "Linear Daisy Chain"],
    ["Topologi Star (Bintang)", "Topologi Bus", "Topologi Ring (Cincin)", "Rantai Linier"],
    0,
    "In a star topology, each node connects individually to a central switch, isolating cable faults.",
    "Topologi Star menghubungkan setiap komputer ke konsentrator pusat sehingga putusnya satu kabel tidak mengganggu komputer lain."
  ),
  makeQ(
    "Which application protocol securely encrypts web browsing traffic between client browsers and web servers?",
    "Protokol pada peramban web yang mengenkripsi pertukaran data secara aman menggunakan SSL/TLS disebut?",
    ["HTTPS (Hypertext Transfer Protocol Secure)", "Unencrypted HTTP", "Telnet", "FTP"],
    ["HTTPS (Hypertext Transfer Protocol Secure)", "HTTP biasa", "Telnet", "FTP biasa"],
    0,
    "HTTPS uses TLS/SSL encryption to protect passwords and browsing sessions from eavesdropping.",
    "HTTPS mengamankan komunikasi data di internet dengan enkripsi TLS/SSL sehingga tidak dapat disadap pihak luar."
  ),
  makeQ(
    "What metric measures the maximum data transfer rate of a network connection (typically in Mbps or Gbps)?",
    "Besaran yang mengukur kapasitas laju transfer data maksimal pada suatu koneksi jaringan per satuan waktu adalah?",
    ["Bandwidth (Lebar pita)", "Latency", "Jitter", "Packet loss"],
    ["Bandwidth (Kapasitas lebar pita)", "Latensi", "Jitter", "Packet loss"],
    0,
    "Bandwidth defines data throughput capacity, whereas latency measures transmission round-trip delay.",
    "Bandwidth adalah kapasitas maksimum transfer data per detik (misal Mbps), sedangkan latensi adalah waktu tunda pengiriman."
  ),
  makeQ(
    "What type of network security system monitors incoming and outgoing traffic and blocks unauthorized access based on defined rules?",
    "Sistem keamanan jaringan yang memantau dan menyaring lalu lintas data masuk dan keluar berdasarkan aturan keamanan disebut?",
    ["Firewall", "Sound card equalizer", "Web crawler", "Screen magnifier"],
    ["Firewall (Tembok api)", "Ekualiser suara", "Perayap web", "Kaca pembesar layar"],
    0,
    "A firewall inspects packets and filters out malicious traffic based on security rule sets.",
    "Firewall menyaring paket data internet dan mencegah akses ilegal yang tidak diizinkan masuk ke jaringan komputer."
  )
];

packs['smp-1::ict::Digital Data Representation'] = [
  makeQ(
    "What binary base system does digital computer hardware use at its most fundamental electrical level?",
    "Sistem bilangan berbasis apakah yang digunakan oleh sirkuit digital komputer pada tingkat sinyal listrik paling mendasar?",
    ["Base-2 binary system using only 0 and 1 (low and high voltage states)", "Base-10 decimal system using 0-9", "Base-60 sexagesimal system", "Base-26 alphabet system"],
    ["Sistem bilangan biner basis-2 yang hanya menggunakan angka 0 dan 1 (sinyal tegangan rendah dan tinggi)", "Sistem desimal basis-10", "Sistem seksagesimal basis-60", "Sistem alfabet 26 huruf"],
    0,
    "Digital electronics represent states using transistor off/on thresholds corresponding to bits 0 and 1.",
    "Transistor komputer bekerja sebagai sakelar elektronik yang hanya mengenal dua kondisi: mati (0) dan menyala (1)."
  ),
  makeQ(
    "How many individual bits make up one Byte of digital data?",
    "Berapa banyakkah bit biner yang membentuk 1 Byte data digital?",
    ["8 bits", "4 bits", "10 bits", "16 bits"],
    ["8 bit", "4 bit", "10 bit", "16 bit"],
    0,
    "One byte consists of 8 bits, providing 256 (2^8) possible combinations from 00000000 to 11111111.",
    "Satu Byte terdiri dari 8 bit biner yang dapat merepresentasikan nilai desimal dari 0 hingga 255."
  ),
  makeQ(
    "What is the decimal equivalent of the binary number 1011?",
    "Berapakah nilai desimal dari bilangan biner 1011?",
    ["11", "9", "13", "7"],
    ["11", "9", "13", "7"],
    0,
    "(1 * 8) + (0 * 4) + (1 * 2) + (1 * 1) = 8 + 0 + 2 + 1 = 11.",
    "Nilai biner 1011 = (1×8) + (0×4) + (1×2) + (1×1) = 8 + 0 + 2 + 1 = 11 desimal."
  ),
  makeQ(
    "What character encoding standard uses 7 bits to encode 128 English characters, numerals, and control symbols?",
    "Standar pengkodean teks 7-bit yang memuat 128 karakter huruf Latin, angka, dan tanda baca dasar disebut?",
    ["ASCII (American Standard Code for Information Interchange)", "Unicode UTF-32", "Base64", "Morse Code"],
    ["ASCII (American Standard Code for Information Interchange)", "Unicode UTF-32", "Base64", "Kode Morse"],
    0,
    "ASCII assigns numerical values from 0 to 127 to English characters (e.g., 'A' is 65).",
    "ASCII memetakan karakter huruf ke dalam angka 0–127, di mana huruf 'A' bernilai desimal 65."
  ),
  makeQ(
    "Why was the Unicode (UTF-8) encoding standard developed to replace older 7-bit ASCII standards?",
    "Mengapa standar pengkodean Unicode (seperti UTF-8) dikembangkan untuk menggantikan standar ASCII lama?",
    ["To encode characters, scripts, and emojis from all human languages across the globe into unified codes", "To make computer text files ten times smaller", "To stop people from typing in English", "To speed up computer cooling fans"],
    ["Mendukung seluruh aksara bahasa di dunia (Arab, Mandarin, Jawa, Kanji) dan emoji dalam satu standar terpadu", "Membuat ukuran file teks menjadi lebih kecil", "Mencegah pengetikan dalam bahasa Inggris", "Mempercepat putaran kipas pendingin"],
    0,
    "Unicode provides universal code points for over 150 modern and historical scripts, plus emojis.",
    "Unicode mampu menampung lebih dari 140.000 karakter dari seluruh sistem tulisan di dunia beserta simbol dan emoji."
  ),
  makeQ(
    "In digital color representation, how is a 24-bit True Color RGB pixel composed?",
    "Dalam representasi warna digital, bagaimanakah komposisi dari sebuah piksel 24-bit True Color (RGB)?",
    ["8 bits for Red, 8 bits for Green, and 8 bits for Blue (each 0 to 255)", "24 bits of pure black only", "1 bit for brightness and 23 bits for contrast", "12 bits for sound and 12 bits for color"],
    ["8 bit untuk Merah, 8 bit untuk Hijau, dan 8 bit untuk Biru (masing-masing bernilai 0 hingga 255)", "24 bit warna hitam pekat saja", "1 bit untuk kecerahan dan 23 bit untuk kontras", "12 bit untuk suara dan 12 bit untuk warna"],
    0,
    "24-bit RGB allocates 8 bits per primary color channel, producing 16.7 million (256^3) possible colors.",
    "Sistem RGB 24-bit membagi 8 bit per saluran (Merah, Hijau, Biru) menghasilkan 16,7 juta variasi warna alami."
  ),
  makeQ(
    "What is the hexadecimal number system, and what base does it use?",
    "Apakah yang dimaksud dengan sistem bilangan heksadesimal, dan berapakah basis yang digunakannya?",
    ["Base-16 system using digits 0-9 and letters A-F", "Base-8 system using digits 0-7", "Base-12 system using clock numbers", "Base-20 system using fingers and toes"],
    ["Sistem bilangan basis-16 yang menggunakan angka 0-9 dan huruf A-F", "Sistem basis-8 dengan angka 0-7", "Sistem basis-12", "Sistem basis-20"],
    0,
    "Hexadecimal is base 16: 0-9 represent values 0-9, and A-F represent values 10-15.",
    "Heksadesimal adalah sistem basis 16 di mana angka 0–9 bernilai 0–9, dan huruf A–F bernilai 10–15."
  ),
  makeQ(
    "In digital graphics, what is the fundamental difference between raster (bitmap) images and vector images?",
    "Apakah perbedaan mendasar antara gambar bitmap (raster) dan gambar vektor?",
    ["Raster images are grids of fixed color pixels that lose quality when magnified; Vectors use mathematical paths that scale infinitely without blur", "Vector images always blur when enlarged", "Raster images do not use memory", "There is no difference"],
    ["Raster tersusun dari kisi piksel yang pecah saat diperbesar; Vektor menggunakan rumus garis matematis yang tidak pecah saat dizoom", "Vektor selalu pecah dan buram saat diperbesar", "Raster tidak memerlukan memori", "Keduanya sama saja"],
    0,
    "Bitmaps (JPEG, PNG) store pixel grids; vectors (SVG) store geometric shapes defined by formulas.",
    "Gambar raster (JPEG/PNG) terdiri atas titik piksel tetap; gambar vektor (SVG) dihitung secara matematis sehingga tajam di semua ukuran."
  ),
  makeQ(
    "What type of file compression preserves 100% of the original data so it can be reconstructed perfectly without any loss of quality?",
    "Jenis kompresi data yang memungkinkan seluruh data asli dipulihkan secara sempurna tanpa kehilangan informasi sedikit pun disebut?",
    ["Lossless compression (e.g. ZIP, PNG)", "Lossy compression (e.g. high-compression JPEG)", "Destructive sampling", "Analog conversion"],
    ["Kompresi Lossless (tanpa kehilangan data, contohnya ZIP, PNG)", "Kompresi Lossy (menghapus sebagian data visual)", "Pencuplikan destruktif", "Konversi analog"],
    0,
    "Lossless compression algorithms reduce file redundancy without discarding any bit of original information.",
    "Kompresi lossless mengurangi redundansi data tanpa membuang informasi sedikit pun, sehingga dapat diekstrak kembali utuh."
  ),
  makeQ(
    "What is the decimal value of the hexadecimal number 1F?",
    "Berapakah nilai desimal dari bilangan heksadesimal 1F?",
    ["31", "15", "25", "16"],
    ["31", "15", "25", "16"],
    0,
    "1F in hex = (1 * 16^1) + (15 * 16^0) = 16 + 15 = 31.",
    "Nilai heksadesimal 1F = (1×16) + (F=15×1) = 16 + 15 = 31 desimal."
  )
];

packs['smp-1::ict::Algorithms and Introductory Programming'] = [
  makeQ(
    "What is an algorithm in computer science?",
    "Apakah definisi algoritma dalam ilmu informatika dan komputer?",
    ["A finite, step-by-step sequence of unambiguous instructions designed to solve a specific problem", "A physical chip plugged into a motherboard", "An error found inside electrical wiring", "A password used to unlock computers"],
    ["Urutan langkah-langkah logis dan terhingga yang disusun secara sistematis untuk menyelesaikan masalah", "Chip fisik yang ditancapkan pada papan sirkuit", "Kerusakan korsleting pada kabel", "Kata sandi rahasia untuk membuka komputer"],
    0,
    "An algorithm is a well-defined computational procedure that transforms inputs into outputs in finite steps.",
    "Algoritma adalah serangkaian instruksi terstruktur dan terukur untuk memproses masukan menjadi keluaran yang tepat."
  ),
  makeQ(
    "What programming control structure executes a block of instructions repeatedly while a condition remains true?",
    "Struktur kontrol pemrograman apakah yang menjalankan sekumpulan instruksi secara berulang-ulang selama suatu kondisi terpenuhi?",
    ["Loop (Perulangan - while, for)", "Conditional branch (if-else)", "Variable declaration", "Comment tag"],
    ["Perulangan / Loop (while, for)", "Percabangan kondisi (if-else)", "Deklarasi variabel", "Komentar kode"],
    0,
    "Loops (such as for loops and while loops) iterate over statements until a termination condition is met.",
    "Struktur loop (perulangan) mengulang eksekusi kode berkali-kali secara otomatis berdasarkan syarat tertentu."
  ),
  makeQ(
    "In flowchart diagrams, what geometric shape is universally used to represent a decision or conditional branch?",
    "Dalam diagram alir (flowchart), bentuk geometri apakah yang digunakan untuk melambangkan suatu keputusan atau percabangan logika?",
    ["Diamond (Rhombus / Belah ketupat)", "Rectangle", "Oval (Terminal)", "Parallelogram"],
    ["Belah ketupat (Diamond)", "Persegi panjang", "Bujur sangkar", "Lingkaran penuh"],
    0,
    "A diamond symbol represents a condition testing true/false paths in standard flowchart conventions.",
    "Bentuk belah ketupat dalam bagan alir melambangkan kondisi pengujian dengan dua cabang keluaran (Ya/Tidak)."
  ),
  makeQ(
    "What is a 'variable' in computer programming?",
    "Apakah yang dimaksud dengan 'variabel' dalam bahasa pemrograman?",
    ["A named storage location in memory used to hold data values that can change during execution", "A permanent hardware monitor component", "A programming language that cannot run", "An error message on the screen"],
    ["Tempat penyimpanan bernama di memori komputer untuk menampung nilai data yang dapat berubah selama program berjalan", "Komponen fisik monitor", "Bahasa pemrograman yang tidak bisa dijalankan", "Pesan kesalahan di layar"],
    0,
    "A variable is a symbolic name bound to a memory address storing mutable data values.",
    "Variabel adalah wadah di memori berlabel nama yang menyimpan nilai data yang nilainya dapat dimanipulasi program."
  ),
  makeQ(
    "What data type is best suited to store truth values that can only be either TRUE or FALSE?",
    "Tipe data manakah yang paling tepat digunakan untuk menyimpan nilai logika yang hanya bernilai BENAR atau SALAH?",
    ["Boolean", "Integer", "Floating point string", "Character array"],
    ["Boolean", "Integer (Bilangan bulat)", "Float (Bilangan desimal)", "String teks"],
    0,
    "Boolean data types represent binary logical truth values: True or False.",
    "Tipe data Boolean khusus menyimpan dua kemungkinan nilai logika: True (benar/1) atau False (salah/0)."
  ),
  makeQ(
    "What programming control structure evaluates a condition and selects between different execution paths?",
    "Struktur kendali pemrograman apakah yang memeriksa suatu syarat untuk memilih tindakan yang harus dijalankan?",
    ["Conditional branch (Percabangan if-else)", "Linear sequence only", "Array pointer", "Constant identifier"],
    ["Percabangan kondisi (If-Else)", "Urutan sekuensial lurus", "Penunjuk larik", "Konstanta data"],
    0,
    "If-else statements branch program execution dynamically based on Boolean condition evaluations.",
    "Struktur if-else memungkinkan program mengambil keputusan dan memilih blok kode yang sesuai dengan kondisi yang terjadi."
  ),
  makeQ(
    "What is 'debugging' in software development?",
    "Apakah yang dimaksud dengan proses 'debugging' dalam pengembangan perangkat lunak?",
    ["The process of identifying, tracing, and resolving errors or bugs in computer program code", "Typing code as fast as possible", "Deleting all files from the hard drive", "Selling the software to customers"],
    ["Proses mencari, menelusuri, dan memperbaiki kesalahan (bug) yang terdapat pada kode program komputer", "Mengetik kode secepat mungkin", "Menghapus seluruh file dari harddisk", "Menjual aplikasi ke pengguna"],
    0,
    "Debugging locates root causes of syntax, runtime, and logical defects to ensure correct execution.",
    "Debugging adalah aktivitas menemukan dan membetulkan galat atau cacat kode agar program berjalan normal."
  ),
  makeQ(
    "What type of programming error occurs when code compiles and runs without crashing but produces incorrect answers?",
    "Jenis kesalahan apakah yang terjadi jika program dapat berjalan lancar tanpa macet namun menghasilkan jawaban yang salah?",
    ["Logical error (Bug logika)", "Syntax error", "Compilation error", "Hardware overheating"],
    ["Kesalahan logika (Logic error)", "Kesalahan sintaksis (Syntax error)", "Kesalahan kompilasi", "Kerusakan perangkat keras"],
    0,
    "A logical error represents flawed program reasoning; syntax is valid, but the algorithm produces wrong results.",
    "Kesalahan logika terjadi akibat alur berpikir rumus yang keliru sehingga keluaran program tidak sesuai harapan."
  ),
  makeQ(
    "What is 'pseudocode' commonly used for by programmers before writing actual program syntax?",
    "Apakah fungsi dari 'pseudocode' (kode semu) yang sering ditulis oleh programmer sebelum mengetik kode asli?",
    ["To draft the algorithm in human-readable plain language structured like code, independent of specific languages", "To compile code directly into machine language", "To design graphics and logos", "To encrypt passwords securely"],
    ["Menuliskan rancangan algoritma menggunakan bahasa manusia terstruktur tanpa terikat aturan sintaks bahasa pemrograman tertentu", "Mengubah program menjadi bahasa mesin", "Menggambar logo aplikasi", "Mengamankan kata sandi"],
    0,
    "Pseudocode lets programmers outline logic cleanly without worrying about compiler-specific punctuation.",
    "Pseudocode adalah notasi informal yang menyerupai bahasa pemrograman untuk merancang logika algoritma secara terstruktur."
  ),
  makeQ(
    "Consider the pseudocode:\ncount = 0\nFOR i FROM 1 TO 4:\n  count = count + i\nWhat is the final value of count?",
    "Perhatikan algoritma berikut:\ncount = 0\nUNTUK i DARI 1 SAMPAI 4:\n  count = count + i\nBerapakah nilai akhir variabel count?",
    ["10", "4", "15", "8"],
    ["10", "4", "15", "8"],
    0,
    "count begins at 0. Step 1: 0+1=1. Step 2: 1+2=3. Step 3: 3+3=6. Step 4: 6+4=10.",
    "Penjumlahan bertahap: 0 + 1 + 2 + 3 + 4 = 10."
  )
];

module.exports = packs;
