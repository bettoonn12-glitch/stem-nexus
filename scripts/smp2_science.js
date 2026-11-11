function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return { qEn, qId, optionsEn, optionsId, correctIndex: correctIdx, expEn, expId };
}

const packs = {};

// ==========================================
// SMP 2 SCIENCE (4 themes)
// ==========================================
packs['smp-2::science::Digestive and Respiratory Systems'] = [
  makeQ(
    "What mechanical and chemical digestion processes occur in the human oral cavity (mouth)?",
    "Proses pencernaan mekanik dan kimiawi apakah yang terjadi di dalam rongga mulut manusia?",
    ["Teeth chew food mechanically, while salivary amylase (ptyalin) chemically breaks starch into maltose", "Stomach acid digests proteins in the mouth", "Bile salts emulsify dietary fats", "Nutrients are absorbed into blood capillaries"],
    ["Gigi mengunyah makanan secara mekanik, sedangkan enzim amilase (ptialin) mencerna amilum menjadi maltosa", "Asam lambung mencerna protein di dalam mulut", "Garam empedu mengemulsi lemak di rongga mulut", "Zat makanan langsung diserap ke dalam pembuluh darah"],
    0,
    "Mastication breaks food mechanically; salivary amylase begins hydrolyzing starches into simpler sugars.",
    "Gigi mengunyah secara mekanis, sementara enzim ptialin (amilase ludah) memecah amilum menjadi maltosa."
  ),
  makeQ(
    "What muscular wave-like contraction propels the food bolus downward through the esophagus into the stomach?",
    "Gerakan meremas dan mendorong bolus makanan sepanjang kerongkongan (esofagus) menuju lambung disebut?",
    ["Peristalsis (Gerak peristaltik)", "Osmosis", "Circulation", "Brownian movement"],
    ["Gerak peristaltik (Peristalsis)", "Osmosis", "Sirkulasi", "Gerak Brown"],
    0,
    "Peristalsis involves involuntary coordinated contractions of circular and longitudinal esophageal muscles.",
    "Gerak peristaltik adalah kontraksi otot dinding esofagus yang mendorong makanan menuju lambung."
  ),
  makeQ(
    "Which stomach digestive enzyme breaks dietary proteins down into shorter peptide chains in an acidic environment?",
    "Enzim pencernaan lambung manakah yang memecah protein menjadi pepton pada kondisi asam?",
    ["Pepsin", "Lipase", "Trypsin", "Lactase"],
    ["Pepsin", "Lipase", "Tripsin", "Laktase"],
    0,
    "Pepsinogen is activated by hydrochloric acid (HCl) into active pepsin, cleaving peptide bonds in proteins.",
    "Pepsinogen diaktifkan oleh asam klorida (HCl) menjadi pepsin untuk memecah protein menjadi pepton."
  ),
  makeQ(
    "In which segment of the digestive system does the vast majority of nutrient absorption into the bloodstream occur?",
    "Pada organ pencernaan manakah sebagian besar proses penyerapan sari-sari makanan ke dalam aliran darah berlangsung?",
    ["Small intestine (Ileum / Usus penyerapan)", "Large intestine (Colon)", "Esophagus", "Stomach"],
    ["Usus halus (khususnya Ileum)", "Usus besar (Kolon)", "Kerongkongan", "Lambung"],
    0,
    "Microvilli across the small intestine provide a vast absorptive surface for amino acids, sugars, and fatty acids.",
    "Jonjot usus (vili) pada usus penyerapan (ileum) memperluas bidang penyerapan nutrisi ke dalam pembuluh kapiler darah dan getah bening."
  ),
  makeQ(
    "What is the primary physiological function of the large intestine (colon)?",
    "Apakah fungsi fisiologis utama dari usus besar (kolon) dalam sistem pencernaan manusia?",
    ["Reabsorption of excess water and electrolytes, and solidifying indigestible wastes with symbiotic bacteria", "Digesting proteins into amino acids", "Secreting insulin into the blood", "Absorbing carbohydrates"],
    ["Menyerap kembali kelebihan air dan mineral serta memadatkan feses dibantu bakteri pembusuk", "Mencerna protein menjadi asam amino", "Menghasilkan hormon insulin", "Menyerap zat karbohidrat"],
    0,
    "The colon extracts water and salts from unabsorbed chyme, while microbiota synthesize vitamins K and B.",
    "Usus besar menyerap sisa air, memadatkan kotoran, dan bakteri E. coli membusukkan sisa serta membentuk vitamin K."
  ),
  makeQ(
    "In the human respiratory tract, what microscopic air sacs are the specific site of gas exchange (O2 and CO2) with capillaries?",
    "Struktur kantung udara mikroskopis manakah pada paru-paru yang menjadi tempat pertukaran gas oksigen dan karbon dioksida?",
    ["Alveoli (Alveolus)", "Bronchioles", "Trachea", "Larynx"],
    ["Alveolus (Alveoli)", "Bronkiolus", "Trakea", "Laring"],
    0,
    "Alveoli provide a vast, thin, moist membrane surrounded by capillary beds where gases diffuse down gradients.",
    "Alveolus memiliki dinding tipis yang berbatasan langsung dengan kapiler darah untuk difusi O2 dan CO2."
  ),
  makeQ(
    "During inhalation (breathing in), what happens to the diaphragm muscle and chest cavity volume?",
    "Saat kita menarik napas (inhalasi), apakah yang terjadi pada otot diafragma dan volume rongga dada?",
    ["The diaphragm contracts and flattens downward, expanding the chest volume and drawing air in", "The diaphragm relaxes and arches upward, compressing the lungs", "The ribs drop downward and chest shrinks", "The lungs expel air forcibly"],
    ["Otot diafragma berkontraksi mendatar, volume rongga dada membesar, dan udara luar terhisap masuk", "Diafragma relaksasi melengkung ke atas mengecilkan rongga dada", "Tulang rusuk turun ke bawah", "Paru-paru memompa udara keluar"],
    0,
    "Diaphragm contraction flattens its dome, increasing thoracic volume and decreasing alveolar pressure below atmosphere.",
    "Kontraksi diafragma menjadikannya mendatar, memperbesar volume dada sehingga tekanan paru-paru turun dan udara masuk."
  ),
  makeQ(
    "What respiratory pigment in red blood cells binds oxygen molecules to transport them throughout the body?",
    "Pigmen protein pengangkut oksigen yang terdapat di dalam sel darah merah (eritrosit) disebut?",
    ["Hemoglobin", "Chlorophyll", "Myoglobin", "Keratin"],
    ["Hemoglobin", "Klorofil", "Mioglobin", "Keratin"],
    0,
    "Hemoglobin contains iron-binding heme groups that form oxyhemoglobin (HbO2) to deliver oxygen to tissues.",
    "Hemoglobin mengandung gugus besi (Fe) yang mengikat gas oksigen membentuk oksihemoglobin untuk diedarkan ke seluruh sel tubuh."
  ),
  makeQ(
    "What is the average resting tidal volume of air exchanged in a single normal breath by an adult?",
    "Berapakah volume udara pernapasan biasa (udara tidal) yang dihirup dan dihembuskan saat bernapas normal oleh orang dewasa?",
    ["Approximately 500 mL", "Approximately 5,000 mL", "Approximately 50 mL", "Approximately 1,500 mL"],
    ["Sekitar 500 mL", "Sekitar 5.000 mL", "Sekitar 50 mL", "Sekitar 1.500 mL"],
    0,
    "Normal resting tidal volume is approximately 500 mL of air per breath.",
    "Volume tidal adalah jumlah udara yang keluar masuk pada pernapasan biasa, rata-rata sekitar 500 mL."
  ),
  makeQ(
    "Which respiratory disorder is characterized by chronic inflammation and constriction of the airways, causing wheezing?",
    "Gangguan pernapasan kronis yang ditandai dengan penyempitan dan peradangan saluran bronkus sehingga penderita sesak napas berbunyi mengi disebut?",
    ["Asthma (Asma)", "Pneumonia", "Emphysema", "Sinusitis"],
    ["Asma (Asthma)", "Pneumonia", "Emfisema", "Sinusitis"],
    0,
    "Asthma is a reactive airway condition causing bronchospasm, mucosal edema, and airflow obstruction.",
    "Asma adalah penyempitan saluran pernapasan akibat hipersensitivitas bronkus terhadap alergen atau udara dingin."
  )
];

packs['smp-2::science::Pressure in Solids, Liquids, and Gases'] = [
  makeQ(
    "What fundamental formula calculates hydrostatic pressure (P) at depth (h) in a liquid of density (rho)?",
    "Rumus fisika apakah yang digunakan untuk menghitung tekanan hidrostatis (P) pada kedalaman (h) di dalam zat cair bermassa jenis (rho)?",
    ["P = rho * g * h", "P = m * a", "P = F * s", "P = rho / (g * h)"],
    ["P = rho * g * h", "P = m * a", "P = F * s", "P = rho / (g * h)"],
    0,
    "Hydrostatic pressure equals liquid density (rho) times gravity (g) times depth beneath the surface (h).",
    "Tekanan hidrostatis zat cair berbanding lurus dengan massa jenis, percepatan gravitasi, dan kedalaman: P = rho * g * h."
  ),
  makeQ(
    "Which physical law states that an external pressure applied to an enclosed fluid is transmitted equally in all directions?",
    "Hukum fisika manakah yang menyatakan bahwa tekanan yang diberikan pada zat cair dalam ruang tertutup akan diteruskan ke segala arah sama besar?",
    ["Pascal's Principle (Hukum Pascal)", "Archimedes' Principle", "Boyle's Law", "Hooke's Law"],
    ["Hukum Pascal", "Hukum Archimedes", "Hukum Boyle", "Hukum Hooke"],
    0,
    "Pascal's Principle (P1 = P2, or F1/A1 = F2/A2) is the foundational operating law behind hydraulic jacks and presses.",
    "Hukum Pascal mendasari cara kerja dongkrak dan rem hidrolik: F1 / A1 = F2 / A2."
  ),
  makeQ(
    "What upward buoyant force acts on an object submerged in a fluid according to Archimedes' Principle?",
    "Menurut Hukum Archimedes, berapakah besar gaya apung ke atas (Fa) yang dialami oleh benda yang tercelup ke dalam zat cair?",
    ["Equal to the weight of the fluid displaced by the object", "Equal to the total mass of the Earth", "Twice the object's dry weight", "Zero in salty water"],
    ["Sama dengan berat zat cair yang dipindahkan oleh benda tersebut", "Sama dengan massa total Bumi", "Dua kali lipat berat kering benda", "Nol di air garam"],
    0,
    "Archimedes: Buoyant force Fa = rho_fluid * g * V_submerged, which equals the displaced fluid weight.",
    "Hukum Archimedes menyatakan gaya ke atas sama besar dengan berat fluida yang didesak atau dipindahkan oleh benda."
  ),
  makeQ(
    "Under what density condition will an object float at equilibrium in water?",
    "Berdasarkan perbandingan massa jenis, kapan suatu benda akan terapung di permukaan air?",
    ["When the average density of the object is less than the density of water (rho_benda < rho_air)", "When the object is heavier than lead", "When the object is completely spherical", "When the object's temperature is 100 degrees Celsius"],
    ["Ketika massa jenis rata-rata benda lebih kecil daripada massa jenis air (rho_benda < rho_air)", "Ketika massa jenis benda lebih besar dari air", "Ketika bentuk benda bulat sempurna", "Ketika suhunya 100 derajat Celsius"],
    0,
    "An object floats when its bulk density is lower than the surrounding liquid, achieving equilibrium at partial submergence.",
    "Benda akan terapung jika massa jenis rata-ratanya lebih kecil dari massa jenis zat cair."
  ),
  makeQ(
    "Why are the lower base walls of hydroelectric dams built much thicker than the upper crest walls?",
    "Mengapa dinding bagian dasar bendungan air selalu dibangun jauh lebih tebal dan kokoh dibandingkan dinding bagian atasnya?",
    ["Because hydrostatic water pressure increases proportionally with depth (P = rho * g * h)", "To save concrete at the bottom", "Because fish swim only at the bottom", "To block sunlight from entering the lake"],
    ["Karena tekanan hidrostatis air semakin ke bawah semakin besar sebanding dengan kedalaman", "Untuk menghemat semen di bagian bawah", "Karena ikan hanya berenang di bawah", "Untuk menghalau sinar matahari"],
    0,
    "Pressure increases with water depth h, exerting massive lateral hydrostatic forces against the dam base.",
    "Tekanan air paling besar berada di dasar bendungan, sehingga dinding penahan di dasar harus dibuat paling tebal."
  ),
  makeQ(
    "What instrument is standardly used to measure atmospheric air pressure?",
    "Alat ukur yang digunakan secara standar untuk mengukur tekanan udara atmosfer adalah?",
    ["Barometer", "Thermometer", "Spectrometer", "Hygrometer"],
    ["Barometer", "Termometer", "Spektrometer", "Higrometer"],
    0,
    "Barometers (mercury or aneroid) measure local atmospheric pressure relative to a vacuum.",
    "Barometer digunakan oleh ahli meteorologi untuk mengukur tekanan udara di suatu wilayah."
  ),
  makeQ(
    "How does atmospheric pressure change as altitude above sea level increases (e.g. climbing high mountains)?",
    "Bagaimanakah perubahan tekanan udara atmosfer ketika kita naik ke tempat yang lebih tinggi (seperti puncak gunung)?",
    ["Atmospheric pressure decreases because the column of air above becomes thinner and lighter", "Atmospheric pressure increases rapidly", "Pressure stays exactly identical everywhere on Earth", "Pressure doubles every 10 meters"],
    ["Tekanan udara semakin berkurang (menurun) karena lapisan kolom udara di atasnya semakin tipis", "Tekanan udara meningkat berlipat ganda", "Tekanan udara selalu sama di seluruh muka bumi", "Tekanan udara naik dua kali lipat tiap 10 meter"],
    0,
    "Air density and the overlying weight of the atmosphere diminish with altitude, decreasing pressure.",
    "Semakin tinggi suatu tempat dari permukaan laut, semakin tipis udara di atasnya sehingga tekanan udaranya mengecil."
  ),
  makeQ(
    "Which gas law states that at constant temperature, the volume of a fixed mass of gas is inversely proportional to its pressure (P1 * V1 = P2 * V2)?",
    "Hukum gas manakah yang menyatakan bahwa pada suhu tetap, volume gas berbanding terbalik dengan tekanannya (P1 * V1 = P2 * V2)?",
    ["Boyle's Law (Hukum Boyle)", "Charles's Law", "Gay-Lussac's Law", "Avogadro's Principle"],
    ["Hukum Boyle", "Hukum Charles", "Hukum Gay-Lussac", "Prinsip Avogadro"],
    0,
    "Boyle's Law: P * V = constant for an ideal gas at constant temperature.",
    "Hukum Boyle menyatakan hasil kali tekanan dan volume gas dalam ruang tertutup bernilai konstan jika suhunya tetap."
  ),
  makeQ(
    "In a hydraulic lift, small piston A1 = 5 cm^2 has a force F1 = 100 N applied. What lifting force F2 is generated at large piston A2 = 100 cm^2?",
    "Pada dongkrak hidrolik, piston kecil A1 = 5 cm^2 ditekan dengan gaya 100 N. Berapakah gaya angkat F2 pada piston besar A2 = 100 cm^2?",
    ["2,000 N", "500 N", "5 N", "10,000 N"],
    ["2.000 N", "500 N", "5 N", "10.000 N"],
    0,
    "F2 = F1 * (A2 / A1) = 100 N * (100 / 5) = 100 * 20 = 2,000 N.",
    "Hukum Pascal: F2 = F1 * (A2 / A1) = 100 * (100 / 5) = 100 * 20 = 2.000 Newton."
  ),
  makeQ(
    "Why can huge steel container ships weighing thousands of tons float easily on the ocean?",
    "Mengapa kapal laut raksasa yang terbuat dari baja berat bermassa ribuan ton dapat terapung di laut lepas?",
    ["The hollow hull shape creates a huge internal volume of air, making the average ship density less than seawater", "Steel turns lighter than foam in salt water", "The ocean magnetic field repels the ship upward", "Whales push the ship from beneath"],
    ["Bentuk lambung kapal yang berongga membuat volume totalnya sangat besar sehingga massa jenis rata-ratanya lebih kecil dari air laut", "Baja berubah menjadi lebih ringan dari busa di air asin", "Medan magnet laut menolak baja ke atas", "Ikan paus menopang kapal dari bawah"],
    0,
    "Displaced volume of water weighs more than the entire hollow steel vessel, producing equilibrium buoyancy.",
    "Rongga udara di lambung kapal memperbesar volume total kapal sehingga gaya apung ke atas menyeimbangkan berat totalnya."
  )
];

packs['smp-2::science::Vibrations, Waves, and Sound'] = [
  makeQ(
    "What is the definition of a vibration in physics?",
    "Apakah definisi dari getaran dalam ilmu fisika?",
    ["Periodic back-and-forth motion of an object about an equilibrium point", "Continuous straight-line motion in one direction", "Change of chemical state from liquid to gas", "Random thermal motion of electrons"],
    ["Gerak bolak-balik secara teratur dan periodik melalui titik kesetimbangan", "Gerak lurus beraturan satu arah tanpa henti", "Perubahan wujud dari cair ke gas", "Gerak acak elektron bebas"],
    0,
    "A vibration is an oscillation about a stable resting equilibrium position.",
    "Getaran adalah gerakan bolak-balik partikel di sekitar titik kesetimbangan secara periodik."
  ),
  makeQ(
    "What term describes the number of complete vibrations or wave cycles occurring per second, and what is its SI unit?",
    "Besaran yang menyatakan banyaknya getaran lengkap yang terjadi dalam waktu satu detik disebut, dan apa satuannya?",
    ["Frequency, measured in Hertz (Hz)", "Period, measured in seconds", "Amplitude, measured in meters", "Wavelength, measured in Pascals"],
    ["Frekuensi, dinyatakan dalam satuan Hertz (Hz)", "Periode, dalam detik", "Amplitudo, dalam meter", "Panjang gelombang, dalam Pascal"],
    0,
    "Frequency (f = 1/T) measures cycles per second, denoted in Hertz (Hz).",
    "Frekuensi (f) adalah banyaknya getaran per detik dengan satuan Hertz (Hz)."
  ),
  makeQ(
    "What is the mathematical relationship between wave speed (v), frequency (f), and wavelength (lambda)?",
    "Hubungan matematis apakah yang menghubungkan cepat rambat gelombang (v), frekuensi (f), dan panjang gelombang (lambda)?",
    ["v = lambda * f", "v = lambda / f", "v = f / lambda", "v = lambda + f"],
    ["v = lambda * f", "v = lambda / f", "v = f / lambda", "v = lambda + f"],
    0,
    "Wave velocity equals wavelength times frequency: v = lambda * f.",
    "Cepat rambat gelombang dihitung dengan rumus v = lambda * f (panjang gelombang dikali frekuensi)."
  ),
  makeQ(
    "What type of wave exhibits particle vibrations that are PERPENDICULAR to the direction of wave propagation?",
    "Jenis gelombang yang arah getar partikel mediumnya TEGAK LURUS terhadap arah rambat gelombangnya adalah?",
    ["Transverse wave (Gelombang transversal)", "Longitudinal wave", "Stationary pressure wave", "Acoustic compression wave"],
    ["Gelombang transversal", "Gelombang longitudinal", "Gelombang tekanan stasioner", "Gelombang mampatan"],
    0,
    "Transverse waves (e.g. water surface waves, light) oscillate perpendicular to wave energy travel.",
    "Gelombang transversal memiliki arah getaran yang tegak lurus dengan arah perambatannya, membentuk bukit dan lembah."
  ),
  makeQ(
    "What type of wave is sound, and how do its medium particles vibrate relative to wave travel?",
    "Termasuk jenis gelombang apakah gelombang bunyi, dan bagaimanakah arah getaran partikel mediumnya?",
    ["Longitudinal mechanical wave; particles oscillate parallel to the direction of wave travel (compressions and rarefactions)", "Transverse wave with crests and troughs", "Electromagnetic wave travelling in vacuum", "Stationary light beam"],
    ["Gelombang mekanik longitudinal; partikel bergetar sejajar dengan arah rambat gelombang (rapatan dan renggangan)", "Gelombang transversal dengan bukit dan lembah", "Gelombang elektromagnetik yang merambat di ruang hampa", "Berkas cahaya stasioner"],
    0,
    "Sound requires a medium and propagates via longitudinal density compressions and rarefactions.",
    "Bunyi adalah gelombang mekanik longitudinal yang merambat melalui rapatan dan renggangan partikel medium."
  ),
  makeQ(
    "Why can sound NOT propagate across outer space?",
    "Mengapa gelombang bunyi sama sekali TIDAK BISA merambat di ruang angkasa hampa udara?",
    ["Sound is a mechanical wave requiring a material medium of particles to transmit vibrations", "Outer space is too cold for sound", "Sound waves are absorbed by sunlight", "Sound travels only when gravity is zero"],
    ["Bunyi adalah gelombang mekanik yang memerlukan medium partikel materi untuk merambatkan getaran", "Suhu ruang angkasa terlalu dingin", "Bunyi terserap oleh sinar matahari", "Bunyi hanya merambat tanpa gravitasi"],
    0,
    "Mechanical waves rely on atomic collisions; in the vacuum of space, absence of matter prevents sound transmission.",
    "Bunyi membutuhkan medium (padat, cair, gas) untuk merambat; ketiadaan partikel di ruang hampa membuat bunyi tak terdengar."
  ),
  makeQ(
    "What range of sound frequencies can be heard by normal healthy human ears?",
    "Berapakah rentang frekuensi gelombang bunyi (audiosonik) yang dapat didengar oleh telinga manusia normal?",
    ["20 Hz to 20,000 Hz", "0 Hz to 10 Hz", "50,000 Hz to 100,000 Hz", "1 Hz to 5 Hz"],
    ["20 Hz hingga 20.000 Hz (Audiosonik)", "0 Hz hingga 10 Hz", "50.000 Hz hingga 100.000 Hz", "1 Hz hingga 5 Hz"],
    0,
    "Audible sound for humans spans approximately 20 Hz to 20 kHz; infrasound is <20 Hz, ultrasound is >20 kHz.",
    "Rentang audiosonik manusia berkisar antara 20 Hz sampai 20.000 Hz; di bawah 20 Hz adalah infrasonik, di atas 20 kHz adalah ultrasonik."
  ),
  makeQ(
    "In which medium state does sound travel fastest?",
    "Pada medium berwujud apakah gelombang bunyi merambat paling cepat?",
    ["Dense solids (such as steel or granite)", "Liquids (such as water)", "Gases (such as air)", "Absolute vacuum"],
    ["Zat padat yang rapat (seperti baja atau batu granit)", "Zat cair (seperti air)", "Gas (seperti udara)", "Ruang hampa udara"],
    0,
    "Tightly bonded atoms in solids transfer kinetic elastic impulses much faster (~5000 m/s in steel vs ~340 m/s in air).",
    "Partikel zat padat berikatan sangat rapat sehingga getaran mekanik diteruskan jauh lebih cepat dibanding pada gas."
  ),
  makeQ(
    "What acoustic phenomenon occurs when a sound wave reflects off a distant cliff or wall and returns distinct from original speech?",
    "Peristiwa pemantulan bunyi yang terdengar jelas beberapa saat setelah bunyi asli selesai diucapkan di tebing tebing disebut?",
    ["Echo (Gema)", "Reverberation (Gaung)", "Refraction", "Diffraction"],
    ["Gema (Echo)", "Gaung (Kerdam)", "Pembiasan bunyi", "Difraksi bunyi"],
    0,
    "An echo is a reflected sound wave arriving after a perceptible time delay from the original emitter.",
    "Gema adalah bunyi pantul yang terdengar jelas terpisah setelah bunyi asli selesai diucapkan karena jarak pemantul yang jauh."
  ),
  makeQ(
    "What sound property determines the perceptual 'pitch' (high treble versus deep bass) of a musical note?",
    "Sifat fisis gelombang bunyi apakah yang menentukan tinggi rendahnya nada (pitch) bunyi yang kita dengar?",
    ["Frequency of the vibration", "Amplitude of the wave", "Wave velocity in vacuum", "Color of the vibrating body"],
    ["Frekuensi getaran gelombang bunyi", "Amplitudo gelombang", "Kecepatan di ruang hampa", "Warna benda yang bergetar"],
    0,
    "High frequency produces a high-pitched note; high amplitude produces a louder volume.",
    "Tinggi rendahnya nada ditentukan oleh frekuensi gelombang, sedangkan kuat lemahnya (kenyaringan) ditentukan oleh amplitudo."
  )
];

packs['smp-2::science::Plant Structure and Function'] = [
  makeQ(
    "Which plant tissue is composed of actively dividing undifferentiated cells responsible for plant growth?",
    "Jaringan tumbuhan manakah yang tersusun atas sel-sel embrional yang aktif membelah untuk pertumbuhan tanaman?",
    ["Meristematic tissue (Jaringan meristem)", "Epidermis", "Permanent sclerenchyma", "Bark periderm"],
    ["Jaringan meristem", "Epidermis", "Sklerenkim permanen", "Kulit gabus"],
    0,
    "Apical and lateral meristems contain totipotent cells that divide mitotically to produce new tissues.",
    "Jaringan meristem (seperti meristem apikal di ujung akar dan pucuk) aktif membelah menghasilkan sel-sel baru."
  ),
  makeQ(
    "In dicotyledonous plant stems, what lateral meristem layer divides to produce secondary xylem and phloem, increasing stem girth?",
    "Pada batang tumbuhan dikotil, lapisan meristem lateral manakah yang aktif membelah membentuk xilem dan floem sekunder?",
    ["Vascular cambium (Kambium vaskular)", "Endodermis", "Cuticle layer", "Pith parenchyma"],
    ["Kambium vaskular (Kambium pembuluh)", "Endodermis", "Lapisan kutikula", "Empulur"],
    0,
    "The vascular cambium divides inward producing wood (secondary xylem) and outward producing secondary phloem.",
    "Kambium membelah ke arah dalam membentuk kayu (xilem sekunder) dan ke luar membentuk kulit (floem sekunder)."
  ),
  makeQ(
    "Which leaf mesophyll layer contains tightly packed columnar cells rich in chloroplasts, acting as the primary site of photosynthesis?",
    "Lapisan mesofil daun manakah yang tersusun rapat seperti tiang dan sangat kaya klorofil untuk fotosintesis utama?",
    ["Palisade parenchyma (Jaringan tiang / palisade)", "Spongy mesophyll", "Upper cuticular wax", "Stomatal guard layer"],
    ["Jaringan tiang / palisade (Palisade parenchyma)", "Jaringan bunga karang (spons)", "Kutikula lilin", "Lapisan penutup stomata"],
    0,
    "Palisade cells are oriented perpendicular to the leaf surface to intercept light for photosynthesis.",
    "Jaringan palisade (tiang) mengandung paling banyak kloroplas sehingga menjadi tempat utama berlangsungnya fotosintesis."
  ),
  makeQ(
    "What chemical equation summarizes the overall process of oxygenic photosynthesis in green plants?",
    "Persamaan reaksi kimia apakah yang merangkum proses fotosintesis pada tumbuhan hijau?",
    ["6CO2 + 6H2O + Sunlight -> C6H12O6 + 6O2", "C6H12O6 + 6O2 -> 6CO2 + 6H2O + ATP", "2H2 + O2 -> 2H2O", "CH4 + 2O2 -> CO2 + 2H2O"],
    ["6CO2 + 6H2O + Cahaya Matahari -> C6H12O6 + 6O2", "C6H12O6 + 6O2 -> 6CO2 + 6H2O + Energi", "2H2 + O2 -> 2H2O", "CH4 + 2O2 -> CO2 + 2H2O"],
    0,
    "Photosynthesis utilizes carbon dioxide and water with light energy absorbed by chlorophyll to synthesize glucose and oxygen.",
    "Fotosintesis mengolah 6 karbon dioksida dan 6 molekul air dengan energi foton klorofil menjadi 1 glukosa dan 6 oksigen."
  ),
  makeQ(
    "What is the main physiological mechanism driving water transport up tall trees through xylem vessels?",
    "Mekanisme fisiologis utama apakah yang menarik air dari akar hingga ke pucuk daun pada pohon-pohon yang tinggi?",
    ["Transpiration pull (Daya hisap daun akibat penguapan air di stomata)", "Active muscle pumping in roots", "Magnetic attraction of iron in wood", "Gravitational suction"],
    ["Daya hisap daun akibat transpirasi (penguapan air di stomata)", "Pompa otot di akar", "Daya tarik magnetis kayu", "Tekanan gravitasi"],
    0,
    "Transpiration evaporates water through stomata, creating negative capillary tension that pulls xylem water upward.",
    "Penguapan air melalui stomata daun (transpirasi) menimbulkan tarikan kapilaritas yang menarik kolom air di pembuluh xilem ke atas."
  ),
  makeQ(
    "What plant structure controls transpiration and gas exchange on the underside of leaves?",
    "Struktur pada permukaan daun yang bertugas mengatur laju transpirasi dan keluar masuknya gas pernapasan adalah?",
    ["Stomata with guard cells (Stomata dan sel penjaga)", "Root cap", "Lenticels in old bark", "Trichome thorns"],
    ["Stomata yang diapit sepasang sel penjaga", "Kaliptra tudung akar", "Lentisel kulit batang", "Duri trikoma"],
    0,
    "Stomatal pores open when guard cells become turgid with water, facilitating CO2 uptake and water vapor diffusion.",
    "Stomata membuka saat sel penjaga menyerap air (turgid), memungkinkan CO2 masuk dan uap air berdifusi keluar."
  ),
  makeQ(
    "How does the arrangement of vascular bundles differ between monocot and dicot stems?",
    "Bagaimanakah perbedaan susunan berkas pengangkut (xilem-floem) pada batang tumbuhan monokotil dan dikotil?",
    ["Monocots have vascular bundles scattered throughout the stem; Dicots arrange bundles in an orderly ring with cambium", "Monocots have a neat ring with cambium; Dicots have scattered bundles", "Monocots lack vascular tissues entirely", "Both have identical ring layouts"],
    ["Batang monokotil memiliki berkas pengangkut tersebar acak; Batang dikotil tersusun teratur melingkar disertai kambium", "Monokotil tersusun melingkar teratur; Dikotil tersebar acak", "Monokotil tidak memiliki pembuluh xilem", "Keduanya memiliki susunan cincin yang identik"],
    0,
    "Monocots feature scattered atactosteles; dicots feature eusteles with vascular bundles in an organized ring.",
    "Pada monokotil berkas xilem-floem tersebar acak di jaringan dasar, sedangkan pada dikotil tersusun rapi membentuk cincin."
  ),
  makeQ(
    "What specialized protective structure covers and safeguards the delicate growing tip of plant roots as they push through soil?",
    "Struktur pelindung khusus yang membungkus ujung akar agar tidak rusak saat menembus lapisan tanah yang keras disebut?",
    ["Root cap (Calyptra / Tudung akar)", "Epidermal root hair", "Casparian strip", "Endodermis ring"],
    ["Tudung akar (Kaliptra / Root cap)", "Rambut akar", "Pita kaspari", "Cincin endodermis"],
    0,
    "The calyptra secretes mucilage and shields meristem cells during geotropic soil penetration.",
    "Kaliptra (tudung akar) mensekresi lendir pelumas dan melindungi jaringan meristem apeks akar dari gesekan tanah."
  ),
  makeQ(
    "What chemical test turns blue-black when applied to a leaf to confirm the presence of photosynthetic starch?",
    "Larutan uji apakah yang akan menghasilkan warna biru kehitaman saat diteteskan pada daun untuk membuktikan adanya amilum hasil fotosintesis?",
    ["Lugol's Iodine solution (Uji Sachs)", "Benedict's solution", "Biuret reagent", "Litmus red paper"],
    ["Larutan iodin / Lugol (Percobaan Sachs)", "Reagen Benedict", "Reagen Biuret", "Kertas lakmus merah"],
    0,
    "The Sachs experiment uses iodine reagent, which complexes with amylose in starch to yield a distinctive blue-black color.",
    "Uji Sachs menggunakan larutan iodin; adanya amilum hasil fotosintesis pada daun ditunjukkan dengan perubahan warna biru gelap."
  ),
  makeQ(
    "What plant organ modification is represented by a ginger rhizome, potato tuber, or onion bulb?",
    "Rimpang jahe, umbi batang kentang, dan umbi lapis bawang merah merupakan hasil modifikasi dari organ tumbuhan manakah?",
    ["Modified stems (Modifikasi batang untuk cadangan makanan)", "Modified flowers", "Modified fibrous roots", "Parasitic fruit growths"],
    ["Modifikasi batang untuk menyimpan cadangan makanan", "Modifikasi bunga", "Modifikasi akar serabut", "Benalu parasit"],
    0,
    "Rhizomes, tubers, and bulbs are specialized underground stem structures adapted for nutrient storage.",
    "Rimpang, umbi batang, dan umbi lapis adalah bentuk modifikasi batang tumbuhan yang berfungsi menyimpan cadangan pati."
  )
];

module.exports = packs;
