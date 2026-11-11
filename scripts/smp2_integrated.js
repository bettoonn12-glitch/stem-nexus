function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return { qEn, qId, optionsEn, optionsId, correctIndex: correctIdx, expEn, expId };
}

const packs = {};

// ==========================================
// SMP 2 INTEGRATED (4 themes)
// ==========================================
packs['smp-2::integrated::Simple Machines and Efficiency'] = [
  makeQ(
    "What is the mathematical definition of Mechanical Advantage (MA) for any simple machine?",
    "Apakah definisi matematis dari Keuntungan Mekanis (KM) pada pesawat sederhana?",
    ["The ratio of output load force (W) to input effort force (F): MA = W / F", "Input effort divided by power", "Time divided by distance", "Friction multiplied by velocity"],
    ["Perbandingan antara gaya beban (W) dengan gaya kuasa (F): KM = W / F", "Gaya kuasa dibagi daya", "Waktu dibagi jarak tempuh", "Gaya gesek dikali kecepatan"],
    0,
    "Mechanical advantage quantifies force amplification: MA = Load / Effort.",
    "Keuntungan mekanis menyatakan berapa kali lipat gaya kuasa diperbesar: KM = W / F atau s / h."
  ),
  makeQ(
    "In a Class 1 lever, what component is positioned between the effort force and the load force?",
    "Pada tuas jenis (golongan) pertama, bagian manakah yang posisinya berada di antara titik kuasa dan titik beban?",
    ["Fulcrum / Pivot point (Titik tumpu)", "Load point", "Effort point", "Counter-weight"],
    ["Titik tumpu (Fulcrum)", "Titik beban", "Titik kuasa", "Pegas penahan"],
    0,
    "Class 1 levers (like scissors and seesaws) place the fulcrum centrally between effort and load.",
    "Tuas jenis pertama menempatkan titik tumpu di antara titik kuasa dan beban (contoh: gunting, tang, jungkat-jungkit)."
  ),
  makeQ(
    "Which tool is a practical example of a Class 2 lever where the load is between the fulcrum and effort?",
    "Alat kerja manakah yang merupakan contoh nyata tuas jenis kedua di mana beban terletak di antara titik tumpu dan kuasa?",
    ["Wheelbarrow (Gerobak dorong roda satu)", "Tweezers", "Fishing rod", "Hammer claw pulling a nail"],
    ["Gerobak dorong roda satu (Wheelbarrow)", "Pinset bedah", "Joran pancing", "Gunting kertas"],
    0,
    "A wheelbarrow places load in the tray between the front wheel (fulcrum) and handles (effort).",
    "Gerobak dorong menempatkan roda sebagai tumpu di depan, muatan di tengah (beban), dan pegangan di ujung (kuasa)."
  ),
  makeQ(
    "What is the ideal mechanical advantage (IMA) of an inclined plane of length L = 12 meters and height h = 3 meters?",
    "Berapakah keuntungan mekanis ideal (KM) dari sebuah bidang miring yang memiliki panjang lintasan L = 12 m dan tinggi h = 3 m?",
    ["4", "36", "0.25", "15"],
    ["4", "36", "0,25", "15"],
    0,
    "IMA = Length / Height = 12 m / 3 m = 4.",
    "Keuntungan mekanis bidang miring dihitung dengan rasio panjang lintasan terhadap tinggi: KM = s / h = 12 / 3 = 4."
  ),
  makeQ(
    "How does the mechanical advantage of a pulley system (block and tackle) relate to its supporting rope segments?",
    "Bagaimanakah menentukan keuntungan mekanis pada sistem katrol majemuk (takal)?",
    ["It equals the number of rope strands directly supporting the moving load", "It equals the weight of the pulleys in kilograms", "It is always zero", "It equals the diameter of the wheel in meters"],
    ["Sama dengan banyaknya jumlah tali penopang yang langsung menahan beban bergerak", "Sama dengan berat katrol dalam kilogram", "Selalu bernilai nol", "Sama dengan diameter roda katrol"],
    0,
    "Each supporting tensioned strand shares the weight, dividing required pulling force proportionally.",
    "Keuntungan mekanis sistem katrol majemuk sama dengan jumlah segmen tali yang menopang katrol bergerak."
  ),
  makeQ(
    "Why is the mechanical efficiency of real-world machines always strictly less than 100%?",
    "Mengapa efisiensi mekanik pada mesin nyata selalu kurang dari 100% (tidak pernah mencapai efisiensi sempurna)?",
    ["Some input work is unavoidably converted into waste thermal heat due to friction and air resistance", "Energy is destroyed in the universe", "Gravity only affects machines", "Real metals do not conduct motion"],
    ["Sebagian energi masukan selalu terbuang menjadi energi panas akibat adanya gaya gesekan pada komponen mesin", "Energi musnah dari alam semesta", "Gravitasi merusak mesin", "Bahan logam tidak dapat bergerak"],
    0,
    "Frictional dissipation converts useful work into thermal dissipation, keeping efficiency below 100%.",
    "Gaya gesek pada bantalan dan gesekan udara selalu mengubah sebagian energi mekanik menjadi energi kalor yang terbuang."
  ),
  makeQ(
    "A mechanical winch performs 600 Joules of useful work output when supplied with 800 Joules of input energy. What is its efficiency?",
    "Sebuah mesin derek melakukan usaha berguna sebesar 600 Joule dari total energi masukan 800 Joule. Berapakah efisiensinya?",
    ["75%", "60%", "85%", "133%"],
    ["75%", "60%", "85%", "133%"],
    0,
    "Efficiency = (Useful Output / Input) * 100% = (600 / 800) * 100% = 75%.",
    "Efisiensi mesin dihitung dengan: (Usaha keluaran / Usaha masukan) × 100% = (600 / 800) × 100% = 75%."
  ),
  makeQ(
    "Which simple machine is fundamentally an inclined plane wrapped helically around a central cylinder?",
    "Pesawat sederhana manakah yang pada hakikatnya merupakan bidang miring yang dililitkan secara spiral pada silinder?",
    ["Screw (Sekrup)", "Lever", "Fixed pulley", "Spur gear"],
    ["Sekrup (Screw)", "Tuas", "Katrol tetap", "Roda gigi"],
    0,
    "A screw converts rotational torque into linear thrust along the pitch of its spiral inclined plane.",
    "Ulir pada sekrup merupakan bidang miring yang melingkar secara spiral mengelilingi sumbu porosnya."
  ),
  makeQ(
    "In a Class 3 lever, the effort is between the fulcrum and the load. What advantage does it provide?",
    "Pada tuas jenis ketiga, titik kuasa berada di antara titik tumpu dan beban. Keuntungan apakah yang dihasilkan?",
    ["It amplifies speed and displacement range of motion (e.g. sweeping a broom, forearms)", "It multiplies load force by 100 times", "It eliminates the need for force entirely", "It prevents objects from moving"],
    ["Menghasilkan jangkauan gerak dan kecepatan ayunan yang lebih besar (contoh: sapu, joran, lengan manusia)", "Melipatgandakan gaya beban hingga 100 kali", "Menghilangkan kebutuhan tenaga sepenuhnya", "Membuat benda berhenti bergerak"],
    0,
    "Class 3 levers sacrifice force advantage to gain increased velocity and range of motion at the end.",
    "Tuas jenis ketiga memiliki KM < 1 tetapi menghasilkan kecepatan gerak dan jarak jangkau yang luas pada ujung beban."
  ),
  makeQ(
    "How can mechanical engineers minimize parasitic friction in rotating machine shafts to boost efficiency?",
    "Bagaimanakah cara insinyur mekanik meminimalkan kerugian gesekan pada poros mesin yang berputar untuk meningkatkan efisiensi?",
    ["By installing precision ball bearings and applying synthetic lubricating oils", "By making surfaces coarse with sandpaper", "By heating the metal with fire", "By removing all oil and grease"],
    ["Memasang bantalan peluru (ball bearings) dan memberikan pelumas oli secara berkala", "Mengamplas permukaan poros menjadi kasar", "Membakar logam dengan api", "Mengeringkan semua pelumas"],
    0,
    "Ball bearings substitute rolling friction for sliding friction, and lubrication separates metal surfaces.",
    "Bantalan peluru mengubah gesekan luncur menjadi gelinding yang jauh lebih kecil, dan oli memisahkan kontak logam langsung."
  )
];

packs['smp-2::integrated::Structures, Stress, and Loads'] = [
  makeQ(
    "What structural engineering term refers to permanent downward loads that do not change over time, such as the building's own self-weight?",
    "Istilah teknik sipil apakah yang merujuk pada beban tetap yang tidak berubah sepanjang waktu, seperti berat struktur bangunan itu sendiri?",
    ["Dead load (Beban mati)", "Live load", "Dynamic wind load", "Seismic shock load"],
    ["Beban mati (Dead load)", "Beban hidup (Live load)", "Beban dinamis angin", "Beban gempa"],
    0,
    "Dead loads encompass static permanent gravitational weights: concrete slabs, steel columns, and roof framing.",
    "Beban mati adalah beban statis permanen yang berasal dari berat sendiri elemen konstruksi bangunan."
  ),
  makeQ(
    "What type of structural load includes movable occupants, furniture, vehicles, and transient equipment?",
    "Jenis beban struktur manakah yang mencakup perabot yang dapat dipindahkan, orang, dan kendaraan yang melintas?",
    ["Live load (Beban hidup)", "Dead load", "Thermal load", "Chemical load"],
    ["Beban hidup (Live load)", "Beban mati", "Beban termal", "Beban kimia"],
    0,
    "Live loads are variable non-permanent forces produced by building usage, inhabitants, and traffic.",
    "Beban hidup adalah beban gravitasi temporer yang dapat berpindah atau berubah intensitasnya seperti manusia dan kendaraan."
  ),
  makeQ(
    "What mechanical stress causes opposing parallel forces to slide adjacent layers of a material past one another?",
    "Jenis tegangan mekanis apakah yang terjadi ketika dua gaya berlawanan arah bekerja menggeser bidang material sejajar?",
    ["Shear stress (Tegangan geser)", "Tensile stress", "Axial compression", "Centripetal pull"],
    ["Tegangan geser (Shear stress)", "Tegangan tarik", "Tekanan aksial", "Gaya sentripetal"],
    0,
    "Shear stress occurs parallel to a planar cross-section, tending to induce sliding failures (like scissors cutting paper).",
    "Tegangan geser bekerja sejajar dengan penampang bahan, berusaha membelah atau menggelincirkan bidang geser."
  ),
  makeQ(
    "What twisting deformation stress occurs when a drive shaft transmits rotary torque to vehicle wheels?",
    "Jenis tegangan apakah yang dialami oleh poros roda penggerak saat menyalurkan torsi putaran mesin?",
    ["Torsion (Tegangan puntir)", "Shear tension", "Pure hydrostatic compression", "Thermal contraction"],
    ["Torsi / Tegangan puntir (Torsion)", "Tegangan geser tarik", "Kompresi hidrostatis", "Penyusutan termal"],
    0,
    "Torsion is the state of strain produced in a body by twisting couples applied about its longitudinal axis.",
    "Torsi adalah puntiran pada poros yang timbul akibat momen gaya putar yang bekerja pada ujung-ujungnya."
  ),
  makeQ(
    "Why is steel rebar embedded inside structural concrete beams (forming reinforced concrete)?",
    "Mengapa batang baja tulangan (rebar) selalu ditanam di dalam balok beton cor pada konstruksi gedung bertingkat?",
    ["Concrete resists compression well but is weak in tension, while steel provides high tensile strength", "Concrete is cheap plastic that melts", "Steel absorbs rainwater to keep concrete dry", "Steel repels wind gusts"],
    ["Beton sangat kuat menahan beban tekan namun lemah menahan tarikan, sedangkan baja memberikan kekuatan tarik yang tinggi", "Beton terbuat dari plastik", "Baja menyerap air agar beton kering", "Baja menolak angin"],
    0,
    "Reinforced concrete unites concrete's high compressive strength with steel's exceptional tensile toughness.",
    "Beton bertulang menggabungkan keunggulan beton yang tahan kompresi dan baja yang sangat kuat menahan lentur dan tarik."
  ),
  makeQ(
    "In a horizontal bridge beam supported at both ends under a heavy vehicle load, where do the maximum compression and tension occur?",
    "Pada balok jembatan yang disangga kedua ujungnya saat dilewati truk berat, di manakah letak tegangan tekan dan tarik maksimum?",
    ["The top surface undergoes compression while the bottom surface undergoes tension", "The bottom undergoes compression and the top tension", "Tension occurs everywhere uniformly", "Compression occurs only at the edges"],
    ["Sisi permukaan atas mengalami gaya tekan (kompresi) dan sisi bawah mengalami gaya tarik (tensil)", "Sisi bawah mengalami tekan dan sisi atas tarik", "Semua sisi mengalami gaya tarik merata", "Hanya sudut yang tertekan"],
    0,
    "Downward bending convexes downward: compressing upper fibers and stretching lower fibers in tension.",
    "Lenturan ke bawah menyebabkan serat bagian atas balok memendek (tertekan) dan serat bagian bawah meregang (tertarik)."
  ),
  makeQ(
    "What engineering concept defines the ratio of a structure's ultimate failure capacity to its expected maximum working load?",
    "Konsep perancangan teknik apakah yang menyatakan rasio antara kekuatan batas patah struktur dengan beban kerja maksimum yang direncanakan?",
    ["Factor of Safety (Faktor Keamanan / Safety Factor)", "Deformation coefficient", "Slenderness metric", "Elastic limit constant"],
    ["Faktor Keamanan (Factor of Safety / SF)", "Koefisien deformasi", "Indeks kelangsingan", "Batas elastis"],
    0,
    "Factor of Safety (typically 1.5 to 3.0+) provides an intentional structural safety buffer against unforeseen stresses.",
    "Faktor keamanan (SF) adalah angka pengali yang memastikan struktur mampu menahan beban jauh melampaui kondisi operasional normal."
  ),
  makeQ(
    "Why are curved arches structurally superior for stone masonry bridges compared to flat stone lintels?",
    "Mengapa jembatan batu berbentuk busur lengkung (arch) jauh lebih kokoh dibandingkan balok batu mendatar?",
    ["Arches transfer vertical gravity loads outward into pure compressive forces along the curved stone ring", "Arches eliminate gravity entirely", "Arches require zero foundation footings", "Flat stones are illegal in bridges"],
    ["Bentuk busur mengubah beban gravitasi vertikal menjadi gaya tekan murni yang menyalur ke abutment fondasi samping", "Lengkungan menghilangkan gaya gravitasi", "Busur tidak membutuhkan fondasi", "Batu datar tidak bisa dipotong"],
    0,
    "Stone has high compressive strength; arches channel all forces along the curved line of thrust in compression.",
    "Batu sangat kuat menahan gaya tekan; bentuk busur menyalurkan seluruh beban vertikal ke dalam kompresi sepanjang lengkungan."
  ),
  makeQ(
    "What is the structural function of diagonal cross-bracing installed within rectangular steel building frames?",
    "Apakah fungsi dari pemasangan batang silang diagonal (cross-bracing) pada rangka baja gedung pencakar langit?",
    ["To resist lateral shear forces caused by severe winds and earthquakes (preventing sway racking)", "To provide stairs for maintenance workers", "To hold electrical wires only", "To increase building weight"],
    ["Menahan gaya geser lateral akibat hembusan angin kencang dan guncangan gempa bumi agar gedung tidak bergoyang miring", "Sebagai tangga darurat", "Menopang kabel listrik saja", "Menambah beban gedung"],
    0,
    "Diagonal bracing triangulates the frame, converting lateral racking shears into axial tension and compression.",
    "Pengaku diagonal membentuk geometri segitiga kaku yang menyerap gaya dorong horizontal dari gempa dan badai."
  ),
  makeQ(
    "What property describes the ability of a structural material (like spring steel) to deform under stress and return fully to its original shape?",
    "Sifat mekanik apakah yang menggambarkan kemampuan bahan untuk kembali ke bentuk dan ukuran semula setelah gaya luar dilepaskan?",
    ["Elasticity (Elastisitas)", "Plasticity", "Brittleness", "Viscosity"],
    ["Elastisitas (Elasticity)", "Plastisitas", "Kerapuhan (Brittleness)", "Viskositas"],
    0,
    "Elasticity obeys Hooke's Law below the elastic yield point, recovering all strain upon stress release.",
    "Elastisitas adalah kemampuan bahan kembali utuh ke dimensi asal selama tegangan tidak melampaui batas elastisitasnya."
  )
];

packs['smp-2::integrated::Energy Systems and Conversion'] = [
  makeQ(
    "What fundamental physical principle is asserted by the Law of Conservation of Energy?",
    "Prinsip dasar fisika apakah yang dinyatakan oleh Hukum Kekekalan Energi?",
    ["Energy cannot be created or destroyed; it can only be transformed from one form into another", "Energy is continuously destroyed by friction", "New energy is born whenever engines burn gasoline", "Total universal energy decreases by 10% daily"],
    ["Energi tidak dapat diciptakan maupun dimusnahkan, melainkan hanya dapat diubah dari satu bentuk ke bentuk lain", "Energi selalu lenyap karena gesekan", "Energi baru tercipta saat bensin terbakar", "Total energi alam semesta berkurang tiap hari"],
    0,
    "The First Law of Thermodynamics establishes that total energy in an isolated system remains constant.",
    "Hukum Kekekalan Energi menyatakan bahwa jumlah energi dalam sistem tertutup selalu konstan dan hanya berganti bentuk."
  ),
  makeQ(
    "In a hydroelectric power station, what primary sequence of energy transformations takes place?",
    "Pada Pembangkit Listrik Tenaga Air (PLTA), bagaimanakah urutan konversi energi yang terjadi hingga menghasilkan listrik?",
    ["Gravitational Potential Energy -> Kinetic Energy of water -> Mechanical Energy of turbine -> Electrical Energy", "Electrical -> Chemical -> Kinetic -> Light", "Nuclear -> Thermal -> Gravitational -> Sound", "Chemical -> Magnetic -> Heat -> Potential"],
    ["Energi Potensial gravitasi air -> Energi Kinetik aliran -> Energi Mekanik putaran turbin -> Energi Listrik", "Listrik -> Kimia -> Kinetik -> Cahaya", "Nuklir -> Termal -> Potensial -> Bunyi", "Kimia -> Magnet -> Panas -> Potensial"],
    0,
    "Reservoir head converts to fluid velocity, spinning turbine shafts to drive magnetic induction in generators.",
    "Ketinggian air menyimpan energi potensial yang berubah menjadi kinetik saat mengalir, memutar generator menjadi listrik."
  ),
  makeQ(
    "What energy conversion occurs inside photovoltaic solar panels when sunlight strikes silicon semiconductor wafers?",
    "Perubahan energi apakah yang berlangsung pada panel surya fotovoltaik ketika terkena paparan sinar matahari?",
    ["Radiant light energy directly into Electrical energy (via the photovoltaic effect)", "Light energy into chemical coal energy", "Sound vibrations into nuclear energy", "Heat energy into diesel fuel"],
    ["Energi radiasi cahaya langsung diubah menjadi energi listrik (efek fotovoltaik)", "Energi cahaya menjadi batu bara", "Getaran suara menjadi nuklir", "Energi kalor menjadi bahan bakar solar"],
    0,
    "Photons knock valence electrons free across silicon p-n junctions, producing direct electric current (DC).",
    "Foton cahaya matahari mengeksitasi elektron pada sel silikon semikonduktor menghasilkan arus listrik searah (DC)."
  ),
  makeQ(
    "In an internal combustion car engine, what is the sequence of energy conversion driving the wheels?",
    "Pada mesin sepeda motor berbahan bakar bensin, bagaimanakah tahapan perubahan energi yang terjadi?",
    ["Chemical potential energy in fuel -> Thermal heat -> Mechanical kinetic work of pistons and wheels", "Electrical -> Gravitational -> Nuclear", "Solar -> Chemical -> Sound only", "Magnetic -> Static electricity -> Light"],
    ["Energi potensial kimia bensin -> Energi panas (termal) -> Energi kinetik mekanik piston dan roda", "Listrik -> Gravitasi -> Nuklir", "Surya -> Kimia -> Bunyi", "Magnet -> Listrik statis -> Cahaya"],
    0,
    "Combustion releases chemical bond energy as high-pressure expanding hot gases driving mechanical pistons.",
    "Pembakaran bensin melepaskan energi kimia menjadi ledakan gas panas yang mendorong piston menjadi gerak mekanis."
  ),
  makeQ(
    "What energy conversion device converts electrical energy into mechanical rotational kinetic energy?",
    "Alat konversi energi apakah yang mengubah energi listrik menjadi energi gerak mekanik putar?",
    ["Electric motor (Motor listrik)", "Electrical generator", "Solar thermal collector", "Dry cell battery"],
    ["Motor listrik (Electric motor)", "Generator listrik", "Kolektor surya", "Baterai kering"],
    0,
    "Electric motors use magnetic Lorentz forces to turn electrical currents into rotating torque.",
    "Motor listrik memanfaatkan gaya Lorentz pada kawat berarus dalam medan magnet untuk memutar poros."
  ),
  makeQ(
    "What energy conversion device uses electromagnetic induction to turn mechanical rotation into electrical current?",
    "Alat apakah yang mengubah energi kinetik putaran mekanis menjadi energi listrik melalui induksi elektromagnetik?",
    ["Electrical generator / Alternator (Generator / Dinamo)", "Electric toaster", "Incandescent lamp", "DC motor"],
    ["Generator listrik / Dinamo (Alternator)", "Pemanggang roti", "Lampu pijar", "Motor DC"],
    0,
    "Faraday induction: rotating a coil within a magnetic field induces electrical electromotive force (EMF).",
    "Generator memutar kumparan kawat di dalam medan magnet untuk menginduksikan tegangan dan arus listrik."
  ),
  makeQ(
    "Why are modern LED lights significantly more energy-efficient than traditional incandescent filament bulbs?",
    "Mengapa lampu LED jauh lebih hemat energi dibandingkan lampu pijar kawat wolfram tradisional?",
    ["LEDs emit light directly through semiconductor electroluminescence, wasting very little energy as heat", "Incandescent bulbs convert 95% of energy into pure light", "LEDs require 10,000 Volts", "LEDs do not use electricity"],
    ["LED memancarkan cahaya melalui elektroluminesensi semikonduktor dengan sedikit sekali panas yang terbuang", "Lampu pijar mengubah 95% energi jadi cahaya", "LED butuh tegangan ribuan Volt", "LED tidak memakai daya listrik"],
    0,
    "Incandescents lose ~90% of electricity as infrared heat; LEDs convert over 50% directly into visible photons.",
    "Lampu pijar membuang 90% energinya sebagai panas, sedangkan lampu LED mengubah sebagian besar listrik langsung menjadi cahaya."
  ),
  makeQ(
    "What is the mathematical equation for kinetic energy (Ek) of an object with mass m moving at speed v?",
    "Rumus fisika untuk menghitung besarnya energi kinetik (Ek) suatu benda bermassa m yang melaju dengan kecepatan v adalah?",
    ["Ek = 0.5 * m * v^2", "Ek = m * g * h", "Ek = F * s", "Ek = m * v"],
    ["Ek = 1/2 * m * v^2", "Ek = m * g * h", "Ek = F * s", "Ek = m * v"],
    0,
    "Kinetic energy scales quadratically with speed: Ek = 1/2 * m * v^2.",
    "Energi kinetik dihitung dengan Ek = 1/2 × m × v^2, di mana kecepatan v memiliki pengaruh kuadratik."
  ),
  makeQ(
    "What energy is stored inside a compressed mechanical coil spring?",
    "Energi apakah yang tersimpan di dalam sebuah pegas logam yang sedang dimampatkan atau ditarik?",
    ["Elastic potential energy (Energi potensial elastis / pegas)", "Nuclear fission energy", "Gravitational kinetic energy", "Thermal combustion energy"],
    ["Energi potensial pegas / elastis", "Energi fisi nuklir", "Energi kinetik gravitasi", "Energi pembakaran termal"],
    0,
    "Elastic deformation stores mechanical work in atomic lattice strain: Ep = 1/2 * k * x^2.",
    "Pegas yang tertekan menyimpan energi potensial elastis yang dapat dilepaskan kembali menjadi gerak."
  ),
  makeQ(
    "What is the SI unit of power, representing the rate of energy consumption of one Joule per second?",
    "Apakah satuan internasional (SI) untuk daya listrik/mekanik yang setara dengan laju energi 1 Joule per detik?",
    ["Watt (W)", "Joule (J)", "Coulomb (C)", "Volt (V)"],
    ["Watt (W)", "Joule (J)", "Coulomb (C)", "Volt (V)"],
    0,
    "Power is the rate of doing work: 1 Watt = 1 Joule per second.",
    "Daya adalah laju perubahan energi per satuan waktu, di mana 1 Watt setara dengan 1 Joule per detik."
  )
];

packs['smp-2::integrated::Prototypes, Variables, and Testing'] = [
  makeQ(
    "In controlled scientific experiments, what is an INDEPENDENT variable?",
    "Dalam metode penelitian eksperimen ilmiah, apakah yang dimaksud dengan variabel BEBAS (Independent Variable)?",
    ["The variable intentionally changed or manipulated by the experimenter to test its effect", "The variable measured as an outcome response", "The factors kept strictly constant", "The temperature of the room"],
    ["Variabel yang sengaja diubah atau dimanipulasi oleh peneliti untuk diamati pengaruhnya", "Variabel yang diukur sebagai hasil respon", "Faktor yang dijaga tetap sama", "Suhu ruangan laboratorium"],
    0,
    "The independent variable is the single parameter varied by researchers to observe its consequences.",
    "Variabel bebas adalah faktor yang sengaja dibuat berbeda untuk melihat pengaruhnya terhadap variabel terikat."
  ),
  makeQ(
    "What is a DEPENDENT variable in an engineering or scientific experiment?",
    "Apakah yang dimaksud dengan variabel TERIKAT (Dependent Variable) dalam suatu percobaan ilmiah?",
    ["The variable observed and measured to see how it responds to changes in the independent variable", "The variable chosen by flipping a coin", "The tool used to clean equipment", "The material chosen before the test"],
    ["Variabel yang diamati dan diukur nilainya untuk mengetahui respon akibat pengaruh variabel bebas", "Variabel yang dipilih lewat lempar koin", "Alat pembersih laboratorium", "Bahan yang dibeli sebelum uji coba"],
    0,
    "The dependent variable is the measured output whose values depend upon the state of the independent variable.",
    "Variabel terikat adalah hasil pengukuran atau respons yang timbul akibat manipulasi variabel bebas."
  ),
  makeQ(
    "Why must CONTROLLED variables (constants) be held strictly identical across all experimental trials?",
    "Mengapa variabel KONTROL harus dijaga agar tetap sama dan tidak berubah pada seluruh perlakuan eksperimen?",
    ["To ensure that observed changes in the dependent variable are solely caused by the independent variable (fair testing)", "To make the experiment take twice as long", "To use more laboratory chemicals", "To prevent writing reports"],
    ["Memastikan bahwa perubahan hasil yang teramati murni hanya diakibatkan oleh pengaruh variabel bebas (uji coba adil)", "Membuat penelitian lebih lama", "Menghabiskan bahan kimia", "Menghindari pembuatan laporan"],
    0,
    "Controlled variables isolate the causal link between independent and dependent variables, guaranteeing test validity.",
    "Variabel kontrol mengisolasi faktor luar sehingga kesimpulan yang ditarik terbukti valid dan terpercaya."
  ),
  makeQ(
    "Why do engineers conduct multiple repeated trials (e.g. 5 repetitions) of a prototype test instead of just one?",
    "Mengapa para insinyur selalu melakukan beberapa kali pengujian berulang (replikasi) dan bukan hanya sekali saja?",
    ["To minimize random measurement errors, identify anomalies, and ensure statistically reliable results", "To destroy as many prototypes as possible", "Because computers cannot record single tests", "To fill up paper notebooks"],
    ["Mengurangi pengaruh kesalahan acak (random error), mendeteksi anomali, dan meningkatkan keandalan data statistik", "Merusak sebanyak mungkin prototipe", "Karena komputer menolak uji tunggal", "Menghabiskan buku catatan"],
    0,
    "Repeated trials allow calculation of means, standard deviations, and detection of experimental outliers.",
    "Pengulangan uji coba menghasilkan nilai rata-rata yang lebih akurat dan mengurangi galat pengukuran acak."
  ),
  makeQ(
    "What type of prototype is created quickly using low-cost materials (cardboard, 3D prints) to evaluate shape and ergonomics?",
    "Jenis prototipe awal apakah yang dibuat cepat dengan biaya murah (kardus, busa, cetak 3D) untuk menguji bentuk dan ergonomi?",
    ["Low-fidelity prototype (Mockup fisik awal)", "Full-scale steel production run", "Final factory shipment", "Patent blueprint certificate"],
    ["Prototipe fidelitas rendah / Mockup awal (Low-fidelity prototype)", "Produk akhir cetak pabrik", "Pengiriman massal", "Sertifikat paten"],
    0,
    "Low-fidelity mockups allow rapid tactile feedback and ergonomic assessment before investing in expensive tooling.",
    "Prototipe awal berbiaya murah memungkinkan evaluasi bentuk dan kenyamanan genggam sebelum tahap permesinan mahal."
  ),
  makeQ(
    "What is the role of an experimental CONTROL GROUP in a scientific study?",
    "Apakah fungsi dari KELOMPOK KONTROL dalam rancangan penelitian ilmiah?",
    ["To serve as a standard baseline for comparison that receives no experimental treatment", "To perform all the heavy manual labor", "To decide which scientists get funded", "To publish the paper in magazines"],
    ["Sebagai pembanding dasar (baseline) standar yang tidak diberikan perlakuan khusus eksperimen", "Melakukan pekerjaan manual berat", "Menentukan dana penelitian", "Menerbitkan artikel di majalah"],
    0,
    "Control groups establish baseline values against which experimental outcomes can be statistically contrasted.",
    "Kelompok kontrol adalah kelompok acuan netral yang digunakan untuk membandingkan efektivitas hasil perlakuan."
  ),
  makeQ(
    "What testing methodology intentionally subjects a prototype to stresses far exceeding normal operating limits until it breaks?",
    "Metode pengujian yang sengaja memberikan beban ekstrem melampaui batas normal hingga prototipe rusak/patah disebut?",
    ["Destructive stress testing (Uji beban destruktif)", "Visual inspection", "Non-destructive scanning", "Aesthetic survey"],
    ["Pengujian destruktif / uji beban patah (Destructive testing)", "Inspeksi visual", "Pindai non-destruktif", "Survei keindahan bentuk"],
    0,
    "Destructive testing uncovers exact failure thresholds, ultimate yield strengths, and fracture mechanics.",
    "Uji destruktif membebani komponen hingga patah untuk mengetahui batas kekuatan maksimum dan pola kegagalan material."
  ),
  makeQ(
    "When plotting experimental test data on a 2D Cartesian graph, on which axis is the independent variable standardly placed?",
    "Saat menyajikan data hasil eksperimen ke dalam grafik diagram kartesius, sumbu manakah yang digunakan untuk variabel bebas?",
    ["Horizontal X-axis (Sumbu X mendatar)", "Vertical Y-axis", "Diagonal 45-degree axis", "Negative Z-axis only"],
    ["Sumbu mendatar X (Horizontal X-axis)", "Sumbu tegak Y", "Garis miring 45 derajat", "Sumbu Z belakang"],
    0,
    "By convention, the independent variable is plotted on the horizontal x-axis and the dependent variable on the y-axis.",
    "Secara standar konvensi ilmiah, variabel bebas diletakkan pada sumbu X mendatar dan variabel terikat pada sumbu Y tegak."
  ),
  makeQ(
    "What is qualitative data, and how does it differ from quantitative data in prototype testing?",
    "Apakah perbedaan antara data kualitatif dan data kuantitatif dalam pengujian performa prototipe?",
    ["Qualitative data describes non-numerical qualities (color, feel, sound texture); Quantitative data consists of exact numerical measurements", "Qualitative is always measured in kilograms", "Quantitative uses words only without numbers", "There is no difference"],
    ["Data kualitatif berupa deskripsi sifat tanpa angka (kenyamanan, warna, bunyi); Data kuantitatif berupa angka pengukuran terukur (massa, waktu, suhu)", "Data kualitatif selalu diukur dalam kilogram", "Data kuantitatif berupa kata tanpa angka", "Keduanya sama persis"],
    0,
    "Quantitative data provides numerical metrics (e.g. 4.2 kg, 12 seconds); qualitative describes sensory properties.",
    "Data kuantitatif dinyatakan dalam angka dan satuan ukur; data kualitatif mendeskripsikan kualitas sifat fisik."
  ),
  makeQ(
    "If experimental data repeatedly contradicts the initial engineering hypothesis, what is the proper scientific course of action?",
    "Jika data hasil pengujian berkali-kali tidak sesuai dan membantah hipotesis awal peneliti, langkah apakah yang harus diambil?",
    ["Accept the empirical data honestly, reject or modify the hypothesis, and re-evaluate the design model", "Falsify the test numbers to match the hypothesis", "Destroy the laboratory equipment", "Claim the test was never run"],
    ["Menerima data empiris secara jujur, merevisi atau menolak hipotesis awal, dan memperbaiki konsep desain", "Memalsukan angka hasil uji coba agar sesuai harapan", "Merusak peralatan pengukur", "Mengaku tidak pernah melakukan uji coba"],
    0,
    "Scientific integrity demands adapting hypotheses to empirical reality, not altering data to fit preconceptions.",
    "Kejujuran ilmiah menuntut peneliti merevisi teori/desain berdasarkan data nyata, bukan memanipulasi angka."
  )
];

module.exports = packs;
