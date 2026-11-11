function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return { qEn, qId, optionsEn, optionsId, correctIndex: correctIdx, expEn, expId };
}

const packs = {};

// ==========================================
// SMP 3 INTEGRATED (4 themes)
// ==========================================
packs['smp-3::integrated::Mechanical Systems Analysis'] = [
  makeQ(
    "In rotational mechanical dynamics, what physical quantity represents the rotational equivalent of linear force?",
    "Dalam dinamika rotasi mekanik, besaran apakah yang merupakan padanan gerak putar dari gaya linier?",
    ["Torque (Torsi / Momen Gaya: tau = r x F)", "Linear momentum", "Mass inertia only", "Electrical potential"],
    ["Torsi / Momen Gaya (Torque: tau = r × F)", "Momentum linier", "Massa inersia", "Tegangan listrik"],
    0,
    "Torque measures the rotational tendency of a force about a pivot: tau = r * F * sin(theta).",
    "Torsi atau momen gaya adalah ukuran keefektifan gaya dalam memutar suatu benda terhadap poros putarnya."
  ),
  makeQ(
    "How does the moment of inertia (I) of a rotating wheel affect its resistance to angular acceleration?",
    "Bagaimanakah pengaruh momen inersia (I) suatu roda terhadap kemampuan berputarnya saat diberi torsi?",
    ["Larger moment of inertia provides greater resistance to changes in rotational speed (alpha = tau / I)", "Larger inertia makes it spin instantaneously", "Moment of inertia eliminates friction", "It has no effect on rotation"],
    ["Semakin besar momen inersia, semakin sukar roda dipercepat atau dihentikan putarannya (alpha = tau / I)", "Inersia besar membuat putaran instan tanpa batas", "Momen inersia menghilangkan gesekan", "Tidak memiliki pengaruh sama sekali"],
    0,
    "Moment of inertia quantifies rotational mass distribution: higher I resists angular acceleration (alpha = tau / I).",
    "Momen inersia adalah ukuran kelembaman benda untuk berotasi; semakin besar I, semakin sulit mengubah kecepatan sudutnya."
  ),
  makeQ(
    "What automotive component allows left and right drive wheels to rotate at different speeds when cornering a turn?",
    "Komponen mekanis pada mobil yang memungkinkan roda kiri dan kanan berputar dengan kecepatan berbeda saat berbelok adalah?",
    ["Differential gear mechanism (Gardan / Diferensial)", "Flywheel", "Carburetor", "Radiator fan"],
    ["Gardan / Diferensial (Differential)", "Roda gila (Flywheel)", "Karburator", "Kipas radiator"],
    0,
    "The differential uses bevel planetary gears to allocate independent rotational velocities to inner and outer wheels.",
    "Gardan diferensial membagi putaran ke roda kiri dan kanan sehingga roda luar yang menempuh lintasan lebih jauh dapat berputar lebih cepat."
  ),
  makeQ(
    "What is the function of a heavy mechanical Flywheel connected to a piston engine's crankshaft?",
    "Apakah fungsi dari roda gila (Flywheel) bermassa berat yang dipasang pada poros engkol mesin torak?",
    ["To store rotational kinetic energy and smooth out power fluctuations between combustion strokes", "To cool down the radiator coolant", "To generate radio frequencies", "To increase exhaust smoke"],
    ["Menyimpan energi kinetik putaran untuk memperhalus fluktuasi hentakan tenaga antar langkah pembakaran", "Mendinginkan air radiator", "Memancarkan sinyal radio", "Menghasilkan asap knalpot"],
    0,
    "The flywheel's large rotational inertia dampens torque ripple and maintains momentum during non-power strokes.",
    "Roda gila memanfaatkan inersia massa untuk meratakan putaran mesin agar tidak tersendat-sendat di antara langkah usaha."
  ),
  makeQ(
    "What failure mode in mechanical components occurs after millions of cyclical load reversals below ultimate yield strength?",
    "Kegagalan mekanik pada poros logam yang patah akibat mengalami jutaan kali siklus pembebanan dinamis berulang disebut?",
    ["Mechanical fatigue (Kelelahan logam / Fatigue failure)", "Thermal melting", "Instant tensile overload", "Chemical evaporation"],
    ["Kelelahan logam (Metal fatigue / Fatigue failure)", "Pelelehan termal mendadak", "Putus tarik seketika", "Penguapan kimia"],
    0,
    "Fatigue crack nucleation and slow cyclic propagation can cause sudden catastrophic failure under repetitive stresses.",
    "Kelelahan logam timbul akibat retak mikro yang menjalar perlahan karena beban bolak-balik berulang hingga akhirnya patah."
  ),
  makeQ(
    "What mechanical device permits shaft rotation in only one direction while freewheeling in the reverse (like on bicycle rear wheels)?",
    "Komponen mekanik pada roda belakang sepeda yang hanya meneruskan kayuhan ke depan dan berputar bebas saat meluncur disebut?",
    ["Ratchet and pawl / Freewheel mechanism (Mekanisme roda bebas / ratchet)", "Worm gear", "Harmonic drive", "Rigid coupler"],
    ["Mekanisme ratchet dan roda bebas (Freewheel)", "Roda gigi cacing", "Harmonic drive", "Kopling kaku"],
    0,
    "A ratchet wheel uses spring-loaded pawls that catch teeth in one direction and slip harmlessly in reverse.",
    "Mekanisme ratchet mengunci gigi roda saat dikayuh maju namun menggelincir bebas tanpa beban saat berhenti mengayuh."
  ),
  makeQ(
    "What engineering metric measures the ratio of output power to input power in a mechanical gearbox?",
    "Besaran apakah yang menyatakan rasio antara daya mekanik keluaran terhadap daya masukan pada sebuah kotak transmisi roda gigi?",
    ["Mechanical power efficiency (Efisiensi daya mekanik: P_out / P_in)", "Gear reduction ratio", "Tensile yield strength", "Thermal modulus"],
    ["Efisiensi daya mekanik (P_keluaran / P_masukan)", "Rasio reduksi roda gigi", "Kekuatan tarik bahan", "Modulus termal"],
    0,
    "Efficiency = P_out / P_in. In gearboxes, gear tooth friction and churn reduce power efficiency typically to 92-98%.",
    "Efisiensi mekanik mengukur persentase daya yang berhasil disalurkan ke poros output setelah dikurangi rugi-rugi gesekan."
  ),
  makeQ(
    "What is the mechanical advantage of a compound gear train with two stages of 4:1 and 5:1 reductions?",
    "Berapakah total rasio reduksi putaran dari sistem transmisi roda gigi majemuk dua tingkat dengan rasio 4:1 dan 5:1?",
    ["20:1 (4 * 5)", "9:1 (4 + 5)", "1:1", "40:1"],
    ["20:1 (4 × 5)", "9:1 (4 + 5)", "1:1", "40:1"],
    0,
    "Compound gear train ratio is the product of stage ratios: 4 * 5 = 20:1.",
    "Rasio total rangkaian roda gigi bertingkat adalah perkalian dari rasio masing-masing tingkat: 4 × 5 = 20:1."
  ),
  makeQ(
    "What mechanical coupling connects two rotating shafts that are slightly misaligned angle-wise (such as automotive drive shafts)?",
    "Sambungan mekanis apakah yang menghubungkan dua poros berputar yang membentuk sudut kemiringan (seperti poros transmisi ke roda)?",
    ["Universal Joint (Cardan joint / U-joint)", "Rigid flange sleeve", "Solder bead", "Cotter pin"],
    ["Sendi universal / Sambungan Cardan (Universal joint)", "Selongsong flens kaku", "Titik solder", "Pena pengunci kaku"],
    0,
    "A universal joint transmits rotary torque between non-collinear intersecting shafts via a cross-spider yoke.",
    "Universal joint memungkinkan poros berputar meneruskan putaran secara fleksibel meskipun posisinya membentuk sudut naik-turun."
  ),
  makeQ(
    "What vibration suppression component converts oscillating mechanical bounce into viscous hydraulic heat in cars?",
    "Komponen peredam pada suspensi kendaraan yang meredam pantulan osilasi pegas menjadi panas fluida hidrolik adalah?",
    ["Shock absorber / Damper (Peredam kejut hidrolik)", "Coil spring only", "Sway bar bracket", "Rubber tire rim"],
    ["Peredam kejut (Shock absorber / Damper)", "Pegas ulir saja", "Braket stabilizer", "Pelek roda karet"],
    0,
    "Shock absorbers force viscous hydraulic oil through small orifices to dampen kinetic vibrations into heat.",
    "Shock absorber memompa cairan hidrolik melalui katup sempit untuk menyerap energi getaran pegas agar mobil stabil."
  )
];

packs['smp-3::integrated::Electricity in Design'] = [
  makeQ(
    "In microcontrollers like Arduino, what is the role of Pulse Width Modulation (PWM) on digital output pins?",
    "Pada mikrokontroler seperti Arduino, apakah fungsi dari fitur sinyal PWM (Pulse Width Modulation) pada pin digital?",
    ["To simulate variable analog voltages (e.g. controlling motor speed or LED brightness) by rapidly pulsing digital signals", "To shut off power forever", "To convert DC into high-voltage lightning", "To connect to Wi-Fi antennas directly"],
    ["Mensimulasikan tegangan analog variabel (mengatur kecepatan motor atau kecerahan lampu LED) dengan modulasi lebar pulsa", "Mematikan arus selamanya", "Mengubah DC menjadi kilat tegangan tinggi", "Menghubungkan langsung ke antena radio"],
    0,
    "PWM varies duty cycle (ratio of ON to OFF time at high frequency) to deliver controlled average power.",
    "PWM mengatur perbandingan waktu sinyal HIGH dan LOW (duty cycle) untuk mengontrol daya motor DC atau meredupkan LED."
  ),
  makeQ(
    "What electromechanical switch uses a low-power electromagnet to safely open or close high-power circuit contacts?",
    "Sakelar elektromekanik yang memanfaatkan kumparan elektromagnetik berdaya rendah untuk mengendalikan sirkuit berdaya tinggi disebut?",
    ["Relay (Relai)", "Potentiometer", "Zener diode", "Piezo buzzer"],
    ["Relai (Relay)", "Potensiometer", "Dioda Zener", "Buzzer piezo"],
    0,
    "A relay provides galvanic isolation between sensitive control logic (5V) and heavy mains loads (220V).",
    "Relai memungkinkan mikrokontroler 5V mengendalikan peralatan listrik tegangan tinggi 220V secara terisolasi dan aman."
  ),
  makeQ(
    "What light-sensitive semiconductor resistor decreases its electrical resistance as ambient illumination increases?",
    "Sensor semikonduktor manakah yang nilai hambatan listriknya akan menurun drastis saat terkena intensitas cahaya terang?",
    ["Light Dependent Resistor (LDR / Fotoresistor)", "Thermistor", "Piezo sensor", "Inductive sensor"],
    ["LDR (Light Dependent Resistor / Fotoresistor)", "Termistor NTC", "Sensor piezoelektrik", "Sensor induktif"],
    0,
    "Photons excite electron-hole pairs in LDR semiconductors (cadmium sulfide), sharply lowering resistance.",
    "LDR memiliki resistansi tinggi di tempat gelap (megaohm) dan resistansinya turun menjadi ratusan ohm saat terkena cahaya."
  ),
  makeQ(
    "Which semiconductor component can amplify weak electronic signals or act as a high-speed solid-state switch?",
    "Komponen semikonduktor tiga kaki (kolektor, basis, emitor) yang berfungsi sebagai penguat sinyal atau sakelar elektronik cepat adalah?",
    ["Transistor (BJT / MOSFET)", "Fixed resistor", "Ceramic capacitor", "Electrolytic inductor"],
    ["Transistor (BJT / MOSFET)", "Resistor tetap", "Kapasitor keramik", "Induktor kawat"],
    0,
    "Transistors control large output currents through small input base currents or gate voltages.",
    "Transistor adalah komponen aktif fundamental yang bertindak sebagai sakelar digital dan penguat arus dalam sirkuit elektronik."
  ),
  makeQ(
    "What safety sensor component protects electrical systems against short-circuit fire hazards by automatically tripping when current spikes?",
    "Komponen pemutus sirkuit otomatis yang akan trip (memutus kontak) saat terjadi korsleting atau lonjakan arus berlebih disebut?",
    ["Miniature Circuit Breaker (MCB / Pemutus Sirkuit)", "Voltmeter", "Step-up transformer", "Spark plug"],
    ["Miniature Circuit Breaker (MCB / Pemutus Sirkuit)", "Voltmeter", "Trafo step-up", "Busi listrik"],
    0,
    "MCBs use bimetallic thermal trips and magnetic solenoids to interrupt short circuits without sacrificial destruction.",
    "MCB mendeteksi arus lebih dan korsleting listrik, lalu memutus aliran secara otomatis untuk mencegah bahaya kebakaran."
  ),
  makeQ(
    "What circuit configuration of two series resistors is widely used to obtain a lower reference voltage from a higher supply voltage?",
    "Rangkaian pembagi tegangan (Voltage Divider) yang terdiri dari dua resistor seri digunakan untuk tujuan apa?",
    ["To scale down an input voltage to a safe, measurable fraction for sensors and ADC inputs: V_out = V_in * (R2 / (R1 + R2))", "To amplify voltage by 1,000 times", "To turn direct current into nuclear power", "To cool the circuit board"],
    ["Menurunkan tegangan masukan menjadi nilai proporsional yang aman untuk dibaca sensor/mikrokontroler (V_out = V_in × R2 / (R1 + R2))", "Menaikkan tegangan hingga seribu kali", "Mengubah DC menjadi daya nuklir", "Mendinginkan papan sirkuit"],
    0,
    "Voltage divider: V_out = V_in * R2 / (R1 + R2), common for interfacing analog sensors to microcontrollers.",
    "Rangkaian pembagi tegangan membagi tegangan sumber menjadi nilai lebih rendah yang dapat diukur oleh pin analog Arduino."
  ),
  makeQ(
    "What is the function of a 'pull-up resistor' connected to a digital input button on a microcontroller?",
    "Apakah fungsi dari pemasangan 'pull-up resistor' pada pin masukan digital tombol mikrokontroler?",
    ["To ensure the input pin reads a stable HIGH voltage state when the button is open (preventing floating inputs)", "To illuminate the button brightly", "To destroy the microcontroller", "To speed up code execution"],
    ["Memastikan pin membaca logika HIGH yang stabil saat tombol terbuka dan mencegah status mengambang (floating)", "Menyalakan lampu pada tombol", "Merusak mikrokontroler", "Mempercepat kompilasi program"],
    0,
    "Pull-up resistors tie high-impedance CMOS inputs to VCC, eliminating erratic noise oscillations on floating gates.",
    "Resistor pull-up menarik tegangan pin ke HIGH saat tombol terbuka sehingga pembacaan logika stabil dan bebas gangguan derau."
  ),
  makeQ(
    "Why must an electrolytic capacitor be connected with strict adherence to its positive and negative polarity markings?",
    "Mengapa kapasitor elektrolit (Elco) harus dipasang dengan memperhatikan tanda kutub positif dan negatifnya secara ketat?",
    ["Reverse polarity can rupture its internal dielectric oxide layer, causing overheating, leakage, or explosion", "It will simply generate free electricity", "It will change its color to rainbow", "Polars do not matter in capacitors"],
    ["Pemasangan kutub terbalik dapat merusak lapisan oksida dielektrik, menimbulkan korsleting, panas berlebih, atau meledak", "Kapasitor akan menghasilkan listrik gratis", "Kapasitor akan berganti warna pelangi", "Kutub kapasitor tidak berpengaruh sama sekali"],
    0,
    "Electrolytic capacitors have polarized aluminum oxide dielectrics formed by chemical anodization.",
    "Kapasitor elektrolit memiliki polaritas; jika terpasang terbalik gas hidrogen di dalamnya memuai dan dapat merusak komponen."
  ),
  makeQ(
    "What device converts electrical acoustic signals into audible sound waves using a voice coil and permanent magnet?",
    "Alat transduser elektroakustik yang mengubah sinyal listrik audio menjadi gelombang bunyi melalui kumparan kawat dan magnet adalah?",
    ["Loudspeaker (Pengeras suara / Speaker)", "Microphone", "Photodiode", "Solar cell"],
    ["Loudspeaker (Pengeras suara / Speaker)", "Mikrofon", "Fotodioda", "Panel surya"],
    0,
    "Varying audio currents through the voice coil interact with the permanent magnet, vibrating the speaker cone.",
    "Arus audio bolak-balik pada kumparan suara menghasilkan gaya Lorentz yang menggetarkan membran kerucut menjadi bunyi."
  ),
  makeQ(
    "In a DC motor control circuit, what is the role of an 'H-Bridge' driver circuit (such as L298N)?",
    "Pada sistem kendali robot, apakah fungsi utama rangkaian penggerak motor 'H-Bridge' (seperti modul L298N)?",
    ["To enable bidirectional control of DC motors (forward and reverse rotation) and PWM speed control", "To connect the motor directly to household AC mains", "To measure atmospheric wind velocity", "To replace the battery with solar panels"],
    ["Mengatur arah putaran motor DC (maju dan mundur) secara elektrik serta mengatur kecepatan putarannya melalui sinyal PWM", "Menghubungkan motor langsung ke stopkontak PLN", "Mengukur kecepatan angin", "Menggantikan fungsi baterai"],
    0,
    "An H-bridge switches polarity across motor terminals using four transistors arranged in an 'H' configuration.",
    "Rangkaian H-Bridge membalik arah aliran arus listrik pada motor DC sehingga motor dapat berputar searah maupun berlawanan jarum jam."
  )
];

packs['smp-3::integrated::Energy, Power, and Efficiency'] = [
  makeQ(
    "What is the mathematical definition of electrical power (P) in terms of voltage (V) and current (I)?",
    "Apakah rumus dasar untuk menghitung daya listrik (P) berdasarkan beda potensial (V) dan kuat arus (I)?",
    ["P = V * I", "P = V / I", "P = I / V", "P = V + I"],
    ["P = V * I", "P = V / I", "P = I / V", "P = V + I"],
    0,
    "Electrical power (in Watts) equals potential difference (Volts) multiplied by current (Amperes).",
    "Daya listrik (Watt) dihitung dengan rumus P = V × I, di mana V adalah tegangan dan I adalah kuat arus."
  ),
  makeQ(
    "A 220V electric water heater draws a current of 2 Amperes for 30 minutes. How much electrical energy does it consume?",
    "Sebuah pemanas air 220 Volt mengalirkan arus listrik 2 Ampere selama 30 menit (1.800 detik). Berapakah energi listrik yang diserap?",
    ["792,000 Joules (792 kJ)", "440 Joules", "13,200 Joules", "220 Joules"],
    ["792.000 Joule (792 kJ)", "440 Joule", "13.200 Joule", "220 Joule"],
    0,
    "W = P * t = (V * I) * t = (220 * 2) * 1,800 s = 440 * 1,800 = 792,000 J.",
    "Energi listrik W = V × I × t = 220 × 2 × 1.800 detik = 792.000 Joule (792 kJ)."
  ),
  makeQ(
    "What commercial billing unit of electrical energy is standardly used by power utilities (like PLN)?",
    "Satuan energi listrik komersial apakah yang digunakan oleh perusahaan penyedia listrik (PLN) pada meteran rumah tangga?",
    ["Kilowatt-hour (kWh)", "Ampere-meter", "Volt-second", "Coulomb-hour"],
    ["Kilowatt-hour (kWh / kiloWatt-jam)", "Ampere-meter", "Volt-detik", "Coulomb-jam"],
    0,
    "1 kWh equals 1,000 Watts operating for one hour, equivalent to 3,600,000 Joules (3.6 MJ).",
    "1 kWh (kilowatt-hour) setara dengan pemakaian daya 1.000 Watt selama 1 jam (3,6 juta Joule)."
  ),
  makeQ(
    "Why is electric power transmitted across long-distance grid lines at ultra-high voltages (e.g. 150 kV to 500 kV)?",
    "Mengapa transmisi listrik jarak jauh melalui jalur SUTET selalu dinaikkan tegangannya hingga ratusan kilovolt (kV)?",
    ["High voltage drastically reduces transmission current, minimizing I^2 * R thermal power loss in cables", "High voltage makes electricity flow faster than light", "To make power lines glow at night", "Because transformers cannot handle low voltage"],
    ["Tegangan tinggi memperkecil kuat arus transmisi sehingga meminimalkan rugi daya panas pada kabel (P_hilang = I^2 × R)", "Tegangan tinggi membuat aliran listrik melebihi kecepatan cahaya", "Agar kawat menyala di malam hari", "Karena trafo tidak bisa memproses tegangan rendah"],
    0,
    "P_loss = I^2 * R. Stepping voltage up lowers current proportionally, cutting Joule resistive dissipation.",
    "Dengan menaikkan tegangan, kuat arus (I) mengecil drastis sehingga energi yang terbuang menjadi panas di kawat transmisi sangat kecil."
  ),
  makeQ(
    "An electric motor consumes 500 Watts of electrical input power and delivers 400 Watts of useful mechanical shaft power. What is its efficiency?",
    "Sebuah motor listrik menyerap daya masukan 500 Watt dan menghasilkan daya mekanik putaran 400 Watt. Berapakah efisiensi motor tersebut?",
    ["80%", "90%", "20%", "125%"],
    ["80%", "90%", "20%", "125%"],
    0,
    "Efficiency = (Output / Input) * 100% = (400 / 500) * 100% = 80%.",
    "Efisiensi dihitung dengan rumus: (Daya keluaran / Daya masukan) × 100% = (400 / 500) × 100% = 80%."
  ),
  makeQ(
    "What thermodynamic law states that no heat engine operating between two temperatures can achieve 100% thermal efficiency?",
    "Hukum termodinamika manakah yang menyatakan bahwa tidak mungkin membuat mesin kalor yang dapat mengubah seluruh kalor menjadi usaha dengan efisiensi 100%?",
    ["Second Law of Thermodynamics (Carnot limit / Kelvin-Planck statement)", "Zeroth Law of thermal equilibrium", "Newton's First Law", "Law of conservation of volume"],
    ["Hukum II Termodinamika (Prinsip Carnot / Pernyataan Kelvin-Planck)", "Hukum Nol Termodinamika", "Hukum I Newton", "Hukum Kekekalan Volume"],
    0,
    "The Second Law establishes that heat cannot spontaneously flow entirely into work without waste rejection to a cold reservoir.",
    "Hukum II Termodinamika menyatakan bahwa selalu ada kalor yang terbuang ke reservoir dingin sehingga efisiensi mesin termal selalu < 100%."
  ),
  makeQ(
    "What renewable energy technology harnesses the natural kinetic energy of atmospheric wind currents to spin electric generators?",
    "Pembangkit listrik terbarukan apakah yang memanfaatkan energi kinetik hembusan angin untuk memutar turbin generator?",
    ["Wind Turbine / Wind Power Plant (PLTB)", "Geothermal steam station", "Tidal barrage pool", "Biomass incinerator"],
    ["Pembangkit Listrik Tenaga Bayu / Angin (PLTB)", "Pembangkit panas bumi (PLTP)", "Pembangkit pasang surut", "Pembangkit biomassa"],
    0,
    "Wind turbines convert atmospheric aerodynamic kinetic energy into rotational mechanical energy and electricity.",
    "PLTB memanfaatkan aerodinamika bilah turbin angin untuk memutar poros generator listrik tanpa polusi emisi."
  ),
  makeQ(
    "In geothermal power generation, what subterranean resource is extracted to spin steam turbines?",
    "Pada Pembangkit Listrik Tenaga Panas Bumi (PLTP), sumber daya bawah tanah apakah yang dimanfaatkan untuk memutar turbin?",
    ["High-pressure underground volcanic steam and hot hydrothermal water", "Underground crude oil flames", "Liquid lava pumped directly into homes", "Radioactive granite crystals"],
    ["Uap panas alami bertekanan tinggi dari kantung hidrotermal dalam kerak bumi", "Pembakaran minyak mentah bawah tanah", "Lava cair yang dialirkan langsung", "Kristal radioaktif"],
    0,
    "Geothermal plants tap hydrothermal reservoirs deep in the Earth's crust to extract dry steam or flash steam.",
    "PLTP memanfaatkan uap air panas alami dari dalam perut bumi untuk memutar turbin pembangkit listrik secara berkelanjutan."
  ),
  makeQ(
    "How does thermal insulation in building walls and roofs improve residential energy efficiency?",
    "Bagaimanakah pemasangan isolasi termal pada dinding dan atap bangunan dapat menghemat energi listrik secara signifikan?",
    ["It slows heat conduction between indoors and outdoors, reducing the electrical workload of air conditioning and heaters", "It generates passive electricity inside the ceiling", "It blocks all radio waves and sunlight", "It cools rooms by creating a vacuum"],
    ["Menghambat perpindahan panas konduksi antara udara luar dan dalam ruangan sehingga meringankan beban kerja AC/pemanas", "Menghasilkan listrik pasif di plafon", "Menghalau sinyal radio dan cahaya", "Membekukan ruangan dengan ruang hampa"],
    0,
    "Insulation materials have low thermal conductivity (k-value), retaining conditioned air temperatures efficiently.",
    "Bahan insulasi termal menahan laju aliran panas dari luar gedung sehingga penggunaan AC untuk mendinginkan ruangan jauh lebih hemat listrik."
  ),
  makeQ(
    "What term describes electrical power consumed by electronic devices while plugged in on standby or turned 'off'?",
    "Konsumsi daya listrik yang tetap terbuang secara pasif saat peralatan elektronik dimatikan tetapi stekernya masih terhubung ke stopkontak disebut?",
    ["Phantom load / Standby vampire power", "Short circuit surge", "Capacitive saturation", "Ohmic lightning"],
    ["Daya siluman / Beban siaga (Vampire power / Standby power)", "Lonjakan korsleting", "Saturasi kapasitif", "Kilatan Ohm"],
    0,
    "Vampire draw powers internal transformers, clocks, and sensors in idle consumer appliances.",
    "Standby power adalah energi listrik yang terus disedot secara diam-diam oleh perangkat elektronik saat kondisi istirahat/mati."
  )
];

packs['smp-3::integrated::Data-Driven Design Optimization'] = [
  makeQ(
    "What is the role of Finite Element Analysis (FEA) computer simulation software in modern structural engineering?",
    "Apakah peran perangkat lunak simulasi komputer FEA (Finite Element Analysis) dalam rekayasa desain teknik modern?",
    ["To numerically simulate stress, deformation, and thermal behavior across virtual 3D CAD meshes before physical fabrication", "To generate marketing logos automatically", "To replace all human engineers with robots", "To type spreadsheet numbers without humans"],
    ["Mensimulasikan tegangan, deformasi, dan distribusi panas pada model 3D CAD secara digital sebelum diproduksi nyata", "Membuat logo pemasaran otomatis", "Menggantikan seluruh tenaga kerja", "Mengetik rumus di dokumen"],
    0,
    "FEA discretizes complex CAD bodies into meshes of elements to predict structural failure points mathematically.",
    "FEA membagi model desain menjadi elemen-elemen kecil untuk menganalisis titik-titik konsentrasi tegangan kritis pada komputer."
  ),
  makeQ(
    "What optimization design process uses algorithms to iteratively remove unnecessary material from non-load-bearing regions of a part?",
    "Metode optimasi desain berbantuan komputer yang secara otomatis membuang material pada area yang tidak menahan beban kritis disebut?",
    ["Topology Optimization (Optimasi Topologi)", "Random laser cutting", "Hand forging", "Subtractive chiseling"],
    ["Optimasi Topologi (Topology Optimization)", "Pemotongan laser acak", "Tempa manual", "Pahat subtraktif"],
    0,
    "Topology optimization redistributes material to optimize structural stiffness-to-weight ratios.",
    "Optimasi topologi menyisakan material hanya pada jalur transfer beban utama sehingga menghasilkan komponen yang sangat ringan namun kokoh."
  ),
  makeQ(
    "In aerodynamic engineering, what does Computational Fluid Dynamics (CFD) software simulate?",
    "Dalam perancangan kendaraan balap dan pesawat terbang, simulasi CFD (Computational Fluid Dynamics) digunakan untuk memodelkan apa?",
    ["Airflow velocities, pressure gradients, turbulence, and aerodynamic drag coefficients around virtual surfaces", "Chemical battery reactions only", "Audio sound waves from tires", "Internal passenger seating comfort"],
    ["Pola aliran udara, distribusi tekanan, turbulensi, dan gaya hambat aerodinamis (drag) di sekeliling bodi kendaraan", "Reaksi kimia di dalam baterai", "Gelombang suara ban", "Kenyamanan kursi penumpang"],
    0,
    "CFD solves Navier-Stokes fluid equations to analyze lift, drag, and downforce dynamics across 3D geometries.",
    "CFD memodelkan aliran fluida udara di sekitar bodi mobil/pesawat untuk meminimalkan hambatan angin dan meningkatkan efisiensi bahan bakar."
  ),
  makeQ(
    "Why do engineering testing teams deploy multiple telemetry sensors (strain gauges, accelerometers, thermocouples) on test prototypes?",
    "Mengapa insinyur memasang banyak sensor telemetri (strain gauge, akselerometer, sensor suhu) pada prototipe saat uji lapangan?",
    ["To collect empirical real-time telemetry data to validate and refine computer prediction models", "To make the prototype look futuristic", "To make the vehicle heavier", "To drain vehicle battery rapidly"],
    ["Mengumpulkan data telemetri nyata secara langsung untuk mencocokkan dan memvalidasi keakuratan model simulasi komputer", "Membuat tampilan prototipe futuristik", "Menambah bobot kendaraan", "Menghabiskan baterai"],
    0,
    "Empirical telemetry sensor data verifies FEA/CFD models, closing the loop between simulations and reality.",
    "Data sensor pengukuran fisik membuktikan apakah hasil simulasi komputer sesuai dengan kondisi operasional di dunia nyata."
  ),
  makeQ(
    "What manufacturing methodology uses layer-by-layer digital deposition (such as 3D printing) to produce complex optimized geometries?",
    "Teknologi manufaktur modern yang membentuk komponen lapis demi lapis berdasarkan data model 3D digital disebut?",
    ["Additive Manufacturing (3D Printing / Manufaktur Aditif)", "Subtractive CNC milling only", "Sand casting", "Manual drop hammering"],
    ["Manufaktur Aditif / Pencetakan 3D (Additive Manufacturing / 3D Printing)", "Pemotongan bubut konvensional", "Pengecoran pasir", "Tempa palu"],
    0,
    "Additive manufacturing deposits material strictly where required, producing intricate topological geometries with minimal waste.",
    "Pencetakan 3D membangun objek lapis demi lapis langsung dari model CAD sehingga mampu memproduksi bentuk organik yang rumit."
  ),
  makeQ(
    "What statistical metric quantifies the dispersion or spread of test data points around their calculated arithmetic average?",
    "Besaran statistik apakah yang mengukur seberapa jauh sebaran nilai data uji coba menyebar dari nilai rata-ratanya?",
    ["Standard Deviation (Deviasi Standar)", "Median index", "Mode frequency", "Range coefficient"],
    ["Standar Deviasi / Simpangan Baku (Standard Deviation)", "Nilai tengah (Median)", "Modus data", "Jangkauan data"],
    0,
    "Standard deviation measures variance: lower standard deviation indicates tight, repeatable, and consistent prototype performance.",
    "Standar deviasi yang kecil menunjukkan bahwa hasil uji coba prototipe sangat konsisten dan dapat diandalkan."
  ),
  makeQ(
    "In product lifecycle engineering, what is 'Planned Maintenance' based on telemetry sensor analytics known as?",
    "Sistem perawatan mesin berbasis data sensor pemantauan getaran dan suhu untuk mencegah kerusakan sebelum terjadi disebut?",
    ["Predictive Maintenance (Pemeliharaan Prediktif)", "Breakdown repair", "Emergency reactive fixing", "Blind replacement"],
    ["Pemeliharaan Prediktif (Predictive Maintenance)", "Perbaikan setelah rusak", "Penanganan darurat", "Penggantian acak"],
    0,
    "Predictive maintenance uses vibration and thermal trend analytics to service machinery just before component failure.",
    "Pemeliharaan prediktif menggunakan analisis data sensor untuk mendeteksi keausan sejak dini dan mengganti suku cadang tepat waktu."
  ),
  makeQ(
    "What is a 'Digital Twin' in modern smart manufacturing and engineering?",
    "Apakah yang dimaksud dengan konsep 'Digital Twin' (Kembaran Digital) dalam industri rekayasa modern?",
    ["A high-fidelity virtual software model of a physical asset updated in real time via live sensor data", "A backup photocopy of a paper blueprint", "A duplicate factory building", "A video game character"],
    ["Model virtual komputer yang mencerminkan aset fisik secara presisi dan diperbarui secara real-time lewat data sensor", "Salinan fotokopi cetak biru kertas", "Pabrik kedua tiruan", "Karakter permainan video"],
    0,
    "A Digital Twin mirrors real-world machines, simulating operational performance and predicting maintenance needs.",
    "Digital Twin adalah replika digital dari mesin fisik nyata yang terus menerima data langsung untuk analisis performa berkelanjutan."
  ),
  makeQ(
    "What graphical chart organizes project tasks, durations, and dependency timelines chronologically?",
    "Diagram visual apakah yang digunakan dalam manajemen proyek teknik untuk menampilkan jadwal durasi dan ketergantungan tugas secara kronologis?",
    ["Gantt Chart", "Venn diagram", "Pie chart", "Treemap plot"],
    ["Diagram Gantt (Gantt Chart)", "Diagram Venn", "Diagram pai", "Treemap"],
    0,
    "Gantt charts map work breakdown structures across time bars, tracking milestones and critical paths.",
    "Diagram Gantt menyajikan jadwal waktu pelaksanaan setiap tahapan proyek dalam bentuk balok horizontal untuk memantau kemajuan."
  ),
  makeQ(
    "What design philosophy aims to eliminate waste, optimize continuous flow, and maximize value for customers in engineering production?",
    "Filosofi manajemen rekayasa industri yang berfokus memangkas pemborosan (waste) dan meningkatkan efisiensi proses secara berkelanjutan adalah?",
    ["Lean Manufacturing / Kaizen", "Heavy inventory hoarding", "Trial and error guesswork", "Unchecked scrap production"],
    ["Manufaktur Ramping / Kaizen (Lean Manufacturing)", "Penimbunan stok berlebih", "Tebak-tebakan acak", "Produksi limbah bebas"],
    0,
    "Lean production (Toyota Production System / Kaizen) relentlessly strips non-value-added waste from processes.",
    "Lean Manufacturing berfokus pada penghapusan pemborosan waktu dan bahan melalui perbaikan berkelanjutan (Kaizen)."
  )
];

module.exports = packs;
