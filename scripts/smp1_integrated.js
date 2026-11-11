function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return { qEn, qId, optionsEn, optionsId, correctIndex: correctIdx, expEn, expId };
}

const packs = {};

// ==========================================
// SMP 1 INTEGRATED (4 themes)
// ==========================================
packs['smp-1::integrated::Forces, Pressure, and Structures'] = [
  makeQ(
    "How does the pressure exerted by an object on a surface relate to force (F) and contact surface area (A)?",
    "Bagaimanakah hubungan antara tekanan (P) yang dihasilkan suatu benda terhadap gaya tekan (F) dan luas bidang sentuh (A)?",
    ["Pressure is directly proportional to force and inversely proportional to contact area (P = F / A)", "Pressure increases when contact area increases", "Pressure depends only on gravity and not area", "Pressure equals force multiplied by contact area"],
    ["Tekanan berbanding lurus dengan gaya dan berbanding terbalik dengan luas bidang tekan (P = F / A)", "Tekanan bertambah besar jika luas bidang sentuh diperbesar", "Tekanan tidak dipengaruhi luas bidang", "Tekanan adalah gaya dikali luas bidang"],
    0,
    "Pressure formula: P = F / A. Smaller contact area creates greater pressure for the same force.",
    "Rumus tekanan adalah P = F / A. Semakin kecil luas alas kontak, semakin besar tekanan yang dihasilkan."
  ),
  makeQ(
    "Why are the blades of kitchen knives or axe edges ground into very thin, sharp wedges?",
    "Mengapa mata pisau atau kapak sengaja dibuat sangat tipis dan tajam pada bagian pemotongnya?",
    ["To minimize contact area so a small applied force yields tremendous cutting pressure", "To make the blade lighter so it floats", "To reduce friction with the cutting board", "To absorb heat from vegetables"],
    ["Memperkecil luas bidang kontak agar gaya tekan menghasilkan tekanan yang sangat besar untuk memotong", "Membuat pisau lebih ringan", "Mengurangi gesekan dengan talenan", "Menyerap panas dari makanan"],
    0,
    "A tiny contact area at the knife edge concentrates force into extremely high pressure.",
    "Luas permukaan mata pisau yang sangat kecil menghasilkan tekanan tinggi sehingga mudah memotong benda."
  ),
  makeQ(
    "In structural engineering, why are trusses built using interconnected triangular geometries rather than rectangles?",
    "Dalam teknik konstruksi jembatan, mengapa rangka penopang (truss) selalu disusun membentuk segitiga?",
    ["Triangles are geometrically rigid and resist deformation without joint distortion", "Triangles use more steel beams than any other shape", "Triangles catch wind currents better", "Triangles look decorative"],
    ["Bentuk segitiga memiliki kekakuan geometris alami yang kokoh dan tidak mudah berubah bentuk", "Bentuk segitiga membutuhkan lebih banyak baja berat", "Segitiga menahan angin agar kencang", "Segitiga hanya sebagai hiasan arsitektur"],
    0,
    "A triangle cannot deform without changing the length of its sides, making it inherently stable.",
    "Segitiga adalah bentuk poligon paling stabil yang tidak dapat berubah sudut tanpa mengubah panjang sisinya."
  ),
  makeQ(
    "What internal structural stress occurs when a bridge cable is pulled taut by suspended loads?",
    "Jenis tegangan mekanis apakah yang terjadi ketika kabel jembatan gantung ditarik oleh beban yang menggantung?",
    ["Tensile stress (Tegangan tarik)", "Compressive stress", "Torsional twisting stress", "Shear sliding stress"],
    ["Tegangan tarik (Tensile stress)", "Tegangan tekan (Kompresi)", "Tegangan puntir (Torsi)", "Tegangan geser"],
    0,
    "Tension pulls and stretches structural members along their longitudinal axis.",
    "Tegangan tarik terjadi ketika gaya luar berusaha meregangkan atau menarik suatu elemen struktur."
  ),
  makeQ(
    "Which structural stress acts on concrete bridge pillars when bearing the heavy downward weight of traffic?",
    "Jenis tegangan apakah yang dialami oleh pilar beton penyangga jembatan saat menopang beban kendaraan dari atas?",
    ["Compressive stress (Tegangan tekan)", "Tensile stress", "Centrifugal stress", "Thermal radiation stress"],
    ["Tegangan tekan (Compressive stress)", "Tegangan tarik", "Tegangan sentrifugal", "Tegangan radiasi"],
    0,
    "Pillars experience compression as downward gravity loads push inward against foundation reactions.",
    "Tiang penyangga menahan gaya yang saling menekan ke arah dalam (kompresi) akibat beban vertikal."
  ),
  makeQ(
    "Why do off-road vehicles and snowshoes use wide tires or broad soles?",
    "Mengapa kendaraan off-road menggunakan ban yang sangat lebar saat melintasi medan berlumpur atau pasir?",
    ["To distribute the vehicle's weight over a larger surface area, reducing ground pressure to prevent sinking", "To make the vehicle move faster than sound", "To increase wheel friction to maximum heat", "To look more attractive"],
    ["Memperluas area kontak sehingga memperkecil tekanan pada tanah agar kendaraan tidak amblas", "Agar kendaraan melaju melebihi kecepatan suara", "Meningkatkan panas ban", "Hanya untuk tujuan penampilan"],
    0,
    "Spreading weight over larger area A decreases pressure P (P = F / A), preventing tires from sinking.",
    "Dengan memperbesar luas permukaan kontak ban, tekanan ke tanah mengecil sehingga mobil tidak tenggelam di lumpur."
  ),
  makeQ(
    "What structural element is an I-beam specifically engineered to optimize?",
    "Mengapa balok baja struktural (I-beam) dibuat memiliki profil penampang menyerupai huruf 'I'?",
    ["It maximizes bending resistance while minimizing material weight and cost", "It is easier to paint than round beams", "It holds electrical cables inside its cavity", "It reduces air resistance indoors"],
    ["Memaksimalkan ketahanan terhadap lenturan (momen inersia tinggi) dengan penghematan massa material", "Lebih mudah dicat dibandingkan pipa", "Menyimpan kabel di dalamnya", "Mengurangi hambatan udara di dalam ruangan"],
    0,
    "The flanges of an I-beam carry tension and compression, maximizing bending stiffness efficiently.",
    "Bentuk huruf I menempatkan material baja di bagian atas dan bawah yang paling efektif menahan momen lentur."
  ),
  makeQ(
    "A block weighs 200 N and rests on a base area of 0.05 square meters. What pressure does it exert on the floor?",
    "Sebuah balok memiliki berat 200 N dengan luas bidang alas sentuh 0,05 m^2. Berapakah tekanan pada lantai?",
    ["4,000 N/m^2 (Pascals)", "10 N/m^2", "1,000 N/m^2", "400 N/m^2"],
    ["4.000 N/m^2 (Pascal)", "10 N/m^2", "1.000 N/m^2", "400 N/m^2"],
    0,
    "P = F / A = 200 N / 0.05 m^2 = 4,000 Pa.",
    "Tekanan P = F / A = 200 / 0,05 = 4.000 Pascal (N/m^2)."
  ),
  makeQ(
    "What is the function of a foundation footing underneath building columns in construction?",
    "Apakah fungsi dari fondasi tapak (footing) di bawah kolom bangunan gedung?",
    ["To spread the column load safely over a broad ground area so soil bearing capacity is not exceeded", "To supply underground water to the building", "To store electricity in the dirt", "To keep trees away from walls"],
    ["Menyebarkan beban kolom secara merata ke area tanah yang luas agar tidak melampaui daya dukung tanah", "Menyerap air tanah ke dalam gedung", "Menyimpan arus listrik ke tanah", "Menghalau akar pepohonan"],
    0,
    "Foundation footings spread concentrated column loads into lower pressure distributions upon soil.",
    "Fondasi tapak memperluas bidang kontak beban gedung ke lapisan tanah sehingga bangunan tidak ambles."
  ),
  makeQ(
    "What type of structural failure occurs when a slender structural column bends sideways under high compression?",
    "Peristiwa melengkungnya kolom langsing secara tiba-tiba ke samping akibat beban tekan berlebih disebut?",
    ["Buckling (Tekuk)", "Tensile snap", "Thermal melting", "Corrosion fatigue"],
    ["Tekuk (Buckling)", "Putus tarik", "Pelelehan panas", "Kelelahan korosi"],
    0,
    "Buckling is an elastic instability where a compressive load causes lateral deflection and collapse.",
    "Tekuk (buckling) adalah kegagalan struktur di mana batang langsing meliuk menyamping akibat gaya tekan aksial."
  )
];

packs['smp-1::integrated::Mechanisms and Motion Systems'] = [
  makeQ(
    "What mechanical component consists of toothed wheels that interlock to transmit rotational speed and torque?",
    "Komponen mekanik berupa roda bergigi yang saling bertautan untuk meneruskan putaran dan torsi adalah?",
    ["Gears (Roda gigi)", "Pulleys", "Levers", "Inclined planes"],
    ["Roda gigi (Gears)", "Katrol", "Tuas", "Bidang miring"],
    0,
    "Gears transmit rotational motion and torque between shafts via mesh teeth.",
    "Roda gigi memindahkan daya putar, mengubah kecepatan putaran, dan membalik arah rotasi."
  ),
  makeQ(
    "If a driver gear with 20 teeth drives a follower gear with 60 teeth, what is the gear ratio and speed change?",
    "Jika roda gigi penggerak memiliki 20 gigi memutar roda gigi pengikut dengan 60 gigi, bagaimana rasio putarannya?",
    ["Gear ratio is 3:1; the driven gear turns 3 times slower but provides 3 times more torque", "The driven gear turns 3 times faster", "Both gears turn at identical speeds", "The driven gear stops spinning"],
    ["Rasio 3:1; roda gigi yang digerakkan berputar 3 kali lebih lambat namun menghasilkan torsi 3 kali lebih besar", "Roda gigi pengikut berputar 3 kali lebih cepat", "Kedua roda gigi berputar dengan kecepatan sama persis", "Roda pengikut tidak dapat berputar"],
    0,
    "Driven/Driver = 60/20 = 3:1. Speed decreases by a factor of 3, while torque increases by a factor of 3.",
    "Perbandingan gigi 60:20 = 3:1, sehingga putarannya menjadi 3 kali lebih lambat namun tenaganya (torsi) berlipat 3 kali."
  ),
  makeQ(
    "What mechanical mechanism converts continuous rotary motion into back-and-forth reciprocating linear motion?",
    "Mekanisme mekanis manakah yang berfungsi mengubah gerak putar (rotasi) menjadi gerak bolak-balik (translasi)?",
    ["Crank and slider / Cam mechanism (Engkol dan torak)", "Spur gear set", "Fixed single pulley", "Hydraulic jack"],
    ["Mekanisme engkol dan torak (Crank and slider) / Nok (Cam)", "Roda gigi lurus", "Katrol tetap tunggal", "Dongkrak hidrolik"],
    0,
    "A crank and slider (as seen in car pistons and steam engines) converts rotary into reciprocating linear motion.",
    "Engkol poros dan torak mengubah gerak rotasi menjadi gerak bolak-balik lurus seperti pada mesin torak."
  ),
  makeQ(
    "How do two meshed external spur gears rotate relative to each other?",
    "Bagaimanakah arah putaran antara dua buah roda gigi luar yang saling bertautan secara langsung?",
    ["In opposite directions (one clockwise, the other counter-clockwise)", "In the exact same direction", "Both turn sideways at 90 degrees", "Neither can move"],
    ["Berlawanan arah (satu searah jarum jam, satu berlawanan arah jarum jam)", "Searah jarum jam bersamaan", "Saling memutar 90 derajat ke samping", "Keduanya saling mengunci diam"],
    0,
    "External meshing gears always rotate in opposite rotational senses.",
    "Dua roda gigi luar yang bertautan langsung akan selalu berputar dengan arah saling berlawanan."
  ),
  makeQ(
    "What gear configuration allows two meshing gears to turn in the SAME direction?",
    "Bagaimanakah cara membuat dua roda gigi utama berputar ke arah yang SAMA?",
    ["Placing an intermediate idler gear between the two main gears", "Removing all teeth from the gears", "Using square gears", "Making the gears out of rubber"],
    ["Memasang roda gigi perantara (idler gear) di antara kedua roda gigi utama", "Menghapus gerigi roda", "Menggunakan roda gigi persegi", "Membuat roda dari karet elastis"],
    0,
    "An idler gear between two gears reverses the direction twice, synchronizing driver and driven directions.",
    "Roda gigi perantara (idler) membalik arah putaran dua kali sehingga gigi awal dan gigi akhir berputar searah."
  ),
  makeQ(
    "What type of gear drive pairs a spiral threaded screw cylinder with a spur gear, preventing back-driving?",
    "Pasangan roda gigi manakah yang terdiri dari silinder berulir cacing dan roda gigi yang tidak dapat diputar balik?",
    ["Worm gear drive (Roda gigi cacing)", "Bevel gear", "Rack and pinion", "Planetary gear"],
    ["Roda gigi cacing (Worm gear)", "Roda gigi kerucut (Bevel gear)", "Rack and pinion", "Roda gigi planet"],
    0,
    "A worm drive achieves very large speed reductions and is self-locking (cannot be driven backward by the wheel).",
    "Roda gigi cacing menghasilkan reduksi putaran besar dan bersifat self-locking (tidak dapat diputar balik oleh output)."
  ),
  makeQ(
    "What mechanism converts rotary steering wheel motion into linear steering rack motion in modern automobiles?",
    "Mekanisme apakah yang digunakan pada kemudi mobil untuk mengubah putaran setir menjadi pergeseran batang roda ke samping?",
    ["Rack and pinion mechanism (Batang bergigi dan pinion)", "Camshaft valve", "Chain sprocket", "Geneva drive"],
    ["Mekanisme rack and pinion (batang bergerigi dan roda gigi kecil)", "Nok pembuka katup", "Rantai sproket", "Penggerak Jenewa"],
    0,
    "Rack and pinion meshes a round gear (pinion) with a flat toothed rail (rack) to convert rotation to translation.",
    "Rack and pinion mengubah gerak putar setir (pinion) menjadi gerak geser mendatar pada roda kemudi (rack)."
  ),
  makeQ(
    "Why are belt and chain drives used instead of direct meshing gears in bicycles and machinery?",
    "Mengapa sepeda menggunakan rantai dan sproket daripada roda gigi yang bertautan langsung?",
    ["To transmit rotary power across large distances between separated shafts efficiently", "Because gears are illegal on bicycles", "To make the bicycle silent without friction", "To add extra weight to the frame"],
    ["Meneruskan daya putar secara efisien antara dua poros yang letaknya berjauhan", "Karena roda gigi dilarang pada sepeda", "Agar sepeda meluncur tanpa rantai", "Menambah bobot sepeda"],
    0,
    "Chains and belts bridge substantial physical spans between rotating shafts.",
    "Rantai memungkinkan pemindahan daya putar dari kayuhan pedal ke roda belakang yang terpisah jarak cukup jauh."
  ),
  makeQ(
    "What mechanical device consists of a wheel with a grooved rim supporting a cord to change the direction of pulling force?",
    "Alat mekanis sederhana berupa roda beralur dengan tali yang melingkar untuk mengubah arah gaya tarik disebut?",
    ["Pulley (Katrol)", "Screw", "Wedge", "Wheelbarrow"],
    ["Katrol (Pulley)", "Sekrup", "Baji", "Gerobak dorong"],
    0,
    "A pulley changes the direction of tension along a cable and can provide mechanical advantage when arranged in blocks.",
    "Katrol adalah roda beralur yang mempermudah pengangkatan beban dengan membalik arah gaya tarikan."
  ),
  makeQ(
    "What is the mechanical advantage of a single fixed pulley attached to a ceiling?",
    "Berapakah keuntungan mekanis (KM) dari sebuah katrol tetap tunggal yang dipasang pada langit-langit?",
    ["1 (it only changes the direction of force, not the required pulling magnitude)", "2", "4", "10"],
    ["1 (hanya mengubah arah gaya angkat menjadi gaya tarik ke bawah, tanpa memperkecil gaya)", "2", "4", "10"],
    0,
    "A fixed single pulley has a mechanical advantage of 1, allowing ergonomic downward pulling against gravity.",
    "Katrol tetap memiliki keuntungan mekanis 1, hanya mengubah arah gaya tarik ke bawah agar lebih mudah menggunakan berat badan."
  )
];

packs['smp-1::integrated::Electrical Circuits and Components'] = [
  makeQ(
    "What fundamental law of electricity expresses the relationship between Voltage (V), Current (I), and Resistance (R)?",
    "Hukum dasar kelistrikan apakah yang menyatakan hubungan antara Tegangan (V), Kuat Arus (I), dan Hambatan (R)?",
    ["Ohm's Law: V = I * R", "Newton's First Law", "Coulomb's Law of static charges", "Faraday's Law of induction"],
    ["Hukum Ohm: V = I * R", "Hukum I Newton", "Hukum Coulomb", "Hukum Induksi Faraday"],
    0,
    "Ohm's Law states potential difference equals current multiplied by resistance (V = I * R).",
    "Hukum Ohm menyatakan bahwa beda potensial (V) sebanding dengan kuat arus (I) dikali hambatan (R)."
  ),
  makeQ(
    "What is the SI unit used to measure electric current?",
    "Apakah satuan internasional (SI) yang digunakan untuk mengukur kuat arus listrik?",
    ["Ampere (A)", "Volt (V)", "Ohm (Ω)", "Watt (W)"],
    ["Ampere (A)", "Volt (V)", "Ohm (Ω)", "Watt (W)"],
    0,
    "Electric current (rate of electric charge flow) is measured in Amperes (Coulombs per second).",
    "Kuat arus listrik (laju aliran muatan listrik) dinyatakan dalam satuan Ampere (A)."
  ),
  makeQ(
    "In a simple series circuit with three identical light bulbs, what happens if one bulb is removed or burns out?",
    "Pada rangkaian listrik seri dengan tiga lampu identik, apa yang terjadi jika salah satu lampu dilepas atau putus?",
    ["All remaining lamps turn off immediately because the circuit is broken", "The other two bulbs become twice as bright", "Only one bulb stays lit", "The battery explodes"],
    ["Semua lampu yang tersisa ikut padam karena jalur aliran arus listrik terputus", "Dua lampu lainnya menyala dua kali lebih terang", "Hanya satu lampu yang tetap menyala", "Baterai meledak"],
    0,
    "A series circuit has only one conduction path; opening any component halts current through all elements.",
    "Rangkaian seri hanya memiliki satu jalur arus; jika satu bagian terbuka/putus, seluruh aliran arus berhenti."
  ),
  makeQ(
    "Why are household electrical circuits in homes wired in parallel rather than in series?",
    "Mengapa instalasi listrik di rumah-rumah selalu dirangkai secara paralel dan bukan seri?",
    ["Each appliance receives the full household voltage and operates independently of others", "Parallel wiring requires only one single thin wire", "Appliances only turn on when all other devices are running", "Parallel wiring prevents electricity from flowing"],
    ["Setiap peralatan menerima tegangan listrik penuh yang sama dan dapat dinyalakan/dimatikan secara independen", "Rangkaian paralel hanya butuh satu kabel kecil", "Peralatan hanya menyala jika seluruh alat di rumah aktif", "Rangkaian paralel menghambat arus listrik"],
    0,
    "Parallel wiring delivers equal line voltage (e.g. 220V) to each branch and enables individual switching.",
    "Pada rangkaian paralel, setiap beban mendapat tegangan yang sama dan dapat dinyalakan tanpa mengganggu beban lain."
  ),
  makeQ(
    "What safety device melts its thin metal ribbon to interrupt excessive current flow during an electrical overload?",
    "Komponen pengaman listrik yang kawat logamnya akan meleleh dan memutus arus jika terjadi kelebihan beban disebut?",
    ["Fuse (Sekring)", "Capacitor", "Inductor", "Potentiometer"],
    ["Sekring (Fuse)", "Kapasitor", "Induktor", "Potensiometer"],
    0,
    "A fuse has a low-melting alloy conductor designed to vaporize when current exceeds rated limits.",
    "Sekring memuat kawat timbal khusus yang meleleh saat dilewati arus melebihi kapasitas aman untuk mencegah kebakaran."
  ),
  makeQ(
    "A 12V battery is connected across a resistor of 4 Ohms. What electric current flows through the circuit?",
    "Sebuah baterai 12 Volt dihubungkan pada resistor berhambatan 4 Ohm. Berapakah kuat arus yang mengalir?",
    ["3 Amperes", "48 Amperes", "0.33 Amperes", "16 Amperes"],
    ["3 Ampere", "48 Ampere", "0,33 Ampere", "16 Ampere"],
    0,
    "I = V / R = 12 V / 4 Ohms = 3 A.",
    "Berdasarkan Hukum Ohm: I = V / R = 12 / 4 = 3 Ampere."
  ),
  makeQ(
    "What electronic component allows electric current to flow easily in only one forward direction while blocking reverse flow?",
    "Komponen semikonduktor yang hanya mengalirkan arus listrik ke satu arah dan menyumbat arah sebaliknya adalah?",
    ["Diode (Dioda)", "Resistor", "Transformer", "Ceramic capacitor"],
    ["Dioda (Diode)", "Resistor", "Transformator", "Kapasitor keramik"],
    0,
    "A diode has a p-n junction that conducts current when forward-biased and blocks current when reverse-biased.",
    "Dioda memiliki sifat penyearah; arus dapat lewat pada bias maju dan tertahan pada bias mundur."
  ),
  makeQ(
    "What instrument is connected in SERIES within an active circuit to measure the rate of electric charge flow?",
    "Alat ukur listrik yang harus dipasang secara SERI pada rangkaian untuk mengukur kuat arus adalah?",
    ["Ammeter (Amperemeter)", "Voltmeter", "Ohmmeter", "Barometer"],
    ["Amperemeter", "Voltmeter", "Ohmmeter", "Barometer"],
    0,
    "An ammeter has very low internal resistance and is connected in series to measure total flowing current.",
    "Amperemeter memiliki hambatan dalam sangat kecil dan dipasang secara seri memotong jalur arus."
  ),
  makeQ(
    "How is a Voltmeter correctly connected to measure the electric potential difference across a light bulb?",
    "Bagaimanakah cara memasang alat Voltmeter yang benar untuk mengukur beda potensial pada sebuah lampu?",
    ["In parallel across the two terminals of the light bulb", "In series inside the broken lamp wire", "Directly inside the battery acid", "Grounded to the floor only"],
    ["Secara paralel di antara kedua ujung kutub lampu", "Secara seri memutus kawat lampu", "Dicelupkan ke dalam cairan baterai", "Hanya disambungkan ke lantai"],
    0,
    "A voltmeter has very high internal resistance and must be wired in parallel across the component.",
    "Voltmeter memiliki hambatan dalam sangat besar dan wajib dipasang paralel pada komponen yang diukur tegangannya."
  ),
  makeQ(
    "What material property distinguishes electrical conductors like copper from insulators like rubber?",
    "Apakah perbedaan sifat mendasar antara bahan konduktor (seperti tembaga) dan isolator (seperti karet)?",
    ["Conductors possess abundant free electrons that drift easily under electric fields", "Insulators have free electrons while conductors do not", "Conductors repel all forms of heat", "Insulators produce high electrical currents"],
    ["Konduktor memiliki banyak elektron bebas yang mudah berpindah saat diberi medan listrik", "Isolator memiliki elektron bebas sedangkan konduktor tidak", "Konduktor menolak segala bentuk panas", "Isolator menghasilkan arus listrik tinggi"],
    0,
    "Metals have delocalized conduction electrons that move freely, granting high electrical conductivity.",
    "Logam konduktor memiliki elektron valensi bebas yang bergerak mudah, sedangkan isolator mengikat erat elektronnya."
  )
];

packs['smp-1::integrated::The Engineering Design Cycle'] = [
  makeQ(
    "What is the very first step in the formal Engineering Design Process?",
    "Apakah tahapan paling pertama dalam proses perancangan rekayasa (Engineering Design Process)?",
    ["Define and identify the problem, user needs, and design criteria", "Build the final product immediately", "Sell the product in stores", "Select paint colors"],
    ["Mengidentifikasi dan merumuskan masalah serta kebutuhan pengguna (Define the Problem)", "Langsung memproduksi barang jadi", "Menjual produk ke konsumen", "Memilih warna cat produk"],
    0,
    "Engineers first formulate a clear problem statement, identifying client constraints and user requirements.",
    "Tahap awal selalu merumuskan masalah spesifik yang ingin diselesaikan beserta kriteria keberhasilannya."
  ),
  makeQ(
    "What term describes the limitations, rules, and restrictions placed upon an engineering project (e.g., budget, time, materials)?",
    "Istilah apakah yang menggambarkan batasan dan pembatasan dalam proyek rekayasa (seperti biaya, waktu, dan bahan)?",
    ["Constraints (Batasan / Kendala)", "Criteria", "Prototypes", "Hypotheses"],
    ["Kendala / Batasan (Constraints)", "Kriteria keunggulan", "Prototipe", "Hipotesis ilmiah"],
    0,
    "Constraints are real-world restrictions such as available funds, safety limits, timeframes, and materials.",
    "Constraints adalah batasan mutlak yang harus dipatuhi seperti batas biaya anggaran, dimensi, dan keamanan."
  ),
  makeQ(
    "What is a preliminary working model built to test, evaluate, and refine an engineering design concept called?",
    "Model fisik atau digital awal yang dibuat untuk menguji coba dan mengevaluasi konsep desain disebut?",
    ["Prototype (Prototipe)", "Finished factory unit", "Patent document", "Billboard advertisement"],
    ["Prototipe (Prototype)", "Produk massal jadi", "Sertifikat paten", "Brosur iklan"],
    0,
    "A prototype is a functional mockup built to uncover flaws and validate design performance prior to production.",
    "Prototipe adalah model uji coba awal untuk memvalidasi kinerja dan menemukan kekurangan sebelum produksi massal."
  ),
  makeQ(
    "Why is the Engineering Design Process described as an 'iterative' cycle?",
    "Mengapa proses perancangan rekayasa (Engineering Design) disebut sebagai proses yang 'iteratif' (berulang)?",
    ["Because testing reveals flaws, requiring engineers to loop back, redesign, and improve continuously", "Because engineers must start a new company every week", "Because projects can never be completed", "Because formulas change every morning"],
    ["Karena hasil pengujian menemukan kelemahan sehingga insinyur mengulang siklus perbaikan berkali-kali", "Karena insinyur harus berganti perusahaan setiap minggu", "Karena proyek tidak pernah boleh diselesaikan", "Karena rumus fisika selalu berubah tiap pagi"],
    0,
    "Iteration means cycling through testing, feedback, modification, and re-testing to reach optimal results.",
    "Proses iteratif berarti perancang terus merevisi dan menguji kembali desain hingga memenuhi standar kinerja."
  ),
  makeQ(
    "During the brainstorming stage of design, what principle is most vital for the team?",
    "Pada tahap urun rembuk (brainstorming), prinsip manakah yang paling penting diterapkan oleh tim pengembang?",
    ["Encourage a wide variety of creative ideas without premature criticism or immediate dismissal", "Allow only the team leader to speak", "Reject any idea that is not 100% traditional", "Choose the very first thought immediately"],
    ["Mendorong munculnya sebanyak mungkin ide kreatif tanpa langsung menghakimi atau mengkritik di awal", "Hanya ketua tim yang boleh berbicara", "Menolak ide yang belum pernah dibuat sebelumnya", "Memilih ide pertama tanpa memikirkan ide lain"],
    0,
    "Brainstorming values broad divergent ideation; evaluation and filtering occur later in the design cycle.",
    "Brainstorming bertujuan menghasilkan ragam ide alternatif seluas mungkin sebelum dilakukan seleksi kritis."
  ),
  makeQ(
    "How does the Engineering Design Process differ fundamentally from the traditional Scientific Method?",
    "Apakah perbedaan mendasar antara Proses Rekayasa Teknik (Engineering) dan Metode Ilmiah (Science)?",
    ["Science seeks to explain natural phenomena; Engineering creates solutions to meet human needs", "Science requires math while engineering does not", "Engineering never conducts tests", "Science is only done outdoors"],
    ["Sains bertujuan memahami dan menjelaskan fenomena alam; Rekayasa merancang solusi buatan untuk kebutuhan manusia", "Sains menggunakan matematika sedangkan teknik tidak", "Rekayasa tidak pernah melakukan uji coba", "Sains hanya bisa dilakukan di luar ruangan"],
    0,
    "Scientists investigate 'why things happen'; engineers design tangible systems to solve specific problems.",
    "Sains berfokus mengungkap kebenaran hukum alam; rekayasa berfokus menciptakan teknologi pemecah masalah praktis."
  ),
  makeQ(
    "What engineering document lists the detailed technical requirements that a successful design MUST achieve?",
    "Dokumen rekayasa manakah yang memuat rincian standar teknis dan performa yang WAJIB dipenuhi oleh solusi akhir?",
    ["Design Criteria / Specifications (Spesifikasi Desain)", "Marketing flyer", "Receipt of purchase", "Warranty card"],
    ["Kriteria / Spesifikasi Desain (Specifications)", "Brosur promosi", "Kwitansi belanja", "Kartu garansi"],
    0,
    "Specifications define quantitative performance targets, safety factors, and dimensional tolerances.",
    "Spesifikasi desain menetapkan target kinerja terukur, seperti batas beban, efisiensi, dan dimensi produk."
  ),
  makeQ(
    "When evaluating multiple competing prototype designs, what decision-making tool helps engineers score each option against weighted criteria?",
    "Alat bantu pengambilan keputusan manakah yang digunakan insinyur untuk menilai beberapa opsi desain dengan bobot kriteria?",
    ["Decision Matrix (Matriks Keputusan)", "Random coin flip", "Guessing lottery", "Musical chairs"],
    ["Matriks Keputusan (Decision Matrix / Pugh Matrix)", "Lempar koin acak", "Undian lotre", "Tebakan intuisi"],
    0,
    "A decision matrix ranks concepts objectively by scoring them against weighted criteria like cost and durability.",
    "Matriks keputusan memberi skor terukur pada setiap opsi konsep berdasarkan bobot kriteria penting."
  ),
  makeQ(
    "If a prototype fails during testing under load, what should an engineering team do next?",
    "Jika sebuah prototipe jembatan patah saat uji beban di laboratorium, apa yang harus dilakukan oleh tim insinyur?",
    ["Analyze the failure mode, identify the weak points, and redesign that specific section", "Conceal the failure report and ship the product", "Abandon engineering entirely", "Blame the testing machines"],
    ["Menganalisis penyebab patahnya struktur, menemukan titik terlemah, dan memperbaiki desain bagian tersebut", "Menyembunyikan catatan kegagalan dan langsung menjualnya", "Menyerah dan meninggalkan proyek", "Menyalahkan alat pengukur"],
    0,
    "Engineering treats prototype failure as valuable data to diagnose weaknesses and refine structural integrity.",
    "Kegagalan uji coba memberikan data berharga untuk menganalisis titik tegangan kritis dan memperkuat desain."
  ),
  makeQ(
    "What is the final stage of an engineering design project before handing over to manufacturing?",
    "Apakah tahapan akhir dari sebuah proyek perancangan teknik sebelum diserahkan ke jalur manufaktur?",
    ["Document the final solution thoroughly with technical blueprints, CAD models, and test reports", "Forget all test measurements", "Delete the CAD files", "Start from scratch again"],
    ["Mendokumentasikan seluruh desain secara lengkap melalui gambar kerja teknis, model CAD, dan laporan uji", "Menghapus semua catatan pengujian", "Membuang cetak biru", "Mengulang kembali tanpa dokumen"],
    0,
    "Thorough documentation ensures the validated design can be manufactured reliably and maintained safely.",
    "Dokumentasi teknis lengkap dan gambar kerja memastikan proses fabrikasi massal berjalan tepat dan presisi."
  )
];

module.exports = packs;
