const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/masterQuestions.json');
const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return { qEn, qId, optionsEn, optionsId, correctIndex: correctIdx, expEn, expId };
}

const THEME_DATA = {};

// Helper to fill a theme with 10 distinct questions
function setPack(key, qList) {
  THEME_DATA[key] = qList;
}

// -------------------------------------------------------------
// SD 1 Math - Simple Addition and Subtraction
// -------------------------------------------------------------
setPack('sd-1::math::Simple Addition and Subtraction', [
  makeQ("You have 5 red apples and pick 4 green apples. How many apples do you have altogether?",
    "Kamu memiliki 5 apel merah dan memetik 4 apel hijau. Berapa jumlah apel seluruhnya?",
    ["9 apples", "8 apples", "10 apples", "7 apples"], ["9 apel", "8 apel", "10 apel", "7 apel"], 0,
    "Add 5 + 4 = 9.", "Jumlahkan 5 + 4 = 9."),
  makeQ("There are 10 birds on a fence. 3 fly away. How many birds remain?",
    "Ada 10 burung di pagar. 3 burung terbang pergi. Berapa burung yang tersisa?",
    ["7 birds", "6 birds", "8 birds", "9 birds"], ["7 burung", "6 burung", "8 burung", "9 burung"], 0,
    "Subtract 10 - 3 = 7.", "Kurangkan 10 - 3 = 7."),
  makeQ("What is 6 + 6?", "Berapakah hasil dari 6 + 6?",
    ["12", "11", "13", "14"], ["12", "11", "13", "14"], 0,
    "6 plus 6 equals 12.", "6 ditambah 6 sama dengan 12."),
  makeQ("What is 15 - 5?", "Berapakah hasil dari 15 - 5?",
    ["10", "9", "11", "8"], ["10", "9", "11", "8"], 0,
    "Subtracting 5 from 15 leaves 10.", "15 dikurangi 5 menghasilkan 10."),
  makeQ("If you have 8 toy cars and receive 7 more for your birthday, how many toy cars do you have in total?",
    "Jika kamu memiliki 8 mobil mainan dan mendapat 7 lagi saat ulang tahun, berapa total mobil mainanmu?",
    ["15 cars", "14 cars", "16 cars", "13 cars"], ["15 mobil", "14 mobil", "16 mobil", "13 mobil"], 0,
    "8 + 7 = 15.", "8 + 7 = 15."),
  makeQ("A basket contains 12 eggs. 4 are used to bake a cake. How many eggs are left?",
    "Sebuah keranjang berisi 12 telur. 4 telur digunakan membuat kue. Berapa butir telur yang tersisa?",
    ["8 eggs", "7 eggs", "9 eggs", "6 eggs"], ["8 butir telur", "7 butir telur", "9 butir telur", "6 butir telur"], 0,
    "12 - 4 = 8.", "12 - 4 = 8."),
  makeQ("What number plus 3 equals 10?", "Bilangan berapakah yang jika ditambah 3 menghasilkan 10?",
    ["7", "6", "8", "5"], ["7", "6", "8", "5"], 0,
    "10 - 3 = 7, so 7 + 3 = 10.", "10 - 3 = 7, jadi 7 + 3 = 10."),
  makeQ("What is 9 + 8?", "Berapakah hasil dari 9 + 8?",
    ["17", "16", "18", "19"], ["17", "16", "18", "19"], 0,
    "9 + 8 = 17.", "9 + 8 = 17."),
  makeQ("There are 16 candies in a jar. You eat 6 candies. How many candies remain in the jar?",
    "Ada 16 permen di dalam toples. Kamu memakan 6 permen. Berapa permen yang tersisa di toples?",
    ["10 candies", "11 candies", "9 candies", "8 candies"], ["10 permen", "11 permen", "9 permen", "8 permen"], 0,
    "16 - 6 = 10.", "16 - 6 = 10."),
  makeQ("You have 11 pencils and find 4 more in your backpack. How many pencils do you have now?",
    "Kamu punya 11 pensil dan menemukan 4 pensil lagi di tas. Berapa banyak pensilmu sekarang?",
    ["15 pencils", "14 pencils", "16 pencils", "13 pencils"], ["15 pensil", "14 pensil", "16 pensil", "13 pensil"], 0,
    "11 + 4 = 15.", "11 + 4 = 15.")
]);

// -------------------------------------------------------------
// SD 2 Math - Multiplication as Repeated Addition
// -------------------------------------------------------------
setPack('sd-2::math::Multiplication as Repeated Addition', [
  makeQ("What is 3 groups of 4 written as repeated addition?",
    "Bagaimana menulis 3 kelompok berisi 4 benda sebagai penjumlahan berulang?",
    ["4 + 4 + 4 = 12", "3 + 3 + 3 + 3 = 12", "4 + 3 = 7", "4 × 4 = 16"],
    ["4 + 4 + 4 = 12", "3 + 3 + 3 + 3 = 12", "4 + 3 = 7", "4 × 4 = 16"], 0,
    "3 groups of 4 means adding 4 three times: 4 + 4 + 4 = 12.", "3 kelompok berisi 4 berarti menjumlahkan 4 sebanyak 3 kali: 4 + 4 + 4 = 12."),
  makeQ("There are 4 flower pots. Each pot has 5 flowers. How many flowers are there in total?",
    "Ada 4 pot bunga. Setiap pot memiliki 5 kuntum bunga. Berapa jumlah seluruh bunga?",
    ["20 flowers", "15 flowers", "25 flowers", "9 flowers"], ["20 bunga", "15 bunga", "25 bunga", "9 bunga"], 0,
    "4 × 5 = 5 + 5 + 5 + 5 = 20 flowers.", "4 × 5 = 5 + 5 + 5 + 5 = 20 kuntum bunga."),
  makeQ("What multiplication expression represents 2 + 2 + 2 + 2 + 2 + 2?",
    "Bentuk perkalian apakah yang mewakili 2 + 2 + 2 + 2 + 2 + 2?",
    ["6 × 2", "2 × 5", "6 + 2", "12 × 1"], ["6 × 2", "2 × 5", "6 + 2", "12 × 1"], 0,
    "The number 2 is added 6 times, which equals 6 × 2 = 12.", "Angka 2 dijumlahkan sebanyak 6 kali, sehingga bentuk perkaliannya 6 × 2 = 12."),
  makeQ("A spider has 8 legs. How many legs do 3 spiders have altogether?",
    "Seekor laba-laba memiliki 8 kaki. Berapa jumlah kaki dari 3 ekor laba-laba?",
    ["24 legs", "16 legs", "20 legs", "32 legs"], ["24 kaki", "16 kaki", "20 kaki", "32 kaki"], 0,
    "3 × 8 = 8 + 8 + 8 = 24 legs.", "3 × 8 = 8 + 8 + 8 = 24 kaki."),
  makeQ("What is 5 × 3?", "Berapakah hasil dari 5 × 3?",
    ["15", "12", "18", "20"], ["15", "12", "18", "20"], 0,
    "5 × 3 = 3 + 3 + 3 + 3 + 3 = 15.", "5 × 3 = 3 + 3 + 3 + 3 + 3 = 15."),
  makeQ("There are 5 boxes of crayons. Each box has 6 crayons. How many crayons are there altogether?",
    "Ada 5 kotak krayon. Setiap kotak berisi 6 krayon. Berapa banyak krayon seluruhnya?",
    ["30 crayons", "25 crayons", "35 crayons", "11 crayons"], ["30 krayon", "25 krayon", "35 krayon", "11 krayon"], 0,
    "5 × 6 = 30 crayons.", "5 × 6 = 30 krayon."),
  makeQ("Which addition sentence equals 4 × 7?", "Bentuk penjumlahan manakah yang bernilai sama dengan 4 × 7?",
    ["7 + 7 + 7 + 7", "4 + 4 + 4 + 4", "7 + 4", "7 × 7"], ["7 + 7 + 7 + 7", "4 + 4 + 4 + 4", "7 + 4", "7 × 7"], 0,
    "4 × 7 equals adding 7 four times: 7 + 7 + 7 + 7 = 28.", "4 × 7 berarti menjumlahkan 7 sebanyak 4 kali: 7 + 7 + 7 + 7 = 28."),
  makeQ("A bicycle has 2 wheels. How many wheels do 9 bicycles have in total?",
    "Sebuah sepeda memiliki 2 roda. Berapa jumlah roda pada 9 sepeda?",
    ["18 wheels", "16 wheels", "20 wheels", "11 wheels"], ["18 roda", "16 roda", "20 roda", "11 roda"], 0,
    "9 × 2 = 18 wheels.", "9 × 2 = 18 roda."),
  makeQ("What is 10 × 4?", "Berapakah hasil dari 10 × 4?",
    ["40", "14", "44", "30"], ["40", "14", "44", "30"], 0,
    "10 × 4 = 40.", "10 × 4 = 40."),
  makeQ("If a baker puts 3 cookies on each of 7 baking trays, how many cookies are baked?",
    "Jika seorang pembuat roti menaruh 3 kue pada masing-masing 7 loyang, berapa kue yang dipanggang?",
    ["21 cookies", "18 cookies", "24 cookies", "10 cookies"], ["21 kue", "18 kue", "24 kue", "10 kue"], 0,
    "7 × 3 = 21 cookies.", "7 × 3 = 21 kue.")
]);

// -------------------------------------------------------------
// SD 2 ICT - Computer Parts, Files, Ethics, Logic
// -------------------------------------------------------------
setPack('sd-2::ict::Computer Parts and Their Functions', [
  makeQ("Which internal computer part is called the 'brain' of the computer because it processes all instructions?",
    "Komponen dalam komputer manakah yang disebut 'otak' komputer karena memproses seluruh instruksi?",
    ["The CPU (Central Processing Unit)", "The mouse pad", "The plastic case", "The speaker grill"],
    ["CPU (Central Processing Unit)", "Alas mouse", "Casing plastik", "Kisi speaker"], 0,
    "The CPU executes program instructions and performs mathematical calculations.", "CPU adalah prosesor utama yang mengolah data dan menjalankan instruksi program."),
  makeQ("What device on a laptop functions like a mouse to move the pointer with your finger?",
    "Perangkat pada laptop manakah yang berfungsi seperti mouse untuk menggerakkan kursor dengan usapan jari?",
    ["The touchpad (trackpad)", "The battery", "The power adapter", "The hinge"],
    ["Touchpad (trackpad)", "Baterai", "Adaptor daya", "Engsel layar"], 0,
    "The touchpad senses finger gliding to control on-screen cursor movements.", "Touchpad mendeteksi geseran jari pengguna untuk mengarahkan kursor di layar laptop."),
  makeQ("Which computer storage device is small, portable, and plugs into a rectangular USB port?",
    "Media penyimpan data manakah yang berbentuk kecil, portabel, dan dicolokkan ke lubang port USB?",
    ["A USB flash drive", "A desktop monitor", "A printer ribbon", "A power strip"],
    ["Flashdisk (USB flash drive)", "Monitor desktop", "Pita printer", "Kabel colokan listrik"], 0,
    "USB flash drives store files on flash memory chips in a pocket-sized casing.", "Flashdisk menyimpan berkas data di chip memori dan mudah dibawa ke mana saja."),
  makeQ("Which internal hardware component keeps the CPU cool so it does not overheat?",
    "Komponen pendingin internal manakah yang menjaga prosesor CPU agar tidak kepanasan?",
    ["The cooling fan and heatsink", "The optical drive", "The keyboard switch", "The power LED"],
    ["Kipas pendingin (fan) dan pendingin logam (heatsink)", "Pemutar CD", "Tombol keyboard", "Lampu LED"], 0,
    "Cooling fans blow air over metal heatsinks to dissipate heat from the CPU.", "Kipas pendingin meniupkan udara ke heatsink untuk membuang panas dari prosesor."),
  makeQ("What is the name of the main circuit board that connects all computer parts together inside the computer?",
    "Apakah nama papan sirkuit utama tempat menempelnya seluruh komponen di dalam komputer?",
    ["The motherboard", "The mouse pad", "The keyboard tray", "The power cable"],
    ["Motherboard (papan induk)", "Bantalan mouse", "Wadah keyboard", "Kabel listrik"], 0,
    "The motherboard provides electrical buses interconnecting the CPU, RAM, and peripherals.", "Motherboard adalah papan sirkuit utama tempat prosesor, RAM, dan komponen lain terhubung."),
  makeQ("What type of memory temporarily holds open programs while the computer is switched on?",
    "Memori jenis apakah yang menyimpan sementara data program yang sedang aktif saat komputer menyala?",
    ["RAM (Random Access Memory)", "A paper notebook", "The mouse scroll wheel", "The screen plastic"],
    ["RAM (Random Access Memory)", "Buku catatan kertas", "Roda gulir mouse", "Plastik layar"], 0,
    "RAM is volatile working memory that clears when the computer is turned off.", "RAM menyimpan data sementara untuk aplikasi yang sedang berjalan dan terhapus saat dimatikan."),
  makeQ("Which component supplies regulated electrical power to all computer parts from the wall socket?",
    "Komponen apakah yang menyalurkan dan menstabilkan daya listrik ke seluruh bagian komputer dari stopkontak?",
    ["The power supply unit (PSU)", "The webcam lens", "The audio jack", "The wallpaper"],
    ["Unit penyuplai daya (PSU / Power Supply)", "Lensa webcam", "Colokan audio", "Gambar wallpaper"], 0,
    "The power supply converts alternating wall current into regulated direct current voltages.", "Power supply mengubah arus listrik rumah menjadi tegangan DC yang aman untuk komponen komputer."),
  makeQ("Which hardware accessory projects computer screens onto large classroom walls or whiteboards?",
    "Aksesori perangkat keras manakah yang memproyeksikan layar komputer ke dinding kelas atau layar putih besar?",
    ["A digital projector (LCD projector)", "A flat scanner", "A mouse pad", "A microphone clip"],
    ["Proyektor digital (InFocus / LCD Projector)", "Alat pemindai scanner", "Alas mouse", "Klip mikrofon"], 0,
    "Projectors project bright magnified images onto screens for classroom presentations.", "Proyektor menampilkan sorotan gambar komputer ke dinding agar bisa dilihat seluruh kelas."),
  makeQ("What physical device lets artists draw digitally on a computer with a special pen stylus?",
    "Perangkat fisik apakah yang memungkinkan seniman menggambar digital di komputer memakai pena stylus khusus?",
    ["A graphic drawing tablet", "A barcode reader", "A paper shredder", "A cooling pad"],
    ["Tablet gambar grafis (Graphic drawing tablet)", "Alat pembaca barcode", "Mesin penghancur kertas", "Bantalan pendingin"], 0,
    "Graphic tablets register stylus pressure and tilt to create natural digital brush strokes.", "Drawing tablet menerima goresan pena stylus untuk menggambar di aplikasi grafis."),
  makeQ("Which computer component stores your files, photos, and games permanently even when turned off?",
    "Komponen komputer manakah yang menyimpan berkas, foto, dan game secara permanen walau komputer mati?",
    ["The hard drive or SSD (Solid State Drive)", "The cooling fan", "The keyboard spacebar", "The mouse button"],
    ["Hard disk (HDD) atau SSD (Solid State Drive)", "Kipas pendingin", "Tombol spasi", "Tombol mouse"], 0,
    "Hard drives and SSDs provide non-volatile long-term digital storage for files and OS.", "Hard disk dan SSD menyimpan seluruh berkas dan sistem operasi secara aman walau listrik mati.")
]);

setPack('sd-2::ict::Basic File Management', [
  makeQ("What digital container do we create in Windows or macOS to organize related files neatly together?",
    "Wadah digital apakah yang kita buat di Windows atau macOS untuk merapikan berkas-berkas terkait?",
    ["A folder (directory)", "A browser tab", "A desktop trash bin", "A wallpaper"],
    ["Folder (direktori)", "Tab peramban", "Tempat sampah desktop", "Gambar latar"], 0,
    "Folders allow users to categorize files systematically into directory trees.", "Folder berfungsi sebagai wadah untuk mengelompokkan berkas agar rapi dan mudah dicari."),
  makeQ("When you finish writing a story in a word processor, what command saves your work permanently?",
    "Saat selesai menulis cerita di aplikasi pengolah kata, perintah manakah yang menyimpan hasil karyamu secara permanen?",
    ["Save (or Ctrl + S)", "Delete", "Undo", "Close without saving"],
    ["Simpan / Save (atau Ctrl + S)", "Hapus (Delete)", "Batal (Undo)", "Tutup tanpa simpan"], 0,
    "The Save command writes the active document buffer to permanent disk storage.", "Perintah Save menuliskan naskah tulisan dari memori ke penyimpanan permanen di komputer."),
  makeQ("What happens to a file when you drag it into the Recycle Bin (Trash) on your computer?",
    "Apa yang terjadi pada berkas ketika kamu menyeretnya ke Recycle Bin (tempat sampah) di komputer?",
    ["It is moved to temporary trash where it can be restored if deleted by mistake", "It is destroyed by laser", "It prints out on paper", "It turns into a photo"],
    ["Dipindahkan ke tempat sampah sementara dan masih bisa dipulihkan jika tidak sengaja terhapus", "Hancur terbakar laser", "Langsung tercetak di kertas", "Berubah menjadi foto"], 0,
    "The Recycle Bin holds deleted files temporarily until emptied, allowing recovery.", "Recycle Bin menampung berkas terhapus sementara waktu agar bisa dikembalikan jika dibutuhkan."),
  makeQ("What command do you use to change the name of an existing document to a better title?",
    "Perintah apakah yang kamu gunakan untuk mengganti nama berkas dokumen menjadi judul yang lebih sesuai?",
    ["Rename", "Cut", "Format", "Refresh"],
    ["Ubah nama (Rename)", "Potong (Cut)", "Format disk", "Segarkan (Refresh)"], 0,
    "The Rename function updates the file's identifier in the file system table.", "Perintah Rename mengganti nama berkas tanpa mengubah isi dokumen di dalamnya."),
  makeQ("What do the letters '.txt' or '.docx' at the end of a filename represent?",
    "Apakah arti huruf '.txt' atau '.docx' di bagian akhir nama suatu berkas dokumen?",
    ["The file extension (indicating the file format and application type)", "The author's initials", "The computer price", "The password"],
    ["Ekstensi berkas (menunjukkan jenis format dan aplikasi pembuatnya)", "Inisial nama pembuat", "Harga komputer", "Kata sandi rahasia"], 0,
    "File extensions tell operating systems which software application opens the file format.", "Ekstensi berkas memberitahu komputer program apa yang cocok untuk membuka berkas tersebut."),
  makeQ("Which keyboard shortcut lets you make an exact copy of a selected file or image?",
    "Pintasan keyboard manakah yang digunakan untuk menyalin (copy) berkas atau gambar yang dipilih?",
    ["Ctrl + C (or Cmd + C)", "Ctrl + Z", "Ctrl + P", "Ctrl + Alt + Del"],
    ["Ctrl + C (atau Cmd + C)", "Ctrl + Z", "Ctrl + P", "Ctrl + Alt + Del"], 0,
    "Ctrl + C places a duplicate of the selected item onto the digital clipboard.", "Pintasan Ctrl + C menyalin data ke memori clipboard tanpa menghapus berkas aslinya."),
  makeQ("Which keyboard shortcut pastes the copied file into a new folder?",
    "Pintasan keyboard manakah yang digunakan untuk menempelkan (paste) berkas yang telah disalin ke folder baru?",
    ["Ctrl + V (or Cmd + V)", "Ctrl + S", "Ctrl + W", "Ctrl + X"],
    ["Ctrl + V (atau Cmd + V)", "Ctrl + S", "Ctrl + W", "Ctrl + X"], 0,
    "Ctrl + V pastes items stored on the clipboard into the destination folder.", "Pintasan Ctrl + V menaruh salinan berkas dari clipboard ke folder tujuan."),
  makeQ("Why is giving meaningful names to files (like 'Math_Homework_Grade2.docx') recommended?",
    "Mengapa memberi nama berkas yang jelas (seperti 'Tugas_Matematika_Kelas2.docx') sangat dianjurkan?",
    ["It makes it easy to search, find, and identify files quickly later on", "It uses less electricity", "It prevents computers from sleeping", "It makes text colorful"],
    ["Memudahkan kita mencari, menemukan, dan mengenali isi berkas di kemudian hari", "Lebih hemat listrik", "Mencegah komputer tertidur", "Membuat tulisan jadi warna-warni"], 0,
    "Descriptive naming conventions improve file organization and search efficiency.", "Penamaan yang deskriptif menghemat waktu saat kita ingin membuka kembali dokumen penting."),
  makeQ("What tool in Windows Explorer or macOS Finder helps you locate a missing document by typing keywords?",
    "Fitur apakah di Windows Explorer atau macOS Finder yang membantu mencari berkas hilang dengan mengetik kata kunci?",
    ["The Search Bar", "The Volume Slider", "The Recycle Bin", "The Clock Widget"],
    ["Bilah pencarian (Search bar)", "Pengatur volume suara", "Tempat sampah", "Jam digital"], 0,
    "The search bar indexes and locates files matching typed names or contents.", "Kolom pencarian menelusuri seluruh folder untuk menampilkan berkas yang sesuai kata kunci."),
  makeQ("Why should you save backup copies of important school projects onto a USB flash drive or cloud storage?",
    "Mengapa kita sebaiknya membuat salinan cadangan (backup) tugas penting ke flashdisk atau penyimpanan cloud?",
    ["To ensure you don't lose your work if your computer breaks down or gets damaged", "To make the file twice as long", "To print it automatically", "To delete the original"],
    ["Menghindari hilangnya tugas jika komputer rusak atau mengalami masalah teknis", "Agar isi tugas menjadi dua kali lipat", "Supaya tercetak otomatis", "Untuk menghapus berkas asli"], 0,
    "Backing up data protects against hardware failure, accidental deletion, and corruption.", "Cadangan berkas (backup) menyelamatkan hasil kerja keras kita saat terjadi kendala pada perangkat.")
]);

setPack('sd-2::ict::Digital Ethics and Safety', [
  makeQ("What is 'Netiquette' in computer and digital communication?",
    "Apakah yang dimaksud dengan 'Netiket' (etika berinternet) dalam komunikasi digital?",
    ["Using polite, respectful, and kind manners when interacting online", "A special computer game", "A fast internet cable", "A computer virus"],
    ["Bersikap sopan, menghargai sesama, dan bertutur kata baik saat berkomunikasi di internet", "Permainan komputer khusus", "Kabel internet berkecepatan tinggi", "Jenis virus komputer"], 0,
    "Netiquette defines courteous, respectful social conventions for digital correspondence.", "Netiket adalah aturan tata krama dan kesopanan saat berinteraksi di dunia maya."),
  makeQ("Before taking or posting a photograph of a classmate online, what should you always do?",
    "Sebelum mengambil atau mengunggah foto teman sekelas ke internet, apa yang wajib kamu lakukan?",
    ["Ask their permission and ensure a teacher or parent approves", "Post it without asking anyone", "Edit funny faces on them secretly", "Sell the photo"],
    ["Meminta izin kepada teman tersebut dan memastikan disetujui guru atau orang tua", "Langsung mengunggahnya tanpa bertanya", "Mengedit wajah teman secara diam-diam", "Menjual foto tersebut"], 0,
    "Respecting privacy requires obtaining explicit consent before sharing images of others.", "Menghormati privasi orang lain berarti selalu meminta izin sebelum menyebarkan fotonya."),
  makeQ("Why is sharing personal details (such as your full address or school location) with online strangers dangerous?",
    "Mengapa membagikan informasi pribadi (seperti alamat rumah atau nama sekolah) kepada orang asing di internet sangat berbahaya?",
    ["It can compromise your personal safety and allow strangers to locate you in the real world", "It makes your internet run too fast", "It changes your wallpaper", "It makes batteries drain"],
    ["Dapat mengancam keselamatan diri dan memungkinkan orang berniat buruk melacak keberadaanmu", "Membuat internet berjalan terlalu cepat", "Mengubah gambar latar desktop", "Membuat baterai cepat habis"], 0,
    "Protecting personally identifiable information (PII) prevents real-world safety risks.", "Menjaga kerahasiaan identitas pribadi melindungi anak dari bahaya kejahatan di dunia nyata."),
  makeQ("What should you do before walking away from a shared computer in a school computer lab?",
    "Apa yang sebaiknya kamu lakukan sebelum meninggalkan komputer bersama di ruang laboratorium sekolah?",
    ["Save your work and log out of your personal student account", "Leave all personal chats open", "Turn off the classroom lights", "Take the mouse home"],
    ["Simpan hasil kerjamu lalu keluar (Log Out) dari akun siswa", "Membiarkan semua pesan obrolan terbuka", "Mematikan lampu ruangan kelas", "Membawa pulang mouse komputer"], 0,
    "Logging out prevents other users from accessing or modifying your personal account.", "Keluar dari akun (Log out) mencegah orang lain menyalahgunakan akun sekolah milikmu."),
  makeQ("What should you do if someone is being mean, teasing, or sending unkind messages to you online?",
    "Apa yang harus kamu lakukan jika seseorang bersikap jahat, mengejek, atau mengirim pesan kasar kepadamu di internet?",
    ["Do not reply angrily; take a screenshot and immediately tell a trusted adult or teacher", "Send mean insults back", "Keep it a secret and cry alone", "Delete the computer screen"],
    ["Jangan membalas dengan amarah; simpan bukti pesan lalu segera laporkan ke guru atau orang tua", "Membalas dengan kata-kata yang lebih kasar", "Menyimpannya sendiri dan menangis", "Menghapus layar monitor"], 0,
    "Reporting cyberbullying to responsible adults ensures prompt intervention and safety.", "Melaporkan perundungan siber (cyberbullying) kepada orang dewasa membantu menyelesaikan masalah dengan aman."),
  makeQ("Why should you never click on flashing advertisements claiming 'You won a free million-dollar smartphone!'?",
    "Mengapa kamu tidak boleh mengklik iklan berkedip yang menyatakan 'Kamu memenangkan hadiah uang tunai dan ponsel gratis!'?",
    ["They are phishing scams designed to trick you or download harmful malware onto your device", "Because the phone is too heavy", "Because you have too many phones", "Because the screen will turn green"],
    ["Itu adalah penipuan (scam / phishing) yang bertujuan menjebak atau menyusupkan virus ke perangkatmu", "Karena ponselnya terlalu berat", "Karena kamu sudah punya banyak ponsel", "Karena layar akan berubah hijau"], 0,
    "Deceptive ads frequently distribute spyware, adware, or fraudulent credential phishing.", "Iklan palsu berkedip biasanya merupakan jebakan untuk mencuri data pribadi atau merusak perangkat."),
  makeQ("What makes a password strong and secure against guessing?",
    "Karakteristik apakah yang membuat sebuah kata sandi (password) kuat dan sulit ditebak orang lain?",
    ["A mixture of uppercase and lowercase letters, numbers, and symbols that is at least 8 characters long", "The word 'password123'", "Your own first name", "12345"],
    ["Kombinasi huruf besar, huruf kecil, angka, dan simbol unik dengan panjang minimal 8 karakter", "Kata 'password123'", "Nama panggilanmu sendiri", "Angka '12345'"], 0,
    "High-entropy passwords with mixed character sets resist dictionary and brute-force attacks.", "Kata sandi yang bervariasi antara huruf, angka, dan lambang menjaga keamanan akun dengan sangat kuat."),
  makeQ("Why is balancing computer screen time with outdoor play, sports, and reading books important?",
    "Mengapa menyeimbangkan waktu menatap layar gawai dengan bermain di luar, berolahraga, dan membaca buku sangat penting?",
    ["It keeps your body fit, protects eyesight, and ensures healthy mental and physical development", "Because computers stop working after 1 hour", "Because outdoors has no gravity", "Because books are heavy"],
    ["Menjaga kebugaran badan, kesehatan mata, dan mendukung pertumbuhan fisik yang seimbang", "Karena komputer rusak setelah 1 jam", "Karena di luar rumah tidak ada gravitasi", "Karena buku terlalu berat"], 0,
    "Limiting sedentary screen time promotes cardiovascular health, restful sleep, and ocular well-being.", "Aktivitas fisik di luar ruangan melatih otot badan dan menyegarkan pikiran dari kejenuhan menatap layar."),
  makeQ("What should you do if an online game prompts you to enter your parents' credit card number?",
    "Apa yang harus kamu lakukan jika sebuah permainan online memintamu memasukkan nomor kartu kredit orang tua?",
    ["Immediately ask your parents and never enter financial details without their presence and approval", "Type numbers you found in a wallet secretly", "Ask a stranger", "Guess random numbers"],
    ["Segera panggil orang tua dan jangan pernah memasukkan nomor pembayaran tanpa izin langsung dari mereka", "Mengetik nomor kartu secara diam-diam", "Bertanya pada orang asing", "Menebak angka acak"], 0,
    "Unauthorized purchases can cause substantial financial charges; adult consent is mandatory.", "Pembelian dalam aplikasi membutuhkan persetujuan orang tua agar tidak terjadi kerugian finansial."),
  makeQ("Respecting copyright means that when using pictures from the internet for a school report, you should:",
    "Menghormati hak cipta (copyright) berarti saat menggunakan gambar dari internet untuk tugas sekolah, kamu harus:",
    ["Give credit to the creator or website where you found the picture", "Claim you drew it yourself", "Erase the watermark", "Sell the picture"],
    ["Mencantumkan sumber atau nama pembuat gambar yang kamu gunakan dengan jujur", "Mengaku bahwa kamu yang menggambarnya sendiri", "Menghapus tanda nama pembuat", "Menjual gambar tersebut ke teman"], 0,
    "Attribution acknowledges intellectual property rights and models academic honesty.", "Mencantumkan sumber gambar adalah wujud kejujuran akademis dan menghargai karya orang lain.")
]);

setPack('sd-2::ict::Patterns and Logic', [
  makeQ("In the repeating shape sequence: Circle, Square, Triangle, Circle, Square, Triangle, Circle... what shape comes next?",
    "Dalam pola urutan bentuk: Lingkaran, Persegi, Segitiga, Lingkaran, Persegi, Segitiga, Lingkaran... bentuk apakah selanjutnya?",
    ["Square", "Star", "Hexagon", "Circle"],
    ["Persegi (Square)", "Bintang", "Segienam", "Lingkaran"], 0,
    "The repeating pattern unit is (Circle, Square, Triangle). After Circle comes Square.", "Pola berulang terdiri dari Lingkaran, Persegi, Segitiga. Maka setelah Lingkaran adalah Persegi."),
  makeQ("What comes next in the counting pattern: 2, 4, 6, 8, 10, ...?",
    "Bilangan apakah yang melengkapi pola barisan bilangan loncat: 2, 4, 6, 8, 10, ...?",
    ["12", "11", "13", "14"],
    ["12", "11", "13", "14"], 0,
    "The rule is add 2 each time. 10 + 2 = 12.", "Aturan polanya adalah bertambah 2 setiap langkah. 10 + 2 = 12."),
  makeQ("In computer logic, a statement like 'The Sun is hot' evaluates to which boolean value?",
    "Dalam logika komputer, pernyataan seperti 'Matahari itu panas' bernilai boolean apa?",
    ["True (Benar)", "False (Salah)", "Maybe", "Unknown"],
    ["True (Benar)", "False (Salah)", "Mungkin", "Tidak tahu"], 0,
    "Boolean logic evaluates factual propositions strictly to True (1) or False (0).", "Logika boolean menilai kebenaran suatu pernyataan secara pasti: True (Benar) atau False (Salah)."),
  makeQ("If a conditional code rule states: 'IF it is raining, THEN take an umbrella', what do you do on a sunny day?",
    "Jika aturan logika komputer berbunyi: 'JIKA hujan, MAKA bawa payung', apa tindakanmu saat hari panas cerah?",
    ["Do not take an umbrella, because the condition (raining) is False", "Take 5 umbrellas", "Open the umbrella inside", "Turn on the shower"],
    ["Tidak perlu membawa payung, karena syarat (hujan) bernilai Salah (False)", "Membawa 5 payung", "Membuka payung di kamar", "Menyalakan keran air"], 0,
    "When an IF condition evaluates to False, the dependent THEN clause does not execute.", "Jika syarat kondisi tidak terpenuhi (False), maka perintah di dalam blok IF tidak dijalankan."),
  makeQ("Which item is the 'odd one out' that does NOT match the category: Apple, Banana, Orange, Hammer?",
    "Benda manakah yang berbeda sendiri dan TIDAK cocok dengan kelompoknya: Apel, Pisang, Jeruk, Palu besi?",
    ["Hammer (it is a tool, while the others are fruits)", "Apple", "Banana", "Orange"],
    ["Palu besi (karena palu adalah perkakas tukang, sedangkan lainnya adalah buah)", "Apel", "Pisang", "Jeruk"], 0,
    "Categorization groups items by shared attributes; hammer belongs to tools, not fruits.", "Klasifikasi data mengelompokkan benda berdasarkan kesamaan jenis. Palu bukan jenis buah-buahan."),
  makeQ("What is the next number in the descending pattern: 20, 18, 16, 14, 12, ...?",
    "Bilangan apakah selanjutnya pada pola hitung mundur berikut: 20, 18, 16, 14, 12, ...?",
    ["10", "11", "9", "8"],
    ["10", "11", "9", "8"], 0,
    "The rule subtracts 2 each step: 12 - 2 = 10.", "Pola bilangan berkurang 2 pada setiap langkah: 12 - 2 = 10."),
  makeQ("What computational thinking concept means breaking down a large complex problem into smaller, simpler tasks?",
    "Konsep berpikir komputasional apakah yang berarti memecah masalah besar yang rumit menjadi bagian-bagian kecil yang lebih mudah diselesaikan?",
    ["Decomposition", "Copying", "Deleting", "Guessing"],
    ["Dekomposisi (Decomposition)", "Menyalin", "Menghapus", "Menebak"], 0,
    "Decomposition partitions problems into modular sub-tasks that are easier to analyze and solve.", "Dekomposisi membagi persoalan rumit menjadi sub-masalah kecil agar lebih mudah dituntaskan."),
  makeQ("In a flowchart, which standard geometric symbol indicates the Start or End point?",
    "Dalam diagram alir (flowchart), simbol geometri apakah yang menunjukkan titik Mulai (Start) atau Selesai (End)?",
    ["An oval or rounded rectangle", "A sharp star", "A zigzag spiral", "A cloud"],
    ["Bentuk oval atau persegi panjang bersudut tumpul (terminator)", "Bintang runcing", "Garis zig-zag", "Awan mendung"], 0,
    "Oval terminator symbols designate the start and termination points of flowcharts.", "Simbol oval (terminator) digunakan secara standar untuk mengawali dan mengakhiri diagram alir."),
  makeQ("What does a diamond-shaped symbol represent in a programming flowchart?",
    "Apakah fungsi simbol belah ketupat (diamond) pada diagram alir (flowchart) program?",
    ["A decision point with a question that branches into Yes/No paths", "A decorative sticker", "Where the computer shuts down", "The screen brightness"],
    ["Titik pengambilan keputusan dengan pertanyaan bercabang Ya atau Tidak", "Stiker hiasan gambar", "Tempat komputer mati", "Tingkat kecerahan layar"], 0,
    "Diamond nodes evaluate conditional statements, directing program flow down multiple branches.", "Bentuk belah ketupat menguji suatu kondisi dan mengarahkan aliran logika ke cabang Ya atau Tidak."),
  makeQ("If a robot code says: 'Repeat 4 times: (Walk 1 step, Turn 90 degrees right)', what geometric path does it walk?",
    "Jika kode robot berbunyi: 'Ulangi 4 kali: (Maju 1 langkah, Belok kanan 90 derajat)', bentuk lintasan apakah yang dilaluinya?",
    ["A complete square that returns to where it started", "A straight unending line", "A circle with no corners", "A zigzag stair"],
    ["Bentuk persegi sempurna yang kembali ke titik awal", "Garis lurus tanpa batas", "Lingkaran tanpa sudut", "Tangga zig-zag"], 0,
    "Four 90-degree turns and equal steps trace the perimeter of a closed geometric square.", "Empat kali belok siku-siku 90 derajat dengan langkah sama panjang membentuk bangun datar persegi.")
]);

console.log("Applying SD 1 & SD 2 packs...");
for (const [key, pack] of Object.entries(THEME_DATA)) {
  const [gradeLevel, subject, theme] = key.split('::');
  const matched = questions.filter(q => q.gradeLevel === gradeLevel && q.subject === subject && q.theme === theme);
  if (matched.length > 0) {
    matched.forEach((q, idx) => {
      if (pack[idx]) {
        const item = pack[idx];
        q.question = item.qEn;
        q.questionText = item.qEn;
        q.questionIdText = item.qId;
        q.options = [...item.optionsEn];
        q.optionsId = [...item.optionsId];
        q.correctIndex = item.correctIndex;
        q.answerLetter = ['A', 'B', 'C', 'D'][item.correctIndex];
        q.correctAnswer = item.optionsEn[item.correctIndex];
        q.correctAnswerId = item.optionsId[item.correctIndex];
        q.explanation = item.expEn;
        q.explanationId = item.expId;
      }
    });
  }
}

fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf8');
console.log("SD 1 math & SD 2 ICT packs saved.");
