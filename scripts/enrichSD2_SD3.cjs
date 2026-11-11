const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/masterQuestions.json');
const questions = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function makeQ(qEn, qId, optionsEn, optionsId, correctIdx, expEn, expId) {
  return { qEn, qId, optionsEn, optionsId, correctIndex: correctIdx, expEn, expId };
}

const PACKS = {};

// ==========================================
// SD 2 INTEGRATED (ENGINEERING)
// ==========================================
PACKS['sd-2::integrated::Choosing Suitable Materials'] = [
  makeQ("Which material is best suited for building the body of a toy boat that floats on water?", "Bahan manakah yang paling cocok untuk badan perahu mainan agar dapat mengapung di air?",
    ["Light hollow plastic or carved wood", "Heavy lead brick", "Paper towel", "Iron nail block"], ["Plastik ringan berongga atau kayu ukir", "Balok timbal padat", "Tisu dapur berpori", "Bongkahan paku besi"], 0,
    "Materials with low density and watertight surfaces float effortlessly on water.", "Bahan berbobot jenis ringan dan kedap air sangat baik untuk perahu terapung."),
  makeQ("Why are rain jackets and umbrellas made from tightly woven nylon or synthetic polymer?", "Mengapa jas hujan dan payung terbuat dari bahan nilon atau polimer sintetis?",
    ["Because they are waterproof and do not let water penetrate", "Because they absorb liters of water", "Because they are as heavy as stones", "Because they dissolve in rain"], ["Karena kedap air dan tidak membiarkan air meresap", "Karena menyerap berliter-liter air", "Karena seberat batu kali", "Karena mudah larut saat kena hujan"], 0,
    "Synthetic polymers have hydrophobic surfaces that shed rainwater droplets.", "Polimer sintetis menolak butiran air sehingga tidak merembes ke pakaian dalam."),
  makeQ("Which material provides soft cushioning to make bike seats comfortable for long rides?", "Bahan manakah yang empuk dan nyaman digunakan sebagai bantalan sadel sepeda?",
    ["Dense foam rubber covered with vinyl", "Sharp gravel", "Hard rough stone", "Solid iron plate"], ["Busa karet empuk berlapis kulit sintetis", "Kerikil runcing", "Batu keras kasar", "Lempengan besi padat"], 0,
    "Foam compresses elastically under body weight to distribute pressure comfortably.", "Busa elastis meredam getaran dan menyebarkan beban duduk agar tidak pegal."),
  makeQ("Why are the cooking surfaces of baking pans often coated with non-stick silicone or teflon?", "Mengapa permukaan loyang kue sering dilapisi bahan silikon atau teflon antilengket?",
    ["To prevent dough and batter from sticking when baked", "To make pans dissolve", "To attract rust", "To absorb heat away"], ["Mencegah adonan kue menempel dan gosong saat dipanggang", "Agar loyang meleleh", "Untuk memicu karat", "Untuk menolak panas"], 0,
    "Non-stick coatings have very low surface energy, allowing baked foods to release easily.", "Lapisan antilengket membuat kue mudah dilepaskan dari loyang dengan rapi."),
  makeQ("What property makes rubber bands useful for binding pencils together tightly?", "Sifat apakah yang membuat karet gelang sangat berguna untuk mengikat pensil bersama-sama?",
    ["Elastic flexibility (it stretches and returns to snug fit)", "Extreme brittleness", "Melting in room air", "Slipperiness"], ["Elastisitas (dapat meregang dan mengencang kembali)", "Sangat mudah patah", "Meleleh pada suhu kamar", "Permukaan licin"], 0,
    "Elasticity allows rubber to stretch around bundles and maintain tension without snapping.", "Karet gelang dapat ditarik memanjang lalu mencengkeram pensil dengan kuat."),
  makeQ("Why are drinking cups made of smooth food-grade plastic or sturdy ceramic?", "Mengapa cangkir minum dibuat dari plastik aman makanan atau keramik yang kokoh?",
    ["They hold liquids securely without leaking or dissolving", "They dissolve in warm water", "They have holes in the base", "They are made of mud"], ["Mampu menampung cairan tanpa bocor atau larut", "Mudah larut dalam air hangat", "Memiliki banyak lubang di bawah", "Terbuat dari lumpur cair"], 0,
    "Ceramic and food-grade plastics are chemically inert, watertight, and hold temperatures safely.", "Keramik dan plastik food-grade tidak beracun dan mampu menampung air dengan rapat."),
  makeQ("Which material is best for wrapping around electrical copper wires to keep people safe?", "Bahan manakah yang terbaik untuk melapisi kawat listrik tembaga agar aman dari sengatan?",
    ["Flexible insulating plastic or rubber", "Wet cotton yarn", "Aluminum foil", "Bare copper tape"], ["Plastik atau karet isolator yang lentur", "Benang katun basah", "Lembaran aluminium foil", "Pita tembaga telanjang"], 0,
    "Plastic is an electrical insulator that prevents shock hazard by containing current.", "Plastik tidak menghantarkan listrik sehingga aman dipegang saat kabel dialiri daya."),
  makeQ("Why are windows in houses made of transparent glass instead of solid wood?", "Mengapa jendela rumah dibuat dari kaca bening dan bukan kayu rapat?",
    ["Glass lets natural daylight illuminate rooms while keeping wind out", "Wood is transparent", "Glass creates darkness", "Wood melts in sunlight"], ["Kaca membiarkan cahaya matahari menerangi ruangan sambil menahan angin", "Kayu itu tembus pandang", "Kaca menciptakan kegelapan", "Kayu meleleh kena matahari"], 0,
    "Transparency transmits visible light spectrum into buildings, reducing daytime lighting needs.", "Kaca yang tembus pandang membuat ruangan terang alami di siang hari tanpa kena debu luar."),
  makeQ("Which material is selected for car bumpers because it absorbs impact energy in minor bumps?", "Bahan manakah yang dipilih untuk bemper mobil karena mampu meredam benturan ringan?",
    ["Resilient impact-resistant plastic polymer", "Thin brittle porcelain", "Cardboard paper", "Dry twigs"], ["Polimer plastik khusus yang liat dan tahan benturan", "Porselen tipis yang rapuh", "Kardus kertas", "Ranting kayu kering"], 0,
    "Modern composite plastics deform elastically during low-speed impacts to absorb collision kinetic energy.", "Plastik bemper bersifat liat dan lentur untuk meredam tumbukan agar tidak merusak rangka utama."),
  makeQ("When choosing materials to build a sturdy outdoor doghouse, what two factors are most critical?", "Saat memilih bahan untuk membuat kandang anjing di luar ruangan, dua faktor apa yang paling penting?",
    ["Weather resistance (waterproof) and structural strength", "Color of paint only", "Cost of wrapping paper", "How soft it is to chew"], ["Ketahanan terhadap cuaca (kedap air) dan kekuatan struktur yang kokoh", "Hanya warna catnya saja", "Harga kertas kado", "Seberapa empuk untuk dikunyah"], 0,
    "Outdoor structures require durable materials that withstand rain, sun, and loads.", "Kandang luar rumah membutuhkan kayu atau papan tahan cuaca agar anjing aman dari hujan.")
];

PACKS['sd-2::integrated::Mini Bridges and Buildings'] = [
  makeQ("What makes a beam bridge stronger across a gap between two tables?", "Apa yang membuat jembatan balok mainan menjadi lebih kokoh saat melintasi celah antara dua meja?",
    ["Using thicker beams or adding vertical support columns underneath", "Using thinner paper", "Removing all supports", "Wetting the bridge"], ["Memakai balok yang lebih tebal atau menambah tiang penyangga di bawahnya", "Memakai kertas yang makin tipis", "Menghilangkan semua tiang", "Membasahi jembatan dengan air"], 0,
    "Adding piers reduces span length and reduces downward bending deflection.", "Tiang penyangga di tengah memperpendek bentang bebas sehingga jembatan tidak mudah melengkung."),
  makeQ("What happens to an arch bridge when heavy weights press down on top of it?", "Apa yang terjadi pada jembatan lengkung (arch bridge) saat beban berat menekan bagian atasnya?",
    ["The arch pushes outward and downward into strong abutments at both sides", "The arch flips upside down", "The arch turns into a square", "The bridge melts"], ["Bentuk lengkung menyalurkan gaya tekan ke tumpuan kokoh di kedua ujungnya", "Lengkungan langsung terbalik", "Lengkungan berubah jadi kotak", "Jembatan meleleh seketika"], 0,
    "Arches convert vertical gravity loads into compression forces transferred along the curve.", "Bentuk busur lengkung menyalurkan tekanan ke tepi pangkal jembatan secara merata."),
  makeQ("Why is a triangle frame stiffer than a square frame made with popsicle sticks?", "Mengapa rangka berbentuk segitiga jauh lebih kaku dibanding rangka persegi dari stik es krim?",
    ["Triangles cannot change shape without altering the length of their sides", "Squares are stronger", "Triangles are softer", "Triangles have no angles"], ["Segitiga tidak dapat berubah bentuk tanpa mengubah panjang sisi-sisinya", "Persegi selalu lebih kokoh", "Segitiga lebih lembek", "Segitiga tidak memiliki sudut"], 0,
    "Triangulation provides geometric stability, which is why bridge trusses use triangles.", "Struktur segitiga secara alami mengunci sudut sehingga tidak mudah bergeser miring."),
  makeQ("What is the horizontal deck of a bridge where vehicles and people travel called?", "Apakah sebutan untuk lantai horizontal jembatan tempat kendaraan dan pejalan kaki melintas?",
    ["The bridge deck / roadway", "The pier foundation", "The suspension cable", "The drainage pipe"], ["Lantai jembatan (bridge deck)", "Pondasi tiang", "Kabel gantung", "Pipa pembuangan"], 0,
    "The deck is the load-carrying surface of a bridge roadway or walkway.", "Lantai jembatan adalah bidang datar tempat beban lalu lintas melintas di atas sungai."),
  makeQ("Why do tall skyscrapers feature deep concrete foundations anchored into bedrock?", "Mengapa gedung pencakar langit yang tinggi memerlukan pondasi beton yang dalam ke batuan dasar?",
    ["To anchor the building firmly against wind sway and earthquakes", "To store rainwater only", "To make rooms dark", "To trap heat underground"], ["Mengikat gedung dengan kuat agar tidak goyang oleh angin dan gempa", "Hanya untuk wadah air hujan", "Agar ruangan menjadi gelap", "Memerangkap panas bumi"], 0,
    "Deep piles and caissons transfer massive vertical and lateral loads directly to solid rock.", "Pondasi tiang pancang yang menancap ke batuan keras menjaga kestabilan gedung bertingkat."),
  makeQ("What should you add to a tall rectangular frame if it wobbles from side to side?", "Apa yang sebaiknya kamu tambahkan pada rangka persegi tinggi jika bergoyang ke kiri dan kanan?",
    ["A diagonal brace across the corners to form triangles", "Remove one vertical leg", "Add more weight to the top", "Loosen the joints"], ["Palang diagonal menyilang di antara sudut untuk membentuk segitiga", "Melepas salah satu tiang kaki", "Menaruh beban berat di puncaknya", "Melonggarkan baut sambungan"], 0,
    "Cross-bracing eliminates shear racking by converting rectangular frames into rigid triangles.", "Palang silang diagonal mengunci gerakan miring dan memperkuat struktur rangka."),
  makeQ("Which type of bridge suspends its roadway from huge curved steel cables hung from high towers?", "Jenis jembatan apakah yang menggantungkan lantainya pada kabel baja besar dari menara tinggi?",
    ["A suspension bridge (such as the Golden Gate)", "A simple log bridge", "A pontoon boat bridge", "An underground tunnel"], ["Jembatan gantung (Suspension bridge)", "Jembatan kayu gelondongan", "Jembatan ponton apung", "Terowongan bawah tanah"], 0,
    "Suspension bridges use high-tension steel cables draped over tall pylons to bridge long spans.", "Jembatan gantung menggunakan kabel baja tarik berkekuatan tinggi untuk membentang jarak sangat jauh."),
  makeQ("When testing your model building on a shake table, what are you simulating?", "Saat menguji model bangunanmu di atas meja getar, peristiwa alam apakah yang sedang kamu simulasikan?",
    ["An earthquake (ground vibration)", "Heavy sunshine", "Snow accumulation", "High humidity"], ["Gempa bumi (getaran tanah tektonik)", "Terik sinar matahari", "Tumpukan salju lebat", "Kelembapan udara"], 0,
    "Shake tables replicate seismic ground accelerations to evaluate building resilience.", "Meja getar menirukan guncangan gempa bumi untuk melihat apakah bangunan tahan gempa."),
  makeQ("What causes a poorly constructed cardboard bridge to collapse under too much weight?", "Apa yang menyebabkan jembatan kardus yang kurang kuat runtuh saat diberi beban berlebih?",
    ["The downward gravitational load exceeds the material's structural strength", "The air becomes too cold", "The bridge turns into liquid", "The weights get lighter"], ["Gaya gravitasi beban ke bawah melebihi batas kekuatan bahan penopang", "Udara menjadi terlalu dingin", "Jembatan berubah jadi cairan", "Beban menjadi makin ringan"], 0,
    "Structural failure occurs when stress exceeds the ultimate tensile or compressive limit.", "Keruntuhan terjadi saat beban tekanan melebihi kapasitas kekuatan maksimum material."),
  makeQ("What should a team of young engineers do right after their model bridge breaks in a test?", "Apa yang sebaiknya dilakukan tim insinyur cilik setelah model jembatannya patah dalam uji coba?",
    ["Examine where it failed, strengthen that weak spot, and build a revised model", "Quit engineering forever", "Throw away the ruler", "Blame the weights"], ["Menganalisis titik patahan, memperkuat bagian yang lemah, lalu merakit ulang", "Berhenti belajar selamanya", "Membuang penggaris ukur", "Menyalahkan anak timbangan"], 0,
    "Analyzing the failure mode guides targeted design enhancements in the next iteration.", "Melihat titik patah memberikan petunjuk penting untuk memperbaiki desain pada percobaan berikutnya.")
];

PACKS['sd-2::integrated::Wheels, Axles, and Carts'] = [
  makeQ("What two components work together to make a toy cart roll smoothly across a table?", "Dua komponen apakah yang bekerja sama membuat gerobak mainan menggelinding mulus di atas meja?",
    ["The circular wheels and central axles", "A square block and rope", "Pencils and paper", "A spoon and fork"], ["Roda bundar dan gandar poros tengah (axle)", "Balok persegi dan tali", "Pensil dan kertas tulis", "Sendok dan garpu makan"], 0,
    "Wheels rotate around axles to translate rotational spin into smooth forward motion.", "Roda berputar pada poros gandar untuk mengubah gerak putar menjadi gerak maju."),
  makeQ("What is the function of the axle in a four-wheeled push wagon?", "Apakah fungsi poros gandar pada gerobak dorong beroda empat?",
    ["It supports the wagon body and serves as the center around which wheels spin", "It makes a honking noise", "It decorates the side", "It acts as a sail"], ["Menopang badan gerobak dan menjadi pusat putaran bagi roda", "Membunyikan klakson", "Menghias sisi gerobak", "Berfungsi sebagai layar angin"], 0,
    "The axle bears vehicle weight and aligns pairs of rotating wheels.", "Gandar menahan beban gerobak sekaligus menjaga kedua roda berputar pada jalurnya."),
  makeQ("If a wheel rubs tightly against the side of the wooden cart frame, what happens?", "Jika roda bergesekan terlalu rapat dengan dinding samping gerobak kayu, apa yang terjadi?",
    ["Excess friction slows the wheel down or prevents it from spinning freely", "The cart goes 100 times faster", "The cart floats in the air", "The wheels turn into water"], ["Gaya gesek yang besar memperlambat laju atau membuat roda macet", "Gerobak meluncur 100 kali lebih cepat", "Gerobak melayang ke udara", "Roda berubah menjadi air"], 0,
    "Friction between touching surfaces resists motion and wastes input mechanical energy.", "Gesekan langsung antardua permukaan keras menghambat putaran dan membuat gerobak berat didorong."),
  makeQ("What tiny metal parts with balls inside reduce friction between a bicycle wheel and axle?", "Komponen kecil apakah yang berisi pelor bulat di dalamnya untuk mengurangi gesekan poros sepeda?",
    ["Ball bearings", "Metal screws", "Adhesive stickers", "Rubber bands"], ["Bantalan pelor (Ball bearings / lahar)", "Paku sekrup tajam", "Stiker perekat", "Karet gelang"], 0,
    "Ball bearings substitute rolling friction for sliding friction inside wheel hubs.", "Bantalan lahar berisi bola baja kecil yang menggelinding mulus sehingga putaran roda sangat lancar."),
  makeQ("Which ancient simple vehicle helped farmers carry heavy sacks of grain using just one wheel?", "Kendaraan sederhana zaman dulu manakah yang membantu petani membawa karung berat dengan satu roda?",
    ["A wheelbarrow", "A skateboard", "A modern airplane", "A motorboat"], ["Gerobak sorong roda satu (Wheelbarrow)", "Papan seluncur skateboard", "Pesawat terbang modern", "Perahu motor cepat"], 0,
    "A wheelbarrow uses a single front wheel as a fulcrum to lift heavy cargo with mechanical advantage.", "Gerobak dorong satu roda memanfaatkan prinsip tuas untuk mengangkat muatan berat dengan tenaga ringan."),
  makeQ("Why is a round wheel with an axle better for moving heavy stones than dragging them on dirt?", "Mengapa roda berporos jauh lebih mudah memindahkan batu besar daripada menyeretnya di tanah?",
    ["Rolling produces vastly lower friction resistance than sliding friction", "Wheels make stones weightless", "Wheels fly above ground", "Dirt disappears"], ["Gerak menggelinding menghasilkan gaya gesek yang jauh lebih kecil dari gaya gesek seret", "Roda membuat batu kehilangan berat", "Roda terbang di atas tanah", "Tanah menghilang seketika"], 0,
    "Rolling contact eliminates continuous surface scraping, requiring much less pulling force.", "Roda menggelinding tanpa menggesek kasar permukaan tanah sehingga tenaga yang dibutuhkan jauh lebih hemat."),
  makeQ("What happens if you replace small 2 cm wheels on a toy cart with larger 8 cm wheels?", "Apa yang terjadi jika kamu mengganti roda kecil 2 cm pada gerobak mainan dengan roda besar 8 cm?",
    ["The cart rolls over bumps and obstacles much more easily", "The cart can never move again", "The wheels become square", "The cart shrinks"], ["Gerobak dapat melompati rintangan kecil dan jalan bergelombang dengan lebih mudah", "Gerobak tidak bisa bergerak lagi", "Roda berubah menjadi persegi", "Badan gerobak menyusut"], 0,
    "Larger diameter wheels overcome surface irregularities and bumps with smaller approach angles.", "Roda berdiameter lebih besar memiliki daya jelajah lebih baik di atas jalanan yang tidak rata."),
  makeQ("What substance can be applied to a squeaky wheel axle to help it spin quietly and smoothly?", "Cairan apakah yang dapat dioleskan pada poros roda yang berdecit agar berputar halus dan senyap?",
    ["A few drops of lubricating oil or grease", "Dry sand", "Sticky glue", "Fruit juice"], ["Beberapa tetes minyak pelumas (oli) atau gemuk", "Pasir kering", "Lem rekat", "Jus buah manis"], 0,
    "Lubricants form a microscopic film separating metal surfaces to minimize friction.", "Minyak pelumas melapisi logam poros sehingga gesekan dan suara berdecit hilang."),
  makeQ("What device on a four-wheeled wagon allows the driver to turn left or right?", "Perangkat apakah pada gerobak empat roda yang memungkinkan pengemudi membelokkan arah ke kiri atau kanan?",
    ["A pivoting steering arm or pivoted front axle", "A fixed rear bumper", "A wooden floorboard", "A roof rack"], ["Poros kemudi depan yang dapat berputar (steering pivot)", "Bemper belakang mati", "Papan lantai kayu", "Rak atap"], 0,
    "Pivoting front axles allow wheels to change directional tracking while rolling.", "Gandar depan yang dapat berbelok memungkinkan roda mengarahkan haluan gerobak dengan lincah."),
  makeQ("When pulling a heavy loaded cart up an incline ramp, how does using a longer gentle slope help?", "Saat menarik gerobak bermuatan ke tanjakan, bagaimana jalan miring yang lebih landai membantu?",
    ["It requires less pulling effort, although you must travel a longer distance", "It doubles the cart's weight", "It pulls the cart down instantly", "It stops all wheels"], ["Membutuhkan tenaga tarik yang lebih ringan, meski jarak tempuh menjadi sedikit lebih panjang", "Menggandakan berat gerobak", "Menarik gerobak jatuh seketika", "Menghentikan semua roda"], 0,
    "An inclined plane trades distance for reduced input force to overcome gravity.", "Bidang miring yang landai meringankan gaya tarik yang harus dikeluarkan manusia.")
];

PACKS['sd-2::integrated::Solving Simple Problems'] = [
  makeQ("What is the first step when an engineer notices a problem, like toys falling off a shelf?", "Apakah langkah pertama saat seorang insinyur mengidentifikasi masalah, seperti mainan sering jatuh dari rak?",
    ["Identify and clearly define the problem you want to solve", "Guess a solution without looking", "Ignore it completely", "Break the shelf"], ["Mengidentifikasi dan merumuskan masalah yang ingin dipecahkan dengan jelas", "Menebak asal tanpa melihat", "Mengabaikannya sama sekali", "Merusak rak mainan"], 0,
    "Clearly defining the engineering challenge focuses brainstormed ideas on the real cause.", "Mengetahui penyebab utama masalah memudahkan kita merancang solusi yang tepat sasaran."),
  makeQ("After identifying a problem, what creative step comes next before building anything?", "Setelah memahami masalah, langkah kreatif apakah yang dilakukan sebelum mulai merakit sesuatu?",
    ["Brainstorming multiple different ideas and drawing concept sketches", "Throwing away all tools", "Buying 100 new shelves", "Going to sleep"], ["Mengumpulkan banyak ide kreatif dan menggambar sketsa pilihan solusi", "Membuang semua perkakas", "Membeli 100 rak baru", "Langsung tidur"], 0,
    "Brainstorming explores diverse options so the best design can be selected.", "Curah pendapat (brainstorming) membuka berbagai kemungkinan solusi terbaik untuk dipilih."),
  makeQ("If a cardboard chair model buckles when a teddy bear sits on it, what is the best next action?", "Jika kursi model kardus penyok saat diduduki boneka beruang, tindakan apa yang terbaik?",
    ["Inspect where the legs folded, reinforce them with double walls, and retest", "Complain that bears are too heavy", "Give up completely", "Hide the chair"], ["Periksa di mana kaki kursi tertekuk, perkuat dengan lapisan ganda, lalu uji lagi", "Mengeluh boneka terlalu berat", "Menyerah dan tidak mau mencoba", "Menyembunyikan kursi tersebut"], 0,
    "Iterative engineering uses test results to diagnose failure points and reinforce them.", "Menganalisis bagian yang patah membantu kita mempertebal bagian penopang agar kursi lebih kuat."),
  makeQ("Why is working collaboratively in a team helpful when designing a classroom project?", "Mengapa bekerja sama dalam tim sangat membantu saat merancang proyek kelas?",
    ["Different teammates bring unique ideas, skills, and perspectives to solve challenges", "So only one person does all the work", "To make as much noise as possible", "To hide materials"], ["Setiap anggota menyumbang ide kreatif, keahlian berbeda, dan sudut pandang baru", "Agar satu orang saja yang bekerja", "Supaya membuat suara berisik", "Untuk menyembunyikan bahan"], 0,
    "Collaboration combines diverse strengths and fosters more innovative engineering solutions.", "Gotong royong memadukan berbagai kelebihan anggota tim untuk menyelesaikan tugas lebih cepat."),
  makeQ("What do we call the limits on an engineering project, such as budget, time, and materials?", "Apakah sebutan untuk batasan dalam suatu proyek rekayasa, seperti bahan yang terbatas dan batas waktu?",
    ["Constraints", "Unfair rules", "Boring obstacles", "Accidents"], ["Batasan / Kendala proyek (Constraints)", "Aturan curang", "Rintangan membosankan", "Kecelakaan kerja"], 0,
    "Constraints are practical boundaries (resources, time, safety) that guide the design solution.", "Kendala atau batasan menentukan batas biaya, waktu, dan jenis bahan yang boleh digunakan."),
  makeQ("When testing a paper parachute, what metric should you measure with a stopwatch?", "Saat menguji parasut kertas, ukuran apakah yang sebaiknya kamu catat memakai stopwatch?",
    ["The descent time from release to landing on the floor", "The weight of the clock", "The temperature of the room", "The color of the string"], ["Lama waktu parasut melayang turun hingga menyentuh lantai", "Berat jam stopwatch", "Suhu ruangan kelas", "Warna tali parasut"], 0,
    "Longer descent time indicates greater air resistance and parachute effectiveness.", "Semakin lama parasut melayang turun membuktikan gaya hambat udaranya bekerja dengan baik."),
  makeQ("Why should you change only one thing at a time when improving a design?", "Mengapa kita sebaiknya hanya mengubah satu hal dalam satu waktu saat menyempurnakan rancangan?",
    ["So you know exactly which change caused the improvement or failure", "Because changing two things is forbidden by law", "To make testing take longer", "To confuse your friends"], ["Agar kita tahu pasti perubahan mana yang membuat hasil menjadi lebih baik atau gagal", "Karena mengubah dua hal dilarang hukum", "Agar pengujian memakan waktu lama", "Untuk membingungkan teman"], 0,
    "Isolating independent variables ensures scientific validity and clear conclusions.", "Menguji satu variabel saja memastikan kita tahu penyebab pasti di balik keberhasilan uji coba."),
  makeQ("What is a criteria in an engineering design challenge?", "Apakah yang dimaksud dengan kriteria keberhasilan dalam suatu tantangan desain teknik?",
    ["The goals and requirements that a successful design must achieve", "The name of the teacher", "The price of the pencil", "The day of the week"], ["Tujuan dan syarat yang harus dipenuhi agar suatu rancangan dinyatakan berhasil", "Nama guru pengajar", "Harga sebuah pensil", "Nama hari dalam seminggu"], 0,
    "Criteria specify measurable desired attributes, like supporting 500 grams for 1 minute.", "Kriteria adalah target nyata yang harus dicapai, misalnya mampu menahan beban 500 gram."),
  makeQ("How does sharing your completed invention with classmates help you become a better inventor?", "Bagaimana mempresentasikan karya ciptaanmu di depan teman kelas membantu menjadi pencipta yang lebih baik?",
    ["You receive constructive feedback and suggestions to make it even better", "You can show off", "You can stop learning", "You can break other models"], ["Mendapatkan saran membangun dan masukan bermanfaat untuk penyempurnaan karya", "Bisa menyombongkan diri", "Bisa berhenti belajar", "Bisa merusak karya teman"], 0,
    "Peer review offers outside perspectives that uncover overlooked improvements.", "Umpan balik dari teman membuka wawasan baru untuk memperbaiki kekurangan rancangan."),
  makeQ("When your prototype works successfully and meets all goals, what is the rewarding final step?", "Ketika purwarupa berhasil bekerja sempurna dan memenuhi semua kriteria, apa langkah akhir yang membanggakan?",
    ["Communicate your design with a report, poster, or demonstration", "Destroy the model immediately", "Pretend it never worked", "Keep it a secret"], ["Mempresentasikan rancangan melalui laporan, poster, atau peragaan langsung", "Langsung menghancurkan model", "Pura-pura tidak berhasil", "Merahasiakannya selamanya"], 0,
    "Communicating engineering results shares knowledge and celebrates creative problem solving.", "Membagikan hasil karya kepada orang lain menyebarkan inspirasi dan ilmu pengetahuan baru.")
];

// Iterate through PACKS and assign into questions
for (const [key, pack] of Object.entries(PACKS)) {
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
console.log("SD 2 Engineering updated successfully.");
