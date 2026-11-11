// Question packs for SMP 1 (Grade 7)
function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return { qEn, qId, optionsEn, optionsId, correctIndex: correctIdx, expEn, expId };
}

const packs = {};

// ==========================================
// SMP 1 SCIENCE (4 themes)
// ==========================================
packs['smp-1::science::Classification of Living Things'] = [
  makeQ(
    "Which five-kingdom classification system was proposed by Robert H. Whittaker?",
    "Sistem klasifikasi lima kingdom yang diusulkan oleh Robert H. Whittaker terdiri dari?",
    ["Monera, Protista, Fungi, Plantae, Animalia", "Archaea, Bacteria, Eukarya, Plantae, Animalia", "Algae, Fungi, Plants, Animals, Viruses", "Vertebrates, Invertebrates, Plants, Fungi, Bacteria"],
    ["Monera, Protista, Fungi, Plantae, Animalia", "Archaea, Bacteria, Eukarya, Plantae, Animalia", "Alga, Fungi, Tumbuhan, Hewan, Virus", "Vertebrata, Invertebrata, Tumbuhan, Jamur, Bakteri"],
    0,
    "Whittaker (1969) grouped living things into Monera, Protista, Fungi, Plantae, and Animalia.",
    "Whittaker mengelompokkan makhluk hidup ke dalam Monera, Protista, Fungi, Plantae, dan Animalia."
  ),
  makeQ(
    "What main characteristic distinguishes prokaryotic organisms from eukaryotic organisms?",
    "Ciri utama yang membedakan sel prokariotik dari sel eukariotik adalah?",
    ["Prokaryotes lack a membrane-bound nucleus", "Prokaryotes contain mitochondria", "Eukaryotes lack DNA", "Prokaryotes have chloroplasts"],
    ["Prokariotik tidak memiliki membran inti sel (nukleus sejati)", "Prokariotik memiliki mitokondria", "Eukariotik tidak memiliki materi genetik DNA", "Prokariotik memiliki kloroplas"],
    0,
    "Prokaryotes (like bacteria) lack a distinct membrane-enclosed nucleus.",
    "Sel prokariotik seperti bakteri tidak memiliki membran inti yang membungkus materi genetiknya."
  ),
  makeQ(
    "In the binomial nomenclature naming system created by Carl Linnaeus, what does the first word represent?",
    "Dalam sistem tata nama ganda (binomial nomenklatur) oleh Carolus Linnaeus, kata pertama menunjukkan tingkatan?",
    ["Genus (capitalized)", "Species epithet (lowercase)", "Family name", "Order"],
    ["Genus (ditulis dengan huruf kapital di awal)", "Penunjuk spesies (huruf kecil)", "Famili (suku)", "Ordo (bangsa)"],
    0,
    "In binomial nomenclature, the first word is the Genus (capitalized) and the second is the species epithet.",
    "Kata pertama adalah Genus berawalan kapital, kata kedua adalah penunjuk spesies dengan huruf kecil."
  ),
  makeQ(
    "Which taxonomic hierarchy order is correct from broadest to most specific?",
    "Urutan taksonomi makhluk hidup dari yang paling luas (umum) ke paling spesifik (khusus) adalah?",
    ["Kingdom -> Phylum/Division -> Class -> Order -> Family -> Genus -> Species", "Species -> Genus -> Family -> Order -> Class -> Phylum -> Kingdom", "Kingdom -> Class -> Order -> Phylum -> Genus -> Species -> Family", "Phylum -> Kingdom -> Family -> Class -> Order -> Species -> Genus"],
    ["Kingdom -> Filum/Divisi -> Kelas -> Ordo -> Famili -> Genus -> Spesies", "Spesies -> Genus -> Famili -> Ordo -> Kelas -> Filum -> Kingdom", "Kingdom -> Kelas -> Ordo -> Filum -> Genus -> Spesies -> Famili", "Filum -> Kingdom -> Famili -> Kelas -> Ordo -> Spesies -> Genus"],
    0,
    "Taxonomy descends: Kingdom, Phylum/Division, Class, Order, Family, Genus, and Species.",
    "Urutan taksonomi dari umum ke khusus: Kingdom, Filum/Divisi, Kelas, Ordo, Famili, Genus, Spesies."
  ),
  makeQ(
    "What identification tool consists of a series of paired contrasting statements used to classify unknown specimens?",
    "Alat bantu klasifikasi yang terdiri atas serangkaian pertanyaan atau ciri berlawanan secara berpasangan disebut?",
    ["Dichotomous key (Kunci determinasi dikotomi)", "Taxonomic radar", "Phylogenetic thermometer", "Electrophoresis chart"],
    ["Kunci determinasi dikotomi (Dichotomous key)", "Radar taksonomi", "Termometer filogenetik", "Bagan elektroforesis"],
    0,
    "A dichotomous key presents pairs of mutually exclusive diagnostic traits to identify species.",
    "Kunci dikotomi memuat dua pilihan ciri morfologi yang saling berlawanan di setiap tahapan."
  ),
  makeQ(
    "To which kingdom does a single-celled Amoeba proteus or Paramecium caudatum belong?",
    "Organisme uniseluler seperti Amoeba proteus atau Paramecium caudatum dikelompokkan ke dalam kingdom?",
    ["Protista", "Monera", "Plantae", "Animalia"],
    ["Protista", "Monera", "Plantae", "Animalia"],
    0,
    "Single-celled eukaryotic microorganisms are classified under kingdom Protista.",
    "Amoeba dan Paramecium adalah protista mirip hewan (protozoa) bersel satu dengan inti eukariotik."
  ),
  makeQ(
    "Why are fungi (mushrooms and yeasts) classified separately from plants?",
    "Mengapa jamur (Fungi) diklasifikasikan terpisah dan tidak dimasukkan ke dalam kingdom Plantae?",
    ["Fungi are heterotrophic and have chitin cell walls without chlorophyll", "Fungi produce flowers", "Fungi perform green photosynthesis", "Fungi are always multicellular animals"],
    ["Fungi bersifat heterotrof (tidak berklorofil) dan dinding selnya tersusun dari kitin", "Fungi menghasilkan bunga dan biji", "Fungi melakukan fotosintesis aktif", "Fungi adalah hewan multiseluler"],
    0,
    "Fungi cannot photosynthesize; they absorb nutrients and have chitinous cell walls.",
    "Jamur tidak memiliki klorofil untuk berfotosintesis dan dinding selnya tersusun dari zat kitin."
  ),
  makeQ(
    "Which vertebrate class is characterized by having endothermic metabolism, feathers, and hollow bones?",
    "Kelas hewan vertebrata yang memiliki ciri berdarah panas (endoterm), berbulu, dan memiliki tulang berongga adalah?",
    ["Aves (Birds)", "Reptilia", "Amphibia", "Mammalia"],
    ["Aves (Burung)", "Reptilia", "Amfibi", "Mamalia"],
    0,
    "Aves are feathered, warm-blooded vertebrates adapted for avian locomotion.",
    "Aves dicirikan oleh bulu pelindung, adaptasi terbang dengan tulang berongga, dan berdarah panas."
  ),
  makeQ(
    "What is the botanical difference between gymnosperms and angiosperms?",
    "Apakah perbedaan utama antara tumbuhan Gymnospermae dan Angiospermae?",
    ["Gymnosperms have naked seeds not enclosed in a fruit; Angiosperms bear enclosed seeds in fruits", "Gymnosperms produce sweet fleshy fruits with petals", "Angiosperms do not have seeds or flowers", "Both groups reproduce purely via asexual spores"],
    ["Gymnospermae berbiji terbuka (tidak dibungkus bakal buah); Angiospermae berbiji tertutup di dalam buah", "Gymnospermae selalu berbunga harum dengan kelopak", "Angiospermae tidak memiliki pembuluh xilem", "Keduanya berkembang biak murni menggunakan spora"],
    0,
    "Gymnosperms (e.g. pines) have naked seeds in cones; angiosperms have seeds enclosed within ovarian fruits.",
    "Gymnospermae (seperti pinus, melinjo) bijinya terbuka pada strobilus; Angiospermae bijinya terlindung daging buah."
  ),
  makeQ(
    "Which characteristic is shared by all organisms in the phylum Arthropoda?",
    "Ciri khas apakah yang dimiliki oleh seluruh kelompok hewan dalam filum Arthropoda?",
    ["Jointed appendages and a chitinous exoskeleton", "An internal bony skeleton and red hair", "Radial body symmetry without limbs", "Soft unsegmented bodies with calcium shells"],
    ["Kaki beruas-ruas/bersendi dan rangka luar (eksoskeleton) dari zat kitin", "Rangka dalam bertulang keras dan berbulu mamalia", "Simetri tubuh radial tanpa anggota gerak", "Tubuh lunak tidak bersegmen dengan cangkang kalsium"],
    0,
    "Arthropods (insects, crustaceans, arachnids) have segmented bodies, jointed legs, and chitin exoskeletons.",
    "Arthropoda (serangga, udang, laba-laba) memiliki tubuh beruas, kaki bersendi, dan eksoskeleton kitin."
  )
];

packs['smp-1::science::Temperature, Heat, and Expansion'] = [
  makeQ(
    "What is the definition of temperature in physical science?",
    "Apakah definisi suhu dalam ilmu fisika?",
    ["The measure of the average kinetic energy of the particles in an object", "The total mass of the object", "The volume occupied by matter", "The electrical charge of atoms"],
    ["Derajat atau ukuran energi kinetik rata-rata partikel dalam suatu benda", "Jumlah total massa suatu zat", "Volume ruang yang ditempati materi", "Muatan listrik partikel atom"],
    0,
    "Temperature quantifies the average translational kinetic energy of thermal particles.",
    "Suhu adalah ukuran derajat panas dinginnya suatu benda yang mencerminkan energi kinetik rata-rata partikel."
  ),
  makeQ(
    "At standard atmospheric pressure, what are the freezing and boiling points of water on the Celsius scale?",
    "Pada tekanan udara normal 1 atm, berapakah titik beku dan titik didih air pada skala Celsius?",
    ["0°C and 100°C", "32°C and 212°C", "273 K and 373 K", "0°C and 80°C"],
    ["0°C dan 100°C", "32°C dan 212°C", "273 K dan 373 K", "0°C dan 80°C"],
    0,
    "Celsius sets pure water ice melt at 0°C and steam boiling at 100°C.",
    "Skala Celsius menetapkan titik lebur es murni pada 0°C dan titik didih air pada 100°C."
  ),
  makeQ(
    "What is the mathematical conversion formula from Celsius (C) to Kelvin (K)?",
    "Rumus konversi suhu dari skala Celsius (C) ke skala mutlak Kelvin (K) adalah?",
    ["K = C + 273.15", "K = C - 273.15", "K = (9/5)C + 32", "K = (4/5)C"],
    ["K = C + 273,15", "K = C - 273,15", "K = (9/5)C + 32", "K = (4/5)C"],
    0,
    "Absolute zero corresponds to 0 K, so Kelvin = Celsius + 273.15.",
    "Nol mutlak (0 Kelvin) setara dengan -273,15°C, sehingga K = °C + 273,15."
  ),
  makeQ(
    "What method of heat transfer occurs through direct physical contact without movement of the bulk material?",
    "Perpindahan kalor yang merambat melalui suatu zat padat tanpa disertai perpindahan partikel zatnya disebut?",
    ["Conduction (Konduksi)", "Convection (Konveksi)", "Radiation (Radiasi)", "Evaporation"],
    ["Konduksi", "Konveksi", "Radiasi", "Evaporasi"],
    0,
    "Conduction transfers thermal energy via molecular collisions through solid matter.",
    "Konduksi adalah perpindahan kalor melalui zat padat akibat getaran partikel tanpa perpindahan zat."
  ),
  makeQ(
    "How does heat transfer across the vacuum of outer space from the Sun to Earth?",
    "Bagaimanakah energi panas dari Matahari dapat berpindah merambat melintasi ruang hampa menuju Bumi?",
    ["Through electromagnetic radiation (radiasi gelombang elektromagnetik)", "Through thermal conduction", "Through atmospheric convection loops", "Through sound vibrations"],
    ["Melalui radiasi gelombang elektromagnetik", "Melalui konduksi medium padat", "Melalui arus konveksi gas", "Melalui getaran gelombang bunyi"],
    0,
    "Radiation does not require any material medium because it travels as electromagnetic waves.",
    "Radiasi tidak membutuhkan medium partikel perantara karena merambat dalam bentuk gelombang elektromagnetik."
  ),
  makeQ(
    "Why are expansion gaps deliberately engineered between consecutive segments of railway tracks?",
    "Mengapa pada sambungan rel kereta api sengaja diberikan celah pemuaian (expansion gap)?",
    ["To allow thermal expansion on hot days without buckling or bending the rails", "To reduce train weight", "To make train whistles sound louder", "To allow rainwater drainage only"],
    ["Memberikan ruang bagi rel untuk memuai di siang hari yang terik agar tidak bengkok", "Mengurangi berat total rangkaian rel", "Agar suara roda kereta api terdengar ritmis", "Semata-mata untuk mengalirkan air hujan"],
    0,
    "Gaps allow steel to expand longitudinally in summer heat without undergoing buckling stress.",
    "Celah pemuaian mencegah rel baja melengkung dan rusak saat memuai karena kenaikan suhu."
  ),
  makeQ(
    "What device consists of two different metals bonded together that bends when heated due to unequal expansion rates?",
    "Alat yang terdiri dari dua keping logam berbeda koefisien muai yang direkatkan dan melengkung saat dipanaskan disebut?",
    ["Bimetallic strip (Keping bimetal)", "Galvanometer", "Hydrometer", "Barometer"],
    ["Keping bimetal (Bimetallic strip)", "Galvanometer", "Hidrometer", "Barometer"],
    0,
    "A bimetallic strip bends toward the metal with the lower thermal expansion coefficient, triggering thermostats.",
    "Keping bimetal melengkung ke arah logam yang memiliki koefisien muai lebih kecil, berguna pada termostat."
  ),
  makeQ(
    "Which formula calculates the heat energy (Q) required to raise the temperature of a mass (m) by delta T?",
    "Rumus fisika untuk menghitung kalor (Q) yang dibutuhkan untuk menaikkan suhu suatu benda bermassa (m) sebesar delta T adalah?",
    ["Q = m * c * delta T", "Q = m / (c * delta T)", "Q = m * v^2", "Q = F * s"],
    ["Q = m * c * delta T", "Q = m / (c * delta T)", "Q = m * v^2", "Q = F * s"],
    0,
    "Heat Q equals mass (m) times specific heat capacity (c) times temperature difference (delta T).",
    "Kalor Q dihitung dengan rumus Q = m * c * delta T, di mana c adalah kalor jenis benda."
  ),
  makeQ(
    "What property of liquid water causes it to reach maximum density at 4 degrees Celsius?",
    "Apakah keunikan sifat anomali air saat dipanaskan dari suhu 0 derajat sampai 4 derajat Celsius?",
    ["Water contracts and increases in density, reaching maximum density at 4 degrees Celsius", "Water immediately explodes into steam", "Water expands rapidly and floats", "Water loses all its mass"],
    ["Air menyusut volumenya dan mencapai massa jenis maksimum pada suhu 4 derajat Celsius", "Air langsung menguap menjadi uap", "Air memuai dengan sangat cepat", "Air kehilangan massanya"],
    0,
    "Between 0 and 4 degrees Celsius, water contracts, reaching maximum density at 4 degrees Celsius.",
    "Pada rentang 0 hingga 4 derajat Celsius volume air menyusut dan massa jenisnya maksimum pada 4 derajat Celsius."
  ),
  makeQ(
    "What natural phenomenon illustrates thermal convection currents in atmospheric coastal geography?",
    "Peristiwa alam di daerah pesisir pantai manakah yang merupakan bukti nyata terjadinya arus konveksi udara?",
    ["Sea breezes blowing inland by day and land breezes blowing seaward at night", "Glacier ice melting on mountains", "Ocean water freezing into icebergs", "Desert dunes forming sand ripples"],
    ["Angin laut bertiup ke darat pada siang hari dan angin darat bertiup ke laut pada malam hari", "Gletser mencair di lereng gunung", "Air laut membeku menjadi bongkahan es", "Pasir gurun membentuk bukit pasir"],
    0,
    "Differential heating between land and sea creates warm rising air columns and convection sea/land breezes.",
    "Perbedaan kalor jenis daratan dan lautan menghasilkan arus konveksi udara berupa angin darat dan angin laut."
  )
];

packs['smp-1::science::Organization of Life'] = [
  makeQ(
    "What is the basic structural and functional unit of all living organisms?",
    "Apakah unit struktural dan fungsional terkecil dari semua makhluk hidup?",
    ["Cell (Sel)", "Tissue (Jaringan)", "Organ", "Organ system"],
    ["Sel", "Jaringan", "Organ", "Sistem organ"],
    0,
    "The cell is the fundamental microscopic unit of life capable of independent metabolic functions.",
    "Sel merupakan satuan struktural dan fungsional terkecil penyusun makhluk hidup."
  ),
  makeQ(
    "Which cellular organelle is known as the 'powerhouse of the cell' where cellular respiration and ATP generation occur?",
    "Organel sel manakah yang berfungsi sebagai pusat pembangkit energi sel (tempat respirasi seluler dan pembentukan ATP)?",
    ["Mitochondria (Mitokondria)", "Ribosome", "Endoplasmic reticulum", "Golgi apparatus"],
    ["Mitokondria", "Ribosom", "Retikulum endoplasma", "Badan Golgi"],
    0,
    "Mitochondria convert biochemical nutrients into adenosine triphosphate (ATP) via aerobic respiration.",
    "Mitokondria mengoksidasi glukosa untuk menghasilkan energi ATP yang dibutuhkan sel."
  ),
  makeQ(
    "Which organelle and structure are found in plant cells but absent in typical animal cells?",
    "Struktur dan organel manakah yang terdapat pada sel tumbuhan tetapi tidak ditemukan pada sel hewan?",
    ["Cell wall made of cellulose and chloroplasts", "Mitochondria and cytoplasm", "Ribosomes and nucleus", "Plasma membrane and lysosome"],
    ["Dinding sel dari selulosa dan kloroplas (plastida)", "Mitokondria dan sitoplasma", "Ribosom dan inti sel", "Membran plasma dan lisosom"],
    0,
    "Plant cells possess rigid cellulose cell walls and photosynthetic chloroplasts; animal cells do not.",
    "Sel tumbuhan memiliki dinding sel kaku dan kloroplas berklorofil yang tidak ada pada sel hewan."
  ),
  makeQ(
    "What is a group of similar cells working together to perform a specialized physiological function called?",
    "Sekumpulan sel yang memiliki bentuk dan fungsi yang sama untuk menjalankan tugas tertentu disebut?",
    ["Tissue (Jaringan)", "Organ", "Organism", "Ecosystem"],
    ["Jaringan (Tissue)", "Organ", "Organisme", "Ekosistem"],
    0,
    "Cells aggregate into tissues (such as epithelial, muscle, or vascular xylem tissue).",
    "Jaringan adalah kumpulan sel serupa yang saling bekerja sama menjalankan fungsi khusus."
  ),
  makeQ(
    "Which plant vascular tissue is responsible for transporting water and dissolved minerals upward from roots to leaves?",
    "Jaringan pengangkut pada tumbuhan yang berfungsi mengangkut air dan mineral dari akar ke daun adalah?",
    ["Xylem (Pembuluh kayu)", "Phloem (Pembuluh tapis)", "Epidermis", "Collenchyma"],
    ["Xilem (Pembuluh kayu)", "Floem (Pembuluh tapis)", "Epidermis", "Kolenkim"],
    0,
    "Xylem conducts water and mineral ions upward via transpiration pull and root pressure.",
    "Xilem mengalirkan air dan garam hara dari tanah menuju daun untuk proses fotosintesis."
  ),
  makeQ(
    "What plant tissue transports synthesized sugars and photosynthetic organic products from leaves to the rest of the plant?",
    "Jaringan pada tumbuhan yang bertugas mengedarkan hasil fotosintesis (sukrosa/glukosa) dari daun ke seluruh tubuh adalah?",
    ["Phloem (Pembuluh tapis)", "Xylem", "Parenchyma", "Stomata"],
    ["Floem (Pembuluh tapis)", "Xilem", "Parenkim", "Stomata"],
    0,
    "Phloem translocates soluble organic nutrients produced during photosynthesis.",
    "Floem mengangkut hasil fotosintesis dari daun ke organ penyimpanan dan titik tumbuh."
  ),
  makeQ(
    "Which human organ system is responsible for filtering metabolic wastes from blood and producing urine?",
    "Sistem organ manusia manakah yang bertugas menyaring sisa metabolisme dari darah dan menghasilkan urine?",
    ["Excretory / Urinary System (Sistem Ekskresi)", "Digestive System", "Endocrine System", "Integumentary System"],
    ["Sistem Ekskresi / Perkemihan", "Sistem Pencernaan", "Sistem Endokrin", "Sistem Integumen"],
    0,
    "The kidneys, ureters, bladder, and urethra form the urinary excretory system.",
    "Ginjal, ureter, dan kandung kemih menyaring racun urea dari darah menjadi urine."
  ),
  makeQ(
    "What cellular organelle contains genetic DNA and controls overall cellular activities and gene expression?",
    "Organel sel yang memuat kromosom DNA dan mengendalikan seluruh aktivitas serta metabolisme sel adalah?",
    ["Nucleus (Inti sel)", "Vacuole", "Centrosome", "Peroxisome"],
    ["Nukleus (Inti sel)", "Vakuola", "Sentrosom", "Peroksisom"],
    0,
    "The nucleus houses genomic DNA and coordinates growth, protein synthesis, and division.",
    "Inti sel (nukleus) menyimpan materi genetik dan mengatur segala aktivitas kehidupan sel."
  ),
  makeQ(
    "What is the correct biological hierarchy of organization from micro to macro in multicellular organisms?",
    "Urutan tingkat organisasi kehidupan dari yang paling sederhana hingga kompleks pada organisme multiseluler adalah?",
    ["Cell -> Tissue -> Organ -> Organ System -> Organism", "Organism -> Organ System -> Organ -> Tissue -> Cell", "Tissue -> Cell -> Organ System -> Organ -> Organism", "Cell -> Organ -> Tissue -> Organism -> Organ System"],
    ["Sel -> Jaringan -> Organ -> Sistem Organ -> Organisme", "Organisme -> Sistem Organ -> Organ -> Jaringan -> Sel", "Jaringan -> Sel -> Sistem Organ -> Organ -> Organisme", "Sel -> Organ -> Jaringan -> Organisme -> Sistem Organ"],
    0,
    "Living hierarchies scale: Cell -> Tissue -> Organ -> Organ System -> Organism.",
    "Tingkatan struktural organisme: Sel membentuk Jaringan, Jaringan membentuk Organ, Organ membentuk Sistem Organ, hingga menjadi Organisme utuh."
  ),
  makeQ(
    "Which epithelial cells regulate the opening and closing of stomatal pores on plant leaves?",
    "Sel khusus pada epidermis daun yang dapat membuka dan menutup pori stomata untuk pertukaran gas disebut?",
    ["Guard cells (Sel penjaga / sel penutup)", "Palisade mesophyll cells", "Root hair cells", "Cork cells"],
    ["Sel penutup / sel penjaga (Guard cells)", "Sel mesofil palisade", "Sel rambut akar", "Sel gabus"],
    0,
    "Pairs of turgor-sensitive guard cells swell and shrink to control stomatal apertures.",
    "Sepasang sel penjaga mengatur pembukaan dan penutupan celah stomata untuk fotosintesis dan transpirasi."
  )
];

packs['smp-1::science::Motion and Forces'] = [
  makeQ(
    "What is the scientific distinction between speed (scalar) and velocity (vector)?",
    "Apakah perbedaan fisika antara kelajuan (besaran skalar) dan kecepatan (besaran vektor)?",
    ["Velocity specifies both numerical magnitude and direction of motion, while speed has only magnitude", "Speed has direction while velocity does not", "Speed is measured in seconds, velocity in hours", "There is no physical difference"],
    ["Kecepatan memiliki nilai dan arah gerak, sedangkan kelajuan hanya memiliki besar nilai saja", "Kelajuan memiliki arah sedangkan kecepatan tidak", "Kelajuan dihitung dalam detik, kecepatan dalam hari", "Keduanya sama persis tanpa perbedaan"],
    0,
    "Velocity is a displacement vector requiring direction; speed is scalar distance over time.",
    "Kecepatan adalah perpindahan dibagi waktu yang memiliki arah; kelajuan adalah jarak tempuh tanpa arah."
  ),
  makeQ(
    "Which of Newton's laws states that an object remains at rest or in uniform straight motion unless acted upon by a net external force?",
    "Hukum gerak Newton ke berapakah yang menyatakan bahwa benda akan tetap diam atau bergerak lurus beraturan jika resultan gaya bernilai nol?",
    ["Newton's First Law (Law of Inertia)", "Newton's Second Law", "Newton's Third Law", "Newton's Law of Universal Gravitation"],
    ["Hukum I Newton (Hukum Kelembaman / Inersia)", "Hukum II Newton", "Hukum III Newton", "Hukum Gravitasi Universal"],
    0,
    "Newton's First Law states Sigma F = 0 implies velocity remains constant (inertia).",
    "Hukum I Newton (kelembaman) menyatakan bahwa jika resultan gaya nol, benda diam tetap diam atau GLB."
  ),
  makeQ(
    "According to Newton's Second Law, how is net force (F), mass (m), and acceleration (a) related mathematically?",
    "Menurut Hukum II Newton, bagaimanakah hubungan matematis antara gaya bersih (F), massa (m), dan percepatan (a)?",
    ["F = m * a", "F = m / a", "F = a / m", "F = m + a"],
    ["F = m * a", "F = m / a", "F = a / m", "F = m + a"],
    0,
    "Newton's 2nd Law states net force equals mass times acceleration: F = m * a.",
    "Hukum II Newton menyatakan percepatan sebanding dengan gaya dan berbanding terbalik dengan massa: F = m * a."
  ),
  makeQ(
    "What action-reaction pair exemplifies Newton's Third Law when a swimmer pushes backward against pool water?",
    "Peristiwa manakah yang menunjukkan penerapan Hukum III Newton (Aksi-Reaksi) saat seorang perenang mendorong air ke belakang?",
    ["The swimmer pushes water backward (action), and the water exerts an equal force pushing the swimmer forward (reaction)", "The swimmer accelerates without applying force", "Water absorbs all force and creates vacuum", "Gravity pulls the pool water downward"],
    ["Perenang mendorong air ke belakang (gaya aksi), dan air mendorong tubuh perenang ke depan dengan gaya sama besar (gaya reaksi)", "Perenang meluncur tanpa memberikan gaya", "Air menyerap seluruh gaya tanpa balasan", "Gravitasi menarik air kolam ke bawah"],
    0,
    "Newton's Third Law: For every action force, there is an equal in magnitude and opposite in direction reaction force.",
    "Hukum III Newton: Gaya aksi dan reaksi selalu sama besar, berlawanan arah, dan bekerja pada benda berbeda."
  ),
  makeQ(
    "A vehicle accelerates uniformly from rest to 20 m/s over 5 seconds. What is its acceleration?",
    "Sebuah mobil bergerak dari keadaan diam hingga mencapai kecepatan 20 m/s dalam waktu 5 detik. Berapakah percepatannya?",
    ["4 m/s^2", "10 m/s^2", "100 m/s^2", "0.25 m/s^2"],
    ["4 m/s^2", "10 m/s^2", "100 m/s^2", "0,25 m/s^2"],
    0,
    "Acceleration a = (v - v0) / t = (20 - 0) / 5 = 4 m/s^2.",
    "Percepatan dihitung dengan a = (vt - v0) / t = (20 - 0) / 5 = 4 m/s^2."
  ),
  makeQ(
    "What is the difference between mass and weight in physics?",
    "Apakah perbedaan mendasar antara massa dan berat benda dalam fisika?",
    ["Mass is the constant quantity of matter in kg; Weight is the gravitational force acting on that mass in Newtons", "Weight is constant everywhere; Mass changes with gravity", "Mass is measured in Newtons and weight in kilograms", "Mass and weight are identical quantities"],
    ["Massa adalah jumlah materi bernilai tetap (kg); Berat adalah gaya gravitasi yang bekerja pada massa tersebut (Newton)", "Berat selalu tetap di mana pun; Massa berubah tergantung gravitasi planet", "Massa diukur dalam Newton dan berat dalam kilogram", "Massa dan berat bernilai sama persis"],
    0,
    "Mass (kg) is intrinsic matter; weight (W = m * g in Newtons) depends on local gravitational acceleration.",
    "Massa selalu konstan, sedangkan berat (W = m * g) dipengaruhi oleh percepatan gravitasi setempat."
  ),
  makeQ(
    "Which type of friction force prevents a heavy crate from beginning to slide across a floor when pushed lightly?",
    "Gaya gesek manakah yang bekerja menahan balok berat agar tetap diam saat mulai didorong secara perlahan?",
    ["Static friction (Gaya gesek statis)", "Kinetic friction (Gaya gesek kinetis)", "Rolling friction", "Viscous drag"],
    ["Gaya gesek statis (Static friction)", "Gaya gesek kinetis", "Gaya gesek gelinding", "Hambatan fluida"],
    0,
    "Static friction opposes initial movement until the applied force exceeds maximum static friction.",
    "Gaya gesek statis bekerja saat benda diam hingga tepat akan bergerak melawan kecenderungan arah gerak."
  ),
  makeQ(
    "In a Uniform Linear Motion (GLB - Gerak Lurus Beraturan), what characteristic describes the velocity and acceleration?",
    "Pada Gerak Lurus Beraturan (GLB), bagaimanakah sifat kecepatan dan percepatan benda tersebut?",
    ["Velocity is constant (unchanging) and acceleration is zero", "Velocity is constantly increasing and acceleration is constant", "Velocity decreases to zero instantly", "Acceleration is continuously varying"],
    ["Kecepatan bernilai konstan (tetap) dan percepatannya nol", "Kecepatan terus bertambah dan percepatannya konstan", "Kecepatan selalu menurun mendekati nol", "Percepatannya selalu berubah-ubah"],
    0,
    "Uniform linear motion exhibits constant velocity along a straight path, so acceleration = 0.",
    "GLB memiliki kelajuan/kecepatan tetap pada lintasan lurus sehingga percepatannya a = 0."
  ),
  makeQ(
    "Two forces act on a cart: F1 = 30 N to the right, and F2 = 18 N to the left. What is the net resultant force?",
    "Dua buah gaya bekerja pada sebuah balok: F1 = 30 N ke arah kanan, dan F2 = 18 N ke arah kiri. Berapakah resultan gayanya?",
    ["12 N to the right", "48 N to the right", "12 N to the left", "0 N (balanced)"],
    ["12 N ke kanan", "48 N ke kanan", "12 N ke kiri", "0 N (seimbang)"],
    0,
    "Net force = 30 N - 18 N = 12 N in the direction of the larger force (right).",
    "Resultan gaya adalah penjumlahan vektor: 30 N - 18 N = 12 N mengarah ke kanan."
  ),
  makeQ(
    "What happens to the passengers in a moving bus when the driver suddenly slams on the brakes?",
    "Apa yang dialami oleh penumpang di dalam bus yang melaju ketika pengemudi mengerem bus secara mendadak?",
    ["Passengers lurch forward due to their physical inertia wanting to maintain their forward motion", "Passengers fly backward toward the rear", "Passengers lift straight up to the ceiling", "Passengers stop moving instantly without shifting"],
    ["Penumpang terdorong ke depan karena sifat kelembaman tubuhnya yang cenderung mempertahankan gerak maju", "Penumpang tertarik ke belakang", "Penumpang terangkat ke atas", "Penumpang tidak mengalami gaya dorong apa pun"],
    0,
    "Passengers lurch forward because inertia resists the change in their forward velocity.",
    "Sesuai hukum kelembaman (inersia), tubuh penumpang berusaha mempertahankan gerak lurus ke depannya."
  )
];

module.exports = packs;
