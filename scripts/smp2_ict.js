function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return { qEn, qId, optionsEn, optionsId, correctIndex: correctIdx, expEn, expId };
}

const packs = {};

// ==========================================
// SMP 2 ICT (4 themes)
// ==========================================
packs['smp-2::ict::Spreadsheets and Data Analysis'] = [
  makeQ(
    "In spreadsheet applications like Excel or Google Sheets, with what symbol MUST every calculating formula begin?",
    "Pada aplikasi pengolah angka (spreadsheet) seperti Excel atau Google Sheets, simbol apakah yang WAJIB dituliskan di awal setiap penulisan rumus perhitungan?",
    ["Equals sign (=)", "Plus sign (+)", "At symbol (@)", "Hash sign (#)"],
    ["Tanda sama dengan (=)", "Tanda tambah (+)", "Simbol at (@)", "Tanda pagar (#)"],
    0,
    "The equals sign (=) signals the spreadsheet calculation engine to evaluate the cell content as an expression.",
    "Tanda sama dengan (=) memberitahukan aplikasi bahwa isi sel merupakan rumus perhitungan matematika yang harus dieksekusi."
  ),
  makeQ(
    "Which spreadsheet function calculates the total sum of all numerical values in cells A1 through A10?",
    "Fungsi spreadsheet manakah yang digunakan untuk menghitung jumlah total dari seluruh nilai numerik pada rentang sel A1 sampai A10?",
    ["=SUM(A1:A10)", "=TOTAL(A1:A10)", "=ADD(A1..A10)", "=COUNT(A1:A10)"],
    ["=SUM(A1:A10)", "=TOTAL(A1:A10)", "=ADD(A1..A10)", "=COUNT(A1:A10)"],
    0,
    "=SUM(range) adds all numeric entries within the specified rectangular coordinate range.",
    "Fungsi =SUM(A1:A10) menjumlahkan seluruh angka yang ada di dalam rentang sel A1 hingga A10."
  ),
  makeQ(
    "Which function calculates the arithmetic mean of a range of numerical cells?",
    "Fungsi spreadsheet apakah yang digunakan untuk menghitung nilai rata-rata (mean) dari suatu rentang sel?",
    ["=AVERAGE(range)", "=MEAN(range)", "=MEDIAN(range)", "=SUMDIV(range)"],
    ["=AVERAGE(rentang)", "=MEAN(rentang)", "=MEDIAN(rentang)", "=SUMDIV(rentang)"],
    0,
    "=AVERAGE() sums all numeric values in the range and divides by the count of numeric items.",
    "Fungsi =AVERAGE() menghitung nilai rata-rata aritmatika dari sekumpulan sel data angka."
  ),
  makeQ(
    "What is the difference between relative cell referencing (e.g. A1) and absolute cell referencing (e.g. $A$1)?",
    "Apakah perbedaan mendasar antara referensi sel relatif (contoh A1) dan referensi sel mutlak/absolut (contoh $A$1)?",
    ["Relative references shift automatically when copied to other cells; Absolute references remain locked to the exact row and column", "Relative references never change; Absolute references shift randomly", "Absolute references cannot contain numbers", "There is no difference"],
    ["Referensi relatif bergeser otomatis saat disalin ke sel lain; Referensi absolut tetap terkunci pada baris dan kolom yang sama", "Referensi relatif tidak pernah berubah", "Referensi absolut tidak boleh berisi angka", "Keduanya sama saja"],
    0,
    "Dollar signs ($) lock column and row indices so formulas reference fixed target cells when filled.",
    "Tanda dolar ($) mengunci kolom dan baris agar posisi alamat sel tidak bergeser saat rumus disalin ke sel lain."
  ),
  makeQ(
    "What does the spreadsheet function =COUNTIF(B2:B30, \">75\") do?",
    "Apakah kegunaan dari rumus spreadsheet =COUNTIF(B2:B30, \">75\")?",
    ["Counts how many cells in range B2:B30 contain numbers strictly greater than 75", "Calculates the average of numbers over 75", "Deletes all numbers under 75", "Multiplies each cell by 75"],
    ["Menghitung berapa banyak sel pada rentang B2:B30 yang bernilai lebih besar dari 75", "Menghitung nilai rata-rata angka di atas 75", "Menghapus angka di bawah 75", "Mengalikan setiap sel dengan 75"],
    0,
    "COUNTIF tallies only the cells within a range that satisfy the specified conditional criterion.",
    "COUNTIF menghitung frekuensi kemunculan sel yang memenuhi kriteria tertentu (dalam hal ini nilai > 75)."
  ),
  makeQ(
    "Which chart type is best suited for showing the percentage breakdown of parts making up a single whole (100%)?",
    "Jenis diagram (chart) manakah yang paling ideal untuk menyajikan perbandingan persentase bagian-bagian terhadap total keseluruhan (100%)?",
    ["Pie chart (Diagram lingkaran)", "Line chart", "Scatter plot", "Radar chart"],
    ["Diagram lingkaran (Pie chart)", "Diagram garis", "Diagram sebar (Scatter plot)", "Diagram radar"],
    0,
    "Pie charts represent proportions of a categorical whole through slice angles summing to 360 degrees.",
    "Diagram lingkaran (pie chart) sangat efektif memvisualisasikan proporsi persentase dari suatu total 100%."
  ),
  makeQ(
    "Which chart type is most effective for visualizing continuous trends in numerical data over chronological time intervals?",
    "Jenis grafik manakah yang paling efektif untuk memvisualisasikan tren perkembangan data numerik dari waktu ke waktu?",
    ["Line chart (Grafik garis)", "Pie chart", "Doughnut chart", "Bubble chart"],
    ["Grafik garis (Line chart)", "Diagram donat", "Diagram pai", "Grafik gelembung"],
    0,
    "Line charts connect sequential time data points to show slopes, trends, and seasonal patterns.",
    "Grafik garis menghubungkan titik-titik data berkala untuk memperlihatkan tren naik atau turun secara kronologis."
  ),
  makeQ(
    "What feature in spreadsheet software rearranges table rows alphabetically or numerically based on a selected column?",
    "Fitur spreadsheet apakah yang digunakan untuk menyusun ulang urutan data baris tabel dari A ke Z atau dari nilai terkecil ke terbesar?",
    ["Sort (Pengurutan data)", "Filter", "Word wrap", "Conditional formatting"],
    ["Sort (Pengurutan data)", "Filter (Penyaringan)", "Word wrap", "Format bersyarat"],
    0,
    "Sorting organizes data ascending (A-Z, 0-9) or descending (Z-A, 9-0) along specified key columns.",
    "Fitur Sort mengurutkan data baris tabel secara naik (Ascending) atau turun (Descending) berdasarkan kolom acuan."
  ),
  makeQ(
    "What spreadsheet feature dynamically changes the background color of cells automatically when their values meet specified conditions?",
    "Fitur pada spreadsheet yang otomatis mengubah warna sel sesuai dengan nilai atau kondisi tertentu disebut?",
    ["Conditional Formatting (Format Bersyarat)", "Spell check", "Page break preview", "PivotTable slicer"],
    ["Format Bersyarat (Conditional Formatting)", "Pemeriksa ejaan", "Tinjauan jeda halaman", "Pemotong PivotTable"],
    0,
    "Conditional formatting applies custom styles (colors, data bars) dynamically based on user rule evaluations.",
    "Conditional Formatting memberi highlight warna otomatis (misal merah jika nilai < 60) untuk memudahkan analisis data."
  ),
  makeQ(
    "What does the spreadsheet error message '#DIV/0!' signify?",
    "Apakah arti dari pesan kesalahan formula '#DIV/0!' pada sel spreadsheet?",
    ["The formula attempts to divide a number by zero or by an empty blank cell", "The column is too narrow to display the number", "The text contains misspelled English", "The file is corrupt"],
    ["Rumus berusaha membagi suatu bilangan dengan angka nol atau sel yang kosong", "Lebar kolom terlalu sempit untuk menampilkan angka", "Ada kesalahan ejaan kata", "Berkas telah rusak"],
    0,
    "Division by zero is mathematically undefined, causing spreadsheet engines to throw a #DIV/0! error.",
    "Kesalahan #DIV/0! muncul saat formula mencoba melakukan operasi pembagian dengan nilai nol."
  )
];

packs['smp-2::ict::Cybersecurity and Privacy'] = [
  makeQ(
    "What social engineering attack attempts to trick individuals into revealing passwords or banking details via deceptive emails or fake websites?",
    "Bentuk serangan kejahatan siber yang menyamar sebagai pihak resmi melalui email atau situs web palsu untuk mencuri kata sandi pengguna disebut?",
    ["Phishing", "DDoS attack", "Buffer overflow", "SQL injection"],
    ["Phishing (Pengelabuan)", "Serangan DDoS", "Buffer overflow", "Injeksi SQL"],
    0,
    "Phishing lures victims with forged communications to capture sensitive credentials and credentials.",
    "Phishing adalah teknik penipuan online untuk memancing korban memasukkan kata sandi atau data perbankan ke situs tiruan."
  ),
  makeQ(
    "What malicious software secretly encrypts a victim's personal files and demands monetary payment to restore access?",
    "Perangkat perusak (malware) yang mengunci dan mengenkripsi seluruh file pengguna lalu meminta uang tebusan untuk membukanya disebut?",
    ["Ransomware", "Spyware", "Adware", "Trojan horse"],
    ["Ransomware", "Spyware", "Adware", "Trojan horse"],
    0,
    "Ransomware uses cryptographic encryption to hold files hostage until cryptocurrency ransom is transferred.",
    "Ransomware mengenkripsi dokumen penting korban dan memeras korban dengan tebusan uang untuk kunci dekripsi."
  ),
  makeQ(
    "Which security mechanism requires users to provide two separate verification factors to authenticate their identity before logging in?",
    "Mekanisme keamanan yang mewajibkan pengguna memasukkan dua bukti verifikasi berbeda sebelum dapat masuk ke akun disebut?",
    ["Two-Factor Authentication / Multi-Factor Authentication (2FA / MFA)", "Single sign-on password", "Captcha challenge only", "Biometric iris wipe"],
    ["Autentikasi Dua Faktor (Two-Factor Authentication / 2FA)", "Kata sandi tunggal biasa", "Tantangan Captcha saja", "Pemindaian sidik jari"],
    0,
    "2FA pairs something you know (password) with something you have (SMS/OTP token app) or are (fingerprint).",
    "2FA meningkatkan keamanan akun dengan meminta verifikasi tambahan (seperti kode OTP di ponsel) selain kata sandi."
  ),
  makeQ(
    "What defines a strong, highly secure password according to cybersecurity guidelines?",
    "Kombinasi apakah yang mencerminkan kata sandi yang kuat dan aman menurut standar keamanan siber?",
    ["At least 12+ characters mixing uppercase, lowercase, numbers, and symbols, with no personal names", "Your birthday and pet name", "The word 'password123'", "12345678"],
    ["Minimal 12 karakter yang memadukan huruf besar, huruf kecil, angka, dan simbol tanpa memuat data pribadi", "Tanggal lahir dan nama hewan peliharaan", "Kata sandi 'password123'", "Angka berurutan 12345678"],
    0,
    "High entropy passwords resist dictionary and brute-force attacks by combining diverse character sets.",
    "Kata sandi yang tangguh memiliki panjang memadai serta variasi karakter sehingga sulit ditebak oleh program peretas."
  ),
  makeQ(
    "What malicious program disguises itself as legitimate or harmless software (like a game or tool) to infiltrate a computer system?",
    "Program berbahaya yang menyamar sebagai aplikasi bermanfaat (seperti game atau pemutar video) untuk menyusup ke sistem disebut?",
    ["Trojan Horse (Kuda Troya)", "Worm", "Rootkit", "Cookie"],
    ["Trojan Horse (Kuda Troya)", "Worm", "Rootkit", "Cookie web"],
    0,
    "Trojan horses rely on social deception to trick victims into executing payload software.",
    "Trojan menipu pengguna agar mengunduhnya karena tampak seperti aplikasi resmi, padahal membuka pintu belakang bagi peretas."
  ),
  makeQ(
    "Why should users avoid logging into sensitive financial accounts while connected to unencrypted public Wi-Fi networks?",
    "Mengapa kita sebaiknya tidak mengakses akun perbankan atau akun sensitif saat terhubung ke Wi-Fi publik tanpa sandi?",
    ["Attackers on the same unencrypted local network can intercept and eavesdrop on transmitted packets (Man-in-the-Middle)", "Public Wi-Fi discharges battery 10 times faster", "Public Wi-Fi deletes the operating system", "Public Wi-Fi only connects to YouTube"],
    ["Peretas di jaringan yang sama dapat menyadap lalu lintas data sensitif yang tidak terenkripsi (Man-in-the-Middle)", "Wi-Fi publik menghabiskan baterai seketika", "Wi-Fi publik menghapus sistem operasi", "Wi-Fi publik tidak memiliki sambungan internet"],
    0,
    "Unsecured Wi-Fi allows packet sniffing and rogue access point spoofing by malicious local actors.",
    "Jaringan Wi-Fi publik rentan penyadapan data oleh peretas melalui teknik sniffing paket data lokal."
  ),
  makeQ(
    "What technology creates a private, encrypted tunnel over the public internet to protect data transmission privacy?",
    "Teknologi jaringan apakah yang membuat jalur terowongan terenkripsi aman melintasi internet publik untuk melindungi privasi data?",
    ["Virtual Private Network (VPN)", "DNS cache", "HTML viewer", "FTP server"],
    ["Virtual Private Network (VPN)", "Tembolok DNS", "Penampil HTML", "Server FTP"],
    0,
    "VPNs encapsulate and encrypt all network traffic between the host and remote gateway, shielding origin IPs.",
    "VPN mengenkripsi seluruh sambungan data pengguna dari pengintaian pihak luar dan menyamarkan alamat IP asli."
  ),
  makeQ(
    "What type of malware spreads independently across computer networks without requiring human activation or file attachments?",
    "Jenis malware yang dapat menggandakan diri dan menyebar secara mandiri ke komputer lain di jaringan tanpa bantuan klik manusia disebut?",
    ["Computer Worm (Cacing komputer)", "Spyware", "Keylogger", "Adware banner"],
    ["Worm (Cacing komputer)", "Spyware", "Keylogger", "Adware banner"],
    0,
    "Worms exploit OS network vulnerabilities to replicate across networks automatically without host interaction.",
    "Worm adalah program jahat yang mampu menggandakan dirinya secara otomatis melintasi jaringan memanfaatkan celah keamanan."
  ),
  makeQ(
    "What covert software logs every keystroke typed by a user on their keyboard to steal credentials and card numbers?",
    "Perangkat lunak mata-mata yang diam-diam merekam setiap ketukan tombol keyboard untuk mencuri kata sandi pengguna disebut?",
    ["Keylogger", "Firewall packet filter", "Screen magnifier", "Defragmenter"],
    ["Keylogger", "Penyaring paket firewall", "Kaca pembesar layar", "Defragmenter disk"],
    0,
    "Keyloggers intercept operating system keyboard interrupts to store and transmit pressed keys to attackers.",
    "Keylogger memata-matai dan menyimpan seluruh riwayat pengetikan keyboard pengguna termasuk kata sandi rahasia."
  ),
  makeQ(
    "What is the primary purpose of regularly installing official software and operating system security updates?",
    "Apakah tujuan utama dari melakukan pembaruan rutin (update) sistem operasi dan aplikasi perangkat lunak?",
    ["To patch discovered security vulnerabilities and bugs before cybercriminals can exploit them", "To delete the user's hard drive", "To make computer hardware look newer", "To slow down internet browsing"],
    ["Menutup celah keamanan (patch vulnerability) yang baru ditemukan agar tidak dapat dieksploitasi oleh peretas", "Menghapus seluruh file pengguna", "Membuat bodi fisik komputer baru", "Memperlambat koneksi internet"],
    0,
    "Security patches repair code flaws discovered in software, preventing remote zero-day exploit execution.",
    "Pembaruan keamanan menambal celah kelemahan kode sehingga sistem kebal terhadap teknik serangan siber terbaru."
  )
];

packs['smp-2::ict::HTML and Basic Web Structure'] = [
  makeQ(
    "What does the web acronym HTML stand for?",
    "Apakah kepanjangan dari singkatan bahasa markup HTML?",
    ["HyperText Markup Language", "High-Tech Machine Language", "Home Tool Markup Link", "HyperTransfer Media Layout"],
    ["HyperText Markup Language", "High-Tech Machine Language", "Home Tool Markup Link", "HyperTransfer Media Layout"],
    0,
    "HTML is the standard structural markup language used to create and format documents on the World Wide Web.",
    "HTML adalah bahasa markah standar yang digunakan untuk menyusun struktur kerangka halaman web di internet."
  ),
  makeQ(
    "Which HTML tag is used to create a clickable hyperlink connecting to another web page?",
    "Tag HTML manakah yang digunakan untuk membuat tautan tautan klik (hyperlink) menuju ke halaman web lain?",
    ["<a> with the href attribute", "<link>", "<href>", "<nav>"],
    ["Tag <a> dengan atribut href", "Tag <link>", "Tag <href>", "Tag <nav>"],
    0,
    "The anchor tag <a href='URL'> creates navigable hyperlinks in web browsers.",
    "Tag jangkar <a href='url'>Teks</a> digunakan untuk membuat tautan yang dapat diklik pengguna."
  ),
  makeQ(
    "Which HTML element displays an image on a web page, and what attribute specifies the image file path?",
    "Elemen HTML manakah yang berfungsi menyisipkan gambar ke halaman web, dan atribut apakah yang memuat lokasi file gambarnya?",
    ["<img> with the 'src' attribute", "<image> with 'href'", "<picture> with 'link'", "<photo> with 'file'"],
    ["Tag <img> dengan atribut 'src'", "Tag <image> dengan atribut 'href'", "Tag <picture> dengan 'link'", "Tag <photo> dengan 'file'"],
    0,
    "The empty tag <img src='path.jpg' alt='desc'> embeds raster and vector images into the DOM.",
    "Tag <img src='gambar.jpg' alt='keterangan'> digunakan untuk menyematkan gambar ke dalam halaman web."
  ),
  makeQ(
    "What is the difference between an ordered list and an unordered list in HTML?",
    "Apakah perbedaan antara ordered list dan unordered list dalam penulisan dokumen HTML?",
    ["<ol> creates numbered items (1, 2, 3); <ul> creates bulleted items", "<ol> creates bullet points; <ul> creates numbered items", "<ol> is for photos only; <ul> is for music", "There is no difference"],
    ["Tag <ol> membuat daftar berurutan nomor (1, 2, 3); Tag <ul> membuat daftar berpoin (bullet)", "Tag <ol> membuat poin; tag <ul> membuat nomor", "Tag <ol> hanya untuk gambar; <ul> untuk musik", "Keduanya sama persis"],
    0,
    "<ol> renders numbered sequences; <ul> renders unordered bulleted lists.",
    "Ordered list (<ol>) menghasilkan daftar berpenomoran urut, sedangkan unordered list (<ul>) menghasilkan daftar poin simbol."
  ),
  makeQ(
    "Which HTML tag creates the largest, highest-priority section heading on a webpage?",
    "Tag HTML manakah yang digunakan untuk membuat judul utama paling besar dan berprioritas paling tinggi pada halaman web?",
    ["<h1>", "<h6>", "<heading>", "<title>"],
    ["Tag <h1>", "Tag <h6>", "Tag <heading>", "Tag <title>"],
    0,
    "Heading tags range from <h1> (highest significance) to <h6> (smallest sub-heading).",
    "Tag <h1> mendefinisikan judul tingkat pertama paling penting, sedangkan <h6> adalah judul sub terkecil."
  ),
  makeQ(
    "Where is the <title> tag placed, and where does its text appear to users?",
    "Di bagian manakah tag <title> diletakkan, dan di manakah teks judul tersebut akan ditampilkan kepada pengunjung?",
    ["Inside the <head> section; it appears in the browser tab titlebar and search engine results", "Inside the <body> section; it appears as a giant green paragraph", "At the very bottom of the footer", "Inside an image tag"],
    ["Di dalam bagian <head>; teksnya muncul pada tab bilah judul peramban dan hasil pencarian mesin pencari", "Di dalam bagian <body>; muncul sebagai paragraf", "Di bagian paling bawah footer", "Di dalam tag gambar"],
    0,
    "The <head> section stores metadata; <title> sets the browser window/tab header label.",
    "Tag <title> ditempatkan di dalam elemen <head> untuk menentukan nama halaman yang tampil pada tab browser."
  ),
  makeQ(
    "What complementary technology is used alongside HTML to style colors, fonts, layouts, and responsive designs?",
    "Teknologi pendamping apakah yang digunakan bersama HTML untuk mengatur tata letak, warna, jenis huruf, dan desain tampilan web?",
    ["Cascading Style Sheets (CSS)", "Structured Query Language (SQL)", "C++ Compiler", "FTP protocol"],
    ["Cascading Style Sheets (CSS)", "Structured Query Language (SQL)", "Kompiler C++", "Protokol FTP"],
    0,
    "CSS handles visual presentation, animations, and responsive layout styling of HTML DOM elements.",
    "CSS digunakan untuk mendesain tampilan estetika halaman web seperti warna, font, margin, dan tata letak responsif."
  ),
  makeQ(
    "Which HTML tag correctly formats a distinct paragraph of text?",
    "Tag HTML manakah yang digunakan secara standar untuk membuat satu paragraf teks?",
    ["<p>", "<paragraph>", "<text>", "<para>"],
    ["Tag <p>", "Tag <paragraph>", "Tag <text>", "Tag <para>"],
    0,
    "The <p> element defines a block-level paragraph with standard top and bottom margins.",
    "Tag <p> digunakan untuk membungkus satu paragraf teks pada halaman web."
  ),
  makeQ(
    "In an HTML table, which tags represent a table row and a table data cell respectively?",
    "Dalam pembuatan tabel HTML, tag manakah yang masing-masing digunakan untuk membuat baris tabel dan sel data tabel?",
    ["<tr> for row, and <td> for data cell", "<th> for row, and <tr> for cell", "<row> for row, and <cell> for cell", "<table> for both"],
    ["Tag <tr> untuk baris tabel, dan tag <td> untuk sel isi data", "Tag <th> untuk baris, dan <tr> untuk sel", "Tag <row> untuk baris, dan <cell> untuk sel", "Tag <table> untuk keduanya"],
    0,
    "<tr> defines a table row, containing <td> (table data) or <th> (table header) cells.",
    "Tag <tr> (table row) membuat baris baru pada tabel, dan <td> (table data) memuat data sel di dalam baris tersebut."
  ),
  makeQ(
    "What declaration must appear on the very first line of a modern HTML5 document?",
    "Deklarasi apakah yang wajib dituliskan pada baris pertama sebuah dokumen web HTML5?",
    ["<!DOCTYPE html>", "<html>", "<head>", "<xml version='1.0'>"],
    ["<!DOCTYPE html>", "<html>", "<head>", "<xml version='1.0'>"],
    0,
    "<!DOCTYPE html> instructs the browser engine to render the document in standards-compliant HTML5 mode.",
    "Deklarasi <!DOCTYPE html> di baris teratas menginstruksikan browser untuk merender halaman sesuai standar HTML5 modern."
  )
];

packs['smp-2::ict::Conditionals, Loops, and Functions'] = [
  makeQ(
    "What is the primary purpose of defining reusable 'Functions' (or procedures) in computer programming?",
    "Apakah tujuan utama dari pembuatan 'Fungsi' (Function / Method) dalam penulisan program komputer?",
    ["To encapsulate a block of code so it can be called repeatedly without duplicating code (DRY principle)", "To slow down computer execution", "To turn on the computer monitor", "To delete variables from memory"],
    ["Membungkus sekumpulan kode agar dapat dipanggil berulang kali tanpa menulis ulang (prinsip efisiensi DRY)", "Memperlambat kecepatan eksekusi program", "Menyalakan layar komputer", "Menghapus variabel dari memori"],
    0,
    "Functions promote modularity, readability, maintainability, and code reuse across programs.",
    "Fungsi memungkinkan pengembang membagi program besar menjadi modul-modul kecil yang dapat digunakan kembali."
  ),
  makeQ(
    "What term refers to the values passed INTO a function when it is called?",
    "Nilai atau data masukan yang dikirimkan ke dalam suatu fungsi saat fungsi tersebut dipanggil disebut?",
    ["Arguments / Parameters (Argumen atau Parameter)", "Return values", "Operators", "Comments"],
    ["Argumen / Parameter (Arguments)", "Nilai balik (Return value)", "Operator logika", "Komentar program"],
    0,
    "Parameters are input variables defined in a function signature; arguments are concrete values passed during invocations.",
    "Parameter adalah variabel penampung masukan pada fungsi, dan argumen adalah nilai riil yang dikirimkan saat pemanggilan."
  ),
  makeQ(
    "What keyword is standardly used by a function to send a computed result back to the code that called it?",
    "Kata kunci (keyword) standar apakah yang digunakan oleh sebuah fungsi untuk mengirimkan hasil perhitungan kembali ke pemanggilnya?",
    ["return", "send", "give", "stop"],
    ["return", "send", "give", "stop"],
    0,
    "The 'return' statement terminates function execution and specifies the value handed back to the caller.",
    "Kata kunci 'return' menghentikan eksekusi fungsi dan mengembalikan nilai hasil pemrosesan ke pemanggil."
  ),
  makeQ(
    "What hazardous programming bug occurs when a loop's termination condition is never met?",
    "Kesalahan fatal apakah yang terjadi jika kondisi penghenti pada suatu struktur perulangan (loop) tidak pernah tercapai?",
    ["Infinite loop (Perulangan tak terbatas yang membekukan program)", "Syntax error", "Automatic reboot", "Compilation success"],
    ["Perulangan tak terbatas (Infinite loop) yang menyebabkan program macet", "Kesalahan pengetikan", "Komputer langsung merestart", "Kompilasi sukses"],
    0,
    "An infinite loop repeats indefinitely, consuming CPU resources until the process crashes or is killed.",
    "Infinite loop terjadi saat syarat henti selalu bernilai benar (True) sehingga program berputar tanpa henti dan membeku."
  ),
  makeQ(
    "In a nested loop, if the outer loop runs 5 times and the inner loop runs 4 times for each outer step, how many total times does the inner body execute?",
    "Pada struktur perulangan bersarang (nested loop), jika perulangan luar berputar 5 kali dan perulangan dalam berputar 4 kali untuk setiap putaran luar, berapa total eksekusi kode di dalamnya?",
    ["20 times (5 * 4)", "9 times (5 + 4)", "1 time", "40 times"],
    ["20 kali (5 × 4)", "9 kali (5 + 4)", "1 kali", "40 kali"],
    0,
    "Total iterations equal the product of outer and inner loop counts: 5 * 4 = 20.",
    "Total perulangan dalam dihitung dengan perkalian putaran luar dan dalam: 5 × 4 = 20 kali eksekusi."
  ),
  makeQ(
    "What logical operator evaluates to TRUE only when BOTH operand conditions are simultaneously true?",
    "Operator logika manakah yang menghasilkan nilai BENAR (True) HANYA JIKA KEDUA kondisi yang diuji sama-sama bernilai benar?",
    ["Logical AND (&&)", "Logical OR (||)", "Logical NOT (!)", "Bitwise XOR"],
    ["Operator logika AND (&& / DAN)", "Operator logika OR (|| / ATAU)", "Operator logika NOT (! / BUKAN)", "Bitwise XOR"],
    0,
    "Logical AND requires both propositions to hold true: True AND True = True.",
    "Operator logika AND hanya bernilai True jika kedua pernyataan yang dihubungkan bernilai True."
  ),
  makeQ(
    "What logical operator evaluates to TRUE if AT LEAST ONE of its conditions is true?",
    "Operator logika manakah yang menghasilkan nilai True jika SALAH SATU atau kedua kondisi bernilai benar?",
    ["Logical OR (||)", "Logical AND (&&)", "Logical NOT (!)", "Equality (==)"],
    ["Operator logika OR (|| / ATAU)", "Operator logika AND (&& / DAN)", "Operator logika NOT (!)", "Operator kesetaraan (==)"],
    0,
    "Logical OR returns true as long as at least one operand is truthy: True OR False = True.",
    "Operator logika OR bernilai True jika minimal salah satu kondisinya benar, dan hanya bernilai False jika keduanya salah."
  ),
  makeQ(
    "In programming, what is the 'scope' of a variable?",
    "Apakah yang dimaksud dengan 'cakupan' (scope) suatu variabel dalam bahasa pemrograman?",
    ["The region of the program code where the variable is recognized and accessible (local vs global)", "The physical size of the variable in inches", "The speed at which the variable multiplies", "The color of the code text"],
    ["Wilayah jangkauan kode program di mana suatu variabel dikenali dan dapat diakses (lokal vs global)", "Ukuran fisik memori dalam inci", "Kecepatan variabel berhitung", "Warna teks editor"],
    0,
    "Scope defines visibility: local variables exist only within their enclosing function block, while global variables span the program.",
    "Scope menentukan di mana variabel dapat dibaca; variabel lokal hanya berlaku di dalam fungsinya sendiri, variabel global berlaku di seluruh program."
  ),
  makeQ(
    "Consider the pseudo-code:\nscore = 82\nIF score >= 90 THEN grade = 'A'\nELSE IF score >= 80 THEN grade = 'B'\nELSE grade = 'C'\nWhat is the value of grade?",
    "Perhatikan kode berikut:\nscore = 82\nJIKA score >= 90 MAKA grade = 'A'\nLAIN JIKA score >= 80 MAKA grade = 'B'\nLAINNYA grade = 'C'\nApakah nilai akhir variabel grade?",
    ["'B'", "'A'", "'C'", "None"],
    ["'B'", "'A'", "'C'", "Tidak ada"],
    0,
    "82 is not >= 90, but 82 >= 80 is true, assigning 'B'.",
    "Nilai 82 tidak memenuhi syarat pertama (>=90), namun memenuhi syarat kedua (>=80), sehingga menghasilkan nilai 'B'."
  ),
  makeQ(
    "What programming loop evaluates its condition AFTER executing the loop body at least once?",
    "Struktur perulangan manakah yang mengeksekusi blok kode minimal satu kali SEBELUM memeriksa syarat kondisi penghentinya?",
    ["do-while loop", "for loop", "while loop", "if-then branch"],
    ["Perulangan do-while", "Perulangan for", "Perulangan while biasa", "Percabangan if-then"],
    0,
    "A do-while loop is a post-test loop, ensuring guaranteed single execution of the body prior to test evaluation.",
    "Perulangan do-while memeriksa syarat di akhir, sehingga isi perulangan dijamin berjalan minimal satu kali."
  )
];

module.exports = packs;
